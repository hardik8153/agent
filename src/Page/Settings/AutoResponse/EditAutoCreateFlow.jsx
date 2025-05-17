import React, { useState, useEffect, useRef, Fragment, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom'; // Added useParams
import {
    DndContext,
    // ... other dnd-kit imports
} from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Authapi from '@/Server/Authapi';
// ... other imports LuMousePointerClick, etc. ...
import Topbar from '@/components/Topbar';
import TriggerSettingsModal from '@/components/modals/TriggerSettingsModal';
import OptionSettingsModal from '@/components/modals/OptionSettingsModal';
import ResponseSettingsModal from '@/components/modals/ResponseSettingsModal';
import EndSettingsModal from '@/components/modals/EndSettingsModal';
import CustomerSupport from './CustomerSupport';

// These should be defined at the top level or passed around if needed elsewhere
const BLOCK_TYPES = {
    TRIGGER: 'Trigger',
    OPTIONS: 'Options',
    RESPONSE: 'Response',
    END: 'End',
};

const CANVAS_ID = 'canvas-droppable';
const BLOCK_WIDTH_ESTIMATE = 220;
const HORIZONTAL_GAP = 80;
const BLOCK_HEIGHT_ESTIMATE = 120; // Approximate height
const VERTICAL_GAP = 100;
const INITIAL_X_OFFSET = 70;
const INITIAL_Y_OFFSET = 80;
const AVERAGE_OPTION_ITEM_HEIGHT = 32; // Height of one option item in the Options block

// Sidebar items definition (accessible for transformation)
const sidebarItems = [
    { id: 'sidebar-trigger', type: BLOCK_TYPES.TRIGGER, label: 'Trigger', icon: "", color: 'bg-blue-50 text-blue-700', iconColor: 'text-blue-500' },
    { id: 'sidebar-options', type: BLOCK_TYPES.OPTIONS, label: 'Options', icon: "", color: 'bg-orange-50 text-orange-700', iconColor: 'text-orange-500' },
    { id: 'sidebar-response', type: BLOCK_TYPES.RESPONSE, label: 'Response', icon: "", color: 'bg-green-50 text-green-700', iconColor: 'text-green-500' },
    { id: 'sidebar-end', type: BLOCK_TYPES.END, label: 'End', icon: "", color: 'bg-red-50 text-red-700', iconColor: 'text-red-500' },
];

const getSidebarItemConfig = (typeConstant) => sidebarItems.find(item => item.type === typeConstant) || {};


// --- DATA TRANSFORMATION FUNCTION ---
const transformApiFlowToEditorState = (apiFlowData) => {
    const editorBlocks = [];
    // Map backend block ID to new client-side UUID for reconstructing connections
    const backendIdToClientIdMap = new Map(); 
    let identifiedTriggerBlockBackendId = null;

    if (!apiFlowData || !apiFlowData.blocks) {
        return { blocks: [], triggerBlockBackendId: null };
    }

    // Step 1: Transform blocks from apiFlowData.blocks
    for (const apiBlock of apiFlowData.blocks) {
        const clientBlockId = uuidv4(); // Generate a new client-side ID
        backendIdToClientIdMap.set(apiBlock.id, clientBlockId); // Map backend ID to client ID

        let blockTypeConstant;
        switch (apiBlock.type) {
            case "TRIGGER": blockTypeConstant = BLOCK_TYPES.TRIGGER; break;
            case "OPTION_BLOCK": blockTypeConstant = BLOCK_TYPES.OPTIONS; break;
            case "RESPONSE_BLOCK": blockTypeConstant = BLOCK_TYPES.RESPONSE; break;
            case "END_BLOCK": blockTypeConstant = BLOCK_TYPES.END; break;
            default:
                continue; // Skip unknown block types
        }

        const sidebarConfig = getSidebarItemConfig(blockTypeConstant);
        const settings = {
            backendId: apiBlock.id, // Store the original backend ID
            title: apiBlock.metaData?.title || sidebarConfig.label || apiBlock.type,
        };

        // Populate type-specific settings
        if (blockTypeConstant === BLOCK_TYPES.TRIGGER) {
            settings.type = apiBlock.metaData?.type || 'keyword'; // e.g., 'keyword', 'button_click'
            settings.keywords = Array.isArray(apiBlock.metaData?.keywords) ? apiBlock.metaData.keywords : [];
            settings.keyword = settings.keywords.join(', '); // For UI display consistency
            settings.message = apiBlock.metaData?.message || '';
            identifiedTriggerBlockBackendId = apiBlock.id; // Capture the trigger block's backend ID
        } else if (blockTypeConstant === BLOCK_TYPES.OPTIONS) {
            settings.options = (apiBlock.metaData?.options || []).map(opt => ({
                id: uuidv4(),             // New client-side ID for this UI option item
                backendId: opt.id,        // Backend ID of this specific option
                label: opt.label,
                nextBlockId: null,        // To be filled by connections processing
            }));
        } else if (blockTypeConstant === BLOCK_TYPES.RESPONSE) {
            settings.responseText = apiBlock.metaData?.text || '';
            // 'options' in RESPONSE metaData are quick replies (array of strings)
            settings.options = Array.isArray(apiBlock.metaData?.options) ? apiBlock.metaData.options : []; 
            settings.sourceOptionInfo = null; // To be filled by connections
        } else if (blockTypeConstant === BLOCK_TYPES.END) {
            // 'options' in END metaData are objects like { label: "text" }
            settings.options = (apiBlock.metaData?.options || []).map(opt => opt.label || (typeof opt === 'string' ? opt : ''));
        }

        editorBlocks.push({
            id: clientBlockId, // Client-side UUID
            // backendId: apiBlock.id, // Redundant if settings.backendId is primary, but can keep for quick ref
            type: blockTypeConstant,
            label: settings.title, // Main display label for the block
            icon: sidebarConfig.icon,
            color: sidebarConfig.color,
            iconColor: sidebarConfig.iconColor,
            position: { x: apiBlock.positionX || 0, y: apiBlock.positionY || 0 },
            settings: settings,
        });
    }

    // Step 2: Process connections from apiFlowData.connections
    if (apiFlowData.connections && Array.isArray(apiFlowData.connections)) {
        for (const apiConnection of apiFlowData.connections) {
            const sourceClientBlockId = backendIdToClientIdMap.get(apiConnection.sourceBlockId);
            const targetClientBlockId = backendIdToClientIdMap.get(apiConnection.targetBlockId);

            if (!sourceClientBlockId || !targetClientBlockId) {
                continue;
            }

            const sourceEditorBlock = editorBlocks.find(b => b.id === sourceClientBlockId);
            const targetEditorBlock = editorBlocks.find(b => b.id === targetClientBlockId);

            if (!sourceEditorBlock || !targetEditorBlock) {
                continue;
            }
            
            // Connect based on source block type
            if (sourceEditorBlock.type === BLOCK_TYPES.OPTIONS) {
                const optionInSettings = sourceEditorBlock.settings.options.find(
                    opt => opt.backendId === apiConnection.sourceHandle // sourceHandle is the backendId of the option
                );
                if (optionInSettings) {
                    optionInSettings.nextBlockId = targetClientBlockId;

                    // If this option connects to a RESPONSE block, populate sourceOptionInfo
                    if (targetEditorBlock.type === BLOCK_TYPES.RESPONSE) {
                        targetEditorBlock.settings.sourceOptionInfo = {
                            optionBlockId: sourceClientBlockId, // Client ID of the Options block
                            optionId: optionInSettings.id,      // Client ID of the specific option
                            optionLabel: optionInSettings.label,
                            // optionBackendId: optionInSettings.backendId // Could be useful for debugging or other logic
                        };
                    }
                } else {
                    
                }
            } else if (sourceEditorBlock.type === BLOCK_TYPES.TRIGGER || sourceEditorBlock.type === BLOCK_TYPES.RESPONSE) {
                // For Trigger and Response blocks, set their main nextBlockId
                // (assuming apiConnection.sourceHandle is null or a generic output handle for these)
                sourceEditorBlock.settings.nextBlockId = targetClientBlockId;
            }
        }
    }
    return { blocks: editorBlocks, triggerBlockBackendId: identifiedTriggerBlockBackendId };
};
// --- END DATA TRANSFORMATION FUNCTION ---


const EditAutoCreateFlow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { flowId: flowIdFromParams } = useParams(); // Get flowId from URL like /edit/:flowId

    // Determine initial flowId and flowName
    const initialFlowId = flowIdFromParams || location.state?.flowId || null;
    const initialFlowName = location.state?.flowName || 'Untitled Flow';

    const [flowId, setFlowId] = useState(initialFlowId);
    const [flowTitle, setFlowTitle] = useState(initialFlowName);
    const [isActive, setIsActive] = useState(true);
    const [blocks, setBlocks] = useState([]);
    const [activeDragId, setActiveDragId] = useState(null);
    const [activeDragData, setActiveDragData] = useState(null);
    const canvasContainerRef = useRef(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [editingBlockId, setEditingBlockId] = useState(null);
    const [preview, setPreview] = useState(false);
    const [callOptionBlockApi1, setcallOptionBlockApi1] = useState(""); // Used in handleSaveSettings for response parent

    const [triggerBlockBackendId, setTriggerBlockBackendId] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // For loading indicator

    const blockElementRefs = useRef(new Map());
    const [arrowsToRender, setArrowsToRender] = useState([]);

    // Fetch flow data if flowId is present (for editing)
    useEffect(() => {
        const fetchFlowDetails = async (idToFetch) => {
            setIsLoading(true);
            try {
                const response = await Authapi.getFlowById(idToFetch);
                if (response.success && response.data) {
                    const flowData = response.data;
                    setFlowTitle(flowData.name || 'Untitled Flow');
                    setIsActive(flowData.isActive === undefined ? true : flowData.isActive);
                    
                    const { blocks: editorBlocks, triggerBlockBackendId: tbBackendId } = transformApiFlowToEditorState(flowData);
                    setBlocks(editorBlocks);
                    if (tbBackendId) {
                        setTriggerBlockBackendId(tbBackendId);
                    }
                    // If the flow was just created and navigated to, response.data.id is the new flowId
                    // This logic is now primarily for editing existing flows.
                    // The setFlowId from CreateFlow in AutoResponse handles new flow ID passing.
                } else {
                    alert("Error fetching flow details: " + (response.error || "Unknown error"));
                    // Optionally navigate back or show an error state
                    // navigate('/AutoResponse'); 
                }
            } catch (error) {
                alert("Exception fetching flow details.");
            } finally {
                setIsLoading(false);
            }
        };

        if (flowId) { // Only fetch if flowId is available
            fetchFlowDetails(flowId);
        }
    }, [flowId]); // Rerun if flowId changes (e.g. param vs state)


    // Original useEffect for mock delete functions (can be kept for local testing if needed)
    useEffect(() => {
        // ... your mock delete setup ... (this part is less critical for edit functionality itself)
    }, [/* flowId, flowTitle, blocks.length */]); // Removed dependencies to avoid re-running this unless intended


    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor)
    );

    // ... DraggableSidebarItem, FlowBlock, Canvas, Arrow components (assumed unchanged, keep them) ...
    // The FlowBlock component might need slight adjustments if settings structure has changed significantly,
    // but the provided one looks like it dynamically renders based on type and settings.title.
    // Option rendering in FlowBlock for OPTIONS type:
    // It uses settings.options which is [{id, label, nextBlockId}]. This matches transformed data.
    // Trigger rendering: settings.type, settings.keywords. Looks okay.
    // Response rendering: settings.responseText, settings.options (quick replies). Looks okay.
    // End rendering: settings.options (array of strings). Looks okay.

    const handleDragStart = useCallback((event) => {
        // ... (no changes needed here for edit functionality)
        setActiveDragId(event.active.id);
        setActiveDragData(event.active.data.current);
    }, []);

    const handleDragEnd = useCallback((event) => {
        // ... (no changes needed here for edit functionality, logic for adding/moving blocks)
        // This logic is about DND operations on the canvas
        const { active, over, delta } = event;
        setActiveDragId(null);
        setActiveDragData(null);

        if (!over?.id) return;

        const activeData = active.data.current;
        const isSidebarItem = activeData?.isSidebarItem;

        if (isSidebarItem && over.id === CANVAS_ID) {
            const { type, label, icon: IconComponent, color, iconColor } = activeData;

            const triggerExists = blocks.some(block => block.type === BLOCK_TYPES.TRIGGER);
            if (blocks.length === 0 && type !== BLOCK_TYPES.TRIGGER) {
                alert("The first block in a flow must be a Trigger block.");
                return;
            }
            if (triggerExists && type === BLOCK_TYPES.TRIGGER) {
                alert("A Trigger block already exists. Only one Trigger is allowed per flow.");
                return;
            }
            
            let newBlockPosition;
            let predecessorBlock = null;
            let connectToPredecessor = true;

            const container = canvasContainerRef.current;
            let baseDropX = INITIAL_X_OFFSET;
            let baseDropY = INITIAL_Y_OFFSET;

            if (active.rect.current.translated && container) {
                const containerRect = container.getBoundingClientRect();
                baseDropX = Math.max(10, Math.round(active.rect.current.translated.left - containerRect.left + container.scrollLeft));
                baseDropY = Math.max(10, Math.round(active.rect.current.translated.top - containerRect.top + container.scrollTop));
            } else if (blocks.length > 0) {
                // A more sophisticated placement logic might be needed here based on existing blocks
                // For now, placing it relative to the last block or a default if no blocks
                const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : null;
                if (lastBlock) {
                    baseDropX = lastBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP;
                    baseDropY = lastBlock.position.y;
                } else { // First block (must be trigger)
                    baseDropX = INITIAL_X_OFFSET;
                    baseDropY = INITIAL_Y_OFFSET;
                }
            }
            
            newBlockPosition = { x: baseDropX, y: baseDropY }; 
            if (type === BLOCK_TYPES.TRIGGER) {
                connectToPredecessor = false;
                 // If it's the first block, ensure it's at a sensible starting position
                if (blocks.length === 0) {
                    newBlockPosition = { x: INITIAL_X_OFFSET, y: INITIAL_Y_OFFSET };
                }
            } else if (type === BLOCK_TYPES.OPTIONS) {
                predecessorBlock = blocks.find(b => b.type === BLOCK_TYPES.TRIGGER && !b.settings?.nextBlockId); // Connect to unlinked trigger
                if (predecessorBlock) {
                    newBlockPosition = {
                        x: predecessorBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP,
                        y: predecessorBlock.position.y
                    };
                } else {
                    connectToPredecessor = false; 
                    // Place it somewhere sensible if no direct predecessor is found
                    // This might need smarter auto-layout or user guidance
                    const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : null;
                    if (lastBlock) {
                        newBlockPosition = { x: lastBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP, y: lastBlock.position.y };
                    }
                }
            } else if (type === BLOCK_TYPES.RESPONSE) {
                // No automatic connection logic for Response on drag-drop from sidebar by default
                // User connects it via Options block or it's standalone for now.
                // If activeData.sourceOptionInfo is present (dragged from an option connector), handle that.
                // For a generic sidebar drag, place it near the last block or mouse position.
                connectToPredecessor = false;
                const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : null;
                 if (lastBlock) {
                     newBlockPosition = { x: lastBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP, y: lastBlock.position.y };
                 }
            } else if (type === BLOCK_TYPES.END) {
                 // No automatic connection for End on drag-drop from sidebar by default.
                 // User connects it via Response block's "connect to end" feature.
                connectToPredecessor = false;
                const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : null;
                if (lastBlock) {
                    newBlockPosition = { x: lastBlock.position.x, y: lastBlock.position.y + BLOCK_HEIGHT_ESTIMATE + VERTICAL_GAP };
                }
            }


            newBlockPosition.x = Math.max(10, newBlockPosition.x);
            newBlockPosition.y = Math.max(10, newBlockPosition.y);
             
            let initialSettings = {};
            if (type === BLOCK_TYPES.TRIGGER) initialSettings = { title: 'New Trigger', type: 'keyword', keywords: [], message: '' };
            else if (type === BLOCK_TYPES.OPTIONS) initialSettings = { title: 'New Options', options: [] }; // options: [{id: uuidv4(), label: "Option 1", backendId: null, nextBlockId: null}]
            else if (type === BLOCK_TYPES.RESPONSE) initialSettings = { title: 'New Response', responseText: '', options: [] /* quick replies */ };
            else if (type === BLOCK_TYPES.END) initialSettings = { title: 'New End Flow', options: [] };

            const newBlock = {
                id: uuidv4(), type, label, icon: IconComponent,
                position: newBlockPosition,
                color, iconColor, settings: initialSettings,
            };

            if (predecessorBlock && connectToPredecessor) { 
                 setBlocks((prevBlocks) => {
                    const updatedBlocks = prevBlocks.map(b =>
                        b.id === predecessorBlock.id
                            ? { ...b, settings: { ...b.settings, nextBlockId: newBlock.id } }
                            : b
                    );
                    return [...updatedBlocks, newBlock];
                });
            }
             else {
                setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
            }
            setEditingBlockId(newBlock.id);
            setIsSettingsModalOpen(true);

        } else if (!isSidebarItem && over.id === CANVAS_ID) { 
            setBlocks((prevBlocks) =>
                prevBlocks.map((block) =>
                    block.id === active.id
                        ? { ...block, position: { x: Math.max(10, Math.round(block.position.x + delta.x)), y: Math.max(10, Math.round(block.position.y + delta.y)) } }
                        : block
                )
            );
        } else if (over && over.id !== CANVAS_ID && !isSidebarItem) { 
             setBlocks((prevBlocks) =>
                prevBlocks.map((block) =>
                    block.id === active.id
                        ? { ...block, position: { x: Math.max(10, Math.round(block.position.x + delta.x)), y: Math.max(10, Math.round(block.position.y + delta.y)) } }
                        : block
                )
            );
        }
    }, [blocks, flowId, canvasContainerRef]);


    useEffect(() => {
        // Arrow drawing logic (no changes needed here specifically for edit functionality)
        // ...
         if (activeDragId || !canvasContainerRef.current) {
            return;
        }
    
        const timeoutId = setTimeout(() => { 
            const newArrowsData = [];
            blocks.forEach(block => {
                const fromNode = blockElementRefs.current.get(block.id);
                if (!fromNode) return;
    
                if (block.type === BLOCK_TYPES.OPTIONS && block.settings?.options) {
                    (block.settings.options || []).forEach((option, index) => {
                        if (option.nextBlockId) {
                            const toBlock = blocks.find(b => b.id === option.nextBlockId);
                            const toNode = blockElementRefs.current.get(option.nextBlockId);
    
                            if (toBlock && toNode) {
                                const optionConnectorElement = fromNode.querySelector(`[data-option-connector-id="${option.id}"]`);
                                let optionConnectorYOffset;
                                const optionConnectorXOffset = fromNode.offsetWidth - 12; 

                                if (optionConnectorElement) {
                                    const connectorRect = optionConnectorElement.getBoundingClientRect();
                                    const fromNodeRect = fromNode.getBoundingClientRect(); 
                                    optionConnectorYOffset = (connectorRect.top - fromNodeRect.top) + (connectorRect.height / 2);
                                } else { // Fallback if element not found (e.g. during initial render)
                                    const optionsHeaderHeightEstimate = 35; // Estimate height of title area
                                    optionConnectorYOffset = optionsHeaderHeightEstimate + (index * AVERAGE_OPTION_ITEM_HEIGHT) + (AVERAGE_OPTION_ITEM_HEIGHT / 2);
                                }
    
                                const fromPos = {
                                    x: block.position.x + optionConnectorXOffset,
                                    y: block.position.y + optionConnectorYOffset,
                                };
                                const toPos = {
                                    x: toBlock.position.x, 
                                    y: toBlock.position.y + toNode.offsetHeight / 2, 
                                };
                                newArrowsData.push({ id: `arrow-${block.id}-opt-${option.id}-to-${toBlock.id}`, fromPos, toPos, arrowType: 'horizontal' });
                            }
                        }
                    });
                } 
                else if (block.settings?.nextBlockId) { 
                    const toBlock = blocks.find(b => b.id === block.settings.nextBlockId);
                    const toNode = blockElementRefs.current.get(block.settings.nextBlockId);
    
                    if (toBlock && fromNode && toNode) { 
                        let fromPos, toPos, arrowType;
                        const blockPadding = 12; // Consistent with FlowBlock padding
    
                        if (block.type === BLOCK_TYPES.TRIGGER) {
                            const iconSizeEstimate = 30; // Size of the IoChevronForwardCircleOutline
                            // Position from near the chevron icon on the Trigger block
                            fromPos = { 
                                x: block.position.x + fromNode.offsetWidth - blockPadding - (iconSizeEstimate / 2) + 5, // Approx center of chevron
                                y: block.position.y + blockPadding + (iconSizeEstimate / 2) + 2  // Approx center of chevron
                            };
                            toPos = { 
                                x: toBlock.position.x, // Connect to left edge of target block
                                y: toBlock.position.y + toNode.offsetHeight / 2 // Connect to vertical center of target
                            };
                            arrowType = 'horizontal';
                        } else if (block.type === BLOCK_TYPES.RESPONSE) { 
                            // Connection from Response (likely to End block)
                            fromPos = { 
                                x: block.position.x + fromNode.offsetWidth / 2, // From bottom center of Response
                                y: block.position.y + fromNode.offsetHeight 
                            };
                            toPos = { 
                                x: toBlock.position.x + toNode.offsetWidth / 2, // To top center of End
                                y: toBlock.position.y 
                            };
                            arrowType = 'vertical-elbow';
                        }
    
                        if (fromPos && toPos) {
                            newArrowsData.push({ id: `arrow-${block.id}-to-${toBlock.id}`, fromPos, toPos, arrowType });
                        }
                    }
                }
            });
            setArrowsToRender(newArrowsData);
        }, 100); // Debounce slightly

        return () => clearTimeout(timeoutId);

    }, [blocks, activeDragId, blockElementRefs]);

    const handleBlockClick = useCallback((blockClientId) => {
        // ... (no changes needed here)
        if (isSettingsModalOpen || activeDragId) return;
        const blockToEdit = blocks.find(b => b.id === blockClientId);
        if (blockToEdit) {
            setEditingBlockId(blockClientId);
            setIsSettingsModalOpen(true);
        } else {
        }
    }, [blocks, isSettingsModalOpen, activeDragId]);

    const handleCloseSettingsModal = useCallback(() => {
        // ... (no changes needed here)
        setIsSettingsModalOpen(false);
        setEditingBlockId(null);
    }, []);
    
    const handleConnectOption = useCallback((optionsBlockId, optionClientId) => {
        // This logic creates a new Response block if one isn't connected,
        // or opens the settings of an already connected block.
        // This should largely remain the same.
        // ... (existing logic for handleConnectOption)
        setBlocks(prevBlocks => {
            const optionsBlockIndex = prevBlocks.findIndex(b => b.id === optionsBlockId);
            if (optionsBlockIndex === -1) return prevBlocks;

            const optionsBlock = { ...prevBlocks[optionsBlockIndex] }; 
            if (optionsBlock.type !== BLOCK_TYPES.OPTIONS || !optionsBlock.settings?.options) return prevBlocks;
            
            optionsBlock.settings = { ...optionsBlock.settings }; 
            optionsBlock.settings.options = [...(optionsBlock.settings.options || [])]; 

            const optionIndex = optionsBlock.settings.options.findIndex(opt => opt.id === optionClientId);
            if (optionIndex === -1) return prevBlocks;

            const currentOption = { ...optionsBlock.settings.options[optionIndex] }; 

            if (currentOption.nextBlockId) { // If already connected, edit the connected block
                const connectedBlock = prevBlocks.find(b => b.id === currentOption.nextBlockId);
                if (connectedBlock) {
                    handleBlockClick(connectedBlock.id);
                } else { // Should not happen if data is consistent
                    currentOption.nextBlockId = null;
                    optionsBlock.settings.options[optionIndex] = currentOption;
                    const updatedBlocks = [...prevBlocks];
                    updatedBlocks[optionsBlockIndex] = optionsBlock;
                    return updatedBlocks;
                }
                return prevBlocks; // No change to blocks array structure, just opening modal
            } else { // Not connected, create and connect a new Response block
                const responseSidebarItem = sidebarItems.find(item => item.type === BLOCK_TYPES.RESPONSE);
                if (!responseSidebarItem) {
                    return prevBlocks;
                }

                const optionsNode = blockElementRefs.current.get(optionsBlockId);
                let newResponseY = optionsBlock.position.y; // Default Y alignment
                // Try to align Y with the option connector
                const optionsHeaderHeightEstimate = 35; // approx height of title area
                let estimatedConnectorCenterYInBlock = optionsHeaderHeightEstimate + (optionIndex * AVERAGE_OPTION_ITEM_HEIGHT) + (AVERAGE_OPTION_ITEM_HEIGHT / 2);


                if (optionsNode) {
                    const optionConnectorElement = optionsNode.querySelector(`[data-option-connector-id="${optionClientId}"]`);
                    if (optionConnectorElement) {
                        const connectorRect = optionConnectorElement.getBoundingClientRect();
                        const optionsNodeRect = optionsNode.getBoundingClientRect();
                        estimatedConnectorCenterYInBlock = (connectorRect.top - optionsNodeRect.top) + (connectorRect.height / 2);
                    }
                }
                // Adjust new response block's Y position to align its center with the option's connector Y
                newResponseY = optionsBlock.position.y + estimatedConnectorCenterYInBlock - (BLOCK_HEIGHT_ESTIMATE / 2);
                newResponseY = Math.max(10, newResponseY); // Ensure it's within canvas bounds

                const newResponseBlock = {
                    id: uuidv4(),
                    type: BLOCK_TYPES.RESPONSE,
                    label: `Response for ${currentOption.label}`, // Initial label
                    icon: responseSidebarItem.icon,
                    position: {
                        x: Math.max(10, optionsBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP),
                        y: newResponseY,
                    },
                    color: responseSidebarItem.color,
                    iconColor: responseSidebarItem.iconColor,
                    settings: {
                        title: `Response for "${currentOption.label}"`, // More specific title
                        responseText: '',
                        options: [], // Quick replies
                        sourceOptionInfo: { // Link back to the source option
                            optionBlockId: optionsBlockId,
                            optionId: optionClientId,
                            optionLabel: currentOption.label,
                        }
                    },
                };

                currentOption.nextBlockId = newResponseBlock.id; // Link option to new response block
                optionsBlock.settings.options[optionIndex] = currentOption;
                
                const updatedBlocks = [...prevBlocks];
                updatedBlocks[optionsBlockIndex] = optionsBlock; // Update the options block
                
                // Open settings for the newly created Response block
                setTimeout(() => { 
                    setEditingBlockId(newResponseBlock.id);
                    setIsSettingsModalOpen(true);
                }, 0);

                return [...updatedBlocks, newResponseBlock]; // Add new response block to canvas
            }
        });
    }, [handleBlockClick, sidebarItems, blockElementRefs, blocks]);

    const handleConnectToEnd = useCallback((responseBlockId) => {
        // This logic creates a new End block if one isn't connected from this Response.
        // This should also largely remain the same.
        // ... (existing logic for handleConnectToEnd)
         setBlocks(prevBlocks => {
            const responseBlockIndex = prevBlocks.findIndex(b => b.id === responseBlockId);
            if (responseBlockIndex === -1) {
                return prevBlocks;
            }

            let responseBlock = { ...prevBlocks[responseBlockIndex] }; 
            if (responseBlock.type !== BLOCK_TYPES.RESPONSE) {
                return prevBlocks;
            }

            // Check if already connected to an End block or any other block
            if (responseBlock.settings?.nextBlockId) {
                const existingNextBlock = prevBlocks.find(b => b.id === responseBlock.settings.nextBlockId);
                if (existingNextBlock) {
                    if (existingNextBlock.type === BLOCK_TYPES.END) {
                         alert("This response is already connected to an End Flow. You can edit the existing End Flow block.");
                         handleBlockClick(existingNextBlock.id); // Open settings for existing End block
                         return prevBlocks;
                    } else {
                        alert(`This response is already connected to a '${existingNextBlock.type}' block. To connect to a new End Flow, please remove the existing connection first.`);
                        return prevBlocks;
                    }
                }
            }


            const endSidebarItem = sidebarItems.find(item => item.type === BLOCK_TYPES.END);
            if (!endSidebarItem) {
                alert("Configuration error: End block type is missing.");
                return prevBlocks;
            }

            const responseNode = blockElementRefs.current.get(responseBlockId);
            const newEndX = responseBlock.position.x; 
            const newEndY = responseBlock.position.y + (responseNode ? responseNode.offsetHeight : BLOCK_HEIGHT_ESTIMATE) + VERTICAL_GAP;

            const newEndBlock = {
                id: uuidv4(),
                type: BLOCK_TYPES.END,
                label: `End Flow`, 
                icon: endSidebarItem.icon,
                position: {
                    x: Math.max(10, newEndX),
                    y: Math.max(10, newEndY),
                },
                color: endSidebarItem.color,
                iconColor: endSidebarItem.iconColor,
                settings: {
                    title: `End Flow from "${responseBlock.settings?.title || 'Response'}"`,
                    options: [], 
                },
            };

            responseBlock.settings = {
                ...(responseBlock.settings || {}),
                nextBlockId: newEndBlock.id,
            };
            
            let blocksToReturn = [...prevBlocks];
            blocksToReturn[responseBlockIndex] = responseBlock; 
            blocksToReturn = [...blocksToReturn, newEndBlock]; 
            
            setTimeout(() => { 
                setEditingBlockId(newEndBlock.id);
                setIsSettingsModalOpen(true);
            }, 0);

            return blocksToReturn;
        });
    }, [sidebarItems, blockElementRefs, handleBlockClick]); 

    // --- API Call Wrappers ---
    // These seem mostly okay, but ensure they align with your Authapi.js and backend.
    // The key is that `payload.id` should be `block.settings.backendId`.
    // And `flowId` must be correctly passed.

    const callTriggerApi = useCallback(async (payload) => {
        // When saving, payload should include `id: settings.backendId` if updating
        
        const apiPayload = { 
            ...payload, // This will include title, type, keywords, message, and potentially id (backendId)
            flowId: payload.flowId || flowId, // Ensure flowId is included
        };
        // Remove client-side properties not expected by backend if any were passed in payload
        // delete apiPayload.keyword; // API expects 'keywords' (array) not 'keyword' (string)
        
        try {
            const response = await Authapi.trigger(apiPayload); // Authapi.trigger should handle POST/PUT
            if (response?.success && response.data) {
                if (!flowId && response.data.flowId) { // If flow was created by this trigger save
                    setFlowId(response.data.flowId); // Update main flowId state
                }
                if (response.data.id) setTriggerBlockBackendId(response.data.id);

                // Standardize response to be used for UI settings update
                const combinedKeywords = [
                    ...(response.data.keywords || []),
                    ...(response.data.keyword && typeof response.data.keyword === 'string' ? [response.data.keyword] : []), // Handle if API sometimes returns single keyword
                ].filter((kw, index, self) => kw && self.indexOf(kw) === index);

                return {
                    backendId: response.data.id,
                    flowId: response.data.flowId || flowId, // Persist flowId
                    type: response.data.type || 'keyword',
                    keywords: combinedKeywords, // Ensure it's an array
                    keyword: combinedKeywords.join(', '), // For UI consistency
                    title: response.data.title || `Trigger - ${response.data.type ? response.data.type.charAt(0).toUpperCase() + response.data.type.slice(1) : 'Keyword'}`,
                    message: response.data.message,
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving trigger');
            }
        } catch (error) { console.error("Exception in callTriggerApi:", error); return null; }
    }, [flowId, setFlowId]); // Added setFlowId

    const callOptionBlockApi = useCallback(async (payload) => {
        // payload should include: id (backendId for update), flowId, title, triggerBlockId
        const apiPayload = { 
            ...payload, // title, and potentially id (backendId for update)
            flowId, 
            ...(triggerBlockBackendId && { triggerBlockId: triggerBlockBackendId }) 
        };
        try {
            const response = await Authapi.postoptionBlock(apiPayload); // POST /option-blocks
            if (response?.success && response.data?.id) {
                setcallOptionBlockApi1(response.data.id); // Cache backend ID for response block's parent
                return { 
                    backendId: response.data.id, 
                    title: response.data.title,
                    // API may return other fields like triggerBlockId, flowId
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving option block container');
            }
        } catch (error) { console.error("Exception in callOptionBlockApi:", error); return null; }
    }, [flowId, triggerBlockBackendId]);
    
    const callEachOptionApi = useCallback(async (optionBlockBackendId, optionPayload) => {
        // optionPayload should include: id (backendId for update), label, responseBlockId (if linked)
        try {
            // Authapi.posteachOption should make: POST /option-blocks/{optionBlockId}/options
            // or PUT /option-blocks/{optionBlockId}/options/{optionId} if your API supports that for updates
            // For now, assuming POST handles create/update based on presence of optionPayload.id
            const response = await Authapi.posteachOption(optionBlockBackendId, optionPayload); 
            if (response?.success && response.data) {
                return response.data; // Expects { id, label, responseBlockId, ... }
            } else {
                throw new Error(response?.error || `Failed to save option: ${optionPayload.label}`);
            }
        } catch (error) { console.error("Exception in callEachOptionApi:", error); throw error; }
    }, []);

    const callResponseApi = useCallback(async (payload) => {
        // payload should include: id (backendId for update), flowId, optionBlockId (parent), text, title, options (quick replies), eachOptionId (source option backendId), endBlockId
        
        // Ensure optionBlockId is included if it exists, even if not directly in payload
        // The 'callOptionBlockApi1' state seems to capture the optionBlock backend ID when an Option block is saved.
        // This is then used by subsequently saved Response blocks if they are children of that Option block.
        // This might be fragile if order of operations is not guaranteed or if editing an existing complex flow.
        // A more robust way: find parent Option block from `sourceOptionInfo.optionBlockId` (client ID), then get its backendID.
        
        const apiPayload = { 
            ...payload, // text, title, options (quick replies), and potentially id (backendId)
            flowId,
            // optionBlockId: payload.optionBlockId || callOptionBlockApi1, // Prioritize explicit, fallback to cached
            // eachOptionId: payload.eachOptionId,
            // endBlockId: payload.endBlockId
        };
         try {
            const response = await Authapi.responseBlock(apiPayload); // POST /response-blocks
            if (response?.success && response.data) {
                return { // Standardize response for UI update
                    backendId: response.data.id,
                    responseText: response.data.text || '',
                    title: response.data.title, 
                    options: response.data.options || [], // Quick replies
                    // API might also return flowId, optionBlockId, eachOptionId, endBlockId
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving response block');
            }
        } catch (error) { console.error("Exception in callResponseApi:", error); return null; }
    }, [flowId/*, callOptionBlockApi1 */]); // Removed callOptionBlockApi1, should be passed in payload

    const callEndApi = useCallback(async (payload) => {
        // payload: id (backendId for update), title, options (array of {label}), flowId, responseBlockId (source)
        const apiPayload = { 
            ...payload, // title, options, and potentially id (backendId)
            flowId,
            // responseBlockId: payload.responseBlockId
        }; 
        try {
            const response = await Authapi.endBlock(apiPayload); // POST /end-blocks
            if (response?.success && response.data) {
                return { // Standardize response
                    backendId: response.data.id,
                    title: response.data.title || '',
                    options: response.data.options ? response.data.options.map(opt => opt.label) : [], // Assuming API returns [{label: "..."}]
                    // API might also return flowId, responseBlockId
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving end block');
            }
        } catch (error) { console.error("Exception in callEndApi:", error); return null; }
    }, [flowId]);
    
    const handleSaveSettings = useCallback(async (blockClientId, newSettingsFromModal) => {

        const blockIndex = blocks.findIndex(b => b.id === blockClientId);
        if (blockIndex === -1) {  return; }

        const blockBeingEdited = blocks[blockIndex];
        const originalSettings = JSON.parse(JSON.stringify(blockBeingEdited.settings || {})); // Deep copy
        const blockType = blockBeingEdited.type;

        // Merge: Start with original, overlay with modal changes
        let mergedSettingsForUI = { ...originalSettings, ...newSettingsFromModal };
        
        // Special handling for OPTIONS block's 'options' array from modal
        // Modal might send array of strings for labels, need to convert to objects {id, backendId, label, nextBlockId}
        if (blockType === BLOCK_TYPES.OPTIONS && newSettingsFromModal.options) {
            if (Array.isArray(newSettingsFromModal.options) && newSettingsFromModal.options.every(opt => typeof opt === 'string')) {
                // If modal sent simple array of labels
                mergedSettingsForUI.options = newSettingsFromModal.options.map((label, index) => {
                    const existingOpt = (originalSettings.options || [])[index]; // Try to match by index if structure is simple
                    const existingOptByLabel = (originalSettings.options || []).find(o => o.label === label);

                    if (existingOptByLabel) { // Prefer matching by label if it exists and is being re-ordered/kept
                        return { ...existingOptByLabel, label };
                    }
                    if (existingOpt) { // Fallback to index based, useful for new items preserving some order
                         return { ...existingOpt, id: existingOpt.id || uuidv4(), label }; // Keep existing ID and backendId
                    }
                    // New option
                    return { id: uuidv4(), label, nextBlockId: null, backendId: null };
                });
            } else if (Array.isArray(newSettingsFromModal.options) && newSettingsFromModal.options.every(opt => typeof opt === 'object' && opt.hasOwnProperty('label'))) {
                // If modal sent array of option objects (e.g. {label: "...", id: "...", backendId: "..."})
                 mergedSettingsForUI.options = newSettingsFromModal.options.map(modalOpt => {
                    const originalOpt = (originalSettings.options || []).find(o => o.id === modalOpt.id || o.backendId === modalOpt.backendId);
                    return {
                        id: originalOpt?.id || modalOpt.id || uuidv4(),
                        backendId: originalOpt?.backendId || modalOpt.backendId || null,
                        label: modalOpt.label,
                        nextBlockId: originalOpt?.nextBlockId || modalOpt.nextBlockId || null,
                    };
                });
            }
        }

        // Update UI optimistically
        setBlocks(currentBlocks => currentBlocks.map(b =>
            b.id === blockClientId ? { ...b, settings: mergedSettingsForUI } : b
        ));
        handleCloseSettingsModal(); 

        let apiSuccess = true;
        let overallApiError = null;
        let savedDataFromApi = null; // To store { backendId, title, ... } from API response
        let currentFlowIdForAPI = flowId; // Use a local variable for flowId within this save operation

        if (!currentFlowIdForAPI && blockType !== BLOCK_TYPES.TRIGGER) {
            apiSuccess = false; 
            overallApiError = "Flow ID is missing. Save the Trigger block or set a flow title first to initialize the flow.";
        }
        
        if (apiSuccess) {
            try {
                if (blockType === BLOCK_TYPES.TRIGGER) {
                    const triggerPayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        type: mergedSettingsForUI.type?.toLowerCase() || 'keyword',
                        keywords: Array.isArray(mergedSettingsForUI.keywords) ? mergedSettingsForUI.keywords : (mergedSettingsForUI.keyword ? mergedSettingsForUI.keyword.split(',').map(k=>k.trim()).filter(Boolean) : []),
                        title: mergedSettingsForUI.title, 
                        message: mergedSettingsForUI.message || "Trigger initiated",
                        flowId: currentFlowIdForAPI, // Pass currentFlowId, could be null for new trigger
                    };
                    savedDataFromApi = await callTriggerApi(triggerPayload);
                    if (savedDataFromApi === null) throw new Error("Failed to save trigger settings via API.");
                    if (savedDataFromApi.flowId && !flowId) { // If flowId was created/returned
                        setFlowId(savedDataFromApi.flowId); // Update main flowId state
                        currentFlowIdForAPI = savedDataFromApi.flowId; // Update local for subsequent saves in this function
                    }
                     if (savedDataFromApi.backendId) setTriggerBlockBackendId(savedDataFromApi.backendId);
                }
                else if (blockType === BLOCK_TYPES.OPTIONS) {
                    if (!currentFlowIdForAPI) throw new Error("Cannot save Options block: Flow ID is missing.");
                    if (!triggerBlockBackendId && blocks.some(b => b.type === BLOCK_TYPES.TRIGGER)) {
                         // This condition can happen if trigger exists on UI but its save failed or its backendId isn't set yet.
                         // It's a dependency for OptionBlock on backend.
                        throw new Error("Cannot save Options block: Trigger block is not yet saved or its ID is missing.");
                    }
                    const optionBlockPayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }), // Option Block's backendId
                        flowId: currentFlowIdForAPI,
                        title: mergedSettingsForUI.title || `Options Block`,
                        triggerBlockId: triggerBlockBackendId, 
                    };
                    const blockSaveResult = await callOptionBlockApi(optionBlockPayload);
                    if (!blockSaveResult?.backendId) throw new Error("Failed to save option block container.");
                    
                    const savedOptionBlockBackendId = blockSaveResult.backendId;
                    let finalApiOptionsFromSave = []; // Store results of saving each option

                    const optionsToSaveInUI = mergedSettingsForUI.options || []; // These are {id, backendId, label, nextBlockId}
                    if (optionsToSaveInUI.length > 0) {
                        const optionSavePromises = optionsToSaveInUI.map(async (uiOpt) => {
                            // Find linked response block's backendId
                            const linkedResponseBlock = blocks.find(b => b.id === uiOpt.nextBlockId);
                            const linkedResponseBackendId = linkedResponseBlock?.settings?.backendId;
                            
                            const eachOptionApiPayload = {
                                ...(uiOpt.backendId && { id: uiOpt.backendId }), // Option's own backendId for update
                                label: uiOpt.label.trim(),
                                ...(linkedResponseBackendId && { responseBlockId: linkedResponseBackendId }), 
                            };
                            // API call to save/update this individual option
                            const savedOptData = await callEachOptionApi(savedOptionBlockBackendId, eachOptionApiPayload);
                            return { ...uiOpt, ...savedOptData }; // Merge UI data with API response (which includes new backendId for new options)
                        });
                        const savedOptionsResults = await Promise.allSettled(optionSavePromises);
                        
                        savedOptionsResults.forEach((result, index) => {
                            const originalUiOpt = optionsToSaveInUI[index];
                            if (result.status === 'fulfilled' && result.value) {
                                finalApiOptionsFromSave.push(result.value); // Contains client id, backendId, label, nextBlockId (client)
                            } else {
                                overallApiError = (overallApiError ? overallApiError + "; " : "") + (result.reason?.message || `Error saving option: ${originalUiOpt.label}`);
                                finalApiOptionsFromSave.push({ ...originalUiOpt, saveError: true }); // Mark error on this option
                            }
                        });
                    }
                    // This savedDataFromApi is for the Option Block container AND its successfully saved options
                    savedDataFromApi = { 
                        backendId: savedOptionBlockBackendId, 
                        title: blockSaveResult.title, 
                        options: finalApiOptionsFromSave // This now includes full option objects from UI merged with API save results
                    };
                }
                else if (blockType === BLOCK_TYPES.RESPONSE) {
                    if (!currentFlowIdForAPI) throw new Error("Cannot save Response block: Flow ID is missing.");
                    
                    let parentOptionBlockBackendId = null;
                    let sourceEachOptionBackendId = null;

                    // Determine parent OptionBlock's backendId and source Option's backendId
                    if (originalSettings.sourceOptionInfo?.optionBlockId) {
                        const parentClientOptBlock = blocks.find(b => b.id === originalSettings.sourceOptionInfo.optionBlockId);
                        parentOptionBlockBackendId = parentClientOptBlock?.settings?.backendId;
                        if (parentOptionBlockBackendId && originalSettings.sourceOptionInfo.optionId) {
                            const sourceClientOpt = parentClientOptBlock?.settings?.options?.find(o => o.id === originalSettings.sourceOptionInfo.optionId);
                            sourceEachOptionBackendId = sourceClientOpt?.backendId;
                        }
                    }
                     if (!parentOptionBlockBackendId && callOptionBlockApi1){ // Fallback, less reliable
                        parentOptionBlockBackendId = callOptionBlockApi1;
                     }


                    const responsePayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        flowId: currentFlowIdForAPI,
                        ...(parentOptionBlockBackendId && { optionBlockId: parentOptionBlockBackendId }),
                        ...(sourceEachOptionBackendId && { eachOptionId: sourceEachOptionBackendId }),
                        text: mergedSettingsForUI.responseText || '',
                        title: mergedSettingsForUI.title, 
                        options: mergedSettingsForUI.options || [], // Quick replies (array of strings)
                        ...(mergedSettingsForUI.nextBlockId && (() => { // If connected to an End block
                            const nextBlock = blocks.find(b => b.id === mergedSettingsForUI.nextBlockId);
                            if (nextBlock && nextBlock.type === BLOCK_TYPES.END && nextBlock.settings?.backendId) {
                                return { endBlockId: nextBlock.settings.backendId };
                            }
                            return {};
                        })()),
                    };
                    savedDataFromApi = await callResponseApi(responsePayload);
                    if (savedDataFromApi === null) throw new Error("Failed to save response block via API.");
                }
                else if (blockType === BLOCK_TYPES.END) {
                    if (!currentFlowIdForAPI) throw new Error("Cannot save End block: Flow ID is missing.");
                    
                    let sourceResponseBackendId = null;
                    // Find the Response block that connects to this End block
                    const predecessorResponse = blocks.find(b => b.type === BLOCK_TYPES.RESPONSE && b.settings?.nextBlockId === blockClientId);
                    if (predecessorResponse?.settings?.backendId) {
                        sourceResponseBackendId = predecessorResponse.settings.backendId;
                    }

                    const endPayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        title: mergedSettingsForUI.title || '',
                        // API expects options as [{label: "string"}]
                        options: (mergedSettingsForUI.options || []).map(optStr => ({ label: optStr.trim() })).filter(opt => opt.label),
                        flowId: currentFlowIdForAPI,
                        ...(sourceResponseBackendId && { responseBlockId: sourceResponseBackendId }), 
                    };
                    savedDataFromApi = await callEndApi(endPayload);
                    if (savedDataFromApi === null) throw new Error("Failed to save end block via API.");
                }
            } catch (error) {
                apiSuccess = false;
                overallApiError = (overallApiError ? overallApiError + "; " : "") + (error.message || "Error during API save operation.");
            }
        }

        if (!apiSuccess) {
            // Revert UI to original settings on failure
            setBlocks(currentBlocks => 
                currentBlocks.map(b => b.id === blockClientId ? { ...b, settings: originalSettings } : b)
            );
            alert(`Error saving settings for ${blockType}: ${overallApiError || 'Please try again.'}`);
        } else if (savedDataFromApi && typeof savedDataFromApi === 'object') {
            // Successfully saved to API, update UI block's settings with API response
            // This ensures backendId is set for new blocks/options, and any transformations by API are reflected
            setBlocks(currentBlocks => 
                currentBlocks.map(b => {
                    if (b.id === blockClientId) {
                        let finalUpdatedSettings = {
                            ...mergedSettingsForUI, // UI changes from modal
                            backendId: savedDataFromApi.backendId || originalSettings.backendId, // Prioritize new/updated backendId
                            title: savedDataFromApi.title !== undefined ? savedDataFromApi.title : mergedSettingsForUI.title,
                        };

                        if (blockType === BLOCK_TYPES.TRIGGER) {
                            finalUpdatedSettings.type = savedDataFromApi.type || mergedSettingsForUI.type;
                            finalUpdatedSettings.keywords = savedDataFromApi.keywords || mergedSettingsForUI.keywords;
                            finalUpdatedSettings.keyword = savedDataFromApi.keyword || mergedSettingsForUI.keyword;
                            finalUpdatedSettings.message = savedDataFromApi.message !== undefined ? savedDataFromApi.message : mergedSettingsForUI.message;
                        } else if (blockType === BLOCK_TYPES.OPTIONS && Array.isArray(savedDataFromApi.options)) {
                            // savedDataFromApi.options should be the array of option objects {id (client), backendId, label, nextBlockId (client)}
                            // Ensure these are correctly structured after API save.
                            finalUpdatedSettings.options = savedDataFromApi.options;
                        } else if (blockType === BLOCK_TYPES.RESPONSE) {
                            finalUpdatedSettings.responseText = savedDataFromApi.responseText !== undefined ? savedDataFromApi.responseText : mergedSettingsForUI.responseText;
                            finalUpdatedSettings.options = savedDataFromApi.options || mergedSettingsForUI.options; // Quick replies
                        } else if (blockType === BLOCK_TYPES.END) {
                            finalUpdatedSettings.options = savedDataFromApi.options || mergedSettingsForUI.options; // Array of strings
                        }
                        return { ...b, settings: finalUpdatedSettings };
                    }
                    return b;
                })
            );
        }
    }, [flowId, blocks, handleCloseSettingsModal, triggerBlockBackendId, callOptionBlockApi1, callTriggerApi, callOptionBlockApi, callEachOptionApi, callResponseApi, callEndApi, setFlowId]);


    const handleDeleteBlock = useCallback(async (blockClientIdToDelete) => {
        // ... (existing logic for handleDeleteBlock - ensure it uses backendId for API calls)
        // This function looks mostly okay, but double-check API calls and payload for unlinking.
        if (!window.confirm("Are you sure you want to delete this block and its direct connections? This action cannot be undone.")) {
            return;
        }

        const blockToDelete = blocks.find(b => b.id === blockClientIdToDelete);
        if (!blockToDelete) {
            return;
        }

        const deletedBlockBackendId = blockToDelete.settings?.backendId;

        // 1. API call to delete the block itself from the server
        if (deletedBlockBackendId) {
            try {
                let response;
                // Use specific delete endpoints from Authapi if they exist and are different from the generic one.
                // The current code uses Authapi.deleteTrigger, Authapi.deleteOptionBlock etc. which is good.
                switch (blockToDelete.type) {
                    case BLOCK_TYPES.TRIGGER:  response = await Authapi.deleteTrigger(deletedBlockBackendId); break;
                    case BLOCK_TYPES.OPTIONS:  response = await Authapi.deleteOptionBlock(deletedBlockBackendId); break;
                    case BLOCK_TYPES.RESPONSE: response = await Authapi.deleteResponseBlock(deletedBlockBackendId); break;
                    case BLOCK_TYPES.END:      response = await Authapi.deleteEndBlock(deletedBlockBackendId); break;
                    default: throw new Error(`Unknown block type for server deletion: ${blockToDelete.type}`);
                }
                // Assuming Authapi delete functions return { success: true/false } or throw on HTTP error
                if (response && response.success === false) {
                     throw new Error(response.error || `API Error: Failed to delete ${blockToDelete.type}`);
                }
            } catch (error) {
                // Decide if you want to proceed with UI removal or stop. For now, proceeding with UI removal.
                // return; 
            }
        } else {
        }
        
        const updatePromisesForUnlinking = [];

        // 2. Update frontend state (remove block, unlink connections)
        //    and prepare backend calls to update connections on other blocks.
        const newBlocksState = blocks
            .filter(b => b.id !== blockClientIdToDelete) // Remove the deleted block from UI
            .map(block => { // Iterate over remaining blocks to update their connections
                let currentBlockSettings = { ...(block.settings || {}) };
                let blockToUpdateInUI = { ...block };
                let settingsModifiedForThisBlockUI = false;

                // A. Handle direct `nextBlockId` links (from Trigger or Response) pointing to the deleted block
                if (currentBlockSettings.nextBlockId === blockClientIdToDelete) {
                    currentBlockSettings.nextBlockId = null;
                    settingsModifiedForThisBlockUI = true;

                    // If this block (source of connection) has a backendId, update it on the server
                    if (block.settings?.backendId && flowId) {
                        const payloadForUnlink = { 
                            id: block.settings.backendId, 
                            flowId, 
                            // ...other essential fields for this block type's update API
                        };
                        if (block.type === BLOCK_TYPES.TRIGGER) {
                             payloadForUnlink.type = block.settings.type;
                             payloadForUnlink.keywords = block.settings.keywords;
                             payloadForUnlink.title = block.settings.title;
                             payloadForUnlink.message = block.settings.message;
                             // nextBlockId is implicitly removed or set to null by backend if not sent
                             updatePromisesForUnlinking.push(callTriggerApi(payloadForUnlink).catch(err => console.error(`Backend Unlink Failed (Trigger ${block.id} from deleted):`, err)));
                        } else if (block.type === BLOCK_TYPES.RESPONSE) {
                            payloadForUnlink.title = block.settings.title;
                            payloadForUnlink.text = block.settings.responseText;
                            payloadForUnlink.options = block.settings.options; // quick replies
                            // endBlockId should be set to null if nextBlockId was pointing to an End block
                            // The backend update for Response should handle unsetting its next connection (e.g. endBlockId to null)
                            updatePromisesForUnlinking.push(callResponseApi(payloadForUnlink).catch(err => console.error(`Backend Unlink Failed (Response ${block.id} from deleted):`, err)));
                        }
                    }
                }

                // B. Handle `nextBlockId` within options of an OPTIONS block pointing to the deleted block
                if (block.type === BLOCK_TYPES.OPTIONS && Array.isArray(currentBlockSettings.options)) {
                    let optionsArrayChangedUI = false;
                    const updatedOptionsArrayForUI = currentBlockSettings.options.map(opt => {
                        if (opt.nextBlockId === blockClientIdToDelete) {
                            optionsArrayChangedUI = true;
                            // If this option has a backendId, update it on the server to remove its link
                            if (block.settings?.backendId && opt.backendId) {
                                const optionPayloadForUnlink = { 
                                    id: opt.backendId, // The option's own backendId
                                    label: opt.label, 
                                    responseBlockId: null // API field for linking an option to a response
                                }; 
                                updatePromisesForUnlinking.push(
                                    callEachOptionApi(block.settings.backendId, optionPayloadForUnlink) // Pass parent Option Block's backendId
                                    .catch(err => console.error(`Backend Unlink Failed (Option ${opt.id} in ${block.id} from deleted):`, err))
                                );
                            }
                            return { ...opt, nextBlockId: null }; // Unlink in UI
                        }
                        return opt;
                    });

                    if (optionsArrayChangedUI) {
                        currentBlockSettings.options = updatedOptionsArrayForUI;
                        settingsModifiedForThisBlockUI = true;
                    }
                }
                
                if (settingsModifiedForThisBlockUI) {
                    blockToUpdateInUI.settings = currentBlockSettings;
                }
                return blockToUpdateInUI;
            });

        // Wait for all backend unlinking calls to attempt completion
        if (updatePromisesForUnlinking.length > 0) {
            await Promise.allSettled(updatePromisesForUnlinking);
            // Consider re-fetching the flow or affected blocks if granular updates are complex / error-prone
        }

        setBlocks(newBlocksState); // Apply UI changes (block removed, links updated)

        if (blockToDelete.type === BLOCK_TYPES.TRIGGER) {
            setTriggerBlockBackendId(null); // Clear if the main trigger was deleted
        }

    }, [blocks, flowId, callTriggerApi, callResponseApi, callEachOptionApi, /* Authapi specific delete methods */]);


    const editingBlock = blocks.find(b => b.id === editingBlockId);

    const handleUpdateFlowTitle = async () => {
        // ... (logic for updating flow title - ensure flowId is used for updates)
        if (!flowTitle.trim()) {
            alert("Flow title cannot be empty.");
            // Optionally revert to a previous title if you store it, or fetch again
            return;
        }
        let currentFlowIdForSave = flowId; // Use current flowId state

        if (!currentFlowIdForSave) { // If no flowId, this is likely a new flow, create it
            try {
                // Ensure 'clientId' is available or handled by backend if not provided
                // const clientId = "YOUR_CLIENT_ID"; // This should be dynamic
                const response = await Authapi.postflows({ name: flowTitle, description: "Flow created via title update" /*, clientId */ });
                if (response && response.success && response.data?.id) {
                    setFlowId(response.data.id); // Set the new flowId in state
                    currentFlowIdForSave = response.data.id; // Use new ID for subsequent logic
                    // No alert needed, title is set
                } else {
                    return; 
                }
            } catch (error) {
                return; 
            }
        } else { // Existing flow, update its title
            try {
                const response = await Authapi.updateFlow(currentFlowIdForSave, { name: flowTitle }); 
                 if (!response.success) {
                    // Optionally revert title in UI or re-fetch
                 } else {
                    // No alert needed, UI already reflects the change due to onBlur
                 }
            } catch (error) {
            }
        }
    };
    
    const handlePublishFlow = async () => {
        // ... (logic for publishing flow - ensure flowId and isActive are used)
        // This should likely be a "Save All and Publish" action.
        // It means ensuring all current block configurations are persisted to the backend
        // before calling the publish/activate endpoint.
        // A comprehensive "Save All" is complex and might involve iterating all blocks and calling their save logic.
        // For now, let's assume individual saves are done, and this just toggles `isActive`.
        if (!flowId) {
            alert("Cannot publish: Flow is not saved yet. Please set a title or save a block first.");
            return;
        }
        if (blocks.length === 0 && flowId) { // Allow publishing an empty flow if it has an ID (e.g. to deactivate)
        } else if (blocks.length === 0) {
             alert("Cannot publish: Flow has no blocks and is not yet saved.");
             return;
        }

        
        try {
            // The API to "publish" might be the same as updating the flow's `isActive` status
            // Or a specific /publish endpoint. Your `Authapi.toggleFlowStatus` seems relevant.
            // Let's use `Authapi.updateFlow` if it can handle `isActive` flag, or `toggleFlowStatus`.
            
            // Option 1: Use a general updateFlow endpoint
            // const response = await Authapi.updateFlow(flowId, { name: flowTitle, isActive: isActive /*, other flow metadata */ });

            // Option 2: Use the existing toggleFlowStatus (more specific)
            // Note: toggleFlowStatus expects an "action" ("activate" or "deactivate")
            const action = isActive ? "activate" : "deactivate";
            const response = await Authapi.toggleFlowStatus(flowId, action);


           
        } catch (error) {
        }
    };

    const topbadrdata = {
        title: '', // Current page title can be dynamic
        Routertitle: 'Admin Settings',
        Router: '/AdminSettings',
        Routertitle1: 'Auto Response',
        Router1: '/AutoResponse',
        Routertitle2: flowId ? 'Edit Flow' : 'Create Flow', // Dynamic based on context
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full font-Poppins bg-[#F6F8FA]">
                <p className="text-lg">Loading Flow Editor...</p> {/* Replace with a spinner/skeleton */}
            </div>
        );
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <div className="flex p-3 flex-col h-screen bg-[#F6F8FA] w-full font-Poppins overflow-hidden">
                <Topbar topbadrdata={topbadrdata} />

                <div className="bg-white shadow-sm p-3 flex justify-between items-center flex-shrink-0 border-b border-gray-200 z-20">
                    <input
                        type="text" value={flowTitle} onChange={(e) => setFlowTitle(e.target.value)}
                        onBlur={handleUpdateFlowTitle} // Save title on blur
                        className="text-base font-medium border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Untitled Flow"
                    />
                    <div className="flex items-center space-x-4">
                        <label htmlFor="flow-active-toggle" className="flex items-center cursor-pointer select-none">
                            <span className="mr-2 text-sm text-gray-700">Active</span>
                            <div className="relative">
                                <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} className="sr-only peer" id="flow-active-toggle" />
                                <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner peer-checked:bg-blue-500 transition-colors"></div>
                                <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow transition-transform transform peer-checked:translate-x-[0.95rem] sm:peer-checked:translate-x-[1.125rem]"></div> {/* Adjusted translate for better look */}
                            </div>
                        </label>
                        <button type="button" className="px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors" onClick={() => { setPreview(true); }}
                        > Preview </button>
                        <button
                            type="button"
                            className="px-4 py-1.5 border border-transparent rounded text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!flowId} // Enable if flowId exists, implying it can be saved/published
                            onClick={handlePublishFlow}
                        >
                            Save & Publish
                        </button>
                    </div>
                </div>

                <div className="flex flex-grow overflow-hidden w-full">
                    {/* Sidebar */}
                    <div className="w-60 bg-white p-4 border-r border-gray-200 flex-shrink-0 overflow-y-auto z-10">
                        <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">Block Types</h2>
                        {sidebarItems.map(item => <DraggableSidebarItem key={item.id} {...item} />)}
                    </div>

                    {/* Canvas Area */}
                    <div ref={canvasContainerRef} className="flex-grow overflow-auto relative bg-white"> {/* Ensure overflow-auto for scrolling */}
                        <Canvas blocks={blocks}>
                            {blocks.map((block) => (
                                <FlowBlock
                                    key={block.id} // Client-side ID
                                    {...block} // Includes id, type, label, icon, position, color, iconColor
                                    ref={(node) => { // For measuring node dimensions for arrows
                                        if (node) blockElementRefs.current.set(block.id, node);
                                        else blockElementRefs.current.delete(block.id);
                                    }}
                                    settings={block.settings || {}} // Pass full settings object
                                    onEditRequest={handleBlockClick}
                                    onConnectOptionRequest={block.type === BLOCK_TYPES.OPTIONS ? handleConnectOption : undefined}
                                    onDeleteRequest={handleDeleteBlock}
                                    onConnectToEndRequest={block.type === BLOCK_TYPES.RESPONSE ? handleConnectToEnd : undefined}
                                />
                            ))}
                        </Canvas>
                        {/* Arrows are drawn on top of the Canvas content */}
                        {arrowsToRender.map(arrow => (
                            <Arrow key={arrow.id} fromPos={arrow.fromPos} toPos={arrow.toPos} type={arrow.arrowType} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay dropAnimation={null}>
                 {activeDragId && activeDragData ? (
                    (() => {
                        const { icon: IconComponent, color, iconColor, label, type, settings: dragDataSettings, isSidebarItem } = activeDragData;
                        let displayLabel = label || type;
                        let currentSettings = dragDataSettings || {};

                        // If dragging an existing block, use its current title from settings
                        if (!isSidebarItem) {
                            const currentBlock = blocks.find(b => b.id === activeDragId);
                            currentSettings = currentBlock?.settings || dragDataSettings || {};
                            displayLabel = currentSettings.title || label || type;
                        } else { // For sidebar items, use default label or title from initial settings if any
                            displayLabel = currentSettings.title || label || type;
                        }

                        const overlayBaseStyle = `p-3 rounded shadow-lg flex items-center opacity-95 pointer-events-none border`;
                        const minWidthStyle = 'min-w-[220px]'; // Consistent with FlowBlock minWidth
                        let specificStyle = '', specificIconColor = iconColor || 'text-gray-600', specificTextColor = '';

                        // Apply styles based on block type, similar to FlowBlock
                        if (type === BLOCK_TYPES.TRIGGER) {
                            specificStyle = `border-blue-200 bg-blue-50 text-gray-800 rounded-xl`;
                            specificIconColor = 'text-blue-500'; specificTextColor = 'text-gray-800 font-semibold';
                        } else if (type === BLOCK_TYPES.OPTIONS) {
                            specificStyle = `border-orange-200 bg-orange-50 text-gray-800 rounded-xl`;
                            specificIconColor = 'text-orange-500'; specificTextColor = 'text-gray-800';
                        } else if (type === BLOCK_TYPES.RESPONSE) {
                            specificStyle = `border-green-200 bg-green-50 text-gray-800 rounded-xl`;
                            specificIconColor = 'text-green-500'; specificTextColor = 'text-gray-800';
                        } else if (type === BLOCK_TYPES.END) {
                            specificStyle = `border-red-300 bg-red-50 text-gray-800 rounded-xl`; 
                            specificIconColor = 'text-red-500'; specificTextColor = 'text-gray-800';
                        } else if (isSidebarItem) { // Generic sidebar item style if not a specific block type
                            specificStyle = `border-gray-300 ${color || 'bg-gray-100'} rounded`;
                            specificTextColor = color ? color.split(' ').find(c => c.startsWith('text-')) || 'text-gray-700' : 'text-gray-700';
                        } else { // Fallback for blocks already on canvas if type isn't matched (should use above)
                            const block = blocks.find(b => b.id === activeDragId);
                            const blockColorName = block?.color?.replace('bg-', '').split('-')[0] || 'gray';
                            const blockIconColorName = block?.iconColor?.replace('text-', '').split('-')[0] || 'gray';
                            specificStyle = `border-${blockIconColorName}-300 bg-${blockColorName}-50 rounded-xl`;
                            specificIconColor = block?.iconColor || 'text-gray-500';
                            specificTextColor = `text-gray-800`;
                        }

                        return (
                            <div className={`${overlayBaseStyle} ${minWidthStyle} ${specificStyle}`}>
                                {IconComponent && <IconComponent className={`mr-2 text-lg flex-shrink-0 ${specificIconColor}`} />}
                                <span className={`text-sm font-medium flex-grow ${specificTextColor} truncate`} title={displayLabel}>{displayLabel}</span>
                                {/* Optional: Add visual cues like connection points for specific blocks in overlay */}
                                {type === BLOCK_TYPES.TRIGGER && (
                                    <div className="ml-auto flex-shrink-0 self-center opacity-50">
                                        <IoChevronForwardCircleOutline className="text-blue-500 text-3xl" />
                                    </div>
                                )}
                                {type === BLOCK_TYPES.OPTIONS && (isSidebarItem || (currentSettings.options && currentSettings.options.length > 0)) && (
                                    <div className="ml-auto flex-shrink-0 self-center opacity-70"> {/* Visual cue for options output */}
                                         <div className="w-5 h-5 bg-orange-300 rounded-full flex items-center justify-center shadow">
                                            <LuListTree className="text-white w-3 h-3"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()
                ) : null}
            </DragOverlay>

            {/* Customer Support Preview Modal */}
            {
                preview && (<CustomerSupport flowid={flowId} onClose={() => setPreview(false)} />)
            }

            {/* Settings Modals */}
            <div className="relative z-50"> {/* Ensure modals are on top */}
                {isSettingsModalOpen && editingBlock && (
                    <Fragment>
                        {editingBlock.type === BLOCK_TYPES.TRIGGER && <TriggerSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                        {editingBlock.type === BLOCK_TYPES.OPTIONS && <OptionSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {options: []}} />} {/* Pass initial options */}
                        {editingBlock.type === BLOCK_TYPES.RESPONSE && <ResponseSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                        {editingBlock.type === BLOCK_TYPES.END && <EndSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                    </Fragment>
                )}
            </div>
        </DndContext>
    );
};
// --- FlowBlock, DraggableSidebarItem, Canvas, Arrow Components ---
// These component definitions from your original code should be placed here if not already.
// Make sure FlowBlock's rendering logic for options, trigger details, etc.,
// correctly uses the structure of `block.settings` as populated by `transformApiFlowToEditorState`
// and updated by `handleSaveSettings`. The provided FlowBlock seems generally compatible.
const CustomChevronRightIcon = () => ("" );
const DraggableSidebarItem = ({ id, type, label, icon: IconComponent, color, iconColor }) => { /* ... as provided ... */ };
const FlowBlock = React.forwardRef(({ id, type, label, icon: IconComponent, position, color, iconColor, settings, onEditRequest, onConnectOptionRequest, onDeleteRequest, onConnectToEndRequest }, ref) => { /* ... as provided ... */ });
FlowBlock.displayName = "FlowBlock";
const Canvas = ({ children, blocks }) => { /* ... as provided ... */ };
const Arrow = ({ fromPos, toPos, type }) => { /* ... as provided ... */ };


export default EditAutoCreateFlow;
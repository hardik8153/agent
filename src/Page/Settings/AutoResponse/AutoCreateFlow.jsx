import React, { useState, useEffect, useRef, Fragment, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
    useDraggable,
    useDroppable,
} from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Authapi from '@/Server/Authapi'; 
import { LuMousePointerClick, LuListTree, LuMessageSquare, LuTrash2, LuTrash } from "react-icons/lu"; 
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import Topbar from '@/components/Topbar';

import TriggerSettingsModal from '@/components/modals/TriggerSettingsModal';
import OptionSettingsModal from '@/components/modals/OptionSettingsModal';
import ResponseSettingsModal from '@/components/modals/ResponseSettingsModal';
import EndSettingsModal from '@/components/modals/EndSettingsModal';
import CustomerSupport from './CustomerSupport';

const BLOCK_TYPES = {
    TRIGGER: 'Trigger',
    OPTIONS: 'Options',
    RESPONSE: 'Response',
    END: 'End',
};

const CANVAS_ID = 'canvas-droppable';

const BLOCK_WIDTH_ESTIMATE = 220;
const HORIZONTAL_GAP = 80;
const BLOCK_HEIGHT_ESTIMATE = 120;
const VERTICAL_GAP = 100;
const INITIAL_X_OFFSET = 70;
const INITIAL_Y_OFFSET = 80;
const AVERAGE_OPTION_ITEM_HEIGHT = 32;

const CustomChevronRightIcon = () => (
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const DraggableSidebarItem = ({ id, type, label, icon: IconComponent, color, iconColor }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { type, label, icon: IconComponent, color, iconColor, isSidebarItem: true },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
        opacity: isDragging ? 0.5 : 1,
    } : undefined;

    const itemBaseStyle = `p-3 mb-3 rounded border border-gray-200 flex items-center cursor-grab hover:shadow-md transition-shadow ${color}`;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={itemBaseStyle}>
            {IconComponent && <IconComponent className={`mr-3 text-xl ${iconColor}`} />}
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
};


const FlowBlock = React.forwardRef(({ id, type, label, icon: IconComponent, position, color, iconColor, settings, onEditRequest, onConnectOptionRequest, onDeleteRequest, onConnectToEndRequest }, ref) => { 
    const { attributes, listeners, setNodeRef: dndSetNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { id, type, label, icon: IconComponent, isSidebarItem: false, settings },
    });

    const combinedRef = (node) => {
        dndSetNodeRef(node);
        if (ref) {
            if (typeof ref === 'function') {
                ref(node);
            } else {
                ref.current = node;
            }
        }
    };
    
    const bgColorName = color ? color.replace('bg-', '').split('-')[0] : 'gray';
    const borderColorName = iconColor ? iconColor.replace('text-', '').split('-')[0] : 'gray';

    const baseBgColor = type === BLOCK_TYPES.TRIGGER ? 'bg-blue-50' :
        type === BLOCK_TYPES.OPTIONS ? 'bg-orange-50' :
        type === BLOCK_TYPES.RESPONSE ? 'bg-green-50' :
        type === BLOCK_TYPES.END ? 'bg-red-50' :
            `bg-${bgColorName}-50`;

    const baseTextColor = 'text-gray-800'; 

    const baseBorderColor = type === BLOCK_TYPES.TRIGGER ? 'border-blue-200' :
        type === BLOCK_TYPES.OPTIONS ? 'border-orange-200' :
        type === BLOCK_TYPES.RESPONSE ? 'border-green-200' :
        type === BLOCK_TYPES.END ? 'border-red-200' :
            `border-${borderColorName}-300`;

    const dynamicStyle = {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 110 : 10, 
        cursor: isDragging ? 'grabbing' : 'grab',
        minWidth: '220px',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '12px',
        paddingRight: '12px',
    };

    const blockBaseStyle = `rounded-xl shadow-md flex items-start border ${baseBorderColor} ${baseBgColor} ${baseTextColor} relative`;

    const renderContent = () => {
        const blockTitle = settings?.title || label || type;

        if (type === BLOCK_TYPES.TRIGGER) {
            const triggerTypeName = (settings?.type ? settings.type.charAt(0).toUpperCase() + settings.type.slice(1) : 'Keyword');
            const allKeywords = [
                ...(settings?.keywords || []),
                ...(settings?.keyword && typeof settings.keyword === 'string' ? settings.keyword.split(',').map(kw => kw.trim()) : []),
                ...(settings?.keyword && Array.isArray(settings.keyword) ? settings.keyword : [])
            ].filter((kw, index, self) => kw && self.indexOf(kw) === index);

            const keywordsDisplay = allKeywords.join(', ');
            const displayTitle = settings?.title || `Trigger Type - ${triggerTypeName}`;

            return (
                <div className="flex items-start justify-between w-full">
                    <div className="flex-grow mr-2 overflow-hidden">
                        <span className="text-base font-semibold block text-gray-800 truncate" title={displayTitle}>
                            {displayTitle}
                        </span>
                        <hr className="my-1.5 border-t border-gray-300" />
                        {keywordsDisplay ? (
                            <span className="text-sm text-blue-600 block break-words" title={keywordsDisplay}>
                                {keywordsDisplay}
                            </span>
                        ) : (
                            <span className="text-sm text-gray-400 italic block">Click to configure trigger...</span>
                        )}
                    </div>
                    <div className="ml-auto flex-shrink-0 self-start pt-0.5">
                        <IoChevronForwardCircleOutline className="text-blue-500 text-3xl" />
                    </div>
                </div>
            );
        } else if (type === BLOCK_TYPES.OPTIONS) {
            const displayTitle = settings?.title || `Options`;
            const optionsList = (settings?.options || []).filter(opt => opt && typeof opt.label === 'string' && opt.label.trim() !== '');

            return (
                <div className="flex flex-col w-full">
                     <div className="flex items-center mb-1.5">
                        <span className="text-sm font-medium text-gray-800 flex-grow truncate" title={displayTitle}>
                            {displayTitle}
                        </span>
                    </div>
                    {optionsList.length > 0 ? (
                        <div className="mt-1 space-y-1.5">
                            {optionsList.map((option, index) => (
                                <div key={option.id || index} className="flex items-center justify-between group py-0.5 pr-1">
                                    <span className="text-sm text-orange-600 break-words flex-grow mr-2" title={option.label}>
                                        {option.label}
                                    </span>
                                    <IoChevronForwardCircleOutline
                                        data-option-connector-id={option.id}
                                        className={`ml-auto flex-shrink-0 text-orange-400 text-xl cursor-pointer hover:text-orange-600 transition-colors ${option.nextBlockId ? 'opacity-100 text-orange-500' : 'opacity-40 group-hover:opacity-100'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onConnectOptionRequest) {
                                              onConnectOptionRequest(id, option.id);
                                            }
                                        }}
                                        title={option.nextBlockId ? "Edit connected block" : "Add/Connect response block"}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span className="text-sm text-gray-400 italic block mt-1">Click block to configure options...</span>
                    )}
                </div>
            );
        } else if (type === BLOCK_TYPES.RESPONSE) {
            const displayTitle = settings?.title || `Response`;
            const responseText = settings?.responseText || '';
            const quickReplies = (settings?.options || []).filter(opt => typeof opt === 'string' && opt.trim() !== '');
            const hasNextBlock = !!settings?.nextBlockId;

            return (
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between mb-1.5"> 
                        <span className="text-sm font-medium text-gray-800 flex-grow truncate" title={displayTitle}>
                            {displayTitle}
                        </span>
                        {onConnectToEndRequest && (
                            <IoChevronForwardCircleOutline
                                data-connect-end-id={id} 
                                className={`ml-auto flex-shrink-0 text-xl cursor-pointer hover:text-green-600 transition-colors ${
                                    hasNextBlock ? 'text-green-500' : 'text-green-400' 
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onConnectToEndRequest(id);
                                }}
                                title={hasNextBlock ? "Connect to a new End Flow (will replace current connection)" : "Connect to End Flow"}
                            />
                        )}
                    </div>
                    {responseText ? (
                        <span className="text-sm text-green-600 block break-words mt-1" title={responseText}>
                            {responseText}
                        </span>
                    ) : (
                        quickReplies.length === 0 && <span className="text-sm text-gray-400 italic block mt-1">Click to configure response...</span>
                    )}
                    {quickReplies.length > 0 && responseText && <div className="mt-1.5"></div>}
                    {quickReplies.length > 0 && (
                        <div className={`mt-1 flex flex-col space-y-1`}>
                            {quickReplies.map((reply, index) => (
                                <span key={index} className={`text-sm ${responseText ? 'bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-md' : 'text-green-600'} block break-words`} title={reply}>
                                    {reply}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            );
        } else if (type === BLOCK_TYPES.END) {
            const displayTitle = settings?.title || `End Flow`;
            const endOptionsList = (settings?.options || []).filter(opt => typeof opt === 'string' && opt.trim() !== '');

            return (
                <div className="flex flex-col w-full">
                    <div className="flex items-center mb-1.5">
                        <span className="text-sm font-medium text-gray-800 flex-grow truncate" title={displayTitle}>
                            {displayTitle}
                        </span>
                    </div>
                    { endOptionsList.length > 0 && <hr className="my-1.5 border-t border-gray-300" /> }
                    {endOptionsList.length > 0 ? (
                        <div className="mt-1 space-y-1">
                            {endOptionsList.map((option, index) => (
                                <span key={index} className="text-sm text-red-600 block break-words" title={option}>
                                    {option}
                                </span>
                            ))}
                        </div>
                    ) : (
                         <span className="text-sm text-gray-400 italic block mt-1">Click to configure end options...</span>
                    )}
                </div>
            );
        }
        return (
            <div className="flex items-center w-full">
                {IconComponent && <IconComponent className={`mr-3 text-xl ${iconColor || 'text-gray-700'}`} />}
                <span className="text-sm font-medium flex-grow truncate" title={blockTitle}>{blockTitle}</span>
            </div>
        );
    };

    return (
        <div
            ref={combinedRef}
            style={dynamicStyle}
            {...listeners}
            {...attributes}
            className={`${blockBaseStyle} group`} 
            onClick={(e) => {
                if (e.target.closest('[data-delete-button]') || e.target.closest('[data-option-connector-id]') || e.target.closest('[data-connect-end-id]')) {
                    return;
                }
                if (!isDragging && typeof onEditRequest === 'function') { 
                    onEditRequest(id);
                }
            }}
        >
            {renderContent()}
            <button
                data-delete-button 
                onClick={(e) => {
                    e.stopPropagation(); 
                    if (onDeleteRequest) onDeleteRequest(id);
                }}
                className="absolute top-1 right-1 p-1 bg-white/60 hover:bg-red-100 rounded-full text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 z-10"
                title="Delete Block"
            >
                <LuTrash className="w-4 h-4" />
            </button>
        </div>
    );
});
FlowBlock.displayName = "FlowBlock";


// Canvas
const Canvas = ({ children, blocks }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: CANVAS_ID,
    });
    const canvasStyle = `
            flex-grow relative min-h-[600px] border-l border-gray-200 p-4
            bg-white bg-[radial-gradient(theme(colors.gray.200)_1px,transparent_1px)] [background-size:20px_20px]
            ${isOver ? 'outline outline-2 outline-blue-500 outline-offset-[-2px]' : ''}
            overflow: visible; 
        `;
    return (
        <div ref={setNodeRef} className={canvasStyle} id="canvas-container">
            {(!blocks || blocks.length === 0) && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 border border-dashed border-gray-400 rounded bg-white bg-opacity-90 pointer-events-none text-center">
                    <p className="text-gray-600 text-sm">
                        To start the flow, Drag & Drop<br />a Trigger Block here!
                    </p>
                </div>
            )}
            {children}
        </div>
    );
};

// Arrow Component
const Arrow = ({ fromPos, toPos, type }) => {
    const ARROW_HEAD_SIZE = 10;
    const STROKE_COLOR = '#4b5563'; 
    const STROKE_WIDTH = 2; 

    let pathD = '';
    const markerId = `arrowhead-${uuidv4()}`;

    if (!fromPos || !toPos) return null;


    if (type === 'horizontal') {
        const controlOffsetX = Math.abs(toPos.x - fromPos.x) * 0.3;
        pathD = `M ${fromPos.x} ${fromPos.y} C ${fromPos.x + controlOffsetX} ${fromPos.y}, ${toPos.x - controlOffsetX} ${toPos.y}, ${toPos.x} ${toPos.y}`;
    } else if (type === 'vertical-elbow') {
        const verticalOffset = 40; 
        const cornerRadius = 10; 

        pathD = `M ${fromPos.x} ${fromPos.y} 
                 L ${fromPos.x} ${fromPos.y + verticalOffset - cornerRadius}
                 Q ${fromPos.x} ${fromPos.y + verticalOffset} ${fromPos.x + (toPos.x > fromPos.x ? cornerRadius : -cornerRadius)} ${fromPos.y + verticalOffset}
                 L ${toPos.x - (toPos.x > fromPos.x ? cornerRadius : -cornerRadius)} ${fromPos.y + verticalOffset}
                 Q ${toPos.x} ${fromPos.y + verticalOffset} ${toPos.x} ${fromPos.y + verticalOffset + cornerRadius}
                 L ${toPos.x} ${toPos.y}`;
    }

    if (!pathD) return null;

    return (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <defs>
                <marker
                    id={markerId}
                    markerWidth={ARROW_HEAD_SIZE}
                    markerHeight={ARROW_HEAD_SIZE * 0.7}
                    refX={ARROW_HEAD_SIZE - STROKE_WIDTH} 
                    refY={(ARROW_HEAD_SIZE * 0.7) / 2}
                    orient="auto-start-reverse"
                    markerUnits="userSpaceOnUse"
                >
                    <path d={`M 0 0 L ${ARROW_HEAD_SIZE} ${(ARROW_HEAD_SIZE * 0.7) / 2} L 0 ${ARROW_HEAD_SIZE * 0.7} z`} fill={STROKE_COLOR} />
                </marker>
            </defs>
            <path
                d={pathD}
                stroke={STROKE_COLOR}
                strokeWidth={STROKE_WIDTH}
                fill="none"
                markerEnd={`url(#${markerId})`}
            />
        </svg>
    );
};


const AutoCreateFlow = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [flowTitle, setFlowTitle] = useState('Untitled Flow');
    const [isActive, setIsActive] = useState(true);
    const [blocks, setBlocks] = useState([]);
    const [activeDragId, setActiveDragId] = useState(null);
    const [activeDragData, setActiveDragData] = useState(null);
    const canvasContainerRef = useRef(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [editingBlockId, setEditingBlockId] = useState(null);
    const [preview, setPreview] = useState(false);
    const [callOptionBlockApi1, setcallOptionBlockApi1] = useState("");

    const [flowId, setFlowId] = useState(location.state?.flowId);
    
    const [triggerBlockBackendId, setTriggerBlockBackendId] = useState(null); 

    const blockElementRefs = useRef(new Map());
    const [arrowsToRender, setArrowsToRender] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const createInitialFlow = async () => {
        };

        const mockDelete = async (id, type) => {
            await new Promise(resolve => setTimeout(resolve, 300));
            if (!id) { 
                return { success: true, message: `${type} not on backend, removed locally.` };
            }
            // For testing failure: if (id.includes('fail')) return { success: false, error: `Mock API: Failed to delete ${type}`};
            return { success: true, message: `Successfully deleted ${type} ${id}` };
        };

        if (!Authapi.deleteTrigger) {
            Authapi.deleteTrigger = (backendId) => mockDelete(backendId, 'Trigger');
        }
        if (!Authapi.deleteOptionBlock) {
            Authapi.deleteOptionBlock = (backendId) => mockDelete(backendId, 'OptionBlock');
        }
        if (!Authapi.deleteResponseBlock) {
            Authapi.deleteResponseBlock = (backendId) => mockDelete(backendId, 'ResponseBlock');
        }
        if (!Authapi.deleteEndBlock) {
            Authapi.deleteEndBlock = (backendId) => mockDelete(backendId, 'EndBlock');
        }

        return () => { isMounted = false; };
    }, [flowId, flowTitle, blocks.length]);


    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor)
    );

    const sidebarItems = [
        { id: 'sidebar-trigger', type: BLOCK_TYPES.TRIGGER, label: 'Trigger', icon: LuMousePointerClick, color: 'bg-blue-50 text-blue-700', iconColor: 'text-blue-500' },
        { id: 'sidebar-options', type: BLOCK_TYPES.OPTIONS, label: 'Options', icon: LuListTree, color: 'bg-orange-50 text-orange-700', iconColor: 'text-orange-500' },
        { id: 'sidebar-response', type: BLOCK_TYPES.RESPONSE, label: 'Response', icon: LuMessageSquare, color: 'bg-green-50 text-green-700', iconColor: 'text-green-500' },
        { id: 'sidebar-end', type: BLOCK_TYPES.END, label: 'End', icon: LuTrash2, color: 'bg-red-50 text-red-700', iconColor: 'text-red-500' },
    ];

    const handleDragStart = useCallback((event) => {
        setActiveDragId(event.active.id);
        setActiveDragData(event.active.data.current);
    }, []);

    const handleDragEnd = useCallback((event) => {
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
                const lastBlock = blocks[blocks.length -1];
                baseDropX = lastBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP;
                baseDropY = lastBlock.position.y;
            }
            
            newBlockPosition = { x: baseDropX, y: baseDropY }; 
            if (type === BLOCK_TYPES.TRIGGER) {
                connectToPredecessor = false;
            } else if (type === BLOCK_TYPES.OPTIONS) {
                predecessorBlock = blocks.find(b => b.type === BLOCK_TYPES.TRIGGER); 
                if (predecessorBlock) {
                    newBlockPosition = {
                        x: predecessorBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP,
                        y: predecessorBlock.position.y
                    };
                } else {
                    connectToPredecessor = false; 
                }
            } else if (type === BLOCK_TYPES.RESPONSE) {
                const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : null;
                if (lastBlock) {
                    if (!activeData?.sourceOptionInfo) { 
                         newBlockPosition = { x: lastBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP, y: lastBlock.position.y };
                    } else { 
                         newBlockPosition = { x: baseDropX, y: baseDropY };
                    }
                }
                connectToPredecessor = false; 
            } else if (type === BLOCK_TYPES.END) {
                const unconnectedResponse = blocks.slice().reverse().find(b => 
                    b.type === BLOCK_TYPES.RESPONSE && !b.settings?.nextBlockId
                );
                predecessorBlock = unconnectedResponse || (blocks.length > 0 ? blocks[blocks.length - 1] : null);

                if (predecessorBlock) {
                    newBlockPosition = {
                        x: predecessorBlock.position.x, 
                        y: predecessorBlock.position.y + BLOCK_HEIGHT_ESTIMATE + VERTICAL_GAP
                    };
                } else {
                    connectToPredecessor = false;
                    const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : null;
                    if (lastBlock) {
                         newBlockPosition = { x: lastBlock.position.x, y: lastBlock.position.y + BLOCK_HEIGHT_ESTIMATE + VERTICAL_GAP };
                    }
                }
            }


            newBlockPosition.x = Math.max(10, newBlockPosition.x);
            newBlockPosition.y = Math.max(10, newBlockPosition.y);
             
            let initialSettings = {};
            if (type === BLOCK_TYPES.TRIGGER) initialSettings = { title: 'New Trigger', keywords: [] };
            else if (type === BLOCK_TYPES.OPTIONS) initialSettings = { title: 'New Options', options: [] };
            else if (type === BLOCK_TYPES.RESPONSE) initialSettings = { title: 'New Response', responseText: '' };
            else if (type === BLOCK_TYPES.END) initialSettings = { title: 'New End Flow', options: [] };

            const newBlock = {
                id: uuidv4(), type, label, icon: IconComponent,
                position: newBlockPosition,
                color, iconColor, settings: initialSettings,
            };

            if (predecessorBlock && connectToPredecessor && type === BLOCK_TYPES.END && predecessorBlock.type === BLOCK_TYPES.RESPONSE) {
                setBlocks((prevBlocks) => {
                    const updatedBlocks = prevBlocks.map(b =>
                        b.id === predecessorBlock.id
                            ? { ...b, settings: { ...b.settings, nextBlockId: newBlock.id } }
                            : b
                    );
                    return [...updatedBlocks, newBlock];
                });
            } else if (predecessorBlock && connectToPredecessor) { 
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
                                } else {
                                    const optionsHeaderHeightEstimate = 35; 
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
                        const blockPadding = 12;
    
                        if (block.type === BLOCK_TYPES.TRIGGER) {
                            const iconSize = 30; 
                            fromPos = { 
                                x: block.position.x + fromNode.offsetWidth - blockPadding - (iconSize / 2) + 5,
                                y: block.position.y + blockPadding + (iconSize / 2) + 2
                            };
                            toPos = { 
                                x: toBlock.position.x, 
                                y: toBlock.position.y + toNode.offsetHeight / 2 
                            };
                            arrowType = 'horizontal';
                        } else if (block.type === BLOCK_TYPES.RESPONSE) { 
                            fromPos = { 
                                x: block.position.x + fromNode.offsetWidth / 2, 
                                y: block.position.y + fromNode.offsetHeight 
                            };
                            toPos = { 
                                x: toBlock.position.x + toNode.offsetWidth / 2, 
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
        }, 100); 

        return () => clearTimeout(timeoutId);
    }, [blocks, activeDragId, blockElementRefs]);


    const handleBlockClick = useCallback((blockClientId) => {
        if (isSettingsModalOpen || activeDragId) return;
        const blockToEdit = blocks.find(b => b.id === blockClientId);
        if (blockToEdit) {
            setEditingBlockId(blockClientId);
            setIsSettingsModalOpen(true);
        } else {
            console.warn("Attempted to edit a block that does not exist:", blockClientId);
        }
    }, [blocks, isSettingsModalOpen, activeDragId]);

    const handleCloseSettingsModal = useCallback(() => {
        setIsSettingsModalOpen(false);
        setEditingBlockId(null);
    }, []);
    
    const handleConnectOption = useCallback((optionsBlockId, optionClientId) => {
        // ... (handleConnectOption logic - largely unchanged)
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

            if (currentOption.nextBlockId) {
                const connectedBlock = prevBlocks.find(b => b.id === currentOption.nextBlockId);
                if (connectedBlock) {
                    handleBlockClick(connectedBlock.id);
                } else {
                    currentOption.nextBlockId = null;
                    optionsBlock.settings.options[optionIndex] = currentOption;
                    const updatedBlocks = [...prevBlocks];
                    updatedBlocks[optionsBlockIndex] = optionsBlock;
                    return updatedBlocks;
                }
                return prevBlocks; 
            } else {
                const responseSidebarItem = sidebarItems.find(item => item.type === BLOCK_TYPES.RESPONSE);
                if (!responseSidebarItem) {
                    return prevBlocks;
                }

                const optionsNode = blockElementRefs.current.get(optionsBlockId);
                let newResponseY = optionsBlock.position.y;
                const optionsHeaderHeightEstimate = 35; 
                let estimatedConnectorCenterYInBlock = optionsHeaderHeightEstimate + (optionIndex * AVERAGE_OPTION_ITEM_HEIGHT) + (AVERAGE_OPTION_ITEM_HEIGHT / 2);


                if (optionsNode) {
                    const optionConnectorElement = optionsNode.querySelector(`[data-option-connector-id="${optionClientId}"]`);
                    if (optionConnectorElement) {
                        const connectorRect = optionConnectorElement.getBoundingClientRect();
                        const optionsNodeRect = optionsNode.getBoundingClientRect();
                        estimatedConnectorCenterYInBlock = (connectorRect.top - optionsNodeRect.top) + (connectorRect.height / 2);
                    }
                }
                newResponseY = optionsBlock.position.y + estimatedConnectorCenterYInBlock - (BLOCK_HEIGHT_ESTIMATE / 2);
                newResponseY = Math.max(10, newResponseY);

                const newResponseBlock = {
                    id: uuidv4(),
                    type: BLOCK_TYPES.RESPONSE,
                    label: `Response for ${currentOption.label}`,
                    icon: responseSidebarItem.icon,
                    position: {
                        x: Math.max(10, optionsBlock.position.x + BLOCK_WIDTH_ESTIMATE + HORIZONTAL_GAP),
                        y: newResponseY,
                    },
                    color: responseSidebarItem.color,
                    iconColor: responseSidebarItem.iconColor,
                    settings: {
                        title: `Response for "${currentOption.label}"`,
                        responseText: '',
                        sourceOptionInfo: { 
                            optionBlockId: optionsBlockId,
                            optionId: optionClientId,
                            optionLabel: currentOption.label,
                        }
                    },
                };

                currentOption.nextBlockId = newResponseBlock.id;
                optionsBlock.settings.options[optionIndex] = currentOption;
                
                const updatedBlocks = [...prevBlocks];
                updatedBlocks[optionsBlockIndex] = optionsBlock;
                
                setTimeout(() => { 
                    setEditingBlockId(newResponseBlock.id);
                    setIsSettingsModalOpen(true);
                }, 0);

                return [...updatedBlocks, newResponseBlock];
            }
        });
    }, [handleBlockClick, sidebarItems, blockElementRefs, blocks]);

    const handleConnectToEnd = useCallback((responseBlockId) => {
        setBlocks(prevBlocks => {
            const responseBlockIndex = prevBlocks.findIndex(b => b.id === responseBlockId);
            if (responseBlockIndex === -1) {
                return prevBlocks;
            }

            let responseBlock = { ...prevBlocks[responseBlockIndex] }; // Make a mutable copy
            if (responseBlock.type !== BLOCK_TYPES.RESPONSE) {
                return prevBlocks;
            }

            const endSidebarItem = sidebarItems.find(item => item.type === BLOCK_TYPES.END);
            if (!endSidebarItem) {
                alert("Configuration error: End block type is missing.");
                return prevBlocks;
            }

            const responseNode = blockElementRefs.current.get(responseBlockId);
            // Position the End block below the Response block
            const newEndX = responseBlock.position.x; // Align X with response block for vertical connection
            const newEndY = responseBlock.position.y + (responseNode ? responseNode.offsetHeight : BLOCK_HEIGHT_ESTIMATE) + VERTICAL_GAP;

            const newEndBlock = {
                id: uuidv4(),
                type: BLOCK_TYPES.END,
                label: `End Flow`, // Generic label, title will be more specific in settings
                icon: endSidebarItem.icon,
                position: {
                    x: Math.max(10, newEndX),
                    y: Math.max(10, newEndY),
                },
                color: endSidebarItem.color,
                iconColor: endSidebarItem.iconColor,
                settings: {
                    title: `End Flow from "${responseBlock.settings?.title || 'Response'}"`,
                    options: [], // Default empty options for End block
                },
            };

            // Update the response block to point to the new end block
            responseBlock.settings = {
                ...(responseBlock.settings || {}),
                nextBlockId: newEndBlock.id,
            };
            
            let blocksToReturn = [...prevBlocks];
            blocksToReturn[responseBlockIndex] = responseBlock; // Update the response block in the array
            blocksToReturn = [...blocksToReturn, newEndBlock]; // Add the new end block to the array
            
            // Open settings for the new End block
            setTimeout(() => { 
                setEditingBlockId(newEndBlock.id);
                setIsSettingsModalOpen(true);
            }, 0);

            return blocksToReturn;
        });
    }, [sidebarItems, blockElementRefs]); // Dependencies for handleConnectToEnd

    // --- API Call Wrappers ---
    const callTriggerApi = useCallback(async (payload) => {
        
        const apiPayload = { ...payload, flowId: payload.flowId || flowId }; // Prefer payload.flowId if passed (e.g. from save of new trigger)
        try {
            const response = await Authapi.trigger(apiPayload);
            if (response?.success && response.data) {
                // If it was a new trigger creating a flow, capture the new flowId
                if (!flowId && response.data.flowId) {
                    setFlowId(response.data.flowId);
                }
                if (response.data.id) setTriggerBlockBackendId(response.data.id);

                const combinedKeywords = [
                    ...(response.data.keywords || []),
                    ...(response.data.keyword ? [response.data.keyword] : [])
                ].filter((kw, index, self) => kw && self.indexOf(kw) === index);
                return {
                    backendId: response.data.id,
                    flowId: response.data.flowId || flowId, // Persist flowId
                    type: response.data.type || 'keyword',
                    keywords: combinedKeywords,
                    keyword: combinedKeywords.join(', '),
                    title: response.data.title || `Trigger - ${response.data.type ? response.data.type.charAt(0).toUpperCase() + response.data.type.slice(1) : 'Keyword'}`,
                    message: response.data.message,
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving trigger');
            }
        } catch (error) { console.error("Exception in callTriggerApi:", error); return null; }
    }, [flowId, setFlowId]); // Added setFlowId dependency

    const callOptionBlockApi = useCallback(async (payload) => {
        const apiPayload = { ...payload, flowId, ...(triggerBlockBackendId && { triggerBlockId: triggerBlockBackendId }) };
        try {
            const response = await Authapi.postoptionBlock(apiPayload);
            if (response?.success && response.data?.id) {
                setcallOptionBlockApi1(response.data.id)
                return { 
                    backendId: response.data.id, 
                    title: response.data.title,
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving option block container');
            }
        } catch (error) { console.error("Exception in callOptionBlockApi:", error); return null; }
    }, [flowId, triggerBlockBackendId]);
    
    const callEachOptionApi = useCallback(async (optionBlockBackendId, optionPayload) => {
        if (!optionBlockBackendId) { console.error("callEachOptionApi: optionBlockBackendId is missing"); throw new Error("Option Block ID missing");}
        try {
            const response = await Authapi.posteachOption(optionBlockBackendId, optionPayload); 
            if (response?.success && response.data) {
                return response.data; 
            } else {
                throw new Error(response?.error || `Failed to save option: ${optionPayload.label}`);
            }
        } catch (error) { console.error("Exception in callEachOptionApi:", error); throw error; }
    }, []);

    const callResponseApi = useCallback(async (payload) => {
        if (!flowId) { console.error("callResponseApi: flowId is missing"); return null; }
        const apiPayload = { ...payload, flowId }; 
        try {
            const response = await Authapi.responseBlock(apiPayload);
            if (response?.success && response.data) {
                return {
                    backendId: response.data.id,
                    responseText: response.data.text || '',
                    title: response.data.title, 
                    options: response.data.options || [], 
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving response block');
            }
        } catch (error) { console.error("Exception in callResponseApi:", error); return null; }
    }, [flowId]);

    const callEndApi = useCallback(async (payload) => {
        if (!flowId) { console.error("callEndApi: flowId is missing"); return null; }
        const apiPayload = { ...payload, flowId }; 
        try {
            const response = await Authapi.endBlock(apiPayload);
            if (response?.success && response.data) {
                return {
                    backendId: response.data.id,
                    title: response.data.title || '',
                    options: response.data.options ? response.data.options.map(opt => opt.label) : [],
                };
            } else {
                throw new Error(response?.error || 'Unknown API error saving end block');
            }
        } catch (error) { console.error("Exception in callEndApi:", error); return null; }
    }, [flowId]);
    
    const handleSaveSettings = useCallback(async (blockClientId, newSettingsFromModal) => {
        // ... (handleSaveSettings logic - largely unchanged but ensure API calls are robust)
        console.log("Saving settings for block:", blockClientId, "New settings:", newSettingsFromModal);

        const blockIndex = blocks.findIndex(b => b.id === blockClientId);
        if (blockIndex === -1) { console.error("Block not found:", blockClientId); return; }

        const blockBeingEdited = blocks[blockIndex];
        const originalSettings = JSON.parse(JSON.stringify(blockBeingEdited.settings || {}));
        const blockType = blockBeingEdited.type;

        let mergedSettingsForUI = { ...originalSettings, ...newSettingsFromModal };
        
        if (blockType === BLOCK_TYPES.OPTIONS && newSettingsFromModal.options) {
            if (Array.isArray(newSettingsFromModal.options) && newSettingsFromModal.options.every(opt => typeof opt === 'string')) {
                mergedSettingsForUI.options = newSettingsFromModal.options.map(label => {
                    const existingOpt = (originalSettings.options || []).find(o => o.label === label);
                    return existingOpt ? { ...existingOpt, label } : { id: uuidv4(), label, nextBlockId: null, backendId: null };
                });
            } else if (Array.isArray(newSettingsFromModal.options) && newSettingsFromModal.options.every(opt => typeof opt === 'object')) {
                mergedSettingsForUI.options = newSettingsFromModal.options.map(opt => ({
                    ...opt,
                    id: opt.id || uuidv4(), 
                }));
            }
        }

        setBlocks(currentBlocks => currentBlocks.map(b =>
            b.id === blockClientId ? { ...b, settings: mergedSettingsForUI } : b
        ));
        handleCloseSettingsModal(); 

        let apiSuccess = true;
        let overallApiError = null;
        let savedDataFromApi = null;

        let currentFlowId = flowId; // Use a local variable for flowId within this save operation

        // If flowId doesn't exist and this is the TRIGGER block, the API call might create it
        if (!currentFlowId && blockType !== BLOCK_TYPES.TRIGGER) {
            apiSuccess = false; 
            overallApiError = "Flow ID is missing. Save the Trigger block first or set a flow title to initialize.";
            console.error(overallApiError);
        }
        
        if (apiSuccess) {
            try {
                if (blockType === BLOCK_TYPES.TRIGGER) {
                    const triggerPayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        type: mergedSettingsForUI?.type?.toLowerCase() || 'keyword',
                        keywords: [mergedSettingsForUI?.keyword], // API expects array
                        title: mergedSettingsForUI?.title, 
                        message: mergedSettingsForUI?.message || "Trigger initiated",
                        flowId: currentFlowId, // Pass currentFlowId, could be null for new trigger
                    };
                    savedDataFromApi = await callTriggerApi(triggerPayload);
                    if (savedDataFromApi === null) throw new Error("Failed to save trigger settings via API.");
                    // callTriggerApi now handles setFlowId if a new one is returned
                    // and sets triggerBlockBackendId internally
                    if (savedDataFromApi.flowId) currentFlowId = savedDataFromApi.flowId; // Update local currentFlowId
                }
                else if (blockType === BLOCK_TYPES.OPTIONS) {
                    if (!currentFlowId) throw new Error("Cannot save Options block: Flow ID is missing.");
                    const optionBlockPayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        flowId: currentFlowId,
                        title: mergedSettingsForUI?.title || `Options Block`,
                        triggerBlockId: triggerBlockBackendId, 
                    };
                    const blockSaveResult = await callOptionBlockApi(optionBlockPayload);
                    if (!blockSaveResult?.backendId) throw new Error("Failed to save option block container.");
                    
                    const savedOptionBlockBackendId = blockSaveResult.backendId;
                    let finalApiOptions = [];

                    const optionsToSave = mergedSettingsForUI.options || [];
                    if (optionsToSave.length > 0) {
                        const optionSavePromises = optionsToSave.map(async (optObj) => {
                            const linkedResponseBlock = blocks.find(b => b.id === optObj.nextBlockId);
                            const linkedResponseBackendId = linkedResponseBlock?.settings?.backendId;
                            
                            const eachOptionPayload = {
                                ...(optObj.backendId && { id: optObj.backendId }), // For updates
                                label: optObj.label.trim(),
                                ...(linkedResponseBackendId && { responseBlockId: linkedResponseBackendId }), 
                            };
                            return callEachOptionApi(savedOptionBlockBackendId, eachOptionPayload);
                        });
                        const savedOptionsResults = await Promise.allSettled(optionSavePromises);
                        
                        savedOptionsResults.forEach((result, index) => {
                            const originalOptObj = optionsToSave[index];
                            if (result.status === 'fulfilled' && result.value) {
                                finalApiOptions.push({
                                    ...originalOptObj, 
                                    backendId: result.value.id, 
                                    // API might return other fields for the option like updated label or order
                                    ...(result.value || {}),
                                });
                            } else {
                                overallApiError = (overallApiError ? overallApiError + ", " : "") + (result.reason?.message || `Err saving opt: ${originalOptObj.label}`);
                                finalApiOptions.push({ ...originalOptObj, saveError: true }); 
                            }
                        });
                    }
                    savedDataFromApi = { 
                        backendId: savedOptionBlockBackendId, 
                        title: blockSaveResult.title, 
                        options: finalApiOptions 
                    };
                }
                else if (blockType === BLOCK_TYPES.RESPONSE) {
                    if (!currentFlowId) throw new Error("Cannot save Response block: Flow ID is missing.");
                    let eachOptionId = null;
                    if (originalSettings.sourceOptionInfo?.optionBlockId && originalSettings.sourceOptionInfo?.optionId) {
                        const sourceOptBlock = blocks.find(b => b.id === originalSettings.sourceOptionInfo.optionBlockId);
                        const sourceOpt = sourceOptBlock?.settings?.options?.find(o => o.id === originalSettings.sourceOptionInfo.optionId);
                        if (sourceOpt?.backendId) eachOptionId = sourceOpt.backendId;
                    }

                    const responsePayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        // flowId: currentFlowId,
                        optionBlockId:callOptionBlockApi1,
                        text: mergedSettingsForUI?.responseText || '',
                        title: mergedSettingsForUI?.title, 
                        options: mergedSettingsForUI?.options || [], 
                        ...(eachOptionId && { eachOptionId: eachOptionId }), 
                        ...(mergedSettingsForUI.nextBlockId && (() => {
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
                    if (!currentFlowId) throw new Error("Cannot save End block: Flow ID is missing.");
                    let sourceResponseBackendId = null;
                    const predecessorResponse = blocks.find(b => b.type === BLOCK_TYPES.RESPONSE && b.settings?.nextBlockId === blockClientId);
                    if (predecessorResponse?.settings?.backendId) {
                        sourceResponseBackendId = predecessorResponse.settings.backendId;
                    }

                    const endPayload = {
                        ...(originalSettings.backendId && { id: originalSettings.backendId }),
                        title: mergedSettingsForUI?.title || '',
                        options: (mergedSettingsForUI?.options || []).map(opt => ({ label: opt.trim() })).filter(Boolean),
                        flowId: currentFlowId,
                        ...(sourceResponseBackendId && { responseBlockId: sourceResponseBackendId }), 
                    };
                    savedDataFromApi = await callEndApi(endPayload);
                    if (savedDataFromApi === null) throw new Error("Failed to save end block via API.");
                }
            } catch (error) {
                apiSuccess = false;
                overallApiError = error.message || "Error during API save.";
                console.error("API Save Error:", overallApiError, error);
            }
        }

        if (!apiSuccess) {
            setBlocks(currentBlocks => 
                currentBlocks.map(b => b.id === blockClientId ? { ...b, settings: originalSettings } : b)
            );
            alert(`Error saving settings: ${overallApiError || 'Please try again.'}`);
        } else if (savedDataFromApi && typeof savedDataFromApi === 'object') {
            setBlocks(currentBlocks => 
                currentBlocks.map(b => {
                    if (b.id === blockClientId) {
                        const finalMergedSettings = {
                            ...originalSettings,      
                            ...mergedSettingsForUI,    
                            ...savedDataFromApi,    
                        };
                        if (blockType === BLOCK_TYPES.OPTIONS && Array.isArray(savedDataFromApi.options)) {
                            finalMergedSettings.options = savedDataFromApi.options;
                        }
                        if (blockType === BLOCK_TYPES.TRIGGER && Array.isArray(savedDataFromApi.keywords)) {
                             finalMergedSettings.keywords = savedDataFromApi.keywords;
                             finalMergedSettings.keyword = savedDataFromApi.keywords.join(', '); 
                        }
                        return { ...b, settings: finalMergedSettings };
                    }
                    return b;
                })
            );
            console.log("Settings saved and UI updated for block:", blockClientId);
        }
    }, [flowId, blocks, handleCloseSettingsModal, triggerBlockBackendId, callTriggerApi, callOptionBlockApi, callEachOptionApi, callResponseApi, callEndApi]);

    const handleDeleteBlock = useCallback(async (blockClientIdToDelete) => {
        if (!window.confirm("Are you sure you want to delete this block and its direct connections? This action cannot be undone.")) {
            return;
        }

        const blockToDelete = blocks.find(b => b.id === blockClientIdToDelete);
        if (!blockToDelete) {
            console.error("Block to delete not found:", blockClientIdToDelete);
            return;
        }

        const { backendId: deletedBlockBackendId } = blockToDelete.settings || {};

        // 1. API call to delete the block itself
        if (deletedBlockBackendId) {
            try {
                let response;
                switch (blockToDelete.type) {
                    case BLOCK_TYPES.TRIGGER:  response = await Authapi.deleteTrigger(deletedBlockBackendId); break;
                    case BLOCK_TYPES.OPTIONS:  response = await Authapi.deleteOptionBlock(deletedBlockBackendId); break; // Assumes backend handles deleting child options
                    case BLOCK_TYPES.RESPONSE: response = await Authapi.deleteResponseBlock(deletedBlockBackendId); break;
                    case BLOCK_TYPES.END:      response = await Authapi.deleteEndBlock(deletedBlockBackendId); break;
                    default: throw new Error(`Unknown block type for deletion: ${blockToDelete.type}`);
                }
                // Assuming Authapi delete functions throw on HTTP error or return { success: false } on failure
                if (response && response.success === false) { // Check for explicit success property
                     throw new Error(response.error || `Failed to delete ${blockToDelete.type} from server (API error)`);
                }
                console.log(`Successfully deleted block ${blockClientIdToDelete} (backendId: ${deletedBlockBackendId}) from server.`);
            } catch (error) {
                console.error(`Failed to delete block ${blockClientIdToDelete} (backendId: ${deletedBlockBackendId}) from server:`, error);
                alert(`Error deleting block from server: ${error.message || 'Please try again.'}`);
                return; // Stop if main deletion fails
            }
        } else {
            console.log(`Block ${blockClientIdToDelete} was not saved to backend, removing locally.`);
        }
        
        const updatePromises = [];

        // 2. Update frontend state and prepare backend updates for connected blocks
        const newBlocksState = blocks
            .filter(b => b.id !== blockClientIdToDelete) // Remove the deleted block
            .map(block => { // Iterate over remaining blocks to update connections
                let currentBlockSettings = { ...(block.settings || {}) }; // Make a mutable copy of settings for this block
                let blockToUpdate = { ...block }; // Make a mutable copy of the block itself
                let settingsModifiedForThisBlock = false;

                // A. Handle direct `nextBlockId` links (from Trigger or Response to any block)
                if (currentBlockSettings.nextBlockId === blockClientIdToDelete) {
                    console.log(`Block ${block.id} (type: ${block.type}) was connected to deleted block ${blockClientIdToDelete}. Unlinking on UI.`);
                    currentBlockSettings.nextBlockId = null;
                    settingsModifiedForThisBlock = true;

                    if (block.settings?.backendId && flowId) { // Only update backend if source block and flow exist
                        const payloadForUnlink = { ...currentBlockSettings, id: block.settings.backendId, flowId };
                        
                        // Prepare payload specifically for each block type's update API
                        // This assumes your call...Api functions can handle updates.
                        if (block.type === BLOCK_TYPES.TRIGGER) {
                             payloadForUnlink.keywords = [currentBlockSettings.keyword || '']; // Ensure keywords is an array
                             payloadForUnlink.type = currentBlockSettings.type || 'keyword';
                             // The 'nextBlockId' is now null in payloadForUnlink
                             updatePromises.push(callTriggerApi(payloadForUnlink).catch(err => console.error(`Backend Unlink Failed (Trigger ${block.id}):`, err)));
                        } else if (block.type === BLOCK_TYPES.RESPONSE) {
                            payloadForUnlink.text = currentBlockSettings.responseText || '';
                            payloadForUnlink.options = currentBlockSettings.options || []; // quick replies
                            // API might expect 'nextBlockId' or a specific field like 'endBlockId' to be nulled
                            // Ensure payloadForUnlink reflects the nulled connection correctly for the backend
                            updatePromises.push(callResponseApi(payloadForUnlink).catch(err => console.error(`Backend Unlink Failed (Response ${block.id}):`, err)));
                        }
                    }
                }

                // B. Handle `nextBlockId` within options of an OPTIONS block
                if (block.type === BLOCK_TYPES.OPTIONS && Array.isArray(currentBlockSettings.options)) {
                    let optionsArrayChanged = false;
                    const updatedOptionsArray = currentBlockSettings.options.map(opt => {
                        if (opt.nextBlockId === blockClientIdToDelete) {
                            console.log(`Option ${opt.id} in block ${block.id} was connected to deleted block ${blockClientIdToDelete}. Unlinking on UI.`);
                            optionsArrayChanged = true; // Mark that at least one option in this block changed
                            if (block.settings?.backendId && opt.backendId) {
                                // API call to update this specific option to remove its link
                                // Ensure payload has 'id' for the option itself, and the link field (e.g., responseBlockId) is null
                                const optionPayloadForUnlink = { 
                                    id: opt.backendId, 
                                    label: opt.label, // Keep label
                                    responseBlockId: null // Assuming API uses responseBlockId for link to Response block
                                    // ... any other fields the API needs for updating an option
                                }; 
                                updatePromises.push(
                                    callEachOptionApi(block.settings.backendId, optionPayloadForUnlink) // Pass parent Options block's backendId
                                    .catch(err => console.error(`Backend Unlink Failed (Option ${opt.id} in ${block.id}):`, err))
                                );
                            }
                            return { ...opt, nextBlockId: null }; // Update UI link
                        }
                        return opt;
                    });

                    if (optionsArrayChanged) {
                        currentBlockSettings.options = updatedOptionsArray;
                        settingsModifiedForThisBlock = true;
                    }
                }
                
                if (settingsModifiedForThisBlock) {
                    blockToUpdate.settings = currentBlockSettings; // Apply updated settings to the block copy
                }
                return blockToUpdate; // Return the (potentially) modified block
            });

        // Wait for all backend unlinking updates to attempt completion
        if (updatePromises.length > 0) {
            await Promise.allSettled(updatePromises);
            console.log("Attempted backend updates for unlinking connected blocks.");
            // You might want to check results of allSettled and inform user if any failed.
        }

        setBlocks(newBlocksState); // Set the new state with the deleted block removed and links updated

        if (blockToDelete.type === BLOCK_TYPES.TRIGGER) {
            setTriggerBlockBackendId(null);
        }
        console.log(`Block ${blockClientIdToDelete} and its connections processed for UI and backend.`);

    }, [blocks, flowId, callTriggerApi, callResponseApi, callEachOptionApi]); // Added callOptionBlockApi if needed for OPTIONS block update in future.


    const editingBlock = blocks.find(b => b.id === editingBlockId);

    const handleUpdateFlowTitle = async () => {
        // ... (handleUpdateFlowTitle logic - unchanged)
        if (!flowTitle.trim()) {
            alert("Flow title cannot be empty.");
            return;
        }
        let currentFlowId = flowId;
        if (!currentFlowId) {
            console.log("Attempting to create flow with title update...");
            try {
                const response = await Authapi.postflows({ name: flowTitle, description: "Flow created via title update" });
                if (response && response.success && response.data?.id) {
                    setFlowId(response.data.id);
                    currentFlowId = response.data.id; // Update currentFlowId for subsequent logic
                    console.log("Flow created with new title, ID:", response.data.id);
                } else {
                    alert("Failed to save flow title to the server (creation).");
                    console.error("Failed to create flow with title:", response);
                    return; // Stop if creation fails
                }
            } catch (error) {
                alert("Error saving flow title (creation).");
                console.error("Error creating flow with title:", error);
                return; // Stop if creation fails
            }
        } else {
            try {
                const response = await Authapi.updateFlow(currentFlowId, { name: flowTitle }); 
                 if (!response.success) {
                    alert("Failed to update flow title on backend.");
                    console.error("Failed to update flow title on backend:", response);
                 } else {
                    console.log("Flow title updated on backend:", flowTitle);
                 }
            } catch (error) {
                alert("Error updating flow title.");
                console.error("Error updating flow title on backend:", error);
            }
        }
    };
    
    const handlePublishFlow = async () => {
        // ... (handlePublishFlow logic - unchanged)
        if (!flowId) {
            alert("Cannot publish: Flow is not saved yet. Please set a title or save a block first.");
            return;
        }
        if (blocks.length === 0) {
            alert("Cannot publish: Flow has no blocks.");
            return;
        }
        console.log("Publishing flow:", flowId, "Blocks:", blocks, "IsActive:", isActive);
        // Ensure all blocks have been saved before publishing if necessary.
        // This example assumes all unsaved changes are handled by the individual block save operations or a "save all" mechanism not explicitly shown here.
        try {
            const publishPayload = {
                isActive: isActive,
                // You might need to send the entire flow structure or just an activation flag
                // flowData: blocks.map(block => ({...block.settings, clientId: block.id, type: block.type, position: block.position })) // Example: if backend needs full data
            };
            // const response = await Authapi.publishFlow(flowId, publishPayload); 
            // if (response.success) {
            //    alert("Flow published successfully!");
            // } else {
            //    alert("Failed to publish flow: " + (response.error || "Unknown error"));
            // }
            alert("Flow Save & Publish action triggered. Implement backend call. (See console for data)");
        } catch (error) {
            console.error("Error publishing flow:", error);
            alert("An error occurred while trying to publish the flow.");
        }
    };
    const topbadrdata = {
        title: '',
        Routertitle: 'Admin Settings',
        Router: '/AdminSettings',
        Routertitle1: 'Auto Response',
        Router1: '/AutoResponse',
        Routertitle2: 'Create Flow',
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <div className="flex p-3 flex-col h-screen bg-[#F6F8FA] w-full font-Poppins overflow-hidden">
                <Topbar topbadrdata={topbadrdata} />

                <div className=" p-3 flex justify-between items-center flex-shrink-0 border-b border-gray-200 z-20">
                    <input
                        type="text" value={flowTitle} onChange={(e) => setFlowTitle(e.target.value)}
                        onBlur={handleUpdateFlowTitle}
                        className="text-base font-medium border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Untitled Flow"
                    />
                    <div className="flex items-center space-x-4">
                        <label htmlFor="flow-active-toggle" className="flex items-center cursor-pointer select-none">
                            <span className="mr-2 text-sm text-gray-700">Active</span>
                            <div className="relative">
                                <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} className="sr-only peer" id="flow-active-toggle" />
                                <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner peer-checked:bg-blue-500 transition-colors"></div>
                                <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow transition-transform transform peer-checked:translate-x-[0.95rem] sm:peer-checked:translate-x-[1.125rem]"></div>
                            </div>
                        </label>
                        <button type="button" className="px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors" onClick={() => { setPreview(true); }}
                        > Preview </button>
                        <button
                            type="button"
                            className="px-4 py-1.5 border border-transparent rounded text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!flowId || blocks.length === 0}
                            onClick={handlePublishFlow}
                        >
                            Save & Publish
                        </button>
                    </div>
                </div>

                <div className="flex flex-grow overflow-hidden gap-5 w-full">
                    <div className="w-60 bg-white p-4 border-r border-gray-200 flex-shrink-0 overflow-y-auto z-10">
                        <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">Block Types</h2>
                        {sidebarItems.map(item => <DraggableSidebarItem key={item.id} {...item} />)}
                    </div>

                    <div ref={canvasContainerRef} className="flex-grow overflow-auto  relative bg-white">
                        <Canvas blocks={blocks}>
                            {blocks.map((block) => (
                                <FlowBlock
                                    key={block.id}
                                    {...block}
                                    ref={(node) => {
                                        if (node) blockElementRefs.current.set(block.id, node);
                                        else blockElementRefs.current.delete(block.id);
                                    }}
                                    settings={block.settings || {}}
                                    onEditRequest={handleBlockClick}
                                    onConnectOptionRequest={block.type === BLOCK_TYPES.OPTIONS ? handleConnectOption : undefined}
                                    onDeleteRequest={handleDeleteBlock}
                                    onConnectToEndRequest={block.type === BLOCK_TYPES.RESPONSE ? handleConnectToEnd : undefined}
                                />
                            ))}
                        </Canvas>
                        {arrowsToRender.map(arrow => (
                            <Arrow key={arrow.id} fromPos={arrow.fromPos} toPos={arrow.toPos} type={arrow.arrowType} />
                        ))}
                    </div>
                </div>
            </div>

            <DragOverlay dropAnimation={null}>
                 {activeDragId && activeDragData ? (
                    (() => {
                        // ... (DragOverlay logic - unchanged)
                        const { icon: IconComponent, color, iconColor, label, type, settings: dragDataSettings, isSidebarItem } = activeDragData;
                        let displayLabel = label || type;
                        let currentSettings = dragDataSettings || {};

                        if (!isSidebarItem) {
                            const currentBlock = blocks.find(b => b.id === activeDragId);
                            currentSettings = currentBlock?.settings || dragDataSettings || {};
                            displayLabel = currentSettings.title || label || type;
                        } else {
                            displayLabel = currentSettings.title || label || type;
                        }

                        const overlayBaseStyle = `p-3 rounded shadow-lg flex items-center opacity-95 pointer-events-none border`;
                        const minWidthStyle = 'min-w-[220px]';
                        let specificStyle = '', specificIconColor = iconColor || 'text-gray-600', specificTextColor = '';

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
                        } else if (isSidebarItem) {
                            specificStyle = `border-gray-300 ${color || 'bg-gray-100'} rounded`;
                            specificTextColor = color ? color.split(' ').find(c => c.startsWith('text-')) || 'text-gray-700' : 'text-gray-700';
                        } else { // Fallback for blocks already on canvas if type isn't matched (shouldn't happen often)
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
                                {type === BLOCK_TYPES.TRIGGER && (
                                    <div className="ml-auto flex-shrink-0 self-center opacity-50">
                                        <IoChevronForwardCircleOutline className="text-blue-500 text-3xl" />
                                    </div>
                                )}
                                {type === BLOCK_TYPES.OPTIONS && (isSidebarItem || (currentSettings.options && currentSettings.options.length > 0)) && (
                                    <div className="ml-auto flex-shrink-0 self-center opacity-70">
                                         <div className="w-5 h-5 bg-orange-300 rounded-full flex items-center justify-center shadow">
                                            <LuListTree className="text-white w-3 h-3"/>
                                        </div>
                                    </div>
                                )}
                                {/* You can add a similar indicator for Response -> End connection in DragOverlay if needed */}
                            </div>
                        );
                    })()
                ) : null}
            </DragOverlay>

            {
                preview && (<CustomerSupport flowid={flowId} onClose={() => setPreview(false)} />)
            }
            <div className="relative z-50">
                {isSettingsModalOpen && editingBlock && (
                    <Fragment>
                        {editingBlock.type === BLOCK_TYPES.TRIGGER && <TriggerSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                        {editingBlock.type === BLOCK_TYPES.OPTIONS && <OptionSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                        {editingBlock.type === BLOCK_TYPES.RESPONSE && <ResponseSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                        {editingBlock.type === BLOCK_TYPES.END && <EndSettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} onSave={handleSaveSettings} blockId={editingBlockId} initialSettings={editingBlock.settings || {}} />}
                    </Fragment>
                )}
            </div>
        </DndContext>
    );
};

export default AutoCreateFlow;
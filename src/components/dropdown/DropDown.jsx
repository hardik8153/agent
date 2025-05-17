// DropDown.js or DropDown.jsx
import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const DropDown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  className = "",
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label="Dropdown"
        className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <Select.Value placeholder={placeholder} />
        {/* Custom icon */}
        <img src="/arrow_down.svg" alt="Arrow" className="h-4 w-4" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="z-50 max-h-60 overflow-y-auto rounded-md border bg-white shadow-md"
          position="popper"
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronUp className="h-4 w-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {options.length > 0 ? (
              options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm text-gray-700 outline-none hover:bg-gray-100"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-2">
                    <Check className="h-4 w-4 text-blue-600" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))
            ) : (
              <Select.Item
                disabled
                value="no-data"
                className="px-2 py-2 text-sm text-gray-400"
              >
                No options available
              </Select.Item>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1">
            <ChevronDown className="h-4 w-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default DropDown;

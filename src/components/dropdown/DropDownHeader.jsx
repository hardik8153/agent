import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const DropDownHeader = ({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  className = "",
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={` ${className}`}>
        <Select.Value placeholder={placeholder} />
        {/* <Select.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon> */}
        <img className="" src="../arrow_down.svg" alt="" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 max-h-60 overflow-y-auto rounded-md border bg-white shadow-md">
          <Select.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronUp className="h-4 w-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1 ">
            {options.length > 0 ? (
              options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="relative   flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-2">
                    <Check className="h-4 w-4" />
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

export default DropDownHeader;

import { useState } from "react";
import MagnifyingGlass from "../assets/magnifyingGlass";

export interface DropdownItem {
  name: string;
}

export default function DropdownSearch({
  className,
  items,
  placeholder,
  value,
  setValue,
  disabled = false,
}: {
  className?: string;
  items: Array<DropdownItem> | undefined;
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(-1);
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (items && focused > -1) {
        setValue(items[focused]?.name ?? "");
        setFocused(-1);
      }
    } else if (event.key === "ArrowDown") {
      if (items && items?.length > focused + 1) {
        setFocused(focused + 1);
      }
    } else if (event.key === "ArrowUp") {
      if (-1 < focused - 1) {
        setFocused(focused - 1);
      }
    }
  };

  return (
    <>
      <div className={className} onKeyDown={handleKeyDown}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlass className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full rounded-lg border bg-inherit p-2 pl-10"
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              setValue(e.target.value);
              setFocused(-1);
            }}
            onFocus={() => setDropdownIsVisible(true)}
            onBlur={() => setDropdownIsVisible(false)}
            disabled={disabled}
          />
          {items && dropdownIsVisible && (
            <ul className="absolute z-10 w-full overflow-y-auto rounded-lg border bg-notehub-light dark:bg-notehub-dark">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <li
                    key={index}
                    className={`py-2 pl-3 ${
                      focused === index
                        ? "bg-notehub-highlightedLight dark:bg-notehub-highlightedDark"
                        : ""
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    onMouseUp={() => {
                      setValue(item.name);
                      setFocused(-1);
                    }}
                    onMouseOver={() => {
                      setFocused(index);
                    }}
                  >
                    {item.name}
                  </li>
                ))
              ) : (
                <li className="py-2 pl-3 hover:bg-notehub-highlightedLight dark:hover:bg-notehub-highlightedDark">
                  No Suggestions
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import MagnifyingGlass from "../assets/magnifyingGlass";

export interface DropdownItem {
    name: String;
}

export default function DropdownSearch({ className, items, placeholder, value, setValue }:
    {
        className?: string,
        items: Array<DropdownItem> | undefined,
        placeholder?: string,
        value: string,
        setValue: Function
    }) 
{
    const [focused, setFocused] = useState(-1);
    const [listVisible, setListVisible] = useState(false);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter'){
            e.preventDefault();
            if(items && focused > -1){
                setValue(items[focused]?.name);
            }
        } else if (e.key === 'ArrowDown') {
            const maxFocusIndex = items?.length
            if(maxFocusIndex && maxFocusIndex > focused + 1){
                setFocused(focused + 1);
            }
        } else if (e.key === 'ArrowUp') {
            if(-1 < focused - 1){
                setFocused(focused - 1);
            }
        }
      }

    return (
        <>
            <div className={className}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
{/* TODO: Fix this */}
                    <input type="text"
                        className="w-full p-2 pl-10 border rounded-lg bg-inherit"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => {setValue(e.target.value);
                        setFocused(-1);}}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onFocus={() => setListVisible(true)}
                        onBlur={() => setListVisible(false)}
                    />
                    <div onClick={() => {
                        console.log('clicked');
                        if (focused >= 0 && items){
                            setValue(items[focused]);
                        }
                    }}>
                        {items && (
                            <ul className={`${listVisible ? "" : "invisible"} bg-notehub-light dark:bg-notehub-dark w-full border rounded-lg absolute overflow-y-auto`}>
                                {items.length > 0 ? (
                                    items.map((item, index) => (
                                        <li key={index} className={`py-2 pl-3 ${focused === index ? "bg-notehub-highlightedLight dark:bg-notehub-highlightedDark" : ""}`}
                                            onClick={() => {setValue(item.name);}}
                                            onMouseOver={() => {setFocused(index)}}>
                                            {item.name}
                                        </li>
                                        ))
                                    ) : (
                                        <li className="py-2 pl-3 hover:bg-notehub-highlightedLight dark:hover:bg-notehub-highlightedDark">
                                            No Suggestions
                                        </li>
                                    )
                                }
                                </ul>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
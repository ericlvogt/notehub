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
    }) {
    return (
        <>
            <div className={className}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlass/>
                    </div>

                    {/* <input type="text"
                        className="w-full p-2 pl-10 border rounded-lg bg-inherit"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                        list="auniqueidwont"
                    >
                        <datalist id="auniqueidwont">
                            
                        </datalist>
                    </input>                     */}
                    <input type="text"
                        className="peer w-full p-2 pl-10 border rounded-lg bg-inherit"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {items && (
                        <ul className="bg-notehub-light dark:bg-notehub-dark invisible peer-focus:visible w-full border rounded-lg absolute overflow-y-auto">
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <li key={index} className="py-2 pl-3 hover:bg-notehub-highlightedLight dark:hover:bg-notehub-highlightedDark" 
                                        onClick={() => {setValue(item.name)}}>
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
        </>
    )
}
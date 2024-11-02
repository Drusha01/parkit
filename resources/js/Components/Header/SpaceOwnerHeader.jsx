import React,{useState ,useRef } from 'react'
import {Link} from '@inertiajs/react'

export const SpaceOwnerHeader = () => {
    const [isToggled, setIsToggled] = useState(false);
    function handleClick(){
        setIsToggled(!isToggled)
    }
    const containerRef = useRef(null);

    const handleBlur = (event) => {
        const container = containerRef.current;
        if (!container.contains(event.relatedTarget)) {
        console.log("Focus left the component!");
            setIsToggled( false)
        }
    };
    function handleSideNavCollapse(){
        alert('asdfsf')
    }
    return (
        <>
            <header className="sticky top-0 left-0 ml-[300px] h-[70px]  bg-gray-50 shadow-lg">
                <div className="flex h-full justify-between">
                    <div className="flex h-full w-full justify-start align-middle text-black mx-5" onClick={handleSideNavCollapse}>
                        <svg viewBox="0 -2 32 32" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="currentColor"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                    </div>
                    <div className="flex h-full w-full justify-end">
                        <div className="h-full flex items-center text-end">
                            Hanrickson Dumapit
                        </div>
                        <div className="h-full flex items-center mx-3"  
                            ref={containerRef}
                            onBlur={handleBlur}
                            onFocus={(event) => event.stopPropagation()} 
                                >
                            <button id="dropdownMenuIconButton" onClick={handleClick} 
                            
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                            <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                            <div id="dropdownDots" 
                                data-popper-placement="bottom"
                                className={ isToggled == false ? "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 hidden" : " absolute top-[72px] right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 block"}
                                aria-hidden={ isToggled == false ? "true" : ""}
                                >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                    <li>
                                        <Link href="/spaceowner/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/spaceowner/wallet" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Wallet
                                        </Link>
                                    </li>
                                </ul>
                                    <div className="py-2">
                                    <Link href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </header>
        </>
    )
}
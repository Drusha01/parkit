import React,{useState ,useRef } from 'react'
import {Link,usePage} from '@inertiajs/react'

export const SpaceOwnerHeader = (props) => {
    const [user,setUser] = useState(usePage().props.auth)
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

    return (
        <>
            <div className="flex h-full w-full justify-end">
                <div className="h-full items-center text-end pt-2 hidden md:flex">
                    {user.first_name + " " +(user.middle_name ? user.middle_name[0].toUpperCase()+".":"")+ " "+user.last_name}
                </div>
                <div className="h-full flex items-center mx-3"  
                    ref={containerRef}
                    onBlur={handleBlur}
                    onFocus={(event) => event.stopPropagation()} 
                        >
                   <button id="dropdownMenuIconButton" onClick={handleClick} className="inline-flex items-center text-sm font-medium text-center text-gray-900 bg-transparent rounded-lg focus:outline-none dark:text-white " type="button">
                        {user.profile !== null ? (
                            <img src={`/files/profile/${user.profile}`} alt="" width="40" className="rounded-full" />
                        ) : (
                            <svg viewBox="0 0 24 24" width="40" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        )}   
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
                            <li>
                                <Link href="/renter/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Be a Renter 
                                </Link>
                            </li>
                        </ul>
                        <div className="py-1">
                            <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}
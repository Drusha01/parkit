import React,{useState ,useRef } from 'react'
import { Link, usePage } from '@inertiajs/react'

export const GuestHeaderNav = (props) => {
    const [isToggled, setIsToggled] = useState(false);
    const [spaces,setSpaces] = useState(usePage().props.spaces)
    console.log(spaces,spaces.length )

    function handleClick(){
        setIsToggled(!isToggled)
    }
    
    return (
        <>
        <div className=" w-1/5 justify-end items-center hidden lg:flex mr-5"> 
            <div className="transition ease-in duration-200 hover:scale-110">
                <Link href="/login">
                    Log in
                </Link>
            </div>
            <div className="h-12 w-px bg-gray-300 mx-5">
            </div>
            <div className="transition ease-in duration-200 hover:scale-110">
                <Link href="/signup">
                    Sign up
                </Link>
            </div>
        </div>
        <div className="lg:hidden w-full flex justify-end" >
            <div className="items-center mr-5 mt-7 " onClick={handleClick} type="button" 
                 htmlFor="my-drawer-4">
                <svg viewBox="0 -2 32 32" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="#ffffff"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </div>
            <div id="drawer-right-example" className={isToggled == false ? "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800": "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 transform-none"} tabIndex="-1" aria-labelledby="drawer-right-label">
                <button type="button" onClick={handleClick}   data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="mr-2 text-gray-400 bg-transparent hover:bg-gray-200 mt-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z"></path></g></svg>
                </button>
                <ul className="mt-10 ml-2 text-black dark:text-white">
                    <li className=" p-2  transition ease-out duration-200 hover:scale-110">
                    </li>
                    <li className=" p-1  transition ease-out duration-200 hover:scale-110 ">
                        <Link href="/" className="flex gap-3 align-middle">
                            <svg width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 22L2 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M4 22V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 9.5V13.5M20 22V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="currentColor" strokeWidth="1.5"></path> </g></svg>
                            Home
                        </Link>
                    </li>
                    <li className=" p-1  transition ease-out duration-200 hover:scale-110">
                        <Link href="/browse" className="flex gap-3 align-middle">
                            <svg width="25px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15.716,4.354a8.031,8.031,0,1,0-2.7,13.138l3.58,3.581A3.164,3.164,0,0,0,21.073,16.6l-3.58-3.58A8.046,8.046,0,0,0,15.716,4.354ZM10.034,16.069A6.033,6.033,0,1,1,14.3,14.3,6,6,0,0,1,10.034,16.069Zm9.625,1.943a1.165,1.165,0,0,1-1.647,1.647l-3.186-3.186a8.214,8.214,0,0,0,.89-.757,8.214,8.214,0,0,0,.757-.89ZM11.035,14a1,1,0,0,1-1,1,4.972,4.972,0,0,1-4.966-4.965,1.014,1.014,0,0,1,1-1.017.984.984,0,0,1,1,.982v.035A2.968,2.968,0,0,0,10.035,13,1,1,0,0,1,11.035,14Z"></path></g></svg>
                            Browse
                        </Link>
                    </li>
                    <li className=" p-1  transition ease-out duration-200 hover:scale-110">
                        <Link href="/howitworks" className="flex gap-3 align-middle">
                            <svg width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"></circle> <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <circle cx="12" cy="16" r="1" fill="currentColor"></circle> </g></svg>
                            How it Works
                        </Link>
                    </li>
                    <li className=" p-1  transition ease-out duration-200 hover:scale-110">
                        <Link href="/aboutus" className="flex gap-3 align-middle">
                        <svg width="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path clipRule="evenodd" d="m12 3.75c-4.55635 0-8.25 3.69365-8.25 8.25 0 4.5563 3.69365 8.25 8.25 8.25 4.5563 0 8.25-3.6937 8.25-8.25 0-4.55635-3.6937-8.25-8.25-8.25zm-9.75 8.25c0-5.38478 4.36522-9.75 9.75-9.75 5.3848 0 9.75 4.36522 9.75 9.75 0 5.3848-4.3652 9.75-9.75 9.75-5.38478 0-9.75-4.3652-9.75-9.75zm9.75-.75c.4142 0 .75.3358.75.75v3.5c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-3.5c0-.4142.3358-.75.75-.75zm0-3.25c-.5523 0-1 .44772-1 1s.4477 1 1 1h.01c.5523 0 1-.44772 1-1s-.4477-1-1-1z" fill="currentColor" fillRule="evenodd"></path></g></svg>     About Us
                        </Link>
                    </li>
                    <li className=" p-1  transition ease-out duration-200 hover:scale-110">
                    <Link href={spaces.length > 0 ? '/spaceowner/dashboard' : '/spaceowner/login'} className="flex gap-3 align-middle">
                        <svg viewBox="0 0 24 24" width="28px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 6.09371 8.00993 3 12 3C15.9901 3 19 6.09371 19 9.5C19 11.6449 17.6877 14.0406 15.9606 16.2611C14.5957 18.016 13.0773 19.5329 12 20.5944C10.9227 19.5329 9.40427 18.016 8.03935 16.2611C6.31229 14.0406 5 11.6449 5 9.5ZM12 1C6.99007 1 3 4.90629 3 9.5C3 12.3551 4.68771 15.2094 6.46065 17.4889C7.99487 19.4615 9.7194 21.1574 10.7973 22.2173C10.9831 22.4001 11.1498 22.564 11.2929 22.7071C11.4804 22.8946 11.7348 23 12 23C12.2652 23 12.5196 22.8946 12.7071 22.7071C12.8502 22.564 13.0169 22.4001 13.2027 22.2174L13.2028 22.2173C14.2806 21.1573 16.0051 19.4615 17.5394 17.4889C19.3123 15.2094 21 12.3551 21 9.5C21 4.90629 17.0099 1 12 1ZM12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z" fill="currentColor"></path> </g></svg>
                            {spaces.length > 0 ? "My Parking Spaces" :"Be a space Owner"}
                        </Link>
                    </li>
                    <li className=" p-1 transition ease-out duration-200 hover:scale-110">
                        <hr />
                    </li>
                    <li className=" p-1 transition ease-out duration-200 hover:scale-110">
                        <Link href="/login" className="flex gap-3 align-middle">
                            <svg width="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

import React,{useState ,useRef } from 'react'
import {Link,usePage} from '@inertiajs/react'

export const RenterHeaderNav = (props) => {
    const [user,setUser] = useState(usePage().props.auth)
    const [isToggled, setIsToggled] = useState(false);
    function handleClick(){
        setIsToggled(!isToggled)
    }
    const { url, component } = usePage()
    return (
        <>
            <div className="justify-end w-1/5 items-center hidden lg:flex"> 
                <div className="h-full flex items-center text-end" onClick={handleClick}>
                    {user.first_name + " " +(user.middle_name ? user.middle_name[0].toUpperCase()+".":"")+ " "+user.last_name}
                </div>
                <div className="h-full flex items-center mx-3">
                    <button id="dropdownMenuIconButton" onClick={handleClick} className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                    <div id="drawer-right-example" className={isToggled == false ? "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800": "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 transform-none"} tabIndex="-1" aria-labelledby="drawer-right-label">
                        <button type="button"  onClick={handleClick}  data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="mr-2 text-gray-400 bg-transparent hover:bg-gray-200 mt-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-black" >
                            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z"></path></g></svg>
                        </button>
                        <ul className="mt-10 ml-2">
                            <li className="text-black p-2  transition ease-out duration-200 hover:scale-110">
                            </li>
                            <li className="text-black">
                                <Link href="/renter/profile" className={url === "/renter/profile" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <div className="mt-1">
                                        Profile
                                    </div>
                                </Link>
                            </li>
                            <li className="text-black">
                                <Link href="/renter/license" className={url === "/renter/license" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg className="text-gray-800 ml-1"  width="25px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                    </svg>
                                    <div className="mt-1">
                                        License
                                    </div>
                                </Link>
                            </li>
                        
                            <li className="text-black">
                                <Link href="/renter/registration" className={url === "/renter/registration" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H10M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M9 17H11.5M9 13H14M9 9H10M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <div className="mt-1">
                                        Registration
                                    </div>
                                </Link>
                            </li>
                            <li className="text-black">
                                <Link href="/renter/vehicles" className={url === "/renter/vehicles" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg viewBox="0 0 24 24"  width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <div className="mt-1">
                                        Vehicles
                                    </div>
                                </Link>
                            </li>
                            <li className="text-black">
                                <Link href="/renter/wallet" className={url === "/renter/wallet" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg viewBox="0 0 24 24"  width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <div className="mt-1">
                                        Wallet
                                    </div>
                                </Link>
                            </li>
                            <li className="text-black">
                                <Link href="/renter/history" className={url === "/renter/history" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg version="1.1"  width="30px" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <path className="linesandangles_een" d="M24,19V7c0-1.657-1.343-3-3-3H7C5.343,4,4,5.343,4,7v5h4v12c0,1.657,1.343,3,3,3h14 c1.657,0,3-1.343,3-3v-5H24z M8,10H6V7c0-0.551,0.449-1,1-1c0.552,0,1,0.448,1,1V10z M10,24V7c0-0.35-0.06-0.687-0.171-1H21 c0.551,0,1,0.449,1,1v12H12v5c0,0.552-0.448,1-1,1C10.449,25,10,24.551,10,24z M26,24c0,0.551-0.449,1-1,1H13.829 C13.94,24.687,14,24.35,14,24v-3h12V24z M20,12h-8v-2h8V12z M20,16h-8v-2h8V16z"></path> </g></svg>
                                    <div className="mt-1">
                                        History
                                    </div>
                                </Link>
                            </li>
                            <li className="text-black">
                                <Link href="/renter/helpandsupport" className={url === "/renter/helpandsupport" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg viewBox="0 0 512 512" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>support</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="support" fill="#000000" transform="translate(42.666667, 42.666667)"> <path d="M379.734355,174.506667 C373.121022,106.666667 333.014355,-2.13162821e-14 209.067688,-2.13162821e-14 C85.1210217,-2.13162821e-14 45.014355,106.666667 38.4010217,174.506667 C15.2012632,183.311569 -0.101643453,205.585799 0.000508304259,230.4 L0.000508304259,260.266667 C0.000508304259,293.256475 26.7445463,320 59.734355,320 C92.7241638,320 119.467688,293.256475 119.467688,260.266667 L119.467688,230.4 C119.360431,206.121456 104.619564,184.304973 82.134355,175.146667 C86.4010217,135.893333 107.307688,42.6666667 209.067688,42.6666667 C310.827688,42.6666667 331.521022,135.893333 335.787688,175.146667 C313.347976,184.324806 298.68156,206.155851 298.667688,230.4 L298.667688,260.266667 C298.760356,283.199651 311.928618,304.070103 332.587688,314.026667 C323.627688,330.88 300.801022,353.706667 244.694355,360.533333 C233.478863,343.50282 211.780225,336.789048 192.906491,344.509658 C174.032757,352.230268 163.260418,372.226826 167.196286,392.235189 C171.132153,412.243552 188.675885,426.666667 209.067688,426.666667 C225.181549,426.577424 239.870491,417.417465 247.041022,402.986667 C338.561022,392.533333 367.787688,345.386667 376.961022,317.653333 C401.778455,309.61433 418.468885,286.351502 418.134355,260.266667 L418.134355,230.4 C418.23702,205.585799 402.934114,183.311569 379.734355,174.506667 Z M76.8010217,260.266667 C76.8010217,269.692326 69.1600148,277.333333 59.734355,277.333333 C50.3086953,277.333333 42.6676884,269.692326 42.6676884,260.266667 L42.6676884,230.4 C42.6676884,224.302667 45.9205765,218.668499 51.2010216,215.619833 C56.4814667,212.571166 62.9872434,212.571166 68.2676885,215.619833 C73.5481336,218.668499 76.8010217,224.302667 76.8010217,230.4 L76.8010217,260.266667 Z M341.334355,230.4 C341.334355,220.97434 348.975362,213.333333 358.401022,213.333333 C367.826681,213.333333 375.467688,220.97434 375.467688,230.4 L375.467688,260.266667 C375.467688,269.692326 367.826681,277.333333 358.401022,277.333333 C348.975362,277.333333 341.334355,269.692326 341.334355,260.266667 L341.334355,230.4 Z"> </path> </g> </g> </g></svg>
                                    <div className="mt-1">
                                        Help and Support
                                    </div>
                                </Link>
                            </li>
                            <li className="text-black">
                                <Link href="/renter/privacypolicy" className={url === "/renter/privacy" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                    <svg viewBox="0 0 192 192" width="30px" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" stroke="#000000" stroke-width="12"> <path stroke-linecap="round" d="M151.8 144.5a74 74 0 0 1-85.59 19.21A74 74 0 0 1 22.42 87.7a74 74 0 0 1 59.55-64.42m28.03.06a74 74 0 0 1 50.06 35.61 74 74 0 0 1 5.915 61.15"></path> <path d="M76 92h40c4.432 0 8 3.568 8 8v22c0 4.432-3.568 8-8 8H76c-4.432 0-8-3.568-8-8v-22c0-4.432 3.568-8 8-8zm4 0V77.7C80 69.029 87.163 62 96 62s16 7.029 16 15.7V92"></path> </g> </g></svg>
                                    <div className="mt-1">
                                        Privacy 
                                    </div>
                                </Link>
                            </li>
                            <hr className='mx-5'/>
                            <li className="text-black">
                                <Link href="/logout" className={url === "/logout" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z" fill="#000000"></path> </g></svg>
                                    <div className="mt-1">
                                        Logout 
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end lg:hidden">
                <div className="items-center mr-5 mt-7 "  type="button" 
                    data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" 
                    data-drawer-placement="right"  onClick={handleClick} aria-controls="drawer-right-example"  htmlFor="my-drawer-4">
                    <svg viewBox="0 -2 32 32" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="#ffffff"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                </div>
                <div id="drawer-right-example" className={isToggled == false ? "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800": "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 transform-none"} tabIndex="-1" aria-labelledby="drawer-right-label">
                    <button type="button"  onClick={handleClick}  data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="mr-2 text-gray-400 bg-transparent hover:bg-gray-200 mt-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-black" >
                        <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z"></path></g></svg>
                    </button>
                    <ul className="mt-10 ml-2">
                        <li className="text-black p-2  transition ease-out duration-200 hover:scale-110">
                        </li>
                        <li className="text-black">
                            <Link href="/renter/profile" className={url === "/renter/profile" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className="mt-1">
                                    Profile
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/registration" className={url === "/renter/registration" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H10M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M9 17H11.5M9 13H14M9 9H10M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className="mt-1">
                                    Registration
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/license" className={url === "/renter/license" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg className="text-gray-800 ml-1"  width="25px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                </svg>
                                <div className="mt-1">
                                    License
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/vehicles" className={url === "/renter/vehicles" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 24 24"  width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className="mt-1">
                                    Vehicles
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/wallet" className={url === "/renter/wallet" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 24 24"  width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className="mt-1">
                                    Wallet
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/history" className={url === "/renter/history" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg version="1.1"  width="30px" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <path className="linesandangles_een" d="M24,19V7c0-1.657-1.343-3-3-3H7C5.343,4,4,5.343,4,7v5h4v12c0,1.657,1.343,3,3,3h14 c1.657,0,3-1.343,3-3v-5H24z M8,10H6V7c0-0.551,0.449-1,1-1c0.552,0,1,0.448,1,1V10z M10,24V7c0-0.35-0.06-0.687-0.171-1H21 c0.551,0,1,0.449,1,1v12H12v5c0,0.552-0.448,1-1,1C10.449,25,10,24.551,10,24z M26,24c0,0.551-0.449,1-1,1H13.829 C13.94,24.687,14,24.35,14,24v-3h12V24z M20,12h-8v-2h8V12z M20,16h-8v-2h8V16z"></path> </g></svg>
                                <div className="mt-1">
                                    History
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/helpandsupport" className={url === "/renter/helpandsupport" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 512 512" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>support</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="support" fill="#000000" transform="translate(42.666667, 42.666667)"> <path d="M379.734355,174.506667 C373.121022,106.666667 333.014355,-2.13162821e-14 209.067688,-2.13162821e-14 C85.1210217,-2.13162821e-14 45.014355,106.666667 38.4010217,174.506667 C15.2012632,183.311569 -0.101643453,205.585799 0.000508304259,230.4 L0.000508304259,260.266667 C0.000508304259,293.256475 26.7445463,320 59.734355,320 C92.7241638,320 119.467688,293.256475 119.467688,260.266667 L119.467688,230.4 C119.360431,206.121456 104.619564,184.304973 82.134355,175.146667 C86.4010217,135.893333 107.307688,42.6666667 209.067688,42.6666667 C310.827688,42.6666667 331.521022,135.893333 335.787688,175.146667 C313.347976,184.324806 298.68156,206.155851 298.667688,230.4 L298.667688,260.266667 C298.760356,283.199651 311.928618,304.070103 332.587688,314.026667 C323.627688,330.88 300.801022,353.706667 244.694355,360.533333 C233.478863,343.50282 211.780225,336.789048 192.906491,344.509658 C174.032757,352.230268 163.260418,372.226826 167.196286,392.235189 C171.132153,412.243552 188.675885,426.666667 209.067688,426.666667 C225.181549,426.577424 239.870491,417.417465 247.041022,402.986667 C338.561022,392.533333 367.787688,345.386667 376.961022,317.653333 C401.778455,309.61433 418.468885,286.351502 418.134355,260.266667 L418.134355,230.4 C418.23702,205.585799 402.934114,183.311569 379.734355,174.506667 Z M76.8010217,260.266667 C76.8010217,269.692326 69.1600148,277.333333 59.734355,277.333333 C50.3086953,277.333333 42.6676884,269.692326 42.6676884,260.266667 L42.6676884,230.4 C42.6676884,224.302667 45.9205765,218.668499 51.2010216,215.619833 C56.4814667,212.571166 62.9872434,212.571166 68.2676885,215.619833 C73.5481336,218.668499 76.8010217,224.302667 76.8010217,230.4 L76.8010217,260.266667 Z M341.334355,230.4 C341.334355,220.97434 348.975362,213.333333 358.401022,213.333333 C367.826681,213.333333 375.467688,220.97434 375.467688,230.4 L375.467688,260.266667 C375.467688,269.692326 367.826681,277.333333 358.401022,277.333333 C348.975362,277.333333 341.334355,269.692326 341.334355,260.266667 L341.334355,230.4 Z"> </path> </g> </g> </g></svg>
                                <div className="mt-1">
                                    Help and Support
                                </div>
                            </Link>
                        </li>
                        <li className="text-black">
                            <Link href="/renter/privacy" className={url === "/renter/privacy" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                                <svg viewBox="0 0 192 192" width="30px" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" stroke="#000000" stroke-width="12"> <path stroke-linecap="round" d="M151.8 144.5a74 74 0 0 1-85.59 19.21A74 74 0 0 1 22.42 87.7a74 74 0 0 1 59.55-64.42m28.03.06a74 74 0 0 1 50.06 35.61 74 74 0 0 1 5.915 61.15"></path> <path d="M76 92h40c4.432 0 8 3.568 8 8v22c0 4.432-3.568 8-8 8H76c-4.432 0-8-3.568-8-8v-22c0-4.432 3.568-8 8-8zm4 0V77.7C80 69.029 87.163 62 96 62s16 7.029 16 15.7V92"></path> </g> </g></svg>
                                <div className="mt-1">
                                    Privacy 
                                </div>
                            </Link>
                        </li>
                        <hr className='mx-5'/>
                        <li className="text-black">
                            <Link href="/logout" className={url === "/logout" ?  "flex align-middle gap-2 px-4 py-2 mx-5 bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg" : "flex align-middle gap-2 px-4 py-2 mx-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black rounded-lg"}>
                            <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z" fill="#000000"></path> </g></svg>
                                <div className="mt-1">
                                    Logout 
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

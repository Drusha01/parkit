import React from 'react';
import { Link } from '@inertiajs/react'
export const Header = () => {
    return (
        <>
            <header>
                <nav className="bg-footer-color border border-gray-200 h-[80px] text-white fixed top-0 left-0 w-full z-50" >
                    <div className="flex justify-between h-full">
                        <div className="flex items-center  h-full">
                            <Link href="/">
                                <img src="/img/logo.png" className="ml-5" width="100px" alt=""/>
                            </Link>
                        </div>
                        <div className="items-center hidden lg:flex"> 
                            <ul className="flex jusitfy-center items-center h-full gap-3">
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/browse">
                                        Browse
                                    </Link>
                                </li>
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/howitworks">
                                    How it works
                                    </Link>
                                </li>
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/aboutus">
                                    About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>  
                        <div className="items-center hidden lg:flex mr-10"> 
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
                            <div className="lg:hidden flex items-center mr-5 " type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example"  for="my-drawer-4">
                                <svg height="30px" width="30x" viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="#ffffff"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                            </div>
                            <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
                                <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="text-gray-400 bg-transparent hover:bg-gray-200 mr-2 mt-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <svg fill="#000000" height="30px" width="30x" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z"></path></g></svg>
                                </button>
                                <ul className="mt-10">
                                    <li className="text-black p-2  transition ease-out duration-200 hover:scale-110">
                                    </li>
                                    <li className="text-black p-1  transition ease-out duration-200 hover:scale-110">
                                            <a href="">Home</a>
                                    </li>
                                    <li className="text-black p-1  transition ease-out duration-200 hover:scale-110">
                                            <a href="">Browse</a>
                                    </li>
                                    <li className="text-black p-1  transition ease-out duration-200 hover:scale-110">
                                            <a href="">How it Works</a>
                                    </li>
                                    <li className="text-black p-1  transition ease-out duration-200 hover:scale-110">
                                        <a href="">Why ParkIT</a>
                                    </li>
                                    <li className="text-black p-1  transition ease-out duration-200 hover:scale-110">
                                        <hr />
                                    </li>
                                    <li className="text-black p-1  transition ease-out duration-200 hover:scale-110">
                                        <a href="">Sign in</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
  }
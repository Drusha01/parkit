import {React,useState  } from 'react'
import { Link, usePage } from '@inertiajs/react'


export const AdminNav = ({props}) => {
    const { url, component } = usePage()
    return (
        <>
           <nav className=" bg-blue-950">
                <ul className="">
                    <li className={url === "/admin/dashboard" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/dashboard" className="flex h-full gap-2 mx-3">
                            <svg fill="#fff" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="dashboard" className="icon glyph"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="2" width="9" height="11" rx="2"></rect><rect x="13" y="2" width="9" height="7" rx="2"></rect><rect x="2" y="15" width="9" height="7" rx="2"></rect><rect x="13" y="11" width="9" height="11" rx="2"></rect></g></svg>
                            <div className={props == true ? "mt-3" : "mt-3 hidden "}>
                                Dashboard    
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/spaces" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/spaces" className="flex h-full gap-2 mx-3">
                            <svg viewBox="0 0 24 24" width="32" fill="fff" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5 9.5C5 6.09371 8.00993 3 12 3C15.9901 3 19 6.09371 19 9.5C19 11.6449 17.6877 14.0406 15.9606 16.2611C14.5957 18.016 13.0773 19.5329 12 20.5944C10.9227 19.5329 9.40427 18.016 8.03935 16.2611C6.31229 14.0406 5 11.6449 5 9.5ZM12 1C6.99007 1 3 4.90629 3 9.5C3 12.3551 4.68771 15.2094 6.46065 17.4889C7.99487 19.4615 9.7194 21.1574 10.7973 22.2173C10.9831 22.4001 11.1498 22.564 11.2929 22.7071C11.4804 22.8946 11.7348 23 12 23C12.2652 23 12.5196 22.8946 12.7071 22.7071C12.8502 22.564 13.0169 22.4001 13.2027 22.2174L13.2028 22.2173C14.2806 21.1573 16.0051 19.4615 17.5394 17.4889C19.3123 15.2094 21 12.3551 21 9.5C21 4.90629 17.0099 1 12 1ZM12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z" fill="#fff"></path> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Spaces    
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/licenses" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/licenses" className="flex h-full gap-2 mx-3">
                            <svg viewBox="-0.5 0 25 25" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 9.96997H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 18.9199H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18 3.91992H6C3.79086 3.91992 2 5.71078 2 7.91992V17.9199C2 20.1291 3.79086 21.9199 6 21.9199H18C20.2091 21.9199 22 20.1291 22 17.9199V7.91992C22 5.71078 20.2091 3.91992 18 3.91992Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Licenses
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/vehicles" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/vehicles" className="flex h-full gap-2 mx-3">
                        <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Vehicles    
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/vehicle-types" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/vehicle-types" className="flex h-full gap-2 mx-3">
                            <svg fill="currentColor" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256.001,0L0.009,95.939V512h77.323h76.831h203.674h76.831h77.323V95.939L256.001,0z M123.747,481.584h-15.999v-48.869 h15.999V481.584z M357.837,481.584H154.163v-48.869h203.674V481.584z M404.252,481.584h-15.999v-48.869h15.999V481.584z M357.837,402.299H154.163H77.332H76.74v-17.236h358.52v17.236h-0.592H357.837z M253.614,240.802h-78.657l83.429-83.429h78.657 L253.614,240.802z M369.42,168.01l12.965,72.792h-85.757L369.42,168.01z M131.942,240.802h-2.327l14.861-83.429h70.896 L131.942,240.802z M399.944,271.218c11.49,0,20.839,9.349,20.839,20.839v62.59h-88.737v-63.152H301.63v63.152h-30.42v-63.152 h-30.416v63.152h-30.42v-63.152h-30.416v63.152H91.219v-62.59c0-11.49,9.348-20.839,20.839-20.839H399.944z M481.575,481.584 L481.575,481.584h-46.907v-48.869h31.008v-78.068h-14.478v-62.59c0-23.528-15.941-43.391-37.585-49.389l-20.611-115.711H118.998 l-20.611,115.71c-21.644,5.999-37.584,25.862-37.584,49.389v62.59H46.324v78.068h31.008v48.869H30.425V117.022l225.575-84.541 l225.574,84.541V481.584z"></path> </g> </g> <g> <g> <circle cx="130.283" cy="312.931" r="18.822"></circle> </g> </g> <g> <g> <circle cx="381.723" cy="312.931" r="18.822"></circle> </g> </g> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Vehicle Types   
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/users" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/users" className="flex h-full gap-2 mx-3">
                            <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="User / Users_Group"> <path id="Vector" d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Users
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/wallet" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/wallet" className="flex h-full gap-2 mx-3">
                            <svg fill="#fff" width="32" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.989 9.078c0.015-0.739-0.184-2.464-2.433-3.064l-22.576-4.519c-1.655 0-3 1.345-3 3v4.022l-1-0.002c-1.649 0.007-2.989 1.348-2.989 2.999v15.994c0 1.654 1.345 3 3 3h26.014c1.654 0 3-1.346 3-3zM5.981 4.494c0-0.522 0.402-0.952 0.913-0.996l22.063 4.465c0.008 0.004-0.164 0.56-0.965 0.55h-22.011zM30.008 27.507c0 0.552-0.448 1-1 1h-26.015c-0.552 0-1-0.448-1-1v-15.995c0-0.552 0.448-1 1-1h25.002c0.982 0 2.012-0.335 2.012-0.996v17.991h0zM5.995 17.516c-1.104 0-2 0.895-2 2s0.896 2 2 2 2-0.895 2-2-0.896-2-2-2z"></path> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Comission    
                            </div>   
                        </Link>
                    </li>
                    <li className={url === "/admin/profile" ? "w-[w-full] h-12 rounded-md text-white bg-blue-900 hover:bg-blue-900" : "w-[w-full] h-12 rounded-md text-white hover:bg-blue-900"}>
                        <Link href="/admin/profile" className="flex h-full gap-2 mx-3">
                            <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <div className={props== true ? "mt-3" : "mt-3 hidden"}>
                                Profile
                            </div>   
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
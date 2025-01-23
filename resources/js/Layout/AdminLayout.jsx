import React,{useState} from 'react';
import { AdminHeader } from '../Components/Header/AdminHeader.jsx';
import { AdminFooter } from '../Components/Footer/AdminFooter.jsx';
import { AdminNav } from '../Components/SideNavigation/AdminNav.jsx';

export const AdminLayout = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
    return (
        <>
            <div className='flex h-full'>
                <div
                    className={`${
                        isOpen ? 'w-[250px]' : 'w-[70]'
                    } bg-blue-950 h-full transition-all duration-300 ease-in-out`}
                    >
                    <div className="p-2">
                        <AdminNav props={isOpen}/>
                    </div>
                </div>
                <div className='h-full flex-1'>
                    <header className=" shadow-lg min-h-[70]"  >
                        <div className="flex justify-between pt-3">
                            <button className="flex  justify-start align-middle text-black hover:bg-gray-200 ml-5 p-3 rounded-xl" onClick={toggleSidebar}>
                                <svg viewBox="0 -2 32 32" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="currentColor"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                            </button>
                            <AdminHeader/>
                        </div>
                    </header>
                    <div className=" min-h-[600]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
};

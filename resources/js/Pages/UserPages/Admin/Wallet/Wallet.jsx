import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';
import { format } from "date-fns";
import EditModal from '../../../../Components/Modals/EditModal';

export default function Wallet(data) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal = (isTopup) => {
        setIsEditModalOpen(true);
        SetDetails(details => ({
            ...details,
            isTopUp:isTopup,
            user_id: null,
            full_name: null,
            password:null,
            balance:null,
            users:[],
        }))
        handleSearch('dropdownRegion',"users","/search/users/lastname/asc/0/","users");
    }
    const closeEditModal = () => setIsEditModalOpen(false);

    const [content,setContent] = useState({
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
    });

    const [details,SetDetails] = useState({
        id:null,
        users:[],
        isTopUp:null,
        user_id:null,
        password:null,
        balance:null,
    });

     
    const handleChange = (e) =>  {
        const key = e.target.id;
        const value = e.target.value
        SetDetails(details => ({
            ...details,
            [key]: value,
        }))
      }

    function handleContentChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setContent(content => ({
            ...content,
            [key]: value,
        }))
    }

    const HandleNextPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page+1,
        }));
    }
    const HandlePrevPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page-1,
        }));
    }

    useEffect(() => {
        GetData();
    }, []);
    
    useEffect(() => {
        if (content.page !== null) GetData();
    }, [content.page]);
    
    useEffect(() => {
        if (content.search !== null) GetData();
    }, [content.search]);

    const GetData = ()=>{
        axios.post( "/admin/wallet/all" , {  
            rows: content.rows,
            search: content.search,
            page: content.page,
        })
        .then(res => {
            setContent((prevContent) => ({
                ...prevContent,
                data: res.data.data,
                total:res.data.total,
                page:res.data.page,
              }));
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                    Swal.close();
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `${validationErrors[field].join(', ')}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }

    const openTopUpModal = () =>{

    }    

    const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
    };

    // const HandleGetDetails = (id,modalFunc)=>{
    //     axios.get( "/admin/wallet/view/"+id )
    //     .then(res => {
    //         const detail = JSON.parse(res.data.detail)
    //         modalFunc();
    //         SetDetails({
    //             ...details,
    //             id:detail.id,
    //             type:detail.type,
    //             name:detail.name,
    //             description:detail.description,
    //             icon:null,
    //             icon_url:detail.icon,
    //         });
    //     })
    //     .catch(function (error) {
    //         if (error.response && error.response.status === 422) {
    //             const validationErrors = error.response.data.errors;
    //             Object.keys(validationErrors).forEach(field => {
    //             Swal.close();
    //             Swal.fire({
    //                 position: "center",
    //                 icon: "warning",
    //                 title: `${validationErrors[field].join(', ')}`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         });
    //         } else {
    //             console.error('An error occurred:', error.response || error.message);
    //         }
    //     })
    // }

    function dropDownToggle (dropDownTarget,dropDownContainer) {
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
    }
    function selectedDropDown  (dropDownTarget,dropDownContainer,key,item,value,value_id){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
        document.getElementById(item).innerHTML = value
        SetDetails(details => ({
            ...details,
            [key]: value_id,
            full_name: value
        }))
    }

    function handleSearch(dropDownTarget,key,path,search_target){
        const search_val = (document.getElementById(search_target).value)
        axios.post( "/admin/users/all" , {  
            rows: 10,
            search: search_val,
            page: 1,
        })
        .then(res => {
            console.log((res.data.data))
            SetDetails(details => ({
                ...details,
                [key]: res.data.data
            }))
            console.log(details.users)
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                    Swal.close();
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `${validationErrors[field].join(', ')}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
            
    }

    const HandleTopUp = (e) =>{
        e.preventDefault()
        Swal.fire({
            title: "Updating...",
            didOpen: () => {
              Swal.showLoading();
            },
          });
        axios.post( "/admin/wallet/topup" , {  
            user_id:details.user_id,
            password:details.password,
            balance:details.balance,
            topup:details.isTopUp,
        })
        .then(res => {
            Swal.close();
            Swal.fire({
                position: "center",
                icon: res.data.type,
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            closeEditModal();
            GetData();
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                    Swal.close();
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `${validationErrors[field].join(', ')}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }

    return (
        <>
            <AdminLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-md ml-2">
                                <Link href="/admin/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-md ml-1">
                                <Link href="/admin/wallet">
                                    Wallets 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="content">
                        <div className="content-header my-2 mx-1 md:mx-4">
                            <div className="max-w-sm flex">
                                <label htmlFor="default-search" className="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <HeaderSearch Id={'search'} onChangeFunc={handleContentChange} value={content.search}/>
                                </div>
                            </div>
                            <div className="flex justify-end h-16">
                                <button type="button" onClick={() => openEditModal(0)}  className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                    Void
                                </button>
                                <button type="button" onClick={() =>openEditModal(1)}  className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Top up
                                </button>
                            </div>
                        </div>

                        <div className="content-body mx-1 md:mx-4">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                                <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                    <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="px-2 py-3">Fullname</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Balance</th>
                                            {/* <th scope="col" className="py-3 text-center">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.full_name}
                                                    </th>
                                                    <td className="pr-1 py-1 ">{formatCurrency(item.amount, "PHP", "en-PH")}</td>
                                                    {/* <td className="text-center gap-2 mt-2 md:mt-4">
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className=" text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md">
                                                            <svg fill="currentColor" className="text-black h-8 w-8" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <BasicPagination currentPage={content.page} perPage={content.rows} TotalRows={content.total} PrevPageFunc={HandlePrevPage} NextPageFunc={HandleNextPage} />
                    </div>
                    <div>
                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={HandleTopUp} Size={'w-full mx-1 md:w-8/12 '} title={`${details.isTopUp ? 'Top-up balance' : 'Void balance'}`} className="text-black">
                            <div className="ml-2 mr-1 mt-2">
                                <label className="block  mb-1 text-md font-bold" for="sex">User <span className="text-red-600">*</span></label>
                                <div className="inline-block w-full" id="dropDownRegionContainer" >
                                    <div id="dropdownRegionButton" onClick={() => dropDownToggle('dropdownRegion','dropDownRegionContainer')}  
                                        className="flex justify-between text-md w-full py-2.5 px-2 border border-black dark:border-gray-600 rounded-lg focus:outline-none" 
                                        type="button">
                                        <div id="region-selected" className='truncate' >
                                            {details.full_name ? details.full_name: "Select User"}
                                        </div>
                                        <div>
                                            <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </div>
                                    </div>
                                    <div id="dropdownRegion" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                        <input type="text" id="users" placeholder="Search..." onChange={() => handleSearch('dropdownRegion',"users","/search/users/lastname/asc/0/","users")} className="w-full py-2 px-4 border-b border-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                            {details.users.map((item, index) => (
                                                <li className={ details.user_id == item.id ? "px-4 py-2  bg-gray-500 dark:bg-gray-600 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 dark:bg-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer" } 
                                                    onClick={() => selectedDropDown('dropdownRegion','dropDownRegionContainer',"user_id","region-selected",item.full_name,item.id)} key={item.id} value={item.id} >{item.full_name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2 mr-1 mt-2">
                                <label for="balance" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">{details.isTopUp ? 'Top-up balance' : 'Void balance'} <span className="text-red-600">*</span></label>
                                <input type="number" min="1" required id="balance" value={details.balance} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="PXXX.XX"  
                                    />
                            </div>
                            <div className="ml-2 mr-1 mt-2">
                                <label for="password" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Password <span className="text-red-600">*</span></label>
                                <input type="password" min="1" required id="password" value={details.password} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  
                                    />
                            </div>
                          
                        </EditModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }
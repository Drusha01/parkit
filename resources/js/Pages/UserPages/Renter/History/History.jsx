import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import { format } from "date-fns";
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import EditModal from '../../../../Components/Modals/EditModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import { Star } from "lucide-react";

export default function RenterHistory({max =5}) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);

    const [content, setContent] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    })

    useEffect(() => {
        GetData()
    }, []);
      useEffect(() => {
        GetData()
    }, [content.page]);

      const HandleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        SetDetails(details => ({
            ...details,
            [key]: value,
        }))
    }


    const [details,SetDetails] = useState({
        id:null,
        user_id :null,
        space_vehicle_alotment_id:null,
        time_start:null,
        time_end:null,
        commission:null,
        rate_rate:null,
        rate_type:null,
        amount:null,
        vehicle_id:null,
        brand:null,
        unit:null,
        cr_file_number:null,
        cr_plate_number :null,
        vehicle_type_id :null,
        vehicle_type:null,
        vehicle_type_name:null,
        space_id:null,
        space_name:null,
        rules :null,
        description :null,
        location_long :null,
        location_lat :null,
        overall_rating :null,
        date_created :null,
        date_updated :null,
        rate:null,
        remarks:null,
    })
    const GetData = () =>{
        axios.post( "/renter/history/all" , {  
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


    const HandleVehicleNextPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page+1,
        }));
    }
    const HandleVehiclePrevPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page-1,
        }));
    }
    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/renter/history/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            modalFunc();
            SetDetails({
                id:detail.id,
                user_id :detail.user_id,
                space_vehicle_alotment_id:detail.space_vehicle_alotment_id,
                time_start:detail.time_start,
                time_end:detail.time_end,
                commission:detail.commission,
                rate_rate:detail.rate_rate,
                rate_type:detail.rate_type,
                amount:detail.amount,
                vehicle_id:detail.vehicle_id,
                brand:detail.brand,
                unit:detail.unit,
                cr_file_number:detail.cr_file_number,
                cr_plate_number :detail.cr_plate_number,
                vehicle_type_id :detail.vehicle_type_id,
                vehicle_type:detail.vehicle_type,
                vehicle_type_name:detail.vehicle_type_name,
                space_id:detail.space_id,
                space_name:detail.space_name,
                rules :detail.rules,
                description :detail.description,
                location_long :detail.location_long,
                location_lat :detail.location_lat,
                overall_rating :detail.overall_rating,
                date_created :detail.date_created,
                date_updated :detail.date_updated,
                rate:detail.rate,
                remarks:detail.remarks,
            });
            setRating(1)
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
 
    const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
    };
    const formatNumber = (num,padding) => {
        return String(num).padStart(padding, "0");
    };
    
    const HandleRateSpace = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/history/rate`, {
            id :details.id,
            rating:rating,
            remarks:details.remarks
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Successfully added',
                    showConfirmButton: false,
                    timer: 1500
                });
                closeEditModal();
                GetData();
            }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).every(field => {
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
            <RenterLayout>
                <div className="main-content w-full lg:w-4/5 bg-white dark:text-white dark:bg-gray-700 rounded-xl shadow-lg">   
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-bold mb-6">History</h1>
                        
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2 dark:border dark:border-white">
                            <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-md uppercase bg-gray-300 dark:bg-gray-200 dark:text-black ">
                                    <tr className="bg-gray-300 text-left">
                                        <th className="px-2 font-semibold text-center text-gray-600 py-4">#</th>
                                        <th className="pr-1 py-1 font-semibold text-gray-600">Ref#</th>
                                        <th className="pr-1 py-1 font-semibold text-gray-600">Vehicle</th>
                                        <th className="pr-1 py-1 font-semibold text-gray-600">Parking Space</th>
                                        <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Time</th>
                                        <th className="pr-1 py-1 font-semibold text-gray-600">Fee</th>
                                        <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.data.length > 0 ? 
                                        (content.data.map((item, index) => (
                                            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <td className="px-4 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                <td className="pr-1 py-1 ">#{item.space_id}-{formatNumber(item.id,8)}</td>
                                                <td className="pr-1 py-1 ">{item.vehicle_type} - {item.brand} : {item.cr_file_number}</td>
                                                <td className="pr-1 py-1 ">{item.space_name}</td>
                                                <td className="pr-1 py-1 text-center">{format(new Date(item.time_start), "MMM d, yyyy h:mm a")} - {format(new Date(item.time_end), "MMM d, yyyy h:mm a")}  </td>
                                                <td className="pr-1 py-1 ">{formatCurrency(item.amount, "PHP", "en-PH")}</td>
                                                <td className="pr-1 py-1 flex justicy-center">
                                                    <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="btn text-white hover:bg-blue-600 bg-blue-700 px-3 py-1 rounded-md">View</button>
                                                    {item.rate === null ? (
                                                        <button onClick={() => HandleGetDetails(item.id, openEditModal)} className="mx-2 focus:outline-2  border hover:bg-yellow-500 hover:text-white focus:ring-4 focus:ring-yellow-600 bg-yellow-600 text-white font-medium rounded-lg text-md px-3 py-2">
                                                            Rate
                                                        </button>
                                                    ) :(
                                                        <>
                                                        <div className="mt-3 ml-2">
                                                            <div className="relative w-7 h-7">
                                                                <Star className="absolute text-gray-500 " size={28} fill="currentColor" stroke="currentColor" />
                                                                <div className={`absolute top-0 left-0 w-${item.rate}/5 overflow-hidden`}>
                                                                <Star className="text-yellow-500" size={28} fill="currentColor" stroke="currentColor" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </>
                                                    )}
                                                </td>
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
                        <BasicPagination currentPage={content.page} perPage={content.rows} TotalRows={content.total} PrevPageFunc={HandleVehiclePrevPage} NextPageFunc={HandleVehicleNextPage} />
                    </div>
                    <div>
                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal}  Size={'w-12/12 md:w-8/12 mx-2'} FuncCall={HandleRateSpace}  title="Edit Vehicle">
                            <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 mx-4 md:mr-1 md:ml-4  mb-2">
                                    <label for="cr_plate_number" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Parking Space </label>
                                    <input type="text" id="space_name" value={details.space_name} disabled  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" />
                                </div>
                                <div className="col-span-4 mx-4 md:mr-1 md:ml-4  mb-2">
                                    <label for="cr_plate_number" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Rate <span className="text-red-600">*</span></label>
                                   
                                    <div className="flex space-x-1">
                                        {[...Array(max)].map((_, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`text-yellow-400 transition ${
                                                (hover || rating) >= ratingValue ? "scale-110" : "opacity-50"
                                                }`}
                                                onClick={() => setRating(ratingValue)}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(0)}
                                            >
                                                <Star
                                                size={28}
                                                fill={(hover || rating) >= ratingValue ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                />
                                            </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-4 mx-4 md:mr-1 md:ml-4  mb-2">
                                    <label for="cr_plate_number" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Remarks </label>
                                    <textarea type="text" id="remarks" value={details.remarks} onChange={HandleChange}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Remarks ... " rows="5"/>
                                </div>
                            </div>
                        </EditModal>
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} title="Parking Details" Size={'w-full mx-1 md:w-8/12 '} Height={'max-h-[500px]'}>
                            <div className="w-full grid mb-2 grid-cols-4">
                                <div className="col-span-4 mt-3">
                                    <label for="name" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Ref#  </label>
                                    <input type="text" id="name" value={details.space_id+ "-" +formatNumber(details.id,8)}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" 
                                        required />
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:mr-1 mt-3">
                                    <label for="rules" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Vehicle </label>
                                    <input type="text" id="name" value={details.vehicle_type + " - " +  details.brand+ " - " +details.cr_file_number}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" 
                                        required />
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                    <label for="description" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Parking Space</label>
                                    <input type="text" id="name" value={details.space_name}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" 
                                        required />
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:mr-1 mt-3">
                                    <label for="description" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Time</label>
                                    <input type="text" id="name" value={format(new Date(details.time_start), "MMM d, yyyy h:mm a") + " - " + format(new Date(details.time_end), "MMM d, yyyy h:mm a")}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" 
                                        required />
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                    <label for="description" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Fee</label>
                                    <input type="text" id="name" value={formatCurrency(details.amount, "PHP", "en-PH")}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" 
                                        required />
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                    <label for="description" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Rating</label>
                                    {details.rate === null ? (
                                        <div className="mt-3 ml-2">
                                            N/A
                                        </div>
                                    ) :(
                                        <>
                                        <div className=" ml-2">
                                            <div className="relative w-7 h-7">
                                                <Star className="absolute text-gray-500 " size={28} fill="currentColor" stroke="currentColor" />
                                                <div className={`absolute top-0 left-0 w-${details.rate}/5 overflow-hidden`}>
                                                <Star className="text-yellow-500" size={28} fill="currentColor" stroke="currentColor" />
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    )}
                                </div>
                            </div> 
                        </ViewModal>
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};

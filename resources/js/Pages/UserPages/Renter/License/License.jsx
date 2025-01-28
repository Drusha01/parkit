import { Link, usePage } from '@inertiajs/react'
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import {React, useState, useEffect, useRef } from 'react';


export default function RenterLicense(props) {
    const [user,setUser] = useState(props.user)

    const contentFileRef = useRef(null);

    useEffect(() => {
        GetLicenseDetails()
        return () => {
        };
      }, []);
    const [license,setLicense] = useState({
        is_approved:null,
        license_no:null,
        picture_of_license:null,
        picture_holding_license:null,
        picture_of_license_url:null,
        picture_holding_license_url:null,
    })

    const handleLicenseChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setLicense(license => ({
            ...license,
            [key]: value,
        }))
    }

    const handleLicenseFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setLicense(license => ({
            ...license,
            [key]:event.target.files[0]
        }))
    };

    const GetLicenseDetails = () =>{
        axios.get( "/renter/license/mylicense")
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            console.log(detail);
            setLicense(license => ({
                is_approved:detail.is_approved,
                license_no:detail.license_no,
                picture_of_license:null,
                picture_holding_license:null,
                picture_of_license_url:detail.picture_of_license,
                picture_holding_license_url:detail.picture_holding_license,
                })
            )
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
    const HandleClearDetails = () => {
        setLicense({
            picture_of_license:null,
            picture_holding_license:null,
        });
    }
    const UpdateLicense = () =>{
        axios.post(`/renter/license/update`, {
            license_no:license.license_no,
            picture_of_license:license.picture_of_license,
            picture_holding_license:license.picture_holding_license,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                GetLicenseDetails();
                HandleClearDetails();
                contentFileRef.current.value = "";
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
    const UpdateLicenseRenew = () =>{
        axios.post(`/renter/license/update`, {
            is_approved:0,
            license_no:license.license_no,
            picture_of_license:license.picture_of_license,
            picture_holding_license:license.picture_holding_license,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                GetLicenseDetails();
                HandleClearDetails();
                contentFileRef.current.value = "";
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

    const AskUpdateLicense = () =>{
        Swal.fire({
            title: "Note that admin will have to approve this?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            if (result.isConfirmed) {
                UpdateLicenseRenew();
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved");
            }
          });
    }

    return (
        <>
            <RenterLayout props={props}>
                <div className="main-content w-full lg:w-4/5 shadow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px] flex flex-col relative">    
                    <div className="h-full">  
                        <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                            License
                        </div>
                        <div className="w-full grid mb-2 md:grid-cols-4">
                            <div className="col-span-4 mx-4 mb-2">
                                <label for="license-no" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">License no. <span className="text-red-600">*</span></label>
                                <input type="text" id="license_no" value={license.license_no} onChange={handleLicenseChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="License no."  required />
                            </div>
                    
                            <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                <div className='w-full'>
                                    <label for="picture_of_license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture of License <span className="text-red-600">*</span></label>
                                    <input onChange={handleLicenseFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture_of_license" type="file" accept="image/*"  ref={contentFileRef}/>
                                </div>
                                { 
                                    license.picture_of_license_url  && (
                                        <>
                                            <div className=" mt-5 flex justify-center">
                                                <a className="btn view bg-main-color text-white" target='_blank' href={license.picture_of_license_url ? "/files/license/pictureoflicense/"+license.picture_of_license_url : ""}>
                                                    View
                                                </a>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="flex col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                <div className="w-full">
                                    <label for="picture_holding_license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture holding License <span className="text-red-600">*</span></label>
                                    <input onChange={handleLicenseFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture_holding_license" type="file" accept="image/*"  ref={contentFileRef}/>
                                </div>
                                { 
                                    license.picture_holding_license_url && (
                                        <>
                                            <div className=" mt-5 flex justify-center">
                                                <a className="btn view bg-main-color text-white" target='_blank' href={license.picture_holding_license_url ? "/files/license/pictureholdinglicense/"+license.picture_holding_license_url : ""}>
                                                    View
                                                </a>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div> 
                    {license.is_approved == 0 ? (
                        <div className="flex justify-center p-4 ">
                           <button 
                               onClick={UpdateLicense} 
                               className="focus:outline-2 border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 bg-green-600 text-white font-medium rounded-lg text-sm px-3 py-2"
                           >
                               Save
                           </button>
                       </div> 
                    ) : (
                        <div className="flex justify-center p-4 ">
                        <button 
                            onClick={AskUpdateLicense} 
                            className="focus:outline-2 border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 bg-green-600 text-white font-medium rounded-lg text-sm px-3 py-2"
                        >
                            Save
                        </button>
                    </div> 
                    )}
                 
                </div>
            </RenterLayout>
        </>
    )
}

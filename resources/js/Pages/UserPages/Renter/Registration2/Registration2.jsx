import { Link, usePage } from '@inertiajs/react'
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import {React, useState} from 'react';
import AddModal from '../../../../Components/Modals/AddModal';


export default function Registration2 (props) {
    const [user,setUser] = useState(props.user)

    const [vehicles, setVehicles] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    })
    const [registration,setRegistration] = useState({
        step:1,
        user_id:user.id,
        gender_id: (user.gender_id) ? user.gender_id : "",
        first_name:user.first_name,
        middle_name:(user.middle_name) ? user.middle_name : "",
        last_name:user.last_name,
        suffix:(user.suffix) ? user.suffix : "",
        mobile_number:(user.mobile_number) ? user.mobile_number : "",
        birthdate:(user.birthdate) ? user.birthdate : "",
        region_id:(user.region_id) ? user.region_id : "",
        region:(user.region) ? user.region : "",
        regions:props.regions,
        province_id:(user.province_id) ? user.province_id : "",
        province:(user.province) ? user.province : "",
        provinces:props.provinces,
        city_id:(user.city_id) ? user.city_id : "",
        city:(user.city) ? user.city : "",
        cities:props.cities,
        barangay_id:(user.brgy_id) ? user.brgy_id : "",
        brgy:(user.brgy) ? user.brgy : "",
        barangays:props.barangays,
        street:(user.street) ? user.street : "",
    });

    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setRegistration(registration => ({
            ...registration,
            [key]:event.target.files[0]
        }))
    };

   

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setRegistration(registration => ({
            ...registration,
            [key]: value,
        }))
    }
    
    const handlePrevSubmit = () => {
        if(registration.step >1){
            setRegistration(registration => ({
                ...registration,
                step: registration.step -1
            }))
        }
    }
    function goToStep(step){
        setRegistration(registration => ({
            ...registration,
            step: step
        }))
    }

    function dropDownToggle(dropDownTarget,dropDownContainer){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
    }
    function selectedDropDown(dropDownTarget,dropDownContainer,key,item,value,value_id){
        console.log(item)
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
        setRegistration(registration => ({
            ...registration,
            [key]: value_id,
            [item]:value
        }))
    }
    function handleSearch(dropDownTarget,key,path,search_target){
        const search_val = (document.getElementById(search_target).value)
        axios.get(path+search_val)
        .then(res => {
            setRegistration(registration => ({
                ...registration,
                [key]: res.data
            }))
        })
    }



    function HandleSubmit(e){
        e.preventDefault()
        if(registration.step == 1){
            update_profile()
        }else if(registration.step == 2){
            // update_license()
        }else if(registration.step == 3){
            // update_vehicles()
        }else if(registration.step == 3){

        }
    }
    // -------------------------------------  PROFILE -----------------------------
    const update_profile = () => {
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/profile/update`, {  
            first_name:registration.first_name,
            middle_name:registration.middle_name,
            last_name:registration.last_name,
            suffix:registration.suffix,
            sex_id:registration.sex_id,
            gender_id:registration.gender_id,
            mobile_number:registration.mobile_number,
            birthdate:registration.birthdate,
            region_id:registration.region_id,
            province_id:registration.province_id,
            city_id:registration.city_id,
            brgy_id:registration.barangay_id,
            street:registration.street,
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                setRegistration(registration => ({
                    ...registration,
                    step: registration.step + 1
                }))
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

    // ------------------------------------- -----------------------------
    const addVehicles = () =>{

    }
    // ------------------------------------- -----------------------------


  return (
    <>
        <RenterLayout >
            <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                <div className="">
                    <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                        Registration
                    </div>
                    <div className="flex justify-center w-full"> 
                        <ol className="flex w-full mx-40 mb-10">
                            <li className={registration.step > 1 ?"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-gray-700" :"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"}>
                                <button>
                                    <span onClick={()=>goToStep(1)} className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                        <svg className="w-6 h-6 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg"><g  stroke-width="0"></g>
                                            <g  stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" 
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" 
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            <li className={registration.step > 2 ?"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-gray-700" :"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"}>
                                <button>
                                    <span onClick={()=>goToStep(2)} className={registration.step>1 ? "flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0":"flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"}>
                                        <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            <li className={registration.step > 3 ?"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-gray-700" :"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"}>
                                <button >
                                    <span onClick={()=>goToStep(3)} className={registration.step>2 ? "flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0":"flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"}>
                                        <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" width="25px" viewBox="0 0 100 100" aria-hidden="true" role="img" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g >
                                                <path d="M49.368 11.228c-11.646-.171-27.826.079-31.156 9.027l-8.184 19.204a2.85 2.85 0 0 0-1.37-.865l-3.296-.927a2.86 2.86 0 0 0-3.534 1.983l-1.72 6.104a2.86 2.86 0 0 0 1.983 3.535l3.297.927c.11.03.22.04.33.059c-.63 1.569-1.023 3.295-1.023 4.322v22.32c0 1.145.48 1.674 1.243 1.922v5.947a4.008 4.008 0 0 0 4.017 4.017H20.73a4.008 4.008 0 0 0 4.017-4.017v-5.729h50.504v5.729a4.01 4.01 0 0 0 4.018 4.017h10.775a4.01 4.01 0 0 0 4.019-4.017v-5.947c.763-.248 1.24-.777 1.24-1.922v-22.32c0-1.027-.393-2.753-1.022-4.322c.11-.018.22-.028.33-.06l3.297-.926a2.86 2.86 0 0 0 1.982-3.535l-1.717-6.104a2.861 2.861 0 0 0-3.536-1.983l-3.295.927a2.855 2.855 0 0 0-1.37.865l-8.185-19.204c-3.57-9.084-20.773-8.856-32.42-9.027zm33.358 29.444c.194.576-.386.96-.993.995c0 0-1.984.168-4.72.389c-2.082-4.864-6.92-8.292-12.525-8.292c-6.151 0-11.373 4.13-13.048 9.754c-.464.006-1.003.026-1.435.026c-10.596 0-31.738-1.877-31.738-1.877c-.607-.036-1.187-.419-.993-.995c8.142-24.821 8.385-22.955 32.275-22.694c23.891.26 24.03-1.513 33.177 22.694zm-18.238-2.217a8.886 8.886 0 0 1 7.447 3.991c-4.785.356-10.292.719-15.424.93a8.879 8.879 0 0 1 7.977-4.921zM9.407 46.511c.072.106.142.213.221.317h-.31zm5.294 6.234c2.096-.035 13.348 3.753 13.348 3.753c1.405.395 2.642 3.051 2.635 4.511c-.021 4.917-12.71 3.21-17.86 3.23a2.63 2.63 0 0 1-2.635-2.634V55.38c0-1.46 2.416-2.6 4.512-2.635zm70.598 0c2.096.034 4.512 1.175 4.512 2.635v6.225a2.63 2.63 0 0 1-2.635 2.635c-5.15-.02-17.839 1.686-17.86-3.23c-.007-1.46 1.23-4.117 2.635-4.512c0 0 11.252-3.788 13.348-3.753z" fill="currentColor">
                                                </path>
                                            </g>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            <li className="flex items-center">
                                <button >
                                <span onClick={()=>goToStep(4)} className={registration.step>3 ? "flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0":"flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"}>
                                        <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ol>
                    </div>
                    <div className="w-full ">
                        <form onSubmit={HandleSubmit} className="ml-2">
                            {registration.step == 1 && (
                                    <>
                                        <div className="my-5 ml-10 text-xl font-semibold">Profile details</div>
                                        <div className="mb-2 mx-2">
                                            <label for="firstname"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First name <span className="text-red-600">*</span></label>
                                            <input type="text" id="first_name" value={registration.first_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required />
                                        </div> 
                                        <div className="mb-2 mx-2">
                                            <label for="middlename" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                            <input type="text" id="middle_name" value={registration.middle_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Middle name"  />
                                        </div> 
                                        <div className="mb-2 mx-2">
                                            <label for="last_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last name <span className="text-red-600">*</span></label>
                                            <input type="text" id="last_name" value={registration.last_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required />
                                        </div> 
                                        <div className="w-full grid mb-2 md:grid-cols-4">
                                            <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 ml-2 mr-2 md:mr-1 lg:mr-1 xl:mr-1">
                                                <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Suffix</label>
                                                <input type="text" id="suffix" value={registration.suffix} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Suffix"  />
                                            </div>
                                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-0 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Sex <span className="text-red-600">*</span></label>
                                                <select required id="sex_id" value={registration.sex_id} onChange={handleChange} tabIndex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Select Sex</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                            </div>
                                            <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 mx-2 md:mr-1 lg:ml-2 xl:ml-0 lg:mr-1 xl:mr-1">
                                                <label for="mobile_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone number<span className="text-red-600">*</span></label>
                                                <input type="tel" id="mobile_number"  value={registration.mobile_number} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
                                            </div>
                                            <div className="col-span-4 md:col-span-2 lg:col-span-2 md:ml-0 xl:col-span-1 mx-2 lg:mr-1 lg:ml-0 xl:mr-2 xl:ml-0 mb-2 ">
                                                <label for="birthdate" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Birthdate <span className="text-red-600">*</span></label>
                                                <input id="birthdate" type="date" value={registration.birthdate} onChange={handleChange} required
                                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Select date"/>
                                            </div>
                                            <div className="col-span-4 md:col-span-2 lg-colspan-2 xl-colspan-2 ml-2 mr-2 lg:mr-1">
                                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Region <span className="text-red-600">*</span></label>
                                                <div className="inline-block w-full h-full" id="dropDownRegionContainer"  >
                                                    <div id="dropdownRegionButton" onClick={() => dropDownToggle('dropdownRegion','dropDownRegionContainer')} 
                                                        className="flex justify-between text-sm w-full py-2.5 px-2 border border-black rounded-lg focus:outline-none" 
                                                        type="button">
                                                        <div id="region-selected" className='truncate' >
                                                            {registration.region ? registration.region: "Select Region"}
                                                        </div>
                                                        <div>
                                                            <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        </div>
                                                    </div>
                                                    <div id="dropdownRegion" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                                        <input type="text" id="regions_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownRegion',"regions","/search/refregion/regDesc/asc/0/","regions_input_search")} className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                                            {registration.regions.map((item, index) => (
                                                                <li className={ registration.region_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 hover:text-white cursor-pointer" } onClick={() => selectedDropDown('dropdownRegion','dropDownRegionContainer',"region_id","region",item.regDesc,item.id)} key={item.id} value={item.id} >{item.regDesc}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-4 md:col-span-2 lg-colspan-2 xl-colspan-2 mx-2 lg:ml-0 ">
                                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Province <span className="text-red-600">*</span></label>
                                                <div className="inline-block w-full h-full" id="dropDownProvinceContainer" >
                                                    <div id="dropdownProvinceButton" onClick={() => dropDownToggle('dropdownProvince','dropDownProvinceContainer')}  
                                                        className="flex justify-between text-sm w-full py-2.5 px-2 border border-black rounded-lg focus:outline-none" 
                                                        type="button">
                                                        <div id="province-selected" className='truncate'>
                                                            {registration.province ? registration.province: "Select Province"}
                                                        </div>
                                                        <div>
                                                            <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        </div>
                                                    </div>
                                                    <div id="dropdownProvince" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                                        <input type="text" id="provinces_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownProvince',"provinces","/search/refprovince/provDesc/asc/10/","provinces_input_search")} className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                                            {registration.provinces.map((item, index) => (
                                                                <li className={ registration.province_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 hover:text-white cursor-pointer" } 
                                                                onClick={() => selectedDropDown('dropdownProvince','dropDownProvinceContainer',"province_id","province",item.provDesc,item.id)} key={item.id} value={item.id} >{item.provDesc}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-4 md:col-span-2 lg-colspan-2 xl-colspan-2 mx-2 lg:mr-1 mt-2">
                                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">City / Municipality <span className="text-red-600">*</span></label>
                                                <div className="inline-block w-full h-full" id="dropDownCityContainer" >
                                                    <div id="dropdownCityButton" onClick={() => dropDownToggle('dropdownCity','dropDownCityContainer')}  
                                                        className="flex justify-between text-sm w-full py-2.5 px-2 border border-black rounded-lg focus:outline-none" 
                                                        type="button">
                                                        <div id="city-selected" className='truncate' >
                                                            {registration.city ? registration.city: "Select City"}
                                                        </div>
                                                        <div>
                                                            <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        </div>
                                                    </div>
                                                    <div id="dropdownCity" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                                        <input type="text" id="city_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownCity',"cities","/search/refcitymun/citymunDesc/asc/10/","city_input_search")} className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                                            {registration.cities.map((item, index) => (
                                                                <li className={ registration.city_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 hover:text-white cursor-pointer" } 
                                                                    onClick={() => selectedDropDown('dropdownCity','dropDownCityContainer',"city_id","city",item.citymunDesc,item.id)} key={item.id} value={item.id} >{item.citymunDesc}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-4 md:col-span-2 lg-colspan-2 xl-colspan-2 mx-2 lg:ml-0 mt-2">
                                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Barangay <span className="text-red-600">*</span></label>
                                                <div className="inline-block w-full h-full" id="dropDownBrgyContainer" >
                                                    <div id="dropdownBrgyButton" onClick={() => dropDownToggle('dropdownBrgy','dropDownBrgyContainer')}  
                                                        className="flex justify-between text-sm w-full py-2.5 px-2 border border-black rounded-lg focus:outline-none" 
                                                        type="button">
                                                        <div id="brgy-selected" className='truncate'>
                                                            {registration.brgy ? registration.brgy: "Select Barangay"}
                                                        </div>
                                                        <div>
                                                            <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        </div>
                                                    </div>
                                                    <div id="dropdownBrgy" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                                        <input type="text" id="brgy_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownBrgy',"barangays","/search/refbrgy/brgyDesc/asc/10/","brgy_input_search")} className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        <ul id="dropdownList3" className="max-h-60 overflow-y-auto">
                                                            {registration.barangays.map((item, index) => (
                                                                <li className={ registration.city_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 hover:text-white cursor-pointer" } 
                                                                    onClick={() => selectedDropDown('dropdownBrgy','dropDownBrgyContainer',"barangay_id","brgy",item.brgyDesc,item.id)} key={item.id} value={item.id} >{item.brgyDesc}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-4 md:col-span-4 lg-colspan-4 xl-colspan-4 mx-2">
                                                <label for="street" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                                <input type="text" id="street" value={registration.street} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Street" />
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {registration.step == 2 && (
                                    <>
                                        <div className="my-5 ml-10 text-xl font-semibold">
                                            License details
                                        </div>
                                        <div className="w-full grid mb-2 md:grid-cols-4">
                                            <div className="col-span-4 mx-4 mb-2">
                                                <label for="license-no" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">License no. <span className="text-red-600">*</span></label>
                                                <input type="text" id="license_no" value={registration.license_no} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="License no."  required />
                                            </div>
                                    
                                        <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                            <div className='w-full'>
                                                <label for="picture_of_license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture of License <span className="text-red-600">*</span></label>
                                                <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="picture_of_license" type="file" accept="image/*" />
                                            </div>
                                            { 
                                                registration.picture_of_license_url  && (
                                                    <>
                                                        <div className=" mt-5 flex justify-center">
                                                            <a className="btn view bg-main-color text-white" target='_blank' href={registration.picture_of_license_url ? "/files/license/pictureoflicense/"+registration.picture_of_license_url : ""}>
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
                                                <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="picture_holding_license" type="file" accept="image/*" />
                                            </div>
                                            { 
                                                registration.picture_holding_license_url && (
                                                    <>
                                                        <div className=" mt-5 flex justify-center">
                                                            <a className="btn view bg-main-color text-white" target='_blank' href={registration.picture_holding_license_url ? "/files/license/pictureholdinglicense/"+registration.picture_holding_license_url : ""}>
                                                                View
                                                            </a>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        </div>
                                    </>
                                )   
                            }
                            {registration.step == 3 && (
                                    <>
                                        <div className="flex justify-between">
                                            <div className="ml-5 text-xl font-semibold">
                                                Vehicles
                                            </div>
                                            <div className="flex justify-end mx-5 mb-5 ">
                                                <button type="button" className=" bg-green-700 text-white rounded-lg p-3 py-2" onClick={addVehicles}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                                        <tr className="text-md">
                                                            <th scope="col" className="py-3 text-center">#</th>
                                                            <th scope="col" className="pl-5 py-3">Plate Number</th>
                                                            <th scope="col" className="py-3">MV File</th>
                                                            <th scope="col" className="py-3">Vehicle Type</th>
                                                            <th scope="col" className="py-3 text-center">COR</th>
                                                            <th scope="col" className="py-3 text-center">COR Picture</th>
                                                            <th scope="col" className="py-3 text-center">Vehicle</th>
                                                            <th scope="col" className="py-3 text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {vehicles.data.length > 0 ? 
                                                            (content.data.map((space, index) => (
                                                                <tr key={space.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                                    <td className="px-4 py-2 border-b text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                                    <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {space.name}
                                                                    </th>
                                                                    <td className="py-4">{space.rules}</td>
                                                                    <td className="py-4">{`Lat: ${space.location_lat}, Long: ${space.location_long}`}</td>
                                                                    <td className="py-4 text-center">
                                                                        {space.is_approved == 1 ? (
                                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                                                                                Pending
                                                                            </span>
                                                                        ) : (
                                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                                                                                New
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td className="text-center flex justify-center gap-2 mt-2">
                                                                        <button onClick={() => HandleViewModal(space.id, openViewLocModal)} className="focus:outline-2 text-black border border-black hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2">
                                                                            View
                                                                        </button>
                                                                        <button onClick={() => getSpaceContentImage(space.id, openViewContentModal)} className="focus:outline-2 text-black border border-black hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2">
                                                                            Images
                                                                        </button>
                                                                        <button onClick={() => getAllotments(space.id, openViewAllotmentModal)} className="focus:outline-2 text-black border border-black hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2">
                                                                            Allotments
                                                                        </button>
                                                                        <Link href={`/spaceowner/spaces/edit/${space.id}`} className="text-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2">
                                                                            Edit
                                                                        </Link>
                                                                        {!space.is_approved && (
                                                                            <button onClick={() => HandleGetDetails(space.id, openDeleteModal)} className="text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
                                                                                Delete
                                                                            </button>
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
                                        </div>
                                        <div className="pagination">

                                        </div>
                                     
                                    </>
                                )
                            }

                            {registration.step >3 && (
                                <>
                                    <div className='min-h-[200px] '>
                                        <div className='text-xl text-center'>
                                            Please review your registration .. 
                                        </div>
                                        <div className="flex justify-center my-5">
                                            <Link className='py-2.5 bg-yellow-300 px-3.5 rounded-lg' href="/renter/registration">
                                                Review
                                            </Link>
                                        </div>
                                    </div>
                                </>
                                )
                            }
                            <div className="flex justify-evenly w-full mt-5"> 
                                <button type="button" className={registration.step == 1 ? "bg-gray-600 text-white rounded-lg p-3 py-2 opacity-0 ":"bg-gray-600 text-white rounded-lg p-3 py-2"} onClick={handlePrevSubmit}>
                                    Prev
                                </button>
                                {registration.step <=3?
                                    <button type="submit" className="bg-green-600 text-white rounded-lg p-3 py-2">
                                        Next
                                    </button>
                                :
                                <button type="submit" className="bg-green-600 text-white rounded-lg p-3 py-2">
                                    Submit
                                </button>
                                }
                            </div>
                        </form>
                    </div>    
                </div>
            </div>
        </RenterLayout>
    </>
  )
}

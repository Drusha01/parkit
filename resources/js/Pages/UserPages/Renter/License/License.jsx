import { Link, usePage } from '@inertiajs/react'
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import {React, useState} from 'react';


export default function RenterLicense(props) {
    const [user,setUser] = useState(props.user)
    const [license,setLicense] = useState(props.license)
    const [registration,setRegistration] = useState({
        user_id:user.id,
        license_id: (license) ? license.id : "",
        is_approved:(license) ? license.is_approved : "",
        nationality_id:(license) ? license.nationality_id : "",
        sex_id:user.sex_id,
        nationality:props.nationality,
        weight:(license) ? license.weight : "",
        height:(license) ? license.height : "",
        license_no:(license) ? license.license_no : "",
        expiration_date:(license) ? license.expiration_date : "",
        agency_code:(license) ? license.agency_code : "",
        blood_type_id:(license) ? license.blood_type_id : "",
        blood_types: props.blood_types,
        eye_color_id:(license) ? license.eye_color_id : "",
        eye_colors:props.eye_colors,
        license_condition_id:(license) ? license.license_condition_id : "",
        license_conditions: props.license_conditions,
        restriction_codes:(license) ? license.restriction_codes : "",
        picture_of_license:"",
        picture_holding_license:"",
        picture_of_license_url:(license) ? license.picture_of_license : "",
        picture_holding_license_url:(license) ? license.picture_holding_license : "",

    });

    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setRegistration(registration => ({
            ...registration,
            [key]:event.target.files[0]
        }))
    };

    function update_license(){
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const formData = new FormData();
        formData.append('picture_of_license', registration.picture_of_license);
        formData.append('picture_holding_license', registration.picture_holding_license);
        formData.append('nationality_id', registration.nationality_id);
        formData.append('weight', registration.weight);
        formData.append('sex_id', registration.sex_id);
        formData.append('height', registration.height);
        formData.append('license_no', registration.license_no);
        formData.append('expiration_date', registration.expiration_date);
        formData.append('agency_code', registration.agency_code);
        formData.append('blood_type_id', registration.blood_type_id);
        formData.append('eye_color_id', registration.eye_color_id);
        formData.append('license_condition_id', registration.license_condition_id);
        formData.append('restriction_codes', registration.restriction_codes);
        axios.post(`/renter/registration/license/update`, formData,{
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
                    title: "Successfully updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setRegistration(registration => ({
                    ...registration,
                    step: registration.step + 1
                }))
                window.scrollTo(0, 0)
            }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).every(field => {
                    // console.log(`${field}: ${validationErrors[field].join(', ')}`);
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

    function dropDownToggle(dropDownTarget,dropDownContainer){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
    }
    function selectedDropDown(dropDownTarget,dropDownContainer,key,item,value,value_id){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
        document.getElementById(item).innerHTML = value
        setRegistration(registration => ({
            ...registration,
            [key]: value_id
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

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setRegistration(registration => ({
            ...registration,
            [key]: value,
        }))
    }

    return (
        <>
            <RenterLayout props={props}>
                <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">    
                    <div className="">  
                        <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                            License
                        </div>
                        <form onSubmit={update_license}>
                            <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-0 mb-2">
                                    <label className="block text-gray-700 mb-1 text-sm font-bold" for="nationality">Nationality <span className="text-red-600">*</span></label>
                                    <div className="relative inline-block w-full h-full">
                                        <div className="inline-block w-full h-full" id="dropDownNationalityContainer" >
                                            <div id="dropdownNationalityButton" onClick={() => dropDownToggle('dropdownNationality','dropDownNationalityContainer')}  
                                                className="flex justify-between text-sm w-full py-2.5 px-2 border border-black rounded-lg focus:outline-none" 
                                                type="button">
                                                <div id="nationality-selected" >
                                                    Select Nationality
                                                </div>
                                                <div>
                                                    <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                </div>
                                            </div>
                                            <div id="dropdownNationality" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                                <input type="text" id="nationality_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownNationality',"nationality","/search/nationality/name/asc/10/","nationality_input_search")} className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <ul id="dropdownListsdf" className="max-h-60 overflow-y-auto">
                                                {registration.nationality.map((item, index) => (
                                                        <li className={ registration.nationality_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 hover:text-white cursor-pointer" } 
                                                            onClick={() => selectedDropDown('dropdownNationality','dropDownNationalityContainer',"nationality_id","nationality-selected",item.name,item.id)} key={item.id} value={item.id} >{item.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                    <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Sex <span className="text-red-600">*</span></label>
                                    <select required id="sex_id" value={registration.sex_id} onChange={handleChange} tabIndex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Select Sex</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                                <div className="col-span-2 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mr-0 ml-2 lg:ml-2 lg:mr-0 xl:ml-0 xl:mr-0 mb-2">
                                    <label for="weight" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Weight (kg) <span className="text-red-600">*</span></label>
                                    <input type="number" id="weight" value={registration.weight} onChange={handleChange} min="0"step="0.01" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="weight in kg"  required />
                                </div>
                                <div className="col-span-2 md:col-span-2 md:ml-0 lg:col-span-2 mr-2 ml-1 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-2 xl:ml-1 mb-2">
                                    <label for="height" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Height (m) <span className="text-red-600">*</span></label>
                                    <input type="number" id="height" value={registration.height} onChange={handleChange} min="0" step="0.01" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="height in meters"  required />
                                </div>
                            </div>
                            <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-0 mb-2">
                                    <label for="license-no" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">License no. <span className="text-red-600">*</span></label>
                                    <input type="text" id="license_no" value={registration.license_no} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="License no."  required />
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                    <label for="expiration_date" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Expiration date <span className="text-red-600">*</span></label>
                                    <input id="expiration_date" 
                                        required
                                        type="date" 
                                        value={registration.expiration_date} onChange={handleChange}
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Select date"/>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-0 xl:mr-0 mb-2">
                                    <label for="agency-code" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Agency code <span className="text-red-600">*</span></label>
                                    <input type="text" id="agency_code" value={registration.agency_code} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Agency code"  required />
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-2 xl:ml-1 mb-2">
                                    <label className="block text-gray-700 mb-1 text-sm font-bold" for="blood-type">Blood type <span className="text-red-600">*</span></label>
                                    <select id="blood_type_id" value={registration.blood_type_id} onChange={handleChange} required tabIndex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" selected>Select Bloodtype</option>
                                        {registration.blood_types.map((item, index) => (
                                            <option value={item.id} key={"bloodtype-"+item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-0 mb-2">
                                    <label for="eye-color" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Eye Color<span className="text-red-600">*</span></label>
                                    <select id="eye_color_id" value={registration.eye_color_id} onChange={handleChange} tabIndex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" selected>Select Eye color</option>
                                        {registration.eye_colors.map((item, index) => (
                                            <option value={item.id} key={"eye-color-"+item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                    <label for="license_condition_id" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Conditions <span className="text-red-600">*</span></label>
                                    <select id="license_condition_id"
                                        required 
                                        value={registration.license_condition_id} onChange={handleChange}
                                        tabIndex="5"
                                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" selected>Select Conditions</option>
                                        {registration.license_conditions.map((item, index) => (
                                            <option value={item.id} key={"condition-"+item.id}>{item.details}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4 md:col-span-4 md:ml-2 lg:col-span-4 mx-2 xl:col-span-2 xl:mr-2 xl:ml-0  mb-2">
                                    <label for="restriction_codes" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Driver license code <span className="text-red-600">*</span></label>
                                    <input type="text" 
                                        id="restriction_codes"
                                        value={registration.restriction_codes} onChange={handleChange}
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Restriction codes"  required />
                                </div>
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1  mb-2">
                                    <label for="picture_of_license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture of License <span className="text-red-600">*</span></label>
                                    <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture_of_license" type="file" />
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0  mb-2">
                                    <label for="picture_holding_license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture holding license <span className="text-red-600">*</span></label>
                                    <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture_holding_license" type="file" />
                                </div>
                            </div>
                            {
                                registration.is_approved == 0 ?
                                <div className="w-full flex justify-center mt-5">
                                        <button className="btn bg-green-700 text-white">
                                            Save
                                        </button>
                                    </div>
                                :
                                <></>
                            }
                        </form>
                    </div> 
                </div>
            </RenterLayout>
        </>
    )
}

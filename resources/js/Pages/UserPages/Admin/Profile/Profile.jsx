import { Link, usePage } from '@inertiajs/react'
import {React, useState} from 'react';

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
export default function Profile(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const [values, setValues] = useState({
        password:(props.password) ? props.password : 0,
        user_login_type_id:props.user.user_login_type_id,
        sex_id:props.user.sex_id,
        gender_id:props.user.gender_id,
        google_oauth_id:props.user.google_oauth_id,
        facebook_oauth_id:props.user.facebook_oauth_id,
        username:props.user.username,
        is_admin:props.user.is_admin,
        is_space_owner:props.user.is_space_owner,
        first_name:(props.user.first_name) ? props.user.first_name : "",
        middle_name:(props.user.middle_name) ? props.user.middle_name : "",
        last_name:(props.user.last_name) ? props.user.last_name : "",
        suffix:(props.user.suffix) ? props.user.suffix : "",
        birthdate:(props.user.birthdate) ? props.user.birthdate : "",
        email:(props.user.email) ? props.user.email : "",
        email_verified:(props.user.email_verified) ? props.user.email_verified : "",
        mobile_number:(props.user.mobile_number) ? props.user.mobile_number : "",
        mobile_number_verified:(props.user.mobile_number_verified) ? props.user.mobile_number_verified : "",
        profile_url:(props.user.profile) ? props.user.profile : "",
        profile:null,
        date_created:props.user.date_created,
        date_updated:props.user.date_updated,

        region_id:(props.user.region_id) ? props.user.region_id : "",
        region:(props.user.region) ? props.user.region : "",
        regions:props.regions,
        province_id:(props.user.province_id) ? props.user.province_id : "",
        province:(props.user.province) ? props.user.province : "",
        provinces:props.provinces,
        city_id:(props.user.city_id) ? props.user.city_id : "",
        city:(props.user.city) ? props.user.city : "",
        cities:props.cities,
        brgy_id:(props.user.brgy_id) ? props.user.brgy_id : "",
        brgy:(props.user.brgy) ? props.user.brgy : "",
        barangays:props.barangays,
        street:(props.user.street) ? props.user.street : "",
    })

    const [password,setPassword] = useState({
        current_password:"",
        new_password:"",
        confirm_password:"",

    })
    
    const handleChange = (e) =>  {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }

    const handleChangePassword = (e) => {
    const key = e.target.id;
    const value = e.target.value
    setPassword(values => ({
        ...values,
        [key]: value,
    }))
    }
    function handleSaveProfile(){
        const formData = new FormData();
        formData.append('image', selectedFile);
        axios.post(`/profile/update/image`, 
            formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            if (res.data) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setValues(values => ({
                    ...values,
                    profile_url: res.data.path,
                }))
                setSelectedFile(selectedFile =>(
                    null
                ))
                
            }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                    // console.log(`${field}: ${validationErrors[field].join(', ')}`);
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `${validationErrors[field].join(', ')}`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    return
                });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        Swal.fire({
          title: "Updating...",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('middle_name', values.middle_name);
        formData.append('last_name', values.last_name);
        formData.append('suffix', values.suffix);
        formData.append('mobile_number', values.mobile_number);
        formData.append('gender_id', values.gender_id);
        formData.append('sex_id', values.sex_id);
        formData.append('birthdate', values.birthdate);
        formData.append('region_id', values.region_id);
        formData.append('province_id', values.province_id);
        formData.append('city_id', values.city_id);
        formData.append('brgy_id', values.brgy_id);
        formData.append('street', values.street);
        axios.post(`/profile/update`, 
          formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
          if (res.data == 1) {
            Swal.close();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully updated!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
              const validationErrors = error.response.data.errors;
              Object.keys(validationErrors).forEach(field => {
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
    function handleSubmitChangePassword(e){
        e.preventDefault()
        Swal.fire({
          title: "Updating...",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        if(values.password){
            const formData = new FormData();
            formData.append('password', password.password);
            formData.append('new_password', password.new_password);
            formData.append('confirm_password', password.confirm_password);
            axios.post(`/password/update`, formData)
            .then(res => {
              if (res.data == 1) {
                Swal.close();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Successfully updated!",
                  showConfirmButton: false,
                  timer: 1500
                });
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
                      timer: 3000
                    });
                    return;
                  });
                } else {
                    console.error('An error occurred:', error.response || error.message);
                }
            })
        }else{
            const formData = new FormData();
            formData.append('new_password', password.new_password);
            formData.append('confirm_password', password.confirm_password);
            axios.post(`/password/update/new`, formData)
            .then(res => {
            if (res.data == 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully updated!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                }
                window.location.reload();
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
                    timer: 3000
                    });
                    return;
                });
                } else {
                    console.error('An error occurred:', error.response || error.message);
                }
            })
        }
    }
    function dropDownToggle(dropDownTarget,dropDownContainer){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
    }
    function selectedDropDown(dropDownTarget,dropDownContainer,key,item,value,value_id){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
        document.getElementById(item).innerHTML = value
        setValues(values => ({
            ...values,
            [key]: value_id
        }))
    }
    function handleSearch(dropDownTarget,key,path,search_target){
        const search_val = (document.getElementById(search_target).value)
        axios.get(path+search_val)
        .then(res => {
            setValues(values => ({
                ...values,
                [key]: res.data
            }))
        })
    }

    return (
        <>
            <AdminLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/admin/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/admin/profile">
                                    Profile 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2 mx-4 mt-5">
                                <label for="firstname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First name <span className="text-red-600">*</span></label>
                                <input type="text" id="first_name" value={values.first_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="First name" required />
                            </div> 
                            <div className="mb-2 mx-4">
                                <label for="middle_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                <input type="text" id="middle_name" value={values.middle_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Middle name"  />
                            </div> 
                            <div className="mb-2 mx-4">
                                <label for="last_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last name <span className="text-red-600">*</span></label>
                                <input type="text" id="last_name" value={values.last_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Last name" required />
                            </div> 
                            <div className="w-full grid mb-2 grid-cols-2 ">
                                <div className="mx-4 mr-4 col-span-2">
                                    <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Suffix</label>
                                    <input type="text" id="suffix" value={values.suffix} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Suffix" />
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:mr-1 md:col-span-1 ">
                                    <label for="mobile_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone number <span className="text-red-600">*</span></label>
                                    <input type="tel" required id="mobile_number" value={values.mobile_number} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  
                                        />
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:ml-0 md:col-span-1 ">
                                    <label className="block mb-1 text-sm font-bold" for="gender">Gender <span className="text-red-600">*</span></label>
                                    <select id="gender_id" 
                                        required
                                        tabindex="5" value={values.gender_id} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:mr-1 md:col-span-1 ">
                                    <label className="block  mb-1 text-sm font-bold" for="gender">Sex <span className="text-red-600">*</span></label>
                                    <select id="sex_id" 
                                        required
                                        tabindex="5" value={values.sex_id} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" >Select Sex</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                            
                                <div className="mt-2 col-span-2 mx-4 md:ml-0 md:col-span-1 ">
                                    <label for="birthdate" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Birthdate <span className="text-red-600">*</span></label>
                                    <input type="date" id="birthdate" value={values.birthdate} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" 
                                        required />
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:mr-1 md:col-span-1 ">
                                    <label className="block  mb-1 text-sm font-bold" for="sex">Region <span className="text-red-600">*</span></label>
                                    <div className="inline-block w-full h-full" id="dropDownRegionContainer" >
                                        <div id="dropdownRegionButton" onClick={() => dropDownToggle('dropdownRegion','dropDownRegionContainer')}  
                                            className="flex justify-between text-sm w-full py-2.5 px-2 border border-black dark:border-gray-600 rounded-lg focus:outline-none" 
                                            type="button">
                                            <div id="region-selected" className='truncate' >
                                                {values.region ? values.region: "Select Region"}
                                            </div>
                                            <div>
                                                <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                        </div>
                                        <div id="dropdownRegion" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                            <input type="text" id="regions_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownRegion',"regions","/search/refregion/regDesc/asc/0/","regions_input_search")} className="w-full py-2 px-4 border-b border-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                                {values.regions.map((item, index) => (
                                                    <li className={ values.region_id == item.id ? "px-4 py-2  bg-gray-500 dark:bg-gray-600 text-white hover:bg-gray-500 hover:text-white cursor-pointer" : "px-4 py-2 dark:bg-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer" } 
                                                        onClick={() => selectedDropDown('dropdownRegion','dropDownRegionContainer',"region_id","region-selected",item.regDesc,item.id)} key={item.id} value={item.id} >{item.regDesc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:ml-0 md:col-span-1 ">
                                    <label className="block  mb-1 text-sm font-bold" for="sex">Province <span className="text-red-600">*</span></label>
                                    <div className="inline-block w-full h-full" id="dropDownProvinceContainer" >
                                        <div id="dropdownProvinceButton" onClick={() => dropDownToggle('dropdownProvince','dropDownProvinceContainer')}  
                                            className="flex justify-between text-sm w-full py-2.5 px-2 border border-black dark:border-gray-600 rounded-lg focus:outline-none" 
                                            type="button">
                                            <div id="province-selected" className='truncate'>
                                                {values.province ? values.province: "Select Province"}
                                            </div>
                                            <div>
                                                <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                        </div>
                                        <div id="dropdownProvince" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                            <input type="text" id="provinces_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownProvince',"provinces","/search/refprovince/provDesc/asc/10/","provinces_input_search")} className="w-full py-2 px-4 border-b border-gray-300 dark:bg-gray-600   focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                                {values.provinces.map((item, index) => (
                                                    <li className={ values.province_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 dark:bg-gray-600 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 dark:bg-gray-500 hover:text-white cursor-pointer" } 
                                                        onClick={() => selectedDropDown('dropdownProvince','dropDownProvinceContainer',"province_id","province-selected",item.provDesc,item.id)} key={item.id} value={item.id} >{item.provDesc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:mr-1 md:col-span-1 ">
                                    <label className="block  mb-1 text-sm font-bold" for="sex">City / Municipality <span className="text-red-600">*</span></label>
                                    <div className="inline-block w-full h-full" id="dropDownCityContainer" >
                                        <div id="dropdownCityButton" onClick={() => dropDownToggle('dropdownCity','dropDownCityContainer')}  
                                            className="flex justify-between text-sm w-full py-2.5 px-2 border border-black dark:border-gray-600 rounded-lg focus:outline-none" 
                                            type="button">
                                            <div id="city-selected" className='truncate' >
                                                {values.city ? values.city: "Select City / Municipality"}
                                            </div>
                                            <div>
                                                <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                        </div>
                                        <div id="dropdownCity" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                            <input type="text" id="city_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownCity',"cities","/search/refcitymun/citymunDesc/asc/10/","city_input_search")} className="w-full py-2 px-4 border-b border-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <ul id="dropdownList" className="max-h-60 overflow-y-auto">
                                                {values.cities.map((item, index) => (
                                                    <li className={ values.city_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 dark:bg-gray-600 hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 dark:bg-gray-500 hover:text-white cursor-pointer" } 
                                                        onClick={() => selectedDropDown('dropdownCity','dropDownCityContainer',"city_id","city-selected",item.citymunDesc,item.id)} key={item.id} value={item.id} >{item.citymunDesc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 col-span-2 mx-4 md:ml-0 md:col-span-1 ">
                                    <label className="block  mb-1 text-sm font-bold" for="sex">Barangay <span className="text-red-600">*</span></label>
                                    <div className="inline-block w-full h-full" id="dropDownBrgyContainer" >
                                        <div id="dropdownBrgyButton" onClick={() => dropDownToggle('dropdownBrgy','dropDownBrgyContainer')}  
                                            className="flex justify-between text-sm w-full py-2.5 px-2 border border-black dark:border-gray-600 rounded-lg focus:outline-none" 
                                            type="button">
                                            <div id="brgy-selected" className='truncate'>
                                                {values.barangay ? values.barangay: "Select Barangay"}
                                            </div>
                                            <div>
                                                <svg viewBox="0 0 24 24" className="text-gray-500 h-full mr-0" width="17px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                        </div>
                                        <div id="dropdownBrgy" className="absolute left-0 mt-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                                            <input type="text" id="brgy_input_search" placeholder="Search..." onChange={() => handleSearch('dropdownBrgy',"barangays","/search/refbrgy/brgyDesc/asc/10/","brgy_input_search")} className="w-full py-2 px-4 border-b dark:bg-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <ul id="dropdownList3" className="max-h-60 overflow-y-auto">
                                                {values.barangays.map((item, index) => (
                                                    <li className={ values.city_id == item.id ? "px-4 py-2  bg-gray-500 text-white hover:bg-gray-500 dark:bg-gray-600    hover:text-white cursor-pointer" : "px-4 py-2 hover:bg-gray-500 dark:bg-gray-500 hover:text-white cursor-pointer" } 
                                                        onClick={() => selectedDropDown('dropdownBrgy','dropDownBrgyContainer',"brgy_id","brgy-selected",item.brgyDesc,item.id)} key={item.id} value={item.id} >{item.brgyDesc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                                <div className="ml-4 mr-5">
                                    <label for="street" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                    <input type="text" id="street" value={values.street} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Street" />
                            </div>
                            
                            <div className="flex justify-center mx-4 mt-5">
                                <div>
                                    <button type="submit" className=" text-white bg-main-color hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* <div className="text-2xl font-semibold mx-4 mt-10">Email</div>
                        <hr className="my-5 mx-5"/> */}

                        <div className="text-2xl font-semibold mx-4 mt-10">Change Password</div>
                        <hr className="my-5 mx-5"/>
                        <form onSubmit={handleSubmitChangePassword}>
                            {values.password == 1 && (
                                <>
                                    <div className="mb-2 mx-4">
                                        <label for="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Current Password<span className="text-red-600">*</span></label>
                                        <input type="password" required id="password" value={password.password} onChange={handleChangePassword} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Current password"  />
                                    </div> 
                                </>
                            )}                    
                            <div className="mb-2 mx-4">
                                <label for="new_password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New Password<span className="text-red-600">*</span></label>
                                <input type="password" required id="new_password" value={password.new_password} onChange={handleChangePassword} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="New password"/>
                            </div> 
                            <div className="mb-2 mx-4">
                                <label for="confirm_password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm Password<span className="text-red-600">*</span></label>
                                <input type="password" required id="confirm_password" value={password.confirm_password} onChange={handleChangePassword} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Confirm password"  />
                            </div> 
                            <div className="my-2 w-full flex justify-center">
                                <button type="submit" className="btn  bg-main-color text-white">
                                    Change password
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
}
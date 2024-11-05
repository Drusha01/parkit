import { Link, usePage } from '@inertiajs/react'
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import {React, useState} from 'react';

export default function RenterProfile(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
    };
    const [values, setValues] = useState({
        user_login_type_id:props.user.user_login_type_id,
        gender_id:props.user.gender_id,
        google_oauth_id:props.user.google_oauth_id,
        facebook_oauth_id:props.user.facebook_oauth_id,
        username:props.user.username,
        is_admin:props.user.is_admin,
        is_space_owner:props.user.is_space_owner,
        first_name:props.user.first_name,
        middle_name:props.user.middle_name,
        last_name:props.user.last_name,
        suffix:props.user.suffix,
        birthdate:props.user.birthdate,
        email:props.user.email,
        email_verified:props.user.email_verified,
        mobile_number:props.user.mobile_number,
        mobile_number_verified:props.user.mobile_number_verified,
        profile_url:props.user.profile,
        profile:null,
        date_created:props.user.date_created,
        date_updated:props.user.date_updated,
      })
    
      function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
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
        formData.append('file', selectedFile);
        formData.append('gender_id', values.gender_id);
        formData.append('middle_name', values.middle_name);
        formData.append('last_name', values.last_name);
        formData.append('suffix', values.suffix);
        formData.append('birthdate', values.birthdate);
        formData.append('mobile_number', values.mobile_number);
        axios.post(`/renter/profile/update`, 
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
      }
    return (
        <>
            <RenterLayout>
                <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                    <form className="flex-none lg:flex xl:flex xxl:flex" onSubmit={handleSubmit}>
                        <div className="m-5">
                            <div className="flex justify-center w-full">
                                <img src={values.profile_url ? "/profile/asdfs" :"/img/profile/john-doe.jpg"} className="rounded-xl" alt="" width="200px" height="200px" />
                            </div>
                            <div class="flex items-center justify-center my-5 w-full">
                                <label for="profile" class="flex flex-col items-center justify-center md:w-2/5 w-1/2 lg:w-full xl:w-3/4 border-2 border-black border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-3">
                                        <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Upload Profile</span></p>
                                    </div>
                                    <input id="profile" type="file" class="hidden"  onChange={handleFileChange} accept ="image/*" />
                                </label>
                            </div> 
                        </div>
                        <div className="w-full lg:w-4/5 xxl:w-4/5 my-10">
                            <div class="mb-2 mx-4">
                                <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First name <span className="text-red-600">*</span></label>
                                <input type="text" id="first_name" value={values.first_name} onChange={handleChange} class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="First name" required />
                            </div> 
                            <div class="mb-2 mx-4">
                                <label for="middle_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                <input type="text" id="middle_name" value={values.middle_name} onChange={handleChange} class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Middle name"  />
                            </div> 
                            <div class="mb-2 mx-4">
                                <label for="last_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last name <span className="text-red-600">*</span></label>
                                <input type="text" id="last_name" value={values.last_name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Last name" required />
                            </div> 
                            <div class="w-full grid gap-2 mb-2 md:grid-cols-2 mx-2">
                                <div className="mx-2 mr-6 md:mr-1">
                                    <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Suffix</label>
                                    <input type="text" id="suffix" value={values.suffix} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Suffix" required />
                                </div>
                                <div className="mx-2 mr-6">
                                    <label className="block text-gray-700 mb-1 text-sm font-bold" for="gender">Gender <span className="text-red-600">*</span></label>
                                    <select id="gender_id" 
                                        required
                                        tabindex="5" value={values.gender_id} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option >Select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>
                                <div className="mx-2 mr-6 md:mr-1">
                                    <label for="phone" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                    <input type="tel" disabled id="phone" value={values.phone} onChange={handleChange} class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  
                                         />
                                </div>
                                <div className="mx-2 mr-6">
                                    <label for="birthdate" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Birthdate <span className="text-red-600">*</span></label>
                                    <input type="date" id="birthdate" value={values.birthdate} onChange={handleChange} class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" 
                                        required />
                                </div>
                            </div>
                            <div class="w-full flex">
                                <div class="mb-6 ml-4 mr-1 w-4/5">
                                    <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email address <span className="text-red-600">*</span></label>
                                    <input type="email" disabled value={values.email} onChange={handleChange} id="email" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" 
                                        required />
                                </div> 
                                <div class="mb-6 mt-6 mr-6 md:mr-1">
                                    <button type="submit" class=" text-white bg-main-color hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Change
                                    </button>
                                </div> 
                            </div> 
                            <div className="flex justify-center mx-4">
                                <button type="submit" class=" text-white bg-main-color hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </RenterLayout>
        </>
    )
};

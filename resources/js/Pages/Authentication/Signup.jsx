
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { Head,Link, usePage,router } from '@inertiajs/react'
import { useState } from 'react'
import $ from 'jquery';

export default function Signup(props) {
  const [values, setValues] = useState({
    verified:false,
    code:"",
    firstname:"",
    middlename:"",
    lastname:"",
    suffix:"",
    gender:"",
    email: "",
    password:"",
    confirmPassword: "",
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
    axios.post(`/signup`, {  
      firstname:values.firstname,
      middlename:values.middlename,
      lastname:values.lastname,
      suffix:values.suffix,
      gender:values.gender,
      email:values.email,
      password:values.password,
      confirmPassword:values.confirmPassword,
    })
    .then(res => {
      if (res.data == 1) {
        setValues(values => ({
          ...values,
          verified: 1,
        }))
        Swal.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome to ParkIt!",
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(redirect("login"), 1500);
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
        });
      } else {
          console.error('An error occurred:', error.response || error.message);
      }
    })
  }

  function redirect(id){
    const link = document.getElementById(id);
    link.click(); 
  }

  function handleVerify(e){
    e.preventDefault()
    Swal.fire({
      title: "Sending email...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios.post(`/verify`, {  
      email:values.email 
    })
    .then(res => {
      if (res.data == 1) {
        setValues(values => ({
          ...values,
          verified: 1,
        }))
        Swal.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Email has been sent",
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
  function handleCode(e){
    e.preventDefault()
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios.post(`/code`, {  
      code:values.code,
      email:values.email,
     })
    .then(res => {
      const obj = JSON.parse(res.data)
      if (res.data = 1) {
        Swal.close();
        setValues(values => ({
          ...values,
          verified: 2,
        }))
      }else if(res.data){

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
          if(`${field}` === "Code Expires"){
            setValues(values => ({
              ...values,
              verified: 0,
              email: "",
              code: "",
            }))
          }
        });
      } else {
          console.error('An error occurred:', error.response || error.message);
      }
    })
  }

  return (
    <>
       <GuestLayout props={props}>
       <main className="w-full">
          <section className="flex justify-center bg-center bg-no-repeat bg-[url('../../public/img/background/background_1.jpg')] bg-blue-300 bg-blend-multiply">
            <div className="login-content bg-white min-h-[400px] m-5 rounded-lg border drop-shadow md:my-10 xl:my-32 lg:w-[600px]">
              {values.verified == 0 ? 
                <form action="py-5" onSubmit={handleVerify}>
                  <div className="text-2xl my-4 flex justify-center">{props.title} Sign up</div>
                    <div class="mb-1 mx-5">
                    <label class="block text-gray-700 text-sm font-bold" for="username">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabIndex="6"
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={values.email} 
                      onChange={handleChange} 
                      className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="my-2 mx-5">
                    <button tabIndex="9" type="submit" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                      Send code
                    </button>
                  </div>
                </form> 
              :  ""}
              {values.verified == 1 ? 
                <form action="py-5" onSubmit={handleCode}>
                  <div className="text-2xl my-4 flex justify-center">Sign up</div>
                    <div className="mb-1 mx-5">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                      Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabIndex="6"
                      type="number"
                      id="code"
                      name="code"
                      required
                      value={values.code} 
                      onChange={handleChange} 
                      className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter code"
                    />
                  </div>
                  <div className="my-2 mx-5">
                    <button tabIndex="9" type="submit" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                      Verify
                    </button>
                  </div>
                </form>
              :  ""}
              {values.verified == 2 ? 
              <form className="py-5" onSubmit={handleSubmit}>
                <div>
                  <div className="text-2xl my-4 flex justify-center">Sign up</div>
                  <div className="mb-1 mx-5">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                      First name <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabIndex="1"
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter first name"
                      required 
                      value={values.firstname} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-1 mx-5">
                    <label className="block border-black text-gray-700 text-sm font-bold" htmlFor="username">
                      Middle name
                    </label>
                    <input
                      tabIndex="2"
                      type="text"
                      id="middlename"
                      name="middlename"
                      className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter middle name"
                      value={values.middlename} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-1 mx-5">
                    <label className="blockborder-black text-gray-700 text-sm font-bold" htmlFor="username">
                      Last name <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabIndex="3"
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter last name"
                      required 
                      value={values.lastname} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex">
                    <div className="w-1/2 ml-5 mr-1">
                      <div className="mb-2">
                        <label className="block border-black text-gray-700 text-sm font-bold" htmlFor="username">
                          Suffix <span className="text-red-600"></span>
                        </label>
                        <input
                          tabIndex="4"
                          type="text"
                          id="suffix"
                          name="suffix"
                          className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                          placeholder="Enter suffix"
                          value={values.suffix} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 mr-5 ml-1">
                      <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                          Gender <span className="text-red-600">*</span>
                        </label>
                        <select 
                          id="gender"  
                          value={values.gender} 
                          onChange={handleChange} 
                          required
                          tabIndex="5" 
                          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="">Select gender</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1 mx-5">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabIndex="6"
                      type="email"
                      id="email"
                      name="email"
                      disabled
                      required
                      value={values.email} 
                      onChange={handleChange} 
                      className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-1 flex-none md:flex xxl:flex mx-5">
                    <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 mr-1">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        tabIndex="7"
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={values.password} 
                        onChange={handleChange} 
                        className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 ml-1">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Confirm password <span className="text-red-600">*</span>
                      </label>
                      <input
                        tabIndex="8"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={values.confirmPassword} 
                        onChange={handleChange} 
                        className="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                        placeholder="Enter confirm password"
                      />
                    </div>
                  </div>
                  <div className="my-2 mx-5">
                    <button tabIndex="9" type="submit" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                      Signup
                    </button>
                  </div>
                </div>
              </form>
              :""}
              <div className=" mx-5 p-1 flex">
                <div className="w-1/2 mt-3 pr-2">
                  <hr className="bg-black" />
                </div>
                <div>or</div> 
                <div className="w-1/2 mt-3 pl-2">
                <hr />
                </div>
              </div>
              <div className="mb-4 mx-5 pt-5 flex">
                <div className="w-1/2 pr-2">
                  <button tabIndex="10" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Google
                  </button>
                </div>
                <div className="w-1/2 pl-2">
                  <button tabIndex="11" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Facebook
                  </button>
                </div>
              </div>
              <div className="mb-4 mx-5 flex text-center">
                <div className="w-1/2 pr-4 ">
                  <Link href={`${props.path}`} id="login" tabindex="12" className="w-full text-blue-300">
                    Have an Account?
                  </Link>
                </div>
                <div className="w-1/2 pl-4 text-center">
                  <Link href="/forgotpassword" tabIndex="13" className="w-full ">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
       </GuestLayout>
    </>
  );
}
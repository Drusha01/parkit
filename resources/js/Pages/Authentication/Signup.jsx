
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { Head,Link, usePage,router } from '@inertiajs/react'
import { useState } from 'react'

export default function Signup(email) {
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
    router.visit("/signup", {
      method: 'post',
      data: {
        firstname:values.firstname,
        middlename:values.middlename,
        lastname:values.lastname,
        suffix:values.suffix,
        gender:values.gender,
        email:values.email,
        password:values.password,
        confirmPassword:values.confirmPassword,
      },
      replace: false,
      preserveState: false,
      preserveScroll: false,
      only: [],
      headers: {},
      errorBag: null,
      forceFormData: false,
      onCancelToken: cancelToken => {},
      onCancel: () => {},
      onBefore: visit => {},
      onStart: visit => {},
      onProgress: progress => {},
      onSuccess: page => {
        alert("nice")
      },
      onError: errors => {
        alert("nice")
      },
      onFinish: visit => {},
    })
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
      console.log("sadf")
    })
    .catch(function (error) {
      window.location.href="/signup"
    })
  }

  return (
    <>
       <GuestLayout>
       <main className="w-full">
          <section className="flex justify-center bg-center bg-no-repeat bg-[url('../../public/img/background/background_1.jpg')] bg-blue-300 bg-blend-multiply">
            <div className="login-content bg-white min-h-[400px] rounded-lg border drop-shadow md:my-5 xl:my-16 lg:w-[600px]">
              {values.verified == 0 ? 
                <form action="py-5" onSubmit={handleVerify}>
                  <div className="text-2xl my-4 flex justify-center">Sign up</div>
                    <div class="mb-1 mx-5">
                    <label class="block text-gray-700 text-sm font-bold" for="username">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabindex="6"
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={values.email} 
                      onChange={handleChange} 
                      class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="my-2 mx-5">
                    <button tabindex="9" type="submit" class="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                      Send code
                    </button>
                  </div>
                </form> 
              :  ""}
              {values.verified == 1 ? 
                <form action="py-5" onSubmit={handleCode}>
                  <div className="text-2xl my-4 flex justify-center">Sign up</div>
                    <div class="mb-1 mx-5">
                    <label class="block text-gray-700 text-sm font-bold" for="username">
                      Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabindex="6"
                      type="number"
                      id="code"
                      name="code"
                      required
                      value={values.code} 
                      onChange={handleChange} 
                      class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter code"
                    />
                  </div>
                  <div class="my-2 mx-5">
                    <button tabindex="9" type="submit" class="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                      Verify
                    </button>
                  </div>
                </form>
              :  ""}
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
                  <button tabindex="10" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Google
                  </button>
                </div>
                <div className="w-1/2 pl-2">
                  <button tabindex="11" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Facebook
                  </button>
                </div>
              </div>
              <div className="mb-4 mx-5 flex text-center">
                <div className="w-1/2 pr-4 ">
                  <Link href="/login" tabindex="12" className="w-full text-blue-300">
                    Have an Account?
                  </Link>
                </div>
                <div className="w-1/2 pl-4 text-center">
                  <Link href="/forgotpassword" tabindex="13" className="w-full ">
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
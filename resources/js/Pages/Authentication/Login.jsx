import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { useState ,useEffect} from 'react'
import { Head,Link, usePage,router } from '@inertiajs/react'


export default function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  
  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setValues(values => ({
        ...values,
        [key]: value,
    }))
  }

  function redirect(id){
    const link = document.getElementById(id);
    link.click(); 
  }

  function handleSubmit(e){
    e.preventDefault()
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios.post(`/login`, {  
      email:values.email,
      password:values.password,
     })
    .then(res => {
      const obj = JSON.parse(res.data)
      if (res.data = 1) {
        Swal.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome to ParkIt!",
          showConfirmButton: false,
          timer: 1000
        });
        redirect("signup")
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
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page for parkit" />
      </Head>
      <GuestLayout props={props}>
        <main className="w-full">
          <section className="flex justify-center bg-center bg-no-repeat bg-[url('../../public/img/background/background_1.jpg')] bg-blue-300 bg-blend-multiply">
            <div className="login-content bg-white min-h-[400px] m-5 rounded-lg border drop-shadow md:my-10 xl:my-32 lg:w-[500px]">
              <form className="pt-5" onSubmit={handleSubmit}>
                <div className="text-2xl my-4 flex justify-center">Login</div>
                <div className="mb-4 mx-5">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" required id="email" value={values.email} onChange={handleChange} className="grow border-none focus:ring-0" tabIndex="1" placeholder="Enter email" />
                  </label>
                </div>
                <div className="mb-4 mx-5">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input type="password" required name="password" id="password"  value={values.password} onChange={handleChange} className="grow border-none focus:ring-0" tabIndex="2" placeholder="Enter password" />
                  </label>
                </div>
                <div className="mb-4 mx-5">
                  <button tabIndex="3" type="submit" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Login
                  </button>
                </div>
                <div className="my-1 mx-5 p-2 flex">
                  <div className="w-1/2 mt-3 pr-2">
                  <hr className="bg-black" />
                  </div>
                  <div>or</div> 
                  <div className="w-1/2 mt-3 pl-2">
                  <hr />
                  </div>
                </div>
              </form>
              <div className="mb-4 mx-5 flex">
                <div className="w-1/2 pr-4">
                  <button tabIndex="4" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Google
                  </button>
                </div>
                <div className="w-1/2 pl-4">
                  <button tabIndex="5" className="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Facebook
                  </button>
                </div>
              </div>
              <div className="mb-4 mx-5 flex text-center">
                <div className="w-1/2 pr-4 ">
                  <Link href="/signup" id="signup" tabIndex="6" className="w-full text-blue-300">
                    Create an Account
                  </Link>
                </div>
                <div className="w-1/2 pl-4 text-center">
                  <Link href="/forgotpassword" tabIndex="7" className="w-full ">
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
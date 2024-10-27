
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { Head,Link, usePage } from '@inertiajs/react'

export default function Signup() {
  return (
    <>
       <GuestLayout>
       <main className="w-full">
          <section className="flex justify-center bg-center bg-no-repeat bg-[url('../../public/img/background/background_1.jpg')] bg-blue-300 bg-blend-multiply">
            <div className="login-content bg-white min-h-[400px] rounded-lg border drop-shadow md:my-5 xl:my-16 lg:w-[600px]">
            <form className="py-5">
                <div className="text-2xl my-4 flex justify-center">Sign up</div>
                <div class="mb-1 mx-5">
                  <label class="block text-gray-700 text-sm font-bold" for="username">
                    First name <span className="text-red-600">*</span>
                  </label>
                  <input
                    tabindex="1"
                    type="text"
                    id="firstname"
                    name="firstname"
                    class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter first name"
                  />
                </div>
                <div class="mb-1 mx-5">
                  <label class="block border-black text-gray-700 text-sm font-bold" for="username">
                    Middle name
                  </label>
                  <input
                    tabindex="2"
                    type="text"
                    id="middlename"
                    name="middlename"
                    class="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter middle name"
                  />
                </div>
                <div class="mb-1 mx-5">
                  <label class="blockborder-black text-gray-700 text-sm font-bold" for="username">
                    Last name <span className="text-red-600">*</span>
                  </label>
                  <input
                    tabindex="3"
                    type="text"
                    id="lastname"
                    name="lastname"
                    class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="flex">
                  <div className="w-1/2 ml-5 mr-1">
                    <div class="mb-2">
                      <label class="block border-black text-gray-700 text-sm font-bold" for="username">
                        Suffix <span className="text-red-600"></span>
                      </label>
                      <input
                        tabindex="4"
                        type="text"
                        id="suffix"
                        name="suffix"
                        class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                        placeholder="Enter suffix"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 mr-5 ml-1">
                    <div class="mb-2">
                      <label class="block text-gray-700 text-sm font-bold" for="username">
                        Gender <span className="text-red-600">*</span>
                      </label>
                      <select id="countries" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Femail">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="mb-1 mx-5">
                  <label class="block text-gray-700 text-sm font-bold" for="username">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    tabindex="6"
                    type="password"
                    id="password"
                    name="password"
                    class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-1 flex-none md:flex xxl:flex mx-5">
                  <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 mr-1">
                    <label class="block text-gray-700 text-sm font-bold" for="username">
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabindex="7"
                      type="password"
                      id="password"
                      name="password"
                      class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 ml-1">
                    <label class="block text-gray-700 text-sm font-bold" for="username">
                      Confirm password <span className="text-red-600">*</span>
                    </label>
                    <input
                      tabindex="8"
                      type="confirmpassword"
                      id="confirmpassword"
                      name="confirmpassword"
                      class="border border-black rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter confirm password"
                    />
                  </div>
                </div>
              
                <div class="my-2 mx-5">
                  <button tabindex="9" class="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Signup
                  </button>
                </div>
                <div className=" mx-5 p-1 flex">
                  <div className="w-1/2 mt-3 pr-2">
                    <hr className="bg-black" />
                  </div>
                  <div>or</div> 
                  <div className="w-1/2 mt-3 pl-2">
                  <hr />
                  </div>
                </div>
                <div className="mb-4 mx-5 flex">
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
              </form>
            </div>
          </section>
        </main>
       </GuestLayout>
    </>
  );
}
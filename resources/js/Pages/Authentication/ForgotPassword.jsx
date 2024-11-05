import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { Head,Link, usePage } from '@inertiajs/react'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page for parkit" />
      </Head>
      <GuestLayout>
        <main className="w-full">
          <section className="flex justify-center bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_1.jpg')] bg-blue-300 bg-blend-multiply">
            <div className="login-content bg-white rounded-lg border drop-shadow md:my-10 xl:my-32 lg:w-[500px]">
              <form className="py-5">
                <div className="text-2xl my-4 flex justify-center">Forgot password</div>
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
                    <input type="text" className="grow border-none focus:ring-0" tabindex="1" placeholder="Enter email" />
                  </label>
                </div>
                <div class="mb-5 mx-5">
                  <button tabindex="3" class="btn bg-main-color text-white hover:bg-blue-900 w-full transition ease-in duration-100 hover:scale-105">
                    Recover
                  </button>
                </div>
                <div className="mx-2 flex text-center">
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
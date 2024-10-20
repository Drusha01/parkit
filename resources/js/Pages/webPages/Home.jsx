
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
export default function Home() {
  return (
    <>
      <GuestLayout>
        <main className="w-full">
            <section className="bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_1.jpg')] bg-gray-500 bg-blend-multiply sm:h-[700px] h-[300px]">
              <div className="md:px-4 px-1 m-5 max-w-screen-xl text-start py-10  md:py-40 lg:py-56">
                <h1 className="my-4 text-xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                  Discover your ideal space.
                </h1>
                <p className="mb-8 text-sm font-normal text-gray-300 md:text-xl  ">
                  Unlock convenience, reserve your space. Your hassle-free parking solution is just a click away.
                </p>
                <div className="flex space-y-4  md:justify-start sm:space-y-0">
                  <a href="#" className="flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Get started
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </section>
            <section className="w-full">
              <div className="min-h-10 md:min-h-20 w-full"></div>
              <div className="bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_2.jpg')] bg-yellow-100 bg-blend-multiply w-5/6 sm:h-[700px] h-[300px] ">
                <div className="bg-[#1363DF] text-white relative top-10 lg:top-20  left-1/3 w-3/4 h-3/4 bg-opacity-80 flex items-center ">
                  <div className="md:mt-8">
                    <div className="flex justify-center text-2xl sm:text-md mt-10">
                      ParkIT
                    </div>  
                    <div className="text-2xl p-2 m-2 py-5 hidden sm:block text-justify">
                      "Parkit serves as a platform facilitating a mutually beneficial relationship between renters and space owners. Renters enjoy a user-friendly interface for finding and reserving parking spaces, while space owners can monetize their unused spaces by listing them on the platform. Transparent communication and efficient reservation management enhance the overall parking experience for both parties, fostering trust and reliability. "
                    </div>
                    <div className="text-sm p-2 m-2 py-5 sm:hidden block text-justify">
                      "Parkit serves as a platform facilitating a mutually beneficial relationship between renters and space owners."
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-h-10 md:min-h-20 w-full"></div>
            </section>
            <section className="bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_3.jpg')] bg-gray-500 bg-blend-multiply sm:h-[700px] h-[400px] ">
              <div className="flex justify-center h-full py-24 lg:py-56">
                <p className="text-sm font-normal h-full align-text-middle w-2/3 text-gray-300 md:text-2xl text-justify">
                  "Unlock the simplicity of Parkit in three easy steps: Explore, Reserve, and Enjoy. Browse through a variety of parking spaces, select the one that suits you best, reserve it hassle-free, and enjoy a seamless parking experience. It's that easy – find, book, and park stress-free with Parkit.
                </p>
              </div>
              <button> s</button>
            </section>
            <section className="w-full">
              <div className="bg-[#47B5FF] sm:min-h-[800px] min-h-[300px] pt-5">
                <div className="min-h-10 md:min-h-10 w-full"></div>
                <h2 className="flex justify-center text-white text-2xl md:text-4xl p-5">
                  Parking space recomendations
                </h2>
              </div>
            </section>
            <section className="w-full">
              <div className="bg-[#e9e9e9] sm:min-h-[800px] min-h-[300px] pt-5">
              <div className="min-h-10 md:min-h-10 w-full"></div>
              <h2 className="flex justify-center text-black text-2xl md:text-4xl p-5">
                  Learn Our Website
                </h2>
              <div className="min-h-10 md:min-h-10 w-full"></div>
              </div>
            </section>
            <section className="w-full">
              <div className="bg-[#fff] sm:min-h-[800px] min-h-[300px] pt-5">
              <div className="min-h-10 md:min-h-10 w-full"></div>
              <h2 className="flex justify-center text-black text-2xl md:text-4xl p-5">
                  Zone it In
                </h2>
              <div className="min-h-10 md:min-h-10 w-full"></div>
              </div>
            </section>
            <section className="w-full">
              <div className="bg-[#e9e9e9] sm:min-h-[800px] min-h-[300px] pt-5">
                <div className="min-h-5 md:min-h-10 w-full"></div>
                <h2 className="flex justify-center text-black text-2xl md:text-4xl p-5">
                  If we can talk
                </h2>
                <div className="min-h-10 md:min-h-10 w-full"></div>
              </div>
            </section>
        </main>
      </GuestLayout>
    </>
  );
}
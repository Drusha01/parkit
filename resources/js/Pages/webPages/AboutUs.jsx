
import { GuestLayout } from '../../Layout/GuestLayout.jsx';

export default function AboutUs() {
  return (
    <>
      <GuestLayout>
        <main className="w-full">
          <section className="bg-center bg-no-repeat bg-[url('../../public/img/background/background_4.jpg')] bg-orange-200 bg-blend-multiply min-h-[200px] md:min-h-[300px] lg:min-h-[350px] ">
            <div className="w-full md:px-4 px-1 text-center py-10 md:py-40 lg:py-56 ">
              <h1 className="my-4 text-xl font-bold tracking-tight leading-none text-white md:text-3xl lg:text-5xl">
                Our space is also yours
              </h1>
              <p className="mb-8 text-sm font-normal text-white md:text-xl  ">
                Welcome to Park It, where our space becomes yours. Beyond parking, we offer an inclusive environment, ensuring every visit feels like you belong. Embrace comfort and ownership in a place that goes beyond pavement lines. Your space, your home.
              </p>
            </div>
          </section>
          <section className="my-10 py-10 ">
            <div className="mx-5 flex justify-center">
              <div className="gap-3 text-center">
                <button className="btn glass bg-gray-700 text-white hover:text-black mx-5 w-[100px]">Mission</button>
                <button className="btn glass bg-gray-700 text-white hover:text-black mx-5 w-[100px]">Vission</button>
                <button className="btn glass bg-gray-700 text-white hover:text-black mx-5 w-[100px]">Goal</button>
              </div>
            </div>
          </section>
          <section>
            <h1 className="mt-10 font-medium text-center my-2 text-xl md:text-2xl lg:text-3xl xl:text-5xl">
              Team
            </h1>
            <p className="text-center mx-5 md:mx-24 lg:mx-28 xl:mx-40 m-5 md:m-5 lg:m-10 xl:m-14 text-md md:text-xl lg:text-3xl">
              Meet our dynamic team of experts powering innovation and excellence. Together, we're dedicated to delivering seamless experiences and groundbreaking solutions, transforming the way you connect and engage.
            </p>
            <div className="grid grid-cols-2 my-10 pt-10">
              <div className="col-span-2 md:col-span-1">
                <div className="flex justify-center">
                  here
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex justify-center">
                  here 2
                </div>
              </div>
            </div>
          </section>
        </main>
      </GuestLayout>
    </>
  );
}

import { GuestLayout } from '../../Layout/GuestLayout.jsx';

export default function HowItWorks(props) {
  return (
    <>
      <GuestLayout props={props}>
      <main className="dark:bg-gray-800 dark:text-white pb-20">
        <section className="flex ">
            <div className="w-1/2 flex justify-end">
            <img src="/img/howitworks/how_1.png" className="h-full lg:h-[500px] transition ease-out duration-200 hover:scale-105" alt="" />
            </div>
            <div className="w-1/2 h-1/2 align-middle ">
            <div className="justify-center mr-5 md:mr-10 lg:mr-20 xl:mr-60 ml-5 h-full mt-16 md:mt-24 lg:mt-40 xl:mt-40">
                <h2 className="text-[#06283D] dark:text-white text-sm md:text-3xl lg:text-4xl font-bold sm:my-5 ">1. Choose your space</h2>
                <p className=" text-xs sm:text-sm md:text-2xl">Search your desired rental space and click "Rent Now.</p>
            </div>
            </div>
        </section>
        <section className="flex ">
            <div className="w-1/2 h-1/2 align-middle ">
            <div className="justify-end ml-5 md:ml-10 lg:ml-40 xl:ml-60 mr-5 h h-full mt-10 md:mt-24 lg:mt-40 xl:mt-40">
                <h2 className="text-[#06283D] dark:text-white text-sm md:text-3xl lg:text-4xl font-bold sm:my-5 ">2. Fill out the renting form</h2>
                <p className="text-xs sm:text-sm md:text-2xl">Fill out the provided form for parking space selection. And you can add another vehicle by clicking "Add Another Rent" and complete the form.</p>
            </div>
            </div>
            <div className="w-1/2 flex justify-start">
            <img src="/img/howitworks/how_2.png" className="h-full lg:h-[500px] transition ease-out duration-200 hover:scale-105" alt="" />
            </div>
        </section>
        <section className="flex ">
            <div className="w-1/2 flex justify-end">
            <img src="/img/howitworks/how_3.png" className="h-full lg:h-[500px] transition ease-out duration-200 hover:scale-105" alt="" />
            </div>
            <div className="w-1/2 h-1/2 align-middle ">
            <div className="justify-center mr-5 md:mr-10 lg:mr-20 xl:mr-60 ml-5 h-full mt-16 md:mt-24 lg:mt-40 xl:mt-40">
                <h2 className="text-[#06283D] dark:text-white text-sm md:text-3xl lg:text-4xl font-bold sm:my-5 ">3. Review details</h2>
                <p className="text-xs sm:text-sm md:text-2xl">Carefully examine the details of your rental space to ensure accuracy.</p>
            </div>
            </div>
        </section>
        <section className="flex ">
            <div className="w-1/2 h-1/2 align-middle ">
            <div className="justify-end ml-5 md:ml-10 lg:ml-40 xl:ml-60 mr-5 h-full mt-10 md:mt-24 lg:mt-40 xl:mt-40">
                <h2 className="text-[#06283D] dark:text-white text-sm md:text-3xl lg:text-4xl font-bold sm:my-5">4. Process payment</h2>
                <p className=" text-xs sm:text-sm md:text-2xl">Complete the payment process to finalize your transaction.</p>
            </div>
            </div>
            <div className="w-1/2 flex justify-start">
            <img src="/img/howitworks/how_4.png" className="h-full lg:h-[500px] transition ease-out duration-200 hover:scale-105" alt="" />
            </div>
        </section>
        <section className="flex ">
            <div className="w-1/2 flex justify-end">
            <img src="/img/howitworks/how_5.png" className="h-full lg:h-[500px] transition ease-out duration-200 hover:scale-105" alt="" />
            </div>
            <div className="w-1/2 h-1/2 align-middle ">
            <div className="justify-center mr-5 md:mr-10 lg:mr-20 xl:mr-60 ml-5 h-full mt-16 md:mt-24 lg:mt-40 xl:mt-40">
                <h2 className="text-[#06283D] dark:text-white text-sm md:text-3xl lg:text-4xl font-bold sm:my-5 ">5. Arrival</h2>
                <p className=" text-xs sm:text-sm md:text-2xl">After receiving confirmation from the space owner, you are eligible to utilize the rented space. Upon arriving at the designated location, you can immediately commence using the rented space.</p>
            </div>
            </div>
        </section>

      </main>
      </GuestLayout>
    </>
  );
}

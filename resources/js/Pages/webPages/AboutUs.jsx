
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import {React, useState} from 'react';
import $ from 'jquery';

export default function AboutUs(props) {
  const [isActive, setIsActive] = useState({
    key:""
  });

  function handleToogle(e){
    setIsActive(isActive => ({
      ...isActive,
      key: e.target.id
      })
    )
  }
  function handleDisable(e){
    setIsActive(isActive => ({
      ...isActive,
      key: ""
      })
    )
  }
  return (
    <>
      <GuestLayout props={props}>
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
            <div className="mx-5">
              <div className="text-center">
                <button className={`btn hover:text-black m-2 md:mx-5 lg:mx-10 xl:mx-15 w-[100px] ${isActive.key == "mission"  ? 'bg-gray-100 text-black border border-black' : 'glass bg-gray-700 text-white'}`} id="mission" onClick={handleToogle} onBlur={handleDisable}>Mission</button>
                <button className={`btn hover:text-black m-2 md:mx-5 lg:mx-10 xl:mx-15 w-[100px] ${isActive.key == "vission"  ? 'bg-gray-100 text-black border border-black' : 'glass bg-gray-700 text-white'}`} id="vission" onClick={handleToogle} onBlur={handleDisable}>Vission</button>
                <button className={`btn hover:text-black m-2 md:mx-5 lg:mx-10 xl:mx-15 w-[100px] ${isActive.key == "goal"  ? 'bg-gray-100 text-black border border-black' : 'glass bg-gray-700 text-white'}`} id="goal" onClick={handleToogle} onBlur={handleDisable}> Goal</button>
              </div>
            </div>
            <div className="flex justify-center h-auto">
              <div className={`rounded-lg w-auto md:w-auto lg:w:3/4 xl:w-3/4 xxl:w-3/4 m-5 bg-gray-100 shadow-lg text-black ${isActive.key == "mission"  ? '' : 'hidden'}`}  >
                <div className="text-2xl font-semibold w-full flex justify-center my-5 underline"> Mission</div>
                <p className='m-5 text-xl text-justify'>
                  At Park It, our mission is to redefine the parking experience by providing convenient, secure, and inclusive parking solutions. We aim to alleviate the stress associated with finding parking spaces and transform it into a seamless and enjoyable process. Our commitment is to offer a service that goes beyond mere functionality, fostering a sense of community and shared ownership in the spaces we provide.
                </p>
              </div>
              <div className={`rounded-lg w-auto md:w-auto lg:w:3/4 xl:w-3/4 xxl:w-3/4 m-5 bg-gray-100 shadow-lg text-black ${isActive.key == "vission"  ? '' : 'hidden'}`}  >
                <div className="text-2xl font-semibold w-full flex justify-center my-5 underline"> Vission</div>
                <p className='m-5 text-xl text-justify'>
                  Our vision is to be the leading provider of innovative parking solutions, setting the standard for accessibility, reliability, and user satisfaction. We envision a future where parking is not just a necessity but an integral part of a connected and sustainable urban environment. Through technology and a customer-centric approach, we strive to make parking a stress-free and enjoyable aspect of daily life.
                </p>
              </div>
              <div className={`rounded-lg w-auto md:w-auto lg:w:3/4 xl:w-3/4 xxl:w-3/4 m-5 bg-gray-100 shadow-lg  text-black ${isActive.key == "goal"  ? '' : 'hidden'}`}  >
                <div className="text-2xl font-semibold w-full flex justify-center my-5 underline"> Goal</div>
                <p className='m-5 text-xl text-justify'>
                  Our goal is to empower every individual to effortlessly find and reserve the perfect parking space, creating a seamless and enjoyable experience. By leveraging cutting-edge technology and fostering a sense of community, we aim to be the go-to platform for anyone seeking hassle-free, secure, and personalized parking solutions. Together, we're building a future where parking is not just a necessity but an enjoyable part of your journey.
                </p>
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
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
                <div className="flex justify-end">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full object-cover h-60" src="/img/team/INOFERIO, CHARL'S BENEDICK.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">CHARL'S BENEDICK INOFERIO</div>
                      <p class="text-gray-700 text-base">
                        Ensures project goals are met on time and within budget, guiding the team with strategic planning and effective communication.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Leadership</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Coordination</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#ProjectPlanning</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#TimeManagement</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
                <div className="flex justify-start">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full object-cover h-60" src="/img/team/JAUHARI, MOHAMMAD SALI.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">MOHAMMAD SALI JAUHARI</div>
                      <p class="text-gray-700 text-base">
                        Transforms ideas into functional code, bringing the vision to life through clean, efficient, and reliable programming.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Coding</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Development</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Innovation</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#ProblemSolving</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
              <div className="flex justify-end">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full object-cover h-60" src="/img/team/SANTIAGO, KATHLEEN KATE.jpg"  alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2"> KATHLEEN KATE SANTIAGO</div>
                      <p class="text-gray-700 text-base">
                        Creates intuitive and visually appealing designs that enhance user interactions and improve usability.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Design</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Creativity</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#UserInterface</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#VisualDesign</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
                <div className="flex justify-start">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full object-cover h-60" src="/img/team/ROM, MARY HAROLHETTE.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">MARY HAROLHETTE ROM</div>
                      <p class="text-gray-700 text-base">
                        Crafts meaningful and user-centered experiences by understanding user needs and creating seamless workflows.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#UserExperience</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#InteractionDesign</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#InteractionDesign</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      </GuestLayout>
    </>
  );
}
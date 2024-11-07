
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import {React, useState} from 'react';
import $ from 'jquery';

export default function AboutUs() {
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
                <p className='m-5 text-lg text-justify'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate pariatur impedit fugit, necessitatibus asperiores nam quibusdam iure dolorum molestiae facilis adipisci quo porro sed aliquam, consequuntur, animi accusantium id neque voluptas voluptates inventore optio? Dicta culpa aspernatur ex alias omnis sint eum quidem. Nisi exercitationem sequi sint ex, vitae accusantium eaque eius rem, dolore necessitatibus, ea nesciunt. Minima dolores omnis fugiat vel quas minus aspernatur amet quo atque, voluptates ipsam, optio, dignissimos velit numquam voluptatibus modi. Amet iusto sunt non, ipsum quidem possimus distinctio animi voluptatum repellat ex harum eos doloremque aspernatur voluptatibus optio ratione tenetur voluptates? Amet facilis aperiam repellat praesentium. Nemo dolorem sequi illo asperiores blanditiis. Exercitationem libero blanditiis perspiciatis autem officia magnam incidunt aliquid illo similique! Illo quis aliquam in nemo, debitis, labore exercitationem, voluptate tempora praesentium fugiat amet iusto veniam! Ipsa debitis, obcaecati fuga beatae est ut tenetur aut delectus saepe quisquam molestias similique cupiditate sunt amet quas dolor! Sapiente enim quibusdam eos odit totam facilis neque quam accusamus id nobis, accusantium molestiae sit repudiandae est cum dicta modi labore eum atque explicabo officia nihil maiores doloribus? Possimus minus iure quam molestiae incidunt est, assumenda ullam aliquam animi illo facilis beatae atque, recusandae consectetur laboriosam architecto.
                </p>
              </div>
              <div className={`rounded-lg w-auto md:w-auto lg:w:3/4 xl:w-3/4 xxl:w-3/4 m-5 bg-gray-100 shadow-lg text-black ${isActive.key == "vission"  ? '' : 'hidden'}`}  >
                <div className="text-2xl font-semibold w-full flex justify-center my-5 underline"> Vission</div>
                <p className='m-5 text-lg text-justify'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque nihil nam voluptates eaque ad. Pariatur similique id aspernatur! Aut aspernatur, dolores aliquid ab libero soluta. Minus ea voluptate doloremque laboriosam, vel aperiam incidunt error odit sit temporibus deserunt eos, magni, consectetur cum distinctio excepturi officiis rem voluptates ipsam dolorum. Mollitia commodi nesciunt similique eum quam vero est exercitationem, possimus fuga culpa accusamus dolorem perferendis molestias debitis consequuntur esse harum ad porro nihil blanditiis? Eius odit magnam, velit quidem hic aliquam officia labore recusandae eos, blanditiis quod unde quam accusamus doloremque ipsa. Odit iusto earum expedita animi numquam ipsum deserunt, incidunt error ea. Quod, fuga? Voluptate rerum minus magni, mollitia libero, sit iusto facilis laudantium dolor ad doloremque? Deserunt vero maxime commodi a recusandae expedita consequuntur suscipit, illo atque est tempora sed adipisci beatae minima distinctio dolores veritatis nam dignissimos dolorum molestias impedit fuga necessitatibus. Ipsam totam eligendi doloremque assumenda amet.
                </p>
              </div>
              <div className={`rounded-lg w-auto md:w-auto lg:w:3/4 xl:w-3/4 xxl:w-3/4 m-5 bg-gray-100 shadow-lg  text-black ${isActive.key == "goal"  ? '' : 'hidden'}`}  >
                <div className="text-2xl font-semibold w-full flex justify-center my-5 underline"> Goal</div>
                <p className='m-5 text-lg text-justify'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium velit debitis eum. Quos beatae earum, rerum tempore aspernatur sed, minima reiciendis magni non eaque maxime eligendi dolore ipsa officiis quod provident laudantium ad, incidunt nobis doloremque commodi voluptatibus? Culpa expedita ut eius quam fugit facilis laudantium perspiciatis dignissimos corporis exercitationem.
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
                    <img class="w-full" src="/img/profile/john-doe.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">Hanrickson E. Dumapit</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
                <div className="flex justify-start">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full" src="/img/profile/john-doe.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">Hanrickson E. Dumapit</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
              <div className="flex justify-end">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full" src="/img/profile/john-doe.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">Hanrickson E. Dumapit</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-10 col-span-2 md:col-span-1 my-5">
                <div className="flex justify-start">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full" src="/img/profile/john-doe.jpg" alt="Sunset in the mountains"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">Hanrickson E. Dumapit</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
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
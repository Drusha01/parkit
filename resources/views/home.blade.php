<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'ParkIT') }} - {{ $title ?? 'ParkIT' }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <script src="{{url('/sweetalert2-11.10.1/dist/sweetalert2.all.min.js')}}"></script>
    <link href="{{url('/sweetalert2-11.10.1/dist/sweetalert2.min.css')}}" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
      <style>
      body {
          font-family: 'Poppins';
      }
      </style>
  </head>
  <body class="w-full">

  <nav class="bg-footer-color text-gray-700 border border-gray-200 h-[80px] text-white fixed top-0 left-0 w-full z-50" >
    <div class="flex justify-between h-full">
      <div class="flex items-center  h-full">
          <a href="">
            <img src="{{url('/img/logo.png')}}" class="ml-5" width="100px" alt="">
          </a>
      </div>
      <div class="items-center hidden lg:flex"> 
        <ul class="flex jusitfy-center items-center h-full gap-3">
          <li class="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
            <a href="">
              Home
            </a> 
          </li>
          <li class="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
            <a href="">
              Browse
            </a>
          </li>
          <li class="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
            <a href="">
              How it works
            </a>
          </li>
          <li class="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
            <div class="flex lg:gap-x-12">
              <div class="relative">
                <button type="button" id="toggleButton" class="flex items-center gap-x-1 leading-6 font-semibold " aria-expanded="false">
                Why ParkIT
                <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div  id="box" class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 opacity-0 scale-90 transition-opacity transition-transform ease-in duration-500 hidden">
                <div class="p-4">
                  <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="false" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                      </svg>
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-900">
                        Analytics
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-gray-600">Get a better understanding of your traffic</p>
                    </div>
                  </div>
                  <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                      </svg>
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-900">
                        Engagement
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-gray-600">Speak directly to your customers</p>
                    </div>
                  </div>
                  <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                      </svg>
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-900">
                        Security
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-gray-600">Your customers’ data will be safe and secure</p>
                    </div>
                  </div>
                  <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-900">
                        Integrations
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-gray-600">Connect with third-party tools</p>
                    </div>
                  </div>
                  <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-900">
                        Automations
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-gray-600">Build strategic funnels that will convert</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fill-rule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z" clip-rule="evenodd" />
                    </svg>
                    Watch demo
                  </a>
                  <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
                    </svg>
                    Contact sales
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>  
      <div class="items-center hidden lg:flex mr-10"> 
        <div class="transition ease-in duration-200 hover:scale-110">
          <a href="">
            Sign in
          </a>
        </div>
        <div class="h-12 w-px bg-gray-300 mx-5"></div>
        <div class="transition ease-in duration-200 hover:scale-110">
          <a href="">
            Sign up
          </a>
        </div>
      </div>
      <div class="lg:hidden flex items-center mr-5 " type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example"  for="my-drawer-4">
        <svg height="30px" width="30x" viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="#ffffff"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
      </div>
      <div id="drawer-right-example" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
        <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 mr-2 mt-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg fill="#000000" height="30px" width="30x" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z"></path></g></svg>
        </button>
        <ul class="mt-10">
          <li class="text-black p-2  transition ease-out duration-200 hover:scale-110">

          </li>
          <li class="text-black p-1  transition ease-out duration-200 hover:scale-110">
            <a href="">Home</a>
          </li>
          <li class="text-black p-1  transition ease-out duration-200 hover:scale-110">
            <a href="">Browse</a>
          </li>
          <li class="text-black p-1  transition ease-out duration-200 hover:scale-110">
            <a href="">How it Works</a>
          </li>
          <li class="text-black p-1  transition ease-out duration-200 hover:scale-110">
            <a href="">Why ParkIT</a>
          </li>
          <li class="text-black p-1  transition ease-out duration-200 hover:scale-110"><hr></li>
          <li class="text-black p-1  transition ease-out duration-200 hover:scale-110">
            <a href="">Sign in</a>
          </li>
        </ul>
      </div>
    </div>
    <script>
          const button = document.getElementById('toggleButton');
          const box = document.getElementById('box');
          button.addEventListener('click', () => {
              if (box.classList.contains('hidden')) {
                  // Make it visible
                  box.classList.remove('hidden');
                  setTimeout(() => {
                      box.classList.remove('opacity-0', 'scale-90');
                  }, 10); // Small delay to ensure the transition works
              } else {
                  // Hide it with a transition
                  box.classList.add('opacity-0', 'scale-90');
                  setTimeout(() => {
                      box.classList.add('hidden');
                  }, 500); // Duration should match the transition duration
              }
          });
    </script>
  </nav>
  <main class="mt-[80px] w-full">
    <section class="bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_1.jpg')] bg-gray-500 bg-blend-multiply sm:h-[700px] h-[300px]">
      <div class="md:px-4 px-1 m-5 max-w-screen-xl text-start py-10  md:py-40 lg:py-56">
        <h1 class="my-4 text-xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Discover your ideal space.
        </h1>
        <p class="mb-8 text-sm font-normal text-gray-300 md:text-xl  ">
          Unlock convenience, reserve your space. Your hassle-free parking solution is just a click away.
        </p>
        <div class="flex space-y-4  md:justify-start sm:space-y-0">
          <a href="#" class="flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Get started
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
    <section class="w-full">
      <div class="min-h-10 md:min-h-20 w-full"></div>
      <div class="bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_2.jpg')] bg-yellow-100 bg-blend-multiply w-5/6 sm:h-[700px] h-[300px] ">
        <div class="bg-[#1363DF] text-white relative top-10 lg:top-20  left-1/3 w-3/4 h-3/4 bg-opacity-80 flex items-center ">
          <div class="md:mt-8">
            <div class="flex justify-center text-2xl sm:text-md mt-10">
              ParkIT
            </div>  
            <div class="text-2xl p-2 m-2 py-5 hidden sm:block text-justify">
              " Parkit serves as a platform facilitating a mutually beneficial relationship between renters and space owners. Renters enjoy a user-friendly interface for finding and reserving parking spaces, while space owners can monetize their unused spaces by listing them on the platform. Transparent communication and efficient reservation management enhance the overall parking experience for both parties, fostering trust and reliability. "
            </div>
            <div class="text-sm p-2 m-2 py-5 sm:hidden block text-justify">
              " Parkit serves as a platform facilitating a mutually beneficial relationship between renters and space owners."
            </div>
          </div>
        </div>
      </div>
      <div class="min-h-10 md:min-h-20 w-full"></div>
    </section>
    <section class="bg-center bg-no-repeat bg-[url('http://parkit/img/background/background_3.jpg')] bg-gray-500 bg-blend-multiply sm:h-[700px] h-[400px] ">
      <div class="flex justify-center h-full py-24 lg:py-56">
        <p class="text-sm font-normal h-full align-text-middle w-2/3 text-gray-300 md:text-2xl text-justify">
          "Unlock the simplicity of Parkit in three easy steps: Explore, Reserve, and Enjoy. Browse through a variety of parking spaces, select the one that suits you best, reserve it hassle-free, and enjoy a seamless parking experience. It's that easy – find, book, and park stress-free with Parkit.
        </p>
      </div>
      <button> s</button>
    </section>
    <section class="w-full">
      <div class="bg-[#47B5FF] sm:min-h-[800px] min-h-[300px] pt-5">
        <div class="min-h-10 md:min-h-10 w-full"></div>
        <h2 class="flex justify-center text-white text-2xl md:text-4xl p-5">
          Parking space recomendations
        </h2>
      </div>
    </section>
    <section class="w-full">
      <div class="bg-[#e9e9e9] sm:min-h-[800px] min-h-[300px] pt-5">
      <div class="min-h-10 md:min-h-10 w-full"></div>
      <h2 class="flex justify-center text-black text-2xl md:text-4xl p-5">
          Learn Our Website
        </h2>
      <div class="min-h-10 md:min-h-10 w-full"></div>
      </div>
    </section>
    <section class="w-full">
      <div class="bg-[#fff] sm:min-h-[800px] min-h-[300px] pt-5">
      <div class="min-h-10 md:min-h-10 w-full"></div>
      <h2 class="flex justify-center text-black text-2xl md:text-4xl p-5">
          Zone it In
        </h2>
      <div class="min-h-10 md:min-h-10 w-full"></div>
      </div>
    </section>
    <section class="w-full">
      <div class="bg-[#e9e9e9] sm:min-h-[800px] min-h-[300px] pt-5">
      <div class="min-h-5 md:min-h-10 w-full"></div>
      <h2 class="flex justify-center text-black text-2xl md:text-4xl p-5">
          If we can talk
        </h2>
      <div class="min-h-10 md:min-h-10 w-full"></div>
      </div>
    </section>
  </main>

  <footer class="bg-footer-color shadow dark:bg-gray-900 ">
    <div class="flex justify-start ml-5">  
      <img src="{{url('/img/logo.png')}}" class="p-5 hidden lg:block" width="150px" alt="">
    </div>
    <div class="lg-hidden block p-5">

    </div>
    <div class="min-h-32 bg-footer-color flex justify-center py-5 mb-3 ">
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center text-white px-10 sm:col-span-1 col-span-3">
          <div class="mb-3 text-2xl">
            ParkIT
          </div>
          <ul class="">
            <li class="py-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                About Us
              </a>
            </li>
            <li class="py-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                Why Choose Us
              </a>
            </li>
            <li class="py-1 pb-5 sm-pb-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                Our Story
              </a>
            </li>
          </ul>
        </div>
        <div class="text-center text-white px-10 sm:col-span-1 col-span-3">
          <div class="mb-3 text-2xl">
            Support
          </div>
          <ul class="">
            <li class="py-1 transition ease-out duration-200 hover:scale-110" >
              <a href="">
                Support
              </a>
            </li>
            <li class="py-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                Contact Us
              </a>
            </li>
            <li class="py-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                Driver FAQs
              </a>
            </li>
            <li class="py-2 pb-5 sm-pb-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                Space Owner FAQs
              </a>
            </li>
          </ul>
        </div>
        <div class="text-center text-white px-10 sm:col-span-1 col-span-3">
          <div class="mb-3 text-2xl">
            Terms
          </div>
          <ul class="">
            <li class="py-1 transition ease-out duration-200 hover:scale-110">
              <a href="">
                Terms and Conditions
  
              </a></li>
            <li class="py-1 pb-5 sm-pb-1 transition ease-out duration-200 hover:scale-110">
              <a href="">Privacy Policy
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="h-24 bg-[#47B5FF]">
      <div class="flex items-center justify-center h-full">
          <a href="">
            <img src="{{url('/img/socials/facebook.png')}}" class="p-2 transition ease-in duration-200 hover:scale-110" width="65px" alt="">
          </a>
          <a href="">
            <img src="{{url('/img/socials/instagram.png')}}" class="p-2 transition ease-in duration-200 hover:scale-110" width="70px"  alt="">
          </a>
          <a href="">
            <img src="{{url('/img/socials/tiktok.png')}}" class="p-2 transition ease-in duration-200 hover:scale-110" width="50px"   alt="">
          </a>
      </div>
    </div>
    <span class="block text-sm text-gray-500 text-center dark:text-gray-400 py-4">© 2024 ParkIT . All Rights Reserved.</span>
  </footer>

</body>
</html>
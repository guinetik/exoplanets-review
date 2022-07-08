import { Button } from "flowbite-react";
import { IoIosPlanet } from "react-icons/io";
import { GrSolaris } from "react-icons/gr";
import Quote from "../components/quote";
export default function Home() {
  return (
    <main className="w-full flex justify-center items-center mb-10">
      <div className="m-auto mt-12">
      <h1
          className="text-white glow lettering uppercase font-light px-2 mb-8 mt-8 text-center w-full 
        text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl"
        >
          Welcome to Exoplanets Review
        </h1>
        <div className="w-full flex items-center justify-center">
          <div className="container mx-10">
            <div className="w-full rounded-xl bg-gradient-to-b p-[5px] from-cyan-300 to-slate-700">
              <div className="xl:flex">
                <figure className="bg-slate-600 w-full relative overflow-hidden rounded-tl-xl lg:rounded-bl-none rounded-tr-lg xl:rounded-tr-none xl:rounded-bl-lg">
                  <img
                    className="object-cover w-full h-full object-bottom"
                    src="https://i.ibb.co/LzMHj1x/tess-min.png"
                  />
                  <footer className="py-3 px-3 bg-slate-800 text-xs text-white font-mono absolute bottom-0 right-0 left-0 rounded-bl-lg bg-opacity-80 border-t-[1px] border-slate-900">
                    <aside>Image: TESS Probe</aside>
                  </footer>
                </figure>
                <section
                  className="border-l-[1px]
                border-slate-500 p-4 space-y-3 w-full rounded-bl-lg rounded-br-lg xl:rounded-bl-none xl:rounded-tr-lg bg-black bg-opacity-80"
                >
                  <div className="place-self-center">
                    <h1 className="w-full lettering mb-4 tracking-tight leading-none text-cyan-200 text-2xl sm:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl">
                      🧑‍🚀GREETINGS, SPACE DWELERS!
                    </h1>
                    <div className="px-4 lg:px-8 xl:px-12">
                    <Quote/>
                    </div>
                    <p className="w-full p-2 lg:p-6 font-light md:text-lg lg:text-xl text-slate-300 mt-4">
                      This website is a collection of the <strong>
                        227
                      </strong>{" "}
                      confirmed planets by the <a className="text-purple-500 hover:text-white" href="https://en.wikipedia.org/wiki/Transiting_Exoplanet_Survey_Satellite">TESS</a> Survey Satellite. You
                      can browse the planets and leave a review with your thoughts on it, 
                      <br />
                      <br />
                      Data was extracted from the{" "}
                      <a
                        href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS&constraint=default_flag=1&constraint=disc_facility+like+%27%25TESS%25%27"
                        className="text-cyan-300 hover:text-white"
                      >
                        NASA's Exoplanet Archive website
                      </a>
                      . Additional data from{" "}
                      <a
                        href="https://api.nasa.gov/"
                        className="text-red-500 hover:text-white"
                      >
                        NASA's Open API
                      </a>{" "}
                      was used. 
                    </p>
                    <div className="grid items-center md:grid-cols-2 grid-cols-1 justify-items-stretch md:justify-items-center fluid-button-bar gap-4 my-8 mx-4 lg:mx-10">
                      <Button
                        href="/exoplanets-review/#/stars/"
                        outline={true}
                        gradientDuoTone="pinkToOrange"
                        size="xl"
                      >
                        <GrSolaris className="text-xl group-hover:animate-spin transition-all" />
                        Discover The Stars
                      </Button>
                      <Button
                        href="/exoplanets-review/#/planets/"
                        outline={true}
                        gradientDuoTone="cyanToBlue"
                        size="xl"
                      >
                        <IoIosPlanet className="text-xl group-hover:animate-pulse transition-all" />
                        Featured Planets
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

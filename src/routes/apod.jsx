import AppData from "../data/app.data";
import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Button } from "flowbite-react";
import FirebaseData from "../data/db";

export default function Apod() {
  const d = new Date();
  d.setHours(12, 0, 0);
  const [apodDate, setApodDate] = useState(d);
  const [nextEnabled, setNextEnabled] = useState(false);
  const today = AppData.getFormattedDate(d);
  const [apod, setApod] = useState(null);

  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url) => {
    // Handle both regular YouTube links and shortened youtu.be links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i) || isYouTubeUrl(url);
  };

  const renderMedia = () => {
    if (!apod) return null;

    if (isYouTubeUrl(apod.url)) {
      return (
        <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getYouTubeEmbedUrl(apod.url)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={apod.title}
          />
        </div>
      );
    } else if (isVideo(apod.url)) {
      return (
        <video 
          className="w-full h-auto max-h-[80vh]"
          controls
          autoPlay
          muted
          loop
        >
          <source src={apod.url} type={`video/${apod.url.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <a href={apod.hdurl || apod.url} target="_blank" rel="noopener noreferrer">
          <img
            className="object-cover w-full h-full object-bottom"
            src={apod.url}
            alt={apod.title}
          />
        </a>
      );
    }
  };

  const doLoadPreviousDay = (e) => {
    if (e) e.preventDefault();
    const newDate = new Date(apodDate);
    newDate.setDate(newDate.getDate() - 1);
    setApodDate(newDate);
    setNextEnabled(true);
    fetchData(newDate);
  };

  const doLoadNextDay = (e) => {
    e.preventDefault();
    if (nextEnabled) {
      const newDate = new Date(apodDate);
      newDate.setDate(newDate.getDate() + 1);
      setApodDate(newDate);
      setNextEnabled(AppData.getFormattedDate(newDate) !== today);
      fetchData(newDate);
    }
  };

  async function fetchData(date = apodDate) {
    const dateString = AppData.getFormattedDate(date);
    const apodResponse = await AppData.loadAstronomyPictureOfTheDay(dateString);
    
    console.log("apodResponse", apodResponse);
    if (apodResponse.error) {
      FirebaseData.messageHandler(apodResponse.error.message);
      return;
    }
    if (apodResponse.code) {
      FirebaseData.messageHandler(apodResponse.msg);
      if (apodResponse.code === 404) {
        doLoadPreviousDay();
      }
      return;
    }
    setApod(apodResponse);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-full flex justify-center items-center h-screen">
      <div className="md:m-auto">
        <h1 className="text-white glow lettering uppercase font-light px-2 mb-8 text-center w-full text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl mt-72 sm:mt-68 md:mt-24 lg:mt-24">
          Astronomy Picture of the Day
        </h1>
        {!apod && (
          <div className="h-screen w-screen flex justify-center items-center">
            <h1 className="text-xl lettering glow uppercase text-white">
              Loading...
            </h1>
          </div>
        )}
        {apod && (
          <div className="w-full flex items-center justify-center h-[calc(100vh)] mb-8">
            <div className="mx-8 h-full">
              <div className="w-full rounded-xl bg-gradient-to-b p-2 h-max from-teal-500 to-purple-900">
                <div className="xl:flex">
                  <figure className="w-full relative overflow-hidden rounded-tl-xl lg:rounded-bl-none rounded-tr-lg xl:rounded-tr-none xl:rounded-bl-lg">
                    {renderMedia()}
                    {apod.copyright && (
                      <footer className="py-3 px-3 bg-slate-800 text-xs text-white font-mono absolute bottom-0 right-0 left-0 rounded-bl-lg bg-opacity-80 border-t-[1px] border-slate-900">
                        <aside>© {apod.copyright}</aside>
                      </footer>
                    )}
                  </figure>
                  <section className="border-l-[1px] border-slate-500 p-4 space-y-3 w-full rounded-bl-lg rounded-br-lg xl:rounded-bl-none xl:rounded-tr-lg bg-black bg-opacity-80 xl:w-1/2">
                    <div className="place-self-center">
                      <h1 className="w-full lettering mb-4 mt-2 tracking-tight leading-none text-cyan-200 text-2xl sm:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl">
                        {apod.date}:<strong>{apod.title}</strong>
                      </h1>
                      <p className="w-full p-2 lg:p-6 font-light text-sm italic letter text-slate-300 mt-4 shadow-sm leading-loose tracking-wide">
                        {apod.explanation}
                      </p>
                      <div className="grid items-center md:grid-cols-2 grid-cols-1 justify-items-stretch md:justify-items-center fluid-button-bar gap-4 my-8 mx-4 sm:mx-1 lg:mx-10">
                        <Button
                          onClick={doLoadPreviousDay}
                          outline={true}
                          gradientDuoTone="purpleToBlue"
                          size="xl"
                        >
                          <FcPrevious
                            className="text-xl group-hover:animate-bounce_x transition-all text-white"
                            color="#FFFFFFF"
                            size={28}
                          />
                          <span className="text-md">Yesterday</span>
                        </Button>
                        <Button
                          disabled={!nextEnabled}
                          onClick={doLoadNextDay}
                          outline={true}
                          gradientDuoTone="purpleToBlue"
                          size="xl"
                        >
                          <span className="text-md">Tomorrow</span>
                          <FcNext
                            className="text-xl group-hover:animate-bounce_x transition-all"
                            size={28}
                          />
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
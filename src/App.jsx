import { Outlet, Link } from "react-router-dom";
import StarsBg from "./components/bg";
import KeplerNav from "./components/nav";
import { useEffect, useState } from "react";
import AppData from "./data/app.data";
import toast, { Toaster } from "react-hot-toast";
import FirebaseData from "./data/db";

export default function App() {
  const [loading, setLoading] = useState(true);
  AppData.loading = loading;
  AppData.setLoading = setLoading;
  FirebaseData.errorHandler = (error) => {
    toast.error(error);
  };
  FirebaseData.messageHandler = (message, type) => {
    if ("S" === type) {
      toast.success(message);
    } else {
      toast(message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await AppData.loadData();
    }
    setTimeout(fetchData, 1000);
  }, []);
  return (
    <div>
      <KeplerNav />
      {loading && (
        <div className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-xl lettering glow uppercase text-white">
            Loading...
          </h1>
        </div>
      )}
      {!loading && <Outlet />}
      <StarsBg />
      <Toaster />
    </div>
  );
}

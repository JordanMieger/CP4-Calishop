import { Outlet } from "react-router-dom";
/* import { useEffect } from "react";
import axios from "axios"; */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
}

export default App;

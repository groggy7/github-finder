import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomeLayout() {
    return <div className="flex flex-col justify-between h-screen">
        <Header />
        <Outlet />
        <Footer />
    </div>
}
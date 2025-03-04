import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return <div className="bg-gray-800 text-white py-3 px-4 flex justify-between lg:px-6 navbar shadow-lg">
        <Link className="flex gap-4 items-center" to="/">
            <FaGithub size="28px" />
            <span className="text-lg">Github Finder</span>
        </Link>
        <div className="flex-none">
            <Link to='/' className="btn btn-ghost">Home</Link>
            <Link to='/about' className="btn btn-ghost">About</Link>
        </div>
    </div>
}
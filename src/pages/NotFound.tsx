import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="flex-auto w-full flex justify-center items-center">
        <div className="flex flex-col gap-6 items-center">
            <h1 className="text-6xl w-84">OOPS! PAGE NOT FOUND</h1>
            <p className="text-xl text-blue-300">THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST</p>
            <Link className="btn btn-primary" to="/">RETURN TO HOME PAGE</Link>
        </div>
    </div>
  )
}

export default NotFound
export default function Footer() {
    const year = new Date().getFullYear()

    return <div className="bg-gray-800 text-white text-center p-6">
        Copyright &copy; {year} All rights reserved
    </div>
}
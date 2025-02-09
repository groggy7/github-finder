import { CiWarning } from "react-icons/ci";

export default function Alert({children}: {children: React.ReactNode}) {
    return <div className="flex items-center justify-center">
        <div className="alert alert-error w-48 alert-soft">
            <CiWarning className="w-4 h-4" />{children}
        </div>
    </div>
}
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">QuickLink</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}
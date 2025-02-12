import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-center items-center space-x-8">
                {/* Home Link */}
                <Link to="/" className="text-2xl hover:text-gray-400 transition duration-300">
                    🗺️ Explore 
                </Link>

                {/* Analysis Link */}
                <Link to="/analysis" className="text-2xl hover:text-gray-400 transition duration-300">
                    📊 Analysis
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

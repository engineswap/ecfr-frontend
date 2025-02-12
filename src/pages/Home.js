import { useEffect, useState } from "react";
import TitleTable from "../components/TitleTable";
import { fetchTitles } from "../api";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTitles().then(titles => {
            setData(titles);
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col flex-grow px-6 items-center">
                <div className="border-t border-gray-700 w-full"></div>{/* Top Divider */}
                <h1 className="text-3xl font-bold mt-4">eCFR Explorer</h1>
                <p className="text-lg text-gray-300">Explore and analyze federal regulations data.</p>
                <div className="border-t border-gray-700 w-full"></div>{/* Bottom Divider */}

                {/* Search bar */}

                {loading ? <p className="text-center">Loading...</p> : <TitleTable data={data} />}
            </div>

            {/* Bottom Bar */}
            <div className="h-12 bg-gray-800 w-full flex items-center justify-center">
                <p className="text-white text-sm">© {new Date().getFullYear()} Department of Government Efficiency (DOGE)</p>
            </div>
        </div>
    );
}

export default Home;

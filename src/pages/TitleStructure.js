import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTitleStructure } from "../api/api.js";
import RegulationTable from "../components/RegulationTable";

const TitleStructure = () => {
    const { titleId, issueDate } = useParams();
    const [structure, setStructure] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTitleStructure(titleId, issueDate).then(data => {
            setStructure(data);
            setLoading(false);
        });
    }, [titleId, issueDate]);

    return (

        <div className="flex flex-col h-full">
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4">Title {titleId}</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : structure ? (
                    <RegulationTable data={[structure]} issueDate={issueDate} />
                ) : (
                    <p>Error loading data</p>
                )}
            </div>
            <div className="h-12 bg-gray-800 w-full flex items-center justify-center">
                <p className="text-white text-sm">© {new Date().getFullYear()} Department of Government Efficiency (DOGE)</p>
            </div>
        </div>
    );
};

export default TitleStructure;

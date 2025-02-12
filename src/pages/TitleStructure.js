import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTitleStructure } from "../api";
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Title {titleId}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : structure ? (
                <RegulationTable data={[structure]} issueDate={issueDate} />
            ) : (
                <p>Error loading data</p>
            )}
        </div>
    );
};

export default TitleStructure;

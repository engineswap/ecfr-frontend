import { useParams } from "react-router-dom";
import { fetchAmendments } from "../api";
import { useEffect, useState } from "react";
import AmendmentsCard from '../components/AmendmentsCard';

const Amendments = () => {
    const { titleId } = useParams();
    const [amendmentData, setAmendmentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAmendments(titleId).then(data => {
            setAmendmentData(data);
            setLoading(false);
        })
    }, [])

    return (
        <div classname="">
            <h1 className="text-3xl font-bold p-4">Title {titleId} Amendments</h1>
            {
                loading ? (
                    <p>Loading...</p>
                ) : amendmentData ? (
                    <AmendmentsCard data={amendmentData} />
                ) : (
                    <p>Error loading amendment data</p>
                )
            }
        </div>
    )
}
export default Amendments;

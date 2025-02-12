import { useNavigate } from "react-router-dom";

const TitleTable = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="overflow-y-auto max-h-[70vh] overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
            <table className="min-w-full text-left">
                <thead>
                    <tr className="bg-gray-900 text-white uppercase text-sm">
                        <th className="p-3">Title</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Last Amended</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer transition"
                            onClick={() => navigate(`/title/${item.id}/${item.latestIssue}`)}
                        >
                            <td className="p-3 font-medium text-white">Title {item.id}</td>
                            <td className="p-3 text-gray-300">{item.name}</td>
                            <td
                                className="p-3 text-gray-400 underline cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents row click event
                                    navigate(`/amendments/${item.id}`);
                                }}
                            >
                                {item.lastUpdated || "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TitleTable;

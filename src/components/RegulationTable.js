import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegulationTable = ({ data }) => {
    const [expanded, setExpanded] = useState({});
    const navigate = useNavigate();

    const toggleExpand = (item,itemType, identifier) => {
        if (itemType.toLowerCase() === "section") {
            console.log(item)
            //redirect to the section
            // HOW DO I GET FULL PATH INFORMATION HERE?
            // navigate(`/title/${item.id}/${item.latestIssue}`);
            return;
        }
        setExpanded(prev => ({
            ...prev,
            [identifier]: !prev[identifier]
        }));
    };

    return (
        <div className="overflow-y-auto max-h-[70vh] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
            <table className="min-w-full text-left border border-gray-700">
                <tbody>
                    {data.map((item) => (
                        <>
                            <tr
                                key={item.identifier}
                                className="even:bg-gray-700 hover:bg-gray-600 cursor-pointer transition"
                                onClick={() => toggleExpand(item, item.type, item.identifier)}
                            >
                                <td className="p-3 font-medium text-white">{item.label}</td>
                                <td className="p-3 text-gray-300">{item.label_description || "N/A"}</td>
                                <td className="p-3 text-gray-400">{item.type}</td>
                                <td className="p-3 text-gray-400">{item.size || "N/A"}</td>
                            </tr>
                            {expanded[item.identifier] && item.children && (
                                <tr>
                                    <td colSpan="4">
                                        <div className="ml-6 border-l-2 border-gray-500 pl-4">
                                            <RegulationTable data={item.children} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegulationTable;


import React, { useState } from "react";
import { fetchSection } from "../api/api.js";
import { parseXMLToHTML } from "../utils/utils.js";
import Modal from "./SectionModal.js";

/*
    This file contains a recursively rendered regulations table. 

    First we fetch the title structure.

    Next we render each data item as a table row.

    When user clicks a table row, we call toggleExpand, 
    - if its a section, we display a modal and we're done.
    - else we toggle the setExpanded state to false for a particular identifier.
        - so an expanded state like: { section1: true, section2: false } if we call with 
        - identifier = section2, becomes { section1: true, section2: true }
        - The table renders each row and then conditionally shows nested content
*/

const RegulationTable = ({ data, issueDate, breadcrumb = "" }) => {
    const [expanded, setExpanded] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [sectionContent, setSectionContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const toggleExpand = async (item, itemType, identifier) => {
        const itemBreadcrumb = breadcrumb
            ? `${breadcrumb} > ${item.type}: ${item.identifier}`
            : `${item.type}: ${item.identifier}`;

        if (itemType.toLowerCase() === "section") {
            setIsLoading(true);
            setModalOpen(true); // Open modal first

            try {
                const xmlText = await fetchSection(itemBreadcrumb, issueDate);
                const parsedHTML = parseXMLToHTML(xmlText);
                setSectionContent(parsedHTML);
            } catch (error) {
                console.error("Error fetching section:", error);
                setSectionContent(<p className="text-red-500">Failed to load section.</p>);
            } finally {
                setIsLoading(false); // Stop loading
            }
            return;
        }

        setExpanded((prev) => ({
            ...prev,
            [identifier]: !prev[identifier],
        }));
    };

    return (
        <div className="overflow-y-auto max-h-[70vh] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
            <table className="min-w-full text-left border border-gray-700">
                <tbody>
                    {data.map((item) => {
                        const itemBreadcrumb = breadcrumb
                            ? `${breadcrumb} > ${item.type}: ${item.identifier}`
                            : `${item.type}: ${item.identifier}`;

                        return (
                            <React.Fragment key={item.identifier}>
                                <tr
                                    className="even:bg-gray-700 hover:bg-gray-600 cursor-pointer transition"
                                    onClick={() => toggleExpand(item, item.type, item.identifier)}
                                >
                                    <td className="p-3 font-medium text-white">{item.label}</td>
                                    {/* <td className="p-3 text-gray-300">{item.label_description || "N/A"}</td> */}
                                    {/* <td className="p-3 text-gray-400">{item.type}</td> */}
                                    {/* <td className="p-3 text-gray-400">{item.size || "N/A"}</td> */}
                                </tr>
                                {expanded[item.identifier] && item.children && (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="ml-6 border-l-2 border-gray-500 pl-4">
                                                <RegulationTable data={item.children} breadcrumb={itemBreadcrumb} issueDate={issueDate} />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal for displaying parsed section */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} sectionContent={isLoading ? <p>Loading...</p> : sectionContent} />
        </div>
    );
};

export default RegulationTable;

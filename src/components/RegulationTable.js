import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSection } from "../api.js";
import Modal from "./SectionModal.js";

const parseXMLToHTML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    let htmlContent = "";

    // Extract section header
    const head = xmlDoc.querySelector("HEAD");
    if (head) {
        htmlContent += `<h2 class="text-xl font-bold mb-4">${head.textContent}</h2>`;
    }

    // Extract paragraphs
    xmlDoc.querySelectorAll("P").forEach((p) => {
        htmlContent += `<p class="mb-2">${p.innerHTML}</p>`;
    });

    // Extract citations
    xmlDoc.querySelectorAll("CITA").forEach((cita) => {
        htmlContent += `<p class="text-sm text-gray-400">${cita.textContent}</p>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
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

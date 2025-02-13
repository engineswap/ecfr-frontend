import React, { useState } from "react";
import Modal from './SectionModal';
import { fetchParsedSection } from '../api';
import { parseXMLToHTML } from "../utils";

const AmendmentsCard = ({ data }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [sectionContent, setSectionContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const amendmentJson = data.content_versions;

    // Group amendments by date
    const groupedByDate = amendmentJson.reduce((acc, item) => {
        acc[item.amendment_date] = acc[item.amendment_date] || [];
        acc[item.amendment_date].push(item);
        return acc;
    }, {});

    const [expandedDates, setExpandedDates] = useState({});

    const toggleDate = (date) => {
        setExpandedDates((prev) => ({
            ...prev,
            [date]: !prev[date]
        }));
    };

    // Fetch content when a section is clicked
    const fetchSectionContent = async (section) => {
        setIsLoading(true);
        setModalOpen(true);

        // Fetch actual section data with api
        const breadCrumbObj = {
            title: section.title,
            part: section.part,
            subpart: section.subpart || null, // Ensure null remains null
            section: section.identifier, // Identifier corresponds to section number
        };
        console.log(breadCrumbObj)

        try {
            let xmlText = await fetchParsedSection(breadCrumbObj, section.issue_date);
            const parsedHTML = parseXMLToHTML(xmlText);
            setSectionContent(parsedHTML);
        } catch (error) {
            console.error("Error fetching section:", error);
            setSectionContent(<p className="text-red-500">Failed to load section.</p>);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-6">
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                sectionContent={isLoading ? <p>Loading...</p> : sectionContent}
            />

            {/* Scrollable container */}
            <div className="max-h-[70vh] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 p-2 border border-gray-700 rounded-lg bg-gray-800">
                {Object.keys(groupedByDate)
                    .sort((a, b) => new Date(b) - new Date(a)) // Sort by newest first
                    .map((date) => (
                        <div key={date} className="border border-gray-600 bg-gray-700 rounded-lg p-4">
                            <button
                                className="w-full text-left text-lg font-semibold text-white flex justify-between"
                                onClick={() => toggleDate(date)}
                            >
                                <span>{date}</span>
                                <span className="text-gray-400 text-sm">
                                    {groupedByDate[date].length === 1 ? "1 change" : `${groupedByDate[date].length} changes`}
                                </span>
                                <span>{expandedDates[date] ? "▲" : "▼"}</span>
                            </button>

                            {expandedDates[date] && (
                                <div className="mt-3 space-y-3">
                                    {groupedByDate[date].map((section, index) => (
                                        <div
                                            key={`${date}-${section.identifier}-${index}`}
                                            className="p-3 border border-gray-500 rounded bg-gray-600 cursor-pointer hover:bg-gray-500 transition"
                                            onClick={() => fetchSectionContent(section)}
                                        >
                                            <h3 className="text-white font-medium">{section.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AmendmentsCard;

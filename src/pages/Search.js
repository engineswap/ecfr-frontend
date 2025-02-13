import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const classifyMatchType = (result, query) => {
    const normalizedQuery = query.toLowerCase();

    if (result.full_text_excerpt && result.full_text_excerpt.toLowerCase().includes(normalizedQuery)) {
        return "Section Match";
    }

    if (Object.values(result.headings).some(
        (heading) => heading && heading.toLowerCase().includes(normalizedQuery)
    )) {
        return "Structure Match";
    }

    return "Unknown Match";
};

const SearchPage = () => {
    const [results, setResults] = useState(null);
    const [query, setQuery] = useState("");
    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow flex flex-col items-center bg-gray-900 p-6">
                <h1 className="text-white text-2xl mb-4">Search eCFR</h1>
                <div className="w-full max-w-2xl">
                    <SearchBar setResults={setResults} setQuery={setQuery} />
                    <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg max-h-[70vh] overflow-y-auto">
                        {results === null ? (
                            <p className="text-gray-400 text-center">Start typing to search...</p>
                        ) : results.length === 0 ? (
                            <p className="text-gray-400 text-center">No results found.</p>
                        ) : (
                            results.map((result, index) => {
                                const matchType = classifyMatchType(result, query);
                                return (
                                    <div
                                        key={index}
                                        className="mb-4 p-4 bg-gray-700 rounded-lg border border-gray-600 
               hover:bg-gray-600 hover:border-gray-500 transition-all duration-200 
               shadow-md hover:shadow-lg cursor-pointer"
                                        onClick={() => navigate(`/search_result/`, { state: { result } })}
                                    >
                                        {/* Match Type */}
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-bold">Match Type:</span> {matchType}
                                        </p>

                                        {/* Section Title */}
                                        <h2 className="text-white font-semibold text-lg mt-1">
                                            {result.hierarchy_headings.section} -{" "}
                                            <span dangerouslySetInnerHTML={{ __html: result.headings.section }} />
                                        </h2>

                                        {/* Part & Chapter */}
                                        <p className="text-gray-400 text-sm">
                                            {result.hierarchy_headings.part}, {result.hierarchy_headings.chapter}
                                        </p>

                                        {/* Excerpt (Only for Section Match) */}
                                        {matchType === "Section Match" && (
                                            <p className="text-gray-200 mt-2">
                                                <span className="font-bold">Excerpt:</span>{" "}
                                                <span dangerouslySetInnerHTML={{ __html: result.full_text_excerpt }} />
                                            </p>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <div className="h-12 bg-gray-800 w-full flex items-center justify-center">
                <p className="text-white text-sm">© {new Date().getFullYear()} Department of Government Efficiency (DOGE)</p>
            </div>
        </div >
    );
};

export default SearchPage;

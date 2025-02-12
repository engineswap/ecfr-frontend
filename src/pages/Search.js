import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
    const [results, setResults] = useState(null);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow flex flex-col items-center bg-gray-900 p-6">
                <h1 className="text-white text-2xl mb-4">Search eCFR</h1>
                <div className="w-full max-w-2xl">
                    <SearchBar setResults={setResults} />
                    <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg max-h-[70vh] overflow-y-auto">
                        {results ? (
                            <div dangerouslySetInnerHTML={{ __html: results }} />
                        ) : (
                            <p className="text-gray-400 text-center">Start typing to search...</p>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer Bar */}
            <div className="h-12 bg-gray-800 w-full flex items-center justify-center">
                <p className="text-white text-sm">© {new Date().getFullYear()} Department of Government Efficiency (DOGE)</p>
            </div>

        </div>
    );
};

export default SearchPage;

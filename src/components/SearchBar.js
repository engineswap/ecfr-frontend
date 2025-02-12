import React, { useState, useEffect } from "react";
import { fetchSearchResults } from "../api.js";

const SearchBar = ({ setResults }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce logic (500ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer); // Cleanup on unmount/input change
    }, [query]);

    // Fetch results when debouncedQuery updates
    useEffect(() => {
        if (debouncedQuery) {
            fetchSearchResults(debouncedQuery).then(setResults);
        } else {
            setResults(null);
        }
    }, [debouncedQuery, setResults]);

    return (
        <input
            type="text"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white"
            placeholder="Search regulations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
};

export default SearchBar;

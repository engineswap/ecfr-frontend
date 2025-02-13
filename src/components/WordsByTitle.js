import { useState, useEffect } from "react";
import CountUp from "react-countup";

const WordsByTitle = () => {
    const [wordCounts, setWordCounts] = useState([]);

    useEffect(() => {
        fetch("http://0.0.0.0:8000/words_by_title")
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.word_count - a.word_count);
                setWordCounts(sortedData);
            })
            .catch(error => console.error("Error fetching word counts:", error));
    }, []);

    return (
        <div className="w-3/4 mx-auto">
            <h2 className="text-xl font-bold mb-4">Words by Title</h2>
            <div className="mb-6 border-t border-gray-700 w-full"></div>

            <h1 className="text-center p-4 text-2xl font-bold text-sky-400">
                Total words: <CountUp end={wordCounts.reduce((sum, title) => sum + (title.word_count || 0), 0)} separator="," duration={2} />
            </h1>

            <div className="overflow-x-auto max-h-[500px] border rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-black">
                            <th className="p-3 text-left">Title Number</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Word Count</th>
                            <th className="p-3 text-left">Visualization</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wordCounts.map((title, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">{title.number}</td>
                                <td className="p-3">{title.name}</td>
                                <td className="p-3">{title.word_count ? title.word_count.toLocaleString() : "N/A"}</td>
                                <td className="p-3">
                                    <div className="w-full bg-gray-200 rounded h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded"
                                            style={{ width: `${title.word_count ? (title.word_count / wordCounts[0].word_count) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WordsByTitle;

import WordsByTitle from "../components/WordsByTitle";
import ChurnChart from "../components/ChurnChart";
import WordCloudChart from "../components/WordCloudChart";

const Analysis = () => {
    return (
        <div className="p-4 min-h-screen bg-gray-900 text-white space-y-10">
            <WordsByTitle />
            <ChurnChart />
            <WordCloudChart />
        </div>
    );
};

export default Analysis;

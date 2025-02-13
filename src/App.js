import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useEffect } from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import TitleStructure from './pages/TitleStructure';
import Amendments from './pages/Amendments';
import Search from './pages/Search';
import SearchResultPage from './pages/SearchResultPage';

function App() {
    useEffect(() => {
        document.title = "eCFR Analyzer";
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = "https://cdn-icons-png.flaticon.com/512/4252/4252349.png";
        }
    }, []);
    return (
        <Router>
            <div className="bg-gray-900 text-white h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/title/:titleId/:issueDate" element={<TitleStructure />} />
                        <Route path="/amendments/:titleId" element={<Amendments />} />
                        <Route path="/analysis" element={<Analysis />} />
                        <Route path="/search_result" element={<SearchResultPage />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import TitleStructure from './pages/TitleStructure';
import Amendments from './pages/Amendments';
import Search from './pages/Search';
import SearchResultPage from './pages/SearchResultPage';

function App() {
    return (
        <Router>
            <div className="bg-gray-900 text-white h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/title/:titleId/:issueDate" element={<TitleStructure />} />
                        <Route path="/amendments/:titleId" element={<Amendments/>} />
                        <Route path="/analysis" element={<Analysis />} />
                        <Route path="/search_result" element={<SearchResultPage/>} />
                        <Route path="/search" element={<Search/>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

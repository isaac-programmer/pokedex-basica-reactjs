import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";
import HomePageTypes from "./pages/HomePageTypes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:type" element={<HomePageTypes/>}/>
          <Route path="/pokemon/:id" element={<Details/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

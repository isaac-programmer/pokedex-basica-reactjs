import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Details from "./Pages/Details";
import HomePageTypes from "./Pages/HomePageTypes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/pokemon/:id" element={<Details/>}/>
          <Route path="/:type" element={<HomePageTypes/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/pokemon/:id" element={<Details/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

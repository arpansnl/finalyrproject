import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Plant from 'css/Plant';
import Search from 'css/Search';


const App = () => {

  return (
 
      <Router>
           <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/plant/:id" element={<Plant />} />
          </Routes>

      </Router>
  );
};

export default App;

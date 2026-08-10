import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Layout } from "./components/Layout";
import './App.css'
function App() {
  return (
    
      <Routes>
        <Route element={<Layout />} >
            <Route path="/" element={<Home />} />

            <Route path="/news" element={<News />} />
        </Route>
      </Routes>
  
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";


const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/Portfolio" element={<Index />} />
        </Routes>
      </BrowserRouter>
);

export default App;

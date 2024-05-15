import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Hello</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

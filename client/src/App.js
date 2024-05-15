import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(["AuthToken"]);
  const isAuth = Boolean(cookies.AuthToken);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

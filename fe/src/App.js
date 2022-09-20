import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePageTitle, LoginPageTitle, RegisterPageTitle } from "./app/const";
import { AuthRoute, PrivateRoute } from "./components";
import { HomePage, LoginPage, RegisterPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={LoginPageTitle}
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path={RegisterPageTitle}
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path={HomePageTitle}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

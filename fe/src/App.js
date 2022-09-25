import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePageTitle,
  KategoriPageTitle,
  LoginPageTitle,
  RegisterPageTitle,
} from "./app/const";
import { AuthRoute, PrivateRoute } from "./components";
import { HomePage, KategoriPage, LoginPage, RegisterPage } from "./pages";

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
        <Route
          path={KategoriPageTitle}
          element={
            <PrivateRoute>
              <KategoriPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import { routeConfig, getStepComponent, LanguageRoute } from "./routes";
import PageNotFound from "./pages/PageNotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginModal from "./components/LoginModal";
import { authService } from "./services/api/authService";
import theme from "./theme";

function StepRoute() {
  const { step } = useParams();
  const component = getStepComponent(step);

  if (!component) {
    return (
      <LanguageRoute>
        <PageNotFound />
      </LanguageRoute>
    );
  }

  return <LanguageRoute>{component}</LanguageRoute>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        {!isAuthenticated && <LoginModal onLoginSuccess={handleLoginSuccess} />}
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            {routeConfig.map((route, index) => {
              if (route.path === "/:lang/apply/:step") {
                return (
                  <Route key={index} path={route.path} element={<StepRoute />} />
                );
              }
              const RouteComponent = route.Component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LanguageRoute>
                      <RouteComponent />
                    </LanguageRoute>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import NavigationBar from "./components/NavigationBar";
import { routeConfig, getStepComponent, LanguageRoute } from "./routes";
import PageNotFound from "./pages/PageNotFound";
import ErrorBoundary from "./components/ErrorBoundary";

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
  return (
    <ErrorBoundary>
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
  );
}

export default App;

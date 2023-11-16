import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./router/routes";

function App() {
  let element = useRoutes(routes);

  return <div className="App">{element}</div>;
}

export default App;

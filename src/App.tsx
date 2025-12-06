import {useRoutes} from "react-router-dom";
import {routesOutlets} from "./router";

export default function App() {
  const router = useRoutes(routesOutlets);
  const RenderComponent = () => {
    return router;
  };
  return <RenderComponent />;
}

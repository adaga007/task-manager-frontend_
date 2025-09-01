import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteChangeHandler() {
  const location = useLocation();

  useEffect(() => {
    console.log("Route changed:", location.pathname);

    if (location.pathname === "/") {
      document.title = "Home | tm-demo";
    } else if (location.pathname === "/login") {
      document.title = "Login | tm-demo";
    } else if (location.pathname === "/register") {
      document.title = "Register | tm-demo";
    } else if (location.pathname === "/add") {
      document.title = "Create a task | tm-demo";
    } else if (location.pathname === "/dashboard") {
      document.title = "Dashboard | tm-demo";
    } else if (/^\/dashboard\/[^/]+\/edit$/.test(location.pathname)) {
      document.title = "Update a task | tm-demo";
    } else {
      document.title = "tm-demo";
    }
  }, [location]);

  return null;
}

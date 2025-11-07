import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function BigLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default BigLayout;

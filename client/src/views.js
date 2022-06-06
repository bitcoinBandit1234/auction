import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./component/AccountContext.jsx";
import SignUp from "./pages/login page/signup_page.js";
import PrivateRoutes from "./component/PrivateRoutes.jsx";
import AuctionAdd from "./pages/Add auction page/auctionAdd.jsx";
import Home_page from "./pages/Home page/home_page.jsx";
import Spinner from "./helpers/spinner.js";
import CardDisplay from "./pages/product Page/CardDesign.jsx"
import ProductDetail from "./pages/product Page/cardDetail.jsx";
import SidebarRoutes from "./SidebarRoutes.js"


const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Spinner/>
  ) : (
      <Routes>

        <Route path="/signup" element={<SignUp/>} />

        <Route path="/" element={<Home_page/>} />

        <Route path="/product" element={<CardDisplay/>} />

        <Route path="/productDetail/:id" element={<ProductDetail/>} />

        <Route path="/profile/*" element={<SidebarRoutes/>} />

        <Route element={<PrivateRoutes />}>

          <Route path="/addAuction" element={<AuctionAdd/>} />

        </Route>
        
      </Routes>
  );
};

export default Views;
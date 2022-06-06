import { Route, Routes } from "react-router-dom";
import React from "react";
import Sidebar from "./component/dashSidebar/dashSidebar";
import ProfilePayment from "./pages/profilePayment";
import ParticipatedBid from "./pages/participatedBid";
import MyAuction from "./pages/myAuction";

function SidebarRoutes(){

    return(
            <Sidebar>

                <Routes>

                    <Route path="/profile/payment" element={<ProfilePayment/>} />

                    <Route path="/profile/myAuction" element={<ParticipatedBid/>} />

                    <Route path="/profile/participatedAuction" element={<MyAuction/>} />

                </Routes>

            </Sidebar>
    );
}

export default SidebarRoutes;

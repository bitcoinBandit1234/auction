import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuctionAdd from "./pages/Add auction page/auctionAdd.jsx"
import Home_page from "./pages/Home page/home_page.jsx"

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById("root")
);

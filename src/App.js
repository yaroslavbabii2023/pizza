import "./scss/app.scss"
import React from "react";

import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart"

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="cart" element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;

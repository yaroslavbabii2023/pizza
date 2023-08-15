import "./scss/app.scss"
import React from "react";

import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart"


function App() {
    const [searchValue, setSearchValue] = React.useState('')

    console.log(searchValue)
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="cart" element={<Cart/>}/>
                    </Routes>

                </div>
            </div>
        </div>
    );
}

export default App;

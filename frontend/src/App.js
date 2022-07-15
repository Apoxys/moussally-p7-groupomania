import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConnectedUserId } from "./components/AppContext";

import Actu from "./pages/Actu";
import CreatePost from "./pages/CreatePost";
import LikedPosts from "./pages/LikedPosts";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import ThisPost from "./pages/ThisPost";
import YourPosts from "./pages/YourPosts";


const App = () => {
    // localStorage INIT (asyncStorage version community)
    const storageAccess = localStorage
    // Retrieve data from storage logic
    const getDataFromStorage = () => {
        const dataInStorage = storageAccess.getItem
        if (!dataInStorage) {
            return {}
        } else {
            return JSON.parse(dataInStorage)
        };
    }


    // declare if currentUser is connected
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Actu />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/publish" element={<CreatePost />} />
                <Route path={"/post"} element={<ThisPost />} />
                {/* <Route path={"/post/:" + post._id} element={<ThisPost />} /> */}
                <Route path={"/myposts"} element={<YourPosts />} />
                {/* <Route path={"/myposts/" + userId} element={<YourPosts />} /> */}
                <Route path={"/favorites"} element={<LikedPosts />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>


    )
};

export default App;
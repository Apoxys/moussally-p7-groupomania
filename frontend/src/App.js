import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/UserContext";

import Actu from "./pages/Actu";
import CreatePost from "./pages/CreatePost";
import LikedPosts from "./pages/LikedPosts";
import Login from "./pages/Login";
import ModifyPost from "./pages/ModifyPost";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import ThisPost from "./pages/ThisPost";
import YourPosts from "./pages/YourPosts";


const App = () => {

    const [currentUser, setCurrentUser] = useState("")

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
        <DataProvider value={{ currentUser, setCurrentUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Actu />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/publish" element={<CreatePost />} />
                    <Route path={"/post/:id"} element={<ThisPost />} />
                    <Route path="/post-modify/:id" element={<ModifyPost />} />
                    <Route path={"/myposts"} element={<YourPosts />} />
                    {/* <Route path={"/myposts/" + userId} element={<YourPosts />} /> */}
                    <Route path={"/favorites"} element={<LikedPosts />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </DataProvider >

    )
};

export default App;
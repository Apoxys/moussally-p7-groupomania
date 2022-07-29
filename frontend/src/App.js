import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider, DataProvider, TokenProvider } from "./context/UserContext";


import Actu from "./pages/Actu";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import LikedPosts from "./pages/LikedPosts";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import ThisPost from "./pages/ThisPost";
import YourPosts from "./pages/YourPosts";


const App = () => {

    const [currentUser, setCurrentUser] = useState("")
    const [userToken, setUserToken] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    // declare if currentUser is connected
    return (
        <DataProvider value={{ currentUser, setCurrentUser }}>
            <TokenProvider value={{ userToken, setUserToken }}>
                <AdminProvider value={{ isAdmin, setIsAdmin }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Actu />} />

                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            <Route path="/publish" element={<CreatePost />} />
                            <Route path={"/post/:id"} element={<ThisPost />} />
                            <Route path={"/edit-post/:id"} element={<EditPost post />} />
                            <Route path={"/myposts/:id" + currentUser} element={<YourPosts />} />
                            {/* <Route path={"/favorites/:id" + currentUser} element={<LikedPosts />} /> */}

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </AdminProvider>
            </TokenProvider>
        </DataProvider >

    )
};

export default App;
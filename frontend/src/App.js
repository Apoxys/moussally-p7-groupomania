import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Actu from "./pages/Actu";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import ThisPost from "./pages/ThisPost";
import YourPosts from "./pages/YourPosts";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Actu />} />
                <Route path="/publish" element={<CreatePost />} />
                <Route path={"/post"} element={<ThisPost />} />
                {/* <Route path={"/post/:" + post._id} element={<ThisPost />} /> */}
                <Route path={"/myposts"} element={<YourPosts />} />
                {/* <Route path={"/myposts/" + userId} element={<YourPosts />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;
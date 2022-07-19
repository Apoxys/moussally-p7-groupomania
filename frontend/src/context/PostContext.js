import { createContext, useState } from "react";

export const postContext = createContext({});

export const PostDataProvider = ({ children }) => {

    const [currentPost, setCurrentPost] = useState("")

    return (
        <postContext.Provider value={{ currentPost, setCurrentPost }}>
            {children}
        </postContext.Provider>

    )
};
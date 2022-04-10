import { useState, useRef } from "react";
import { getCookie } from "../../assets/functions/GetCookie";

type AppProps = {
    setUpdateTrigger: any;
    userInfo:any;
};

const CreatePost = ({setUpdateTrigger, userInfo}:AppProps) => {
    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [res, setRes] = useState<string | boolean>(false);

    const refInputTitle = useRef<HTMLInputElement>(null);
    const refInputContent = useRef<HTMLTextAreaElement>(null);

    const sendPost = (e: any) => {
        e.preventDefault();
        if (title === null || content === null) return setRes("Please fill all fields");
        if (title.length < 3 || content.length < 3) return setRes("Title and content must be at least 3 characters long");
        if (title.replace(/\s/g, "") === "" || content.replace(/\s/g, "") === "") return setRes("Title and content must not be only spaces");

        const token = getCookie("loggerz-token");

        if(token === null || token === undefined || token === "undefined") return setRes("You must be logged in to create a post");

        fetch("http://localhost:2345/postHandler.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, content: content, author_uid: token})
        })
        .then(res => res.json())
        .catch(error => {console.error("Error:", error); setRes("Error: " + error)})
        .then(data => {
            console.log(data);
            if(data.status != "success") return setRes(data.message);
            setUpdateTrigger(Date.now().toString());
            refInputContent.current!.value = "";
            refInputTitle.current!.value = "";
            setTitle(null);
            setContent(null);
            setRes("Post created successfully!");
        });

    };

    return ( 
    <div className="py-2 px-2 m-auto text-white text-xl w-2/4 flex flex-col items-center">
        {userInfo &&  <p className="text-white h-3 text-base  my-3"> {userInfo.username}</p>}
        <input type={'text'} className="outline-none bg-transparent placeholder:text-gray-500 text-gray-500 border-2 border-gray-500 rounded my-2 mx-auto p-2 min-w-full" placeholder="Titre" ref={refInputTitle} onChange={(e) => setTitle(e.target.value)}  />
        <textarea  className="outline-none bg-transparent placeholder:text-gray-500 text-gray-500 border-2 border-gray-500 rounded my-2 mx-auto p-2 min-w-full" placeholder="Article" ref={refInputContent} onChange={(e) => setContent(e.target.value)} />
        <div onClick={(e)=>sendPost(e)} className={`w-1/2% m-auto bg-indigo-600 text-lg rounded my-2 text-gray-400 py-2 text-center ${(title && content)? "hover:bg-indigo-400   cursor-pointer" : "cursor-not-allowed"}`}>Ajouter</div>
        {res && <p className="text-gray-600 h-3 text-lg my-3">{res}</p>}
    </div>)
}

export default CreatePost;
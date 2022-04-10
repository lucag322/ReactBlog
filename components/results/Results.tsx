import { useState } from "react";

import { UserType } from "../../assets/helpers/Users";
import CreatePost from "../forms/CreatePost";
import Header from "../Header";
import PostContainer from "../posts/PostContainer";

type AppProps = {
    setDisplayLogged: any;
    userInfo: UserType;
  };

const Results = ({setDisplayLogged, userInfo}: AppProps) =>{

    const [updateTrigger, setUpdateTrigger] = useState(null)

    const disconnect = () => {
        document.cookie = `loggerz-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setDisplayLogged(false);
    }

    return <div className="lg:w-11/12 w-11/12 m-auto rounded-lg overflow-hidden lg:max-h-vp11/12">
                <div className="py-3 px-4 flex">
                    <div className=" bg-red-500 mr-2 hover:cursor-pointer" onClick={()=> disconnect()}>Deconnexion</div>
                </div>
                <Header />
                <div className="container mx-auto">
                    <div className='grid grid-cols-2 gap-6  mb-2'>
                        <CreatePost setUpdateTrigger={setUpdateTrigger} userInfo={userInfo} />
                        <PostContainer updateTrigger={updateTrigger} />
                    </div>
                </div>
            </div>
}

export default Results;
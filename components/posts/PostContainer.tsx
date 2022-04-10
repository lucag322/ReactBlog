import {useState, useEffect} from 'react';

import Post from "./Post";
import { PostType } from '../../assets/helpers/Post';

type AppProps = {
    updateTrigger?:any;
}

const PostContainer = ({updateTrigger}: AppProps) => {
    const [data, setData] = useState< [PostType] | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true
        const intervalId = setInterval(() => {  //assign interval to a variaable to clear it

        setData(data);
        setError(false);
        setLoading(true);

        fetch("http://localhost:2345/postHandler.php?action=getAllPosts",{
            method: "GET",
        })
           .then(data => data.json())
          .then(newData => {
            if(!isMounted) return  // This will cancel the setState when unmounted
            if(newData.status === "nopost") return setError(true);
            setData(newData);
            setError(false);
            setLoading(false);
          })
          .catch(function(error) {
             console.log(error)
            setData(null);
            setError(true);
            setLoading(false);
          })
        }, 1000)
     
        return () => {
            clearInterval(intervalId); //This is important
            isMounted = false // Let's us know the component is no longer mounted.
        }
     
     }, [data, error, loading, updateTrigger]);

    return <div className="w-2/8 overflow-y-scroll flex flex-col m-auto align-center scrollbar scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-700">
        {data && data.map((post:PostType) => <Post key={post.id} post={post} />)}
        {(!data && !error) && <p className='text-center'>Chargement</p>}
        {error && <p className='text-center'>Soit le premier a ecrire un article !</p>}
    </div>
}

export default PostContainer;
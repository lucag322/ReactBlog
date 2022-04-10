import { PostType } from "../../assets/helpers/Post";

type AppProps = {
    post: PostType,
};

const Post = ({post}: AppProps) => {
    return (
        <div className="border-2 border-gray-500 rounded p-2 my-2 mx-5">
            <div className="flex justify-start">
                <h3 className="mr-1">{post.title} :</h3>
                <p className="mr-1">ecris par </p>
                <p className="mr-1">{post.author}</p>
                <p className="mr-1">le</p>
                <p className="italic">{post.created_at}</p>
            </div>
            <p>{post.content}</p>
        </div>
    );
}

export default Post;
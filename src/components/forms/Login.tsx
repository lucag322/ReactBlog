import { useState } from 'react'

import Header from '../Header';
import PostContainer from '../posts/PostContainer';

type AppProps = {
    displayLogged: boolean;
    setDisplayLogged: any;
};

const Login = ({displayLogged,setDisplayLogged} : AppProps) => {

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [retypePassword, setRetypePassword] = useState<string | null>(null);
    const [loginType, setLoginType] = useState<string>("register");
    const [error, setError] = useState<string | null>(null);

    const submitted = (e:any) => {
        e.preventDefault();
        if(username === null || password === null) return;
        if(loginType === "login") {
            console.log("login");
            fetch("http://localhost:2345/login.php", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: btoa(password) })
            })
            .then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(data => {
                console.log(data);
                if (data.status === "fail") {
                    if(data.error === "User not found") setError("User not found");
                    if(data.error === "Wrong password") setError("Wrong password");
                    return;
                }

                console.log("success");
                document.cookie = `loggerz-token=${data.uid}; path=/;`;
                setDisplayLogged(true);
            });
        } else {
            if (retypePassword === null) return setError("Please fill all fields");
            if (password !== retypePassword) return setError("Passwords do not match");
            
            fetch("http://localhost:2345/register.php", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: btoa(password) })
            })
            .then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(data => {
                if (data.status === "fail") {
                    if(data.error === "User already exists") {
                        setError("User already exists");
                    }
                    return;
                }
                document.cookie = `loggerz-token=${data.token}; path=/`;
                setDisplayLogged(true);
            });
        }
    }

    const changeLoginType = (e:any, type:string) => {
        e.preventDefault();
        setUsername(null);
        setPassword(null);
        setRetypePassword(null);
        setLoginType(type);
    }

    return (
    <div className="lg:w-11/12 w-11/12 m-auto rounded-lg overflow-hidden">
        <Header />
        <div className='m-auto text-gray-500 text-xl flex flex-col lg:flex-row lg:justify-between lg:w-11/12 lg:max-h-vp11/12'>
            <div className="py-4 px-4 m-auto text-white text-xl w-1/2 flex flex-col items-center">
                <input type={'text'} className="outline-none bg-transparent placeholder:text-gray-500 text-gray-500 border-2 border-gray-500 rounded my-2 mx-auto p-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)}  />
                <input type={'text'} className="outline-none bg-transparent placeholder:text-gray-500 text-gray-500 border-2 border-gray-500 rounded my-2 mx-auto p-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                {loginType === "register" && <input type={'text'} className="outline-none bg-transparent placeholder:text-gray-500 text-gray-500 border-2 border-gray-500 rounded my-2 mx-auto p-2" placeholder="Retype password" onChange={(e) => setRetypePassword(e.target.value)} /> }
                {error !== null && <div className="text-red-500 text-sm">{error}</div>}
                <div onClick={(e)=>submitted(e)} className={`w-1/2% m-auto bg-indigo-600 text-lg rounded my-2 text-gray-400 py-2 text-center ${((loginType==="login" && username && password) || (loginType==="register" && username && (password && setRetypePassword))) ? "hover:bg-indigo-400 cursor-pointer" : "cursor-not-allowed"}`}>{loginType === "login" ? 'Sign In' : 'Sign Up'}</div>
                {loginType === "login" ? <div onClick={(e)=> changeLoginType(e, "register")} className="text-gray-500 h-3 text-base italic mb-3 hover:text-gray-400 hover:underline cursor-pointer">Register</div> : <div onClick={(e)=> changeLoginType(e, "login")} className="text-gray-500 h-3 text-base italic mb-3 hover:text-gray-400 hover:underline cursor-pointer">J'ai deja un compte</div>}
            </div>
            <PostContainer />
        </div>
    </div>) 
}

export default Login;
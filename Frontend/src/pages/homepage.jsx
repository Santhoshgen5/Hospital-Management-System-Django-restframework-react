import Navbar from "../component/navbar";
import VideoPlayer from "../component/videocomponent";
import Login from "./login";
import { useRef } from 'react';
import { useState } from "react";
import Register from "./register";

export default function HomePage() {
    const [Login_or_register, setLogin_or_register] = useState('login')
    const loginRef = useRef(null);

    const scrollToLogin = () => {
        if (loginRef.current) {
            loginRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Navbar scrollToLogin={scrollToLogin} />
            <VideoPlayer scrollToLogin={scrollToLogin} />
            {Login_or_register=='login' && (
                <Login ref={loginRef} loginview={setLogin_or_register} />
            )}
            {Login_or_register=='register' && (
                <Register ref={loginRef} loginview={setLogin_or_register} />
            )}
            
        </div>
    );
}

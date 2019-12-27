import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Todo List Manager</h1>
            <p>Your number one site to get your shit together.</p>
            <Link 
                to="/signup"
            >
                Sign up
            </Link>
            <br></br>
            <Link
                to="/login"
            >
                Log in
            </Link>
        </div>
    );
};

export default Home;
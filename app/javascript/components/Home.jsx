import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container-fluid text-center">
            <h1>Todo List Manager</h1>
            <h3>Your number one site to get your shit together.</h3>
            <br></br>
            <button className="btn btn-success btn-home">
                <Link to="/signup">
                    Sign up
                </Link>
            </button>
            <br></br>
            <br></br>
            <button className="btn btn-success btn-home">
                <Link to="/login">
                    Log in
                </Link>
            </button>
        </div>
    );
};

export default Home;
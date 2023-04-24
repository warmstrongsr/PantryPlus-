import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import AlertMessage from "./components/AlertMessage";
import Navbar from "./components/Navbar";
import Create from "./views/CreatePost";
import UserData from "./components/UserData";
import EditRecipe from "./views/EditRecipe";
import Favorites from "./views/Favorites";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);
	const [message, setMessage] = useState(null);
	const [category, setCategory] = useState(null);
	const [user, setUser] = useState({});

	    useEffect(() => {
        if (loggedIn){
            async function fetchLoggedInUser(){
                let myHeaders = new Headers();
                const token = localStorage.getItem('token');
                myHeaders.append('Authorization', `Bearer ${token}`);
                let response = await fetch('http://localhost:5000', {
                    headers: myHeaders
                });
                let data = await response.json();
                if (data.error){
                    console.warn(data.error)
                } else {
                    setUser(data)
                }
            };
            fetchLoggedInUser();
        }
    }, [loggedIn])

    function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    };

    function logUserIn(){
        setLoggedIn(true)
    };

    function logUserOut(){
        setLoggedIn(false);
        setUser({})
        localStorage.removeItem('token');
        // localStorage.removeItem('tokenExp');
        flashMessage('You have logged out', 'success')
    };


    return (
        <>
            <Navbar loggedIn={loggedIn} logUserOut={logUserOut} />
            <div className="container">
                { message ? <AlertMessage flashMessage={flashMessage} message={message} category={category} /> : null}
                <Routes >
                    <Route path='/' element={<Home user={user} loggedIn={loggedIn} />} />
                    <Route path='/signup' element={<Signup flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} />
                    <Route path='/me' element={<UserData flashMessage={flashMessage} loggedIn={loggedIn}/>} />
                    <Route path='/create' element={<Create flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/edit/:recipeId' element={<EditRecipe flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/favorites' element={<Favorites flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/list/' element={<EditRecipe flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/delete/' element={<EditRecipe flashMessage={flashMessage} loggedIn={loggedIn} />} />
                </Routes>
            </div>
        </>
    )
}

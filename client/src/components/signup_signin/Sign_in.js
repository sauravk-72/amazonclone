import React, { useContext } from 'react'
import "./signup.css";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';


const Sign_in = () => {

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });
    console.log(logdata);

    const { account, setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch("https://amazonclonebackbysk.onrender.com/login", {
            method: "POST",
           
            headers: {
               
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
           
            
        });


       // const data = await res.json();
        //console.log(data);
        const json = await res.json();
        console.log(json)

        if(res.status == 400 || !json){
            console.log("invalid details");
            toast.warn("invalid details",{
                position: "top-center",
            })
        }else{
            console.log("data valid");
            
            
             //Changes
             localStorage.setItem('token', json.authtoken);
             setAccount(json)
            toast.success("user valid",{
                position: "top-center",
            })
            setData({...logdata,email:"",password:""});
           
        }
    }


    return (

        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="amazonlogo" />
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                onChange={adddata}
                                value={logdata.email}
                                name="email" id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                onChange={adddata}
                                value={logdata.password}
                                name="password" placeholder='At least 6 char' id="password" />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New To Amzon</p>
                    <NavLink to="/register">  <button>Create Your amazon account</button></NavLink>
                </div>
            </div>
            <ToastContainer />
        </section>



    )
}

export default Sign_in

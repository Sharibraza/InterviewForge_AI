import React from 'react'
import { useState } from 'react'
import { Link } from "react-router"
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

export default function Login() {

    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email,password);
        navigate("/")
    }

    if (loading) {
        return ( <main><h1>Loading.....</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email : </label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id='email' placeholder='Enter your email address : ' name='email' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password : </label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id='password' placeholder='Enter your password : ' name='password' />
                    </div>

                    <button className='button primary-button'>Login</button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

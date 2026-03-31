// import React from 'react'
// import { useState } from 'react'
// import { Link } from "react-router"
// import "../auth.form.scss"
// import { useAuth } from '../hooks/useAuth'
// import { useNavigate } from 'react-router'
// import Loading from '../../../components/Loading'

// export default function Login() {

//     const { loading, handleLogin } = useAuth();
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await handleLogin({ email, password });
//         navigate("/")
//     }

//     if (loading) {
//         return (
//           <main><Loading /></main>
//         )
//       }

//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Login</h1>

//                 <form onSubmit={handleSubmit}>

//                     <div className="input-group">
//                         <label htmlFor="email">Email : </label>
//                         <input
//                             onChange={(e) => { setEmail(e.target.value) }}
//                             type="email" id='email' placeholder='Enter your email address : ' name='email' />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="password">Password : </label>
//                         <input
//                             onChange={(e) => { setPassword(e.target.value) }}
//                             type="password" id='password' placeholder='Enter your password : ' name='password' />
//                     </div>

//                     <button className='button primary-button'>Login</button>
//                 </form>

//                 <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
//             </div>
//         </main>
//     )
// }



import React from 'react'
import { useState } from 'react'
import { Link } from "react-router"
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'

export default function Login() {

    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password });
        navigate("/")
    }

    if (loading) {
        return (
          <main><Loading /></main>
        )
    }

    return (
        <>
        <Navbar/>
        <main className="auth-main">
            <div className="auth-container">
                {/* Left Side - Login Form */}
                <div className="auth-left">
                    <div className="form-wrapper">
                        <h1 className="auth-title">Login</h1>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    id='email'
                                    placeholder='Enter your email address'
                                    name='email'
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">PASSWORD</label>
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    id='password'
                                    placeholder='Enter your password'
                                    name='password'
                                    required
                                />
                            </div>

                            <div className="form-footer">
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        id='remember'
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                                {/* <Link to="/" className="forgot-password">Forgot Password</Link> */}
                            </div>

                            <button type="submit" className='button primary-button auth-button'>Sign In</button>
                        </form>
                    </div>
                </div>

                {/* Right Side - Welcome Section */}
                <div className="auth-right">
                    <div className="welcome-section">
                        <h2>Welcome to login</h2>
                        <p>Don't have an account?</p>
                        <Link to="/register" className="signup-button">Sign Up</Link>
                    </div>
                </div>
            </div>
        </main>
         </>
    )
}
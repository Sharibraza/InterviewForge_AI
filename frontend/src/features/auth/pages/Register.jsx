// import React from 'react'
// import { useState } from 'react';
// import { Link, useNavigate } from "react-router"
// import { useAuth } from '../hooks/useAuth';
// import Loading from '../../../components/Loading';

// export default function Register() {

//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { loading, handleRegister } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleRegister(username, email, password);
//     navigate("/");
//   }

//   if (loading) {
//       return (
//         <main><Loading /></main>
//       )
//     }


//   return (
//     <main>
//       <div className="form-container">
//         <h1>Register</h1>

//         <form onSubmit={handleSubmit}>

//           <div className="input-group">
//             <label htmlFor="email">Username : </label>
//             <input
//               onChange={(e) => { setUsername(e.target.value) }}
//               type="text" id='username' placeholder='Enter your Username : ' name='username' />
//           </div>

//           <div className="input-group">
//             <label htmlFor="email">Email : </label>
//             <input
//               onChange={(e) => { setEmail(e.target.value) }}
//               type="email" id='email' placeholder='Enter your email address : ' name='email' />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password : </label>
//             <input
//               onChange={(e) => { setPassword(e.target.value) }}
//               type="password" id='password' placeholder='Enter your password : ' name='password' />
//           </div>

//           <button className='button primary-button'>Register</button>
//         </form>

//         <p>Already have an account? <Link to={"/login"}>Login</Link></p>
//       </div>
//     </main>
//   )
// }


import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router"
import { useAuth } from '../hooks/useAuth';
import Loading from '../../../components/Loading';
import "../auth.form.scss"
import Navbar from '../../../components/Navbar';

export default function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
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
        {/* Left Side - Register Form */}
        <div className="auth-left">
          <div className="form-wrapper">
            <h1 className="auth-title">Sign Up</h1>

            <form onSubmit={handleSubmit} className="auth-form">

              <div className="input-group">
                <label htmlFor="username">USERNAME</label>
                <input
                  onChange={(e) => { setUsername(e.target.value) }}
                  type="text"
                  id='username'
                  placeholder='Enter your username'
                  name='username'
                  required
                />
              </div>

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

              <button type="submit" className='button primary-button auth-button'>Sign Up</button>
            </form>
          </div>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="auth-right">
          <div className="welcome-section">
            <h2>Join InterviewForge</h2>
            <p>Already have an account?</p>
            <Link to="/login" className="signup-button">Login</Link>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
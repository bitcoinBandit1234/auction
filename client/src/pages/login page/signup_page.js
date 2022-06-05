import img1 from './backImg.jpg';
import img2 from './frontImg.jpg';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import { AccountContext } from "../../component/AccountContext";
import validate from '../../helpers/validation';

import './style.css'
function SignUp() {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const [usernameReg, setUsername] = useState('');
  const [passwordReg, setPassword] = useState('');
  const [emailReg, setEmail] = useState('');

  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupError, setSignupError] = useState();
  const [loginError, setLoginError] = useState();

  const register = async () => {

    if(validate(usernameReg.trim(), passwordReg.trim(), emailReg.trim(), setSignupError)){

      try{
        const response = await axios.post('http://localhost:3301/auth/register',
          {
            username: usernameReg.trim(),
            password: passwordReg.trim(),
            email: emailReg.trim()
          },{ withCredentials: true });
    
          if (response.data.error || response.status >= 400) {
            console.log("error1")
           setSignupError(response.data.error);
          }
          else if(response.data.loggedIn) {
            setUser({...response.data});
            navigate("/");
          }
        }catch(error){
          console.log("error2")
          setSignupError(error.response.data.error);
        }
    }
  }

  const login = async () => {
    try{
    const response = await axios.post('http://localhost:3301/auth/login',
      {
        username: loginUser.trim(),
        password: loginPassword.trim()
      },{ withCredentials: true });

        if (response.data.error) {
          setLoginError(response.data.error);
        }
        else if(response.data.loggedIn) {
          setUser({...response.data});
          navigate("/");
        }
      }catch(error){
        setLoginError(error.response.data.error);
      }
  };
  
  
  return (
    <div className="full-signup-container">
      <div className="container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src={img1} alt="" />
            <div className="text">
              <span className="text-1">Every new friend is a <br /> new adventure</span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src={img2} alt="" />
            <div className="text">
              <span className="text-1">Complete miles of journey <br /> with one step</span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="text" autoComplete='off' onChange={(e) => { setLoginUser(e.target.value); }}
                      placeholder="Enter your username"/>
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" autoComplete='off' onChange={(e) => { setLoginPassword(e.target.value); }} placeholder="Enter your password" />
                  </div>
                  <span className='error'>{signupError}</span>
                  <div className="text"><a href="#">Forgot password?</a></div>
                      <span className='error'>{loginError}</span>
                  <div className="button input-box">
                    <input onClick={login} type="button" value="Sumbit" />
                  </div>
                  <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Sigup now</label></div>
                </div>
                <p></p>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input type="text"
                      onChange={(e) => { setUsername(e.target.value); }}
                      placeholder="Enter your name"  />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="email"
                      onChange={(e) => { setEmail(e.target.value); }}
                      placeholder="Enter your email"  />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password"
                      onChange={(e) => { setPassword(e.target.value); }}
                      placeholder="Enter your password"  />
                  </div>
                  <span className='error'>{signupError}</span>
                  <div className="button input-box">
                    <input onClick={register} type="button" value="Sumbit" />
                  </div>
                  <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
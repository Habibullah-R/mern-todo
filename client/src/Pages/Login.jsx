import React, { useState , useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure
} from '../redux/user/userSlice.js'
import '../App.css'

const Login = () => {
  const [ email , setEmail] = useState('');
  const [ password , setPassword ] = useState('');
  const [showPass , setShowPass ] = useState(false)
  const { error , loading } = useSelector((state)=>state.user.user) 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart())
      const response = await fetch("/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
        setTimeout(() => {
          dispatch(signInFailure(null))
        }, 3000);
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')

    } catch (error) {
      dispatch(signInFailure(error.message))
      setTimeout(() => {
        dispatch(signInFailure(null))
      }, 3000);
    }
  }
  
  const showPassword = ()=>{
    const pass = document.getElementById('last');
    if(pass.type === 'text'){
      pass.type = 'password'
    }
    else{
      pass.type = 'text'
    }
    setShowPass(!showPass)
  }


  return (
    <>
    <main>      
    <div className="login-box">
  <h2 className='text-2xl font-bold tracking-[1px]'>Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input 
      type="text" 
      required
      value={email}
      onChange={(ev)=>setEmail(ev.target.value)}
      className='lowercase'
      />
      <label>Email</label>
    </div>
    <div className="user-box">
      <input 
      type="password" 
      name="" 
      required
      value={password}
      onChange={(ev)=>{setPassword(ev.target.value)}}
      id="last"
      />
      <label>Password</label>
      {
        showPass ? 
        <i onClick={showPassword} className="fa-regular fa-eye fa-lg text-white absolute right-2 bottom-8 cursor-pointer"></i>
    
        :
        <i onClick={showPassword} className="fa-regular fa-eye-slash fa-lg text-white absolute right-2 bottom-8 cursor-pointer"></i>
    
      }
    </div>
    <p className='text-[#ff0000] h-7 text-sm'>{error}</p>
    <button className='btn-1'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {loading ? "Loading..." : "Log in"}
    </button>
  </form>
</div>
  <p className='para'>Don't have an account <Link to="/register">Register Now</Link>. </p>
  </main>
</>

  )
}

export default Login

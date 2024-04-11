import React,{useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import '../App.css'
import {
  signUpStart,
  signUpSuccess,
  signUpFailure
} from '../redux/user/userSlice'

const Register = () => {
  const [username , setUsername] = useState('');
  const [ email , setEmail ] = useState('');
  const [  password, setPassword ] = useState('');
  const [showPass , setShowPass ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error , loading } = useSelector((state)=>state.user.user) 



  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(signUpStart())
      const res = await fetch('/api/auth/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        email,
        password
      })
    })
    const data = await res.json();
    if(data.success === false){
      dispatch(signUpFailure(data.message))
      setTimeout(() => {
        dispatch(signUpFailure(null))
      }, 3000);
      return;
    }
    dispatch(signUpSuccess())
    alert("User created successfully.")
    navigate('/login')
    } catch (error) {
      dispatch(signUpFailure(error.message))
      setTimeout(() => {
        dispatch(signUpFailure(null))
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
  <h2 className='text-2xl font-bold tracking-[1px]'>Register</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input 
      type="text" 
      name="" 
      required
      value={username}
      onChange={(ev)=>setUsername(ev.target.value)}
      />
      <label>Username</label>
    </div>
    <div className="user-box">
      <input 
      type="email" 
      name="" 
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
      id='last'
      value={password}
      onChange={(ev)=>setPassword(ev.target.value)}
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
    <button className='btn-1' >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {loading ? 'Loading...': 'Register'}
    </button>
  </form>
</div>
  <p className='para'>Already have an account <Link to="/login">Log In</Link>. </p>
  </main>
</>
  )
}

export default Register

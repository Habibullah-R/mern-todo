import React,{useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import './HeaderStyle.css'
import Modal from './Modal'
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure 
} from '../redux/user/userSlice'

const Header = () => {
  const { currentUser ,error } = useSelector((state)=>state.user.user) 
  const navigate = useNavigate();
  const [signOutModal, setsignOutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [ toggleMenu , setToggleMenu ] = useState(false);
  const dispatch = useDispatch();

  const data_from_child = (data) => {
    setsignOutModal(data);
    setDeleteModal(data)
}


  const handleSignOut = async()=>{
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout',{method:'GET'})
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
      setsignOutModal(false)
      navigate('/login')
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  const handleDelete = async()=>{
    try {
      dispatch(deleteStart())
      const res = await fetch(`/api/user/deleteAcc/${currentUser._id}`,{method:'DELETE'})
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteFailure(data.message))
        return;
      }
      dispatch(deleteSuccess(data))
      setDeleteModal(false)
      navigate('/login')
    } catch (error) {
      dispatch(deleteFailure(error.message))
    }
  }

  return (
    <>
      <header>
            <h2 className='uppercase text-2xl font-bold max-md:ml-5 ml-10  select-none'>{ currentUser ? currentUser.username : ""}</h2>
            <i  
            className="fa-solid fa-bars max-md:block hidden fa-xl text-white max-md:mr-5 mr-10 cursor-pointer"
            onClick={()=>setToggleMenu(!toggleMenu)}
            ></i>
        <div className={toggleMenu ? "header-btns header-show" : "header-btns" }>
        <button className="btn-1 btn-2"  onClick={()=>setsignOutModal(true)}>
              Sign Out</button>
            <button className="btn-1 btn-3"  onClick={()=>setDeleteModal(true)}>
              Delete Account</button>
        </div>
      </header>

      {signOutModal ? <Modal showModal={signOutModal} btn1={'Yes'} btn2={'No'} handleFunction={handleSignOut} message={'Are you really want to sign out?'} setter={data_from_child}/> : null}
      {deleteModal ? <Modal showModal={deleteModal} btn1={'Yes'} btn2={'No'} handleFunction={handleDelete} message={'Are you really want to delete account?'} setter={data_from_child}/> : null}


    </>
  )
}

export default Header

import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookie from 'js-cookie'
import Header from '../components/Header'
import Todos from '../components/TodoList'

const Home = () => {
  const navigate = useNavigate();
  const [todo,setTodo] = useState('');
  const [check,setCheck] = useState(false)
  const [todoAdded , setTodoAdded] = useState(false)
  const { currentUser } = useSelector(state=>state.user.user)
  const [ loading , setLoading ] = useState(false)


  useEffect(() => {
    const verifyCookie = async () => {
      const myCookie = Cookie.get('authentic_Token')
      if (!myCookie) {
        navigate("/login");
      }
    };
    verifyCookie();
  }, []);


  const handleTodoSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/todo/add',{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          todo,
          check,
          userRef : currentUser._id
        })
      })
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        setLoading(false)
        return;
      }
      setTodo('')
      setLoading(false)
      setTodoAdded(!todoAdded)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }



  return (
    <>    
    <Header/>
    <div className='text-white max-w-2xl mt-24 max-md:mt-52 px-4 mx-auto flex items-center flex-col'>
      <div className="main w-full">
      <form className="flex w-full mb-12 items-center" onSubmit={handleTodoSubmit}>
      <div className="user-box h-[51px] w-full">
      <input 
      className='[w-80%] p-0 items-center'
      type="text" 
      value={todo}
      onChange={(e)=>{setTodo(e.target.value)}}
      />
      <label>Add todo ..</label>
    </div>
      <button className='btn-1 add mt-0'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {loading ? 'Adding...' : 'Add'}</button>
      </form>
      
      <h1 className='text-3xl mt-10 text-center mb-4 font-bold'>Your Tasks</h1>
      <Todos added={todoAdded}/>
      </div>
    </div>
    </>

  )
}

export default Home

import React,{ useEffect, useState } from 'react'
import './TodoListStyle.css'
import { useSelector } from 'react-redux'
import Modal from './Modal'

const TodoList = ({added}) => {
    const [todosData,setTodosData] = useState([]);
    const { currentUser } = useSelector(state=>state.user.user)
    const [todo,setTodo] = useState('')
    const [updated,setUpdated] = useState(false)
    const [editModal , setEditModal] = useState(false)
    const [passTodo , setPassTodo] = useState('')


    async function getTodos(){
      try {
        const res = await fetch(`/api/todo/show/${currentUser._id}`);
        const data = await res.json();
        if(data.success===false){
          console.log(data.message)
          return;
        }
        setTodosData(data)
      } catch (error) {
        console.log(error.message)
      }
  }

    useEffect(() => {
      getTodos()
    }, [added,updated])
    

    const data_from_child = (data) => {
      setEditModal(data);
  }
    

    const handleDeleteTodo = async (id)=>{
      try {
        const res = await fetch(`/api/todo/delete/${id}`,{method:"DELETE"})
        const data = await res.json();
        if(data.success === false){
          console.log(data.message)
        }
        setTodosData((previous)=>previous.filter((todo)=>todo._id!== id))
      } catch (error) {
        console.log(error)
      }
    }

    const handleCompleted = async (id,myCheck)=>{
      try {
        const res = await fetch(`/api/todo/updated/${id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          check:!myCheck
        })
      })
      const data = await res.json();
      if(data.success===false){
        console.log(error);
        return;
      }
      setUpdated(!updated)
      } catch (error) {
        console.log(error)
      }
    }

    const handleEdit = async (id,newTodo)=>{
      if(newTodo === ''){
        return;
      }
      try {
        const res = await fetch(`/api/todo/updated/${id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          todo:newTodo
        })
      })
      const data = await res.json();
      if(data.success===false){
        console.log(error);
        return;
      }
      setEditModal(false);
      setUpdated(!updated)
      } catch (error) {
        console.log(error.message)
      }
    }


  return (
    <>
    <ul className='flex flex-col gap-2'>
        {todosData && todosData.length>0 && todosData.map((myTodo)=>{
           return ( 
           <li key={myTodo._id} className='my-list flex flex-col mb-6 gap-2 p-4 '>
           <p className='max-md:text-base text-lg'
           style={{textDecoration:myTodo.check === true ? 'line-through': 'none',
           textDecorationThickness:myTodo.check === true ? '4px': '0' }} 
           >{myTodo.todo}</p>

           <div className="flex items-center justify-between">
           <input 
            type="checkbox"
            className='w-5 h-5 cursor-pointer' 
            checked={myTodo.check} 
            onChange={()=>handleCompleted(myTodo._id,myTodo.check)} 
            />
            <div className='flex gap-4'>
            <button className='text-[#03e9f4]' disabled={myTodo.check ? true : false} onClick={()=>{setEditModal(true);setPassTodo(myTodo)}}>
           <i id='edit-icon' className="fa-solid fa-lg fa-pencil icon"></i>
           </button>
           <button className='text-[red] ' onClick={()=>handleDeleteTodo(myTodo._id)}>
           <i id='delete-icon' className="fa-solid fa-lg fa-trash icon"></i>
           </button>
           </div>
           </div>
       </li>)
        }) }
    </ul>
    {editModal ? <Modal showModal={editModal} edit={true} btn1={'Close'} btn2={'Edit'} handleFunction={handleEdit} argument={passTodo} message={passTodo.todo} setter={data_from_child}/> : null}

    </>    
)
}

export default TodoList

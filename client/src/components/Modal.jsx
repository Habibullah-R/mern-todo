import React, { useState , useEffect } from 'react'

const Modal = (props) => {
    const [todo,setTodo] = useState(props.message)
    

  return (
    <>
      {props.showModal ? (
        <>
          <div
            className="justify-center text-white items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-gradient-to-r from-[#141e30] to-[#243b55] rounded-lg shadow-lg relative flex flex-col max-w-lg mx-auto outline-none focus:outline-none">
                {/*header*/}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    {props.edit ? 
                    <textarea
                    className="my-4 outline-none border-b-[1px] bg-gradient-to-r from-[#141e30] to-[#243b55] h-50 text-blueGray-500 text-lg leading-relaxed"
                    type='text'
                    value={todo}
                    rows={8}
                    cols={30}
                    onChange={(ev)=>setTodo(ev.target.value)}
                  >{todo}</textarea>
                    :
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      {props.message}
                    </p>}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {props.edit ?
                      todo === ""? 
                      alert("Please enter a task") :props.handleFunction(props.argument._id,todo)  
                      : props.setter(false)} }
                  >
                    {props.btn2}
                  </button>
                  <button
                    className="text-white bg-red-500 active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {props.edit ?  props.setter(false) : props.handleFunction()} }
                  >
                    {props.btn1}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </>
  )
}

export default Modal

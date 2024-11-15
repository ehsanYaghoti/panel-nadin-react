import { ChangeEvent, useState } from "react";
import { SetStateTodos, TodosType, TodoType } from "../../../types/todos";

interface Props {
    todo : TodoType
    todos : TodosType
    setTodos : SetStateTodos
}


export default function TodoItem({todo , todos , setTodos} : Props){
    
    const [editMode , setEditMode] = useState(false)
    const [editInput , setEditInput] = useState(todo.title)


    const toggleHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const editedTodos = todos.map((item) => {
            if(item.id === todo.id){
                item.isDone = !item.isDone
            }

            return item
        })

        setTodos(editedTodos)

    }

    const deleteHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // let foundIndex = todos.findIndex(item => item.id === todo.id )
        // const newTodos = todos.filter((item , index) => index !== foundIndex )
        const newTodos = todos.filter((item , index) => {
            if(item.id === todo.id){
                return item !== todo
            }
            return item
        })

        console.log()
        setTodos(newTodos)
    }

    const editInputHandler = (e : ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()

        setEditInput(e.target.value)

    }

    const editHandler = (e : React.MouseEvent<HTMLButtonElement> , id : number) => {
        e.preventDefault()
    
        const editedTodos = todos.map(item => {
            if(item.id === id){
                item.title = editInput
            }
            return item
        })


        setTodos(editedTodos)
        setEditMode(false)


    }

    return  (
        <div className="mb-4">
            { 
                editMode 
                ?  
                    <div className="flex items-center justify-between w-full" >
                        <input  id={`editInput-${todo.title}`} type="text" className="p-1 rounded-md outline-none border border-slate-600"  value={editInput} onChange={editInputHandler} /> 
                        <button id={`editButton-${todo.title}`} className="`shrink-0 p-2 border-2 rounded hover:text-white text-slate-600 border-slate-600 hover:bg-slate-600  `" onClick={(e) => editHandler(e , todo.id)} >edit</button>
                    </div> 
                :
                <div className="flex items-center justify-between w-full">
                    <p id="title" className={`  ${!todo.isDone ? "text-gray-900" : "line-through text-green-500"} `}>{todo.title}</p>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleHandler} id={`doneButton`} className={`shrink-0 p-2  border-2 rounded hover:text-white ${ !todo.isDone ? "text-green-500 border-green-500 hover:bg-green-500" : 'text-gray-700 border-gray-700 hover:bg-gray-700' }  `}>{!todo.isDone ? 'Done' : 'Not Done' }</button>
                        <button onClick={(e) => setEditMode(true)} id={`editModeButton-${todo.title}`} className={`shrink-0 p-2  border-2 rounded hover:text-white text-slate-600 border-slate-600 hover:bg-slate-600  `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                        <button  onClick={deleteHandler} id={`removeTodoButton-${todo.title}`} className="shrink-0 p-2 border-2 rounded text-red-500 border-red-300 hover:text-white hover:bg-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
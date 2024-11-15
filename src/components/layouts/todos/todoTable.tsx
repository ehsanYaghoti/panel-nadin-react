import { useEffect, useState } from "react"
import TodoItems from "./todoItems";
import { toast } from "react-toastify";
import { TodoType } from "../../../types/todos";

export default function TodoTable(){

    const [input , setInput] = useState('')
    const [todos , setTodos] = useState<TodoType[]>([])

    //  load todos from localstorage
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }

    } , [])

    // update todos to localstorage
    useEffect(() => {
        if(todos.length !== 0){
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);


    const addTodoHandler = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(input.trim() !== ''){
            setTodos((prevState) => {
                return [
                    ...prevState,
                    {
                        id : Date.now(),
                        title : input,
                        isDone : false
                    }
                ]
            })
            localStorage.setItem('todos' , JSON.stringify(todos))
            setInput('')
        }

        if(input.trim() === ''){
            toast.error('input must contain at least one character')
        }
        
    }


    const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    

    return (

        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-gray-100 rounded shadow p-1 md:p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="mb-4">
                    <h1 className="text-gray-900 text-2xl font-bold">Todo List</h1>
                    <form onSubmit={addTodoHandler} className="flex mt-4">
                        <input value={input} id="addInput" onChange={inputHandler} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700" placeholder="Add Todo" />
                        <button type="submit" className="shrink-0 p-2 border-2 rounded text-teal-600 border-teal-300 hover:text-white hover:bg-teal-400">Add</button>
                    </form>
                </div>
                <TodoItems todos={todos} setTodos={setTodos} />
            </div>
        </div>
    )
}
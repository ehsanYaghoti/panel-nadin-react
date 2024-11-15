import { SetStateTodos, TodosType } from "../../../types/todos";
import TodoItem from "./todoItem";

interface Props {
    todos : TodosType
    setTodos : SetStateTodos
}

export default function TodoItems({todos , setTodos} : Props){
    
    return  (
        <>
        {
            todos.map(todo => <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} /> )
        }
        </>
    )
}
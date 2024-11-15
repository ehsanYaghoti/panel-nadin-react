import { Dispatch, SetStateAction } from "react"

export type TodoType = {
    id : number,
    title : string,
    isDone : boolean
} 

export type TodosType = TodoType[]

export type SetStateTodos = Dispatch<SetStateAction<TodosType>>
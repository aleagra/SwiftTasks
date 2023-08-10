import { TODO_FILTERS } from "./const";

export interface Todo {
    id: string,
    title: string,
    completed: boolean,
    date:string,
  }
 export type TodoTitle = Pick<Todo,'title'>
 export type TodoId = Pick<Todo,'id'>
 export type TodoCompleted = Pick<Todo,'completed'>
 export type TodoDate = Pick<Todo,'date'>
  
export  type ListOfTodos = Todo[];
 
export type FilterValue =  (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
 
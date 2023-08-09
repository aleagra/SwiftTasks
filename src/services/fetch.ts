import { Todo } from "../types";

const API_URL = "https://api.jsonbin.io/v3/b/64d2703ab89b1e2299cd6ba3";
const API_KEY ="$2b$10$Z70p58jJIg78ugHuanAAsuQI3ylvD7f1IAMvoBe8WLf5QU6xECBSS";

export const updateDatabase = async (updatedTodos: Todo[]): Promise<void> => {
    const dataToUpdate = {
      todos: updatedTodos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      })),
    };
  
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(dataToUpdate),
    };
  
    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        console.error("Error updating todos in the database");
      } else {
        console.log("Database updated successfully");
      }
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  };
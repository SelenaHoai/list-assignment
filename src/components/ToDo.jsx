import { useState } from  'react';

const ToDo = () => {
    const [newTodo, setNewTodo] = useState([]);
    const[todos, setTodos] = useState([]);

    const handleNewTodoSubmit = (event) => {
        event.preventDefault();

        if (newTodo.length === 0) {
        return;
        }

        const todoItem = {
            text: newTodo,
            complete: false
        }

        // setTodos and pass in a brand new array containing all current todos plus 1 more.
        setTodos([...todos, todoItem]);
        setNewTodo("");
    };


    const handleTodoDelete = (delIdx) => {
        const filteredTodos = todos.filter((todo, i) => {
            return i != delIdx;
        });

        setTodos(filteredTodos);
    }

    
    const handleToggleComplete = (idx) => {
        const updatedTodos = todos.map((todo,i) => {
            if (idx === i) {
                todo.complete = !todo.complete;
                // To avoid mutating the todo directly, do this:
                // const updatedTodo = { ...todo, complete: !todo.complete };
                // return updatedTodo;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }


    return (
        <div className="main-container">
            <p className="title bold">My To-Do List</p>
            <div className="input">
                <form onSubmit={(event) => { handleNewTodoSubmit(event);}}>
                    <input onChange={(event) => {setNewTodo(event.target.value);}} type="text" value={newTodo}/>
                    <button className="add-button">Add</button>
                </form>
            </div>

            {todos.map((todo, i) => {
                const todoClasses = ["italic"];

                if (todo.complete) {
                    todoClasses.push("line-through");
                }
                
                return (
                    <div key={i} className="result-style">
                        <input onChange={(event) => {handleToggleComplete(i);}} checked={todo.complete} type="checkbox" />
                        <span className={todoClasses.join(" ")} style={{marginLeft:10}}>{todo.text}</span>
                        <button onClick={(event) => {handleTodoDelete(i);}} style={{marginLeft:10, padding:5, margin:5, border: "none", borderRadius:8, color:"white", backgroundColor:"dimgray"}}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
};



export default ToDo;
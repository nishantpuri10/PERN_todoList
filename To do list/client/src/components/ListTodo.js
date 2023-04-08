import { useState } from "react"
import React, { useEffect }  from 'react'
import EditTodo from "./EditTodo";



function ListTodo() {

    const [todos, setTodos] = useState([]);

/////SHOW TODOS//////////////////
    const gettodos = async()=>{
        try {
            const resp = await fetch("http://localhost:5000/todos");
            const jsonData =await resp.json();

            console.log(jsonData);
            setTodos(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    }

////////DELETE TODO/////////////////
const deleteItem =async (_id)=>{
  let result = await fetch(`http://localhost:5000/todos/${_id}` , {
    method : 'Delete'
  });
  result = await result.json;
  if(result){
    gettodos();        ////getProducts is called so as to refresh the list after deleting
  }
}

    useEffect(()=>{
        gettodos();
    },[]);
  return (
    <>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Description</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
    {todos.map(todo=>(
        <tr>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/> </td>
            <td><button className="btn btn-danger" onClick={()=>deleteItem(todo.todo_id)}>Delete</button></td>
        </tr>
    ))}
    
  </tbody>
  
</table>

    </>
  )
}

export default ListTodo
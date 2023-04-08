import React , {useState }from 'react'

function InputTodo() {
    const [description, setDescription] = useState("");

    const addtodo = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/todos" ,{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify({description})
            })

            console.log(response);
           
            setDescription("");     ///clear the input field after clicking add
            window.location = "/";
            
        } catch (err) {
            console.error(err.message);
        }

    }

    
  return (
    <>
    <h1 className='text-center mt-5'>Pern Todo List</h1>
    <form >
        <input type= "text"  value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
        <button className='btn btn-warning' type="button" onClick={addtodo}>Add</button>    
    </form>
    </>
  )
}

export default InputTodo
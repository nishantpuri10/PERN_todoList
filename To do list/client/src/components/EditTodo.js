import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams , useNavigate } from 'react-router-dom';


function EditTodo({todo}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setDescription] = useState(todo.description);

  
  
  const updatetodo = async()=>{
    
    let result = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
      method:'Put',
      body: JSON.stringify({description}),
      headers: {
        'Content-Type' : "application/json"
      }
    });
    result = await result.json();
    
    
    setShow(false);
    window.location = "/";
   
  }

  
  return (
    
    <>
      <Button variant="primary " onClick={handleShow} className='btn btn-success'>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body><input style={{width:"100%"}} value={description} onChange={(e)=>{setDescription(e.target.value)}} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updatetodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditTodo
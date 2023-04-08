const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");

///Middleware
app.use(cors());
app.use(express.json());   //// this middleware enables us to use req.body

////ROUTE-1////
////Create a todo/////post cause we are adding a data
app.post("/todos" , async(req,res)=>{
    try {
        const {description} = req.body;
        const newtodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *" , [description]);  ///description will be the value for $1
        res.json(newtodo.rows[0]);                                               ///RETURNING * is used to show the data in response. 
        
    } catch (err) {
        console.error(err.message);
    }
})

////ROUTE-2/////
////GET ALL TODOS////
app.get("/todos" , async(req,res)=>{
    try {
        const alltodos = await pool.query("SELECT * FROM todo");
        res.json(alltodos.rows);
    } catch (error) {
        console.error(err.message);
    }
})

////ROUTE -3///
///GET ONE TODO USING IT'S TODO_ID///
app.get('/todos/:id' , async(req , res)=>{
    try {
        const {id} = req.params;   ////req.params refers to the id in /todo/:id
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1" , [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
})

////ROUTE-4////
////UPDATE////
app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

////ROUTE-5/////
////DELETE////
app.delete("/todos/:id" , async(req,res)=>{
    const {id} = req.params;
    const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1" , [id]);

    res.json("delete successfully")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
var express = require('express');
var bodyParser = require('body-parser');
const url = require('url');
const port = process.env.PORT || 5000;
const Joi = require('joi');


// const pathName = url.parse(req.url, true).pathname;

var app = express();
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
console.log(__dirname, "the dirname **************")

var todoList = [
    // {
    //     id: 1,
    //     todo: "Implement a REST API"
    // }, 
    // {
    //     id: 2,
    //     todo: "yo this the 2nd"
    // }
];

// GET /api/todos
app.get('/api/todos', function(req, res, next){
    res.send(todoList)
})
// GET /api/todos/:id
app.get('/api/todos/:id', function(req, res, next){
 
    const list = todoList.find(item => item.id === parseInt(req.params.id));
    if(!list) res.status(404).send("Item not found");
    res.send(list);

})

// POST /api/todos (adding something to todo list)
app.post('/api/todos', function(req, res, next){

const schema = {
    todo: Joi.string().required()
}
const result = Joi.validate(req.body, schema);
console.log(req.body, 'reqbody')
if(result.error){
    res.status(400).send(result.error).details[0].message;
    return;
}

const todo = {
    id: todoList.length + 1,
    todo: req.body.todo
};

    todoList.push(todo)
    res.send(todoList);
})

// PUT /api/todos/:id (updating one of the elements ex. id or todo)

app.put("/api/todos/:id", function(req, res, next){
   //look up todo item
    // if not existing, return 404
   const list = todoList.find(item => item.id === parseInt(req.params.id));
    if(!list) res.status(404).send("Item not found");
    
    const result = validateList(req.body)
    const { error } = validateList(req.body) // result.error equivalent
   //validate
   // if invalid, return 400
   console.log(result, "cathing error")
    if(error){
        res.status(400).send(result.error)
        return;
    }
   //update list
   //return updated list
   list.todo = req.body.todo;
   res.send(list)
})

function validateList(list){
    const schema = {
        todo: Joi.string().required()
        }
        return Joi.validate(list, schema);
}

// DELETE /api/todos/:id
app.delete("/api/todos/:id", function(req, res, next){
   //Look up the item on list
   //not existing, return 404
   const list = todoList.find(item => item.id === parseInt(req.params.id));
   if(!list) return res.status(404).send("Item not found");
   //Delete
   const index = todoList.indexOf(list)
   todoList.splice(index, 1);


   //Return the same course
   res.send(list)
})


app.listen(port, function(){
    console.log(`Todo List API is now listening on port ${port}...`);
})
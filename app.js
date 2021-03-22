import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// get all todos
app.get('/api/v1/forms', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'forms retrieved successfully',
    todos: db
  })
});

//get single todo
app.get('/api/v1/forms/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((form) => {
      if (form.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'form retrieved successfully',
          todo,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'form does not exist',
    });
});

//post a to do
app.post('/api/v1/forms', (req, res) => {
    if(!req.body.firstname) {
      return res.status(400).send({
        success: 'false',
        message: 'firstname is required'
      });
    } else if(!req.body.lastname) {
      return res.status(400).send({
        success: 'false',
        message: 'lastname is required'
      });
    } else if(!req.body.email) {
      return res.status(400).send({
        success: 'false',
        message: 'email is required'
      });
    } else if(!req.body.communication) {
      return res.status(400).send({
        success: 'false',
        message: 'Communication is required'
      });
    }
   const todo = {
     id: db.length + 1,
     firstname: req.body.firstname,
     lastname: req.body.lastname,
     email: req.body.email,
     organization: req.body.organization,
     euresident: req.body.euresident,
     communication: req.body.communication,
   }
   db.push(todo);
   return res.status(201).send({
     success: 'true',
     message: 'Thank you. You are now subscribed.',
   })
});

//update a to do
app.put('/api/v1/forms/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let formFound;
    let itemIndex;
    db.map((form, index) => {
      if (form.id === id) {
        formFound = todo;
        itemIndex = index;
      }
    });
  
    if (!formFound) {
      return res.status(404).send({
        success: 'false',
        message: 'form not found',
      });
    }
  
    if(!req.body.firstname) {
      return res.status(400).send({
        success: 'false',
        message: 'firstname is required'
      });
    } else if(!req.body.lastname) {
      return res.status(400).send({
        success: 'false',
        message: 'lastname is required'
      });
    } else if(!req.body.email) {
      return res.status(400).send({
        success: 'false',
        message: 'email is required'
      });
    } else if(!req.body.organization) {
      return res.status(400).send({
        success: 'false',
        message: 'organization is required'
      });
    } else if(!req.body.euresident) {
      return res.status(400).send({
        success: 'false',
        message: 'EU Resident is required'
      });
    } else if(!req.body.communication) {
      return res.status(400).send({
        success: 'false',
        message: 'Communication is required'
      });
    }
  
    const updatedform = {
      id: formFound.id,
      firstname: req.body.firstname || formFound.firstname,
      lastname: req.body.lastname || formFound.lastname,
      email: req.body.email || formFound.email,
      organization: req.body.organization || formFound.organization,
      euresident: req.body.euresident,
      communication: req.body.communication,
    };
  
    db.splice(itemIndex, 1, updatedform);
  
    return res.status(201).send({
      success: 'true',
      message: 'form added successfully',
      updatedTodo,
    });
});
  

//delete a to do
app.delete('/api/v1/forms/:id', (req, res) => {
const id = parseInt(req.params.id, 10);

db.map((form, index) => {
    if (form.id === id) {
        db.splice(index, 1);
        return res.status(200).send({
        success: 'true',
        message: 'form deleted successfuly',
        });
    }
});
    return res.status(404).send({
    success: 'false',
    message: 'form not found',
    });

});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
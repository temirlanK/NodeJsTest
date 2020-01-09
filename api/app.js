const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');

const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

/**
* GET /lists
* Get all lists
*/
app.get("/lists", (req, res) => {
  // return an array of all the lists in the database
  List.find({}).then((lists) => {
    res.send(lists);
  });
})
/**
* POST /lists
* Create new list
*/
app.post("/lists", (req, res) => {
  // create new list and return the new list document which includes id
  // The list information will be passed in via JSON requets body
  let title = req.body.title;

  let newlist = new List({
    title
  });
  newlist.save().then((listDoc) => {
    //The full list document is returned
    res.send(listDoc);
  })

})

/**
* PATCH /lists/:id
* Update specified list
*/

app.patch("/lists/:id", (req, res) => {
  // Update the specified list with the new values specified in JSON body of the request

  List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
})

/**
* DELETE /lists/:id
* Delete specified list
*/
app.delete("/lists/:id", (req, res) => {
  // Delete the specified list 
  List.findOneAndRemove({
        _id: req.params.id
        
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        // delete all the tasks that are in the deleted list
        // deleteTasksFromList(removedListDoc._id);
    })
})

/**
* GET /lists/:listId/tasks
* Get all list's tasks
*/
app.get("/lists/:listId/tasks", (req, res) => {
  // return all tasks that belong to specific list specified by listId
  Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
app.post('/lists/:listId/tasks', (req, res) => {
    // Create a new task in a list specified by listId

    List.findOne({
        _id: req.params.listId
        // ,
        // _userId: req.user_id
    }).then((list) => {
        if (list) {
            
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            });
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})


/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // Update an existing task (specified by taskId)

    List.findOne({
        _id: req.params.listId
        // ,
        // _userId: req.user_id
    }).then((list) => {
        if (list) {
            
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
            
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

/*
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {

    List.findOne({
        _id: req.params.listId
        
    }).then((list) => {
        if (list) {
            // list object with the specified conditions was found
            
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canDeleteTasks) => {
        
        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
});



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})
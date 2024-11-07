const Task = require('../model/task.model');
const { serverErrorMessage, badRequestMessage } = require('../middleware/error.messages.middleware');
const { taskValidation } = require('../util/task.validation');
const mongoose = require('mongoose');

exports.createTask = async (req, res) => {
    try{
        const {_id} = req.user;
        const { value, error } = taskValidation(req.body);
        if(error) return badRequestMessage(error.details[0].message, res);

        const task = new Task({
            title: value.title, 
            status: value.status || 'incomplete',
            userID: _id
        });
        await task.save();

        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Task created successfully',
            task
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.getAllTasks = async (req, res) => {
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id}).populate('userID', 'username email');

        return res.status(200).json({
            status: 'success',
            code: 200,
            totalTasks: tasks.length,
            tasks
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.getOneTask = async (req, res) => {
    const {taskID} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(taskID))
            return badRequestMessage('Invalid task ID', res);

        const task = await Task.findById(taskID).populate('userID', 'username email');
        if(!task){
            return badRequestMessage('Task not found', res);
        }
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Task retrieved successfully',
            task
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.updateTask = async (req, res) => {
    const {taskID} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(taskID))
            return badRequestMessage('Invalid task ID', res);

        const task = await Task.findByIdAndUpdate(taskID, req.body, {new: true}).populate('userID', 'username email');
        if(!task){
            return badRequestMessage('Task not found', res);
        }

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Task updated successfully',
            task
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.deleteTask = async (req, res) => {
    const {taskID} = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(taskID))
            return badRequestMessage('Invalid task ID', res);

        const task =  await Task.findByIdAndDelete(taskID);
        if(!task){
            return badRequestMessage('Task not found', res);
        }
       
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Task deleted successfully'
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.deleteAllTasks = async (req, res) => {
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id});
        if(tasks.length < 1){
            return badRequestMessage('No tasks found', res);
        }
        await Task.deleteMany({userID: _id});
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'All tasks deleted successfully'
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.getTasksByStatus = async (req, res) => {
    const {status} = req.params;
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id, status}).populate('userID', 'username email');
        if(tasks.length < 1){
            return badRequestMessage('No tasks found', res);
        };
        return res.status(200).json({
            status: 'success',
            code: 200,
            totalTasks: tasks.length,
            tasks
        });
    }
    catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};
exports.markTask = async (req, res) => {const {status} = req.params;
const {taskID} = req.params;
try{
    if(!mongoose.Types.ObjectId.isValid(taskID))
        return badRequestMessage('Invalid task ID', res);

    const task = await Task.findById(taskID);
    if(!task){
        return badRequestMessage('Task not found', res);
    };

    if(task.status == 'incomplete'){
        task.status = 'completed';
    }else{
        task.status = 'incomplete';
    }
    await task.save();

    return res.status(200).json({
        status: 'success',
        code: 200,
        message: `Task marked as ${task.status}`,
        task
    });
}
catch(error){
    console.log(error);
    return serverErrorMessage(error, res);
}
};
// exports.markTaskAsComplete = async (req, res) => {const {status} = req.params;
// const {taskID} = req.params;
// try{
//     if(!mongoose.Types.ObjectId.isValid(taskID))
//         return badRequestMessage('Invalid task ID', res);

//     const task = await Task.findByIdAndUpdate(taskID, {status: 'completed'}, {new: true}).populate('userID', 'username email');
//     if(!task){
//         return badRequestMessage('Task not found', res);
//     }

//     return res.status(200).json({
//         status: 'success',
//         code: 200,
//         task
//     });
// }
// catch(error){
//     console.log(error);
//     return serverErrorMessage(error, res);
// }
// };

// exports.markTaskAsIncomplete = async (req, res) => {const {status} = req.params;
// const {taskID} = req.params;
// try{
//     if(!mongoose.Types.ObjectId.isValid(taskID))
//         return badRequestMessage('Invalid task ID', res);

//     const task = await Task.findByIdAndUpdate(taskID, {status: 'incomplete'}, {new: true}).populate('userID', 'username email');
//     if(!task){
//         return badRequestMessage('Task not found', res);
//     }

//     return res.status(200).json({
//         status: 'success',
//         code: 200,
//         task
//     });
// }
// catch(error){
//     console.log(error);
//     return serverErrorMessage(error, res);
// }
// };


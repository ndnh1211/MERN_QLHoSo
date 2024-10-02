import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assigned_to: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: false
    },
    assignor: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    task_type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const taskModel = mongoose.model('Task', taskSchema)
export default taskModel
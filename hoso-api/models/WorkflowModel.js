import mongoose from "mongoose";
const workflowSchema = mongoose.Schema({
    workflow_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    task_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Task"
    }
}, {
    timestamps: true
})
const workflowModel = mongoose.model('Workflow', workflowSchema)
export default workflowModel
import mongoose from "mongoose";
const departmentSchema = mongoose.Schema({
    department_name: {
        type: String,
        required: true
    },
    manager_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Account"
    }
}, {
    timestamps: true
})
const departmentModel = mongoose.model('Department', departmentSchema)
export default departmentModel
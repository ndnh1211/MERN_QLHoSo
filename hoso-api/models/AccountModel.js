import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    vai_tro: {
        type: String,
        default: "USER"
    },
    ngaySinh: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const accountModel = mongoose.model('Account', accountSchema)
export default accountModel
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin']},
    email:{type:String, required: true, unique:true},
    phone:{type:String, unique:true}
},{
    timestamps:true,
})
export default mongoose.model('User', userSchema);
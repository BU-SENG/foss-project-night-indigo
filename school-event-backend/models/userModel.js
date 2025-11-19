import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    fullName: {type: String},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin']},
    email:{type:String, required: true, unique:true},
    phone:{type:String},
    profilePictureUrl: {type: String}
},{
    timestamps:true,
})
export default mongoose.model('User', userSchema);
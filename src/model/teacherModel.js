import mongoose from 'mongoose';

const teacherSchema =  new mongoose.Schema({
    name:{
        type: String,
        required:true
    },

    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String,
         default: "https://www.w3schools.com/w3images/avatar2.png"
    }

},{ timestamps : true })


const Teacher = mongoose.model('Teacher',teacherSchema)
export default Teacher;
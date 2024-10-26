import mongoose from 'mongoose';

const studentSchema =  new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    className :{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
         default: "https://www.w3schools.com/w3images/avatar2.png"
    },
    blocked:{
        type: Boolean,
        default:false
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Teacher', 
        required: true
    }

},{ timestamps : true })


const Student = mongoose.model('Student',studentSchema)
export default Student;
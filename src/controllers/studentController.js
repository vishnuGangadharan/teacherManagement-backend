import { generateToken } from "../config/jwt.js";
import Student from "../model/studentModel.js";


export const studentLogin = async(req,res) => {
    try {
        console.log('here');
        
        const { name,dob} = req.body;
        const checkName = await Student.findOne({name})
        console.log('dddd',checkName);
        
        if(!checkName){
           return res.status(400).json({
                message:'your not a student',
            })
        }
        let checkDob = checkName.dob
        if(checkDob !== dob){
            return res.status(400).json({
                message:'incorrect date of birth',
            })
        }

        const token = generateToken(checkName._id, 'student')


        res.status(200).json({
            message:'welcome',
            data:{
                token:token,
                checkName
            }
        })
    } catch (error) {
        
    }
}
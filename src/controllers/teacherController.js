import Teacher from "../model/teacherModel.js";
import { EncryptPassword, comparePassword } from "../config/bcryptPassword.js";
import { generateToken } from "../config/jwt.js";
import Student from "../model/studentModel.js";

export const signup = async (req, res) => {
    try {
        const { name: userName, password, email } = req.body;
        console.log('signup', req.body);
        const existUser = await Teacher.findOne({email})
        if(existUser){
            return res.status(400).json({ 
                success: false,
                message : 'User already exists'
            })
        }else{
            const hashedPassword = await EncryptPassword(password)
            const newUser = new Teacher({
                name: userName,
                email,
                password: hashedPassword,
                is_verified: true,
            })
            await newUser.save();
            const { name, email: userEmail, profilePicture } = newUser;
            const token = generateToken(newUser._id, 'teacher')
            res.status(200).json({
                success: true,
                message: 'signup successfully',
                token,
                data: {
                    name,
                    email: userEmail,
                    profilePicture,
                    _id: newUser._id,
                }
            })
        }
        
    }catch(error){
        console.log(error)
        res.status(400).json({ message: 'Server error' });
    }
}


export const addStudents = async( req,res) =>{
    try {
        console.log('here');
        console.log(req.body);
        
        const {profilePic, name, dob, age,className, teacher} = req.body
      const newStudent = new Student({
            name,
            dob,
            className,
            teacher,
            profilePic,
            age
      })
       let addedSudents=  await newStudent.save()
       if(addedSudents){
        console.log('student added',addedSudents);
        res.status(200).json({
            message:'student added',
            data:{
             data : addedSudents
            }
            
        })
        
       }else{
        res.status(400).json({ message: 'Failed to add student' });

       }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Server error' });

    }
} 

export const getStudents = async (req,res) => {
    try {
        const { teacherId } = req.params;
        const students = await Student.find({ teacher: teacherId });
        
       res.status(200).json(students)
    } catch (error) {
        res.status(400).json({ message: 'Server error' });
    }
}

export const deleteStudent = async(req,res) => {
    try {
        const { id } = req.params;
        const deleteStudent = await Student.findByIdAndDelete(id)
        if(deleteStudent){
            res.status(200).json({
                message:'student deleted',
                data:deleteStudent
            })
        }
    } catch (error) {
         res.status(400).json({ message: 'Server error' });

    }
}


export const blockStudent = async(req,res) => {
    try {
        console.log('blockkkk');
        
        const { id } = req.params;
        const { blocked } = req.body;    
        console.log('id',id);
        console.log('blocked',blocked);
        const updateStudent = await Student.findByIdAndUpdate(id, {
            blocked: blocked
        },{new: true,runValidators: true})
        
        if(updateStudent){
            res.status(200).json({
                message:'student block status updated',
                data:updateStudent
            })
        }
    } catch (error) {
         res.status(400).json({ message: 'Server error' });

    }
}


export const LoginTeacher = async(req,res) => {
    try {
        const {email, password} = req.body
        console.log(req.body);
        
const findTeacher = await Teacher.findOne({ email });
    if(!findTeacher){
       return res.status(400).json({
            message:'your not a teacher',
        })
    }   
    const compare = await comparePassword(password, findTeacher.password)
    if(!compare){
        return res.status(400).json({
            message: 'wrong password',
            success: false
        }) 
    }

    const token = await generateToken(findTeacher._id ,'teacher')

    return res.status(200).json({
        message:'welcome',
        data:{
            token:token,
            findTeacher
        }
    })
    
    
    } catch (error) {
        res.status(400).json({ message: 'Server error' });

    }
}
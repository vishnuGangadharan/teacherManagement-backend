import { Router } from "express";
const userRouter = Router()
import { signup, addStudents , getStudents, deleteStudent, blockStudent, LoginTeacher} from "../controllers/teacherController.js";
import { studentLogin } from "../controllers/studentController.js";
import userAuth from "../config/authUser.js";


userRouter.post('/teacher-signup',(req,res)=>signup(req,res))
userRouter.post('/student-login',(req,res)=>studentLogin(req,res))
userRouter.post('/add-students',(req,res)=>addStudents(req,res))
userRouter.get('/:teacherId',(req,res)=>getStudents(req,res))
userRouter.delete('/delete/:id',userAuth,(req,res)=>deleteStudent(req,res))
userRouter.post('/block/:id',userAuth,(req,res)=>blockStudent(req,res))
userRouter.post('/teacher-login',(req,res) => LoginTeacher(req,res))

userRouter.post('/student-login',(req,res)=>studentLogin(req,res))



export default userRouter
import express from 'express';
import {courseAdd,viewCourseList,deleteCourse,updateCourse} from '../Controllers/CourseControllers.js'



const CourseRoutes = express.Router();

//course CRUD requests
CourseRoutes.post('/add',courseAdd)
CourseRoutes.get('/list',viewCourseList)
CourseRoutes.delete('/:courseid',deleteCourse)
CourseRoutes.put('/:courseid',updateCourse)

export {CourseRoutes}
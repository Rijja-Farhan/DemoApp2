import express from 'express';
import { studentCourseAdd, studentCourseView, studentCourseDelete } from "../Controllers/StudentCourseControllers.js";

const StudentRoutes = express.Router();



StudentRoutes.post('/:userId/courseadd', studentCourseAdd);
StudentRoutes.get('/:userId/courseview', studentCourseView);
StudentRoutes.delete('/:userId/:courseId/coursedelete', studentCourseDelete);

export { StudentRoutes };

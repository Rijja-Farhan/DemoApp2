import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../state/slices/courseSlice';
import {  updateCourse, clearEditingCourse } from '../state/slices/courseSlice';

function CourseForm() {
  const dispatch = useDispatch();
  const editingCourse = useSelector((state) => state.courses.editingCourse);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      creditHours: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Course name is required'),
      code: Yup.string().required('Course code is required'),
      creditHours: Yup.number().required('Credit hours are required').positive('Credit hours must be a positive number'),
    }),
    onSubmit: async (values) => {
     
if(!editingCourse){
          const response = await fetch('http://localhost:3000/course/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          });

         
         


        }
          if(editingCourse)
          {
            
            dispatch(updateCourse({
              id: editingCourse._id,
              name: values.name,
              code: values.code,
              creditHours: values.creditHours
            }))

          }
          dispatch(fetchCourses())
    dispatch(clearEditingCourse());
    formik.resetForm()
      
    },
  });

  useEffect(() => {
    if (editingCourse) {
      formik.setValues({
        name: editingCourse.name,
        code: editingCourse.code,
        creditHours: editingCourse.creditHours
      });
    }
  }, [editingCourse]);
  

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Course name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
      
      <input
        type="text"
        id="code"
        name="code"
        value={formik.values.code}
        onChange={formik.handleChange}
        placeholder="Course code"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {formik.errors.code ? <div className="text-red-500">{formik.errors.code}</div> : null}

      <input
        type="number"
        id="creditHours"
        name="creditHours"
        value={formik.values.creditHours}
        onChange={formik.handleChange}
        placeholder="Course credit hours"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {formik.errors.creditHours ? <div className="text-red-500">{formik.errors.creditHours}</div> : null}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        {editingCourse ? 'Update' : 'Add'} Course
      </button>
    </form>
  );
}

export default CourseForm;

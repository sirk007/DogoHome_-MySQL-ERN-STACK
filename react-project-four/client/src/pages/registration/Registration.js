import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registration.css';


function Registration() {
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
        email: "",
        age: ""
    };

    // Create user Validation
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
        email: Yup.string().min(4).max(20).required(),
        age: Yup.string().min(1).max(5).required()
    });
    

    const onSubmit = (data) =>{
        axios.post("http://localhost:3002/auth", data).then(() =>{
            console.log(data);
            navigate('/login');
        })
    };

  return (
    <div className="loginContainerWrapper">
      <div className="container registrationContainer mt-5">
        <div className="loginForm">
          <h2 className="text-center">Registration</h2>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <Field type="text" className="form-control" id="username" name="username" placeholder="(Ex. Pepe)" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <Field type="password" className="form-control" id="password" name="password" placeholder="Password.." />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <Field type="email" className="form-control" id="email" name="email" placeholder="(Ex. @Pepe)" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <Field type="text" className="form-control" id="age" name="age" placeholder="(Ex. 24)" />
                <ErrorMessage name="age" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary">Register</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Registration;
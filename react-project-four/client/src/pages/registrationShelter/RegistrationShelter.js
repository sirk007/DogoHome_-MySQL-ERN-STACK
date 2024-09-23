import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './shelterRegistration.css';

function RegistrationShelter() {

  const navigate = useNavigate();
  const irishCounties = [
    "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", "Dublin",
    "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford",
    "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford",
    "Westmeath", "Wexford", "Wicklow"
  ];


  const initialValues = {
      username: "",
      password: "",
      email: "",
      shelterName: "", 
      county: "", 
      address: "", 
      phoneNumber: ""
  };

    // Create user Validation
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
        email: Yup.string().email().required(), 
        shelterName: Yup.string().required(), 
        county: Yup.string().required(), 
        address: Yup.string().required(), 
        phoneNumber: Yup.string().required()
    });
    

    const onSubmit = (data) =>{
        axios.post("http://localhost:3002/auth/shelter", data).then(() =>{
            console.log(data);
            navigate('/shelter/login');
            console.log("Succesfully Registered as a Shelter!");
        })
    };

    return (
        <div className="shelterContainerWrapper">
            <div className="container shelterRegistrationContainer mt-5">
                <div className="shelterRegistrationForm">
                <h2>Shelter Registration</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <Field type="text" className="form-control" id="username" name="username" placeholder="Ex. Pepe" />
                        <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <Field type="password" className="form-control" id="password" name="password" placeholder="Password.." />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <Field type="email" className="form-control" id="email" name="email" placeholder="Ex. example@gmail.com" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="shelterName" className="form-label">Shelter Name:</label>
                        <Field type="text" className="form-control" id="shelterName" name="shelterName" placeholder="Ex. Animal Oasis" />
                        <ErrorMessage name="shelterName" component="div" className="text-danger" />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="county" className="form-label">County:</label>
                        <Field as="select" className="form-control" id="county" name="county">
                        <option value="">Select County</option>
                        {irishCounties.map((county, index) => (
                            <option key={index} value={county}>{county}</option>
                        ))}
                        </Field>
                        <ErrorMessage name="county" component="div" className="text-danger" />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <Field type="text" className="form-control" id="address" name="address" placeholder="Ex. 123 Pepe drive" />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                        <Field type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Ex. 123-4567890" />
                        <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                    </div>
            
                    <button type="submit" className="btn btn-primary">Register</button>
                    </Form>
                </Formik>
                </div>
            </div>
        </div>
      );
}
    
    export default RegistrationShelter;
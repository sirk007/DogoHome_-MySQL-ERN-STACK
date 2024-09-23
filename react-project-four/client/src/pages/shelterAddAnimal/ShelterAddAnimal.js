import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

function ShelterAddAnimal() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    animal: "",
    animalName: "",
    animalAge: "",
    animalHealth: "",
    animalDescription: "",
    picture: null
  };

  useEffect(() => {
    if (!sessionStorage.getItem("accessShelterToken")) {
      console.log("Error with session");
      navigate("/login");
    }
  }, [navigate, authState]);

  const validationSchema = Yup.object().shape({
    animal: Yup.string().required("Animal type is required"),
    animalName: Yup.string().required("Animal name is required"),
    animalAge: Yup.string().required("Animal age is required"),
    animalHealth: Yup.string().required("Animal health status is required"),
    animalDescription: Yup.string().required("Animal description is required")
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    axios.post("http://localhost:3002/auth/animals", data, {
      headers: {
        accessShelterToken: sessionStorage.getItem("accessShelterToken")
      }
    })
      .then((response) => {
        console.log("Animal created:", response.data);
        navigate("/shelter/shelterLandingPage");
      })
      .catch((error) => {
        console.error('Error creating animal:', error);
        console.log("Failed tis indeed");
        // Handle error, show error message to user
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Create Animal Listing</h5>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                  <div className="mb-3">
                    <label htmlFor="animal" className="form-label">Animal Type:</label>
                    <ErrorMessage name="animal" component="span" className="text-danger" />
                    <Field
                      id="animal"
                      name="animal"
                      className="form-control"
                      placeholder="(Ex. Animal Type)"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="animalName" className="form-label">Animal Name:</label>
                    <ErrorMessage name="animalName" component="span" className="text-danger" />
                    <Field
                      id="animalName"
                      name="animalName"
                      className="form-control"
                      placeholder="(Ex. Animal Name)"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="animalAge" className="form-label">Animal Age:</label>
                    <ErrorMessage name="animalAge" component="span" className="text-danger" />
                    <Field
                      id="animalAge"
                      name="animalAge"
                      className="form-control"
                      placeholder="(Ex. Animal Age)"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="animalHealth" className="form-label">Animal Health:</label>
                    <ErrorMessage name="animalHealth" component="span" className="text-danger" />
                    <Field
                      id="animalHealth"
                      name="animalHealth"
                      className="form-control"
                      placeholder="(Ex. Animal Health)"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="animalDescription" className="form-label">Animal Description:</label>
                    <ErrorMessage name="animalDescription" component="span" className="text-danger" />
                    <Field
                      id="animalDescription"
                      name="animalDescription"
                      as="textarea"
                      className="form-control"
                      placeholder="(Ex. Animal Description)"
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Create Animal Listing</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShelterAddAnimal;

import React, {useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';


function CreatePost() {
    const {authState} = useContext(AuthContext);
    let navigate = useNavigate(); 

    const initialValues = {
        title: "",
        postText: "",
    };

    useEffect(() =>{
        if (!sessionStorage.getItem("accessToken")){
            navigate("/login");
        }
    }, [navigate, authState]);

    // Create user Validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("A title is required"),
        postText: Yup.string().required("Post is Required"),
    });

    const onSubmit = (data) => {

        axios.post("http://localhost:3002/posts", data,{
            headers: {accessToken: sessionStorage.getItem("accessToken")},
        }).then((response) => {
        navigate("/");
    });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Create Post</h5>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="inputCreatePost" className="form-label">Title:</label>
                                        <ErrorMessage name="title" component="span" className="text-danger" />
                                        <Field
                                            id="inputCreatePost"
                                            name="title"
                                            className="form-control"
                                            placeholder="(Ex. Title)"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputCreatePost" className="form-label">Post:</label>
                                        <ErrorMessage name="postText" component="span" className="text-danger" />
                                        <Field
                                            as="textarea"
                                            id="inputCreatePost"
                                            name="postText"
                                            className="form-control"
                                            placeholder="(Ex. Post)"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Image:</label>
                                        <ErrorMessage name="image" component="span" className="text-danger" />
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={(event) => {
                                                // Set the image file in Formik state
                                                //setFieldValue("image", event.currentTarget.files[0]);
                                            }}
                                            className="form-control"
                                        />

                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Create Post</button>
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

export default CreatePost

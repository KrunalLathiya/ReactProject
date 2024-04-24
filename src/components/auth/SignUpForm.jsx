import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import FormInput from '../forms/FormInput';  // Adjust path as necessary
import { useSignUp } from '../../hooks/useSignUp';  // Adjust path as necessary

// Setup validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

function SignUpForm() {  // Assuming navigate is passed via props or using useHistory from 'react-router-dom'
    const { submitData } = useSignUp();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const data = await submitData(values);  // Ensure submitData is prepared to handle Formik's values correctly
                if (data) {
                    sessionStorage.setItem('successMessage', 'You are successfully signed up');
                    navigate('/index', { replace: true, state: { refresh: true } });  // Navigate using react-router
                } else {
                    alert('Registration failed. Check your details.');
                }
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <FormInput
                        label="Username"
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username && errors.username}
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                    />
                    <FormInput
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirm_password && errors.confirm_password}
                    />
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Sign Up
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default SignUpForm;
import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import FormInput from '../forms/FormInput';  // Adjust path as necessary
import { useLogin } from '../../hooks/useLogin';  // Adjust path as necessary

// Setup validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

function LoginForm() {  // Assuming navigate is passed via props or using useHistory from 'react-router-dom'
    const { submitData } = useLogin();
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const isSuccess = await submitData(values);
                if (isSuccess) {
                    navigate('/index', { replace: true });
                } else {
                    alert('Login failed. Check your details.');
                }
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Login
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
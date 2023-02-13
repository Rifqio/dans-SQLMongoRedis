import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    firstName: yup.string().min(3, "First Name must be at least 3 characters long").max(50).required("First Name is required"),
    lastName: yup.string().max(50),
    email: yup.string().email("Email must be valid email").required("Email is required"),
})

export const mongoSchema = yup.object().shape({
    name: yup.string().min(3, "Name must be at least 3 characters long").max(50).required("Name is required"),
    email: yup.string().email("Email must be valid email").required("Email is required"),
})
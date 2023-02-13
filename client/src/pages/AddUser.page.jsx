import { Button, Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/formValidation";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
function AddUser() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const onSubmit = async (values, action) => {
    await dispatch(addUser(values));
    console.log(values);
    action.resetForm();
    navigate("/");
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      classId: "1",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label value="First Name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            placeholder="John"
            color={errors.firstName && touched.firstName ? "failure" : "gray"}
            onChange={handleChange}
            value={values.firstName}
            onBlur={handleBlur}
            required={true}
          />
          {errors.firstName && touched.firstName && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Last Name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Doe"
            color={errors.lastName && touched.lastName ? "failure" : "gray"}
            onChange={handleChange}
            value={values.lastName}
            onBlur={handleBlur}
            required={true}
          />
          {errors.lastName && touched.lastName && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.lastName}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="email" />
          </div>
          <TextInput
            id="email"
            type="email"
            color={errors.email && touched.email ? "failure" : "gray"}
            placeholder="name@email.com"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            required={true}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 font-semibold text-sm">{errors.email}</p>
          )}
        </div>
        <div id="select">
          <div className="mb-2 block">
            <Label htmlFor="classId" value="Class" />
          </div>
          <Select
            id="classId"
            required={true}
            value={values.classId}
            onChange={handleChange}
          >
            <option value="1">XII A</option>
            <option value="2"> XII B</option>
            <option value="3"> XII C</option>
            <option value="4"> XII D</option>
          </Select>
        </div>
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddUser;

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { mongoSchema } from "../..//schemas/formValidation";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { addUserMongo } from "../../redux/slice/userMongoSlice";

function AddUserMongo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values, action) => {
    await dispatch(addUserMongo(values));
    console.log(values);
    action.resetForm();
    navigate("/mongo");
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
      name: "",
      email: "",
      classname: "XII A",
    },
    validationSchema: mongoSchema,
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
            id="name"
            type="text"
            placeholder="John"
            color={errors.name && touched.name ? "failure" : "gray"}
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            required={true}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 font-semibold text-sm">{errors.name}</p>
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
            <Label htmlFor="classname" value="Class" />
          </div>
          <Select
            id="classname"
            required={true}
            value={values.classname}
            onChange={handleChange}
          >
            <option value="XII A">XII A</option>
            <option value="XII B"> XII B</option>
            <option value="XII C"> XII C</option>
            <option value="XII D"> XII D</option>
          </Select>
        </div>
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddUserMongo;

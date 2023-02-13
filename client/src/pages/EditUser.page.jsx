// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Reducer
import { editUser, getUserById } from "../redux/slice/userSlice";
// Component
import { Button, Label, Select, TextInput } from "flowbite-react";
// Validation
import { basicSchema } from "../schemas/formValidation";

function EditUser() {
  // Hooks
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [classId, setClassId] = useState("");
  const [valid, setValid] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    const res = async () => {
      const data = await dispatch(getUserById(id));
      const result = data.payload;
      console.log(result);
      setFirstName(result.firstName);
      setLastName(result.lastName);
      setEmail(result.email);
      setClassId(result.class_id);
    };
    res();
  }, [dispatch, id]);
  //   Handle submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      classId: classId,
    };
    setValid(await basicSchema.isValid(formData));
    await dispatch(editUser(formData));
    if (user.success) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            value={email}
            placeholder="name@flowbite.com"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="First Name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Last Name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>
        <div id="select">
          <div className="mb-2 block">
            <Label htmlFor="classId" value="Class" />
          </div>
          <Select
            id="classId"
            required={true}
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value={1}>XII A</option>
            <option value={2}> XII B</option>
            <option value={3}> XII C</option>
            <option value={4}> XII D</option>
          </Select>
        </div>
        {valid === false && (
          <h1 className="text-red-500 font-semibold">
            Something is invalid, check the form again
          </h1>
        )}
        <Button disabled={user.loading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default EditUser;

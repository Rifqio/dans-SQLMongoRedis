import { Alert, Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../redux/slice/userSlice";
import { Link } from "react-router-dom";
function Home() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getUser());
  };
  useEffect(() => {
    dispatch(getUser());
    console.log(users);
  }, [dispatch]);
  return (
    <div>
      <Alert color="info">
        <span>
          <span className="font-medium">This page is using MySQL based data!</span> For
          mongodb please click <Link to="/mongo" className="underline font-semibold">here</Link>
        </span>
      </Alert>
      <h1 className="my-4 text-3xl font-bold">Available User List</h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Last Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Class</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {loading && (
            <h1 className="text-3xl font-bold text-center">
              Loading the data...
            </h1>
          )}
          {users &&
            users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/edit-user/${user.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <span
                    className="font-medium text-red-600 ml-4 cursor-pointer hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Home;

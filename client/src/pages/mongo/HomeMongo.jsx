import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Progress, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  deleteUserMongo,
  getUserMongo,
} from "../../redux/slice/userMongoSlice";
function HomeMongo() {
  const dispatch = useDispatch();
  const { users, loading, error, flashMessage } = useSelector(
    (state) => state.userMongo
  );
  console.log(users);
  useEffect(() => {
    dispatch(getUserMongo());
  }, [dispatch]);
  const handleDelete = async (id) => {
    await dispatch(deleteUserMongo(id));
    dispatch(getUserMongo());
  };
  return (
    <div>
      {flashMessage && (
        <Alert color="success">
          <span>
            <span className="font-medium">Info alert!</span> User added successfully
          </span>
        </Alert>
      )}
      <h1 className="my-4 text-3xl font-bold">Available User List</h1>
      {loading && (
        <>
          <span className="font-semibold">Loading your data...</span>
          <Progress progress={loading} />
        </>
      )}
      {error && <span>{error}</span>}
      {users && (
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Class</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user, index) => (
              <Table.Row key={user._id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.class}</Table.Cell>
                <Table.Cell>
                  {/* <Link className="font-semibold text-blue-500">Edit</Link> */}
                  <span
                    className="font-semibold text-red-500 cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default HomeMongo;

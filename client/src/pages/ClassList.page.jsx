import { Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassList } from "../redux/slice/userSlice";

function ClassList() {
  const classlist = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassList());
  }, [dispatch]);
  console.log(classlist);
  return (
    <div className="max-w-xl text-center mx-auto">
      <h1 className="text-3xl mb-4 font-bold">List of Class</h1>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Class ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {classlist.loading && (
            <h1 className="text-3xl font-bold">Loading data...</h1>
          )}
          {classlist.users &&
            classlist.users.map((classList) => (
              <Table.Row key={classList.id} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {classList.id}
                </Table.Cell>
                <Table.Cell>{classList.name}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ClassList;

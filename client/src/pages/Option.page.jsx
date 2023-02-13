import { Button, Card } from "flowbite-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Option() {
  let navigate = useNavigate();
  const sqlRoute = () => {
    navigate("/add-user/sql");
  };
  const mongoRoute = () => {
    navigate("/add-user/mongo");
  };
  return (
    <div className="flex gap-4 justify-center mx-auto">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          MySQL Based
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Creating the user from this section will save the data in SQL Database
        </p>
        <Button onClick={sqlRoute}>
          Continue
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          MongoDB Based
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Creating the user from this section will save the data in MongoDB
          Database
        </p>
        <Button onClick={mongoRoute}>
          Continue
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
    </div>
  );
}

export default Option;

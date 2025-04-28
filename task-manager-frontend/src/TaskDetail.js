import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TaskDetail = () => {
  const { taskid } = useParams(); // Get taskId from the URL

  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    // Fetch task data based on taskId
    fetch(`http://localhost:8080/case-manager-api/case/${taskid}`)
      .then((res) => res.json())
      .then((data) => {
        setTaskData(data); // Populate task data with the fetched data
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [taskid]); // Run the effect when the taskId changes

  return (
    <div className="container">
      <div className="card row" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Task Detail</h2>
        </div>
        <div className="card-body">
          {taskData && (
            <div>
              <h3>
                <b>Task Title:</b> {taskData.title}
              </h3>
              <h4>
                <b>Case Number:</b> {taskData.caseNumber}
              </h4>
              <h5>
                <b>Description:</b> {taskData.description || "No description"}
              </h5>
              <h5>
                <b>Status:</b> {taskData.status}
              </h5>
              <h5>
                <b>Created Date:</b> {taskData.createdDate}
              </h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

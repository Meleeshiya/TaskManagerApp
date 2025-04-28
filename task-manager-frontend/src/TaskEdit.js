import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TaskEdit = () => {
  const { taskId } = useParams(); // Get taskId from the URL

  const [status, setStatus] = useState("TO_DO"); // Default to "TO_DO"
  const [loading, setLoading] = useState(true); // To track if the task data has loaded

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task data based on taskId to get the current status
    fetch(`http://localhost:8080/case-manager-api/cases/${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status); // Set initial status from the task data
        setLoading(false); // Mark as loaded
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send PATCH request to update the status
    fetch(`http://localhost:8080/case-manager-api/updatecasestatus/${taskId}/status?status=${status}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Status updated successfully.");
        navigate("/"); // Redirect to task listing page
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Edit Task Status</h2>
              </div>
              <div className="card-body">
                {(
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="form-control"
                        >
                          <option value="TO_DO">TO DO</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="ON_HOLD">ON HOLD</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CLOSED">CLOSED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        <Link to="/" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;

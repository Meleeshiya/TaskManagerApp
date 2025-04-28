import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TaskCreate = () => {
  const [caseNumber, setCaseNumber] = useState(""); // Added caseNumber
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TO_DO"); // Default status
  const [createdDate, setCreatedDate] = useState(""); // Optional for task creation
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare task data
    const taskData = {
      caseNumber,   // Make sure you send caseNumber
      title,
      description,
      status,
      createdDate
    };

      // Log the taskData object to the console to see the structure and values
  console.log("Task Data to be sent:", taskData);

    // POST request to save task
    fetch("http://localhost:8080/case-manager-api/addCase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData)
    })
      .then((res) => {
        alert("Task saved successfully.");
        navigate("/");
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
                <h2>Create Task</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Case Number */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Case Number</label>
                      <input
                        required
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                        className="form-control"
                      />
                      {caseNumber.length === 0 && validation && (
                        <span className="text-danger">Enter the case number</span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                      />
                      {title.length === 0 && validation && (
                        <span className="text-danger">Enter the title</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-control"
                      >
                        <option value="TO_DO">TO_DO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="ON_HOLD">ON_HOLD</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Created Date</label>
                      <input
                        type="datetime-local"
                        value={createdDate}
                        onChange={(e) => setCreatedDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/case-manager-api";

const TaskListing = () => {
    const [taskdata, taskdatachange] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate(`/task/detail/${id}`);
    };

    const LoadEdit = (id) => {
        navigate(`/task/edit/${id}`);
    };

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`${BASE_URL}/deletecase/${id}`, {
                method: "DELETE"
            }).then(() => {
                taskdatachange(taskdata.filter(item => item.id !== id));
                alert('Removed successfully.');
            }).catch((err) => {
                alert('Failed to remove task. Please try again later.');
                console.log(err.message);
            });
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/case-manager-api/cases").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            taskdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Task Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="task/create" className="btn btn-success">Add New Task (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Case Number</td>
                                <td>Title</td>
                                <td>Status</td>
                                <td>Task Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {taskdata &&
                                taskdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.caseNumber}</td>
                                        <td>{item.title}</td>
                                        <td>{item.status}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</button>
                                            <button onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
                                            <Link to={`/task/detail/${item.id}`} className="btn btn-primary">Details</Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TaskListing;

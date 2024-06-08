import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

async function fetchEmployees(data, token) {
    return fetch("http://localhost:5000/api/v1/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

function AddEmployee() {

    // Use page navigate Hook
    const navigate = useNavigate();
    // Manage the state
    const initialEmployeeState = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        organization: "",
        designation: "",
        salary: "",
    };
    const [employee, setEmployee] = useState(initialEmployeeState);

    // Handle the input
    const handleInput = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    // Save the employee into the db using API & reset the field after adding the data
    const saveEmployee = async (e) => {
        e.preventDefault();
        const data = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            phone: employee.phone,
            organization: employee.organization,
            designation: employee.designation,
            salary: employee.salary,
        };
        var token = sessionStorage.getItem("token");
        var secure_token = JSON.parse(token);

        const response = await fetchEmployees(data, secure_token.token)

        if (response.message) {
            // Reset the form fields
            setEmployee(initialEmployeeState);
            alert(response.message);
            navigate("/employee");
        } else {
            window.confirm("Something Wrong....")
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Add Employee
                                <Link to="/employee" className="btn btn-danger float-end">Go Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveEmployee}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={employee.first_name}
                                        onChange={handleInput}
                                        placeholder="Enter First Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        value={employee.last_name}
                                        onChange={handleInput}
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={employee.email}
                                        onChange={handleInput}
                                        placeholder="Enter your Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={employee.phone}
                                        onChange={handleInput}
                                        placeholder="Enter your Phone"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Organization</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="organization"
                                        value={employee.organization}
                                        onChange={handleInput}
                                        placeholder="Enter your Organization"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        value={employee.designation}
                                        onChange={handleInput}
                                        placeholder="Enter your Designation"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="salary"
                                        value={employee.salary}
                                        onChange={handleInput}
                                        placeholder="Enter your Salary"
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary px-4 py-2">
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;

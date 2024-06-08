import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function fetchEmployees(token) {
    return fetch("http://localhost:5000/api/v1/employees", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then((response) => response.json());
}

async function deleteEmployee(id, token) {
    return fetch(`http://localhost:5000/api/v1/employees/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then((response) => response.json());
}

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function getEmployees() {
            var token = sessionStorage.getItem("token");
            var secure_token = JSON.parse(token)
            if (token) {
                const employeeData = await fetchEmployees(secure_token.token);
                setEmployees(employeeData);
            }
        }
        getEmployees();
    }, []);

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Employee List
                                <Link to="/add-employee" className="btn btn-primary float-end">
                                    Add Employee
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Organization</th>
                                        <th>Designation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.first_name}</td>
                                            <td>{employee.last_name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.phone}</td>
                                            <td>{employee.organization}</td>
                                            <td>{employee.designation}</td>
                                            <td>
                                                {/* Add appropriate actions here */}
                                                <Link to={`/employee/edit/${employee.id}`} className="btn btn-success me-2">Edit</Link>
                                                <Link to={`/employee/delete/${employee.id}`} className="btn btn-danger">Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;

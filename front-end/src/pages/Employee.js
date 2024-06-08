import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';

// Get all the employee
async function fetchEmployees(token) {
    return fetch("http://localhost:5000/api/v1/employees", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then((response) => response.json());
}

// Delete the emlpoyee
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

    useEffect(() => {
        if (employees.length > 0) {
            // Initialize DataTables
            $(document).ready(function () {
                $('#employeeTable').DataTable();
            });
        }
    }, [employees]);

    // To handle the delte functionality
    const handleDelete = async (id) => {
        if (!window.confirm('Are you want to delete ?'))
            return
        var token = sessionStorage.getItem("token");
        var secure_token = JSON.parse(token);
        if (token) {
            await deleteEmployee(id, secure_token.token);
            setEmployees(employees.filter(employee => employee.id !== id));
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Employee List
                                <Link to="/add-employee" className="btn btn-primary float-end">Add Employee</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="employeeTable" className="table table-striped">
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
                                        {employees.length > 0 ? (
                                            employees.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>{employee.id}</td>
                                                    <td>{employee.first_name}</td>
                                                    <td>{employee.last_name}</td>
                                                    <td>{employee.email}</td>
                                                    <td>{employee.phone}</td>
                                                    <td>{employee.organization}</td>
                                                    <td>{employee.designation}</td>
                                                    <td>
                                                        <Link to={`/employee/edit/${employee.id}`} className="btn btn-success me-2">Edit</Link>
                                                        <button onClick={() => handleDelete(employee.id)} className="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">No employees found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;

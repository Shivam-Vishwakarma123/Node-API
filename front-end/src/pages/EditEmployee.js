import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

async function fetchEmployee(id, token) {
    return fetch(`http://localhost:5000/api/v1/employees/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then((response) => response.json());
}

async function updateEmployee(id, data, token) {
    return fetch(`http://localhost:5000/api/v1/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

function EditEmployee() {
    // Use parameter, page navigate, set variable Hook
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        organization: "",
        designation: ""
    });

    useEffect(() => {
        async function getEmployee() {
            var token = sessionStorage.getItem("token");
            var secure_token = JSON.parse(token);
            if (secure_token.token) {
                const employeeData = await fetchEmployee(id, secure_token.token);
                setEmployee(employeeData[0]);
                console.log('This is set emp data : ', employeeData)
            }
        }
        getEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var token = sessionStorage.getItem("token");
        var secure_token = JSON.parse(token);
        if (token) {
            const response = await updateEmployee(id, employee, secure_token.token);
            if (response) {
                alert(response.message);
                navigate("/employee");
            } else {
                window.confirm("Something Wrong....")
            }
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Edit Employee
                                <Link to="/employee" className="btn btn-danger float-end">Go Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={employee.first_name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={employee.last_name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={employee.email}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={employee.phone}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Organization</label>
                                    <input
                                        type="text"
                                        name="organization"
                                        value={employee.organization}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={employee.designation}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary px-4 py-2">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditEmployee;

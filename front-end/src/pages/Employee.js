import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


// async function employee() {
//     var token = sessionStorage.getItem('token')
//     return fetch("http://localhost:5000/api/v1/employees", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token.token}`,
//         },
//     }).then((response) => response.json());
// }

function EmployeeList() {
    const [employee, setEmployee] = useState([]);
    const handlEmployee = async e => {
        // e.preventDefault();
        const token = await employee();
        setEmployee(token);
    }

    useEffect(async () => {
        var token = sessionStorage.getItem('token');
        console.log('token', token=>token)
        const response = await fetch("http://localhost:5000/api/v1/employees", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`,
            },
        });
        return await response.json();
    });

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Employee List
                                <Link to="/" className="btn btn-primary float-end">Add Employee</Link>
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

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeList
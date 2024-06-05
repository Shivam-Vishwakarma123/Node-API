import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddEmployee() {

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-center">
                                Register New Employee
                            </h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" placeholder="Enter First Name" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Last Name" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" placeholder="Enter your Email" />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" className="form-control" placeholder="Enter your Phone" />
                                </div>
                                <div className="form-group">
                                    <label>Organization</label>
                                    <input type="text" className="form-control" placeholder="Enter your Organization" />
                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input type="text" className="form-control" placeholder="Enter your Designation" />
                                </div>
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input type="text" className="form-control" placeholder="Enter your Salary" />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AddEmployee;

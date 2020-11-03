import React from 'react';
import { Link } from "react-router-dom";

const CustomerTable = (props) => {
    const { customers, onDelete } = props;
    // console.log(customers);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customers.map(item => (
                    <tr key={item.id}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>
                            <Link to={`/customers/${item.id}`}
                                className="btn btn-primary btn-sm m-2"
                            > Edit</Link>
                            <button
                                onClick={() => onDelete(item)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                        </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;
import React, { useEffect, useState } from 'react';
import Joi from "joi-browser";
import Input from "../common/input";
import { saveCustomer, getCustomer, getCustomers } from '../../services/customerService';
import StyledContainer from '../container/container.style';
import { toast } from 'react-toastify';

const CustomerForm = (props) => {
    const [data, setData] = useState({ data: { firstName: '', lastName: '', email: '' } });
    const [formErrors, setFormErrors] = useState({ errors: {} });
    const [loading, setLoading] = useState(false);

    const schema = {
        id: Joi.string(),
        firstName: Joi.string()
            .required()
            .label("First Name"),
        lastName: Joi.string()
            .required()
            .label("Last Name"),
        email: Joi.string()
            .required()
            .email()
            .label("Email Address")
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data.data, schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };
    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schemas = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schemas);
        return error ? error.details[0].message : null;
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const errors = validate();
        setFormErrors({ errors: errors || {} });
        if (errors) return;
        doSubmit();
    };

    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;

        const newErrors = { ...formErrors.errors };
        const errorMessage = validateProperty(input);

        if (errorMessage) newErrors[name] = errorMessage;
        else delete newErrors[name];

        const newData = { ...data.data };
        newData[name] = value;

        setData(prevState => ({
            ...prevState,
            data: newData
        }));

        setFormErrors(prevState => ({
            ...prevState,
            errors: newErrors
        }));
    }

    const doSubmit = async () => {
        const { data: customers } = await getCustomers();
        const formdata = data.data;
        let exist = customers.find(c => c.email === formdata.email);
        if (exist) {
            toast.error('Customer with email already exist');
        } else {
            await saveCustomer(data.data);
            props.history.push("/customers");
        }

    };
    const mapToViewModel = (customer) => {
        return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email
        };
    }

    useEffect(() => {
        async function populateCustomer() {
            setLoading(true);
            try {
                const customerId = props.match.params.id;
                if (customerId === "new") { setLoading(false); return };
                const { data: customer } = await getCustomer(customerId);
                setData(prevState => ({
                    ...prevState,
                    data: mapToViewModel(customer)
                }));
                setLoading(false);
            } catch (ex) {
                setLoading(false);
                if (ex.response && ex.response.status === 404)
                    props.history.replace("/not-found");
            }
        }
        populateCustomer();
    }, [props.history, props.match.params.id]);

    const renderInput = (name, label, type) => {
        return (
            <Input
                type={type}
                name={name}
                value={data.data[name]}
                label={label}
                onChange={handleChange}
                error={formErrors.errors[name]}
            />
        );
    };
    const renderButton = (label) => {
        return (
            <button disabled={validate()} className="btn btn-primary">
                {label}
            </button>
        );
    };
    return (
        <StyledContainer>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {
                            loading ?
                                <p>Please wait while data is loading</p>
                                :
                                <div>
                                    <h1>Customer Form</h1>
                                    <br />
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            {renderInput("firstName", "First Name")}
                                            {renderInput("lastName", "Last Name")}
                                            {renderInput("email", "email", "email")}
                                            {renderButton("Save")}
                                        </form>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

export default CustomerForm;
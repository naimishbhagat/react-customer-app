import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from '../components/customers/listCustomers';
import NotFound from '../components/notFound';
import CustomerForm from '../components/customers/customerForm';
const Router = () => {
    return (
        <main className="container">
            <Switch>
                <Route path="/customers/:id" component={CustomerForm} />
                <Route path="/customers" component={Customers} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/customers" />
                <Redirect to="/not-found" />
            </Switch>
        </main>
    );
};

export default Router;
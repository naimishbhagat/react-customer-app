import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getCustomers, deleteCustomer } from '../../services/customerService';
import { paginate } from '../../utils/paginate';
import CustomerTable from './customerTable';
import SearchBox from './searchBox';
import Pagination from "../common/pagination";
import _ from "lodash";

class Customers extends Component {
    state = {
        customers: [],
        currentPage: 1,
        pageSize: 10,
        searchQuery: "",
        selectedGenre: null,
        isLoading: false
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        const { data: customers } = await getCustomers();
        this.setState({ customers, isLoading: false });
    }

    handleDelete = async customer => {
        const originalCustomers = this.state.customers;
        const customers = originalCustomers.filter(c => c.id !== customer.id);
        this.setState({ customers });
        try {
            await deleteCustomer(customer.id);
            toast.succes("Customer deleted");
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("Customer already deleted");
            else {
                console.log(ex);
            }
            this.setState({ customers: originalCustomers });
        }
    };


    handlePageChange = page => {
        this.setState({ currentPage: page });
    };


    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };


    filterByTwoFields(cust, searchQuery) {
        return _.filter(cust, function (item) {
            return (item.firstName + ' ' + item.lastName) === searchQuery;
        });
    }
    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            searchQuery,
            customers: allCustomers
        } = this.state;

        let filtered = allCustomers;
        if (searchQuery)
            filtered = allCustomers.filter(c =>
                c.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
                || c.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            );


        const customers = paginate(filtered, currentPage, pageSize);

        return { totalCount: filtered.length, data: customers };
    };

    render() {
        const { length: count } = this.state.customers;
        const { pageSize, currentPage, searchQuery } = this.state;
        if (this.state.isLoading) return <p>Please wait while data is loading</p>;
        if (count === 0) return <p>There are no customers in the database.</p>;

        const { totalCount, data: customers } = this.getPagedData();

        return (
            <div className="row">
                <div className="col">
                    <p>Showing {totalCount} customers in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <CustomerTable
                        customers={customers}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Customers;

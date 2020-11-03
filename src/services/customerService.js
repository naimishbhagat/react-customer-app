import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndPoint = apiUrl + "/customers";

function customerUrl(id) {
    return apiEndPoint + '/' + id;
}

export function getCustomers() {
    return http.get(apiEndPoint);
}

export function deleteCustomer(customerId) {
    return http.delete(customerUrl(customerId));
}

export function getCustomer(customerId) {
    return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
    if (customer.id) {
        const body = {...customer };
        delete body.id;
        return http.put(customerUrl(customer.id), body);
    }
    return http.post(apiEndPoint, customer);
}
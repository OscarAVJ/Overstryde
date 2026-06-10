import { useEffect, useState } from "react";
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer, verifyCustomerCode } from "@/services/customers.service";

const initialCustomerFormData = {
    name: "",
    last_name: "",
    email: "",
    password: "",
    photo: null,
    addresses: [],
    purchase_history: [],
    isActive: true,
    isVerified: false,
    loginAttempts: 0,
    timeOut: null
}

const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [formData, setFormData] = useState(initialCustomerFormData);

    const resetData = () => {
        setCustomerId("");
        setFormData(initialCustomerFormData);
    }

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getCustomer = async (id) => {
        try {
            setLoading(true);
            setError("");
            const customer = await getCustomerById(id);
            return customer;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addCustomer = async (customerData) => {
        try {
            setLoading(true);
            setError("");
            const result = await createCustomer(customerData);
            await fetchCustomers();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const editCustomer = async (id, customerData) => {
        try {
            setLoading(true);
            setError("");
            const result = await updateCustomer(id, customerData);
            await fetchCustomers();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const removeCustomer = async (id) => {
        try {
            setLoading(true);
            setError("");
            const result = await deleteCustomer(id);
            await fetchCustomers();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const verifyCustomer = async (verificationCodeRequest) => {
        try {
            setLoading(true);
            setError("");
            return await verifyCustomerCode(verificationCodeRequest);
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return {
        customers,
        loading,
        error,
        customerId,
        setCustomerId,
        formData,
        setFormData,
        resetData,
        fetchCustomers,
        getCustomer,
        addCustomer,
        editCustomer,
        removeCustomer,
        verifyCustomer
    }
}

export default useCustomers;

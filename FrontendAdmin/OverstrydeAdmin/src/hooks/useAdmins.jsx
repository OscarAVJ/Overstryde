import { useEffect, useState } from "react";
import { createAdmin, deleteAdmin, getAdminById, getAdmins, updateAdmin, verifyAdminCode } from "@/services/admins.service";

const initialAdminFormData = {
    name: "",
    last_name: "",
    email: "",
    password: "",
    photo: null,
    isActive: true,
    isVerified: false,
    loginAttempts: 0,
    timeOut: null
}

const useAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [adminId, setAdminId] = useState("");
    const [formData, setFormData] = useState(initialAdminFormData);

    const resetData = () => {
        setAdminId("");
        setFormData(initialAdminFormData);
    }

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getAdmins();
            setAdmins(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getAdmin = async (id) => {
        try {
            setLoading(true);
            setError("");
            const admin = await getAdminById(id);
            return admin;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addAdmin = async (adminData) => {
        try {
            setLoading(true);
            setError("");
            const result = await createAdmin(adminData);
            await fetchAdmins();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const editAdmin = async (id, adminData) => {
        try {
            setLoading(true);
            setError("");
            const result = await updateAdmin(id, adminData);
            await fetchAdmins();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const removeAdmin = async (id) => {
        try {
            setLoading(true);
            setError("");
            const result = await deleteAdmin(id);
            await fetchAdmins();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const verifyAdmin = async (verificationCodeRequest) => {
        try {
            setLoading(true);
            setError("");
            return await verifyAdminCode(verificationCodeRequest);
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAdmins();
    }, []);

    return {
        admins,
        loading,
        error,
        adminId,
        setAdminId,
        formData,
        setFormData,
        resetData,
        fetchAdmins,
        getAdmin,
        addAdmin,
        editAdmin,
        removeAdmin,
        verifyAdmin
    }
}

export default useAdmins;

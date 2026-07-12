import customerService from "@/services/customerService";
import { useAuth } from "@/hooks/useAuth";
import { useMemo, useState } from "react";

const EMPTY_ADDRESS = {
    country: "El Salvador",
    address: "",
    department: "",
    city: "",
    references: "",
    phone: "",
};

const getProfileFormFromUser = (user) => ({
    name: user?.name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
});

const useProfile = () => {
    const { user, isLoading, refreshUser } = useAuth();
    const addresses = user?.addresses || [];
    const purchaseHistory = user?.purchase_history || [];
    const orders = purchaseHistory.map((purchase) => purchase?.orders_id).filter(Boolean);

    const [formAddress, setFormAddress] = useState(EMPTY_ADDRESS);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isSavingAddress, setIsSavingAddress] = useState(false);
    const [addressError, setAddressError] = useState("");

    const [profileForm, setProfileForm] = useState(getProfileFormFromUser(user));
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileError, setProfileError] = useState("");

    const addressFormTitle = useMemo(
        () => editingAddressId ? "Editar direccion" : "Agregar direccion",
        [editingAddressId]
    );

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setFormAddress((current) => ({ ...current, [name]: value }));
    };

    const resetAddressForm = () => {
        setFormAddress(EMPTY_ADDRESS);
        setEditingAddressId(null);
        setAddressError("");
    };

    const openNewAddressModal = () => {
        resetAddressForm();
        setIsAddressModalOpen(true);
    };

    const closeAddressModal = () => {
        resetAddressForm();
        setIsAddressModalOpen(false);
    };

    const handleEditAddress = (address) => {
        setEditingAddressId(address._id);
        setFormAddress({
            country: address.country || "El Salvador",
            address: address.address || "",
            department: address.department || "",
            city: address.city || "",
            references: address.references || "",
            phone: address.phone || "",
        });
        setAddressError("");
        setIsAddressModalOpen(true);
    };

    const handleSubmitAddress = async (event) => {
        event.preventDefault();
        try {
            setIsSavingAddress(true);
            setAddressError("");
            if (editingAddressId) {
                await customerService.updateAddress(editingAddressId, formAddress);
            } else {
                await customerService.addAddress(formAddress);
            }
            await refreshUser();
            closeAddressModal();
        } catch (error) {
            setAddressError(error.message);
        } finally {
            setIsSavingAddress(false);
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            setAddressError("");
            await customerService.deleteAddress(addressId);
            await refreshUser();
            if (editingAddressId === addressId) {
                closeAddressModal();
            }
        } catch (error) {
            setAddressError(error.message);
        }
    };

    const openProfileModal = () => {
        setProfileForm(getProfileFormFromUser(user));
        setProfileError("");
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setProfileError("");
        setIsProfileModalOpen(false);
    };

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfileForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmitProfile = async (event) => {
        event.preventDefault();
        try {
            setIsSavingProfile(true);
            setProfileError("");
            const response = await customerService.updateProfile(profileForm);
            await refreshUser();
            setProfileForm(getProfileFormFromUser(response.customer));
            setIsProfileModalOpen(false);
        } catch (error) {
            setProfileError(error.message);
        } finally {
            setIsSavingProfile(false);
        }
    };

    return {
        user,
        isLoading,
        addresses,
        orders,
        formAddress,
        addressFormTitle,
        editingAddressId,
        isAddressModalOpen,
        isSavingAddress,
        addressError,
        profileForm,
        isProfileModalOpen,
        isSavingProfile,
        profileError,
        handleAddressChange,
        openNewAddressModal,
        closeAddressModal,
        handleEditAddress,
        handleSubmitAddress,
        handleDeleteAddress,
        openProfileModal,
        closeProfileModal,
        handleProfileChange,
        handleSubmitProfile,
    };
};

export default useProfile;

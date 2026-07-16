import { useState } from "react";
import {
  requestAdminPasswordRecovery,
  resetAdminPassword,
} from "@/services/recoveryPassword.service";

const useRecoveryPassword = () => {
  const [loading, setLoading] = useState(false);

  const requestRecovery = async (email) => {
    try {
      setLoading(true);
      return await requestAdminPasswordRecovery(email);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    try {
      setLoading(true);
      return await resetAdminPassword(data);
    } finally {
      setLoading(false);
    }
  };

  return { loading, requestRecovery, resetPassword };
};

export default useRecoveryPassword;

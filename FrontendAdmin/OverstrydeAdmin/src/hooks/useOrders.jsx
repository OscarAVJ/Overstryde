import { useState, useEffect } from "react";
import { getOrders, updateOrder } from "@/services/orders.service"
import { toast } from "sonner";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Error cargando las órdenes", {
        description: error.message,
        descriptionClassName: "!text-black"
      })
    } finally {
      setLoading(false);
    }
  }

  const editOrder = async (id, orderData) => {
    try {
      setLoading(true)

      const result = await updateOrder(id, orderData);
      await fetchOrders();

      return result;
    } catch (error) {
      toast.error("Error actualizando las órden.", {
        description: error.message,
        descriptionClassName: "!text-black"
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return {
    orders,
    loading,
    editOrder
  }

}

export default useOrders;
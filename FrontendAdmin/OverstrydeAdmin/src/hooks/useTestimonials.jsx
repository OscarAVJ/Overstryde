import { useCallback, useEffect, useState } from "react";
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from "@/services/testimonials.service";

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchTestimonials = useCallback(async () => {
    try { setLoading(true); setError(""); setTestimonials(await getTestimonials()); }
    catch (err) { setError(err.message); throw err; } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchTestimonials().catch(() => {}); }, [fetchTestimonials]);
  const addTestimonial = async (data) => { const result = await createTestimonial(data); await fetchTestimonials(); return result; };
  const editTestimonial = async (id, data) => { const result = await updateTestimonial(id, data); await fetchTestimonials(); return result; };
  const removeTestimonial = async (id) => { const result = await deleteTestimonial(id); await fetchTestimonials(); return result; };
  return { testimonials, loading, error, fetchTestimonials, addTestimonial, editTestimonial, removeTestimonial };
};
export default useTestimonials;

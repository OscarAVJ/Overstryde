import { useCallback, useEffect, useState } from "react";
import reviewService from "@/services/reviewService";

const useProductReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadReviews = useCallback(async () => {
    if (!productId) return;
    try {
      setLoading(true); setError("");
      setReviews(await reviewService.getByProduct(productId));
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }, [productId]);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const addReview = async (review) => {
    const result = await reviewService.create(review);
    setReviews((current) => [result.data, ...current]);
    return result;
  };

  return { reviews, loading, error, loadReviews, addReview };
};

export default useProductReviews;

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import useProductReviews from "@/hooks/useProductReviews";
import { useNavigate } from "react-router-dom";

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { reviews, loading, error, addReview } = useProductReviews(productId);
  const [form, setForm] = useState({ title: "", description: "", ranking: "5", experienceType: "General" });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!user?._id) return navigate("/login");
    try {
      setSending(true); setMessage("");
      await addReview({ ...form, productId, customerId: user._id });
      setForm({ title: "", description: "", ranking: "5", experienceType: "General" });
      setMessage("Gracias por compartir tu testimonio.");
    } catch (err) { setMessage(err.message); } finally { setSending(false); }
  };

  return <section className="mt-10 border-t pt-8 w-full">
    <h2 className="text-xl font-bold">Testimonios</h2>
    <p className="text-sm text-gray-500 mt-1">Conoce la experiencia de otros clientes.</p>
    <div className="mt-5 space-y-3">
      {loading && <p className="text-sm text-gray-500">Cargando testimonios...</p>}
      {!loading && reviews.length === 0 && <p className="text-sm text-gray-500">Aún no hay testimonios para este producto.</p>}
      {reviews.map((review) => <article key={review._id} className="rounded-lg border p-4">
        <div className="flex justify-between gap-3"><div><p className="font-semibold">{review.title}</p><p className="text-sm text-gray-500">{review.customerId?.name || "Cliente"} {review.customerId?.last_name || ""}</p></div><span className="flex items-center text-yellow-500"><Star className="size-4 fill-current" /> {review.ranking}/5</span></div>
        <p className="mt-2 text-sm">{review.description}</p>
      </article>)}
    </div>
    <form onSubmit={submit} className="mt-7 rounded-lg bg-gray-50 p-4 space-y-3">
      <h3 className="font-semibold">Comparte tu experiencia</h3>
      <Input required placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Textarea required placeholder="Cuéntanos qué te pareció el producto" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div className="flex gap-3"><select className="border rounded-md px-3" value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })}>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} estrellas</option>)}</select><Button disabled={sending}>{user ? "Enviar testimonio" : "Inicia sesión para reseñar"}</Button></div>
      {message && <p className="text-sm text-gray-600">{message}</p>}{error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  </section>;
};

export default ProductReviews;

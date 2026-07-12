import { BannerCard } from "./BannerCard";

export function BannerList({ banners, onEdit, onDelete, onToggle, loading }) {
  if (loading) return <p className="text-sm text-muted-foreground mt-4">Cargando banners...</p>;
  if (banners.length === 0) return <p className="text-sm text-muted-foreground mt-4">No hay banners para mostrar.</p>;

  return (
    <div className="space-y-4 mt-4">
      {banners.map((banner) => <BannerCard key={banner._id} banner={banner} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />)}
    </div>
  );
}

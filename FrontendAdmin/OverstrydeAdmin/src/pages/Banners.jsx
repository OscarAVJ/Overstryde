import * as React from "react";
import { toast } from "sonner";
import { BannerHeader } from "@/components/ui/BannerHeader";
import { BannerList } from "@/components/ui/BannerList";
import { createBanner, deleteBanner, getBanners, updateBanner } from "@/services/banners.service";

const Banners = () => {
  const [banners, setBanners] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingBanner, setEditingBanner] = React.useState(null);

  const loadBanners = React.useCallback(async () => {
    setLoading(true);
    try {
      setBanners(await getBanners());
    } catch (error) {
      toast.error("No se pudieron cargar los banners.", { description: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { loadBanners(); }, [loadBanners]);

  const filteredBanners = banners.filter((banner) => {
    const term = search.toLowerCase();
    return banner.title.toLowerCase().includes(term) || banner.description?.toLowerCase().includes(term) || banner.shortcut?.shortcut_title?.toLowerCase().includes(term);
  });

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editingBanner) await updateBanner(editingBanner._id, form);
      else await createBanner(form);
      toast.success(editingBanner ? "Banner actualizado." : "Banner creado.");
      setDialogOpen(false);
      await loadBanners();
    } catch (error) {
      toast.error("No se pudo guardar el banner.", { description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (banner, active) => {
    try {
      await updateBanner(banner._id, { active });
      setBanners((current) => current.map((item) => item._id === banner._id ? { ...item, active } : item));
    } catch (error) {
      toast.error("No se pudo actualizar el estado.", { description: error.message });
    }
  };

  const handleDelete = async (banner) => {

    try {
      await deleteBanner(banner._id);
      toast.success("Banner eliminado.");
      await loadBanners();
    } catch (error) {
      toast.error("No se pudo eliminar el banner.", { description: error.message });
    }
  };

  const openCreate = () => { setEditingBanner(null); setDialogOpen(true); };
  const openEdit = (banner) => { setEditingBanner(banner); setDialogOpen(true); };

  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-2xl font-bold">Banners</h1><p className="text-muted-foreground text-sm">Gestiona los banners</p></div>
      <BannerHeader search={search} onSearch={setSearch} onCreate={openCreate} dialogOpen={dialogOpen} onDialogOpenChange={setDialogOpen} editingBanner={editingBanner} onSave={handleSave} saving={saving} />
      <BannerList banners={filteredBanners} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} loading={loading} />
    </div>
  );
};

export default Banners;

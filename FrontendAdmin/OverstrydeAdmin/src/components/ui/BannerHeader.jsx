import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const getInitialForm = (banner) => ({
  title: banner?.title || "",
  description: banner?.description || "",
  shortcut_title: banner?.shortcut?.shortcut_title || "",
  path: banner?.shortcut?.path || "",
  image: null,
  preview: banner?.image?.path || null,
});

const BannerForm = ({ banner, open, onOpenChange, onSave, saving }) => {
  const [form, setForm] = React.useState(() => getInitialForm(banner));
  const [errors, setErrors] = React.useState({});
  const isEditing = Boolean(banner?._id);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleImageChange = (file) => {
    if (!file) return;
    updateField("image", file);
    updateField("preview", URL.createObjectURL(file));
  };

  const handleSave = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "El título es obligatorio.";
    if (!isEditing && !form.image) nextErrors.image = "La imagen es obligatoria.";
    if ((form.shortcut_title && !form.path) || (!form.shortcut_title && form.path)) {
      nextErrors.shortcut = "Complete el texto y la ruta del acceso directo.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-md w-full p-0 rounded-xl overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-lg font-semibold">{isEditing ? "Editar banner" : "Nuevo banner"}</DialogTitle>
          <DialogDescription>{isEditing ? "Actualiza la información del banner" : "Crea un banner promocional"}</DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 max-h-[60vh] overflow-y-auto overflow-x-hidden space-y-4">
          <div><Input placeholder="Título del banner" value={form.title} disabled={saving} onChange={(event) => updateField("title", event.target.value)} /><p className="text-xs text-red-500 mt-1">{errors.title}</p></div>
          <Textarea placeholder="Descripción" value={form.description} disabled={saving} onChange={(event) => updateField("description", event.target.value)} className="w-full min-h-[100px] resize-none" />
          <Input placeholder="Ruta del botón (Ej: /ofertas)" value={form.path} disabled={saving} onChange={(event) => updateField("path", event.target.value)} />
          <Input placeholder="Texto del botón (Ej: Ver ofertas)" value={form.shortcut_title} disabled={saving} onChange={(event) => updateField("shortcut_title", event.target.value)} />
          <p className="text-xs text-red-500 -mt-2">{errors.shortcut}</p>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Imagen del banner</label>
            <input id="fileUpload" type="file" accept="image/*" disabled={saving} onChange={(event) => handleImageChange(event.target.files[0])} className="hidden" />
            {!form.preview ? (
              <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-sm text-gray-500">
                Haz clic para subir una imagen
              </label>
            ) : (
              <div className="relative group"><img src={form.preview} alt="Vista previa" className="w-full h-40 object-cover rounded-lg" /><label htmlFor="fileUpload" className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-lg">Cambiar imagen</label></div>
            )}
            <p className="text-xs text-red-500">{errors.image}</p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 border-t bg-white">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancelar</Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black mb-3 mr-4" onClick={handleSave} disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export function BannerHeader({ search, onSearch, onCreate, dialogOpen, onDialogOpenChange, editingBanner, onSave, saving }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Input placeholder="Buscar banners..." value={search} onChange={(event) => onSearch(event.target.value)} />
        <Button className="text-white" onClick={onCreate}><Plus className="size-4 mr-1" />Nuevo banner</Button>
      </div>

      {dialogOpen && <BannerForm key={editingBanner?._id || "new"} banner={editingBanner} open={dialogOpen} onOpenChange={onDialogOpenChange} onSave={onSave} saving={saving} />}
    </>
  );
}

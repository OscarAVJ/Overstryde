import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

const EMPTY_CATEGORY = { name: "", type: "male", children: [] };
const EMPTY_SUBCATEGORY = { name: "", category: "" };

const getInitialForm = (initialData, isCategory) => {
  if (!initialData) return isCategory ? EMPTY_CATEGORY : EMPTY_SUBCATEGORY;

  return {
    ...initialData,
    category: initialData.category?._id || initialData.category || "",
    children: initialData.children || [],
  };
};

const CategoryModal = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  mode,
  entityType = "category",
  categories = [],
  saving = false,
}) => {
  const isView = mode === "view";
  const isCategory = entityType === "category";
  const [form, setForm] = useState(() => getInitialForm(initialData, isCategory));

  const addSub = () =>
    setForm((current) => ({
      ...current,
      children: [...current.children, { name: "" }],
    }));

  const removeSub = (index) =>
    setForm((current) => ({
      ...current,
      children: current.children.filter((_, itemIndex) => itemIndex !== index),
    }));

  const updateSub = (index, name) =>
    setForm((current) => ({
      ...current,
      children: current.children.map((child, itemIndex) =>
        itemIndex === index ? { ...child, name } : child,
      ),
    }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      children: (form.children || []).filter((child) => child.name.trim()),
    });
  };

  const title = isView
    ? "Detalle"
    : mode === "edit"
      ? `Editar ${isCategory ? "categoría" : "subcategoría"}`
      : `Nueva ${isCategory ? "categoría" : "subcategoría"}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Nombre"
              value={form.name}
              disabled={isView || saving}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />

            {isCategory ? (
              <select
                className="border rounded-md px-3 py-2"
                value={form.type}
                disabled={isView || saving}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              >
                <option value="male">Hombres</option>
                <option value="female">Mujeres</option>
                <option value="accesory">Accesorios</option>
              </select>
            ) : (
              <select
                className="border rounded-md px-3 py-2"
                value={form.category}
                disabled={isView || saving}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            )}
          </div>

          {isCategory && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Subcategorías</h3>
                {!isView && (
                  <Button type="button" onClick={addSub} disabled={saving} className="bg-yellow-400 text-white">
                    <Plus size={14} /> Agregar
                  </Button>
                )}
              </div>

              {form.children.length === 0 ? (
                <p className="text-sm text-gray-500">No hay subcategorías.</p>
              ) : form.children.map((subcategory, index) => (
                <div key={subcategory._id || index} className="flex gap-2 mb-2">
                  <Input
                    value={subcategory.name}
                    disabled={isView || saving}
                    onChange={(event) => updateSub(index, event.target.value)}
                  />
                  {!isView && (
                    <Button type="button" size="icon" variant="ghost" disabled={saving} onClick={() => removeSub(index)}>
                      <Trash2 className="text-red-500" size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            {isView ? "Cerrar" : "Cancelar"}
          </Button>
          {!isView && (
            <Button onClick={handleSave} disabled={saving || !form.name.trim() || (!isCategory && !form.category)} className="bg-yellow-400 text-white">
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;

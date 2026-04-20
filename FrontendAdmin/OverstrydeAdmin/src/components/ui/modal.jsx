import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Plus, Trash2 } from "lucide-react";

const CategoryModal = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  mode,
}) => {
  const isView = mode === "view";

  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    children: [],
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          ...initialData,
          description: initialData.description || "",
          children: initialData.children || [],
        });
      } else {
        setForm({
          name: "",
          type: "",
          description: "",
          children: [],
        });
      }
    }
  }, [open, initialData]);

  const addSub = () => {
    setForm({
      ...form,
      children: [...form.children, { name: "", products: 0 }],
    });
  };

  const removeSub = (index) => {
    setForm({
      ...form,
      children: form.children.filter((_, i) => i !== index),
    });
  };

  const updateSub = (index, value) => {
    const updated = [...form.children];
    updated[index].name = value;
    setForm({ ...form, children: updated });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            {mode === "create" && "Nueva Categoría"}
            {mode === "edit" && "Editar Categoría"}
            {mode === "view" && "Detalle"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nombre"
              value={form.name}
              disabled={isView}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="border rounded-md px-3 py-2"
              value={form.type}
              disabled={isView}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="Principal">Principal</option>
              <option value="Subcategoría">Subcategoría</option>
            </select>
          </div>

          <Textarea
            placeholder="Descripción..."
            value={form.description}
            disabled={isView}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">Subcategorías</h3>

              {!isView && (
                <Button onClick={addSub} className="bg-yellow-400 text-white">
                  <Plus size={14} /> Agregar
                </Button>
              )}
            </div>

            {form.children.map((sub, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  value={sub.name}
                  disabled={isView}
                  onChange={(e) => updateSub(i, e.target.value)}
                />

                {!isView && (
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeSub(i)}
                  />
                )}
              </div>
            ))}
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isView ? "Cerrar" : "Cancelar"}
          </Button>

          {!isView && (
            <Button
              onClick={() => onSave(form)}
              className="bg-yellow-400 text-white"
            >
              Guardar
            </Button>
          )}
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const NewCategoryModal = ({ open, onOpenChange }) => {
  const [categoryName, setCategoryName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const [subcategories, setSubcategories] = useState([
    { name: "", code: "" },
  ]);

  useEffect(() => {
    if (!open) {
      setCategoryName("");
      setType("");
      setDescription("");
      setSubcategories([{ name: "", code: "" }]);
    }
  }, [open]);

  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: "", code: "" }]);
  };

  const removeSubcategory = (index) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...subcategories];
    updated[index][field] = value;
    setSubcategories(updated);
  };

  const handleSave = () => {
    const data = {
      categoryName,
      type,
      description,
      subcategories,
    };

    console.log("Guardar:", data);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => onOpenChange(false)} 
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="mb-4">
          <h2 className="text-lg font-bold">Agregar Nueva Categoría</h2>
          <p className="text-sm text-gray-500">
            Crea una nueva categoría para organizar tus productos
          </p>
        </div>

        <div className="space-y-6">

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nombre de la categoría"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Seleccionar tipo</option>
              <option value="Principal">Principal</option>
              <option value="Subcategoría">Subcategoría</option>
              <option value="Variante">Variante</option>
            </select>
          </div>

          <Textarea
            placeholder="Descripción..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Subcategorías</h3>

              <Button onClick={addSubcategory} className="bg-yellow-400 text-white">
                <Plus size={14} /> Agregar
              </Button>
            </div>

            {subcategories.map((sub, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 items-center">
                <Input
                  placeholder="Nombre"
                  value={sub.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                />

                <div className="flex gap-2">
                  <Input
                    placeholder="Código"
                    value={sub.code}
                    onChange={(e) =>
                      handleChange(index, "code", e.target.value)
                    }
                  />

                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeSubcategory(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>

            <Button onClick={handleSave} className="bg-yellow-400 text-white">
              Guardar
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewCategoryModal;
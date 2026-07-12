import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Folder, Layers, Box, Pencil, Trash2, Eye, Search } from "lucide-react";
import { toast } from "sonner";
import CategoryModal from "@/components/ui/modal";
import { createCategory, deleteCategory, getCategories, updateCategory } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { createSubCategory, deleteSubCategory, getSubCategories, updateSubCategory } from "@/services/subCategories.service";

const typeLabels = { male: "Hombres", female: "Mujeres", accesory: "Accesorios" };
const sameId = (value, id) => String(value?._id || value) === String(id);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [entityType, setEntityType] = useState("category");
  const [selected, setSelected] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoryData, subcategoryData, productData] = await Promise.all([
        getCategories(), getSubCategories(), getProducts(),
      ]);
      setCategories(categoryData);
      setSubcategories(subcategoryData);
      setProducts(productData);
    } catch (error) {
      toast.error("No se pudieron cargar las categorías.", { description: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const productCount = useCallback((subcategoryIds) => products.filter((product) =>
    product.subCategories?.some((subcategory) => subcategoryIds.some((id) => sameId(subcategory, id))),
  ).length, [products]);

  const data = useMemo(() => categories.map((category) => {
    const children = subcategories
      .filter((subcategory) => sameId(subcategory.category, category._id))
      .map((subcategory) => ({ ...subcategory, products: productCount([subcategory._id]) }));

    return { ...category, children, products: productCount(children.map((child) => child._id)) };
  }), [categories, subcategories, productCount]);

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((category) =>
      category.name.toLowerCase().includes(term) ||
      typeLabels[category.type].toLowerCase().includes(term) ||
      category.children.some((subcategory) => subcategory.name.toLowerCase().includes(term)),
    );
  }, [data, search]);

  const openCreate = () => {
    setMode("create");
    setEntityType("category");
    setSelected(null);
    setOpenModal(true);
  };

  const openItem = (item, itemType, nextMode) => {
    setSelected(item);
    setEntityType(itemType);
    setMode(nextMode);
    setOpenModal(true);
  };

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (entityType === "subcategory") {
        const payload = { name: form.name, category: form.category };
        if (form._id) await updateSubCategory(form._id, payload);
        else await createSubCategory(payload);
      } else {
        const payload = { name: form.name, type: form.type };
        const result = form._id
          ? await updateCategory(form._id, payload)
          : await createCategory(payload);
        const categoryId = form._id || result.category._id;
        const existingChildren = selected?.children || [];
        const currentChildIds = new Set(form.children.filter((child) => child._id).map((child) => child._id));

        for (const child of form.children) {
          if (child._id) await updateSubCategory(child._id, { name: child.name });
          else await createSubCategory({ name: child.name, category: categoryId });
        }

        for (const child of existingChildren) {
          if (!currentChildIds.has(child._id)) await deleteSubCategory(child._id);
        }
      }

      toast.success(entityType === "category" ? "Categoría guardada." : "Subcategoría guardada.");
      setOpenModal(false);
      await loadData();
    } catch (error) {
      toast.error("No se pudo guardar.", { description: error.message });
      await loadData();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item, itemType) => {
    const label = itemType === "category" ? "categoría" : "subcategoría";
    if (!window.confirm(`¿Eliminar ${label} “${item.name}”?`)) return;

    try {
      if (itemType === "category") await deleteCategory(item._id);
      else await deleteSubCategory(item._id);
      toast.success(`${label.charAt(0).toUpperCase() + label.slice(1)} eliminada.`);
      await loadData();
    } catch (error) {
      toast.error(`No se pudo eliminar la ${label}.`, { description: error.message });
    }
  };

  const getTypeBadge = (type, isSubcategory = false) => (
    <Badge className={isSubcategory ? "bg-gray-100 text-gray-600 text-xs" : "bg-blue-100 text-blue-600 text-xs"}>
      {isSubcategory ? "Subcategoría" : typeLabels[type]}
    </Badge>
  );

  const totalSubcategories = subcategories.length;
  const totalProducts = products.length;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
          <p className="text-sm text-gray-500">Administra las categorías y subcategorías</p>
        </div>
        <Button onClick={openCreate} className="bg-yellow-400 text-white flex gap-2"><Plus size={14} />Nueva Categoría</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="bg-blue-100 p-2 rounded-lg"><Folder className="text-blue-600" size={16} /></div><div><p className="text-sm text-gray-500">Categorías Principales</p><h2 className="text-xl font-bold">{categories.length}</h2></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="bg-green-100 p-2 rounded-lg"><Layers className="text-green-600" size={16} /></div><div><p className="text-sm text-gray-500">Subcategorías</p><h2 className="text-xl font-bold">{totalSubcategories}</h2></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="bg-purple-100 p-2 rounded-lg"><Box className="text-purple-600" size={16} /></div><div><p className="text-sm text-gray-500">Productos Totales</p><h2 className="text-xl font-bold">{totalProducts}</h2></div></CardContent></Card>
      </div>

      <Card><CardContent className="p-0">
        <div className="p-4 border-b"><div className="relative"><Search className="absolute left-3 top-2.5 text-gray-400" size={14} /><Input placeholder="Buscar categorías o subcategorías..." value={search} onChange={(event) => setSearch(event.target.value)} className="pl-8" /></div></div>
        <Table><TableHeader><TableRow><TableHead>Categoría</TableHead><TableHead>Tipo</TableHead><TableHead>Productos</TableHead><TableHead>Estado</TableHead><TableHead>Acciones</TableHead></TableRow></TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={5} className="text-center text-gray-500">Cargando...</TableCell></TableRow> : filteredData.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-gray-500">No se encontraron categorías.</TableCell></TableRow> : filteredData.map((category) => <React.Fragment key={category._id}>
              <TableRow><TableCell className="flex gap-2 items-center"><Folder size={14} className="text-blue-500" />{category.name}</TableCell><TableCell>{getTypeBadge(category.type)}</TableCell><TableCell>{category.products}</TableCell><TableCell><Badge className="bg-green-100 text-green-600 text-xs">Activo</Badge></TableCell><TableCell className="flex gap-2"><Button size="icon" variant="ghost" onClick={() => openItem(category, "category", "edit")}><Pencil size={14} className="text-blue-500" /></Button><Button size="icon" variant="ghost" onClick={() => handleDelete(category, "category")}><Trash2 size={14} className="text-red-500" /></Button><Button size="icon" variant="ghost" onClick={() => openItem(category, "category", "view")}><Eye size={14} className="text-gray-500" /></Button></TableCell></TableRow>
              {category.children.map((subcategory) => <TableRow key={subcategory._id}><TableCell className="pl-10 text-gray-600">{subcategory.name}</TableCell><TableCell>{getTypeBadge(null, true)}</TableCell><TableCell>{subcategory.products}</TableCell><TableCell><Badge className="bg-green-100 text-green-600 text-xs">Activo</Badge></TableCell><TableCell className="flex gap-2"><Button size="icon" variant="ghost" onClick={() => openItem(subcategory, "subcategory", "edit")}><Pencil size={14} className="text-blue-500" /></Button><Button size="icon" variant="ghost" onClick={() => handleDelete(subcategory, "subcategory")}><Trash2 size={14} className="text-red-500" /></Button><Button size="icon" variant="ghost" onClick={() => openItem(subcategory, "subcategory", "view")}><Eye size={14} className="text-gray-500" /></Button></TableCell></TableRow>)}
            </React.Fragment>)}
          </TableBody>
        </Table>
      </CardContent></Card>

      <CategoryModal key={openModal ? `${entityType}-${mode}-${selected?._id || "new"}` : "closed"} open={openModal} onOpenChange={setOpenModal} onSave={handleSave} initialData={selected} mode={mode} entityType={entityType} categories={categories} saving={saving} />
    </div>
  );
};

export default Categories;

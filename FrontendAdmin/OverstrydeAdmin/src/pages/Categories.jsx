import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories as initialData } from "@/data/categoriesData";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import {
  Plus,
  Folder,
  Layers,
  Box,
  Pencil,
  Trash2,
  Eye,
  Search,
} from "lucide-react";

import CategoryModal from "@/components/ui/modal";

const Categories = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selected, setSelected] = useState(null);

  const totalPrincipales = data.length;

  const totalSubcategorias = data.reduce(
    (acc, cat) => acc + (cat.children?.length || 0),
    0
  );

  const totalProductos = data.reduce(
    (acc, cat) =>
      acc +
      cat.products +
      (cat.children?.reduce((a, c) => a + c.products, 0) || 0),
    0
  );

  const filteredData = data.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar categoría?")) return;

    setData((prev) =>
      prev
        .map((cat) => ({
          ...cat,
          children: cat.children?.filter((sub) => sub.id !== id),
        }))
        .filter((cat) => cat.id !== id)
    );
  };

  const handleSave = (newData) => {
    if (newData.id) {
      setData((prev) =>
        prev.map((c) => (c.id === newData.id ? newData : c))
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          ...newData,
          id: Date.now(),
          products: 0,
          status: "Activo",
        },
      ]);
    }
    setOpenModal(false);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setMode("edit");
    setOpenModal(true);
  };

  const handleView = (item) => {
    setSelected(item);
    setMode("view");
    setOpenModal(true);
  };

  const getTypeBadge = (type) => {
    if (type === "Principal")
      return <Badge className="bg-blue-100 text-blue-600 text-xs">{type}</Badge>;

    if (type === "Subcategoría")
      return <Badge className="bg-gray-100 text-gray-600 text-xs">{type}</Badge>;

    if (type === "Variante")
      return <Badge className="bg-yellow-100 text-yellow-700 text-xs">{type}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
          <p className="text-sm text-gray-500">
            Administra las categorías y subcategorías
          </p>
        </div>

        <Button
          onClick={() => {
            setMode("create");
            setSelected(null);
            setOpenModal(true);
          }}
          className="bg-yellow-400 text-white flex gap-2"
        >
          <Plus size={14} />
          Nueva Categoría
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Folder className="text-blue-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Categorías Principales</p>
              <h2 className="text-xl font-bold">{totalPrincipales}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Layers className="text-green-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Subcategorías</p>
              <h2 className="text-xl font-bold">{totalSubcategorias}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Box className="text-purple-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Productos Totales</p>
              <h2 className="text-xl font-bold">{totalProductos}</h2>
            </div>
          </CardContent>
        </Card>

      </div>
      <Card>
        <CardContent className="p-0">

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
              <Input
                placeholder="Buscar categorías..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((cat) => (
                <React.Fragment key={cat.id}>

                  <TableRow>
                    <TableCell className="flex gap-2 items-center">
                      <Folder size={14} className="text-blue-500" />
                      {cat.name}
                    </TableCell>

                    <TableCell>{getTypeBadge(cat.type)}</TableCell>
                    <TableCell>{cat.products}</TableCell>

                    <TableCell>
                      <Badge className="bg-green-100 text-green-600 text-xs">
                        {cat.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex gap-2">
                      <Pencil
                        size={14}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEdit(cat)}
                      />

                      <Trash2
                        size={14}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(cat.id)}
                      />

                      <Eye
                        size={14}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleView(cat)}
                      />
                    </TableCell>
                  </TableRow>

                  {cat.children?.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="pl-10 text-gray-600">
                         {sub.name}
                      </TableCell>

                      <TableCell>{getTypeBadge(sub.type)}</TableCell>
                      <TableCell>{sub.products}</TableCell>

                      <TableCell>
                        <Badge className="bg-green-100 text-green-600 text-xs">
                          {sub.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="flex gap-2">
                        <Pencil
                          size={14}
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleEdit(sub)}
                        />

                        <Trash2
                          size={14}
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDelete(sub.id)}
                        />

                        <Eye
                          size={14}
                          className="text-gray-500 cursor-pointer"
                          onClick={() => handleView(sub)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                </React.Fragment>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>

      <CategoryModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSave={handleSave}
        initialData={selected}
        mode={mode}
      />

    </div>
  );
};

export default Categories;
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { categories } from "@/data/categoriesData";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import NewCategoryModal from "@/components/ui/modal";

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
  FileText,
  Pencil,
  Trash2,
  Eye,
  Search,
} from "lucide-react";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const filter = searchParams.get("type") || "Todas";

  const totalPrincipales = categories.length;

  const totalSubcategorias = categories.reduce(
    (acc, cat) => acc + (cat.children?.length || 0),
    0
  );

  const totalProductos = categories.reduce(
    (acc, cat) =>
      acc +
      cat.products +
      (cat.children?.reduce((a, c) => a + c.products, 0) || 0),
    0
  );

  let filteredData = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filter !== "Todas") {
    filteredData = filteredData.filter((cat) => cat.type === filter);
  }

  const handleDelete = (id) => {
    console.log("Eliminar categoría:", id);
  };

  const getTypeBadge = (type) => {
    if (type === "Principal")
      return <Badge className="bg-blue-100 text-blue-600">{type}</Badge>;

    if (type === "Subcategoría")
      return <Badge className="bg-gray-100 text-gray-600">{type}</Badge>;

    if (type === "Variante")
      return <Badge className="bg-yellow-100 text-yellow-700">{type}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
          <p className="text-sm text-gray-500">
            Administra las categorías y subcategorías de productos
          </p>
        </div>

        <Button
          onClick={() => setOpenModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white flex gap-2"
        >
          <Plus size={16} />
          Nueva Categoría
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl">
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Folder className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Categorías Principales</p>
              <h2 className="text-xl font-bold">{totalPrincipales}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Folder className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Subcategorías</p>
              <h2 className="text-xl font-bold">{totalSubcategorias}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Folder className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Productos Totales</p>
              <h2 className="text-xl font-bold">{totalProductos}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl">
        <CardContent className="p-0">

          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Todas las Categorías</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar categorías..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <select
                className="border rounded-md px-3 py-2 text-sm"
                value={filter}
                onChange={(e) =>
                  navigate(`/categories?type=${e.target.value}`)
                }
              >
                <option value="Todas">Todas</option>
                <option value="Principal">Principal</option>
                <option value="Subcategoría">Subcategoría</option>
                <option value="Variante">Variante</option>
              </select>
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
                    <TableCell className="flex items-center gap-2">
                      <Folder className="text-blue-500" size={16} />
                      {cat.name}
                    </TableCell>

                    <TableCell>{getTypeBadge(cat.type)}</TableCell>
                    <TableCell>{cat.products}</TableCell>

                    <TableCell>
                      <Badge className="bg-green-100 text-green-600">
                        Activo
                      </Badge>
                    </TableCell>

                    <TableCell className="flex gap-3">
                      <Pencil
                        size={16}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate(`/categories/edit/${cat.id}`)}
                      />
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(cat.id)}
                      />
                      <Eye
                        size={16}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => navigate(`/categories/view/${cat.id}`)}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>

      <NewCategoryModal
        open={openModal}
        onOpenChange={setOpenModal}
      />

    </div>
  );
};

export default Categories;
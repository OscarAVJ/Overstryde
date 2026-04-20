import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={() => navigate("/products")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Ir a productos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
              <span className="text-green-500 text-sm">{item.extra}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 font-semibold">Ventas Mensuales</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Para gráficos */}
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 font-semibold">Productos por Categoría</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="mb-4 font-semibold">Órdenes Recientes</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.cliente}</TableCell>
                  <TableCell>{order.producto}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.estado === "Completado"
                          ? "bg-green-200 text-green-700"
                          : order.estado === "Pendiente"
                            ? "bg-yellow-200 text-yellow-700"
                            : "bg-blue-200 text-blue-700"
                      }
                    >
                      {order.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;
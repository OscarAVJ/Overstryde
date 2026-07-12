import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDashboard from "@/hooks/useDashboard";

const COLORS = ["#f97316", "#f59e0b", "#fbbf24", "#fdba74", "#fed7aa", "#ffedd5"];

const currencyFormatter = new Intl.NumberFormat("es-SV", {
  style: "currency",
  currency: "USD",
});

const statusClasses = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  returned: "bg-red-100 text-red-700",
};

const statusLabels = {
  delivered: "Entregado",
  pending: "Pendiente",
  returned: "Devuelto",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboard, loading, error, refresh } = useDashboard();
  const metrics = dashboard?.metrics;
  const stats = [
    { title: "Total productos", data: metrics?.products, format: (value) => value.toLocaleString("es-SV") },
    { title: "Órdenes", data: metrics?.orders, format: (value) => value.toLocaleString("es-SV") },
    { title: "Categorías", data: metrics?.categories, format: (value) => value.toLocaleString("es-SV") },
    { title: "Ingresos", data: metrics?.revenue, format: currencyFormatter.format },
  ];

  if (loading && !dashboard) {
    return <div className="p-6 text-sm text-muted-foreground">Cargando dashboard…</div>;
  }

  if (error && !dashboard) {
    return (
      <div className="p-6 space-y-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={refresh}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Resumen de la actividad de tu tienda.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} />
            Actualizar
          </Button>
          <Button onClick={() => navigate("/products")}>Ir a productos</Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, data, format }) => (
          <Card key={title}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{title}</p>
              <h2 className="mt-1 text-2xl font-bold">{format(data?.value || 0)}</h2>
              {data?.change !== undefined && (
                <span className={data.change >= 0 ? "text-sm text-green-600" : "text-sm text-red-600"}>
                  {data.change >= 0 ? "+" : ""}{data.change}% vs. mes anterior
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 font-semibold">Ventas mensuales</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboard?.monthlySales || []}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => currencyFormatter.format(value)} />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 font-semibold">Productos por categoría</h2>
            {dashboard?.productsByCategory?.length ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={dashboard.productsByCategory} dataKey="value" nameKey="name" label>
                    {dashboard.productsByCategory.map((item, index) => (
                      <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">Aún no hay productos para mostrar.</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="mb-4 font-semibold">Órdenes recientes</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto(s)</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboard?.recentOrders?.length ? dashboard.recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.slice(-6).toUpperCase()}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell><Badge className={statusClasses[order.status] || "bg-slate-100 text-slate-700"}>{statusLabels[order.status] || order.status}</Badge></TableCell>
                  <TableCell className="text-right">{currencyFormatter.format(order.total)}</TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">Aún no hay órdenes.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

import orderModel from "../orders/models/orders.model.js";
import productModel from "../products/models/products.model.js";
import categoryModel from "../categories/categories.model.js";

const dashboardController = {};

const getMonthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const getPercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

const getOrderTotal = (order) => Number(order.shopping_cart_id?.total || 0);

dashboardController.getSummary = async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = getMonthStart(now);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const sixMonthsStart = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [
      totalProducts,
      totalOrders,
      totalCategories,
      currentProducts,
      previousProducts,
      currentOrders,
      previousOrders,
      revenueOrders,
      monthlyRevenue,
      productsByCategory,
      recentOrders,
    ] = await Promise.all([
      productModel.countDocuments(),
      orderModel.countDocuments(),
      categoryModel.countDocuments(),
      productModel.countDocuments({ createdAt: { $gte: currentMonthStart } }),
      productModel.countDocuments({ createdAt: { $gte: previousMonthStart, $lt: currentMonthStart } }),
      orderModel.countDocuments({ createdAt: { $gte: currentMonthStart } }),
      orderModel.countDocuments({ createdAt: { $gte: previousMonthStart, $lt: currentMonthStart } }),
      orderModel.find({ status: { $ne: "returned" } }).populate("shopping_cart_id", "total"),
      orderModel.aggregate([
        { $match: { status: { $ne: "returned" }, createdAt: { $gte: sixMonthsStart } } },
        { $lookup: { from: "carts", localField: "shopping_cart_id", foreignField: "_id", as: "cart" } },
        { $unwind: { path: "$cart", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
            value: { $sum: { $ifNull: ["$cart.total", 0] } },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      productModel.aggregate([
        { $unwind: { path: "$subCategories", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "subcategories", localField: "subCategories", foreignField: "_id", as: "subcategory" } },
        { $unwind: { path: "$subcategory", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "categories", localField: "subcategory.category", foreignField: "_id", as: "category" } },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $group: { _id: { $ifNull: ["$category.name", "Sin categoría"] }, value: { $sum: 1 } } },
        { $sort: { value: -1, _id: 1 } },
      ]),
      orderModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("customerId", "name last_name email")
        .populate({ path: "shopping_cart_id", populate: { path: "products.productId", select: "name" } }),
    ]);

    const monthlySales = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
      const item = monthlyRevenue.find(({ _id }) => _id.year === date.getFullYear() && _id.month === date.getMonth() + 1);
      return {
        name: new Intl.DateTimeFormat("es", { month: "short" }).format(date).replace(".", ""),
        value: item?.value || 0,
      };
    });

    const currentRevenue = revenueOrders
      .filter((order) => order.createdAt >= currentMonthStart)
      .reduce((total, order) => total + getOrderTotal(order), 0);
    const previousRevenue = revenueOrders
      .filter((order) => order.createdAt >= previousMonthStart && order.createdAt < currentMonthStart)
      .reduce((total, order) => total + getOrderTotal(order), 0);

    return res.status(200).json({
      metrics: {
        products: { value: totalProducts, change: getPercentageChange(currentProducts, previousProducts) },
        orders: { value: totalOrders, change: getPercentageChange(currentOrders, previousOrders) },
        categories: { value: totalCategories },
        revenue: { value: revenueOrders.reduce((total, order) => total + getOrderTotal(order), 0), change: getPercentageChange(currentRevenue, previousRevenue) },
      },
      monthlySales,
      productsByCategory: productsByCategory.map((item) => ({ name: item._id, value: item.value })),
      recentOrders: recentOrders.map((order) => ({
        id: order._id,
        customer: [order.customerId?.name, order.customerId?.last_name].filter(Boolean).join(" ") || order.customerId?.email || "Cliente eliminado",
        product: order.shopping_cart_id?.products?.map(({ productId }) => productId?.name).filter(Boolean).join(", ") || "Sin productos",
        status: order.status,
        total: getOrderTotal(order),
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return res.status(500).json({ message: "Could not load dashboard summary" });
  }
};

export default dashboardController;

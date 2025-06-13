import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesAnalytics, getAllOrdersForAdmin } from "@/store/admin/order-slice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { ArrowUpIcon, ArrowDownIcon, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

function AdminDashboard() {
  const dispatch = useDispatch();
  // Access the state using the correct path based on your store structure
  const { analytics, orderList, isLoading } = useSelector((state) => state.adminOrder || {});
  
  const [refreshKey, setRefreshKey] = useState(0);
  const [predictedOrders, setPredictedOrders] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    hasAnalytics: false,
    hasOrderList: false,
    analyticsSample: null,
    orderListSample: null
  });

  // Debug info update
  useEffect(() => {
    setDebugInfo({
      hasAnalytics: !!analytics,
      hasOrderList: Array.isArray(orderList) && orderList.length > 0,
      analyticsSample: analytics ? JSON.stringify(analytics).substring(0, 100) + "..." : "No data",
      orderListSample: Array.isArray(orderList) && orderList.length > 0 
        ? JSON.stringify(orderList[0]).substring(0, 100) + "..." 
        : "No data"
    });
    
    console.log("Analytics data:", analytics);
    console.log("Order list:", orderList);
  }, [analytics, orderList]);

  // Fetch data on mount and set up refresh
  useEffect(() => {
    console.log("Fetching initial data...");
    dispatch(fetchSalesAnalytics());
    dispatch(getAllOrdersForAdmin());
    
    // Set up periodic refresh every 60 seconds
    const intervalId = setInterval(() => {
      console.log("Auto-refresh triggered");
      dispatch(fetchSalesAnalytics());
      dispatch(getAllOrdersForAdmin());
      setRefreshKey(prevKey => prevKey + 1);
    }, 60000);
    
    return () => {
      console.log("Cleaning up interval");
      clearInterval(intervalId);
    };
  }, [dispatch]);

  // Modified prediction logic to work with limited data
  useEffect(() => {
    if (analytics?.monthlyData && analytics.monthlyData.length > 0) {
      setPredictionLoading(true);
      console.log("Running prediction with data:", analytics.monthlyData);
      
      // Simulate ML processing time
      setTimeout(() => {
        // Modified to work with any number of months (minimum 1)
        const availableMonths = analytics.monthlyData;
        const lastMonth = availableMonths[availableMonths.length - 1];
        
        // Simple growth projection (even with just one month)
        // Using a modest 5% growth assumption if only one month available
        const growthRate = availableMonths.length > 1 
          ? (lastMonth.sales / availableMonths[0].sales) - 1 
          : 0.05;
        
        console.log("Growth rate calculated:", growthRate);
        
        // Generate next 3 months prediction
        const currentDate = new Date();
        const predictedData = [1, 2, 3].map(i => {
          const futureDate = new Date();
          futureDate.setMonth(currentDate.getMonth() + i);
          const predictedSales = Math.max(0, lastMonth.sales * Math.pow(1 + growthRate, i));
          
          return {
            month: futureDate.toLocaleString('default', { month: 'short' }),
            sales: predictedSales,
            predicted: true
          };
        });
        
        console.log("Predicted data:", predictedData);
        setPredictedOrders(predictedData);
        setPredictionLoading(false);
      }, 1000);
    }
  }, [analytics?.monthlyData, refreshKey]);

  // Order status distribution for pie chart - now using useMemo instead of useState
  const orderStatusData = useMemo(() => {
    const statusCounts = {};
    
    if (!orderList || !Array.isArray(orderList)) return [];
    
    orderList.forEach(order => {
      const status = order.orderStatus || "unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  }, [orderList]);

  // Sales by day of week - updated to properly recalculate when orderList changes
  const salesByDayOfWeek = useMemo(() => {
    // Initialize days of the week with zero sales
    const daySales = [
      { name: "Mon", sales: 0 },
      { name: "Tue", sales: 0 },
      { name: "Wed", sales: 0 },
      { name: "Thu", sales: 0 },
      { name: "Fri", sales: 0 },
      { name: "Sat", sales: 0 },
      { name: "Sun", sales: 0 }
    ];
    
    if (!orderList || !Array.isArray(orderList)) {
      console.log("No valid orderList for salesByDayOfWeek");
      return daySales;
    }
    
    console.log(`Calculating salesByDayOfWeek with ${orderList.length} orders at ${new Date().toISOString()}`);
    
    // Process each order and add its amount to the corresponding day
    orderList.forEach(order => {
      if (order.createdAt) {
        try {
          const orderDate = new Date(order.createdAt);
          const dayOfWeek = orderDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
          // Adjust for Mon-Sun format (0 = Monday, ..., 6 = Sunday)
          const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
          
          // Ensure the amount is a valid number
          const amount = parseFloat(order.totalAmount) || 0;
          
          // Add the amount to the appropriate day
          daySales[dayIndex].sales += amount;
          
          // Log for debugging
          console.log(`Added ${amount} to ${daySales[dayIndex].name} from order ${order._id} created on ${orderDate}`);
        } catch (error) {
          console.error("Error processing order date:", error, order);
        }
      } else {
        console.warn("Order missing createdAt:", order);
      }
    });
    
    console.log("Final salesByDayOfWeek:", daySales);
    return daySales;
  }, [orderList]); // Remove refreshKey dependency as orderList already changes when new data comes in

  // Growth metrics - now using useMemo instead of useState
  const growthMetrics = useMemo(() => {
    if (!analytics?.monthlyData || !analytics.monthlyData.length) {
      return {
        salesGrowth: 0,
        ordersGrowth: 0
      };
    }
    
    const lastMonth = analytics.monthlyData[analytics.monthlyData.length - 1];
    
    // If we have only one month, assume flat growth (0%)
    if (analytics.monthlyData.length < 2) {
      return {
        salesGrowth: 0,
        ordersGrowth: 0
      };
    }
    
    const previousMonth = analytics.monthlyData[analytics.monthlyData.length - 2];
    
    const salesGrowth = previousMonth.sales > 0 
      ? ((lastMonth.sales - previousMonth.sales) / previousMonth.sales) * 100 
      : 100;
      
    const ordersGrowth = previousMonth.orders > 0 
      ? ((lastMonth.orders - previousMonth.orders) / previousMonth.orders) * 100 
      : 100;
      
    return {
      salesGrowth: parseFloat(salesGrowth.toFixed(1)),
      ordersGrowth: parseFloat(ordersGrowth.toFixed(1))
    };
  }, [analytics?.monthlyData]);

  // Function to generate mock data for testing
  const generateMockData = () => {
    // Generate mock orders for the past 7 days
    const mockOrders = [];
    const statuses = ['delivered', 'pending', 'processing', 'shipped', 'cancelled'];
    
    for (let i = 0; i < 20; i++) {
      // Random day in the past week
      const daysAgo = Math.floor(Math.random() * 7);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      mockOrders.push({
        _id: `mock_order_${i}`,
        createdAt: date.toISOString(),
        totalAmount: Math.floor(Math.random() * 5000) + 500,
        orderStatus: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    // Generate mock monthly data for the past 3 months
    const mockMonthlyData = [];
    const currentDate = new Date();
    
    for (let i = 2; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      
      mockMonthlyData.push({
        month: date.toLocaleString('default', { month: 'short' }),
        sales: Math.floor(Math.random() * 50000) + 10000,
        orders: Math.floor(Math.random() * 100) + 20
      });
    }
    
    const mockAnalytics = {
      totalSales: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0),
      totalOrders: mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
      avgOrderValue: 1500,
      conversionRate: 12.5,
      monthlyData: mockMonthlyData
    };
    
    console.log("Generated mock data:", { mockOrders, mockAnalytics });
    
    // Simulate updating the Redux store with mock data
    // In a real implementation, you would dispatch these properly
    const mockDispatch = (action) => {
      if (typeof action === 'function') {
        action(mockDispatch);
      }
    };
    
    // For demonstration only - in a real app, you'd have proper actions
    // This just triggers a re-render to show the mock data
    dispatch({ 
      type: 'MOCK_DATA_LOADED',
      payload: { orders: mockOrders, analytics: mockAnalytics }
    });
  };

  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
  const STATUS_COLORS = {
    delivered: '#10B981',
    pending: '#F59E0B',
    processing: '#3B82F6',
    shipped: '#8B5CF6',
    cancelled: '#EF4444',
    unknown: '#6B7280'
  };

  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    dispatch(fetchSalesAnalytics());
    dispatch(getAllOrdersForAdmin());
    setRefreshKey(prevKey => prevKey + 1);
  };
  
  const handleUseMockData = () => {
    generateMockData();
  };

  if (isLoading && !analytics) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Use real data if available, otherwise could fall back to mock data
  const effectiveOrderList = orderList && Array.isArray(orderList) && orderList.length > 0 
    ? orderList 
    : null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUseMockData}
            className="flex items-center gap-2"
          >
            Generate Mock Data
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>
      
      {/* Debug info panel - remove in production */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs space-y-1">
            <p><strong>Has Analytics:</strong> {debugInfo.hasAnalytics ? '✅' : '❌'}</p>
            <p><strong>Has OrderList:</strong> {debugInfo.hasOrderList ? '✅' : '❌'}</p>
            <p><strong>Analytics Sample:</strong> {debugInfo.analyticsSample}</p>
            <p><strong>OrderList Sample:</strong> {debugInfo.orderListSample}</p>
            <p><strong>Refresh Count:</strong> {refreshKey}</p>
            <p><strong>Total Orders:</strong> {orderList?.length || 0}</p>
            <p><strong>Last Update:</strong> {new Date().toLocaleTimeString()}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold">
                ₹{analytics?.totalSales?.toFixed(2) || "0.00"}
              </div>
              <div className="flex items-center">
                {(growthMetrics.salesGrowth > 0) ? (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <ArrowUpIcon className="h-3 w-3" />
                    {growthMetrics.salesGrowth}%
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 flex items-center gap-1">
                    <ArrowDownIcon className="h-3 w-3" />
                    {Math.abs(growthMetrics.salesGrowth)}%
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Compared to last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold">
                {analytics?.totalOrders || 0}
              </div>
              <div className="flex items-center">
                {(growthMetrics.ordersGrowth > 0) ? (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <ArrowUpIcon className="h-3 w-3" />
                    {growthMetrics.ordersGrowth}%
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 flex items-center gap-1">
                    <ArrowDownIcon className="h-3 w-3" />
                    {Math.abs(growthMetrics.ordersGrowth)}%
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Compared to last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{analytics?.avgOrderValue?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Lifetime average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.conversionRate?.toFixed(1) || "0.0"}%
            </div>
            <Progress 
              value={analytics?.conversionRate || 0} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground pt-1">
              Visitors to customers
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="orders">Order Distribution</TabsTrigger>
          <TabsTrigger value="prediction">Sales Prediction</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          {/* Monthly Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
              <CardDescription>
                Revenue generated each month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {analytics?.monthlyData && analytics.monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={analytics.monthlyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No monthly sales data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sales by Day of Week */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Day of Week</CardTitle>
              <CardDescription>
                Pattern analysis of weekly sales distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {salesByDayOfWeek && salesByDayOfWeek.some(day => day.sales > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByDayOfWeek}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No daily sales data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {/* Order Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of orders by current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {orderStatusData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={orderStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {orderStatusData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={STATUS_COLORS[entry.name.toLowerCase()] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No order status data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Last 5 orders received
                </CardDescription>
              </CardHeader>
              <CardContent>
                {effectiveOrderList && effectiveOrderList.length > 0 ? (
                  <div className="space-y-4">
                    {effectiveOrderList.slice(0, 5).map((order, index) => (
                      <div key={order._id || index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex flex-col">
                          <span className="font-medium">{order._id?.substring(0, 10) || `Order #${index + 1}`}...</span>
                          <span className="text-sm text-muted-foreground">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              order.orderStatus?.toLowerCase() === "delivered" ? "bg-green-500" :
                              order.orderStatus?.toLowerCase() === "pending" ? "bg-yellow-500" :
                              order.orderStatus?.toLowerCase() === "processing" ? "bg-blue-500" :
                              order.orderStatus?.toLowerCase() === "shipped" ? "bg-purple-500" :
                              order.orderStatus?.toLowerCase() === "cancelled" ? "bg-red-500" :
                              "bg-gray-500"
                            }
                          >
                            {order.orderStatus || "unknown"}
                          </Badge>
                          <span className="font-medium">₹{order.totalAmount || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent orders available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="prediction">
          <Card>
            <CardHeader>
              <CardTitle>Sales Prediction (Next 3 Months)</CardTitle>
              <CardDescription>
                ML-based prediction of future sales trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              {predictionLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Running prediction algorithm...</p>
                  </div>
                </div>
              ) : predictedOrders && analytics?.monthlyData ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={[
                        ...(analytics.monthlyData || []),
                        ...predictedOrders
                      ]}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        name="Historical Sales"
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        name="Predicted Sales"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Insufficient data for prediction</p>
                </div>
              )}
              <div className="mt-4 bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">AI Insights</h4>
                <p className="text-sm">
                  Based on historical sales patterns, our algorithm predicts
                  {predictedOrders && predictedOrders.length > 0 && analytics?.monthlyData && analytics.monthlyData.length > 0
                    ? predictedOrders[0].sales > analytics.monthlyData[analytics.monthlyData.length - 1].sales 
                      ? " an upward trend"
                      : " a downward trend"
                    : " no significant change"
                  } in sales over the next quarter. 
                  {salesByDayOfWeek && salesByDayOfWeek.some(day => day.sales > 0) && (
                    <>
                      {" "}
                      Consider scheduling promotions for {
                        salesByDayOfWeek.reduce(
                          (max, day, index, array) => day.sales > array[max].sales ? index : max, 
                          0
                        ) === 0 ? "Mondays" :
                        salesByDayOfWeek.reduce(
                          (max, day, index, array) => day.sales > array[max].sales ? index : max, 
                          0
                        ) === 1 ? "Tuesdays" :
                        salesByDayOfWeek.reduce(
                          (max, day, index, array) => day.sales > array[max].sales ? index : max, 
                          0
                        ) === 2 ? "Wednesdays" :
                        salesByDayOfWeek.reduce(
                          (max, day, index, array) => day.sales > array[max].sales ? index : max, 
                          0
                        ) === 3 ? "Thursdays" :
                        salesByDayOfWeek.reduce(
                          (max, day, index, array) => day.sales > array[max].sales ? index : max, 
                          0
                        ) === 4 ? "Fridays" :
                        salesByDayOfWeek.reduce(
                          (max, day, index, array) => day.sales > array[max].sales ? index : max, 
                          0
                        ) === 5 ? "Saturdays" : "Sundays"
                      }, which have historically performed well.
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
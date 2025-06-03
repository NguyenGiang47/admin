// Giả lập dữ liệu
const stats = {
  totalProducts: 120,
  totalOrders: 87,
  totalCustomers: 45,
  totalRevenue: 58700000, // VNĐ
  monthlyRevenue: [5000000, 4200000, 6300000, 7000000, 8200000, 9600000, 10500000, 8500000, 7200000, 6800000, 7600000, 8300000],
};

// Cập nhật số liệu thống kê
document.getElementById("totalProducts").textContent = stats.totalProducts;
document.getElementById("totalOrders").textContent = stats.totalOrders;
document.getElementById("totalCustomers").textContent = stats.totalCustomers;
document.getElementById("totalRevenue").textContent = stats.totalRevenue.toLocaleString() + " VNĐ";

// Biểu đồ doanh thu
const ctx = document.getElementById("revenueChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
      "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
      "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ],
    datasets: [{
      label: "Doanh thu (VNĐ)",
      data: stats.monthlyRevenue,
      borderColor: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

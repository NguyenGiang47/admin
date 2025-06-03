// Mảng dữ liệu đơn hàng mẫu
let orders = [
    {
        id: 1,
        customer: "Nguyễn Văn A",
        date: "2025-06-01",
        total: 1200000,
        status: "Đang xử lý",
        details: [
            { name: "Áo sơ mi", quantity: 2, price: 300000 },
            { name: "Quần jean", quantity: 1, price: 600000 }
        ]
    },
    {
        id: 2,
        customer: "Trần Thị B",
        date: "2025-06-02",
        total: 850000,
        status: "Đã giao",
        details: [
            { name: "Áo thun", quantity: 1, price: 250000 },
            { name: "Váy công sở", quantity: 1, price: 600000 }
        ]
    }
];

// Hiển thị danh sách đơn hàng
function renderOrders(data) {
    const tbody = document.getElementById("orderTableBody");
    tbody.innerHTML = "";

    data.forEach(order => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>${order.total.toLocaleString()}đ</td>
            <td>${order.status}</td>
            <td>
                <button class="btn btn-view" onclick="viewOrder(${order.id})">Xem</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hiển thị chi tiết đơn hàng
function viewOrder(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const modal = document.getElementById("orderModal");
    const detailDiv = document.getElementById("orderDetails");
    detailDiv.innerHTML = `
        <p><strong>Khách hàng:</strong> ${order.customer}</p>
        <p><strong>Ngày đặt:</strong> ${order.date}</p>
        <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString()}đ</p>
        <p><strong>Trạng thái:</strong> ${order.status}</p>
        <hr>
        <h4>Sản phẩm:</h4>
        <ul>
            ${order.details.map(item => `
                <li>${item.name} - SL: ${item.quantity} - Đơn giá: ${item.price.toLocaleString()}đ</li>
            `).join("")}
        </ul>
    `;
    modal.style.display = "block";
}

// Tìm kiếm đơn hàng
document.getElementById("searchOrder").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = orders.filter(o =>
        o.customer.toLowerCase().includes(keyword) ||
        o.status.toLowerCase().includes(keyword)
    );
    renderOrders(filtered);
});

// Đóng modal
document.querySelector(".close-button").addEventListener("click", () => {
    document.getElementById("orderModal").style.display = "none";
});
document.querySelector(".cancel-button").addEventListener("click", () => {
    document.getElementById("orderModal").style.display = "none";
});

// Mặc định hiển thị ban đầu
renderOrders(orders);

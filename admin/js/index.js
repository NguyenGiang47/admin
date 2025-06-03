// js/trangchinh.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const totalOrdersTodayElem = document.getElementById('totalOrdersToday');
    const revenueTodayElem = document.getElementById('revenueToday');
    const newCustomersTodayElem = document.getElementById('newCustomersToday');

    // Chức năng Đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Trong ứng dụng thực tế:
            // 1. Xóa token xác thực hoặc dữ liệu phiên người dùng khỏi localStorage/sessionStorage.
            //    Ví dụ: localStorage.removeItem('authToken');
            // 2. Chuyển hướng người dùng về trang đăng nhập.
            alert('Bạn đã đăng xuất thành công!'); // Thông báo tạm thời
            window.location.href = 'login.html'; // Thay thế bằng đường dẫn tới trang đăng nhập của bạn
        });
    }

    // Hàm lấy và hiển thị dữ liệu tổng quan
    async function fetchDashboardStats() {
        // Đây là dữ liệu giả định. Trong thực tế, bạn sẽ gọi API từ backend tại đây.
        // Ví dụ: const response = await fetch('/api/dashboard/stats');
        //        const data = await response.json();

        // Dữ liệu giả định để hiển thị
        const data = {
            totalOrdersToday: 25,
            revenueToday: 7500000, // Giá trị số để dễ định dạng
            newCustomersToday: 8
        };

        // Cập nhật DOM với dữ liệu
        if (totalOrdersTodayElem) {
            totalOrdersTodayElem.textContent = data.totalOrdersToday;
        }
        if (revenueTodayElem) {
            // Định dạng tiền tệ Việt Nam Đồng
            revenueTodayElem.textContent = data.revenueToday.toLocaleString('vi-VN') + ' VNĐ';
        }
        if (newCustomersTodayElem) {
            newCustomersTodayElem.textContent = data.newCustomersToday;
        }

        // Tùy chọn: Xử lý lỗi nếu fetch thất bại
        // if (!response.ok) {
        //     console.error('Lỗi khi tải dữ liệu tổng quan:', response.statusText);
        //     alert('Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau.');
        // }

    }

    // Gọi hàm để tải dữ liệu khi trang được tải
    fetchDashboardStats();
});



// quản lý đơn hàng
document.getElementById('addOrderBtn').addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('orderModalTitle').innerText = 'Thêm đơn hàng mới';
    document.getElementById('orderForm').reset();
});

document.querySelectorAll('.close-button, .cancel-button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('orderModal').style.display = 'none';
    });
});

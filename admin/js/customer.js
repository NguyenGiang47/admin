// khachhang.js

document.addEventListener("DOMContentLoaded", () => {
  const customers = [
    { id: "C001", name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0912345678", address: "Hà Nội" },
    { id: "C002", name: "Trần Thị B", email: "b@gmail.com", phone: "0987654321", address: "Hồ Chí Minh" },
    { id: "C003", name: "Lê Văn C", email: "c@gmail.com", phone: "0909123456", address: "Đà Nẵng" },
  ];

  let editingCustomerId = null;

  const customerTableBody = document.getElementById("customerTableBody");
  const addCustomerBtn = document.getElementById("addCustomerBtn");
  const customerModal = document.getElementById("customerModal");
  const closeButtons = customerModal.querySelectorAll(".close-button, .cancel-button");
  const customerForm = document.getElementById("customerForm");

  const inputId = document.getElementById("customerId");
  const inputName = document.getElementById("customerName");
  const inputEmail = document.getElementById("customerEmail");
  const inputPhone = document.getElementById("customerPhone");
  const inputAddress = document.getElementById("customerAddress");
  const modalTitle = document.getElementById("modalTitle");

  const searchInput = document.getElementById("searchCustomer");

  // Hàm tạo ID tự động: C + số thứ tự 3 chữ số
  function generateCustomerId() {
    const maxId = customers.reduce((max, c) => {
      const num = parseInt(c.id.slice(1));
      return num > max ? num : max;
    }, 0);
    const newIdNum = maxId + 1;
    return `C${newIdNum.toString().padStart(3, "0")}`;
  }

  // Hàm hiển thị danh sách khách hàng
  function renderCustomers(data) {
    customerTableBody.innerHTML = "";
    if (data.length === 0) {
      customerTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Không có khách hàng nào</td></tr>`;
      return;
    }
    data.forEach(({ id, name, email, phone, address }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${address}</td>
        <td>
          <button class="btn btn-secondary edit-btn" data-id="${id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-secondary delete-btn" data-id="${id}"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      customerTableBody.appendChild(tr);
    });
  }

  // Mở modal thêm khách hàng mới
  addCustomerBtn.addEventListener("click", () => {
    editingCustomerId = null;
    modalTitle.textContent = "Thêm khách hàng mới";
    customerForm.reset();
    inputId.value = generateCustomerId();
    inputId.readOnly = true;
    showModal(customerModal);
  });

  // Hàm mở modal
  function showModal(modal) {
    modal.style.display = "block";
  }

  // Hàm đóng modal
  function closeModal(modal) {
    modal.style.display = "none";
  }

  // Đóng modal khi nhấn nút đóng hoặc hủy
  closeButtons.forEach((btn) =>
    btn.addEventListener("click", () => closeModal(customerModal))
  );

  // Đóng modal khi click ngoài nội dung modal
  window.addEventListener("click", (e) => {
    if (e.target === customerModal) {
      closeModal(customerModal);
    }
  });

  // Xử lý submit form thêm/sửa khách hàng
  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const id = inputId.value.trim();
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const phone = inputPhone.value.trim();
    const address = inputAddress.value.trim();

    // Kiểm tra hợp lệ cơ bản
    if (!name || !email || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (editingCustomerId) {
      // Sửa khách hàng
      const index = customers.findIndex((c) => c.id === editingCustomerId);
      if (index !== -1) {
        customers[index] = { id, name, email, phone, address };
        alert("Cập nhật khách hàng thành công!");
      }
    } else {
      // Thêm mới, kiểm tra trùng ID (ít khi xảy ra)
      if (customers.some((c) => c.id === id)) {
        alert("ID khách hàng đã tồn tại!");
        return;
      }
      customers.push({ id, name, email, phone, address });
      alert("Thêm khách hàng mới thành công!");
    }

    renderCustomers(customers);
    closeModal(customerModal);
  });

  // Xử lý sự kiện sửa và xóa trên bảng (event delegation)
  customerTableBody.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const id = target.getAttribute("data-id");
    if (target.classList.contains("edit-btn")) {
      // Sửa khách hàng
      const customer = customers.find((c) => c.id === id);
      if (customer) {
        editingCustomerId = id;
        modalTitle.textContent = "Chỉnh sửa khách hàng";
        inputId.value = customer.id;
        inputName.value = customer.name;
        inputEmail.value = customer.email;
        inputPhone.value = customer.phone;
        inputAddress.value = customer.address;
        inputId.readOnly = true;
        showModal(customerModal);
      }
    } else if (target.classList.contains("delete-btn")) {
      // Xóa khách hàng
      if (confirm(`Bạn có chắc muốn xóa khách hàng ${id}?`)) {
        const index = customers.findIndex((c) => c.id === id);
        if (index !== -1) {
          customers.splice(index, 1);
          renderCustomers(customers);
          alert("Xóa khách hàng thành công!");
        }
      }
    }
  });

  // Tìm kiếm khách hàng theo tên, email, điện thoại
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(keyword) ||
        c.email.toLowerCase().includes(keyword) ||
        c.phone.toLowerCase().includes(keyword)
    );
    renderCustomers(filtered);
  });

  // Hiển thị danh sách ban đầu
  renderCustomers(customers);
});

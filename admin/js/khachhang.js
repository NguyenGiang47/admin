
// DOM elements
const addCustomerBtn = document.getElementById('addCustomerBtn');
const searchInput = document.getElementById('searchCustomer');
const customerTableBody = document.getElementById('customerTableBody');
const customerModal = document.getElementById('customerModal');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.querySelector('.close-button');
const cancelBtn = document.querySelector('.cancel-button');
const customerForm = document.getElementById('customerForm');

let customers = [];
let editingIndex = -1;

// Open modal
addCustomerBtn.addEventListener('click', () => {
    editingIndex = -1;
    modalTitle.textContent = 'Thêm khách hàng mới';
    customerForm.reset();
    customerModal.style.display = 'flex';
});

// Close modal
closeModalBtn.addEventListener('click', () => customerModal.style.display = 'none');
cancelBtn.addEventListener('click', () => customerModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target == customerModal) customerModal.style.display = 'none';
});

// Save customer
customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newCustomer = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value
    };

    if (editingIndex === -1) {
        customers.push(newCustomer);
    } else {
        customers[editingIndex] = newCustomer;
    }

    renderCustomers(customers);
    customerModal.style.display = 'none';
});

// Render table
function renderCustomers(data) {
    customerTableBody.innerHTML = '';
    data.forEach((customer, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>
                <button class="btn btn-view" onclick="editCustomer(${index})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteCustomer(${index})">Xoá</button>
            </td>
        `;
        customerTableBody.appendChild(row);
    });
}

// Sửa khách hàng
window.editCustomer = function(index) {
    const customer = customers[index];
    editingIndex = index;
    modalTitle.textContent = 'Chỉnh sửa khách hàng';
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('customerPhone').value = customer.phone;
    document.getElementById('customerAddress').value = customer.address;
    customerModal.style.display = 'flex';
};

// Xoá khách hàng
window.deleteCustomer = function(index) {
    if (confirm('Bạn có chắc chắn muốn xoá khách hàng này không?')) {
        customers.splice(index, 1);
        renderCustomers(customers);
    }
};

// Tìm kiếm khách hàng
searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(keyword) ||
        c.email.toLowerCase().includes(keyword) ||
        c.phone.includes(keyword) ||
        c.address.toLowerCase().includes(keyword)
    );
    renderCustomers(filtered);
});

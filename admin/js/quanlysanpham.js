// js/quanlysanpham.js

document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu sản phẩm mẫu (tạm thời, sau này sẽ lấy từ API)
    let products = [
        { id: 1, name: 'Áo thun nam Polo Basic', price: 250000, quantity: 100, category: 'Áo Polo', image: 'imgpolo/ao-polo-nam-basic-dimonod.webp' },
        { id: 2, name: 'Quần Jeans Slim Fit', price: 400000, quantity: 50, category: 'Quần Jeans', image: 'https://via.placeholder.com/60x60/28a745/FFFFFF?text=Product2' },
        { id: 3, name: 'Áo khoác gió thể thao', price: 550000, quantity: 30, category: 'Áo Khoác', image: 'https://via.placeholder.com/60x60/ffc107/FFFFFF?text=Product3' },
        { id: 4, name: 'Giày sneaker trắng', price: 700000, quantity: 20, category: 'Giày', image: 'https://via.placeholder.com/60x60/dc3545/FFFFFF?text=Product4' },
    ];

    const productTableBody = document.getElementById('productTableBody');
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeButton = document.querySelector('.modal .close-button');
    const cancelButton = document.querySelector('.modal .cancel-button');
    const productForm = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productQuantityInput = document.getElementById('productQuantity');
    const productCategoryInput = document.getElementById('productCategory');
    const productImageInput = document.getElementById('productImage');
    const searchProductInput = document.getElementById('searchProduct');

    let isEditMode = false;
    let currentEditingProductId = null;

    // Hàm hiển thị sản phẩm ra bảng
    function renderProducts(filteredProducts = products) {
        productTableBody.innerHTML = ''; // Xóa nội dung cũ
        if (filteredProducts.length === 0) {
            productTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Không tìm thấy sản phẩm nào.</td></tr>';
            return;
        }

        filteredProducts.forEach(product => {
            const row = productTableBody.insertRow();
            row.dataset.productId = product.id; // Lưu trữ ID sản phẩm vào hàng
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString('vi-VN')} VNĐ</td>
                <td>${product.quantity}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/60x60/cccccc/000000?text=No+Image';"></td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
        });
    }

    // Hiển thị sản phẩm khi tải trang
    renderProducts();

    // Mở Modal "Thêm sản phẩm"
    addProductBtn.addEventListener('click', () => {
        isEditMode = false;
        modalTitle.textContent = 'Thêm sản phẩm mới';
        productForm.reset(); // Đặt lại form
        productIdInput.value = ''; // Đảm bảo ID trống khi thêm mới
        productModal.style.display = 'flex'; // Hiển thị modal
    });

    // Đóng Modal khi click nút X
    closeButton.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Đóng Modal khi click nút Hủy
    cancelButton.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Đóng Modal khi click bên ngoài nội dung modal
    window.addEventListener('click', (event) => {
        if (event.target == productModal) {
            productModal.style.display = 'none';
        }
    });

    // Xử lý submit form (Thêm hoặc Sửa sản phẩm)
    productForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const name = productNameInput.value.trim();
        const price = parseInt(productPriceInput.value);
        const quantity = parseInt(productQuantityInput.value);
        const category = productCategoryInput.value.trim();
        const image = productImageInput.value.trim();

        if (!name || isNaN(price) || isNaN(quantity) || !category || !image) {
            alert('Vui lòng điền đầy đủ và đúng định dạng các trường!');
            return;
        }

        if (isEditMode) {
            // Chế độ sửa sản phẩm
            const productIdToEdit = parseInt(productIdInput.value);
            const productIndex = products.findIndex(p => p.id === productIdToEdit);
            if (productIndex !== -1) {
                products[productIndex] = {
                    id: productIdToEdit,
                    name,
                    price,
                    quantity,
                    category,
                    image
                };
                alert('Cập nhật sản phẩm thành công!');
            } else {
                alert('Không tìm thấy sản phẩm để cập nhật.');
            }
        } else {
            // Chế độ thêm sản phẩm
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            const newProduct = {
                id: newId,
                name,
                price,
                quantity,
                category,
                image
            };
            products.push(newProduct);
            alert('Thêm sản phẩm mới thành công!');
        }

        productModal.style.display = 'none'; // Đóng modal
        renderProducts(); // Render lại bảng
    });

    // Xử lý sự kiện click trên bảng (Sửa hoặc Xóa sản phẩm)
    productTableBody.addEventListener('click', (event) => {
        const target = event.target;
        const productId = parseInt(target.dataset.id || target.closest('button')?.dataset.id); // Lấy ID từ nút hoặc phần tử cha gần nhất

        if (target.classList.contains('edit-btn') || target.closest('.edit-btn')) {
            // Nút sửa được click
            isEditMode = true;
            currentEditingProductId = productId;
            modalTitle.textContent = 'Sửa thông tin sản phẩm';

            const productToEdit = products.find(p => p.id === productId);
            if (productToEdit) {
                productIdInput.value = productToEdit.id;
                productNameInput.value = productToEdit.name;
                productPriceInput.value = productToEdit.price;
                productQuantityInput.value = productToEdit.quantity;
                productCategoryInput.value = productToEdit.category;
                productImageInput.value = productToEdit.image;
                productModal.style.display = 'flex'; // Hiển thị modal
            } else {
                alert('Không tìm thấy sản phẩm để sửa.');
            }
        } else if (target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
            // Nút xóa được click
            if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ID: ${productId} này không?`)) {
                products = products.filter(p => p.id !== productId);
                renderProducts(); // Render lại bảng sau khi xóa
                alert('Xóa sản phẩm thành công!');
            }
        }
    });

    // Chức năng tìm kiếm sản phẩm
    searchProductInput.addEventListener('input', () => {
        const searchTerm = searchProductInput.value.toLowerCase().trim();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.id.toString().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
});
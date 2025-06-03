let discounts = [];

function renderDiscounts(data) {
    const tbody = document.getElementById("discountTableBody");
    tbody.innerHTML = "";

    data.forEach((d, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${d.code}</td>
            <td>${d.value}%</td>
            <td>${d.start}</td>
            <td>${d.end}</td>
            <td>
                <button class="btn btn-view" onclick="editDiscount(${index})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteDiscount(${index})">Xoá</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Mở modal
document.getElementById("addDiscountBtn").addEventListener("click", () => {
    document.getElementById("discountForm").reset();
    document.getElementById("modalTitle").textContent = "Thêm mã giảm giá";
    document.getElementById("discountId").value = "";
    document.getElementById("discountModal").style.display = "flex";
});

// Đóng modal
document.querySelector(".close-button").addEventListener("click", () => {
    document.getElementById("discountModal").style.display = "none";
});
document.querySelector(".cancel-button").addEventListener("click", () => {
    document.getElementById("discountModal").style.display = "none";
});

// Tìm kiếm
document.getElementById("searchDiscount").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = discounts.filter(d =>
        d.code.toLowerCase().includes(keyword)
    );
    renderDiscounts(filtered);
});

// Thêm/sửa mã
document.getElementById("discountForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("discountId").value;
    const code = document.getElementById("discountCode").value;
    const value = document.getElementById("discountValue").value;
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    const data = { code, value, start, end };

    if (id === "") {
        discounts.push(data);
    } else {
        discounts[parseInt(id)] = data;
    }

    renderDiscounts(discounts);
    document.getElementById("discountModal").style.display = "none";
});

function editDiscount(index) {
    const d = discounts[index];
    document.getElementById("discountId").value = index;
    document.getElementById("discountCode").value = d.code;
    document.getElementById("discountValue").value = d.value;
    document.getElementById("startDate").value = d.start;
    document.getElementById("endDate").value = d.end;
    document.getElementById("modalTitle").textContent = "Cập nhật mã";
    document.getElementById("discountModal").style.display = "flex";
}

function deleteDiscount(index) {
    if (confirm("Bạn có chắc muốn xoá mã này không?")) {
        discounts.splice(index, 1);
        renderDiscounts(discounts);
    }
}

// Hiển thị mặc định
renderDiscounts(discounts);

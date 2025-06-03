// Dữ liệu phản hồi giả lập
let feedbacks = [
  { name: "Nguyễn Văn A", email: "a@gmail.com", content: "Sản phẩm rất tốt!", date: "2025-06-01" },
  { name: "Trần Thị B", email: "b@gmail.com", content: "Giao hàng hơi chậm.", date: "2025-06-02" },
  { name: "Lê Văn C", email: "c@gmail.com", content: "Dịch vụ khách hàng tuyệt vời!", date: "2025-06-01" }
];

// Hiển thị phản hồi
function renderFeedback(data) {
  const tbody = document.getElementById("feedbackList");
  tbody.innerHTML = "";

  data.forEach((fb, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fb.name}</td>
      <td>${fb.email}</td>
      <td>${fb.content}</td>
      <td>${fb.date}</td>
      <td><button class="delete-btn" onclick="deleteFeedback(${index})">Xoá</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Xoá phản hồi
function deleteFeedback(index) {
  if (confirm("Bạn có chắc muốn xoá phản hồi này không?")) {
    feedbacks.splice(index, 1);
    renderFeedback(feedbacks);
  }
}

// Tìm kiếm phản hồi
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = feedbacks.filter(fb =>
    fb.name.toLowerCase().includes(keyword) || fb.email.toLowerCase().includes(keyword)
  );
  renderFeedback(filtered);
});

renderFeedback(feedbacks);

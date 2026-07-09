# AI Development Rules

Tài liệu này quy định cách AI được phép chỉnh sửa project.

AI phải đọc tài liệu này trước khi thực hiện bất kỳ thay đổi nào.

---

# Quy tắc chung

Không tự ý thay đổi kiến trúc.

Không tự ý đổi tên file.

Không tự ý đổi tên thư mục.

Không tự ý tạo thư viện mới.

Không tự ý thay đổi cấu trúc dữ liệu.

Không tự ý thay đổi giao diện nếu không được yêu cầu.

---

# Quy trình làm việc

Bước 1

Đọc:

- ARCHITECTURE.md
- ROADMAP.md
- CHANGELOG.md

Bước 2

Phân tích yêu cầu.

Bước 3

Nếu cần sửa nhiều file phải liệt kê trước.

Chờ xác nhận.

Sau đó mới code.

---

# Khi sửa code

Luôn:

- Giữ code dễ đọc.
- Giữ coding style hiện tại.
- Hạn chế code lặp.
- Ưu tiên hàm nhỏ.
- Comment khi logic phức tạp.

---

# Không được phép

Không viết lại toàn bộ project.

Không đổi framework.

Không chuyển sang React.

Không chuyển sang TypeScript.

Không thêm Backend.

Không thêm Database.

---

# Khi hoàn thành

Luôn:

Xuất đầy đủ file đã sửa.

Không chỉ xuất đoạn code.

Cập nhật CHANGELOG.md.

Nếu thay đổi kiến trúc:

Cập nhật ARCHITECTURE.md.

Nếu hoàn thành Phase:

Cập nhật ROADMAP.md.

---

# Nếu phát hiện vấn đề

Không tự ý sửa.

Hãy báo:

- Vấn đề
- Nguyên nhân
- File liên quan
- Đề xuất

Chờ xác nhận rồi mới thực hiện.

---

# Mục tiêu

Ưu tiên:

Ổn định

>

Dễ bảo trì

>

Hiệu năng

>

Thêm tính năng

# Reading Order

Trước khi thực hiện bất kỳ yêu cầu nào, AI phải đọc tài liệu theo đúng thứ tự sau:

1. PROJECT_CONTEXT.md
2. ARCHITECTURE.md
3. AI_RULES.md
4. ROADMAP.md
5. CHANGELOG.md

Chỉ sau khi đọc xong mới được phân tích hoặc chỉnh sửa source code.
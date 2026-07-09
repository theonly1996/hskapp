# HSK App - Architecture

## 1. Mục tiêu dự án

Đây là ứng dụng học tiếng Trung HSK dành cho việc tự học mỗi ngày.

Mục tiêu:

- Học 5–10 phút mỗi ngày.
- Mở app là biết hôm nay cần học gì.
- Ghi nhớ lâu bằng Spaced Repetition.
- Không cần Internet.
- Chạy hoàn toàn trên GitHub Pages.
- Dễ bảo trì và mở rộng.

Ứng dụng không hướng tới việc trở thành từ điển hay khóa học trực tuyến.

Ứng dụng là công cụ học tập hằng ngày.

---

# 2. Triết lý thiết kế

Luôn ưu tiên:

Đơn giản > Đẹp

Nhanh > Nhiều tính năng

Ít thao tác > Nhiều menu

Học được mỗi ngày > Có nhiều nội dung

---

# 3. Công nghệ

Frontend:

- HTML
- CSS
- JavaScript (Vanilla)

Không sử dụng:

- React
- Vue
- Angular
- Backend
- Database

Dữ liệu lưu bằng LocalStorage.

---

# 4. Kiến trúc dữ liệu

Dữ liệu HSK được tách riêng theo cấp độ.

Ví dụ:

HSK1

HSK2

HSK3

HSK4

Grammar

Stories

Dictionary

Không được nhúng dữ liệu trực tiếp vào component.

---

# 5. LocalStorage

Toàn bộ tiến độ học được lưu trên máy người dùng.

Ví dụ:

- bookmarks
- learnedWords
- reviewQueue
- settings
- statistics

Không được lưu dữ liệu trùng lặp.

---

# 6. Mục tiêu trải nghiệm

Người dùng mở app.

↓

Biết hôm nay cần học gì.

↓

Học.

↓

Ôn.

↓

Thoát.

Không cần suy nghĩ nên vào menu nào.

---

# 7. Quy tắc phát triển

Không sửa giao diện nếu không cần.

Không thêm thư viện ngoài.

Không viết lại project.

Không phá cấu trúc dữ liệu hiện tại.

Luôn ưu tiên code dễ đọc.

Luôn ưu tiên khả năng mở rộng.

---

# 8. Ưu tiên phát triển

1. Refactor

2. Daily Review

3. Progress

4. Spaced Repetition

5. Statistics

6. Quiz

7. Grammar

8. Stories

9. AI Example Sentence

10. Đồng bộ dữ liệu (nếu cần)

---

# 9. Nguyên tắc khi AI sửa code

AI chỉ được sửa đúng phạm vi của từng Phase.

Nếu cần sửa nhiều file phải liệt kê trước.

Không được tự ý thay đổi kiến trúc.

Luôn xuất đầy đủ file đã sửa.

Luôn cập nhật CHANGELOG sau khi hoàn thành.
# Phase 1A Design
## Unified Learning Progress

Version: 0.1.0

Status: Draft

---

# Mục tiêu

Thống nhất toàn bộ dữ liệu tiến độ học về một nguồn duy nhất (Single Source of Truth).

Hiện tại ứng dụng đang có nhiều nơi tự lưu tiến độ bằng LocalStorage.

Điều này sẽ gây khó khăn khi triển khai:

- Daily Learning
- Progress Tracking
- Spaced Repetition (SRS)
- Statistics

Sau Phase 1A, mọi tính năng phải sử dụng chung một nguồn dữ liệu.

---

# Phạm vi

Chỉ refactor cách quản lý Progress.

Không thay đổi giao diện.

Không thêm tính năng.

Không thay đổi trải nghiệm người dùng.

---

# Hiện trạng

Progress hiện được lưu ở nhiều nơi.

Ví dụ:

App.js

↓

progress

QuizTab.js

↓

translation progress

LocalStorage

↓

nhiều key khác nhau

Điều này tạo ra nhiều nguồn dữ liệu khác nhau.

---

# Kiến trúc sau khi Refactor

App

↓

Progress Store

↓

LocalStorage

↓

Overview

Quiz

Flashcard

Dictionary

Grammar

Các tab chỉ đọc và cập nhật Progress Store.

Không tab nào được tự ghi LocalStorage.

---

# Single Source of Truth

Progress chỉ tồn tại tại một nơi.

App.js

↓

progress

Các component khác nhận progress thông qua props hoặc custom hook.

---

# LocalStorage

Chỉ còn một key chính.

Ví dụ:

hsk_learning_progress

Cấu trúc sẽ được giữ ổn định.

Các key khác nếu trùng chức năng sẽ được hợp nhất hoặc loại bỏ sau khi xác nhận.

---

# Data Flow

User Action

↓

Component

↓

Update Progress

↓

Save LocalStorage

↓

Re-render UI

Không component nào được ghi LocalStorage trực tiếp.

---

# File dự kiến sửa

- App.js
- QuizTab.js
- utils.js (nếu cần)
- data.js (chỉ khi thật sự cần)

---

# File không được sửa

- hsk1.js
- hsk2.js
- hsk3.js
- hsk4.js
- hsk_curriculum.js
- hsk_grammar.js
- hsk_stories.js

Không thay đổi dữ liệu học.

---

# Rủi ro

Nếu refactor sai:

- mất bookmark
- mất progress
- sai thống kê
- quiz không đồng bộ

Đây là dữ liệu thật của người dùng.

Ưu tiên an toàn hơn tốc độ.

---

# Kế hoạch Rollback

Nếu xảy ra lỗi:

1. Khôi phục logic cũ.
2. Không xóa LocalStorage cũ.
3. Giữ khả năng đọc dữ liệu cũ.
4. Chỉ chuyển đổi dữ liệu khi đã xác nhận thành công.

---

# Tiêu chí hoàn thành

- Chỉ còn một nguồn Progress.
- Không còn LocalStorage trùng chức năng.
- Không thay đổi giao diện.
- Không mất dữ liệu người dùng.
- Không ảnh hưởng các tính năng hiện tại.

---

# Sau Phase 1A

Tiếp tục:

Phase 1B

Data Refactor

- Tách dữ liệu khỏi utils.js
- Tách hskProData khỏi data.js

Sau đó:

Phase 1C

State Refactor

- Chia App.js thành các domain state
- Chuẩn bị cho Daily Learning

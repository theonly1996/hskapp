# AI Development Rules

Version: 2.0

Tài liệu này quy định cách AI được phép làm việc với project.

AI phải đọc tài liệu này trước khi thực hiện bất kỳ thay đổi nào.

---

# Mục tiêu

Ưu tiên theo thứ tự:

1. Ổn định (Stability)
2. Dễ bảo trì (Maintainability)
3. Kiến trúc nhất quán (Architecture Consistency)
4. Hiệu năng (Performance)
5. Thêm tính năng (New Features)

---

# Reading Order

Trước khi phân tích hoặc chỉnh sửa source code, AI phải đọc tài liệu theo đúng thứ tự sau:

1. README.md
2. PROJECT_CONTEXT.md
3. ARCHITECTURE.md
4. AI_RULES.md
5. ROADMAP.md
6. CHANGELOG.md

Nếu project đang thực hiện một Phase:

Tiếp tục đọc:

- PHASE_xx_DESIGN.md
- Audit Report mới nhất
- Technical Review (nếu có)

Sau đó mới được đọc source code.

Không được bỏ qua bất kỳ tài liệu nào.

---

# Quy tắc chung

Không tự ý thay đổi kiến trúc.

Không tự ý đổi tên file.

Không tự ý đổi tên thư mục.

Không tự ý thêm thư viện.

Không tự ý thay đổi cấu trúc dữ liệu.

Không tự ý thay đổi giao diện nếu không được yêu cầu.

Không tự ý đổi coding style của project.

Không tự ý refactor ngoài phạm vi yêu cầu.

---

# Scope Control

AI chỉ được phép chỉnh sửa các file nằm trong phạm vi đã được phê duyệt.

Nếu phát hiện vấn đề ở file khác:

KHÔNG được sửa.

KHÔNG được mở rộng phạm vi.

Phải ghi nhận thành:

- Finding
- Technical Debt

Sau đó chờ tạo Phase mới.

Không được Scope Creep.

---

# Quy trình làm việc

## Bước 1

Đọc đầy đủ tài liệu.

## Bước 2

Hiểu kiến trúc hiện tại.

## Bước 3

Phân tích yêu cầu.

## Bước 4

Nếu thay đổi ảnh hưởng nhiều file hoặc Business Logic:

Phải tạo Design trước.

## Bước 5

Liệt kê:

- File sẽ sửa
- Lý do
- Phạm vi

Chờ người dùng xác nhận.

## Bước 6

Mới được code.

---

# Design First

Nếu thay đổi:

- Business Logic
- Architecture
- Service Layer
- Store
- Data Flow
- Public API

AI phải làm theo quy trình:

Design

↓

Review

↓

Approval

↓

Implementation

↓

Audit

Không được bỏ qua bước Design.

---

# Khi sửa code

Luôn:

- Giữ coding style hiện tại.
- Giữ code dễ đọc.
- Ưu tiên hàm nhỏ.
- Hạn chế duplicate.
- Comment khi logic phức tạp.
- Không sửa code không liên quan.

Mỗi thay đổi phải có phạm vi rõ ràng.

---

# Không được phép

Không viết lại toàn bộ project.

Không đổi Framework.

Không chuyển sang React.

Không chuyển sang TypeScript.

Không thêm Backend.

Không thêm Database.

Không đổi cấu trúc thư mục.

Không đổi Public API nếu chưa được phê duyệt.

Không thêm Dependency nếu chưa được phê duyệt.

---

# Regression Safety

Mọi thay đổi phải đảm bảo:

- Public API giữ nguyên (trừ khi được duyệt).
- Không làm thay đổi UI ngoài yêu cầu.
- Không làm thay đổi hành vi cũ.
- Không phá vỡ dữ liệu cũ.
- Không tạo side effect.

Nếu có Regression Risk:

Phải báo trước.

---

# Audit

Sau mỗi Phase:

AI phải thực hiện Final Audit.

Audit tối thiểu phải bao gồm:

## Architecture

- Dependency
- Layer
- Data Flow

## Business Logic

- Duplicate Logic
- Single Source of Truth

## Regression

- Public API
- UI
- Data
- Store

## Scope

- Có file ngoài phạm vi bị sửa không

## Technical Debt

- Có phát hiện mới không

Nếu phát hiện lỗi ngoài phạm vi:

Không sửa.

Chỉ ghi nhận.

---

# Technical Debt

Nếu phát hiện:

- Duplicate Logic
- Architecture Issue
- Code Smell
- Performance Issue
- Design Issue

AI phải báo:

- Mô tả
- Nguyên nhân
- File liên quan
- Ảnh hưởng
- Đề xuất

Không được tự ý sửa.

Nếu cần:

Đề xuất tạo Phase mới.

---

# Khi hoàn thành

Luôn:

Xuất đầy đủ file đã sửa.

Không chỉ xuất đoạn code.

Cập nhật:

- CHANGELOG.md

Nếu thay đổi kiến trúc:

- ARCHITECTURE.md

Nếu hoàn thành Phase:

- ROADMAP.md

Nếu phát hiện Technical Debt:

- Ghi vào Audit Report.

---

# Nếu phát hiện vấn đề

Không tự ý sửa.

Hãy báo:

- Vấn đề
- Nguyên nhân
- File liên quan
- Mức độ ảnh hưởng
- Đề xuất

Chờ xác nhận rồi mới thực hiện.

---

# Definition of Done

Một Phase chỉ được coi là hoàn thành khi:

✓ Code hoàn thành

✓ Review hoàn thành

✓ Final Audit PASS

✓ Không còn Blocking Issue

✓ Regression PASS

✓ Tài liệu được cập nhật

✓ CHANGELOG được cập nhật

✓ ROADMAP được cập nhật (nếu cần)

Nếu còn Blocking Issue:

Phase chưa được đóng.

---

# AI Working Principle

AI phải ưu tiên:

Đúng phạm vi

>

Đúng kiến trúc

>

An toàn

>

Tối ưu

Không được đánh đổi sự ổn định để lấy tối ưu nhỏ.

Khi không chắc chắn:

Dừng lại.

Báo cáo.

Chờ xác nhận.

Không tự ý quyết định.
# PROJECT_BASELINE.md

Version: 1.1
Updated: 2026-07-09

---

# Project Baseline

Tài liệu này là điểm bắt đầu cho mọi AI session mới.

**Đọc file này trước**, sau đó tiếp tục theo đúng thứ tự trong `docs/HANDOFF.md`.

Mục tiêu của file này là giúp AI hiểu nhanh trạng thái hiện tại của project trước khi đọc toàn bộ tài liệu.

---

# Current Status

Project Version:

**v0.4.0**

Current Phase:

**Phase 1B — Completed**

Next Phase:

**Phase 2 — Daily Learning (chưa bắt đầu, chưa có Design)**

---

# Current Architecture

Kiến trúc hiện tại đã hoàn tất refactor của Phase 1A.

Luồng dữ liệu chuẩn:

```
Component

↓

ProgressService

↓

ProgressStore

↓

LocalStorage
```

Component **không được phép** truy cập trực tiếp LocalStorage cho các domain thuộc Progress.

---

# Progress Domains

Phase 1A đã thống nhất 5 domain:

* Vocabulary Progress
* Lesson Progress
* Bookmark
* Study Activity
* Backup

Tất cả đều đi qua:

```
ProgressService

↓

ProgressStore
```

---

# Public APIs

ProgressStore:

* Đã ổn định.
* Không thay đổi API nếu không có Design mới.

ProgressService:

* Là Business Layer duy nhất.
* Component chỉ gọi qua ProgressService.

---

# Completed Work

Đã hoàn thành:

* ProgressStore
* ProgressService
* Migration App.js
* Migration OverviewTab
* Migration QuizTab
* Final Audit (Phase 1A)
* Documentation Sync (Phase 1A)
* StatisticsService (Phase 1B)
* Hợp nhất Vocabulary Statistics vào StatisticsService (Phase 1B)
* Final Audit (Phase 1B)
* Documentation Sync (Phase 1B)

Phase 1A được coi là đã đóng.
Phase 1B được coi là đã đóng.

---

# Remaining Technical Debt

Các mục dưới đây **không phải bug**.

Đây là Technical Debt được chấp nhận để xử lý ở các Phase sau.

1. ~~statisticsService chưa được tạo.~~ → Đã xử lý ở Phase 1B.

2. ~~Logic thống kê đang tồn tại ở hai nơi.~~ → Đã hợp nhất ở Phase 1B
   (ProgressService + OverviewTab). Còn một bản sao thứ 3 chưa xử lý, xem
   mục 6 bên dưới.

3. Một số API của ProgressService chưa được sử dụng.

4. Bookmark của Grammar vẫn dùng LocalStorage riêng.

5. Settings và Flashcard Custom Data chưa thuộc ProgressStore.

6. (Mới, ghi nhận ở Final Audit Phase 1B) `FlashcardTab.getLessonStats()`
   (js/tabs/FlashcardTab.js, dòng 289-301) tự tính lại
   mastered/learning/unlearned/percent, là bản sao thứ 3 của công thức
   Vocabulary Statistics, chưa hợp nhất vào StatisticsService. Xem chi
   tiết: docs/audits/TECHNICAL_REVIEW_FLASHCARD_STATS.md.

Không xử lý các mục này nếu không nằm trong Scope của Phase hiện tại.

---

# Non-Negotiable Rules

Luôn tuân thủ:

* docs/AI_RULES.md
* docs/ARCHITECTURE.md
* docs/HANDOFF.md

Đặc biệt:

* Không thay đổi UI nếu Design không yêu cầu.
* Không đổi LocalStorage key.
* Không đổi Public API.
* Không refactor ngoài phạm vi.
* Không tự ý mở rộng scope.

---

# Development Workflow

Mọi Phase phải tuân thủ quy trình:

```
Design

↓

Review

↓

Approve

↓

Implementation

↓

Audit

↓

Documentation Sync

↓

Close Phase
```

Không được bỏ qua bất kỳ bước nào.

---

# Source of Truth

Khi có mâu thuẫn giữa các tài liệu:

1. CHANGELOG.md
2. PHASE_X_PROGRESS.md
3. PHASE_X_DESIGN.md
4. HANDOVER.md
5. PROJECT_STATUS.md

Nếu có xung đột, ưu tiên theo đúng thứ tự trên.

---

# Before Writing Any Code

AI phải:

1. Đọc PROJECT_BASELINE.md.

2. Đọc HANDOFF.md.

3. Đọc tài liệu theo đúng thứ tự.

4. Review source code.

5. Xác nhận đã hiểu kiến trúc.

6. Chờ Project Owner phê duyệt trước khi code.

---

# Current Objective

Phase 1B đã hoàn thành và đã PASS Final Audit (2026-07-09).

Repository hiện được coi là stable.

Nhiệm vụ tiếp theo là:

Chờ Project Owner phê duyệt Phase mới (ví dụ: xử lý Technical Debt tại
`FlashcardTab.getLessonStats()`, hoặc bắt đầu Phase 2 theo ROADMAP.md).

Không được bắt đầu implementation của bất kỳ Phase nào nếu chưa được phê duyệt.

---

# End of Baseline
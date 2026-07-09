# HSK App - Changelog

Tài liệu này ghi lại tất cả thay đổi của dự án.

Mỗi lần hoàn thành một Phase hoặc sửa một tính năng đều phải cập nhật.

---

# Version 0.1.0

Ngày:

## Thay đổi

Khởi tạo tài liệu dự án.

### Thêm

- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- docs/CHANGELOG.md

### Sửa

Không có.

### Xóa

Không có.

### Ghi chú

Bắt đầu chuẩn hóa quy trình phát triển.

---

# Version 0.2.0

Ngày: 2026-07-09

### Mục tiêu

Phase 1A - Step 3: Đưa Lesson Progress (OverviewTab.js, QuizTab.js) vào
ProgressStore/ProgressService, hoàn tất Single Source of Truth cho toàn bộ
dữ liệu Progress. Không đổi UI, không đổi schema, không đổi LocalStorage key.

### File đã sửa

- js/store/progressStore.js

- js/services/progressService.js

- js/tabs/OverviewTab.js

- js/tabs/QuizTab.js

- docs/PHASE_1A_PROGRESS.md

### File mới

Không có.

### Tính năng

- ProgressService bổ sung nhóm API Lesson Progress: getAllLessonProgress,
  syncLessonProgress, toggleLessonProgress, recordLessonScore.

### Refactor

- OverviewTab.js: bỏ toàn bộ localStorage.getItem/setItem cho
  hskpro_translation_progress_v1, chuyển sang gọi
  window.ProgressService.syncLessonProgress / toggleLessonProgress.

- QuizTab.js: bỏ toàn bộ localStorage.getItem/setItem cho
  hskpro_translation_progress_v1, chuyển sang gọi
  window.ProgressService.getAllLessonProgress / recordLessonScore.

- ProgressStore.markLessonComplete: bổ sung tham số `meta` (level, title)
  tùy chọn dùng khi tạo entry mới, để giữ đúng hành vi saveTranslationScore
  cũ của QuizTab.js. Bổ sung replaceAllLessonProgress dùng cho việc đồng bộ
  danh sách mặc định.

### Bug Fix

Không có.

### Breaking Change

Không.

### Ghi chú

Key `hskpro_active_translation_lesson_id` (tín hiệu điều hướng chuyển tab
từ Dashboard sang bài Quiz) không thuộc schema Lesson Progress của Phase 1A
nên được giữ nguyên như hiện tại, ngoài phạm vi Step 3.

---

# Version 0.2.1

Ngày: 2026-07-09

### Mục tiêu

Sửa race-case đã phát hiện trong audit Phase 1A - Step 3:
`ProgressService.recordLessonScore()` khi Lesson Progress Store đang rỗng
tạo entry đơn lẻ thay vì seed toàn bộ `defaultProgress`, gây lệch hành vi
so với `saveTranslationScore` cũ trong trường hợp QuizTab được truy cập
trước OverviewTab.

### File đã sửa

- js/services/progressservice.js

### File mới

Không có.

### Tính năng

Không có.

### Refactor

- `recordLessonScore(lessonId, score, meta)`: nếu
  `ProgressStore.getAllLessonProgress()` trả về rỗng, seed Store bằng
  `window.hskProData.defaultProgress` (qua `ProgressStore.replaceAllLessonProgress`)
  trước khi gọi `ProgressStore.markLessonComplete`. Chỉ dùng lại các API
  công khai sẵn có của ProgressStore/ProgressService, không thêm/xóa API
  nào. Không đổi UI, không đổi call site trong QuizTab.js.

### Bug Fix

- Loại bỏ race-case: kết quả LocalStorage cuối cùng khi Store rỗng nay
  giống hệt implementation cũ (đã xác minh bằng mô phỏng Node so sánh
  byte-for-byte hai luồng cũ/mới).

### Breaking Change

Không.

### Ghi chú

Public API của ProgressStore và ProgressService giữ nguyên hoàn toàn so
với sau Step 3 (18 hàm mỗi bên, không đổi tên/chữ ký).

---

# Version 0.3.0

Ngày: 2026-07-09

### Mục tiêu

Phase 1A - Step 4: Final Audit. Kiểm tra lại toàn bộ source code sau Step 3,
xác nhận không còn component nào truy cập LocalStorage trực tiếp cho 5
domain thuộc Progress (Vocabulary Progress, Lesson Progress, Bookmark,
Study Activity, Backup), kiểm tra dead code, API cũ/không dùng, và tính
tuân thủ Single Source of Truth. Không sửa source code trong bước này.

### File đã sửa

Không có (chỉ audit, không đổi source code).

### File mới

- docs/AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md

### Tính năng

Không có.

### Refactor

Không có.

### Bug Fix

Không có (vấn đề case-mismatch tên file trong index.html phát hiện ở bản
audit trước đã được xử lý riêng, ngoài phạm vi thay đổi tài liệu này).

### Breaking Change

Không.

### Ghi chú

Kết quả Final Audit: không phát hiện vấn đề Blocking. Ghi nhận 5 mục
Technical Debt (thiếu statisticsService.js, logic thống kê vocabulary bị
viết trùng ở OverviewTab.js, 6 hàm ProgressService chưa được dùng, Bookmark
bị phân mảnh 2 cơ chế, domain Settings/Flashcard custom data vẫn dùng
localStorage trực tiếp) và một số Documentation Issues (đã đồng bộ trong
đợt cập nhật tài liệu này). Chi tiết đầy đủ trong
docs/AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md.

Phase 1A được xem là hoàn thành từ thời điểm này (2026-07-09).

---

# Template

## Version x.x.x

Ngày:

### Mục tiêu

...

### File đã sửa

-

-

-

### File mới

-

-

### Tính năng

-

-

### Refactor

-

-

### Bug Fix

-

-

### Breaking Change

Có / Không

Nếu có hãy mô tả.

### Ghi chú

...
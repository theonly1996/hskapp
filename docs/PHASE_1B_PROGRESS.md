# Phase 1B Progress

## Step 1
- [x] StatisticsService.js (mới) — calculateVocabularyStats, calculateVocabularyStatsByLevel
- [x] index.html — thêm script StatisticsService.js trước ProgressService.js

## Step 2
- [x] ProgressService.getVocabularyStatistics — uỷ quyền tính toán sang StatisticsService
- [x] ProgressService.getVocabularyStatisticsByLevel (mới)

## Step 3
- [x] OverviewTab.levelStats — chỉ còn gọi ProgressService.getVocabularyStatisticsByLevel

## Step 4
- [x] Final audit (repository-wide, không chỉ các file đã sửa)
- [x] Regression check (UI, Public API ProgressService/ProgressStore, output số liệu)

Ngày hoàn thành Step 4: 2026-07-09

Báo cáo Final Audit: docs/audits/AUDIT_REPORT_PHASE_1B_FINAL.md

---

## Phase 1B: ✅ Completed (2026-07-09)

Không có vấn đề Blocking. Phát hiện thêm 1 Technical Debt mới ngoài phạm
vi Phase 1B: `FlashcardTab.getLessonStats()` (js/tabs/FlashcardTab.js,
dòng 289-301) tự tính lại mastered/learning/unlearned, chưa hợp nhất vào
StatisticsService. File này nằm trong danh sách "không được phép sửa" của
Phase 1B nên không được xử lý ở đây. Xem chi tiết trong
docs/audits/TECHNICAL_REVIEW_FLASHCARD_STATS.md và
docs/audits/AUDIT_REPORT_PHASE_1B_FINAL.md. Cần một Phase riêng
(Design → Review → Approve → Implement → Audit) trong tương lai nếu được
phê duyệt.
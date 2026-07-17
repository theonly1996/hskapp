# Phase 1C Progress

## Step 1
- [x] StatisticsService.js — thêm calculateVocabularyStatsForSubset(progress, words, wordIds)

## Step 2
- [x] ProgressService.getVocabularyStatisticsForSubset(words, wordIds) — điều phối Store → StatisticsService

## Step 3
- [x] FlashcardTab.getLessonStats(wordIds) — không còn tự tính, chỉ còn gọi ProgressService.getVocabularyStatisticsForSubset

## Step 4
- [x] Final audit (repository-wide, không chỉ 3 file đã sửa)
- [x] Regression check (UI 3 vị trí trong FlashcardTab, Public API ProgressService/ProgressStore/StatisticsService, edge case total = 0)

Ngày hoàn thành Step 4: 2026-07-10

Báo cáo Final Audit: docs/audits/AUDIT_REPORT_PHASE_1C_FINAL.md

---

## Phase 1C: ✅ Completed (2026-07-10)

Không có Blocking issue về source code. Repository-wide grep xác nhận
`mastered++`/`learning++`/`unlearned++` chỉ còn tồn tại trong
`StatisticsService.js` — không còn Component hay Service nào khác tự
viết lại công thức tính Vocabulary Statistics. Technical Debt duy nhất
của Phase 1B (`FlashcardTab.getLessonStats`) đã được xử lý xong.

Final Audit có ghi nhận 2 finding về tài liệu, xử lý như sau:

1. `docs/PHASE_1C_DESIGN.md` (Status: Draft) — đã được Project Owner xác
   nhận Approve, cập nhật thành `Status: Approved Design` trong đợt
   Documentation Sync này.
2. `README.md` và `docs/ROADMAP.md` có dấu hiệu nội dung không đúng —
   **tạm thời giữ nguyên**, chưa đủ bằng chứng kết luận, chờ điều tra
   riêng theo quyết định của Project Owner (ngoài phạm vi Documentation
   Sync này).

Technical Debt #3, #4, #5 (ghi nhận từ Phase 1A/1B, xem
`docs/PROJECT_BASELINE.md`) vẫn còn nguyên, ngoài phạm vi Phase 1C.
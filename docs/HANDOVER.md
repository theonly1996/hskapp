# HANDOVER

## Mục tiêu

Refactor ứng dụng HSK theo Clean Architecture.

UI
↓
Service
↓
Store
↓
LocalStorage

---

## Trạng thái: Phase 1A — ✅ Hoàn tất (2026-07-09)

Toàn bộ 4 Step của Phase 1A đã hoàn thành, bao gồm Final Audit (Step 4).
Chi tiết tiến độ từng Step: docs/PHASE_1A_PROGRESS.md
Báo cáo Final Audit: docs/AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md

### Đã hoàn thành

✅ ProgressStore (js/store/progressstore.js)

- Vocabulary Progress
- Lesson Progress
- Bookmark
- Study Activity
- Backup

✅ ProgressService (js/services/ProgressService.js)

Đã bọc toàn bộ API của ProgressStore, cung cấp thêm business logic
(thống kê, đồng bộ mặc định, toggle bookmark...).

✅ App.js

Không còn business logic của Progress; toàn bộ Vocabulary Progress,
Bookmark, Study Activity, Backup đều đi qua ProgressService.

✅ OverviewTab.js / QuizTab.js

Lesson Progress đã chuyển hoàn toàn qua ProgressService. Không còn
component nào đọc/ghi trực tiếp 5 key LocalStorage thuộc domain Progress
(hsk_learning_progress, hskpro_translation_progress_v1, hsk_bookmarks,
hsk_study_streak, hsk_last_active_date).

Ngoại lệ đã xác nhận có chủ đích (không thuộc phạm vi Phase 1A):
key `hskpro_active_translation_lesson_id` trong QuizTab.js — đây là tín
hiệu điều hướng chuyển tab, không thuộc schema Lesson Progress.

---

## Technical Debt còn tồn tại (để Phase sau xử lý)

Ghi nhận từ Final Audit (docs/AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md), không
chặn việc đóng Phase 1A:

1. `js/services/statisticsService.js` được duyệt trong thiết kế Phase 1A
   (PHASE_1A_DESIGN.md mục 8, 11) nhưng chưa được tạo.
2. Logic tính vocabulary statistics hiện bị viết 2 nơi song song:
   `ProgressService.getVocabularyStatistics` (tổng) và
   `OverviewTab.js` hàm `levelStats` (theo từng cấp độ). Nên hợp nhất khi
   `statisticsService.js` ra đời.
3. 6 hàm public của ProgressService chưa được UI nào gọi tới:
   `getMasteredWords`, `getLearningWords`, `getUnlearnedWords`,
   `getCurrentStreak`, `isWordMastered`, `isWordLearning`. Giữ lại cho các
   Phase sau (Daily Learning, Statistics); rà soát lại nếu vẫn không dùng.
4. Bookmark bị phân mảnh 2 cơ chế: bookmark từ vựng qua ProgressStore,
   bookmark ngữ pháp (hsk_grammar_bookmarks) qua localStorage trực tiếp
   trong GrammarTab.js.
5. Domain Settings (hsk_zh_voice, hsk_vi_voice, hsk_speech_rate,
   hsk_dark_mode) và Flashcard custom data (flashcard_custom_lessons,
   flashcard_custom_words) vẫn thao tác localStorage trực tiếp, ngoài
   phạm vi domain Phase 1A.

---

## Quy tắc (áp dụng cho các Phase tiếp theo)

Không đổi UI.

Không đổi hành vi.

Không merge nhiều bước.

Sau mỗi bước đều regression test.

Không dùng framework.

ES5.

window.ProgressStore

window.ProgressService

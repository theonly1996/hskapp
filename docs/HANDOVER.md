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

## Đã hoàn thành

✅ ProgressStore

- Vocabulary Progress
- Bookmark
- Study Activity
- Backup

✅ ProgressService

Đã bọc toàn bộ API.

✅ App.js

Không còn business logic của Progress.

---

## Chưa hoàn thành

Phase 1A Step 3

Lesson Progress

Hiện vẫn còn:

OverviewTab.js

- hskpro_translation_progress_v1
- hskpro_active_translation_lesson_id

QuizTab.js

- hskpro_translation_progress_v1
- hskpro_active_translation_lesson_id

Mục tiêu:

UI
↓

ProgressService
↓

ProgressStore
↓

LocalStorage

---

## Quy tắc

Không đổi UI.

Không đổi hành vi.

Không merge nhiều bước.

Sau mỗi bước đều regression test.

Không dùng framework.

ES5.

window.ProgressStore

window.ProgressService
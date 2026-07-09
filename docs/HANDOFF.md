Đọc theo đúng thứ tự:

1. docs/README.md
2. PROJECT_CONTEXT.md
3. ARCHITECTURE.md
4. AI_RULES.md
5. ROADMAP.md
6. CHANGELOG.md
7. PHASE_1A_DESIGN.md
8. PHASE_1A_PROGRESS.md

Sau đó review các file:

- js/store/progressStore.js
- js/services/progress_service.js
- js/App.js
- js/tabs/OverviewTab.js
- js/tabs/QuizTab.js

Trạng thái hiện tại:

✓ ProgressStore đã hoàn thành.
✓ ProgressService đã hoàn thành.
✓ App.js đã chuyển toàn bộ Vocabulary Progress / Bookmark / Study Activity / Backup sang ProgressService.
✓ Chỉ còn Lesson Progress trong OverviewTab và QuizTab.

Yêu cầu:
Tiếp tục đúng Phase 1A Step 3.
Không refactor ngoài phạm vi.
Không đổi UI.
Không đổi API public.
Mỗi lần chỉ sửa một bước nhỏ.
Sau mỗi bước phải tự audit và regression check.
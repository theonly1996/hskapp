Đọc theo đúng thứ tự:

1. README.md (thư mục gốc dự án)
2. PROJECT_CONTEXT.md
3. ARCHITECTURE.md
4. AI_RULES.md
5. ROADMAP.md
6. CHANGELOG.md
7. PHASE_1A_DESIGN.md
8. PHASE_1A_PROGRESS.md
9. AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md

Sau đó review các file (tên đúng theo source code thực tế):

- js/store/progressstore.js
- js/services/ProgressService.js
- js/App.js
- js/tabs/OverviewTab.js
- js/tabs/QuizTab.js

Trạng thái hiện tại:

✓ ProgressStore đã hoàn thành (Step 1).
✓ ProgressService đã hoàn thành (Step 2).
✓ App.js đã chuyển toàn bộ Vocabulary Progress / Bookmark / Study Activity / Backup sang ProgressService.
✓ Lesson Progress trong OverviewTab và QuizTab đã chuyển sang ProgressService (Step 3).
✓ Final Audit đã hoàn tất, không có vấn đề Blocking (Step 4).

Phase 1A: ✅ Đã hoàn thành.

Technical Debt còn lại cho Phase sau: xem docs/HANDOVER.md và
docs/AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md.

Yêu cầu cho các Phase tiếp theo:
Không refactor ngoài phạm vi của Phase đang làm.
Không đổi UI nếu không được yêu cầu.
Không đổi API public nếu không được yêu cầu.
Mỗi lần chỉ sửa một bước nhỏ.
Sau mỗi bước phải tự audit và regression check.
Luôn xác nhận lại tên file thực tế trên đĩa trước khi tham chiếu trong tài liệu hoặc index.html.

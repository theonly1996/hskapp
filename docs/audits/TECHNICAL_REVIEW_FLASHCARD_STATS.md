# Technical Review — FlashcardTab.getLessonStats()

Ngày ghi nhận: 2026-07-09
Nguồn gốc: Phát hiện trong quá trình Final Audit của Phase 1B
(xem docs/audits/AUDIT_REPORT_PHASE_1B_FINAL.md, mục 5).
Trạng thái: Technical Debt đã ghi nhận — CHƯA xử lý, chưa có Phase được duyệt.

---

## 1. Vị trí

File: `js/tabs/FlashcardTab.js`
Hàm: `getLessonStats(wordIds)`
Dòng: 289-301 (tại thời điểm ghi nhận, 2026-07-09)

## 2. Mô tả vấn đề

`getLessonStats(wordIds)` tự tính `mastered` / `learning` / `unlearned` /
`percent` cho một tập con từ vựng (theo `wordIds` của một Flashcard
lesson), đọc trực tiếp từ state `progress` cục bộ trong component, bằng
công thức tương đương với `StatisticsService.calculateVocabularyStats`
(đếm theo trạng thái `"mastered"` / `"learning"`, còn lại là
`"unlearned"`, rồi tính phần trăm mastered trên tổng).

Đây là bản sao thứ 3 của cùng một công thức tính Vocabulary Statistics
trong repository, sau:

1. `ProgressService.getVocabularyStatistics` (đã hợp nhất vào
   `StatisticsService.calculateVocabularyStats` ở Phase 1B).
2. `OverviewTab.levelStats` (đã hợp nhất vào
   `StatisticsService.calculateVocabularyStatsByLevel` ở Phase 1B).
3. `FlashcardTab.getLessonStats` (bản sao này — **chưa xử lý**).

## 3. Nguyên nhân

Tại thời điểm Audit Phase 1A (Step 4), Technical Debt chỉ ghi nhận đúng 2
nơi trùng logic (mục 1 và 2 ở trên). `FlashcardTab.getLessonStats` chưa
từng được liệt kê trong `AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md`, nên không
nằm trong phạm vi được duyệt của `PHASE_1B_DESIGN.md`. Bản thân
`js/tabs/FlashcardTab.js` cũng nằm trong danh sách "File không được phép
sửa" của Phase 1B (mục 2.2), nên không được và không thể xử lý trong
Phase 1B.

## 4. Vì sao KHÔNG phải lỗi của Phase 1B

- `PHASE_1B_DESIGN.md` (mục 1.2) chỉ xác định đúng 2 nơi bị trùng logic
  cần hợp nhất — không bao gồm FlashcardTab.
- Definition of Done của Phase 1B (mục 10) chỉ yêu cầu OverviewTab không
  tự tính mastered/learning/unlearned — tiêu chí này đã đạt.
- Mở rộng sửa `FlashcardTab.js` trong Phase 1B sẽ là scope creep, vi phạm
  `AI_RULES.md`.

## 5. Tác động

Mục tiêu tổng quát của Phase 1B ("không còn bất kỳ Component hay Service
nào khác tự viết lại logic tính Vocabulary Statistics") đạt được trên
đúng phạm vi được duyệt, nhưng **chưa đạt 100% trên toàn bộ ứng dụng**.
Không có tác động tới UI hay dữ liệu người dùng hiện tại — đây thuần là
vấn đề trùng lặp code (maintainability), không phải bug chức năng.

## 6. Đề xuất xử lý (chưa thực hiện, chờ phê duyệt Phase mới)

Nếu được phê duyệt một Phase riêng trong tương lai:

1. Design: xác định `FlashcardTab.getLessonStats(wordIds)` sẽ gọi
   `StatisticsService.calculateVocabularyStats(progress, lessonWords)`
   trực tiếp, hoặc bổ sung một hàm mới trong `StatisticsService`
   (ví dụ `calculateVocabularyStatsBySubset`) nếu chữ ký cần khác.
2. Review & Approve theo đúng quy trình trong `PROJECT_BASELINE.md`.
3. Implement: chỉ sửa thân hàm `getLessonStats`, không đổi tên hàm,
   không đổi giá trị trả về (`{ total, mastered, learning, unlearned,
   percent }`), không đổi UI của FlashcardTab.
4. Audit: xác nhận không regression, output giữ nguyên.

## 7. Trạng thái

Ghi nhận là Technical Debt. Không xử lý cho đến khi có Phase mới được
Project Owner phê duyệt theo đúng quy trình Design → Review → Approve →
Implement → Audit.
# Audit Report — Phase 1C — Step 4 (Final Audit)

Phase: 1C — FlashcardTab Statistics Consolidation
Audit type: Repository-wide Final Audit (Step 4 của `PHASE_1C_DESIGN.md`)
Ngày audit: 2026-07-10
Phạm vi: Toàn bộ repository, không chỉ riêng 3 file đã sửa. Chỉ audit —
không sửa code, không tạo patch, không Documentation Sync.

---

## 0. Lưu ý quan trọng trước khi đọc báo cáo này

Trước khi đối chiếu Regression Checklist và Definition of Done, audit này
phát hiện một **mâu thuẫn giữa trạng thái tài liệu và trạng thái thực tế
của source code**, cần Project Owner xác nhận. Chi tiết ở mục 6. Phần kỹ
thuật (mục 1–5) đều PASS trên source code thực tế đang có trong repo.

---

## 1. StatisticsService.js

| Tiêu chí | Kết quả |
|---|---|
| Đúng 3 public API | ĐẠT — `Object.keys(window.StatisticsService)` = `['calculateVocabularyStats', 'calculateVocabularyStatsByLevel', 'calculateVocabularyStatsForSubset']` (đã xác nhận bằng cách nạp file thật qua Node, xem mục 5). |
| `calculateVocabularyStats`, `calculateVocabularyStatsByLevel` không đổi | ĐẠT — thân 2 hàm giữ nguyên 100% so với mô tả trong `AUDIT_REPORT_PHASE_1B_FINAL.md` (mục 1), không bị sửa. |
| `calculateVocabularyStatsForSubset(progress, words, wordIds)` tồn tại, đúng chữ ký mục 9 của Design | ĐẠT. |
| Công thức giữ nguyên byte-for-byte so với `getLessonStats` gốc | ĐẠT — lọc theo `wordIds.includes(w.id)`, đếm mastered/learning, còn lại unlearned, `percent = total > 0 ? Math.round(mastered/total*100) : 0` (rẽ nhánh khi `total = 0`, không dùng `total || 1`) — đúng yêu cầu mục 9 của Design. |
| Pure function, không Store, không localStorage, không biến toàn cục | ĐẠT — grep `ProgressStore`, `localStorage`, `FALLBACK_VOCABULARY` trong file → 0 kết quả. |
| Không side effect | ĐẠT — không `console.log`, không gán `window.*` ngoài khối export cuối file. |

Kết luận mục 1: **PASS**.

---

## 2. ProgressService.js

| Tiêu chí | Kết quả |
|---|---|
| `getVocabularyStatisticsForSubset(words, wordIds)` tồn tại, đúng chữ ký mục 10 của Design | ĐẠT. |
| Chỉ điều phối Store → StatisticsService | ĐẠT — thân hàm đúng 2 dòng: `ProgressStore.getAllVocabularyProgress()` → `StatisticsService.calculateVocabularyStatsForSubset(...)` → return nguyên kết quả. Không xử lý thêm logic. |
| 20 hàm cũ giữ nguyên tên/chữ ký/giá trị trả về | ĐẠT — đã liệt kê đủ 21 hàm public (`Object.keys(window.ProgressService)`, xem mục 5), trong đó 20 hàm cũ (`getVocabularyStatistics`, `getVocabularyStatisticsByLevel`, `getMasteredWords`, `getLearningWords`, `getUnlearnedWords`, `getCurrentStreak`, `isWordMastered`, `isWordLearning`, `getAllVocabularyProgress`, `updateWordProgress`, `getAllLessonProgress`, `syncLessonProgress`, `toggleLessonProgress`, `recordLessonScore`, `getAllBookmarks`, `toggleBookmark`, `recordDailyActivity`, `exportBackup`, `importBackup`, `getBackupFilename`) không đổi tên, không đổi vị trí thân hàm; chỉ thêm đúng 1 hàm mới. |
| Không sửa hàm cũ nào khác | ĐẠT — không tìm thấy thay đổi ngoài phần thêm mới. |

Kết luận mục 2: **PASS**.

---

## 3. FlashcardTab.js

| Tiêu chí | Kết quả |
|---|---|
| `getLessonStats` không còn tự tính toán | ĐẠT — thân hàm (dòng 289–291 ở bản hiện tại) chỉ còn: `return window.ProgressService.getVocabularyStatisticsForSubset(mergedWords, wordIds);`. |
| Không đổi tên hàm, không đổi chữ ký `(wordIds) => {...}` | ĐẠT. |
| Không đổi cấu trúc object trả về | ĐẠT — vẫn `{ total, mastered, learning, unlearned, percent }` (được trả nguyên từ ProgressService/StatisticsService). |
| 3 vị trí gọi hàm không đổi cách gọi | ĐẠT — đã kiểm tra trực tiếp cả 3 nơi: `getLessonStats(mergedWords.map(w => w.id))` (thẻ "Học tất cả từ vựng"), `getLessonStats(bookmarks.map(w => w.id))` (thẻ "Từ vựng yêu thích"), `getLessonStats(lesson.wordIds)` (từng bài học tự tạo trong `lessons.map`). JSX xung quanh (`stats.percent`, `stats.mastered`, `stats.total`) không đổi. |
| Không đổi bất kỳ hàm/JSX nào khác trong file | ĐẠT (trong phạm vi kiểm tra được) — `handleResetLessonProgress`, quản lý `lessons`/`customWords`, `mergedWords`, và toàn bộ `localStorage.getItem/setItem` cho `flashcard_custom_lessons`/`flashcard_custom_words` vẫn còn nguyên, đúng như mục "ngoài phạm vi" của Design. Lưu ý: audit này không có bản gốc (pre-Phase-1C) của file để diff byte-for-byte; đánh giá dựa trên grep có mục tiêu và đọc lại toàn bộ vùng logic liên quan, không phát hiện dấu hiệu sửa ngoài phạm vi. |

Kết luận mục 3: **PASS**.

---

## 4. index.html

| Tiêu chí | Kết quả |
|---|---|
| Không cần sửa (theo Design mục 3) | ĐẠT — `progressstore.js` (dòng 52) → `StatisticsService.js` (dòng 53) → `ProgressService.js` (dòng 54), đúng thứ tự đã có từ Phase 1B, không thêm/xoá thẻ `<script>` nào. |

Kết luận mục 4: **PASS**.

---

## 5. Kiểm chứng runtime (Node, nạp file thật)

Đã nạp trực tiếp `StatisticsService.js` qua Node để xác nhận API thực tế
(không suy đoán từ đọc code tĩnh):

- `Object.keys(window.StatisticsService)` = 3 hàm đúng như mục 1.
- `calculateVocabularyStatsForSubset({}, [{id:'a'},{id:'b'}], [])` →
  `{total:0, mastered:0, learning:0, unlearned:0, percent:0}` — không lỗi
  chia cho 0, không `NaN`.
- `calculateVocabularyStatsForSubset({a:'mastered', b:'learning', c:'unlearned'}, [4 từ], [4 id])` →
  `{total:4, mastered:1, learning:1, unlearned:2, percent:25}` — đúng công thức.
- Trường hợp từ chưa có progress (không có key trong `progress`) → tính
  là `unlearned`, đúng hành vi gốc (`prog[w.id] || "unlearned"`).

Kết luận mục 5: **PASS** — khớp mục 6 (Regression Checklist) của Design.

---

## 6. ⚠️ Finding — Mâu thuẫn giữa tài liệu và trạng thái thực tế (không phải Regression code)

Đây là finding quan trọng nhất của audit này, thuộc phạm vi "Documentation
Consistency", không phải lỗi kỹ thuật/Regression trên source code.

### 6.1. `PHASE_1C_DESIGN.md` tự ghi nhận là **chưa được duyệt**

Header của `PHASE_1C_DESIGN.md` hiện tại:

```
Status: Draft — chờ Review & Approve
Implementation: Not Started
```

So sánh với tiền lệ của chính 2 Phase trước:

```
PHASE_1A_DESIGN.md → Status: Approved Design
PHASE_1B_DESIGN.md → Status: Approved Design
```

Cả hai Design trước đều ghi rõ **"Approved Design"** ngay cả sau khi đã
hoàn thành (trường `Implementation: Not Started` dường như không được
cập nhật lại ở 2 Phase trước — có thể là quy ước không tracking trường
này). Nhưng trường `Status` thì có phân biệt rõ ràng: 1A và 1B đều là
"Approved Design", còn 1C vẫn là **"Draft — chờ Review & Approve"**.

Đây là tín hiệu tài liệu duy nhất, chính thức, để xác nhận một Design đã
được Project Owner phê duyệt hay chưa theo đúng quy trình
`Design → Review → Approval → Implementation` của `AI_RULES.md`. Theo
đúng tài liệu này, **Phase 1C Design chưa từng được đánh dấu Approved**.

### 6.2. `PROJECT_STATUS.md`, `HANDOVER.md`, `CHANGELOG.md` không có bất kỳ dòng nào về Phase 1C

- `PROJECT_STATUS.md`: liệt kê Phase 1A (Completed), Phase 1B (Completed),
  rồi trực tiếp tới "Phase 2 ⬜ ..." — không có mục Phase 1C nào.
- `HANDOVER.md`: coi Phase 1B là Phase gần nhất đã hoàn thành, mô tả
  `FlashcardTab.getLessonStats()` là Technical Debt **"sẽ được xử lý ở
  một Phase riêng trong tương lai"** — văn phong hiện tại (present/future)
  chứ không phải đã xử lý xong.
- `CHANGELOG.md`: dừng ở Version 0.4.0 (Phase 1B). Không có Version nào
  ghi nhận Phase 1C Step 1-3.

Nếu đây là do Documentation Sync của Phase 1C chưa diễn ra (đúng quy
trình `Audit → Documentation Sync → Close Phase` của
`PROJECT_BASELINE.md`), thì việc 3 file này chưa nhắc tới Phase 1C là
**hợp lý và dự kiến** — sẽ được cập nhật ở bước Documentation Sync sau
khi Final Audit này PASS. Tuy nhiên mục 6.1 (Design vẫn ở trạng thái
Draft, chưa Approved) là một tín hiệu khác biệt về bản chất — không phải
việc "chưa đồng bộ", mà là tài liệu duy nhất xác nhận approval hiện đang
nói ngược lại với việc implementation đã tồn tại và khớp 100% với Design.

### 6.3. Hai file tài liệu bị sai nội dung so với tên file

Phát hiện thêm (không thuộc phạm vi Phase 1C nhưng cần ghi nhận vì ảnh
hưởng tới khả năng đọc tài liệu theo đúng Reading Order của
`AI_RULES.md`):

- `docs/ROADMAP.md` — nội dung thực tế **giống hệt 100%**
  `docs/PROJECT_BASELINE.md` (diff = 0), bắt đầu bằng dòng
  `# PROJECT_BASELINE.md`. Đây không phải nội dung Roadmap (không có
  danh sách tính năng theo lộ trình như `PROJECT_CONTEXT.md` mục "Future
  Features" mô tả).
- `README.md` (thư mục gốc) — nội dung thực tế là bản sao của
  `docs/audits/TECHNICAL_REVIEW_FLASHCARD_STATS.md` (Technical Review
  của FlashcardTab), không phải một README giới thiệu dự án.

Do đó, khi audit này thực hiện "Reading Order" theo `AI_RULES.md`
(README.md → ... → ROADMAP.md → CHANGELOG.md), nội dung thực sự đọc được
ở 2 vị trí đó không đúng như tên file thể hiện. Đây thuần là vấn đề tài
liệu (file bị đặt/copy nhầm nội dung), không ảnh hưởng tới source code
hay Regression của Phase 1C, nhưng cần Project Owner xác nhận và sửa lại
đúng nội dung cho 2 file này (ngoài phạm vi audit code, không tự ý sửa ở
đây).

### 6.4. Kết luận mục 6

Đây là **finding cần Project Owner xác nhận trước khi tiếp tục**, không
phải Blocking issue về code/Regression (phần code đã PASS toàn bộ ở mục
1-5). Cụ thể cần xác nhận:

1. Phase 1C Step 1-3 đã thực sự được Review & Approve theo đúng quy trình
   chưa, hay `PHASE_1C_DESIGN.md` chỉ đơn giản là chưa được cập nhật
   Status sau khi Approve (giống việc trường `Implementation` ở 1A/1B
   cũng không được cập nhật)?
2. Nếu đã Approve: cần cập nhật `Status: Approved Design` trong
   `PHASE_1C_DESIGN.md` cho khớp tiền lệ 1A/1B (việc này thuộc
   Documentation Sync, không thực hiện trong audit này).
3. Nội dung sai lệch của `docs/ROADMAP.md` và `README.md` (mục 6.3) cần
   được khôi phục đúng nội dung.

---

## 7. Repository-wide Grep Audit

| Pattern | Vị trí tìm thấy | Đánh giá |
|---|---|---|
| `mastered++` | `StatisticsService.js` (3 chỗ: `calculateVocabularyStats`, `calculateVocabularyStatsByLevel`, `calculateVocabularyStatsForSubset`) | ĐẠT — chỉ còn đúng 1 file định nghĩa, không còn ở `FlashcardTab.js` nữa. |
| `learning++` | `StatisticsService.js` (3 chỗ, tương ứng) | ĐẠT — tương tự. |
| `status === "mastered"` / `status === "learning"` | `StatisticsService.js` (4 chỗ) | ĐẠT — không có ở nơi khác. |
| `calculateVocabularyStatsForSubset` / `getVocabularyStatisticsForSubset` | `StatisticsService.js` (định nghĩa), `ProgressService.js` (định nghĩa + gọi), `FlashcardTab.js` (gọi) | Đúng như thiết kế mục 11 (luồng dữ liệu) — không có nơi thứ 4 nào định nghĩa lại công thức. |
| `ProgressStore` | Chỉ `ProgressService.js` và `progressstore.js` (chính nó) | ĐẠT — không component nào gọi thẳng `ProgressStore`, đúng nguyên tắc Phase 1A/1B/1C. |
| `localStorage` | `GrammarTab.js`, `FlashcardTab.js` (`flashcard_custom_lessons`/`flashcard_custom_words`, ngoài phạm vi Phase 1C theo mục 2.2 Design), `QuizTab.js`, `App.js`, `progressstore.js` | ĐẠT — không có domain Vocabulary Progress nào bị đọc/ghi trực tiếp ngoài `progressstore.js`. |
| `Phase 1C` (comment marker) | `StatisticsService.js`, `ProgressService.js` | Đúng — chỉ 2 file được phép sửa có marker, khớp mục 3 của Design (`FlashcardTab.js` không có comment "Phase 1C" tường minh nhưng đã xác nhận thân hàm khớp thiết kế ở mục 3). |

**Kết luận:** Không còn công thức tính `mastered`/`learning`/`unlearned` nào
khác ngoài `StatisticsService.js`, khớp mục 9 (Regression Checklist) của
`PHASE_1C_DESIGN.md`.

Kết luận mục 7: **PASS**.

---

## 8. Regression Checklist (đối chiếu mục 12 của `PHASE_1C_DESIGN.md`)

| # | Tiêu chí | Kết quả |
|---|---|---|
| 1 | `calculateVocabularyStats`/`calculateVocabularyStatsByLevel` — 0 thay đổi | ĐẠT |
| 2 | ProgressService — 20 hàm cũ giữ nguyên, chỉ thêm 1 hàm mới | ĐẠT (21 hàm public, xác nhận qua `Object.keys`) |
| 3 | `progressstore.js` — không bị đụng tới | ĐẠT (không có marker Phase 1C, không có `ForSubset` nào trong file) |
| 4 | `FlashcardTab.js` — chỉ thân hàm `getLessonStats` đổi | ĐẠT (đã xác nhận 3 call site và JSX xung quanh không đổi) |
| 5 | Kết quả hiển thị 3 vị trí giữ nguyên | ĐẠT (logic ủy quyền cho ra đúng công thức gốc, xác nhận bằng test runtime mục 5) |
| 6 | `wordIds` rỗng / `total = 0` → `percent = 0`, không lỗi/NaN | ĐẠT (test runtime mục 5) |
| 7 | File "cấm sửa" — diff = 0 | ĐẠT trong phạm vi kiểm tra được (không có bản gốc để diff byte-for-byte, nhưng không phát hiện dấu hiệu sửa qua grep có mục tiêu và đọc trực tiếp) |
| 8 | `index.html` — diff = 0 | ĐẠT |
| 9 | Grep repository-wide — không còn công thức trùng | ĐẠT (mục 7) |
| 10 | Không phát sinh Technical Debt code mới ngoài phạm vi | ĐẠT — không tìm thấy Technical Debt kỹ thuật mới; finding duy nhất là vấn đề tài liệu (mục 6), không phải code |

Kết luận mục 8: **PASS**.

---

## 9. Definition of Done (đối chiếu mục 14 của `PHASE_1C_DESIGN.md`)

| Tiêu chí | Kết quả |
|---|---|
| `StatisticsService.calculateVocabularyStatsForSubset` tồn tại, pure function | ĐẠT |
| `ProgressService.getVocabularyStatisticsForSubset` tồn tại, chỉ điều phối | ĐẠT |
| `FlashcardTab.getLessonStats` không còn tự tính toán | ĐẠT |
| Không còn Component/Service nào tự viết lại công thức Vocabulary Statistics | ĐẠT (mục 7) |
| Regression Checklist — PASS | ĐẠT (mục 8) |
| Không Blocking issue trong Final Audit | ĐẠT về code; xem mục 6 cho finding về tài liệu (non-blocking cho code, nhưng cần Project Owner xác nhận trước khi đóng Phase) |
| Output UI 3 vị trí giữ nguyên 100% | ĐẠT |
| Public API ProgressStore/StatisticsService (2 hàm cũ)/ProgressService (20 hàm cũ) không đổi | ĐẠT |

---

## 10. Scope Check

Danh sách file thực sự có thay đổi liên quan Phase 1C (dựa trên comment
marker "Phase 1C" và nội dung hàm mới):

| File | Loại thay đổi |
|---|---|
| `js/services/StatisticsService.js` | Thêm 1 hàm mới (`calculateVocabularyStatsForSubset`) |
| `js/services/ProgressService.js` | Thêm 1 hàm mới (`getVocabularyStatisticsForSubset`) |
| `js/tabs/FlashcardTab.js` | Sửa thân hàm `getLessonStats` |

Không phát hiện file nào ngoài danh sách "File được phép sửa" (mục 3 của
Design) bị thay đổi liên quan Phase 1C. Không có Scope Creep.

Kết luận mục 10: **PASS**.

---

## 11. Technical Debt

Không phát hiện Technical Debt kỹ thuật mới nào phát sinh từ việc
implement Phase 1C.

Technical Debt #3, #4, #5 (đã ghi nhận tại `PROJECT_BASELINE.md`) vẫn còn
nguyên, ngoài phạm vi Phase 1C, không xử lý — đúng như Design mục 2.2/15.

Finding duy nhất của audit này là vấn đề tài liệu/quy trình, đã trình bày
đầy đủ ở mục 6, không ghi nhận thành Technical Debt trên code.

---

## Kết luận tổng thể

**Phần kỹ thuật (Regression Checklist + Definition of Done, mục 1-5, 7-10):
PASS.** Source code hiện tại của Phase 1C Step 1-3 khớp 100% với
`PHASE_1C_DESIGN.md`, không phát hiện Blocking issue, không có Scope
Creep, không phát sinh Technical Debt code mới.

**Finding cần Project Owner xác nhận trước khi đóng Phase (mục 6):**
`PHASE_1C_DESIGN.md` tự ghi nhận `Status: Draft — chờ Review & Approve`
(khác với tiền lệ "Approved Design" của Design 1A/1B), trong khi
Step 1-3 đã được implement và khớp hoàn toàn với Design. Đề nghị Project
Owner xác nhận Phase 1C Step 1-3 đã thực sự qua đúng quy trình
Design → Review → Approval trước khi tiến hành Documentation Sync, và
nhân dịp Documentation Sync xử lý luôn 2 file bị sai nội dung
(`docs/ROADMAP.md`, `README.md` — mục 6.3).

### Blocking issues (code/Regression)
Không có.

### Cần xác nhận trước khi đóng Phase (process/documentation)
1. Xác nhận Phase 1C Step 1-3 đã được Review & Approve đúng quy trình
   (mục 6.1).
2. Cập nhật `PHASE_1C_DESIGN.md` → `Status: Approved Design` (thực hiện ở
   Documentation Sync, không thực hiện trong audit này).
3. Khôi phục đúng nội dung cho `docs/ROADMAP.md` và `README.md` (mục 6.3).

### Files changed (Phase 1C, Step 1-3)
- `js/services/StatisticsService.js`
- `js/services/ProgressService.js`
- `js/tabs/FlashcardTab.js`

### Ready for Documentation Sync?
**Về mặt code: YES** — không có Blocking issue kỹ thuật nào.
**Khuyến nghị: chờ Project Owner xác nhận mục 6 trước khi tiến hành**,
vì Documentation Sync thường bao gồm việc cập nhật Status của Design
Document sang "Approved" — nên xác nhận việc Approve đã thực sự xảy ra
trước khi ghi nhận điều đó vào tài liệu chính thức.
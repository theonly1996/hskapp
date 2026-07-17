# Phase 1C Design

# FlashcardTab Statistics Consolidation

Version: 1.0.0

Status: Approved Design
Implementation: Not Started

---

# 1. Mục tiêu

Xử lý Technical Debt duy nhất còn tồn đọng được ghi nhận tại Final Audit
Phase 1B (`docs/audits/AUDIT_REPORT_PHASE_1B_FINAL.md`, mục 5, và
`docs/audits/TECHNICAL_REVIEW_FLASHCARD_STATS.md`):

1.1. Hợp nhất `FlashcardTab.getLessonStats()` — bản sao thứ 3 của công
thức tính Vocabulary Statistics trong repository — vào
`StatisticsService`, để `StatisticsService` thực sự là **nơi duy nhất**
định nghĩa "thế nào là mastered / learning / unlearned" và công thức
tính phần trăm, đúng như mục tiêu tổng quát đã đề ra ở
`PHASE_1B_DESIGN.md` (mục 1.3) nhưng chưa đạt được 100% trên toàn app.

1.2. Không đổi kết quả hiển thị. Số liệu người dùng thấy ở 3 vị trí trong
Flashcard Tab (Học tất cả từ vựng / Từ vựng yêu thích / từng bài học tự
tạo) phải giữ nguyên 100% trước và sau Phase 1C.

1.3. Không mở rộng phạm vi sang bất kỳ Technical Debt nào khác (mục 3, 4,
5 trong `PROJECT_BASELINE.md`) — các mục đó không thuộc Phase 1C.

---

# 2. Phạm vi

## 2.1. Trong phạm vi

- Thêm 1 hàm tính toán mới (subset statistics) vào `StatisticsService.js`.
- Thêm 1 hàm điều phối mới vào `ProgressService.js`, gọi vào hàm mới của
  StatisticsService.
- Sửa duy nhất thân hàm `getLessonStats()` trong `FlashcardTab.js` để gọi
  qua `ProgressService`, thay vì tự tính.

## 2.2. Ngoài phạm vi

- Không xử lý Technical Debt #3 (một số API ProgressService chưa dùng),
  #4 (Bookmark Grammar dùng LocalStorage riêng), #5 (Settings/Flashcard
  Custom Data chưa thuộc ProgressStore).
- Không đụng tới `flashcard_custom_lessons`, `flashcard_custom_words`
  (LocalStorage key riêng của Flashcard, không thuộc domain Vocabulary
  Progress) — các key này nằm ngoài mục tiêu Phase 1C.
- Không đổi UI/JSX của FlashcardTab ngoài lệnh gọi được uỷ quyền bên
  trong thân hàm `getLessonStats`.
- Không đổi cách `mergedWords`, `bookmarks`, `lessons` được xây dựng.

---

# 3. File được phép sửa

```
js/services/StatisticsService.js   (thêm 1 hàm mới)
js/services/ProgressService.js     (thêm 1 hàm mới)
js/tabs/FlashcardTab.js            (chỉ sửa thân hàm getLessonStats, dòng 289-301)
```

Ràng buộc cho từng file:

- `js/services/StatisticsService.js`: chỉ được thêm đúng 1 hàm mới
  (xem mục 9). Không sửa `calculateVocabularyStats` hay
  `calculateVocabularyStatsByLevel` đã có.
- `js/services/ProgressService.js`: chỉ được thêm đúng 1 hàm mới
  (xem mục 10). Không đổi chữ ký, không đổi giá trị trả về của bất kỳ
  hàm public nào đang tồn tại (20 hàm hiện có phải giữ nguyên).
- `js/tabs/FlashcardTab.js`: chỉ được sửa phần thân hàm `getLessonStats`
  (hiện ở dòng 289-301). Không đổi tên hàm, không đổi chữ ký
  `(wordIds) => {...}`, không đổi cấu trúc object trả về
  (`{ total, mastered, learning, unlearned, percent }`), không đổi bất kỳ
  JSX hay hàm nào khác trong file (bao gồm `handleResetLessonProgress`,
  `mergedWords`, quản lý `lessons`/`customWords`, v.v.).

`index.html` **không cần sửa** — `StatisticsService.js` và
`ProgressService.js` đã được load đúng thứ tự từ Phase 1B, không cần
thêm script mới.

## 4. File cấm sửa

```
js/store/progressstore.js
js/App.js
js/data.js
js/utils.js
js/components/WordCard.js
js/components/Hanzicharacter.js
js/components/Toast.js
js/components/LoadingScreen.js
js/tabs/OverviewTab.js
js/tabs/QuizTab.js
js/tabs/CurriculumTab.js
js/tabs/DictionaryTab.js
js/tabs/GrammarTab.js
js/tabs/BookmarksTab.js
index.html
css/ (toàn bộ)
```

`js/store/progressstore.js` bị cấm sửa: Phase 1C không đụng tầng lưu
trữ, chỉ dùng lại API đọc dữ liệu (`getAllVocabularyProgress`) đã có sẵn
qua ProgressService.

`js/App.js` bị cấm sửa vì `progress` truyền vào `FlashcardTab` đã đi qua
`window.ProgressService.getAllVocabularyProgress()` từ Phase 1A — không
cần và không được đụng tới luồng này.

`js/tabs/FlashcardTab.js` ngoài phần thân hàm `getLessonStats` (mục 3) —
mọi phần khác của file này thuộc phạm vi cấm sửa.

---

# 5. Kiến trúc hiện tại

Luồng dữ liệu chuẩn (không đổi từ Phase 1A/1B):

```
Component
  ↓
ProgressService   (Business Layer)
  ↓
ProgressStore     (Storage Layer)
  ↓
LocalStorage
```

Tầng tính toán thuần (bổ sung từ Phase 1B), đứng cạnh ProgressStore, được
ProgressService điều phối gọi vào:

```
ProgressService → StatisticsService (pure function, không Store, không
LocalStorage, không biến toàn cục)
```

Vị trí hiện tại của `FlashcardTab` trong kiến trúc:

- `progress` (Vocabulary Progress thô): đã được `App.js` nạp qua
  `ProgressService.getAllVocabularyProgress()` và truyền xuống dưới dạng
  prop — **đúng kiến trúc**, không vi phạm.
- `mergedWords` (danh sách từ: hệ thống + tự tạo): xây dựng cục bộ trong
  component từ prop `words` + state `customWords` — đây là dữ liệu hiển
  thị (view-level), không thuộc 5 domain Progress, không bắt buộc phải đi
  qua ProgressStore.
- **Vấn đề duy nhất:** phần *tính toán thống kê* (`mastered`/`learning`/
  `unlearned`/`percent`) từ `progress` + tập con từ vựng đang được viết
  lại thủ công trong component, thay vì gọi StatisticsService — đây là
  điều Phase 1C xử lý.

---

# 6. Phân tích Technical Debt: `FlashcardTab.getLessonStats()`

Vị trí: `js/tabs/FlashcardTab.js`, dòng 289-301.

```
Chữ ký: const getLessonStats = (wordIds) => { ... }
Đầu vào: wordIds — Array<string>, danh sách id từ vựng của một "bài học"
         (toàn bộ mergedWords / bookmarks / lesson.wordIds tuỳ nơi gọi).
Nguồn dữ liệu đọc: biến closure `mergedWords` (không phải tham số) và
         biến closure `progress` (prop của component).
Logic: filter mergedWords theo wordIds → đếm mastered/learning/unlearned
       theo progress[w.id] → tính percent = mastered/total*100 (làm tròn),
       percent = 0 nếu total = 0.
Đầu ra: { total, mastered, learning, unlearned, percent }
```

## 6.1. Nơi gọi (3 vị trí, dòng 416, 454, 472)

| Dòng | Gọi với | Mục đích hiển thị |
|---|---|---|
| 416 | `mergedWords.map(w => w.id)` | Thẻ "Học tất cả từ vựng" |
| 454 | `bookmarks.map(w => w.id)` | Thẻ "Từ vựng yêu thích" |
| 472 | `lesson.wordIds` | Từng thẻ bài học tự tạo (trong `lessons.map`) |

## 6.2. So sánh với API hiện có của StatisticsService

| | `calculateVocabularyStats` (hiện có) | `getLessonStats` (FlashcardTab) |
|---|---|---|
| Input | `(progress, words)` | closure `(progress, mergedWords)` + tham số `wordIds` |
| Lọc theo subset id | Không (dùng nguyên `words` truyền vào) | Có — filter theo `wordIds` trước |
| Field output | `total, learning, mastered, masteredPercent, learningPercent` | `total, mastered, learning, unlearned, percent` |
| Xử lý `total = 0` | `total = cleanWords.length \|\| 1` (chia cho 1, ra 0%) | `total > 0 ? ... : 0` (rẽ nhánh tường minh, cùng kết quả 0%) |
| Lọc `id !== "error"` | Có | Không tường minh (nhưng `mergedWords` đã lọc "error" từ trước ở bước tạo `mergedWords`) |

**Kết luận:** Không thể gọi thẳng `calculateVocabularyStats` hiện có vì
khác field output (`unlearned`, `percent` so với `masteredPercent`,
`learningPercent`, thiếu `unlearned`) và khác input (cần lọc subset theo
`wordIds` trước khi tính, trong khi hàm hiện có tính trên toàn bộ mảng
`words` truyền vào). Cần một hàm mới, không sửa hàm cũ (đúng nguyên tắc
Single Responsibility đã áp dụng ở Phase 1B).

---

# 7. Vì sao chưa xử lý ở Phase 1B

Đã được ghi nhận đầy đủ trong `docs/audits/AUDIT_REPORT_PHASE_1B_FINAL.md`
(mục 5) và `docs/audits/TECHNICAL_REVIEW_FLASHCARD_STATS.md`:

1. `PHASE_1B_DESIGN.md` (mục 1.2, mục 2.1) chỉ xác định đúng 2 nơi bị
   trùng logic — `ProgressService.getVocabularyStatistics` và
   `OverviewTab.levelStats` — dựa trên `AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md`.
   `FlashcardTab.getLessonStats` chưa từng được liệt kê trong Audit Phase
   1A nên không nằm trong phạm vi được duyệt của Phase 1B.

2. `js/tabs/FlashcardTab.js` nằm trong danh sách "File không được phép
   sửa" của `PHASE_1B_DESIGN.md` (mục 2.2) — Phase 1B không có quyền
   chỉnh sửa file này dù có phát hiện ra vấn đề trong lúc audit.

3. Definition of Done của Phase 1B chỉ yêu cầu `OverviewTab.js` không tự
   tính toán — không yêu cầu quét và xử lý toàn bộ component khác. Mở
   rộng sang FlashcardTab trong Phase 1B sẽ là scope creep, vi phạm
   `AI_RULES.md`.

→ Do đó finding này được đưa vào backlog Technical Debt và cần một Phase
riêng (Phase 1C, tài liệu này) theo đúng quy trình Design → Review →
Approve → Implement → Audit.

---

# 8. Thiết kế kiến trúc mới

Không thay đổi kiến trúc tổng thể (`Component → ProgressService →
ProgressStore → LocalStorage`, cộng tầng `StatisticsService` từ Phase
1B). Phase 1C chỉ **mở rộng** tầng đã có để bao phủ thêm một trường hợp
sử dụng (tính thống kê cho một tập con từ vựng theo danh sách id), không
tạo tầng mới, không tạo luồng dữ liệu mới.

Sau Phase 1C:

```
FlashcardTab.getLessonStats(wordIds)
  ↓ (chỉ còn 1 dòng gọi, không tự tính)
ProgressService.getVocabularyStatisticsForSubset(words, wordIds)
  ↓
  ProgressStore.getAllVocabularyProgress()   (đã có sẵn từ Phase 1A)
  ↓
  StatisticsService.calculateVocabularyStatsForSubset(progress, words, wordIds)
  ↓ (pure function, trả kết quả)
FlashcardTab render (JSX không đổi)
```

`mergedWords` vẫn được xây dựng và giữ ở component (view-level data, có
`customWords` — dữ liệu tự tạo cục bộ của Flashcard, không thuộc domain
Progress) và được truyền làm tham số `words` vào ProgressService — không
vi phạm ràng buộc "Service không đọc biến toàn cục" vì `mergedWords`
luôn được truyền qua tham số hàm, không được StatisticsService tự ý
truy cập.

---

# 9. API cần bổ sung vào StatisticsService

Một hàm mới, thêm vào `js/services/StatisticsService.js`, không sửa 2
hàm hiện có:

```
calculateVocabularyStatsForSubset(progress, words, wordIds)
```

- **Input:**
  - `progress` — object thô `{ [wordId]: "unlearned"|"learning"|"mastered" }`.
  - `words` — Array từ vựng đầy đủ (tương đương `mergedWords` của
    FlashcardTab), mỗi phần tử có field `id`.
  - `wordIds` — Array<string>, danh sách id cần lọc ra để tính (tương
    đương tham số `wordIds` hiện tại của `getLessonStats`).
- **Xử lý (phải giữ nguyên byte-for-byte công thức cũ của
  `FlashcardTab.getLessonStats`):**
  1. Lọc `words` theo `wordIds.includes(w.id)`.
  2. Đếm `mastered`, `learning` theo `progress[w.id]`; còn lại tính là
     `unlearned`.
  3. `total` = số phần tử sau khi lọc.
  4. `percent` = `total > 0 ? Math.round(mastered / total * 100) : 0`
     (giữ nguyên nhánh rẽ khi `total = 0`, KHÔNG đổi sang công thức
     `total || 1` của `calculateVocabularyStats` để tránh sai khác hành
     vi so với bản gốc).
- **Output:** `{ total, mastered, learning, unlearned, percent }` — đúng
  100% cấu trúc hiện tại của `getLessonStats`, để không phải đổi bất kỳ
  chỗ nào trong JSX của FlashcardTab (`stats.percent`, `stats.mastered`,
  `stats.total`).
- **Ràng buộc:** pure function, không gọi Store, không đọc localStorage,
  không đọc biến toàn cục — cùng ràng buộc với 2 hàm hiện có trong file.

---

# 10. API cần bổ sung vào ProgressService

Một hàm mới, thêm vào `js/services/ProgressService.js`, không sửa các
hàm hiện có (20 hàm public giữ nguyên):

```
getVocabularyStatisticsForSubset(words, wordIds)
```

- **Input:** `words` (Array, tương đương `mergedWords`), `wordIds`
  (Array<string>).
- **Xử lý:** nạp `progress` từ `window.ProgressStore.getAllVocabularyProgress()`
  (đúng pattern đã dùng ở `getVocabularyStatistics` và
  `getVocabularyStatisticsByLevel`), sau đó gọi
  `window.StatisticsService.calculateVocabularyStatsForSubset(progress, words, wordIds)`
  và trả nguyên kết quả.
- **Output:** `{ total, mastered, learning, unlearned, percent }`.
- **Ràng buộc:** chỉ điều phối Store → StatisticsService, không xử lý
  thêm logic gì khác (đúng pattern 2 hàm thống kê hiện có).

Sau khi thêm, `ProgressService` sẽ có 21 hàm public (20 hàm cũ + 1 hàm
mới), không hàm nào bị đổi tên hay xoá.

---

# 11. Luồng dữ liệu

```
FlashcardTab (giữ nguyên mergedWords, bookmarks, lessons)
      │
      │  getLessonStats(wordIds)  ← chữ ký không đổi
      ▼
window.ProgressService.getVocabularyStatisticsForSubset(mergedWords, wordIds)
      │
      ├─► window.ProgressStore.getAllVocabularyProgress()   (đọc, không ghi)
      │
      └─► window.StatisticsService.calculateVocabularyStatsForSubset(
              progress, mergedWords, wordIds)
      │
      ▼
  { total, mastered, learning, unlearned, percent }
      │
      ▼
FlashcardTab render (JSX không đổi, 3 vị trí gọi tại dòng 416/454/472
không đổi cách gọi `getLessonStats(...)`)
```

Không có ghi dữ liệu (write) nào phát sinh trong luồng này — toàn bộ là
đọc (read) và tính toán thuần.

---

# 12. Regression Checklist

Phải xác nhận tất cả các mục sau ĐẠT trước khi coi Phase 1C hoàn thành:

1. `StatisticsService.calculateVocabularyStats` và
   `calculateVocabularyStatsByLevel` — 0 thay đổi (diff = 0).
2. `ProgressService` — 20 hàm cũ giữ nguyên tên/chữ ký/giá trị trả về;
   chỉ thêm đúng 1 hàm mới `getVocabularyStatisticsForSubset`.
3. `ProgressStore` (`progressstore.js`) — diff = 0, không bị đụng tới.
4. `FlashcardTab.js` — diff = 0 ngoài thân hàm `getLessonStats` (dòng
   289-301); tên hàm, chữ ký, JSX xung quanh, các hàm khác trong file
   (`handleResetLessonProgress`, quản lý `lessons`/`customWords`, v.v.)
   giữ nguyên 100%.
5. Kết quả hiển thị tại 3 vị trí (Học tất cả từ vựng / Từ vựng yêu thích
   / từng bài học tự tạo) — số liệu `percent`, `mastered`, `total` giống
   hệt trước và sau Phase 1C, với cùng một bộ dữ liệu mẫu.
6. Trường hợp `wordIds` rỗng hoặc `total = 0` — `percent` trả về `0`,
   không có lỗi chia cho 0, không có `NaN`.
7. Tất cả file trong danh sách "File cấm sửa" (mục 4) — diff = 0.
8. `index.html` — diff = 0 (không cần thêm script mới).
9. Grep repository-wide: không còn công thức tính `mastered++`/
   `learning++`/`unlearned` nào khác ngoài `StatisticsService.js` (ngoại
   trừ các hàm filter/predicate `getMasteredWords`/`getLearningWords`
   trong `ProgressService.js` đã được xác nhận là Technical Debt #3,
   ngoài phạm vi Phase 1C — không đổi).
10. Không phát sinh Technical Debt mới ngoài phạm vi được duyệt (nếu có,
    ghi nhận riêng, không tự ý mở rộng scope để xử lý).

---

# 13. Step-by-step Plan

**Step 1 — StatisticsService**
Thêm hàm `calculateVocabularyStatsForSubset(progress, words, wordIds)`
vào `js/services/StatisticsService.js`, theo đúng mục 9. Review + xác
nhận công thức khớp byte-for-byte với `getLessonStats` gốc trước khi
sang Step 2.

**Step 2 — ProgressService**
Thêm hàm `getVocabularyStatisticsForSubset(words, wordIds)` vào
`js/services/ProgressService.js`, theo đúng mục 10. Xác nhận 20 hàm cũ
không đổi (diff).

**Step 3 — FlashcardTab**
Sửa duy nhất thân hàm `getLessonStats` (dòng 289-301) để gọi
`window.ProgressService.getVocabularyStatisticsForSubset(mergedWords, wordIds)`
và trả nguyên kết quả. Không đổi chữ ký, không đổi 3 vị trí gọi hàm.

**Step 4 — Final Audit**
Audit repository-wide (không chỉ 3 file đã sửa), chạy theo Regression
Checklist (mục 12), xác nhận PASS trước khi Documentation Sync và đóng
Phase 1C.

Mỗi Step chỉ thực hiện sau khi Step trước được xác nhận không có vấn đề,
đúng quy trình trong `AI_RULES.md` và `PROJECT_BASELINE.md`.

---

# 14. Definition of Done

Phase 1C được coi là hoàn thành khi:

- [ ] `StatisticsService.calculateVocabularyStatsForSubset` tồn tại, pure
      function, đúng ràng buộc (không Store, không localStorage, không
      biến toàn cục).
- [ ] `ProgressService.getVocabularyStatisticsForSubset` tồn tại, chỉ
      điều phối Store → StatisticsService.
- [ ] `FlashcardTab.getLessonStats` không còn tự tính toán
      mastered/learning/unlearned/percent — chỉ còn gọi ProgressService.
- [ ] Không còn bất kỳ Component hay Service nào trong repository tự viết
      lại công thức tính Vocabulary Statistics (mục tiêu tổng quát của
      Phase 1B, nay đạt 100% trên toàn app).
- [ ] Toàn bộ Regression Checklist (mục 12) — PASS.
- [ ] Không có Blocking issue trong Final Audit.
- [ ] Output UI tại 3 vị trí trong FlashcardTab giữ nguyên 100%.
- [ ] Public API của ProgressStore, StatisticsService (2 hàm cũ), và
      ProgressService (20 hàm cũ) không đổi ngoài phần bổ sung đã duyệt.

---

# 15. Những gì KHÔNG được làm

- Không sửa `calculateVocabularyStats` hay `calculateVocabularyStatsByLevel`
  đã có trong StatisticsService.
- Không đổi tên hay chữ ký bất kỳ hàm public nào hiện có của
  ProgressService hay ProgressStore.
- Không đụng tới `js/store/progressstore.js`, `js/App.js`,
  `js/tabs/OverviewTab.js`, `js/tabs/QuizTab.js`, hay bất kỳ file nào
  khác ngoài 3 file ở mục 3.
- Không đổi `index.html`.
- Không đổi JSX hay UI của FlashcardTab ngoài lệnh gọi được uỷ quyền bên
  trong thân hàm `getLessonStats`.
- Không đổi cách quản lý `lessons`, `customWords`,
  `flashcard_custom_lessons`, `flashcard_custom_words` — các cơ chế này
  không thuộc phạm vi Phase 1C.
- Không xử lý Technical Debt #3, #4, #5 (đã ghi nhận trong
  `PROJECT_BASELINE.md`) — không mở rộng scope.
- Không tối ưu hoá, không "tiện thể" refactor thêm bất kỳ phần nào khác
  của FlashcardTab.js dù có vẻ liên quan.
- Không implement, không sinh code, không tạo patch ở giai đoạn này —
  tài liệu này chỉ là Design, chờ Review & Approve trước khi chuyển sang
  Implementation (Step 1-4 ở mục 13).

---

# End of Phase 1C Design
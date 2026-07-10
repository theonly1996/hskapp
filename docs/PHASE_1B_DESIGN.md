# Phase 1B Design

# Statistics Consolidation & Calculation Layer

Version: 2.0.0

Status: Approved Design
Implementation: Not Started

---

# 1. Mục tiêu Phase 1B

Phase 1B giải quyết dứt điểm Technical Debt #1 và #2 được ghi nhận trong
`docs/AUDIT_REPORT_PHASE_1A_STEP4_FINAL.md` (mục 6, Technical Debt):

1.1. Tạo `js/services/StatisticsService.js` — lớp tính toán thống kê duy
nhất của toàn bộ ứng dụng, đúng vị trí đã được duyệt trong
`PHASE_1A_DESIGN.md` (mục 8, mục 11) nhưng chưa từng được tạo trong
Phase 1A.

1.2. Hợp nhất toàn bộ logic tính Vocabulary Statistics hiện đang bị viết
trùng ở hai nơi:

- `ProgressService.getVocabularyStatistics()` — tính tổng (aggregate),
  đang được `App.js` dùng.
- `OverviewTab.js` (hàm `levelStats`, dùng `useMemo`) — tự tính lại theo
  từng cấp độ HSK, độc lập hoàn toàn với ProgressService.

1.3. Đảm bảo Single Source of Truth cho tầng Calculation: sau Phase 1B,
chỉ tồn tại **một nơi duy nhất** định nghĩa "thế nào là mastered /
learning / unlearned" và công thức tính phần trăm — nằm trong
`StatisticsService.js`. Không còn bất kỳ Component hay Service nào khác
tự viết lại logic này.

1.4. Không đổi kết quả hiển thị trên UI. Số liệu người dùng thấy trên
màn hình Overview phải giữ nguyên 100% trước và sau Phase 1B.

---

# 2. Phạm vi

## 2.1. File được phép sửa

Tạo mới:

```
js/services/StatisticsService.js
```

Có thể sửa:

```
js/services/ProgressService.js
js/tabs/OverviewTab.js
index.html
```

Ràng buộc cho từng file:

- `js/services/ProgressService.js`: chỉ được sửa phần thân của
  `getVocabularyStatistics()` để gọi vào `StatisticsService`, và bổ sung
  hàm mới `getVocabularyStatisticsByLevel()`. Không đổi chữ ký, không đổi
  giá trị trả về của bất kỳ hàm public nào đang tồn tại.
- `js/tabs/OverviewTab.js`: chỉ được sửa phần thân hàm `levelStats`
  (hiện ở dòng 89–134). Không đổi JSX, không đổi UI, không đổi tên biến
  `levelStats` hay các field bên trong kết quả trả về của nó.
- `index.html`: chỉ được thêm đúng một dòng
  `<script src="js/services/StatisticsService.js">`, đặt trước dòng
  `<script src="js/services/ProgressService.js">`.

## 2.2. File không được phép sửa

```
js/store/progressstore.js
js/App.js
js/data.js
js/utils.js
js/components/WordCard.js
js/components/Hanzicharacter.js
js/components/Toast.js
js/components/LoadingScreen.js
js/tabs/QuizTab.js
js/tabs/CurriculumTab.js
js/tabs/DictionaryTab.js
js/tabs/GrammarTab.js
js/tabs/FlashcardTab.js
js/tabs/BookmarksTab.js
css/ (toàn bộ)
```

`js/store/progressstore.js` đặc biệt bị cấm sửa: Phase 1B không đụng đến
tầng lưu trữ, chỉ thêm tầng tính toán mới đứng cạnh nó, được điều phối bởi
`ProgressService`.

`js/App.js` bị cấm sửa vì `App.js` đang gọi
`ProgressService.getVocabularyStatistics(words)` — Phase 1B giữ nguyên
chữ ký và giá trị trả về của hàm này nên `App.js` không cần và không được
đụng tới.

## 2.3. Ngoài phạm vi (Out of Scope)

Các mục sau **không** thuộc Phase 1B, dù có liên quan gián tiếp đến
Progress/Statistics — để lại cho các Phase sau theo đúng khuyến nghị của
Audit Report:

- Grammar Bookmark (`hsk_grammar_bookmarks`, `hsk_grammar_learned` trong
  `GrammarTab.js`) — Technical Debt #4. Vẫn dùng LocalStorage riêng, không
  hợp nhất vào ProgressStore trong Phase 1B.
- Settings (`hsk_zh_voice`, `hsk_vi_voice`, `hsk_speech_rate`,
  `hsk_dark_mode` trong `App.js`) — Technical Debt #5. Ngoài phạm vi
  domain Progress.
- Flashcard Custom Data (`flashcard_custom_lessons`,
  `flashcard_custom_words` trong `FlashcardTab.js`) — Technical Debt #5.
  Ngoài phạm vi domain Progress.
- 6 hàm public chưa dùng của `ProgressService` (`getMasteredWords`,
  `getLearningWords`, `getUnlearnedWords`, `getCurrentStreak`,
  `isWordMastered`, `isWordLearning`) — Technical Debt #3. Giữ nguyên,
  không xoá, không đổi, không thuộc phạm vi xử lý của Phase 1B.
- Lesson Progress Statistics, Bookmark Statistics — Phase 1B chỉ giới hạn
  ở Vocabulary Statistics, vì đây là nơi duy nhất Audit Report phát hiện
  logic bị viết trùng (mục 5.2).
- Daily Learning (Phase 2), Spaced Repetition (Phase 4), Statistics nâng
  cao / biểu đồ / thành tích (Phase 10) theo `ROADMAP.md`.
- Bất kỳ thay đổi nào về UI, schema, LocalStorage key, framework, hay
  thư viện ngoài.

---

# 3. Kiến trúc

## 3.1. Kiến trúc hiện tại (trước Phase 1B)

```
Component (OverviewTab.js, App.js, ...)
        |
        v
ProgressService.js   (window.ProgressService)
        |
        v
progressstore.js     (window.ProgressStore)
        |
        v
LocalStorage
```

Vấn đề: `ProgressService.getVocabularyStatistics()` và
`OverviewTab.levelStats` mỗi bên tự tính Vocabulary Statistics độc lập,
không đi qua một tầng tính toán chung nào.

## 3.2. Kiến trúc mới (sau Phase 1B)

Phase 1B bổ sung một tầng tính toán mới — Calculation Layer — đứng cạnh
ProgressStore, hoàn toàn tách biệt khỏi tầng lưu trữ:

```
                    Component
                        |
                        v
                 ProgressService
                    /        \
                   v          v
           ProgressStore   StatisticsService
          (load data)      (calculate only)
                   \          /
                    v        v
                 ProgressService
                        |
                        v
                    Component
```

Đây là **quyết định kiến trúc duy nhất** của Phase 1B, không có phương án
thay thế:

- **Component KHÔNG gọi StatisticsService.** Mọi Component, kể cả
  `OverviewTab.js`, chỉ được phép gọi vào `ProgressService`. Không có
  ngoại lệ, không có trường hợp đặc biệt nào cho phép Component gọi thẳng
  `window.StatisticsService`.
- **StatisticsService KHÔNG gọi ProgressStore.** `StatisticsService`
  không được phép gọi `window.ProgressStore` dưới bất kỳ hình thức nào,
  trực tiếp hay gián tiếp.
- **StatisticsService KHÔNG đọc LocalStorage.** Không có lệnh
  `localStorage.getItem`/`setItem`/`removeItem` nào trong
  `StatisticsService.js`.
- **ProgressService là nơi duy nhất điều phối.** `ProgressService` chịu
  trách nhiệm: (1) gọi `ProgressStore` để nạp dữ liệu thô, (2) truyền dữ
  liệu đó vào `StatisticsService` để tính toán, (3) trả kết quả về cho
  Component. Không có tầng nào khác được phép đứng giữa Component và
  ProgressService.

`StatisticsService` là **Calculation Layer thuần túy**: mọi hàm bên trong
là hàm thuần (pure function) — chỉ nhận dữ liệu đã được nạp sẵn làm tham
số và trả về kết quả tính toán, không đọc bất kỳ nguồn dữ liệu nào khác,
không ghi dữ liệu, không lưu state, không có side effect.

Về mặt kỹ thuật, `StatisticsService.js` tuân thủ đúng ràng buộc hiện có
của project: JavaScript thuần, không dùng import/export, không dùng JSX,
expose qua `window.StatisticsService`, load bằng thẻ `<script src="">`.

---

# 4. Data Flow

Luồng dữ liệu đầy đủ, áp dụng cho cả hai trường hợp sử dụng của Phase 1B
(thống kê tổng và thống kê theo cấp độ HSK):

```
Component
   |
   |  gọi ProgressService.getVocabularyStatistics(words)
   |  hoặc ProgressService.getVocabularyStatisticsByLevel(wordsByLevel, levels)
   v
ProgressService
   |
   |  bước 1: nạp dữ liệu thô
   v
ProgressStore.getAllVocabularyProgress()
   |
   |  trả về progress object
   v
ProgressService
   |
   |  bước 2: truyền dữ liệu vào tầng tính toán
   v
StatisticsService.calculateVocabularyStats(progress, words)
hoặc
StatisticsService.calculateVocabularyStatsByLevel(progress, wordsByLevel, levels)
   |
   |  trả về kết quả tính toán (object thống kê)
   v
ProgressService
   |
   |  bước 3: trả nguyên kết quả về Component, không xử lý thêm
   v
Component (render UI, không đổi bố cục, không đổi số liệu)
```

Chi tiết cho từng trường hợp:

### 4.1. Thống kê tổng (App.js gọi — không đổi call site)

```
App.js
  -> ProgressService.getVocabularyStatistics(words)
       -> ProgressStore.getAllVocabularyProgress()
            => progress
       -> StatisticsService.calculateVocabularyStats(progress, words)
            => { total, learning, mastered, masteredPercent, learningPercent }
       <- trả nguyên object trên
  <- App.js nhận đúng object như hiện tại, không breaking change
```

### 4.2. Thống kê theo cấp độ HSK (OverviewTab.js gọi)

```
OverviewTab.js (trong useMemo, dependency [progress])
  -> ProgressService.getVocabularyStatisticsByLevel(wordsByLevel, levels)
       -> ProgressStore.getAllVocabularyProgress()
            => progress
       -> StatisticsService.calculateVocabularyStatsByLevel(
            progress, wordsByLevel, levels
          )
            => { stats: [...], totalMastered, totalLearning,
                 totalUnlearned, totalWordsAllLevels, totalPercent }
       <- trả nguyên object trên
  <- OverviewTab.js nhận đúng object như hiện tại, không đổi field
```

Không có Redux, Context, hay Pub/Sub trong Phase 1B — giữ nguyên nguyên
tắc đã áp dụng ở Phase 1A.

---

# 5. Public APIs

## 5.1. StatisticsService (mới) — expose qua `window.StatisticsService`

StatisticsService chỉ có đúng 2 hàm public. Phase 1B không tạo thêm bất
kỳ hàm tính toán nào khác ngoài phạm vi đã nêu ở mục 1.

### 5.1.1. `calculateVocabularyStats(progress, words)`

- **Parameters:**
  - `progress` (object, bắt buộc): dữ liệu Vocabulary Progress thô, dạng
    `{ [wordId]: "unlearned" | "learning" | "mastered" }`. Do
    `ProgressService` nạp từ `ProgressStore.getAllVocabularyProgress()`
    và truyền vào. `StatisticsService` không tự đọc dữ liệu này.
  - `words` (array, bắt buộc): danh sách từ vựng cần tính, mỗi phần tử có
    ít nhất trường `id`. Do caller (`ProgressService`) truyền vào.
- **Return value:**
```javascript
  {
    total: number,
    learning: number,
    mastered: number,
    masteredPercent: number,
    learningPercent: number
  }
```
- **Responsibility:** tính tổng số từ, số từ đang học, số từ đã thuộc, và
  phần trăm tương ứng trên toàn bộ danh sách `words` được truyền vào.
  Tương đương 1:1 với công thức hiện tại của
  `ProgressService.getVocabularyStatistics` (không đổi công thức, không
  đổi field). Hàm không có side effect, không đọc bất kỳ nguồn dữ liệu
  nào ngoài hai tham số đầu vào.

### 5.1.2. `calculateVocabularyStatsByLevel(progress, wordsByLevel, levels)`

- **Parameters:**
  - `progress` (object, bắt buộc): giống mục 5.1.1, do `ProgressService`
    nạp sẵn và truyền vào.
  - `wordsByLevel` (object, bắt buộc): danh sách từ vựng theo từng cấp
    độ HSK, dạng `{ [level]: [word, word, ...] }` (tương đương
    `window.FALLBACK_VOCABULARY` hiện tại). Do caller truyền vào —
    `StatisticsService` không tự đọc `window.FALLBACK_VOCABULARY`.
  - `levels` (array, bắt buộc): danh sách cấp độ cần tính, theo đúng thứ
    tự hiển thị (tương đương biến `allLevels` hiện có trong
    `OverviewTab.js`).
- **Return value:**
```javascript
  {
    stats: [
      {
        level: string,
        total: number,
        mastered: number,
        learning: number,
        unlearned: number,
        masteredPercent: number
      }
      // ... một phần tử cho mỗi level trong `levels`
    ],
    totalMastered: number,
    totalLearning: number,
    totalUnlearned: number,
    totalWordsAllLevels: number,
    totalPercent: number
  }
```
- **Responsibility:** tính số từ mastered/learning/unlearned và phần
  trăm hoàn thành cho từng cấp độ HSK trong `levels`, đồng thời tính
  tổng gộp trên toàn bộ các cấp độ. Tương đương 1:1 với công thức hiện
  tại của `OverviewTab.levelStats` (không đổi công thức, không đổi
  field). Hàm không có side effect, không đọc bất kỳ nguồn dữ liệu nào
  ngoài ba tham số đầu vào.

### 5.1.3. Cách expose

```javascript
window.StatisticsService = {
  calculateVocabularyStats: calculateVocabularyStats,
  calculateVocabularyStatsByLevel: calculateVocabularyStatsByLevel
};
```

Ràng buộc bắt buộc (không phải khuyến nghị): không hàm nào trong
`StatisticsService` được gọi `window.ProgressStore`, đọc LocalStorage,
hoặc đọc trực tiếp biến toàn cục (`window.FALLBACK_VOCABULARY` hay bất kỳ
biến nào khác). Mọi dữ liệu đầu vào phải đến qua tham số hàm.

## 5.2. ProgressService — API mới

### 5.2.1. `getVocabularyStatistics(words)`

- **Đã tồn tại, giữ nguyên chữ ký và giá trị trả về.** Thay đổi duy nhất
  là phần thân hàm: đọc `ProgressStore.getAllVocabularyProgress()`, sau
  đó gọi `StatisticsService.calculateVocabularyStats(progress, words)` và
  trả nguyên kết quả. Không breaking change đối với `App.js`.

### 5.2.2. `getVocabularyStatisticsByLevel(wordsByLevel, levels)`

- **Hàm mới.** Đọc `ProgressStore.getAllVocabularyProgress()`, sau đó gọi
  `StatisticsService.calculateVocabularyStatsByLevel(progress,
  wordsByLevel, levels)` và trả nguyên kết quả.
- **Parameters:** `wordsByLevel` (object), `levels` (array) — xem mô tả
  đầy đủ ở mục 5.1.2.
- **Return value:** giống hệt giá trị trả về của
  `StatisticsService.calculateVocabularyStatsByLevel` (mục 5.1.2).
- Đây là **hàm duy nhất** mà `OverviewTab.js` được phép gọi để lấy thống
  kê theo cấp độ HSK. Không có cách nào khác được phép trong Phase 1B.
- Không ảnh hưởng 19 hàm public hiện có của `ProgressService` — chỉ cộng
  thêm, không sửa, không xoá.

## 5.3. ProgressStore — không đổi

Không thêm, không sửa, không xoá bất kỳ hàm nào trong 18 hàm public hiện
tại của `window.ProgressStore`. `js/store/progressstore.js` không có
thay đổi nào trong Phase 1B.

---

# 6. Implementation Plan

Không được làm toàn bộ một lần — mỗi Step phải hoàn thành và tự audit
trước khi chuyển sang Step tiếp theo, theo đúng nguyên tắc của
`docs/HANDOFF.md`.

## Step 1 — Tạo StatisticsService

- Tạo file mới `js/services/StatisticsService.js`.
- Viết `calculateVocabularyStats(progress, words)` bằng cách di chuyển
  nguyên logic hiện có trong `ProgressService.getVocabularyStatistics`
  (hiện ở dòng 30–56 của `ProgressService.js`) sang đây, giữ nguyên công
  thức tuyệt đối, không tối ưu, không sửa logic.
- Viết `calculateVocabularyStatsByLevel(progress, wordsByLevel, levels)`
  bằng cách di chuyển nguyên logic hiện có trong `OverviewTab.levelStats`
  (hiện ở dòng 89–134 của `OverviewTab.js`) sang đây, giữ nguyên công
  thức tuyệt đối.
- Expose qua `window.StatisticsService` theo đúng mục 5.1.3.
- Thêm `<script src="js/services/StatisticsService.js">` vào
  `index.html`, đặt trước `<script src="js/services/ProgressService.js">`.
- Chưa sửa `ProgressService.js` hay `OverviewTab.js` ở Step này.
- Kiểm tra: `window.StatisticsService` tồn tại sau khi tải trang; gọi thử
  hai hàm với dữ liệu mẫu và xác nhận kết quả đúng như logic gốc; không
  có lỗi Console khi tải app (dù chưa có nơi nào gọi tới các hàm này).

## Step 2 — Tích hợp ProgressService

- Sửa phần thân `ProgressService.getVocabularyStatistics(words)`: thay
  toàn bộ logic tính toán bằng lệnh gọi
  `StatisticsService.calculateVocabularyStats(
  ProgressStore.getAllVocabularyProgress(), words)`. Giữ nguyên chữ ký
  hàm, giữ nguyên object trả về.
- Thêm hàm mới `getVocabularyStatisticsByLevel(wordsByLevel, levels)` vào
  `ProgressService.js`, export ra `window.ProgressService`.
- Kiểm tra: so sánh kết quả của `getVocabularyStatistics` trước và sau
  khi sửa, trên cùng một bộ dữ liệu `progress` mẫu, xác nhận byte-for-byte
  giống nhau. `App.js` (nơi đang gọi hàm này) không cần sửa và vẫn nhận
  đúng object như trước.

## Step 3 — OverviewTab chuyển sang dùng ProgressService.getVocabularyStatisticsByLevel()

- Sửa `OverviewTab.js`: thay toàn bộ thân hàm `levelStats` bằng lệnh gọi
  `window.ProgressService.getVocabularyStatisticsByLevel(wordsByLevel,
  levels)` bên trong `useMemo`, giữ nguyên dependency array `[progress]`.
- Không đổi bất kỳ JSX/UI nào bên dưới — các field
  `levelStats.totalMastered`, `levelStats.stats`, `levelStats.totalPercent`,
  v.v. phải giữ nguyên tên để phần render không cần sửa.
- Kiểm tra: giao diện Overview hiển thị đúng số liệu như trước khi sửa,
  so sánh trực tiếp trên cùng một bộ dữ liệu progress mẫu.

## Step 4 — Final Audit

- Quét lại toàn bộ `js/` để xác nhận không còn nơi nào (Component hay
  Service khác) tự tính lại Vocabulary Statistics ngoài
  `StatisticsService.js`.
- Grep `js/services/StatisticsService.js` để xác nhận không có
  `ProgressStore`, không có `localStorage`, không có
  `window.FALLBACK_VOCABULARY` xuất hiện trong file này — kỳ vọng 0 kết
  quả cho cả ba.
- Xác nhận `js/store/progressstore.js` không có diff (0 thay đổi).
- Xác nhận 18 hàm public của `ProgressStore` và 19+1 hàm public của
  `ProgressService` (19 hàm cũ, cộng 1 hàm mới
  `getVocabularyStatisticsByLevel`) không bị đổi tên hay chữ ký ngoài
  phần đã nêu ở mục 5.
- Chạy toàn bộ Regression Checklist ở mục 7.
- Viết `docs/PHASE_1B_PROGRESS.md` và cập nhật `docs/CHANGELOG.md` (thực
  hiện ở bước Implementation thật sự, không thuộc phạm vi tài liệu Design
  này).

---

# 7. Regression Checklist

Bắt buộc kiểm tra sau khi Implementation hoàn tất, trước khi đóng Phase 1B:

- [ ] Overview: số liệu tổng (`totalMastered`, `totalPercent`) hiển thị
      đúng như trước khi thực hiện Phase 1B.
- [ ] Overview: bảng thống kê theo từng cấp độ HSK (`levelStats.stats`)
      hiển thị đúng số liệu như trước, cho tất cả các cấp độ HSK1–HSK4.
- [ ] `App.js`: nơi gọi `ProgressService.getVocabularyStatistics` vẫn
      nhận đúng object, đúng field, đúng giá trị như trước khi sửa.
- [ ] Cập nhật tiến độ từ vựng (`updateWordProgress`) khiến số liệu
      thống kê tự cập nhật đúng trên UI ngay lập tức, không có lỗi
      caching do `useMemo` dependency sai.
- [ ] Không có lỗi Console khi tải app, khi chuyển tab, khi cập nhật
      Vocabulary Progress.
- [ ] Quiz, Flashcard, Grammar, Bookmark, Dictionary, Curriculum vẫn hoạt
      động bình thường — các domain này không thuộc phạm vi sửa nhưng
      cần xác nhận không bị ảnh hưởng gián tiếp qua thứ tự script trong
      `index.html`.
- [ ] `js/store/progressstore.js` không có diff (0 thay đổi).
- [ ] Không mất dữ liệu người dùng cũ — không đổi LocalStorage key nào.
- [ ] Toàn bộ 18 hàm public của `ProgressStore` không đổi tên/chữ ký.
- [ ] 19 hàm public hiện có của `ProgressService` không đổi tên/chữ ký
      (chỉ thêm hàm mới `getVocabularyStatisticsByLevel`, không sửa hàm
      cũ ngoài phần thân của `getVocabularyStatistics`).
- [ ] `StatisticsService.js` không chứa `ProgressStore`, không chứa
      `localStorage`, không chứa `window.FALLBACK_VOCABULARY`.
- [ ] Không có Component nào (kể cả `OverviewTab.js`) gọi trực tiếp
      `window.StatisticsService`.

---

# 8. Rollback Plan

Nếu phát hiện lỗi ở bất kỳ Step nào trong quá trình Implementation:

8.1. Mỗi Step nên được commit riêng biệt để có thể rollback từng phần
thay vì rollback toàn bộ Phase.

8.2. Nếu lỗi phát hiện ở Step 1: xoá `js/services/StatisticsService.js`
và gỡ dòng `<script>` tương ứng khỏi `index.html`. Không ảnh hưởng gì
khác vì Step 1 chưa sửa `ProgressService.js` hay `OverviewTab.js`.

8.3. Nếu lỗi phát hiện ở Step 2: khôi phục `js/services/ProgressService.js`
về phiên bản trước Phase 1B (giữ nguyên `StatisticsService.js` đã tạo ở
Step 1, vì chưa có gì gọi tới nó nên không gây lỗi). `App.js` không bị
ảnh hưởng.

8.4. Nếu lỗi phát hiện ở Step 3: khôi phục riêng `js/tabs/OverviewTab.js`
về phiên bản trước Phase 1B, giữ nguyên Step 1 và Step 2 (StatisticsService
và ProgressService vẫn hoạt động đúng, không ai gọi
`getVocabularyStatisticsByLevel` nên không phát sinh lỗi).

8.5. Không có Step nào trong Phase 1B đổi LocalStorage key, nên rollback
code ở bất kỳ Step nào cũng không ảnh hưởng dữ liệu người dùng đã lưu —
không cần migration hay khôi phục dữ liệu.

8.6. Chỉ coi Phase 1B là "đóng" sau khi Step 4 (Final Audit) xác nhận
không có vấn đề Blocking, theo đúng quy trình đã áp dụng ở Phase 1A.

---

# 9. Risks

| Rủi ro | Mức độ | Giảm thiểu |
|---|---|---|
| Sai lệch số liệu do di chuyển logic tính toán không đúng 1:1 từ `ProgressService`/`OverviewTab` sang `StatisticsService` | Trung bình | Bắt buộc so sánh byte-for-byte kết quả trước/sau ở Step 2 và Step 3 trên cùng bộ dữ liệu mẫu trước khi coi là hoàn thành, giống cách Phase 1A Step 3 đã xử lý race-case tương tự (xem CHANGELOG v0.2.1). |
| `useMemo` trong `OverviewTab.js` tính sai lại do đổi dependency hoặc gọi bất đồng bộ | Thấp | `StatisticsService` và `ProgressService` đều là hàm đồng bộ (sync), không đổi bản chất sync/async; giữ nguyên dependency array `[progress]`. |
| Thứ tự load script trong `index.html` sai khiến `ProgressService` gọi `StatisticsService` trước khi nó được định nghĩa | Trung bình | Step 1 quy định rõ `<script>` của `StatisticsService.js` phải đứng trước `ProgressService.js`; kiểm tra thủ công sau khi sửa `index.html`. |
| Vô tình để `StatisticsService` gọi `window.ProgressStore` hoặc đọc LocalStorage khi implement (tiện tay tự nạp dữ liệu thay vì nhận qua tham số) | Trung bình | Mục 3.2 và mục 5.1.3 quy định đây là ràng buộc kiến trúc bắt buộc; Step 4 (Final Audit) phải grep `ProgressStore`, `localStorage`, `FALLBACK_VOCABULARY` trong `StatisticsService.js`, kỳ vọng 0 kết quả. |
| Component gọi thẳng `StatisticsService` thay vì qua `ProgressService`, phá nguyên tắc điều phối duy nhất | Thấp | Mục 3.2 quy định rõ Component không được gọi `StatisticsService`; `getVocabularyStatisticsByLevel` trong `ProgressService` là cách duy nhất được phép; Step 3 chỉ cho phép `OverviewTab.js` gọi qua hàm này. |
| Mở rộng scope ngoài ý muốn (tiện tay sửa luôn Grammar Bookmark/Settings/Flashcard vì đang đụng vào ProgressService) | Trung bình | Mục 2.2 và mục 2.3 đã liệt kê rõ file cấm sửa và phạm vi ngoài Phase 1B; tuân thủ nghiêm ngặt nguyên tắc "Không tự ý mở rộng scope" của `AI_RULES.md`. |
| 6 hàm chưa dùng của `ProgressService` bị hiểu nhầm là cần dọn dẹp trong Phase này | Thấp | Mục 2.3 đã ghi rõ: giữ nguyên, không xoá, không thuộc phạm vi Phase 1B. |

---

# 10. Definition of Done

Phase 1B chỉ được coi là hoàn thành khi tất cả các điều kiện sau đều đạt:

- [ ] Không còn logic tính Vocabulary Statistics nào trong Component
      (`OverviewTab.js` không tự tính mastered/learning/unlearned).
- [ ] `StatisticsService.js` chỉ chứa logic tính toán thuần — không có
      side effect, không lưu state.
- [ ] `StatisticsService` không đọc LocalStorage dưới bất kỳ hình thức
      nào.
- [ ] `StatisticsService` không gọi `window.ProgressStore` dưới bất kỳ
      hình thức nào.
- [ ] `ProgressService` là nơi duy nhất điều phối giữa `ProgressStore`
      và `StatisticsService` — không có tầng nào khác đứng giữa Component
      và ProgressService.
- [ ] Không thay đổi UI, không thay đổi bố cục hiển thị của Overview.
- [ ] Không thay đổi schema dữ liệu Vocabulary Progress.
- [ ] Không thay đổi bất kỳ LocalStorage key nào đang tồn tại.
- [ ] Không thay đổi tên hoặc chữ ký của bất kỳ Public API cũ nào trong
      `ProgressStore` hoặc `ProgressService` (chỉ được thêm hàm mới
      `getVocabularyStatisticsByLevel`).
- [ ] Toàn bộ Regression Checklist (mục 7) đã được kiểm tra và đạt.
- [ ] Không có lỗi Console.
- [ ] `docs/CHANGELOG.md` được cập nhật (ở bước Implementation thật sự,
      không thuộc phạm vi tài liệu Design này).
- [ ] `docs/PHASE_1B_PROGRESS.md` được tạo, ghi lại tiến độ từng Step,
      theo đúng mẫu `docs/PHASE_1A_PROGRESS.md`.

---

# Kết luận

Phase 1B không thêm tính năng học tập mới. Mục tiêu duy nhất là đóng lại
Technical Debt #1 và #2 còn tồn đọng từ Phase 1A, hoàn thiện Calculation
Layer đã được duyệt trong thiết kế gốc nhưng chưa từng triển khai, làm
nền tảng sạch cho:

- Phase 3 — Progress Tracking
- Phase 10 — Statistics

Đây là bản thiết kế chính thức, không phải bản nháp. Tài liệu này là
Source of Truth duy nhất cho Implementation của Phase 1B kể từ thời điểm
được Project Owner Approve. Không được bắt đầu code cho Phase 1B nếu
chưa có Approve rõ ràng.

---

# End of Phase 1B Design
# HSK App — Phase 1A / Step 4: Final Audit Report

**Loại tài liệu:** Audit cuối cùng (read-only). Không có thay đổi code/tài liệu nào được thực hiện.
**Bối cảnh:** Vấn đề case-mismatch tên file trong `index.html` (mục 4.1 của audit trước) đã được xác nhận là do bạn tự xử lý ngoài phiên làm việc này. **Audit này bỏ qua mục đó**, tập trung hoàn toàn vào phần còn lại của Step 4: dead code, LocalStorage trực tiếp, API cũ/không dùng, và Single Source of Truth.
**Phương pháp:** Grep + đọc trực tiếp toàn bộ `js/store/progressstore.js`, `js/services/ProgressService.js`, `js/App.js`, `js/tabs/OverviewTab.js`, `js/tabs/QuizTab.js`, và quét chéo toàn bộ `js/` để tìm truy cập LocalStorage trực tiếp, hàm mồ côi (orphan), và logic tính toán trùng lặp.

---

## 1. Re-audit toàn bộ source code (sau khi bỏ qua index.html)

Đã quét lại toàn bộ project (`js/**/*.js`) cho:

- Mọi lệnh gọi `localStorage.getItem / setItem / removeItem` trong toàn bộ codebase.
- Mọi tham chiếu trực tiếp tới 5 key thuộc domain Progress: `hsk_learning_progress`, `hskpro_translation_progress_v1`, `hsk_bookmarks`, `hsk_study_streak`, `hsk_last_active_date`.
- So khớp danh sách hàm được `function` định nghĩa với danh sách hàm được export qua `window.ProgressStore` / `window.ProgressService`, để tìm hàm mồ côi (định nghĩa nhưng không export, không dùng).
- So khớp danh sách hàm export của `ProgressService` với số lần thực sự được gọi (`ProgressService.xxx`) trong toàn bộ UI.

Kết quả chi tiết ở các mục bên dưới.

---

## 2. Dead code liên quan đến Phase 1A

**Không phát hiện dead code kiểu "code cũ bị bỏ lại"** (không còn comment cũ, không còn hàm localStorage cũ bị comment out, không còn nhánh logic song song đọc localStorage trực tiếp cho domain Progress).

Cụ thể:
- `progressstore.js`: mọi hàm `function` định nghĩa (22 hàm, gồm cả helper nội bộ `readJSON/writeJSON/readString/writeString/getBookmarkWordId`) đều được dùng — hoặc export ra `window.ProgressStore` (18 hàm), hoặc dùng nội bộ. Không có hàm mồ côi.
- `ProgressService.js`: 19 hàm định nghĩa, toàn bộ đều được export ra `window.ProgressService`. Không có hàm mồ côi.
- `QuizTab.js` / `OverviewTab.js`: không còn logic đọc/ghi `hskpro_translation_progress_v1` trực tiếp, không còn nhánh code cũ song song.

**Một điểm cần lưu ý (không phải dead code, mà là scope-gap):**
`PHASE_1A_DESIGN.md` (mục 8 và mục 11) quy định tạo mới `js/services/statisticsService.js` làm nơi tập trung các phép tính thống kê (`calculateVocabularyStats`, `calculateLessonStats`, `calculateStreakDisplay`...), tách biệt khỏi ProgressStore/ProgressService. **File này chưa từng được tạo**, và không có ghi nhận nào trong `CHANGELOG.md` hay `PHASE_1A_PROGRESS.md` giải thích việc này bị bỏ qua có chủ đích hay chỉ đơn giản là chưa làm tới. Hệ quả cụ thể ở mục 5.

**6 hàm public của `ProgressService` hiện chưa được UI nào gọi tới:**
`getMasteredWords`, `getLearningWords`, `getUnlearnedWords`, `getCurrentStreak`, `isWordMastered`, `isWordLearning` — 0 call site trong toàn bộ `js/tabs/*.js`, `js/App.js`, `js/components/*.js`.

Đây **không phải dead code** theo nghĩa "còn sót lại sau khi refactor" (các hàm này được tạo mới trong Phase 1A, không kế thừa từ code cũ), mà là API được chuẩn bị sẵn cho các Phase sau (Daily Learning, Statistics...) nhưng chưa dùng tới. Không vi phạm nguyên tắc gì, nhưng cần ghi nhận là "API surface chưa dùng" để không bị nhầm là hàm thừa cần xoá.

---

## 3. Component truy cập LocalStorage trực tiếp cho domain Progress

Đã quét toàn bộ `js/` (bao gồm cả các tab chưa từng nằm trong phạm vi Phase 1A) cho 5 key thuộc domain Progress:

| Key | Domain | Truy cập trực tiếp ngoài `progressstore.js`? |
|---|---|---|
| `hsk_learning_progress` | Vocabulary Progress | ❌ Không có |
| `hskpro_translation_progress_v1` | Lesson Progress | ❌ Không có |
| `hsk_bookmarks` | Bookmark | ❌ Không có |
| `hsk_study_streak` | Study Activity | ❌ Không có |
| `hsk_last_active_date` | Study Activity | ❌ Không có |
| (Backup — không có key riêng, tổng hợp từ 2 domain trên) | Backup | ❌ Không có logic export/import song song ở nơi khác |

**Kết luận mục 3: ĐẠT.** Toàn bộ 5 domain thuộc phạm vi Phase 1A (Vocabulary Progress, Lesson Progress, Bookmark, Study Activity, Backup) không còn bất kỳ component nào — kể cả các tab ngoài phạm vi ban đầu như `FlashcardTab.js`, `GrammarTab.js`, `CurriculumTab.js`, `DictionaryTab.js`, `BookmarksTab.js` — truy cập trực tiếp LocalStorage cho các key này. Mọi truy cập đều đi qua `ProgressStore`/`ProgressService`.

Các truy cập LocalStorage trực tiếp còn lại trong project đều thuộc domain **ngoài phạm vi Phase 1A** theo đúng định nghĩa của `PHASE_1A_DESIGN.md` mục 5 (chỉ định nghĩa 4 domain: Vocabulary, Lesson, Bookmark, Study Activity — không gồm Settings/Grammar-bookmark/Flashcard-custom):

- `App.js`: `hsk_zh_voice`, `hsk_vi_voice`, `hsk_speech_rate`, `hsk_dark_mode` — domain Settings.
- `QuizTab.js`: `hskpro_active_translation_lesson_id` — tín hiệu điều hướng, đã được `CHANGELOG.md` v0.2.0 xác nhận cố ý nằm ngoài phạm vi.
- `GrammarTab.js`: `hsk_grammar_bookmarks`, `hsk_grammar_learned` — domain riêng của Grammar, chưa từng thuộc phạm vi sửa của Phase 1A.
- `FlashcardTab.js`: `flashcard_custom_lessons`, `flashcard_custom_words` — domain riêng của Flashcard, chưa từng thuộc phạm vi sửa của Phase 1A.

---

## 4. API cũ / code không còn sử dụng sau khi chuyển sang ProgressService

- Không phát hiện API cũ nào (hàm/biến) bị bỏ lại sau migration. Việc chuyển đổi ở `OverviewTab.js` và `QuizTab.js` được thực hiện gọn — hàm wrapper cũ như `saveTranslationScore` trong `QuizTab.js` vẫn giữ tên hàm cũ nhưng **nội dung bên trong đã trỏ hoàn toàn sang `window.ProgressService.recordLessonScore`**, không còn logic localStorage cũ bên trong.
- Một chi tiết rất nhỏ, không ảnh hưởng hành vi: comment tại dòng 104 của `QuizTab.js` — *"Hàm lưu điểm luyện dịch tự động đồng bộ xuống LocalStorage của OverviewTab"* — là comment còn sót lại từ trước khi có ProgressService, mô tả không còn chính xác 100% cơ chế thực tế (nay đi qua ProgressService/ProgressStore chứ không "tự động đồng bộ" trực tiếp). Đây là vấn đề tài liệu/comment, không phải logic.
- Như nêu ở mục 2, 6 hàm của `ProgressService` (nhóm liên quan thống kê mastered/learning/unlearned theo từ + streak) hiện chưa được gọi ở đâu — không phải "API cũ", mà là API mới chưa dùng.

---

## 5. Kiểm tra Single Source of Truth (SSOT)

### 5.1 Tầng dữ liệu (data layer) — ĐẠT
Toàn bộ dữ liệu của 5 domain Progress chỉ có **một nguồn đọc/ghi duy nhất**: `ProgressStore` → LocalStorage. Không có component nào giữ bản sao dữ liệu độc lập rồi tự ghi song song. `progress`, `bookmarks`, `streak` trong `App.js` đều được khởi tạo và cập nhật thông qua `window.ProgressService`, sau đó truyền xuống các tab con qua props — đúng luồng một chiều `Component → Service → Store → LocalStorage` như thiết kế.

### 5.2 Tầng tính toán (calculation layer) — CHƯA ĐẠT HOÀN TOÀN

Phát hiện một điểm vi phạm nhẹ nguyên tắc SSOT ở tầng logic tính toán (không phải tầng dữ liệu):

`OverviewTab.js` (hàm `levelStats`, dùng `useMemo`) tự tính toán số từ mastered/learning/unlearned **theo từng cấp độ HSK** trực tiếp từ prop `progress` và `window.FALLBACK_VOCABULARY`, hoàn toàn độc lập với `window.ProgressService.getVocabularyStatistics()` — hàm này đã tồn tại và đang được `App.js` dùng để tính thống kê **tổng** (không chia theo cấp độ).

- Về **dữ liệu nguồn**: không vi phạm — cả hai đều đọc từ cùng một `progress` object gốc.
- Về **logic nghiệp vụ**: vi phạm nhẹ — "thế nào là mastered/learning/unlearned" và cách tính phần trăm hiện đang được **viết hai lần** ở hai nơi khác nhau (`ProgressService.getVocabularyStatistics` và `OverviewTab.levelStats`), thay vì tập trung vào một service tính toán duy nhất.
- Đây chính xác là loại vấn đề mà `statisticsService.js` (được thiết kế trong `PHASE_1A_DESIGN.md` mục 8 nhưng chưa từng tạo — xem mục 2) được sinh ra để giải quyết. Việc thiếu file này là nguyên nhân gốc khiến `OverviewTab.js` phải tự viết logic tính toán riêng.

### 5.3 Kết luận mục 5
- SSOT cho **dữ liệu** (nơi lưu trữ): ✅ Đạt tuyệt đối cho cả 5 domain.
- SSOT cho **logic tính toán thống kê**: ⚠️ Chưa đạt hoàn toàn — tồn tại 2 cách tính thống kê vocabulary progress song song (aggregate ở ProgressService, per-level ở OverviewTab). Không gây sai lệch dữ liệu ở thời điểm hiện tại (cả hai cùng đọc đúng 1 nguồn), nhưng là rủi ro bảo trì: nếu sau này logic "thế nào là mastered" thay đổi (ví dụ thêm SRS), phải nhớ sửa ở cả 2 nơi.

---

## 6. Danh sách vấn đề còn lại — phân loại

### 🔴 Blocking (phải xử lý trước khi tuyên bố Phase 1A hoàn tất)

*Không có.* Sau khi loại trừ vấn đề `index.html` (đã tự xử lý), audit này không phát hiện vấn đề nào ở mức đủ nghiêm trọng để coi là blocking đối với Definition of Done đã nêu trong `PHASE_1A_DESIGN.md` mục 14 (không mất dữ liệu, không đổi UI, các tab vẫn hoạt động, không còn LocalStorage trực tiếp cho domain Progress). Tất cả tiêu chí liên quan tới code đã được xác minh đạt bằng phân tích tĩnh.

### 🟡 Technical Debt (để lại cho Phase sau)

1. **Thiếu `js/services/statisticsService.js`** — đã được duyệt trong thiết kế (`PHASE_1A_DESIGN.md` mục 8, mục 11) nhưng chưa từng được tạo. Nên tạo ở Phase Statistics/Progress Tracking, và khi đó nên dời logic `levelStats` của `OverviewTab.js` vào đây để giải quyết trùng lặp nêu ở mục 5.2.
2. **Logic tính vocabulary statistics bị viết 2 lần** (`ProgressService.getVocabularyStatistics` — tổng, và `OverviewTab.levelStats` — theo cấp độ). Nên hợp nhất khi `statisticsService.js` ra đời.
3. **6 hàm public của `ProgressService` chưa được sử dụng** (`getMasteredWords`, `getLearningWords`, `getUnlearnedWords`, `getCurrentStreak`, `isWordMastered`, `isWordLearning`). Giữ nguyên vì có khả năng dùng cho Phase 2 (Daily Learning) / Phase 10 (Statistics), nhưng nên được rà soát lại khi các Phase đó bắt đầu — nếu vẫn không dùng sau 2-3 Phase, nên cân nhắc bỏ để giảm bề mặt API không cần thiết.
4. **Bookmark bị phân mảnh 2 cơ chế**: bookmark từ vựng qua `ProgressStore`, bookmark ngữ pháp (`hsk_grammar_bookmarks`) qua localStorage trực tiếp trong `GrammarTab.js`. Ngoài phạm vi Phase 1A nhưng nên hợp nhất khi mở rộng ProgressStore cho Grammar.
5. **Domain Settings** (`hsk_zh_voice`, `hsk_vi_voice`, `hsk_speech_rate`, `hsk_dark_mode`) và **Flashcard custom data** (`flashcard_custom_lessons`, `flashcard_custom_words`) vẫn thao tác localStorage trực tiếp trong `App.js`/`FlashcardTab.js`. Ngoài phạm vi domain Phase 1A định nghĩa, nhưng là nợ kỹ thuật cần cân nhắc nếu ProgressStore được mở rộng thành "Store chung" cho toàn app trong tương lai.

### 🟢 Documentation Issues (cập nhật sau khi Phase 1A hoàn tất — không làm trong audit này)

1. `PROJECT_STATUS.md`, `HANDOVER.md` đang mô tả trạng thái Phase 1A **cũ hơn thực tế** (trước khi Step 3 hoàn thành) — cần đồng bộ lại với `PHASE_1A_PROGRESS.md`.
2. `HANDOFF.md` tham chiếu `docs/README.md` — file không tồn tại.
3. `CHANGELOG.md` v0.2.1 ghi sai số hàm public của `ProgressService` (18 thay vì 19 thực tế).
4. `PHASE_1A_DESIGN.md` mục 5.1 mô tả giá trị schema là `"new"`, thực tế code dùng `"unlearned"`.
5. Comment trong `QuizTab.js` (dòng 104, hàm `saveTranslationScore`) mô tả cơ chế lưu điểm không còn chính xác 100% sau khi đã chuyển qua ProgressService.
6. Chưa có tài liệu nào xác nhận rõ ràng việc `statisticsService.js` bị lùi sang Phase sau là quyết định có chủ đích — nên bổ sung một dòng ghi chú trong `PHASE_1A_PROGRESS.md` hoặc `CHANGELOG.md` để tránh hiểu nhầm là bị quên.

---

## 7. Kết luận

### 7.1 Phase 1A đã đạt Definition of Done chưa?

**Đạt — với điều kiện coi vấn đề `index.html` đã được xử lý (theo xác nhận của bạn) và với ghi nhận 2 khoảng hở nhẹ ở mức Technical Debt / Documentation, không phải Blocking.**

Đối chiếu lại với `PHASE_1A_DESIGN.md` mục 14:

| Tiêu chí DoD | Trạng thái sau audit lần 2 |
|---|---|
| Không còn component ghi LocalStorage trực tiếp cho domain Progress | ✅ Đạt |
| Progress Store hoạt động ổn định | ✅ Đạt (giả định vấn đề index.html đã được xử lý) |
| Không mất dữ liệu người dùng cũ | ✅ Đạt — không đổi key, không đổi schema |
| Bookmark / Quiz / Flashcard / Grammar vẫn hoạt động | ✅ Đạt theo phân tích code (không phát hiện lỗi logic) |
| Overview hiển thị đúng | ✅ Đạt theo phân tích code |
| Không có lỗi Console | ✅ Đạt, với điều kiện vấn đề index.html đã được xử lý đúng |
| Không thay đổi giao diện | ✅ Đạt |
| CHANGELOG.md được cập nhật | ✅ Đạt |
| ROADMAP.md cập nhật trạng thái Phase 1A | ✅ Đạt (về hình thức; nội dung cần đồng bộ lại các tài liệu khác — xem mục 6, Documentation Issues) |

### 7.2 Việc còn lại (nếu muốn xử lý dứt điểm 100% trước khi coi Phase 1A "đóng sổ" hoàn toàn)

Không có việc nào bắt buộc phải làm trước khi kết thúc Phase 1A (không có mục Blocking). Các việc còn lại, tùy bạn quyết định thời điểm xử lý:

- **Nên làm ngay khi đóng Phase 1A** (thuộc Documentation Issues, chi phí thấp): đồng bộ `PROJECT_STATUS.md`/`HANDOVER.md` với `PHASE_1A_PROGRESS.md`, sửa reference `docs/README.md` trong `HANDOFF.md`, sửa lại con số hàm trong `CHANGELOG.md` v0.2.1.
- **Có thể để dành cho Phase sau** (thuộc Technical Debt): tạo `statisticsService.js` và hợp nhất logic tính thống kê, rà soát 6 hàm `ProgressService` chưa dùng, cân nhắc hợp nhất 2 cơ chế Bookmark, xem xét mở rộng ProgressStore cho Settings/Flashcard custom data.

Theo đúng yêu cầu, tôi **không thực hiện** bất kỳ thay đổi code hay tài liệu nào, và **không bắt đầu Phase 1B**. Đề xuất khắc phục cụ thể (nếu có) sẽ chỉ được đưa ra khi bạn xác nhận muốn tiến hành.

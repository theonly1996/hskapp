# Phase 1A Design

# Unified Learning Progress & Progress Store Foundation

Version: 1.0.0

Status: Approved Design
Implementation: Not Started

---

# 1. Mục tiêu

Phase 1A nhằm mục tiêu thống nhất cách quản lý dữ liệu tiến độ học tập trong ứng dụng HSK.

Hiện tại dữ liệu Progress đang được quản lý ở nhiều nơi:

* App.js
* QuizTab.js
* OverviewTab.js
* LocalStorage với nhiều key khác nhau

Điều này tạo ra nhiều nguồn dữ liệu khác nhau (Multiple Sources of Truth), gây khó khăn cho việc phát triển các tính năng tương lai:

* Daily Learning
* Progress Tracking
* Statistics
* Spaced Repetition (SRS)

Sau Phase 1A:

* Progress sẽ được quản lý thông qua một lớp trung gian duy nhất: Progress Store.
* Component không được thao tác LocalStorage trực tiếp.
* Dữ liệu học tập hiện tại được giữ nguyên.
* Không thay đổi giao diện người dùng.

---

# 2. Phạm vi Phase 1A

## Bao gồm

* Tạo lớp Progress Store.
* Chuẩn hóa việc đọc/ghi Progress.
* Di chuyển logic LocalStorage ra khỏi component.
* Giữ nguyên dữ liệu người dùng hiện tại.
* Chuẩn bị nền tảng cho các Phase tiếp theo.

## Không bao gồm

* Không thay đổi UI.
* Không thêm tính năng học mới.
* Không triển khai Daily Learning.
* Không triển khai SRS.
* Không triển khai Statistics nâng cao.
* Không thay đổi dữ liệu HSK.
* Không đổi framework.
* Không thêm thư viện.

---

# 3. Nguyên tắc kiến trúc

## Single Source of Truth

Progress Store là nơi duy nhất chịu trách nhiệm quản lý dữ liệu tiến độ.

Luồng:

```
Component

↓

Progress Store

↓

LocalStorage

↓

React State

↓

UI
```

Component không được:

* localStorage.getItem()
* localStorage.setItem()

trực tiếp.

---

# 4. Môi trường kỹ thuật hiện tại

Project hiện tại không sử dụng:

* Vite
* Webpack
* ES Module
* package.json
* import/export

Cơ chế load:

* JavaScript thuần dùng `<script src="">`
* JSX component dùng Babel Standalone

Vì vậy:

Progress Store phải:

* Là JavaScript thuần.
* Không dùng import/export.
* Không dùng JSX.
* Expose qua window.

Ví dụ:

```javascript
window.ProgressStore
```

---

# 5. Cấu trúc dữ liệu Progress Store v1

Progress Store v1 chỉ quản lý dữ liệu thô.

Không lưu dữ liệu có thể tính toán lại.

---

## 5.1 Vocabulary Progress

Nguồn hiện tại:

```
hsk_learning_progress
```

Giữ nguyên schema:

```javascript
{
  [wordId]: "new" | "learning" | "mastered"
}
```

Không thêm field SRS trong Phase này.

---

## 5.2 Lesson Progress

Nguồn hiện tại:

```
hskpro_translation_progress_v1
```

Schema giữ nguyên:

```javascript
[
 {
   lessonId,
   level,
   title,
   isCompleted,
   currentScore
 }
]
```

---

## 5.3 Bookmarks

Nguồn hiện tại:

```
hsk_bookmarks
```

Giữ nguyên cấu trúc.

---

## 5.4 Study Activity

Nguồn hiện tại:

```
hsk_study_streak
hsk_last_active_date
```

Đây là trạng thái hoạt động học tập hiện tại.

Schema:

```javascript
{
 lastActiveDate: string,
 currentStreak: number
}
```

Không phải Statistics.

---

# 6. Domain chưa triển khai

## Quiz History

Chưa có trong Phase 1A.

Không tạo:

* LocalStorage key.
* API.
* Logic.

Được ghi nhận là kế hoạch tương lai.

---

## Review Status / SRS

Chưa có trong Phase 1A.

Không tạo:

* nextReviewDate
* interval
* easeFactor

Sẽ thiết kế ở Phase SRS riêng.

---

# 7. Progress Store API v1

## Vocabulary

```javascript
getWordProgress(wordId)

updateWordProgress(wordId, status)

getAllVocabularyProgress()
```

---

## Lesson

```javascript
getLessonProgress(lessonId)

getAllLessonProgress()

markLessonComplete(lessonId, score)

toggleLessonManual(lessonId)
```

---

## Bookmark

```javascript
addBookmark(word)

removeBookmark(wordId)

isBookmarked(wordId)

getAllBookmarks()
```

---

## Study Activity

```javascript
recordDailyActivity()

getStudyActivity()
```

---

# 8. Statistics Service

Statistics không thuộc Progress Store.

Statistics là lớp tính toán riêng.

Vị trí:

```
js/services/statisticsService.js
```

Nguyên tắc:

* Không đọc LocalStorage.
* Không ghi dữ liệu.
* Không lưu state.

Chỉ nhận dữ liệu và trả kết quả.

Ví dụ:

```javascript
calculateVocabularyStats()

calculateLessonStats()

calculateStreakDisplay()
```

---

# 9. Data Flow

Ví dụ hoàn thành bài Quiz:

```
User Action

↓

QuizTab

↓

ProgressStore.markLessonComplete()

↓

Save LocalStorage

↓

Return dữ liệu mới

↓

App.js cập nhật React State

↓

UI Render lại
```

Không có:

* Redux
* Context
* Pub/Sub

trong Phase 1A.

---

# 10. Migration Strategy

Mục tiêu:

Không mất dữ liệu người dùng.

Phase 1A:

Giữ nguyên LocalStorage key hiện tại:

```
hsk_learning_progress

hskpro_translation_progress_v1

hsk_bookmarks

hsk_study_streak

hsk_last_active_date
```

Progress Store chỉ đóng vai trò quản lý.

Không migrate dữ liệu sang format mới.

Không xóa key cũ.

---

# 11. File được phép sửa

## Tạo mới

```
js/store/progressStore.js

js/services/statisticsService.js
```

---

## Có thể sửa

```
index.html

js/App.js

js/tabs/OverviewTab.js

js/tabs/QuizTab.js
```

---

# 12. File không được sửa

Không thay đổi:

```
hsk1.js
hsk2.js
hsk3.js
hsk4.js

hsk_curriculum.js

hsk_grammar.js

hsk_stories.js

css/style.css
```

Các component hiển thị thuần:

```
WordCard.js
Hanzicharacter.js
Toast.js
LoadingScreen.js
```

---

# 13. Thứ tự triển khai

Không được làm toàn bộ một lần.

## Step 1

Tạo:

```
progressStore.js
```

Chưa sửa component.

---

## Step 2

Tích hợp:

```
App.js
```

Thay thế việc đọc/ghi LocalStorage.

---

## Step 3

Tích hợp:

```
OverviewTab.js
QuizTab.js
```

---

## Step 4

Kiểm thử.

---

# 14. Definition of Done

Phase 1A chỉ hoàn thành khi:

* Không còn component ghi LocalStorage trực tiếp.
* Progress Store hoạt động ổn định.
* Không mất dữ liệu người dùng cũ.
* Bookmark vẫn hoạt động.
* Quiz vẫn hoạt động.
* Flashcard vẫn hoạt động.
* Grammar vẫn hoạt động.
* Overview hiển thị đúng.
* Không có lỗi Console.
* Không thay đổi giao diện.
* CHANGELOG.md được cập nhật.
* ROADMAP.md cập nhật trạng thái Phase 1A.

---

# 15. Rollback Plan

Nếu xảy ra lỗi:

1. Khôi phục commit trước Phase 1A.
2. Không xóa LocalStorage cũ.
3. Giữ dữ liệu người dùng nguyên trạng.
4. Chỉ migration khi đã kiểm tra thành công.

---

# Kết luận

Phase 1A không tạo tính năng mới.

Mục tiêu duy nhất:

Xây dựng nền tảng quản lý Progress an toàn, ổn định, sẵn sàng cho các Phase:

* Daily Learning
* Progress Tracking
* Statistics
* SRS
* HSK mở rộng

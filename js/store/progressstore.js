/**
 * ProgressStore
 *
 * Phase 1A - Step 1 (đã cập nhật sau khi review source code thực tế)
 *
 * Lớp trung gian DUY NHẤT chịu trách nhiệm đọc/ghi dữ liệu Progress
 * trong LocalStorage. Component không được gọi localStorage.getItem()
 * / localStorage.setItem() trực tiếp.
 *
 * Đây là JavaScript thuần, không dùng import/export, không dùng JSX.
 * Được expose ra ngoài thông qua window.ProgressStore.
 *
 * Progress Store v1 chỉ quản lý dữ liệu thô (raw data).
 * Không có in-memory cache: mỗi lần gọi API đều đọc trực tiếp từ LocalStorage.
 * Không tính toán / suy diễn dữ liệu (việc đó thuộc statisticsService,
 * sẽ được tạo ở bước khác).
 *
 * ProgressStore là ADAPTER tương thích 100% với LocalStorage hiện tại
 * (đúng schema, đúng format, đúng hành vi đang chạy trong App.js /
 * OverviewTab.js / QuizTab.js). Không migrate, không đổi schema.
 *
 * Các LocalStorage key được giữ nguyên như hiện tại:
 *   - hsk_learning_progress          { [wordId]: "unlearned" | "learning" | "mastered" }
 *   - hskpro_translation_progress_v1 [{ lessonId, level, title, isCompleted, currentScore }]
 *   - hsk_bookmarks                  [ wordObject, ... ]  (identifier: word.id)
 *   - hsk_study_streak               chuỗi số, ví dụ "3"
 *   - hsk_last_active_date           new Date().toDateString(), ví dụ "Wed Jul 08 2026"
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // LocalStorage keys (giữ nguyên, không đổi tên, không thêm key mới)
  // ---------------------------------------------------------------------

  var KEYS = {
    VOCABULARY_PROGRESS: "hsk_learning_progress",
    LESSON_PROGRESS: "hskpro_translation_progress_v1",
    BOOKMARKS: "hsk_bookmarks",
    STUDY_STREAK: "hsk_study_streak",
    LAST_ACTIVE_DATE: "hsk_last_active_date",
    // Các key này được đọc/ghi trực tiếp bởi GrammarTab.js/FlashcardTab.js
    // (ngoài phạm vi ProgressStore ban đầu), nhưng vẫn là dữ liệu người
    // dùng cần được sao lưu/khôi phục đầy đủ — xem mục 5 (BACKUP) bên dưới.
    GRAMMAR_BOOKMARKS: "hsk_grammar_bookmarks",
    GRAMMAR_LEARNED: "hsk_grammar_learned",
    FLASHCARD_CUSTOM_LESSONS: "flashcard_custom_lessons",
    FLASHCARD_CUSTOM_WORDS: "flashcard_custom_words"
  };

  // ---------------------------------------------------------------------
  // Helpers nội bộ đọc/ghi LocalStorage an toàn
  // ---------------------------------------------------------------------

  /**
   * Đọc và parse JSON từ LocalStorage.
   * Trả về defaultValue nếu key không tồn tại hoặc dữ liệu bị hỏng.
   */
  function readJSON(key, defaultValue) {
    var raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("[ProgressStore] Lỗi parse JSON cho key '" + key + "':", e);
      return defaultValue;
    }
  }

  /**
   * Ghi giá trị (đã JSON.stringify) vào LocalStorage.
   */
  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("[ProgressStore] Lỗi ghi LocalStorage cho key '" + key + "':", e);
    }
  }

  /**
   * Đọc một giá trị chuỗi thuần (không phải JSON) từ LocalStorage.
   */
  function readString(key, defaultValue) {
    var raw = localStorage.getItem(key);
    return raw === null || raw === undefined ? defaultValue : raw;
  }

  /**
   * Ghi một giá trị chuỗi thuần vào LocalStorage.
   */
  function writeString(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("[ProgressStore] Lỗi ghi LocalStorage cho key '" + key + "':", e);
    }
  }

  /**
   * Lấy id định danh của một "word" dùng cho Bookmark.
   * Đúng như code thực tế (App.js: toggleBookmark so khớp bằng `b.id`):
   * identifier luôn là `word.id`. Không tự suy diễn hay tạo id khác.
   */
  function getBookmarkWordId(word) {
    if (word === null || word === undefined) {
      return null;
    }
    return word.id;
  }

  // =======================================================================
  // 1. VOCABULARY PROGRESS
  // Key: hsk_learning_progress
  // Schema: { [wordId]: "unlearned" | "learning" | "mastered" }
  // Lưu ý: "unlearned" vừa là giá trị mặc định khi wordId chưa có trong
  // object, vừa là giá trị được GHI TRỰC TIẾP khi người dùng reset trạng
  // thái một từ (đúng như FlashcardTab.js: onChangeStatus(id, 'unlearned')).
  // =======================================================================

  /**
   * Lấy trạng thái học của một từ.
   * @param {string} wordId
   * @returns {string|null} "unlearned" | "learning" | "mastered" hoặc null nếu chưa có dữ liệu.
   */
  function getWordProgress(wordId) {
    var progress = readJSON(KEYS.VOCABULARY_PROGRESS, {});
    return Object.prototype.hasOwnProperty.call(progress, wordId)
      ? progress[wordId]
      : null;
  }

  /**
   * Cập nhật trạng thái học của một từ.
   * @param {string} wordId
   * @param {string} status "unlearned" | "learning" | "mastered"
   * @returns {object} Toàn bộ dữ liệu Vocabulary Progress sau khi cập nhật.
   */
  function updateWordProgress(wordId, status) {
    var progress = readJSON(KEYS.VOCABULARY_PROGRESS, {});
    progress[wordId] = status;
    writeJSON(KEYS.VOCABULARY_PROGRESS, progress);
    return progress;
  }

  /**
   * Lấy toàn bộ dữ liệu Vocabulary Progress.
   * @returns {object} { [wordId]: status }
   */
  function getAllVocabularyProgress() {
    return readJSON(KEYS.VOCABULARY_PROGRESS, {});
  }

  /**
   * Ghi đè toàn bộ dữ liệu Vocabulary Progress bằng dữ liệu cho trước.
   * Dùng cho chức năng Import backup (App.js: importData).
   * Không xử lý / validate / migrate dữ liệu — ghi nguyên trạng object
   * truyền vào xuống đúng key hsk_learning_progress.
   * @param {object} data { [wordId]: status }
   * @returns {object} Dữ liệu vừa ghi.
   */
  function replaceAllVocabularyProgress(data) {
    writeJSON(KEYS.VOCABULARY_PROGRESS, data);
    return data;
  }

  // =======================================================================
  // 2. LESSON PROGRESS
  // Key: hskpro_translation_progress_v1
  // Schema: [ { lessonId, level, title, isCompleted, currentScore } ]
  // =======================================================================

  /**
   * Lấy tiến độ của một lesson.
   * @param {string} lessonId
   * @returns {object|null}
   */
  function getLessonProgress(lessonId) {
    var lessons = readJSON(KEYS.LESSON_PROGRESS, []);
    for (var i = 0; i < lessons.length; i++) {
      if (lessons[i].lessonId === lessonId) {
        return lessons[i];
      }
    }
    return null;
  }

  /**
   * Lấy toàn bộ danh sách Lesson Progress.
   * @returns {Array}
   */
  function getAllLessonProgress() {
    return readJSON(KEYS.LESSON_PROGRESS, []);
  }

  /**
   * Đánh dấu một lesson đã hoàn thành với điểm số cho trước.
   *
   * Đúng hành vi thực tế trong QuizTab.js (saveTranslationScore):
   * - Nếu lesson đã tồn tại: isCompleted = true, currentScore chỉ được
   *   CẬP NHẬT khi điểm mới CAO HƠN điểm cũ. Điểm mới thấp hơn sẽ KHÔNG
   *   ghi đè điểm cao đã đạt trước đó.
   * - Nếu lesson chưa tồn tại trong danh sách: tạo entry mới. `level` và
   *   `title` lấy từ tham số `meta` nếu được truyền vào (đúng hành vi
   *   saveTranslationScore hiện tại của QuizTab.js, nơi level/title được
   *   suy ra từ dữ liệu bài học trước khi tạo entry mới); nếu không có
   *   `meta`, giữ hành vi cũ là để null.
   *
   * @param {string|number} lessonId
   * @param {number} score
   * @param {{level?: (number|null), title?: (string|null)}} [meta] Chỉ dùng khi tạo entry mới.
   * @returns {object} Entry lesson sau khi cập nhật.
   */
  function markLessonComplete(lessonId, score, meta) {
    var lessons = readJSON(KEYS.LESSON_PROGRESS, []);
    var entry = null;

    for (var i = 0; i < lessons.length; i++) {
      if (lessons[i].lessonId === lessonId) {
        entry = lessons[i];
        break;
      }
    }

    if (entry) {
      entry.isCompleted = true;
      entry.currentScore = score > entry.currentScore ? score : entry.currentScore;
    } else {
      entry = {
        lessonId: lessonId,
        level: (meta && meta.level !== undefined) ? meta.level : null,
        title: (meta && meta.title !== undefined) ? meta.title : null,
        isCompleted: true,
        currentScore: score
      };
      lessons.push(entry);
    }

    writeJSON(KEYS.LESSON_PROGRESS, lessons);
    return entry;
  }

  /**
   * Đảo trạng thái hoàn thành (isCompleted) của một lesson theo thao tác thủ công.
   * Nếu lesson chưa tồn tại, tạo entry mới với isCompleted = true.
   * @param {string} lessonId
   * @returns {object} Entry lesson sau khi cập nhật.
   */
  function toggleLessonManual(lessonId) {
    var lessons = readJSON(KEYS.LESSON_PROGRESS, []);
    var entry = null;

    for (var i = 0; i < lessons.length; i++) {
      if (lessons[i].lessonId === lessonId) {
        entry = lessons[i];
        break;
      }
    }

    if (entry) {
      entry.isCompleted = !entry.isCompleted;
    } else {
      entry = {
        lessonId: lessonId,
        level: null,
        title: null,
        isCompleted: true,
        currentScore: null
      };
      lessons.push(entry);
    }

    writeJSON(KEYS.LESSON_PROGRESS, lessons);
    return entry;
  }

  /**
   * Ghi đè toàn bộ danh sách Lesson Progress bằng dữ liệu cho trước.
   * Dùng cho việc đồng bộ dữ liệu mặc định (ProgressService.syncLessonProgress).
   * Không xử lý / validate / migrate dữ liệu — ghi nguyên trạng mảng
   * truyền vào xuống đúng key hskpro_translation_progress_v1.
   * @param {Array} data [ { lessonId, level, title, isCompleted, currentScore } ]
   * @returns {Array} Dữ liệu vừa ghi.
   */
  function replaceAllLessonProgress(data) {
    writeJSON(KEYS.LESSON_PROGRESS, data);
    return data;
  }

  // =======================================================================
  // 3. BOOKMARK
  // Key: hsk_bookmarks
  // Schema: [ wordObject, ... ] — mảng chứa nguyên vẹn object từ vựng.
  // Identifier: word.id (đúng như App.js: toggleBookmark so khớp bằng b.id).
  // Không tự tạo id khác, không thay đổi cấu trúc wordObject khi lưu.
  // =======================================================================

  /**
   * Thêm một từ vào danh sách Bookmark (nếu chưa tồn tại, so khớp theo word.id).
   * @param {object} word Object từ vựng đầy đủ, phải có field `id`.
   * @returns {Array} Danh sách Bookmark sau khi cập nhật.
   */
  function addBookmark(word) {
    var bookmarks = readJSON(KEYS.BOOKMARKS, []);
    var wordId = getBookmarkWordId(word);

    var alreadyExists = bookmarks.some(function (item) {
      return getBookmarkWordId(item) === wordId;
    });

    if (!alreadyExists) {
      bookmarks.push(word);
      writeJSON(KEYS.BOOKMARKS, bookmarks);
    }

    return bookmarks;
  }

  /**
   * Xóa một từ khỏi danh sách Bookmark theo wordId.
   * @param {string} wordId
   * @returns {Array} Danh sách Bookmark sau khi cập nhật.
   */
  function removeBookmark(wordId) {
    var bookmarks = readJSON(KEYS.BOOKMARKS, []);
    var updated = bookmarks.filter(function (item) {
      return getBookmarkWordId(item) !== wordId;
    });
    writeJSON(KEYS.BOOKMARKS, updated);
    return updated;
  }

  /**
   * Kiểm tra một từ đã được bookmark hay chưa.
   * @param {string} wordId
   * @returns {boolean}
   */
  function isBookmarked(wordId) {
    var bookmarks = readJSON(KEYS.BOOKMARKS, []);
    return bookmarks.some(function (item) {
      return getBookmarkWordId(item) === wordId;
    });
  }

  /**
   * Lấy toàn bộ danh sách Bookmark.
   * @returns {Array}
   */
  function getAllBookmarks() {
    return readJSON(KEYS.BOOKMARKS, []);
  }

  /**
   * Ghi đè toàn bộ danh sách Bookmark bằng dữ liệu cho trước.
   * Dùng cho chức năng Import backup (App.js: importData).
   * Không xử lý / validate / migrate dữ liệu — ghi nguyên trạng mảng
   * truyền vào xuống đúng key hsk_bookmarks.
   * @param {Array} data [ wordObject, ... ]
   * @returns {Array} Dữ liệu vừa ghi.
   */
  function replaceAllBookmarks(data) {
    writeJSON(KEYS.BOOKMARKS, data);
    return data;
  }

  // =======================================================================
  // 4. STUDY ACTIVITY
  // Key: hsk_study_streak (chuỗi số, vd "3"), hsk_last_active_date
  // Format ngày: new Date().toDateString(), ví dụ "Wed Jul 08 2026"
  // (giữ đúng như App.js hiện tại, KHÔNG đổi sang YYYY-MM-DD).
  // =======================================================================

  /**
   * Ghi nhận hoạt động học của ngày hôm nay.
   *
   * Logic tính streak giữ đúng như App.js hiện tại:
   * - So khớp ngày bằng `toDateString()`.
   * - diffDays = Math.ceil(|today - lastActive| / 1 ngày).
   * - diffDays === 1 (liên tiếp): streak + 1.
   * - diffDays > 1 (bỏ ngày): streak reset về 1.
   * - Chưa từng có lastActiveDate (lần đầu): streak = 1.
   * - diffDays === 0 (đã học hôm nay rồi): App.js vẫn ghi lại ngày/streak
   *   hiện tại (không tăng thêm) — ProgressStore giữ đúng hành vi này.
   *
   * @returns {object} { lastActiveDate, currentStreak }
   */
  function recordDailyActivity() {
    var today = new Date().toDateString();
    var lastActiveDate = readString(KEYS.LAST_ACTIVE_DATE, null);
    var currentStreak = parseInt(readString(KEYS.STUDY_STREAK, "0"), 10);
    if (isNaN(currentStreak)) {
      currentStreak = 0;
    }

    if (lastActiveDate) {
      var lastDate = new Date(lastActiveDate);
      var diffTime = Math.abs(new Date(today) - lastDate);
      var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak += 1;
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
      // diffDays === 0: giữ nguyên currentStreak, đúng hành vi App.js.
    } else {
      currentStreak = 1;
    }

    writeString(KEYS.LAST_ACTIVE_DATE, today);
    writeString(KEYS.STUDY_STREAK, currentStreak.toString());

    return {
      lastActiveDate: today,
      currentStreak: currentStreak
    };
  }

  /**
   * Lấy trạng thái hoạt động học hiện tại.
   * @returns {object} { lastActiveDate, currentStreak }
   */
  function getStudyActivity() {
    var lastActiveDate = readString(KEYS.LAST_ACTIVE_DATE, null);
    var currentStreak = parseInt(readString(KEYS.STUDY_STREAK, "0"), 10);
    if (isNaN(currentStreak)) {
      currentStreak = 0;
    }
    return {
      lastActiveDate: lastActiveDate,
      currentStreak: currentStreak
    };
  }

  // =======================================================================
  // 5. BACKUP (Import/Export)
  // Gộp dữ liệu Bookmark + Vocabulary Progress thành một backup object.
  // App.js không cần biết cấu trúc LocalStorage bên trong ProgressStore,
  // chỉ cần gọi exportBackup()/importBackup(data).
  // =======================================================================

  /**
   * Lấy toàn bộ dữ liệu backup hiện tại.
   * Bao gồm ĐẦY ĐỦ mọi dữ liệu người dùng đang có trong LocalStorage, không
   * chỉ Bookmark + Vocabulary Progress (bản cũ bỏ sót lessonProgress, streak,
   * grammar bookmarks/learned và custom flashcard lessons/words — khiến
   * người dùng mất tiến độ khi chuyển máy/khôi phục backup).
   * @returns {object} { bookmarks, progress, lessonProgress, streak,
   *   lastActiveDate, grammarBookmarks, grammarLearned,
   *   flashcardCustomLessons, flashcardCustomWords }
   */
  function exportBackup() {
    var activity = getStudyActivity();
    return {
      bookmarks: getAllBookmarks(),
      progress: getAllVocabularyProgress(),
      lessonProgress: getAllLessonProgress(),
      streak: activity.currentStreak,
      lastActiveDate: activity.lastActiveDate,
      grammarBookmarks: readJSON(KEYS.GRAMMAR_BOOKMARKS, []),
      grammarLearned: readJSON(KEYS.GRAMMAR_LEARNED, []),
      flashcardCustomLessons: readJSON(KEYS.FLASHCARD_CUSTOM_LESSONS, []),
      flashcardCustomWords: readJSON(KEYS.FLASHCARD_CUSTOM_WORDS, [])
    };
  }

  /**
   * Nạp dữ liệu backup vào LocalStorage.
   * Chỉ ghi đè các phần có mặt trong `data` (giữ đúng hành vi cũ:
   * `if (parsed.xxx) ...`) — tương thích ngược với backup cũ (chỉ có
   * bookmarks/progress) vì các field mới đơn giản bị bỏ qua nếu không có.
   * @param {object} data { bookmarks?, progress?, lessonProgress?, streak?,
   *   lastActiveDate?, grammarBookmarks?, grammarLearned?,
   *   flashcardCustomLessons?, flashcardCustomWords? }
   */
  function importBackup(data) {
    if (!data) {
      return;
    }
    if (data.bookmarks) {
      replaceAllBookmarks(data.bookmarks);
    }
    if (data.progress) {
      replaceAllVocabularyProgress(data.progress);
    }
    if (data.lessonProgress) {
      replaceAllLessonProgress(data.lessonProgress);
    }
    if (data.streak !== undefined && data.streak !== null) {
      writeString(KEYS.STUDY_STREAK, String(data.streak));
    }
    if (data.lastActiveDate) {
      writeString(KEYS.LAST_ACTIVE_DATE, data.lastActiveDate);
    }
    if (data.grammarBookmarks) {
      writeJSON(KEYS.GRAMMAR_BOOKMARKS, data.grammarBookmarks);
    }
    if (data.grammarLearned) {
      writeJSON(KEYS.GRAMMAR_LEARNED, data.grammarLearned);
    }
    if (data.flashcardCustomLessons) {
      writeJSON(KEYS.FLASHCARD_CUSTOM_LESSONS, data.flashcardCustomLessons);
    }
    if (data.flashcardCustomWords) {
      writeJSON(KEYS.FLASHCARD_CUSTOM_WORDS, data.flashcardCustomWords);
    }
  }

  // ---------------------------------------------------------------------
  // Expose public API qua window.ProgressStore
  // ---------------------------------------------------------------------

  window.ProgressStore = {
    // Vocabulary
    getWordProgress: getWordProgress,
    updateWordProgress: updateWordProgress,
    getAllVocabularyProgress: getAllVocabularyProgress,
    replaceAllVocabularyProgress: replaceAllVocabularyProgress,

    // Lesson
    getLessonProgress: getLessonProgress,
    getAllLessonProgress: getAllLessonProgress,
    replaceAllLessonProgress: replaceAllLessonProgress,
    markLessonComplete: markLessonComplete,
    toggleLessonManual: toggleLessonManual,

    // Bookmark
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
    isBookmarked: isBookmarked,
    getAllBookmarks: getAllBookmarks,
    replaceAllBookmarks: replaceAllBookmarks,

    // Study Activity
    recordDailyActivity: recordDailyActivity,
    getStudyActivity: getStudyActivity,

    // Backup
    exportBackup: exportBackup,
    importBackup: importBackup
  };
})();
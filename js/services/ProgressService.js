/**
 * ProgressService
 *
 * Phase 1A - Step 2 (bổ sung)
 *
 * Tầng Business Logic thuần, đứng giữa UI (App.js/component) và ProgressStore.
 * ProgressService KHÔNG được đọc/ghi LocalStorage trực tiếp — mọi dữ liệu
 * đều phải lấy thông qua window.ProgressStore.
 *
 * Đây là JavaScript thuần (ES5), không dùng import/export, không dùng React,
 * không dùng JSX. Được expose ra ngoài thông qua window.ProgressService.
 *
 * Không cache dữ liệu: mỗi lần gọi API đều lấy dữ liệu mới nhất từ
 * window.ProgressStore.
 */

(function () {
  "use strict";

  /**
   * Tính thống kê Vocabulary Progress cho một danh sách từ.
   * Phase 1B - Step 2: phần thân hàm nay uỷ quyền toàn bộ phép tính cho
   * StatisticsService.calculateVocabularyStats — ProgressService chỉ còn
   * đảm nhiệm việc nạp dữ liệu thô từ ProgressStore rồi truyền vào tầng
   * tính toán. Chữ ký hàm và giá trị trả về giữ nguyên 100% so với trước.
   *
   * @param {Array} words Danh sách từ (mỗi phần tử có field `id`).
   * @returns {object} { total, learning, mastered, masteredPercent, learningPercent }
   */
  function getVocabularyStatistics(words) {
    var progress = window.ProgressStore.getAllVocabularyProgress();
    return window.StatisticsService.calculateVocabularyStats(progress, words);
  }

  /**
   * Tính thống kê Vocabulary Progress theo từng cấp độ HSK, cùng tổng gộp
   * trên toàn bộ các cấp độ.
   * Phase 1B - Step 2: hàm mới, nạp dữ liệu thô từ ProgressStore rồi uỷ
   * quyền phép tính cho StatisticsService.calculateVocabularyStatsByLevel.
   * Đây là hàm duy nhất mà OverviewTab.js được phép gọi để lấy thống kê
   * theo cấp độ HSK.
   *
   * @param {object} wordsByLevel Danh sách từ vựng theo từng cấp độ HSK,
   *   { [level]: [word, word, ...] }.
   * @param {Array} levels Danh sách cấp độ cần tính, theo đúng thứ tự
   *   hiển thị.
   * @returns {object} { stats, totalMastered, totalLearning, totalUnlearned,
   *   totalWordsAllLevels, totalPercent }
   */
  function getVocabularyStatisticsByLevel(wordsByLevel, levels) {
    var progress = window.ProgressStore.getAllVocabularyProgress();
    return window.StatisticsService.calculateVocabularyStatsByLevel(progress, wordsByLevel, levels);
  }

  /**
   * Lọc ra các từ có trạng thái "mastered".
   * @param {Array} words
   * @returns {Array}
   */
  function getMasteredWords(words) {
    var progress = window.ProgressStore.getAllVocabularyProgress();
    var wordList = words || [];
    return wordList.filter(function (w) {
      return progress[w.id] === "mastered";
    });
  }

  /**
   * Lọc ra các từ có trạng thái "learning".
   * @param {Array} words
   * @returns {Array}
   */
  function getLearningWords(words) {
    var progress = window.ProgressStore.getAllVocabularyProgress();
    var wordList = words || [];
    return wordList.filter(function (w) {
      return progress[w.id] === "learning";
    });
  }

  /**
   * Lọc ra các từ có trạng thái "unlearned" (bao gồm cả từ chưa có
   * dữ liệu progress, vì "unlearned" là trạng thái mặc định).
   * @param {Array} words
   * @returns {Array}
   */
  function getUnlearnedWords(words) {
    var progress = window.ProgressStore.getAllVocabularyProgress();
    var wordList = words || [];
    return wordList.filter(function (w) {
      var status = progress[w.id];
      return !status || status === "unlearned";
    });
  }

  /**
   * Lấy streak hiện tại.
   * @returns {number}
   */
  function getCurrentStreak() {
    return window.ProgressStore.getStudyActivity().currentStreak;
  }

  /**
   * Kiểm tra một từ đã ở trạng thái "mastered" hay chưa.
   * @param {string} wordId
   * @returns {boolean}
   */
  function isWordMastered(wordId) {
    return window.ProgressStore.getWordProgress(wordId) === "mastered";
  }

  /**
   * Kiểm tra một từ đang ở trạng thái "learning" hay không.
   * @param {string} wordId
   * @returns {boolean}
   */
  function isWordLearning(wordId) {
    return window.ProgressStore.getWordProgress(wordId) === "learning";
  }

  // =======================================================================
  // Vocabulary Progress (raw passthrough có kiểm soát)
  // =======================================================================

  /**
   * Lấy toàn bộ dữ liệu Vocabulary Progress hiện tại.
   * @returns {object} { [wordId]: status }
   */
  function getAllVocabularyProgress() {
    return window.ProgressStore.getAllVocabularyProgress();
  }

  /**
   * Cập nhật trạng thái học của một từ.
   * @param {string} wordId
   * @param {string} status
   * @returns {object} Toàn bộ dữ liệu Vocabulary Progress sau khi cập nhật.
   */
  function updateWordProgress(wordId, status) {
    return window.ProgressStore.updateWordProgress(wordId, status);
  }

  // =======================================================================
  // Lesson Progress (Phase 1A - Step 3)
  // =======================================================================

  /**
   * Lấy toàn bộ dữ liệu Lesson Progress hiện tại (raw, không merge default).
   * @returns {Array}
   */
  function getAllLessonProgress() {
    return window.ProgressStore.getAllLessonProgress();
  }

  /**
   * Đồng bộ dữ liệu Lesson Progress đã lưu với danh sách bài học mặc định.
   * Logic giữ nguyên y hệt useEffect hiện đang nằm trong OverviewTab.js:
   * - Nếu chưa có dữ liệu đã lưu (Store rỗng): ghi defaultList xuống Store,
   *   trả về defaultList.
   * - Nếu đã có dữ liệu: merge theo lessonId — bổ sung `level` còn thiếu từ
   *   defaultList, giữ `title` đã lưu (fallback về title mặc định nếu
   *   rỗng), thêm các lesson mới chưa từng có trong dữ liệu đã lưu, rồi sắp
   *   xếp lại theo lessonId. Chỉ ghi lại Store khi có thay đổi.
   * @param {Array} defaultList
   * @returns {Array} Danh sách Lesson Progress sau khi đồng bộ.
   */
  function syncLessonProgress(defaultList) {
    var list = defaultList || [];
    var saved = window.ProgressStore.getAllLessonProgress();

    if (!saved || saved.length === 0) {
      window.ProgressStore.replaceAllLessonProgress(list);
      return list;
    }

    var savedMap = {};
    saved.forEach(function (item) {
      savedMap[item.lessonId] = item;
    });

    var mergedList = [];
    var hasChanges = false;

    list.forEach(function (defaultItem) {
      if (Object.prototype.hasOwnProperty.call(savedMap, defaultItem.lessonId)) {
        var savedItem = savedMap[defaultItem.lessonId];
        var updatedLevel = savedItem.level;
        if (updatedLevel === undefined || updatedLevel === null) {
          updatedLevel = defaultItem.level;
          hasChanges = true;
        }
        mergedList.push(Object.assign({}, savedItem, {
          level: updatedLevel,
          title: savedItem.title || defaultItem.title
        }));
      } else {
        mergedList.push(defaultItem);
        hasChanges = true;
      }
    });

    mergedList.sort(function (a, b) {
      return a.lessonId - b.lessonId;
    });

    if (hasChanges) {
      window.ProgressStore.replaceAllLessonProgress(mergedList);
    }

    return mergedList;
  }

  /**
   * Đảo trạng thái hoàn thành (isCompleted) của một lesson theo thao tác
   * thủ công (đúng hành vi handleToggleLesson hiện tại của OverviewTab.js).
   * @param {string|number} lessonId
   * @returns {Array} Toàn bộ danh sách Lesson Progress sau khi cập nhật.
   */
  function toggleLessonProgress(lessonId) {
    window.ProgressStore.toggleLessonManual(lessonId);
    return window.ProgressStore.getAllLessonProgress();
  }

  /**
   * Ghi nhận điểm số hoàn thành một bài luyện dịch (đúng hành vi
   * saveTranslationScore hiện tại của QuizTab.js). `meta` { level, title }
   * chỉ được dùng khi lesson chưa từng tồn tại trong Lesson Progress (tạo
   * entry mới).
   *
   * Race-case fix: hành vi cũ của saveTranslationScore là
   * `saved ? JSON.parse(saved) : (window.hskProData?.defaultProgress || [])`
   * — tức khi chưa có dữ liệu nào được lưu, TOÀN BỘ danh sách bài học mặc
   * định (defaultProgress) được dùng làm nền trước khi cập nhật điểm, chứ
   * không chỉ tạo một entry đơn lẻ. Nếu Lesson Progress Store đang rỗng,
   * hàm này seed Store bằng defaultProgress trước, sau đó mới gọi
   * markLessonComplete để cập nhật điểm — đảm bảo kết quả cuối cùng giống
   * hệt implementation cũ, không phụ thuộc việc OverviewTab đã mount hay
   * chưa (loại bỏ race-case khi QuizTab được truy cập trước OverviewTab).
   * @param {string|number} lessonId
   * @param {number} score
   * @param {{level?: (number|null), title?: (string|null)}} [meta]
   * @returns {Array} Toàn bộ danh sách Lesson Progress sau khi cập nhật.
   */
  function recordLessonScore(lessonId, score, meta) {
    var current = window.ProgressStore.getAllLessonProgress();
    if (!current || current.length === 0) {
      var defaultList = (window.hskProData && window.hskProData.defaultProgress) || [];
      window.ProgressStore.replaceAllLessonProgress(defaultList);
    }
    window.ProgressStore.markLessonComplete(lessonId, score, meta);
    return window.ProgressStore.getAllLessonProgress();
  }

  // =======================================================================
  // Bookmark
  // =======================================================================

  /**
   * Lấy toàn bộ danh sách Bookmark hiện tại.
   * @returns {Array}
   */
  function getAllBookmarks() {
    return window.ProgressStore.getAllBookmarks();
  }

  /**
   * Đảo trạng thái bookmark của một từ: nếu đã bookmark thì bỏ, nếu chưa
   * thì thêm. Business logic quyết định add/remove nằm ở đây, không nằm
   * trong App.js.
   * @param {object} word Object từ vựng đầy đủ, phải có field `id`.
   * @returns {object} { bookmarks: Array, wasAdded: boolean }
   */
  function toggleBookmark(word) {
    var wasBookmarked = window.ProgressStore.isBookmarked(word.id);
    var bookmarks;

    if (wasBookmarked) {
      bookmarks = window.ProgressStore.removeBookmark(word.id);
    } else {
      bookmarks = window.ProgressStore.addBookmark(word);
    }

    return {
      bookmarks: bookmarks,
      wasAdded: !wasBookmarked
    };
  }

  // =======================================================================
  // Study Activity
  // =======================================================================

  /**
   * Ghi nhận hoạt động học hôm nay và trả về streak hiện tại.
   * @returns {number} currentStreak
   */
  function recordDailyActivity() {
    var activity = window.ProgressStore.recordDailyActivity();
    return activity.currentStreak;
  }

  // =======================================================================
  // Backup (Import/Export)
  // =======================================================================

  /**
   * Lấy toàn bộ dữ liệu backup hiện tại.
   * @returns {object} { bookmarks: Array, progress: object }
   */
  function exportBackup() {
    return window.ProgressStore.exportBackup();
  }

  /**
   * Sinh tên file backup theo quy ước hiện tại (ngày hôm nay dạng YYYY-MM-DD).
   * Chỉ là tính toán chuỗi thuần, không đụng DOM, không đụng LocalStorage.
   * @returns {string} ví dụ "hsk_progress_backup_2026-07-09.json"
   */
  function getBackupFilename() {
    var datePart = new Date().toISOString().split("T")[0];
    return "hsk_progress_backup_" + datePart + ".json";
  }

  /**
   * Nạp dữ liệu backup, sau đó trả về dữ liệu mới nhất để đồng bộ UI.
   * @param {object} data { bookmarks?: Array, progress?: object }
   * @returns {object} { bookmarks: Array, progress: object }
   */
  function importBackup(data) {
    window.ProgressStore.importBackup(data);
    return {
      bookmarks: window.ProgressStore.getAllBookmarks(),
      progress: window.ProgressStore.getAllVocabularyProgress()
    };
  }

  // ---------------------------------------------------------------------
  // Expose public API qua window.ProgressService
  // ---------------------------------------------------------------------

  window.ProgressService = {
    getVocabularyStatistics: getVocabularyStatistics,
    getVocabularyStatisticsByLevel: getVocabularyStatisticsByLevel,
    getMasteredWords: getMasteredWords,
    getLearningWords: getLearningWords,
    getUnlearnedWords: getUnlearnedWords,
    getCurrentStreak: getCurrentStreak,
    isWordMastered: isWordMastered,
    isWordLearning: isWordLearning,

    getAllVocabularyProgress: getAllVocabularyProgress,
    updateWordProgress: updateWordProgress,

    getAllLessonProgress: getAllLessonProgress,
    syncLessonProgress: syncLessonProgress,
    toggleLessonProgress: toggleLessonProgress,
    recordLessonScore: recordLessonScore,

    getAllBookmarks: getAllBookmarks,
    toggleBookmark: toggleBookmark,

    recordDailyActivity: recordDailyActivity,

    exportBackup: exportBackup,
    importBackup: importBackup,
    getBackupFilename: getBackupFilename
  };
})();
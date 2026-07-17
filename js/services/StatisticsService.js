/**
 * StatisticsService
 *
 * Phase 1B - Step 1
 *
 * Calculation Layer thuần túy cho toàn bộ ứng dụng. Đây là nơi duy nhất
 * định nghĩa "thế nào là mastered / learning / unlearned" và công thức
 * tính phần trăm cho Vocabulary Statistics.
 *
 * Mọi hàm bên trong đều là hàm thuần (pure function): chỉ nhận dữ liệu đã
 * được nạp sẵn làm tham số và trả về kết quả tính toán.
 *
 * RÀNG BUỘC BẮT BUỘC (theo PHASE_1B_DESIGN.md mục 3.2, mục 5.1.3):
 * - KHÔNG được gọi tầng lưu trữ dữ liệu (Store) dưới bất kỳ hình thức nào.
 * - KHÔNG được đọc trực tiếp trình duyệt lưu trữ dữ liệu (Web Storage API).
 * - KHÔNG được đọc trực tiếp biến toàn cục (danh sách từ vựng mặc định hay
 *   bất kỳ biến nào khác). Mọi dữ liệu đầu vào phải đến qua tham số hàm.
 * - Không có side effect, không lưu state.
 *
 * Đây là JavaScript thuần (ES5), không dùng import/export, không dùng JSX,
 * expose qua window.StatisticsService, load bằng thẻ <script src="">.
 */

(function () {
  "use strict";

  /**
   * Tính thống kê Vocabulary Progress cho một danh sách từ (thống kê tổng).
   * Di chuyển nguyên logic hiện có trong
   * ProgressService.getVocabularyStatistics (dòng 30-56 của
   * ProgressService.js), giữ nguyên công thức tuyệt đối, không tối ưu,
   * không sửa logic.
   *
   * @param {object} progress Dữ liệu Vocabulary Progress thô,
   *   { [wordId]: "unlearned" | "learning" | "mastered" }.
   * @param {Array} words Danh sách từ vựng cần tính, mỗi phần tử có ít
   *   nhất trường `id`.
   * @returns {{total: number, learning: number, mastered: number,
   *   masteredPercent: number, learningPercent: number}}
   */
  function calculateVocabularyStats(progress, words) {
    var prog = progress || {};
    var wordList = words || [];

    var cleanWords = wordList.filter(function (w) {
      return w.id !== "error";
    });
    var total = cleanWords.length || 1;
    var learning = 0;
    var mastered = 0;

    cleanWords.forEach(function (w) {
      var status = prog[w.id];
      if (status === "learning") {
        learning++;
      } else if (status === "mastered") {
        mastered++;
      }
    });

    return {
      total: total,
      learning: learning,
      mastered: mastered,
      masteredPercent: Math.round((mastered / total) * 100),
      learningPercent: Math.round((learning / total) * 100)
    };
  }

  /**
   * Tính thống kê Vocabulary Progress theo từng cấp độ HSK, cùng tổng gộp
   * trên toàn bộ các cấp độ. Di chuyển nguyên logic hiện có trong
   * OverviewTab.levelStats (dòng 89-134 của OverviewTab.js trước Phase
   * 1B), giữ nguyên công thức tuyệt đối.
   *
   * @param {object} progress Dữ liệu Vocabulary Progress thô,
   *   { [wordId]: "unlearned" | "learning" | "mastered" }.
   * @param {object} wordsByLevel Danh sách từ vựng theo từng cấp độ HSK,
   *   { [level]: [word, word, ...] } (tương đương danh sách từ vựng mặc định).
   * @param {Array} levels Danh sách cấp độ cần tính, theo đúng thứ tự
   *   hiển thị (tương đương biến allLevels).
   * @returns {{stats: Array, totalMastered: number, totalLearning: number,
   *   totalUnlearned: number, totalWordsAllLevels: number,
   *   totalPercent: number}}
   */
  function calculateVocabularyStatsByLevel(progress, wordsByLevel, levels) {
    var prog = progress || {};
    var vocabSource = wordsByLevel || {};
    var levelList = levels || [];

    var totalMastered = 0;
    var totalLearning = 0;
    var totalUnlearned = 0;
    var totalWordsAllLevels = 0;

    var stats = levelList.map(function (level) {
      var levelWords = vocabSource[level] || [];
      var total = levelWords.length;
      totalWordsAllLevels += total;

      var mastered = 0;
      var learning = 0;
      levelWords.forEach(function (w) {
        var status = prog[w.id];
        if (status === "mastered") mastered++;
        else if (status === "learning") learning++;
      });

      totalMastered += mastered;
      totalLearning += learning;
      totalUnlearned += (total - mastered - learning);

      return {
        level: level,
        total: total,
        mastered: mastered,
        learning: learning,
        unlearned: total - mastered - learning,
        masteredPercent: total > 0 ? Math.round((mastered / total) * 100) : 0
      };
    });

    return {
      stats: stats,
      totalMastered: totalMastered,
      totalLearning: totalLearning,
      totalUnlearned: totalUnlearned,
      totalWordsAllLevels: totalWordsAllLevels,
      totalPercent: totalWordsAllLevels > 0 ? Math.round((totalMastered / totalWordsAllLevels) * 100) : 0
    };
  }

  /**
   * Tính thống kê Vocabulary Progress cho một tập con từ vựng, được chọn
   * ra từ một danh sách id (`wordIds`).
   * Phase 1C - Step 1: di chuyển nguyên logic hiện có trong
   * FlashcardTab.getLessonStats (dòng 289-301 của FlashcardTab.js trước
   * Phase 1C), giữ nguyên công thức tuyệt đối, kể cả cách xử lý trường
   * hợp `total = 0` (rẽ nhánh trả về 0, KHÔNG dùng `total || 1` như
   * calculateVocabularyStats ở trên) — để không làm sai lệch hành vi so
   * với bản gốc.
   *
   * @param {object} progress Dữ liệu Vocabulary Progress thô,
   *   { [wordId]: "unlearned" | "learning" | "mastered" }.
   * @param {Array} words Danh sách từ vựng đầy đủ để lọc ra tập con cần
   *   tính (tương đương mergedWords của FlashcardTab), mỗi phần tử có ít
   *   nhất trường `id`.
   * @param {Array} wordIds Danh sách id cần lọc ra từ `words` để tính
   *   thống kê (tương đương wordIds của một Flashcard lesson).
   * @returns {{total: number, mastered: number, learning: number,
   *   unlearned: number, percent: number}}
   */
  function calculateVocabularyStatsForSubset(progress, words, wordIds) {
    var prog = progress || {};
    var wordList = words || [];
    var idList = wordIds || [];

    var lessonWords = wordList.filter(function (w) {
      return idList.indexOf(w.id) !== -1;
    });

    var mastered = 0;
    var learning = 0;
    var unlearned = 0;

    lessonWords.forEach(function (w) {
      var stat = prog[w.id] || "unlearned";
      if (stat === "mastered") {
        mastered++;
      } else if (stat === "learning") {
        learning++;
      } else {
        unlearned++;
      }
    });

    var total = lessonWords.length;
    var percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

    return {
      total: total,
      mastered: mastered,
      learning: learning,
      unlearned: unlearned,
      percent: percent
    };
  }

  // ---------------------------------------------------------------------
  // Expose public API qua window.StatisticsService
  // ---------------------------------------------------------------------

  window.StatisticsService = {
    calculateVocabularyStats: calculateVocabularyStats,
    calculateVocabularyStatsByLevel: calculateVocabularyStatsByLevel,
    calculateVocabularyStatsForSubset: calculateVocabularyStatsForSubset
  };
})();
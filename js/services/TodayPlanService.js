/**
 * TodayPlanService
 *
 * Calculation Layer thuần túy (giống StatisticsService), chịu trách nhiệm
 * duy nhất: trả lời câu hỏi "Hôm nay người dùng nên học gì?" ngay khi mở app.
 *
 * Nguyên tắc bắt buộc:
 * - KHÔNG được gọi tầng lưu trữ dữ liệu (ProgressStore) dưới bất kỳ hình
 *   thức nào, KHÔNG đọc trực tiếp LocalStorage. Mọi dữ liệu đầu vào phải
 *   đến qua tham số hàm (progress, curriculumData, lessonProgress,
 *   dictionaryWords...), do OverviewTab.js cung cấp — những dữ liệu này đã
 *   được các tầng khác (ProgressService/App.js) nạp sẵn.
 * - Hàm thuần (pure function): không side effect, không lưu state nội bộ.
 *
 * Hai "hệ nội dung" hiện có của app KHÔNG dùng chung không gian ID:
 *   - Hệ Giáo trình (CurriculumTab): mỗi bài học có `vocab` riêng, id dạng
 *     "curX_Y_Z". Theo dõi hoàn thành bài học qua Lesson Progress
 *     (hskpro_translation_progress_v1), lessonId ĐÁNH SỐ TOÀN CỤC (1-45,
 *     15 bài/cấp độ), trong khi mảng vocab của mỗi bài lại dùng lessonId
 *     NỘI BỘ theo từng cấp (1-15). Công thức quy đổi:
 *       localLessonId = globalLessonId - 15 * (level - 1)
 *   - Hệ Từ điển (Dictionary/Flashcard/Quiz): danh sách từ vựng theo cấp
 *     độ đang tải (words, id dạng "hskN_x").
 * Cả hai hệ đều ghi trạng thái học vào CHUNG một key Vocabulary Progress
 * (hsk_learning_progress), nên TodayPlanService tính toán độc lập cho từng
 * hệ rồi gộp kết quả lại, không trộn lẫn ID giữa hai hệ.
 *
 * Đây là JavaScript thuần (ES5), không dùng import/export, không dùng JSX,
 * expose qua window.TodayPlanService, load bằng thẻ <script src="">.
 */

(function () {
  "use strict";

  // Đúng như defaultList/defaultProgress hiện tại (OverviewTab.js / data.js):
  // Lesson Progress chỉ theo dõi HSK 1-2-3, mỗi cấp độ 15 bài, lessonId
  // đánh số toàn cục liên tục 1-45.
  var LESSONS_PER_LEVEL = 15;

  /**
   * Tìm bài học tiếp theo cần học: bài đầu tiên (theo thứ tự lessonId toàn
   * cục tăng dần) mà isCompleted chưa = true. Quy đổi sang lessonId nội bộ
   * để tra cứu nội dung đầy đủ (vocab, desc) trong curriculumData.
   *
   * @param {Array} lessonProgress [{ lessonId, level, title, isCompleted, currentScore }]
   * @param {object} curriculumData { [level]: [ { lessonId, title, desc, vocab, ... } ] }
   * @returns {{meta: object|null, lessonData: object|null, allCompleted: boolean}}
   */
  function findNextLesson(lessonProgress, curriculumData) {
    var list = (lessonProgress || []).slice().sort(function (a, b) {
      return a.lessonId - b.lessonId;
    });

    var nextEntry = null;
    for (var i = 0; i < list.length; i++) {
      if (!list[i].isCompleted) {
        nextEntry = list[i];
        break;
      }
    }

    if (!nextEntry) {
      return { meta: null, lessonData: null, allCompleted: list.length > 0 };
    }

    var level = nextEntry.level;
    var localLessonId = nextEntry.lessonId - LESSONS_PER_LEVEL * (level - 1);
    var levelLessons = (curriculumData && curriculumData[level]) || [];
    var lessonData = null;
    for (var j = 0; j < levelLessons.length; j++) {
      if (levelLessons[j].lessonId === localLessonId) {
        lessonData = levelLessons[j];
        break;
      }
    }

    return {
      meta: {
        globalLessonId: nextEntry.lessonId,
        level: level,
        localLessonId: localLessonId,
        title: nextEntry.title
      },
      lessonData: lessonData,
      allCompleted: false
    };
  }

  /**
   * Xây dựng toàn bộ Kế hoạch học hôm nay.
   *
   * @param {object} input
   * @param {object} input.progress Vocabulary Progress thô { [wordId]: status }.
   * @param {object} input.curriculumData Dữ liệu giáo trình theo cấp độ.
   * @param {Array} input.lessonProgress Lesson Progress (đã đồng bộ qua ProgressService.syncLessonProgress).
   * @param {Array} input.dictionaryWords Danh sách từ vựng của cấp độ Từ điển đang active (App.js: words).
   * @param {number} [input.activeLevel] Cấp độ Từ điển đang active.
   * @param {number} [input.reviewLimit=5] Số từ mẫu tối đa hiển thị cho "Ôn tập".
   * @param {number} [input.newWordsLimit=10] Số từ mẫu tối đa gợi ý học mới.
   * @returns {object} Kế hoạch học hôm nay.
   */
  function buildTodayStudyPlan(input) {
    var opts = input || {};
    var progress = opts.progress || {};
    var curriculumData = opts.curriculumData || {};
    var lessonProgress = opts.lessonProgress || [];
    var dictionaryWords = opts.dictionaryWords || [];
    var activeLevel = opts.activeLevel;
    var reviewLimit = opts.reviewLimit || 5;
    var newWordsLimit = opts.newWordsLimit || 10;

    var nextLessonResult = findNextLesson(lessonProgress, curriculumData);

    var lessonVocab = (nextLessonResult.lessonData && nextLessonResult.lessonData.vocab) || [];
    var lessonVocabRemaining = lessonVocab.filter(function (v) {
      return (progress[v.id] || "unlearned") !== "mastered";
    });

    var cleanDictWords = dictionaryWords.filter(function (w) {
      return w.id !== "error";
    });

    var reviewWords = cleanDictWords.filter(function (w) {
      return progress[w.id] === "learning";
    });

    var newWords = cleanDictWords.filter(function (w) {
      var status = progress[w.id];
      return !status || status === "unlearned";
    });

    var hasLessonPlan = !!nextLessonResult.meta;
    var hasReviewWords = reviewWords.length > 0;
    var hasNewWords = newWords.length > 0;

    return {
      nextLesson: hasLessonPlan ? {
        level: nextLessonResult.meta.level,
        globalLessonId: nextLessonResult.meta.globalLessonId,
        localLessonId: nextLessonResult.meta.localLessonId,
        title: nextLessonResult.meta.title,
        desc: (nextLessonResult.lessonData && nextLessonResult.lessonData.desc) || "",
        vocabTotal: lessonVocab.length,
        vocabRemaining: lessonVocabRemaining.length
      } : null,
      allLessonsCompleted: nextLessonResult.allCompleted,
      activeLevel: activeLevel,
      reviewWords: {
        total: reviewWords.length,
        sample: reviewWords.slice(0, reviewLimit)
      },
      newWords: {
        total: newWords.length,
        suggestedCount: Math.min(newWordsLimit, newWords.length),
        sample: newWords.slice(0, newWordsLimit)
      },
      hasAnyTaskToday: hasLessonPlan || hasReviewWords || hasNewWords
    };
  }

  // ---------------------------------------------------------------------
  // Expose public API qua window.TodayPlanService
  // ---------------------------------------------------------------------

  window.TodayPlanService = {
    buildTodayStudyPlan: buildTodayStudyPlan
  };
})();

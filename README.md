# HSK App

Ứng dụng học tiếng Trung HSK được xây dựng bằng HTML, CSS và JavaScript thuần.

Mục tiêu của dự án là tạo một ứng dụng học tập đơn giản, có thể sử dụng hằng ngày trong 5–10 phút để ghi nhớ từ vựng, ngữ pháp và luyện tập theo lộ trình HSK.

---

## Demo

https://theonly1996.github.io/hskapp/

---


## Before Editing Source Code

If you are an AI assistant, read these files in order before making any code changes:

1. docs/PROJECT_CONTEXT.md
2. docs/ARCHITECTURE.md
3. docs/AI_RULES.md
4. docs/ROADMAP.md
5. docs/CHANGELOG.md

## Mục tiêu

- Học HSK1 → HSK4
- Học mỗi ngày 5–10 phút
- Mở ứng dụng là biết hôm nay cần học gì
- Ghi nhớ lâu bằng Spaced Repetition (SRS)
- Chạy hoàn toàn trên GitHub Pages
- Không cần Backend

---

## Công nghệ

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- GitHub Pages

---

## Cấu trúc project

```text
css/
    Giao diện

js/
    App, Components, Tabs, Utils

data/
    Dữ liệu HSK

docs/
    Tài liệu dự án

index.html
```

---

## Tài liệu
Before editing any source code:

1. docs/HANDOFF.md

Follow the reading order defined inside HANDOFF.md.

---

## Cách chạy

Clone project:

```bash
git clone https://github.com/theonly1996/hskapp.git
```

Mở file:

```text
index.html
```

Hoặc truy cập:

https://theonly1996.github.io/hskapp/

---

## Trạng thái

Đang phát triển.

Hiện đã có:

- Overview
- Curriculum
- Dictionary
- Grammar
- Flashcard
- Quiz
- Bookmark

---

## Roadmap

- Refactor
- Daily Learning
- Progress Tracking
- Spaced Repetition
- Statistics
- Stories
- AI Example Sentence

Chi tiết xem:

docs/ROADMAP.md

---

## Đóng góp

Đây là dự án cá nhân phục vụ việc học tiếng Trung.

Mọi thay đổi cần tuân thủ các tài liệu trong thư mục `docs`.
## Project Status

Current Version

v0.3.0

Development Stage

Phase 1A Completed (bao gồm Final Audit — xem docs/PHASE_1A_PROGRESS.md)
Preparing Phase 1B

## Development Principles

- Simple
- Fast
- Offline First
- Mobile Friendly
- Daily Learning

Development Workflow

1. Read HANDOFF.md
2. Understand current phase
3. Do NOT modify unrelated files
4. Complete one phase at a time
5. Update CHANGELOG
6. Update HANDOFF if architecture changes

Core Principles

- Single Source of Truth
- Small Incremental Changes
- No Breaking Changes
- Minimal Diff
- Backward Compatibility

Current Architecture

UI
 ↓
ProgressService
 ↓
ProgressStore
 ↓
LocalStorage

AI Rules

- Never skip HANDOFF.md
- Never jump to future phases
- Finish current phase before starting next
- Do not redesign architecture without updating docs
- Keep changes minimal
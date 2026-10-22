# AGENTS.md — 《宰生刀》站点

安然的历史小说《宰生刀》连载站。Quartz v5 静态站点，GitHub Pages 部署。

## 仓库结构

- `content/` — 全部内容，扁平结构（**没有子目录**）
  - 正文：`yin-hu-chi-1..3`、`cheng-ding-1..2`、`chang-chun-guan-1..2`
  - 相关页：`index`、`toc`、`ren-wu`（人物）、`di-fang`（地方）、`shi-liao`（史料）、`zha-ji`（札记）
  - `content/images/` — 图片
- `quartz.config.default.yaml` — 站点配置 + 插件列表（**不是 `quartz.config.ts`**）
- `quartz-plugins/` — 本站自写的本地插件（见下）
- `.github/workflows/static.yml` — 唯一生效的部署流程（push 到 `v5` → GitHub Pages）
- 默认分支是 **`v5`**，不是 `main`。

## 常用命令

```bash
npm install
npx quartz build              # 构建到 public/
npx quartz build --serve      # 本地预览（--port 指定端口，注意不是 -p）
npx prettier --check content/  # 格式检查（**注意：现有 content 文件本来就不符合 prettier，勿全量 --write**）
```

## 章节导航插件（本地插件）

`quartz-plugins/prev-next/` 提供正文页底部的「上一章 / 目录 / 下一章」。
Quartz v5 支持本地插件（`source: "./quartz-plugins/xxx"`，构建时软链到 `.quartz/plugins/`）。

- 顺序由 frontmatter 的 **`chapter`**（整数）决定，不靠文件名。
- 只有带 `chapter` 的页面才显示导航；`index`/`toc`/`ren-wu` 等不显示。
- **新增章节时必须补 `chapter: N`**，否则该章不进入导航序列。
- 插件用纯 JS + preact `h()` 写（无构建步骤，不能用 JSX/TSX）。

## 写作约定（重要）

- 正文是作者的作品，**不要擅自改写正文文字**。考据存疑之处（如「见山亭」vs「问山亭」、「捍石桥」vs「旱石桥」）应记入 `shi-liao.md` / `di-fang.md` 的「待核」，由作者裁定。
- `zha-ji.md` 的「从实者 / 从虚者 / 半实半虚者」是作者自己立的考据标准，改史料页时应遵循。
- 引史料须标出处；二手转述（网络文章、百科）不要当原始史料用。

## 已知问题

- 曾有一个文件名带换行的坏 workflow（`.github/workflows/deploy.yml\n`），已于 2026-10 删除。
- `quartz.config.default.yaml` 里的 `build-preview.yaml` / `deploy-v5.yaml` / `deploy-preview.yaml` / `docker-build-push.yaml` 是上游 Quartz 自带的，条件为 `github.repository == 'jackyzha0/quartz'`，在本仓库永远 skip，属正常。

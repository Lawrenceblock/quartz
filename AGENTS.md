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

## 小说的历史内核（作者十年考据，勿轻改）

- **缘起**：崇祯十三年《历城县志·忠烈》一句「**回兵者，皆西关人，闻警纠千余人保护西关。陈金两教长，颇有战绩，死者二百余人。**」原文见 `shi-liao.md`。
- **两场大战**：明初靖难（铁铉守济南）、明末戊寅虏变，回营（西关回民）皆在其中。作者视之为「先人被抹杀」的记忆，这是小说的情感内核。
- **宁阳王朱由椅**：德端王庶九子，万历四十五年封。戊寅之变中「不知所踪」，崇祯十三年题南大寺「清真」匾，明亡后再无记载。作者旧作《宁阳王》用过英雄叙事，**作者对本作如何写他仍在犹豫**——不要替他定调。
- 作者另著《朱元璋的回族子孙》（2015，独立中文笔会转载），考朱明遗脉隐入西关、朱家花园事。
- 铁铉赠回营寺碑「敬主」「至诚」，毁于文革——**实物已不存**。
- **《西门》诗**：「西来燕马黑云屯，丁字街中战血痕。几万国殇愁铁板，而今改号拱宸门。」咏靖难。出处是王象春**《问山亭遗诗》**（《喜咏轩丛书》甲编本），**不是《齐音》**，勿混。「拱宸门」一称传世文献不载，待核。
- **并渡口**：济南仲宫镇（回营南撤方向）回族村，清真寺始建于清初，回族 530 余人，**金姓占 85%**。金姓与「陈金两教长」「金叔」相合。「回营后裔」之说目前仅口传，未确证。
- **仲宫的王陵**：宁海恭和王墓在仲宫大门牙村北（2013 省保）。宁海王与宁阳王同出德藩，王府在宽厚所街东西并列。
- 语气分寸：作者是回族，写的是本民族被正史一笔带过的历史。谈这些时不要猎奇、不要当「异域风情」，也不要替他煽情或下结论。

## 已知问题

- 曾有一个文件名带换行的坏 workflow（`.github/workflows/deploy.yml\n`），已于 2026-10 删除。
- `quartz.config.default.yaml` 里的 `build-preview.yaml` / `deploy-v5.yaml` / `deploy-preview.yaml` / `docker-build-push.yaml` 是上游 Quartz 自带的，条件为 `github.repository == 'jackyzha0/quartz'`，在本仓库永远 skip，属正常。

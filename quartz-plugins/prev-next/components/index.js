// 上一章 / 目录 / 下一章 navigation.
//
// Chapters are ordered by the `chapter` frontmatter field (an integer), so the
// sequence is explicit in the source rather than inferred from file names.
// Pages without that field (index, toc, ren-wu, …) render nothing.
//
// Loaded directly by Quartz at runtime, so this file is plain JS (preact `h`
// instead of JSX) — there is no build step for local plugins.

import { h } from "preact"

const css = `
.prev-next {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--lightgray);
  font-family: var(--bodyFont);
}

.prev-next-link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  background: transparent;
  text-decoration: none;
  line-height: 1.3;
  min-width: 0;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.prev-next-link:hover {
  border-color: var(--secondary);
  background: var(--highlight);
}

.prev-next-prev,
.prev-next-next {
  flex: 1 1 0;
}

.prev-next-next {
  text-align: right;
  align-items: flex-end;
}

.prev-next-toc {
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.prev-next-label {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--gray);
}

.prev-next-title {
  font-size: 0.95rem;
  color: var(--secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prev-next-toc .prev-next-label {
  color: var(--darkgray);
}

@media all and (max-width: 600px) {
  .prev-next {
    flex-wrap: wrap;
  }
  .prev-next-prev,
  .prev-next-next {
    flex: 1 1 40%;
  }
  .prev-next-toc {
    order: -1;
    flex: 1 1 100%;
  }
  .prev-next-title {
    white-space: normal;
  }
}
`

const PrevNext = (opts) => {
  const options = { orderField: "chapter", tocSlug: "toc", tocLabel: "目录", ...opts }

  const Component = ({ fileData, allFiles, displayClass }) => {
    if (typeof fileData.frontmatter?.[options.orderField] !== "number") return null

    const chapters = allFiles
      .filter((f) => typeof f.frontmatter?.[options.orderField] === "number")
      .sort((a, b) => a.frontmatter[options.orderField] - b.frontmatter[options.orderField])

    const i = chapters.findIndex((f) => f.slug === fileData.slug)
    if (i === -1) return null

    const prev = chapters[i - 1]
    const next = chapters[i + 1]
    if (!prev && !next) return null

    // Slugs are flat (content/*.md), so links are just "/" + slug.
    const link = (file, label, extraClass) =>
      h(
        "a",
        { class: `prev-next-link ${extraClass}`, href: `/${file.slug}` },
        h("span", { class: "prev-next-label" }, label),
        h("span", { class: "prev-next-title" }, file.frontmatter?.title ?? file.slug),
      )

    const parts = []
    if (prev) parts.push(link(prev, "上一章", "prev-next-prev"))
    parts.push(
      h(
        "a",
        { class: "prev-next-link prev-next-toc", href: `/${options.tocSlug}` },
        h("span", { class: "prev-next-label" }, options.tocLabel),
      ),
    )
    if (next) parts.push(link(next, "下一章", "prev-next-next"))

    return h("nav", { class: `prev-next ${displayClass ?? ""}`, "aria-label": "章节导航" }, parts)
  }

  Component.css = css
  return Component
}

export { PrevNext }
export default PrevNext

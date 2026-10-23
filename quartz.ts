import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"

// 四个专项研究页（人物/地方/史料/札记）的条目分置于
// content/renwu、content/difang、content/shiliao、content/zhaji。
// 左侧栏只展示小说章节，故在此给 explorer 注入 filterFn，隐去这四个目录；
// 条目仍由各自的专项页链接进入。
//
// 注意：此函数会被序列化成字符串、在浏览器端用 new Function 执行，
// 因此不能引用外部变量——路径名必须写死在函数体内。
componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  filterFn: (node: any) =>
    node.slugSegment !== "tags" &&
    ["renwu", "difang", "shiliao", "zhaji"].indexOf(node.slugSegment) === -1,
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()

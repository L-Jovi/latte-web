// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown.
export const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
// The store keeps its words in English, as the reducer writes them: the filter
// names, the status, the error and the sample todos. These are the words the
// Chinese page shows for them; a todo the reader typed is shown as typed.
const chinese = {
  All: '全部',
  Active: '未完成',
  Completed: '已完成',
  Loading: '加载中',
  'Import failed. Try again.': '导入失败，请重试。',
  'Use Redux': '使用 Redux',
  'Read a dependency graph': '读一张依赖图',
  'Keep examples small': '让示例保持精简',
};
export const toChinese = (english) =>
  chinese[english] ??
  english.replace(/^Imported (\d+) todos$/, '已导入 $1 条待办');

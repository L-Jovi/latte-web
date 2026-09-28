# 视觉实验

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

这些小页面保留绘制、几何与事件处理的学习价值。根目录 `npm run dev` 后可直接打开，无需打包；[性能实验](../performance/README.zh-Hans.md)另有 Vite 构建。

- [点阵时钟](clock/README.zh-Hans.md)
- [Canvas 像素与图像操作](canvas-image/README.zh-Hans.md)
- [鼠标与 Pointer Events](drag/README.zh-Hans.md)
- [手势翻页](paging/README.zh-Hans.md)
- [分层轮播与 Scroll Snap](carousel/README.zh-Hans.md)
- [照片墙变换](photo-wall/README.zh-Hans.md)
- [本地搜索建议](search/README.zh-Hans.md)
- [导航、步骤条与圆形进度](motion/README.zh-Hans.md)
- [旋转选择器](lottery/README.zh-Hans.md)

先比较机制再选择工具：鼠标偏移 → 指针捕获，手动轨道 → Scroll Snap，定时增量 → 按经过时间动画。各 README 写明预期行为与边界。`npm run test:browser` 覆盖三引擎入口和交互，`npm test` 验证像素／位置计算。不包含后端服务、奖品系统或第三方视觉素材。衍生示例保留局部 GPL 许可，其他原创代码为 MIT。

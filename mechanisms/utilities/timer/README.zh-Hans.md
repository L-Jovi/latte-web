# 计时器漂移

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

测量回调迟到，并补偿下一次截止时间。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/timer/index.html`。

## 阅读机制

从 [timer-delay.js](timer-delay.js), [timer-delay-fix.js](timer-delay-fix.js), [timer-animation-frame.js](timer-animation-frame.js) 开始。

开始按钮记录十次后停止，停止按钮取消待执行回调。补偿不保证精确定时，长时间阻塞可能产生追赶调用。原来的无限忙循环已移除。

## 新旧方案的联系

视觉帧使用 requestAnimationFrame，动画进度使用实际经过时间；计时器次数不是可靠时钟。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。

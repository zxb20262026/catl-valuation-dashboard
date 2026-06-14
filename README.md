# CATL Vibe-Trading Valuation Dashboard

宁德时代 Vibe-Trading 估值看板，本地静态 HTML 版本。

## 本地打开

直接打开：

```text
file:///H:/ZXB_codex/catl-valuation-dashboard/vibe.html
```

## 文件说明

- `vibe.html`：主看板页面
- `index.html`：早期简版页面
- `data/vibe-snapshot.js`：Vibe 因子样例数据、权重、来源、备注
- `assets/vibe-engine.js`：Vibe 分、综合分、执行建议、信号表计算逻辑
- `tests/vibe-engine.test.cjs`：计算规则测试

## 验证

```bash
node tests/vibe-engine.test.cjs
```

## 说明

当前数据是样例快照，不构成投资建议。Vibe 层适合辅助仓位节奏，不应替代财务和商业模式研究。

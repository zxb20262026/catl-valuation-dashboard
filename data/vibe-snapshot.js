(function (root) {
  root.CATL_VIBE_SNAPSHOT = {
    asOf: "2026-06-12",
    symbol: "300750.SZ",
    valuation: {
      percentile: 20,
      qualityScore: 88,
      peTtm: 23.1,
      pb: 5.6,
      roe: 22.1,
      grossMargin: 28.0
    },
    factors: [
      { id: "news_heat", name: "新闻热度", score: 76, weight: 0.18, source: "主题新闻量 / 正负面事件", note: "固态电池、储能、海外订单相关讨论升温" },
      { id: "capital_flow", name: "资金温度", score: 58, weight: 0.18, source: "主力资金 / ETF / 北向代理指标", note: "资金有回补，但连续性还不够" },
      { id: "ah_linkage", name: "AH 联动", score: 71, weight: 0.12, source: "A/H 股价差与同步反弹", note: "AH 折价收窄，跨市场确认较好" },
      { id: "sector_momentum", name: "板块共振", score: 69, weight: 0.14, source: "锂电池与新能源车板块强度", note: "板块温和共振，没有进入极端亢奋" },
      { id: "research_momentum", name: "研报动量", score: 55, weight: 0.10, source: "评级调整 / 盈利预测修正", note: "观点边际改善，但一致预期还没明显上修" },
      { id: "rumor_noise", name: "噪声风险", score: 62, weight: 0.08, invert: true, source: "未经证实传闻 / 过热话题", note: "固态电池叙事较热，需要降权处理" },
      { id: "catalyst", name: "催化剂", score: 66, weight: 0.12, source: "财报、订单、政策与技术节点", note: "存在催化，但还没到强确认" },
      { id: "crowding", name: "拥挤度", score: 42, weight: 0.08, invert: true, source: "短线一致性 / 成交放大 / 情绪过热", note: "尚未进入一致追涨区" }
    ],
    tape: [
      { time: "09:45", text: "AH 股同步反弹，折价收窄", impact: 8, tone: "green" },
      { time: "10:30", text: "锂电池板块持续活跃", impact: 6, tone: "green" },
      { time: "13:15", text: "主力资金回补但持续性待验", impact: 3, tone: "amber" },
      { time: "14:20", text: "固态电池叙事升温，真假混杂", impact: 2, tone: "amber" },
      { time: "15:00", text: "价格未脱离合理估值带", impact: 0, tone: "blue" }
    ],
    dataRoadmap: [
      { title: "行情与估值", items: ["PE/PB/PS 日频快照", "3/5/10 年分位", "市值、股价与 PE band"] },
      { title: "Vibe 因子", items: ["新闻主题聚类", "资金温度与 AH 联动", "研报修正和催化剂日历"] },
      { title: "执行闭环", items: ["每次买入理由版本化", "仓位动作绑定指标快照", "错因复盘标签化"] }
    ]
  };
})(typeof globalThis !== "undefined" ? globalThis : this);

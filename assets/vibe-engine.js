(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.CatlVibeEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function normalizeFactor(factor) {
    const score = clamp(Number(factor.score) || 0, 0, 100);
    return factor.invert ? 100 - score : score;
  }

  function weightedAverage(factors) {
    const active = factors.filter((factor) => factor.weight > 0);
    const totalWeight = active.reduce((sum, factor) => sum + factor.weight, 0);
    if (!totalWeight) return 0;

    const total = active.reduce((sum, factor) => {
      return sum + normalizeFactor(factor) * factor.weight;
    }, 0);

    return Math.round(total / totalWeight);
  }

  function findFactor(snapshot, id) {
    return snapshot.factors.find((factor) => factor.id === id);
  }

  function classifyScore(score) {
    if (score >= 70) return "green";
    if (score >= 52) return "amber";
    return "blue";
  }

  function classifyRisk(score) {
    if (score >= 70) return "red";
    if (score >= 50) return "amber";
    return "blue";
  }

  function deriveExecution(metrics, snapshot) {
    const capitalFlow = findFactor(snapshot, "capital_flow");
    const catalyst = findFactor(snapshot, "catalyst");

    if (metrics.valuationAttractiveness < 45 || metrics.crowdingRisk >= 75) {
      return {
        action: "等待",
        tone: "估值吸引力不足或交易过热，先避免用情绪推动仓位。"
      };
    }

    if (metrics.valuationAttractiveness >= 70 && capitalFlow.score < 60) {
      return {
        action: "试探",
        tone: "估值有吸引力，但资金确认不足，适合观察仓和分批验证。"
      };
    }

    if (metrics.vibeScore >= 66 && capitalFlow.score >= 60 && catalyst.score >= 62) {
      return {
        action: "分批加仓",
        tone: "估值、资金和催化剂同时改善，可以按规则提高仓位。"
      };
    }

    return {
      action: "跟踪",
      tone: "信号还没有形成合力，继续记录变化而不是抢跑。"
    };
  }

  function calculateMetrics(snapshot) {
    const valuationPercentile = clamp(snapshot.valuation.percentile, 0, 100);
    const valuationAttractiveness = 100 - valuationPercentile;
    const qualityScore = clamp(snapshot.valuation.qualityScore, 0, 100);
    const crowding = findFactor(snapshot, "crowding");
    const crowdingRisk = crowding ? clamp(crowding.score, 0, 100) : 50;
    const vibeFactors = snapshot.factors.filter((factor) => factor.id !== "crowding");
    const vibeScore = weightedAverage(vibeFactors);
    const confirmationPenalty = (findFactor(snapshot, "capital_flow")?.score || 0) < 60 ? 1 : 0;
    const overallScore = Math.floor(
      vibeScore * 0.4 +
      valuationAttractiveness * 0.3 +
      qualityScore * 0.2 +
      (100 - crowdingRisk) * 0.1
    ) - confirmationPenalty;

    const metrics = {
      valuationPercentile,
      valuationAttractiveness,
      qualityScore,
      vibeScore,
      crowdingRisk,
      overallScore: clamp(overallScore, 0, 100)
    };

    metrics.execution = deriveExecution(metrics, snapshot);
    return metrics;
  }

  function factorRows(snapshot) {
    return snapshot.factors.map((factor) => ({
      ...factor,
      normalizedScore: normalizeFactor(factor),
      tone: factor.invert ? classifyRisk(factor.score) : classifyScore(factor.score)
    }));
  }

  function signalRows(snapshot, metrics) {
    const capitalFlow = findFactor(snapshot, "capital_flow");
    const newsHeat = findFactor(snapshot, "news_heat");

    return [
      {
        signal: "PE 分位",
        current: `${metrics.valuationPercentile}%`,
        threshold: "<30%",
        action: metrics.valuationPercentile < 30 ? "允许观察仓" : "等待估值回落",
        tone: metrics.valuationPercentile < 30 ? "green-text" : "amber-text"
      },
      {
        signal: "主力/资金温度",
        current: capitalFlow.score >= 60 ? "转强" : "待确认",
        threshold: "连续转正",
        action: capitalFlow.score >= 60 ? "允许分批" : "不追",
        tone: capitalFlow.score >= 60 ? "green-text" : "amber-text"
      },
      {
        signal: "新闻情绪",
        current: newsHeat.score >= 65 ? "偏强" : "平淡",
        threshold: ">65",
        action: "跟踪催化",
        tone: newsHeat.score >= 65 ? "green-text" : "blue-text"
      },
      {
        signal: "拥挤度",
        current: String(metrics.crowdingRisk),
        threshold: "<70",
        action: metrics.crowdingRisk < 70 ? "风险可控" : "停止追高",
        tone: metrics.crowdingRisk < 70 ? "blue-text" : "red-text"
      }
    ];
  }

  return {
    calculateMetrics,
    classifyScore,
    factorRows,
    signalRows
  };
});

const assert = require("node:assert/strict");
const engine = require("../assets/vibe-engine.js");

const sample = {
  valuation: { percentile: 20, qualityScore: 88 },
  factors: [
    { id: "news_heat", score: 76, weight: 0.18 },
    { id: "capital_flow", score: 58, weight: 0.18 },
    { id: "ah_linkage", score: 71, weight: 0.12 },
    { id: "sector_momentum", score: 69, weight: 0.14 },
    { id: "research_momentum", score: 55, weight: 0.1 },
    { id: "rumor_noise", score: 62, weight: 0.08, invert: true },
    { id: "catalyst", score: 66, weight: 0.12 },
    { id: "crowding", score: 42, weight: 0.08, invert: true }
  ]
};

const metrics = engine.calculateMetrics(sample);

assert.equal(metrics.valuationAttractiveness, 80);
assert.equal(metrics.crowdingRisk, 42);
assert.equal(metrics.vibeScore, 64);
assert.equal(metrics.overallScore, 72);
assert.equal(metrics.execution.action, "试探");
assert.equal(metrics.execution.tone, "估值有吸引力，但资金确认不足，适合观察仓和分批验证。");

assert.equal(engine.classifyScore(76), "green");
assert.equal(engine.classifyScore(58), "amber");
assert.equal(engine.classifyScore(42), "blue");

console.log("vibe-engine tests passed");

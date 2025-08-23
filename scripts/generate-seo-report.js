#!/usr/bin/env node

/**
 * GasNow SEO报告生成脚本
 * 使用方法: node scripts/generate-seo-report.js
 */

const fs = require("fs");
const path = require("path");

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return { year, month, day, fullDate: `${year}-${month}-${day}` };
};

// 生成周报文件名
const generateWeeklyReportName = (date) => {
  return `seo-weekly-report-${date.fullDate}.md`;
};

// 生成月报文件名
const generateMonthlyReportName = (date) => {
  return `seo-monthly-report-${date.year}-${date.month}.md`;
};

// 读取模板文件
const readTemplate = (templatePath) => {
  try {
    return fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    console.error("❌ 无法读取模板文件:", error.message);
    return null;
  }
};

// 创建报告目录
const createReportDirectory = (year, month) => {
  const reportDir = path.join(
    __dirname,
    "..",
    "docs",
    "seo",
    "seo-reports",
    year.toString(),
    month.toString()
  );

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
    console.log(`✅ 创建目录: ${reportDir}`);
  }

  return reportDir;
};

// 生成周报
const generateWeeklyReport = () => {
  const date = getCurrentDate();
  const templatePath = path.join(
    __dirname,
    "..",
    "docs",
    "seo",
    "seo-reports",
    "seo-weekly-report-template.md"
  );
  const template = readTemplate(templatePath);

  if (!template) return false;

  // 替换模板中的日期占位符
  const reportContent = template
    .replace(/\[Start Date\]/g, `${date.fullDate}`)
    .replace(/\[End Date\]/g, `${date.fullDate}`)
    .replace(/\[Report Date\]/g, `${date.fullDate}`)
    .replace(/\[Next Report Date\]/g, getNextWeekDate(date));

  const reportDir = createReportDirectory(date.year, date.month);
  const reportPath = path.join(reportDir, generateWeeklyReportName(date));

  try {
    fs.writeFileSync(reportPath, reportContent);
    console.log(`✅ 周报已生成: ${reportPath}`);
    return true;
  } catch (error) {
    console.error("❌ 生成周报失败:", error.message);
    return false;
  }
};

// 生成月报
const generateMonthlyReport = () => {
  const date = getCurrentDate();
  const templatePath = path.join(
    __dirname,
    "..",
    "docs",
    "seo",
    "seo-reports",
    "seo-monthly-report-template.md"
  );

  // 如果没有月报模板，创建一个月报模板
  if (!fs.existsSync(templatePath)) {
    createMonthlyReportTemplate();
  }

  const template = readTemplate(templatePath);
  if (!template) return false;

  const reportContent = template
    .replace(/\[Month\]/g, `${date.year}-${date.month}`)
    .replace(/\[Report Date\]/g, `${date.fullDate}`);

  const reportDir = createReportDirectory(date.year, date.month);
  const reportPath = path.join(reportDir, generateMonthlyReportName(date));

  try {
    fs.writeFileSync(reportPath, reportContent);
    console.log(`✅ 月报已生成: ${reportPath}`);
    return true;
  } catch (error) {
    console.error("❌ 生成月报失败:", error.message);
    return false;
  }
};

// 创建月报模板
const createMonthlyReportTemplate = () => {
  const monthlyTemplate = `# GasNow SEO 月报

## 报告期间: [Month]

### 执行摘要
**关键亮点:**
- [月度重要变化和结果概述]
- [重大成就或挑战]
- [与上月的比较]

**整体表现评级:** [🟢 优秀 | 🟡 一般 | 🔴 需要关注]

---

## 月度关键指标

### 流量表现
| 指标 | 本月 | 上月 | 变化 | 趋势 |
|------|------|------|------|------|
| 用户数 |  |  |  |  |
| 会话数 |  |  |  |  |
| 页面浏览量 |  |  |  |  |
| 平均会话时长 |  |  |  |  |
| 跳出率 |  |  |  |  |

### 关键词表现
| 关键词 | 平均排名 | 变化 | 点击量 | 展示次数 |
|--------|----------|------|--------|----------|
| ethereum gas fees |  |  |  |  |
| arbitrum gas tracker |  |  |  |  |
| optimism gas prices |  |  |  |  |

---

## 月度总结和建议

### 成功之处
- [本月做得好的方面]
- [有效的策略和行动]

### 需要改进的地方
- [本月遇到的问题]
- [需要优化的方面]

### 下月计划
- [具体的行动项目]
- [目标和期望]

---

## 报告准备人
**姓名:** [您的姓名]
**日期:** [报告日期]
**下次报告:** [下次报告日期]
`;

  const templatePath = path.join(
    __dirname,
    "..",
    "docs",
    "seo",
    "seo-reports",
    "seo-monthly-report-template.md"
  );
  fs.writeFileSync(templatePath, monthlyTemplate);
  console.log("✅ 月报模板已创建");
};

// 获取下周日期
const getNextWeekDate = (currentDate) => {
  const nextWeek = new Date(
    currentDate.year,
    currentDate.month - 1,
    currentDate.day + 7
  );
  const year = nextWeek.getFullYear();
  const month = String(nextWeek.getMonth() + 1).padStart(2, "0");
  const day = String(nextWeek.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 主函数
const main = () => {
  console.log("🚀 GasNow SEO报告生成器");
  console.log("========================");

  const args = process.argv.slice(2);
  const command = args[0] || "weekly";

  switch (command) {
    case "weekly":
      console.log("📊 生成周报...");
      generateWeeklyReport();
      break;

    case "monthly":
      console.log("📈 生成月报...");
      generateMonthlyReport();
      break;

    case "both":
      console.log("📊 生成周报...");
      generateWeeklyReport();
      console.log("📈 生成月报...");
      generateMonthlyReport();
      break;

    default:
      console.log("使用方法:");
      console.log(
        "  node scripts/generate-seo-report.js [weekly|monthly|both]"
      );
      console.log("");
      console.log("示例:");
      console.log("  node scripts/generate-seo-report.js          # 生成周报");
      console.log("  node scripts/generate-seo-report.js monthly  # 生成月报");
      console.log(
        "  node scripts/generate-seo-report.js both     # 生成周报和月报"
      );
      break;
  }
};

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  generateWeeklyReport,
  generateMonthlyReport,
  createReportDirectory,
};

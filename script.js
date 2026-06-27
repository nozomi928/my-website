const header = document.querySelector("[data-elevate]");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.hidden = isOpen;
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mobileNav.hidden = true;
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetSelector = link.getAttribute("href");
    if (!targetSelector || targetSelector === "#") return;
    const target = document.querySelector(targetSelector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const assessmentQuestions = [
  {
    title: "年龄段",
    desc: "用于生成更贴近当前生活节奏的简版报告。",
    options: [
      { label: "18-25", detail: "作息弹性大，重点看压力与生活方式。" },
      { label: "26-35", detail: "工作和生活节奏并行，关注恢复效率。" },
      { label: "36-45", detail: "更适合做稳定型养护与节奏管理。" },
      { label: "46+", detail: "建议更重视规律作息和基础状态维护。" },
    ],
  },
  {
    title: "最近睡眠",
    desc: "睡眠状态会直接影响报告的疲劳与恢复倾向。",
    options: [
      { label: "规律充足", detail: "作息相对稳定，状态波动通常较小。" },
      { label: "偶尔熬夜", detail: "有轻度疲劳累积，需要及时回调节奏。" },
      { label: "经常熬夜", detail: "疲劳和恢复慢的概率更高。" },
      { label: "睡眠质量差", detail: "建议优先修正睡眠问题，再看其他维度。" },
    ],
  },
  {
    title: "工作压力",
    desc: "压力水平会影响整体恢复感和精神状态。",
    options: [
      { label: "较轻", detail: "压力维持在可控范围内。" },
      { label: "中等", detail: "日常需要主动安排放松和休息。" },
      { label: "较大", detail: "容易出现状态起伏，建议分层处理。" },
      { label: "长期紧绷", detail: "更适合优先做节奏管理与减压。" },
    ],
  },
  {
    title: "运动频率",
    desc: "运动频率可以帮助判断恢复能力和身体节奏。",
    options: [
      { label: "每周3次以上", detail: "节奏较稳定，适合维持型建议。" },
      { label: "每周1-2次", detail: "基础状态不错，但还有提升空间。" },
      { label: "很少", detail: "需要更多主动恢复与日常管理。" },
      { label: "几乎不运动", detail: "建议先从低门槛的活动习惯开始。" },
    ],
  },
  {
    title: "饮食状态",
    desc: "饮食习惯主要用于判断作息与状态波动。",
    options: [
      { label: "清淡规律", detail: "整体习惯较稳，适合基础养护。" },
      { label: "偶尔油腻饮酒", detail: "有轻度波动，建议控制频率。" },
      { label: "经常应酬", detail: "恢复和状态维护会更重要。" },
      { label: "作息饮食都不规律", detail: "更适合做综合型调整建议。" },
    ],
  },
  {
    title: "日常精神状态",
    desc: "这是报告分型的关键维度之一。",
    options: [
      { label: "稳定", detail: "当前精神状态较平稳。" },
      { label: "偶尔疲惫", detail: "可通过睡眠和放松恢复。" },
      { label: "经常疲惫", detail: "说明状态已出现明显积累。" },
      { label: "恢复慢", detail: "建议优先做节奏和习惯优化。" },
    ],
  },
  {
    title: "身体恢复速度",
    desc: "用于判断疲劳感和恢复能力的变化。",
    options: [
      { label: "恢复较快", detail: "休息后通常能明显缓过来。" },
      { label: "偶尔恢复慢", detail: "忙碌后需要更久才能回到好状态。" },
      { label: "经常恢复慢", detail: "疲惫感容易持续到第二天。" },
      { label: "明显力不从心", detail: "日常精力和恢复感都需要重点关注。" },
    ],
  },
  {
    title: "久坐饮酒情况",
    desc: "用于判断生活习惯对身体状态的影响。",
    options: [
      { label: "较少久坐饮酒", detail: "生活负担相对较轻。" },
      { label: "偶尔久坐饮酒", detail: "有轻度影响，注意频率即可。" },
      { label: "经常久坐", detail: "需要留意循环、体力和恢复感。" },
      { label: "经常应酬饮酒", detail: "更适合做综合生活方式调整。" },
    ],
  },
  {
    title: "是否希望顾问跟进",
    desc: "这题用于分流报告后的转化路径。",
    options: [
      { label: "愿意添加企微", detail: "会把结果页更明确引导到企业微信。" },
      { label: "先看简版报告", detail: "先获取本地报告，再决定是否跟进。" },
    ],
  },
];

const reportProfiles = {
  stable: {
    title: "日常基础养护型",
    subtitle: "先给你一个肯定：你的基础状态比较稳，继续维护就很有价值。",
    rest: "稳定",
    pressure: "可控",
    body: "基础稳",
    strengths: [
      "你的整体节奏比较稳，说明日常自我管理已经有一定基础。",
      "作息、饮食或运动里至少有一项保持得不错，这是很好的状态底盘。",
      "你更适合做轻量维护，不需要一上来就给自己太大压力。",
    ],
    improvements: [
      "可以继续观察睡眠、压力和精神状态的小波动，别让轻微疲惫慢慢累积。",
      "想把方案做得更贴合，可以添加企业微信，让顾问按你的具体情况细化建议。",
    ],
    meals: [
      "早餐：鸡蛋、燕麦、全麦面包或豆浆，先把上午能量吃稳。",
      "午餐：鱼肉、鸡肉、豆腐配青菜和杂粮饭，保证蛋白质和蔬菜。",
      "晚餐：少油少辣，七分饱即可，睡前尽量不吃太撑。",
    ],
    lifestyle: [
      "保持固定睡觉和起床时间，稳定比偶尔补觉更重要。",
      "每周安排 3 次快走、拉伸或轻力量训练，每次 20 分钟起步。",
      "想做更细的个人搭配，可以添加企业微信，让顾问按你的情况细化。",
    ],
  },
  pressure: {
    title: "压力作息调整型",
    subtitle: "你不是状态差，而是近期节奏被压力和作息牵着走了。",
    rest: "偏乱",
    pressure: "较高",
    body: "节奏乱",
    strengths: [
      "你已经能意识到压力和作息对状态的影响，这一步很关键。",
      "你的问题更像是节奏被打乱，并不代表状态没有改善空间。",
      "只要先把睡眠和放松窗口稳住，后续调整会更容易见到反馈。",
    ],
    improvements: [
      "目前需要留意熬夜、紧绷和疲惫感的叠加，先不要把自己推得太满。",
      "建议添加企业微信，把作息、压力和养护习惯一起梳理成更具体的解决方案。",
    ],
    meals: [
      "早餐：热粥、蒸蛋、豆浆或牛奶，避免空腹直接咖啡。",
      "午餐：正常吃主食和蛋白质，别因为忙就跳过正餐。",
      "晚餐：少夜宵、少浓茶、少酒精，让身体晚上有恢复空间。",
    ],
    lifestyle: [
      "先把睡觉时间往前挪 30 分钟，不必一次改太猛。",
      "每天留 10 到 20 分钟散步、拉伸或深呼吸，把紧绷感降下来。",
      "如果压力和作息长期混在一起，建议联系企业微信做详细方案。",
    ],
  },
  recovery: {
    title: "疲劳恢复关注型",
    subtitle: "你的身体不是没有底子，而是近期恢复速度需要被认真照顾。",
    rest: "一般",
    pressure: "中等",
    body: "恢复慢",
    strengths: [
      "你能感受到身体恢复速度的变化，说明你对自己的状态并不迟钝。",
      "恢复问题通常可以从睡眠、运动和饮食节奏逐步拉回来。",
      "现在开始调整还不晚，小的生活习惯变化会慢慢帮你找回状态。",
    ],
    improvements: [
      "需要留意疲惫持续、运动减少和恢复慢叠加，不要只靠硬扛。",
      "可以添加企业微信，让顾问根据你的睡眠、体力和生活习惯给出详细方案。",
    ],
    meals: [
      "早餐：鸡蛋、牛奶、燕麦或杂粮粥，补足基础能量。",
      "午餐：鱼、瘦肉、豆腐配深色蔬菜，少油但别吃太素。",
      "晚餐：清淡温热，可以选炖菜、青菜、少量主食，减少饮酒。",
    ],
    lifestyle: [
      "恢复慢时优先睡够，不要用更猛的运动硬顶。",
      "运动从散步、拉伸、轻力量开始，先恢复规律再提高强度。",
      "想知道该先调睡眠还是饮食，可以添加企业微信详细沟通。",
    ],
  },
  combined: {
    title: "精力波动调理型",
    subtitle: "你已经开始认真管理状态了，接下来适合把精力、作息和饮食分步调整。",
    rest: "波动",
    pressure: "较高",
    body: "精力波动",
    strengths: [
      "你愿意认真看自己的状态，这已经比很多人更主动。",
      "虽然现在波动维度多，但也意味着可以从多个小入口逐步改善。",
      "你适合做分阶段方案，先稳基础，再逐步改善身体状态。",
    ],
    improvements: [
      "目前作息、压力、饮食、运动和恢复感可能同时影响状态，不建议只靠单一办法处理。",
      "建议添加企业微信，让顾问帮你拆成清晰步骤，给到更详细的个人解决方案。",
    ],
    meals: [
      "早餐：鸡蛋、牛奶、全麦面包或燕麦，避免只吃油腻早点。",
      "午餐：鱼肉或鸡肉、豆制品、两种蔬菜和适量米饭，吃稳不吃撑。",
      "晚餐：少油少酒，尽量在睡前 3 小时吃完，给身体留出恢复时间。",
    ],
    lifestyle: [
      "先抓三件事：睡眠固定、正餐规律、每周轻运动。",
      "不要同时猛改所有习惯，先坚持 7 天，再逐步加动作。",
      "你的情况更适合一对一拆解，建议添加企业微信获取详细解决方案。",
    ],
  },
};

const assessmentState = {
  index: 0,
  answers: Array.from({ length: assessmentQuestions.length }, () => null),
  selected: null,
  finished: false,
};

const assessmentCard = document.querySelector("[data-assessment-card]");
const optionsEl = document.querySelector("[data-options]");
const prevButton = document.querySelector("[data-prev-question]");
const nextButton = document.querySelector("[data-next-question]");
const restartButtons = document.querySelectorAll("[data-restart-assessment], [data-reset-assessment]");
const warningEl = document.querySelector("[data-assessment-warning]");
const progressFill = document.querySelector("[data-progress-fill]");
const stepLabel = document.querySelector("[data-step-label]");
const questionIndexEl = document.querySelector("[data-question-index]");
const questionTitleEl = document.querySelector("[data-question-title]");
const questionDescEl = document.querySelector("[data-question-desc]");
const resultEl = document.querySelector("[data-result]");
const resultTitleEl = document.querySelector("[data-result-title]");
const resultSubtitleEl = document.querySelector("[data-result-subtitle]");
const strengthsEl = document.querySelector("[data-strengths]");
const improvementsEl = document.querySelector("[data-improvements]");
const mealsEl = document.querySelector("[data-meals]");
const lifestyleEl = document.querySelector("[data-lifestyle]");
const scoreRestEl = document.querySelector("[data-score-rest]");
const scorePressureEl = document.querySelector("[data-score-pressure]");
const scoreBodyEl = document.querySelector("[data-score-body]");
const wecomQr = document.querySelector("[data-wecom-qr]");
const wecomFallback = document.querySelector("[data-wecom-fallback]");

const updateProgress = () => {
  const total = assessmentQuestions.length;
  const current = Math.min(assessmentState.index + 1, total);
  const answered = assessmentState.answers.filter(Boolean).length;
  const progress = assessmentState.finished ? 100 : Math.max(11.11, (answered / total) * 100);

  if (progressFill) progressFill.style.width = `${progress}%`;
  if (stepLabel) stepLabel.textContent = assessmentState.finished ? "报告已生成" : `第 ${current} / ${total} 题`;
  if (questionIndexEl) questionIndexEl.textContent = String(current).padStart(2, "0");
  if (prevButton) prevButton.disabled = assessmentState.index === 0 || assessmentState.finished;
  if (nextButton) nextButton.textContent = assessmentState.index === total - 1 ? "生成报告" : "下一题";
  if (nextButton) nextButton.disabled = assessmentState.finished ? true : !assessmentState.answers[assessmentState.index];
};

const renderQuestion = () => {
  const question = assessmentQuestions[assessmentState.index];
  if (!question || !optionsEl) return;

  assessmentState.finished = false;
  assessmentCard?.removeAttribute("hidden");
  resultEl?.setAttribute("hidden", "hidden");

  if (questionTitleEl) questionTitleEl.textContent = question.title;
  if (questionDescEl) questionDescEl.textContent = question.desc;
  if (optionsEl) {
    optionsEl.innerHTML = "";
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "assessment-option";
      button.dataset.optionLabel = option.label;
      button.innerHTML = `<strong>${option.label}</strong><span>${option.detail}</span>`;
      if (assessmentState.answers[assessmentState.index] === option.label) {
        button.classList.add("is-selected");
      }
      button.addEventListener("click", () => {
        assessmentState.answers[assessmentState.index] = option.label;
        assessmentState.selected = option.label;
        warningEl?.setAttribute("hidden", "hidden");
        renderQuestion();
        updateProgress();
      });
      optionsEl.appendChild(button);
    });
  }

  if (warningEl) warningEl.hidden = true;
  updateProgress();
};

const scoreQuestion = (questionIndex, answer) => {
  const map = {
    0: { "18-25": 0, "26-35": 1, "36-45": 2, "46+": 3 },
    1: { "规律充足": 0, "偶尔熬夜": 1, "经常熬夜": 2, "睡眠质量差": 3 },
    2: { "较轻": 0, "中等": 1, "较大": 2, "长期紧绷": 3 },
    3: { "每周3次以上": 0, "每周1-2次": 1, "很少": 2, "几乎不运动": 3 },
    4: { "清淡规律": 0, "偶尔油腻饮酒": 1, "经常应酬": 2, "作息饮食都不规律": 3 },
    5: { "稳定": 0, "偶尔疲惫": 1, "经常疲惫": 2, "恢复慢": 3 },
    6: { "恢复较快": 0, "偶尔恢复慢": 1, "经常恢复慢": 2, "明显力不从心": 3 },
    7: { "较少久坐饮酒": 0, "偶尔久坐饮酒": 1, "经常久坐": 2, "经常应酬饮酒": 3 },
    8: { "愿意添加企微": 1, "先看简版报告": 0 },
  };

  return map[questionIndex]?.[answer] ?? 0;
};

const determineProfile = () => {
  const totalScore = assessmentState.answers.reduce((sum, answer, index) => sum + scoreQuestion(index, answer), 0);
  const sleepScore = scoreQuestion(1, assessmentState.answers[1]) + scoreQuestion(5, assessmentState.answers[5]);
  const pressureScore = scoreQuestion(2, assessmentState.answers[2]);
  const recoveryScore = scoreQuestion(6, assessmentState.answers[6]);
  const habitScore = scoreQuestion(7, assessmentState.answers[7]);
  const contactIntent = assessmentState.answers[8] === "愿意添加企微";

  if (totalScore >= 12 || sleepScore >= 5 || pressureScore >= 3 || habitScore >= 3 || contactIntent) return reportProfiles.combined;
  if (recoveryScore >= 2 || habitScore >= 2) return reportProfiles.recovery;
  if (sleepScore >= 3 || pressureScore >= 2 || totalScore >= 7) return reportProfiles.pressure;
  return reportProfiles.stable;
};

const showResult = () => {
  const profile = determineProfile();
  assessmentState.finished = true;
  assessmentCard?.setAttribute("hidden", "hidden");
  resultEl?.removeAttribute("hidden");
  if (resultTitleEl) resultTitleEl.textContent = profile.title;
  if (resultSubtitleEl) resultSubtitleEl.textContent = profile.subtitle;
  if (scoreRestEl) scoreRestEl.textContent = profile.rest;
  if (scorePressureEl) scorePressureEl.textContent = profile.pressure;
  if (scoreBodyEl) scoreBodyEl.textContent = profile.body;
  if (strengthsEl) {
    strengthsEl.innerHTML = "";
    profile.strengths.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      strengthsEl.appendChild(li);
    });
  }
  if (improvementsEl) {
    improvementsEl.innerHTML = "";
    profile.improvements.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      improvementsEl.appendChild(li);
    });
  }
  if (mealsEl) {
    mealsEl.innerHTML = "";
    profile.meals.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      mealsEl.appendChild(li);
    });
  }
  if (lifestyleEl) {
    lifestyleEl.innerHTML = "";
    profile.lifestyle.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      lifestyleEl.appendChild(li);
    });
  }
  if (warningEl) warningEl.hidden = true;
  updateProgress();
  resultEl?.scrollIntoView({ behavior: "smooth", block: "start" });
};

nextButton?.addEventListener("click", () => {
  if (!assessmentState.answers[assessmentState.index]) {
    if (warningEl) warningEl.hidden = false;
    return;
  }

  if (assessmentState.index === assessmentQuestions.length - 1) {
    showResult();
    return;
  }

  assessmentState.index += 1;
  renderQuestion();
});

prevButton?.addEventListener("click", () => {
  if (assessmentState.index === 0 || assessmentState.finished) return;
  assessmentState.index -= 1;
  renderQuestion();
});

restartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    assessmentState.index = 0;
    assessmentState.answers = Array.from({ length: assessmentQuestions.length }, () => null);
    assessmentState.selected = null;
    assessmentState.finished = false;
    renderQuestion();
    assessmentCard?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (wecomQr && wecomFallback) {
  wecomQr.addEventListener("error", () => {
    wecomQr.hidden = true;
    wecomFallback.hidden = false;
  });
  if (!wecomQr.getAttribute("src")) {
    wecomQr.hidden = true;
    wecomFallback.hidden = false;
  }
}

renderQuestion();

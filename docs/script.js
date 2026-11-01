const scenes = {
  beginner: {
    label: '编程初学者 · Python 基础',
    title: '不是只告诉你 <code>float(input())</code> 是什么。',
    description: '先问“为什么输入的金额不能直接拿来相减”，再拆开输入、类型转换与异常，最后让你自己写出检查逻辑。',
    prompt: '请从设计转账程序的思路开始，解释这段代码为什么先检查金额，再修改余额。',
    file: 'transfer.py',
    code: 'trans = float(input())\nif trans <= 0:\n    raise ValueError("金额必须大于 0")\nbalance -= trans',
    thought: '“扣钱之前，程序需要确认哪两件事？”'
  },
  contest: {
    label: '蓝桥杯 / 算法竞赛 · 前缀和',
    title: '学会从“反复求和”，想到“预先存好”。',
    description: '面对多次区间求和，先比较每次重算与提前预处理的成本，再推导前缀和公式、下标边界和每一步的数值变化。',
    prompt: '我在准备蓝桥杯。请从暴力求区间和的困难出发，带我推导前缀和，并解释下标为什么要这样写。',
    file: 'prefix_sum.py',
    code: 'prefix = [0]\nfor value in nums:\n    prefix.append(prefix[-1] + value)\nanswer = prefix[right + 1] - prefix[left]',
    thought: '“多次问区间和时，哪些加法是在重复做？”'
  },
  interview: {
    label: '技术面试 · 二分查找',
    title: '从循环不变量，讲到每个边界为什么对。',
    description: '不只给出模板。先明确搜索区间代表什么，再用具体数组追踪 left、mid、right 如何移动，解释终止条件和常见边界错误。',
    prompt: '请像面试官追问一样，帮我从问题需求推导二分查找，并解释循环条件、mid 和边界更新。',
    file: 'binary_search.py',
    code: 'while left <= right:\n    mid = (left + right) // 2\n    if nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1',
    thought: '“每次缩小范围后，答案还在哪个区间里？”'
  }
};

document.querySelectorAll('[data-repo-link]').forEach(link => {
  link.href = 'https://github.com/Forwindreach/code-reasoning-teacher';
});
document.querySelectorAll('[data-skill-link]').forEach(link => {
  link.href = 'https://github.com/Forwindreach/code-reasoning-teacher/blob/main/skills/code-reasoning-teacher/SKILL.md';
});

const tabs = [...document.querySelectorAll('.scene-tab')];
function selectScene(key, focus = false) {
  const scene = scenes[key];
  if (!scene) return;
  tabs.forEach(tab => {
    const selected = tab.dataset.scene === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  document.getElementById('scene-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.getElementById('scene-label').textContent = scene.label;
  document.getElementById('scene-title').innerHTML = scene.title;
  document.getElementById('scene-description').textContent = scene.description;
  document.getElementById('scene-prompt').textContent = `“${scene.prompt}”`;
  document.getElementById('demo-file').textContent = scene.file;
  document.getElementById('demo-code').textContent = scene.code;
  document.getElementById('demo-thought').textContent = scene.thought;
  document.getElementById('copy-prompt').innerHTML = '复制提问 <span aria-hidden="true">↗</span>';
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScene(tab.dataset.scene));
  tab.addEventListener('keydown', event => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    selectScene(next.dataset.scene, true);
  });
});

document.getElementById('copy-prompt').addEventListener('click', async event => {
  const active = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
  if (!active) return;
  try {
    await navigator.clipboard.writeText(scenes[active.dataset.scene].prompt);
    event.currentTarget.textContent = '已复制 ✓';
  } catch {
    event.currentTarget.textContent = '请手动复制上方文字';
  }
});

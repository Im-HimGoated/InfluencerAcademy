const palettes = {
  niche: ["#152033", "#c7362f", "#f2c94c", "#2f9c7d", "#f7fbff"],
  titles: ["#172033", "#3178c6", "#f2c94c", "#e1574d", "#f7fbff"],
  record: ["#203047", "#2f9c7d", "#f0c35b", "#d85c54", "#edf4f8"],
  edit: ["#223044", "#7c6cc4", "#f09a70", "#6bb38f", "#f5f7fb"],
  growth: ["#152034", "#d7a942", "#4b88c8", "#d9634f", "#eef3f8"],
  starter: ["#26364e", "#2f8f6b", "#e2b35f", "#e96d55", "#f5f8fb"],
};

const lessons = [
  {
    id: "1",
    category: "planning",
    art: "niche",
    tag: "Lesson 1",
    title: "Choose a niche viewers can understand",
    summary: "Turn a broad interest into a clear channel promise, audience, and repeatable video lane.",
    time: "18 min",
    outcome: "A one-sentence channel promise and three repeatable video formats.",
    artifact: "Channel promise worksheet",
    checklist: [
      "Write the sentence: This channel helps [viewer] do [result].",
      "List five channels your future viewer already watches.",
      "Choose three repeatable video formats you could make for 90 days.",
    ],
  },
  {
    id: "2",
    category: "planning",
    art: "titles",
    tag: "Lesson 2",
    title: "Plan video ideas that earn the click",
    summary: "Build titles around viewer problems, curiosity, and proof instead of vague topics.",
    time: "22 min",
    outcome: "A bank of titles that connect a viewer need to a specific payoff.",
    artifact: "10-title idea bank",
    checklist: [
      "Draft ten titles using a clear viewer outcome.",
      "Rewrite each title with a stronger reason to click.",
      "Pick one idea and define the opening question the video must answer.",
    ],
  },
  {
    id: "3",
    category: "production",
    art: "record",
    tag: "Lesson 3",
    title: "Record with a simple home setup",
    summary: "Use light, sound, framing, and a repeatable shot list to make videos look intentional.",
    time: "16 min",
    outcome: "A filming setup you can recreate without buying a studio kit.",
    artifact: "Home recording checklist",
    checklist: [
      "Face a window or soft light source.",
      "Record a 20 second audio test before the full take.",
      "Frame your eyes near the top third and leave room for captions.",
    ],
  },
  {
    id: "4",
    category: "production",
    art: "edit",
    tag: "Lesson 4",
    title: "Edit for retention, not decoration",
    summary: "Shape the first 30 seconds, cut dead time, and use visuals only when they clarify the point.",
    time: "24 min",
    outcome: "A clean edit plan that keeps attention on the promised answer.",
    artifact: "Retention edit pass",
    checklist: [
      "Cut any intro that delays the promised answer.",
      "Add pattern changes when the viewer needs new information.",
      "Watch the edit once with sound off to check visual clarity.",
    ],
  },
  {
    id: "5",
    category: "growth",
    art: "growth",
    tag: "Lesson 5",
    title: "Upload, read feedback, and improve the next video",
    summary: "Use titles, thumbnails, analytics, and comments as signals for the next upload.",
    time: "20 min",
    outcome: "A repeatable review habit for deciding what to make next.",
    artifact: "Post-upload review card",
    checklist: [
      "Write a thumbnail brief before opening your editor.",
      "Check click-through rate and first 30 second retention after publishing.",
      "Turn one useful comment or drop-off point into the next video idea.",
    ],
  },
];

const templates = {
  niche: "My channel helps [specific viewer] learn [specific skill/result] through [format or perspective].",
  hook: "In this video, I will show you how to [result] without [common frustration], using [proof/example].",
  script: "Cold open: problem. Promise: result. Steps: 1) setup, 2) demo, 3) mistake to avoid. Close: next action.",
};

const starterPack = {
  eyebrow: "Practice project",
  title: "Publish-ready starter pack",
  summary: "A static worksheet for finishing the course without needing an account or database.",
  outcome: "One compact launch plan that pulls together every lesson.",
  artifact: "Starter pack checklist",
  checklist: [
    "Niche statement: This channel helps...",
    "Three starter titles with clear viewer outcomes.",
    "One video outline with a cold open, three beats, and a next action.",
    "Thumbnail brief: subject, emotion, three-word text, background, contrast.",
    "Upload checklist: title, description, chapters, tags, thumbnail, pinned comment.",
  ],
};

let activeFilter = "all";
let activeDetail = null;

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return { width, height };
}

function roundedRect(ctx, x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fillRound(ctx, x, y, w, h, radius, color) {
  roundedRect(ctx, x, y, w, h, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRound(ctx, x, y, w, h, radius, color, width) {
  roundedRect(ctx, x, y, w, h, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawText(ctx, text, x, y, size, color, weight = 800, align = "left") {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px Inter, Arial, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawPlayButton(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(x - radius * 0.28, y - radius * 0.42);
  ctx.lineTo(x - radius * 0.28, y + radius * 0.42);
  ctx.lineTo(x + radius * 0.48, y);
  ctx.closePath();
  ctx.fill();
}

function drawBackground(ctx, w, h, colors) {
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.62, colors[1]);
  gradient.addColorStop(1, colors[4]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.22;
  ctx.fillStyle = colors[2];
  ctx.beginPath();
  ctx.ellipse(w * 0.86, h * 0.12, w * 0.28, h * 0.24, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colors[3];
  ctx.beginPath();
  ctx.ellipse(w * 0.05, h * 0.98, w * 0.38, h * 0.32, 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawNicheArt(ctx, w, h, colors) {
  fillRound(ctx, w * 0.12, h * 0.16, w * 0.52, h * 0.56, h * 0.035, "rgba(255,255,255,0.92)");
  drawText(ctx, "CHANNEL PROMISE", w * 0.16, h * 0.25, h * 0.045, colors[0], 850);
  drawText(ctx, "Viewer", w * 0.18, h * 0.39, h * 0.044, colors[1], 850);
  drawText(ctx, "Result", w * 0.18, h * 0.53, h * 0.044, colors[3], 850);
  ctx.strokeStyle = "rgba(21,32,51,0.22)";
  ctx.lineWidth = Math.max(3, h * 0.012);
  ctx.beginPath();
  ctx.moveTo(w * 0.35, h * 0.39);
  ctx.lineTo(w * 0.49, h * 0.39);
  ctx.lineTo(w * 0.49, h * 0.53);
  ctx.lineTo(w * 0.35, h * 0.53);
  ctx.stroke();
  drawPlayButton(ctx, w * 0.72, h * 0.46, h * 0.17, colors[1]);
  fillRound(ctx, w * 0.62, h * 0.2, w * 0.27, h * 0.12, h * 0.025, "rgba(255,255,255,0.88)");
  drawText(ctx, "3 formats", w * 0.755, h * 0.26, h * 0.045, colors[0], 850, "center");
}

function drawTitlesArt(ctx, w, h, colors) {
  fillRound(ctx, w * 0.1, h * 0.16, w * 0.78, h * 0.14, h * 0.03, "rgba(255,255,255,0.9)");
  fillRound(ctx, w * 0.1, h * 0.38, w * 0.68, h * 0.14, h * 0.03, "rgba(255,255,255,0.78)");
  fillRound(ctx, w * 0.1, h * 0.6, w * 0.74, h * 0.14, h * 0.03, "rgba(255,255,255,0.86)");
  drawText(ctx, "TITLE LAB", w * 0.15, h * 0.23, h * 0.052, colors[0], 900);
  drawText(ctx, "Problem + payoff", w * 0.15, h * 0.45, h * 0.044, colors[0], 850);
  drawText(ctx, "10 clickable ideas", w * 0.15, h * 0.67, h * 0.044, colors[0], 850);
  drawPlayButton(ctx, w * 0.78, h * 0.26, h * 0.08, colors[3]);
}

function drawRecordArt(ctx, w, h, colors) {
  fillRound(ctx, w * 0.12, h * 0.18, w * 0.52, h * 0.46, h * 0.035, "rgba(255,255,255,0.88)");
  fillRound(ctx, w * 0.2, h * 0.26, w * 0.36, h * 0.25, h * 0.02, colors[0]);
  drawPlayButton(ctx, w * 0.38, h * 0.385, h * 0.07, colors[1]);
  ctx.strokeStyle = colors[2];
  ctx.lineWidth = Math.max(5, h * 0.022);
  ctx.beginPath();
  ctx.moveTo(w * 0.72, h * 0.2);
  ctx.lineTo(w * 0.82, h * 0.08);
  ctx.lineTo(w * 0.88, h * 0.2);
  ctx.stroke();
  fillRound(ctx, w * 0.71, h * 0.2, w * 0.18, h * 0.28, h * 0.03, "rgba(255,255,255,0.9)");
  drawText(ctx, "LIGHT", w * 0.8, h * 0.34, h * 0.04, colors[0], 900, "center");
  drawText(ctx, "audio test", w * 0.38, h * 0.72, h * 0.05, "white", 850, "center");
}

function drawEditArt(ctx, w, h, colors) {
  fillRound(ctx, w * 0.1, h * 0.18, w * 0.8, h * 0.52, h * 0.035, "rgba(255,255,255,0.86)");
  drawText(ctx, "RETENTION EDIT", w * 0.16, h * 0.29, h * 0.048, colors[0], 900);
  for (let i = 0; i < 4; i += 1) {
    fillRound(ctx, w * (0.16 + i * 0.17), h * 0.42, w * 0.13, h * 0.13, h * 0.018, i === 0 ? colors[3] : colors[1]);
  }
  ctx.strokeStyle = colors[2];
  ctx.lineWidth = Math.max(4, h * 0.018);
  ctx.beginPath();
  ctx.moveTo(w * 0.18, h * 0.62);
  ctx.lineTo(w * 0.78, h * 0.62);
  ctx.stroke();
  drawText(ctx, "0:30", w * 0.24, h * 0.76, h * 0.048, "white", 900, "center");
}

function drawGrowthArt(ctx, w, h, colors) {
  fillRound(ctx, w * 0.12, h * 0.16, w * 0.76, h * 0.58, h * 0.035, "rgba(255,255,255,0.88)");
  drawText(ctx, "UPLOAD REVIEW", w * 0.18, h * 0.27, h * 0.048, colors[0], 900);
  const bars = [0.22, 0.38, 0.3, 0.55];
  bars.forEach((bar, index) => {
    fillRound(ctx, w * (0.19 + index * 0.13), h * (0.62 - bar), w * 0.07, h * bar, h * 0.014, index === 3 ? colors[3] : colors[1]);
  });
  ctx.strokeStyle = colors[2];
  ctx.lineWidth = Math.max(4, h * 0.015);
  ctx.beginPath();
  ctx.moveTo(w * 0.19, h * 0.62);
  ctx.lineTo(w * 0.73, h * 0.62);
  ctx.stroke();
  drawText(ctx, "Next idea", w * 0.68, h * 0.42, h * 0.045, colors[3], 900, "center");
}

function drawStarterArt(ctx, w, h, colors) {
  fillRound(ctx, w * 0.14, h * 0.12, w * 0.64, h * 0.68, h * 0.035, "rgba(255,255,255,0.9)");
  drawText(ctx, "STARTER PACK", w * 0.2, h * 0.23, h * 0.052, colors[0], 900);
  ["Niche", "Titles", "Outline", "Thumbnail"].forEach((label, index) => {
    const y = h * (0.36 + index * 0.11);
    strokeRound(ctx, w * 0.2, y - h * 0.025, h * 0.05, h * 0.05, h * 0.01, colors[1], Math.max(2, h * 0.008));
    ctx.strokeStyle = colors[3];
    ctx.lineWidth = Math.max(2, h * 0.01);
    ctx.beginPath();
    ctx.moveTo(w * 0.21, y);
    ctx.lineTo(w * 0.225, y + h * 0.017);
    ctx.lineTo(w * 0.25, y - h * 0.02);
    ctx.stroke();
    drawText(ctx, label, w * 0.29, y, h * 0.04, colors[0], 850);
  });
  drawPlayButton(ctx, w * 0.82, h * 0.72, h * 0.09, colors[3]);
}

function drawArt(canvas) {
  const type = canvas.dataset.art || "niche";
  const colors = palettes[type] || palettes.niche;
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = fitCanvas(canvas);

  drawBackground(ctx, w, h, colors);

  const drawings = {
    niche: drawNicheArt,
    titles: drawTitlesArt,
    record: drawRecordArt,
    edit: drawEditArt,
    growth: drawGrowthArt,
    starter: drawStarterArt,
  };

  (drawings[type] || drawNicheArt)(ctx, w, h, colors);
}

function drawAll() {
  document.querySelectorAll("canvas[data-art]").forEach(drawArt);
}

function getCompletedLessons() {
  try {
    return JSON.parse(localStorage.getItem("completedLessons")) || [];
  } catch {
    return [];
  }
}

function setCompletedLessons(ids) {
  localStorage.setItem("completedLessons", JSON.stringify(ids));
  updateProgress();
  renderLessons();
}

function updateProgress() {
  const count = getCompletedLessons().length;
  const countLabel = document.querySelector("#progress-count");
  const progressLabel = document.querySelector("#progress-label");
  countLabel.textContent = count;
  progressLabel.textContent = count === 0 ? "Start here" : count === 5 ? "Course done" : "In progress";
}

function lessonMatches(lesson, query) {
  const haystack = [lesson.tag, lesson.title, lesson.summary, lesson.category, lesson.outcome, lesson.artifact, ...lesson.checklist].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderLessons() {
  const list = document.querySelector("#lesson-list");
  const emptyState = document.querySelector("#empty-state");
  const query = document.querySelector("#course-search").value.trim();
  const completed = getCompletedLessons();
  const visibleLessons = lessons.filter((lesson) => {
    const matchesFilter = activeFilter === "all" || lesson.category === activeFilter;
    return matchesFilter && lessonMatches(lesson, query);
  });

  list.innerHTML = visibleLessons
    .map((lesson) => {
      const isComplete = completed.includes(lesson.id);
      return `
        <article class="post-card ${isComplete ? "is-complete" : ""}">
          <canvas class="thumb" width="280" height="180" data-art="${lesson.art}" aria-label="${lesson.artifact} illustration"></canvas>
          <div>
            <span class="tag subtle">${lesson.tag} · ${lesson.time}</span>
            <h3>${lesson.title}</h3>
            <p>${lesson.summary}</p>
            <p class="artifact-line"><strong>You make:</strong> ${lesson.artifact}</p>
            <div class="meta">
              <button type="button" data-open-lesson="${lesson.id}">View lesson</button>
              <button type="button" data-toggle-complete="${lesson.id}">${isComplete ? "Completed" : "Mark complete"}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  emptyState.hidden = visibleLessons.length > 0;
  drawAll();
}

function openDetail(detail) {
  activeDetail = detail;
  const modal = document.querySelector("#detail-modal");
  document.querySelector("#modal-eyebrow").textContent = detail.eyebrow || detail.tag;
  document.querySelector("#modal-title").textContent = detail.title;
  document.querySelector("#modal-summary").textContent = detail.summary;
  document.querySelector("#modal-body").innerHTML = `
    <div class="outcome-box">
      <strong>You will make</strong>
      <span>${detail.outcome}</span>
    </div>
    <h3>Do this</h3>
    <ol>${detail.checklist.map((item) => `<li>${item}</li>`).join("")}</ol>
  `;
  document.querySelector("#mark-complete").hidden = !detail.id;
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeDetail() {
  document.querySelector("#detail-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

function toggleLessonComplete(id) {
  const completed = getCompletedLessons();
  const next = completed.includes(id) ? completed.filter((lessonId) => lessonId !== id) : [...completed, id];
  setCompletedLessons(next);
}

function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.filter === filter);
  });
  renderLessons();
}

function updateActiveNav() {
  const current = [...document.querySelectorAll(".nav-item")]
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean)
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= 140);

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.classList.toggle("active", current && link.hash === `#${current.id}`);
  });
}

function saveIdea() {
  const ideaBox = document.querySelector("#idea-box");
  const note = document.querySelector("#draft-note");
  const value = ideaBox.value.trim();

  if (!value) {
    note.textContent = "Add a video idea first, then save it as a local note.";
    return;
  }

  localStorage.setItem("savedVideoIdea", value);
  note.textContent = "Saved locally. This course uses browser storage, not accounts or a database.";
}

function restoreIdea() {
  const saved = localStorage.getItem("savedVideoIdea");
  if (saved) {
    document.querySelector("#idea-box").value = saved;
    document.querySelector("#draft-note").textContent = "Restored your saved local idea.";
  }
}

function initEvents() {
  document.querySelector("#course-search").addEventListener("input", renderLessons);
  document.querySelector("#save-idea").addEventListener("click", saveIdea);
  document.querySelector("#show-outline").addEventListener("click", () => document.querySelector("#lessons").scrollIntoView({ behavior: "smooth" }));
  document.querySelector("#publish-plan").addEventListener("click", () => openDetail(starterPack));
  document.querySelector("#open-starter-pack").addEventListener("click", () => openDetail(starterPack));

  document.querySelector("#clear-progress").addEventListener("click", () => {
    localStorage.removeItem("completedLessons");
    updateProgress();
    renderLessons();
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });

  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const ideaBox = document.querySelector("#idea-box");
      const current = ideaBox.value.trim();
      ideaBox.value = current ? `${current}\n\n${templates[button.dataset.template]}` : templates[button.dataset.template];
      ideaBox.focus();
    });
  });

  document.querySelectorAll("[data-track]").forEach((link) => {
    link.addEventListener("click", () => setFilter(link.dataset.track));
  });

  document.body.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-lesson]");
    const completeButton = event.target.closest("[data-toggle-complete]");

    if (openButton) {
      const lesson = lessons.find((item) => item.id === openButton.dataset.openLesson);
      if (lesson) openDetail(lesson);
    }

    if (completeButton) {
      toggleLessonComplete(completeButton.dataset.toggleComplete);
    }
  });

  document.querySelector(".featured-story").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail(lessons[0]);
    }
  });

  document.querySelector("#mark-complete").addEventListener("click", () => {
    if (activeDetail?.id) toggleLessonComplete(activeDetail.id);
    closeDetail();
  });

  document.querySelector("#copy-detail").addEventListener("click", async () => {
    if (!activeDetail) return;
    const text = `${activeDetail.title}\nYou will make: ${activeDetail.outcome}\n${activeDetail.checklist.map((item) => `- ${item}`).join("\n")}`;
    await navigator.clipboard.writeText(text);
    document.querySelector("#copy-detail").textContent = "Copied";
    window.setTimeout(() => {
      document.querySelector("#copy-detail").textContent = "Copy checklist";
    }, 1400);
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeDetail);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetail();
  });
  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("resize", drawAll);
}

restoreIdea();
updateProgress();
renderLessons();
initEvents();
drawAll();

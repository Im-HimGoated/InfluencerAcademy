const palettes = {
  lead: ["#152033", "#c7362f", "#f2c94c", "#2f9c7d", "#f7fbff"],
  city: ["#203047", "#4e9c8f", "#f0c35b", "#d85c54", "#edf4f8"],
  desk: ["#223044", "#7c6cc4", "#f09a70", "#6bb38f", "#f5f7fb"],
  news: ["#152034", "#d7a942", "#4b88c8", "#d9634f", "#eef3f8"],
  portrait: ["#26364e", "#2f8f6b", "#e2b35f", "#e96d55", "#f5f8fb"],
};

const lessons = [
  {
    id: "1",
    category: "planning",
    art: "lead",
    tag: "Lesson 1",
    title: "Choose a niche viewers can understand",
    summary: "Turn a broad interest into a clear channel promise, audience, and repeatable video lane.",
    time: "18 min",
    checklist: [
      "Write the sentence: This channel helps [viewer] do [result].",
      "List five channels your future viewer already watches.",
      "Choose three repeatable video formats you could make for 90 days.",
    ],
  },
  {
    id: "2",
    category: "planning",
    art: "desk",
    tag: "Lesson 2",
    title: "Plan video ideas that earn the click",
    summary: "Build titles around viewer problems, curiosity, and proof instead of vague topics.",
    time: "22 min",
    checklist: [
      "Draft ten titles using a clear viewer outcome.",
      "Rewrite each title with a stronger reason to click.",
      "Pick one idea and define the opening question the video must answer.",
    ],
  },
  {
    id: "3",
    category: "production",
    art: "city",
    tag: "Lesson 3",
    title: "Record with a simple home setup",
    summary: "Use light, sound, framing, and a repeatable shot list to make videos look intentional.",
    time: "16 min",
    checklist: [
      "Face a window or soft light source.",
      "Record a 20 second audio test before the full take.",
      "Frame your eyes near the top third and leave room for captions.",
    ],
  },
  {
    id: "4",
    category: "production",
    art: "news",
    tag: "Lesson 4",
    title: "Edit for retention, not decoration",
    summary: "Shape the first 30 seconds, cut dead time, and use visuals only when they clarify the point.",
    time: "24 min",
    checklist: [
      "Cut any intro that delays the promised answer.",
      "Add pattern changes when the viewer needs new information.",
      "Watch the edit once with sound off to check visual clarity.",
    ],
  },
  {
    id: "5",
    category: "growth",
    art: "portrait",
    tag: "Lesson 5",
    title: "Upload, read feedback, and improve the next video",
    summary: "Use titles, thumbnails, analytics, and comments as signals for the next upload.",
    time: "20 min",
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

function drawPaper(ctx, x, y, w, h, rotate, color) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rotate);
  ctx.fillStyle = color;
  ctx.shadowColor = "rgba(10, 18, 32, 0.22)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 14;
  ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "rgba(18, 28, 44, 0.18)";
  for (let i = 0; i < 7; i += 1) {
    const lineY = -h / 2 + h * 0.18 + i * h * 0.095;
    ctx.fillRect(-w * 0.34, lineY, w * (0.45 + (i % 3) * 0.09), Math.max(2, h * 0.012));
  }
  ctx.restore();
}

function drawArc(ctx, x, y, radius, start, end, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.arc(x, y, radius, start, end);
  ctx.stroke();
}

function drawArt(canvas) {
  const type = canvas.dataset.art || "lead";
  const colors = palettes[type] || palettes.lead;
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = fitCanvas(canvas);

  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.55, colors[1]);
  gradient.addColorStop(1, colors[4]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.24;
  ctx.fillStyle = colors[3];
  ctx.beginPath();
  ctx.ellipse(w * 0.78, h * 0.18, w * 0.34, h * 0.28, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colors[2];
  ctx.beginPath();
  ctx.ellipse(w * 0.1, h * 0.88, w * 0.42, h * 0.32, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  if (type === "portrait") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
    ctx.beginPath();
    ctx.arc(w * 0.52, h * 0.38, h * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.ellipse(w * 0.52, h * 0.82, w * 0.3, h * 0.26, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    drawArc(ctx, w * 0.52, h * 0.4, h * 0.2, Math.PI * 1.1, Math.PI * 1.9, colors[3], h * 0.035);
  } else {
    drawPaper(ctx, w * 0.22, h * 0.22, w * 0.32, h * 0.48, -0.16, "rgba(255, 255, 255, 0.9)");
    drawPaper(ctx, w * 0.43, h * 0.16, w * 0.34, h * 0.53, 0.12, "rgba(255, 255, 255, 0.78)");
    drawPaper(ctx, w * 0.59, h * 0.28, w * 0.25, h * 0.39, -0.04, "rgba(255, 255, 255, 0.72)");
    drawArc(ctx, w * 0.72, h * 0.33, h * 0.22, 0.25, Math.PI * 1.55, colors[3], Math.max(8, h * 0.034));
    drawArc(ctx, w * 0.28, h * 0.71, h * 0.2, Math.PI * 1.02, Math.PI * 1.95, colors[2], Math.max(7, h * 0.028));
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  for (let i = 0; i < 9; i += 1) {
    const x = ((i * 157) % 997) / 997 * w;
    const y = ((i * 263) % 887) / 887 * h;
    ctx.fillRect(x, y, Math.max(10, w * 0.025), Math.max(10, w * 0.025));
  }
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
  const haystack = [lesson.tag, lesson.title, lesson.summary, lesson.category, ...lesson.checklist].join(" ").toLowerCase();
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
          <canvas class="thumb" width="280" height="180" data-art="${lesson.art}" aria-label="${lesson.tag} artwork"></canvas>
          <div>
            <span class="tag subtle">${lesson.tag} · ${lesson.time}</span>
            <h3>${lesson.title}</h3>
            <p>${lesson.summary}</p>
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
  const current = [...document.querySelectorAll("main section[id]")].find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 120 && rect.bottom > 120;
  });

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
    const text = `${activeDetail.title}\n${activeDetail.checklist.map((item) => `- ${item}`).join("\n")}`;
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

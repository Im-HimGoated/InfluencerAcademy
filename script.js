const palettes = {
  lead: ["#172033", "#3178c6", "#d9634f", "#d7a942", "#f7fbff"],
  city: ["#203047", "#4e9c8f", "#f0c35b", "#d85c54", "#edf4f8"],
  desk: ["#223044", "#7c6cc4", "#f09a70", "#6bb38f", "#f5f7fb"],
  news: ["#152034", "#d7a942", "#4b88c8", "#d9634f", "#eef3f8"],
  portrait: ["#26364e", "#2f8f6b", "#e2b35f", "#e96d55", "#f5f8fb"],
};

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return { width, height, ratio };
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

window.addEventListener("resize", drawAll);
drawAll();

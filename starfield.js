// ── STARFIELD ANIMATION ──
(function() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;

    for (const s of stars) {
      s.twinklePhase += s.twinkleSpeed;
      const twinkle = Math.sin(s.twinklePhase) * 0.3 + 0.7;
      const alpha = s.alpha * twinkle;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 230, 255, ${alpha})`;
      ctx.fill();

      // Occasional bright blue stars
      if (s.r > 1.2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${alpha * 0.3})`;
        ctx.fill();
      }

      // Slow drift
      s.y += s.speed * 0.1;
      if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
    }

    // Occasional shooting star
    if (frame % 240 === 0) shootingStar();

    requestAnimationFrame(draw);
  }

  function shootingStar() {
    const x = Math.random() * w * 0.8;
    const y = Math.random() * h * 0.4;
    const len = 60 + Math.random() * 80;
    let progress = 0;

    function drawShoot() {
      progress += 0.05;
      if (progress >= 1) return;

      ctx.beginPath();
      ctx.moveTo(x + progress * len, y + progress * len * 0.3);
      ctx.lineTo(x + (progress - 0.3) * len, y + (progress - 0.3) * len * 0.3);
      ctx.strokeStyle = `rgba(200, 240, 255, ${1 - progress})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      requestAnimationFrame(drawShoot);
    }
    drawShoot();
  }

  resize();
  initStars(200);
  draw();
  window.addEventListener('resize', () => { resize(); initStars(200); });
})();

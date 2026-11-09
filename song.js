/* ---------- THE SONG VIEW ----------
   Opens on top of the home page instead of loading a new page. Browsers only allow sound
   after a tap on the *same* page, so the tap on a polaroid also starts the music, and
   previous / next / the next song after one ends all keep playing in this same page.
   Needs tracks.js and scenes.js loaded first. Exposes window.Song.open(i). */
(function () {
  const css = `
  .song {
    --rose: #f08aa8; --cream: #fff4ea; --soft: #e6cfd9;
    position: fixed; inset: 0; z-index: 50;
    height: 100vh; height: 100dvh;
    display: flex; flex-direction: column; overflow: hidden;
    background: #1b1022; color: var(--cream);
    font-family: var(--serif); font-size: 1.1rem; line-height: 1.5;
    opacity: 0; transition: opacity 0.35s ease;
  }
  .song[hidden] { display: none; }
  .song.shown { opacity: 1; }
  .song .s-bgwrap { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
  .song .s-bg { position: absolute; inset: -8%; width: 116%; height: 116%; filter: blur(28px) saturate(1.25) brightness(0.62); }
  .song .s-stage { position: relative; z-index: 1; flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .song .s-art { display: block; flex: none; image-rendering: pixelated; }
  .song:not(.full) .s-art { box-shadow: 0 0 90px rgba(0, 0, 0, 0.5); }
  .song .s-back {
    position: absolute; z-index: 3; top: 14px; left: 14px; padding: 6px 16px; border-radius: 999px;
    font: inherit; font-size: 1rem; color: var(--cream); cursor: pointer;
    background: rgba(24, 12, 30, 0.55); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.18); transition: background 0.25s;
  }
  .song .s-back:hover { background: rgba(240, 138, 168, 0.55); }
  .song .s-year {
    position: absolute; z-index: 3; top: 10px; left: 0; right: 0; text-align: center; pointer-events: none;
    font-family: var(--script); font-size: 2.1rem; color: var(--cream); text-shadow: 0 2px 10px rgba(60, 20, 30, 0.75);
  }
  .song .s-bar {
    position: relative; z-index: 2;
    padding: 12px 20px calc(14px + env(safe-area-inset-bottom));
    background: rgba(24, 12, 30, 0.74); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    border-top: 1px solid rgba(255, 255, 255, 0.14);
  }
  .song .deck { max-width: 520px; margin: 0 auto; display: grid; gap: 8px; justify-items: center; }
  .song .now { font-size: 1.05rem; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .song .now .artist { color: var(--soft); font-style: italic; }
  .song .now .artist:not(:empty)::before { content: " \\00b7  "; font-style: normal; }
  .song .controls { display: flex; align-items: center; gap: 22px; }
  .song .ctl {
    display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%;
    border: 0; background: none; color: var(--cream); cursor: pointer; padding: 0;
    transition: color 0.2s, background 0.2s, transform 0.15s;
  }
  .song .ctl svg { width: 22px; height: 22px; fill: currentColor; }
  .song .ctl:hover { color: var(--rose); }
  .song .ctl:active { transform: scale(0.92); }
  .song .ctl:disabled { opacity: 0.3; cursor: default; }
  .song .ctl.play { width: 56px; height: 56px; background: var(--cream); color: #1b1022; box-shadow: 0 4px 22px rgba(240, 138, 168, 0.35); }
  .song .ctl.play svg { width: 24px; height: 24px; }
  .song .ctl.play:hover { background: var(--rose); }
  .song .ctl.play .i-pause { display: none; }
  .song.playing .ctl.play .i-play { display: none; }
  .song.playing .ctl.play .i-pause { display: block; }
  .song .progress { width: 100%; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--soft); font-variant-numeric: tabular-nums; }
  .song .line { flex: 1; height: 16px; display: flex; align-items: center; cursor: pointer; touch-action: none; }
  .song .rail { position: relative; width: 100%; height: 3px; border-radius: 3px; background: rgba(255, 255, 255, 0.2); }
  .song .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; border-radius: 3px; background: var(--rose); }
  .song .knob { position: absolute; top: 50%; left: 0; width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; border-radius: 50%; background: var(--cream); }
  .song .hint { margin: 0; font-size: 0.85rem; color: var(--soft); font-style: italic; }
  .song .hint:empty { display: none; }
  html.song-open, html.song-open body { overflow: hidden; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  const view = document.createElement("div");
  view.className = "song";
  view.hidden = true;
  view.setAttribute("role", "dialog");
  view.setAttribute("aria-modal", "true");
  view.innerHTML = `
    <div class="s-bgwrap"><canvas class="s-bg" width="32" height="32" aria-hidden="true"></canvas></div>
    <button class="s-back" type="button">&lsaquo; our mixtape</button>
    <div class="s-year"></div>
    <div class="s-stage"><canvas class="s-art" width="32" height="32" role="img"></canvas></div>
    <div class="s-bar">
      <div class="deck">
        <div class="now"><span class="title"></span><span class="artist"></span></div>
        <div class="controls">
          <button class="ctl prev" type="button" aria-label="Previous song"><svg viewBox="0 0 24 24"><path d="M6 5h2v14H6zM20 5v14L9.5 12z"/></svg></button>
          <button class="ctl play" type="button" aria-label="Play">
            <svg class="i-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg class="i-pause" viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>
          </button>
          <button class="ctl next" type="button" aria-label="Next song"><svg viewBox="0 0 24 24"><path d="M16 5h2v14h-2zM4 5v14l10.5-7z"/></svg></button>
        </div>
        <div class="progress">
          <span class="cur">0:00</span>
          <div class="line"><div class="rail"><div class="fill"></div><div class="knob"></div></div></div>
          <span class="dur">0:00</span>
        </div>
        <p class="hint"></p>
      </div>
    </div>`;
  document.body.append(view);

  const $ = s => view.querySelector(s);
  const art = $(".s-art"), bg = $(".s-bg"), stage = $(".s-stage");
  const actx = art.getContext("2d"), bctx = bg.getContext("2d");
  const playBtn = $(".play"), prevBtn = $(".prev"), nextBtn = $(".next"), hint = $(".hint");
  const line = $(".line"), fillEl = $(".fill"), knob = $(".knob"), curEl = $(".cur"), durEl = $(".dur");
  const last = TRACKS.length - 1;
  const homeTitle = document.title;

  // one audio element for the whole visit: once a tap has started it, it may keep playing song after song
  const audio = new Audio();
  audio.preload = "auto";
  let cur = -1, isOpen = false, pushed = false, dragging = false, draw = null, full = false;

  const fmt = s => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const setPlaying = on => { view.classList.toggle("playing", on); playBtn.setAttribute("aria-label", on ? "Pause" : "Play"); };
  const fileFor = j => TRACKS[j].audio || "audio/" + (j + 1) + ".mp3";

  // ---------- loading a song ----------
  let prefetch = null;
  function load(i) {
    cur = i;
    const tr = TRACKS[i];
    document.title = tr.title + " · For Spandita";
    $(".s-year").textContent = tr.year;
    $(".title").textContent = tr.title;
    $(".artist").textContent = tr.artist || "";
    art.setAttribute("aria-label", "Animated pixel art for " + tr.title);
    prevBtn.disabled = i <= 0;
    nextBtn.disabled = i >= last;
    draw = SCENES[tr.scene];
    full = !!draw.fullscreen;
    drawn = false;
    view.classList.toggle("full", full);
    fit();
    curEl.textContent = "0:00"; durEl.textContent = "0:00";
    fillEl.style.width = knob.style.left = "0%";
    audio.src = fileFor(i) + (tr.start ? "#t=" + tr.start : "");
    // fetch the next song in the background so the mixtape flows straight on
    if (prefetch) prefetch.remove();
    if (i < last) {
      prefetch = document.createElement("link");
      prefetch.rel = "prefetch"; prefetch.as = "audio"; prefetch.href = fileFor(i + 1);
      document.head.append(prefetch);
    }
  }

  // ---------- playing ----------
  let armed = null;
  function play() {
    setPlaying(true);
    const p = audio.play();
    if (p) p.then(() => { disarm(); }, () => { if (!audio.error) { setPlaying(false); arm(); } });
  }
  function arm() { // the browser wants a tap first (only when the page was opened from a link)
    if (armed) return;
    hint.textContent = "Tap anywhere to play ♥";
    armed = e => {
      if (!isOpen || (e.target.closest && e.target.closest(".controls, .s-back, .line"))) return;
      disarm(); play();
    };
    document.addEventListener("pointerdown", armed, true);
    document.addEventListener("keydown", armed, true);
  }
  function disarm() {
    if (!armed) return;
    document.removeEventListener("pointerdown", armed, true);
    document.removeEventListener("keydown", armed, true);
    armed = null;
    hint.textContent = "";
  }
  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("loadedmetadata", () => { durEl.textContent = fmt(audio.duration); });
  audio.addEventListener("timeupdate", tick);
  audio.addEventListener("ended", () => { if (cur < last) go(cur + 1); else setPlaying(false); });
  audio.addEventListener("error", () => { if (audio.getAttribute("src")) { setPlaying(false); hint.textContent = "This song is on its way."; } });

  function tick() {
    if (dragging) return;
    const d = audio.duration || 0, c = audio.currentTime || 0;
    if (d) durEl.textContent = fmt(d);
    curEl.textContent = fmt(c);
    fillEl.style.width = knob.style.left = (d ? (c / d) * 100 : 0) + "%";
  }

  function go(j) {
    if (j < 0 || j > last) return;
    hint.textContent = "";
    load(j);
    play();
    history.replaceState({ song: j }, "", "?song=" + j);
  }

  // ---------- opening and closing ----------
  function open(i, fromLink) {
    if (!isOpen) {
      isOpen = true;
      view.hidden = false;
      document.documentElement.classList.add("song-open");
      requestAnimationFrame(() => view.classList.add("shown"));
      requestAnimationFrame(frame);
    }
    hint.textContent = "";
    load(i);
    play(); // called right inside the tap, so phones allow the sound
    if (!fromLink) { history.pushState({ song: i }, "", "?song=" + i); pushed = true; }
  }
  function hide() {
    if (!isOpen) return;
    isOpen = false;
    audio.pause();
    disarm();
    view.classList.remove("shown");
    document.documentElement.classList.remove("song-open");
    document.title = homeTitle;
    setTimeout(() => { if (!isOpen) view.hidden = true; }, 350);
  }
  function close() {
    if (pushed) { pushed = false; history.back(); }   // popstate below hides the view
    else { history.replaceState({}, "", location.pathname); hide(); }
  }
  addEventListener("popstate", e => {
    const s = e.state;
    if (s && Number.isInteger(s.song)) { if (isOpen) go(s.song); else open(s.song, true); }
    else { pushed = false; hide(); }
  });

  // ---------- controls ----------
  playBtn.addEventListener("click", () => { if (audio.paused) play(); else audio.pause(); });
  prevBtn.addEventListener("click", () => go(cur - 1));
  nextBtn.addEventListener("click", () => go(cur + 1));
  $(".s-back").addEventListener("click", close);
  addEventListener("keydown", e => {
    if (!isOpen) return;
    if (e.key === "ArrowLeft") go(cur - 1);
    else if (e.key === "ArrowRight") go(cur + 1);
    else if (e.key === "Escape") close();
    else if (e.key === " " && !(e.target.closest && e.target.closest("button"))) { e.preventDefault(); if (audio.paused) play(); else audio.pause(); }
  });

  // tap or drag on the line to jump
  const seekTo = (x, commit) => {
    const r = line.getBoundingClientRect(), k = Math.min(1, Math.max(0, (x - r.left) / r.width));
    const d = audio.duration || 0;
    fillEl.style.width = knob.style.left = k * 100 + "%";
    curEl.textContent = fmt(k * d);
    if (commit && d) audio.currentTime = k * d;
  };
  line.addEventListener("pointerdown", e => { dragging = true; line.setPointerCapture(e.pointerId); seekTo(e.clientX, false); });
  line.addEventListener("pointermove", e => { if (dragging) seekTo(e.clientX, false); });
  line.addEventListener("pointerup", e => { if (dragging) { dragging = false; seekTo(e.clientX, true); } });

  // ---------- the picture ----------
  function fit() {
    const sw = stage.clientWidth, sh = stage.clientHeight;
    if (!sw || !sh || !draw) return;
    if (full) { // whole area above the player: short side ~44 art pixels
      const s = Math.max(1, Math.floor(Math.min(sw, sh) / 44));
      const w = Math.max(32, Math.ceil(sw / s)), h = Math.max(32, Math.ceil(sh / s));
      if (art.width !== w || art.height !== h) { art.width = bg.width = w; art.height = bg.height = h; }
      art.style.width = w * s + "px"; art.style.height = h * s + "px";
    } else {
      if (art.width !== 32) { art.width = bg.width = art.height = bg.height = 32; }
      const s = Math.min(sw, sh), px = s >= 64 ? Math.floor(s / 32) * 32 : s;
      art.style.width = art.style.height = px + "px";
    }
  }
  addEventListener("resize", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(stage);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let drawn = false;
  function frame(t) {
    if (!isOpen) return;
    if (draw && (!reduce || !drawn)) {
      fit();
      draw(actx, reduce ? 0 : t, art.width, art.height);
      bctx.drawImage(art, 0, 0);
      drawn = reduce;
    }
    requestAnimationFrame(frame);
  }

  window.Song = { open: i => open(i, false), get isOpen() { return isOpen; } };

  // opened from a link like index.html?song=3: show it and try to play (a tap may be needed)
  const q = parseInt(new URLSearchParams(location.search).get("song"), 10);
  if (Number.isInteger(q) && q >= 0 && q <= last) {
    history.replaceState({ song: q }, "", "?song=" + q);
    open(q, true);
  }
})();

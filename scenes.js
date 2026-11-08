/* ---------- 2. PLACEHOLDER 8-BIT SCENES ----------
   32x32 canvases, scaled up so the pixels show. These are generic, soft
   stand-ins. Each one gets replaced by a scene drawn for its song. */
const C = { night: "#3a2440", rose: "#f08aa8", blush: "#ffd3dc", gold: "#ffe2a8", mauve: "#8a5a8c" };

function rand(seed) { const x = Math.sin(seed * 127.1) * 43758.5453; return x - Math.floor(x); }

/* Backdrop for the proposal: a traditional family idol set under one arch.
   Durga in the middle with her lion beside her feet, Lakshmi and Saraswati above, Ganesha on the right. */
function traditionalBackdrop(ctx, t) {
  const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  const L = (x0, y0, x1, y1, c) => {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let i = 0; i <= n; i++) P(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), c);
  };
  const GOLD = "#e0a63a", BRIGHT = "#ffd978", RED = "#c42b3a", DEEP = "#6e1a2c", SK = "#e8a547", DK = "#2a1418";

  R(0, 0, 32, 32, "#241022"); R(0, 21, 32, 11, "#3b1a2b");
  for (let x = 0; x < 32; x += 4) P(x + (Math.floor(t / 4000) % 2), 24 + (x % 3) * 3, "#4a2234");

  // one wide glowing arch behind all the idols
  const pulse = Math.sin(t / 1100) > 0;
  for (let y = 1; y < 21; y++)
    for (let x = 2; x < 30; x++) {
      const d = Math.hypot((x - 16) * 0.8, y - 13);
      if (d < 10.5) P(x, y, DEEP);
      else if (d < 11.8) P(x, y, pulse ? BRIGHT : GOLD);
    }

  // string lights
  const LC = ["#ff7aa8", "#ffd978", "#7ce8ff", "#ffffff"];
  for (let x = 1; x < 32; x += 3) {
    P(x, 1 + (x % 2), "#6b4a3a");
    P(x, 2 + (x % 2), LC[(Math.floor(t / 450) + x) % 4]);
  }

  // Durga's arms, four a side, tipped with bright weapons
  for (const s of [-1, 1]) {
    const sx = 16 + s * 3;
    [[5, 5], [6, 8], [6, 11], [4, 14]].forEach(([dx, y1]) => {
      L(sx, 12, 16 + s * dx, y1, GOLD);
      P(16 + s * dx, y1, "#fff4c8");
    });
  }

  // Durga: crown, face, red and white sari
  R(14, 4, 5, 2, BRIGHT); P(16, 3, BRIGHT); P(13, 5, GOLD); P(19, 5, GOLD);
  R(14, 6, 5, 4, SK); P(15, 7, DK); P(17, 7, DK); P(16, 6, RED); P(16, 9, RED);
  R(15, 10, 3, 1, SK);
  R(13, 11, 7, 7, RED); R(13, 11, 1, 7, "#f6efe6"); R(19, 11, 1, 7, "#f6efe6"); R(13, 14, 7, 1, GOLD);

  // Lakshmi (top left) and Saraswati (top right)
  R(6, 7, 2, 1, GOLD); R(6, 8, 2, 2, SK); R(5, 10, 4, 4, "#e86a8a"); P(4, 11, BRIGHT);
  R(24, 7, 2, 1, GOLD); R(24, 8, 2, 2, SK); R(23, 10, 4, 4, "#f6efe6"); L(27, 9, 23, 13, "#8a5a3a");

  // the lion, sitting at her feet on the left
  R(6, 16, 5, 3, "#d98c2e"); R(10, 14, 3, 4, "#a85a1c"); R(11, 15, 2, 2, "#e8b86a"); P(12, 15, DK);
  P(5, 15, "#d98c2e"); P(5, 14, "#d98c2e"); P(4, 13, "#a85a1c");

  // Ganesha on the right
  R(20, 16, 4, 3, "#e86a3a"); R(21, 13, 3, 3, "#c9c4b8"); P(21, 16, "#c9c4b8"); P(22, 12, GOLD);
  R(20, 13, 1, 2, "#b0aaa0"); R(24, 13, 1, 2, "#b0aaa0"); P(22, 14, DK);

  // pedestal and a diya each side
  R(4, 19, 25, 2, "#8c2630"); R(4, 19, 25, 1, GOLD);
  for (const x of [3, 29]) {
    R(x - 1, 21, 3, 1, "#c8742a");
    P(x, 20, Math.floor(t / 180 + x) % 2 ? "#ffd978" : "#ff9a3a");
  }
}

const SCENES = {
  twinkle(ctx, t) {
    ctx.fillStyle = C.night; ctx.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 22; i++) {
      const x = Math.floor(rand(i + 1) * 32), y = Math.floor(rand(i + 50) * 32);
      const phase = (Math.sin(t / 700 + i * 1.7) + 1) / 2;
      ctx.fillStyle = phase > 0.66 ? C.gold : phase > 0.33 ? C.blush : C.mauve;
      ctx.fillRect(x, y, 1, 1);
      if (phase > 0.85) { ctx.fillRect(x - 1, y, 1, 1); ctx.fillRect(x + 1, y, 1, 1); ctx.fillRect(x, y - 1, 1, 1); ctx.fillRect(x, y + 1, 1, 1); }
    }
  },
  drift(ctx, t) {
    ctx.fillStyle = C.night; ctx.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 14; i++) {
      const x = Math.floor(rand(i + 7) * 30) + Math.round(Math.sin(t / 1200 + i) * 1.5);
      const y = 32 - ((t / 90 + rand(i + 20) * 40) % 36);
      ctx.fillStyle = i % 3 ? C.blush : C.rose;
      ctx.fillRect(x, Math.floor(y), 2, 2);
    }
  },
  glow(ctx, t) {
    ctx.fillStyle = C.night; ctx.fillRect(0, 0, 32, 32);
    const r = 7 + Math.sin(t / 900) * 2;
    for (let y = 0; y < 32; y += 2)
      for (let x = 0; x < 32; x += 2) {
        const d = Math.hypot(x - 15, y - 15);
        if (d < r) ctx.fillStyle = C.gold;
        else if (d < r + 3) ctx.fillStyle = C.rose;
        else if (d < r + 6) ctx.fillStyle = C.mauve;
        else continue;
        ctx.fillRect(x, y, 2, 2);
      }
  },

  /* Track 1: Durga idol under a pandal arch, the two of us in front, backs to camera */
  pandal(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const L = (x0, y0, x1, y1, c) => {
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
      for (let i = 0; i <= n; i++) P(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), c);
    };
    const GOLD = "#e0a63a", BRIGHT = "#ffd978", RED = "#c42b3a", DEEP = "#6e1a2c";

    // night sky and warm floor
    R(0, 0, 32, 32, "#241022");
    R(0, 21, 32, 11, "#3b1a2b");
    for (let x = 0; x < 32; x += 4) P(x + (Math.floor(t / 4000) % 2), 24 + (x % 3) * 3, "#4a2234");

    // glowing backdrop arch behind the idol (gently breathing)
    const pulse = Math.sin(t / 1100) > 0;
    for (let y = 2; y < 21; y++)
      for (let x = 3; x < 29; x++) {
        const d = Math.hypot(x - 16, (y - 12) * 0.95);
        if (d < 10.5) P(x, y, DEEP);
        else if (d < 11.8) P(x, y, pulse ? BRIGHT : GOLD);
      }

    // string lights across the top, twinkling
    const LC = ["#ff7aa8", "#ffd978", "#7ce8ff", "#ffffff"];
    for (let x = 1; x < 32; x += 3) {
      P(x, 1 + (x % 2), "#6b4a3a");
      P(x, 2 + (x % 2), LC[(Math.floor(t / 450) + x) % 4]);
    }

    // ten arms, five a side, tipped with little bright weapons
    for (const s of [-1, 1]) {
      const sx = 16 + s * 3;
      [[8, 5], [10, 9], [11, 13], [10, 17], [8, 20]].forEach(([dx, y1]) => {
        L(sx, 13, 16 + s * dx, y1, GOLD);
        P(16 + s * dx, y1, "#fff4c8");
      });
    }

    // body in red and white sari
    R(13, 12, 7, 7, RED);
    R(13, 12, 1, 7, "#f6efe6"); R(19, 12, 1, 7, "#f6efe6");
    R(13, 15, 7, 1, GOLD);

    // face, crown, eyes, tilak
    R(14, 7, 5, 4, "#e8a547");
    R(14, 5, 5, 2, BRIGHT); P(16, 4, BRIGHT); P(13, 6, GOLD); P(19, 6, GOLD);
    P(15, 8, "#2a1418"); P(17, 8, "#2a1418"); P(16, 7, RED); P(16, 10, RED);
    R(15, 11, 3, 1, "#e8a547");

    // pedestal and a diya each side
    R(8, 19, 17, 2, "#8c2630"); R(8, 19, 17, 1, GOLD);
    for (const x of [5, 27]) {
      R(x - 1, 21, 3, 1, "#c8742a");
      P(x, 20, Math.floor(t / 180 + x) % 2 ? "#ffd978" : "#ff9a3a");
    }

    // the two of us, from behind
    const HAIR = "#1a1218", SKIN = "#c98b62";
    // her: sari, braid, a little flower
    R(12, 24, 3, 2, HAIR); P(14, 24, "#ff9ab8");
    R(11, 26, 5, 6, "#f6efe6"); R(11, 26, 1, 6, RED); R(15, 26, 1, 6, RED); R(11, 31, 5, 1, RED);
    P(13, 26, HAIR); P(13, 27, HAIR); P(13, 28, HAIR); P(13, 29, HAIR);
    // him: kurta, dark trousers
    R(17, 22, 3, 2, HAIR); P(18, 24, SKIN);
    R(16, 25, 5, 5, "#e7d4ae"); R(16, 30, 2, 2, "#2a2a3c"); R(19, 30, 2, 2, "#2a2a3c");
    // holding hands
    P(15, 28, SKIN); P(16, 28, SKIN);
  },

  /* Track 2: the two of us on a video call, taking turns to talk */
  videocall(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const SKIN = "#e0a67a", HAIR = "#1a1218", DARK = "#2a1418";
    R(0, 0, 32, 32, "#1d0f1f");

    const speaker = Math.floor(t / 1500) % 2;      // 0 = her, 1 = him
    const talk = Math.floor(t / 160) % 2 === 0;

    // one call window; cx = face centre, long = long hair
    const win = (x0, bg, shirt, cx, long, active) => {
      R(x0, 2, 14, 18, active ? "#ff9ab8" : "#5a4668");   // bezel, lit when speaking
      R(x0 + 1, 3, 12, 16, bg);
      if (long) {
        R(cx - 3, 5, 7, 1, HAIR); R(cx - 3, 6, 1, 8, HAIR); R(cx + 3, 6, 1, 8, HAIR);
      } else {
        R(cx - 2, 5, 5, 1, HAIR); P(cx - 2, 6, HAIR); P(cx + 2, 6, HAIR);
      }
      R(cx - 2, 6, 5, 4, SKIN);                            // face
      P(cx - 1, 7, DARK); P(cx + 1, 7, DARK);              // eyes
      if (active && talk) R(cx - 1, 9, 3, 1, "#8c2630"); else P(cx, 9, "#b0594f"); // mouth
      R(cx - 1, 10, 3, 1, SKIN);                           // neck
      R(cx - 2, 11, 5, 1, shirt); R(cx - 4, 12, 9, 6, shirt); // collar and shoulders
    };
    win(1,  "#5a2e4a", "#c42b3a", 7,  true,  speaker === 0);   // her, warm lamp-lit room
    win(17, "#2c3a5e", "#8a8fa6", 23, false, speaker === 1);   // him, cool-lit room

    // little signals travelling from each screen to a shared heart
    for (let k = 0; k < 3; k++) {
      const d = Math.floor((t / 140 + k * 3.4) % 10);
      P(3 + d, 22, "#ffd978"); P(28 - d, 22, "#ffd978");
    }
    const H = Math.sin(t / 400) > 0 ? "#ff7aa8" : "#ffb3cc";
    R(14, 21, 2, 1, H); R(17, 21, 2, 1, H);                 // heart: two lobes
    R(13, 22, 6, 1, H); R(14, 23, 4, 1, H); R(15, 24, 2, 1, H);

    // call bar: mute, end call, camera
    R(9, 27, 4, 3, "#4a3a5a"); R(14, 27, 5, 3, "#e03a4a"); R(20, 27, 4, 3, "#4a3a5a");
    P(10, 28, "#ffffff"); P(22, 28, "#ffffff");
  },

  /* Track 4: our dream house at dusk, the two of us on the path, backs to camera */
  dreamhouse(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const RED = "#c42b3a", HAIR = "#1a1218", SKIN = "#c98b62";

    // dusk sky in bands, with twinkling stars and a moon
    R(0, 0, 32, 7, "#241437"); R(0, 7, 32, 5, "#3d2250"); R(0, 12, 32, 5, "#6a3358"); R(0, 17, 32, 4, "#a84e60");
    for (let i = 0; i < 14; i++) {
      const on = Math.sin(t / 800 + i * 2) > -0.2;
      P(Math.floor(rand(i + 3) * 32), Math.floor(rand(i + 30) * 9), on ? "#fff2c8" : "#6a5a88");
    }
    R(23, 2, 4, 4, "#fff2c8"); P(23, 2, "#241437"); P(26, 2, "#241437"); P(23, 5, "#241437"); P(26, 5, "#241437");

    // grass and a stone path leading to the door
    R(0, 20, 32, 12, "#2c4a3c"); R(0, 20, 32, 1, "#3c6a4a"); R(0, 27, 32, 5, "#27402f");
    for (let y = 21; y < 32; y++) {
      const h = 2 + Math.floor((y - 21) * 0.4);
      for (let x = 16 - h; x < 16 + h; x++) P(x, y, (x + y) % 2 ? "#cbb59a" : "#b89f84");
    }

    // tree with fairy lights, and a bush behind a little fence
    R(28, 16, 2, 5, "#5a3a2a"); R(25, 9, 7, 7, "#3c6a4a"); R(26, 8, 5, 1, "#3c6a4a"); R(26, 16, 5, 1, "#3c6a4a");
    [[26, 11], [29, 10], [28, 13], [30, 14], [26, 14]].forEach(([x, y], i) =>
      P(x, y, ["#ffd978", "#ff9ab8", "#7ce8ff"][(Math.floor(t / 500) + i) % 3]));
    R(1, 16, 5, 4, "#3c6a4a"); R(2, 15, 3, 1, "#3c6a4a");
    for (const x of [0, 2, 4, 6]) R(x, 18, 1, 3, "#f2ece0");
    R(0, 19, 7, 1, "#f2ece0");

    // chimney smoke
    R(19, 4, 4, 1, "#6a2a24"); R(20, 5, 2, 4, "#8a3a30");
    for (let k = 0; k < 3; k++) {
      const yy = 3 - Math.floor((t / 300 + k * 2) % 4);
      if (yy >= 0) P(21 + Math.round(Math.sin(t / 700 + k)), yy, "#c9b8cc");
    }

    // roof
    R(14, 6, 4, 1, "#b4443f"); R(12, 7, 8, 1, "#b4443f"); R(10, 8, 12, 1, "#b4443f"); R(8, 9, 16, 1, "#cc5a4a");
    R(6, 10, 20, 1, "#8a3030"); R(15, 7, 2, 2, "#ffd978");

    // walls, lit windows, door, porch lamp
    R(8, 11, 16, 10, "#ecd5b0"); R(8, 20, 16, 1, "#c9ab82");
    const glow = (k) => (Math.floor(t / 650) + k) % 3 ? "#ffd978" : "#ffe9a8";
    R(9, 13, 4, 4, "#6a4a3a"); R(10, 14, 2, 2, glow(0));
    R(19, 13, 4, 4, "#6a4a3a"); R(20, 14, 2, 2, glow(1));
    R(14, 16, 4, 5, "#6b3a2a"); R(15, 15, 2, 1, "#6b3a2a"); P(17, 18, "#e0a63a");
    P(13, 15, glow(2)); P(18, 15, glow(2));

    // flowers by the path
    [8, 10, 12, 19, 21, 23].forEach((x, i) => {
      P(x, 21, ["#ff9ab8", "#ffd978", "#f6efe6"][i % 3]); P(x, 22, "#3c6a4a");
    });

    // fireflies
    for (let k = 0; k < 5; k++) {
      if (Math.sin(t / 500 + k * 1.3) <= 0) continue;
      P(3 + Math.floor(rand(k + 60) * 26 + Math.sin(t / 900 + k * 2) * 2),
        21 + Math.floor(rand(k + 70) * 8 + Math.cos(t / 1100 + k) * 1.5), "#ffe98a");
    }

    // the two of us, from behind, on the path
    R(12, 24, 3, 2, HAIR); P(14, 24, "#ff9ab8");
    R(11, 26, 5, 6, "#f6efe6"); R(11, 26, 1, 6, RED); R(15, 26, 1, 6, RED); R(11, 31, 5, 1, RED);
    for (let y = 26; y < 30; y++) P(13, y, HAIR);
    R(17, 22, 3, 2, HAIR); P(18, 24, SKIN);
    R(16, 25, 5, 5, "#e7d4ae"); R(16, 30, 2, 2, "#2a2a3c"); R(19, 30, 2, 2, "#2a2a3c");
    P(15, 28, SKIN); P(16, 28, SKIN);
  },

  /* Track 5: the proposal, Durga Puja 2024. Same pandal backdrop, but now one of us is kneeling. */
  proposal(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const HAIR = "#1a1218", SKIN = "#c98b62", RED = "#c42b3a", PANTS = "#2a2a3c";

    traditionalBackdrop(ctx, t);           // the family idol set, then the two of us in front

    // her, standing on the right, facing him, one hand to her mouth
    R(21, 22, 4, 1, HAIR); R(23, 23, 2, 3, HAIR); P(24, 22, "#ff9ab8");
    R(21, 23, 2, 3, SKIN); P(21, 23, "#2a1418");
    R(21, 26, 2, 1, SKIN);
    R(20, 27, 5, 5, "#f6efe6"); R(20, 27, 1, 5, RED); R(24, 27, 1, 5, RED); R(20, 31, 5, 1, RED);
    R(24, 26, 1, 4, HAIR);
    P(20, 25, SKIN); P(20, 26, SKIN);

    // him, on one knee on the left, arm stretched out
    R(11, 23, 4, 1, HAIR); R(11, 24, 1, 2, HAIR); R(12, 24, 3, 3, SKIN); P(13, 24, "#2a1418");
    R(10, 27, 5, 2, "#e7d4ae");
    R(7, 30, 5, 2, PANTS); R(11, 29, 5, 1, PANTS); R(15, 30, 1, 2, PANTS); P(16, 31, "#1a1218");
    R(15, 27, 3, 1, SKIN);

    // the ring, sparkling
    P(17, 26, "#e0a63a");
    const s = Math.floor(t / 300) % 3;
    P(17, 25, s === 0 ? "#ffffff" : "#bfeaff");
    if (s === 0) { P(16, 24, "#ffffff"); P(18, 24, "#ffffff"); P(17, 23, "#ffffff"); }
    if (s === 1) { P(17, 24, "#ffffff"); }

    // little hearts floating up between us
    for (let k = 0; k < 2; k++) {
      const y = 25 - Math.floor((t / 260 + k * 3) % 7);
      if (y > 3) P(19 + (k ? 1 : -1) + Math.round(Math.sin(t / 500 + k * 2)), y, "#ff9ab8");
    }
  },

  /* Track 6: the beach proposal, 2024. She kneels and holds up the ring; he stands, hand to his mouth. */
  beach(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const SKIN = "#c98b62", HAIR = "#1a1218";

    // sunset sky in bands
    R(0, 0, 32, 5, "#3a2350"); R(0, 5, 32, 4, "#7a3a6a"); R(0, 9, 32, 3, "#d4586a"); R(0, 12, 32, 3, "#f59a5a");
    // setting sun, half sunk into the sea
    for (let y = 9; y < 14; y++) {
      const w = Math.floor(Math.sqrt(Math.max(0, 25 - (y - 14) * (y - 14))));
      R(16 - w, y, 2 * w, 1, "#ffe9a8");
    }
    // sea, darker with depth
    R(0, 14, 32, 3, "#4a5a9a"); R(0, 17, 32, 3, "#3a4a8a"); R(0, 20, 32, 2, "#2f3d78");
    // sun glitter on the water
    for (let y = 14; y < 21; y++) {
      if (Math.sin(t / 380 + y * 2.1) > -0.3) R(15 - (y % 2), y, 3 + (y % 3), 1, "#ffd978");
    }
    // sand: wet near the water, dry below
    R(0, 22, 32, 2, "#b89a72"); R(0, 24, 32, 8, "#d9b98a");
    // foam line rolling in and out
    for (let x = 0; x < 32; x++) P(x, 21 + Math.round(Math.sin(x / 3 + t / 600)), "#f2ece0");
    // footprints leading to the two of us
    for (let k = 0; k < 4; k++) { P(3 + k * 2, 28 + (k % 2), "#b89a72"); }

    // gulls drifting across the sky
    for (let k = 0; k < 2; k++) {
      const gx = Math.floor((t / 220 + k * 15) % 40) - 4, gy = 3 + k * 3 + Math.round(Math.sin(t / 350 + k));
      const up = Math.floor(t / 300 + k) % 2 === 0;
      P(gx - 1, gy + (up ? 0 : 1), "#f2ece0"); P(gx, gy + (up ? 1 : 0), "#f2ece0"); P(gx + 1, gy + (up ? 0 : 1), "#f2ece0");
    }

    // him, standing on the right, hand to his mouth
    R(20, 15, 4, 1, HAIR); P(23, 16, HAIR); P(23, 17, HAIR);
    R(20, 16, 3, 3, SKIN); P(20, 17, "#2a1418"); P(19, 18, SKIN);
    R(19, 19, 5, 6, "#f6efe6"); R(19, 25, 2, 4, "#4a5a7a"); R(22, 25, 2, 4, "#4a5a7a");
    P(19, 29, SKIN); P(22, 29, SKIN);

    // her, kneeling on the left, arm raised with the ring
    R(9, 20, 4, 1, HAIR); R(8, 21, 1, 6, HAIR); P(11, 20, "#ff9ab8");
    R(9, 21, 3, 3, SKIN); P(11, 22, "#2a1418");
    R(9, 24, 4, 4, "#3fb8a8"); R(8, 27, 8, 3, "#3fb8a8"); R(8, 29, 8, 1, "#2c8a7e");
    P(13, 25, SKIN); P(14, 24, SKIN); P(15, 23, SKIN); P(16, 22, SKIN);

    // the ring, sparkling
    P(17, 22, "#e0a63a");
    const s = Math.floor(t / 300) % 3;
    P(17, 21, s === 0 ? "#ffffff" : "#bfeaff");
    if (s === 0) { P(16, 20, "#ffffff"); P(18, 20, "#ffffff"); P(17, 19, "#ffffff"); }
    if (s === 1) P(17, 20, "#ffffff");

    // hearts floating up
    for (let k = 0; k < 2; k++) {
      const y = 19 - Math.floor((t / 260 + k * 3) % 7);
      if (y > 3) P(15 + k * 3 + Math.round(Math.sin(t / 500 + k * 2)), y, "#ff9ab8");
    }
  },

  /* Track 7: 2025, new jobs. A rooftop at dusk, city lights, a flock of birds ("parindey"), new badges. */
  rooftop(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const HAIR = "#1a1218", SKIN = "#c98b62", PANTS = "#2a2a3c";

    // dusk sky and a few stars
    R(0, 0, 32, 5, "#2a1d5a"); R(0, 5, 32, 4, "#5a2f7a"); R(0, 9, 32, 4, "#c4506e"); R(0, 13, 32, 8, "#f59a5a");
    for (let i = 0; i < 6; i++) {
      if (Math.sin(t / 700 + i * 2.3) > -0.3) P(Math.floor(rand(i + 5) * 32), Math.floor(rand(i + 15) * 5), "#fff2c8");
    }

    // city skyline with lit windows that come and go
    [[0, 5, 15], [5, 4, 12], [9, 5, 17], [14, 4, 10], [18, 5, 16], [23, 4, 13], [27, 5, 18]].forEach(([bx, w, top], b) => {
      R(bx, top, w, 22 - top, b % 2 ? "#33244a" : "#2a1d3d");
      for (let y = top + 2; y < 20; y += 2)
        for (let x = bx + 1; x < bx + w - 1; x += 2) {
          const seed = x * 7 + y * 3;
          if (rand(seed) > 0.45 && Math.sin(t / 1800 + seed) > -0.6) P(x, y, "#ffd978");
        }
    });

    // rooftop railing and floor
    R(0, 22, 32, 2, "#1f1530");
    R(0, 21, 32, 1, "#8a78a8");
    for (let x = 1; x < 32; x += 4) R(x, 22, 1, 2, "#6a5a88");
    R(0, 24, 32, 8, "#5a4670");

    // a flock of birds crossing the sky
    const bx0 = Math.floor(t / 170) % 46 - 6;
    [[0, 0], [-3, 2], [-3, -2], [-6, 4], [-6, -4]].forEach(([dx, dy], k) => {
      const x = bx0 + dx, y = 5 + dy, up = Math.floor(t / 280 + k) % 2 === 0;
      P(x - 1, y + (up ? 0 : 1), "#fff2c8"); P(x, y + (up ? 1 : 0), "#fff2c8"); P(x + 1, y + (up ? 0 : 1), "#fff2c8");
    });

    // two new ID badges floating above us, bobbing and sparkling
    const bob = Math.round(Math.sin(t / 600));
    [[11, "#4aa8d8"], [18, "#e86a8a"]].forEach(([x, c], k) => {
      R(x, 15 + bob, 3, 4, "#f6efe6"); R(x, 15 + bob, 3, 1, c); P(x + 1, 17 + bob, "#8a8aa0");
      if (Math.floor(t / 350 + k * 2) % 3 === 0) { P(x + 3, 14 + bob, "#ffffff"); P(x - 1, 16 + bob, "#ffffff"); }
    });

    // the two of us, from behind, holding hands
    R(12, 24, 3, 2, HAIR); P(14, 24, "#ff9ab8");
    R(11, 26, 5, 4, "#b49ad8"); R(11, 30, 5, 2, PANTS);
    for (let y = 26; y < 30; y++) P(13, y, HAIR);
    R(17, 22, 3, 2, HAIR); P(18, 24, SKIN);
    R(16, 25, 5, 5, "#8aa0c0"); R(16, 30, 2, 2, PANTS); R(19, 30, 2, 2, PANTS);
    P(15, 28, SKIN); P(16, 28, SKIN);
  },

  /* Track 3: 2021, our first trip to the mountains. Sunrise over snow peaks, prayer flags, pines; the two of us from behind in woolly caps. */
  mountains(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const interp = (pts, x) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
        if (x >= x0 && x <= x1) return Math.round(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
      }
      return pts[pts.length - 1][1];
    };
    const HAIR = "#1a1218", SKIN = "#c98b62";

    // dawn sky in bands, and a small sun peeking between the peaks
    R(0, 0, 32, 5, "#3a4a8a"); R(0, 5, 32, 4, "#8a6aa8"); R(0, 9, 32, 4, "#f08aa8"); R(0, 13, 32, 9, "#ffc89a");
    const glow = Math.sin(t / 700) > 0;
    for (let y = 8; y < 16; y++) for (let x = 8; x < 17; x++) {
      const d = Math.hypot(x - 12, y - 12);
      if (d < 3) P(x, y, "#fff2c8"); else if (d < 4.2) P(x, y, glow ? "#ffe9b0" : "#ffd9a0");
    }

    // far snow peaks, sunlit
    const far = [[0, 16], [5, 12], [8, 9], [12, 14], [15, 11], [19, 14], [22, 6], [26, 12], [29, 10], [31, 14]];
    for (let x = 0; x < 32; x++) {
      const r = interp(far, x);
      for (let y = r; y < 22; y++) P(x, y, y < r + (r < 13 ? 3 : 0) ? "#f4f0ff" : (x + y) % 2 ? "#7a6aa0" : "#6a5a90");
    }
    // nearer dark hills
    const near = [[0, 19], [6, 17], [12, 20], [20, 18], [26, 20], [31, 17]];
    for (let x = 0; x < 32; x++) { const r = interp(near, x); R(x, r, 1, 23 - r, "#3a3a5a"); }

    // mist drifting over the hills
    for (let k = 0; k < 3; k++) R(Math.floor((t / 260 + k * 12) % 40) - 6, 18 + (k % 2), 6, 1, "#d8d0e8");

    // pines
    const pine = (cx, base, h) => {
      for (let r = 0; r < h; r++) {
        const w = 1 + 2 * Math.floor(r / 2);
        R(cx - Math.floor(w / 2), base - h + 1 + r, w, 1, r % 2 ? "#2f5a4a" : "#1f3a3a");
      }
      P(cx, base + 1, "#4a3224");
    };
    pine(3, 22, 9); pine(7, 22, 7); pine(28, 22, 9); pine(24, 22, 6);

    // viewpoint ground and a wooden railing
    R(0, 23, 32, 9, "#6a5a60"); R(0, 23, 32, 1, "#8a6a4a");
    for (let x = 1; x < 32; x += 4) R(x, 24, 1, 3, "#6a4a32");

    // prayer flags strung across the top left, fluttering
    const FC = ["#4aa8d8", "#f6efe6", "#e24a4a", "#4aa86a", "#ffd978"];
    for (let i = 0; i < 10; i++) {
      const x = 1 + i * 2, y = 2 + Math.floor(i * 0.5) + (Math.floor(t / 350 + i) % 2 ? 1 : 0);
      P(x, 2 + Math.floor(i * 0.5), "#6b4a3a"); P(x, y + 1, FC[i % 5]);
    }

    // the two of us, from behind, in woolly caps and jackets, holding hands
    R(12, 22, 3, 2, "#f6efe6"); P(13, 21, "#ff9ab8");
    P(12, 24, HAIR); P(14, 24, HAIR); P(13, 24, SKIN);
    R(11, 25, 5, 1, "#c42b3a");
    P(Math.floor(t / 400) % 2 ? 9 : 10, 26, "#c42b3a"); P(10, 27, "#c42b3a");
    R(11, 26, 5, 4, "#e86a8a"); R(11, 30, 5, 2, "#3a3a52");
    R(17, 22, 3, 2, "#2a2a3c"); P(18, 24, SKIN);
    R(16, 25, 5, 5, "#3a6a9a"); R(16, 30, 2, 2, "#2a2a3c"); R(19, 30, 2, 2, "#2a2a3c");
    P(15, 28, SKIN); P(16, 28, SKIN);

    // a few snowflakes drifting
    for (let k = 0; k < 9; k++) {
      const x = Math.floor(rand(k + 110) * 32 + Math.sin(t / 700 + k) * 1.5);
      const y = Math.floor((t / 220 + rand(k + 120) * 40) % 32);
      P(x, y, "#ffffff");
    }
  },

  /* Track 8: 2026, the marriage is fixed. Both families gathered, facing us; the two of us in front, backs to camera. */
  family(ctx, t) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const GOLD = "#e0a63a", RED = "#c42b3a", HAIR = "#1a1218", DK = "#2a1418", CREAM = "#f6efe6";

    // warm room and floor
    R(0, 0, 32, 22, "#3a1a2a"); R(0, 22, 32, 10, "#8a2a3c");

    // string lights across the top
    const LC = ["#ff7aa8", "#ffd978", "#7ce8ff", "#ffffff"];
    for (let x = 1; x < 32; x += 3) { P(x, 0, "#6b4a3a"); P(x, 1, LC[(Math.floor(t / 450) + x) % 4]); }

    // marigold garland draped across
    for (let x = 0; x < 32; x++) {
      const y = 2 + Math.round(3 * Math.sin(x / 31 * Math.PI));
      P(x, y, x % 2 ? "#ff9a1a" : "#ffc83a"); P(x, y + 1, x % 2 ? "#ffc83a" : "#ff9a1a");
    }

    // a glowing heart between the two families
    const H = Math.sin(t / 500) > 0 ? "#ff7aa8" : "#ffb3cc";
    P(15, 8, H); P(17, 8, H); R(14, 9, 5, 1, H); R(15, 10, 3, 1, H); P(16, 11, H);

    // one family member, facing us
    const person = (x, top, hair, cloth, skin, o) => {
      R(x + 1, top, 3, 3, skin); R(x + 1, top, 3, 1, hair);
      if (o.long) { P(x, top + 1, hair); P(x + 4, top + 1, hair); }
      if (o.bun) P(x + 2, top - 1, hair);
      P(x + 1, top + 1, DK); P(x + 3, top + 1, DK); P(x + 2, top + 2, "#a8453f");
      R(x, top + 3, 5, 22 - (top + 3), cloth);
      if (o.border) { R(x + 4, top + 3, 1, 22 - (top + 3), GOLD); }
      if (o.wave) {
        const up = Math.floor(t / 350) % 2 === 0;
        P(x + (o.wave > 0 ? 5 : -1), top + 3 - (up ? 1 : 0), skin);
      }
    };
    person(0, 8, HAIR, "#8aa0c0", "#c98b62", {});
    person(5, 10, HAIR, "#3fb8a8", "#d89a72", { long: true, bun: true, border: true });
    person(10, 14, HAIR, "#ffd978", "#c98b62", { wave: 1 });
    person(17, 13, "#d8d4cc", "#f2ece0", "#b87a52", { wave: -1, border: true });
    person(22, 10, HAIR, "#e86a3a", "#c98b62", { long: true, bun: true, border: true });
    person(27, 8, "#3a3a3a", "#e7d4ae", "#d89a72", {});

    // diyas on the floor
    for (const x of [2, 29]) {
      R(x - 1, 23, 3, 1, "#c8742a");
      P(x, 22, Math.floor(t / 170 + x) % 2 ? "#ffd978" : "#ff9a3a");
    }

    // the two of us in front, from behind, holding hands
    R(12, 24, 3, 2, HAIR); P(14, 24, "#ff9ab8");
    R(11, 26, 5, 6, RED); R(11, 26, 1, 6, GOLD); R(15, 26, 1, 6, GOLD); R(11, 31, 5, 1, GOLD);
    for (let y = 26; y < 30; y++) P(13, y, HAIR);
    R(17, 22, 3, 2, HAIR); P(18, 24, "#c98b62");
    R(16, 25, 5, 4, "#f6e8c8"); R(16, 29, 5, 3, CREAM); R(16, 31, 5, 1, GOLD);
    P(15, 28, "#c98b62"); P(16, 28, "#c98b62");

    // petals drifting down
    for (let k = 0; k < 8; k++) {
      const x = 3 + Math.floor(rand(k + 80) * 26) + Math.round(Math.sin(t / 500 + k));
      const y = Math.floor((t / 130 + rand(k + 90) * 40) % 30) + 3;
      P(x, y, k % 2 ? "#ff9a1a" : "#ff9ab8");
    }
  }
};

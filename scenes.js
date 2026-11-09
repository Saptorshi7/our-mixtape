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
  },

  /* Track 1: Saptami afternoon, the two of us eating phuchka at a stall, a pandal behind.
     Works at any size: W x H (at least 32 x 32). The 32x32 core sits in the middle;
     extra width shows more fair (crowd, a balloon seller, a dhaki), extra height more sky and ground. */
  phuchka(ctx, t, W = 32, H = 32) {
    const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
    const L = (x0, y0, x1, y1, c) => {
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
      for (let i = 0; i <= n; i++) P(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), c);
    };
    const RED = "#c42b3a", WHITE = "#f6efe6", HAIR = "#1a1218", DARK = "#2a1418", GOLD = "#f0b84a";
    const SKIN = "#c98b62", SKIN2 = "#b47a50", LEAF = "#5f8a3a", LEAF2 = "#7aa84a";
    const ox = Math.floor((W - 32) / 2), oy = Math.floor((H - 32) * 0.7);
    const hz = oy + 20; // where the ground starts

    // late-afternoon sky in soft bands
    const SKY = ["#e7a184", "#eeb08a", "#f4c193", "#f8d29f", "#fbe2b3"];
    for (let y = 0; y < hz; y++) R(0, y, W, 1, SKY[Math.min(4, Math.floor((y / hz) * 5))]);

    // low sun, gently glowing
    const sx = ox + 5, sy = oy + 6, glow = 3.6 + 0.4 * Math.sin(t / 900);
    for (let y = sy - 5; y <= sy + 5; y++)
      for (let x = sx - 5; x <= sx + 5; x++) {
        const d = Math.hypot(x - sx, y - sy);
        if (d < 2.2) P(x, y, "#fff6d8"); else if (d < glow) P(x, y, "#fde3a6");
      }

    // a small cloud drifting by
    const cx = Math.floor(((t / 350) % (W + 14)) - 7), cy = oy + 3;
    R(cx, cy, 6, 1, "#fbe9cf"); R(cx + 1, cy - 1, 3, 1, "#fbe9cf");

    // the pandal behind us: long cloth wall, then the gate with its roof
    R(0, hz - 6, W, 6, "#e9cba8"); R(0, hz - 6, W, 1, "#c94a5a");
    for (let x = 0; x < W; x += 4) P(x + 1, hz - 4, "#dcb48e");
    ctx.save(); ctx.translate(ox, oy);
    for (let y = 2; y <= 8; y++) {
      const hw = Math.round((y - 2) * 1.8);
      R(16 - hw, y, hw * 2 + 1, 1, y % 2 ? "#b8404f" : "#c94a5a");
      P(16 - hw, y, GOLD); P(16 + hw, y, GOLD);
    }
    P(16, 1, GOLD); P(16, 0, "#ffd978");
    for (let x = 6; x <= 26; x++) R(x, 9, 1, 11, Math.floor((x - 6) / 2) % 2 ? "#e2a24a" : "#d4606c");
    R(6, 9, 21, 1, GOLD);
    // the arch, with the Goddess glowing inside, above everyone's heads
    R(11, 11, 11, 9, "#7a2534"); R(12, 10, 9, 1, "#7a2534");
    const shine = Math.sin(t / 1100) > 0;
    for (let y = 10; y <= 14; y++) for (let x = 12; x <= 20; x++)
      if (Math.hypot(x - 16, y - 12.5) < 3.6 && Math.hypot(x - 16, y - 12.5) > 2.4) P(x, y, shine ? "#ffd978" : "#e0a63a");
    P(16, 10, "#ffd978"); R(15, 11, 3, 2, "#e8a547"); P(15, 11, DARK); P(17, 11, DARK); P(16, 12, RED);
    R(14, 13, 5, 2, RED); P(14, 13, WHITE); P(18, 13, WHITE);
    ctx.restore();

    // string lights strung across the whole fair
    const LC = ["#ff7aa8", "#ffd978", "#7ce8ff", "#ffffff"];
    for (let x = 0; x < W; x += 3) {
      const y = oy + 9 + Math.round(1.5 * Math.sin((x - ox) / 5));
      P(x, y, LC[(Math.floor(t / 450) + x) % 4]);
    }

    // dusty fairground
    R(0, hz, W, H - hz, "#c9a07e");
    for (let y = hz + 1; y < H; y++)
      for (let x = 0; x < W; x += 1) if (rand(x * 31 + y * 7) < 0.06) P(x, y, "#b98f6e");

    // the crowd in the distance, bobbing a little
    const CROWD = ["#c98a86", "#b77a8c", "#d59a7e", "#a97890", "#c7907a"];
    for (let x = 1; x < W; x += 3) {
      const k = Math.floor(rand(x + 11) * CROWD.length), bob = Math.floor(t / 650 + x) % 3 === 0 ? 1 : 0;
      const h = 4 + Math.floor(rand(x + 5) * 2);
      R(x, hz - h + bob, 2, h, CROWD[k]); P(x, hz - h - 1 + bob, "#7a5a5a");
    }

    ctx.save(); ctx.translate(ox, oy);

    // far left (wide screens): a balloon seller
    R(-10, 21, 3, 7, "#6a7fb0"); R(-10, 18, 3, 3, SKIN2); R(-10, 17, 3, 1, HAIR);
    R(-10, 28, 1, 3, DARK); R(-8, 28, 1, 3, DARK);
    L(-7, 22, -5, 9, "#8a7060");
    [["#ff7aa8", -7, 6], ["#ffd978", -4, 5], ["#7ce8ff", -5, 8], ["#ff6a5a", -2, 7], ["#b58cff", -8, 9]].forEach(([c, bx, by], k) => {
      const b = Math.round(Math.sin(t / 700 + k * 1.3));
      L(-5, 9, bx, by + 2 + b, "#a89080"); R(bx, by + b, 2, 2, c);
    });

    // far right (wide screens): a dhaki with his drum and white kash plume
    const beat = Math.floor(t / 300) % 2;
    R(40, 18, 3, 3, SKIN2); R(40, 17, 3, 1, HAIR);
    R(40, 21, 3, 6, "#f2e6c8"); R(40, 27, 1, 4, DARK); R(42, 27, 1, 4, DARK);
    R(43, 21, 5, 4, "#8c3a2a"); R(43, 21, 1, 4, "#e9d8b0"); R(47, 21, 1, 4, "#e9d8b0");
    for (let k = 0; k < 4; k++) P(44 + k, 20 - (k % 2), WHITE), P(44 + k, 19 - (k % 2), WHITE);
    L(42, 22, 44, 20 + beat, "#6b4a3a");

    // the phuchka stall: wooden stand, red cloth, wicker basket piled high
    L(12, 24, 18, 31, "#7a5232"); L(18, 24, 12, 31, "#7a5232");
    R(9, 31, 14, 1, "#b48a68");
    R(10, 23, 13, 1, RED);
    R(11, 20, 9, 3, "#c8924a"); R(11, 22, 9, 1, "#a8743a");
    for (let x = 11; x < 20; x += 2) P(x, 21, "#b8803e");
    [[3, 17], [5, 18], [7, 19]].forEach(([w, y]) => {
      for (let x = 15 - (w >> 1); x <= 15 + (w >> 1); x++) P(x, y, (x + y) % 3 ? "#f3dca6" : "#e2c27f");
    });
    // steel pot of tamarind water
    R(20, 19, 3, 4, "#b9bdc4"); R(20, 19, 3, 1, "#5c3318"); P(20, 20, "#e9ecf0");

    // the phuchka-wala, behind his basket
    R(14, 14, 3, 1, HAIR); R(14, 15, 3, 3, SKIN2);
    P(14, 16, DARK); P(16, 16, DARK); P(15, 17, "#3a2418");
    R(13, 18, 5, 2, "#e9e2d0");
    P(13, 18, RED); P(13, 19, WHITE);

    // whose turn: one phuchka for her, then one for me
    const cyc = 2600, n = Math.floor(t / cyc), p = (t % cyc) / cyc;
    const herTurn = n % 2 === 0;
    const pot = [21, 19], bowl = herTurn ? [9, 20] : [23, 20];
    const lerp = (a, b, k) => [Math.round(a[0] + (b[0] - a[0]) * k), Math.round(a[1] + (b[1] - a[1]) * k)];
    let hand, carrying = false;
    if (p < 0.25) hand = [pot[0], pot[1] + (Math.floor(t / 200) % 2)];
    else if (p < 0.5) { hand = lerp(pot, bowl, (p - 0.25) / 0.25); hand[1] -= Math.round(Math.sin(((p - 0.25) / 0.25) * Math.PI) * 3); carrying = true; }
    else if (p < 0.62) hand = bowl;
    else hand = lerp(bowl, pot, (p - 0.62) / 0.38);
    L(17, 18, hand[0], hand[1] - 1, SKIN2);
    P(hand[0], hand[1] - 1, SKIN2);
    if (carrying) P(hand[0], hand[1] - 2, "#f3dca6");
    // the one who just got a phuchka pops it in
    const eating = p > 0.62 && p < 0.9;
    const herEats = eating && herTurn, meEats = eating && !herTurn;

    // her: red-and-white sari, braid with a flower, facing the stall
    R(4, 15, 4, 1, HAIR); R(4, 16, 1, 3, HAIR); R(5, 16, 3, 3, SKIN);
    P(7, 17, DARK); P(7, 16, RED);
    P(3, 17, HAIR); P(3, 18, HAIR); P(3, 19, HAIR); P(3, 16, "#ff9ab8");
    R(5, 19, 3, 3, RED); P(5, 19, WHITE); P(6, 20, WHITE);
    R(4, 22, 4, 9, WHITE); R(7, 22, 1, 9, RED); R(4, 30, 4, 1, RED);
    P(5, 31, SKIN); P(7, 31, SKIN);
    R(8, 21, 2, 1, LEAF); P(9, 20, LEAF2); P(8, 22, SKIN);
    if (herEats) { P(8, 19, SKIN); P(8, 18, SKIN); } else P(8, 20, SKIN);

    // me: cream kurta, facing the stall
    R(25, 14, 3, 1, HAIR); R(27, 15, 1, 2, HAIR); R(25, 15, 2, 3, SKIN); P(27, 17, SKIN);
    P(25, 16, DARK);
    R(25, 18, 4, 8, "#e7d4ae"); R(25, 18, 4, 1, "#d8c090");
    R(25, 26, 2, 5, "#2a2a3c"); R(27, 26, 2, 5, "#2a2a3c"); R(25, 31, 4, 1, HAIR);
    R(23, 21, 2, 1, LEAF); P(23, 20, LEAF2); P(24, 22, SKIN);
    if (meEats) { P(24, 18, SKIN); P(24, 17, SKIN); } else P(24, 20, SKIN);

    ctx.restore();
  }
};

// scenes that can fill a whole screen (they take W, H)
SCENES.phuchka.fullscreen = true;

/* ---------- 3. FULL-SCREEN SCENES FOR THE SONG PAGES ----------
   Each takes (ctx, t, W, H) and fills any size (at least 32 x 32).
   The polaroids on the home page keep the older 32x32 pictures (see `cover` in tracks.js). */
function pix(ctx) {
  const P = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  const L = (x0, y0, x1, y1, c) => {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
    for (let i = 0; i <= n; i++) P(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), c);
  };
  return { P, R, L };
}

/* The two of us on the bike, side view from the left: bike facing left, me riding, her behind me.
   (bx, gy) = middle of the bike, on the road where the wheels touch. */
function bikeSide(ctx, t, bx, gy, o) {
  const { P, R, L } = pix(ctx);
  const HAIR = "#1a1218", SKIN = "#c98b62";
  const up = Math.floor(t / 220) % 5 === 0 ? 1 : 0; // a little bump in the road now and then
  const y0 = gy - up;
  // wheels, spokes turning
  const wheel = (x) => {
    for (let a = 0; a < 6.28; a += 0.25) P(Math.round(x + Math.cos(a) * 3.6), Math.round(gy - 4 + Math.sin(a) * 3.6), "#141016");
    for (let a = 0; a < 6.28; a += 0.35) P(Math.round(x + Math.cos(a) * 2.6), Math.round(gy - 4 + Math.sin(a) * 2.6), "#2a2630");
    const sp = -t / 90;
    for (let k = 0; k < 2; k++) { const a = sp + k * Math.PI; P(Math.round(x + Math.cos(a) * 1.6), Math.round(gy - 4 + Math.sin(a) * 1.6), "#8a8a96"); }
    P(x, gy - 4, "#c8c8d0");
  };
  wheel(bx - 9); wheel(bx + 9);
  R(bx - 10, gy, 21, 1, o.shadow);
  // front fork, headlight, mudguards
  L(bx - 9, gy - 4, bx - 6, y0 - 13, "#2a2a34");
  R(bx - 12, gy - 9, 4, 1, o.paint); R(bx + 7, y0 - 9, 6, 1, o.paint);
  R(bx - 8, y0 - 12, 2, 2, "#d8d8e0"); P(bx - 9, y0 - 12, o.night ? "#fff6c8" : "#f4eedc");
  if (o.night) { for (let k = 1; k < 6; k++) P(bx - 9 - k * 2, y0 - 12 + (k >> 1), k % 2 ? "#6a6040" : "#4a4434"); }
  // engine, exhaust, frame, tank, seat, tail light
  R(bx - 4, y0 - 7, 7, 4, "#3a3a46"); R(bx - 3, y0 - 6, 5, 2, "#4a4a58");
  R(bx + 1, gy - 4, 9, 1, "#a8a8b4"); P(bx + 10, gy - 4, "#5a5a64");
  L(bx - 6, y0 - 11, bx + 8, y0 - 9, "#2a2a34");
  R(bx - 5, y0 - 11, 6, 3, o.paint); R(bx - 4, y0 - 11, 4, 1, o.paint2);
  R(bx + 1, y0 - 10, 10, 2, "#1a1418");
  P(bx + 12, y0 - 10, o.night && Math.floor(t / 400) % 2 ? "#ff4a4a" : "#d8303a");
  // me: riding, leaning a little forward, hands on the bars
  R(bx - 1, y0 - 12, 5, 2, o.himPants); L(bx - 1, y0 - 11, bx - 2, y0 - 6, o.himPants); R(bx - 3, y0 - 6, 2, 1, "#2a2026");
  R(bx, y0 - 19, 5, 7, o.himJacket); R(bx, y0 - 19, 5, 1, o.himJacket2);
  L(bx, y0 - 17, bx - 6, y0 - 14, o.himJacket); P(bx - 6, y0 - 14, "#2a2026");
  R(bx - 6, y0 - 15, 3, 1, "#1a1a20");
  R(bx, y0 - 24, 5, 5, o.himHelmet); R(bx + 1, y0 - 25, 3, 1, o.himHelmet);
  R(bx - 1, y0 - 23, 2, 2, "#2a3040"); P(bx + 2, y0 - 24, o.shine);
  // her: behind me, arm around me, hair flying back
  R(bx + 5, y0 - 12, 5, 2, o.herPants); L(bx + 6, y0 - 11, bx + 6, y0 - 6, o.herPants); R(bx + 5, y0 - 6, 2, 1, "#2a2026");
  R(bx + 5, y0 - 18, 5, 6, o.herJacket); R(bx + 5, y0 - 18, 5, 1, o.herJacket2);
  L(bx + 5, y0 - 15, bx + 2, y0 - 15, o.herJacket); P(bx + 2, y0 - 15, SKIN);
  for (let k = 0; k < 5; k++) {
    const wv = Math.round(Math.sin(t / 150 + k * 0.9) * 0.9);
    P(bx + 10 + k, y0 - 19 + (k >> 1) + wv, HAIR); if (k < 3) P(bx + 10 + k, y0 - 18 + (k >> 1) + wv, HAIR);
  }
  R(bx + 5, y0 - 23, 5, 5, o.herHelmet); R(bx + 6, y0 - 24, 3, 1, o.herHelmet);
  R(bx + 5, y0 - 21, 5, 1, o.herStripe); R(bx + 4, y0 - 22, 1, 2, "#2a3040"); P(bx + 7, y0 - 23, o.shine);
}

Object.assign(SCENES, {

  /* 2020: night after night on video calls, each at our own computer. Split screen, camera behind us. */
  computers(ctx, t, W = 32, H = 32) {
    const { P, R } = pix(ctx);
    const HAIR = "#1a1218", SKIN = "#c98b62";
    const half = W >> 1;
    const herTalks = Math.floor(t / 3000) % 2 === 0;
    const room = (x0, w, who) => {
      ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, w, H); ctx.clip();
      const her = who === "her";
      const WALL = her ? "#4e3550" : "#2e3550", WALL2 = her ? "#5a3e5c" : "#36405e";
      R(x0, 0, w, H, WALL);
      const cx = x0 + (w >> 1), dy = H - 13;
      // window with the night outside
      const ww = Math.min(14, w - 6), wh = Math.max(8, Math.min(16, dy - 16));
      const wx = her ? x0 + 2 : x0 + w - 2 - ww, wy = 3;
      R(wx - 1, wy - 1, ww + 2, wh + 2, "#c9b8a8"); R(wx, wy, ww, wh, "#1d1838");
      for (let k = 0; k < 6; k++) {
        const sx = wx + 1 + Math.floor(rand(k + (her ? 3 : 40)) * (ww - 2)), sy = wy + 1 + Math.floor(rand(k + (her ? 9 : 50)) * (wh - 2));
        if (Math.sin(t / 500 + k * 2) > -0.4) P(sx, sy, "#fff6d8");
      }
      if (her) { R(wx + ww - 5, wy + 2, 3, 3, "#fff2c8"); P(wx + ww - 5, wy + 2, "#1d1838"); }
      R(wx + (ww >> 1), wy, 1, wh, "#c9b8a8"); R(wx, wy + (wh >> 1), ww, 1, "#c9b8a8");
      // something on the wall: her fairy lights, his clock (those night shifts)
      if (her) {
        for (let x = x0; x < x0 + w; x += 3) P(x, 1 + (x % 2), ["#ffd978", "#ff9ab8", "#fff2c8"][(Math.floor(t / 600) + x) % 3]);
      } else {
        const kx = x0 + 4, ky = wy + 3;
        for (let a = 0; a < 6.28; a += 0.4) P(Math.round(kx + Math.cos(a) * 3), Math.round(ky + Math.sin(a) * 3), "#d8d0c0");
        R(kx - 2, ky - 2, 5, 5, "#efe8da"); P(kx, ky, "#2a2a2a");
        const a = t / 2000;
        P(kx + Math.round(Math.cos(a) * 2), ky + Math.round(Math.sin(a) * 2), "#c42b3a"); P(kx, ky - 1, "#2a2a2a");
      }
      // soft glow of the screen on the wall
      for (let y = dy - 16; y < dy; y++) for (let x = cx - 11; x <= cx + 11; x++)
        if (Math.hypot((x - cx) * 0.7, y - (dy - 7)) < 8) P(x, y, WALL2);
      // desk, lamp, mug
      R(x0, dy, w, 2, "#8a5a3c"); R(x0, dy + 2, w, H - dy - 2, "#3a2830");
      const lx = her ? cx + 9 : cx - 10;
      R(lx, dy - 6, 1, 6, "#c9a063"); R(lx - 2, dy - 8, 5, 2, "#f2d08a");
      for (let k = 0; k < 3; k++) P(lx - 1 + k, dy - 5, "#f8e2a8");
      const mx = her ? cx - 10 : cx + 9;
      R(mx, dy - 3, 3, 3, her ? "#f2b8c6" : "#e9e2d0"); P(mx + 3, dy - 2, her ? "#f2b8c6" : "#e9e2d0");
      for (let k = 0; k < 3; k++) {
        const y = dy - 4 - Math.floor((t / 300 + k * 2) % 6);
        P(mx + 1 + Math.round(Math.sin(t / 400 + k)), y, "#c8b8c8");
      }
      // the monitor, showing the other one
      const mw = 14, mh = 10, sx = cx - 7, sy = dy - mh - 2;
      R(sx, sy, mw, mh, "#14141c"); R(sx + 1, sy + 1, mw - 2, mh - 2, her ? "#2c3a5a" : "#4a3050");
      R(cx - 1, dy - 2, 2, 2, "#14141c"); R(cx - 3, dy - 1, 6, 1, "#14141c");
      const fx = cx - 2, fy = sy + 2;
      const otherTalks = her ? !herTalks : herTalks;
      if (her) { // him on her screen, headphones on
        R(fx, fy, 4, 1, HAIR); R(fx, fy + 1, 4, 4, SKIN); P(fx + 1, fy + 2, "#2a1418"); P(fx + 2, fy + 2, "#2a1418");
        R(fx - 1, fy + 1, 1, 3, "#3a3a44"); R(fx + 4, fy + 1, 1, 3, "#3a3a44"); R(fx, fy - 1, 4, 1, "#3a3a44");
        R(fx - 1, fy + 5, 6, 2, "#4a6aa0");
      } else { // her on his screen
        R(fx - 1, fy, 6, 1, HAIR); R(fx - 1, fy + 1, 1, 5, HAIR); R(fx + 4, fy + 1, 1, 5, HAIR);
        R(fx, fy + 1, 4, 4, SKIN); P(fx + 1, fy + 2, "#2a1418"); P(fx + 2, fy + 2, "#2a1418"); P(fx + 1, fy + 1, "#c42b3a");
        R(fx, fy + 5, 4, 2, "#e07a9a");
      }
      P(fx + 1, fy + 4, otherTalks && Math.floor(t / 180) % 2 ? "#6a2a30" : "#a0605a");
      P(fx + 2, fy + 4, otherTalks && Math.floor(t / 180) % 2 ? "#6a2a30" : "#a0605a");
      if (otherTalks) { // little hearts drifting up out of the screen
        const k = (t % 1800) / 1800;
        P(sx + mw - 2, sy - 1 - Math.floor(k * 6), k < 0.8 ? "#ff9ab8" : WALL);
      }
      // us, from behind
      const myTalk = her ? herTalks : !herTalks;
      const hy = dy - 2 - (myTalk && Math.floor(t / 250) % 2 ? 1 : 0);
      if (her) {
        R(cx - 3, hy, 7, 6, HAIR); R(cx - 4, hy + 3, 9, 7, HAIR); P(cx + 3, hy + 1, "#ff9ab8");
        R(cx - 7, hy + 7, 15, H, "#e07a9a"); R(cx - 3, hy + 7, 7, 4, HAIR);
      } else {
        R(cx - 3, hy, 7, 6, HAIR); R(cx - 1, hy + 6, 3, 1, SKIN);
        R(cx - 4, hy - 1, 9, 1, "#3a3a44"); R(cx - 4, hy, 1, 4, "#3a3a44"); R(cx + 4, hy, 1, 4, "#3a3a44");
        R(cx - 5, hy + 2, 2, 3, "#2a2a32"); R(cx + 4, hy + 2, 2, 3, "#2a2a32");
        R(cx - 7, hy + 7, 15, H, "#4a6aa0"); R(cx - 7, hy + 7, 15, 1, "#5a7ab0");
      }
      ctx.restore();
    };
    room(0, half, "her");
    room(half, W - half, "him");
    R(half, 0, 1, H, "#140c18");
    const hy = (H >> 1) - 6, hx = half;
    const beat = Math.floor(t / 500) % 2;
    R(hx - 2, hy, 2, 1, "#ff7aa8"); R(hx + 1, hy, 2, 1, "#ff7aa8"); R(hx - 2, hy + 1, 5, 1, "#ff7aa8");
    R(hx - 1, hy + 2, 3, 1, "#ff7aa8"); P(hx, hy + 3, "#ff7aa8");
    if (beat) { P(hx - 3, hy, "#ff7aa8"); P(hx + 3, hy, "#ff7aa8"); }
  },

  /* 2021: riding up to the mountains on the bike, Kanchenjunga beyond. Side view, camera on our left. */
  rideHills(ctx, t, W = 32, H = 32) {
    const { P, R } = pix(ctx);
    const gy = H - 5, cx = W >> 1;
    const SKY = ["#9fc4e8", "#b2d0ee", "#c7ddf2", "#dfe8f2", "#f2e6dc"];
    const skyEnd = gy - 12;
    for (let y = 0; y < skyEnd; y++) R(0, y, W, 1, SKY[Math.min(4, Math.floor((y / skyEnd) * 5))]);
    // far snow peaks, barely moving (Kanchenjunga the tallest)
    const base = gy - 12, far = t / 1800;
    for (let x = 0; x < W; x++) {
      const wx = x - far;
      const h = Math.max(
        22 - Math.abs(((wx % 120) + 120) % 120 - 60) * 0.75,
        13 - Math.abs(((wx + 33) % 41 + 41) % 41 - 20) * 0.7,
        10 - Math.abs(((wx + 7) % 23 + 23) % 23 - 11) * 0.8);
      const hh = Math.max(0, Math.round(h));
      for (let k = 0; k < hh; k++) P(x, base - k, k > hh - 6 || k > 9 ? (((x + k) % 5) ? "#f4f6fb" : "#c8d2e6") : ((x % 3) ? "#8a90a8" : "#7a8098"));
    }
    // green hills with pines, sliding past
    const mid = t / 160;
    for (let x = 0; x < W; x++) {
      const wx = x - mid, h = 5 + Math.round(2.5 * Math.sin(wx / 9) + 1.5 * Math.sin(wx / 4.3));
      R(x, base - h + 3, 1, gy - 3 - (base - h + 3), "#5f7d6e");
    }
    for (let k = -1; k < W / 7 + 2; k++) {
      const wxk = k - Math.floor(mid / 7), x = Math.round(k * 7 + (mid % 7) + rand(wxk) * 4);
      if (rand(wxk + 9) < 0.35) continue;
      const s = 3 + Math.floor(rand(wxk + 3) * 3), y = base + 1;
      for (let r = 0; r < s * 2; r++) { const w = 1 + Math.floor((r / (s * 2)) * s); R(x - (w >> 1), y - s * 2 + r, w, 1, "#2e5040"); }
    }
    // the road, stones along the edge, prayer flags on poles
    const near = t / 45;
    R(0, gy - 3, W, H - gy + 3, "#5a5560"); R(0, gy - 3, W, 1, "#6a6570");
    for (let x = 0; x < W; x++) { const wx = x - near; if (((Math.floor(wx / 4) % 2) + 2) % 2 === 0) P(x, gy + 2, "#e8d070"); }
    const FLAG = ["#3a6ad0", "#f6f6f6", "#d03a3a", "#3aa05a", "#f0c040"];
    for (let k = -1; k < W / 30 + 2; k++) {
      const wk = k - Math.floor(near / 30), x = Math.round(k * 30 + (near % 30));
      R(x, gy - 14, 1, 11, "#6a5040");
      for (let f = 1; f < 14; f++) P(x + f, gy - 14 + Math.round(Math.sin((f / 14) * Math.PI) * 2), FLAG[(f + wk) % 5]);
    }
    for (let k = -1; k < W / 6 + 2; k++) { const x = Math.round(k * 6 + (near % 6)), id = k - Math.floor(near / 6); R(x, gy - 4, 2, 2, ((id % 2) + 2) % 2 ? "#e9e2d0" : "#3a3a40"); }
    bikeSide(ctx, t, cx, gy, { shadow: "#4a4650", paint: "#b8303a", paint2: "#d84a50", himPants: "#2a2a3a", himJacket: "#4a6aa0", himJacket2: "#5a7ab0", himHelmet: "#2a2a34", herPants: "#3a3a52", herJacket: "#e07a9a", herJacket2: "#f2a0b8", herHelmet: "#f2ece6", herStripe: "#e07a9a", shine: "#ffffff" });
  },

  /* 2022: a cozy evening in our living room, on the sofa, from behind. */
  livingroom(ctx, t, W = 32, H = 32) {
    const { P, R, L } = pix(ctx);
    const cx = W >> 1, floor = H - 10;
    R(0, 0, W, floor, "#5e4250");
    // the lamp's warm glow on the wall
    const lx = Math.max(4, cx - 20), ly = 10;
    for (let y = 0; y < floor; y++) for (let x = 0; x < W; x++) {
      const d = Math.hypot(x - lx, (y - ly) * 1.2);
      if (d < 7) P(x, y, "#7e5c62"); else if (d < 12) P(x, y, "#6e4e5a");
    }
    // the window: dusk turning to night over the city
    const ww = Math.min(W - 20, 30), wh = Math.max(10, Math.floor(H * 0.36)), wx = cx - (ww >> 1), wy = 5;
    const DUSK = ["#2c2850", "#4a3462", "#7a4470", "#b05a72", "#d8806e"];
    for (let y = 0; y < wh; y++) R(wx, wy + y, ww, 1, DUSK[Math.min(4, Math.floor((y / wh) * 5))]);
    R(wx + ww - 7, wy + 2, 3, 3, "#fff2c8"); P(wx + ww - 7, wy + 2, "#2c2850");
    for (let x = wx; x < wx + ww; x += 3) {
      const h = 3 + Math.floor(rand(x + 70) * (wh * 0.45));
      R(x, wy + wh - h, 3, h, "#241c34");
      for (let y = wy + wh - h + 1; y < wy + wh - 1; y += 2) if (rand(x * 3 + y) < 0.45) P(x + 1, y, Math.sin(t / 900 + x + y) > -0.7 ? "#ffd978" : "#241c34");
    }
    R(wx - 1, wy - 1, ww + 2, 1, "#e8d8c8"); R(wx - 1, wy + wh, ww + 2, 1, "#e8d8c8");
    R(wx - 1, wy, 1, wh, "#e8d8c8"); R(wx + ww, wy, 1, wh, "#e8d8c8"); R(cx, wy, 1, wh, "#e8d8c8");
    // curtains
    R(wx - 4, wy - 2, 4, wh + 5, "#c98a6a"); R(wx + ww, wy - 2, 4, wh + 5, "#c98a6a");
    for (let y = wy; y < wy + wh + 3; y += 2) { P(wx - 3, y, "#b07a5a"); P(wx + ww + 2, y, "#b07a5a"); }
    // fairy lights over the window
    for (let x = wx - 6; x < wx + ww + 6; x += 2) {
      const y = wy - 3 + Math.round(Math.sin(((x - wx) / ww) * Math.PI) * 2);
      P(x, y, (Math.floor(t / 500) + x) % 3 ? "#ffd978" : "#fff2c8");
    }
    // floor lamp on the left, a plant on the right
    R(lx, ly + 2, 1, floor - ly - 2, "#c9a063"); R(lx - 3, ly - 2, 7, 4, "#f2d08a"); R(lx - 2, ly + 2, 5, 1, "#ffe9b8");
    const px = wx + ww + 7;
    R(px - 2, floor - 5, 5, 5, "#b0603a");
    [[-3, -9], [0, -11], [3, -9], [-2, -7], [2, -7], [0, -8]].forEach(([dx, dy], k) => {
      L(px, floor - 5, px + dx + Math.round(Math.sin(t / 1500 + k) * 0.6), floor + dy, k % 2 ? "#4f8a4a" : "#3f7a40");
    });
    // a little more home on wide screens: a bookshelf and our photos
    if (W > 70) {
      const bx = 3;
      R(bx, 12, 12, floor - 12, "#4a3028");
      for (let s = 0; s < 4; s++) {
        const y = 14 + s * 6;
        if (y + 5 > floor) break;
        for (let b = 0; b < 10; b++) if (rand(b + s * 13) < 0.8) R(bx + 1 + b, y + 1 + (b % 2), 1, 4 - (b % 2), ["#c75b7a", "#c9a063", "#6a7fb0", "#e9e2d0"][(b + s) % 4]);
        R(bx, y + 5, 12, 1, "#3a2420");
      }
      for (let k = 0; k < 3; k++) {
        const fx = W - 16 + (k % 2) * 7, fy = 9 + k * 7;
        R(fx, fy, 6, 6, "#fffaf5"); R(fx + 1, fy + 1, 4, 3, ["#f2b8c6", "#9fc4e8", "#f8d29f"][k]);
      }
    }
    // floor and rug
    R(0, floor, W, H - floor, "#4a3028");
    for (let x = 0; x < W; x += 6) R(x, floor, 1, H - floor, "#42291f");
    R(cx - 18, H - 4, 36, 4, "#a0525e"); R(cx - 18, H - 4, 36, 1, "#b8687a");
    // the sofa, and the two of us leaning into each other
    const st = H - 10;
    const breathe = Math.floor(t / 1600) % 2;
    // me
    R(cx, st - 9 + breathe, 7, 9, "#1a1218"); R(cx + 1, st - 10 + breathe, 5, 1, "#1a1218");
    P(cx + 2, st - 8 + breathe, "#3e2c36"); P(cx + 3, st - 9 + breathe, "#3e2c36");
    R(cx - 2, st - 2, 11, 2, "#c98a6a");
    // her, head on my shoulder, hair falling over the sofa
    R(cx - 7, st - 7, 7, 7, "#1a1218"); R(cx - 6, st - 8, 5, 1, "#1a1218"); R(cx - 8, st - 3, 9, 4, "#1a1218");
    P(cx - 5, st - 6, "#3e2c36"); P(cx - 4, st - 7, "#3e2c36");
    P(cx - 1, st - 6, "#ff9ab8"); P(cx - 1, st - 5, "#ffd978");
    R(cx - 9, st - 1, 2, 1, "#e07a9a");
    R(cx - 16, st, 32, 8, "#8a4a5a"); R(cx - 16, st, 32, 1, "#9c5868");
    R(cx - 18, st + 2, 3, 8, "#7a3e4c"); R(cx + 15, st + 2, 3, 8, "#7a3e4c");
    for (let x = cx - 14; x < cx + 14; x += 9) R(x, st + 2, 1, 6, "#7a3e4c");
    // two mugs on the side table, steaming
    const tx = cx + 20;
    R(tx - 3, st + 1, 7, 1, "#6a4436"); R(tx, st + 2, 1, H - st - 2, "#6a4436");
    R(tx - 2, st - 2, 2, 3, "#f2b8c6"); R(tx + 1, st - 2, 2, 3, "#e9e2d0");
    for (let k = 0; k < 4; k++) {
      const y = st - 3 - Math.floor((t / 260 + k * 2) % 7);
      P(tx - 1 + (k % 2) * 3 + Math.round(Math.sin(t / 350 + k)), y, "#b89aa6");
    }
  },

  /* 2024: holding hands, watching the sun go down into the sea. Camera behind us. */
  seasunset(ctx, t, W = 32, H = 32) {
    const { P, R } = pix(ctx);
    const cx = W >> 1, hz = Math.floor(H * 0.5), shore = Math.floor(H * 0.7);
    const SKY = ["#4a3e7a", "#7a4a86", "#b05a86", "#e07a7a", "#f2a070", "#f8c878"];
    for (let y = 0; y < hz; y++) R(0, y, W, 1, SKY[Math.min(5, Math.floor((y / hz) * 6))]);
    for (let k = 0; k < 8; k++) {
      const x = Math.floor(rand(k + 500) * W), y = Math.floor(rand(k + 520) * hz * 0.35);
      if (Math.sin(t / 600 + k) > 0) P(x, y, "#f6e8f0");
    }
    // the sun, half into the sea
    for (let y = hz - 7; y < hz; y++) for (let x = cx - 7; x <= cx + 7; x++) {
      const d = Math.hypot(x - cx, y - hz);
      if (d < 4.5) P(x, y, "#fff2d0"); else if (d < 6.5) P(x, y, "#ffd890");
    }
    // a few birds heading home
    for (let k = 0; k < 3; k++) {
      const bx = Math.floor((t / 120 + k * 17) % (W + 20)) - 10, by = 6 + k * 3 + Math.round(Math.sin(t / 400 + k));
      const f = Math.floor(t / 250 + k) % 2;
      P(bx, by + f, "#3a2440"); P(bx + 1, by, "#3a2440"); P(bx + 2, by + f, "#3a2440");
    }
    // the sea, with a golden path on the water
    const SEA = ["#5a4a8a", "#4a4a86", "#3e4a80"];
    for (let y = hz; y < shore; y++) R(0, y, W, 1, SEA[Math.min(2, Math.floor(((y - hz) / (shore - hz)) * 3))]);
    for (let y = hz; y < shore; y++) {
      const k = (y - hz) / (shore - hz), half = 2 + k * 6;
      for (let x = Math.round(cx - half); x <= cx + half; x++)
        if (rand(x * 7 + y * 13 + Math.floor(t / 300)) < 0.35) P(x, y, rand(x + y) < 0.5 ? "#ffd890" : "#f2a070");
    }
    // a little boat far out
    const bx = Math.floor((t / 400) % (W + 10)) - 5;
    R(bx, hz - 1, 4, 1, "#2a1e3a"); R(bx + 1, hz - 3, 1, 2, "#2a1e3a");
    // waves washing in
    const wv = Math.round(Math.sin(t / 900) * 1.5);
    R(0, shore, W, H - shore, "#d8a088");
    for (let x = 0; x < W; x++) {
      const y = shore + wv + Math.round(Math.sin(x / 3 + t / 500) * 0.6);
      P(x, y, "#f6efe6"); P(x, y - 1, "#9a8ab8");
      P(x, y + 1, "#c8968a");
    }
    for (let y = shore + 3; y < H; y++) for (let x = 0; x < W; x++) if (rand(x * 5 + y * 17) < 0.05) P(x, y, "#c88e7e");
    // the two of us, holding hands, long shadows toward the camera
    const fy = H - 3, hx = cx - 4, mx = cx + 3, HAIR = "#1a1218", SKIN = "#c98b62";
    for (let k = 1; k < H - fy + 3; k++) { R(hx - 1, fy + k, 3, 1, "#b07a72"); R(mx, fy + k, 4, 1, "#b07a72"); }
    // her: teal dress, hair moving in the breeze
    const wind = Math.floor(t / 350) % 2;
    R(hx - 2, fy - 18, 5, 5, HAIR); R(hx - 2, fy - 13, 5, 4, HAIR); P(hx - 3 - wind, fy - 12, HAIR); P(hx - 3, fy - 11 - wind, HAIR);
    R(hx - 2, fy - 9, 5, 2, "#3aa0a0"); R(hx - 3, fy - 7, 7, 6, "#3aa0a0"); R(hx - 3, fy - 2, 7, 1, "#2a8888");
    P(hx + 3, fy - 4, "#f2a070");
    R(hx - 1, fy - 1, 1, 2, SKIN); R(hx + 1, fy - 1, 1, 2, SKIN);
    R(hx - 3, fy - 9, 1, 4, SKIN);
    // him
    R(mx, fy - 21, 5, 5, HAIR); R(mx + 1, fy - 16, 3, 1, SKIN);
    R(mx - 1, fy - 15, 7, 8, "#f2ece0"); R(mx - 1, fy - 15, 1, 8, "#f8c878");
    R(mx, fy - 7, 2, 8, "#c9b49a"); R(mx + 3, fy - 7, 2, 8, "#c9b49a");
    R(mx + 6, fy - 15, 1, 6, SKIN);
    // hands held between us
    R(hx + 3, fy - 9, mx - hx - 3, 1, SKIN); R(mx - 1, fy - 10, 1, 1, SKIN);
    // and a tiny heart, now and then
    const hp = (t % 4000) / 4000;
    if (hp < 0.6) { const y = fy - 12 - Math.floor(hp * 14); P(cx, y, "#ff9ab8"); P(cx - 1, y - 1, "#ff9ab8"); P(cx + 1, y - 1, "#ff9ab8"); }
  },

  /* 2025: riding home through the city at night on the bike, both of us with new jobs. Side view, camera on our left. */
  rideCity(ctx, t, W = 32, H = 32) {
    const { P, R } = pix(ctx);
    const gy = H - 5, cx = W >> 1;
    for (let y = 0; y < gy; y++) R(0, y, W, 1, y < gy * 0.4 ? "#141030" : "#1e1638");
    for (let k = 0; k < 10; k++) { const x = Math.floor(rand(k + 700) * W), y = Math.floor(rand(k + 710) * gy * 0.3); if (Math.sin(t / 700 + k) > 0) P(x, y, "#c8c0e0"); }
    // far skyline, slowly sliding
    const far = t / 900;
    for (let x = 0; x < W; x++) {
      const wx = Math.floor(x - far), col = Math.floor(wx / 5), h = 10 + Math.floor(rand(col + 900) * (gy * 0.55));
      R(x, gy - 6 - h, 1, h, "#1c1630");
      const lx = ((wx % 5) + 5) % 5;
      for (let y = gy - 6 - h + 2; y < gy - 7; y += 2) if (lx % 2 && rand(col * 31 + y) < 0.45) P(x, y, Math.sin(t / 1400 + col + y) > -0.8 ? "#ffd978" : "#1c1630");
    }
    // nearer shops and signs
    const mid = t / 220;
    for (let x = 0; x < W; x++) {
      const wx = Math.floor(x - mid), col = Math.floor(wx / 9), h = 6 + Math.floor(rand(col + 400) * 7);
      R(x, gy - 4 - h, 1, h + 1, col % 2 ? "#2a2040" : "#30244a");
      const lx = ((wx % 9) + 9) % 9;
      if (lx >= 2 && lx <= 6 && rand(col + 41) < 0.7) P(x, gy - 6, "#f8d890");
      if (lx >= 1 && lx <= 7 && rand(col + 77) < 0.5) P(x, gy - 4 - h + 1, Math.floor(t / 500 + col) % 3 ? ["#ff6aa8", "#3ad0e0", "#ffb040"][col % 3 < 0 ? 0 : col % 3] : "#2a2040");
    }
    // an auto-rickshaw puttering along in the far lane
    const ax = Math.floor((t / 70) % (W + 40)) - 20, ay = gy - 4;
    R(ax, ay - 5, 7, 4, "#e8c030"); R(ax, ay - 6, 7, 1, "#2a6a3a"); R(ax + 1, ay - 4, 2, 2, "#2a2a30");
    P(ax + 1, ay - 1, "#141016"); P(ax + 6, ay - 1, "#141016"); P(ax + 7, ay - 3, "#ff3a3a");
    // the road and streetlights rushing by
    const near = t / 45;
    R(0, gy - 3, W, H - gy + 3, "#24202c"); R(0, gy - 3, W, 1, "#34303e");
    for (let x = 0; x < W; x++) { const wx = x - near; if (((Math.floor(wx / 5) % 2) + 2) % 2 === 0) P(x, gy + 2, "#c8c0a0"); }
    for (let k = -1; k < W / 26 + 2; k++) {
      const x = Math.round(k * 26 + (near % 26));
      R(x, gy - 22, 1, 19, "#3a3446"); R(x - 3, gy - 22, 3, 1, "#3a3446"); P(x - 3, gy - 21, "#ffe2a8");
      for (let y = gy - 20; y < gy - 3; y += 2) P(x - 3 + ((y >> 1) % 2), y, "#2c2638");
    }
    bikeSide(ctx, t, cx, gy, { shadow: "#16121c", paint: "#3a3a4a", paint2: "#4a4a5e", himPants: "#22222e", himJacket: "#3a3a4a", himJacket2: "#4a4a5c", himHelmet: "#1a1a22", herPants: "#2a2a3a", herJacket: "#d89a40", herJacket2: "#e8b060", herHelmet: "#e9e2d0", herStripe: "#c75b7a", shine: "#8a8a9a", night: true });
  },

  /* 2026: shopping for his topor and her mukut. Camera behind us. */
  toporshop(ctx, t, W = 32, H = 32) {
    const { P, R } = pix(ctx);
    const cx = W >> 1, HAIR = "#1a1218", SKIN = "#c98b62";
    const WHITE = "#f8f4ea", SHADE = "#e2dccc", GOLD = "#e0a63a", RED = "#c42b3a";
    R(0, 0, W, H, "#7a2a34");
    for (let x = 0; x < W; x += 2) R(x, 0, 1, H, "#842e3a");
    // marigold garlands hanging down
    for (let x = 2; x < W; x += 9) {
      const len = 8 + Math.floor(rand(x) * 6);
      for (let y = 0; y < len; y++) P(x + (y % 2 && Math.sin(t / 700 + x) > 0 ? 1 : 0), y, y % 3 ? "#ff9a1a" : "#ffd23a");
    }
    // shelves full of topors and mukuts
    const topor = (x, y, s) => {
      const n = Math.round(5 * s);
      for (let r = 0; r < n; r++) { const w = 1 + 2 * Math.floor((r / n) * 1.7 * s); R(x - (w >> 1), y - n + r, w, 1, r % 3 ? WHITE : SHADE); }
      R(x - Math.round(1.5 * s), y, Math.round(3 * s) + 1, 1, GOLD); P(x, y - n - 1, GOLD);
    };
    const mukut = (x, y) => {
      R(x - 3, y - 1, 7, 2, WHITE); P(x - 3, y - 2, WHITE); P(x, y - 3, WHITE); P(x, y - 2, WHITE); P(x + 3, y - 2, WHITE);
      P(x, y - 1, RED); P(x - 2, y, GOLD); P(x + 2, y, GOLD);
    };
    const shelfTop = 10, gap = 9;
    for (let s = 0; shelfTop + s * gap < H - 16; s++) {
      const y = shelfTop + s * gap;
      R(0, y, W, 1, "#4a2a20"); R(0, y + 1, W, 1, "#3a1e18");
      for (let x = 3 + (s % 2) * 4, k = 0; x < W - 2; x += 8, k++) {
        if ((k + s) % 2) topor(x, y - 1, 1); else mukut(x, y - 1);
        if (Math.sin(t / 400 + x * 3 + s) > 0.93) P(x, y - 4, "#ffffff");
      }
    }
    // the counter, and the shop-kaku holding up one more mukut
    const ct = H - 15;
    R(cx - 3, ct - 9, 5, 1, "#cfcfcf"); R(cx - 3, ct - 8, 5, 4, "#b47a50"); P(cx - 2, ct - 7, "#2a1418"); P(cx, ct - 7, "#2a1418");
    R(cx - 5, ct - 4, 9, 4, "#e9e2d0");
    const lift = Math.floor(t / 900) % 2;
    mukut(cx + 7, ct - 5 - lift); P(cx + 4, ct - 4 - lift, "#b47a50");
    R(0, ct, W, H - ct, "#5a3424"); R(0, ct, W, 1, "#c9a063");
    for (let x = 2; x < W; x += 12) { R(x, ct + 2, 9, 4, "#8ab0b8"); topor(x + 4, ct + 5, 0.6); }
    // the two of us from behind: him in a topor, her holding a mukut to her head
    const by = H - 14, mx = cx + 8, hx = cx - 8;
    const sway = Math.round(Math.sin(t / 900) * 0.6);
    // him, wearing a topor
    R(mx - 4, by, 9, 9, HAIR); R(mx - 3, by + 9, 7, 1, SKIN);
    topor(mx + sway, by, 3);
    R(mx - 9, by + 10, 19, H, "#4a6aa0"); R(mx - 9, by + 10, 19, 1, "#5a7ab0");
    // her, holding a mukut up to her head
    R(hx - 4, by + 1, 9, 9, HAIR); R(hx - 5, by + 5, 11, 8, HAIR);
    const mk = (x, y) => {
      R(x - 5, y - 1, 11, 2, WHITE); R(x - 5, y, 11, 1, SHADE);
      [-5, -2, 0, 2, 5].forEach((d, k) => { R(x + d, y - 2 - (k === 2 ? 2 : k % 2), 1, 2 + (k === 2 ? 2 : k % 2), WHITE); });
      P(x, y - 1, RED); P(x - 3, y, GOLD); P(x + 3, y, GOLD);
    };
    mk(hx, by + 1);
    if (Math.floor(t / 500) % 3 === 0) P(hx, by - 4, "#ffffff");
    R(hx - 7, by - 1, 1, 4, SKIN); R(hx + 7, by - 1, 1, 4, SKIN);
    R(hx - 7, by + 3, 1, 8, "#e8a040"); R(hx + 7, by + 3, 1, 8, "#e8a040");
    R(hx - 9, by + 12, 19, H, "#e8a040"); R(hx - 9, by + 12, 4, H, RED);
  },

  /* 2024 Durga Puja proposal, widened: the 32x32 picture in the middle of a bigger pandal. */
  proposalWide(ctx, t, W = 32, H = 32) {
    const { P, R } = pix(ctx);
    const ox = Math.floor((W - 32) / 2), oy = Math.floor((H - 32) * 0.6);
    R(0, 0, W, H, "#241022"); R(0, oy + 21, W, H - oy - 21, "#3b1a2b");
    for (let x = 0; x < W; x += 4) P(x + (Math.floor(t / 4000) % 2), oy + 24 + (x % 3) * 3, "#4a2234");
    const LC = ["#ff7aa8", "#ffd978", "#7ce8ff", "#ffffff"];
    for (let y = 0; y <= oy; y += 5) for (let x = ((y / 5) % 2) * 2; x < W; x += 4) P(x, y + 1, LC[(Math.floor(t / 450) + x + y) % 4]);
    for (let x = 1; x < W; x += 3) { P(x, oy + 1 + (x % 2), "#6b4a3a"); P(x, oy + 2 + (x % 2), LC[(Math.floor(t / 450) + x) % 4]); }
    // pillars wrapped in marigolds, with brass lamps, on the sides
    for (const side of [-1, 1]) for (let n = 0; n < 4; n++) {
      const x = ox + 16 + side * (22 + n * 12);
      if (x < -2 || x > W + 2) continue;
      R(x - 1, oy - 4, 3, 26 + 4, "#6e1a2c");
      for (let y = oy - 4; y < oy + 22; y++) P(x + ((y >> 1) % 2 ? 1 : -1), y, y % 3 ? "#ff9a1a" : "#ffd23a");
      R(x - 2, oy + 21, 5, 2, "#c8742a");
      P(x, oy + 20, Math.floor(t / 180 + x) % 2 ? "#ffd978" : "#ff9a3a");
    }
    ctx.save(); ctx.translate(ox, oy); SCENES.proposal(ctx, t); ctx.restore();
  }
});

// scenes that can fill a whole screen (they take W, H)
["computers", "rideHills", "livingroom", "seasunset", "rideCity", "toporshop", "proposalWide"].forEach(n => { SCENES[n].fullscreen = true; });

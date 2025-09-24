var G = Object.defineProperty;
var b = (r, t, e) => t in r ? G(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var l = (r, t, e) => b(r, typeof t != "symbol" ? t + "" : t, e);
import { D as u, a as H, b as h } from "./index-RLq3mcif.js";
const n = {
  and(...r) {
    return r.reduce((t, e) => t & e, 4294967295) >>> 0;
  },
  or(...r) {
    return r.reduce((t, e) => t | e, 0) >>> 0;
  },
  xor(r, t) {
    return (r ^ t) >>> 0;
  },
  not(r) {
    return ~r >>> 0;
  },
  rotLeft(r, t) {
    const e = t & 31;
    return (r << e | r >>> 32 - e) >>> 0;
  },
  rotRight(r, t) {
    const e = t & 31;
    return (r >>> e | r << 32 - e) >>> 0;
  },
  cardinality(r) {
    let t = r;
    return t = t - (t >>> 1 & 1431655765), t = (t & 858993459) + (t >>> 2 & 858993459), (t + (t >>> 4) & 252645135) * 16843009 >>> 24;
  },
  decompose(r) {
    const t = [];
    let e = r;
    for (let i = 1; e; i <<= 1)
      e & i && (t.push(i >>> 0), e ^= i);
    return t;
  }
};
function M(r, t) {
  return r.origin === t.origin && r.destination === t.destination && r.captures === t.captures;
}
function C(r) {
  const t = Math.floor(Math.sqrt(r.length)), e = "-".repeat(1 + t * 4);
  let i = `${e}
`;
  for (const [o, s] of r.entries()) {
    if (o % t === 0 && (i += "|"), s.piece) {
      let c = s.piece.player === u.LIGHT ? "x" : "o";
      c = s.piece.king ? c.toUpperCase() : c, i += ` ${c} |`;
    } else
      i += "   |";
    o % t === t - 1 && (i += ` 
${e}
`);
  }
  return i;
}
class B {
  constructor(t, e, i) {
    l(this, "engine");
    l(this, "history");
    l(this, "_board");
    l(this, "_moves");
    l(this, "adapter");
    this.engine = t, this.history = e, this.adapter = i;
  }
  /**
   * Get the status of the game
   */
  get status() {
    return this.engine.status;
  }
  /**
   * Get the current player to move
   */
  get player() {
    return this.engine.data.player;
  }
  /**
   * Get the 1D array representation of the current board
   */
  get board() {
    return this._board ?? (this._board = this.adapter.toBoard1D(this.engine.data.board));
  }
  /**
   * Get the available moves in 1D representation
   */
  get moves() {
    return this._moves ?? (this._moves = this.engine.moves.map(
      (t) => this.adapter.toMove1D(t)
    ));
  }
  /**
   * Check if a move is valid
   * @param move The move to check in 1D representation
   * @returns True if the move is valid, false otherwise.
   */
  isValidMove(t) {
    const e = this.adapter.toEngineMove(t);
    return this.engine.isValidMove(e);
  }
  /**
   * Make a move using the 1D representation of a move
   * @param move The move to make in 1D representation
   */
  move(t) {
    if (!this.isValidMove(t))
      throw new Error(`invalid move: ${JSON.stringify(t)}`);
    this.history.boards.push(this.board), this.history.moves.push(t);
    const e = this.adapter.toEngineMove(t);
    this.engine.move(e), this._board = void 0, this._moves = void 0;
  }
  asciiBoard() {
    return C(this.board);
  }
}
const S = 32, a = [];
a[0] = 1;
for (let r = 1; r < S; r++)
  a[r] = a[r - 1] * 2;
const f = a[18] | a[12] | a[6] | a[0], x = a[19] | a[13] | a[7] | a[1], U = a[26] | a[20] | a[14] | a[8];
a[27] | a[21] | a[15] | a[9];
a[2] | a[28] | a[22] | a[16];
const J = a[3] | a[29] | a[23] | a[17], P = a[10] | a[4] | a[30] | a[24], g = a[11] | a[5] | a[31] | a[25], D = a[18] | a[26] | a[2] | a[10], E = a[1] | a[9] | a[17] | a[25], V = ~(g | D), $ = ~(g | E), Y = ~(f | D), q = ~(f | E), j = f | x | U, z = J | P | g, Q = a[21] | a[28] | a[22], X = a[29] | a[22] | a[21] | a[14], d = {
  RANK_0: f,
  RANK_7: g,
  FORWARD_LEFT: V,
  FORWARD_RIGHT: $,
  BACKWARD_LEFT: Y,
  BACKWARD_RIGHT: q,
  LIGHT_START: j,
  DARK_START: z,
  MIDDLE_FOUR_RANK_TWO_FILE: X,
  MIDDLE_TWO_RANK_FOUR_FILE: Q
};
class I {
  constructor(t) {
    l(this, "intermediates");
    this.intermediates = t;
  }
  getJumpers() {
    let t = n.and(
      n.rotRight(this.intermediates.empty, 7),
      n.and(this.intermediates.opponent, d.FORWARD_LEFT)
    ), e = n.and(
      n.rotRight(t, 7),
      n.and(this.intermediates.forward, d.FORWARD_LEFT)
    );
    return t = n.and(
      n.rotRight(this.intermediates.empty, 1),
      n.and(this.intermediates.opponent, d.FORWARD_RIGHT)
    ), e = n.or(
      e,
      n.and(
        n.rotRight(t, 1),
        n.and(this.intermediates.forward, d.FORWARD_RIGHT)
      )
    ), t = n.and(
      n.rotLeft(this.intermediates.empty, 1),
      n.and(this.intermediates.opponent, d.BACKWARD_LEFT)
    ), e = n.or(
      e,
      n.and(
        n.rotLeft(t, 1),
        n.and(this.intermediates.backward, d.BACKWARD_LEFT)
      )
    ), t = n.and(
      n.rotLeft(this.intermediates.empty, 7),
      n.and(this.intermediates.opponent, d.BACKWARD_RIGHT)
    ), e = n.or(
      e,
      n.and(
        n.rotLeft(t, 7),
        n.and(this.intermediates.backward, d.BACKWARD_RIGHT)
      )
    ), e;
  }
  getMovers() {
    let t = 0;
    return this.intermediates.forward && (t = n.or(
      t,
      n.and(
        n.and(
          n.rotRight(this.intermediates.empty, 7),
          this.intermediates.forward
        ),
        d.FORWARD_LEFT
      )
    ), t = n.or(
      t,
      n.and(
        n.and(
          n.rotRight(this.intermediates.empty, 1),
          this.intermediates.forward
        ),
        d.FORWARD_RIGHT
      )
    )), this.intermediates.backward && (t = n.or(
      t,
      n.and(
        n.and(
          n.rotLeft(this.intermediates.empty, 1),
          this.intermediates.backward
        ),
        d.BACKWARD_LEFT
      )
    ), t = n.or(
      t,
      n.and(
        n.and(
          n.rotLeft(this.intermediates.empty, 7),
          this.intermediates.backward
        ),
        d.BACKWARD_RIGHT
      )
    )), t;
  }
  getMovesFromOrigin(t) {
    const e = [];
    if (n.and(t, this.intermediates.forward)) {
      const i = n.and(
        n.rotLeft(n.and(t, d.FORWARD_LEFT), 7),
        this.intermediates.empty
      );
      i && e.push({ origin: t, destination: i, captures: 0 });
      const o = n.and(
        n.rotLeft(n.and(t, d.FORWARD_RIGHT), 1),
        this.intermediates.empty
      );
      o && e.push({ origin: t, destination: o, captures: 0 });
    }
    if (n.and(t, this.intermediates.backward)) {
      const i = n.and(
        n.rotRight(
          n.and(t, d.BACKWARD_LEFT),
          1
        ),
        this.intermediates.empty
      );
      i && e.push({ origin: t, destination: i, captures: 0 });
      const o = n.and(
        n.rotRight(
          n.and(t, d.BACKWARD_RIGHT),
          7
        ),
        this.intermediates.empty
      );
      o && e.push({ origin: t, destination: o, captures: 0 });
    }
    return e;
  }
  getJumpsFromOrigin(t) {
    const e = this.getSingleJumpFromOrigin(t), i = [];
    for (; e.length > 0; ) {
      const o = e.pop();
      if (o === void 0) break;
      const c = this.applyUnfinishedCapture({
        ...o,
        origin: t
      }).getSingleJumpFromOrigin(
        o.destination
      );
      for (const p of c)
        e.push({
          origin: t,
          destination: p.destination,
          captures: n.or(o.captures, p.captures)
        });
      c.length === 0 && i.push(o);
    }
    return i;
  }
  getSingleJumpFromOrigin(t) {
    const e = [];
    if (n.and(t, this.intermediates.forward)) {
      const i = n.and(
        n.rotLeft(n.and(t, d.FORWARD_LEFT), 7),
        this.intermediates.opponent
      ), o = n.and(
        n.rotLeft(n.and(i, d.FORWARD_LEFT), 7),
        this.intermediates.empty
      );
      o && e.push({ origin: t, destination: o, captures: i });
      const s = n.and(
        n.rotLeft(n.and(t, d.FORWARD_RIGHT), 1),
        this.intermediates.opponent
      ), c = n.and(
        n.rotLeft(n.and(s, d.FORWARD_RIGHT), 1),
        this.intermediates.empty
      );
      c && e.push({ origin: t, destination: c, captures: s });
    }
    if (n.and(t, this.intermediates.backward)) {
      const i = n.and(
        n.rotRight(
          n.and(t, d.BACKWARD_LEFT),
          1
        ),
        this.intermediates.opponent
      ), o = n.and(
        n.rotRight(n.and(i, d.BACKWARD_LEFT), 1),
        this.intermediates.empty
      );
      o && e.push({ origin: t, destination: o, captures: i });
      const s = n.and(
        n.rotRight(
          n.and(t, d.BACKWARD_RIGHT),
          7
        ),
        this.intermediates.opponent
      ), c = n.and(
        n.rotRight(n.and(s, d.BACKWARD_RIGHT), 7),
        this.intermediates.empty
      );
      c && e.push({ origin: t, destination: c, captures: s });
    }
    return e;
  }
  applyUnfinishedCapture(t) {
    return new I({
      forward: n.and(this.intermediates.forward, t.origin) ? n.or(this.intermediates.forward, t.destination) : this.intermediates.forward,
      backward: n.and(this.intermediates.backward, t.origin) ? n.or(this.intermediates.backward, t.destination) : this.intermediates.backward,
      opponent: n.and(
        this.intermediates.opponent,
        n.not(t.captures)
      ),
      empty: this.intermediates.empty
    });
  }
}
const Z = {
  fromEngine(r) {
    const { player: t, board: e } = r.data;
    return new I({
      forward: t === u.LIGHT ? e.light : n.and(e.dark, e.king),
      backward: t === u.LIGHT ? n.and(e.light, e.king) : e.dark,
      opponent: t === u.LIGHT ? e.dark : e.light,
      empty: n.not(n.or(e.light, e.dark))
    });
  }
}, tt = {
  player: u.DARK,
  board: {
    light: d.LIGHT_START,
    dark: d.DARK_START,
    king: 0
  },
  stats: {
    sinceCapture: 0,
    sinceNonKingAdvance: 0
  }
}, nt = {
  status(r) {
    return r.moves.length === 0 ? r.data.player === u.LIGHT ? h.DARK_WON : h.LIGHT_WON : r.data.stats.sinceCapture >= 40 && r.data.stats.sinceNonKingAdvance >= 40 ? h.DRAW : h.PLAYING;
  },
  isValidMove(r, t) {
    return r.moves.some((e) => M(t, e));
  },
  moves(r) {
    const t = Z.fromEngine(r), e = [], i = t.getJumpers();
    if (i) {
      for (const s of n.decompose(i))
        e.push(...t.getJumpsFromOrigin(s));
      return e;
    }
    const o = t.getMovers();
    for (const s of n.decompose(o))
      e.push(...t.getMovesFromOrigin(s));
    return e;
  },
  move(r, t) {
    if (!r.isValidMove(t))
      throw new Error(`invalid move: ${JSON.stringify(t)}`);
    const e = {
      ...r.data.board
    }, i = { ...r.data.stats }, o = n.and(t.origin, r.data.board.king), s = n.not(
      n.or(t.origin, t.captures)
    );
    return e.light = n.and(e.light, s), e.dark = n.and(e.dark, s), e.king = n.and(e.king, s), n.and(t.origin, r.data.board.light) ? e.light = n.or(e.light, t.destination) : e.dark = n.or(e.dark, t.destination), o && (e.king = n.or(e.king, t.destination)), e.king = n.or(
      e.king,
      n.and(
        t.destination,
        n.or(d.RANK_0, d.RANK_7)
      )
    ), n.and(t.destination, r.data.board.king) ? (e.king = n.or(e.king, t.destination), i.sinceNonKingAdvance = 0) : i.sinceNonKingAdvance += 1, t.captures ? i.sinceCapture = 0 : i.sinceCapture += 1, {
      player: r.data.player === u.LIGHT ? u.DARK : u.LIGHT,
      board: e,
      stats: i
    };
  }
}, et = {
  /**
   * Set up an English Draughts engine with optional data
   * @param data Optional data for the engine
   * @returns An English Draughts engine instance
   */
  setup(r) {
    return new H(
      { ...tt, ...r },
      nt
    );
  }
}, R = [
  a[11],
  a[5],
  a[31],
  a[25],
  a[10],
  a[4],
  a[30],
  a[24],
  a[3],
  a[29],
  a[23],
  a[17],
  a[2],
  a[28],
  a[22],
  a[16],
  a[27],
  a[21],
  a[15],
  a[9],
  a[26],
  a[20],
  a[14],
  a[8],
  a[19],
  a[13],
  a[7],
  a[1],
  a[18],
  a[12],
  a[6],
  a[0]
], _ = new Map(
  R.map((r, t) => [r, t])
), A = {
  toMove1D(r) {
    const t = _.get(r.origin);
    if (t === void 0)
      throw new Error(`invalid move origin: ${r.origin}`);
    const e = _.get(r.destination);
    if (e === void 0)
      throw new Error(`invalid move destination: ${r.destination}`);
    const i = [];
    for (const o of n.decompose(r.captures)) {
      const s = _.get(o);
      s !== void 0 && i.push(s);
    }
    return { origin: t, destination: e, captures: i };
  },
  toEngineMove(r) {
    const t = R[r.origin];
    if (t === void 0)
      throw new Error(`invalid move origin: ${r.origin}`);
    const e = R[r.destination];
    if (e === void 0)
      throw new Error(`invalid move destination: ${r.destination}`);
    let i = 0;
    for (const o of r.captures) {
      const s = R[o];
      if (s === void 0)
        throw new Error(`invalid move capture: ${o}`);
      i |= s;
    }
    return { origin: t, destination: e, captures: i };
  },
  toBoard1D(r) {
    const t = [];
    for (const [e, i] of R.entries()) {
      Math.floor(e / 4) % 2 === 0 && t.push({ dark: !1, piece: void 0, position: void 0 });
      const o = !!(i & r.light), s = !!(i & r.dark), c = !!(i & r.king);
      t.push({
        dark: !0,
        position: e,
        piece: o || s ? {
          player: o ? u.LIGHT : u.DARK,
          king: c
        } : void 0
      }), Math.floor(e / 4) % 2 !== 0 && t.push({ dark: !1, piece: void 0, position: void 0 });
    }
    return t;
  }
}, rt = {
  moves: [],
  boards: []
}, ft = {
  /**
   * Sets up a new English Draughts game
   * @param data Optional data to initialize the game engine
   * @param history Optional history to initialize the game
   * @returns The new English Draughts game
   */
  setup(r, t) {
    const e = et.setup(r);
    return new B(
      e,
      { ...rt, ...t },
      A
    );
  }
}, T = {
  setup({
    adapter: r,
    strategy: t,
    options: e
  }) {
    return async (i) => {
      const o = await t({
        options: e,
        engine: i.engine
      });
      return r.toMove1D(o);
    };
  }
};
async function at({
  options: { maxDepth: r, evaluationFunction: t, quiescence: e = !0 },
  engine: i
}) {
  let o = Number.NEGATIVE_INFINITY, s;
  for (const c of i.moves) {
    const p = i.clone();
    p.move(c);
    const m = -await y({
      data: {
        engine: p,
        alpha: Number.NEGATIVE_INFINITY,
        beta: Number.POSITIVE_INFINITY,
        depth: r - 1
      },
      options: { evaluationFunction: t, quiescence: e }
    });
    m >= o && (o = m, s = c);
  }
  if (s === void 0)
    throw new Error("no available moves");
  return s;
}
async function y({
  data: { engine: r, alpha: t, beta: e, depth: i },
  options: { evaluationFunction: o, quiescence: s }
}) {
  if (i === 0)
    return s ? F({
      data: { engine: r, alpha: t, beta: e },
      options: { evaluationFunction: o }
    }) : o(r);
  for (const c of r.moves) {
    const p = r.clone();
    p.move(c);
    const m = -await y({
      data: {
        engine: p,
        alpha: -e,
        beta: -t,
        depth: i - 1
      },
      options: { evaluationFunction: o, quiescence: s }
    });
    if (m >= e) return e;
    t = Math.max(m, t);
  }
  return t;
}
async function F({
  data: { engine: r, alpha: t, beta: e },
  options: { evaluationFunction: i }
}) {
  const o = i(r);
  if (o >= e) return e;
  t = Math.max(o, t);
  for (const s of r.moves) {
    if (!s.captures) continue;
    const c = r.clone();
    c.move(s);
    const p = -await F({
      data: { engine: c, alpha: -e, beta: -t },
      options: { evaluationFunction: i }
    });
    if (p >= e) return e;
    t = Math.max(p, t);
  }
  return t;
}
async function it({
  engine: r
}) {
  if (r.moves.length === 0) throw new Error("no valid moves");
  const t = Math.floor(Math.random() * r.moves.length);
  return r.moves[t];
}
const ot = {
  [h.LIGHT_WON]: u.LIGHT,
  [h.DARK_WON]: u.DARK
}, st = (r) => {
  const t = r.status;
  return t !== h.PLAYING ? t === h.DRAW ? Number.NEGATIVE_INFINITY : r.data.player === ot[t] ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : mt(r);
}, dt = 50, ct = 77, ut = 40, pt = 25, ht = 5;
function mt(r) {
  const t = r.data.player === u.LIGHT ? r.data.board.light : r.data.board.dark, e = r.data.player === u.LIGHT ? r.data.board.dark : r.data.board.light, i = t & r.data.board.king, o = e & r.data.board.king, s = r.data.player === u.LIGHT ? d.RANK_0 : d.RANK_7, c = r.data.player === u.LIGHT ? d.RANK_7 : d.RANK_0, p = n.cardinality(t), m = n.cardinality(e), v = n.cardinality(i), L = n.cardinality(o), w = n.cardinality(t & s), k = n.cardinality(
    e & c
  ), N = n.cardinality(
    t & d.MIDDLE_TWO_RANK_FOUR_FILE
  ), K = n.cardinality(
    e & d.MIDDLE_TWO_RANK_FOUR_FILE
  ), O = n.cardinality(
    t & d.MIDDLE_FOUR_RANK_TWO_FILE
  ), W = n.cardinality(
    e & d.MIDDLE_FOUR_RANK_TWO_FILE
  );
  return (p - m) * dt + (v - L) * ct + (w - k) * ut + (N - K) * pt + (O - W) * ht;
}
const gt = {
  /**
   * Creates a computer opponent with a random strategy
   * @returns {EnglishDraughtsComputer} - A computer opponent with a random strategy
   */
  random() {
    return T.setup({
      adapter: A,
      strategy: it,
      options: void 0
    });
  },
  /**
   * Creates a computer opponent with an alpha-beta pruning strategy
   * @param {Partial<AlphaBetaOptions<number>>} options - Options for the alpha-beta pruning strategy
   * @returns {EnglishDraughtsComputer} - A computer opponent with an alpha-beta pruning strategy
   */
  alphaBeta(r) {
    const t = {
      maxDepth: r.maxDepth ?? 4,
      quiescence: r.quiescence ?? !0,
      evaluationFunction: r.evaluationFunction ?? st
    };
    return T.setup({
      adapter: A,
      strategy: at,
      options: t
    });
  }
};
export {
  ft as EnglishDraughts,
  a as EnglishDraughtsBitSquare,
  gt as EnglishDraughtsComputerFactory,
  et as EnglishDraughtsEngineFactory
};
//# sourceMappingURL=english.js.map

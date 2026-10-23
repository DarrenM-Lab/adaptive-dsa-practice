import { PATTERNS, PROBLEMS } from './problems.js';
export const STORAGE_KEY = 'adaptive-dsa-practice-v1';
export function initialState() {
  const weights = {}, difficulty = {}, streak = {}, seen = {};
  for (const pattern of PATTERNS) { weights[pattern] = 1; difficulty[pattern] = 0; streak[pattern] = 0; seen[pattern] = []; }
  return { weights, difficulty, streak, seen, log: [], current: null, lastPattern: null };
}
export function availableTiers(pattern) { return ['medium', 'hard'].filter(t => PROBLEMS[pattern].some(p => p.tier === t)); }
export function weightedPick(state, random = Math.random) {
  const pool = PATTERNS.filter(p => p !== state.lastPattern);
  const total = pool.reduce((sum, p) => sum + state.weights[p], 0);
  let target = random() * total;
  for (const pattern of pool) { target -= state.weights[pattern]; if (target <= 0) return pattern; }
  return pool.at(-1);
}
export function pickProblem(state, pattern, random = Math.random) {
  const tiers = availableTiers(pattern);
  const tier = tiers[Math.min(state.difficulty[pattern], tiers.length - 1)];
  const pool = PROBLEMS[pattern].filter(p => p.tier === tier);
  // Track stable problem slugs rather than pool indices (which change with difficulty).
  const unseen = pool.filter(p => !state.seen[pattern].includes(p.slug));
  const choices = unseen.length ? unseen : pool;
  if (!unseen.length) state.seen[pattern] = [];
  const problem = choices[Math.floor(random() * choices.length)];
  state.seen[pattern].push(problem.slug);
  return { ...problem, pattern };
}
export function nextProblem(state, random = Math.random) {
  const pattern = weightedPick(state, random);
  state.lastPattern = pattern;
  state.current = { ...pickProblem(state, pattern, random), revealed: false };
  return state.current;
}
export function submitResult(state, result, now = Date.now()) {
  if (!state.current || state.current.revealed) throw new Error('No active problem to score');
  if (!['clean', 'slow', 'stuck'].includes(result)) throw new Error('Invalid result');
  const p = state.current.pattern;
  if (result === 'clean') {
    state.weights[p] = Math.max(0.5, state.weights[p] - 0.5);
    state.streak[p] += 1;
    if (state.streak[p] >= 2 && state.difficulty[p] < availableTiers(p).length - 1) { state.difficulty[p]++; state.streak[p] = 0; }
  } else { state.weights[p] = Math.min(5, state.weights[p] + (result === 'slow' ? 0.5 : 1)); state.streak[p] = 0; }
  state.log.unshift({ pattern: p, title: state.current.title, slug: state.current.slug, result, ts: now });
  state.log = state.log.slice(0, 100);
  state.current.revealed = true;
  state.current.result = result;
}
export function validateState(candidate) {
  if (!candidate || typeof candidate !== 'object' || !Array.isArray(candidate.log) || !candidate.weights || !candidate.difficulty || !candidate.streak || !candidate.seen) throw new Error('Invalid save format');
  for (const p of PATTERNS) {
    if (typeof candidate.weights[p] !== 'number' || !Number.isFinite(candidate.weights[p]) || candidate.weights[p] < 0.5 || candidate.weights[p] > 5 || !Number.isInteger(candidate.difficulty[p]) || candidate.difficulty[p] < 0 || candidate.difficulty[p] > 1 || !Number.isInteger(candidate.streak[p]) || candidate.streak[p] < 0 || !Array.isArray(candidate.seen[p])) throw new Error('Invalid pattern progress');
  }
  if (candidate.current !== null && (typeof candidate.current !== 'object' || !PATTERNS.includes(candidate.current.pattern) || typeof candidate.current.slug !== 'string')) throw new Error('Invalid current problem');
  return candidate;
}

import { PATTERNS, PROBLEMS } from './problems.js';
import { STORAGE_KEY, initialState, validateState, nextProblem, submitResult, availableTiers } from './adaptive.js';
const $ = id => document.getElementById(id);
let state;
try { state = validateState(JSON.parse(localStorage.getItem(STORAGE_KEY))) } catch { state = initialState(); }
function notice(message) { $('notice').textContent = message; }
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { notice('Browser storage is unavailable. Export your progress to keep a backup.'); } }
function node(tag, text, className) { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (className) el.className = className; return el; }
function button(text, fn, className = '') { const b = node('button', text, className); b.addEventListener('click', fn); return b; }
function link(problem) { const a = node('a', problem.title + ' ↗'); a.href = `https://leetcode.com/problems/${encodeURIComponent(problem.slug)}/`; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; }
function render() {
  const count = state.log.length, clean = state.log.filter(x => x.result === 'clean').length;
  $('stats').replaceChildren(...[[String(count),'Attempts tracked'],[count ? `${Math.round(clean/count*100)}%` : '—','Clean solve rate'],[String(Object.values(PROBLEMS).reduce((s,p)=>s+p.length,0)),'Curated problems']].map(([v,l]) => { const d=node('div',undefined,'stat'); d.append(node('strong',v),node('span',l)); return d; }));
  const practice = $('practice'); practice.replaceChildren();
  if (!state.current) practice.append(node('p','Start a session to get a question selected based on your practice history.','muted'),button('Get first problem',advance,'start'));
  else {
    const c=state.current, q=node('div',undefined,'question'); q.append(node('div',`${c.pattern} · ${c.tier.toUpperCase()}`,'tag'));
    const h=node('h3'); h.append(link(c)); q.append(h);
    if (c.revealed) q.append(node('p',c.note));
    practice.append(q);
    if (c.revealed) practice.append(node('p',`Logged: ${label(c.result)}`,'muted'),button('Next problem',advance,'start'));
    else { practice.append(node('p','Solve on LeetCode, then rate your attempt:','muted')); const a=node('div',undefined,'actions'); for(const [key,title] of [['clean','Solved cleanly (under 20–25 min)'],['slow','Solved slowly or with hints'],['stuck',"Couldn't solve it"]]) a.append(button(title,()=>{submitResult(state,key);save();render();},key)); practice.append(a); }
  }
  const max=Math.max(...Object.values(state.weights)); $('patterns').replaceChildren(...PATTERNS.map(p=>{const d=node('div',undefined,'pattern'),top=node('div',undefined,'pattern-top'),bar=node('div',undefined,'track'),fill=node('div',undefined,'fill'); top.append(node('span',p),node('span',availableTiers(p)[Math.min(state.difficulty[p],availableTiers(p).length-1)]));fill.style.width=`${Math.round(state.weights[p]/max*100)}%`;bar.append(fill);d.append(top,bar);return d;}));
  const history=$('history'); history.replaceChildren(); if(!state.log.length) history.append(node('p','No attempts yet.','muted'));
  for(const attempt of state.log.slice(0,12)){const d=node('div',undefined,'attempt'),left=node('div'),a=link(attempt);left.append(a,node('small',`${attempt.pattern} · ${new Date(attempt.ts).toLocaleDateString()}`));d.append(left,node('span',label(attempt.result),`result ${attempt.result}`));history.append(d);}
}
function label(result){return ({clean:'Clean solve',slow:'Slow / hints',stuck:'Not solved'})[result] || result;}
function advance(){nextProblem(state);save();render();}
$('reset').addEventListener('click',()=>{if(confirm('Delete all practice progress in this browser?')){state=initialState();save();render();notice('Progress reset.');}});
$('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='adaptive-dsa-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{const imported=validateState(JSON.parse(await file.text()));state=imported;save();render();notice('Progress imported successfully.');}catch{notice('Could not import: invalid or incompatible progress file.');}e.target.value='';});
render();

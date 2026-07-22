import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const storage = new Map();
const localStorage = {
  getItem(key) { return storage.has(key) ? storage.get(key) : null; },
  setItem(key, value) { storage.set(key, String(value)); },
  removeItem(key) { storage.delete(key); }
};
const context = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  TextEncoder, TextDecoder, atob, btoa,
  window: {
    addEventListener() {}, scrollTo() {}, localStorage, sessionStorage: localStorage,
    __GHRAB_STUDIO_ACCESS__: { permit: { role: 'admin' } },
    GHRABTelemetry: { recordOutput() { return true; } }
  },
  document: {
    querySelector() { return null; }, querySelectorAll() { return []; },
    createElement() { return { style: {}, click() {}, remove() {}, getContext() { return null; } }; },
    body: { appendChild() {} }
  },
  navigator: { userAgent: 'ACTIVA-QA', onLine: true },
  location: { href: 'http://localhost/', protocol: 'http:', search: '' },
  CSS: { escape: String }, Blob: class {}, URL: { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} },
  Image: class {}, fetch: async () => ({ ok: true, json: async () => ({ materials: [] }) }),
  confirm: () => true
};
context.window.window = context.window;
context.window.document = context.document;
context.window.navigator = context.navigator;
context.globalThis = context;
vm.createContext(context);
const load = [
  '10-core.js', '20-activity-registry.js', '25-subject-packs.js', '27-collaboration-visual-packs.js',
  '30-storage-api.js', '33-library-storage.js', '40-ai-generation.js', '42-package3-ai.js',
  '45-differentiation.js', '47-package3-differentiation.js', '60-renderers.js', '62-package3-renderers.js',
  '64-presentation-slides.js'
];
for (const file of load) vm.runInContext(readFileSync(join(ROOT, 'src/js', file), 'utf8'), context, { filename: file });
const run = (code) => vm.runInContext(code, context);
const failures = [];

run(`App.project={...App.project,title:'QA lekce',topic:'Fotosyntéza',subject:'Biologie',grade:'tercie',goal:'Žák vysvětlí proces',sourceText:'TAJNÝ ZDROJ',variant:'B',activeLevel:'standard',activities:[normalizeActivity({type:'multiplechoice',title:'Otázky',instruction:'Vyberte.',points:2,data:{items:[{question:'Co rostlina přijímá?',options:['CO2','O2','N2'],answerIndex:0,explanation:'Oxid uhličitý.'},{question:'Kde proces probíhá?',options:['V jádře','V chloroplastech'],answerIndex:1,explanation:'V chloroplastech.'}]}},'multiplechoice',0),normalizeActivity({type:'shortanswer',title:'Vysvětlení',instruction:'Odpovězte.',points:1,data:{items:[{question:'Proč je proces důležitý?',answer:'Ukládá energii.',keywords:['energie']}] }},'shortanswer',1)]};`);
const slideCount = run('buildPresentationSlides().length');
if (slideCount !== 5) failures.push(`Projekce: očekáváno 5 snímků, nalezeno ${slideCount}.`);
if (!run(`buildPresentationSlides().some(s=>s.answerHtml.includes('Oxid uhličitý'))`)) failures.push('Projekce neobsahuje řešení výběrové otázky.');
if (!run(`buildPresentationSlides().some(s=>s.promptHtml.includes('Proč je proces důležitý'))`)) failures.push('Projekce neobsahuje otevřenou otázku.');
const html = run(`standaloneInteractiveHtml(libraryProjectSnapshot(App.project,{includeSource:false}), '')`);
if (!html.includes('ACTIVA') || !html.includes('Ukázat řešení')) failures.push('Samostatné interaktivní HTML nemá ovládání.');
if (html.includes('TAJNÝ ZDROJ')) failures.push('Samostatné HTML obsahuje původní zdrojový text.');
if (!html.includes('Oxid uhličitý')) failures.push('Samostatné HTML neobsahuje připravené řešení.');
run(`var qaEntry=libraryEntryFromProject({title:'QA materiál',tags:'biologie, test'});`);
if (run('qaEntry.project.sourceText') !== '') failures.push('Knihovní záznam standardně neodstraňuje zdrojový text.');
if (run('qaEntry.project.activities.length') !== 2) failures.push('Knihovní záznam ztratil aktivity.');
if (run('qaEntry.tags.length') !== 2) failures.push('Knihovní záznam nesprávně zpracoval štítky.');
run(`recordPresentationSession({topic:'QA',subject:'Biologie',durationSeconds:120,slidesVisited:4,correct:2,partial:1,incorrect:1,activityTypes:['multiplechoice']});`);
if (run('libraryStats().sessions') !== 1 || run('libraryStats().presentationMinutes') !== 2) failures.push('Lokální statistiky projekce nejsou správné.');
const body = readFileSync(join(ROOT, 'src/body.html'), 'utf8');
for (const id of ['libraryModal','presentationModal','shareModal','openPresentationBtn','libraryOpenBtn','exportInteractiveHtmlBtn']) {
  if (!body.includes(`id="${id}"`)) failures.push(`V HTML chybí ${id}.`);
}
const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicates.length) failures.push(`Duplicitní HTML ID: ${[...new Set(duplicates)].join(', ')}`);
const school = JSON.parse(readFileSync(join(ROOT, 'src/school-library/library.json'), 'utf8'));
if (school.schema !== 'activa-school-library-v1' || school.materials.length < 2) failures.push('Školní katalog nemá očekávané ukázkové materiály.');
for (const entry of school.materials) {
  if (entry.schema !== 'activa-library-entry-v1' || entry.project?.schema !== 'activa-project-v1') failures.push(`Neplatný záznam školní knihovny ${entry.id}.`);
}
const allJs = readdirSync(join(ROOT, 'src/js')).filter((name) => name.endsWith('.js')).map((name) => readFileSync(join(ROOT, 'src/js', name), 'utf8')).join('\n');
for (const marker of ['presentation-session','library-save','share-package','interactive-html','IndexedDB','standaloneInteractiveHtml']) {
  if (!allJs.includes(marker)) failures.push(`Chybí funkce/marker ${marker}.`);
}
if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}
console.log(`[package4-test] projekce ${slideCount} snímků, knihovna, sdílení, statistiky a školní katalog prošly.`);

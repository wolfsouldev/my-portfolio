#!/usr/bin/env node
/** Single-page bilingual CV. Plain ESM Node.js: no Python, browser or system fonts. */
import PDFDocument from 'pdfkit';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, loadPortfolioData } from './export_cv_data.mjs';
import { localizeCV, normalize } from './cv-content.mjs';
import { renderReadme } from './render_cv_readme.mjs';

const W = 595.2756, H = 841.8898;
const FONTS = path.join(ROOT, 'scripts/assets/fonts');
const COLORS = {
  bg: '#1b1d24', rail: '#17191f', chrome: '#252831', line: '#343947', text: '#e0e4ee',
  muted: '#a0a9bd', number: '#667187', blue: '#82b6e5', cyan: '#70d3d5',
  orange: '#e6b18a', green: '#a4c38d', purple: '#c9a3e8',
};
const FEATURES = { liga: false, calt: false };

class EditorCV {
  constructor(data, { fontsDir = FONTS, root = ROOT } = {}) {
    this.data = data;
    this.root = root;
    this.doc = new PDFDocument({
      autoFirstPage: false, size: 'A4', margin: 0, bufferPages: true, compress: true,
      lang: data.locale.language,
      info: { Title: `${data.profile.name} | ${data.locale.title}`, Author: data.profile.name,
        Subject: data.locale.title, Creator: 'Portfolio CV / Node.js + PDFKit' },
    });
    this.doc.registerFont('Code', path.join(fontsDir, 'JetBrainsMono-Regular.ttf'));
    this.doc.registerFont('CodeBold', path.join(fontsDir, 'JetBrainsMono-Bold.ttf'));
    this.pageCount = 0;
    this.doc.on('pageAdded', () => this.pageCount++);
    const chunks = [];
    this.complete = new Promise((resolve, reject) => {
      this.doc.on('data', (chunk) => chunks.push(chunk));
      this.doc.once('error', reject);
      this.doc.once('end', () => resolve(Buffer.concat(chunks)));
    });
    this.line = 0;
    this.x = 205;
    this.width = W - 229;
    this.y = 64;
    this.rows = [];
    this.descriptionCount = 0;
  }
  widthOf(text, size, bold = false) {
    return this.doc.font(bold ? 'CodeBold' : 'Code').fontSize(size).widthOfString(normalize(text), { features: FEATURES });
  }
  text(x, y, value, color = 'text', size = 9, { bold = false, url } = {}) {
    const text = normalize(value);
    const width = this.widthOf(text, size, bold);
    if (x < 18 || x + width > W - 17 || y < 8 || y + size * 1.4 > H - 12) {
      throw new Error(`CV ${this.data.locale.language}: text outside page at (${x}, ${y}): ${text}`);
    }
    this.doc.fillColor(COLORS[color] ?? color).text(text, x, y, {
      lineBreak: false, features: FEATURES, ...(url ? { link: url } : {}),
    });
    this.rows.push({ text, x, y, width, size, color });
    return width;
  }
  runs(x, y, parts, size = 9) {
    for (const [text, color] of parts) x += this.text(x, y, text, color, size);
  }
  rule(x, y, width, color = 'line') {
    this.doc.strokeColor(COLORS[color]).lineWidth(0.55).moveTo(x, y).lineTo(x + width, y).stroke();
  }
  wrap(text, width, size = 9) {
    const lines = [];
    let line = '';
    for (const word of normalize(text).split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (this.widthOf(next, size) <= width) { line = next; continue; }
      if (line) lines.push(line);
      line = '';
      for (const char of word) {
        if (this.widthOf(line + char, size) > width) { lines.push(line); line = ''; }
        line += char;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
  code(parts, { size = 9, step = 12.2, indent = 0 } = {}) {
    if (this.y + size * 1.4 > H - 54) throw new Error(`CV ${this.data.locale.language}: one-page content overflow at ${this.y.toFixed(1)} (${parts.map(([value]) => value).join('')}). Shorten the reviewed summary, do not add pages.`);
    const width = parts.reduce((sum, [value]) => sum + this.widthOf(value, size), 0);
    if (width > this.width - indent) throw new Error(`CV line too long: ${parts.map(([value]) => value).join('')}`);
    this.line++;
    this.text(this.x - 24, this.y + 1, String(this.line).padStart(2, '0'), 'number', 6.9);
    this.runs(this.x + indent, this.y, parts, size);
    this.y += step;
  }
  field(key, value, { indent = 12, size = 8.8, step = 12.3, end = ',' } = {}) {
    this.code([[`${key}: `, 'blue'], [JSON.stringify(normalize(value)), 'orange'], [end, 'muted']], { indent, size, step });
  }
  template(key, value, { indent = 12, size = 8.5, step = 11.8, assignment = false, color = 'orange' } = {}) {
    this.code([[`${key}${assignment ? ' = ' : ': '}`, 'blue'], ['`', color]], { indent, size, step });
    for (const line of this.wrap(value, this.width - indent - 12, size)) {
      this.code([[line, color]], { indent: indent + 10, size, step });
    }
    this.code([['`' + (assignment ? ';' : ','), color]], { indent, size, step });
  }
  chrome() {
    this.doc.addPage();
    this.doc.rect(0, 0, W, H).fill(COLORS.bg);
    this.doc.rect(0, 0, W, 37).fill(COLORS.chrome);
    for (const [x, color] of [[21, '#e87878'], [33, '#ddbf72'], [45, '#8cbd8f']]) this.doc.circle(x, 18, 2.8).fill(color);
    this.text(63, 13, this.data.locale.file, 'text', 8.5);
    this.rule(62, 36, this.widthOf(this.data.locale.file, 8.5) + 11, 'cyan');
    this.text(W - 111, 14, 'CV / TYPESCRIPT', 'muted', 6.4);
    this.doc.rect(0, 37, 179, H - 66).fill(COLORS.rail);
    this.doc.strokeColor(COLORS.line).lineWidth(0.55).moveTo(179, 37).lineTo(179, H - 29).stroke();
    this.doc.outline.addItem(this.data.locale.title);
  }
  sidebar() {
    const { profile: p, locale: l, skills } = this.data;
    const x = 24;
    let y = 51;
    this.text(x, y, '<avatar />', 'blue', 8);
    y += 17;
    this.doc.image(path.resolve(this.root, p.photo), x, y, { fit: [111, 111], align: 'center', valign: 'center' });
    this.doc.rect(x, y, 111, 111).strokeColor(COLORS.line).lineWidth(0.7).stroke();
    y += 126;
    this.text(x, y, `const ${l.contact} = {`, 'cyan', 8.2, { bold: true });
    y += 18;
    for (const [key, value, url] of [
      ['email', p.email, `mailto:${p.email}`],
      ['github', p.github.replace(/^https?:\/\//, ''), p.github],
      ['linkedin', 'Alejandro Fajardo ->', p.linkedin],
      [l.location, `${p.location} / ${l.remote}`, undefined],
    ]) {
      this.text(x + 5, y, `${key}:`, 'blue', 7.7); y += 12;
      this.text(x + 5, y, value, 'orange', 8.0, { url }); y += 17;
    }
    this.text(x, y, '};', 'muted', 8); y += 24;
    const groups = [
      skills[0].skills,
      [...new Set(['JavaScript', ...skills[1].skills])],
      [...new Set([...skills[2].skills, 'AWS Lambda', 'GitLab'])],
      ['Go', 'CLI', 'n8n', 'Telegram', 'shadcn/ui'],
    ];
    groups.forEach((items, index) => {
      this.text(x, y, `${l.groupNames[index]}[]`, 'cyan', 7.8, { bold: true }); y += 15;
      for (const line of this.wrap(items.join(' · '), 132, 8.15)) {
        this.text(x + 3, y, line, 'text', 8.15); y += 12.5;
      }
      y += 16;
    });
    if (y > H - 48) throw new Error(`CV ${l.language}: sidebar overflow; review the skill groups.`);
    this.sidebarBottom = y;
  }
  content() {
    const { profile, experience, locale: l } = this.data;
    this.code([['export class ', 'blue'], ['AlejandroFajardo ', 'cyan'], ['{', 'text']], { size: 11.8, step: 23 });
    this.code([[`${l.name} = `, 'blue'], [JSON.stringify(profile.name) + ';', 'orange']], { size: 9.2, step: 16 });
    this.code([[`${l.role} = `, 'blue'], [JSON.stringify(l.headline) + ';', 'orange']], { size: 9.2, step: 21 });
    this.template(l.profile, l.summary, { assignment: true, indent: 0, size: 8.5, step: 11.5, color: 'green' });
    this.y += 12;
    this.code([[l.experience, 'cyan'], [' = [', 'text']], { size: 11, step: 20 });
    for (const job of experience) {
      this.code([['  { ', 'muted'], [`${l.company}: `, 'blue'], [JSON.stringify(job.company) + ',', 'cyan']], { size: 9.3, step: 14 });
      this.field(l.job, job.title, { size: 8.8, step: 13 });
      this.field(l.period, job.date, { size: 8.0, step: 14 });
      this.template(l.description, job.description);
      this.descriptionCount++;
      this.code([['  },', 'muted']], { size: 8.6, step: 12 });
      this.y += 7;
    }
    this.code([['];', 'text']], { size: 9, step: 16 });
    this.code([['}', 'cyan']], { size: 11, step: 12 });
  }
  footer() {
    this.rule(22, H - 33, W - 44);
    this.text(23, H - 25, 'alejandro_fajardo / backend-first', 'muted', 6.4);
    this.text(W - 170, H - 25, `UTF-8  |  ${this.data.locale.language.toUpperCase()}  |  01 / 01`, 'muted', 6.4);
  }
  async render() {
    try {
      this.chrome(); this.sidebar(); this.content(); this.footer();
      if (this.pageCount !== 1 || this.doc.bufferedPageRange().count !== 1) throw new Error('CV must contain exactly one page.');
      this.doc.end();
      const buffer = await this.complete;
      if ((buffer.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length !== 1) throw new Error('Unexpected page count in serialized PDF.');
      return { buffer, stats: { language: this.data.locale.language, pages: this.pageCount, bodyBottom: this.y, sidebarBottom: this.sidebarBottom, descriptionCount: this.descriptionCount }, rows: this.rows };
    } catch (error) {
      this.doc.destroy();
      throw error;
    }
  }
}

export async function buildCV(data, lang, options = {}) {
  return new EditorCV(localizeCV(data, lang), options).render();
}
async function atomicWrite(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, content);
  await rename(temporary, file);
}
export async function generateAll({ outputDir = path.join(ROOT, 'public/docs'), readmePath = path.join(ROOT, 'README.md') } = {}) {
  const data = loadPortfolioData();
  // Render and validate both documents before replacing any existing deliverable.
  const versions = await Promise.all(['es', 'en'].map(async (lang) => ({ lang, ...await buildCV(data, lang) })));
  for (const { lang, buffer } of versions) {
    const filename = `alejandro-fajardo-cv-${lang}.pdf`;
    await atomicWrite(path.join(outputDir, filename), buffer);
  }
  await atomicWrite(readmePath, renderReadme(data));
  return versions.map(({ lang, buffer, stats }) => ({ language: lang, file: path.join(outputDir, `alejandro-fajardo-cv-${lang}.pdf`), bytes: buffer.length, ...stats }));
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (process.argv.length > 2) {
    console.error('Usage: node scripts/generate_cv.mjs (generates ES + EN + README)');
    process.exitCode = 1;
  } else {
    try {
      console.log(JSON.stringify(await generateAll(), null, 2));
      console.log('CV ES + EN y README generados. Sin Python.');
    } catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}

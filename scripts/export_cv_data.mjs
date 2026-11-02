// Read-only adapter: the portfolio remains the source of truth for the CV.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function requiredMatch(text, pattern, label) {
  const value = text.match(pattern)?.[1];
  if (!value) throw new Error(`Missing portfolio field: ${label}`);
  return value;
}
export function loadPortfolioData(root = ROOT) {
  const read = (file) => readFileSync(path.join(root, file), 'utf8');
  function arrayFromAstro(file, name) {
    const literal = requiredMatch(read(file), new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\]);`), name);
    // Only evaluate our checked-in local data literals, never user/network input.
    const data = new Function(`return (${literal});`)();
    if (!Array.isArray(data) || data.length === 0) throw new Error(`Empty portfolio array: ${name}`);
    return data;
  }
  const about = read('src/components/AboutMe.astro');
  const contact = read('src/components/Contact.astro');
  return {
    profile: {
      name: requiredMatch(about, /const personalImageAlt = "([^"]+)"/, 'name'),
      location: 'Cuba', workMode: 'Remoto',
      email: requiredMatch(contact, /mailto:([^"\s]+)/, 'email'),
      github: requiredMatch(contact, /(https:\/\/github\.com\/[^"\s]+)/, 'GitHub'),
      linkedin: requiredMatch(contact, /(https:\/\/www\.linkedin\.com\/in\/[^"\s]+)/, 'LinkedIn'),
      photo: 'public/me_.jpg',
    },
    experience: arrayFromAstro('src/components/Experience.astro', 'EXPERIENCE'),
    skills: arrayFromAstro('src/components/Skills.astro', 'skillGroups'),
  };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(JSON.stringify(loadPortfolioData(), null, 2));
}

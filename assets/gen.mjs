// Profile graphics in the marborz.one style. Run: node assets/gen.mjs
import {readFileSync,writeFileSync} from 'fs';
const b64=n=>readFileSync(new URL(`fonts/${n}.woff2`,import.meta.url)).toString('base64');
const FONTS=`<style>@font-face{font-family:I;font-weight:100 900;src:url(data:font/woff2;base64,${b64('inter')})}@font-face{font-family:M;font-weight:100 900;src:url(data:font/woff2;base64,${b64('mono')})}@font-face{font-family:S;font-style:italic;src:url(data:font/woff2;base64,${b64('serif')})}
.i{font-family:I,-apple-system,sans-serif}.m{font-family:M,ui-monospace,monospace;letter-spacing:.08em}.s{font-family:S,Georgia,serif;font-style:italic}</style>`;
const T={dark:{text:'#ecebe6',muted:'#92918b',line:'rgba(236,235,230,.14)',shades:['#ecebe6','#c9c8c2','#a6a59f','#85847e','#6b6b68','#52524f','#3d3d3a']},
light:{text:'#0a0a0a',muted:'#6b6b68',line:'rgba(10,10,10,.16)',shades:['#0a0a0a','#2e2e2c','#4f4f4c','#6b6b68','#8a8985','#a8a8a4','#c4c2bc']}};
const W=1200, svg=(h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">${FONTS}${body}</svg>`;
const esc=s=>s.replace(/&/g,'&amp;');
const year=new Date().getFullYear();
const langs=[['TypeScript',1753644],['Python',608101],['SQL',491986],['SCSS',358043],['CSS / HTML',128661],['JavaScript',97951],['Other',39930]];
const total=langs.reduce((a,[,v])=>a+v,0);
const projects=[
['omioroom','Watch parties, in sync.','Watch party, i synk.','React · Supabase','live'],
['lecture-studio','Lectures into study notes.','Forelesninger til notater.','FastAPI · Whisper','alpha'],
['velnote','Markdown notes with tags.','Markdown-notater med tagger.','React · Express · PG','live'],
['maskin-anlegg-as','Client site, property care.','Kundeside, eiendomsdrift.','Next.js · Resend','client'],
['redbeardvfx','Portfolio for a VFX artist.','Portefølje for VFX-kunstner.','React · Vite · FSD','client'],
['death-trip-site','Moody site, built in a team.','Mørk side, laget i team.','React · Motion','live'],
];
const hero={en:['Fullstack developer.','Vg2 IT student.','Next: ML engineering.'],no:['Fullstack-utvikler.','Vg2 IT-elev.','Neste: ML engineering.']};
for(const [k,c] of Object.entries(T)){
 for(const lang of ['en','no']){
  const sfx=lang==='en'?k:`${k}-no`;
  const [l1,l2,l3]=hero[lang];
  writeFileSync(`assets/hero-${sfx}.svg`,svg(300,`
<text x="0" y="22" class="m" font-size="13" fill="${c.muted}">000 / ${lang==='en'?'PROFILE':'PROFIL'}</text>
<text x="${W}" y="22" class="m" font-size="13" fill="${c.muted}" text-anchor="end">PORSGRUNN, 59.14°N · ${year}</text>
<g class="i" font-size="68" letter-spacing="-2.4" fill="${c.text}"><text x="-3" y="128">${l1}</text><text x="-3" y="202" fill="${c.muted}">${l2}</text><text x="-3" y="276" fill="${c.muted}">${l3}</text></g>`));
  projects.forEach(([n,en,no,st,status],i)=>{
   writeFileSync(`assets/project-${String(i+1).padStart(2,'0')}-${sfx}.svg`,svg(84,`
<text x="0" y="50" class="m" font-size="13" fill="${c.muted}">/0${i+1}</text>
<text x="56" y="53" class="i" font-size="30" letter-spacing="-.6" fill="${c.text}">${n}</text>
<text x="420" y="53" class="s" font-size="26" fill="${c.muted}">${esc(lang==='en'?en:no)}</text>
<text x="1020" y="50" class="m" font-size="11" fill="${c.muted}" text-anchor="end">${st.toUpperCase()}</text>
<rect x="1046" y="31" width="${status.length*8.6+22}" height="26" rx="13" fill="none" stroke="${c.line}"/>
<text x="${1057}" y="49" class="m" font-size="11" fill="${c.text}">${status.toUpperCase()}</text>
<text x="${W}" y="51" class="m" font-size="16" fill="${c.text}" text-anchor="end">→</text>
<line x1="0" y1="83.5" x2="${W}" y2="83.5" stroke="${c.line}"/>`));
  });
 }
 let x=0,bar='',leg='';
 langs.forEach(([n,v],i)=>{const w=(v/total)*W;bar+=`<rect x="${x}" y="58" width="${Math.max(1,w-3)}" height="4" fill="${c.shades[i]}"/>`;x+=w;
  const cx=(i%4)*300, cy=110+Math.floor(i/4)*34;
  leg+=`<rect x="${cx}" y="${cy-9}" width="8" height="8" fill="${c.shades[i]}"/><text x="${cx+20}" y="${cy}" class="i" font-size="16" fill="${c.text}">${n}</text><text x="${cx+260}" y="${cy}" class="m" font-size="12" fill="${c.muted}" text-anchor="end">${(v/total*100).toFixed(1)}%</text>`;});
 writeFileSync(`assets/languages-${k}.svg`,svg(180,`<line x1="0" y1=".5" x2="${W}" y2=".5" stroke="${c.line}"/>
<text x="0" y="34" class="m" font-size="12" letter-spacing="2" fill="${c.muted}">LANGUAGES</text><text x="${W}" y="34" class="m" font-size="12" fill="${c.muted}" text-anchor="end">PUBLIC REPOS · BY BYTES</text>${bar}${leg}
<line x1="0" y1="179.5" x2="${W}" y2="179.5" stroke="${c.line}"/>`));
}

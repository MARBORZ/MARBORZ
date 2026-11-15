// Generates the profile SVGs: node assets/gen.mjs
import {writeFileSync} from 'fs';
const T={dark:{bg:'#0e0e0d',card:'#151514',line:'#2a2a27',text:'#ecebe6',muted:'#92918b'},light:{bg:'#f4f2ed',card:'#f8f7f3',line:'#dcd9d0',text:'#0a0a0a',muted:'#6b6b68'}};
const serif="Georgia,'Times New Roman',serif", mono="ui-monospace,SFMono-Regular,Menlo,monospace", sans="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const langs=[['TypeScript',1753644],['Python',608101],['SQL',491986],['SCSS',358043],['JavaScript',97951],['CSS / HTML',128661],['Other',39930]];
const total=langs.reduce((a,[,v])=>a+v,0);
for(const [k,c] of Object.entries(T)){
const shades=k==='dark'?['#ecebe6','#c9c8c2','#a6a59f','#85847e','#6b6b68','#52524f','#3d3d3a']:['#0a0a0a','#2e2e2c','#4f4f4c','#6b6b68','#8a8985','#a8a8a4','#c4c2bc'];
writeFileSync(`assets/banner-${k}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300">
<rect width="1200" height="300" rx="12" fill="${c.bg}"/>
<g font-family="${mono}" font-size="13" letter-spacing="1.5" fill="${c.muted}"><text x="56" y="56">MARBORZ / PROFILE</text><text x="1144" y="56" text-anchor="end">PORSGRUNN · NO</text></g>
<line x1="56" y1="76" x2="1144" y2="76" stroke="${c.line}"/>
<text x="1144" y="250" text-anchor="end" font-family="${serif}" font-size="200" fill="${c.card}">ML</text>
<text x="54" y="168" font-family="${serif}" font-size="64" fill="${c.text}">Amadi Masuev</text>
<text x="56" y="218" font-family="${serif}" font-style="italic" font-size="34" fill="${c.muted}">fullstack, on the way to ML engineering.</text>
<line x1="56" y1="252" x2="1144" y2="252" stroke="${c.line}"/>
<g font-family="${mono}" font-size="13" letter-spacing="1.5" fill="${c.muted}"><text x="56" y="278">TYPESCRIPT · PYTHON · REACT · NEXT.JS · NODE</text><text x="1144" y="278" text-anchor="end" fill="${c.text}">MARBORZ.ONE</text></g>
</svg>`);
let x=40,bar='',rows='';
langs.forEach(([n,v],i)=>{const w=Math.max(2,(v/total)*720);bar+=`<rect x="${x}" y="76" width="${w-2}" height="10" fill="${shades[i]}"/>`;x+=w;
const cx=40+(i%4)*180, cy=124+Math.floor(i/4)*30;
rows+=`<circle cx="${cx+5}" cy="${cy-5}" r="5" fill="${shades[i]}"/><text x="${cx+18}" y="${cy}" font-family="${sans}" font-size="14" fill="${c.text}">${n} <tspan fill="${c.muted}" font-family="${mono}" font-size="12">${(v/total*100).toFixed(1)}%</tspan></text>`;});
writeFileSync(`assets/languages-${k}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="190" viewBox="0 0 800 190">
<rect x=".5" y=".5" width="799" height="189" rx="10" fill="${c.bg}" stroke="${c.line}"/>
<text x="40" y="48" font-family="${mono}" font-size="12" letter-spacing="1.5" fill="${c.muted}">LANGUAGES · PUBLIC REPOS · BY BYTES</text>
<clipPath id="r"><rect x="40" y="76" width="720" height="10" rx="5"/></clipPath><g clip-path="url(#r)">${bar}</g>${rows}
</svg>`);}

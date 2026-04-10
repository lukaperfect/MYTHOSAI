import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   M Y T H O S A I   v 5 . 0   —   T H E   S I N G U L A R I T Y
   ═════════════════════════════════════════════════════════════════════
   Narrative Reality Engine

   Kinetic Typography · Pulse Lock · Destiny Seed · Haptic Compositions
   NPC Tone Modulation · Impact Toast · Audio Binaurale · Entity Memory
   Streak · AI Tagline · Rarity Poster · Evidence Wall in Rifugio
   53 scenes · 14 endings · 4 themes · Cold Open · Daily Scene
   ═══════════════════════════════════════════════════════════════════════ */

// ── DESIGN: LIQUID UI THEME SYSTEM ────────────────────────
const THEMES={
  noir:{bg:"#07070c",bgC:"#0e0e17",bgE:"#151521",accent:"#c9a84c",accentB:"#e8cf70",accentD:"#7a6a30",danger:"#c44040",txt:"#c8c0b4",txtD:"#5a5650",txtB:"#f0eadc",txtG:"#3a3630",
    f:{d:"'Cormorant Garamond',serif",b:"'Crimson Text',serif",u:"'Alegreya Sans',sans-serif",m:"'JetBrains Mono',monospace"},rain:true,particle:"rain"},
  scifi:{bg:"#040810",bgC:"#0a1020",bgE:"#101830",accent:"#00d4ff",accentB:"#40e8ff",accentD:"#006888",danger:"#ff3366",txt:"#b0c8e0",txtD:"#405870",txtB:"#e0f0ff",txtG:"#203040",
    f:{d:"'Rajdhani',sans-serif",b:"'Exo 2',sans-serif",u:"'Rajdhani',sans-serif",m:"'JetBrains Mono',monospace"},rain:false,particle:"matrix"},
  horror:{bg:"#0a0406",bgC:"#140810",bgE:"#1a0c14",accent:"#cc2200",accentB:"#ff4422",accentD:"#661100",danger:"#ff0000",txt:"#c0a8a0",txtD:"#604840",txtB:"#f0e0d8",txtG:"#302018",
    f:{d:"'Creepster',cursive",b:"'Crimson Text',serif",u:"'Alegreya Sans',sans-serif",m:"'JetBrains Mono',monospace"},rain:true,particle:"fog"},
  historical:{bg:"#0c0a06",bgC:"#1a1610",bgE:"#24201a",accent:"#b8860b",accentB:"#daa520",accentD:"#8b6508",danger:"#8b0000",txt:"#c8b898",txtD:"#706050",txtB:"#f0e8d8",txtG:"#403828",
    f:{d:"'Playfair Display',serif",b:"'Crimson Text',serif",u:"'Alegreya Sans',sans-serif",m:"'JetBrains Mono',monospace"},rain:false,particle:"dust"},
};
function makeT(theme="noir"){const t=THEMES[theme]||THEMES.noir;return{bg:t.bg,bgC:t.bgC,bgE:t.bgE,bgO:`${t.bg}ee`,gold:t.accent,goldB:t.accentB,goldD:t.accentD,goldG:t.accent+"0d",red:"#7a2020",redB:t.danger,blue:"#2a4a7a",blueB:"#5a9add",cyan:"#3a9090",green:"#3a7a3a",greenB:"#5aaa5a",purple:"#6a3a8a",purpleB:"#9a5aba",orange:"#b87333",txt:t.txt,txtD:t.txtD,txtB:t.txtB,txtG:t.txtG,sh:"rgba(0,0,0,.8)",f:t.f}}
let T=makeT("noir");
const FONTS="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Alegreya+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@300;400&family=Rajdhani:wght@400;600&family=Exo+2:wght@400;600&family=Creepster&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";

// ── INNER VOICE — protagonist's sarcastic inner monologue ─
const INNER={
  c0_start:["(Un messaggio anonimo alle 3 di notte. Ovviamente ci vai.)","(La pioggia non è mai solo pioggia. È una metafora. O forse sei solo bagnato.)"],
  c0_lobby:["(Sigaretta ancora accesa. Qualcuno è uscito di fretta. O vuole che tu pensi questo.)"],
  c0_stairs:["(Ultimo piano. Pistola carica. Tu disarmato. Cosa può andare storto.)"],
  c0_conf:["(Ferrante. Un nome che suona come una malattia. O una promessa.)"],
  c0_elena:["(Dice che ti amava. Perché tutti quelli che ti amano finiscono per mentirti?)"],
  c0_alley:["(Pesce marcio e scale arrugginite. Il glamour dell'investigazione privata.)"],
  c0_stealth:["(Il tuo nome sotto un punto interrogativo. Qualcuno ti studia da prima che tu sapessi di esistere.)"],
  c0_mara:["(Whisky e polvere da sparo. Mara non ha mai avuto bisogno di profumo.)"],
  c1_dawn:["(14 chiamate perse. Nessuno che chiama 14 volte porta buone notizie.)"],
  c1_archive:["(Archivio comunale. Dove la burocrazia va a morire — e i segreti si nascondono.)"],
  c1_meet_v:["(Gitanes Brunes. La stessa marca della sigaretta nella hall. Coincidenza è una parola per chi non vuole pensare.)"],
  c1_312b:["(Le tue memorie in una stanza fredda. La tua vita in file audio. Com'è poetico. Com'è terrificante.)"],
  c1_rev:["(Il tuo numero ti scrive. Come se l'universo avesse il tuo contatto e nessun rispetto per gli orari.)"],
  c2_start:["(48 ore senza dormire. Il cervello funziona a caffè e paranoia. Un mix collaudato.)"],
  c2_lethe:["(Cemento, telecamere, nessun cartello. Dove vanno a morire i segreti.)"],
  c2_elena:["(Le domande che fanno più male sono quelle di cui conosci già la risposta.)"],
  c2_sarris:["(Si pulisce gli occhiali. Un tic. O un modo per non guardarti negli occhi.)"],
  c2_twist:["(Elena con una pistola. L'amore è un'arma a doppio taglio. Letteralmente, a quanto pare.)"],
  c2_lab:["(ANAMNESIS. Una parola greca per 'ricordo'. In una fiala azzurra. La poesia farmaceutica.)"],
  c3_start:["(Una settimana fa eri un nessuno con amnesia. Ora hai i destini di 23 persone sulle spalle. Promozione rapida.)"],
  c3_expose:["(Il giornalismo è morto, dicono. Ma il morto sta per alzarsi e parlare.)"],
  c3_remember:["(L'ago entra nella vena. Tutto il coraggio del mondo non prepara a ricordare chi eri.)"],
  c3_destroy:["(La tanica pesa come una sentenza. Alcune decisioni non hanno appello.)"],
  c3_climax:["(Il porto. Dove tutto è cominciato. Il destino ha un pessimo senso dell'umorismo.)"],
  c3_standoff:["(Ferrante alza la pistola. Potresti morire qui. Stranamente, il pensiero è quasi confortante.)"],
  c3_alliance:["(Il piano funziona. Non ci credevi nemmeno tu. Forse il mondo premia gli ottimisti idioti.)"],
};

// ── ECHOES OF OTHERS — asynchronous shared narrative ─────
const Echoes={
  async leave(sid,innerV,traits,inv,cause){
    const echo={sid,voice:innerV||"...",traits:traits.slice(0,3),cause,inv:inv.slice(0,2),ts:Date.now(),id:"e_"+Date.now()+"_"+Math.random().toString(36).slice(2,6)};
    try{await ST.saveShared(`echo:${echo.id}`,echo)}catch{};return echo},
  async find(sid){try{const keys=await ST.listShared("echo:");const out=[];
    for(const k of keys.slice(-30)){try{const e=await ST.loadShared(k);if(e?.sid===sid)out.push(e)}catch{}}return out.slice(0,3)}catch{return[]}},
  async lootDrop(items,sid){if(!items?.length)return;
    try{await ST.saveShared(`loot:l_${Date.now()}`,{items:items.slice(0,3),sid,ts:Date.now()})}catch{}},
  async lootFind(sid){try{const keys=await ST.listShared("loot:");
    for(const k of keys.slice(-20)){try{const l=await ST.loadShared(k);
      if(l?.sid===sid&&Date.now()-l.ts<604800000){try{await window.storage.delete(k,true)}catch{};return l}}catch{}}return null}catch{return null}},
  async tombstone(ch,traits,stats,flags,cause){
    try{await ST.saveShared(`tomb:t_${Date.now()}`,{ch,traits:traits.slice(0,4),stats,nFlags:Object.keys(flags).length,cause,ts:Date.now()})}catch{}},
  async cemetery(){try{const keys=await ST.listShared("tomb:");const out=[];
    for(const k of keys.slice(-15)){try{const t=await ST.loadShared(k);if(t)out.push(t)}catch{}}return out.sort((a,b)=>b.ts-a.ts).slice(0,12)}catch{return[]}}
};

// ── CIRCADIAN RHYTHM — time-of-day affects gameplay ──────
function getCircadian(){const h=new Date().getHours();
  if(h>=0&&h<5)return{p:"notte_fonda",mod:{istinto:-1},bias:"dread",hint:"Notte fonda. I tuoi occhi pesano. Le ombre respirano.",dm:-1,icon:"🌑"};
  if(h>=5&&h<8)return{p:"alba",mod:{},bias:"hope",hint:"L'alba taglia la pioggia come una lama.",dm:0,icon:"🌅"};
  if(h>=8&&h<12)return{p:"mattina",mod:{intelletto:1},bias:"calm",hint:"Mattina. La città si sveglia. Tu non hai dormito.",dm:1,icon:"☀️"};
  if(h>=12&&h<17)return{p:"pomeriggio",mod:{},bias:"mystery",hint:"Le ombre si accorciano. Il tempo stringe.",dm:0,icon:"🌤️"};
  if(h>=17&&h<21)return{p:"sera",mod:{fascino:1},bias:"tense",hint:"Sera. I segreti escono a passeggio.",dm:0,icon:"🌆"};
  return{p:"notte",mod:{coraggio:1},bias:"danger",hint:"Notte. L'ora dei predatori.",dm:-1,icon:"🌙"}}

// ── STORY BIBLE VIVENTE — deterministic constraints for AI ─
function buildStoryBible(s){
  // NPC tone modulation: relationship → dialogue style
  const tone=(rel)=>rel>=4?"affettuoso, protettivo, voce calda":rel>=2?"amichevole, collaborativo":rel>=0?"neutro, professionale":rel>=-2?"freddo, diffidente, frasi corte":"ostile, sarcastico, minaccioso";
  const npcs={"Elena":{alive:!s.flags.elena_betrayed||true,rel:s.rels["Elena"]||0,tic:"si morde il labbro",tone:tone(s.rels["Elena"]||0)},
    "Ferrante":{alive:true,rel:s.rels["Ferrante"]||0,tic:"si tocca la cicatrice sulla mano",tone:tone(s.rels["Ferrante"]||0)},
    "Mara Voss":{alive:!s.flags.mara_dead,rel:s.rels["Mara Voss"]||0,tic:"sistema la fondina vuota",tone:tone(s.rels["Mara Voss"]||0)},
    "Valentina":{alive:true,rel:s.rels["Valentina"]||0,known:!!s.flags.v_trusted,tic:"accende una Gitanes",tone:tone(s.rels["Valentina"]||0)},
    "Carlo Sarris":{alive:true,rel:s.rels["Carlo Sarris"]||0,known:!!s.flags.sarris_met,tic:"si pulisce gli occhiali",tone:tone(s.rels["Carlo Sarris"]||0)}};
  const constraints=[];
  if(s.flags.mara_dead)constraints.push("Mara Voss è MORTA. Non può apparire, parlare o essere contattata.");
  if(s.flags.elena_betrayed)constraints.push("Elena ha tradito il protagonista. È diffidente e armata.");
  if(!s.flags.has_gun)constraints.push("Il protagonista NON ha un'arma.");
  if(!s.flags.has_anamnesis)constraints.push("Il protagonista NON ha l'ANAMNESIS.");
  s.inv.forEach(i=>constraints.push(`INVENTARIO: "${i}" — può essere usato.`));
  const circ=getCircadian();
  return `STORY BIBLE (VINCOLI INVIOLABILI):\nTEMPO REALE: ${circ.p} — ${circ.hint}\nNPC:${Object.entries(npcs).map(([n,v])=>`${n}(${v.alive?"vivo":"MORTO"},rel:${v.rel},TONO:"${v.tone}",tic:"${v.tic}"${v.known===false?",SCONOSCIUTO":""})`).join("; ")}\nISTRUZIONE TONO: Quando un NPC parla, il suo TONO deve riflettere la relazione. Un NPC ostile usa frasi corte e taglienti. Un NPC affettuoso usa frasi più lunghe e calde.\nVINCOLI:${constraints.join("; ")||"nessuno"}\nFLAGS:${Object.keys(s.flags).join(",")}\nSTATS:${JSON.stringify(s.stats)}`;
}

// ── NEMICO ADATTIVO — Ferrante learns your patterns ──────
function buildNemesisProfile(emo,traits,flags){
  const p=emo.profile();const aggressive=traits.filter(t=>["Audace","Esplosivo","Kamikaze","Letale","Furioso"].includes(t)).length;
  const sneaky=traits.filter(t=>["Furtivo","Calcolatore","Strategico","Metodico"].includes(t)).length;
  const talker=traits.filter(t=>["Diplomatico","Negoziatore","Connesso","Manipolatore"].includes(t)).length;
  let style="equilibrato";if(aggressive>sneaky&&aggressive>talker)style="aggressivo";else if(sneaky>aggressive&&sneaky>talker)style="furtivo";else if(talker>aggressive&&talker>sneaky)style="diplomatico";
  return`PROFILO NEMICO — Ferrante sa che il protagonista è ${style} (${p.style}). ${style==="aggressivo"?"Ferrante prepara trappole e imboscate. Non si espone mai direttamente.":style==="furtivo"?"Ferrante piazza telecamere e informatori. Conosce ogni mossa in anticipo.":style==="diplomatico"?"Ferrante porta avvocati e alibi. Ha documenti che contraddicono ogni accusa.":"Ferrante è cauto, prepara piani di riserva."}`;
}

// ── MEMORY PLAYBACK — NPC perspective scenes ─────────────
async function aiMemoryPlayback(sceneNar,npcName,npcCtx,storyBible){
  return await ai(`${STYLE_BIBLE}\n\n${storyBible}\n\nMEMORY PLAYBACK: Riscrivi questa scena DAL PUNTO DI VISTA di ${npcName}. ${npcCtx}
SCENA ORIGINALE (vista del protagonista): "${sceneNar.slice(0,400)}"
Riscrivi in 6-8 frasi, it, seconda persona (sei ${npcName}). Rivela cosa ${npcName} pensava, cosa sapeva che il protagonista non sapeva, e un segreto nascosto.`,800)
||`Attraverso gli occhi di ${npcName}, la scena appare diversa. Ogni dettaglio ha un significato che non avevi colto.`}
const CSS=`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.goldD}44;border-radius:2px}
@keyframes blink{0%,50%{opacity:.4}51%,100%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes choiceIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes glow{0%,100%{box-shadow:0 0 15px ${T.gold}11}50%{box-shadow:0 0 35px ${T.gold}22}}
@keyframes loadDot{0%,80%,100%{opacity:.15}40%{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
@keyframes moodPulse{0%,100%{opacity:.03}50%{opacity:.08}}
input,textarea{font-family:${T.f.b}}input:focus,textarea:focus{outline:none;border-color:${T.gold}55!important}`;
const CH_NAMES=["Prologo","La Verità Sotto","La Memoria Rubata","Il Progetto Mnemosyne","Epilogo"];
const MOOD_COLORS={calm:"60,120,180",tense:"180,150,60",danger:"180,40,40",mystery:"100,80,160",dread:"40,20,60",hope:"80,160,100"};

// ── STORAGE ──────────────────────────────────────────────
const ST={async save(k,v){try{await window.storage.set(k,JSON.stringify(v));return true}catch{return false}},async load(k){try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null}catch{return null}},async del(k){try{await window.storage.delete(k)}catch{}},async saveShared(k,v){try{await window.storage.set(k,JSON.stringify(v),true);return true}catch{return false}},async loadShared(k){try{const r=await window.storage.get(k,true);return r?JSON.parse(r.value):null}catch{return null}},async listShared(p){try{const r=await window.storage.list(p,true);return r?.keys||[]}catch{return[]}}};

// ── SOUNDSCAPE ───────────────────────────────────────────
class Snd{constructor(){this.c=null;this.m=null;this.l={};this.on=false}
init(){if(this.c){this.c.resume();return}this.c=new(window.AudioContext||window.webkitAudioContext)();this.c.resume();this.m=this.c.createGain();this.m.gain.value=.25;this.m.connect(this.c.destination);this.on=true}
noise(){const n=2*this.c.sampleRate,b=this.c.createBuffer(1,n,this.c.sampleRate),d=b.getChannelData(0);let v=0;for(let i=0;i<n;i++){v=(v+.02*(Math.random()*2-1))/1.02;d[i]=v*3.5}return b}
rain(){if(!this.c||this.l.r)return;const s=this.c.createBufferSource();s.buffer=this.noise();s.loop=true;const f=this.c.createBiquadFilter();f.type="bandpass";f.frequency.value=800;f.Q.value=.5;const g=this.c.createGain();g.gain.value=.1;s.connect(f);f.connect(g);g.connect(this.m);s.start();this.l.r={s,g,f};
  // Stereo drips — each drop panned randomly in 3D space
  const drip=()=>{if(!this.on)return;const o=this.c.createOscillator(),g2=this.c.createGain(),pan=this.c.createStereoPanner();
    o.type="sine";o.frequency.value=800+Math.random()*1400;
    pan.pan.value=(Math.random()*2-1)*0.7; // random L/R position
    g2.gain.setValueAtTime(.012,this.c.currentTime);g2.gain.exponentialRampToValueAtTime(.001,this.c.currentTime+.12);
    o.connect(g2);g2.connect(pan);pan.connect(this.m);o.start();o.stop(this.c.currentTime+.12);
    setTimeout(drip,1500+Math.random()*3500)};setTimeout(drip,800)}
mood(m){if(!this.l.r)return;const tgt={calm:350,tense:1200,danger:2200,mystery:550,dread:180,hope:900}[m]||800;
  this.l.r.f.frequency.linearRampToValueAtTime(tgt,this.c.currentTime+2);
  // Evolve rain intensity with mood
  this.l.r.g.gain.linearRampToValueAtTime(m==="danger"?0.18:m==="dread"?0.15:m==="hope"?0.06:.1,this.c.currentTime+2);
  // Stereo chord layer — each note slightly panned for spatial depth
  const ct=this.c.currentTime;const ch={calm:[261,329,392],tense:[220,261,329],danger:[196,233,293],mystery:[246,293,349],dread:[174,207,261],hope:[329,415,493]};(ch[m]||ch.mystery).forEach((f,i)=>{const o=this.c.createOscillator(),g=this.c.createGain(),pan=this.c.createStereoPanner();
    o.type=m==="danger"?"sawtooth":"triangle";o.frequency.value=f;pan.pan.value=[-0.4,0,0.4][i]||0;
    g.gain.setValueAtTime(0,ct);g.gain.linearRampToValueAtTime(.014,ct+.5+i*.2);g.gain.linearRampToValueAtTime(0,ct+5);
    o.connect(g);g.connect(pan);pan.connect(this.m);o.start();o.stop(ct+5)});
  // Heartbeat layer for danger/dread
  if(m==="danger"||m==="dread"){const rate=m==="danger"?0.5:.7;const hb=()=>{if(!this.on)return;const o=this.c.createOscillator(),g=this.c.createGain();o.type="sine";o.frequency.value=50;g.gain.setValueAtTime(.03,this.c.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.c.currentTime+.15);o.connect(g);g.connect(this.m);o.start();o.stop(this.c.currentTime+.15);setTimeout(()=>{if(!this.on)return;const o2=this.c.createOscillator(),g2=this.c.createGain();o2.type="sine";o2.frequency.value=45;g2.gain.setValueAtTime(.02,this.c.currentTime);g2.gain.exponentialRampToValueAtTime(.001,this.c.currentTime+.12);o2.connect(g2);g2.connect(this.m);o2.start();o2.stop(this.c.currentTime+.12)},150)};hb();this._hbIv=setInterval(hb,rate*1000)}else{if(this._hbIv){clearInterval(this._hbIv);this._hbIv=null}}}
sfx(t){if(!this.c)return;const ct=this.c.currentTime;
  if(t==="dice")for(let i=0;i<6;i++){const o=this.c.createOscillator(),g=this.c.createGain();o.type="square";o.frequency.value=200+Math.random()*600;g.gain.setValueAtTime(.05,ct+i*.07);g.gain.exponentialRampToValueAtTime(.001,ct+i*.07+.05);o.connect(g);g.connect(this.m);o.start(ct+i*.07);o.stop(ct+i*.07+.05)}
  else if(t==="ok")[523,659,784].forEach((f,i)=>{const o=this.c.createOscillator(),g=this.c.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(.06,ct+i*.12);g.gain.exponentialRampToValueAtTime(.001,ct+i*.12+.4);o.connect(g);g.connect(this.m);o.start(ct+i*.12);o.stop(ct+i*.12+.4)})
  else if(t==="fail")[200,170].forEach((f,i)=>{const o=this.c.createOscillator(),g=this.c.createGain();o.type="sawtooth";o.frequency.value=f;g.gain.setValueAtTime(.05,ct+i*.25);g.gain.exponentialRampToValueAtTime(.001,ct+i*.25+.5);o.connect(g);g.connect(this.m);o.start(ct+i*.25);o.stop(ct+i*.25+.5)})
  else if(t==="tension"){const o=this.c.createOscillator(),o2=this.c.createOscillator(),g=this.c.createGain();o.type="sawtooth";o.frequency.value=50;o2.type="sine";o2.frequency.value=52;g.gain.setValueAtTime(0,ct);g.gain.linearRampToValueAtTime(.04,ct+1);g.gain.linearRampToValueAtTime(0,ct+3);o.connect(g);o2.connect(g);g.connect(this.m);o.start();o2.start();o.stop(ct+3);o2.stop(ct+3)}
  else if(t==="reveal"){const o=this.c.createOscillator(),g=this.c.createGain();o.type="sine";o.frequency.setValueAtTime(220,ct);o.frequency.exponentialRampToValueAtTime(880,ct+.5);g.gain.setValueAtTime(.04,ct);g.gain.exponentialRampToValueAtTime(.001,ct+.7);o.connect(g);g.connect(this.m);o.start();o.stop(ct+.7)}
  else if(t==="combat"){[110,138,165].forEach((f,i)=>{const o=this.c.createOscillator(),g=this.c.createGain();o.type="sawtooth";o.frequency.value=f;g.gain.setValueAtTime(0,ct);g.gain.linearRampToValueAtTime(.025,ct+.5+i*.3);g.gain.linearRampToValueAtTime(0,ct+4);o.connect(g);g.connect(this.m);o.start();o.stop(ct+4)})}}
destroy(){this.on=false;if(this._hbIv){clearInterval(this._hbIv);this._hbIv=null}try{this.c?.close()}catch{};this.c=null;this.l={}}}

// ── VOICE: ENHANCED WEB SPEECH (ElevenLabs blocked by sandbox) ──
// NOTE: ElevenLabs requires backend proxy (CORS). Will work in native app.
// This Web Speech engine is optimized for maximum immersion.
class Voce{
  constructor(){this.enabled=false;this.speaking=false;this.engine="none";this.mood="mystery";
    this.syn=window.speechSynthesis||null;this.wsVoice=null;this.allVoices=[];this._q=[];this._init()}
  _init(){if(!this.syn)return;
    const pick=()=>{this.allVoices=(this.syn.getVoices()||[]).slice();if(!this.allVoices.length)return;
      // Best voices ranked: Google Italian > Apple Italian > Microsoft Italian > any Italian > Google female > any
      const rank=[
        v=>v.lang.startsWith("it")&&/google/i.test(v.name),
        v=>v.lang.startsWith("it")&&/alice|federica|elsa/i.test(v.name),
        v=>v.lang.startsWith("it")&&/microsoft/i.test(v.name),
        v=>v.lang==="it-IT",
        v=>v.lang.startsWith("it"),
        v=>/google/i.test(v.name)&&/female|it/i.test(v.name),
        v=>/samantha|victoria|karen|zira|hazel|amelie|fiona/i.test(v.name),
        ()=>true
      ];
      for(const fn of rank){const found=this.allVoices.find(fn);if(found){this.wsVoice=found;break}}};
    pick();
    if(typeof this.syn.addEventListener==="function")this.syn.addEventListener("voiceschanged",pick);
    setTimeout(pick,200);setTimeout(pick,800);setTimeout(pick,2500)}
  setMood(m){this.mood=m||"mystery"}
  enable(){this.enabled=true;this.engine="webspeech"}
  disable(){this.enabled=false;this.stop();this.engine="none"}
  stop(){this.speaking=false;this._q=[];try{this.syn?.cancel()}catch{}}
  async speak(text){
    if(!this.enabled||!text||!this.syn)return;this.stop();
    // Clean text
    let clean=text.replace(/\n+/g," ").replace(/["""\*\(\)_]/g,"").replace(/\s+/g," ").trim();
    if(!clean||clean.length<2)return;
    this.speaking=true;this.engine="webspeech";
    // Split into sentences for dramatic delivery
    const raw=clean.split(/(?<=[.!?…;:])\s+/).filter(s=>s.length>1);
    if(!raw.length)raw.push(clean);
    // Mood params: rate, pitch, base pause, rate jitter
    const mp={
      calm:   {r:0.87, p:1.05, pause:450, jit:0.04},
      tense:  {r:0.93, p:0.98, pause:280, jit:0.06},
      danger: {r:0.98, p:0.93, pause:200, jit:0.08},
      mystery:{r:0.84, p:1.06, pause:520, jit:0.03},
      dread:  {r:0.76, p:0.90, pause:650, jit:0.02},
      hope:   {r:0.90, p:1.10, pause:380, jit:0.04}
    }[this.mood]||{r:0.85,p:1.05,pause:400,jit:0.04};
    // Deliver sentences sequentially
    let i=0;this._q=raw.slice();
    const next=()=>{
      if(i>=this._q.length||!this.enabled){this.speaking=false;return}
      try{this.syn.cancel()}catch{};
      const s=this._q[i];
      const utt=new SpeechSynthesisUtterance(s);
      utt.lang="it-IT";
      // Micro-variation per sentence for natural feel
      utt.rate=mp.r+(Math.random()*2-1)*mp.jit;
      utt.pitch=mp.p;
      utt.volume=i===0?0.9:0.95; // Slightly softer start
      if(this.wsVoice)utt.voice=this.wsVoice;
      // Calculate pause based on sentence ending
      let pause=mp.pause;
      if(s.endsWith("…"))pause=mp.pause*1.5;
      else if(s.endsWith("?"))pause=mp.pause*1.2;
      else if(s.endsWith("!"))pause=mp.pause*0.7;
      else if(s.endsWith(";")|| s.endsWith(":"))pause=mp.pause*0.8;
      // Quoted speech: slightly lower pitch
      if(s.includes("\""))utt.pitch=mp.p*0.93;
      utt.onend=()=>{i++;if(i<this._q.length)setTimeout(next,pause);else this.speaking=false};
      utt.onerror=()=>{i++;if(i<this._q.length)setTimeout(next,100);else this.speaking=false};
      try{this.syn.speak(utt)}catch{this.speaking=false}};
    // Initial breath pause before speaking
    setTimeout(next,300)}
}

// ── AI ───────────────────────────────────────────────────
async function ai(p,max=1024){try{const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:p,max_tokens:max})});const d=await r.json();return d.text||null}catch{return null}}
async function aiJSON(p){const r=await ai(p,1200);if(!r)return null;try{return JSON.parse(r.replace(/```json|```/g,"").trim())}catch{return null}}

// ── SKILL TREE ───────────────────────────────────────────
const SKILLS={
  Audace:[{n:"Bluff Disperato",d:"Skill Bleed +3",s:"coraggio",r:6,i:"🎲"},{n:"Intimidazione",d:"Forza NPC a cooperare",s:"coraggio",r:8,i:"👊"}],
  Metodico:[{n:"Scansione",d:"Rivela indizi nascosti",s:"istinto",r:6,i:"🔎"},{n:"Deduzione",d:"Collega indizi",s:"istinto",r:8,i:"🧩"}],
  Analitico:[{n:"Profiling",d:"Leggi intenzioni NPC",s:"intelletto",r:6,i:"🧠"},{n:"Ricostruzione",d:"Ricostruisci eventi",s:"intelletto",r:8,i:"📊"}],
  Furtivo:[{n:"Ombra",d:"+2 furtività",s:"istinto",r:6,i:"🌑"},{n:"Invisibile",d:"Salta scontri",s:"istinto",r:8,i:"💨"}],
  Diplomatico:[{n:"Empatia Tattica",d:"+2 negoziazione",s:"fascino",r:6,i:"💬"},{n:"Compromesso",d:"Soluzioni win-win",s:"fascino",r:8,i:"⚖️"}],
  Esplosivo:[{n:"Primo Colpo",d:"+3 round 1 combattimento",s:"coraggio",r:6,i:"💥"},{n:"Furia",d:"Doppio danno",s:"coraggio",r:8,i:"🔥"}],
  Calcolatore:[{n:"Previsione",d:"Vedi probabilità",s:"intelletto",r:6,i:"📐"},{n:"Piano B",d:"Ritira dado fallito",s:"intelletto",r:8,i:"♻️"}],
};
function getSkills(traits,stats){const u=[];traits.forEach(t=>{(SKILLS[t]||[]).forEach(s=>{if(stats[s.s]>=s.r)u.push({...s,trait:t})})});return u}

// ── COMBAT TACTICS ───────────────────────────────────────
const TACTICS=[
  {id:"attack",n:"Attacca",i:"⚔️",s:"coraggio",b:2,d:"Colpisci con forza"},
  {id:"defend",n:"Difendi",i:"🛡️",s:"istinto",b:1,d:"Riduci danno"},
  {id:"evade",n:"Schiva",i:"💨",s:"istinto",b:3,d:"Evita — ma doppio danno se fallisci"},
  {id:"talk",n:"Parla",i:"💬",s:"fascino",b:0,d:"Tenta di fermare lo scontro"},
];

// ── NEGOTIATION STANCES ──────────────────────────────────
const STANCES=[
  {id:"pressure",n:"Pressione",i:"👊",s:"coraggio",d:"Forza la mano"},
  {id:"charm",n:"Fascino",i:"✨",s:"fascino",d:"Conquista"},
  {id:"logic",n:"Logica",i:"🧠",s:"intelletto",d:"Argomenta"},
  {id:"bluff",n:"Bluff",i:"🃏",s:"fascino",d:"Alto rischio, alta ricompensa"},
];

// ── GHOST ECHOES ─────────────────────────────────────────
const GHOSTS={c0_start:["Il barista dice che un tipo nervoso è entrato un'ora fa.","Scarpe bagnate sulla scala. Qualcuno ti precede."],c0_lobby:["Un gradino cigola diversamente.","Due impronte sul filtro della sigaretta."],c0_stairs:["Sul muro, pennarello fresco: NON APRIRE."],c1_dawn:["All'archivio, l'impiegata: 'Sei il secondo oggi.'"],c2_lethe:["Impronte fresche nel parcheggio. Non sei il primo investigatore."],c3_start:["Il porto puzza di sale e decisioni sbagliate.","Un gabbiano ti fissa. Sa qualcosa che tu non sai."],c3_climax:["Sotto il container, un telefono rotto. Non è il tuo. Ma è il tuo numero."],c3_standoff:["Il vento porta l'eco di una sirena. O forse è solo il mare."]};

// ── STYLE BIBLE (baked into every AI call) ───────────────
const STYLE_BIBLE=`REGOLE NARRATIVE INVIOLABILI:
1. Ogni scena ha UN dettaglio sensoriale specifico (odore, suono, texture) — MAI descrizioni meteo generiche
2. Il protagonista ha pensieri interiori sarcastici e taglienti
3. Ogni NPC ha un tic: Ferrante si tocca la cicatrice, Elena si morde il labbro, Valentina fuma, Sarris si pulisce gli occhiali
4. Le frasi brevi creano tensione. Le frasi lunghe creano immersione. Alterna.
5. Usa sempre il presente e la seconda persona singolare
6. MAI scrivere "la pioggia non smette" o "le ombre si muovono" — troppo generico
7. I colpi di scena arrivano nell'ultima frase, mai prima
8. Ogni scelta deve avere conseguenze VISIBILI nella narrazione successiva
9. Il tono è Raymond Chandler tradotto in italiano: cinico, poetico, mai melodrammatico`;

// ── QUEST OBJECTIVES ─────────────────────────────────────
const QUESTS={
  c0_start:"Scopri chi ti ha mandato il messaggio",c0_lobby:"Raggiungi la stanza 312",c0_alley:"Trova un ingresso nell'Hotel Minerva",
  c0_cig:"Esamina la sigaretta nella hall",c0_hall:"Cerca indizi dietro il bancone",
  c0_call:"Decidi se coinvolgere Mara Voss",c0_mara_info:"Scopri cosa sa Mara sull'Hotel",c0_mara:"Incontra Mara Voss",
  c0_stealth:"Infiltrati nel secondo piano",c0_knock:"Scopri chi c'è dietro il vetro",c0_elev:"Prendi l'ascensore",
  c0_stairs:"Entra nella stanza 312",c0_eaves:"Ascolta dalla porta",c0_retreat:"Accedi al computer dell'archivio",
  c0_room:"Irrompi nella 312",c0_surr:"Confronta l'uomo in ombra",
  c0_conf:"Scopri la verità su Ferrante",c0_elena:"Ascolta Elena Sarris",c0_mirror:"Scopri chi sei diventato",
  c1_dawn:"Trova il fascicolo Minerva-1987",c1_archive:"Accedi all'archivio comunale",c1_arch_res:"Esamina i risultati dell'archivio",c1_trace:"Scopri chi è V.",
  c1_meet_v:"Incontra Valentina Rini",c1_hotel:"Indaga l'Hotel Minerva di giorno",c1_312b:"Esplora il laboratorio 312B",
  c1_rev:"Affronta la rivelazione",c1_end:"Preparati per ciò che viene",
  c2_start:"Pianifica la prossima mossa",c2_lethe:"Infiltrati nel complesso Lethe",c2_watch:"Identifica il capo",
  c2_follow:"Segui la pista fino a Sarris",c2_elena:"Confronta Elena sulla verità",c2_val:"Trova l'antidoto ANAMNESIS",
  c2_sarris:"Negozia con Carlo Sarris",c2_lab:"Recupera l'ANAMNESIS dalla Stanza L-7",
  c2_elena_conf:"Confronta Elena sulla verità",c2_deep:"Scopri i segreti di Sarris",
  c2_end:"Preparati per il capitolo finale",c2_twist:"Affronta il tradimento",
  c3_start:"Decidi il destino del Progetto Mnemosyne",c3_expose:"Pubblica la verità",c3_compromise:"Negozia lo smantellamento",
  c3_remember:"Usa l'ANAMNESIS — ricorda tutto",c3_destroy:"Distruggi il laboratorio Lethe",
  c1_mirror_tape:"Ascolta la registrazione",c2_mara_danger:"Salva Mara — o scegli le memorie",
  c3_climax:"Confronto finale con Ferrante",c3_standoff:"Sopravvivi allo scontro",
  c3_deal:"Ultima trattativa — i nomi hanno un prezzo",c3_sacrifice:"Distruggi le prove",
  c3_alliance:"Esegui il piano coordinato",c3_final:"L'alba dopo la notte più lunga",
};

// ── SUSSURRO — timed narrative events ────────────────────
const SUSSURRI=[
  {after:2,text:"Il tuo telefono vibra. Schermo nero. Una parola: \"Mnemosyne.\"",cond:()=>true},
  {after:3,text:"La pioggia si è fermata. Per la prima volta in giorni. Sembra un presagio.",cond:()=>true},
  {after:4,text:"Elena ha provato a chiamarti. Tre volte. Non ha lasciato messaggi.",cond:s=>!s.elena_betrayed},
  {after:5,text:"Un messaggio da V.: \"Non fidarti del prossimo che incontri.\"",cond:s=>s.v_trusted},
  {after:6,text:"Un giornale del mattino: \"Fondazione Sarris sotto indagine.\" Qualcuno ha parlato.",cond:s=>s.knows_mnemosyne},
  {after:7,text:"Ferrante sa dove sei. Lo senti. Come un prurito sulla nuca.",cond:s=>s.knows_ferrante},
  {after:8,text:"Mara ti ha mandato una foto: la targa della limousine. Completa.",cond:s=>s.mara_ally&&!s.mara_dead},
  {after:9,text:"Ti svegli con il sapore del basilico in bocca. Un ricordo che non è tuo. O lo era.",cond:s=>s.memory_fragment_1},
  {after:11,text:"Un SMS senza numero: \"Soggetto 7 riattivato. Procedura di contenimento autorizzata.\"",cond:()=>true},
  {after:13,text:"Elena è online. Scrive. Cancella. Scrive. Cancella. Il telefono mostra tre punti per cinque minuti.",cond:s=>!s.elena_betrayed},
  {after:15,text:"Qualcuno ha lasciato un biglietto sotto la porta: una sola parola, \"RICORDA\", scritta con la tua calligrafia.",cond:s=>s.memory_fragment_2},
  {after:17,text:"Le voci nella tua testa non sono voci. Sono ricordi che tornano a galla, uno alla volta, come cadaveri in un fiume.",cond:s=>s.has_anamnesis},
  {after:19,text:"Mara non risponde. Da tre ore. Non è da lei.",cond:s=>s.mara_ally&&!s.mara_dead&&!s.mara_saved},
  {after:22,text:"Una telefonata muta. Respiro pesante. Poi: il suono della pioggia. La stessa pioggia di qui. Qualcuno è vicino.",cond:()=>true},
  {after:25,text:"Trovi un articolo di giornale datato domani. Il titolo parla di te. L'articolo è vuoto.",cond:s=>s.knows_mnemosyne},
];

// ── ACHIEVEMENTS ─────────────────────────────────────────
const ACHS=[
  {id:"first_step",n:"Primo Passo",d:"Entra nell'Hotel Minerva",i:"🚪",c:(_,f)=>f.entered_front||f.entered_back},
  {id:"armed",n:"Armato e Pericoloso",d:"Ottieni la Beretta di Mara",i:"🔫",c:(_,f)=>f.has_gun},
  {id:"detective",n:"Detective Nato",d:"Intelletto raggiunge 8",i:"🔍",c:(s)=>s.intelletto>=8},
  {id:"brave",n:"Senza Paura",d:"Coraggio raggiunge 8",i:"⚡",c:(s)=>s.coraggio>=8},
  {id:"conspiracy",n:"La Ragnatela",d:"Scopri la conspiracy board",i:"🕸️",c:(_,f)=>f.saw_conspiracy},
  {id:"v_found",n:"Chi è V.?",d:"Scopri l'identità di Valentina",i:"📞",c:(_,f)=>f.v_trusted||f.traced_v},
  {id:"lab",n:"Il Laboratorio",d:"Scopri la stanza 312B o il lab Lethe",i:"🧪",c:(_,f)=>f.lab_discovered||f.found_key_312b},
  {id:"memory",n:"Frammento",d:"Recupera un frammento di memoria",i:"💭",c:(_,f)=>f.memory_fragment_1},
  {id:"mnemosyne",n:"Mnemosyne",d:"Scopri il Progetto",i:"🧠",c:(_,f)=>f.knows_mnemosyne},
  {id:"anamnesis",n:"L'Antidoto",d:"Ottieni l'ANAMNESIS",i:"💊",c:(_,f)=>f.has_anamnesis},
  {id:"saved_mara",n:"Nessuno Resta Indietro",d:"Salva Mara sul tetto",i:"🛡️",c:(_,f)=>f.mara_saved},
  {id:"loss",n:"Il Prezzo",d:"Perdi qualcuno per sempre",i:"💀",c:(_,f)=>f.mara_dead},
  {id:"remember",n:"Ricordo",d:"Usa l'ANAMNESIS per ricordare",i:"🌊",c:(_,f)=>f.full_truth||f.chose_remember},
  {id:"finale",n:"L'Alba",d:"Raggiungi l'epilogo",i:"🌅",c:(_,f,ch)=>ch>=4},
  {id:"alliance",n:"Non Sei Solo",d:"Vinci con l'alleanza",i:"🤝",c:(_,f)=>f.alliance_victory},
  {id:"destroyer",n:"Cenere",d:"Distruggi tutto",i:"🔥",c:(_,f)=>f.destroyed_all||f.files_destroyed},
];

// ── PREVIOUSLY ON ────────────────────────────────────────
async function aiRecap(s){
  return await ai(`${STYLE_BIBLE}\n\n"Previously on NOIRE..." Genera un recap in 3-4 frasi. STATO: Cap.${s.ch}, Tratti:${s.traits?.join(",")||"nessuno"}, Flags:${Object.keys(s.flags||{}).join(",")||"nessuno"}, Diario:${(s.journal||[]).slice(-5).map(j=>j.text).join(";")}.
Stile: voiceover noir femminile, italiano, seconda persona. Breve e drammatico. Ricorda al giocatore DOV'ERA e COSA stava facendo.`,400)
  ||"La pioggia. I segreti. Un hotel che nasconde più di quanto mostri. E tu, al centro di tutto. Dove eravamo rimasti..."
}

// ── PATTERN BREAKER — anti-repetition every 5-13 scenes ──
const BREAKS=[
  {t:"silence",e:5,nar:"Il mondo non ti chiede niente. Ti guarda e basta. La pioggia scende. Tu respiri. Per un istante, non ci sono decisioni — solo esistere."},
  {t:"forced",e:7,nar:"Non hai scelta. Non questa volta.",ch:{text:"Andare avanti è l'unica opzione.",stat:{coraggio:1}}},
  {t:"wall",e:11,nar:"Fermati un secondo. Sì, tu. Quello con il telefono in mano.\n\nHai notato che piove sempre quando devi decidere qualcosa di importante? Non è un caso. Qualcuno ha scritto questa pioggia per te.\n\nMa la scelta — quella è tua. Davvero tua."},
  {t:"flash",e:9,pre:"[FLASH — 3 ore prima]\n\n"},
  {t:"pov",e:13},
];
function getBreak(sc){return BREAKS.find(b=>sc>4&&sc%b.e===0)||null}

// ── REALITY BREACH — story invades the phone ─────────────
const BREACH_MSGS=[
  {from:"Elena Sarris",text:"Mi hai lasciata sola. Rispondi.",cond:s=>!s.elena_betrayed&&s.knows_mnemosyne,after:10},
  {from:"Numero Sconosciuto",text:"Soggetto 7. Lo sappiamo.",cond:()=>true,after:14},
  {from:"Mara Voss",text:"Non venire al porto domani. Ti prego.",cond:s=>s.mara_ally&&!s.mara_dead,after:18},
  {from:"M. Ferrante",text:"Hai qualcosa che mi appartiene.",cond:s=>s.has_anamnesis,after:20},
  {from:"V.R.",text:"Bruciali tutti. Non fidarti di nessuno.",cond:s=>s.v_trusted,after:22},
];

// ── WHISPER MODE — microphone stealth challenge ──────────
class WhisperDetector{
  constructor(){this.active=false;this.stream=null;this.analyser=null;this.ctx=null;this.onLoud=null;this._raf=null}
  async start(onLoud){this.onLoud=onLoud;
    try{this.stream=await navigator.mediaDevices.getUserMedia({audio:true});
      this.ctx=new(window.AudioContext||window.webkitAudioContext)();
      const src=this.ctx.createMediaStreamSource(this.stream);
      this.analyser=this.ctx.createAnalyser();this.analyser.fftSize=256;
      src.connect(this.analyser);this.active=true;this._loop();return true}
    catch{this.active=false;return false}}
  _loop(){if(!this.active)return;const data=new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);const rms=Math.sqrt(data.reduce((a,v)=>a+v*v,0)/data.length);
    if(rms>42)this.onLoud?.();this._raf=requestAnimationFrame(()=>this._loop())}
  stop(){this.active=false;if(this._raf)cancelAnimationFrame(this._raf);
    try{this.stream?.getTracks().forEach(t=>t.stop())}catch{};try{this.ctx?.close()}catch{}}
}

// ── SCENA DEL GIORNO — daily global scene ────────────────
function dailySeed(){const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
async function aiDaily(seed){
  return await aiJSON(`${STYLE_BIBLE}\n\nSCENA DEL GIORNO (seed:${seed}). Scena standalone noir, it, 2a persona. Dilemma morale unico. Memorabile. 8-10 frasi.
SOLO JSON:{"title":"titolo","narration":"testo","choices":[{"text":"scelta","trait":"Tratto"}],"mood":"tense"}`)||
  {title:"L'Uomo al Bar",narration:"Un uomo al bancone ti fissa. Non lo conosci. Lui sì.\n\n\"Siediti. Ho qualcosa che è tuo.\"\n\nSpinge una busta. Dentro, una foto che non dovresti avere.\n\n\"Non aprirla qui.\" Se ne va.\n\nLa busta pesa come un segreto.",choices:[{text:"Apro la busta."},{text:"La brucio.",trait:"Prudente"},{text:"Seguo l'uomo.",trait:"Audace"}],mood:"mystery"}}

// ── HAPTICS ──────────────────────────────────────────────
const haptic=(type)=>{if(!navigator.vibrate)return;const V=navigator.vibrate.bind(navigator);
  if(type==="impact")V(25);
  else if(type==="dice")V([15,30,15,30,15,30,15,30,60]);
  else if(type==="success")V([10,40,10,40,10,80,200]); // rising triumph
  else if(type==="fail")V([80,40,60,40,40]); // deflating
  else if(type==="reveal")V([5,15,5,15,5,15,5,15,5,15,300]); // buildup → payoff
  else if(type==="moral")V([150,80,150,80,150,80,300]); // heavy heartbeat → long hold
  else if(type==="tension"){let i=0;const iv=setInterval(()=>{V(8+i*4);i++;if(i>15)clearInterval(iv)},80)} // accelerating pulse
  else if(type==="combat_hit")V([40,20,60]); // punch impact
  else if(type==="combat_miss")V([10,50,10]); // whiff
  else if(type==="npc_death")V([50,60,35,80,20,100,10]); // fading heartbeat → silence
  else if(type==="pulse_tick")V(8); // subtle tick for pulse lock
  else if(type==="pulse_release")V([200,50,100]); // relief exhale
};
// ── EMOTIONAL MEMORY ─────────────────────────────────────
class Emo{constructor(){this.h=[];this.sb=0;this.panels=0}
  tick(ms){this.h.push(ms)}
  sbTick(){this.sb++}
  panelTick(){this.panels++}
  profile(){const avg=this.h.length?this.h.reduce((a,b)=>a+b,0)/this.h.length:5000;return{style:avg>15000?"riflessivo":avg>8000?"ponderato":avg>3000?"decisivo":"impulsivo",avg:Math.round(avg),analytical:this.panels>5,creative:this.sb>2,n:this.h.length}}}

// ═══════════════════════════════════════════════════════════
//   C A M P A I G N   D A T A   —   5 5 +   S C E N E S
// ═══════════════════════════════════════════════════════════
const SC=[
  // ─── CH0: PROLOGO ──────────────────────────────────────
  {id:"c0_start",ch:0,loc:"Auto — Quartiere Portuale",mood:"tense",sb:true,
    nar:"La pioggia picchia sul parabrezza come proiettili d'argento. Il cruscotto lampeggia: 2:47 AM.\n\nIl telefono vibra — un messaggio da un numero sconosciuto:\n\n\"Terzo piano. Stanza 312. Vieni solo, o lei muore.\"\n\nL'indirizzo è un vecchio hotel nel quartiere portuale. Il motore gira al minimo. La città dorme, ma non in pace.",
    choices:[
      {text:"Entro dalla porta principale.",next:"c0_lobby",trait:"Audace",stat:{coraggio:2,istinto:-1},fl:["entered_front"],jrn:"Ingresso frontale Hotel Minerva"},
      {text:"Cerco un ingresso secondario.",next:"c0_alley",trait:"Metodico",stat:{istinto:2,fascino:-1},fl:["entered_back"],jrn:"Approccio laterale via vicolo"},
      {text:"Chiamo un vecchio contatto.",next:"c0_call",stat:{fascino:2,coraggio:-1},fl:["called_mara"],jrn:"Chiamata a Mara Voss"},
    ]},
  {id:"c0_lobby",ch:0,loc:"Hall — Hotel Minerva",mood:"mystery",sb:true,
    nar:"La hall dell'Hotel Minerva: carta da parati che si stacca, bancone di mogano deserto.\n\nUna sigaretta ancora accesa nel portacenere. Il fumo sale in spirali lente.\n\nScale davanti. Ascensore semiaperto a sinistra. Passi dal piano superiore.",
    choices:[
      {text:"Le scale. Voglio sentire ogni gradino.",next:"c0_stairs",stat:{istinto:1},jrn:"Scale verso il terzo piano"},
      {text:"La sigaretta. Qualcuno era qui.",next:"c0_cig",stat:{intelletto:2},jrn:"Sigaretta con messaggio di V."},
      {text:"L'ascensore. Tempo stringe.",next:"c0_elev",stat:{coraggio:1,istinto:-1},dice:{t:12,l:"Riflessi"},jrn:"Ascensore — rischio"},
    ]},
  {id:"c0_cig",ch:0,loc:"Hall",mood:"mystery",
    nar:"Gitanes Brunes. Senza filtro. Rossetto cupo sul filtro. Sotto la cenere, un biglietto:\n\n\"Non è quello che sembra. — V.\"\n\nCalligrafia elegante, tremante.",
    choices:[
      {text:"Tengo il biglietto e salgo.",next:"c0_stairs",stat:{intelletto:2},inv:"Biglietto di V.",fl:["found_note_v"],jrn:"V. — chi è?"},
      {text:"Cerco altre tracce nella hall.",next:"c0_hall",stat:{istinto:1,intelletto:1},jrn:"Perquisizione hall"},
    ]},
  {id:"c0_hall",ch:0,loc:"Hall",mood:"mystery",
    nar:"Dietro il bancone: registro polveroso. Ultima firma cancellata — \"...rini\".\n\nNel cassetto, una chiave: \"312B\". Non 312. Una seconda stanza?",
    choices:[
      {text:"Prendo la chiave 312B.",next:"c0_stairs",stat:{istinto:2},inv:"Chiave 312B",fl:["found_key_312b"],jrn:"Chiave 312B trovata"},
      {text:"Ignoro. 312, non 312B.",next:"c0_stairs",stat:{coraggio:1},jrn:"312B ignorata"},
    ]},
  {id:"c0_alley",ch:0,loc:"Vicolo — Hotel Minerva",mood:"tense",sb:true,
    nar:"Vicolo. Pesce marcio. Scala antincendio arrugginita. Finestra socchiusa, candela dentro.\n\nAl secondo pianerottolo: sagoma immobile oltre il vetro. Troppo immobile.",
    choices:[
      {text:"Entro dalla finestra. Piano.",next:"c0_stealth",trait:"Furtivo",stat:{istinto:2},jrn:"Infiltrazione"},
      {text:"Busso sul vetro.",next:"c0_knock",stat:{coraggio:1,fascino:1},jrn:"Provocazione"},
      {text:"Diritto al terzo piano.",next:"c0_stairs",stat:{intelletto:1},jrn:"Terzo piano diretto"},
    ]},
  {id:"c0_call",ch:0,loc:"Auto",mood:"calm",sb:true,
    nar:"\"Sai che ore sono?\"\n\nMara Voss. Ex poliziotta, investigatrice privata.\n\n\"L'Hotel Minerva. Merda. Dammi quindici minuti. Non entrare dalla porta principale.\"",
    choices:[
      {text:"La aspetto.",next:"c0_mara",stat:{fascino:1,intelletto:1},rel:{n:"Mara Voss",d:2},jrn:"Atteso Mara"},
      {text:"Non aspetto.",next:"c0_alley",stat:{coraggio:2,fascino:-1},rel:{n:"Mara Voss",d:-1},jrn:"Senza Mara"},
      {text:"\"Cosa sai dell'Hotel?\"",next:"c0_mara_info",stat:{intelletto:2},rel:{n:"Mara Voss",d:1},jrn:"Intel da Mara"},
    ]},
  {id:"c0_mara_info",ch:0,loc:"Auto",mood:"mystery",
    nar:"\"Tre anni fa. Ragazza scomparsa. Stanza 312. Sedia vuota e registrazione audio. La voce era la sua — in una stanza vuota.\"\n\n\"Chi ti ha mandato quel messaggio lo sa. E sa che ci cascherai.\"",
    choices:[
      {text:"\"Vieni con me, Mara.\"",next:"c0_mara",trait:"Leale",stat:{fascino:2},rel:{n:"Mara Voss",d:3},fl:["mara_ally"],jrn:"Mara coinvolta"},
      {text:"\"Ci vado solo.\"",next:"c0_alley",trait:"Solitario",stat:{coraggio:2,istinto:1},rel:{n:"Mara Voss",d:-1},jrn:"Solo"},
    ]},
  {id:"c0_mara",ch:0,loc:"Auto",mood:"calm",
    nar:"Mara arriva. Volvo nera. Whisky e polvere da sparo.\n\n\"Riciclaggio Ferrante fino al 2019. Poi comprato da un fantasma.\"\n\nTi passa una Beretta. \"Non farmi pentire.\"",
    choices:[
      {text:"Prendo la pistola.",next:"c0_alley",trait:"Armato",stat:{coraggio:2},inv:"Beretta",fl:["has_gun","mara_ally"],rel:{n:"Mara Voss",d:1},jrn:"Armato"},
      {text:"Rifiuto.",next:"c0_alley",trait:"Pacifista",stat:{intelletto:1,fascino:2},fl:["mara_ally"],rel:{n:"Mara Voss",d:1},jrn:"Arma rifiutata"},
    ]},
  {id:"c0_stealth",ch:0,loc:"2° Piano",mood:"tense",
    nar:"Dentro: ufficio abbandonato. Sul muro, decine di foto con fili rossi — un'indagine parallela. Politici, un giudice.\n\nAl centro: foto senza volto, punto interrogativo.\n\nSotto: il tuo nome.",
    choices:[
      {text:"Strappo la mia foto.",next:"c0_stairs",stat:{coraggio:1,istinto:1},fl:["saw_conspiracy"],jrn:"La mia foto nell'indagine"},
      {text:"Fotografo tutto.",next:"c0_stairs",stat:{intelletto:2},inv:"Foto indagine",fl:["saw_conspiracy"],jrn:"Indagine documentata"},
    ]},
  {id:"c0_knock",ch:0,loc:"2° Piano",mood:"mystery",
    nar:"Un manichino. Tuo cappotto, tuo volto.\n\n\"Stavi guardando te stesso.\"\n\nPorta aperta verso il corridoio.",
    choices:[{text:"Alla 312.",next:"c0_stairs",stat:{istinto:2},jrn:"Manichino-replica"}]},
  {id:"c0_elev",ch:0,loc:"Ascensore",mood:"danger",next:"c0_stairs",
    nar:"L'ascensore scricchiola. Le porte si chiudono. Il buio ti avvolge.",
    okN:"Secondo piano — stop. Buio. Luce: foto sul pavimento. Donna bendata. Retro: \"Tick tock.\" Terzo piano.",
    failN:"Bloccato. Buio. Passi sopra. \"Impaziente.\" Gas dalle griglie. Ti svegli nella 312, legato."},
  {id:"c0_stairs",ch:0,loc:"Corridoio 3° Piano",mood:"danger",sb:true,moral:true,type:"tension",
    nar:"312 in fondo. Porta socchiusa. Voce maschile. Click di pistola.",
    choices:[
      {text:"Sfondo la porta.",next:"c0_room",trait:"Esplosivo",stat:{coraggio:3,istinto:-1},dice:{t:10,l:"Forza"},jrn:"Irruzione 312"},
      {text:"Ascolto dalla porta.",next:"c0_eaves",trait:"Calcolatore",stat:{intelletto:2,istinto:1},jrn:"Origliato"},
      {text:"\"Sono qui. Sono solo.\"",next:"c0_surr",trait:"Diplomatico",stat:{fascino:2},jrn:"Resa tattica"},
    ]},
  {id:"c0_eaves",ch:0,loc:"Fuori 312",mood:"tense",sb:true,
    nar:"\"Il pacchetto era pulito... Sta arrivando... Non lo uccidiamo. Abbiamo bisogno di quello che sa. Lui non sa di saperlo.\"\n\nSinghiozzo soffocato. \"Il tempo è scaduto.\"",
    choices:[
      {text:"Entro adesso.",next:"c0_room",stat:{coraggio:2},fl:["knows_they_need_me"],jrn:"'Non sa di saperlo'"},
      {text:"Mi ritiro. Cosa 'so'?",next:"c0_retreat",stat:{intelletto:2,coraggio:-1},jrn:"Ritirata tattica"},
    ]},
  {id:"c0_retreat",ch:0,loc:"2° Piano — Archivio",mood:"mystery",
    nar:"Al secondo piano: \"Archivio Interno\". Computer acceso con login. Post-it: \"La password è il giorno in cui hai dimenticato.\"",
    choices:[
      {text:"Provo la mia data di nascita.",next:"c0_conf",stat:{intelletto:2},dice:{t:9,l:"Intuizione"},fl:["memory_fragment_1"],jrn:"Computer archivio — tentativo"},
      {text:"Torno su. La donna non ha tempo.",next:"c0_surr",stat:{coraggio:2},jrn:"Priorità: ostaggio"},
    ]},
  {id:"c0_room",ch:0,loc:"Stanza 312",mood:"danger",next:"c0_conf",
    nar:"La porta della 312. Prendi un respiro. Entri.",
    okN:"Porta esplode. Uomo con pistola, donna legata. Un secondo di vantaggio.",
    failN:"Porta regge. Stanza vuota. Finestra aperta. Registratore con la tua voce.",
    okFl:["antagonist_surprised"],failFl:["antagonist_escaped"]},
  {id:"c0_surr",ch:0,loc:"Stanza 312",mood:"danger",moral:true,negotiate:{npc:"L'uomo in ombra",ctx:"Vuole ciò che hai dimenticato"},
    nar:"Donna legata. Uomo in ombra. Arma abbassata.\n\n\"Puntuale. Siediti. Parliamo di ciò che hai dimenticato.\"",
    choices:[
      {text:"Mi siedo.",next:"c0_conf",stat:{intelletto:2,coraggio:1},fl:["met_antagonist"],jrn:"Confronto con l'uomo in ombra"},
      {text:"\"Prima libera lei.\"",next:"c0_elena",stat:{fascino:2,coraggio:1},rel:{n:"Elena",d:3},fl:["met_antagonist","woman_freed"],jrn:"Ostaggio priorità"},
    ]},
  {id:"c0_elena",ch:0,loc:"Stanza 312",mood:"mystery",type:"intimacy",
    nar:"Elena si massaggia i polsi. \"Mi chiamo Elena Sarris. Eravamo insieme. Due anni.\"\n\n\"Tre mesi fa hai trovato i file del Progetto Mnemosyne. Hai scritto un articolo. Sei scomparso 72 ore. Quando sei tornato non mi conoscevi più.\"\n\nFerrante non la contraddice.",
    choices:[
      {text:"\"Il basilico...\" — qualcosa si muove.",next:"c0_conf",stat:{fascino:1,intelletto:1},rel:{n:"Elena",d:3},fl:["memory_fragment_1"],jrn:"Flash: basilico, balcone, luce"},
      {text:"\"Dimostralo.\"",next:"c0_conf",stat:{istinto:2},rel:{n:"Elena",d:-1},jrn:"Elena — prove insufficienti"},
    ]},
  {id:"c0_conf",ch:0,loc:"Stanza 312",mood:"danger",
    nar:"Ferrante si siede. \"Non sono il nemico. Sono Marco Ferrante. Tu hai scoperto il Progetto Mnemosyne — un progetto che ruba memorie. Ti hanno cancellato.\"\n\n\"Elena era la prossima. L'ho portata qui perché è l'ultimo posto dove il Progetto cercherebbe.\"\n\n\"L'ho mandato io il messaggio. Perché sei l'unico che può fermarli — ma solo se ricordi.\"",
    choices:[
      {text:"\"Come faccio a ricordare?\"",next:"c0_mirror",stat:{intelletto:2},fl:["knows_ferrante"],rel:{n:"Ferrante",d:1},jrn:"Ferrante: protettore, non rapitore"},
      {text:"\"Non ti credo.\"",next:"c0_mirror",stat:{istinto:2},fl:["knows_ferrante"],rel:{n:"Ferrante",d:-2},jrn:"Ferrante: alleato o manipolatore?"},
    ]},
  {id:"c0_mirror",ch:0,mood:"mystery",isMirror:true},

  // ─── CH1: LA VERITÀ SOTTO ──────────────────────────────
  {id:"c1_dawn",ch:1,loc:"Moli — Mattina",mood:"mystery",sb:true,
    nar:"Mattina. Nebbia grigia. 14 chiamate perse.\n\nMessaggio di V.: \"Archivio Comunale. Fascicolo Minerva-1987. Perché ti hanno scelto.\"\n\nElena dorme in auto. Ferrante è sparito — un numero e un biglietto: \"Quando sei pronto, chiama.\"",
    choices:[
      {text:"Vado all'archivio.",next:"c1_archive",stat:{intelletto:2},jrn:"Archivio comunale"},
      {text:"Traccio V.",next:"c1_trace",stat:{istinto:2},fl:["traced_v"],jrn:"Tracciamento di V."},
      {text:"Torno all'Hotel di giorno.",next:"c1_hotel",stat:{coraggio:2},fl:["returned_hotel"],jrn:"Hotel Minerva giorno"},
      {text:"Ho la chiave 312B. Le mie memorie.",next:"c1_312b",stat:{coraggio:3},reqFl:"found_key_312b",fl:["returned_hotel"],jrn:"312B — le mie memorie"},
    ]},
  {id:"c1_archive",ch:1,loc:"Archivio Comunale",mood:"mystery",sb:true,
    nar:"Carta vecchia, polvere. \"Minerva-1987? Serve autorizzazione.\"",
    choices:[
      {text:"\"Giornalista investigativo.\"",next:"c1_arch_res",trait:"Manipolatore",stat:{fascino:2},dice:{t:8,l:"Persuasione"},jrn:"Bluff giornalista"},
      {text:"Cerco nella pausa.",next:"c1_arch_res",trait:"Furtivo",stat:{istinto:2},dice:{t:11,l:"Furtività"},jrn:"Accesso non autorizzato"},
      {text:"Chiamo Mara per i contatti.",next:"c1_arch_res",stat:{fascino:1,intelletto:1},reqFl:"mara_ally",rel:{n:"Mara Voss",d:1},jrn:"Mara aiuta"},
    ]},
  {id:"c1_arch_res",ch:1,loc:"Archivio",mood:"mystery",next:"c1_rev",
    nar:"Le mani dell'archivista tremano mentre ti passa il fascicolo. \"Minerva-1987\". Dentro: nomi, date, un progetto che non avrebbe dovuto esistere.",
    okN:"Fascicolo Minerva-1987. \"Progetto Mnemosyne: ricerca su memoria e identità.\"\n\nFondatore: Carlo Sarris. Il cognome di Elena.",
    failN:"Fuori, uomo in grigio: \"Smetti di cercare. Per chi ti ha mandato.\" In tasca: chiavetta USB.",
    okFl:["knows_mnemosyne"],failFl:["has_usb"]},
  {id:"c1_trace",ch:1,loc:"Auto",mood:"tense",
    nar:"V., voce femminile: \"Lo sapevo. Mi chiamo Valentina Rini. Mio padre lavorava al Progetto. L'hanno ucciso. L'archivio. Hai fino a mezzogiorno.\"",
    choices:[
      {text:"\"Incontriamoci.\"",next:"c1_meet_v",stat:{coraggio:1,fascino:1},rel:{n:"Valentina",d:2},fl:["v_trusted"],jrn:"V. = Valentina Rini"},
      {text:"Corro all'archivio.",next:"c1_archive",stat:{istinto:1},jrn:"Deadline mezzogiorno"},
    ]},
  {id:"c1_meet_v",ch:1,loc:"Caffè Porto Vecchio",mood:"calm",type:"intimacy",
    nar:"Valentina Rini. Trent'anni, capelli neri corti, Gitanes Brunes.\n\n\"Mio padre Aldo dirigeva il lab Mnemosyne. Ha scoperto che rubavano memorie a pazienti oncologici. Ha minacciato di parlare. Freni tagliati.\"\n\n\"Tu hai ereditato la sua indagine. Ti hanno cancellato per questo.\"",
    choices:[
      {text:"\"Cosa c'era nei file?\"",next:"c1_rev",stat:{intelletto:2},rel:{n:"Valentina",d:2},fl:["v_trusted","knows_mnemosyne"],jrn:"Valentina — figlia di Aldo Rini"},
      {text:"\"Perché aiuti me?\"",next:"c1_rev",stat:{istinto:1},rel:{n:"Valentina",d:1},fl:["v_trusted"],jrn:"Valentina: vendetta per il padre"},
    ]},
  {id:"c1_hotel",ch:1,loc:"Hotel Minerva — Giorno",mood:"tense",sb:true,
    nar:"Hotel di giorno. Graffiti: occhio in triangolo rovesciato, tre volte. Lo stesso simbolo sul polso di Elena.",
    choices:[
      {text:"Fotografo il simbolo.",next:"c1_rev",stat:{intelletto:2},inv:"Foto simbolo",fl:["found_symbol"],jrn:"Simbolo Mnemosyne"},
      {text:"Entro. Cerco indizi.",next:"c1_rev",stat:{coraggio:2},dice:{t:9,l:"Percezione"},jrn:"Seconda perquisizione"},
    ]},
  {id:"c1_312b",ch:1,loc:"312B — Laboratorio",mood:"dread",sb:true,
    nar:"Pareti bianche. Neon. Letto ospedaliero con cinghie. Server rack.\n\nSiringhe, flaconi \"LETHE-7\", scansioni cerebrali con il tuo nome.\n\nQuesta è la stanza dove ti hanno rubato le memorie.\n\nNei server: file audio. La tua voce racconta il tuo primo bacio. Il nome di una ragazza che non ricordi. Poi parli di Elena. Di come vi siete incontrati.",
    choices:[
      {text:"Scarico tutto su una chiavetta.",next:"c1_rev",trait:"Metodico",stat:{intelletto:3},inv:"Memorie (chiavetta)",fl:["memory_fragment_2","lab_discovered"],jrn:"Memorie copiate. Ogni file."},
      {text:"Ascolto tutto. Ogni singolo file.",next:"c1_rev",trait:"Ossessivo",stat:{fascino:-1,intelletto:2},fl:["memory_fragment_1","memory_fragment_2","lab_discovered"],jrn:"Ore di ascolto. Una vita rubata."},
    ]},
  {id:"c1_rev",ch:1,loc:"—",mood:"danger",moral:true,sb:true,
    nar:"I pezzi si incastrano. Progetto Mnemosyne. LETHE-7. Il tuo cognome sugli archivi.\n\nTelefono: il tuo numero ti scrive.\n\n\"Ricordi adesso? O devo ricordarti io?\"\n\nFirma: il tuo nome. Non sei tu.",
    choices:[
      {text:"Rispondo.",next:"c1_end",trait:"Coraggioso",stat:{coraggio:3},jrn:"Messaggio dal mio numero"},
      {text:"Spengo il telefono.",next:"c1_end",stat:{intelletto:2,istinto:1},jrn:"Telefono spento"},
      {text:"Chiamo Mara.",next:"c1_end",trait:"Leale",stat:{fascino:2},reqFl:"mara_ally",rel:{n:"Mara Voss",d:2},jrn:"Mara è l'unica"},
      {text:"Chiamo Ferrante.",next:"c1_end",stat:{fascino:1,coraggio:1},rel:{n:"Ferrante",d:2},fl:["ferrante_ally"],jrn:"Alleanza Ferrante"},
    ]},
  {id:"c1_end",ch:1,mood:"danger",isEnd:true},

  // ─── CH1→2 MIRROR: THE RECORDING ──────────────────────
  // A different mirror — not a reflection, but your own voice on a tape
  {id:"c1_mirror_tape",ch:1,mood:"dread",type:"revelation",loc:"Auto — Notte",
    nar:"Nel silenzio dell'auto trovi una microcassetta nella tasca del cappotto. Non era lì prima. La infili nel lettore del cruscotto.\n\nÈ la tua voce. Ma diversa — più giovane, più sicura. Stai leggendo un articolo ad alta voce, provando le parole prima di scriverle.\n\n\"Il Progetto Mnemosyne ha estratto le memorie di ventitré persone senza il loro consenso. I soggetti includono un giudice, due politici, e un giornalista: me.\"\n\nPausa nella registrazione. Poi: \"Se stai ascoltando questo, significa che hanno vinto. Che mi hanno cancellato. Ma ho nascosto le prove dove solo io — solo tu — puoi trovarle.\"\n\nLa registrazione finisce con il rumore della pioggia. La stessa pioggia che batte ora sul tuo parabrezza.\n\nEri già stato qui. Questo momento è un loop.",
    next:"c2_start"},

  // ─── CH2: LA MEMORIA RUBATA ────────────────────────────
  {id:"c2_start",ch:2,loc:"Rifugio Sicuro",mood:"mystery",sb:true,
    nar:"48 ore senza dormire. Monolocale di Mara sopra una lavanderia. Detersivo e caffè bruciato.\n\nSul tavolo: tutto ciò che hai raccolto. Elena dorme sul divano.\n\nIl Progetto Mnemosyne sa che stai indagando. Il tempo stringe.",
    choices:[
      {text:"Il complesso Lethe. Laboratorio principale.",next:"c2_lethe",stat:{coraggio:2},jrn:"Obiettivo: Lethe Pharmaceuticals"},
      {text:"Elena sa più di quanto dice.",next:"c2_elena",stat:{istinto:2},rel:{n:"Elena",d:-1},jrn:"Interrogatorio Elena"},
      {text:"Chiamo Valentina. Ha le connessioni.",next:"c2_val",stat:{fascino:2},reqFl:"v_trusted",rel:{n:"Valentina",d:2},jrn:"Coalizione con Valentina"},
    ]},
  {id:"c2_lethe",ch:2,loc:"Complesso Lethe",mood:"danger",sb:true,combat:{enemy:"Guardia di sicurezza Lethe"},
    nar:"Cemento grigio. Nessun cartello. Telecamere nascoste. Lettore badge all'ingresso. Serratura elettronica sul retro.\n\nFurgone bianco senza targhe. Motore ancora caldo.",
    choices:[
      {text:"Ingresso di servizio. Forzo la serratura.",next:"c2_lab",trait:"Furtivo",stat:{istinto:2},dice:{t:10,l:"Scassinamento"},jrn:"Infiltrazione Lethe"},
      {text:"Osservo chi entra e chi esce.",next:"c2_watch",stat:{intelletto:2,istinto:1},jrn:"Sorveglianza Lethe"},
      {text:"Entro come se fossi uno di loro.",next:"c2_lab",trait:"Audace",stat:{fascino:2,coraggio:1},dice:{t:12,l:"Bluff"},jrn:"Bluff frontale Lethe"},
    ]},
  {id:"c2_watch",ch:2,loc:"Auto — Fronte Lethe",mood:"tense",
    nar:"Due ore. Tre persone entrano. Il terzo: capelli bianchi, portamento militare. Al telefono: \"...il Soggetto 7 si sta riattivando...\"\n\nSei il Soggetto 7.\n\nSale in limousine. Targa parziale.",
    choices:[
      {text:"Seguo la limousine.",next:"c2_follow",stat:{istinto:2,coraggio:1},jrn:"Pedinamento. Soggetto 7 = io."},
      {text:"Entro ora. Il capo è uscito.",next:"c2_lab",stat:{coraggio:2},dice:{t:9,l:"Furtività"},jrn:"Infiltrazione durante assenza"},
    ]},
  {id:"c2_follow",ch:2,loc:"Centro — Fondazione Sarris",mood:"tense",
    nar:"La limousine porta a un palazzo ottocentesco: Fondazione Sarris per le Neuroscienze.\n\nSarris. Come Elena.\n\nTarga: \"Dott. Carlo Sarris — Direttore\".\n\nIl padre di Elena dirige il Progetto Mnemosyne.",
    choices:[
      {text:"Confronto Elena.",next:"c2_elena_conf",stat:{coraggio:2},rel:{n:"Elena",d:-2},fl:["sarris_known"],jrn:"RIVELAZIONE: padre Elena = capo Mnemosyne"},
      {text:"Non dico niente. Indago solo.",next:"c2_lab",stat:{intelletto:2},fl:["sarris_known"],jrn:"Sarris = padre Elena = capo"},
    ]},
  {id:"c2_elena",ch:2,loc:"Rifugio",mood:"tense",negotiate:{npc:"Elena Sarris",ctx:"Sa del Progetto Mnemosyne — suo padre lo dirige"},
    nar:"\"Elena. Il Progetto Mnemosyne. Tuo padre è Carlo Sarris.\"\n\nIl colore le drena dal viso.\n\n\"Sì. Lo sapevo. Dopo. Quando sei tornato e non mi riconoscevi. L'ho confrontato. Ha detto che era per il tuo bene.\"\n\n\"Ho provato a fartelo ricordare. Per tre mesi.\"",
    choices:[
      {text:"\"Mi hai mentito per mesi.\"",next:"c2_lab",stat:{fascino:-1,istinto:1},rel:{n:"Elena",d:-3},jrn:"Elena sapeva. Mentita."},
      {text:"\"Capisco. Ma dimmi tutto.\"",next:"c2_lab",stat:{fascino:2},rel:{n:"Elena",d:1},fl:["elena_truth"],jrn:"Elena: protezione, non tradimento."},
    ]},
  {id:"c2_elena_conf",ch:2,loc:"Rifugio",mood:"danger",
    nar:"\"Mio padre è un mostro. Ma è l'unico che sa invertire il processo. Se vuoi le memorie, hai bisogno di lui.\"",
    choices:[
      {text:"\"Portami da lui.\"",next:"c2_sarris",stat:{coraggio:2},fl:["sarris_known","elena_truth"],jrn:"Elena mi porta da Sarris"},
      {text:"\"Non mi fido più.\"",next:"c2_lab",stat:{istinto:2},rel:{n:"Elena",d:-3},fl:["sarris_known"],jrn:"Rottura con Elena"},
    ]},
  {id:"c2_val",ch:2,loc:"Caffè",mood:"calm",
    nar:"Valentina ha i documenti del padre.\n\n\"LETHE-7 cancella i ricordi. Ma c'è un antidoto: ANAMNESIS. Mio padre l'ha sviluppato in segreto. Unico prototipo nel laboratorio Lethe, stanza L-7.\"\n\n\"Con ANAMNESIS riavrai tutto.\"",
    choices:[
      {text:"\"Andiamo a prenderlo.\"",next:"c2_lab",stat:{coraggio:2},rel:{n:"Valentina",d:2},fl:["knows_anamnesis"],jrn:"ANAMNESIS — antidoto. Stanza L-7."},
      {text:"\"Perché tuo padre creò sia veleno che cura?\"",next:"c2_lab",stat:{intelletto:2},rel:{n:"Valentina",d:-1},fl:["knows_anamnesis"],jrn:"ANAMNESIS esiste. Doppio gioco?"},
    ]},
  {id:"c2_sarris",ch:2,loc:"Fondazione Sarris",mood:"dread",negotiate:{npc:"Carlo Sarris",ctx:"Offre le tue memorie in cambio del silenzio"},type:"intimacy",
    nar:"Carlo Sarris. Piccolo, mani grandi, aria gentile. Si pulisce gli occhiali con il bordo della camicia — il tic di un uomo stanco.\n\n\"So perché sei qui. Posso restituirti le memorie — ho l'ANAMNESIS.\"\n\nSi siede vicino a te. Troppo vicino. Come un padre.\n\n\"Ma le ho cancellate per salvarti. Quello che avevi scoperto avrebbe scatenato una guerra. Non una metafora.\"\n\nTi guarda negli occhi.\n\n\"Vuoi ricordare e vivere in pericolo, o dimenticare e vivere in pace?\"",
    choices:[
      {text:"\"Voglio ricordare. A qualunque costo.\"",next:"c2_deep",stat:{coraggio:3},fl:["sarris_met","chose_remember"],jrn:"Scelgo di ricordare"},
      {text:"\"Dimmi cosa avevo scoperto.\"",next:"c2_deep",stat:{intelletto:2},fl:["sarris_met"],jrn:"Sarris: 'una guerra vera'. Cosa?"},
      {text:"\"Sei un mostro.\"",next:"c2_deep",stat:{coraggio:2},fl:["sarris_met","sarris_enemy"],rel:{n:"Elena",d:-1},jrn:"Rifiuto Sarris"},
    ]},

  // ─── MARA DANGER — Loss Aversion ──────────────────────
  {id:"c2_mara_danger",ch:2,loc:"Complesso Lethe — Tetto",mood:"danger",type:"tension",moral:true,
    nar:"Un colpo di pistola. Poi un altro.\n\nMara è sul tetto del complesso Lethe. L'hai mandata a coprire l'uscita. Non doveva entrare.\n\nMa l'hai sentita urlare il tuo nome. E poi gli spari.\n\nQuando arrivi sul tetto la trovi a terra, mano premuta sul fianco. Sangue nero nella pioggia. Due guardie Lethe a venti metri, si stanno ricaricando.\n\n\"Vai via\" sibila Mara. \"Ho la situazione—\" Tossisce. \"—sotto controllo.\"\n\nNon ha la situazione sotto controllo. Hai dieci secondi.",
    choices:[
      {text:"Trascino Mara al riparo.",next:"c2_deep",trait:"Leale",stat:{coraggio:2,fascino:1},rel:{n:"Mara Voss",d:3},fl:["mara_saved"],jrn:"Ho salvato Mara.",dice:{t:8,l:"Forza sotto pressione"}},
      {text:"Sparo alle guardie.",next:"c2_deep",trait:"Letale",stat:{coraggio:3},reqFl:"has_gun",fl:["mara_saved"],rel:{n:"Mara Voss",d:2},jrn:"Guardie a terra. Mara salva.",dice:{t:10,l:"Mira"}},
      {text:"Corro al laboratorio. Le memorie vengono prima.",next:"c2_deep",stat:{intelletto:1,fascino:-3},fl:["mara_dead"],rel:{n:"Mara Voss",d:-10},jrn:"Ho lasciato Mara. Non la rivedrò."},
    ]},
  {id:"c2_lab",ch:2,loc:"Laboratorio L-7",mood:"dread",sb:true,combat:{enemy:"Tecnico di sicurezza Lethe"},
    nar:"La stanza L-7. Poltrona per estrazione. Server con memorie rubate.\n\nSul bancone, sotto vetro: fiala azzurra.\n\n\"ANAMNESIS — Prototipo Unico — A. Rini\"\n\nLa tua vita in una fiala.\n\nUn rumore dietro di te.",
    choices:[
      {text:"Prendo l'ANAMNESIS e corro.",next:"c2_end",stat:{coraggio:2,istinto:1},inv:"ANAMNESIS",fl:["has_anamnesis"],jrn:"ANAMNESIS in mio possesso"},
      {text:"Mi giro. Chi c'è?",next:"c2_twist",stat:{istinto:2},jrn:"Qualcuno nel laboratorio"},
    ]},
  {id:"c2_deep",ch:2,loc:"Fondazione Sarris — Lab privato",mood:"dread",
    nar:"Sarris ti porta nel suo laboratorio privato. Una versione più pulita, più sterile della stanza L-7.\n\n\"Soggetto 1 sono io\" dice. \"Mi sono cancellato le memorie volontariamente. Perché quello che avevo fatto... quello che avevamo fatto alle 23 persone... non potevo vivere con quei ricordi.\"\n\n\"Ma il programma è andato avanti senza di me. Il mio successore — un uomo che conosci come Ferrante — lo ha trasformato in qualcosa di diverso.\"\n\n\"Ferrante non ti protegge. Ti usa.\"",
    choices:[
      {text:"\"Ferrante mi ha salvato la vita.\"",next:"c2_twist",trait:"Leale",stat:{fascino:1,coraggio:1},rel:{n:"Ferrante",d:1},fl:["sarris_met"],jrn:"Sarris accusa Ferrante"},
      {text:"\"Dimostralo.\"",next:"c2_twist",stat:{intelletto:2},fl:["sarris_met","sarris_revelation"],jrn:"Sarris: Ferrante è il vero nemico?"},
    ]},
  {id:"c2_twist",ch:2,loc:"Laboratorio",mood:"danger",moral:true,type:"tension",
    nar:"È Elena. Con una pistola.\n\n\"Mi dispiace. Non puoi prendere l'ANAMNESIS.\"\n\n\"Le 23 persone a cui abbiamo cancellato i ricordi? Erano in pericolo di morte. Le memorie sono qui non perché rubate — perché salvate. Come le tue.\"\n\nLa pistola trema.\n\n\"Per favore. Metti giù la fiala.\"",
    choices:[
      {text:"\"Elena, abbassa la pistola.\"",next:"c2_end",trait:"Diplomatico",stat:{fascino:3},rel:{n:"Elena",d:1},dice:{t:9,l:"Persuasione"},jrn:"Confronto con Elena armata"},
      {text:"Prendo l'ANAMNESIS e fuggo.",next:"c2_end",trait:"Disperato",stat:{coraggio:3},inv:"ANAMNESIS",fl:["has_anamnesis","elena_betrayed"],dice:{t:11,l:"Agilità"},jrn:"Fuga con ANAMNESIS"},
      {text:"\"Hai ragione. Non sono pronto.\"",next:"c2_end",trait:"Sacrificale",stat:{fascino:2,coraggio:-1},rel:{n:"Elena",d:3},fl:["chose_forget"],jrn:"Rinuncio all'ANAMNESIS"},
    ]},
  {id:"c2_end",ch:2,mood:"danger",isEnd:true},

  // ─── CH3: IL PROGETTO MNEMOSYNE ────────────────────────
  {id:"c3_start",ch:3,loc:"Porto — Notte",mood:"danger",sb:true,
    nar:"Una settimana dopo. Il porto è deserto. La pioggia è tornata — non se n'era mai andata.\n\nHai le prove. I nomi. Le connessioni. Ma la verità non è semplice come pensavi: il Progetto Mnemosyne non è solo il male che credevi. Le 23 persone — incluso te — sapevano qualcosa su un programma governativo che avrebbe potuto causare una guerra.\n\nMnemosyne vi ha protetti. Nel modo più brutale possibile.\n\nOra devi decidere: esporre tutto, o lasciare che il segreto muoia.",
    choices:[
      {text:"Espongo tutto. La verità è un diritto.",next:"c3_expose",stat:{coraggio:3,intelletto:1},fl:["chose_expose"],jrn:"Decisione: esporre il Progetto"},
      {text:"Trovo un compromesso. Proteggere e informare.",next:"c3_compromise",stat:{intelletto:2,fascino:1},jrn:"Decisione: compromesso"},
      {text:"Uso l'ANAMNESIS prima di decidere. Devo ricordare.",next:"c3_remember",stat:{coraggio:2},reqFl:"has_anamnesis",fl:["used_anamnesis"],jrn:"ANAMNESIS — ricordo"},
      {text:"Distruggo tutto. Nessuno deve avere questo potere.",next:"c3_destroy",trait:"Radicale",stat:{coraggio:2,istinto:1},jrn:"Decisione: distruggere Mnemosyne"},
    ]},
  {id:"c3_expose",ch:3,loc:"Redazione Giornale",mood:"tense",sb:true,
    nar:"Il tuo vecchio giornale. La scrivania è ancora lì — qualcuno ha messo una pianta. I colleghi ti guardano come un fantasma.\n\nL'editor ti riceve. \"Sei sparito tre mesi. Senza preavviso.\"\n\n\"Ho un articolo\" dici. \"Il più grande della mia carriera.\"\n\nLui guarda i documenti. Impallidisce.\n\n\"Se pubblichiamo questo... sai cosa succede?\"",
    choices:[
      {text:"\"Succede la verità.\"",next:"c3_climax",stat:{coraggio:2},fl:["article_published"],jrn:"Articolo consegnato all'editor"},
      {text:"\"Pubblichiamo solo la parte su Mnemosyne, non il programma governativo.\"",next:"c3_climax",stat:{intelletto:2},fl:["partial_expose"],jrn:"Esposizione parziale — proteggo il segreto di stato"},
    ]},
  {id:"c3_compromise",ch:3,loc:"Fondazione Sarris",mood:"mystery",negotiate:{npc:"Carlo Sarris",ctx:"Negoziare lo smantellamento controllato di Mnemosyne"},
    nar:"Torni da Sarris. Questa volta non come vittima — come negoziatore.\n\n\"Smantella il Progetto. Restituisci le memorie ai 23. In cambio, non pubblico niente sul programma governativo.\"\n\nSarris ti guarda a lungo.\n\n\"E se rifiuto?\"\n\n\"Ho copie di tutto in tre posti diversi. Pubblico tra 48 ore se non abbiamo un accordo.\"",
    choices:[
      {text:"\"Queste sono le mie condizioni. Non trattabili.\"",next:"c3_climax",stat:{coraggio:2,fascino:1},dice:{t:10,l:"Negoziazione"},fl:["deal_struck"],jrn:"Ultimatum a Sarris"},
      {text:"\"Lavoreremo insieme per un'uscita pulita.\"",next:"c3_climax",trait:"Diplomatico",stat:{fascino:2},rel:{n:"Elena",d:2},fl:["deal_struck"],jrn:"Collaborazione con Sarris"},
    ]},
  {id:"c3_remember",ch:3,loc:"Rifugio Sicuro",mood:"dread",
    nar:"Ti siedi. La fiala azzurra tra le dita. Elena ti guarda dalla porta.\n\n\"Sei sicuro?\"\n\nNon rispondi. L'ago entra nella vena.\n\nI ricordi tornano come un'onda — no, come uno tsunami. Ogni giorno, ogni volto, ogni parola che avevi dimenticato ti travolge in un torrente di immagini e sensazioni.\n\nElena. La cucina con le piastrelle azzurre. Il basilico. Il suo modo di ridere.\n\nE poi: il segreto. Quello che avevi scoperto. Un programma di sorveglianza di massa che utilizzava le memorie estratte da Mnemosyne per creare profili psicologici di milioni di persone.\n\nNon era solo furto di memorie. Era il più grande programma di controllo mentale della storia.\n\nAdesso ricordi tutto. E il peso è insopportabile.",
    choices:[
      {text:"Espongo tutto. Il mondo deve sapere.",next:"c3_climax",stat:{coraggio:3},fl:["full_truth","chose_expose"],jrn:"RICORDO TUTTO. Sorveglianza di massa. Pubblico."},
      {text:"Abbraccio Elena. Prima le persone, poi la verità.",next:"c3_climax",stat:{fascino:3},rel:{n:"Elena",d:3},fl:["full_truth"],jrn:"Ricordo. Elena. Prima di tutto, lei."},
    ]},
  {id:"c3_destroy",ch:3,loc:"Complesso Lethe",mood:"danger",combat:{enemy:"Guardie Lethe"},sb:true,
    nar:"Torni al complesso Lethe di notte. Questa volta non per rubare — per distruggere.\n\nI server contengono le memorie di 23 persone. Comprese le tue. Distruggerli significa che nessuno potrà mai più ricordare. Ma significa anche che nessuno potrà mai più usare quelle memorie come arma.\n\nLa tanica di benzina è pesante.",
    choices:[
      {text:"Do fuoco a tutto. Nessun rimpianto.",next:"c3_climax",stat:{coraggio:3,fascino:-2},fl:["destroyed_all"],jrn:"Server distrutti. Memorie perse per sempre."},
      {text:"Copio le memorie prima di distruggere i server.",next:"c3_climax",stat:{intelletto:2},inv:"Backup memorie",fl:["destroyed_lab","saved_memories"],jrn:"Backup completato. Lab distrutto."},
    ]},
  {id:"c3_climax",ch:3,loc:"Porto — Mezzanotte",mood:"danger",type:"tension",moral:true,
    nar:"Il porto vecchio. Mezzanotte. Il luogo dove tutto è cominciato — la tua auto, la pioggia, il messaggio.\n\nMa stanotte non sei solo. Sono tutti qui.\n\nFerrante emerge dall'ombra di un container. Ha una pistola. Non puntata verso di te — non ancora.\n\n\"Hai fatto quello che dovevi\" dice. \"Adesso dammi i file. Tutti. Le memorie, le prove, l'ANAMNESIS se ce l'hai.\"\n\nDietro di lui, due uomini in nero.\n\n\"Pensavi davvero che ti stessi proteggendo? Ti stavo usando. Come Sarris ha usato me. Come il governo ha usato tutti noi.\"\n\nElena appare alla tua sinistra. Valentina alla tua destra — se le hai trovate.\n\nIl cerchio si chiude.",
    choices:[
      {text:"\"Non ti do niente, Ferrante.\"",next:"c3_standoff",stat:{coraggio:3},jrn:"Rifiuto Ferrante. Confronto finale."},
      {text:"\"Prendi i file. Ma le memorie dei 23 tornano ai proprietari.\"",next:"c3_deal",trait:"Negoziatore",stat:{fascino:2,intelletto:1},jrn:"Trattativa finale con Ferrante"},
      {text:"Lancio i file nel porto. Nessuno li avrà.",next:"c3_sacrifice",trait:"Nihilista",stat:{coraggio:2,fascino:-1},fl:["files_destroyed"],jrn:"File nel porto. Nessuno vince."},
      {text:"\"Elena, Valentina — adesso!\" Segnale concordato.",next:"c3_alliance",trait:"Stratega",stat:{intelletto:3},reqFl:"v_trusted",jrn:"Piano coordinato. Non sono mai stato solo."},
    ]},

  {id:"c3_standoff",ch:3,loc:"Porto — Banchina 7",mood:"danger",combat:{enemy:"Marco Ferrante"},type:"tension",
    nar:"Ferrante alza la pistola. Gli uomini in nero si muovono.\n\n\"Non mi hai capito\" dice, con la calma di chi ha già vinto mille volte. \"Non è una richiesta.\"\n\nIl vento porta l'odore del mare e del ferro. Da qualche parte, una sirena della polizia. Lontana. Troppo lontana.\n\nHai un istante per decidere come finisce questa storia.",
    choices:[
      {text:"Mi lancio su Ferrante.",next:"c3_final",trait:"Kamikaze",stat:{coraggio:4},dice:{t:11,l:"Combattimento finale"},fl:["ferrante_fought"],jrn:"Scontro finale con Ferrante"},
      {text:"\"Le sirene si avvicinano. Non hai tempo.\"",next:"c3_final",trait:"Bluffatore",stat:{fascino:3},dice:{t:12,l:"Bluff supremo"},fl:["ferrante_bluffed"],jrn:"Bluff delle sirene. Ferrante esita."},
      {text:"Alzo le mani. Mi arrendo.",next:"c3_final",trait:"Sopravvissuto",stat:{istinto:2},fl:["surrendered"],jrn:"Resa. Ma sono ancora vivo."},
    ]},

  {id:"c3_deal",ch:3,loc:"Porto",mood:"tense",negotiate:{npc:"Ferrante",ctx:"L'ultimo accordo — i file in cambio della libertà dei 23"},
    nar:"Ferrante ti studia. Cerca la menzogna nei tuoi occhi.\n\n\"Le memorie dei 23...\" Ride, senza allegria. \"Pensi che mi importi delle memorie? Mi importa dei NOMI. Dei politici, dei giudici. Quei nomi valgono miliardi. Le memorie sono il mezzo, non il fine.\"\n\nOra capisci. Non era mai stato un progetto di ricerca. Era un programma di ricatto.\n\n\"Dammi i nomi e ti restituisco la tua vita. Puoi tornare da Elena. Riprendere tutto dove l'hai lasciato.\"\n\nLa pioggia scorre lungo il suo volto come lacrime che non verserà mai.",
    choices:[
      {text:"\"Nessun accordo con un ricattatore.\"",next:"c3_final",trait:"Incorruttibile",stat:{coraggio:3,fascino:1},fl:["refused_deal"],jrn:"Nessun accordo. I nomi non sono in vendita."},
      {text:"Gli do i nomi dei politici. Solo quelli.",next:"c3_final",trait:"Calcolatore freddo",stat:{intelletto:2},fl:["partial_deal"],jrn:"Compromesso sporco. Nomi dei politici ceduti."},
    ]},

  {id:"c3_sacrifice",ch:3,loc:"Porto — Banchina",mood:"dread",type:"revelation",
    nar:"I file cadono nell'acqua nera del porto. Fogli bianchi che galleggiano per un istante, poi affondano come bare.\n\nFerrante urla qualcosa. Non lo senti. Il sangue ti pulsa nelle orecchie.\n\nLe prove. I nomi. Le memorie di 23 persone. Le tue. Tutto scompare nel fondo del Mediterraneo.\n\nNessuno ricorderà. Nessuno saprà. Nessuno potrà usare queste informazioni come arma — mai più.\n\nIl silenzio che segue è il suono della libertà. O della resa.\n\nFerrante abbassa la pistola. Non c'è più niente da prendere.\n\n\"Sei un folle\" dice. E se ne va. Perché ha capito che un uomo disposto a distruggere la propria vita non ha niente da perdere. E un uomo senza niente da perdere è l'uomo più pericoloso del mondo.",
    next:"epilogue"},

  {id:"c3_alliance",ch:3,loc:"Porto",mood:"hope",
    nar:"Il segnale. Elena si muove a sinistra, distraendo gli uomini di Ferrante. Valentina preme un pulsante sul telefono — le prove inviate simultaneamente a cinque testate giornalistiche, tre ONG internazionali e Wikileaks.\n\n\"Cosa hai fatto?\" sibila Ferrante.\n\n\"Il gatto è fuori dal sacco\" dici. \"Tra cinque minuti il mondo intero avrà i file. Non puoi uccidere internet.\"\n\nFerrante guarda il suo telefono. Lo vedi impallidire per la prima volta.\n\nLe sirene non erano un bluff. Valentina le ha chiamate venti minuti fa.\n\nDue auto della polizia arrivano con le luci accese. Ferrante getta la pistola nel porto.\n\n\"Ci rivedremo\" dice. E scompare nell'ombra come l'ombra che è sempre stato.",
    choices:[
      {text:"Guardo Elena. Finalmente è finita.",next:"epilogue",stat:{fascino:2,coraggio:1},rel:{n:"Elena",d:3},fl:["alliance_victory"],jrn:"Vittoria. Elena, Valentina, e io. Insieme."},
    ]},

  {id:"c3_final",ch:3,loc:"Porto — Dopo",mood:"mystery",type:"revelation",
    nar:"L'alba arriva senza chiedere permesso. Rosa e grigia, come un livido che guarisce.\n\nIl porto è vuoto. Ferrante è sparito — con o senza ciò che voleva. Le sirene si sono allontanate. La pioggia si è fermata.\n\nPer la prima volta in settimane, il silenzio non è una minaccia. È solo silenzio.\n\nTi siedi sul bordo della banchina, le gambe penzoloni sull'acqua nera. Il telefono vibra.\n\nUn messaggio. Dal tuo numero. L'ultimo.\n\n\"Adesso ricordi chi sei?\"\n\nNon rispondi. Lanci il telefono nel porto.\n\nSì. Ricordi.",
    next:"epilogue"},

  {id:"epilogue",ch:4,mood:"calm",isEpilogue:true},
];

// ── ENDINGS ──────────────────────────────────────────────
function calcEnd(fl,rel){
  if(fl.chose_forget)return{t:"La Pace dell'Oblio",d:"Hai scelto di dimenticare. La pioggia continua, ma non ti bagna più.",i:"🌧️"};
  if(fl.destroyed_all)return{t:"Cenere e Silenzio",d:"Hai bruciato tutto. Nessuna memoria, nessuna arma, nessuna verità.",i:"🔥"};
  if(fl.alliance_victory)return{t:"L'Alba",d:"Elena, Valentina, e tu. Avete vinto. Il mondo sa. E tu ricordi.",i:"🌅"};
  if(fl.files_destroyed)return{t:"Il Sacrificio",d:"I file sono nel porto. Nessuno vince, nessuno perde. Solo pioggia e silenzio.",i:"🌊"};
  if(fl.mara_dead&&fl.has_anamnesis)return{t:"Il Prezzo della Verità",d:"Hai le memorie. Ma il costo è il sangue di chi ti proteggeva.",i:"🩸"};
  if(fl.partial_deal)return{t:"Le Mani Sporche",d:"Hai venduto i nomi dei politici. La verità ha un prezzo — e l'hai pagato.",i:"🤲"};
  if(fl.has_anamnesis&&fl.elena_betrayed)return{t:"La Verità Solitaria",d:"Hai le memorie. Ma hai perso tutti.",i:"🚶"};
  if(fl.full_truth&&(rel["Elena"]||0)>0)return{t:"Ricordare Insieme",d:"Le memorie tornano. Elena è lì quando apri gli occhi.",i:"💛"};
  if(fl.deal_struck)return{t:"Il Compromesso",d:"Non è giustizia perfetta. Ma 23 persone ricorderanno chi erano.",i:"⚖️"};
  if(fl.article_published)return{t:"La Verità Stampata",d:"Il mondo sa. Le conseguenze sono solo all'inizio.",i:"📰"};
  if(fl.partial_expose)return{t:"La Mezza Verità",d:"Hai protetto il segreto di stato. Ma Mnemosyne è finita.",i:"📰"};
  if(fl.ferrante_ally&&fl.v_trusted)return{t:"Giustizia per i 23",d:"Con Ferrante e Valentina, smantelli il Progetto.",i:"🤝"};
  if(fl.surrendered)return{t:"La Resa",d:"Hai alzato le mani. Ma sei ancora vivo. E la pioggia, prima o poi, finisce.",i:"🏳️"};
  return{t:"Il Limbo",d:"Né ricordo né oblio. Cammini nella pioggia, cercando una risposta.",i:"🌫️"};
}

// ── AI ───────────────────────────────────────────────────
async function aiSpecial(type,s,customCtx){
  const bible=buildStoryBible(s);const nem=buildNemesisProfile(s.emo||{profile:()=>({style:"decisivo"})},s.traits,s.flags);const sb=STYLE_BIBLE;
  if(type==="mirror")return await ai(`${sb}\n\n${bible}\n\n"Momento dello Specchio". 4-6 frasi, 2a persona, it. Riflessione SPECIFICA sulle scelte.`)||"Nel vetro vedi qualcuno che non riconosci.";
  if(type==="end")return await ai(`${sb}\n\n${bible}\n\n${nem}\n\nFine capitolo. 6-8 frasi. Cliffhanger impossibile da ignorare.`)||"La notte non è finita.";
  if(type==="bridge"){
    if(customCtx){
      // Director Mode: tension-based narrative escalation with Narrative Planner
      const t=customCtx._tension||0;
      const plan=customCtx._plan;
      const planCtx=plan?`\nPIANO NARRATIVO:\n- Setup: ${plan.setup}\n- Complicazione: ${plan.complication}\n- Climax: ${plan.climax}\n- Destino: ${plan.destiny}\nSei alla fase ${t<3?"SETUP":t<6?"COMPLICAZIONE":"CLIMAX"}. Segui il piano.`:"";
      const tensionGuide=t<3?`TENSIONE BASSA (${t}/10): Introduci personaggi, pianta semi narrativi.`
        :t<6?`TENSIONE MEDIA (${t}/10): Rivela un tradimento o segreto. Complica tutto.`
        :t<8?`TENSIONE ALTA (${t}/10): Pericolo imminente. Conseguenze delle scelte arrivano.`
        :`CLIMAX (${t}/10): Confronto FINALE. Tutto converge. La scena più intensa.`;
      return await ai(`${sb}\n\n${bible}\n\nSCENARIO: genere=${customCtx.genre}, premessa="${customCtx.premise}"${planCtx}\n${tensionGuide}\n\n6-8 frasi, ${customCtx.genre}, seconda persona, italiano. Dettaglio sensoriale.`,1000)||"La storia continua."}
    // Campaign bridge
    const extra=nem;
    const threads=[];if(!s.flags.knows_mnemosyne)threads.push("scoprire Mnemosyne");if(s.flags.knows_mnemosyne&&!s.flags.has_anamnesis)threads.push("trovare ANAMNESIS");if(s.flags.knows_ferrante)threads.push("vera natura di Ferrante");
    const threadStr=threads.length?`\nFILI NARRATIVI APERTI: ${threads.join(", ")}. Avanza ALMENO uno di questi fili.`:"";
    return await ai(`${sb}\n\n${bible}\n\n${extra}${threadStr}\n\n6-8 frasi, tensione crescente, dettaglio sensoriale.`,1000)||"La storia continua."}
  if(type==="epilogue"){const e=calcEnd(s.flags,s.rels);return await ai(`${sb}\n\n${bible}\n\nEpilogo "${e.t}": ${e.d}. 8-10 frasi. L'ultima frase deve restare nella mente.`,800)||e.d}
  return null;
}
async function aiSkillBleed(text,scene,s){
  const bible=buildStoryBible(s);
  return await aiJSON(`${STYLE_BIBLE}\n\n${bible}\n\nCustode della Logica. SCENA:"${(scene?.nar||"").slice(0,150)}" AZIONE:"${text}".
Se l'azione CONTRADDICE i vincoli della Story Bible, feasible=false. Se è CREATIVA e COERENTE, clever=true. Fallimenti con sarcasmo noir.
SOLO JSON:{"feasible":true,"clever":false,"narration":"3-4 frasi noir","stat_changes":{},"new_trait":null,"new_item":null,"journal":"breve"}`)
  ||{feasible:true,clever:false,narration:`"${text}" — il mondo reagisce.`,stat_changes:{},new_trait:null,new_item:null,journal:text.slice(0,40)}}
async function aiCombatNar(enemy,tactic,roll,target,round){return await ai(`${STYLE_BIBLE}\n\nCombattimento round ${round} vs "${enemy}". Tattica "${tactic}", tiro ${roll}/${target} → ${roll>=target?"successo":"fallimento"}. 2-3 frasi, it, 2a persona. Un dettaglio sensoriale specifico.`,250)||`${roll>=target?"Colpo a segno.":"Mancato."}`}
async function aiNegoNar(npc,stance,roll,target){return await ai(`${STYLE_BIBLE}\n\nNegoziazione con "${npc}". Approccio "${stance}", tiro ${roll}/${target} → ${roll>=target?"successo":"fallimento"}. 2-3 frasi, it. Mostra il tic dell'NPC.`,250)||`${roll>=target?"Cede.":"Non si muove."}`}

// ── COMBAT SCREEN ────────────────────────────────────────
function CombatScreen({enemy,stats,skills,snd,voce,onEnd}){
  const[round,setR]=useState(1);const[hp,setHp]=useState({p:10,e:10});
  const[phase,setPh]=useState("pick");const[tactic,setTac]=useState(null);
  const[diceV,setDV]=useState(null);const[nar,setNar]=useState(null);const[log,setLog]=useState([]);
  const firstStrike=skills.some(s=>s.n==="Primo Colpo")&&round===1;
  useEffect(()=>{snd?.sfx("combat")},[]);
  const pick=(t)=>{setTac(t);setPh("roll");setDV({target:t.id==="evade"?14:t.id==="talk"?13:10,bonus:t.b+(firstStrike&&t.id==="attack"?3:0),label:t.n})};
  const onDice=async(raw)=>{setDV(null);setPh("narrate");const tgt=tactic.id==="evade"?14:tactic.id==="talk"?13:10;const eff=raw+tactic.b+(firstStrike&&tactic.id==="attack"?3:0);const ok=eff>=tgt;
    const n=await aiCombatNar(enemy,tactic.n,raw,tgt,round);setNar(n);voce?.speak(n);setLog(l=>[...l,`R${round}: ${n}`]);
    const nh={...hp};if(ok){if(tactic.id==="attack")nh.e-=3;else if(tactic.id==="defend")nh.p=Math.min(10,nh.p+1);else if(tactic.id==="talk"){setTimeout(()=>onEnd(true,"negoziato"),1500);return}}
    else{nh.p-=tactic.id==="evade"?4:2}
    setHp(nh);if(nh.e<=0){setTimeout(()=>onEnd(true,"sconfitto"),1500);return}if(nh.p<=0){setTimeout(()=>onEnd(false,"sconfitto"),1500);return}
    setTimeout(()=>{setR(r=>r+1);setPh("pick");setTac(null);setNar(null)},2500)};
  return <div style={{position:"fixed",inset:0,background:T.bg,zIndex:180,display:"flex",flexDirection:"column",padding:20,overflow:"auto",animation:"fadeIn .4s"}}>
    <style>{CSS}</style>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div><p style={{fontFamily:T.f.u,color:T.redB,fontSize:9,letterSpacing:3,margin:0}}>⚔️ COMBATTIMENTO</p><p style={{fontFamily:T.f.d,color:T.txtB,fontSize:18,margin:"2px 0"}}>{enemy}</p></div>
      <span style={{fontFamily:T.f.u,color:T.txtD,fontSize:10}}>Round {round}</span>
    </div>
    <div style={{display:"flex",gap:12,marginBottom:18}}>
      {[{l:"Tu",v:hp.p,c:T.gold},{l:enemy.slice(0,12),v:hp.e,c:T.redB}].map((b,i)=><div key={i} style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:T.f.u,color:b.c,fontSize:9}}>{b.l}</span><span style={{fontFamily:T.f.m,color:T.txtD,fontSize:9}}>{b.v}/10</span></div>
        <div style={{height:6,background:T.bgE,borderRadius:3,overflow:"hidden"}}><div style={{width:`${b.v*10}%`,height:"100%",background:b.v>6?T.greenB:b.v>3?T.orange:T.redB,transition:"width .5s",borderRadius:3}}/></div>
      </div>)}
    </div>
    {nar&&<div style={{background:T.bgE,borderRadius:8,padding:12,marginBottom:14,border:`1px solid ${T.gold}11`}}><p style={{fontFamily:T.f.b,color:T.txt,fontSize:13,fontStyle:"italic",lineHeight:1.6,margin:0}}>{nar}</p></div>}
    {phase==="pick"&&<div><p style={{fontFamily:T.f.u,color:T.txtD,fontSize:10,letterSpacing:2,textAlign:"center",marginBottom:10}}>Scegli tattica</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{TACTICS.map(t=><button key={t.id} onClick={()=>pick(t)} style={{padding:"14px 8px",background:T.bgC,border:`1px solid ${T.gold}22`,borderRadius:8,cursor:"pointer",textAlign:"center",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.gold+"55"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gold+"22"}}>
        <span style={{fontSize:22,display:"block",marginBottom:3}}>{t.i}</span><span style={{fontFamily:T.f.u,color:T.gold,fontSize:11,fontWeight:600,display:"block"}}>{t.n}</span><span style={{fontFamily:T.f.b,color:T.txtD,fontSize:9}}>{t.d}</span>
        {firstStrike&&t.id==="attack"&&<span style={{fontFamily:T.f.u,color:T.orange,fontSize:8,display:"block",marginTop:3}}>💥 +3</span>}
      </button>)}</div></div>}
    {diceV&&<DiceRoll target={diceV.target} label={diceV.label} onResult={onDice} snd={snd}/>}
    {log.length>1&&<div style={{marginTop:10,maxHeight:80,overflowY:"auto"}}>{log.slice(0,-1).map((l,i)=><p key={i} style={{fontFamily:T.f.b,color:T.txtG,fontSize:10,margin:"2px 0",fontStyle:"italic"}}>{l}</p>)}</div>}
  </div>}

// ── NEGOTIATION SCREEN ───────────────────────────────────
function NegoScreen({npc,ctx,stats,snd,voce,onEnd}){
  const[round,setR]=useState(1);const[trust,setTr]=useState(2);
  const[phase,setPh]=useState("pick");const[stance,setSt]=useState(null);
  const[diceV,setDV]=useState(null);const[nar,setNar]=useState(null);
  const pick=(s)=>{setSt(s);setPh("roll");setDV({target:s.id==="bluff"?14:10,bonus:0,label:s.n})};
  const onDice=async(raw)=>{setDV(null);setPh("narrate");const tgt=stance.id==="bluff"?14:10;const ok=raw>=tgt;
    const n=await aiNegoNar(npc,stance.n,raw,tgt);setNar(n);voce?.speak(n);
    const nt=ok?(stance.id==="bluff"?trust+2:trust+1):(stance.id==="bluff"?Math.max(0,trust-1):trust);setTr(nt);
    if(nt>=5){setTimeout(()=>onEnd(true),1500);return}if(round>=4){setTimeout(()=>onEnd(nt>=3),1500);return}
    setTimeout(()=>{setR(r=>r+1);setPh("pick");setSt(null);setNar(null)},2200)};
  return <div style={{position:"fixed",inset:0,background:T.bg,zIndex:180,display:"flex",flexDirection:"column",padding:20,overflow:"auto",animation:"fadeIn .4s"}}>
    <style>{CSS}</style>
    <div style={{marginBottom:14}}>
      <p style={{fontFamily:T.f.u,color:T.cyan,fontSize:9,letterSpacing:3,margin:0}}>💬 NEGOZIAZIONE</p>
      <p style={{fontFamily:T.f.d,color:T.txtB,fontSize:18,margin:"2px 0"}}>{npc}</p>
      <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:11,fontStyle:"italic",margin:0}}>{ctx}</p>
    </div>
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:T.f.u,color:T.txtD,fontSize:9}}>Fiducia</span><span style={{fontFamily:T.f.m,color:T.txtD,fontSize:9}}>{trust}/5 · Round {round}/4</span></div>
      <div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:7,borderRadius:3,background:i<=trust?T.cyan:T.bgE,transition:"background .3s"}}/>)}</div>
    </div>
    {nar&&<div style={{background:T.bgE,borderRadius:8,padding:12,marginBottom:14,border:`1px solid ${T.cyan}11`}}><p style={{fontFamily:T.f.b,color:T.txt,fontSize:13,fontStyle:"italic",margin:0}}>{nar}</p></div>}
    {phase==="pick"&&<div><p style={{fontFamily:T.f.u,color:T.txtD,fontSize:10,letterSpacing:2,textAlign:"center",marginBottom:10}}>Scegli approccio</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{STANCES.map(s=><button key={s.id} onClick={()=>pick(s)} style={{padding:"14px 8px",background:T.bgC,border:`1px solid ${T.cyan}22`,borderRadius:8,cursor:"pointer",textAlign:"center",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.cyan+"55"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.cyan+"22"}}>
        <span style={{fontSize:20,display:"block",marginBottom:3}}>{s.i}</span><span style={{fontFamily:T.f.u,color:T.cyan,fontSize:11,fontWeight:600}}>{s.n}</span><span style={{fontFamily:T.f.b,color:T.txtD,fontSize:9,display:"block"}}>{s.d}</span>
      </button>)}</div></div>}
    {diceV&&<DiceRoll target={diceV.target} label={diceV.label} onResult={onDice} snd={snd}/>}
  </div>}


// ── SMALL COMPONENTS ─────────────────────────────────────
function Particles({theme:th}){const r=useRef(null);const type=(THEMES[th||"noir"]||{}).particle||"rain";
  useEffect(()=>{const c=r.current;if(!c)return;const x=c.getContext("2d");let f;
    const rs=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight};rs();window.addEventListener("resize",rs);
    const ps=type==="matrix"?Array.from({length:60},()=>({x:Math.random()*1200,y:Math.random()*1400,s:.5+Math.random()*2,ch:String.fromCharCode(0x30A0+Math.random()*96),o:.02+Math.random()*.08}))
      :type==="fog"?Array.from({length:30},()=>({x:Math.random()*1200,y:Math.random()*1400,r:40+Math.random()*120,s:.2+Math.random()*.4,d:Math.random()>.5?1:-1,o:.01+Math.random()*.03}))
      :type==="dust"?Array.from({length:50},()=>({x:Math.random()*1200,y:Math.random()*1400,r:1+Math.random()*2,sx:.1+Math.random()*.3,sy:-.1+Math.random()*.2,o:.03+Math.random()*.06}))
      :Array.from({length:100},()=>({x:Math.random()*1200,y:Math.random()*1400,l:6+Math.random()*20,s:1.5+Math.random()*5,o:.02+Math.random()*.06}));
    const dr=()=>{x.clearRect(0,0,c.width,c.height);
      if(type==="rain")ps.forEach(p=>{x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x+.3,p.y+p.l);x.strokeStyle=`rgba(170,190,210,${p.o})`;x.lineWidth=.5;x.stroke();p.y+=p.s;if(p.y>c.height){p.y=-p.l;p.x=Math.random()*c.width}});
      else if(type==="matrix")ps.forEach(p=>{x.fillStyle=`rgba(0,212,255,${p.o})`;x.font="12px monospace";x.fillText(p.ch,p.x,p.y);p.y+=p.s;if(p.y>c.height){p.y=0;p.x=Math.random()*c.width;p.ch=String.fromCharCode(0x30A0+Math.random()*96)}});
      else if(type==="fog")ps.forEach(p=>{const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(180,160,160,${p.o})`);g.addColorStop(1,"transparent");x.fillStyle=g;x.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2);p.x+=p.s*p.d;p.y+=.1;if(p.x>c.width+p.r)p.x=-p.r;if(p.x<-p.r)p.x=c.width+p.r;if(p.y>c.height+p.r)p.y=-p.r});
      else if(type==="dust")ps.forEach(p=>{x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle=`rgba(200,180,140,${p.o})`;x.fill();p.x+=p.sx;p.y+=p.sy;if(p.x>c.width)p.x=0;if(p.y<0)p.y=c.height});
      f=requestAnimationFrame(dr)};dr();
    return()=>{cancelAnimationFrame(f);window.removeEventListener("resize",rs)}},[type]);
  return <canvas ref={r} style={{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1,opacity:.5}}/>}
function Vig(){return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:2,background:"radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,.6) 100%)"}}/>}
function Grain(){return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:3,opacity:.04,mixBlendMode:"overlay",backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}/>}
function Typ({text,speed=20,onDone,style,dropCap,anim}){const[d,setD]=useState("");const[done,setDone2]=useState(false);const i=useRef(0),dn=useRef(false),toRef=useRef(null);
  // Kinetic delay: punctuation creates rhythm
  const getDelay=(ch,next)=>{
    if(ch==="."||ch==="!"||ch==="?")return next==="\n"?speed*2:speed*8;
    if(ch===","||ch===";")return speed*4;
    if(ch===":"||ch==="—")return speed*5;
    if(ch==="…")return speed*12;
    if(ch==="\n")return speed*6;
    if(ch==='"'||ch==='"'||ch==='"')return speed*3;
    return speed};
  useEffect(()=>{i.current=0;dn.current=false;setD("");setDone2(false);
    const step=()=>{if(i.current>=text.length){if(!dn.current){dn.current=true;setDone2(true);onDone?.()};return}
      i.current++;setD(text.slice(0,i.current));
      const ch=text[i.current-1];const next=text[i.current]||"";
      toRef.current=setTimeout(step,getDelay(ch,next))};
    toRef.current=setTimeout(step,speed);
    return()=>clearTimeout(toRef.current)},[text,speed]);
  const skip=()=>{if(!dn.current){clearTimeout(toRef.current);setD(text);dn.current=true;setDone2(true);onDone?.()}};
  const pars=d.split("\n");
  const isDialogue=(l)=>/^[""\u201C]|^\s*[""\u201C]/.test(l)||/^[A-Z][a-z]+:/.test(l);
  return <div style={{...style,animation:anim||undefined}} onClick={skip}>{pars.map((l,k)=>{
    const dial=isDialogue(l);
    const st=dial?{fontFamily:T.f.d,color:T.goldB,fontSize:(style?.fontSize||15)+1,fontStyle:"normal",fontWeight:400,margin:"12px 0 4px"}
      :k===0&&dropCap&&l.length>1?{}:{margin:l===""?"14px 0":"4px 0"};
    if(k===0&&dropCap&&l.length>1)return <p key={k} style={{...st}}><span style={{float:"left",fontSize:"2.8em",lineHeight:.8,marginRight:6,marginTop:4,fontFamily:style?.fontFamily||T.f.d,color:T.gold}}>{l[0]}</span>{l.slice(1)}</p>;
    return <p key={k} style={st}>{l}</p>
  })}{!done&&<span style={{opacity:.12,animation:"blink 1s infinite",fontSize:9,marginLeft:2}}>tocca</span>}{done&&<span style={{opacity:.15}}>▌</span>}</div>}

// ── DIRECTOR'S MODE ──────────────────────────────────────
const DIR_GENRES=[{id:"noir",n:"Noir",i:"🔍",c:T.gold},{id:"scifi",n:"Sci-Fi",i:"🚀",c:T.blueB},{id:"medical",n:"Emergenza",i:"🏥",c:T.redB},{id:"business",n:"Business",i:"💼",c:T.greenB},{id:"horror",n:"Horror",i:"👻",c:T.purple},{id:"historical",n:"Storico",i:"📜",c:T.orange}];

function DirectorMode({onBack,onPlay}){
  const[tab,setTab]=useState("create");const[form,setForm]=useState({title:"",genre:"noir",premise:"",setting:"",npcName:""});
  const[gen,setGen]=useState(false);const[result,setResult]=useState(null);
  const[community,setCommunity]=useState([]);const[preview,setPreview]=useState(false);
  useEffect(()=>{(async()=>{try{const keys=await ST.listShared?.("dir:");if(keys)for(const k of keys.slice(0,15)){const d=await ST.loadShared?.(k);if(d)setCommunity(p=>[...p,d])}}catch{}})()},[]);
  const genre=DIR_GENRES.find(g=>g.id===form.genre)||DIR_GENRES[0];
  const generate=async()=>{if(!form.title||!form.premise)return;setGen(true);
    const r=await aiJSON(`${STYLE_BIBLE}\n\nSei un game designer. Crea uno scenario interattivo per genere "${form.genre}".
TITOLO:"${form.title}" PREMESSA:"${form.premise}" AMBIENTAZIONE:"${form.setting||"non specificata"}" NPC PRINCIPALE:"${form.npcName||"da inventare"}".
REGOLE: La scena DEVE essere nel genere ${form.genre}. ${form.genre==="horror"?"Tono oppressivo, dettagli disturbanti, senso di pericolo imminente.":form.genre==="scifi"?"Tecnologia avanzata, terminologia futuristica, atmosfera cyberpunk o spaziale.":form.genre==="medical"?"Urgenza medica, terminologia clinica, decisioni etiche.":form.genre==="business"?"Tensione corporate, negoziazioni, posta in gioco finanziaria.":form.genre==="historical"?"Accuratezza storica, linguaggio d'epoca, dettagli ambientali autentici.":"Atmosfera noir, pioggia, ombre, cinismo."}
SOLO JSON:{"opening":"8-10 frasi, ${form.genre}, seconda persona, italiano, scena d'apertura drammatica con dettaglio sensoriale specifico","choices":[{"text":"scelta 1","trait":"NomeTratto","stat":{"coraggio":1}},{"text":"scelta 2","trait":"NomeTratto","stat":{"istinto":1}},{"text":"scelta 3 (rischiosa)","trait":"NomeTratto","stat":{"fascino":1}}],"mood":"tense","npcs":["${form.npcName||"nome1"}","nome2"]}`);
    if(r)setResult({...form,...r,id:"dir_"+Date.now()});setGen(false)};
  const publish=async()=>{if(!result)return;try{await ST.saveShared?.(`dir:${result.id}`,result)}catch{};setCommunity(p=>[result,...p]);setResult(null);setForm({title:"",genre:"noir",premise:"",setting:"",npcName:""})};
  const gc=genre.c;
  const ist={width:"100%",padding:"12px 14px",background:T.bg,border:`1px solid ${gc}22`,borderRadius:8,color:T.txtB,fontFamily:T.f.b,fontSize:13,marginBottom:10};
  return <div style={{background:T.bg,minHeight:"100vh",position:"relative",overflow:"hidden"}}>
    <link href={FONTS} rel="stylesheet"/><Particles theme={form.genre==="horror"?"horror":form.genre==="scifi"?"scifi":form.genre==="historical"?"historical":"noir"}/><Vig/><Grain/><style>{CSS}</style>
    <div style={{position:"relative",zIndex:10,maxWidth:500,margin:"0 auto",padding:"24px 28px"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div>
          <p style={{fontFamily:T.f.u,color:gc,fontSize:8,letterSpacing:4,margin:0}}>MYTHOSAI</p>
          <h1 style={{fontFamily:T.f.d,color:T.txtB,fontSize:24,margin:"2px 0 0",fontWeight:300}}>Director's Mode</h1>
        </div>
        <Btn onClick={onBack}>← Menu</Btn>
      </div>
      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20}}>{[{k:"create",l:"🖊️ Crea Scenario",n:null},{k:"browse",l:"🌍 Community",n:community.length||null}].map(t=>
        <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"11px",background:tab===t.k?gc+"18":"transparent",border:`1px solid ${tab===t.k?gc+"55":T.txtG+"22"}`,color:tab===t.k?gc:T.txtD,fontFamily:T.f.u,fontSize:10,borderRadius:8,cursor:"pointer",letterSpacing:1,position:"relative"}}>{t.l}{t.n&&<span style={{position:"absolute",top:-4,right:-4,background:gc,color:T.bg,fontSize:8,fontFamily:T.f.m,borderRadius:10,padding:"1px 5px",fontWeight:600}}>{t.n}</span>}</button>)}</div>

      {/* CREATE TAB */}
      {tab==="create"&&!result&&<div style={{animation:"fadeUp .5s"}}>
        {/* Genre selector — large cards */}
        <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:2,marginBottom:8}}>GENERE</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:16}}>{DIR_GENRES.map(g=>
          <button key={g.id} onClick={()=>setForm(p=>({...p,genre:g.id}))} style={{padding:"10px 6px",background:form.genre===g.id?g.c+"20":"transparent",border:`1px solid ${form.genre===g.id?g.c+"55":T.txtG+"18"}`,borderRadius:10,cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
            <span style={{fontSize:20,display:"block"}}>{g.i}</span>
            <span style={{fontFamily:T.f.u,fontSize:8,color:form.genre===g.id?g.c:T.txtD,letterSpacing:1,display:"block",marginTop:3}}>{g.n}</span></button>)}</div>

        <input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Titolo dello scenario" style={{...ist,fontSize:16,fontFamily:T.f.d,fontWeight:400}}/>
        <textarea value={form.premise} onChange={e=>setForm(p=>({...p,premise:e.target.value}))} placeholder="Qual è il conflitto centrale? Cosa è in gioco?" rows={3} style={{...ist,resize:"vertical",lineHeight:1.5}}/>
        <div style={{display:"flex",gap:8}}>
          <input value={form.setting} onChange={e=>setForm(p=>({...p,setting:e.target.value}))} placeholder="Ambientazione" style={{...ist,flex:1}}/>
          <input value={form.npcName} onChange={e=>setForm(p=>({...p,npcName:e.target.value}))} placeholder="NPC principale" style={{...ist,flex:1}}/>
        </div>

        <button onClick={generate} disabled={gen||!form.title||!form.premise} style={{width:"100%",padding:"14px",background:gen?T.bgE:gc+"22",border:`1px solid ${gc}55`,color:gc,fontFamily:T.f.u,fontSize:12,borderRadius:8,cursor:gen?"wait":"pointer",letterSpacing:3,marginTop:4}}>
          {gen?"⟳ L'AI sta creando il tuo mondo...":"🧠 GENERA SCENARIO"}</button>
      </div>}

      {/* RESULT PREVIEW */}
      {tab==="create"&&result&&<div style={{animation:"fadeUp .5s"}}>
        <div style={{background:`linear-gradient(135deg,${gc}08,${T.bgE})`,borderRadius:12,padding:18,marginBottom:14,border:`1px solid ${gc}22`,position:"relative",overflow:"hidden"}}>
          {/* Genre badge */}
          <div style={{position:"absolute",top:12,right:12,background:gc+"22",borderRadius:16,padding:"3px 10px"}}><span style={{fontSize:11}}>{genre.i}</span><span style={{fontFamily:T.f.u,fontSize:8,color:gc,marginLeft:4}}>{genre.n}</span></div>

          <h3 style={{fontFamily:T.f.d,color:T.txtB,fontSize:20,margin:"0 0 6px",fontWeight:300}}>{result.title}</h3>
          {result.setting&&<p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,margin:"0 0 10px",letterSpacing:2}}>📍 {result.setting}</p>}

          {/* Opening preview */}
          {!preview?<div>
            <p style={{fontFamily:T.f.b,color:T.txt,fontSize:13,fontStyle:"italic",lineHeight:1.6,margin:"0 0 10px"}}>{result.opening?.slice(0,200)}...</p>
            <button onClick={()=>setPreview(true)} style={{background:"transparent",border:`1px solid ${gc}33`,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontFamily:T.f.u,color:gc,fontSize:8}}>Leggi tutto ▼</button>
          </div>
          :<p style={{fontFamily:T.f.b,color:T.txt,fontSize:13,fontStyle:"italic",lineHeight:1.7,margin:"0 0 10px"}}>{result.opening}</p>}

          {/* Choices preview */}
          <div style={{marginTop:12,borderTop:`1px solid ${gc}15`,paddingTop:10}}>
            <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:2,margin:"0 0 6px"}}>SCELTE</p>
            {(result.choices||[]).map((ch,j)=><p key={j} style={{fontFamily:T.f.b,color:T.txtD,fontSize:11,margin:"0 0 3px",paddingLeft:10,borderLeft:`2px solid ${gc}44`}}>→ {ch.text}</p>)}
          </div>
          {result.npcs?.length>0&&<p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,margin:"10px 0 0"}}>NPC: {result.npcs.join(", ")}</p>}
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn onClick={()=>onPlay(result)} primary style={{flex:2,padding:"14px",fontSize:12,letterSpacing:3}}>▶️ GIOCA</Btn>
          <Btn onClick={publish} style={{flex:1}}>📤 Pubblica</Btn>
          <Btn onClick={()=>{setResult(null);setPreview(false)}} style={{flex:.5}}>↩️</Btn>
        </div>
      </div>}

      {/* COMMUNITY TAB */}
      {tab==="browse"&&<div style={{animation:"fadeUp .5s"}}>
        {community.length===0?<div style={{textAlign:"center",padding:"40px 0"}}>
          <span style={{fontSize:40,display:"block",marginBottom:12}}>🌍</span>
          <p style={{fontFamily:T.f.d,color:T.txtD,fontSize:16,margin:"0 0 4px"}}>La Community è vuota</p>
          <p style={{fontFamily:T.f.b,color:T.txtG,fontSize:12,fontStyle:"italic"}}>Crea e pubblica il primo scenario!</p>
        </div>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>{community.map((sc,i)=>{
          const sg=DIR_GENRES.find(g=>g.id===sc.genre)||{i:"🎭",c:T.gold,n:"Custom"};
          return <div key={i} onClick={()=>onPlay(sc)} style={{background:T.bgE,borderRadius:10,padding:14,border:`1px solid ${sg.c}18`,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=sg.c+"55"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=sg.c+"18"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <h3 style={{fontFamily:T.f.d,color:T.txtB,fontSize:16,margin:0,fontWeight:400}}>{sc.title}</h3>
              <div style={{background:sg.c+"18",borderRadius:12,padding:"2px 8px",display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:12}}>{sg.i}</span><span style={{fontFamily:T.f.u,fontSize:7,color:sg.c}}>{sg.n}</span></div>
            </div>
            <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:12,margin:"0 0 4px",fontStyle:"italic",lineHeight:1.4}}>{sc.premise?.slice(0,90)}{sc.premise?.length>90?"...":""}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:T.f.u,color:T.txtG,fontSize:8}}>{sc.setting||"Mondo sconosciuto"}</span>
              <span style={{fontFamily:T.f.u,color:sg.c,fontSize:9}}>▶ Gioca</span>
            </div>
          </div>})}</div>}
      </div>}
    </div></div>}
function Btn({children,onClick,primary,disabled,style:st}){return <button onClick={onClick} disabled={disabled} style={{padding:"9px 18px",background:primary?T.gold+"22":"transparent",border:`1px solid ${primary?T.gold+"55":T.goldD+"33"}`,color:primary?T.gold:T.txtD,fontFamily:T.f.u,fontSize:11,borderRadius:4,cursor:disabled?"not-allowed":"pointer",letterSpacing:1,opacity:disabled?0.4:1,...st}}>{children}</button>}

// ── REWARD OVERLAY (fullscreen dopamine hit) ─────────────
function Reward({type,label,onDone}){
  const[vis,setVis]=useState(false);
  useEffect(()=>{haptic("success");setTimeout(()=>setVis(true),50);const t=setTimeout(()=>{setVis(false);setTimeout(onDone,300)},1500);return()=>clearTimeout(t)},[]);
  const colors={trait:T.gold,item:T.cyan,stat:T.greenB,clever:T.purpleB};const icons={trait:"🎭",item:"📦",stat:"📈",clever:"✨"};
  const titles={trait:"Nuovo Tratto",item:"Oggetto Trovato",stat:"Stat Aumentata",clever:"Azione Brillante"};
  return <div style={{position:"fixed",inset:0,zIndex:250,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    background:`radial-gradient(circle at center, ${colors[type]||T.gold}15 0%, ${T.bg}ee 70%)`,
    opacity:vis?1:0,transform:vis?"scale(1)":"scale(0.8)",transition:"all .5s cubic-bezier(.17,.67,.35,1.2)",pointerEvents:"none"}}>
    <span style={{fontSize:48,marginBottom:12,filter:`drop-shadow(0 0 20px ${colors[type]||T.gold}44)`}}>{icons[type]||"⭐"}</span>
    <p style={{fontFamily:T.f.u,color:colors[type]||T.gold,fontSize:10,letterSpacing:4,textTransform:"uppercase",margin:"0 0 6px"}}>{titles[type]||""}</p>
    <p style={{fontFamily:T.f.d,color:T.txtB,fontSize:24,margin:0,fontWeight:400}}>{label}</p>
  </div>}

// ── TIMED CHOICE BAR ─────────────────────────────────────
function Timer({seconds,onExpire,pulseLock}){
  const[left,setLeft]=useState(seconds);const[holding,setHolding]=useState(false);const holdRef=useRef(false);
  useEffect(()=>{const iv=setInterval(()=>setLeft(l=>{
    if(pulseLock&&!holdRef.current)return l; // Paused when not holding
    if(l<=1){clearInterval(iv);onExpire();return 0}
    if(l<=5)haptic("impact");if(pulseLock)haptic("pulse_tick");return l-1}),1000);return()=>clearInterval(iv)},[]);
  const pct=left/seconds*100;
  const onDown=()=>{holdRef.current=true;setHolding(true)};
  const onUp=()=>{holdRef.current=false;setHolding(false);if(pulseLock&&left>1){haptic("fail");onExpire()}};
  if(pulseLock)return <div onTouchStart={onDown} onTouchEnd={onUp} onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp}
    style={{position:"fixed",inset:0,zIndex:180,background:`rgba(${holding?"40,5,5":"15,5,5"},${holding?0.92:0.96})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background .3s",cursor:"pointer"}}>
    <div style={{width:120,height:120,borderRadius:"50%",border:`3px solid ${holding?T.redB:T.txtG}`,display:"flex",alignItems:"center",justifyContent:"center",background:holding?`rgba(120,20,20,${0.1+((seconds-left)/seconds)*0.3})`:"transparent",transition:"all .3s",boxShadow:holding?`0 0 ${30+left*3}px ${T.redB}22`:"none"}}>
      <span style={{fontFamily:T.f.d,fontSize:40,color:holding?T.txtB:T.txtD,fontWeight:300}}>{left}</span>
    </div>
    <p style={{fontFamily:T.f.b,color:holding?T.txt:T.redB,fontSize:14,fontStyle:"italic",margin:"20px 0 0",textAlign:"center",maxWidth:260,lineHeight:1.5}}>
      {holding?"Tieni premuto... non mollare.":"TIENI PREMUTO per decidere"}</p>
    <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,margin:"8px 0 0"}}>{holding?"Rilascia = scelta peggiore":"Premi e tieni premuto lo schermo"}</p>
    {/* Pulsing ring */}
    {holding&&<div style={{position:"absolute",width:140,height:140,borderRadius:"50%",border:`1px solid ${T.redB}33`,animation:"breathe 1s infinite",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>}
  </div>;
  // Standard timer bar
  return <div style={{position:"fixed",top:48,left:20,right:20,zIndex:58,animation:"fadeIn .5s"}}>
    <div style={{height:3,background:T.bgE,borderRadius:2,overflow:"hidden"}}>
      <div style={{width:`${pct}%`,height:"100%",background:pct>50?T.gold:pct>20?T.orange:T.redB,transition:"width 1s linear",borderRadius:2}}/>
    </div>
    <p style={{fontFamily:T.f.m,color:pct>20?T.txtD:T.redB,fontSize:9,textAlign:"center",margin:"3px 0 0"}}>{left}s</p>
  </div>}
function Panel({children,onClose}){return <div onClick={onClose} style={{position:"fixed",inset:0,background:T.bgO,zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",padding:12,backdropFilter:"blur(8px)",animation:"fadeIn .3s"}}><div onClick={e=>e.stopPropagation()} style={{background:T.bgC,border:`1px solid ${T.gold}22`,borderRadius:10,padding:"24px 20px",maxWidth:440,width:"100%",maxHeight:"85vh",overflowY:"auto",boxShadow:`0 30px 60px ${T.sh}`,animation:"slideUp .4s"}}>{children}</div></div>}
function DiceRoll({target,label,onResult,snd}){
  const[rolling,setR]=useState(true),[val,setV]=useState(1),[fin,setF]=useState(null),[shaken,setShaken]=useState(false);
  useEffect(()=>{snd?.sfx("dice");haptic("dice");
    // Rampa sonora: rising tone during roll
    try{const ac=new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.setValueAtTime(120,ac.currentTime);o.frequency.linearRampToValueAtTime(600,ac.currentTime+2.5);g.gain.setValueAtTime(.03,ac.currentTime);g.gain.linearRampToValueAtTime(.06,ac.currentTime+2);g.gain.linearRampToValueAtTime(0,ac.currentTime+2.5);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+2.5)}catch{}
    // Shake detection
    const shakeHandler=(e)=>{if(Math.abs(e.accelerationIncludingGravity?.x||0)>15||Math.abs(e.accelerationIncludingGravity?.y||0)>15)setShaken(true)};
    window.addEventListener("devicemotion",shakeHandler);
    // Escalating haptics
    let hi=0;const hiv=setInterval(()=>{haptic("impact");hi++},300-Math.min(hi*20,250));
    const iv=setInterval(()=>setV(Math.ceil(Math.random()*20)),55);
    const to=setTimeout(()=>{clearInterval(iv);clearInterval(hiv);window.removeEventListener("devicemotion",shakeHandler);
      const r=Math.ceil(Math.random()*20);setV(r);
      // FREEZE FRAME: 0.5s pause before reveal
      setTimeout(()=>{setF(r);setR(false);snd?.sfx(r>=target?"ok":"fail");haptic(r>=target?"success":"fail");setTimeout(()=>onResult(r),1800)},500)
    },shaken?1500:2500);
    return()=>{clearInterval(iv);clearInterval(hiv);clearTimeout(to);window.removeEventListener("devicemotion",shakeHandler)}},[]);
  const ok=fin!==null&&fin>=target;
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.95)",zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
    <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:10,letterSpacing:5,textTransform:"uppercase"}}>{rolling?(shaken?"Scuoti!":"Tiro..."):fin===20?"⚡ CRITICO!":fin===1?"💀 CRITICO NEG.":ok?"Successo":"Fallimento"}</p>
    <p style={{fontFamily:T.f.d,color:T.txtD,fontSize:14,fontStyle:"italic"}}>{label}</p>
    <div style={{width:120,height:120,background:rolling?T.bgC:ok?"rgba(40,90,40,.3)":"rgba(120,20,20,.3)",border:`2px solid ${rolling?T.goldD+"55":ok?T.greenB:T.redB}`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",transform:rolling?`rotate(${val*18}deg) scale(${.9+Math.random()*.2})`:"scale(1.15)",transition:rolling?"none":"all .5s cubic-bezier(.17,.67,.35,1.2)",boxShadow:!rolling?`0 0 40px ${ok?T.greenB:T.redB}33`:"none"}}>
      <span style={{fontFamily:T.f.d,fontSize:52,fontWeight:700,color:T.txtB}}>{val}</span>
    </div>
    <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:12}}>Obiettivo: {target}+</p>
    {rolling&&<p style={{fontFamily:T.f.u,color:T.txtG,fontSize:9,animation:"breathe 1s infinite"}}>📱 Scuoti il telefono per accelerare</p>}
  </div>}

// ── SKILL BLEED INPUT ────────────────────────────────────
function SBInput({onSubmit}){const[open,setOpen]=useState(false),[txt,setTxt]=useState("");const ref=useRef(null);const go=()=>{if(txt.trim()){onSubmit(txt.trim());setTxt("");setOpen(false)}};
  if(!open)return <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:70,padding:"0 12px 12px",background:`linear-gradient(0deg,${T.bg} 60%,transparent)`}}><button onClick={()=>{setOpen(true);setTimeout(()=>ref.current?.focus(),100)}} style={{width:"100%",padding:"11px",background:T.bgC,border:`1px solid ${T.purple}33`,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}><span>🧠</span><span style={{fontFamily:T.f.u,color:T.purpleB,fontSize:11,opacity:.7}}>Azione libera (Skill Bleed)</span></button></div>;
  return <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:70,padding:"0 12px 12px",background:`linear-gradient(0deg,${T.bg} 80%,transparent)`}}><div style={{background:T.bgC,border:`1px solid ${T.purple}44`,borderRadius:10,padding:10}}><p style={{fontFamily:T.f.u,color:T.purpleB,fontSize:9,letterSpacing:2,margin:"0 0 5px"}}>🧠 Descrivi la tua azione</p><div style={{display:"flex",gap:6}}><input ref={ref} value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")go()}} placeholder="Cosa fai?" style={{flex:1,padding:"9px 12px",background:T.bg,border:`1px solid ${T.purple}33`,borderRadius:6,color:T.txtB,fontFamily:T.f.b,fontSize:13}}/><button onClick={go} style={{padding:"8px 14px",background:T.purple+"22",border:`1px solid ${T.purple}55`,borderRadius:6,cursor:"pointer",color:T.purpleB,fontFamily:T.f.u,fontSize:11}}>→</button></div><button onClick={()=>setOpen(false)} style={{marginTop:4,background:"transparent",border:"none",color:T.txtG,fontFamily:T.f.u,fontSize:9,cursor:"pointer"}}>Annulla</button></div></div>}

// ═══ MAIN ENGINE ═════════════════════════════════════════
export default function Noire(){
  const[stats,setStats]=useState({coraggio:5,istinto:5,intelletto:5,fascino:5});
  const[traits,setTraits]=useState([]);const[inv,setInv]=useState([]);const[journal,setJournal]=useState([]);
  const[rels,setRels]=useState({});const[flags,setFlags]=useState({});
  const[sid,setSid]=useState(null);const[ch,setCh]=useState(-1);
  const[theme,setTheme]=useState("noir");const[innerV,setInnerV]=useState(null);
  const[memPlay,setMemPlay]=useState(null);const[memLoading,setMemLd]=useState(false);

  // Liquid UI: T must update BEFORE render, not after
  T=useMemo(()=>makeT(theme),[theme]);
  const dynCSS=useMemo(()=>`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.goldD}44;border-radius:2px}
@keyframes blink{0%,50%{opacity:.4}51%,100%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes choiceIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes glow{0%,100%{box-shadow:0 0 15px ${T.gold}11}50%{box-shadow:0 0 35px ${T.gold}22}}
@keyframes loadDot{0%,80%,100%{opacity:.15}40%{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes breathe{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
@keyframes moodPulse{0%,100%{opacity:.03}50%{opacity:.08}}
@keyframes wipeIn{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes glitchIn{0%{transform:translate(3px,-2px);opacity:0}15%{transform:translate(-3px,1px);opacity:.7}30%{transform:translate(1px,3px);opacity:.4}45%{transform:translate(-1px,-1px);opacity:.8}60%{transform:translate(2px,0);opacity:.5}100%{transform:translate(0);opacity:1}}
@keyframes flashIn{0%{opacity:0}5%{opacity:1;filter:brightness(3)}20%{filter:brightness(1)}100%{opacity:1}}
@keyframes pageIn{from{transform:perspective(800px) rotateY(40deg);opacity:0}to{transform:perspective(800px) rotateY(0);opacity:1}}
input,textarea{font-family:${T.f.b}}input:focus,textarea:focus{outline:none;border-color:${T.gold}55!important}`,[T]);

  // Scene transition animation per theme
  const sceneAnim=useMemo(()=>{
    const anims={noir:"wipeIn .8s ease-out",scifi:"glitchIn .5s steps(6)",horror:"flashIn .6s ease-out",historical:"pageIn .7s ease-out"};
    return anims[theme]||anims.noir},[theme]);

  const[showC,setShowC]=useState(false);const[nKey,setNK]=useState(0);
  const[fading,setFad]=useState(false);const[loading,setLd]=useState(false);
  const[aiTxt,setAi]=useState(null);const[sbRes,setSbRes]=useState(null);
  const[dice,setDice]=useState(null);const[pend,setPend]=useState(null);
  const[panel,setPanel]=useState(null);const[sndOn,setSndOn]=useState(false);
  const[ending,setEnd]=useState(null);const[ghost,setGhost]=useState(null);
  const[combat,setCombat]=useState(null);const[nego,setNego]=useState(null);
  const[mode,setMode]=useState("splash"); // splash|solo|cold_open|daily|director|recap
  const[reward,setReward]=useState(null);const[timer,setTimer]=useState(null);
  const[preCache,setPreCache]=useState({});const[menuOpen,setMenu]=useState(false);
  const[sussurro,setSussurro]=useState(null);const sceneCountRef=useRef(0);
  const[achs,setAchs]=useState([]);const[achToast,setAchToast]=useState(null);
  const[recap,setRecap]=useState(null);const[chCard,setChCard]=useState(null);
  const[customSc,setCustomSc]=useState(null);const[settingsOpen,setSettings]=useState(false);
  const[sceneHistory,setSceneHist]=useState([]);
  const[echoMsg,setEchoMsg]=useState(null);const[lootMsg,setLootMsg]=useState(null);
  const[cemetery,setCemetery]=useState([]);const circadian=useMemo(()=>getCircadian(),[]);
  const[coldOpen,setColdOpen]=useState(false);const[coldStep,setColdStep]=useState(0);
  const[dailySc,setDailySc]=useState(null);const[dailyLd,setDailyLd]=useState(false);
  const[breakMsg,setBreakMsg]=useState(null);
  const[impactToast,setImpactToast]=useState(null);
  const[streak,setStreak]=useState(0);const[streakLoaded,setStreakLd]=useState(false);
  const[epilogueTagline,setEpiTag]=useState(null);
  const[dirTension,setDirTension]=useState(0);
  const[narrativePlan,setNarPlan]=useState(null);
  const[duetto,setDuetto]=useState(null);
  const[breach,setBreach]=useState(null);const[whisperMode,setWhisper]=useState(null);
  const whisperRef=useRef(new WhisperDetector());
  const snd=useRef(null);const emo=useRef(new Emo());const choiceT=useRef(Date.now());
  const voce=useRef(new Voce());const[voiceOn,setVoiceOn]=useState(false);

  const scene=useMemo(()=>{
    if(customSc&&sid==="custom_play")return{id:"custom_play",ch:0,mood:customSc.mood||"tense",nar:customSc.opening,choices:(customSc.choices||[]).map(c=>({...c,next:"custom_dyn"})),sb:true,loc:customSc.setting||"Sconosciuto"};
    if(sid==="custom_dyn"){const isClimax=dirTension>=8;return{id:"custom_dyn",ch:0,mood:isClimax?"danger":"mystery",isDyn:true,loc:customSc?.setting,_tension:dirTension,_isClimax:isClimax}}
    return SC.find(s=>s.id===sid)},[sid,customSc]);
  const avail=useMemo(()=>scene?.choices?.filter(c=>!c.reqFl||flags[c.reqFl])||null,[scene,flags]);
  const locked=useMemo(()=>scene?.choices?.filter(c=>c.reqFl&&!flags[c.reqFl])||[],[scene,flags]);
  const skills=useMemo(()=>getSkills(traits,stats),[traits,stats]);
  const stateObj=useMemo(()=>({stats,traits,inv,journal,rels,flags,emo:emo.current}),[stats,traits,inv,journal,rels,flags]);

  // Entity Memory — compact world state for AI context (<500 tokens)
  const entityMem=useMemo(()=>{
    const people=Object.entries(rels).map(([n,v])=>`${n}(${v>0?"+":""}${v})`).join(",");
    const items=inv.join(",");
    const discoveries=Object.keys(flags).slice(-8).join(",");
    const recentActs=journal.slice(-4).map(j=>j.text.slice(0,40)).join("; ");
    const tCount=traits.length;
    return`ENTITÀ:{persone:[${people}],oggetti:[${items}],scoperte_recenti:[${discoveries}],azioni_recenti:"${recentActs}",tratti:${tCount}}`;
  },[rels,inv,flags,journal,traits]);

  // Inner Voice — show between scenes
  useEffect(()=>{const voices=INNER[sid];if(voices&&Math.random()>.3){const t=setTimeout(()=>{setInnerV(voices[Math.floor(Math.random()*voices.length)]);setTimeout(()=>setInnerV(null),5000)},1500);return()=>clearTimeout(t)}else setInnerV(null)},[sid]);

  const initSnd=useCallback(()=>{if(!snd.current)snd.current=new Snd();snd.current.init();snd.current.rain();setSndOn(true)},[]);

  // Sound mood
  useEffect(()=>{if(sndOn&&scene?.mood){snd.current?.mood(scene.mood);if(scene.mood==="danger"||scene.mood==="dread")snd.current?.sfx("tension")}if(scene?.mood)voce.current.setMood(scene.mood);
    // Whisper Mode — activate on stealth scenes
    const stealthScenes=["c0_stealth","c0_eaves","c2_lethe"];
    if(stealthScenes.includes(sid)&&!whisperMode){
      setTimeout(async()=>{setWhisper({active:true,detected:false});
        const ok=await whisperRef.current.start(()=>{setWhisper({active:true,detected:true});haptic("fail");whisperRef.current.stop()});
        if(!ok)setWhisper(null); // mic not available, skip
        else setTimeout(()=>{if(whisperRef.current.active){whisperRef.current.stop();setWhisper(null)}},8000) // 8s window
      },3000)}
    else if(!stealthScenes.includes(sid)&&whisperMode){whisperRef.current.stop();setWhisper(null)}
  },[sid,sndOn]);

  // Ghost echo
  useEffect(()=>{const g=GHOSTS[sid];if(g&&Math.random()>.5){const t=setTimeout(()=>setGhost(g[Math.floor(Math.random()*g.length)]),3000);return()=>clearTimeout(t)}},[sid]);

  // Echoes of Others — load remnants (campaign only)
  useEffect(()=>{if(!sid||customSc)return;setEchoMsg(null);setLootMsg(null);
    Echoes.find(sid).then(echoes=>{if(echoes.length>0){const e=echoes[Math.floor(Math.random()*echoes.length)];
      setTimeout(()=>{setEchoMsg(e);haptic("reveal");setTimeout(()=>setEchoMsg(null),10000)},7000)}});
    Echoes.lootFind(sid).then(loot=>{if(loot){setTimeout(()=>{setLootMsg(loot);haptic("success")},4000)}})
  },[sid]);

  // Sussurro — campaign only
  useEffect(()=>{sceneCountRef.current++;if(customSc)return;const sc=sceneCountRef.current;
    const candidates=SUSSURRI.filter(s=>s.after===sc&&s.cond(flags));
    if(candidates.length>0){const s=candidates[Math.floor(Math.random()*candidates.length)];
      const t=setTimeout(()=>{setSussurro(s.text);haptic("tension");snd.current?.sfx("reveal");
        setTimeout(()=>setSussurro(null),8000)},5000);return()=>clearTimeout(t)}
    // Reality Breach — fake notification after sussurro check
    const breachCandidates=BREACH_MSGS.filter(b=>b.after===sc&&b.cond(flags));
    if(breachCandidates.length>0){const b=breachCandidates[Math.floor(Math.random()*breachCandidates.length)];
      const t=setTimeout(()=>{haptic("impact");setBreach(b);setTimeout(()=>setBreach(null),8000)},12000);return()=>clearTimeout(t)}
  },[sid]);

  // Pattern Breaker — works in both modes (generic)
  useEffect(()=>{const br=getBreak(sceneCountRef.current);
    if(br&&!scene?.isMirror&&!scene?.isEnd&&!scene?.isEpilogue){
      if(br.t==="silence"||br.t==="wall"){const t=setTimeout(()=>{setBreakMsg(br);setTimeout(()=>setBreakMsg(null),12000)},2000);return()=>clearTimeout(t)}
      if(br.t==="flash"&&scene?.nar){scene._breakPre=br.pre}
    }else setBreakMsg(null)
  },[sid]);

  // Compression Cycle — compress diary every 20 scenes for long games
  useEffect(()=>{const sc=sceneCountRef.current;
    if(sc>0&&sc%20===0&&journal.length>15){
      const recent=journal.slice(-8);const old=journal.slice(0,-8);
      const compressed={text:`📋 [Compresso: ${old.length} voci] ${old.slice(-3).map(j=>j.text).join(" → ")}`,time:Date.now()};
      setJournal([compressed,...recent])}
  },[sid]);

  // Thread Manager — track open narrative threads for AI coherence
  const openThreads=useMemo(()=>{const t=[];
    if(!flags.knows_mnemosyne)t.push("Scoprire il Progetto Mnemosyne");
    if(flags.knows_mnemosyne&&!flags.has_anamnesis&&!flags.chose_forget)t.push("Trovare l'ANAMNESIS");
    if(!flags.sarris_known&&!flags.sarris_met)t.push("Scoprire chi dirige il Progetto");
    if(flags.mara_ally&&!flags.mara_dead&&!flags.mara_saved)t.push("Il destino di Mara");
    if(flags.knows_ferrante&&!flags.ferrante_fought&&!flags.ferrante_bluffed)t.push("La vera natura di Ferrante");
    if(flags.memory_fragment_1&&!flags.full_truth)t.push("Recuperare tutte le memorie");
    return t},[flags]);

  // AI for special scenes (use pre-cache if available)
  useEffect(()=>{if(!scene)return;
    const cached=preCache[sid];
    if((scene.isMirror||scene.isEnd||scene.isDyn||scene.isEpilogue)&&cached){setAi(cached);setLd(false);return}
    if(scene.isMirror){setLd(true);aiSpecial("mirror",stateObj).then(t=>{setAi(t);setLd(false)}).catch(()=>setLd(false))}
    else if(scene.isEnd){setLd(true);aiSpecial("end",stateObj).then(t=>{setAi(t);setLd(false)}).catch(()=>setLd(false))}
    else if(scene.isDyn){setLd(true);const ctx=customSc?{...customSc,_tension:dirTension,_plan:narrativePlan}:null;
      if(customSc)setDirTension(t=>t+1);
      aiSpecial("bridge",stateObj,ctx).then(t=>{setAi(t);setLd(false)}).catch(()=>setLd(false))}
    else if(scene.isEpilogue){setLd(true);const e=calcEnd(flags,rels);setEnd(e);
      aiSpecial("epilogue",stateObj).then(t=>{setAi(t);setLd(false)}).catch(()=>setLd(false));
      // Generate personalized tagline for poster
      ai(`Genera UNA SOLA frase poetica noir (max 15 parole) per un poster cinematografico. Finale: "${e.t}". Tratti: ${traits.slice(0,3).join(",")}. In italiano, seconda persona. Stile: Raymond Chandler.`,100)
        .then(t=>{if(t)setEpiTag(t.replace(/["""]/g,""))}).catch(()=>{})}
    else{setAi(null);setSbRes(null);setLd(false)}
  },[sid]);

  // Pre-cache: generate next likely AI scenes while player reads
  useEffect(()=>{if(!scene?.choices||loading)return;
    scene.choices.forEach(c=>{if(!c.next)return;const ns=SC.find(s=>s.id===c.next);
      if(ns&&(ns.isMirror||ns.isEnd||ns.isDyn||ns.isEpilogue)&&!preCache[c.next]){
        const type=ns.isMirror?"mirror":ns.isEnd?"end":ns.isDyn?"bridge":"epilogue";
        aiSpecial(type,stateObj).then(t=>{if(t)setPreCache(p=>({...p,[c.next]:t}))})}})
  },[sid]);

  // Timer for moral/tense scenes (loss aversion)
  useEffect(()=>{if(scene?.moral&&showC&&!loading){setTimer(30);haptic("moral")}else setTimer(null)},[showC,sid]);

  // Achievement check
  useEffect(()=>{ACHS.forEach(a=>{if(!achs.includes(a.id)&&a.c(stats,flags,ch)){setAchs(p=>[...p,a.id]);setTimeout(()=>{setAchToast(a);haptic("success");snd.current?.sfx("ok")},500)}});},[sid,flags,stats,ch]);

  // Auto-save (campaign only — Director uses separate key)
  useEffect(()=>{if(ch>=0&&sid&&!customSc)ST.save("noire-v1",{stats,traits,inv,journal,rels,flags,sid,ch,achs})},[sid,achs]);

  // Load streak on mount
  useEffect(()=>{(async()=>{try{const sd=await ST.load("mythosai-streak");
    if(sd){const today=dailySeed();const yesterday=new Date(Date.now()-86400000);const yd=`${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,"0")}-${String(yesterday.getDate()).padStart(2,"0")}`;
      if(sd.last===today)setStreak(sd.count);
      else if(sd.last===yd)setStreak(sd.count); // streak preserved, not yet played today
      else setStreak(0)} // streak broken
    setStreakLd(true)}catch{setStreakLd(true)}})()},[]);

  // Voice narration — speak when narration text is ready
  useEffect(()=>{if(!voiceOn)return;
    // For regular scenes, speak immediately
    if(scene&&!scene.isMirror&&!scene.isEnd&&!scene.isDyn&&!scene.isEpilogue){
      const text=scene._tmp||scene.nar;if(text)voce.current.speak(text)}
  },[sid,voiceOn]);
  // For AI-generated scenes, speak when aiTxt arrives
  useEffect(()=>{if(!voiceOn||!aiTxt)return;voce.current.speak(aiTxt)},[aiTxt,voiceOn]);
  // For skill bleed, speak result
  useEffect(()=>{if(!voiceOn||!sbRes?.narration)return;voce.current.speak(sbRes.narration)},[sbRes,voiceOn]);

  const goTo=(id)=>{voce.current.stop();setTimer(null);setBreakMsg(null);setGhost(null);
    if(sid)setSceneHist(p=>[...p.slice(-20),sid]);
    // Clear stale _tmp from OTHER scenes, NOT the target
    SC.forEach(s=>{if(s.id!==id){if(s._tmp)delete s._tmp;if(s._breakPre)delete s._breakPre}});
    const tgt=SC.find(s=>s.id===id);
    if(tgt&&scene&&tgt.ch>scene.ch){
      setFad(true);
      const chName=CH_NAMES[tgt.ch]||"";const chSub=["","La verità ha un prezzo","Ogni ricordo è un'arma","Il confronto finale","La pioggia si ferma"][tgt.ch]||"";
      setTimeout(()=>{setCh(tgt.ch);setChCard({ch:tgt.ch,name:chName,sub:chSub});setFad(false)},500);
      setTimeout(()=>{setChCard(null);setSid(id);setShowC(false);setLd(false);setNK(k=>k+1)},3500);
      return}
    setFad(true);setTimeout(()=>{setSid(id);setShowC(false);setLd(false);setNK(k=>k+1);setFad(false)},500)};

  const apply=(c)=>{
    if(!sndOn){try{if(!snd.current)snd.current=new Snd();snd.current.init();snd.current.rain();setSndOn(true)}catch{}}
    const ns={...stats};const impacts=[];
    if(c.stat)Object.entries(c.stat).forEach(([k,v])=>{ns[k]=Math.max(1,Math.min(10,(ns[k]||5)+v));impacts.push({l:k.slice(0,3).toUpperCase(),v,c:v>0?"#5aaa5a":"#c44040"})});
    setStats(ns);
    // Traits: fullscreen Reward ONLY if it's a NEW trait (rare event)
    if(c.trait){setTraits(p=>{const n=[...new Set([...p,c.trait])];if(n.length>p.length)setTimeout(()=>setReward({type:"trait",label:c.trait}),800);return n})}
    // Items: Impact Toast only, no fullscreen
    if(c.inv){setInv(p=>[...p,c.inv]);impacts.push({l:c.inv,v:null,c:T.gold,i:"🎒"})}
    if(c.rel){setRels(p=>({...p,[c.rel.n]:(p[c.rel.n]||0)+c.rel.d}));impacts.push({l:c.rel.n.split(" ")[0],v:c.rel.d,c:c.rel.d>0?"#5aaa5a":"#c44040",i:c.rel.d>0?"❤️":"💔"})}
    if(c.jrn)setJournal(p=>[...p,{text:c.jrn,time:Date.now()}]);
    if(c.fl){c.fl.forEach(f=>setFlags(p=>({...p,[f]:true})));
      if(c.fl.includes("mara_dead")){Echoes.leave(sid,innerV,traits,inv,"ha abbandonato Mara");Echoes.lootDrop(inv.slice(-2),sid);Echoes.tombstone(ch,traits,stats,flags,"Mara morta")}
      if(c.fl.includes("elena_betrayed"))Echoes.leave(sid,"Non avrei dovuto fidarmi di Elena...",traits,[],"tradito da Elena");
      if(c.fl.includes("destroyed_all")){Echoes.leave(sid,"Ho bruciato tutto. Non c'è più niente.",traits,inv,"ha distrutto le prove");Echoes.lootDrop(inv,sid)}
      if(c.fl.includes("surrendered"))Echoes.leave(sid,"Mi sono arreso. A volte sopravvivere è tutto.",traits,[],"si è arreso");
    }
    // Impact Toast: only if there are visible changes (not every choice)
    if(impacts.length)setTimeout(()=>{setImpactToast(impacts);setTimeout(()=>setImpactToast(null),2000)},150);
    haptic("impact");emo.current.tick(Date.now()-choiceT.current);
  };

  const handleChoice=(idx)=>{const c=avail[idx];if(!c)return;apply(c);
    if(c.dice){const dm=circadian.dm;setPend(c);setDice({target:Math.max(2,c.dice.t+dm),label:c.dice.l+(dm!==0?` (${circadian.icon} ${dm>0?"+":""}{dm})`:"")});return}goTo(c.next)};

  const handleDice=(result)=>{setDice(null);const c=pend;setPend(null);const ok=result>=c.dice.t;
    setJournal(p=>[...p,{text:ok?`✓ Tiro (${result})`:`✗ Tiro (${result})`,time:Date.now()}]);
    const ns=SC.find(s=>s.id===c.next);
    if(ns){ns._tmp=ok?ns.okN:ns.failN;if(ok&&ns.okFl)ns.okFl.forEach(f=>setFlags(p=>({...p,[f]:true})));if(!ok&&ns.failFl)ns.failFl.forEach(f=>setFlags(p=>({...p,[f]:true})))}
    goTo(c.next)};

  const handleSB=async(text)=>{setShowC(false);setLd(true);emo.current.sbTick();
    const r=await aiSkillBleed(text,scene,stateObj);setSbRes(r);
    const ns={...stats};if(r.stat_changes)Object.entries(r.stat_changes).forEach(([k,v])=>{if(ns[k]!==undefined)ns[k]=Math.max(1,Math.min(10,ns[k]+v))});setStats(ns);
    if(r.new_item)setInv(p=>[...p,r.new_item]);if(r.new_trait)setTraits(p=>[...new Set([...p,r.new_trait])]);
    if(r.journal)setJournal(p=>[...p,{text:`✨ ${r.journal}`,time:Date.now()}]);
    if(r.clever){snd.current?.sfx("reveal");haptic("reveal");setTimeout(()=>setReward({type:"clever",label:"Azione Brillante"}),300)}setLd(false);setNK(k=>k+1)};

  const getNar=()=>{if(sbRes)return(sbRes.clever?"✨ ":"")+sbRes.narration;if(scene?.isMirror||scene?.isEnd||scene?.isDyn||scene?.isEpilogue)return aiTxt||"...";return scene?._tmp||scene?.nar||"..."};
  const getChoices=()=>{if(sbRes)return[{text:"Prosegui...",next:scene?.choices?.[0]?.next||"epilogue",stat:{},jrn:"Dopo azione libera"}];return avail};

  // Compute if any interactive UI will be shown — if not, show fallback
  const hasInteractiveUI=useMemo(()=>{
    if(!showC||loading)return true; // still loading, no fallback needed
    const ch2=getChoices();
    if(ch2?.length>0&&!scene?.isMirror&&!scene?.isEnd&&!scene?.isEpilogue&&!scene?.isDyn)return true; // choices
    if(scene?.next&&(!avail||avail.length===0)&&!scene?.isMirror&&!scene?.isEnd&&!scene?.isEpilogue&&!scene?.isDyn)return true; // auto-continue
    if(scene?.isMirror||scene?.isEnd)return true; // special CTAs
    if(scene?.isDyn)return true; // dynamic CTA
    if(scene?.isEpilogue&&ending)return true; // epilogue
    return false;
  },[showC,loading,scene,avail,ending]);

  // Fallback next: find any valid destination
  const fallbackNext=useMemo(()=>{
    if(scene?.next)return scene.next;
    if(scene?.choices?.[0]?.next)return scene.choices[0].next;
    const idx=SC.findIndex(s=>s.id===sid);
    if(idx>=0&&idx<SC.length-1)return SC[idx+1].id;
    return"epilogue";
  },[scene,sid]);

  // ═══ COLD OPEN — cinematic 60s intro ═══
  if(mode==="cold_open")return(
    <div style={{background:T.bg,minHeight:"100vh",position:"relative",overflow:"hidden"}} onClick={()=>{if(coldStep<3)setColdStep(s=>s+1)}}>
      <link href={FONTS} rel="stylesheet"/><Particles theme={theme}/><Vig/><Grain/><style>{CSS}</style>
      <div style={{position:"relative",zIndex:10,maxWidth:460,margin:"0 auto",padding:"28vh 28px 0",minHeight:"100vh"}}>
        {coldStep>=0&&<p style={{fontFamily:T.f.b,color:T.txt,fontSize:17,fontStyle:"italic",lineHeight:2.2,animation:"fadeUp 2s",opacity:coldStep>=1?0.3:1}}>
          La pioggia picchia sul parabrezza.</p>}
        {coldStep>=1&&<p style={{fontFamily:T.f.b,color:T.txt,fontSize:17,fontStyle:"italic",lineHeight:2.2,animation:"fadeUp 1.5s",marginTop:20,opacity:coldStep>=2?0.3:1}}>
          2:47 AM. Un messaggio da un numero sconosciuto.</p>}
        {coldStep>=2&&<p style={{fontFamily:T.f.d,color:T.gold,fontSize:22,lineHeight:1.6,animation:"fadeUp 1.5s",marginTop:24,fontWeight:400,opacity:coldStep>=3?0.5:1}}>
          "Terzo piano. Stanza 312. Vieni solo, o lei muore."</p>}
        {coldStep>=3&&<div style={{marginTop:36,animation:"fadeUp 1.5s"}}>
          <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:14,fontStyle:"italic",marginBottom:24}}>L'indirizzo è un vecchio hotel nel quartiere portuale.</p>
          {/* Onboarding ghost text */}
          <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,textAlign:"center",marginBottom:16,animation:"fadeIn 3s",opacity:0.5}}>Le tue scelte cambiano la storia. Ogni decisione ha conseguenze.</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[{t:"Ci vado.",n:"c0_lobby",a:"#c44040",i:"⚔️"},{t:"Chiamo qualcuno prima.",n:"c0_call",a:"#9a5aba",i:"💬"},{t:"Cerco un'altra via.",n:"c0_alley",a:"#4a9a5a",i:"👁️"}].map((c,i)=>
              <button key={i} onClick={(e)=>{e.stopPropagation();haptic("impact");initSnd();setCh(0);setSid(c.n);setMode("solo")}} style={{background:T.bgC,border:`1px solid ${c.a}30`,color:T.txtB,fontFamily:T.f.b,fontSize:15,padding:"13px 16px 13px 40px",textAlign:"left",borderRadius:8,cursor:"pointer",animation:`choiceIn .5s ease-out ${i*0.2}s both`,position:"relative"}}>
                <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:0.6}}>{c.i}</span>
                {c.t}</button>)}
          </div>
        </div>}
        {coldStep<3&&<p style={{position:"fixed",bottom:40,left:0,right:0,textAlign:"center",fontFamily:T.f.u,color:T.txtG,fontSize:9,animation:"breathe 1.5s infinite"}}>tocca</p>}
      </div></div>);

  // ═══ DAILY SCENE ═══
  if(mode==="daily"&&dailySc)return(
    <div style={{background:T.bg,minHeight:"100vh",position:"relative",overflow:"hidden"}}>
      <link href={FONTS} rel="stylesheet"/><Particles theme={theme}/><Vig/><Grain/><style>{CSS}</style>
      <div style={{position:"relative",zIndex:10,maxWidth:500,margin:"0 auto",padding:"24px 28px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div><p style={{fontFamily:T.f.u,color:T.gold,fontSize:9,letterSpacing:4,margin:0}}>📅 SCENA DEL GIORNO</p><p style={{fontFamily:T.f.d,color:T.txtB,fontSize:20,margin:"4px 0 0"}}>{dailySc.title}</p></div>
          <div style={{textAlign:"right"}}>{streak>0&&<p style={{fontFamily:T.f.m,color:T.gold,fontSize:11,margin:0}}>🔥 {streak}</p>}<Btn onClick={()=>setMode("splash")}>←</Btn></div>
        </div>
        <Typ key="daily" text={dailySc.narration} speed={22} onDone={()=>{}} style={{color:T.txt,fontSize:15,lineHeight:1.9,fontStyle:"italic",marginBottom:24}}/>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:20}}>
          {(dailySc.choices||[]).map((c,i)=><button key={i} onClick={async()=>{
            haptic("impact");if(c.trait)setTraits(p=>[...new Set([...p,c.trait])]);
            const today=dailySeed();const newStreak=streak+1;setStreak(newStreak);
            await ST.save("mythosai-streak",{last:today,count:newStreak});
            try{await ST.saveShared(`daily:${today}:${Date.now()}`,{trait:c.trait,choice:c.text})}catch{}
            if(newStreak>=3)setTimeout(()=>setReward({type:"trait",label:`🔥 ${newStreak} giorni consecutivi!`}),500);
            // Duetto Narrativo — load other players' choices
            try{const keys=await ST.listShared(`daily:${today}:`);
              const others=[];for(const k of (keys||[]).slice(-10)){try{const d=await ST.loadShared(k);if(d&&d.choice!==c.text)others.push(d)}catch{}}
              if(others.length>0){const other=others[Math.floor(Math.random()*others.length)];
                const duettoText=await ai(`Due investigatori nella stessa scena. Tu hai scelto: "${c.text}". L'altro ha scelto: "${other.choice}". Genera un "Duetto Narrativo": 3 frasi poetiche noir che fondono le due prospettive. Italiano, seconda persona plurale. L'ultima frase deve essere folgorante.`,200);
                setDuetto({yours:c.text,theirs:other.choice,theirTrait:other.trait,text:duettoText});return}}catch{}
            setMode("splash")}} style={{background:T.bgC,border:`1px solid ${T.goldD}22`,color:T.txtB,fontFamily:T.f.b,fontSize:14,padding:"12px 14px",textAlign:"left",borderRadius:8,cursor:"pointer",animation:`choiceIn .5s ease-out ${i*0.2}s both`}}>
            {c.text}</button>)}
        </div>
        {/* Duetto Narrativo */}
        {duetto&&<div style={{marginTop:24,animation:"fadeUp 1s",background:T.bgE,borderRadius:12,padding:18,border:`1px solid ${T.purpleB}22`}}>
          <p style={{fontFamily:T.f.u,color:T.purpleB,fontSize:8,letterSpacing:3,margin:"0 0 10px"}}>🎭 DUETTO NARRATIVO</p>
          <div style={{display:"flex",gap:12,marginBottom:12}}>
            <div style={{flex:1,padding:"8px 10px",background:T.gold+"11",borderRadius:6,borderLeft:`3px solid ${T.gold}`}}>
              <p style={{fontFamily:T.f.u,color:T.gold,fontSize:7,margin:"0 0 3px"}}>TU</p>
              <p style={{fontFamily:T.f.b,color:T.txt,fontSize:11,margin:0}}>{duetto.yours}</p></div>
            <div style={{flex:1,padding:"8px 10px",background:T.purpleB+"11",borderRadius:6,borderLeft:`3px solid ${T.purpleB}`}}>
              <p style={{fontFamily:T.f.u,color:T.purpleB,fontSize:7,margin:"0 0 3px"}}>L'ALTRO</p>
              <p style={{fontFamily:T.f.b,color:T.txt,fontSize:11,margin:0}}>{duetto.theirs}</p></div>
          </div>
          {duetto.text&&<p style={{fontFamily:T.f.b,color:T.txt,fontSize:13,fontStyle:"italic",lineHeight:1.7,margin:"0 0 12px",textAlign:"center"}}>{duetto.text}</p>}
          <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,textAlign:"center",margin:"0 0 10px"}}>In un universo parallelo, siete la stessa persona con due cuori diversi.</p>
          <Btn onClick={()=>{setDuetto(null);setMode("splash")}} primary style={{width:"100%"}}>Continua</Btn>
        </div>}
        <div style={{textAlign:"center",marginTop:24}}>
          <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8}}>{dailySeed()} · Tutti i giocatori</p>
          {streak>0&&<p style={{fontFamily:T.f.u,color:T.gold,fontSize:9,margin:"6px 0 0"}}>🔥 Serie: {streak} giorn{streak===1?"o":"i"}{streak>=7?" — Leggendario!":streak>=3?" — In forma!":""}</p>}
        </div>
      </div></div>);

  // ═══ SPLASH ═══
  if(ch===-1&&mode==="splash")return(
    <div style={{background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <link href={FONTS} rel="stylesheet"/><Particles theme={theme}/><Vig/><Grain/><style>{CSS}</style>
      <div style={{position:"fixed",inset:0,zIndex:4,pointerEvents:"none",overflow:"hidden"}}><div style={{width:"100%",height:2,background:`linear-gradient(90deg,transparent,${T.gold}06,transparent)`,animation:"scan 5s linear infinite"}}/></div>
      <div style={{position:"relative",zIndex:10,textAlign:"center",animation:"fadeUp 1.6s",padding:"0 24px"}}>
        <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:9,letterSpacing:8,textTransform:"uppercase",margin:"0 0 14px"}}>Motore di Realtà Narrativa</p>
        <h1 style={{fontFamily:T.f.d,color:T.txtB,fontSize:56,margin:0,lineHeight:.9,fontWeight:300,letterSpacing:5,textShadow:`0 0 60px ${T.gold}15`}}>NOIRE</h1>
        <p style={{fontFamily:T.f.d,color:T.goldD,fontSize:12,letterSpacing:6,margin:"6px 0 0",textTransform:"uppercase"}}>v 5.0 — The Singularity</p>
        <div style={{width:70,height:1,background:`linear-gradient(90deg,transparent,${T.gold},transparent)`,margin:"18px auto",opacity:.3}}/>
        <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:14,fontStyle:"italic",margin:"0 0 4px"}}>La città non dorme. Tu nemmeno.</p>
        <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,margin:"0 0 24px",letterSpacing:1}}>53 Scene · 14 Finali · Echoes · Director's Mode · Scena del Giorno · Whisper Mode</p>
        <div style={{display:"flex",flexDirection:"column",gap:7,maxWidth:260,margin:"0 auto"}}>
          <button onClick={()=>{haptic("impact");setColdStep(0);setMode("cold_open")}} style={{padding:"14px",background:T.gold+"15",border:`1px solid ${T.gold}55`,color:T.gold,fontFamily:T.f.u,fontSize:12,letterSpacing:3,textTransform:"uppercase",borderRadius:4,cursor:"pointer",animation:"glow 3s infinite"}}>▶ Nuova Storia</button>
          <button onClick={async()=>{setDailyLd(true);const sc=await aiDaily(dailySeed());setDailySc(sc);setDailyLd(false);setMode("daily")}} style={{padding:"12px",background:T.cyan+"12",border:`1px solid ${T.cyan}44`,color:T.cyan,fontFamily:T.f.u,fontSize:11,letterSpacing:2,borderRadius:4,cursor:"pointer",position:"relative"}}>{dailyLd?"⟳ Generazione...":"📅 Scena del Giorno"}{streak>0&&<span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",fontFamily:T.f.m,fontSize:10,color:T.gold}}>🔥{streak}</span>}</button>
          <button onClick={()=>setMode("director")} style={{padding:"12px",background:T.orange+"10",border:`1px solid ${T.orange}33`,color:T.orange,fontFamily:T.f.u,fontSize:11,letterSpacing:2,borderRadius:4,cursor:"pointer"}}>🎬 Director's Mode</button>
          <button onClick={async()=>{const s=await ST.load("noire-v1");if(s){setStats(s.stats);setTraits(s.traits);setInv(s.inv);setJournal(s.journal);setRels(s.rels);setFlags(s.flags);setCh(s.ch);if(s.achs)setAchs(s.achs);
            const r=await aiRecap(s);setRecap(r);setMode("recap")}}} style={{padding:"10px",background:"transparent",border:`1px solid ${T.goldD}22`,color:T.txtD,fontFamily:T.f.u,fontSize:10,letterSpacing:2,borderRadius:4,cursor:"pointer"}}>↻ Continua</button>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:14}}>
          <p onClick={initSnd} style={{fontFamily:T.f.u,color:sndOn?T.gold:T.txtG,fontSize:9,cursor:"pointer",letterSpacing:2}}>{sndOn?"🔊 Audio ON":"🔊 Audio"}</p>
          <p onClick={()=>{if(voiceOn){voce.current.disable();setVoiceOn(false)}else{
            voce.current.enable();setVoiceOn(true);
            // Voice Quality Gate: test with sample
            setTimeout(()=>{voce.current.speak("La pioggia cade sulla città addormentata.")},500)
          }}} style={{fontFamily:T.f.u,color:voiceOn?T.purpleB:T.txtG,fontSize:9,cursor:"pointer",letterSpacing:2}}>{voiceOn?"🎙️ ON — tocca per spegnere":"🎙️ Anteprima Voce"}</p>
        </div>
      </div></div>);

  // ═══ DIRECTOR MODE ═══
  if(mode==="director")return <DirectorMode onBack={()=>setMode("splash")} onPlay={async(sc)=>{
    setCustomSc(sc);setSid("custom_play");setCh(0);setDirTension(0);setNarPlan(null);
    if(sc.genre&&THEMES[sc.genre])setTheme(sc.genre);setMode("solo");
    // Generate Narrative Planner — 3-phase story arc
    try{const plan=await aiJSON(`Sei un narratore. Dato questo scenario: genere="${sc.genre}", titolo="${sc.title}", premessa="${sc.premise}", ambientazione="${sc.setting||""}".
Genera un piano narrativo in 3 fasi per guidare una storia di 8-10 scene. SOLO JSON:
{"setup":"fase 1 (scene 1-3): cosa viene introdotto, quale mistero si apre","complication":"fase 2 (scene 4-6): quale tradimento o rivelazione cambia tutto","climax":"fase 3 (scene 7-10): come si risolve il conflitto, chi vince/perde","destiny":"una frase che descrive il finale inevitabile"}`);
      if(plan)setNarPlan(plan)}catch{}}}/>;

  // ═══ PREVIOUSLY ON ═══
  if(mode==="recap")return(
    <div style={{background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <link href={FONTS} rel="stylesheet"/><Particles theme={theme}/><Vig/><style>{CSS}</style>
      <div style={{position:"relative",zIndex:10,maxWidth:460,padding:"0 24px",textAlign:"center",animation:"fadeUp 1.5s"}}>
        <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:10,letterSpacing:6,textTransform:"uppercase",margin:"0 0 16px"}}>Previously on NOIRE...</p>
        <div style={{width:50,height:1,background:T.gold,margin:"0 auto 20px",opacity:.3}}/>
        {recap?<p style={{fontFamily:T.f.b,color:T.txt,fontSize:16,fontStyle:"italic",lineHeight:1.8,margin:"0 0 30px"}}>{recap}</p>
          :<p style={{fontFamily:T.f.b,color:T.txtD,fontSize:14,animation:"breathe 1.5s infinite"}}>Recupero ricordi...</p>}
        {recap&&<Btn onClick={async()=>{const s=await ST.load("noire-v1");if(s)setSid(s.sid);setRecap(null);setMode("solo")}} primary>Continua →</Btn>}
      </div></div>);


  // ═══ GAME ═══
  return(
    <div style={{background:T.bg,minHeight:"100vh",fontFamily:T.f.b,position:"relative",overflow:"hidden"}}>
      <link href={FONTS} rel="stylesheet"/><Particles theme={theme}/><Vig/><Grain/><style>{dynCSS}</style>
      {/* SCENE TRANSITION EFFECT */}
      {fading&&<div style={{position:"fixed",inset:0,zIndex:100,pointerEvents:"none",
        background:theme==="horror"?"rgba(255,255,255,0.15)":T.bg,
        animation:theme==="scifi"?"glitchIn .5s steps(6)":theme==="horror"?"flashIn .4s":"fadeIn .5s",
        opacity:1}}/>}

      {scene?.mood&&<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1,background:`radial-gradient(ellipse at 50% 80%, rgba(${MOOD_COLORS[scene.mood]||"100,80,60"},.06) 0%, transparent 60%)`,animation:"moodPulse 6s ease-in-out infinite",transition:"background 3s"}}/>}

      {/* MINIMAL HUD — quest + menu only */}
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:60,padding:"10px 20px 6px",background:`linear-gradient(180deg,${T.bg} 0%,${T.bg}dd 70%,transparent 100%)`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {sceneHistory.length>0&&<button onClick={()=>{const prev=sceneHistory[sceneHistory.length-1];setSceneHist(p=>p.slice(0,-1));setSid(prev);setShowC(false);setNK(k=>k+1)}} style={{background:"transparent",border:"none",color:T.txtG,fontFamily:T.f.u,fontSize:10,cursor:"pointer",padding:"2px 4px"}}>←</button>}
            {(QUESTS[sid]||customSc)&&<p style={{fontFamily:T.f.u,color:customSc?(DIR_GENRES.find(g=>g.id===customSc.genre)||{c:T.gold}).c:T.goldD,fontSize:9,letterSpacing:1.5,margin:0,opacity:0.7}}>▸ {customSc?`${customSc.title||"Scenario"} — ${sid==="custom_play"?"Scena d'apertura":"Continua l'avventura"}`:QUESTS[sid]}</p>}
          </div>
          <button onClick={()=>setMenu(!menuOpen)} style={{background:menuOpen?T.gold+"22":"transparent",border:`1px solid ${menuOpen?T.gold+"44":T.gold+"15"}`,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontFamily:T.f.u,color:menuOpen?T.gold:T.txtD,fontSize:10,letterSpacing:1}}>{menuOpen?"✕":"☰"}</button>
        </div>
      </div>

      {/* RADIAL MENU — 3 groups */}
      {menuOpen&&<div onClick={()=>setMenu(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s"}}>
        <div onClick={e=>e.stopPropagation()} style={{maxWidth:300,width:"100%",padding:"0 20px",animation:"fadeUp .3s"}}>
          {/* Character */}
          <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:8,letterSpacing:3,marginBottom:8}}>IL TUO PERSONAGGIO</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}}>
            {[{i:"📋",k:"sheet",l:"Fascicolo"},{i:"📓",k:"jrn",l:"Diario"},{i:"🎒",k:"inv",l:"Inventario"},{i:"🌳",k:"skill",l:"Abilità"}].map(b=>
              <button key={b.k} onClick={()=>{setPanel(b.k);emo.current.panelTick();setMenu(false);haptic("impact")}} style={{background:T.bgC,border:`1px solid ${T.gold}15`,borderRadius:10,padding:"14px 4px",cursor:"pointer",textAlign:"center"}}>
                <span style={{fontSize:20,display:"block",marginBottom:3}}>{b.i}</span>
                <span style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:1}}>{b.l}</span>
              </button>)}
          </div>
          {/* World */}
          <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:8,letterSpacing:3,marginBottom:8}}>IL MONDO</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
            {[{i:"🏠",k:"refuge",l:"Rifugio"},{i:"🏆",k:"achs",l:"Traguardi"},{i:"⚰️",k:"cemetery",l:"Cimitero"}].map(b=>
              <button key={b.k} onClick={()=>{setPanel(b.k);emo.current.panelTick();setMenu(false);haptic("impact")}} style={{background:T.bgC,border:`1px solid ${T.gold}15`,borderRadius:10,padding:"14px 4px",cursor:"pointer",textAlign:"center"}}>
                <span style={{fontSize:20,display:"block",marginBottom:3}}>{b.i}</span>
                <span style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:1}}>{b.l}</span>
              </button>)}
          </div>
          {/* System */}
          <button onClick={()=>{setPanel("settings");setMenu(false)}} style={{width:"100%",background:T.bgC,border:`1px solid ${T.gold}15`,borderRadius:10,padding:"12px",cursor:"pointer",textAlign:"center",marginTop:4}}>
            <span style={{fontSize:16}}>⚙️</span><span style={{fontFamily:T.f.u,color:T.txtD,fontSize:9,marginLeft:6}}>Opzioni</span></button>
        </div>
      </div>}

      {/* Timer for tense/moral scenes */}
      {timer!==null&&showC&&!loading&&<Timer seconds={timer} pulseLock={scene?.type==="tension"} onExpire={()=>{haptic(scene?.type==="tension"?"pulse_release":"fail");setTimer(null);if(avail?.length){const worst=avail[avail.length-1];apply(worst);setJournal(p=>[...p,{text:scene?.type==="tension"?"⚡ Hai mollato la presa — scelta forzata":"⏱️ Tempo scaduto — scelta forzata",time:Date.now()}]);goTo(worst.next)}}}/>}

      {scene?.loc&&<div style={{position:"fixed",top:68,left:0,right:0,zIndex:54,textAlign:"center"}}><span style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,letterSpacing:3}}>📍 {scene.loc}</span></div>}

      {/* Content */}
      <div style={{position:"relative",zIndex:10,maxWidth:500,margin:"0 auto",padding:"56px 28px 130px",opacity:fading?0:1,transition:"opacity .5s"}}>
        {(scene?.isMirror||scene?.isEnd||scene?.isEpilogue)&&!loading&&<div style={{textAlign:"center",marginBottom:16,animation:"fadeUp 1s"}}><p style={{fontFamily:T.f.u,color:T.gold,fontSize:9,letterSpacing:5,textTransform:"uppercase"}}>{scene.isMirror?"Momento dello Specchio":scene.isEpilogue?ending?.t||"Epilogo":"Fine Capitolo"}</p><div style={{width:32,height:1,background:T.gold,margin:"8px auto",opacity:.3}}/></div>}

        {/* Scene type badge */}
        {scene?.type&&!loading&&<div style={{textAlign:"center",marginBottom:12,animation:"fadeUp .8s"}}>
          {scene.type==="revelation"&&<><div style={{background:T.gold+"11",borderRadius:20,padding:"4px 14px",display:"inline-block",border:`1px solid ${T.gold}22`}}><span style={{fontFamily:T.f.u,color:T.goldB,fontSize:9,letterSpacing:3}}>📜 RIVELAZIONE</span></div></>}
          {scene.type==="intimacy"&&<div style={{background:T.purple+"11",borderRadius:20,padding:"4px 14px",display:"inline-block",border:`1px solid ${T.purple}22`}}><span style={{fontFamily:T.f.u,color:T.purpleB,fontSize:9,letterSpacing:3}}>💜 MOMENTO INTIMO</span></div>}
          {scene.type==="tension"&&<div style={{background:T.red+"11",borderRadius:20,padding:"4px 14px",display:"inline-block",border:`1px solid ${T.red}22`,animation:"pulse 1.5s infinite"}}><span style={{fontFamily:T.f.u,color:T.redB,fontSize:9,letterSpacing:3}}>⚡ ALTA TENSIONE</span></div>}
        </div>}

        {/* Cinematic bars for revelation scenes */}
        {scene?.type==="revelation"&&!loading&&<><div style={{position:"fixed",top:0,left:0,right:0,height:40,background:T.bg,zIndex:52}}/><div style={{position:"fixed",bottom:0,left:0,right:0,height:40,background:T.bg,zIndex:52}}/></>}

        {sbRes?.clever&&!loading&&<div style={{textAlign:"center",marginBottom:10,animation:"fadeUp .5s"}}><span style={{fontFamily:T.f.u,color:T.purpleB,fontSize:9,letterSpacing:3}}>✨ Azione Brillante</span></div>}

        {loading&&<div style={{textAlign:"center",padding:"50px 0"}}>{ch>=0&&<p style={{fontFamily:T.f.d,color:T.gold,fontSize:22,fontWeight:300,margin:"0 0 8px",animation:"fadeUp 1s"}}>{CH_NAMES[ch]}</p>}<p style={{fontFamily:T.f.b,color:T.txtD,fontSize:14,fontStyle:"italic"}}><span style={{animation:"loadDot 1.4s infinite 0s"}}>.</span><span style={{animation:"loadDot 1.4s infinite .2s"}}>.</span><span style={{animation:"loadDot 1.4s infinite .4s"}}>.</span></p></div>}

        {!loading&&getNar()!=="..."&&<Typ key={nKey} text={getNar()} speed={scene?.type==="intimacy"?28:scene?.type==="tension"?14:20} dropCap={theme==="historical"} anim={sceneAnim} onDone={()=>{
          // Breathing room: 1.5s pause before choices appear
          setTimeout(()=>{setShowC(true);choiceT.current=Date.now()},scene?.type==="revelation"?2500:1500);
          if(scene?.type==="revelation")haptic("reveal")}} style={{
          color:scene?.type==="revelation"?T.goldB:scene?.mood==="dread"?T.txtD:T.txt,
          fontSize:scene?.type==="intimacy"?17:scene?.type==="revelation"?16:15,
          lineHeight:scene?.type==="intimacy"?2.1:1.8,fontStyle:"italic",
          textShadow:scene?.type==="revelation"?`0 0 30px ${T.gold}22`:scene?.mood==="danger"?`0 0 8px ${T.redB}11`:"none",
          letterSpacing:scene?.mood==="tense"?"-.2px":scene?.type==="intimacy"?".3px":"normal"}}/>}

        {/* Choices — differentiated by stat type */}
        {showC&&getChoices()?.length>0&&!loading&&!scene?.isMirror&&!scene?.isEnd&&!scene?.isEpilogue&&!scene?.isDyn&&<div style={{marginTop:28,display:"flex",flexDirection:"column",gap:8}}>
          {getChoices().map((c,i)=>{
            const sc=c.stat||{};const hasDice=!!c.dice;
            const accent=hasDice?"#b87333":sc.coraggio>0?"#c44040":sc.fascino>0?"#9a5aba":sc.intelletto>0?"#4a7aaa":sc.istinto>0?"#4a9a5a":T.goldD;
            const icon=hasDice?"🎲":sc.coraggio>0?"⚔️":sc.fascino>0?"💬":sc.intelletto>0?"🧠":sc.istinto>0?"👁️":"▸";
            return <button key={i} onClick={()=>{if(sbRes){apply(c);setSbRes(null);goTo(c.next);return}handleChoice(i)}} style={{background:T.bgC,border:`1px solid ${accent}30`,color:T.txtB,fontFamily:T.f.b,fontSize:14,padding:"12px 14px 12px 38px",textAlign:"left",borderRadius:8,cursor:"pointer",transition:"all .2s",animation:`choiceIn .5s ease-out ${i*0.25}s both`,lineHeight:1.5,position:"relative"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=accent+"66";e.currentTarget.style.background=T.bgE}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=accent+"30";e.currentTarget.style.background=T.bgC}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:0.7}}>{icon}</span>
              {hasDice&&<span style={{fontFamily:T.f.u,color:accent,fontSize:8,letterSpacing:1,display:"block",marginBottom:2}}>{c.dice.l} — {c.dice.t}+</span>}
              {c.text}
            </button>})}
          {/* Locked choices — visible but disabled */}
          {locked.map((c,i)=><div key={"lock"+i} style={{background:T.bg,border:`1px solid ${T.txtG}15`,borderRadius:8,padding:"10px 14px 10px 38px",opacity:0.35,position:"relative",animation:`choiceIn .5s ease-out ${(getChoices().length+i)*0.15}s both`}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13}}>🔒</span>
            <span style={{fontFamily:T.f.b,color:T.txtD,fontSize:13}}>{c.text}</span>
            <span style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,display:"block",marginTop:2}}>{c.reqFl?.replace(/_/g," ")}</span>
          </div>)}
        </div>}

        {/* Auto-continue for non-choice scenes */}
        {showC&&scene?.next&&(!avail||avail.length===0)&&!sbRes&&!scene?.isMirror&&!scene?.isEnd&&!scene?.isEpilogue&&!scene?.isDyn&&!loading&&
          <div style={{marginTop:24,textAlign:"center",animation:scene?.type==="revelation"?"fadeUp 2s":"fadeUp .8s"}}>
            {scene?.type==="revelation"&&<div style={{width:40,height:1,background:T.gold,margin:"0 auto 14px",opacity:.2}}/>}
            <Btn onClick={()=>goTo(scene.next)} primary>Continua →</Btn>
          </div>}

        {/* Special CTAs */}
        {showC&&(scene?.isMirror||scene?.isEnd)&&!loading&&<div style={{marginTop:24,textAlign:"center",animation:"fadeUp 1s"}}>
          <div style={{width:50,height:1,background:T.gold,margin:"0 auto 16px",opacity:.2}}/>
          {scene.isMirror&&<Btn onClick={()=>goTo("c1_dawn")} primary>Capitolo 1: La Verità Sotto →</Btn>}
          {scene.isEnd&&scene.ch===1&&<Btn onClick={()=>goTo("c1_mirror_tape")} primary>La Registrazione →</Btn>}
          {scene.isEnd&&scene.ch===2&&<Btn onClick={()=>goTo(flags.mara_ally&&!flags.mara_dead?"c2_mara_danger":"c3_start")} primary>Capitolo 3: Il Progetto Mnemosyne →</Btn>}
        </div>}
        {showC&&scene?.isDyn&&!loading&&<div style={{marginTop:24,textAlign:"center"}}>
          {/* Tension bar for Director Mode */}
          {customSc&&<div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,letterSpacing:2}}>TENSIONE</span>
              <span style={{fontFamily:T.f.m,color:dirTension>=8?T.redB:dirTension>=5?T.gold:T.txtD,fontSize:10}}>{dirTension}/10</span>
            </div>
            <div style={{height:3,background:T.bg,borderRadius:2,overflow:"hidden"}}><div style={{width:`${Math.min(dirTension*10,100)}%`,height:"100%",background:dirTension>=8?T.redB:dirTension>=5?T.gold:T.goldD,transition:"width 0.8s ease-out",borderRadius:2}}/></div>
            {/* Narrative Plan phase indicator */}
            {narrativePlan&&<p style={{fontFamily:T.f.b,color:T.txtD,fontSize:9,fontStyle:"italic",margin:"6px 0 0",lineHeight:1.4}}>
              {dirTension<3?`📖 ${narrativePlan.setup?.slice(0,80)||"Setup..."}`:dirTension<6?`⚡ ${narrativePlan.complication?.slice(0,80)||"Complicazione..."}`:dirTension<8?`🔥 ${narrativePlan.climax?.slice(0,80)||"Climax..."}`:`🎯 ${narrativePlan.destiny||"Il destino si compie."}`}</p>}
            {!narrativePlan&&dirTension>=8&&<p style={{fontFamily:T.f.u,color:T.redB,fontSize:8,margin:"6px 0 0",animation:"breathe 1.5s infinite"}}>⚡ CLIMAX — Il confronto finale si avvicina</p>}
          </div>}
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            {customSc&&dirTension<10&&<Btn onClick={()=>{setFad(true);setTimeout(()=>{setSid("custom_dyn");setShowC(false);setNK(k=>k+1);setFad(false)},500)}} primary>{dirTension>=8?"⚡ Scena Climax":"Scena Successiva →"}</Btn>}
            <Btn onClick={()=>{if(customSc)setDirTension(0);goTo("epilogue")}} primary={!customSc||dirTension>=10}>{dirTension>=10?"🎬 Epilogo Finale":customSc?"Concludi":"Verso l'Epilogo →"}</Btn>
          </div>
        </div>}
        {showC&&scene?.isEpilogue&&!loading&&ending&&<div style={{marginTop:24,textAlign:"center",animation:"fadeUp 1s"}}>
          <div style={{width:60,height:1,background:T.gold,margin:"0 auto 16px",opacity:.3}}/>
          <p style={{fontSize:36,margin:"0 0 8px"}}>{ending.i}</p>
          <p style={{fontFamily:T.f.d,color:T.goldB,fontSize:22,margin:"0 0 6px",fontWeight:300}}>{ending.t}</p>
          <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:13,margin:"0 0 20px",fontStyle:"italic",maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>{ending.d}</p>

          {/* COMPLETION STATS */}
          <div style={{background:T.bgE,borderRadius:10,padding:16,marginBottom:16,textAlign:"left",border:`1px solid ${T.gold}11`}}>
            <p style={{fontFamily:T.f.u,color:T.gold,fontSize:9,letterSpacing:3,textTransform:"uppercase",margin:"0 0 12px",textAlign:"center"}}>La Tua Storia</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[{l:"Scene",v:sceneCountRef.current,i:"📖"},{l:"Tratti",v:traits.length,i:"🎭"},{l:"Scoperte",v:Object.keys(flags).length,i:"🏴"},{l:"Oggetti",v:inv.length,i:"🎒"},{l:"Relazioni",v:Object.keys(rels).length,i:"🤝"},{l:"Diario",v:journal.length,i:"📓"}].map((s,i)=>
                <div key={i} style={{textAlign:"center"}}><span style={{fontSize:16}}>{s.i}</span><p style={{fontFamily:T.f.d,color:T.txtB,fontSize:18,margin:"2px 0 0"}}>{s.v}</p><p style={{fontFamily:T.f.u,color:T.txtD,fontSize:7,letterSpacing:1,margin:0}}>{s.l}</p></div>)}
            </div>

            {/* NPC Fates */}
            <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:2,margin:"0 0 8px"}}>DESTINO DEI PERSONAGGI</p>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {[
                {n:"Mara Voss",fate:flags.mara_dead?"💀 Morta sul tetto del Lethe":flags.mara_saved?"💚 Salva — ferita ma viva":flags.mara_ally?"🤝 Alleata fino alla fine":"🔇 Mai contattata"},
                {n:"Elena Sarris",fate:flags.elena_betrayed?"💔 Tradita — ha puntato la pistola":(rels["Elena"]||0)>2?"💛 Al tuo fianco":(rels["Elena"]||0)<-1?"❄️ Separati":"🔍 Complicato"},
                {n:"Marco Ferrante",fate:flags.ferrante_fought?"⚔️ Scontro finale":flags.ferrante_bluffed?"🃏 Bluffato":flags.ferrante_ally?"🤝 Alleato tradito":"🕵️ Nell'ombra"},
                {n:"Valentina Rini",fate:flags.v_trusted?"🤝 Alleata della verità":"❓ Sconosciuta"},
                {n:"Carlo Sarris",fate:flags.sarris_enemy?"👊 Nemico":flags.sarris_met?"🤝 Incontrato":"👻 Mai trovato"},
              ].map((npc,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 8px",background:T.goldG,borderRadius:4}}>
                <span style={{fontFamily:T.f.b,color:T.txt,fontSize:11}}>{npc.n}</span>
                <span style={{fontFamily:T.f.u,color:T.txtD,fontSize:9}}>{npc.fate}</span>
              </div>)}
            </div>
          </div>

          <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:9}}>Profilo: {emo.current.profile().style} · {(emo.current.profile().avg/1000).toFixed(1)}s media</p>
          <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,marginTop:4}}>1 di 14 finali · {achs.length}/{ACHS.length} traguardi · Ogni scelta apre un percorso diverso</p>

          {/* MYTHOS POSTER — cinematic film-noir ending card */}
          <div style={{background:`linear-gradient(180deg, ${T.bg} 0%, ${T.bgC} 40%, ${T.bg} 100%)`,borderRadius:14,padding:0,marginTop:20,border:`1px solid ${T.gold}22`,overflow:"hidden",position:"relative"}}>
            {/* Film grain texture */}
            <div style={{position:"absolute",inset:0,opacity:.03,mixBlendMode:"overlay",backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}/>
            {/* Top bar */}
            <div style={{background:`linear-gradient(90deg,transparent,${T.gold}11,transparent)`,padding:"12px 16px 0",textAlign:"center"}}>
              <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:7,letterSpacing:6,margin:0}}>UN FILM DI</p>
              <p style={{fontFamily:T.f.d,color:T.gold,fontSize:10,margin:"2px 0",letterSpacing:4}}>MYTHOSAI PRESENTS</p>
            </div>
            {/* Title area */}
            <div style={{padding:"20px 20px 16px",textAlign:"center",position:"relative"}}>
              <p style={{fontSize:40,margin:"0 0 6px",filter:`drop-shadow(0 0 20px ${T.gold}22)`}}>{ending.i}</p>
              <h2 style={{fontFamily:T.f.d,color:T.txtB,fontSize:26,margin:"0 0 6px",fontWeight:300,letterSpacing:2,lineHeight:1.1}}>{ending.t}</h2>
              <div style={{width:50,height:1,background:`linear-gradient(90deg,transparent,${T.gold},transparent)`,margin:"8px auto",opacity:.3}}/>
              <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:12,fontStyle:"italic",margin:"0 0 14px",lineHeight:1.5,maxWidth:280,marginLeft:"auto",marginRight:"auto"}}>{ending.d}</p>
              {/* AI-generated personalized tagline */}
              {epilogueTagline&&<p style={{fontFamily:T.f.d,color:T.gold,fontSize:14,fontStyle:"italic",margin:"0 0 16px",lineHeight:1.4,maxWidth:300,marginLeft:"auto",marginRight:"auto",textShadow:`0 0 20px ${T.gold}22`}}>"{epilogueTagline}"</p>}
              {/* Traits as "starring" */}
              <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:7,letterSpacing:4,margin:"0 0 6px"}}>INTERPRETATO DA</p>
              <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:10}}>
                {traits.slice(0,5).map((t,i)=><span key={i} style={{fontFamily:T.f.d,fontSize:13,color:i===0?T.goldB:T.txt,fontWeight:i===0?600:300,letterSpacing:1}}>{t}</span>)}
              </div>
            </div>
            {/* Stats bar */}
            <div style={{background:T.bg,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:12}}>
                {Object.entries(stats).map(([k,v])=><div key={k} style={{textAlign:"center"}}><p style={{fontFamily:T.f.d,color:T.txtB,fontSize:16,margin:0,fontWeight:600}}>{v}</p><p style={{fontFamily:T.f.u,color:T.txtG,fontSize:6,margin:0,letterSpacing:1,textTransform:"uppercase"}}>{k.slice(0,3)}</p></div>)}
              </div>
              <div style={{textAlign:"right"}}><p style={{fontFamily:T.f.m,color:T.txtD,fontSize:9,margin:0}}>{sceneCountRef.current} scene</p><p style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,margin:0}}>{emo.current.profile().style}</p></div>
            </div>
            {/* Bottom brand */}
            <div style={{padding:"8px 16px 12px",textAlign:"center",background:`linear-gradient(90deg,transparent,${T.gold}08,transparent)`}}>
              <p style={{fontFamily:T.f.d,color:T.gold,fontSize:12,margin:0,letterSpacing:6,fontWeight:300}}>MYTHOSAI</p>
              <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:6,margin:"2px 0 0",letterSpacing:2}}>NARRATIVE REALITY ENGINE · {achs.length} TRAGUARDI · {Object.keys(flags).length} SCOPERTE</p>
              {/* Rarity — calculated from flags complexity */}
              {(()=>{const rare=Math.max(1,Math.min(12,Math.round(100/(1+Object.keys(flags).length+traits.length))));
                return <p style={{fontFamily:T.f.m,color:rare<=5?T.gold:T.txtD,fontSize:9,margin:"6px 0 0"}}>
                  {rare<=3?"💎 Finale Leggendario — solo il ~"+rare+"% lo ottiene":rare<=7?"⭐ Finale Raro — ~"+rare+"% dei giocatori":"Finale ottenuto dal ~"+rare+"% dei giocatori"}</p>})()}
              {/* Story DNA — shareable code */}
              {(()=>{const dna=btoa(JSON.stringify({e:ending?.t?.slice(0,12),t:traits.slice(0,3),f:Object.keys(flags).length,s:sceneCountRef.current})).replace(/=/g,"").slice(0,20);
                return <div style={{marginTop:8}}>
                  <p style={{fontFamily:T.f.m,color:T.gold,fontSize:11,letterSpacing:2,textAlign:"center",margin:"0 0 4px"}}>DNA: {dna}</p>
                  <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:6,textAlign:"center",margin:0}}>Condividi il tuo DNA — altri giocatori erediteranno il tuo mondo</p>
                </div>})()}
              <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,margin:"8px 0 0",opacity:.4}}>📸 Screenshot per condividere</p>
            </div>
          </div>

          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:16}}>
            <Btn onClick={async()=>{await ST.del("noire-v1");setCh(-1);setSid(null);setStats({coraggio:5,istinto:5,intelletto:5,fascino:5});setTraits([]);setInv([]);setJournal([]);setRels({});setFlags({});setEnd(null);setAi(null);setSbRes(null);sceneCountRef.current=0;setMode("splash")}} primary>🔄 Nuova Campagna</Btn>
          </div>
        </div>}

        {/* UNIVERSAL FALLBACK — prevents dead-end blocking */}
        {showC&&!loading&&!hasInteractiveUI&&<div style={{marginTop:24,textAlign:"center",animation:"fadeUp 1s"}}>
          <div style={{width:30,height:1,background:T.gold,margin:"0 auto 12px",opacity:.15}}/>
          <Btn onClick={()=>goTo(fallbackNext)} primary>Continua →</Btn>
        </div>}
      </div>

      {/* Skill Bleed */}
      {scene?.sb&&showC&&!loading&&!sbRes&&!scene?.isMirror&&!scene?.isEnd&&!scene?.isEpilogue&&!combat&&!nego&&<SBInput onSubmit={handleSB}/>}

      {/* Combat/Negotiation triggers from scene */}
      {showC&&scene?.combat&&!loading&&!combat&&<div style={{position:"fixed",bottom:scene?.sb?60:12,left:12,right:12,zIndex:68,animation:"slideUp .5s"}}><button onClick={()=>setCombat(scene.combat)} style={{width:"100%",padding:"11px",background:T.red+"15",border:`1px solid ${T.redB}33`,color:T.redB,fontFamily:T.f.u,fontSize:11,borderRadius:6,cursor:"pointer",letterSpacing:1}}>⚔️ Ingaggia Combattimento — {scene.combat.enemy}</button></div>}
      {showC&&scene?.negotiate&&!loading&&!nego&&<div style={{position:"fixed",bottom:scene?.sb?60:12,left:12,right:12,zIndex:67,marginBottom:scene?.combat?44:0,animation:"slideUp .5s"}}><button onClick={()=>setNego(scene.negotiate)} style={{width:"100%",padding:"11px",background:`${T.cyan}15`,border:`1px solid ${T.cyan}33`,color:T.cyan,fontFamily:T.f.u,fontSize:11,borderRadius:6,cursor:"pointer",letterSpacing:1}}>💬 Negozia con {scene.negotiate.npc}</button></div>}

      {/* Combat overlay */}
      {combat&&<CombatScreen enemy={combat.enemy} stats={stats} skills={skills} snd={snd.current} voce={voiceOn?voce.current:null} onEnd={(won,method)=>{
        setCombat(null);
        if(won){setTraits(p=>[...new Set([...p,"Combattente"])]);setJournal(p=>[...p,{text:`⚔️ Vittoria: ${combat.enemy} (${method})`,time:Date.now()}])}
        else{setJournal(p=>[...p,{text:`⚔️ Sconfitta: ${combat.enemy}`,time:Date.now()}]);setStats(s=>({...s,coraggio:Math.max(1,s.coraggio-1)}))}
      }}/>}

      {/* Negotiation overlay */}
      {nego&&<NegoScreen npc={nego.npc} ctx={nego.ctx} stats={stats} snd={snd.current} voce={voiceOn?voce.current:null} onEnd={(won)=>{
        setNego(null);
        if(won){setTraits(p=>[...new Set([...p,"Negoziatore"])]);setJournal(p=>[...p,{text:`💬 Negoziazione riuscita: ${nego.npc}`,time:Date.now()}]);setRels(p=>({...p,[nego.npc]:(p[nego.npc]||0)+2}))}
        else{setJournal(p=>[...p,{text:`💬 Negoziazione fallita: ${nego.npc}`,time:Date.now()}])}
      }}/>}

      {/* Ghost */}
      {ghost&&<div onClick={()=>setGhost(null)} style={{position:"fixed",bottom:100,left:14,right:14,zIndex:80,background:"rgba(14,14,23,.96)",border:`1px solid ${T.cyan}33`,borderRadius:8,padding:"10px 14px",cursor:"pointer",animation:"slideUp .6s"}}><p style={{fontFamily:T.f.u,fontSize:8,color:T.cyan,letterSpacing:3,margin:"0 0 3px",opacity:.7}}>👻 Eco</p><p style={{fontFamily:T.f.b,fontSize:12,color:T.txt,margin:0,fontStyle:"italic"}}>{ghost}</p></div>}

      {/* SUSSURRO — narrative whisper */}
      {sussurro&&<div onClick={()=>setSussurro(null)} style={{position:"fixed",top:80,left:14,right:14,zIndex:85,background:"rgba(10,10,15,.98)",border:`1px solid ${T.gold}33`,borderRadius:10,padding:"14px 16px",cursor:"pointer",animation:"slideUp .6s",boxShadow:`0 0 30px ${T.gold}11`}}>
        <p style={{fontFamily:T.f.u,fontSize:8,color:T.gold,letterSpacing:4,textTransform:"uppercase",margin:"0 0 5px",opacity:.7}}>📱 Il Sussurro</p>
        <p style={{fontFamily:T.f.b,fontSize:13,color:T.txt,margin:0,fontStyle:"italic",lineHeight:1.5}}>{sussurro}</p>
      </div>}

      {/* INNER VOICE — protagonist's thoughts */}
      {innerV&&!breakMsg&&<div style={{position:"fixed",bottom:scene?.sb?65:16,left:14,right:14,zIndex:75,animation:"fadeUp .8s",pointerEvents:"none"}}>
        <p style={{fontFamily:T.f.b,color:T.purpleB,fontSize:12,fontStyle:"italic",textAlign:"center",margin:0,opacity:.65,lineHeight:1.4}}>{innerV}</p>
      </div>}

      {/* PATTERN BREAKER — anti-repetition moment */}
      {breakMsg&&<div style={{position:"fixed",inset:0,zIndex:190,background:`${T.bg}f5`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,animation:"fadeIn 1.5s"}} onClick={()=>setBreakMsg(null)}>
        <div style={{maxWidth:420,textAlign:"center"}}>
          <p style={{fontFamily:T.f.b,color:breakMsg.t==="wall"?T.gold:T.txt,fontSize:breakMsg.t==="wall"?15:16,fontStyle:"italic",lineHeight:2,margin:"0 0 20px"}}>{breakMsg.nar}</p>
          {breakMsg.t==="forced"&&breakMsg.ch&&<button onClick={()=>{apply(breakMsg.ch);setBreakMsg(null)}} style={{padding:"12px 24px",background:T.gold+"22",border:`1px solid ${T.gold}55`,color:T.gold,fontFamily:T.f.u,fontSize:11,borderRadius:4,cursor:"pointer"}}>{breakMsg.ch.text}</button>}
          {breakMsg.t!=="forced"&&<p style={{fontFamily:T.f.u,color:T.txtG,fontSize:9,animation:"breathe 1.5s infinite"}}>tocca per continuare</p>}
        </div>
      </div>}

      {/* ECHO — remnant from another player */}
      {echoMsg&&<div onClick={()=>setEchoMsg(null)} style={{position:"fixed",bottom:110,left:14,right:14,zIndex:82,background:"rgba(8,8,18,.97)",border:`1px solid ${T.cyan}33`,borderRadius:10,padding:"12px 14px",cursor:"pointer",animation:"slideUp .8s",boxShadow:`0 0 20px ${T.cyan}11`}}>
        <p style={{fontFamily:T.f.u,fontSize:8,color:T.cyan,letterSpacing:3,margin:"0 0 4px",opacity:.7}}>👤 ECO DI UN ALTRO INVESTIGATORE</p>
        <p style={{fontFamily:T.f.b,fontSize:12,color:T.txt,margin:"0 0 4px",fontStyle:"italic",lineHeight:1.4}}>Vedi i resti di qualcuno passato prima di te... la sua voce interiore riecheggia:</p>
        <p style={{fontFamily:T.f.b,fontSize:13,color:T.cyan,margin:"0 0 4px",fontStyle:"italic"}}>"{echoMsg.voice}"</p>
        <p style={{fontFamily:T.f.u,fontSize:8,color:T.txtG,margin:0}}>Tratti: {echoMsg.traits?.join(", ")||"—"} · {echoMsg.cause||"scomparso"}</p>
      </div>}

      {/* IMPACT TOAST — immediate consequence feedback */}
      {impactToast&&<div style={{position:"fixed",top:52,right:16,zIndex:88,display:"flex",flexDirection:"column",gap:4,animation:"slideUp .4s"}}>
        {impactToast.map((imp,i)=><div key={i} style={{background:"rgba(8,8,14,.95)",border:`1px solid ${imp.c}44`,borderRadius:8,padding:"5px 12px",display:"flex",alignItems:"center",gap:8,animation:`fadeUp .3s ease-out ${i*0.1}s both`}}>
          {imp.i&&<span style={{fontSize:12}}>{imp.i}</span>}
          <span style={{fontFamily:T.f.u,color:imp.c,fontSize:10,letterSpacing:1}}>{imp.l}</span>
          {imp.v!==null&&<span style={{fontFamily:T.f.m,color:imp.c,fontSize:11,fontWeight:600}}>{imp.v>0?"+":""}{imp.v}</span>}
        </div>)}
      </div>}

      {/* LOOT — item from a fallen player */}
      {lootMsg&&<div style={{position:"fixed",top:90,left:14,right:14,zIndex:83,background:"rgba(10,15,8,.97)",border:`1px solid ${T.greenB}33`,borderRadius:10,padding:"12px 14px",animation:"slideUp .6s",boxShadow:`0 0 20px ${T.greenB}11`}}>
        <p style={{fontFamily:T.f.u,fontSize:8,color:T.greenB,letterSpacing:3,margin:"0 0 4px"}}>📦 BOTTINO DI UN CADUTO</p>
        <p style={{fontFamily:T.f.b,fontSize:12,color:T.txt,margin:"0 0 8px",fontStyle:"italic"}}>Un investigatore caduto ha lasciato qualcosa...</p>
        <div style={{display:"flex",gap:6}}>{lootMsg.items?.map((item,i)=>
          <button key={i} onClick={()=>{setInv(p=>[...p,item]);setLootMsg(null);haptic("success");setTimeout(()=>setReward({type:"item",label:`${item} (da un caduto)`}),300)}} style={{flex:1,padding:"8px",background:T.greenB+"15",border:`1px solid ${T.greenB}44`,borderRadius:6,cursor:"pointer",fontFamily:T.f.b,color:T.greenB,fontSize:11,textAlign:"center"}}>Raccogli: {item}</button>)}
          <button onClick={()=>setLootMsg(null)} style={{padding:"8px 12px",background:"transparent",border:`1px solid ${T.txtG}33`,borderRadius:6,cursor:"pointer",fontFamily:T.f.u,color:T.txtG,fontSize:9}}>Ignora</button>
        </div>
      </div>}

      {/* REALITY BREACH — fake notification */}
      {breach&&<div onClick={()=>setBreach(null)} style={{position:"fixed",top:12,left:12,right:12,zIndex:200,
        background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)",borderRadius:14,padding:"12px 16px",
        boxShadow:"0 8px 32px rgba(0,0,0,.6)",animation:"slideUp .4s",cursor:"pointer",
        display:"flex",alignItems:"center",gap:12,border:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#2d5aa0,#1a365d)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:16}}>💬</span></div>
        <div style={{flex:1,minWidth:0}}>
          <p style={{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",color:"#fff",fontSize:13,fontWeight:600,margin:0}}>{breach.from}</p>
          <p style={{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",color:"rgba(255,255,255,.7)",fontSize:12,margin:"2px 0 0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{breach.text}</p>
        </div>
        <span style={{fontFamily:"-apple-system,sans-serif",color:"rgba(255,255,255,.3)",fontSize:10,flexShrink:0}}>ora</span>
      </div>}

      {/* WHISPER MODE — stealth mic challenge */}
      {whisperMode&&<div style={{position:"fixed",inset:0,zIndex:195,background:"rgba(0,0,0,.96)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
        <div style={{width:80,height:80,borderRadius:"50%",border:`2px solid ${whisperMode.detected?"#c44040":"#3a7a3a"}`,display:"flex",alignItems:"center",justifyContent:"center",
          background:whisperMode.detected?"rgba(120,20,20,.2)":"rgba(30,60,30,.15)",transition:"all .3s",
          boxShadow:whisperMode.detected?"0 0 30px rgba(200,40,40,.2)":"0 0 20px rgba(40,120,40,.1)"}}>
          <span style={{fontSize:32}}>{whisperMode.detected?"🔊":"🤫"}</span></div>
        <p style={{fontFamily:T.f.b,color:whisperMode.detected?T.redB:T.greenB,fontSize:15,fontStyle:"italic",margin:"16px 0 6px",textAlign:"center"}}>
          {whisperMode.detected?"Ti hanno sentito!":"Sussurra la tua scelta..."}</p>
        <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:9,textAlign:"center",maxWidth:260}}>
          {whisperMode.detected?"Il rumore ti ha tradito. La guardia si avvicina.":"Parla piano. Se alzi la voce, verrai scoperto."}</p>
        {whisperMode.detected&&<Btn onClick={()=>{whisperRef.current.stop();setWhisper(null);
          if(avail?.length){const worst=avail[avail.length-1];apply(worst);goTo(worst.next)}}} style={{marginTop:16}}>Affronta le conseguenze</Btn>}
      </div>}

      {/* MEMORY PLAYBACK overlay */}
      {memPlay&&<Panel onClose={()=>setMemPlay(null)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:18}}>🔄</span><h2 style={{fontFamily:T.f.d,color:T.purpleB,fontSize:18,margin:0}}>Memory Playback</h2></div>
        <p style={{fontFamily:T.f.u,color:T.purpleB,fontSize:9,letterSpacing:2,margin:"0 0 6px"}}>👁️ DAL PUNTO DI VISTA DI {memPlay.npc?.toUpperCase()}</p>
        <div style={{width:36,height:1,background:T.purpleB,marginBottom:12,opacity:.3}}/>
        {memLoading?<p style={{fontFamily:T.f.b,color:T.txtD,fontSize:13,fontStyle:"italic",animation:"breathe 1.5s infinite"}}>Ricostruzione della memoria...</p>
          :<p style={{fontFamily:T.f.b,color:T.txt,fontSize:14,fontStyle:"italic",lineHeight:1.8,margin:0}}>{memPlay.text}</p>}
        <Btn onClick={()=>setMemPlay(null)} style={{width:"100%",marginTop:14}}>Chiudi</Btn>
      </Panel>}

      {/* Audio mute toggle - only show if audio is already playing */}
      {sndOn&&<button onClick={()=>{snd.current?.destroy();snd.current=null;setSndOn(false)}} style={{position:"fixed",bottom:16,right:12,zIndex:65,background:T.bgC,border:`1px solid ${T.gold}18`,borderRadius:14,padding:"5px 10px",cursor:"pointer",fontSize:9,fontFamily:T.f.u,color:T.txtG}}>🔊</button>}

      {dice&&<DiceRoll target={dice.target} label={dice.label} onResult={(r)=>{haptic(r>=dice.target?"success":"fail");handleDice(r)}} snd={snd.current}/>}

      {/* REWARD OVERLAY */}
      {reward&&<Reward type={reward.type} label={reward.label} onDone={()=>setReward(null)}/>}

      {/* CHAPTER TITLE CARD */}
      {chCard&&<div style={{position:"fixed",inset:0,zIndex:210,background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fadeIn 1s"}}>
        <p style={{fontFamily:T.f.u,color:T.goldD,fontSize:10,letterSpacing:8,textTransform:"uppercase",margin:"0 0 10px"}}>Capitolo {chCard.ch}</p>
        <h1 style={{fontFamily:T.f.d,color:T.txtB,fontSize:34,margin:"0 0 8px",fontWeight:300,letterSpacing:2,textAlign:"center",padding:"0 20px"}}>{chCard.name}</h1>
        <div style={{width:50,height:1,background:T.gold,margin:"10px 0 12px",opacity:.3}}/>
        <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:14,fontStyle:"italic",margin:0}}>{chCard.sub}</p>
      </div>}

      {/* ACHIEVEMENT TOAST */}
      {achToast&&<div style={{position:"fixed",top:80,left:"50%",transform:"translateX(-50%)",zIndex:220,background:T.bgE,border:`1px solid ${T.goldB}44`,borderRadius:12,padding:"12px 20px",display:"flex",alignItems:"center",gap:12,animation:"slideUp .5s",boxShadow:`0 8px 30px ${T.sh}`,backdropFilter:"blur(10px)",minWidth:220}}>
        <span style={{fontSize:28}}>{achToast.i}</span>
        <div><p style={{fontFamily:T.f.u,color:T.goldB,fontSize:10,letterSpacing:2,margin:0,fontWeight:700}}>TRAGUARDO</p><p style={{fontFamily:T.f.d,color:T.txtB,fontSize:16,margin:"2px 0 0",fontWeight:400}}>{achToast.n}</p><p style={{fontFamily:T.f.b,color:T.txtD,fontSize:10,margin:"1px 0 0"}}>{achToast.d}</p></div>
        <button onClick={()=>setAchToast(null)} style={{background:"transparent",border:"none",color:T.txtG,cursor:"pointer",fontSize:14,marginLeft:8}}>✕</button>
      </div>}

      {/* Panels */}
      {panel==="sheet"&&<Panel onClose={()=>setPanel(null)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>📋</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Fascicolo</h2></div><div style={{width:36,height:1.5,background:T.gold,marginBottom:16,opacity:.35}}/>
        {/* Stats with animated bars */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 20px",marginBottom:18}}>
          {Object.entries(stats).map(([k,v])=>{
            const colors={coraggio:"#c44040",istinto:"#4a9a5a",intelletto:"#4a7aaa",fascino:"#9a5aba"};
            return <div key={k}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:3}}>
              <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,textTransform:"uppercase",letterSpacing:2,margin:0}}>{k}</p>
              <span style={{fontFamily:T.f.d,color:T.txtB,fontSize:22,fontWeight:600}}>{v}</span></div>
              <div style={{height:4,background:T.bg,borderRadius:2,overflow:"hidden"}}><div style={{width:`${v*10}%`,height:"100%",background:`linear-gradient(90deg,${colors[k]||T.gold},${colors[k]||T.gold}88)`,transition:"width 0.8s ease-out",borderRadius:2}}/></div>
            </div>})}
        </div>
        {/* Circadian context */}
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:T.bgE,borderRadius:6,marginBottom:14}}>
          <span style={{fontSize:16}}>{circadian.icon}</span>
          <div><p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,margin:0,letterSpacing:1}}>{circadian.p.replace("_"," ").toUpperCase()}</p>
            <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:10,margin:"1px 0 0",fontStyle:"italic"}}>{circadian.hint}</p></div>
        </div>
        {traits.length>0&&<><p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:2,margin:"0 0 6px"}}>TRATTI</p><div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>{traits.map((t,i)=><span key={i} style={{fontFamily:T.f.u,fontSize:10,color:T.gold,background:T.goldG,border:`1px solid ${T.gold}15`,borderRadius:4,padding:"3px 9px"}}>{t}</span>)}</div></>}
        {Object.keys(rels).length>0&&<><p style={{fontFamily:T.f.u,color:T.txtD,fontSize:8,letterSpacing:2,margin:"0 0 6px"}}>RELAZIONI</p><div style={{marginBottom:14}}>{Object.entries(rels).map(([n,v])=><div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:T.goldG,borderRadius:4,marginBottom:4}}><span style={{fontFamily:T.f.b,color:T.txt,fontSize:12}}>{n}</span><span style={{fontFamily:T.f.m,fontSize:11,color:v>0?"#5aaa5a":"#c44040",fontWeight:600}}>{v>0?"+":""}{v} {v>0?"❤️":"💔"}</span></div>)}</div></>}
        <p style={{fontFamily:T.f.u,color:T.txtG,fontSize:8,margin:"0 0 4px"}}>Scene: {sceneCountRef.current} · {circadian.icon} {circadian.p.replace("_"," ")}</p>
        {/* Emotional Profile — integrated */}
        {(()=>{const p=emo.current.profile();return <div style={{marginTop:10,padding:12,background:T.bgE,borderRadius:8,border:`1px solid ${T.gold}11`}}>
          <p style={{fontFamily:T.f.u,color:T.gold,fontSize:8,letterSpacing:2,margin:"0 0 8px"}}>🧠 PROFILO EMOTIVO</p>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <div style={{flex:1,textAlign:"center"}}><p style={{fontFamily:T.f.d,color:T.goldB,fontSize:16,margin:0,textTransform:"capitalize"}}>{p.style}</p><p style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,margin:0}}>STILE</p></div>
            <div style={{flex:1,textAlign:"center"}}><p style={{fontFamily:T.f.d,color:T.txtB,fontSize:16,margin:0}}>{(p.avg/1000).toFixed(1)}s</p><p style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,margin:0}}>TEMPO</p></div>
            <div style={{flex:1,textAlign:"center"}}><p style={{fontFamily:T.f.d,color:p.analytical?T.greenB:T.txtD,fontSize:16,margin:0}}>{p.analytical?"Sì":"No"}</p><p style={{fontFamily:T.f.u,color:T.txtG,fontSize:7,margin:0}}>ANALITICO</p></div>
          </div>
          <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:10,fontStyle:"italic",margin:0,lineHeight:1.4}}>
            {p.style==="impulsivo"?"Agisci prima di pensare. Scene con meno tempo e più colpi di scena.":
             p.style==="decisivo"?"Sai cosa vuoi. Scelte nette, conseguenze immediate.":
             p.style==="ponderato"?"Pesi ogni opzione. Dettagli extra e sfumature.":
             "Ogni scelta è meditazione. Indizi nascosti e sottotesti."}</p>
        </div>})()}
        {openThreads.length>0&&<div style={{marginTop:10,padding:10,background:T.bgE,borderRadius:6,border:`1px solid ${T.gold}11`}}>
          <p style={{fontFamily:T.f.u,color:T.gold,fontSize:8,letterSpacing:2,textTransform:"uppercase",margin:"0 0 6px"}}>🧵 Fili Aperti</p>
          {openThreads.map((t,i)=><p key={i} style={{fontFamily:T.f.b,color:T.txtD,fontSize:11,margin:"0 0 3px",paddingLeft:8,borderLeft:`2px solid ${T.gold}33`}}>{t}</p>)}
        </div>}
        <Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn>
      </Panel>}
      {panel==="jrn"&&<Panel onClose={()=>setPanel(null)}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><span style={{fontSize:18}}>📓</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Diario</h2></div>{journal.length===0?<p style={{fontFamily:T.f.b,color:T.txtD,fontStyle:"italic",fontSize:12}}>Vuoto.</p>:<div style={{display:"flex",flexDirection:"column",gap:5}}>{journal.slice().reverse().map((e,i)=><div key={i} style={{borderLeft:`2px solid ${e.text.startsWith("✨")?T.purpleB+"55":T.gold+"33"}`,paddingLeft:10}}><p style={{fontFamily:T.f.b,color:T.txt,fontSize:11,margin:0,lineHeight:1.4}}>{e.text}</p></div>)}</div>}<Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn></Panel>}
      {panel==="inv"&&<Panel onClose={()=>setPanel(null)}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><span style={{fontSize:18}}>🎒</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Inventario</h2></div>{inv.length===0?<p style={{fontFamily:T.f.b,color:T.txtD,fontStyle:"italic",fontSize:12}}>Vuoto.</p>:<div style={{display:"flex",flexDirection:"column",gap:5}}>{inv.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:T.goldG,borderRadius:4}}><span>📦</span><span style={{fontFamily:T.f.b,color:T.txt,fontSize:12}}>{item}</span></div>)}</div>}<Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn></Panel>}
      {panel==="skill"&&<Panel onClose={()=>setPanel(null)}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><span style={{fontSize:18}}>🌳</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Abilità</h2></div>
        {traits.flatMap(t=>(SKILLS[t]||[]).map(s=>({...s,trait:t,ok:stats[s.s]>=s.r}))).length===0?<p style={{fontFamily:T.f.b,color:T.txtD,fontStyle:"italic",fontSize:12}}>Acquisisci tratti per sbloccare.</p>:
        <div style={{display:"flex",flexDirection:"column",gap:6}}>{traits.flatMap(t=>(SKILLS[t]||[]).map(s=>({...s,trait:t,ok:stats[s.s]>=s.r}))).map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:s.ok?T.goldG:T.bgE,border:`1px solid ${s.ok?T.gold+"22":T.txtG+"22"}`,borderRadius:5,opacity:s.ok?1:.4}}><span style={{fontSize:18}}>{s.i}</span><div style={{flex:1}}><p style={{fontFamily:T.f.u,color:s.ok?T.gold:T.txtD,fontSize:10,fontWeight:600,margin:0}}>{s.n}</p><p style={{fontFamily:T.f.b,color:T.txtD,fontSize:9,margin:"1px 0 0"}}>{s.d}</p></div><span style={{fontFamily:T.f.m,color:T.txtG,fontSize:8}}>{stats[s.s]||0}/{s.r}</span></div>)}</div>}
        <Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn></Panel>}

      {/* ACHIEVEMENTS */}
      {panel==="achs"&&<Panel onClose={()=>setPanel(null)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>🏆</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Traguardi</h2></div>
        <div style={{width:36,height:1.5,background:T.gold,marginBottom:14,opacity:.35}}/>
        <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:9,margin:"0 0 10px"}}>{achs.length}/{ACHS.length} sbloccati</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {ACHS.map(a=>{const u=achs.includes(a.id);return <div key={a.id} style={{padding:"10px 8px",background:u?T.goldG:T.bgE,border:`1px solid ${u?T.gold+"22":T.txtG+"15"}`,borderRadius:8,textAlign:"center",opacity:u?1:.3,transition:"all .3s"}}>
            <span style={{fontSize:22,display:"block",marginBottom:3}}>{u?a.i:"🔒"}</span>
            <p style={{fontFamily:T.f.u,color:u?T.gold:T.txtG,fontSize:9,fontWeight:600,margin:"0 0 2px"}}>{u?a.n:"???"}</p>
            <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:8,margin:0}}>{u?a.d:"Scopri come sbloccarlo"}</p>
          </div>})}
        </div>
        <Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn>
      </Panel>}

      {/* CEMETERY — fallen investigators */}
      {panel==="cemetery"&&<Panel onClose={()=>setPanel(null)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>⚰️</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Il Cimitero</h2></div>
        <div style={{width:36,height:1.5,background:T.gold,marginBottom:10,opacity:.35}}/>
        <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:11,fontStyle:"italic",margin:"0 0 14px"}}>Investigatori caduti prima di te.</p>
        {cemetery.length===0?<div><p style={{fontFamily:T.f.b,color:T.txtG,fontSize:12,fontStyle:"italic"}}>Nessuna lapide trovata.</p><Btn onClick={async()=>{const t=await Echoes.cemetery();setCemetery(t)}} style={{marginTop:8}}>🔍 Cerca nel Cimitero</Btn></div>
        :<div style={{display:"flex",flexDirection:"column",gap:8}}>{cemetery.map((t,i)=>{
          const age=Math.floor((Date.now()-t.ts)/3600000);
          return <div key={i} style={{background:T.bgE,borderRadius:8,padding:12,border:`1px solid ${T.gold}11`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontFamily:T.f.d,color:T.txtB,fontSize:14}}>⚰️ Investigatore Caduto</span>
              <span style={{fontFamily:T.f.m,color:T.txtG,fontSize:8}}>{age<24?`${age}h fa`:`${Math.floor(age/24)}g fa`}</span>
            </div>
            <p style={{fontFamily:T.f.b,color:T.redB,fontSize:11,margin:"0 0 4px",fontStyle:"italic"}}>"{t.cause||"causa ignota"}"</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>{(t.traits||[]).map((tr,j)=><span key={j} style={{fontFamily:T.f.u,fontSize:8,color:T.gold,background:T.goldG,borderRadius:3,padding:"1px 5px"}}>{tr}</span>)}</div>
            <p style={{fontFamily:T.f.m,color:T.txtG,fontSize:8,margin:0}}>Cap.{t.ch} · {t.nFlags||0} scoperte · COR:{t.stats?.coraggio||"?"} IST:{t.stats?.istinto||"?"}</p>
          </div>})}</div>}
        <Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn>
      </Panel>}

      {/* REFUGE — evolving hideout */}
      {panel==="refuge"&&<Panel onClose={()=>setPanel(null)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>🏠</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Il Rifugio</h2></div>
        <div style={{width:36,height:1.5,background:T.gold,marginBottom:14,opacity:.35}}/>
        {(()=>{const level=ch>=3?"ufficio":ch>=2?"monolocale":ch>=1?"retrobottega":"auto";
          const desc={auto:"Il sedile posteriore della tua auto. Pioggia sul tettuccio. L'unico posto sicuro che hai.",
            retrobottega:"Il retro di un bar nel quartiere cinese. Puzza di frittura e segreti.",
            monolocale:"Il monolocale di Mara sopra la lavanderia. Muri sottili, caffè forte.",
            ufficio:"Un ufficio anonimo al terzo piano. La conspiracy board copre una parete intera."};
          const icons={auto:"🚗",retrobottega:"🍜",monolocale:"🏠",ufficio:"🏢"};
          return <div>
            <div style={{background:T.bgE,borderRadius:10,padding:16,marginBottom:14,textAlign:"center",border:`1px solid ${T.gold}11`}}>
              <span style={{fontSize:36}}>{icons[level]}</span>
              <p style={{fontFamily:T.f.d,color:T.goldB,fontSize:16,margin:"8px 0 4px",textTransform:"capitalize"}}>{level==="auto"?"La tua auto":level==="retrobottega"?"Retrobottega":level==="monolocale"?"Monolocale di Mara":"L'Ufficio"}</p>
              <p style={{fontFamily:T.f.b,color:T.txtD,fontSize:12,fontStyle:"italic",margin:0}}>{desc[level]}</p>
            </div>
            {/* Evidence wall + connections — dynamic */}
            <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:9,letterSpacing:2,textTransform:"uppercase",margin:"0 0 8px"}}>Bacheca d'Indagine</p>
            {(()=>{const clues=[
              {id:"hotel",name:"Hotel Minerva",found:true,icon:"🏚️"},
              {id:"312",name:"Stanza 312",found:flags.met_antagonist||flags.antagonist_surprised,icon:"🚪"},
              {id:"mnemosyne",name:"Mnemosyne",found:flags.knows_mnemosyne||flags.lab_discovered,icon:"🧠"},
              {id:"anamnesis",name:"ANAMNESIS",found:flags.has_anamnesis,icon:"💊"},
              {id:"sarris",name:"Sarris",found:flags.sarris_met||flags.sarris_known,icon:"👨‍⚕️"},
              {id:"ferrante",name:"Ferrante",found:flags.knows_ferrante,icon:"🕵️"},
            ].filter(c=>c.found);
            return clues.length>0?<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {clues.map(c=><div key={c.id} style={{background:T.goldG,borderRadius:6,padding:"6px 10px",display:"flex",alignItems:"center",gap:4,border:`1px solid ${T.gold}15`}}>
                <span style={{fontSize:14}}>{c.icon}</span><span style={{fontFamily:T.f.u,color:T.txt,fontSize:8}}>{c.name}</span></div>)}
              {inv.map((item,i)=><div key={"inv"+i} style={{background:T.cyan+"11",borderRadius:6,padding:"6px 10px",display:"flex",alignItems:"center",gap:4,border:`1px solid ${T.cyan}15`}}>
                <span style={{fontSize:12}}>📌</span><span style={{fontFamily:T.f.u,color:T.cyan,fontSize:8}}>{item}</span></div>)}
            </div>:<p style={{fontFamily:T.f.b,color:T.txtG,fontSize:11,fontStyle:"italic",margin:"0 0 14px"}}>Nessun indizio. Ancora.</p>})()}
            {/* NPC photos on desk — with UI SCARS */}
            {Object.keys(rels).length>0&&<>
              <p style={{fontFamily:T.f.u,color:T.txtD,fontSize:9,letterSpacing:2,textTransform:"uppercase",margin:"0 0 8px"}}>Sulla Scrivania</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {Object.entries(rels).map(([name,val])=>{
                  const npcIcons={"Mara Voss":"👩‍💼","Elena":"👩","Ferrante":"🕵️","Valentina":"👩‍🔬","Carlo Sarris":"👨‍⚕️"};
                  const dead=(name==="Mara Voss"&&flags.mara_dead);
                  const npcCtx={"Elena":"Ex fidanzata. Figlia di Sarris. Sa più di quanto ammette.","Ferrante":"L'uomo nell'ombra. Alleato o manipolatore?","Mara Voss":"Ex poliziotta. L'unica che si è esposta per te.","Valentina":"Figlia di Aldo Rini. Vuole vendetta.","Carlo Sarris":"Il direttore. Padre di Elena. Creatore di Mnemosyne."};
                  return <div key={name} style={{background:dead?"rgba(40,20,20,.2)":val>0?T.green+"15":T.red+"15",borderRadius:8,padding:"8px 12px",border:`1px solid ${dead?T.redB+"22":val>0?T.greenB+"33":T.redB+"33"}`,textAlign:"center",opacity:dead?0.5:1,position:"relative"}}>
                    <span style={{fontSize:20,filter:dead?"grayscale(1)":"none"}}>{npcIcons[name]||"👤"}</span>
                    <p style={{fontFamily:T.f.u,color:dead?T.txtG:T.txt,fontSize:9,margin:"4px 0 0",textDecoration:dead?"line-through":"none"}}>{name.split(" ")[0]}</p>
                    {dead?<p style={{fontFamily:T.f.m,color:T.redB,fontSize:8,margin:"2px 0 0"}}>💀</p>
                      :<p style={{fontFamily:T.f.m,color:val>0?T.greenB:T.redB,fontSize:10,margin:"2px 0 0"}}>{val>0?"❤️":"💔"} {val>0?"+":""}{val}</p>}
                    {!dead&&journal.length>3&&<button onClick={async()=>{setPanel(null);setMemLd(true);setMemPlay({npc:name,text:null});
                      const lastNar=journal.filter(j=>j.text.includes(name.split(" ")[0])).slice(-1)[0]?.text||scene?.nar||"";
                      const t=await aiMemoryPlayback(lastNar,name,npcCtx[name]||"",buildStoryBible(stateObj));
                      setMemPlay({npc:name,text:t});setMemLd(false)}} style={{background:"transparent",border:`1px solid ${T.purpleB}33`,borderRadius:4,padding:"2px 6px",cursor:"pointer",marginTop:4,display:"block",width:"100%"}}><span style={{fontFamily:T.f.u,color:T.purpleB,fontSize:7}}>🔄 POV</span></button>}
                  </div>})}
              </div>
            </>}
          </div>})()}
        <Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:14}}>Chiudi</Btn>
      </Panel>}



      {/* SETTINGS */}
      {panel==="settings"&&<Panel onClose={()=>setPanel(null)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>⚙️</span><h2 style={{fontFamily:T.f.d,color:T.gold,fontSize:20,margin:0}}>Opzioni</h2></div>
        <div style={{width:36,height:1.5,background:T.gold,marginBottom:14,opacity:.35}}/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:T.f.u,color:T.txt,fontSize:12}}>🔊 Soundscape</span>
            <Btn onClick={()=>{if(sndOn){snd.current?.destroy();snd.current=null;setSndOn(false)}else initSnd()}} primary={sndOn}>{sndOn?"ON":"OFF"}</Btn>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><span style={{fontFamily:T.f.u,color:T.txt,fontSize:12}}>🎙️ Voce Narratrice</span>
              {voiceOn&&<div style={{marginTop:3}}>
                <p style={{fontFamily:T.f.m,color:"#88aacc",fontSize:9,margin:0}}>📱 Web Speech — {voce.current?.mood||"mystery"}</p>
                {voce.current?.wsVoice&&<p style={{fontFamily:T.f.m,color:T.txtG,fontSize:8,margin:"1px 0 0"}}>{voce.current.wsVoice.name}</p>}
                <p style={{fontFamily:T.f.m,color:T.txtG,fontSize:7,margin:"2px 0 0"}}>{voce.current?.allVoices?.length||0} voci · Frase per frase · Mood-adaptive</p>
                <p style={{fontFamily:T.f.m,color:T.goldD,fontSize:7,margin:"3px 0 0",fontStyle:"italic"}}>ElevenLabs attivo nell'app nativa</p>
              </div>}</div>
            <Btn onClick={()=>{if(voiceOn){voce.current.disable();setVoiceOn(false)}else{voce.current.enable();setVoiceOn(true)}}} primary={voiceOn}>{voiceOn?"ON":"OFF"}</Btn>
          </div>
          <div>
            <p style={{fontFamily:T.f.u,color:T.txt,fontSize:12,margin:"0 0 8px"}}>🎨 Tema Visivo</p>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{Object.keys(THEMES).map(tid=>
              <button key={tid} onClick={()=>setTheme(tid)} style={{padding:"5px 10px",background:theme===tid?T.gold+"22":"transparent",border:`1px solid ${theme===tid?T.gold+"55":T.txtG+"33"}`,borderRadius:12,cursor:"pointer",fontFamily:T.f.u,fontSize:9,color:theme===tid?T.gold:T.txtD,textTransform:"capitalize"}}>{tid}</button>)}</div>
          </div>
          <div>
            <p style={{fontFamily:T.f.u,color:T.txt,fontSize:12,margin:"0 0 6px"}}>📊 Statistiche Sessione</p>
            <div style={{background:T.bgE,borderRadius:6,padding:10}}>
              <p style={{fontFamily:T.f.m,color:T.txtD,fontSize:10,margin:"0 0 3px"}}>Scene giocate: {sceneCountRef.current}</p>
              <p style={{fontFamily:T.f.m,color:T.txtD,fontSize:10,margin:"0 0 3px"}}>Capitolo: {CH_NAMES[ch]||"—"}</p>
              <p style={{fontFamily:T.f.m,color:T.txtD,fontSize:10,margin:"0 0 3px"}}>Traguardi: {achs.length}/{ACHS.length}</p>
              <p style={{fontFamily:T.f.m,color:T.txtD,fontSize:10,margin:0}}>Profilo: {emo.current.profile().style}</p>
            </div>
          </div>
          <div style={{borderTop:`1px solid ${T.goldD}22`,paddingTop:12}}>
            <Btn onClick={async()=>{await ST.del("noire-v1");setCh(-1);setSid(null);setStats({coraggio:5,istinto:5,intelletto:5,fascino:5});setTraits([]);setInv([]);setJournal([]);setRels({});setFlags({});setEnd(null);setAi(null);setSbRes(null);setAchs([]);sceneCountRef.current=0;setTheme("noir");setPanel(null);setMode("splash")}} style={{width:"100%",color:T.redB,borderColor:T.redB+"33"}}>🗑️ Reset Campagna</Btn>
          </div>
        </div>
        <Btn onClick={()=>setPanel(null)} style={{width:"100%",marginTop:12}}>Chiudi</Btn>
      </Panel>}
    </div>);
}

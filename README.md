# MythosAI v5.0 — The Singularity

**Narrative Reality Engine** — Storie che ti conoscono.

53 scene · 14 finali · 4 temi · AI-powered · Whisper Mode · Pulse Lock · Director's Mode

---

## Deploy su Vercel (5 minuti)

### 1. Crea il repository GitHub

```bash
cd mythosai
git init
git add .
git commit -m "MythosAI v5.0 — The Singularity"
```

Vai su **github.com → New Repository** → nome: `mythosai` → Create.

```bash
git remote add origin https://github.com/TUO-USERNAME/mythosai.git
git branch -M main
git push -u origin main
```

### 2. Deploy su Vercel

1. Vai su **vercel.com** → Sign up con GitHub
2. Click **"Add New Project"**
3. Seleziona il repo **mythosai**
4. Framework Preset: **Vite** (auto-detected)
5. **Environment Variables** — CRITICO:
   - Nome: `ANTHROPIC_API_KEY`
   - Valore: la tua API key Anthropic (`sk-ant-...`)
6. Click **Deploy**

Vercel builderà il progetto e ti darà un URL tipo `mythosai-xxx.vercel.app`.

### 3. Dominio custom (opzionale)

In Vercel → Settings → Domains → aggiungi `mythosai.it` o il dominio che preferisci.

---

## Struttura Progetto

```
mythosai/
├── api/
│   └── ai.js          ← Serverless proxy (protegge API key)
├── src/
│   ├── App.jsx         ← MythosAI engine (2047 righe)
│   └── main.jsx        ← Entry point + storage polyfill
├── public/
├── index.html          ← Mobile-optimized HTML
├── package.json
├── vite.config.js
├── vercel.json         ← Routing config
└── .env.example        ← Template variabili ambiente
```

## Come funziona

- **Client** (`App.jsx`): React app con tutto il game engine
- **API** (`api/ai.js`): Vercel serverless function che fa da proxy verso Anthropic
- La API key **non è MAI esposta** nel codice client
- Lo storage usa `localStorage` (polyfill in `main.jsx`)

## Sviluppo locale

```bash
npm install
echo "ANTHROPIC_API_KEY=sk-ant-xxx" > .env
npm run dev
```

Per testare le serverless functions in locale:
```bash
npx vercel dev
```

---

## Costi stimati

| Servizio | Costo |
|---|---|
| Vercel (Hobby) | Gratis (100GB bandwidth) |
| Anthropic API | ~$0.01-0.05 per sessione |
| Dominio | ~$10/anno |

Con 1000 utenti/giorno a 10 chiamate AI: ~$15-50/mese di API.

---

Built with 🖤 and Claude.

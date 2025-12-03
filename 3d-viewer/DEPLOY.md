# 🚀 Come pubblicare il sito online

## Opzione 1: Netlify Drop (PIÙ SEMPLICE - 2 minuti)

1. Vai su **https://app.netlify.com/drop**
2. Trascina la cartella `3d-viewer` nella pagina
3. Netlify ti darà un link immediato tipo: `https://random-name-123.netlify.app`
4. ✅ Fatto! Il sito è online

## Opzione 2: Vercel (Semplice)

1. Vai su **https://vercel.com** e registrati (gratis)
2. Clicca "Add New Project"
3. Trascina la cartella `3d-viewer`
4. Clicca "Deploy"
5. ✅ Riceverai un link tipo: `https://your-project.vercel.app`

## Opzione 3: GitHub Pages (Gratis, permanente)

1. Crea un account su **https://github.com** (se non ce l'hai)
2. Crea un nuovo repository (es. `3d-viewer`)
3. Carica tutti i file della cartella `3d-viewer` nel repository
4. Vai su Settings > Pages
5. Seleziona branch `main` e cartella `/root`
6. ✅ Il sito sarà disponibile su: `https://tuousername.github.io/3d-viewer`

## Opzione 4: Surge.sh (Da terminale)

```bash
npm install -g surge
cd 3d-viewer
surge
```
Segui le istruzioni e otterrai un link tipo: `https://your-name.surge.sh`

---

**Raccomandazione**: Usa **Netlify Drop** - è il più veloce e non richiede registrazione!


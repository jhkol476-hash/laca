# Visualizzatore 3D

Un sito web moderno per visualizzare oggetti 3D interattivi.

## Caratteristiche

- 🎨 Interfaccia moderna e responsive
- 🎮 Controlli intuitivi con mouse e touch
- 📦 4 oggetti 3D predefiniti (Cubo, Sfera, Toro, Teapot)
- 🚌 Modello Mercedes Bus (GLB)
- ✨ Illuminazione realistica con ombre
- 🔄 Rotazione automatica degli oggetti

## Come usare

### Opzione 1: Server locale (Consigliato)

**Per evitare problemi CORS con i file GLB, usa un server locale:**

1. **Windows**: Doppio click su `server.bat`
2. **Mac/Linux**: Esegui `python3 server.py` nella cartella del progetto
3. Il browser si aprirà automaticamente su `http://localhost:8000`

### Opzione 2: Aprire direttamente

1. Apri `index.html` nel tuo browser
2. ⚠️ **Nota**: I modelli GLB potrebbero non caricarsi a causa delle restrizioni CORS del browser

### Controlli

1. Usa i pulsanti per cambiare oggetto
2. Interagisci con la scena:
   - **Mouse sinistro**: Ruota la scena
   - **Mouse destro**: Trascina per spostare
   - **Rotella**: Zoom avanti/indietro
   - **Touch**: Usa i gesti su dispositivi mobili

## Tecnologie

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Three.js (libreria 3D)

## File inclusi

- `index.html` - Pagina principale
- `app.js` - Logica 3D con Three.js
- `style.css` - Stili
- `mercedes-bus.glb` - Modello 3D dell'autobus Mercedes
- `server.py` - Server HTTP locale (Python)
- `server.bat` - Script per avviare il server su Windows

## Requisiti

- Browser moderno con supporto WebGL
- Python 3.x (solo per il server locale, opzionale)

## Browser supportati

Tutti i browser moderni che supportano ES6 Modules e WebGL.


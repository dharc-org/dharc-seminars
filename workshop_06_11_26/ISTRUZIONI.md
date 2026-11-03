# Workshop RAG: istruzioni

Workshop pratico di circa tre ore sulla *Retrieval-Augmented Generation* (RAG): si costruisce una
pipeline di ricerca e risposta su SQuAD (circa 19.000 paragrafi di Wikipedia) e se ne misura ogni stadio.
Livello: **intermedio**. Serve saper eseguire celle Python in un notebook; non serve esperienza di
machine learning.

## Cosa c'è in questa cartella

| File | A cosa serve |
|---|---|
| `rag_workshop_colab.ipynb` | Versione per **Google Colab**: gira nel cloud, basta un browser. |
| `rag_workshop_local.ipynb` | Versione per il **proprio computer**: il modello linguistico gira in locale con Ollama. |
| `index.html` | Le slide del workshop, interattive. Si aprono nel browser; `P` apre la vista relatore con le note. |
| `script.html` | Lo script per chi presenta: cosa dire, cosa fare e cosa chiedere slide per slide, con tempi e glossario. È generato dalle note delle slide. |
| `ISTRUZIONI.md` / `ISTRUZIONI.txt` | Questo documento (stesso contenuto, due formati). |

I due notebook hanno lo stesso contenuto didattico. Cambiano solo la preparazione dell'ambiente
(sezione 1.1) e alcune indicazioni pratiche.

## Quale versione scegliere

| | Colab | Locale |
|---|---|---|
| Cosa serve | Account Google e browser | Python 3.10+, Ollama, ~10 GB di disco |
| Preparazione prima del workshop | Nessuna (facoltativo: provare ad aprirlo) | 30–60 minuti, **da fare a casa** |
| Velocità del modello | Veloce con GPU T4 (gratuita, ma non garantita) | Dipende dall'hardware (vedi sotto) |
| Dove finiscono i dati | Sui server di Google | Restano sul computer |
| Persistenza | La macchina si cancella a fine sessione | I file restano |
| Rete il giorno del workshop | Indispensabile per tutta la durata | Serve solo se non si è scaricato tutto prima |

**In breve:** chi ha un portatile recente con almeno 16 GB di RAM, o un Mac con chip Apple, può usare la
versione locale. Tutti gli altri, o chi non riesce a completare l'installazione, usano Colab. Conviene
che ognuno abbia **Colab come piano B**.

---

## Versione Colab

### Requisiti

- Un account Google (anche personale).
- Un browser recente: Chrome, Firefox, Edge o Safari.
- Una connessione stabile per tutta la durata del workshop.

### Passi

1. Aprire [colab.research.google.com](https://colab.research.google.com) → **File → Carica blocco note**
   → selezionare `rag_workshop_colab.ipynb`.
2. **Runtime → Cambia tipo di runtime → GPU T4 → Salva.** Il notebook la richiede già, ma conviene
   verificare.
3. Eseguire la **sezione 1.1**: installa la libreria `datasets` e Ollama, avvia il server e scarica il
   modello. Ci vogliono circa **3–5 minuti**.
4. Proseguire dall'alto verso il basso con `Shift + Invio`.

### Limiti da conoscere

- **La GPU gratuita non è garantita.** Nelle ore di punta Colab può assegnare una macchina senza GPU.
  In quel caso la sezione 1.1 scarica in automatico il modello più piccolo (`gemma3:4b`): il notebook
  funziona, ma ogni risposta richiede decine di secondi.
- **Sessioni a tempo.** Una sessione inattiva si disconnette dopo circa 90 minuti; una sessione gratuita
  dura comunque al massimo alcune ore. Durante le pause conviene eseguire una cella ogni tanto. Dopo una
  disconnessione: **Runtime → Esegui tutto**.
- **I file non restano.** `rag_results.csv` e `rag_outputs.jsonl` vanno scaricati con l'ultima cella
  della parte principale ("Keep your results").
- **Privacy.** Domande e documenti passano dai server di Google. Per SQuAD non è un problema; per archivi
  inediti o dati personali va usata la versione locale.

---

## Versione locale

### Hardware consigliato

Il collo di bottiglia è il modello linguistico dell'Ora 2. L'Ora 1 gira su qualsiasi portatile.

| Configurazione | Esempio | Modello consigliato | Tempo per risposta (indicativo) |
|---|---|---|---|
| **Minima** | 8 GB di RAM, solo CPU | `gemma3:4b` (3,3 GB) | 15–40 s: utilizzabile, ma lento |
| **Consigliata** | 16 GB di RAM, CPU recente (4+ core) | `granite4.1:8b` (5,3 GB) | ~30 s (misurati: 32 s) |
| **Buona** | Mac Apple Silicon (M1 o successivi) con 16 GB | `granite4.1:8b` | 2–5 s |
| **Ottima** | GPU NVIDIA con ≥ 8 GB di VRAM (RTX 3060/4060 o superiori) | `granite4.1:8b` | 1–2 s |

Note:

- Il riferimento della riga "Consigliata" è stato **misurato** su un portatile Intel Core i7-10510U
  (4 core, 2019) con 16 GB di RAM, senza GPU utile. Le altre righe sono stime.
- **Non serve configurare la GPU.** Il notebook non usa PyTorch, quindi non c'è nessun `.to("cuda")`: il
  modello gira dentro Ollama, che rileva da solo le GPU NVIDIA (CUDA), Apple Silicon (Metal) e AMD (ROCm)
  e ci carica tutti gli strati del modello che ci stanno. Dopo la run del modello (sezione 3.7) il
  notebook stampa la ripartizione, per esempio `granite4.1:8b: 100% in GPU memory`.
- Le GPU piccole (2–4 GB di VRAM, per esempio NVIDIA MX) aiutano poco: sulla macchina di prova (MX230,
  2 GB) Ollama ha caricato in GPU solo il 10% del modello, e i tempi sono rimasti quelli della CPU.
- Servono circa **10 GB di spazio libero** su disco: 5,3 GB per il modello, il resto per Python, le
  librerie e i dati.
- Durante l'Ora 2 conviene **chiudere le altre applicazioni**, soprattutto browser con molte schede: il
  modello da 8B occupa circa 6 GB di RAM.
- Con 8 GB di RAM conviene usare `gemma3:4b`. Il notebook lo sceglie da solo se `granite4.1:8b` non è
  installato.

### Tempi indicativi del workshop (configurazione "Consigliata")

| Parte | Cosa richiede tempo | Durata misurata |
|---|---|---|
| Primo avvio (download di SQuAD) | Rete | 1–2 minuti, una volta sola |
| Ora 1, parte 1 | Lettura e indicizzazione dei paragrafi | meno di 1 minuto |
| Ora 1, parte 2 | Costruzione di tre indici e valutazione su 300 domande | circa 1,5 minuti |
| Ora 2 | 30 risposte del modello | circa 16 minuti (32 s a risposta) |
| Ora 3 | 8 domande senza risposta più il test di prompt injection | circa 5 minuti |

Con una GPU o un Mac Apple Silicon l'Ora 2 scende a uno o due minuti. Su un portatile lento si può
abbassare `N_ANSWER_EVAL` da 30 a 15 nella cella di configurazione (sezione 1.2): l'Ora 2 si dimezza,
gli intervalli di confidenza si allargano.

### Software richiesto

- **Python 3.10 o più recente.** Si scarica da [python.org](https://www.python.org/downloads/).
  - *Windows:* durante l'installazione spuntare **"Add python.exe to PATH"**.
  - *macOS:* il Python di sistema può essere vecchio; usare l'installer di python.org o Homebrew
    (`brew install python`).
- **Ollama**, che fa girare i modelli in locale: [ollama.com/download](https://ollama.com/download).
- **Jupyter** (si installa con `pip`, vedi sotto) oppure **VS Code** con l'estensione Jupyter.

### Installazione passo passo (da fare a casa, prima del workshop)

**1. Creare un ambiente Python e installare le librerie.** Aprire un terminale nella cartella del
notebook.

macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install jupyter pandas datasets
```

Windows (PowerShell):

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install jupyter pandas datasets
```

Se PowerShell blocca l'attivazione ("l'esecuzione di script è disabilitata"), eseguire una volta
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` e riprovare. In alternativa si può usare il Prompt
dei comandi con `.venv\Scripts\activate.bat`.

**2. Installare Ollama** dall'installer per il proprio sistema. Su Linux:
`curl -fsSL https://ollama.com/install.sh | sh`. Verificare con `ollama --version`. Su Windows e macOS
Ollama resta attivo in background (icona nella barra di sistema); altrimenti avviarlo con `ollama serve`
in un terminale separato.

**3. Scaricare il modello** (5,3 GB, conviene una rete veloce):

```bash
ollama pull granite4.1:8b
```

Con 8 GB di RAM: `ollama pull gemma3:4b` (3,3 GB).

Facoltativi, per *Going further*:
- `ollama pull nomic-embed-text` (274 MB), per l'esercizio 6 (embedding).
- `ollama pull granite4.2:8b` (5,3 GB), per l'esercizio 5 (confronto tra modelli). È il successore di
  `granite4.1:8b`, con il ragionamento ("thinking") attivo di default: confrontarlo con il 4.1 mette alla
  prova anche la difesa descritta nella sezione 3.6.

**Perché Granite come modello predefinito.** `granite4.1:8b` (IBM, licenza Apache 2.0) dichiara la RAG
tra le capacità per cui è addestrato, e IBM pubblica adattatori specifici per Granite che generano
citazioni, rilevano allucinazioni e verificano se una domanda ha risposta nei documenti. Nel workshop
risponde con span brevi, copia correttamente gli identificativi dei passaggi citati e non ha la modalità
"thinking", che in questa pipeline può produrre risposte vuote. Sta in 5,3 GB.

**4. Aprire il notebook e fare una prova generale.** Con l'ambiente attivo eseguire `jupyter lab`, aprire
`rag_workshop_local.ipynb` ed eseguire le celle **fino alla fine della sezione 1.3**. Questo scarica
SQuAD (qualche decina di MB) nella cartella `rag_squad_cache` dentro la propria cartella utente
(per esempio `C:\Users\nome\rag_squad_cache` o `~/rag_squad_cache`): il giorno del workshop il notebook
partirà in pochi secondi anche con una rete lenta. La cache sta nella cartella utente perché su Windows
i percorsi più lunghi di 260 caratteri fanno fallire il download.

**5. Verificare.** La cella 1.1 deve mostrare ✅ su tutte le righe, compresa quella di Ollama con il nome
del modello.

---

## Il giorno del workshop

| Ora | Contenuto | Modello linguistico |
|---|---|---|
| 1, parte 1 | Dati, split indice/held-out, chunking, definizione di "evidenza corretta" | No |
| 1, parte 2 | Ricerca lessicale: overlap, IDF, BM25; metriche recall@k e MRR | No |
| 2 | Baseline estrattiva, metriche delle risposte, risposta con il modello, intervalli bootstrap | Sì |
| 3 | Classificazione degli errori per stadio, "non lo so", prompt injection | Facoltativo |

La sezione **Going further** contiene 11 esercizi facoltativi con soluzioni e bibliografia: parametri
di chunking e BM25, budget di contesto, soglia di astensione, confronto tra modelli, embedding e ricerca
ibrida, reranking, difese contro la prompt injection, bootstrap appaiato, LLM come giudice, riscrittura
della query.

### File prodotti dal notebook

| File | Contenuto |
|---|---|
| `rag_results.csv` | Una riga per esecuzione: medie delle metriche, intervallo di confidenza, configurazione, sessione. |
| `rag_outputs.jsonl` | Una riga per domanda: testo grezzo della risposta, chunk usati, punteggi. |
| `~/rag_squad_cache/` | Cache del dataset SQuAD nella cartella utente (si può cancellare dopo il workshop). |

I file si accumulano tra una sessione e l'altra: ogni esecuzione porta un identificativo di sessione, e
le tabelle dell'Ora 3 mostrano solo quella corrente.

## Problemi comuni

| Sintomo | Soluzione |
|---|---|
| `❌ datasets` o `ModuleNotFoundError` | L'ambiente `.venv` non è attivo o Jupyter usa un altro kernel. Attivarlo, scegliere il kernel `.venv` e reinstallare. |
| `❌ Ollama` / `Ollama not reachable` | Aprire l'app Ollama o eseguire `ollama serve`. Su Colab: rieseguire la sezione 1.1. |
| `No models installed` | `ollama pull granite4.1:8b` (o `gemma3:4b`), poi rieseguire dalla sezione 3.5. |
| Il modello è lentissimo o il computer si blocca | Guardare la riga "in GPU memory" stampata in 3.7: se la GPU è poco o per niente usata, passare a `gemma3:4b`, chiudere le altre applicazioni, oppure usare Colab. |
| Colab è lento anche con la GPU | Controllare che la sezione 1.1 abbia stampato `GPU runtime: True` e che la 3.7 riporti `100% in GPU memory`. |
| La prima risposta impiega più di un minuto | Normale: Ollama carica il modello in memoria. Le successive sono più rapide. |
| `empty response (done_reason=length ...)` | Si sta usando un modello con "thinking mode": vedere la sezione 3.6, oppure usare uno dei modelli consigliati. |
| Colab: "Impossibile connettersi al backend GPU" | Quota GPU gratuita esaurita: proseguire senza GPU (modello piccolo) o lavorare in coppia. |
| Un download si blocca | Riprovare su una rete stabile; il giorno del workshop portare il messaggio d'errore a un tutor. |

## Per chi organizza

- **Una settimana prima:** inviare questo file e chiedere di completare l'installazione locale *oppure*
  di aprire una volta il notebook su Colab. Chiedere un riscontro ("cella 1.1 tutta verde").
- **Il giorno prima:** eseguire entrambe le versioni dall'inizio alla fine. Colab cambia spesso le sue
  immagini e l'installer di Ollama può cambiare dipendenze.
- **In aula:** prese di corrente per tutti (l'Ora 2 consuma batteria) e wifi in grado di reggere tante
  sessioni Colab. Chi ha problemi lavora in coppia con un vicino: il notebook è pensato anche per
  essere seguito in due.
- **Partire dalla sezione 1.1 su Colab** appena inizia la presentazione, così il download del modello
  avviene mentre si parla.

## Licenze e note

- SQuAD v1.1 è distribuito con licenza CC BY-SA 4.0 ed è derivato da Wikipedia in inglese.
- I modelli scaricati con Ollama hanno ciascuno la propria licenza (vedi la pagina del modello su
  [ollama.com/library](https://ollama.com/library)).
- Le risposte dei modelli sono sperimentali. Se si citano in una pubblicazione, registrare modello e
  versione, configurazione del retriever, budget di contesto, parametri di decodifica e data.

// File generato automaticamente da build.mjs — NON modificare a mano.
// Per rigenerare: node build.mjs
//
// Frammenti (sezioni <h2>/<h3> e domande FAQ) delle pagine content/*.html,
// usati da worker/worker.mjs come base di conoscenza aggiuntiva per le
// risposte generate dal modello AI del bot Telegram.
export const KB_CHUNKS = [
  {
    "id": "guida--cosa-serve",
    "page": "Guida",
    "title": "Cosa serve",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Per configurare il primo nodo MeshCore servono tre cose: una board LoRa compatibile, un cavo USB dati funzionante (non solo di ricarica) e uno smartphone o un computer con un browser aggiornato. Non serve installare nessuna toolchain: il flash del firmware si fa interamente dal browser tramite il web flasher ufficiale. Questa guida copre l'intero percorso, dalla scelta della board al primo scambio di messaggi sulla mesh italiana. In circa mezz'ora, dal primo collegamento USB al primo messaggio ricevuto, puoi avere un nodo companion funzionante e allineato alla mesh italiana; se scegli di configurare anche un repeater o un room server, i passaggi iniziali di flash e accoppiamento restano gli…"
  },
  {
    "id": "guida--dal-firmware-al-primo-advert",
    "page": "Guida",
    "title": "Dal firmware al primo advert",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Otto passaggi, in ordine, per portare un nodo nuovo sulla mesh italiana."
  },
  {
    "id": "guida--scegli-la-board",
    "page": "Guida",
    "title": "Scegli la board",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Procurati una board LoRa supportata. Per una panoramica completa dei modelli e delle differenze tra chip ESP32 e nRF52 consulta la guida hardware alle board LoRa compatibili con MeshCore ; l'elenco sempre aggiornato delle board supportate è comunque sul web flasher."
  },
  {
    "id": "guida--flasha-il-firmware-companion",
    "page": "Guida",
    "title": "Flasha il firmware Companion",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Collega la board al computer via USB e apri flasher.meshcore.io ↗ da un browser basato su Chromium (richiede WebSerial). Seleziona la board dall'elenco e installa il firmware Companion. Su Linux, se il flasher non vede la porta seriale, è quasi sempre un problema di permessi: dai i permessi con sudo setfacl -m u:$USER:rw /dev/ttyUSB0 (adatta il device path al tuo caso, ad esempio /dev/ttyACM0 ) e ricarica la pagina. Se il problema persiste, consulta la pagina soluzioni ai problemi più comuni di MeshCore ."
  },
  {
    "id": "guida--installa-l-app-o-usa-il-client-web",
    "page": "Guida",
    "title": "Installa l'app o usa il client web",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Su Android o iOS installa l'app MeshCore dallo store del tuo dispositivo. In alternativa, senza installare nulla, puoi usare il client web su app.meshcore.nz ↗ , che funziona anche da computer collegando il nodo via USB."
  },
  {
    "id": "guida--accoppia-il-nodo",
    "page": "Guida",
    "title": "Accoppia il nodo",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Dall'app cerca il nodo via Bluetooth (companion BLE) e accoppialo inserendo il PIN di default 123456 . Se preferisci non usare il Bluetooth, o se il firmware installato è la variante \"USB-only\", collega il nodo via cavo USB: sia l'app mobile sia il client web supportano la connessione seriale."
  },
  {
    "id": "guida--imposta-il-preset-radio-italiano",
    "page": "Guida",
    "title": "Imposta il preset radio italiano",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Dal client, entra nelle impostazioni radio e scegli il preset EU/UK (Narrow) , che corrisponde a 869.618 MHz · BW 62.5 kHz · SF8 · CR8 . Da riga di comando, via seriale o da un client admin, lo stesso risultato si ottiene con set radio 869.618,62.5,8,8 seguito da reboot . Tutti i dettagli, incluso perché il vecchio preset è deprecato, sono nella pagina dedicata al preset radio italiano per MeshCore ."
  },
  {
    "id": "guida--scegli-il-nome-del-nodo",
    "page": "Guida",
    "title": "Scegli il nome del nodo",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Assegna un nome riconoscibile: la convenzione usata dalla community italiana è IT-<citta>-NN per un companion, IT-<citta>-RPT-NN per un repeater e IT-<citta>-ROOM-NN per un room server (esempio: IT-TORINO-RPT-01 ). Da riga di comando si imposta con set name <nome> ; l'elenco completo dei comandi disponibili è nella pagina comandi CLI per amministrare un nodo MeshCore ."
  },
  {
    "id": "guida--invia-il-primo-advert-e-verifica-i-contatti",
    "page": "Guida",
    "title": "Invia il primo advert e verifica i contatti",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Dopo aver riavviato il nodo con il nuovo preset, invia un advert (dal client, o via CLI con il comando advert ) e chiedi a un altro membro della community di verificare che il tuo nodo compaia tra i suoi contatti. Se non succede, il problema quasi sempre è un preset radio non allineato: la pagina soluzioni ai problemi più comuni di MeshCore copre anche questo caso."
  },
  {
    "id": "guida--presentati-nel-gruppo-telegram",
    "page": "Guida",
    "title": "Presentati nel gruppo Telegram",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Unisciti al gruppo Telegram MeshCore ITA ↗ , pubblico e senza bisogno di invito, e presenta il tuo nodo nel topic dedicato ai nuovi membri o in quello della tua regione. Per dubbi non coperti da questa guida, la pagina domande frequenti su MeshCore in italiano raccoglie le domande più comuni della community. Dopo il primo nodo"
  },
  {
    "id": "guida--companion-repeater-o-room-server",
    "page": "Guida",
    "title": "Companion, repeater o room server?",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Il ruolo di un nodo dipende solo da come lo configuri, non dall'hardware."
  },
  {
    "id": "guida--companion",
    "page": "Guida",
    "title": "Companion",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Il client collegato via BLE o USB tramite app mobile o interfaccia web, quello configurato in questa guida. Non ripete i pacchetti degli altri nodi: serve per leggere e inviare messaggi, ed è il ruolo giusto per iniziare finché non hai familiarità con la mesh e con il preset radio condiviso."
  },
  {
    "id": "guida--repeater-e-room-server",
    "page": "Guida",
    "title": "Repeater e room server",
    "url": "https://meshcore-ita.github.io/guida/",
    "text": "Un repeater estende la copertura della mesh inoltrando i pacchetti sui percorsi appresi dal routing ibrido; un room server conserva fino a 32 messaggi non letti per utente, come una bacheca in stile BBS. Entrambi i ruoli danno il meglio se restano sempre accesi e raggiungibili, con lo stesso preset radio e lo stesso firmware aggiornato del resto della mesh."
  },
  {
    "id": "preset-radio--il-preset-radio-e-obbligatorio-per-usare-meshcore-in-italia",
    "page": "Preset radio",
    "title": "Il preset radio è obbligatorio per usare MeshCore in Italia?",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Non è obbligatorio dal punto di vista tecnico: puoi impostare qualsiasi frequenza e parametri consentiti dalla normativa. È però fortemente raccomandato, perché è l'unico modo per sentire e farsi sentire dagli altri nodi della mesh italiana: due nodi con preset diversi semplicemente non si vedono."
  },
  {
    "id": "preset-radio--perche-il-vecchio-preset-869-525-mhz-e-deprecato",
    "page": "Preset radio",
    "title": "Perché il vecchio preset 869.525 MHz è deprecato?",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Il vecchio preset EU/UK (869.525 MHz, SF11, BW 250 kHz, CR5) è oggi etichettato come Deprecato nell'elenco ufficiale dei preset del client MeshCore. La community internazionale è passata a un preset narrow, con banda più stretta e spreading factor più basso, per una migliore interoperabilità: per l'Italia il preset attuale è 869.618 MHz, BW 62.5 kHz, SF8, CR8, corrispondente a EU/UK (Narrow) nel client."
  },
  {
    "id": "preset-radio--cosa-succede-se-resto-sul-preset-vecchio",
    "page": "Preset radio",
    "title": "Cosa succede se resto sul preset vecchio?",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Un nodo rimasto sul preset deprecato non riceve né trasmette pacchetti verso i nodi allineati al preset attuale: frequenza, banda, spreading factor e coding rate devono coincidere esattamente perché due radio LoRa si sentano. Il nodo resta isolato dalla mesh italiana finché non viene riallineato."
  },
  {
    "id": "preset-radio--serve-una-licenza-radioamatoriale-per-usare-questo-preset",
    "page": "Preset radio",
    "title": "Serve una licenza radioamatoriale per usare questo preset?",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "No. Entro i limiti di potenza, ERP e duty cycle della sub-banda 869.4-869.65 MHz previsti da ETSI EN 300 220 e dal Piano Nazionale di Ripartizione delle Frequenze, l'uso è libero e non richiede licenza. La responsabilità del rispetto di questi limiti resta comunque dell'operatore del nodo."
  },
  {
    "id": "preset-radio--i-parametri-condivisi-dalla-community-italiana",
    "page": "Preset radio",
    "title": "I parametri condivisi dalla community italiana",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Una radio LoRa sente solo un'altra radio impostata esattamente sugli stessi parametri: frequenza, banda, spreading factor e coding rate devono coincidere. Preset radio EU/Italia — EU/UK (Narrow) Parametro Valore Note Frequenza 869.618 MHz Banda occupata 869.587–869.649 MHz Bandwidth 62.5 kHz — Spreading Factor SF8 — Coding Rate CR8 — Potenza max 500 mW ERP Entro la sub-banda 869.4–869.65 MHz Duty cycle 10% Max 6 minuti di trasmissione per ora Nel client MeshCore (app o web) questo insieme di parametri corrisponde al preset EU/UK (Narrow) nella lista dei preset disponibili. Configurazione"
  },
  {
    "id": "preset-radio--come-impostarlo",
    "page": "Preset radio",
    "title": "Come impostarlo",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Il modo più diretto è da riga di comando, via USB seriale o da un client MeshCore autenticato come admin su repeater e room server: Comandi CLI Comando Cosa fa set radio 869.618,62.5,8,8 Imposta frequenza, banda, SF e CR in un colpo solo. Richiede reboot per applicarsi. get radio Legge i parametri radio correnti, per verificare che il preset sia stato applicato. Nell'app mobile Android/iOS e nel client web su app.meshcore.nz ↗ lo stesso risultato si ottiene dal menu delle impostazioni radio del nodo, scegliendo il preset EU/UK (Narrow) dall'elenco predefinito, senza dover digitare i singoli parametri. Dopo qualsiasi modifica radio il nodo va riavviato prima di riprovare a comunicare con la…"
  },
  {
    "id": "preset-radio--il-vecchio-preset-e-deprecato",
    "page": "Preset radio",
    "title": "Il vecchio preset è deprecato",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Il preset precedente — 869.525 MHz , SF11 , BW 250 kHz , CR5 — è oggi etichettato come Deprecato nell'elenco ufficiale dei preset del client MeshCore. La community internazionale è passata a un preset \"narrow\", con banda più stretta e spreading factor più basso, per migliorare l'interoperabilità tra reti nazionali diverse. Chi resta sul preset vecchio non è in errore di configurazione in senso stretto, ma è semplicemente su una frequenza e con parametri che nessun altro nodo italiano ascolta più: frequenza, banda, SF e CR devono coincidere esattamente perché due radio LoRa si sentano, quindi un nodo disallineato resta isolato dalla mesh anche se acceso e funzionante. Se hai un nodo…"
  },
  {
    "id": "preset-radio--cosa-significano-frequenza-banda-sf-e-cr",
    "page": "Preset radio",
    "title": "Cosa significano frequenza, banda, SF e CR",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Ogni parametro sposta l'equilibrio tra portata, robustezza del segnale e velocità di trasmissione."
  },
  {
    "id": "preset-radio--frequenza-e-banda-bandwidth",
    "page": "Preset radio",
    "title": "Frequenza e banda (bandwidth)",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "La frequenza (869.618 MHz) è il canale su cui i nodi trasmettono e ricevono. La banda (62.5 kHz) è l'ampiezza dello spettro occupato attorno a quella frequenza: una banda più stretta concentra l'energia del segnale, aumentando la sensibilità in ricezione a scapito della velocità dati."
  },
  {
    "id": "preset-radio--spreading-factor-sf",
    "page": "Preset radio",
    "title": "Spreading Factor (SF)",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Determina quanto ogni bit viene \"diffuso\" nel tempo. Uno spreading factor più alto (es. SF11 del preset vecchio) aumenta la portata e la resistenza al rumore, ma allunga il tempo di trasmissione di ogni pacchetto. SF8, usato nel preset attuale, è un compromesso più veloce, adatto a mesh dense con più nodi che condividono lo stesso canale."
  },
  {
    "id": "preset-radio--coding-rate-cr",
    "page": "Preset radio",
    "title": "Coding Rate (CR)",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Aggiunge ridondanza al pacchetto per correggere errori di trasmissione dovuti a interferenze o rumore. Un coding rate più alto protegge meglio il pacchetto ma aumenta l'airtime, cioè il tempo che il pacchetto occupa sul canale radio."
  },
  {
    "id": "preset-radio--il-compromesso-airtime-portata",
    "page": "Preset radio",
    "title": "Il compromesso airtime/portata",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Parametri che favoriscono la portata (SF alto, banda stretta, CR alto) allungano l'airtime di ogni pacchetto, riducendo quanti pacchetti la mesh può scambiare per unità di tempo entro i limiti di duty cycle. Il preset condiviso dalla community è la scelta di compromesso ritenuta migliore per l'uso tipico in Italia: cambiarlo unilateralmente isola il tuo nodo dal resto della rete. Quadro normativo"
  },
  {
    "id": "preset-radio--limiti-di-potenza-e-duty-cycle",
    "page": "Preset radio",
    "title": "Limiti di potenza e duty cycle",
    "url": "https://meshcore-ita.github.io/preset-radio/",
    "text": "Il preset condiviso opera nella sub-banda 869.4–869.65 MHz , dove la normativa europea (ETSI EN 300 220) e il Piano Nazionale di Ripartizione delle Frequenze consentono l'uso libero, senza licenza, entro precisi limiti: potenza massima 500 mW ERP e duty cycle del 10% , cioè al massimo 6 minuti di trasmissione ogni ora per ogni dispositivo. Questi limiti sono già rispettati dai parametri di default consigliati dalla community, ma restano comunque responsabilità di chi configura e gestisce il nodo, in particolare se si aumenta la potenza di trasmissione oltre i valori di default con il comando set tx . Per i termini tecnici usati in questa pagina — advert, path-discovery, room server e altri…"
  },
  {
    "id": "hardware--una-scelta-ampia-tutta-a-basso-costo",
    "page": "Hardware",
    "title": "Una scelta ampia, tutta a basso costo",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "MeshCore gira su firmware Arduino/PlatformIO open source, portato su due famiglie di chip: ESP32 e nRF52. La scelta della board dipende dall'uso che vuoi farne, non da vincoli del protocollo. Non esiste una board \"ufficiale\" per MeshCore: il firmware Companion, Repeater e Room Server è compilato per decine di dispositivi LoRa diversi, dalle economiche Heltec ESP32 ai moduli nRF52840 a basso consumo di RAK e Seeed. Questa pagina confronta le board che la community italiana usa più spesso, indicate anche nella guida passo passo per configurare un nodo MeshCore . Qualunque board tu scelga, dopo il primo flash dovrai comunque allinearti al preset radio italiano per MeshCore perché il tuo nodo…"
  },
  {
    "id": "hardware--le-board",
    "page": "Hardware",
    "title": "Le board",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "Board LoRa supportate dal firmware MeshCore Board Chip BLE / USB Uso tipico Heltec V3 ESP32-S3 BLE, USB, Wi-Fi Companion o repeater, buon punto di partenza Heltec T114 nRF52840 BLE, USB Repeater da tavolo (con display) o companion Heltec T190 ESP32-S3 BLE, USB Companion con display o repeater LilyGO T-Deck ESP32-S3 BLE, USB Companion portatile, con tastiera e schermo LilyGO T-Beam ESP32 BLE, USB Companion o repeater, con GPS integrato LilyGO T3S3 ESP32-S3 BLE, USB Repeater compatto o companion RAK4631 / WisBlock nRF52840 BLE, USB (Ethernet opzionale) Repeater o room server per installazioni permanenti Seeed XIAO nRF52840 + Wio-SX1262 nRF52840 BLE, USB Companion o repeater a basso consumo,…"
  },
  {
    "id": "hardware--esp32-o-nrf52840",
    "page": "Hardware",
    "title": "ESP32 o nRF52840?",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "La differenza principale non è la copertura radio, ma il consumo energetico e cosa il chip fa quando il nodo non sta trasmettendo."
  },
  {
    "id": "hardware--consumo-e-autonomia",
    "page": "Hardware",
    "title": "Consumo e autonomia",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "I chip nRF52840 (Heltec T114, RAK4631, Seeed XIAO) consumano molto meno in idle rispetto a un ESP32, e sono la scelta più comune per un repeater a batteria o pannello solare. Sulle board ESP32 il comando powersaving on aiuta a ridurre il consumo mettendo il nodo in sospensione tra una trasmissione e l'altra, ma resta comunque più alto di un nRF52 equivalente."
  },
  {
    "id": "hardware--connettivita-e-display",
    "page": "Hardware",
    "title": "Connettività e display",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "Tutte le board di questa lista supportano sia BLE sia USB per il firmware Companion, e alcune (Heltec V3, Station G2) anche il Wi-Fi per l'app companion o l'aggiornamento OTA. Le board con display integrato (Heltec T114, T190, LilyGO T-Beam, T3S3) mostrano stato radio e contatti senza bisogno di un client collegato; il Seeed XIAO nRF52840 non ha display ed è pensato per installazioni headless. Installazione"
  },
  {
    "id": "hardware--antenne-e-connettori",
    "page": "Hardware",
    "title": "Antenne e connettori",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "La maggior parte delle board monta un connettore SMA o U.FL/IPEX per l'antenna LoRa in sub-banda 868 MHz. Un'antenna esterna correttamente accordata sulla banda 869 MHz incide sulla portata più della potenza di trasmissione: prima di aumentare il tx conviene verificare che l'antenna in dotazione sia adatta all'uso outdoor previsto."
  },
  {
    "id": "hardware--alimentazione-e-installazione-outdoor",
    "page": "Hardware",
    "title": "Alimentazione e installazione outdoor",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "Per un repeater fisso, l'alimentazione tipica è un pannello solare con batteria tampone (LiPo o LiFePO4) collegato alle board nRF52 a basso consumo, oppure alimentazione a rete per installazioni indoor stabili. In esterno serve sempre una custodia con grado di protezione adeguato: né le board né le antenne standard sono impermeabili di fabbrica. Dove comprare"
  },
  {
    "id": "hardware--reperire-l-hardware-in-italia",
    "page": "Hardware",
    "title": "Reperire l'hardware in Italia",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "Le board elencate in questa pagina sono prodotti generici, non legati a MeshCore: si trovano tramite i normali canali di vendita di elettronica e componentistica, sia su marketplace internazionali sia tramite rivenditori italiani di elettronica per hobbisti. Non esistono negozi o distributori ufficiali della community MeshCore ITA, e la community non gestisce né consiglia link affiliati: verifica sempre che il venditore indichi chiaramente il modello esatto (ad esempio \"Heltec WiFi LoRa 32 V3\" e non semplicemente \"Heltec LoRa\") prima di acquistare, perché board con nomi simili possono montare chip o moduli radio diversi. Dopo l'acquisto"
  },
  {
    "id": "hardware--prossimi-passi",
    "page": "Hardware",
    "title": "Prossimi passi",
    "url": "https://meshcore-ita.github.io/hardware/",
    "text": "Una volta scelta e ricevuta la board, il percorso di configurazione è lo stesso per tutti i modelli: flash del firmware Companion, accoppiamento e impostazione del preset radio, descritti passo passo nella guida passo passo per configurare un nodo MeshCore . Se hai dubbi su comandi specifici per repeater e room server, ad esempio per attivare powersaving o regolare la potenza TX, la pagina comandi CLI per amministrare un nodo MeshCore li elenca tutti. In caso di problemi di flash o accoppiamento, la pagina soluzioni ai problemi più comuni di MeshCore copre i casi più frequenti segnalati dalla community, e il glossario dei termini MeshCore spiega i termini tecnici usati in questa pagina come…"
  },
  {
    "id": "comandi--come-raggiungere-la-console-del-nodo",
    "page": "Comandi",
    "title": "Come raggiungere la console del nodo",
    "url": "https://meshcore-ita.github.io/comandi/",
    "text": "Ogni repeater e room server MeshCore espone una console di comandi testuali, raggiungibile in due modi. Il primo è via USB seriale: colleghi il nodo al computer con un cavo dati (non solo di ricarica) e apri una console seriale, ad esempio il web flasher ufficiale dal browser oppure picocom da terminale su Linux. Questo metodo funziona anche prima di aver mai configurato il nodo, perché non richiede una rete mesh già funzionante. Il secondo è da remoto, tramite un client MeshCore (app o web) già autenticato come amministratore sul nodo target: utile per un repeater o un room server già installato in un punto alto o difficile da raggiungere fisicamente. In entrambi i casi serve la password…"
  },
  {
    "id": "comandi--nome-e-password-amministrativa",
    "page": "Comandi",
    "title": "Nome e password amministrativa",
    "url": "https://meshcore-ita.github.io/comandi/",
    "text": "Identità e nome nodo Comando Effetto set name <nome> Cambia il nome del nodo mostrato negli advert e nei contatti degli altri nodi. password <nuova-password> Cambia la password amministrativa della console (default password ). Esempio per un repeater a Torino, seguendo la convenzione di naming della community: set name IT-Torino-RPT-01 . Dopo un cambio nome è buona norma inviare subito un nuovo advert (vedi sotto) così che i nodi vicini aggiornino il contatto. Per la password, scegline una che non condividi con altri servizi: la console non offre un modo per leggerla in chiaro, solo per sovrascriverla. Radio"
  },
  {
    "id": "comandi--preset-potenza-e-diagnostica-radio",
    "page": "Comandi",
    "title": "Preset, potenza e diagnostica radio",
    "url": "https://meshcore-ita.github.io/comandi/",
    "text": "Configurazione e diagnostica radio Comando Effetto get radio / set radio <freq>,<bw>,<sf>,<cr> Legge o imposta frequenza, banda, spreading factor e coding rate in un solo comando. Richiede reboot per applicarsi. get freq / set freq <MHz> Legge o cambia la sola frequenza, senza toccare banda, SF o CR. get tx / set tx <dbm> Legge o imposta la potenza di trasmissione in dBm (1–22). set lat <lat> / set lon <lon> Imposta la posizione GPS del nodo, usata per la mappa pubblica e per l'advert. advert Invia subito un advert flood, senza aspettare l'intervallo periodico. set flood.advert.interval <ore> Cambia l'intervallo dell'advert flood periodico (default 12 ore). set repeat <on|off> Attiva o…"
  },
  {
    "id": "comandi--risparmio-energetico-e-stato-del-nodo",
    "page": "Comandi",
    "title": "Risparmio energetico e stato del nodo",
    "url": "https://meshcore-ita.github.io/comandi/",
    "text": "Alimentazione e risparmio Comando Effetto powersaving <on|off> Attiva o disattiva il risparmio energetico: il nodo dorme tra una trasmissione e l'altra. stats-core Mostra stato batteria, uptime e coda messaggi del nodo. Su un repeater alimentato a batteria o pannello solare, powersaving on è spesso la prima leva da usare se l'autonomia non basta, insieme a una potenza TX ( set tx ) non più alta del necessario per la copertura richiesta. Se la batteria si scarica comunque troppo in fretta, stats-core aiuta a capire se il problema è di consumo o se il nodo si sta riavviando in loop: la pagina soluzioni ai problemi più comuni di MeshCore copre anche questo caso insieme ad altri sintomi…"
  },
  {
    "id": "comandi--sincronizzazione-dell-ora",
    "page": "Comandi",
    "title": "Sincronizzazione dell'ora",
    "url": "https://meshcore-ita.github.io/comandi/",
    "text": "Orologio Comando Effetto time <epoch> Imposta manualmente l'orologio del nodo, utile su board senza GPS o senza fix. clock sync Sincronizza l'orologio del nodo con quello del dispositivo collegato (companion o client admin). Un orologio sbagliato è una delle cause più comuni per cui un nodo sembra \"sparito\": gli advert non risultano validi e il nodo smette di comparire come recente nei contatti altrui. Su una board con GPS (ad esempio LilyGO T-Beam o T-Deck) il fix corregge l'ora da solo appena disponibile; su una board senza GPS, o finché il fix non arriva, usa clock sync da un client collegato oppure imposta l'epoch manualmente con time <epoch> via seriale. Amministrazione e OTA"
  },
  {
    "id": "comandi--riavvio-e-aggiornamento-firmware",
    "page": "Comandi",
    "title": "Riavvio e aggiornamento firmware",
    "url": "https://meshcore-ita.github.io/comandi/",
    "text": "Amministrazione e OTA Comando Effetto reboot Riavvia il nodo: necessario dopo aver cambiato parametri radio o nome. start ota Avvia l'aggiornamento firmware via OTA (Wi-Fi su ESP32, DFU su nRF52). Su board ESP32 come Heltec V3, start ota apre un hotspot Wi-Fi chiamato \"MeshCore OTA\": ti colleghi a quell'hotspot dal telefono o dal computer e vai su 192.168.4.1/update per caricare il nuovo firmware. Su board nRF52 (RAK4631, Heltec T114, Seeed XIAO) lo stesso comando prepara il nodo, ma il caricamento avviene con l'app nRF DFU dello smartphone. In entrambi i casi non scollegare l'alimentazione del nodo durante il trasferimento: un OTA interrotto a metà può lasciare il nodo in uno stato da…"
  },
  {
    "id": "problemi--il-metodo-veloce-in-tre-passaggi",
    "page": "Problemi",
    "title": "Il metodo veloce, in tre passaggi",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Prima di cercare il caso specifico, verifica questi tre punti: da soli risolvono la maggior parte delle segnalazioni."
  },
  {
    "id": "problemi--controlla-il-preset-radio",
    "page": "Problemi",
    "title": "Controlla il preset radio",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Il motivo più comune per cui due nodi non si sentono è un preset diverso. Lancia get radio da un client admin e confronta il risultato con il preset radio condiviso per l'Italia : deve restituire 869.618,62.5,8,8 ."
  },
  {
    "id": "problemi--controlla-l-orologio",
    "page": "Problemi",
    "title": "Controlla l'orologio",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Molti nodi \"invisibili\" hanno semplicemente l'ora sbagliata. Sincronizza con clock sync da un client admin, oppure imposta l'epoch manualmente con time <epoch> via seriale."
  },
  {
    "id": "problemi--controlla-i-permessi-usb-solo-linux",
    "page": "Problemi",
    "title": "Controlla i permessi USB (solo Linux)",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Se il web flasher non vede la board, quasi sempre è un problema di permessi sulla porta seriale: il caso dedicato più sotto spiega il comando esatto da usare. Troubleshooting"
  },
  {
    "id": "problemi--nove-casi-comuni-diagnosi-causa-soluzione",
    "page": "Problemi",
    "title": "Nove casi comuni: diagnosi, causa, soluzione",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Ogni caso segue lo stesso schema: cosa osservi, perché succede, come risolverlo."
  },
  {
    "id": "problemi--il-nodo-non-compare-in-app",
    "page": "Problemi",
    "title": "Il nodo non compare in app",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: il nodo è acceso e nel raggio radio ma non compare nella lista contatti o discover del client. Causa: quasi sempre un problema di orologio: su un T-Deck può mancare il fix GPS o il baud rate GPS è sbagliato, oppure il nodo remoto ha l'ora sbagliata e i suoi advert vengono scartati. Soluzione: da un client admin lancia clock sync per sincronizzare l'orologio del nodo collegato, oppure imposta l'ora manualmente con time <epoch> via seriale; poi lancia advert per forzare un nuovo annuncio."
  },
  {
    "id": "problemi--il-bluetooth-ble-non-si-accoppia",
    "page": "Problemi",
    "title": "Il Bluetooth (BLE) non si accoppia",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: il client MeshCore non trova il nodo tra i dispositivi Bluetooth disponibili, oppure il pairing fallisce. Causa: sul nodo è stato flashato il firmware Companion USB-only invece di Companion BLE: solo un companion accetta connessioni Bluetooth, un repeater o un room server non ne aprono mai una. Soluzione: verifica con il web flasher di aver installato il firmware Companion BLE corretto per la tua board; il PIN di pairing di default è 123456 ."
  },
  {
    "id": "problemi--il-web-flasher-non-vede-la-board-linux",
    "page": "Problemi",
    "title": "Il web flasher non vede la board (Linux)",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: il browser mostra un errore del tipo “Failed to open serial port” quando provi a collegarti alla board dal web flasher. Causa: su Linux l'utente non ha i permessi di lettura e scrittura sulla porta seriale USB assegnata alla board. Soluzione: assegna i permessi con sudo setfacl -m u:$USER:rw /dev/ttyUSB0 (adatta il device path, ad esempio /dev/ttyACM0 per una board nRF), poi ricarica la pagina del web flasher e riprova la connessione."
  },
  {
    "id": "problemi--nessun-nodo-e-raggiungibile",
    "page": "Problemi",
    "title": "Nessun nodo è raggiungibile",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: il nodo trasmette regolarmente ma non riesce a sentire né a farsi sentire da nessun altro nodo della mesh. Causa: il preset radio — frequenza, banda, spreading factor o coding rate — non corrisponde a quello del resto della mesh: due nodi su preset diversi non comunicano, anche se vicini. Soluzione: controlla il preset attuale con get radio e riallinealo con set radio 869.618,62.5,8,8 , poi riavvia con reboot ."
  },
  {
    "id": "problemi--la-batteria-dura-poco",
    "page": "Problemi",
    "title": "La batteria dura poco",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: un repeater alimentato a batteria si scarica molto più rapidamente del previsto. Causa: il risparmio energetico non è attivo, oppure la potenza di trasmissione è impostata più alta del necessario per la copertura richiesta. Soluzione: attiva il risparmio energetico con powersaving on — il nodo dorme tra una trasmissione e l'altra — e riduci la potenza TX con set tx <dbm> (intervallo 1–22 dBm); controlla il valore attuale con get tx ."
  },
  {
    "id": "problemi--il-firmware-va-aggiornato-via-ota-dfu",
    "page": "Problemi",
    "title": "Il firmware va aggiornato via OTA/DFU",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: la board è già installata in un punto scomodo da raggiungere via USB e serve aggiornare il firmware da remoto. Causa: gli aggiornamenti via cavo richiedono accesso fisico alla board a ogni versione. Soluzione: su ESP32 lancia start ota dal client admin, collegati all'hotspot Wi-Fi “MeshCore OTA” e vai su 192.168.4.1/update ; su board nRF (RAK, T114, Seeed XIAO) usa start ota insieme all'app nRF DFU sullo smartphone."
  },
  {
    "id": "problemi--il-bluetooth-si-disconnette-in-continuazione-heltec-v3",
    "page": "Problemi",
    "title": "Il Bluetooth si disconnette in continuazione (Heltec V3)",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: il collegamento BLE tra companion e app cade spesso, anche a pochi metri di distanza. Causa: su Heltec V3 l'antenna Bluetooth/Wi-Fi integrata è una piccola bobina sul circuito stampato, con portata di pochi metri. Soluzione: resta vicino al nodo durante l'uso; in alternativa, chi ha dimestichezza con la saldatura può sostituire l'antenna a bobina con un filo di circa 31 mm per migliorare la portata BLE — è una modifica hardware da valutare con cautela."
  },
  {
    "id": "problemi--il-repeater-sembra-sordo-non-sente-piu-i-nodi-vicini",
    "page": "Problemi",
    "title": "Il repeater sembra sordo, non sente più i nodi vicini",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: un repeater che prima funzionava smette di sentire nodi che dovrebbero essere in portata, pur restando acceso e configurato correttamente. Causa: può trattarsi dell'AGC (Automatic Gain Control) del chip radio SX1262, che può bloccarsi in presenza di forti interferenze vicine alla frequenza usata. Soluzione: imposta un reset periodico dell'AGC con set agc.reset.interval <numero> — il valore è in secondi, in multipli di 4; set agc.reset.interval 4 è un buon punto di partenza."
  },
  {
    "id": "problemi--il-dispositivo-sembra-corrotto-o-bloccato",
    "page": "Problemi",
    "title": "Il dispositivo sembra corrotto o bloccato",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Diagnosi: il nodo non risponde più correttamente o non entra più in funzionamento normale. Causa: una configurazione o un firmware corrotti, spesso dopo un aggiornamento interrotto. Soluzione: se riesci a collegarti dall'app, esporta le impostazioni, esegui un factory reset e poi reimportale dopo aver ripristinato il pairing Bluetooth; se non riesci a collegarti, usa il web flasher per entrare in modalità DFU, esegui “Erase Flash” e poi reinstalla il firmware con “Flash!”. Dalla versione firmware 1.7.0, le board con pulsante utente (alcune RAK, T114) hanno anche una modalità di recovery: tienilo premuto entro 8 secondi dall'accensione per accedere alla console del web flasher. Serve altro…"
  },
  {
    "id": "problemi--se-il-problema-persiste",
    "page": "Problemi",
    "title": "Se il problema persiste",
    "url": "https://meshcore-ita.github.io/problemi/",
    "text": "Non tutti i problemi rientrano in uno schema fisso: a volte serve ispezionare lo stato del nodo o confrontarsi con chi ha già affrontato lo stesso caso. Il riferimento completo dei comandi CLI ti permette di ispezionare lo stato del nodo con stats-radio (noise floor, RSSI/SNR, airtime) e neighbors (vicini diretti uditi di recente). Le domande frequenti su MeshCore coprono altri dubbi comuni su portata, preset e mappa pubblica, mentre la pagina hardware elenca le board supportate se il problema dipende dal modello specifico che usi. Chi arriva da altri sistemi mesh può trovare utile il confronto in MeshCore vs Meshtastic per capire le differenze di routing prima di aprire una segnalazione.…"
  },
  {
    "id": "faq--quanto-costa-iniziare-con-meshcore",
    "page": "FAQ",
    "title": "Quanto costa iniziare con MeshCore?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Il firmware MeshCore è gratuito e open source con licenza MIT: nessun costo di licenza o abbonamento. Il costo iniziale è solo quello dell'hardware — una board LoRa economica come la Heltec V3 basta per iniziare come companion, mentre una seconda board dedicata serve per un repeater che estenda la copertura. GPS o schermo (T-Beam, T-Deck) fanno salire il prezzo della singola board, ma non sono necessari per comunicare. Elenco completo delle board nella pagina hardware ."
  },
  {
    "id": "faq--che-differenza-c-e-tra-i-ruoli-companion-repeater-room-server-e-sensor",
    "page": "FAQ",
    "title": "Che differenza c'è tra i ruoli companion, repeater, room server e sensor?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Sono i quattro ruoli che un nodo MeshCore può assumere, a seconda del firmware flashato. Un companion è un client via BLE o USB con app mobile o interfaccia web, e non ripete mai i pacchetti altrui. Un repeater estende la copertura inoltrando i pacchetti sui percorsi appresi dal routing ibrido. Un room server funziona come una bacheca in stile BBS, con fino a 32 messaggi non letti conservati per ogni utente. Un sensor trasmette telemetria o payload personalizzati sulla mesh. Per configurare ciascun ruolo vedi la pagina comandi CLI per repeater e room server ."
  },
  {
    "id": "faq--serve-una-licenza-radio-per-usare-meshcore-in-italia",
    "page": "FAQ",
    "title": "Serve una licenza radio per usare MeshCore in Italia?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "No, l'uso è libero senza licenza, a condizione di restare entro i limiti di potenza, ERP e duty cycle della sub-banda 869.4–869.65 MHz. Questi limiti sono definiti dalla norma ETSI EN 300 220 e dal Piano Nazionale di Ripartizione delle Frequenze italiano. La responsabilità di rispettare questi limiti resta comunque dell'operatore del singolo nodo, non della community."
  },
  {
    "id": "faq--quanta-portata-reale-ha-un-nodo-meshcore",
    "page": "FAQ",
    "title": "Quanta portata reale ha un nodo MeshCore?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Non esiste un numero di copertura garantito: la portata reale dipende da diversi fattori concomitanti. L'orografia del terreno e la presenza di ostacoli — edifici, vegetazione, colline — contano più della distanza in linea d'aria, e l'altezza dell'antenna sopra gli ostacoli locali è spesso il fattore singolo più determinante, soprattutto per un repeater in quota. La potenza di trasmissione (comando set tx , tipicamente 1–22 dBm) e i parametri del preset radio (spreading factor e coding rate) influiscono sulla sensibilità del collegamento, a scapito della velocità di trasmissione. Per questo ogni installazione va valutata sul campo, non stimata a tavolino."
  },
  {
    "id": "faq--serve-una-connessione-internet-per-usare-meshcore",
    "page": "FAQ",
    "title": "Serve una connessione internet per usare MeshCore?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "No: MeshCore funziona interamente via radio LoRa, senza SIM, senza Wi-Fi e senza infrastruttura centrale — è pensato esplicitamente per la comunicazione off-grid. L'unico uso opzionale di internet è caricare il proprio nodo sulla mappa pubblica o consultarla da un browser: sono funzioni accessorie, non necessarie per inviare e ricevere messaggi sulla mesh."
  },
  {
    "id": "faq--che-differenza-c-e-tra-meshcore-e-meshtastic",
    "page": "FAQ",
    "title": "Che differenza c'è tra MeshCore e Meshtastic?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "MeshCore usa un routing ibrido: gli advert e i messaggi di canale viaggiano in flood, mentre i messaggi privati sfruttano un path-discovery che scopre e poi riutilizza un percorso diretto tra mittente e destinatario. Un client MeshCore non ripete mai il traffico degli altri nodi: solo repeater e room server lo fanno, il che riduce il traffico ripetuto e il consumo energetico dei client. Per un confronto tecnico completo vedi la pagina MeshCore vs Meshtastic ."
  },
  {
    "id": "faq--come-sono-protetti-i-messaggi-su-meshcore",
    "page": "FAQ",
    "title": "Come sono protetti i messaggi su MeshCore?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Ogni nodo ha un'identità basata su una coppia di chiavi Ed25519, usata per firmare gli advert ed evitare lo spoofing. Le chiavi condivise tra due nodi che comunicano vengono derivate con uno scambio ECDH su curva X25519, e i messaggi vengono cifrati simmetricamente con AES-128. In pratica i contenuti restano privati anche quando un pacchetto viene ripetuto da un repeater, che non ne conosce il contenuto in chiaro."
  },
  {
    "id": "faq--quanti-hop-puo-percorrere-un-messaggio-su-meshcore",
    "page": "FAQ",
    "title": "Quanti hop può percorrere un messaggio su MeshCore?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Il firmware impone un limite interno di 64 hop per pacchetto. In condizioni reali è raro avvicinarsi a questo limite: orografia, densità di repeater e tempi di trasmissione rendono già significativo un percorso di pochi hop. Il limite esiste come tetto di sicurezza del protocollo, non come obiettivo da raggiungere."
  },
  {
    "id": "faq--ogni-quanto-un-nodo-manda-il-proprio-advert",
    "page": "FAQ",
    "title": "Ogni quanto un nodo manda il proprio advert?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Un repeater manda un advert flood ogni 12 ore per impostazione predefinita, un intervallo regolabile con il comando set flood.advert.interval <ore> . Un companion, invece, si annuncia solo quando l'utente lo richiede esplicitamente dall'app o dal client web: non c'è un annuncio periodico automatico lato client."
  },
  {
    "id": "faq--il-preset-radio-e-obbligatorio",
    "page": "FAQ",
    "title": "Il preset radio è obbligatorio?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Non è obbligatorio in senso tecnico — un nodo MeshCore può funzionare su qualunque combinazione di frequenza, banda, SF e CR entro i limiti normativi — ma è fortemente raccomandato per la community italiana. Un preset condiviso è ciò che permette a nodi diversi di sentirsi tra loro: due nodi su preset differenti semplicemente non comunicano, anche se vicini. Per i dettagli vedi la pagina dedicata al preset radio italiano ."
  },
  {
    "id": "faq--perche-il-preset-radio-e-cambiato",
    "page": "FAQ",
    "title": "Perché il preset radio è cambiato?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Il vecchio preset EU/UK (869.525 MHz · SF11 · BW 250 kHz · CR5) è oggi etichettato come Deprecato nell'elenco ufficiale dei preset del client MeshCore. La community internazionale è passata a preset “narrow”, a banda più stretta e SF più basso, per una migliore interoperabilità. In Italia il preset attuale è 869.618 MHz · BW 62.5 kHz · SF8 · CR8, corrispondente a EU/UK (Narrow): i nodi rimasti sul vecchio preset non sentono più la rete e vanno riallineati con set radio 869.618,62.5,8,8 ."
  },
  {
    "id": "faq--posso-lasciare-un-nodo-acceso-h24",
    "page": "FAQ",
    "title": "Posso lasciare un nodo acceso H24?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Sì, ed è anzi consigliato per repeater e room server: sono utili alla mesh solo se restano sempre accesi e raggiungibili dagli altri nodi. Va comunque rispettato il limite di duty cycle della banda usata — 10%, massimo 6 minuti di trasmissione per ora — che riguarda il tempo di trasmissione e non il tempo di accensione del dispositivo."
  },
  {
    "id": "faq--come-entro-nel-gruppo-telegram",
    "page": "FAQ",
    "title": "Come entro nel gruppo Telegram?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Il gruppo Telegram MeshCore ITA è pubblico e aperto a chiunque, senza bisogno di un invito: basta aprire t.me/meshcore_ita ↗ . Il gruppo è organizzato in topic tematici e in un topic per ogni regione italiana, dove si discutono installazioni e copertura locale."
  },
  {
    "id": "faq--come-aggiorno-il-firmware",
    "page": "FAQ",
    "title": "Come aggiorno il firmware?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Il metodo dipende dal chip della board. Su ESP32 (es. Heltec V3) usa il web flasher via USB, oppure aggiorna via OTA lanciando start ota dal client admin e collegandoti all'hotspot Wi-Fi “MeshCore OTA” su 192.168.4.1/update . Su board nRF (RAK4631, Heltec T114, Seeed XIAO) usa start ota insieme all'app nRF DFU sullo smartphone. Il bin “non-merged” mantiene l'abbinamento Bluetooth esistente; il “merged” lo azzera ma mantiene nome, chiavi e preset salvati. Se qualcosa va storto, la pagina sulla risoluzione dei problemi copre i casi più comuni."
  },
  {
    "id": "faq--il-mio-nodo-e-visibile-sulla-mappa-pubblica",
    "page": "FAQ",
    "title": "Il mio nodo è visibile sulla mappa pubblica?",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Non automaticamente: devi caricarlo tu. Per un companion, apri l'app MeshCore, vai su “Internet Map” e scegli “Add me to the Map”. Per un repeater o room server, aprilo dalla lista contatti, tocca “Share” e poi “Upload to Internet Map”. Una volta caricato, il nodo è consultabile sulla mappa pubblica su map.meshcore.io."
  },
  {
    "id": "faq--iniziare-con-meshcore",
    "page": "FAQ",
    "title": "Iniziare con MeshCore",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Le domande più comuni di chi si avvicina per la prima volta alla rete. Sotto il cofano"
  },
  {
    "id": "faq--rete-e-sicurezza",
    "page": "FAQ",
    "title": "Rete e sicurezza",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Come funziona il routing, la cifratura e il preset radio condiviso. Uso quotidiano"
  },
  {
    "id": "faq--uso-quotidiano",
    "page": "FAQ",
    "title": "Uso quotidiano",
    "url": "https://meshcore-ita.github.io/faq/",
    "text": "Gruppo, mappa pubblica e aggiornamenti firmware."
  },
  {
    "id": "meshcore-vs-meshtastic--meshcore-e-meshtastic-sono-compatibili-tra-loro",
    "page": "Confronti",
    "title": "MeshCore e Meshtastic sono compatibili tra loro?",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "No. Anche se entrambi usano radio LoRa, i protocolli, il formato dei pacchetti e le chiavi di cifratura sono diversi e incompatibili: un nodo MeshCore e un nodo Meshtastic non si sentono, anche sulla stessa frequenza e con lo stesso hardware."
  },
  {
    "id": "meshcore-vs-meshtastic--posso-usare-lo-stesso-hardware-per-entrambe-le-reti",
    "page": "Confronti",
    "title": "Posso usare lo stesso hardware per entrambe le reti?",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Sì, ma non nello stesso momento: board come Heltec V3 o RAK4631 sono supportate da entrambi i firmware, quindi puoi dedicare una board a MeshCore e un'altra a Meshtastic, oppure riflashare la stessa board passando da un progetto all'altro."
  },
  {
    "id": "meshcore-vs-meshtastic--qual-e-la-differenza-principale-nel-modo-in-cui-instradano-i-messaggi",
    "page": "Confronti",
    "title": "Qual è la differenza principale nel modo in cui instradano i messaggi?",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "MeshCore separa nettamente flood (per advert e canali) e routing diretto scoperto via path-discovery (per i messaggi privati), con i soli repeater a ripetere il traffico. Meshtastic gestisce tutto con un unico meccanismo di managed flooding con backoff basato sull'SNR, a cui dalla versione 2.6 si affianca un next-hop routing per i messaggi diretti."
  },
  {
    "id": "meshcore-vs-meshtastic--due-filosofie-di-routing-diverse",
    "page": "Confronti",
    "title": "Due filosofie di routing diverse",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Entrambi i sistemi risolvono lo stesso problema — far arrivare un messaggio su una rete LoRa senza infrastruttura — ma con meccanismi diversi. In MeshCore gli advert e i messaggi di canale viaggiano sempre in flood: un repeater li ritrasmette a chiunque sia in ascolto, con un annuncio periodico predefinito ogni 12 ore (regolabile con set flood.advert.interval <ore> ). I messaggi privati, invece, usano un meccanismo diverso: il primo invio raggiunge il destinatario in flood, ma la conferma di consegna che torna al mittente porta con sé l'elenco dei repeater attraversati. Da quel momento il mittente incorpora quel percorso nei pacchetti successivi, e solo i repeater che corrispondono al…"
  },
  {
    "id": "meshcore-vs-meshtastic--meshcore-vs-meshtastic-punto-per-punto",
    "page": "Confronti",
    "title": "MeshCore vs Meshtastic, punto per punto",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Le differenze tecniche principali, senza dichiarare un vincitore assoluto: dipende dall'uso. Routing, ruoli e licenza a confronto Parametro MeshCore Meshtastic Chi ripete i pacchetti Solo repeater e room server; i client (companion) non ripetono mai Ogni nodo può ritrasmettere fino al limite di hop, con priorità maggiore per i ruoli Router/Repeater Messaggi diretti Path-discovery: il primo invio usa il flood, la conferma di consegna stabilisce il percorso diretto da riusare Dalla v2.6, next-hop routing: il flood iniziale stabilisce un nodo di inoltro successivo, con fallback al flood se il percorso smette di rispondere Traffico broadcast (canali/annunci) Sempre in flood, gestito dai…"
  },
  {
    "id": "meshcore-vs-meshtastic--ruoli-e-hardware-condiviso",
    "page": "Confronti",
    "title": "Ruoli e hardware condiviso",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Il concetto di \"ruolo\" esiste in entrambi i progetti, ma è applicato in modo diverso."
  },
  {
    "id": "meshcore-vs-meshtastic--ruoli-in-meshcore",
    "page": "Confronti",
    "title": "Ruoli in MeshCore",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Un nodo assume uno di quattro ruoli scelti al momento del flash del firmware: companion (client BLE/USB, non ripete), repeater (estende la copertura), room server (bacheca stile BBS con fino a 32 messaggi non letti per utente) o sensor (telemetria). Per la configurazione di ciascuno vedi la pagina comandi CLI per repeater e room server ."
  },
  {
    "id": "meshcore-vs-meshtastic--ruoli-in-meshtastic",
    "page": "Confronti",
    "title": "Ruoli in Meshtastic",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Meshtastic assegna un ruolo software a ogni nodo (tra cui Client, Router e Repeater) che ne modifica il comportamento nel flooding: i ruoli Router e Repeater hanno priorità più alta nel ritrasmettere un pacchetto anche se hanno già sentito un'altra ritrasmissione, mentre un Client segue il normale backoff basato sull'SNR. Sul piano dell'hardware, i due ecosistemi si sovrappongono molto: entrambi girano su board LoRa economiche e diffuse come Heltec V3, RAK4631/WisBlock o LilyGO T-Beam. Questo non significa che le reti siano compatibili tra loro: un nodo va flashato con il firmware dell'uno o dell'altro progetto, non con entrambi contemporaneamente, e le due mesh non si sentono anche sulla…"
  },
  {
    "id": "meshcore-vs-meshtastic--meshcore-o-meshtastic-dipende-dall-uso",
    "page": "Confronti",
    "title": "MeshCore o Meshtastic: dipende dall'uso",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Nessuna delle due reti è oggettivamente \"migliore\": rispondono bene a esigenze diverse."
  },
  {
    "id": "meshcore-vs-meshtastic--meshcore-e-indicato-quando",
    "page": "Confronti",
    "title": "MeshCore è indicato quando…",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Comunichi spesso in messaggi diretti con un gruppo di contatti noti e vuoi che l'airtime della rete si concentri sui percorsi effettivamente usati, con pochi repeater dedicati a fare da infrastruttura e client che restano leggeri sul traffico condiviso."
  },
  {
    "id": "meshcore-vs-meshtastic--meshtastic-e-indicato-quando",
    "page": "Confronti",
    "title": "Meshtastic è indicato quando…",
    "url": "https://meshcore-ita.github.io/meshcore-vs-meshtastic/",
    "text": "Vuoi che ogni nodo del gruppo veda automaticamente posizione e stato di tutti gli altri via broadcast periodico, con un ecosistema maturo di moduli e integrazioni costruito nel tempo dalla community Meshtastic. Chi arriva da MeshCore e vuole approfondire i primi passi pratici può partire dalla guida a MeshCore passo passo , mentre chi ha già un nodo configurato ma non riesce a farlo comunicare con il resto della mesh italiana dovrebbe controllare il preset radio condiviso per l'Italia . Le domande più comuni su costi, portata e sicurezza sono raccolte nella pagina FAQ MeshCore . Domande frequenti"
  },
  {
    "id": "glossario--radio-e-lora",
    "page": "Glossario",
    "title": "Radio e LoRa",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "I termini che descrivono come MeshCore trasmette fisicamente sull'aria."
  },
  {
    "id": "glossario--lora",
    "page": "Glossario",
    "title": "LoRa",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Modulazione radio a spettro allargato (chirp spread spectrum) su cui si basa la trasmissione fisica di MeshCore. Permette portate lunghe con potenze basse, a scapito della velocità di trasmissione."
  },
  {
    "id": "glossario--lorawan",
    "page": "Glossario",
    "title": "LoRaWAN",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Protocollo di rete a stella costruito sopra LoRa, con gateway e server centrali a cui i dispositivi si collegano. È un'architettura diversa da MeshCore, che è invece una mesh peer-to-peer senza gateway obbligatorio né backend internet."
  },
  {
    "id": "glossario--frequenza-e-banda-bandwidth",
    "page": "Glossario",
    "title": "Frequenza e banda (bandwidth)",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "La frequenza è il canale su cui opera un nodo; il preset condiviso dalla community italiana usa 869.618 MHz. La banda è la larghezza di spettro occupata da ogni trasmissione, 62.5 kHz nello stesso preset. Tutti i dettagli sono nella pagina dedicata al preset radio italiano per MeshCore ."
  },
  {
    "id": "glossario--spreading-factor-sf-e-coding-rate-cr",
    "page": "Glossario",
    "title": "Spreading Factor (SF) e Coding Rate (CR)",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Lo spreading factor allunga o accorcia la durata di ogni simbolo radio, scambiando portata con velocità e airtime: più alto è l'SF, più lontano arriva il segnale ma più a lungo occupa il canale. Il coding rate aggiunge ridondanza per la correzione d'errore. Il preset italiano usa SF8 e CR8."
  },
  {
    "id": "glossario--erp-e-duty-cycle",
    "page": "Glossario",
    "title": "ERP e duty cycle",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "L'ERP è la potenza radiata effettiva dall'antenna: nella sotto-banda usata in Italia il limite è 500 mW ERP. Il duty cycle è la percentuale di tempo per cui un nodo può trasmettere in un'ora: il limite di banda è il 10%, cioè al massimo 6 minuti di trasmissione ogni ora."
  },
  {
    "id": "glossario--rssi-snr-e-airtime",
    "page": "Glossario",
    "title": "RSSI, SNR e airtime",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "L'RSSI misura la potenza del segnale ricevuto in dBm; l'SNR misura quanto quel segnale sia pulito rispetto al rumore di fondo. L'airtime è il tempo effettivo che il radio passa in trasmissione, il valore che conta ai fini del duty cycle. Entrambi RSSI e SNR dell'ultimo pacchetto ricevuto, insieme all'airtime, si leggono su un repeater con il comando stats-radio , descritto nella pagina dei comandi CLI per amministrare un nodo MeshCore ."
  },
  {
    "id": "glossario--antenna-guadagno-e-ros-swr",
    "page": "Glossario",
    "title": "Antenna, guadagno e ROS/SWR",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "L'antenna irradia e riceve il segnale: la sua altezza e posizione contano spesso più della potenza di trasmissione. Il guadagno, in dBi, indica quanto un'antenna concentra l'energia in una direzione. Il ROS (o SWR) misura quanto bene antenna e cavo siano adattati al radio: valori alti indicano energia riflessa e sprecata, e nel tempo possono danneggiare lo stadio di uscita. Terminologia"
  },
  {
    "id": "glossario--rete-mesh-e-ruoli-dei-nodi",
    "page": "Glossario",
    "title": "Rete mesh e ruoli dei nodi",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Come i pacchetti si muovono tra i nodi e quali ruoli può assumere un dispositivo MeshCore."
  },
  {
    "id": "glossario--mesh-flood-e-path-discovery",
    "page": "Glossario",
    "title": "Mesh, flood e path discovery",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "La mesh è la topologia in cui i nodi si scambiano e ripetono pacchetti tra loro senza infrastruttura centrale. Il flood è la modalità con cui un pacchetto viene ritrasmesso verso tutti i vicini, usata da MeshCore per advert e messaggi di canale. Il path discovery è invece il meccanismo con cui MeshCore scopre un percorso diretto tra due nodi per i messaggi privati, evitando di inondare l'intera rete."
  },
  {
    "id": "glossario--hop-e-advert",
    "page": "Glossario",
    "title": "Hop e advert",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Un hop è ogni passaggio di un pacchetto attraverso un repeater: MeshCore applica un limite interno di 64 hop. L'advert è il pacchetto periodico con cui un nodo annuncia la propria presenza e identità, inviato di default ogni 12 ore o subito con il comando advert ."
  },
  {
    "id": "glossario--nodo-repeater-room-server-companion-sensor",
    "page": "Glossario",
    "title": "Nodo, repeater, room server, companion, sensor",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Nodo è il termine generico per qualsiasi dispositivo che esegue il firmware MeshCore. Un repeater estende la copertura inoltrando i pacchetti sui percorsi appresi. Un room server funziona come una bacheca condivisa, conservando fino a 32 messaggi non letti per ogni utente. Un companion è collegato via BLE o USB a un'app o a un client web e non ripete i pacchetti altrui. Un sensor trasmette telemetria o payload personalizzati sulla mesh. I dettagli su hardware e configurazione di ciascun ruolo sono nella guida passo passo a MeshCore in italiano ."
  },
  {
    "id": "glossario--mappa-pubblica",
    "page": "Glossario",
    "title": "Mappa pubblica",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "La mappa pubblica, consultabile su map.meshcore.io, mostra i nodi che i loro proprietari hanno scelto volontariamente di condividere. Terminologia"
  },
  {
    "id": "glossario--sicurezza-e-crittografia",
    "page": "Glossario",
    "title": "Sicurezza e crittografia",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Come MeshCore protegge identità e contenuto dei messaggi senza un server centrale."
  },
  {
    "id": "glossario--ed25519-e-chiave-pubblica",
    "page": "Glossario",
    "title": "Ed25519 e chiave pubblica",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Ed25519 è la curva ellittica usata da MeshCore per l'identità e la firma di ogni nodo. La chiave pubblica che ne deriva è l'identificativo crittografico del nodo, condiviso per stabilire fiducia e instradare i messaggi verso il destinatario corretto."
  },
  {
    "id": "glossario--x25519-ecdh-e-aes-128",
    "page": "Glossario",
    "title": "X25519 / ECDH e AES-128",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "X25519 (ECDH su curva ellittica) è lo scambio di chiavi con cui due nodi derivano una chiave condivisa senza mai trasmetterla in chiaro. Quella chiave viene poi usata con AES-128 per cifrare il contenuto dei messaggi, che restano privati anche senza rete internet o cellulare."
  },
  {
    "id": "glossario--pin-di-pairing",
    "page": "Glossario",
    "title": "PIN di pairing",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Il PIN di pairing è il codice numerico richiesto per accoppiare via Bluetooth un nodo companion; il valore di default è 123456 . Se l'accoppiamento fallisce, la pagina soluzioni ai problemi più comuni di MeshCore elenca le cause più frequenti. Terminologia"
  },
  {
    "id": "glossario--firmware-e-aggiornamenti",
    "page": "Glossario",
    "title": "Firmware e aggiornamenti",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "I termini che incontri flashando o aggiornando un nodo."
  },
  {
    "id": "glossario--web-flasher",
    "page": "Glossario",
    "title": "Web flasher",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Lo strumento ufficiale nel browser, su flasher.meshcore.io, per installare il firmware MeshCore via USB senza bisogno di toolchain locali."
  },
  {
    "id": "glossario--ota-e-dfu",
    "page": "Glossario",
    "title": "OTA e DFU",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "OTA è l'aggiornamento firmware over-the-air, avviato con il comando start ota : su board ESP32 apre un hotspot Wi-Fi dedicato, su board nRF52 prepara il nodo per il DFU (Device Firmware Update), completato tramite l'app nRF DFU dello smartphone."
  },
  {
    "id": "glossario--bin-merged-non-merged",
    "page": "Glossario",
    "title": "Bin merged / non-merged",
    "url": "https://meshcore-ita.github.io/glossario/",
    "text": "Due varianti del firmware compilato per l'aggiornamento: il bin merged azzera l'abbinamento Bluetooth esistente ma mantiene nome, chiavi e preset radio salvati; il bin non-merged mantiene invece il pairing Bluetooth già stabilito. La procedura completa, comando per comando, è nella pagina dei comandi CLI per amministrare un nodo MeshCore ; per il confronto con altri sistemi mesh vedi la pagina MeshCore a confronto con Meshtastic ."
  },
  {
    "id": "community--una-community-indipendente-aperta-e-documentata",
    "page": "Community",
    "title": "Una community indipendente, aperta e documentata",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "MeshCore ITA esiste per dare a chi usa MeshCore in Italia un punto di riferimento in italiano, verificato e aperto a tutti. MeshCore ITA è una community indipendente: non è affiliata al progetto upstream MeshCore né lo rappresenta ufficialmente. MeshCore, il firmware e i client su cui ci basiamo, è un progetto open source rilasciato con licenza MIT; la nostra community italiana esiste per tre ragioni concrete. La prima è avere un preset radio condiviso, così che i nodi installati da persone diverse in città diverse si sentano davvero tra loro invece di restare isole isolate. La seconda è offrire documentazione tecnica in italiano, verificata rispetto alle fonti ufficiali del progetto e non…"
  },
  {
    "id": "community--il-gruppo-telegram-e-pubblico",
    "page": "Community",
    "title": "Il gruppo Telegram è pubblico",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Non serve un invito: chiunque usi o voglia iniziare a usare MeshCore può entrare. Il gruppo Telegram MeshCore ITA è aperto e gratuito. Che tu stia configurando il tuo primo nodo seguendo la guida passo passo a MeshCore in italiano o gestisca già un repeater da mesi, il gruppo è il posto dove presentarsi, fare domande e coordinarsi con chi ha copertura vicino a te. ENTRA NEL GRUPPO TELEGRAM ↗ Struttura del gruppo"
  },
  {
    "id": "community--otto-topic-generali-uno-per-regione",
    "page": "Community",
    "title": "Otto topic generali, uno per regione",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Il gruppo è organizzato in topic separati, per tenere le discussioni leggibili anche con molti membri attivi."
  },
  {
    "id": "community--annunci",
    "page": "Community",
    "title": "Annunci",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Comunicazioni ufficiali della community e aggiornamenti importanti."
  },
  {
    "id": "community--benvenuti-e-presentazioni",
    "page": "Community",
    "title": "Benvenuti e presentazioni",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Dove i nuovi membri si presentano al resto della community."
  },
  {
    "id": "community--supporto-e-troubleshooting",
    "page": "Community",
    "title": "Supporto e troubleshooting",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Domande tecniche e aiuto per risolvere problemi di configurazione dei nodi."
  },
  {
    "id": "community--hardware-e-antenne",
    "page": "Community",
    "title": "Hardware e antenne",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Confronti su board, antenne, alimentazione e installazioni fisiche."
  },
  {
    "id": "community--firmware-e-configurazione",
    "page": "Community",
    "title": "Firmware e configurazione",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Versioni firmware, preset radio e impostazioni dei dispositivi."
  },
  {
    "id": "community--repeater-e-room-server",
    "page": "Community",
    "title": "Repeater e room server",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Coordinamento di installazioni condivise e infrastruttura di rete."
  },
  {
    "id": "community--mappa-e-copertura",
    "page": "Community",
    "title": "Mappa e copertura",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Segnalazioni di copertura e aggiornamenti sulla mappa pubblica."
  },
  {
    "id": "community--off-topic",
    "page": "Community",
    "title": "Off-topic",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Chiacchiere libere, non legate a MeshCore. Accanto a questi otto, ogni regione italiana ha un topic dedicato con prefisso IT · : Abruzzo, Basilicata, Calabria, Campania, Emilia-Romagna, Friuli-Venezia Giulia, Lazio, Liguria, Lombardia, Marche, Molise, Piemonte, Puglia, Sardegna, Sicilia, Toscana, Trentino-Alto Adige, Umbria, Valle d'Aosta e Veneto. Le discussioni locali — nuove installazioni, copertura di zona, incontri — vanno nel topic della propria regione; i topic generali restano per gli argomenti trasversali a tutta la community. Regole"
  },
  {
    "id": "community--convivenza-nel-gruppo",
    "page": "Community",
    "title": "Convivenza nel gruppo",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Rispetto reciproco: niente spam, pubblicità non richiesta o offese. Usa il topic giusto per l'argomento, compreso quello della tua regione. Rispetta la normativa radio quando operi in banda 869 MHz: i limiti di potenza ed ERP e di duty cycle sono riassunti nella pagina del preset radio italiano per MeshCore . Niente contenuti illegali. Il regolamento completo, quando presente, è fissato in cima al gruppo. Per problemi tecnici puntuali il topic Supporto e troubleshooting resta il canale più veloce; per una diagnosi scritta, la pagina soluzioni ai problemi più comuni di MeshCore copre i casi più frequenti passo passo. Contribuire"
  },
  {
    "id": "community--sito-documentazione-e-coordinamento-infrastruttura",
    "page": "Community",
    "title": "Sito, documentazione e coordinamento infrastruttura",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "Questo sito, come tutto il resto della community, è open source. Se trovi un'imprecisione, un comando mancante o una pagina da migliorare, apri una issue o una pull request sul repository del sito ↗ ; le altre risorse della community sono nell'organizzazione github.com/meshcore-ita ↗ . Ogni modifica tecnica proposta va confrontata con le fonti ufficiali del progetto MeshCore o con la pagina dei comandi CLI per amministrare un nodo MeshCore , che elenchiamo con la stessa disciplina. Se invece vuoi coordinare un repeater o un room server con la community, il percorso è: verifica prima nel topic Repeater e room server se qualcuno copre già la tua zona, scegli hardware coerente con la guida…"
  },
  {
    "id": "community--un-marchio-una-community-indipendente",
    "page": "Community",
    "title": "Un marchio, una community indipendente",
    "url": "https://meshcore-ita.github.io/community/",
    "text": "MeshCore ITA è una community indipendente: non è affiliata al progetto MeshCore né ne è sponsorizzata o approvata. Il nome MeshCore resta del suo progetto e dei suoi autori upstream; questo sito e il gruppo Telegram sono iniziative della community italiana, gestite volontariamente e senza scopo di lucro. I contenuti di questo sito sono pubblicati sotto licenza CC BY 4.0, il codice del sito sotto licenza MIT: puoi riusarli citando la fonte. Per qualsiasi dubbio su cosa sia ufficiale e cosa no, la pagina delle domande frequenti su MeshCore in italiano raccoglie anche questo tipo di domande."
  }
];

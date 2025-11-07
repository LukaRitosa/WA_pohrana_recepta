export let recepti = [
  {
    id: 1,
    id_korisnik: 2,
    naziv: "Palačinke",
    opis: "Klasične tanke palačinke idealne za doručak ili desert.",
    sastojci: ["jaja", "brašno", "mlijeko", "šećer", "sol"],
    upute: "Pomiješaj sve sastojke dok ne dobiješ glatku smjesu. Ispeci na tavi na srednjoj temperaturi s obje strane.",
    kategorija: "Doručak"
  },
  {
    id: 2,
    id_korisnik: 1,
    naziv: "Pečena piletina s krumpirom",
    opis: "Sočna pečena piletina sa začinjenim krumpirom iz pećnice.",
    sastojci: ["piletina", "krumpir", "maslinovo ulje", "ružmarin", "sol", "papar"],
    upute: "Začini piletinu i krumpir, stavi u pećnicu na 200°C i peci 45 minuta.",
    kategorija: "Glavno jelo"
  },
  {
    id: 3,
    id_korisnik: 3,
    naziv: "Čokoladni mousse",
    opis: "Lagani i kremasti desert od tamne čokolade.",
    sastojci: ["tamna čokolada", "jaja", "šećer", "vrhnje za šlag"],
    upute: "Otopi čokoladu, izmiksaj bjelanjke i vrhnje te sve pažljivo spoji. Ohladi u hladnjaku najmanje 2 sata.",
    kategorija: "Desert"
  },
  {
    id: 4,
    id_korisnik: 1,
    naziv: "Salata od tune",
    opis: "Svježa salata s tunom, krastavcima i maslinama.",
    sastojci: ["tuna", "krastavac", "rajčica", "masline", "maslinovo ulje", "limunov sok"],
    upute: "Sve sastojke nasjeckaj i pomiješaj, začini limunovim sokom i maslinovim uljem.",
    kategorija: "Predjelo"
  },
  {
    id: 5,
    id_korisnik: 2,
    naziv: "Rižoto s gljivama",
    opis: "Kremasti rižoto s mješavinom šumskih gljiva.",
    sastojci: ["riža", "gljive", "luk", "maslac", "parmezan", "pileći temeljac"],
    upute: "Pirjaj luk i gljive, dodaj rižu, zalijevaj temeljcem i kuhaj dok riža ne omekša. Na kraju dodaj maslac i parmezan.",
    kategorija: "Glavno jelo"
  }
]


export let korisnici = [
  {
    id: 1,
    ime: "Ivan",
    prezime: "Horvat",
    email: "ivan.horvat@example.com"
  },
  {
    id: 2,
    ime: "Ana",
    prezime: "Kovač",
    email: "ana.kovac@example.com"
  },
  {
    id: 3,
    ime: "Marko",
    prezime: "Babić",
    email: "marko.babic@example.com"
  },
  {
    id: 4,
    ime: "Maja",
    prezime: "Šarić",
    email: "maja.saric@example.com"
  },
  {
    id: 5,
    ime: "Luka",
    prezime: "Jurić",
    email: "luka.juric@example.com"
  }
]

export let komentari = [
  {
    id: 1,
    id_recept: 2,
    id_korisnik: 3,
    tekst: "Odličan recept, jako mi se sviđa!",
    odgovor: null
  },
  {
    id: 2,
    id_recept: 2,
    id_korisnik: 1,
    tekst: "Hvala, drago mi je da ti se sviđa!",
    odgovor: 1  
  },
  {
    id: 3,
    id_recept: 1,
    id_korisnik: 4,
    tekst: "Mogu li umjesto mlijeka koristiti bademovo mlijeko?",
    odgovor: null
  },
  {
    id: 4,
    id_recept: 1,
    id_korisnik: 2,
    tekst: "Da, bademovo mlijeko funkcionira sasvim dobro!",
    odgovor: 3 
  },
  {
    id: 5,
    id_recept: 1,
    id_korisnik: 5,
    tekst: "Još jedan dodatak, probajte dodati malo vanilije u smjesu.",
    odgovor: null
  }
]

export let ocjene = [
  {
    id: 1,
    id_recept: 1,
    id_korisnik: 2,
    zvjezdice: 5,      
    komentar: "Fantastične palačinke, brzo i ukusno!"
  },
  {
    id: 2,
    id_recept: 2,
    id_korisnik: 3,
    zvjezdice: 4,
    komentar: "Piletina je bila sočna, ali sam dodao malo više začina."
  },
  {
    id: 3,
    id_recept: 3,
    id_korisnik: 1,
    zvjezdice: 5,
    komentar: "Mousse je odličan, kremast i ne previše sladak."
  },
  {
    id: 4,
    id_recept: 4,
    id_korisnik: 4,
    zvjezdice: 3,
    komentar: "Salata je dobra, ali meni je falilo malo više limuna."
  },
  {
    id: 5,
    id_recept: 1,
    id_korisnik: 5,
    zvjezdice: 4,
    komentar: "Palačinkesu dobre samo bi mogle biti bolje."
  }
]

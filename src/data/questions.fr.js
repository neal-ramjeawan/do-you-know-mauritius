// French (fr) translations of the question bank in questions.js, keyed by
// id. Same authoring convention as the English source: options[0] is
// always the correct answer. Only q/options/fact are overridden here —
// id/category/difficulty/answer stay driven by the English record (see
// src/lib/localizeQuestions.js). Missing an id here just means that
// question falls back to English; nothing breaks.
//
// Mauritian Creole (Morisyen) is intentionally not included. Getting 150
// factual quiz questions right in a language I don't have strong,
// reliable training data on is a real accuracy risk, and this file is
// the wrong place to guess. The lookup/fallback design here means a
// `fr-MU` (or similar) file can be dropped in later without touching
// anything else.

export const QUESTIONS_FR = {
  // ---------------- HISTORY ----------------
  h1: {
    q: 'Quels marins européens sont crédités d\u2019avoir nommé l\u2019île Maurice, en l\u2019honneur du prince Maurice de Nassau, en 1598\u00a0?',
    options: ['Des marins néerlandais', 'Des marins portugais', 'Des marins britanniques', 'Des marins français'],
    fact: 'Les Néerlandais ont nommé l\u2019île en l\u2019honneur du prince Maurice, stathouder de la République néerlandaise.',
  },
  h2: {
    q: 'Comment appelait-on l\u2019île Maurice durant la période de la colonisation française (1715-1810)\u00a0?',
    options: ['Isle de France', 'Île Bourbon', 'L\u2019île de la Cannelle', 'Isle Maurice'],
    fact: 'Les Français ont rebaptisé l\u2019île après l\u2019avoir prise aux Néerlandais en 1715.',
  },
  h3: {
    q: 'En quelle année les marins néerlandais ont-ils débarqué pour la première fois à l\u2019île Maurice\u00a0?',
    options: ['1598', '1638', '1715', '1810'],
    fact: 'Une flotte commandée par Wybrand van Warwijck débarqua en 1598, bien qu\u2019une colonie permanente n\u2019ait été établie que des décennies plus tard.',
  },
  h4: {
    q: 'Quel pays a pris le contrôle de l\u2019île Maurice aux mains des Néerlandais, la rebaptisant Isle de France\u00a0?',
    options: ['La France', 'La Grande-Bretagne', 'Le Portugal', 'L\u2019Espagne'],
    fact: 'La France en prit le contrôle en 1715, cinq ans après que les Néerlandais eurent abandonné l\u2019île.',
  },
  h5: {
    q: 'La bataille de Grand Port, livrée près de l\u2019île Maurice en 1810, est considérée comme la seule victoire navale française de quel type\u00a0?',
    options: [
      'Une victoire navale sur les Britanniques pendant les guerres napoléoniennes',
      'Une victoire navale sur les Néerlandais',
      'Une victoire navale dans la traite négrière de l\u2019océan Indien',
      'Une victoire navale sur des pirates',
    ],
    fact: 'Grand Port est le seul nom de bataille navale de l\u2019époque napoléonienne inscrit sur l\u2019Arc de Triomphe à Paris.',
  },
  h6: {
    q: 'Quelle puissance a pris le contrôle de l\u2019île Maurice à la France en 1810 et l\u2019a gouvernée jusqu\u2019à l\u2019indépendance\u00a0?',
    options: ['La Grande-Bretagne', 'Le Portugal', 'L\u2019Allemagne', 'L\u2019Espagne'],
    fact: 'La Grande-Bretagne a largement conservé la langue, le droit et les coutumes françaises, façonnant le caractère franco-britannique de l\u2019île aujourd\u2019hui.',
  },
  h7: {
    q: 'En quelle année l\u2019île Maurice a-t-elle obtenu son indépendance de la Grande-Bretagne\u00a0?',
    options: ['1968', '1958', '1975', '1992'],
    fact: 'L\u2019indépendance a été proclamée le 12 mars 1968, date aujourd\u2019hui célébrée comme fête nationale.',
  },
  h8: {
    q: 'En quelle année l\u2019île Maurice est-elle devenue une république au sein du Commonwealth\u00a0?',
    options: ['1992', '1968', '1985', '2001'],
    fact: 'C\u2019est arrivé le 12 mars 1992 — exactement 24 ans après l\u2019indépendance.',
  },
  h9: {
    q: 'Qui fut le premier Premier ministre de l\u2019île Maurice après l\u2019indépendance\u00a0?',
    options: ['Sir Seewoosagur Ramgoolam', 'Sir Anerood Jugnauth', 'Paul Bérenger', 'Navin Ramgoolam'],
    fact: 'Souvent appelé le «\u00a0père de la nation\u00a0», son portrait figure sur les billets de roupie mauricienne.',
  },
  h10: {
    q: 'Quel site du patrimoine mondial de l\u2019UNESCO à Port-Louis commémore l\u2019arrivée des travailleurs engagés à l\u2019île Maurice\u00a0?',
    options: ['Aapravasi Ghat', 'Le Morne Brabant', 'Champ de Mars', 'Caudan Waterfront'],
    fact: 'Près d\u2019un demi-million de travailleurs engagés ont posé le pied pour la première fois dans l\u2019Empire britannique à cet endroit.',
  },
  h11: {
    q: 'En quelle année l\u2019esclavage a-t-il été aboli à l\u2019île Maurice, alors colonie britannique\u00a0?',
    options: ['1835', '1810', '1868', '1900'],
    fact: 'L\u2019abolition a conduit les planteurs à recruter un grand nombre de travailleurs engagés venus d\u2019Inde.',
  },
  h12: {
    q: 'Quelle montagne du sud-ouest de l\u2019île Maurice est un site du patrimoine mondial de l\u2019UNESCO lié aux esclaves marrons qui s\u2019y cachaient\u00a0?',
    options: ['Le Morne Brabant', 'Pieter Both', 'Le Pouce', 'Piton de la Petite Rivière Noire'],
    fact: 'Ses falaises abritaient les marrons, et elle symbolise aujourd\u2019hui la liberté et la résistance.',
  },
  h13: {
    q: 'Après l\u2019abolition de l\u2019esclavage, des travailleurs engagés furent amenés en grand nombre à l\u2019île Maurice depuis quel pays\u00a0?',
    options: ['L\u2019Inde', 'La Chine', 'Madagascar', 'Le Portugal'],
    fact: 'Leurs descendants forment aujourd\u2019hui la plus grande part de la population mauricienne.',
  },
  h14: {
    q: 'Quelle culture a porté l\u2019économie coloniale de l\u2019île Maurice pendant plus d\u2019un siècle\u00a0?',
    options: ['La canne à sucre', 'Le café', 'Le coton', 'Le thé'],
    fact: 'À son apogée, le sucre représentait l\u2019immense majorité des recettes d\u2019exportation de l\u2019île Maurice.',
  },
  h15: {
    q: 'Quel hippodrome historique de Port-Louis, fondé en 1812, est l\u2019un des plus anciens de l\u2019hémisphère Sud\u00a0?',
    options: ['L\u2019hippodrome du Champ de Mars', 'Le stade Anjalay', 'Caudan Waterfront', 'Grand Bassin'],
    fact: 'Il fut aménagé par des officiers de cavalerie britanniques seulement deux ans après la prise de l\u2019île par la Grande-Bretagne.',
  },
  h16: {
    q: 'Que signifie la devise nationale de l\u2019île Maurice, «\u00a0Stella Clavisque Maris Indici\u00a0»\u00a0?',
    options: [
      '«\u00a0Étoile et clé de l\u2019océan Indien\u00a0»',
      '«\u00a0Unité dans la diversité\u00a0»',
      '«\u00a0Terre de sucre et de soleil\u00a0»',
      '«\u00a0Perle de l\u2019océan\u00a0»',
    ],
    fact: 'Elle reflète la longue histoire de l\u2019île Maurice comme point de passage stratégique sur les routes commerciales de l\u2019océan Indien.',
  },
  h17: {
    q: 'Avant la colonisation européenne, l\u2019île Maurice était inhabitée mais avait été visitée par des marins venus d\u2019où\u00a0?',
    options: ['Des marins arabes et portugais', 'Des marins chinois', 'Des marins romains', 'Des marins vikings'],
    fact: 'Ils ont laissé l\u2019île intacte — aucune colonie permanente n\u2019existait avant l\u2019arrivée des Néerlandais.',
  },
  h18: {
    q: 'L\u2019île Maurice, La Réunion et Rodrigues forment ensemble quel groupe d\u2019îles\u00a0?',
    options: ['Les îles Mascareignes', 'Les Seychelles', 'Les Comores', 'L\u2019archipel des Chagos'],
    fact: 'Le groupe doit son nom à l\u2019explorateur portugais Pedro Mascarenhas.',
  },
  h19: {
    q: 'Quel auteur français, qui vécut sur l\u2019île, écrivit le roman «\u00a0Paul et Virginie\u00a0» (1788), qui s\u2019y déroule\u00a0?',
    options: ['Bernardin de Saint-Pierre', 'Victor Hugo', 'Jules Verne', 'Voltaire'],
    fact: 'Le roman devint l\u2019une des œuvres françaises les plus populaires de son époque et attira tôt l\u2019attention sur l\u2019île Maurice.',
  },
  h20: {
    q: 'Quel terme désigne les descendants des esclaves en fuite qui se cachaient dans les montagnes de l\u2019île Maurice à l\u2019époque coloniale\u00a0?',
    options: ['Marrons', 'Créoles', 'Zaffers', 'Sirdars'],
    fact: 'L\u2019histoire du Morne Brabant y est étroitement liée, et elle est honorée le 1er février, jour de l\u2019abolition de l\u2019esclavage.',
  },

  // ---------------- GEOGRAPHY ----------------
  g1: { q: 'Quelle est la capitale de l\u2019île Maurice\u00a0?', options: ['Port-Louis', 'Curepipe', 'Quatre Bornes', 'Rose-Hill'] },
  g2: { q: 'L\u2019île Maurice est une nation insulaire située dans quel océan\u00a0?', options: ['L\u2019océan Indien', 'L\u2019océan Atlantique', 'L\u2019océan Pacifique', 'L\u2019océan Arctique'] },
  g3: { q: 'L\u2019île Maurice se trouve à l\u2019est de quelle grande nation insulaire au large de l\u2019Afrique\u00a0?', options: ['Madagascar', 'Les Comores', 'Les Seychelles', 'Zanzibar'] },
  g4: {
    q: 'Quelle est la superficie totale approximative de l\u2019île Maurice\u00a0?',
    options: ['Environ 2\u00a0040\u00a0km²', 'Environ 200\u00a0km²', 'Environ 20\u00a0000\u00a0km²', 'Environ 8\u00a0000\u00a0km²'],
    fact: 'Malgré sa petite taille, l\u2019île Maurice réunit plages, montagnes, forêts et un récif corallien presque continu.',
  },
  g5: { q: 'Quel est le nom du plus haut sommet de l\u2019île Maurice\u00a0?', options: ['Le Piton de la Petite Rivière Noire', 'Le Pouce', 'Pieter Both', 'Corps de Garde'] },
  g6: { q: 'Quelle est la hauteur approximative du plus haut sommet de l\u2019île Maurice\u00a0?', options: ['Environ 828\u00a0mètres', 'Environ 428\u00a0mètres', 'Environ 1\u00a0428\u00a0mètres', 'Environ 2\u00a0828\u00a0mètres'] },
  g7: {
    q: 'Quel est le nom des célèbres dunes de sable multicolores du sud-ouest de l\u2019île Maurice\u00a0?',
    options: ['Les Terres de Couleur de Chamarel', 'Les gorges de Black River', 'Grand Bassin', 'L\u2019île aux Cerfs'],
    fact: 'Les couleurs proviennent du refroidissement inégal de la roche volcanique, créant des couches minérales distinctes.',
  },
  g8: {
    q: 'Quel est le nom du lac de cratère sacré de l\u2019île Maurice, haut lieu de pèlerinage hindou\u00a0?',
    options: ['Grand Bassin (Ganga Talao)', 'La Mare aux Vacoas', 'Bassin Blanc', 'Les chutes de Tamarin'],
    fact: 'Les fidèles considèrent que ses eaux sont spirituellement liées au Gange sacré, en Inde.',
  },
  g9: { q: 'Quelle petite île au large de la côte est de l\u2019île Maurice est une destination prisée pour une excursion d\u2019une journée\u00a0?', options: ['L\u2019île aux Cerfs', 'L\u2019île aux Aigrettes', 'L\u2019île Ronde', 'L\u2019île Plate'] },
  g10: {
    q: 'Quelle est l\u2019origine géologique de l\u2019île Maurice\u00a0?',
    options: ['Volcanique', 'Un atoll corallien', 'Un fragment continental', 'Glaciaire'],
    fact: 'L\u2019île s\u2019est formée par activité volcanique il y a environ 8 millions d\u2019années.',
  },
  g11: { q: 'Quel parc marin du sud de l\u2019île Maurice est réputé pour ses eaux limpides et ses excursions en bateau à fond de verre\u00a0?', options: ['Le parc marin de Blue Bay', 'Les gorges de Black River', 'Le parc marin de Balaclava', 'La réserve de Flic-en-Flac'] },
  g12: {
    q: 'Quel est le nom de l\u2019île extérieure semi-autonome qui fait partie de la République de Maurice\u00a0?',
    options: ['Rodrigues', 'Agalega', 'Tromelin', 'Diego Garcia'],
    fact: 'Rodrigues se trouve à environ 560\u00a0km à l\u2019est de l\u2019île principale et dispose de sa propre assemblée régionale.',
  },
  g13: { q: 'Quel élément naturel protège presque tout le littoral de l\u2019île Maurice, créant des lagons calmes\u00a0?', options: ['Un récif corallien', 'Une côte rocheuse', 'Des mangroves', 'Des bancs de sable'] },
  g14: { q: 'Quel est le nom du quartier historique du front de mer de Port-Louis, connu pour ses boutiques, ses restaurants et sa marina\u00a0?', options: ['Caudan Waterfront', 'Chinatown', 'Le Jardin de la Compagnie', 'Fort Adélaïde'] },
  g15: {
    q: 'Quel est le nom de la montagne surplombant Port-Louis dont la silhouette évoque un pouce levé\u00a0?',
    options: ['Le Pouce', 'Le Morne Brabant', 'Pieter Both', 'Corps de Garde'],
    fact: '«\u00a0Le Pouce\u00a0» doit son nom à sa forme caractéristique.',
  },
  g16: { q: 'Quelle est la monnaie officielle de l\u2019île Maurice\u00a0?', options: ['La roupie mauricienne', 'Le franc mauricien', 'Le dollar mauricien', 'Le shilling est-africain'] },
  g17: {
    q: 'De quel côté de la route circulent les véhicules à l\u2019île Maurice\u00a0?',
    options: ['À gauche', 'À droite', 'Cela varie', 'Selon le district'],
    fact: 'C\u2019est un héritage de la colonisation britannique.',
  },
  g18: { q: 'Quel est le décalage horaire standard de l\u2019île Maurice par rapport à l\u2019UTC\u00a0?', options: ['UTC+4', 'UTC+2', 'UTC+8', 'UTC+0'] },
  g19: { q: 'Quelles îles éloignées de l\u2019île Maurice, situées loin au nord, sont connues pour leurs plantations de cocotiers et leur faible population permanente\u00a0?', options: ['Les îles Agalega', 'Rodrigues', 'Tromelin', 'Les Cargados Carajos'] },
  g20: {
    q: 'Quel est le nom de la montagne visible depuis Port-Louis, dont le sommet à double pointe fut escaladé pour la première fois en 1874\u00a0?',
    options: ['Pieter Both', 'Le Pouce', 'Corps de Garde', 'Trois Mamelles'],
    fact: 'Elle doit son nom à un amiral néerlandais et est célèbre pour l\u2019étrange rocher en équilibre à son sommet.',
  },

  // ---------------- NATURE & WILDLIFE ----------------
  n1: { q: 'Quel oiseau incapable de voler, endémique de l\u2019île Maurice et éteint depuis la fin du XVIIe\u00a0siècle, est le symbole le plus célèbre du pays\u00a0?', options: ['Le dodo', 'Le kiwi', 'Le kakapo', 'Le moa'] },
  n2: { q: 'Vers quelle époque le dodo s\u2019est-il éteint\u00a0?', options: ['Vers 1681', 'Vers 1800', 'Vers 1500', 'Vers 1950'] },
  n3: {
    q: 'Quel oiseau est l\u2019oiseau national de l\u2019île Maurice, autrefois considéré comme le plus rare au monde avec seulement quatre individus connus à l\u2019état sauvage\u00a0?',
    options: ['La crécerelle de Maurice', 'Le pigeon rose', 'Le dodo', 'La perruche de Maurice'],
    fact: 'Des efforts de conservation intensifs l\u2019ont sauvée de justesse dans les années 1970 et 1980.',
  },
  n4: { q: 'Quel est le nom de l\u2019oiseau endémique au plumage rose que les défenseurs de l\u2019environnement ont sauvé d\u2019une quasi-extinction\u00a0?', options: ['Le pigeon rose', 'Le flamant rose', 'Le foudi de Maurice', 'L\u2019ibis rouge'] },
  n5: { q: 'Quelle grande chauve-souris frugivore, native de l\u2019île Maurice, est parfois abattue de manière controversée pour protéger les récoltes de fruits\u00a0?', options: ['La roussette de Maurice', 'La chauve-souris vampire', 'Le rhinolophe', 'La petite chauve-souris brune'] },
  n6: { q: 'Quel parc national protège une grande partie de la forêt native restante de l\u2019île Maurice\u00a0?', options: ['Le parc national des Gorges de Rivière Noire', 'Le parc national de Bras d\u2019Eau', 'Le parc national de Chamarel', 'La réserve de Ferney'] },
  n7: { q: 'Quel reptile, un scinque nommé en l\u2019honneur du botaniste Charles Telfair, est natif des îlots au large de l\u2019île Maurice\u00a0?', options: ['Le scinque de Telfair', 'Le boa de Round Island', 'Le scinque de Bojer', 'Le gecko de Gunther'] },
  n8: { q: 'Quelle espèce de tortue géante a été introduite sur des îlots mauriciens pour aider à restaurer les écosystèmes, remplaçant les tortues natives disparues\u00a0?', options: ['La tortue géante d\u2019Aldabra', 'La tortue géante des Galápagos', 'La tortue géante des Seychelles', 'La tortue radiée de Madagascar'] },
  n9: { q: 'Quelle est la fleur nationale de l\u2019île Maurice\u00a0?', options: ['Trochetia boutoniana (la Boucle d\u2019Oreille)', 'L\u2019hibiscus', 'L\u2019oiseau de paradis', 'Le frangipanier'] },
  n10: { q: 'Quel terme désigne les espèces, comme beaucoup de plantes et d\u2019animaux de l\u2019île Maurice, que l\u2019on ne trouve nulle part ailleurs sur Terre\u00a0?', options: ['Endémique', 'Envahissante', 'Migratrice', 'Domestiquée'] },
  n11: { q: 'Quelle petite réserve naturelle insulaire près de l\u2019île Maurice est exempte de prédateurs introduits et abrite des reptiles natifs réintroduits\u00a0?', options: ['L\u2019île aux Aigrettes', 'L\u2019île aux Cerfs', 'L\u2019île Plate', 'Coin de Mire'] },
  n12: { q: 'Quel mammifère marin peut souvent être observé lors d\u2019excursions en bateau au large de la côte ouest de l\u2019île Maurice, près de Tamarin\u00a0?', options: ['Le dauphin à long bec', 'L\u2019orque', 'Le lion de mer', 'Le narval'] },
  n13: { q: 'Quel âge approximatif a la masse volcanique de l\u2019île Maurice\u00a0?', options: ['Environ 8 millions d\u2019années', 'Environ 800\u00a0000 ans', 'Environ 80 millions d\u2019années', 'Environ 8\u00a0000 ans'] },
  n14: { q: 'Quels animaux, introduits par les premiers marins, sont largement tenus pour responsables de l\u2019extinction du dodo en dévorant ses œufs\u00a0?', options: ['Les rats, les cochons et les singes', 'Les chats et les renards', 'Les chèvres et les moutons', 'Les lapins et les lièvres'] },
  n15: { q: 'Quel est le nom du jardin botanique de Pamplemousses, célèbre pour ses nénuphars géants et son jardin d\u2019épices\u00a0?', options: ['Le jardin botanique Sir-Seewoosagur-Ramgoolam', 'Le jardin botanique de Curepipe', 'Le jardin botanique de Black River', 'Les jardins de Ganga Talao'] },
  n16: { q: 'Quelle espèce de nénuphar géant fait la renommée du jardin botanique de Pamplemousses, avec des feuilles de plus d\u2019un mètre de large\u00a0?', options: ['Victoria amazonica', 'Nymphaea alba', 'Le lotus', 'La jacinthe d\u2019eau'] },
  n17: { q: 'Quel genre coloré de gecko diurne est particulièrement diversifié à l\u2019île Maurice et sur ses îlots\u00a0?', options: ['Phelsuma', 'Gekko', 'Iguana', 'Chameleo'] },
  n18: { q: 'Quelle organisation de conservation fondée à l\u2019île Maurice a mené les efforts pour sauver des espèces comme le pigeon rose et la crécerelle de Maurice\u00a0?', options: ['La Mauritian Wildlife Foundation', 'WWF Maurice', 'L\u2019Indian Ocean Conservation Trust', 'Le Blue Bay Trust'] },
  n19: { q: 'Le blanchissement des coraux, causé par le réchauffement des mers, menace de plus en plus quel élément naturel clé de l\u2019île Maurice\u00a0?', options: ['Ses récifs coralliens', 'Ses sommets volcaniques', 'Sa canopée forestière', 'Ses dunes de sable'] },
  n20: {
    q: 'En dehors des chauves-souris, quel type d\u2019animal natif est notablement absent de l\u2019île Maurice en raison de son isolement océanique\u00a0?',
    options: ['Les grands mammifères terrestres', 'Les insectes', 'Les reptiles', 'Les oiseaux'],
    fact: 'L\u2019isolement a permis aux oiseaux, aux reptiles et aux chauves-souris — mais pas aux grands mammifères — d\u2019évoluer ici sans perturbation pendant des millions d\u2019années.',
  },

  // ---------------- CULTURE & TRADITIONS ----------------
  c1: { q: 'Quel est le style de musique et de danse traditionnel de l\u2019île Maurice, aux racines africaines et aux mouvements de hanches balancés\u00a0?', options: ['Le séga', 'La salsa', 'Le zouk', 'Le kizomba'] },
  c2: { q: 'La musique séga est traditionnellement accompagnée de quel tambour artisanal en peau de cabri\u00a0?', options: ['La ravanne', 'Le djembé', 'Le tabla', 'Le bongo'] },
  c3: { q: 'Quelle religion est pratiquée par la plus grande part de la population de l\u2019île Maurice\u00a0?', options: ['L\u2019hindouisme', 'Le christianisme', 'L\u2019islam', 'Le bouddhisme'] },
  c4: {
    q: 'Quelle est la langue officielle utilisée dans le gouvernement, les tribunaux et le système éducatif de l\u2019île Maurice\u00a0?',
    options: ['L\u2019anglais', 'Le français', 'Le créole mauricien', 'L\u2019hindi'],
    fact: 'Bien que l\u2019anglais soit la langue officielle, le français domine la presse écrite et les journaux.',
  },
  c5: { q: 'Outre l\u2019anglais, quelle langue européenne est extrêmement répandue et domine les journaux et la télévision mauriciens\u00a0?', options: ['Le français', 'L\u2019allemand', 'Le portugais', 'L\u2019italien'] },
  c6: { q: 'Quel est le nom de la langue créole largement parlée que la plupart des Mauriciens utilisent au quotidien\u00a0?', options: ['Le créole mauricien (morisien)', 'Le créole seychellois', 'Le créole réunionnais', 'Le créole haïtien'] },
  c7: {
    q: 'Quelle grande fête hindoue, impliquant un pèlerinage à Grand Bassin, est largement célébrée à l\u2019île Maurice\u00a0?',
    options: ['Maha Shivaratri', 'Divali', 'Holi', 'Navratri'],
    fact: 'Des centaines de milliers de personnes marchent jusqu\u2019à Grand Bassin, beaucoup portant des kanwars décorés, lors de cette fête.',
  },
  c8: { q: 'Quelle fête chinoise est célébrée dans le quartier chinois de Port-Louis avec des danses du lion et des pétards\u00a0?', options: ['Le Nouvel An chinois (Fête du printemps)', 'La Fête de la mi-automne', 'La Fête des bateaux-dragons', 'La Fête de Qingming'] },
  c9: { q: 'Quel genre musical, mêlant séga et reggae, fut créé par le musicien mauricien Kaya\u00a0?', options: ['Le seggae', 'Le sega-hop', 'Le zouk-reggae', 'L\u2019afrobeat'] },
  c10: { q: 'Quel est le plus grand groupe ethnique de l\u2019île Maurice, majoritairement descendant des travailleurs engagés indiens du XIXe\u00a0siècle\u00a0?', options: ['Les Indo-Mauriciens', 'Les Sino-Mauriciens', 'Les Franco-Mauriciens', 'Les Créoles'] },
  c11: { q: 'Quel terme désigne les Mauriciens d\u2019ascendance mixte africaine et européenne, formant une communauté importante de l\u2019île\u00a0?', options: ['Les Créoles', 'Les Zaffers', 'Les Sirdars', 'Les Marrons'] },
  c12: { q: 'Quelle date est célébrée comme fête nationale de l\u2019île Maurice, marquant l\u2019indépendance vis-à-vis de la Grande-Bretagne en 1968\u00a0?', options: ['Le 12 mars', 'Le 1er février', 'Le 1er juillet', 'Le 8 août'] },
  c13: {
    q: 'Quelles sont les quatre couleurs du drapeau national mauricien\u00a0?',
    options: ['Rouge, bleu, jaune et vert', 'Rouge, blanc et bleu', 'Vert, or et noir', 'Bleu, blanc et rouge'],
    fact: 'Chaque bande a une signification — de la lutte pour la liberté aux champs de canne à sucre verdoyants de l\u2019île.',
  },
  c14: { q: 'Quel hippodrome historique accueille les événements hippiques les plus importants de l\u2019île Maurice ainsi que de grands rassemblements publics\u00a0?', options: ['Le Champ de Mars', 'Le stade Anjalay', 'Caudan Waterfront', 'Le Jardin de la Compagnie'] },
  c15: { q: 'Le mélange harmonieux des cultures indienne, africaine, chinoise et européenne de l\u2019île Maurice est souvent cité à l\u2019international comme un modèle de quoi\u00a0?', options: ['Coexistence multiculturelle', 'Protectionnisme économique', 'Politique isolationniste', 'Éducation monolingue'] },
  c16: {
    q: 'Quelle citation, souvent attribuée à Mark Twain, décrit l\u2019île Maurice comme le modèle sur lequel le paradis aurait été copié\u00a0?',
    options: [
      '«\u00a0Maurice fut créée en premier, puis le paradis, copié sur Maurice.\u00a0»',
      '«\u00a0Maurice est la huitième merveille du monde.\u00a0»',
      '«\u00a0Le paradis, c\u2019est Maurice avec un peu plus de pluie.\u00a0»',
      '«\u00a0Le paradis a trouvé son modèle à Maurice.\u00a0»',
    ],
    fact: 'Rien ne prouve que Twain ait réellement écrit cette phrase, mais elle reste chère au cœur des Mauriciens.',
  },
  c17: { q: 'Quel vêtement traditionnel est souvent porté par les femmes indo-mauriciennes lors des fêtes religieuses et des mariages\u00a0?', options: ['Le sari', 'Le kimono', 'Le sarong', 'Le dirndl'] },
  c18: { q: 'Comment surnomme-t-on parfois l\u2019île Maurice, en référence à ses nombreuses cultures vivant côte à côte\u00a0?', options: ['«\u00a0La nation arc-en-ciel de l\u2019océan Indien\u00a0»', '«\u00a0L\u2019île sucrière\u00a0»', '«\u00a0La cité du lion\u00a0»', '«\u00a0L\u2019île d\u2019émeraude\u00a0»'] },
  c19: { q: 'Quelles épices, autrefois si précieuses qu\u2019elles ont façonné les routes commerciales coloniales, furent cultivées à l\u2019île Maurice pour briser le monopole des épices des Indes néerlandaises\u00a0?', options: ['Le girofle et la noix de muscade', 'Le safran', 'La cardamome', 'L\u2019écorce de cannelle seule'] },

  // ---------------- FOOD & CUISINE ----------------
  f1: { q: 'Quel plat de rue populaire mauricien est une galette servie avec de la purée de pois, du cari et des achards\u00a0?', options: ['Le dholl puri', 'Le farata', 'Le roti canai', 'Le naan'] },
  f2: { q: 'Quel beignet frit à base de piment et de lentilles est un en-cas de rue très apprécié à l\u2019île Maurice\u00a0?', options: ['Le gâteau piment', 'Le samosa', 'La boulette', 'Le bhaji'] },
  f3: { q: 'Quel ragoût créole à base de tomate, souvent préparé avec du poisson, du poulet ou du poulpe, est un plat mauricien incontournable\u00a0?', options: ['Le rougail', 'Le bouillon', 'Le cari', 'Le vindaye'] },
  f4: { q: 'Quel plat de riz épicé, influencé par la cuisine indienne, est populaire lors des célébrations mauriciennes\u00a0?', options: ['Le briyani', 'Le pilaf', 'La paella', 'Le risotto'] },
  f5: { q: 'Quelle boisson locale rafraîchissante, populaire autour de Port-Louis, est un breuvage épais façon milk-shake à base de gelée d\u2019agar-agar et de graines de basilic\u00a0?', options: ['L\u2019alouda', 'Le lassi', 'Le falooda', 'Le sorbet'] },
  f6: { q: 'Quel plat à base de poulpe, souvent relevé de citron vert et de piment, est une spécialité mauricienne très appréciée\u00a0?', options: ['La salade d\u2019ourite', 'Le cocktail de crevettes', 'Les gâteaux de poisson', 'Les rondelles de calamar'] },
  f7: { q: 'Quel spiritueux tropical, distillé à partir de canne à sucre, est une production réputée de l\u2019île Maurice\u00a0?', options: ['Le rhum', 'Le whisky', 'Le gin', 'La vodka'] },
  f8: { q: 'Quel est le nom de la région de plantation et de la marque le plus associés à l\u2019industrie théière de l\u2019île Maurice\u00a0?', options: ['Bois Chéri', 'Ceylan', 'Darjeeling', 'Assam'] },
  f9: { q: 'Quel plat de nouilles d\u2019influence chinoise est couramment mangé au petit-déjeuner ou au déjeuner à l\u2019île Maurice\u00a0?', options: ['Les mines frites', 'Le pad thaï', 'Le chow mein (à la cantonaise uniquement)', 'Le lo mein'] },
  f10: { q: 'Quel condiment de légumes marinés, souvent servi en accompagnement, reflète l\u2019influence culinaire indienne de l\u2019île Maurice\u00a0?', options: ['Les achards', 'Le chutney', 'Le kimchi', 'La choucroute'] },
  f11: { q: 'Quel condiment relevé, fait de piments broyés et marinés, est un incontournable sur les tables mauriciennes\u00a0?', options: ['La pâte de piment confit', 'Le ketchup', 'La sauce soja', 'Le wasabi'] },
  f12: { q: 'Quel fruit, lorsqu\u2019il est vert et pas encore mûr, est couramment mariné pour préparer un achard mauricien acidulé très apprécié\u00a0?', options: ['La mangue', 'La banane', 'La papaye', 'L\u2019ananas'] },
  f13: { q: 'Étant donné les récifs et lagons qui l\u2019entourent, quel type d\u2019aliment est central dans la cuisine côtière traditionnelle de l\u2019île Maurice\u00a0?', options: ['Le poisson et les fruits de mer', 'Le bœuf', 'L\u2019agneau', 'Le porc'] },
  f14: { q: 'Qu\u2019est-ce que le «\u00a0napolitain\u00a0», une friandise appréciée que l\u2019on trouve dans presque toutes les boulangeries mauriciennes\u00a0?', options: ['Un biscuit sandwich fourré de confiture et glacé de rose', 'Un type de cari épicé', 'Une brochette de fruits de mer grillés', 'Un gâteau imbibé de rhum'] },
  f15: { q: 'Quelle épice parfumée, historiquement liée au commerce colonial de l\u2019île Maurice, y est encore cultivée aujourd\u2019hui\u00a0?', options: ['La vanille', 'Le safran', 'La cardamome', 'L\u2019anis étoilé'] },
  f16: { q: 'Quelle boulette cuite à la vapeur ou frite, d\u2019influence chinoise, est un plat de rue populaire à l\u2019île Maurice\u00a0?', options: ['Les boulettes', 'Les dim sum (cantonais uniquement)', 'Les gyoza', 'Les wontons exclusivement'] },
  f17: { q: 'Qu\u2019est-ce que le «\u00a0farata\u00a0», une galette populaire souvent mangée à l\u2019île Maurice\u00a0?', options: ['Une galette feuilletée semblable au paratha', 'Une sorte de gâteau de riz', 'Un beignet frit', 'Un pain de maïs'] },
  f18: { q: 'Le village et le jardin botanique de Pamplemousses tirent leur nom de quel fruit\u00a0?', options: ['Le pamplemousse', 'L\u2019orange', 'Le litchi', 'L\u2019ananas'] },
  f19: { q: 'Quel est le nom de la marque de bière locale la plus connue de l\u2019île Maurice\u00a0?', options: ['Phoenix', 'Tiger', 'Castle', 'Black Label'] },

  // ---------------- PEOPLE & ACHIEVEMENTS ----------------
  p1: { q: 'Qui fut le premier Premier ministre de l\u2019île Maurice, souvent appelé le «\u00a0père de la nation\u00a0»\u00a0?', options: ['Sir Seewoosagur Ramgoolam', 'Sir Anerood Jugnauth', 'Paul Bérenger', 'Navin Ramgoolam'] },
  p2: { q: 'Quel homme d\u2019État mauricien exerça plusieurs mandats de Premier ministre et mena le pays vers la République en 1992\u00a0?', options: ['Sir Anerood Jugnauth', 'Sir Seewoosagur Ramgoolam', 'Cassam Uteem', 'Paul Bérenger'] },
  p3: { q: 'Qui fut la première femme présidente de l\u2019île Maurice, également scientifique de renommée internationale en biodiversité\u00a0?', options: ['Ameenah Gurib-Fakim', 'Monique Ohsan Bellepeau', 'Sarojini Jeewon', 'Indira Manrakhan'] },
  p4: { q: 'Quel musicien, pionnier du genre seggae et devenu une icône culturelle mauricienne, mourut en garde à vue en 1999, déclenchant des troubles nationaux\u00a0?', options: ['Kaya', 'Ras Natty Baby', 'Grand Ras', 'Cassiya'] },
  p5: { q: 'Quel poète mauricien, dont la maison en bord de mer est aujourd\u2019hui un musée, est célébré comme l\u2019une des figures littéraires fondatrices de l\u2019île\u00a0?', options: ['Robert Edward Hart', 'Malcolm de Chazal', 'Bernardin de Saint-Pierre', 'Loys Masson'] },
  p6: {
    q: 'En 2026, qui occupe le poste de Premier ministre de l\u2019île Maurice\u00a0?',
    options: ['Navin Ramgoolam', 'Pravind Jugnauth', 'Paul Bérenger', 'Xavier-Luc Duval'],
    fact: 'Il est revenu à ce poste en novembre 2024, l\u2019ayant déjà occupé de 1995 à 2000 et de 2005 à 2014.',
  },
  p7: { q: 'En 2026, qui occupe le poste de président de la République de Maurice\u00a0?', options: ['Dharam Gokhool', 'Ameenah Gurib-Fakim', 'Prithvirajsing Roopun', 'Cassam Uteem'] },
  p8: { q: 'Le boxeur Bruno Julie a remporté la toute première médaille olympique de l\u2019île Maurice aux Jeux de Pékin en 2008. Quelle médaille a-t-il gagnée\u00a0?', options: ['Le bronze', 'L\u2019or', 'L\u2019argent', 'Il a atteint la finale mais n\u2019a remporté aucune médaille'] },
  p9: { q: 'Quel romancier mauricien de naissance, acclamé à l\u2019international, a écrit «\u00a0Le Dernier Frère\u00a0»\u00a0?', options: ['Nathacha Appanah', 'Ananda Devi', 'Lindsey Collen', 'Carl de Souza'] },
  p10: { q: 'Quel auteur et poète mauricien de renom, écrivant principalement en français, est connu pour des œuvres comme «\u00a0Ève de ses décombres\u00a0»\u00a0?', options: ['Ananda Devi', 'Nathacha Appanah', 'J.M.G. Le Clézio', 'Malcolm de Chazal'] },
  p11: { q: 'Quel peintre et écrivain surréaliste mauricien est surtout connu pour son livre d\u2019aphorismes «\u00a0Sens-Plastique\u00a0»\u00a0?', options: ['Malcolm de Chazal', 'Robert Edward Hart', 'Loys Masson', 'Édouard Maunick'] },
  p12: { q: 'Qui devint le premier président de la République de Maurice lorsque le pays adopta le statut de république en 1992\u00a0?', options: ['Sir Veerasamy Ringadoo', 'Cassam Uteem', 'Sir Anerood Jugnauth', 'Ameenah Gurib-Fakim'] },
  p13: { q: 'Quel ancien président de l\u2019île Maurice est resté célèbre pour avoir démissionné en 2002, en signe de protestation contre une loi antiterroriste à laquelle il s\u2019opposait\u00a0?', options: ['Cassam Uteem', 'Sir Veerasamy Ringadoo', 'Prithvirajsing Roopun', 'Sir Anerood Jugnauth'] },
  p14: { q: 'Quel nageur mauricien, plusieurs fois médaillé aux Jeux du Commonwealth, porta le drapeau national aux Jeux olympiques de Pékin en 2008\u00a0?', options: ['Stephan Buckland', 'Bruno Julie', 'Karen Foo Kune', 'Eric Milazar'] },
  p15: { q: 'Quel dirigeant politique mauricien flamboyant, surnommé «\u00a0King Creole\u00a0», fut longtemps le champion de la communauté créole\u00a0?', options: ['Sir Gaëtan Duval', 'Paul Bérenger', 'Xavier-Luc Duval', 'Steven Obeegadoo'] },
  p16: { q: 'Quel homme politique mauricien, leader du Mouvement militant mauricien, fut Premier ministre de 2003 à 2005 — le premier à ce poste n\u2019étant pas d\u2019origine indienne\u00a0?', options: ['Paul Bérenger', 'Sir Anerood Jugnauth', 'Navin Ramgoolam', 'Pravind Jugnauth'] },
  p17: { q: 'Quel Premier ministre mauricien, fils de l\u2019ancien Premier ministre Sir Anerood Jugnauth, dirigea le gouvernement de 2017 jusqu\u2019à sa défaite aux élections de novembre 2024\u00a0?', options: ['Pravind Jugnauth', 'Paul Bérenger', 'Navin Ramgoolam', 'Xavier-Luc Duval'] },
  p18: { q: 'Quel lauréat du prix Nobel de littérature (2008), d\u2019origine mauricienne, explore souvent des thèmes insulaires et mauriciens dans ses romans\u00a0?', options: ['J.M.G. Le Clézio', 'Nathacha Appanah', 'Malcolm de Chazal', 'Ananda Devi'] },

  // ---------------- SPORTS & RECREATION ----------------
  s1: { q: 'Quel sport, profondément ancré dans la vie sociale mauricienne, se pratique au Champ de Mars depuis 1812\u00a0?', options: ['Les courses hippiques', 'Le cricket', 'Le rugby', 'Le polo'] },
  s2: { q: 'Quelle distinction l\u2019hippodrome du Champ de Mars détient-il dans l\u2019hémisphère Sud\u00a0?', options: ['C\u2019est l\u2019hippodrome le plus ancien de l\u2019hémisphère Sud', 'C\u2019est le plus grand stade de l\u2019hémisphère Sud', 'Il a accueilli les premiers Jeux olympiques de l\u2019hémisphère Sud', 'C\u2019est le seul hippodrome situé sur un cratère volcanique'] },
  s3: { q: 'Quel sport d\u2019équipe, introduit sous la domination britannique, est aujourd\u2019hui le plus largement pratiqué par les Mauriciens au quotidien\u00a0?', options: ['Le football', 'Le rugby', 'Le cricket', 'Le hockey sur gazon'] },
  s4: { q: 'Quel sport nautique, florissant grâce aux alizés réguliers et aux lagons de l\u2019île Maurice, attire des passionnés du monde entier\u00a0?', options: ['Le kitesurf', 'Le hockey sur glace', 'Le curling', 'Le ski de fond'] },
  s5: { q: 'Quelle péninsule mauricienne, également site classé à l\u2019UNESCO, est mondialement réputée comme une destination de kitesurf de premier plan\u00a0?', options: ['Le Morne', 'L\u2019île aux Cerfs', 'Flic-en-Flac', 'Blue Bay'] },
  s6: { q: 'Quel événement multisports régional, réunissant les nations insulaires de l\u2019océan Indien, l\u2019île Maurice a-t-elle accueilli à plusieurs reprises\u00a0?', options: ['Les Jeux des îles de l\u2019océan Indien', 'Les Jeux du Commonwealth', 'Les Jeux panafricains', 'Les Jeux de la Francophonie'] },
  s7: { q: 'Dans quel sport Bruno Julie concourait-il lorsqu\u2019il remporta la première médaille olympique de l\u2019île Maurice\u00a0?', options: ['La boxe', 'La lutte', 'Le judo', 'Le taekwondo'] },
  s8: { q: 'Quel sport de haute mer, populaire au large de la côte ouest de l\u2019île Maurice près de Black River, cible de grands poissons de compétition\u00a0?', options: ['La pêche au gros', 'La pêche sur glace', 'Les compétitions de pêche sous-marine', 'La pêche à la mouche en eau douce'] },
  s9: { q: 'Pour quel grand poisson de compétition la pêche au gros de l\u2019île Maurice est-elle particulièrement réputée\u00a0?', options: ['Le marlin bleu', 'Le thon rouge', 'Le grand requin blanc', 'L\u2019espadon'] },
  s10: { q: 'Quelle activité populaire permet aux visiteurs d\u2019explorer les coraux et la vie marine du parc marin de Blue Bay\u00a0?', options: ['Le snorkeling', 'Le patinage sur glace', 'Le parapente', 'L\u2019escalade'] },
  s11: { q: 'Outre la boxe, dans quel autre sport l\u2019île Maurice a-t-elle également concouru aux Jeux olympiques de Pékin en 2008\u00a0?', options: ['Le tir à l\u2019arc', 'L\u2019escrime', 'L\u2019aviron', 'La gymnastique'] },
  s12: { q: 'Étant donné ses récifs coralliens et ses épaves environnants, quelle activité sous-marine est populaire auprès des visiteurs de l\u2019île Maurice\u00a0?', options: ['La plongée sous-marine', 'Le bobsleigh', 'La plongée sous glace', 'La spéléologie'] },
  s13: { q: 'Quel est le nom de l\u2019un des principaux stades de football et d\u2019athlétisme de l\u2019île Maurice, situé dans la région de Rose-Hill\u00a0?', options: ['Le stade Sir-Gaëtan-Duval', 'Le stade de Wembley', 'Ellis Park', 'Soccer City'] },
  s14: { q: 'Quel jeu de société à base de dominos est un passe-temps très apprécié dans les communautés mauriciennes\u00a0?', options: ['Le jeu de dominos', 'Les échecs', 'Le backgammon', 'Le mah-jong'] },
  s15: { q: 'Quel sport d\u2019équipe se pratique couramment de façon informelle sur les plages de l\u2019île Maurice, en plus de la baignade\u00a0?', options: ['Le volley-ball', 'Le hockey sur glace', 'Le football américain', 'Le handball'] },
  s16: { q: 'Dans quel sport le porte-drapeau Stephan Buckland concourait-il, remportant plusieurs médailles aux Jeux du Commonwealth pour l\u2019île Maurice\u00a0?', options: ['La natation', 'La boxe', 'Le tir à l\u2019arc', 'La voile'] },

  // ---------------- FUN FACTS & MISCELLANEOUS ----------------
  x1: { q: 'En raison de son extinction, le dodo a inspiré quelle expression anglaise bien connue pour désigner quelque chose d\u2019obsolète ou disparu à jamais\u00a0?', options: ['«\u00a0Dead as a dodo\u00a0» (mort comme un dodo)', '«\u00a0Flown the coop\u00a0» (s\u2019être envolé du poulailler)', '«\u00a0Gone to the dogs\u00a0» (être fichu)', '«\u00a0Out like a light\u00a0» (éteint comme une lumière)'] },
  x2: { q: 'Quel est le code à trois lettres de la roupie mauricienne\u00a0?', options: ['MUR', 'MAU', 'MRU', 'RUP'] },
  x3: { q: 'Environ combien d\u2019habitants compte l\u2019île Maurice\u00a0?', options: ['Environ 1,3 million', 'Environ 130\u00a0000', 'Environ 13 millions', 'Environ 300\u00a0000'] },
  x4: { q: 'Quel est l\u2019indicatif téléphonique international de l\u2019île Maurice\u00a0?', options: ['+230', '+27', '+231', '+233'] },
  x5: { q: 'Comment décrit-on le mieux le paysage linguistique de l\u2019île Maurice, l\u2019anglais étant officiel tandis que le français et le créole dominent la vie quotidienne\u00a0?', options: ['Plurilingue', 'Strictement monolingue', 'Officiellement bilingue uniquement', 'Basé sur la langue des signes'] },
  x6: { q: 'Les Mauriciens conduisant à gauche, de quel côté se trouve généralement le volant dans les voitures mauriciennes\u00a0?', options: ['Du côté droit', 'Du côté gauche', 'Au centre', 'Cela varie également'] },
  x7: { q: 'Quel risque naturel menace le plus l\u2019île Maurice durant ses mois «\u00a0d\u2019été\u00a0», de novembre à avril\u00a0?', options: ['Les cyclones tropicaux', 'Les tremblements de terre', 'Les feux de forêt', 'Les blizzards'] },
  x8: { q: 'Quel célèbre auteur américain est réputé (peut-être à tort) avoir dit que l\u2019île Maurice était le modèle dont le paradis se serait inspiré\u00a0?', options: ['Mark Twain', 'Ernest Hemingway', 'Herman Melville', 'Charles Dickens'] },
  x9: { q: 'Bien qu\u2019étant une nation insulaire, l\u2019île Maurice est membre de quelle organisation continentale\u00a0?', options: ['L\u2019Union africaine', 'L\u2019Union européenne', 'L\u2019ASEAN', 'La Ligue arabe'] },
  x10: { q: 'Étant donné sa petite superficie et sa population importante, l\u2019île Maurice compte parmi les nations les plus quoi d\u2019Afrique\u00a0?', options: ['Densément peuplées', 'Peu peuplées', 'Enclavées', 'Inhabitées'] },
  x11: { q: 'Aux côtés du sucre et du tourisme, quel secteur en croissance a porté une bonne partie de l\u2019économie mauricienne depuis les années 1990\u00a0?', options: ['Les services financiers et offshore', 'L\u2019extraction de charbon', 'La fabrication automobile', 'Le forage pétrolier'] },
  x12: { q: 'L\u2019île Maurice est fréquemment citée à l\u2019international comme un modèle de quoi parmi les nations africaines\u00a0?', options: ['Une démocratie stable et une réussite économique', 'Une économie de la rente', 'Un État à parti unique', 'Un régime militaire'] },
  x13: { q: 'Quel est le nom du principal aéroport international de l\u2019île Maurice\u00a0?', options: ['L\u2019aéroport international Sir-Seewoosagur-Ramgoolam', 'L\u2019aéroport international de Port-Louis', 'L\u2019aéroport de Plaisance Gateway', 'L\u2019aéroport international de Grand-Baie'] },
  x14: { q: 'Comment surnomme-t-on parfois familièrement l\u2019île Maurice, en référence à ses plages et lagons idylliques\u00a0?', options: ['«\u00a0L\u2019île paradisiaque\u00a0»', '«\u00a0L\u2019île de fer\u00a0»', '«\u00a0Le rocher gris\u00a0»', '«\u00a0L\u2019île de givre\u00a0»'] },
  x15: { q: 'L\u2019île Maurice tire son nom du prince Maurice, issu de quelle maison royale européenne\u00a0?', options: ['La maison d\u2019Orange-Nassau', 'La maison de Habsbourg', 'La maison de Bourbon', 'La maison de Windsor'] },
  x16: { q: 'L\u2019île éloignée d\u2019Agalega est historiquement connue pour produire quelle denrée, en plus des noix de coco\u00a0?', options: ['Le coprah (huile de coco séchée)', 'Le coton', 'Le caoutchouc', 'Le sucre de palme'] },
  x17: { q: 'Le climat tropical de l\u2019île Maurice se divise généralement en quelles deux saisons\u00a0?', options: ['Une saison chaude et humide, propice aux cyclones, et une saison plus fraîche et sèche', 'Une saison de mousson et une saison sèche désertique', 'Quatre saisons distinctes comme sous les climats tempérés', 'Une saison des pluies et une saison des neiges'] },
  x18: { q: 'En dehors des chauves-souris, l\u2019isolement océanique de l\u2019île Maurice signifie qu\u2019elle n\u2019a jamais développé de population native de quoi\u00a0?', options: ['Grands mammifères terrestres', 'Oiseaux chanteurs', 'Insectes', 'Plantes à fleurs'] },
}

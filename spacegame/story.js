// Story building Framework (swap out words and construct sentences)
// 'keyword': ["value1", "value2", "#keyword3#", "value4 #keyword2# value4end"]
//
// Example call: parse("A man #{subj1: 'masc', subj2: 'fem'}stateVP#. #nomPro.subj1.caps# hates #garbage.s# and talking to #genPro.subj1# friend / #accPro.subj2#.")
//					->  "A man sits in a clean corner. He hates discarded clothing and talking to his friend / her."
//
// Prefix £ (alt-156) to mass noun phrases; it sets {a: 'some', s: $itself} (i.e. "£fast food")
// Prefix Ø (alt-157) to words beginning with vowels pronounced as consonants (i.e. "Øuniversity")
// Prefix ø (alt-155) to words beginning with consonants pronounced as vowels (i.e. "øhonour")
// Postfix × (alt-158) to verbs that double their consonant before a vowel ending (i.e. "sit×")
// Postfix ^ to words that variants should be applied to if they are not final (i.e. "play^ a game")
// Add ¶ (alt-244) to add an HTML paragraph break (<br><br>)

const storyFramework = {
	// Grammatical
	nomPro: ["it{fem: 'she', masc: 'he'}"],
	accPro: ["it{fem: 'her', masc: 'him'}"],
	genPro: ["its{fem: 'her', masc: 'his'}"],
	genProInd: ["its{fem: 'hers', masc: 'his'"],
	
	// General
	color: ["black<shade><name>", "onyx|ebon=poetic<rare><shade>", "blue<eyes><name><cool>", "brown|chestnut<eyes>", "green<eyes><name><cool>", "emerald<rare>", "gold<name>", "grey|silver<shade><name><eyes>", "orange|bronze<warm>", "pink<warm>", "purple|violet<warm>", "red<name>", "crimson|blood=poetic<rare><warm>", "white<name><shade>", "yellow|golden<warm>"],
	number: ["two|a couple", "three|a few", "four|some", "five|many", "six|half a dozen", "at least five|quite a few"],
	single: ["one", "a lone", "a lonely|a solitary|the sole=poetic"],
	
	// Synonyms - adjectives & adverbs
	careful: ["careful", "conspicuous", "fastidious", "attentive", "judicious", "precise"],
	shabby: ["broken-down", "dilapidated", "ramshackle", "rickity", "seedy", "shabby", "shady"],
	very: ["very<inf>", "very", "extremely", "exceedingly", "excessively", "awfully", "quite", "acutely|terribly|overly<rare>"],
	// Synonyms - expressions
	exasperated: ["Are you for real?", "I'm speechless!", "I never thought I'd see the day!", "Seriously?!", "#This is u|U#nbelievable!", "You've got to be kidding me!"],
	// Synonyms - nouns
	embassy: ["consulate", "delegation", "embassy", "mission"],
	ship: ["ship", "£spacecraft", "vessel"],
	// Synonyms - slang nouns
	clunker: ["barge", "bucket^ of bolts", "clunker", "crate", "hunk^ of junk", "junker", "rattletrap", "rustbucket", "tin can"],
	// Synonyms - verbs
	rot: ["rot×", "decompose", "decay"],
	locate: ["locate", "find{ed: 'found'}", "situate", "position"],
	wear: ["wear{ed: 'wore'}", "sport", "dress in{ed: 'was dressed in', ing: 'dressed in'}", "in{ed: 'in', ing: 'in'}", "with{ed: 'with', ing: 'with'}"],
	
	// Verb Categories
	activityV: ["laugh", "talk", "nap×", "chat×", "debate|deliberate", "discuss^ #topicN#", "bargain", "sit×{ed: 'sat'}", "play^ a game", "enjoy^ a break", "smoke"],
	
	// Adjective Categories
	bookAdj: ["well read", "simple", "beautiful", "tattered", "informative", "#sizeAdj#", "#conditionAdj#"],
	businessAdj: ["busy", "popular", "dull", "#shabby#", "closed", "boarded-up"],
	clothingAdj: ["conservative", "formal|informal|casual", "long", "luxurious|fancy", "modern", "ratty|shabby", "revealing", "short", "synthetic", "traditional", "#fabricN#", "#conditionAdj#", "#valueAdj#", "#sizeAdj#"],
	conditionAdj: ["new|brand new", "old|antiquated", "clean|recently cleaned", "dusty|dust-covered<immobile>"],
	constructAdj: ["unfinished", "concrete", "metallic", "monumental", "ancient", "grand", "celebrated", "superb"],
	eventAdj: ["#sizeAdj#", "lively", "well-attended|poorly-attended", "small|tiny", "pop up", "regular", "semi-legal|illegal", "local"],
	foodAdj: ["beef", "chicken", "fresh", "greasy", "lamb", "mushroom", "salmon", "spicy", "take out", "vegetarian", "#valueAdj#"],
	hairAdj: ["long", "short", "curly", "straight", "big|large", "luxurious", "ratty", "dirty", "slicked", "#careful.ly# styled"],
	indoorLocAdj: ["clean", "dusty", "unused", "dark", "well-lit", "inaccessible", "unobtrusive<rare>"],
	lightAdj: ["bright", "dull", "vivid", "light", "dark", "deep"],
	mechanicalAdj: ["#color#", "#conditionAdj#", "#conditionAdj#", "rusted|rusty", "sleek|shiny", "broken|malfunctioning"],
	outdoorLocAdj: ["busy|bustling", "quiet|silent", "empty|deserted", "rundown", "neon-lit", "crowded", "unused", "dark|shadowed"],
	personAdj: ["bright-eyed", "determined", "drug-addled<seedy>", "energetic", "enterprising", "exhausted", "nervous", "tired", "well-dressed"],
	plantAdj: ["#color#", "dusty", "lush", "overgrown", "#careful.ly# pruned", "dried up|shriveled", "artificial"],
	rarityAdj: ["#very|# rare", "common", "uncommon", "obscure<rare>"],
	sizeAdj: ["small", "moderate-sized|average<mid>", "large", "tiny<rare>", "big<rare>"],
	styleAdj: ["modern", "minimalist", "industrial", "contemporary", "functional", "traditional", "classical", "rustic"],
	valueAdj: ["cheap", "reasonable", "budget", "expensive", "pricey", "costly", "valuable"],
	
	// Post Categories (Adjectival VP or PP)
	bookPost: ["from years past", "covered in #scribbles|notes#", "about #topicN# #bookPost[!same]|#<same><inf>", "illustrated with #holograms|bright colours#", "with a #digital|flashy# image"],
	clothingPost: ["made for #work|a special occasion#", "with #color.a|sizeAdj.a# #pin|medal#", "lined with #fabricN#", "stained with #sweat|blood|grease#", "belted #tightly|loosely|with a ribbon#", "with #number# buttons", "that #blends in with|sticks out from# the surroundings", "with a #traditional|trendy|# #bead|knotted|gold|# necklace"],
	personPost: ["reading #bookNP.a#", "staring at #bookNP.a|a news screen|a comm unit|objectN.a#", "#telling stories to|sharing opinions with|complaining to# #all who'll listen|another person|a reluctant listener#", "#muttering|laughing|talking# to #accPro.subj#self", "trying not to fall asleep", "#activityV.ing# with #{obj: rnd(Gender)}personN.obj.a#", "#activityV.ing# on #genPro.subj# comm", "that #seems|appears|looks# to be the #corporate|military|government|academic|family# type", "coming down from a high<seedy>"],
	personDescPost: ["with #hairAdj|# #color# hair|with #no|hairAdj|color# hair", "wearing #clothingNP.a#", "with #mechanicalAdj[!immobile].a|a# cybernetic #arm|leg|eye|hand#", "{fem: 'with #careful.ly# manicured #nails|nails|brows#', masc: 'with #careful.ly.a# groomed #beard|mustache#'}"],
	
	// Noun Categories
	artN: ["#African|Aboriginal# mask", "calligraphy scroll", "Floating World print", "origami #crane|butterfly#", "Chinese watercolour", "religious statue", "black & white photograph", "#etched|blown# glass", "ship model", "abstract sculpture", "woven tapestry", "wooden icon", "hologram"],
	bookN: ["book", "magazine", "pamphlet|leaflet", "tabloid|tract", "comic book", "bulletin"],
	clothingN: ["#lab|# coat", "#hat#", "jacket", "jumpsuit", "robe", "sarong{fem: 'dress'}", "shirt", "suit", "wrap"],
	fabricN: ["cotton", "fur|velvet", "silk", "#world[agricultural]# wool<unique>"],
	foodN: ["burger", "curry", "falafal", "£fried rice", "£fries", "£hot pot", "kebab", "£noodles", "pasta", "£pho", "pizza", "sandwich", "soup", "£sushi", "taco"],
	garbageN: ["£discarded clothing", "empty bottle", "pile of #rot.ing# papers{s: 'piles of #rot.ing# paper'}", "Øused syringe", "£#rot.ing# food"],
	hatN: ["bandana|kerchief", "hat", "head scarf", "hood", "turban", "veil", "tricorne hat|animal skin|sombrero|fez|fedora|straw hat<rare>"],
	houseN: ["apartment", "condo", "flat", "home", "house", "mansion<large><rich>", "pad", "penthouse<rich>"],
	objectN: ["#objectN# and #objectN[!same].a#<same>", "#bookNP#", "#styleAdj|# #artN#", "net interface", "vending machine", "#garbageN#<cheap>", "#plantAdj|# #plantN#", "#mechanicalAdj|# drone", "#mechanicalAdj|# security camera"],
	personN: ["#occupationN#<occupation>", "person{fem: 'woman', masc: 'man', s: 'people'}", "youth{s: 'young people'}", "#groupN[!child,!outdoor]#"],
	personGeneralN: ["individual{fem: 'girl', masc: 'dude'}", "person{fem: 'lady', masc: 'fellow', s: 'folks'}", "one{fem: 'gal', masc: 'guy', s: 'guys'}"],
	pictureN: ["#sizeAdj|color|# cat", "woman #locV.ing# #locP# #indoorLocN.a#", "local band|local sports team", "£abstract #thingN.s#", "battle on #world#", "#plantAdj# forest"],
	plantN: ["bamboo", "cactus{s: 'cacti'}", "bonzai", "fern", "ivy", "laurel", "leafy plant<general>", "snake plant<general>", "spider plant<general>", "palm", "plant<inf><general>", "bush<general>", "orchid", "lily", "geranium", "jasmine", "maple", "begonia", "hibiscus", "anthurium", "yucca"],
	predatorN: ["anaconda", "barracuda", "cobra", "cougar", "coyote", "crocodile", "devil", "dragon", "eagle", "falcon", "fox", "grizzly", "hammerhead", "hawk", "hyena", "jaguar", "leopard", "lion", "mamba", "moray", "owl", "orca", "piranha", "python", "raptor", "scorpion", "shark", "snake", "spider", "stingray", "tiger", "viper", "wasp", "wolf", "wolverine"],
	productN: ["soft drink|soda", "liquor", "legal service", "travel service", "£fast food", "painkiller|antidepressant", "#vehicleN#", "video game", "exotic dancer<seedy>", "hand gun", "cybernetic enhancement", "couch", "apartment"],
	shipN: ["cruiser", "freighter", "hauler", "transport"],
	smellN: [""],
	soundN: ["the din of #traffic|shopping|a spaceport#", "whirring #of machines|of motors|of drones|#", "sirens #in the distance|not far off#", "engines of ships landing", "£#bland|elevator|dull# music", "£#hushed|excited|intermingling# conversations"],
	spaceN: ["£antimatter", "asteroid", "azimuth", "corona", "comet", "constellation", "£cosmos", "eclipse", "equinox", "flux", "galaxy", "gravity", "lodestar", "meteor", "moon", "nebula", "penumbra", "perigee", "pulsar", "quasar", "satellite", "singularity", "spectrum{s: 'spectra'}", "supernova", "syzygy", "velocity", "zenith", "zodiac"],
	thingN: ["flower", "planet", "spaceship", "house", "person{s: 'people'}", "£fruit", "ocean"],
	topicN: ["#corporate|personal# finance", "#spaceship|terrestrial|# engineering", "#home|interior|urban|net# design", "#thingN.s#", "#productN[!seedy].s#", "#plantN.s#", "art", "religion", "politics", "the news", "fashion", "celebrities|#celebrityOccupation.s#"],
	vehicleN: ["#sports|family||# car<inf>", "motorbike<inf>", "truck<inf>"],

	// Humans
	actors: ["Barrett", "Boxleitner", "Burton", "Crosby", "Daniels", "Doohan", "Dorn", "Fisher", "Ford", "Frakes", "Hamill", "Kelley", "Koenig", "Mayhew", "McFadden", "Mulgrew", "Nichols", "Nimoy", "Olmos", "Shatner", "Sirtis", "Spiner", "Stewart", "Takei", "Weaver", "Wheaton"],
	actorRoles: ["Adama", "Baltar", "Chekov", "Crusher", "Janeway", "Kirk", "La Forge", "McCoy", "Organa", "Picard", "Riker", "Ripley", "Scott", "Sheridan", "Skywalker", "Sisko", "Solo", "Soong", "Spock", "Sulu", "Troi", "Uhura", "Worf", "Yar"],
	astronomers: ["Alsufi", "Aristarchus", "Bell", "Brahe", "Cannon", "Cassini", "Chandrasekhar", "Copernicus", "Drake", "Eddington", "Einstein", "Eratosthenes", "Galileo", "Galle", "Gamow", "Halley", "Hartmann", "Hawking", "Herschel", "Hipparchus", "Hoyle", "Hubble", "Huygens", "Jansky", "Kepler", "Kuiper", "Lagrange", "Laplace", "Leavitt", "Messier", "Newton", "Nye", "Oort", "Penrose", "Ptolemy", "Sagan", "Shapley", "Slipher", "Tombaugh", "Tyson", "Van Allen", "Zwicky"],
	authors: ["Adams", "Asimov", "Bradbury", "Burroughs", "Butler", "Card", "Clarke", "Deckard", "Ellison", "Gibson", "Heinlein", "Herbert", "Huxley", "Le Guin", "Lem", "Lucas", "Niven", "Orwell", "Roddenberry", "Stephenson", "Verne", "Wells"],
	celebrity: ["#{data_celeb: rnd(PersonName)}.data_celeb#, #the famous|a local# #celebrityOccupation#"],
	celebrityOccupation: ["rockstar", "actor", "politician", "netstar", "racer", "socialite", "athlete", "comedian", "game designer", "captain", "general", "dancer", "courtesan"],	
	explorers: ["Burton", "Cabot", "Columbus", "Cook", "Cousteau", "Da Gama", "Dicuil", "Eudoxus", "Evliya", "Fiennes", "Gagarin", "Hannu", "Hasekura", "Herodotus", "Heyerdahl", "Hillary", "Ibn Battuta", "Magellan", "Polo", "Posidonius", "Stafford", "Strabo", "Vespucci", "Wanderwell", "Zhang Qian", "Zheng He"],
	gods: ["#godsAztec#", "#godsChina#", "#godsEgypt#", "#godsGreek#", "#godsIndia#", "#godsNorse#", "#godsYoruba#"],
	godsAztec: ["Centeotl<masc>", "Chalchiuhtlicue<fem>", "Ehecatl<masc>", "Huitzilopochtli<masc>", "Metzli<fem>", "Mixcoatl<masc>", "Quetzalcoatl<masc>", "Tezcatlipoca<masc>", "Tlaloc<masc>", "Tonatiuh<masc>", "Xipe Totec<masc>", "Xiuhtecuhtli<masc>", "Xochipilli<masc>", "Xolotl<masc>"],
	godsChina: ["Caishen<masc>", "Chang'e<fem>", "Fuxi<masc>", "Guandi<masc>", "Guanyin<fem>", "Huangdi<masc>", "Longwang<masc>", "Mazu<fem>", "Nüwa<fem>", "Pangu<masc>", "Shangdi<masc>", "Shennong<masc>", "Xiwangmu<fem>", "Yama<masc>", "Zaojun<masc>", "Zhuyin<masc>"],
	godsEgypt: ["Amun<masc>", "Anubis<masc>", "Hathor<fem>", "Horus<masc>", "Isis<fem>", "Maat<fem>", "Osiris<masc>", "Ptah<masc>", "Ra|Re<masc>", "Sekhmet<fem>", "Set<masc>", "Sobek<masc>", "Thoth<masc>"],
	godsGreek: ["Aphrodite<fem>", "Apollo<masc>", "Ares<masc>", "Artemis<fem>", "Athena<fem>", "Demeter<fem>", "Dionysus<masc>", "Eros<masc>", "Hades<masc>", "Hephaestus<masc>", "Hera<fem>", "Hermes<masc>", "Hestia<fem>", "Persephone<fem>", "Poseidon<masc>", "Zeus<masc>"],
	godsIndia: ["Brahma<masc>", "Durga<fem>", "Ganesha<masc>", "Hanuman<masc>", "Kali<fem>", "Kartikeya<masc>", "Krishna<masc>", "Indra<masc>", "Lakshmi<fem>", "Parvati<fem>", "Rama<masc>", "Saraswati<fem>", "Shiva<masc>", "Vishnu<masc>"],
	godsNorse: ["Baldr<masc>", "Bragi<masc>", "Forseti<masc>", "Freyja<fem>", "Freyr<masc>", "Frigg<fem>", "Gefjon<fem>", "Hothr<masc>", "Ithunn<fem>", "Loki<masc>", "Nanna<fem>", "Odin<masc>", "Sigyn<fem>", "Skathi<fem>", "Thor<masc>", "Tyr<masc>"],
	godsYoruba: ["Aganju<masc>", "Babalu-Aye<masc>", "Eshu<masc>", "Oba<fem>", "Obatala<masc>", "Ogun<masc>", "Olokun<fem>", "Olorun<masc>", "Orunmila<masc>", "Oshun<fem>", "Oya<fem>", "Shango<masc>", "Yemoja<fem>"],
	groupN: ["woman{s: 'women'}", "man{s: 'men'}", "tourist", "student", "professional", "child{s: 'children'}<child>", "clubber", "smoker", "construction worker", "transit user<outdoor>"],
	nameFirst: ["#nameFirstFemale|nameFirstFemale|nameFirstFemale|nameFirstFemale|nameFirstFemale|nameFirstUnisex#<fem><inf>", "#nameFirstMale|nameFirstMale|nameFirstMale|nameFirstMale|nameFirstMale|nameFirstUnisex#<masc><inf>"],
	nameFirstFemale: ["Aaliyah", "Adele", "Aditi", "Alejandra", "Alicia", "Alyson", "Amaia", "Amanda", "Amelia", "Anastasia", "Anjali", "Anya", "Annelene", "Aoi", "Asha", "Astra", "Aurora", "Bahati", "Bre", "Bronwyn", "Candice", "Catrina", "Charity", "Chloe", "Christine", "Corrie", "Daliah", "Darya", "Dawn", "Deanne", "Debbie", "Diana", "Diya", "Donna", "Elidia", "Elizabeth", "Emily", "Erin", "Esther", "Fatima", "Feechi", "Fiona", "Gabriela", "Hanna", "Hayoon", "Hina", "Holly", "Ichun", "Imani", "Isabella", "Isabis", "Jacqueline", "Jennifer", "Jessica", "Jia", "Ji-woo", "Joanna", "Juliet", "Kalifa", "Kamila", "Karolina", "Karen", "Katie", "Kuanyin", "Laura", "Lihua", "Lijing", "Liliana", "Lina", "Maha", "Maria", "Mei", "Melanie", "Mikaela", "Min-seo", "Miryam", "Nadia", "Nancy", "Natalia", "Nisha", "Olivia", "Oona", "Ping", "Rachel", "Rebecca", "Regina", "Riko", "Rosie", "Saanvi", "Sakura", "Sarah", "Seo-yun", "Shira", "Shreya", "Shufen", "Sofia", "Stephanie", "Sunita", "Talia", "Tamara", "Thea", "Tina", "Uma", "Valentina", "Valerie", "Victoria", "Wangfang", "Ximena", "Yating", "Yuna", "Zahra", "Zhangli", "Zoya", "Zuzanna"],
	nameFirstMale: ["Aaron", "Absolom", "Adam", "Alan", "Alden", "Aleksander", "Amare", "Antoni", "Arjun", "Artem", "Aryan", "Azibo", "Bandile", "Brad", "Chad", "Chiamaka", "Chris", "Clayton", "Daniel", "David", "Diego", "Do-yoon", "Dylan", "Earl", "Ekon", "Elias", "Emil", "Enrique", "Ethan", "Fabian", "Felix", "Finn", "Fletcher", "Gun-ho", "Haji", "Hasani", "Ian", "Ishaan", "Issa", "Itsuki", "Ivan", "Jack", "Jafari", "Jakob", "James", "Jason", "Jeff", "Jiahao", "Jianhong", "Jihu", "Joe", "Jose", "Joshua", "Junjie", "Justin", "Joo-won", "Kanata", "Kasper", "Kellan", "Kendi", "Khalid", "Kirabo", "Kirill", "Kwame", "Leo", "Liqiang", "Logan", "Lucas", "Luis", "Marcel", "Meherzad", "Mateo", "Mathias", "Maxim", "Mikhail", "Minato", "Min-jun", "Mohammed", "Moshe", "Moss", "Nathan", "Noah", "Oliver", "Omari", "Peter", "Philippe", "Richard", "Rohan", "Russ", "Ryan", "Sabra", "Salim", "Santiago", "Sebastian", "Seo-jun", "Sergei", "Shaka", "Sho", "Smiler", "Stanislav", "Steven", "Szymon", "Taemin", "Tomoharu", "Trevor", "Victor", "Walter", "Wanglei", "Weilong", "Wenxiong", "William", "Xuguan", "Yongjin", "Zane", "Zhangwei", "Zhiming", "Zhipeng"],
	nameFirstUnisex: ["Adrian", "Ami", "Andy", "Angel", "Ari", "Arwyn", "Bo", "Eros", "Jan", "Jayden", "Jesse", "Horia", "Kim", "Lindsey", "Lior", "Nikola", "Noam", "Noor", "Ren", "Sam", "Skylar", "Sukhpal", "Taylor", "Tracey", "Urian", "Zephyr"],
	nameLast: ["Achebe", "Adebayo", "Afolabi", "Ahmed", "Akintola", "Ali", "Anderson", "Aquino", "Azikiwe", "Bai", "Balogun", "Bauer", "Bautista", "Beridze", "Bernard", "Bouchard", "Boyko", "Brown", "Buhari", "Cai", "Calderon", "Campbell", "Chatterjee", "Chen", "Choi", "Chowdhury", "Chukwu", "Clark", "Cohen", "Danjuma", "Das", "Davis", "dela Cruz", "Demir", "De Vries", "Diaz", "Dimitrov{fem: 'Dimitrova'}", "Dubois", "Esposito", "Evans", "Ferrari", "Fischer", "Gagnon", "Gao", "Garcia", "Gazi", "Gill", "Gonzalez", "Gruber", "Hansen", "Harris", "Hernandez", "Horvat", "Hossain", "Hoxha", "Huang", "Ivanov{fem: 'Ivanova'}", "Jackson", "Jeong", "Johansson", "Johnson", "Jones", "Kaczmarek", "Kang", "Kaya", "Kelly", "Khan", "Kim", "Korhonen", "Kowalski{fem: 'Kowalska'}", "Kumar", "Kwon", "Lal", "Lam", "Laurent", "Lee", "Levi", "Lin", "Liu", "Lopez", "Ma", "MacDonald", "Mammadov{fem: 'Mammadova'}", "Mandal", "Martin", "Martinez", "Mazur", "Melnyk", "Meyer", "Miller", "Mirza", "Mitra", "Mizrahi", "Monge", "Moore", "Mora", "Morales", "Moreau", "Morgan", "Murphy", "Murray", "Nagy", "Nielsen", "Novak", "Nguyen", "Obasanjo", "Oh", "Okafor", "Olsen", "Oyenusi", "Papadopoulos", "Park", "Patel", "Perez", "Petrov{fem: 'Petrova'}", "Radu", "Ram", "Ray", "Robinson", "Rodriguez", "Rossi", "Roy", "Sadza", "Santos", "Sato", "Schneider", "Seo", "Sharma", "Silva", "Singh", "Smirnov{fem: 'Smirnova'}", "Smith", "Sokolov{fem: 'Sokolova'}", "Solarin", "Song", "Sousa", "Stewart", "Sullivan", "Suzuki", "Takahashi", "Taiwo", "Tamm", "Tan", "Tanaka", "Thakur", "Thomas", "Thompson", "Tran", "Traore", "Tremblay", "Van Dyk", "Villaneuva", "Vlahos", "Wagner", "Walker", "Wang", "Watanabe", "White", "Williams", "Wilson", "Wojcik", "Wright", "Wu", "Yadav", "Yang", "Yee", "Yilmaz", "Yoon", "Zhang", "Zhao", "Zhou"],
	occupationN: ["captain", "dancer", "doctor", "engineer", "instructor", "lawyer", "merchant|trader", "politician", "preacher|priest", "prostitute|escort", "salesperson{s: 'salespeople'}", "security officer", "smuggler<illegal>", "vagrant<cheap>"],
	poorGroupN: ["£homeless", "refugee", "drug-addict", "prostitute", "drug dealer", "gang", "feral pet<animal>"],
	professionN: ["Accountant", "Analyst", "Designer", "Developer", "Director", "Engineer", "Instructor", "Lawyer", "Manager", "Offworld Liaison", "Representative", "Security Officer", "Supervisor"],
	scifiPeople: ["#actors#", "#actorRoles#", "#astronomers#", "#authors#", "#explorers#"],
	
	// Organizations
	corpDesc: ["advanced", "amalgamated", "consolidated", "diversified", "global", "integrated", "interstellar", "multinational", "progressive", "specialized"],
	corpNamePre: ["aero", "afro", "agri", "alpha", "amerI", "apex", "arabI", "arma", "astro", "beta", "bio", "cryo", "crypto", "cyber", "data", "digi", "electro", "enviro", "equi", "euro", "futurE", "galacti", "gamma", "genE", "hydro", "indo", "infini", "info", "intelli", "inter", "mecha", "medi", "mega", "lunar", "meso", "neo", "neuro", "nova", "octo", "omega", "orbito", "planet", "posi", "prima", "proto", "psi", "quantum", "radial", "sino", "sky", "socio", "solA", "space", "star", "sub", "super", "symbio", "tele", "terra", "titan", "verI", "x-"],
	corpNamePost: ["access", "active", "atomica", "base", "biz", "brand", "byte", "capital", "chem", "co", "corps", "craft", "credit", "dev", "dock", "droid", "dynamics", "dyne", "fact", "form", "fusion", "goods", "guard", "innovations", "labs", "life", "link", "lock", "logic", "lux", "matics", "matrix", "mind", "motion", "nautica", "net", "optics", "pharm", "port", "power", "search", "sense", "soft", "store", "storm", "sys", "tech", "tronic", "trust", "vision", "ware", "works"],
	corpType: ["aerospace", "bank", "Bio-Engineering", "conglomerate", "contracting", "defense", "electronics", "engineering", "enterprises", "farms", "financial", "group", "health", "Heavy Industries", "holdings", "investments", "manufacturing", "media", "mining", "pharmaceuticals", "research", "security", "services", "shipping", "systems", "technology", "zaibatsu"],
	vehicleBrand: [...goods.filter(v => v.file == 'automobiles').map(v => v.type), "locally made"],
	
	// Locations
	locP: ["in<in>", "on|above<object>", "at", "beside|next to", "behind", "in front of", "under|underneath<object>", "inside of<object>"],
	inside: ["in the interior", "inside", "indoors"],
	locV: ["rest", "sit×{ed: 'sat'}", "stand{ed: 'stood'}", "lie{ed: 'lay ', ing: 'lying'}", "wait", "linger<anim><rare>"],
	stateVP: [`#locV.s# #{subj: ""}indoorLocNP#`, `#locV.s# #locP# #indoorLocAdj.a|a# #{subj: ""}indoorLocN[!level]# #indoorLocPost[!wall]|#`],
	
	officePP: ["through a #lobby|foyer|security checkpoint#", "up #an elevator|some stairs#", "past a #break area|secretary|security guard#", "around a #fountain|statue#", "down a #hall|ramp|walkway#", "across a #skybridge|waiting area#"],
	indoorLocNP: ["in #indoorLocAreaNP.a# #indoorLocPost|#", "#locP[!object]# #indoorLocLevelNP.a# #indoorLocPost|#", "#locP[!object,!in]# #indoorLocAdj.a|a# #indoorLocN[!level]# #indoorLocPost[!wall]|#"],
	indoorLocAreaNP: ["#indoorLocAdj|# #indoorLocN[area]#"],
	indoorLocLevelNP: ["#indoorLocAdj|# #indoorLocN[level,!area]#"],
	indoorLocN: ["corner<area><level>", "#recess|alcove#<area><level>", "#wai|sit#ting area<area><level>", "#separate|side|back# room<area><level>", "hall#way|#<level>", "door#way|#<level>", "table", "desk", "counter", "entrance|exit<level>"],
	indoorLocPost: ["#generalLocPost#", "with a picture of #pictureN.a|thingN.a|.thisOwner|celebrity#", "with #mechanicalAdj.a# window<wall>", "with #objectN.a#<object>"],
	generalLocPost: ["filled with garbage", "covered in ads for #corp|productN.s#"],
	outdoorLocN: ["corner", "alley<vector>", "building", "store", "greenspace", "plaza", "street<vector>"],
	outdoorLocPost: ["#generalLocPost#", "hosting #eventAdj.a# #outdoorEvent#", "housing the local #poorGroupN# population", "serving as a squat for #poorGroupN.s#", "with #notableOutdoorN.a#"],
	outdoorEvent: ["market", "fair", "political rally", "religious festival", "parade", "#foot|speeder# race"],
	notableOutdoorN: ["#sizeAdj|# #mechanicalAdj|# statue", "#businessAdj|# food vendor", "#outdoorLocAdj|# public transit access", "#sizeAdj|# #plantAdj|# tree", "#sizeAdj|# crowd of #poorGroupN.s|groupN.s#", "#mechanicalAdj# #vehicleBrand|# #vehicleN#", "#outdoorLocAdj|sizeAdj|businessAdj# shrine"],

	mythicalLoc: ["Arcadia", "Asgard", "Atlantis", "Avalon", "Aztlan", "Baltia", "Camelot", "Cockaigne", "Diyu", "Eden", "El Dorado", "Elysium", "Heaven", "Hyperborea", "Jotunheim", "Kunlun", "Libertalia", "Nibiru", "Norumbega", "Olympus", "Paititi", "Pandæmonium", "Penglai", "Shambhala", "Shangri-La", "Themiscyra", "Trapalanda", "Ubar", "Vineta", "Ys", "Zerzura", "Zion"],
	ancientcity: ["Abaskun", "Abu Simbel", "Abydos", "Angkor", "Antioch", "Avaris", "Babylon", "Balanjar", "Berœa", "Byblos", "Cahokia", "Calakmul", "Caral", "Carthage", "Chang'an", "Chichen Itza", "Corinth", "Ctesiphon", "Dvaraka", "Ephesus", "Erebuni",	"Eridu", "Erlitou", "Firozkoh", "Gungnae", "Gyeongju", "Hampi", "Harappa", "Hatra", "Hattusa", "Heian", "Ifẹ", "Jericho", "Karakorum", "Kashi", "Kantipur", "Kerma", "Knossos", "Kourion", "La Venta", "Lothal", "Loulan", "Machu Picchu", "Ma'rib", "Memphis", "Meroë", "Miletus", "Mohenjo-Daro", "Muziris", "Mycenae", "Niani", "Nineveh", "Nippur", "Noreia", "Nuwara", "Ormus", "Otrar", "Palenque", "Palmyra", "Pasargadae", "Pataliputra", "Pella", "Pergamum", "Persepolis", "Petra", "Pompeii", "Ragusa", "Roanoke", "Roxburgh", "Salem", "Samaria", "Samarkand", "Sarai", "Skara Brae", "Songdo", "Sparta", "Sukhothai", "Susa", "Sybaris", "Tarshish", "Taxila", "Teotihuacan", "Thebes", "Tikal", "Timbuktu", "Tiwanaku", "Tmutarakan", "Troy", "Tyre", "Uruk", "Wilwatikta", "Xanadu"],
	realcity: ["Abidjan", "Abuja", "Alexandria", "Ankara", "Athens", "Baghdad", "Bangkok", "Barcelona", "Beijing", "Bengaluru", "Berlin", "Birmingham", "Bogotá", "Boston", "Brussels", "Buenos Aires", "Busan", "Cairo", "Cape Town", "Casablanca", "Chennai", "Chicago", "Chongqing", "Colombo", "Dar es Salaam", "Dhaka", "Dilli", "Dubai", "Frankfurt", "Gotham", "Guadalajara", "Guangzhou", "Hanoi", "Hong Kong", "Houston", "Istanbul", "Jakarta", "Johannesburg", "Kabul", "Kano", "Karachi", "Khartoum", "Kinshasa", "Kolkata", "Krakow", "Kuala Lumpur", "Kyiv", "Lagos", "Lahore", "Lima", "London", "Los Angeles", "Luanda", "Lyon", "Madrid", "Manchester", "Manila", "Melbourne", "Mexico City", "Milan", "Montréal", "Moscow", "Mumbai", "Nagoya", "Nairobi", "Osaka", "Paris", "Philadelphia", "Randstad", "Rio de Janeiro", "Riyadh", "Roma", "Saigon", "Saint Petersburg", "São Paulo", "San Francisco", "Santiago", "Seoul", "Shanghai", "Shenzhen", "Singapore", "Stockholm", "Surabaya", "Sydney", "Taipei", "Tehran", "Tel Aviv", "Tianjin", "Tokyo", "Toronto", "Vancouver", "Vienna", "Warsaw", "Washington", "Yangon", "Yokohama"],
	spaceColony: ["arcology", "base", "city", "colony", "depot", "hub", "outpost", "station", "survey", "terminal"],
	spaceColonyPoss: ["beacon", "claim", "folly", "progress", "prospect", "#settlements#", "#settlements#"],
	spacenames: ["alpha", "clear", "dark", "free", "high", "light", "moon", "nova", "sky", "star", "sun", "way"],
	settlements: ["ark", "belt", "camp", "dock", "fall", "gate", "haven", "hold", "landing", "point", "port", "post", "reach", "rest", "ridge", "ward", "watch"],
	colonyName: ["#mythicalLoc|gods|scifiPeople# #spaceColony.caps#", "Ne#w|o# #realcity#", "#ancientcity#", "#spacenames.caps|color[name].caps##settlements#", "#scifiPeople#'s #spaceColonyPoss.caps#"],
	
	templeAdj: ["celestial", "compassionate", "divine", "endless|eternal|infinite", "glorious", "great", "heavenly", "holy", "mystical", "original", "righteous", "sacred", "true", "universal"],
	templeNames: ["awakening", "celebration", "charity", "faith", "freedom", "grace", "harmony", "healing", "justice", "knowledge", "illumination", "liberation", "life", "mercy", "peace", "penitence", "prosperity", "purity", "radiance", "redemption", "rebirth", "restoration", "service", "synergy", "teaching", "tranquility", "understanding", "unity", "victory", "wisdom"],
	templeTheNames: ["book", "bridge", "encounter", "epiphany", "family", "gateway", "haven", "house", "journey", "legacy", "martyr<religious>", "messenger", "pilgrimage<religious>", "planet", "river", "rock|cornerstone", "sacrifice", "sea", "spirit", "stars", "tapestry", "tree", "waters", "well", "word"],
	templeTypes: ["assembly", "centre", "chapel", "church|mosque", "community", "congregation", "fellowship", "mission", "sanctuary", "shrine", "temple<inf>"],
	templeVarieties: ["city", "independent", "metropolitan", "modern", "new", "orthodox", "reformed", "traditional"],
	templeNP: ["the #templeAdj.caps|# #templeTheNames.caps#", "#templeAdj.caps|# #templeNames.caps#"],
	
	// Techno Jargon
	technoPre: ["auto", "baro", "bi", "centri", "chrono", "dyno", "gravi", "hyper", "iso", "mega", "meso", "micro", "mono", "multi", "nano", "neo", "para", "posi", "prisma", "quadri", "sub", "super", "tempero", "trans", "tri", "uni"],
	technoPost: ["active", "atomic", "axial", "dimensional", "filament", "flow", "fusion", "genic", "harmonic", "luminal", "magnetic", "matic", "metric", "passive", "phasic", "polar", "sonic", "spacial", "spectral", "synthetic", "topic", "tronic", "wave"],
	technoThing: ["antimatter", "baryon", "beam", "containment", "deuterium", "electron", "field", "flux", "frequency", "gluon", "graviton", "ion", "neutron|neutrino", "particle", "photon", "plasma", "proton", "pulse", "resonance", "singularity", "quantum", "stream", "thoron", "vacuum", "vortex", "warp"],
	technoDevice: ["adjuster", "array", "capacitor", "circuit", "coil", "compensator", "compressor", "converter", "dispenser", "emitter", "generator", "inhibitor", "injector", "initiator", "manipulator", "matrix", "reflector", "regulator", "shifter", "splitter", "stabilizer|destabilizer", "synthesizer"],
	technoDeviceNP: ["#technoPre.caps##technoPost# #technoThing.caps# #technoDevice.caps#<caps>", "#technoPre##technoPost# #technoThing# #technoDevice#"],
	technoDeviceLoc: ["assembly", "chamber", "conduit", "housing", "nacelle", "tube"],
	
	// Generative Words
	enVowel: ["a", "a", "e", "e", "e", "i", "i", "o", "o", "u"],
	
	// A dusty magazine from years past sits in an unused corner. => "#item.a.caps# #stateVP#."
	
	/*
	
	DESC - Location, Environment, Neighbours, graffiti, wanted announcement, advertisement
	DESC - Interior
	DESC - Patron
	DESC - Manager
	DESC - News related
	DESC - Object of Interest (magazine, net interface, vending machine, empty bottle<cheap>, discarded clothing<cheap>, large plant, drone, security camera, vehicle parked outside)
	
	Chronomatic Particles, Temporal Vortex, Quantum Flux Inhibitor
	
	"Send the #hardwareType# #hardware# into the #hardware#, it will #technoV# the #hardware# by #technoV.ing# its #technoAcronym# #hardware#!"
	*/
	
}


// Main Text Parsing Function to be called in program
function parse (text) {
	const mainTags = (text.match(/<(.*?)>/g) || []).map(v => v.slice(1, -1));
	let refValues = {};
	let choice;

	function mainswap (str, p1) {
		function variantswap (c) {
			if (c) choice = c;
			let variant = {};
			// Extract first curly brace section to variant ({s: 'mice'})
			choice = choice.replace(/{(.*?)}/, v => {variant = parseVariant(v); return ""}).trim();
			let ending = "";
			if (p1.length > 1) {
				// add variants to location marked with ^ (if present)
				let vmatch = choice.search(/\^/);
				if (vmatch > -1) {
					ending = choice.slice(vmatch + 1);
					choice = choice.slice(0, vmatch);
				}
				p1.shift();
				for (const i of p1) {
					choice = variant[i] ? variant[i] : (() => {switch (i) {
						case "a":
							return `${choice[0] == '£' ? "some" : choice.match(/^[aeiouøAEIOU]/) ? "an" : "a"} ${choice}`;
						case "caps":
							return choice[0] == '£' ? `£${capitalize(choice.slice(1))}` : capitalize(choice);
						case "ed":
						case "ing":
							return `${choice.match(/e$/i) ? choice.slice(0, -1) : choice + (choice.slice(-1) == '×' ? choice.slice(-2, -1) : "")}${i}`;
						case "ly":
							return `${choice.match(/y$/i) ? choice.slice(0, -1) + "i" : choice}ly`;
						case "s":
							return choice[0] == '£' ? choice : choice.match(/y$/i) ? `${choice.slice(0, -1)}ies` : `${choice}${choice.match(/(s|z|sh|ch)$/i) ? 'es' : 's'}`;
						default:
							return (i in refValues && variant[refValues[i]]) ? variant[refValues[i]] : choice; } })();
				}
			}
			return choice + ending;
		}
		
		// Extract curly brace data to 'refValues'
		p1 = p1.replace(/{(.*?)}/, v => {refValues = parseVariant(v); return ""});
		
		// Split period data from main (becomes p1[0])
		p1 = p1.split(".");
		
		// Extract square bracket data to 'restrictions'
		let restrictions = [];
		p1[0] = p1[0].replace(/\[(.*?)\]/, (_, p2) => {restrictions = p2.split(','); return ""});
		// Extract !data (to eliminations) from restrictions
		let eliminations = [];
		restrictions = restrictions.filter(v => (v[0] == '!') ? (eliminations.push(v.slice(1)), false) : true);
		
		if (!(p1[0] in storyFramework)) {
			// Build dataNP if it does not exist
			if (p1[0].match(/NP$/)) storyFramework[p1[0]] = [`#${p1[0].slice(0, -2)}Adj|# #${p1[0].slice(0, -2)}N# #${p1[0].slice(0, -2)}Post|#`];
			if (p1[0].match(/(Adj|Post)$/)) return "";
		}
		if (p1[0] in storyFramework) {
			let sf = storyFramework[p1[0]];
			let maxWait = Math.floor(sf.filter(v => !(v.match(/<rare(.*?)>/))).length * 0.75);	// exhause 75% of non-rare choices before picking the same thing again
			if (maxWait < 0) maxWait = 0;
			let tagArray = sf.map(v => v.match(/<(.*?)>/g) || []);
			tagArray = tagArray.map(v => v.map(v2 => v2.slice(1, -1)));
			// Decrement <rare> and <picked> tags
			tagArray.forEach((v, i) => 
				v.forEach(v2 => {
					if (v2.match(/^rare/) && v2.replace(/^rare/, "") > 0) sf[i] = sf[i].replace(v2, `rare${v2.replace(/^rare/, "") - 1}`);
					if (v2.match(/^picked/) && v2.replace(/^picked/, "") > 0) sf[i] = sf[i].replace(v2, `picked${v2.replace(/^picked/, "") - 1}`);
				}));

			// First Pass (filter choices down to 'not picked', 'not rare', 'not eliminated', and 'included in restrictions')
			choice = sf.filter((v, i) => (!(v.match(/<(rare(.*?)|picked(.*?))>/)) || v.match(/<rare(0|)>/) || v.match(/<picked0>/)) && !(eliminations.some(v2 => tagArray[i].includes(v2))) && restrictions.every(v2 => tagArray[i].includes(v2)));
			// Second Pass (filter choices down to 'not eliminated' and 'included in restrictions')
			if (choice.length < 1) choice = sf.filter((v, i) => !(eliminations.some(v2 => tagArray[i].includes(v2))) && restrictions.every(v2 => tagArray[i].includes(v2)));
			if (choice.length < 1) return "";

			choice = rnd(choice);
			let sfPick = sf[sf.indexOf(choice)];
			// Add <rare(maxWait * 3)> or <picked(maxWait)> to chosen item
			sf[sf.indexOf(choice)] = sfPick.match(/<rare(0|)>/) ? sfPick.replace(/<rare(0|)>/, `<rare${maxWait * 3}>`) : sfPick.match(/<inf>/) ? sfPick : sfPick.replace(/<picked(.*?)>/, "") + `<picked${maxWait}>`;

			// Choose between | separated items within # refs
			choice = choice.replace(/#(.*?)#/g, (_, p1) => `#${rnd(p1.split('|'))}#`);
	
			// Remove tags then split options (a|b|c)
			choice = choice.replace(/<(.*?)>/g, "").split("|");
			// Remove choices with =tag if tag not included in parse call
			choice.forEach((v, i) => {if (v.match(/=/)) {(mainTags.indexOf(v.split('=')[1]) == -1) ? choice.splice(i, 1) : choice[i] = v.replace(/=(.*)/, "")}});
			// Choose randomly from split options
			choice = rnd(choice);
			
			// Search and recursively replace other references in choice (#something#)
			choice = choice.replace(/#(.*?)#/g, mainswap);
			choice = variantswap();
			return choice;
		} else return (p1.length > 1 && p1[1] in refValues) ? variantswap(refValues[p1[1]]) : p1[0];
	}
	
	function parseVariant (varStr) {
		// Replace 'rnd' function with results
		varStr = varStr.replace(/rnd\((.*?)\)/g, (_,p1) => `"${p1 == "Gender" ? rnd(["fem", "masc"]) : p1 == "PersonName" ? rndPersonName() : rnd(p1)}"`);	
		// Double quote keys, replace single-quote values with double quotes 
		varStr = varStr.replace(/(\s*{\s*|\s*,\s*)(['"])?(\w+)(['"])?:/g, `$1"$3":`).replace(/:\s*(')(.*?)(')/g, `: "$2"`);
		return JSON.parse(varStr);
	}
	
	//text = text.replace(/<(.*?)>/g, "").replace(/#(.*?)#/g, (_, p1) => `#${rnd(p1.split('|'))}#`);	// trim tags, choose top level hash options
	text = text.replace(/#(.*?)#/g, (_, p1) => `#${rnd(p1.split('|'))}#`);	// choose top level hash options
	text = text.replace(/#(.*?)#/g, mainswap);	// parse text
	text = text.replace(/[!?]\./g, v => v[0]);	// replace ?. with ?, and !. with !
	text = text.replace(/(Ø|ø|£|×|\^)/g, "").replace(/\s+/g, " ").replace(/(\s+)(\.|\!|\?|,|;)/g, "$2").replace(/¶/g, "<br><br>").trim();	// trim formatting characters, excess spaces, and spaces before .!?,;
	return text;
}



// Markov Name Generator (nameset takes array or comma separated string to build from storyFramework arrays - e.g. "godsEgypt,godsNorse")
function markov (nameset, order = 2) {
	const vowels = "aaaaaaaeeeeiiiiiooou";	// approx. distribution of vowels in firstname set
	if (typeof nameset === 'string') nameset = nameset.split(",").map(v => storyFramework[v]).join().split(",");
	nameset = nameset.map(v => rnd(v.replace(/(<(.*?)>|\{(.*?)\}|\[(.*?)\]|Ø|ø|£|×|\^|\s)/g, "").split("|")).toLowerCase());
	
	let name = rnd(nameset).slice(0, order);
	for (let i = order; i < Math.max(rnd(nameset).length, 3); i++) {
		let choices = [];
		nameset.forEach(v => {let a = v.search(name.slice(i - order, i)); if (a > -1 && a < v.length - order) {choices.push(v[a + order]); nameset.push(v.slice(a + order))}});
		name += rnd(choices.length > 0 ? choices : vowels);
	}
	if (name[name.length - 1] == '-') name = name.slice(0, -1);	// Trim final dash
	if (name[name.length - 2] == '-') name += rnd(vowels);	// Add vowel if name ends with (dash)(letter)
	if (name.search(/[aeiouy]/) < 0) name = name.slice(0, 2) + rnd(vowels) + name.slice(2);	// Insert random vowel at 3rd position if there are no vowels/y
	return name;
}

function localeFlavour (site, location = here) {
	const loc = world[location].locales[site];
	
	let out = `#{locale: "${loc.type}", name: "${loc.name || `${world[location].name} ${loc.type}`}", here: "${world[location].name}", thisOwner: "${loc.file == 'embassy' ? 'the ambassador' : loc.file == 'police' ? 'the chief' : loc.file.match(/^[factory|office|spaceport]/) ? 'the company CEO' : 'the owner'}"}.#`;
	const gentext = rnd(["It's a popular place with #groupN.s# and #groupN.s#.",
		"It's just the sort of place to meet 'interesting' people.",
		"It remains to be seen what makes this #.locale# stand out from the others on #.here#.",
		"Not all #.locale.s# are created equal - this one is rather #sizeAdj# and #indoorLocAdj#."]);
	const intro = rnd(4) - 1;
	out += ["The #.locale# is #locate.ed# #locP# #outdoorLocNP.a#. ", 
		"The #.locale# is #a little difficult|not easy# to find. ", 
		"#sizeAdj.a.caps# #neon|conditionAdj|# sign reads '#.name#'. ",
		"This #.locale# is #sandwiched between|stuffed next to|hidden behind# #outdoorLocAdj.a# #outdoorLocN# and #outdoorLocN.a# #outdoorLocPost#. "][intro];
	
	out += rnd([...({
		bar: ["#.name# is known for a #seedy|down and out|questionable# clientele. Outside, the sizeable #poorGroupN# population #can attest to|backs up|confirms# this fact.",
			"#.name# is one of the better #bars|drinking establishments|watering holes# around, and it's not uncommon to find #personN.s# #activityV.ing# after work here."],
		cafe: ["This diner serves up #some of|# the best #foodNP# on #.here# - or at least that's what #they|locals# claim."],
		embassy: ["#personAdj[!seedy].caps# foreign dignitaries are the main clientele here."],
		factory: ["#Surely i|I#t's one of #the|# many factories on #.here# #producing|churning out|making# #consumer|industrial|farming|corporate# #goods|equipment|items#."],
		hotel: ["This is hardly the hotel it #used to be|once was#. It #seems|appears# to cater more to #poorGroupN.s# than its original clientele."],
		house: ["It's #just|# a #conventional|normal|simple# home #inside|#, nothing #special|unique|out of the oridinary#."],
		lab: ["The lab is #full of|packed with# the latest equipment. It must have been a #corporate|government|military# lab in the past."],
		museum: ["The current featured exhibit is of #styleAdj# #artN.s# from #world[cultural]#."],
		office: ["#officePP.caps#, #officePP#, #officePP#, and finally #officePP# to arrive."],
		park: ["Few people venture out here. No more than #number# pass by on the path."],
		police: ["#poorGroupN[!animal].s.caps# are being processed slowly while #personAdj[!seedy]# cops look on."],
		prison: ["Most days things are very quiet here. Not many people choose to come to a prison."],
		spaceport: ["This spaceport mostly handles #tourists|passengers|cargo#."],
		store: ["#inside.caps# a variety of trinkets are for sale."],
		temple: ["Inside is a welcome refuge from the #loud|busy|chaotic# streets outside. #lightAdj.caps# #color[!shade]# light streams through stained glass windows."],
		warehouse: ["This building hasn't been in use for some time."]})[loc.file], gentext]);
	
	const outro = (intro + rnd(3)) % 4;
	out += [" The #.locale# is #locate.ed# #locP# #outdoorLocNP.a#. ", 
		" #{subj: rnd(Gender)}personAdj.a.caps# #personN.subj# #personDescPost|personPost|# #stateVP#.", 
		" #objectN.a.caps# #stateVP#.",
		" This #.locale# is #sandwiched between|stuffed next to|hidden behind# #outdoorLocAdj.a# #outdoorLocN# and #outdoorLocN.a# #outdoorLocPost#."][outro];
	out = parse(out + "¶");
	
	// Background News Item
	let recentNews = [0];
	let weeksNews = [];
	newsItem.every((v, i) => time.full - v.time < 24 ? recentNews.push(i) : time.full - v.time < 168 ? weeksNews.push(i): false);
	const recentSubject = newsItem[rnd(recentNews)].subject;
	out += `${rnd([`A news screen is sharing`, `A few people are watching`, `The locals are paying attention to`])} some${recentSubject == world[here].name ? ' local news' : `thing about ${recentSubject}`}. `;
	if ([...recentNews, ...weeksNews].some(v => newsItem[v].headline.match(/(refugees)/i) && newsItem[v].subject == world[here].name)) out += `There are ${rnd(['many', 'some', 'a lot of'])} refugees gathered in ${rnd(['small groups', 'the area', 'quieter spaces'])}. `;
	if ([...recentNews, ...weeksNews].some(v => newsItem[v].headline.match(/(famine)/i) && newsItem[v].subject == world[here].name)) out += `Locals are desperately ${rnd(['begging', 'looking', 'shopping'])} for food. `;
	
	return out;
}

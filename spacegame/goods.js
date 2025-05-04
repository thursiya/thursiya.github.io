const goods = [																			// M, Ag | I, T | Af, S, C, HT, Mx | P, F
	{name: "Air Processors", grade: 1, type: "Certibrand", file: "air-processors", price: 1500, produce: "Ma", demand: "Mi T", desc: "Critical to survival on harsh worlds."},	//0) I -> T3, F2, P2, M2, I1
	{name: "Air Processors", grade: 2, type: "Systech", file: "air-processors", price: 2500, produce: "Ma", demand: "Mi T"},	// I -> T3, F2, M2, I1
	{name: "Automobiles", grade: 1, type: "Eagle", file: "automobiles", price: 2500, stat: 'sensitive', produce: "Ma", demand: "Ag F H Mi I P S (C)", desc: "Industrial and consumer vehicles."},	//2) I -> S3, C2, *1 
	{name: "Automobiles", grade: 2, type: "Geotech", file: "automobiles", price: 4000, stat: 'sensitive', produce: "Ma", demand: "Ag C F H Mi I (S)"},			// I -> Af1, S1, C3, *1
	{name: "Automobiles", grade: 2, type: "5-Star", file: "automobiles", price: 4000, stat: 'sensitive', produce: "Ma", demand: "Ag C F H Mi I (S)"},			// I -> Af1, S1, C3, *1
	{name: "Automobiles", grade: 3, type: "Mechanica", file: "automobiles", price: 5500, stat: 'sensitive', produce: "Ma", demand: "Af C H"},		// I -> Af2, C2
	{name: "Automobiles", grade: 4, type: "Eunion", file: "automobiles", price: 8000, stat: 'sensitive', produce: "Ma", demand: "Af H (C)"},			// I -> Af3, C1
	{name: "Animal Meat", grade: 1, type: "Bio-Engineered", file: "animal-meat", price: 1500, stat: 'cold', produce: "Ag F", demand: "C H I Ma Mi T", desc: "Still legal."},	//7) Ag -> Af1, *1	(!)
	{name: "Animal Meat", grade: 2, type: "Terran", file: "animal-meat", price: 2500, stat: 'cold', produce: "Ag F", demand: "Af C H I Ma Mi T"},				// Ag -> Af2,		(!)
	{name: "Animal Meat", grade: 3, type: "Lacotian", file: "animal-meat", price: 4500, stat: 'cold', produce: "Ag F", demand: "Af C H Ma (T)"},				// Ag -> Af3, 		(!)
	{name: "Animal Skins", grade: 1, type: "Bio-Engineered", file: "animal-skins", price: 5000, produce: "Ag F", demand: "Af C", desc: "<i>Illegal on democratic worlds.</i>"}, //10) Ag -> Af2	!
	{name: "Animal Skins", grade: 2, type: "Terran", file: "animal-skins", price: 7500, produce: "Ag F", demand: "Af C"},	// Ag -> Af3	!
	{name: "Animal Skins", grade: 3, type: "Lacotian", file: "animal-skins", price: 12500, produce: "Ag F", demand: "Af C"},							// Ag -> Af3	!
	{name: "Bacteria Farms", grade: 1, type: "Stellar", file: "bacteria-farms", price: 3000, stat: 'dangerous', produce: "I", demand: "Military H T", desc: "Military worlds will demand them.<br><i>Illegal on democratic worlds.</i>"},	//13) HT? -> HT, Military	!		? stat: 'live' ?
	{name: "Bacteria Farms", grade: 2, type: "Astromedica", file: "bacteria-farms", price: 5000, stat: 'dangerous', produce: "I", demand: "Military H T"},// -> HT	!
	{name: "Bacteria Farms", grade: 3, type: "Aegis", file: "bacteria-farms", price: 7000, stat: 'dangerous', produce: "I", demand: "Military H"},	// -> HT	!
	{name: "Chemicals", type: "assorted", file: "chemicals", price: 500, stat: 'sensitive', produce: "Mi T (F)", demand: "H I P S", desc: "The building blocks of countless products."},	//16) M -> I3, HT2, Af1, S1, Mx1, P1, C1
	{name: "Consumer Goods", grade: 1, type: "Eagle", file: "consumer-goods", price: 1000, produce: "C H P (Af F)", demand: "I Ma Mi S T", desc: "Household and everyday products."},	//17) I, HT, Af, S, C, Mx, P -> *1
	{name: "Consumer Goods", grade: 2, type: "Nanoworks", file: "consumer-goods", price: 2000, produce: "H P (Af)", demand: "C F I Ma Mi S T"},						// -> *1
	{name: "Consumer Goods", grade: 3, type: "Mitsutomo", file: "consumer-goods", price: 4000, produce: "S (Af P)", demand: "C H Ma (F T)"},
	{name: "Consumer Goods", grade: 3, type: "Fortune", file: "consumer-goods", price: 4000, produce: "S (Af P)", demand: "Af C H (F T)"},
	{name: "Consumer Goods", grade: 4, type: "Polis", file: "consumer-goods", price: 5000, produce: "S (Af)", demand: "Af C H"},
	{name: "Data Vaults", type: "secure", file: "datavaults", price: 5000, stat: 'sensitive', produce: "*", demand: "*", desc: "Data vaults hold vast stores of important information and are not traded on the market."},	//22) *
	{name: "Electronics", grade: 1, type: "Fushikang", file: "electronics", price: 2000, produce: "H", demand: "I P S", desc: "The base components for most technology. Most worlds provide for their own needs."},  //23) HT -> I1, Af3, HT1
	{name: "Electronics", grade: 2, type: "Microtronic", file: "electronics", price: 3000, produce: "H", demand: "P S"},
	{name: "Electronics", grade: 2, type: "5-Star", file: "electronics", price: 3000, produce: "H", demand: "P S"},
	{name: "Electronics", grade: 3, type: "Globalnet", file: "electronics", price: 4000, produce: "H", demand: "P S"},
	{name: "Explosives", grade: 1, type: "Industrial", file: "explosives", price: 5000, stat: 'dangerous', produce: "I", demand: "F Mi S T", desc: "<i>Illegal on all but military and lawless worlds.</i>"},			//27) I -> M, I, S, T		!
	{name: "Explosives", grade: 2, type: "Large Scale", file: "explosives", price: 8000, stat: 'dangerous', produce: "I", demand: "S T"},	// I -> !
	{name: "Fertilizer", type: "multinutrient", file: "fertilizer", price: 200, stat: 'dangerous', produce: "I", demand: "Ag F T", desc: "Critical to high-quality food production."},	//29) Ag, I, *? -> Ag, T, F, 
	{name: "Farming Equipment", grade: 1, type: "Systech", file: "farming-equipment", price: 1500, produce: "Ma", demand: "Ag T", desc: "Basic farming necessity."},	//30) I -> Ag
	{name: "Farming Equipment", grade: 2, type: "Sirius", file: "farming-equipment", price: 2500, produce: "Ma", demand: "Ag T"},
	{name: "Farming Equipment", grade: 3, type: "Geotech", file: "farming-equipment", price: 3500, produce: "Ma", demand: "Ag (T)"},
	{name: "Fruit & Vegetables", type: "assorted", file: "vegetables", price: 1000, stat: 'cold', produce: "Ag", demand: "Af C F H Ma T", desc: "A galaxy of varieties."},		//33) Ag -> *
	{name: "Gemstones", type: "assorted", file: "gemstones", price: 100000, produce: "Mi", demand: "Af Ma S", desc: "Used in energy weapons and as a luxury."},	//34) M -> I, Af
	{name: "Government Artifacts", type: "priceless", file: "artifacts", price: 100000, stat: 'sensitive', produce: "*", demand: "Af", desc: "Government artifacts are usually only available on the black market."},	//35) * -> Af, C		(!)
	{name: "Grain", type: "assorted", file: "grain", price: 300, produce: "Ag (F)", demand: "Af C H Ma P S", desc: "Primary food staple."},	//36) Ag -> *
	{name: "Hand Weapons", grade: 1, type: "Cyberops", file: "hand-weapons", price: 5500, produce: "Ma", demand: "Military F S", desc: "Military worlds will demand them.<br><i>Illegal on corporate and democratic worlds.</i>"},	//37) I, S -> Military, *		!
	{name: "Hand Weapons", grade: 2, type: "Forge", file: "hand-weapons", price: 6500, produce: "Ma", demand: "Military Af F S"},
	{name: "Hand Weapons", grade: 3, type: "Aegis", file: "hand-weapons", price: 8500, produce: "Ma", demand: "Military Af F S"},
	{name: "Hand Weapons", grade: 4, type: "Eagle", file: "hand-weapons", price: 10500, produce: "Ma", demand: "Military Af S"},
	{name: "Heavy Plastics", type: "assorted", file: "plastics", price: 1000, produce: "I", demand: "S P", desc: "Important intermediate product."},	//41) I -> I, HT, Af, S, C, Mx, P
	{name: "Hydrogen Fuel Cells", type: "commercial", file: "hydrogen", price: 200, produce: "I", demand: "Af F S", desc: "Especially useful for starships."},	//42) I -> *
	{name: "Hypdroponic Farms", grade: 1, type: "Stellar", file: "hydroponic-farms", price: 2000, stat: 'live', produce: "Ag", demand: "H T", desc: "Designer plants and drug components."},	//43) Ag, Ocean -> HT *
	{name: "Hypdroponic Farms", grade: 2, type: "Centauri", file: "hydroponic-farms", price: 2800, stat: 'live', produce: "Ag", demand: "H T"},
	{name: "Hypdroponic Farms", grade: 3, type: "Sirius", file: "hydroponic-farms", price: 4000, stat: 'live', produce: "(Ag)", demand: "Af H T"},
	{name: "Industrial Equipment", grade: 1, type: "Forge", file: "industrial-equipment", price: 1500, produce: "I", demand: "Ma Mi", desc: "Critical work tools."},	 //46) I -> I, M
	{name: "Industrial Equipment", grade: 2, type: "Mechanica", file: "industrial-equipment", price: 2500, produce: "I", demand: "Ma Mi"},
	{name: "Industrial Equipment", grade: 3, type: "Systech", file: "industrial-equipment", price: 3500, produce: "I", demand: "Ma Mi"},
	{name: "Industrial Goods", grade: 1, type: "Forge", file: "industrial-goods", price: 3000, produce: "Ma", demand: "H", desc: "Advanced manufacturing goods."},	//49) I -> I, HT
	{name: "Industrial Goods", grade: 2, type: "Mechanica", file: "industrial-goods", price: 4500, produce: "Ma", demand: "H"},
	{name: "Iron Ore", type: "assorted", file: "iron-ore", price: 500, produce: "Mi T (P)", demand: "I", desc: "Key resource in metal production."},	 //51) M -> I
	{name: "Liquid Oxygen", type: "cryogenic", file: "oxygen", price: 200, stat: 'cold', produce: "I", demand: "Ma T", desc: "<i>Will explode if not kept in cold storage.</i>"},							//52) *I -> I, T, HT
	{name: "Liquor", grade: 1, type: "Assorted New", file: "liquor", price: 1500, produce: "Ag F", demand: "H I Ma Mi S", desc: "<i>Illegal on theocratic worlds.</i>"},	//53) S, Af, C -> *		!
	{name: "Liquor", grade: 2, type: "Assorted Aged", file: "liquor", price: 5500, produce: "Ag F", demand: "Af F H I Ma S"},
	{name: "Liquor", grade: 3, type: "Doleamas", file: "liquor", price: 20000, produce: "Af C (Ag)", demand: "Af H (F)"},	
	{name: "Live Animals", grade: 1, type: "Bio-Engineered", file: "live-animals", price: 10000, stat: 'live', produce: "Ag F", demand: "Af Ag T", desc: "<i>Agricultural worlds demand the animals they do not produce.</i>"},	//56) Ag -> Af, C		!
	{name: "Live Animals", grade: 2, type: "Terran", file: "live-animals", price: 15000, stat: 'live', produce: "Ag F", demand: "Af Ag C T"},
	{name: "Live Animals", grade: 3, type: "Lacotian", file: "live-animals", price: 25000, stat: 'live', produce: "Ag F", demand: "Af Ag C T"},
	{name: "Lumber", type: "cut", file: "lumber", price: 300, produce: "Ag, Mi, P, S (Rocky, Desert)", demand: "Af, Ag, C, P, S", desc: "Produced on most rocky and desert worlds and needed for light construction and some quality goods."},		//59) Rocky -> *
	{name: "Luxury Goods", grade: 1, type: "Polis", file: "luxury-goods", price: 10000, produce: "Ma S (Af)", demand: "Af C H", desc: "<i>Illegal on theocratic worlds.</i>"},	//60) HT, I, Af, S, C, Mx -> Af
	{name: "Luxury Goods", grade: 2, type: "Eunion", file: "luxury-goods", price: 15000, produce: "H Ma S (Af)", demand: "Af C (H)"},
	{name: "Luxury Goods", grade: 3, type: "ICP", file: "luxury-goods", price: 35000, produce: "C H Ma S (Af)", demand: "Af"},
	{name: "Medicine", grade: 1, type: "Fortune", file: "medicine", price: 5000, produce: "H", demand: "Ag C F I Ma T", desc: "Always needed."},	//63) HT -> *		? stat: 'cold' ?
	{name: "Medicine", grade: 2, type: "Centauri", file: "medicine", price: 6500, produce: "H", demand: "Af C I Ma (Ag F T)"},
	{name: "Medicine", grade: 3, type: "Astromedica", file: "medicine", price: 8000, produce: "H", demand: "Af C"},
	{name: "Minerals", type: "assorted", file: "minerals", price: 300, produce: "Mi T (P)", demand: "I", desc: "Easily sourced production need."},	 //66) M, T -> I
	{name: "Narcotics", grade: 1, type: "Minor", file: "narcotics", price: 5000, produce: "Ag (F)", demand: "C I Ma Mi S", desc: "<i>Illegal on all but lawless worlds, although corporate and democratic worlds will allow minor narcotics and feudal worlds will also allow hallucinogenic narcotics.</i>"},	//67) HT -> *		!
	{name: "Narcotics", grade: 2, type: "Hallucinogenic", file: "narcotics", price: 8000, produce: "H", demand: "Af C F I Ma Mi S"},
	{name: "Narcotics", grade: 3, type: "Heavy", file: "narcotics", price: 10000, produce: "H", demand: "Af C Ma S"},
	{name: "Narcotics", grade: 4, type: "Psychotropic", file: "narcotics", price: 14000, produce: "H", demand: "Af C S"},
	{name: "Packages", type: "assorted", file: "packages", price: 500, produce: "*", demand: "*", desc: "Packages are specific to customers and are not traded on the market."},	//71) *
	{name: "Perishable Goods", grade: 1, type: "MilkyWay", file: "perishable-goods", price: 1000, stat: 'cold', produce: "Ag C (Af F)", demand: "F H I Ma Mi P S T", desc: "Delicious & Nutricious: Packaged."},	//72) I, Af, S, C, Mx -> *
	{name: "Perishable Goods", grade: 2, type: "5-Star", file: "perishable-goods", price: 1500, stat: 'cold', produce: "S (Af)", demand: "F H I Ma Mi T"},
	{name: "Perishable Goods", grade: 2, type: "Sirius", file: "perishable-goods", price: 1500, stat: 'cold', produce: "S (Af)", demand: "F H I Ma Mi T"},
	{name: "Perishable Goods", grade: 3, type: "Fortune", file: "perishable-goods", price: 2000, stat: 'cold', produce: "S (Af)", demand: "Af H Ma (C T)"},
	{name: "Petroleum", type: "light", file: "petroleum", price: 500, produce: "Mi (F)", demand: "I", desc: "Black gold."},	//76) M -> I
	{name: "Precious Metals", type: "assorted", file: "precious-metals", price: 10000, produce: "F Mi", demand: "C H Ma", desc: "Regular gold."},  //77) M -> I, HT
	{name: "Probes", grade: 1, type: "Globalnet", file: "probes", price: 2500, produce: "H", demand: "F Mi T", desc: "Mostly used in mineral mining."},  //78) HT -> T, M
	{name: "Probes", grade: 2, type: "Forge", file: "probes", price: 4000, produce: "H", demand: "Mi T (F)"},
	{name: "Radioactive Waste", type: "assorted", file: "radioactives", price: 500, stat: 'dangerous', produce: "*", demand: "None", desc: "Waste products are produced by industrial processes and some damaged goods. Must pay to have them disposed of."},				//80) I, HT -> !
	{name: "Robots", grade: 1, type: "Cyberops", file: "robots", price: 4000, stat: 'dangerous', produce: "H Ma", demand: "Ag F I Mi T", desc: "<i>Illegal on theocratic worlds.</i>"},	//81) HT -> M, Ag, I, T, Af
	{name: "Robots", grade: 2, type: "Microtronic", file: "robots", price: 6000, stat: 'dangerous', produce: "H", demand: "Af Ag I Ma Mi T (F)"},
	{name: "Robots", grade: 3, type: "Nanoworks", file: "robots", price: 8000, stat: 'dangerous', produce: "H", demand: "Af C Ma"},
	{name: "Robots", grade: 4, type: "Mitsutomo", file: "robots", price: 10000, stat: 'dangerous', produce: "H", demand: "Af (C)"},
	{name: "Slaves", grade: 1, type: "Child", file: "slaves", price: 5000, stat: 'live', produce: "F S", demand: "Af I", desc: "<i>Illegal on democratic worlds. Luxorian slaves illegal on theocratic worlds.</i>"}, //85) S, P -> M, Ag, I, T, Af
	{name: "Slaves", grade: 2, type: "Uneducated", file: "slaves", price: 7500, stat: 'live', produce: "F P S", demand: "Ag I Ma Mi"},
	{name: "Slaves", grade: 3, type: "Terran", file: "slaves", price: 15000, stat: 'live', produce: "F P S", demand: "Af Ag C H I Ma Mi T"},
	{name: "Slaves", grade: 3, type: "Rigelian", file: "slaves", price: 15000, stat: 'live', produce: "F P S", demand: "Af Ag C H I Ma Mi T"},
	{name: "Slaves", grade: 3, type: "Sirian", file: "slaves", price: 15000, stat: 'live', produce: "F P S", demand: "Af Ag C H I Ma Mi T"},
	{name: "Slaves", grade: 4, type: "Bio-Engineered", file: "slaves", price: 25000, stat: 'live', produce: "H P S", demand: "Ag I Mi T"},
	{name: "Slaves", grade: 5, type: "Luxorian", file: "slaves", price: 50000, stat: 'live', produce: "S", demand: "Af C H"},	// Special Supply -> 
	{name: "Synthetic Meat", type: "assorted", file: "synthetic-meat", price: 1000, stat: 'cold', produce: "H", demand: "F I Ma Mi P S T", desc: "Tastes <i>almost</i> as good as the real thing."},	//92) HT? -> *
	{name: "Waste Products", type: "assorted", file: "waste-products", price: 50, produce: "*", demand: "None", desc: "Waste products are produced by industrial processes, large populations, and damaged goods. Must pay to have them disposed of."},		//93) Af, C, Mx, HT -> *
	{name: "Water", type: "fresh", file: "water", price: 100, stat: 'sensitive', produce: "H Mi P (Ice, Ocean)", demand: "F T", desc: "The lifeblood of the galaxy."}	//94) Ocean, Ice -> T, F
];

// Called by 'addMission()' when determining cargo (m = mission, query = all/extended/general/illegal/legal)
// Generates a weighted array for randomly choosing a good from
function chooseGoods(m, query) {
	const loc = (query == "dest") ? m.dest : m.origin;
	const illegals = (world[loc].gov == "Anarchy") ? [...new Set([...illegalGoods("Democracy"), ...illegalGoods("Theocracy")])] : illegalGoods(world[loc].gov);
	const p = validatePerson(m.client);
	
	// If no query is set, convert into appropriate class of goods depending on client's moral compass
	if (!query) query = (p.title == "Legitimate Businessperson" || rnd(3) + 2 < p.risk || rnd(3) > p.moral) ? "illegal" :
		(p.rep > 60 && rnd(3) < p.risk && rnd(3) + 2 > p.moral) ? "all" : "legal";
			
	if (query == "illegal") return [...illegals, 71].map(v => Object.create(goods[v]));	// Return illegal goods and packages
	const suppliedGoods = world[loc].goods.map(v => (v.supply > 0 && v.stat != 'illegal') ? v.type + v.name : 0);
	return goods.map(v => Object.create(v)).reduce((t, v, i) => suppliedGoods.includes(v.type + v.name) ||	// Skip supplied goods
		(v.price > 9999 && p.rep < 80) ||	// Skip expensive goods if not high rep
		(v.price > 4999 && p.rep < 60) ||	// Skip moderate goods if low rep
		(v.price < 5000 && p.rep > 79) ||	// Skip cheap goods if high rep
		i == 80 || i == 93 ||		// Skip wastes
		(query != "extended" && [16, 36, 42, 51, 52, 59, 66, 76, 92, 94].includes(i)) ||	// Skip basic goods
		(query == "legal" && illegals.includes(i)) ||	// Skip illegal goods on "legal" query
		(query == "general" && [22, 35, 71].includes(i)) ? t :	// Skip unique goods on "general" query
			[...t, ...[22, 35, 71].includes(i) ? new Array((i == 35 && world[loc].focus == "Cultural") ? 15 : 5).fill(Object.assign(v, { id: `${(Math.floor(seed / (world[loc].notices.length + 1) + time.full) % 1679616).toString(36).toUpperCase()}-${("00" + rnd(999)).slice(-3)}` })) : [v]], []);
}

// Only called once per world during world creation
function worldGoods(w) {
	const arr = [];
	let mixedGoods = [];
	let set = [];
	
	function buildArray(sd) {
		for (const g of set) {
			const regood = arr.findIndex(v => v.name == goods[g].name && v.type == goods[g].type);
			if (regood > -1 && sd != 0) {		// Increment already present good
				arr[regood].supply += sd;
			} else {				// Add good if not present
				const newGood = Object.create(goods[g]);
				newGood.supply = sd;
				if (sd == 0) newGood.stat = 'illegal';
				arr.push(newGood);
			}
		}
	}
	
	// Set supplied goods
	switch (w.focus) {
		case "Mining":
			set = [16, 34, 51, 66, 76, 77];
			set.push(rnd(set), rnd(set), rnd(set), rnd([16, 34, 51]), rnd([66, 76, 77]));
			break;
		case "Agricultural":
			set = [[7, 10, 56], [8, 11, 57], [9, 12, 58]][(seed + world.filter(v => ["Agricultural", "Frontier"].includes(v.focus)).length) % 3];
			set = [33, 36, 44, 53, 54, 67, 72].concat(set, rnd([set, 33, 36]), rnd([set, 33, 36]), rnd([set, 33, 36]), w.gov == "Democracy" ? [44, 45, 54, 55, 72] : [36, 43, 53]);
			if (w.type == "Ocean") set.push(43, 44, 45);
			if (w.govdesc == "Sirius") set.push(45);
			if (w.govdesc == "Doleamas") set.push(55);
			if (w.gov == "Corporate") set.push(67, 67);
			break;
		case "Industrial":
			set = [13, 14, 15, 27, 28, 29, 41, 42, 46, 47, 47, 48, 48, 52, rnd([13, 27, 29]), rnd([14, 28, 29]), rnd([41, 42, 52]), rnd([41, 42, 52])];	//(80), (93)
			break;
		case "Manufacturing":
			set = [0, 1, 2, 3, 4, 5, 6, 30, 31, 32, 37, 38, 39, 40, 49, 50, 60, 61, 61, 62, 81];
			break;
		case "Terraforming":
			set = [16, 51, 66];
			set.push(rnd(set), rnd(set), rnd(set));
			break;
		case "High Tech":
			set = [17, 18, 23, 24, 25, 26, 61, 62, 63, 64, 65, 68, 69, 70, 78, 79, 81, 82, 83, 84, 90, 92]; // (80), (93)
			break;
		case "Affluent":
			if (w.gov == "Corporate") set.push(...[17, 18, 19, 20, 21, 55, 60, 61, 62, 72, 73, 74, 75, 81, 82, 83, 84].filter(v => goods[v].type == oldCorps.find(c => c.name == w.govdesc).name));
			break;
		case "Slum":
			set = [19, 20, 21, 60, 60, 61, 62, 73, 73, 74, 74, 75, 75, 85, 85, 85, 86, 86, 86, 87, 87, 88, 88, 89, 89, 90, 90, 91];
			break;
		case "Cultural":
			set = [54, 54, 55, 62].concat(w.gov == "Democracy" ? 55 : [17, 72]);
			if (w.govdesc == "Doleamas") set.push(55);
			break;
		case "Prison":
			set = [17, 18, 86, 86, 86, 87, 87, 88, 88, 89, 89, 90, 90, 90, rnd([17, 51, 66])].concat(w.gov == "Democracy" ? [17, 18, 19, 20] : rnd([51, 66]));	
			break;
		case "Frontier":
			set = [[7, 10, 56], [8, 11, 57], [9, 12, 58]][(seed + world.filter(v => ["Agricultural", "Frontier"].includes(v.focus)).length) % 3];
			set.push(53, 77, rnd([16, 36, 76]), [17, 67, 72][w.name.length % 3], ...(w.gov == "Democracy" ? [[17, 36, 72][w.name.length % 3]] : [85, 86, 86, 87, 88, 89]));
			break;
		case "Mixed":
			for (const i of times((w.name.length + seed) % 4 + 3)) {
				if (mixedGoods.length < 1) mixedGoods = fillMixedArray();
				set.push(mixedGoods.splice(rnd(mixedGoods.length) - 1, 1)[0]);
			}				
	}
	if (["Mining", "Agricultural", "Slum", "Prison", "Mixed"].includes(w.focus)) {
		if (w.type == "Rocky") set.push(59, 59);
		if (w.type == "Desert") set.push(59);
		if (w.type == "Ice") set.push(94, 94);
	}
	if (["Terraforming", "High Tech", "Prison", "Mixed"].includes(w.focus) && w.type == "Ocean") set.push(94);
	if (w.gov == "Corporate") new Set(set).forEach(v => {if (goods[v].type == w.govdesc) set.push(v, v, v)});
	set.forEach(v => {
		const i = mixedGoods.indexOf(v);
		if (i > -1) mixedGoods.splice(i, 1); });
	buildArray(1);
	
	// Set demand goods
	if (w.focus == "Mining") set = [0, 0, 1, 1, 2, 3, 4, 7, 8, 17, 18, 27, 27, 27, 46, 46, 46, 47, 47, 47, 48, 48, 48, 53, 53, 53, 67, 67, 68, 68, 72, 72, 72, 73, 74, 78, 78, 79, 81, 81, 82, 82, 86, 86, 87, 87, 88, 88, 89, 89, 90, 90, 90, 92, 92];
	if (w.focus == "Agricultural") set = [2, 3, 4, 29, 29, 30, 30, 30, 31, 31, 31, 32, 32, 32, 59, 63, 81, 81, 82, ...(w.gov == "Democracy" ? [63, 64, 81, 82] : [86, 86, 87, 87, 88, 88, 89, 89, 90, 90]), ...(arr.includes(56) ? [57, 58] : arr.includes(57) ? [56, 58] : [56, 57])];
	if (w.focus == "Industrial") set = [2, 3, 4, 7, 8, 16, 16, 16, 17, 18, 23, 51, 51, 51, 53, 53, 54, 63, 64, 66, 66, 66, 67, 67, 68, 68, 72, 72, 72, 73, 73, 73, 74, 74, 76, 76, 76, 81, 81, 82, 85, 85, 86, 86, 87, 87, 88, 88, 89, 89, 90, 90, 92, 92];
	if (w.focus == "Manufacturing") set = [7, 8, 9, 17, 18, 19, 33, 34, 34, 36, 46, 46, 47, 47, 48, 48, 52, 53, 54, 54, 63, 64, 67, 68, 69, 72, 72, 73, 73, 73, 74, 74, 74, 75, 77, 77, 82, 82, 82, 83, 83, 83, 86, 86, 87, 87, 88, 88, 89, 89, 92, 92];
	if (w.focus == "Terraforming") set = [0, 0, 1, 1, 7, 8, 17, 18, 29, 29, 29, 31, 33, 43, 44, 45, 52, 52, 56, 56, 57, 57, 58, 63, 72, 72, 73, 74, 78, 78, 79, 79, 81, 82, 82, 92, 94, 94, 94, ...(w.gov == "Democracy" ? [1, 9, 19, 20, 32, 45, 63, 64, 75, 79] : [0, 13, 14, 17, 27, 27, 28, 30, 43, 72, 73, 74, 78, 87, 88, 89, 90])];
	if (w.focus == "High Tech") set = [2, 3, 4, 5, 5, 6, 7, 8, 8, 9, 9, 16, 16, 19, 20, 20, 21, 21, 33, 33, 36, 43, 44, 44, 45, 49, 50, 53, 54, 54, 55, 55, 60, 72, 73, 73, 74, 74, 75, 75, 77, 77, 77, ...(w.gov == "Democracy" ? [5, 6, 19, 20, 45, 50, 55, 60, 61, 61, 75] : [3, 4, 13, 13, 14, 14, 15, 15, 43, 49, 87, 88, 89, 91, 91])];
	if (w.focus == "Affluent") set = [5, 5, 6, 6, 6, 8, 8, 9, 9, 9, 19, 19, 20, 20, 21, 21, 21, 33, 33, 33, 34, 34, 35, 35, 35, 36, 42, 45, 54, 54, 55, 55, 55, 56, 57, 57, 58, 58, 59, 59, 60, 61, 61, 62, 62, 62, 64, 64, 65, 65, 65, 75, 75, 82, 83, 83, 84, 84, 84, ...(w.gov == "Democracy" ? [5, 6, 19, 20, 55, 60, 61, 62, 65, 75, 84] : [10, 10, 11, 11, 11, 12, 12, 12, 38, 39, 39, 40, 40, 68, 69, 69, 70, 70, 85, 85, 87, 87, 88, 88, 89, 89, 91, 91, 91])];
	if (w.focus == "Slum") set = [2, 16, 17, 18, 23, 23, 24, 24, 25, 25, 26, 34, 36, 36, 41, 42, 53, 53, 53, 54, 59, 67, 67, 72, 72, 92, 92, ...(w.gov == "Democracy" ? [3, 4, 26, 73, 73] : [2, 23, 27, 28, 37, 37, 37, 38, 38, 38, 39, 39, 40, 68, 68, 69, 69, 69, 70, 70, 70])];
	if (w.focus == "Cultural") set = [3, 4, 5, 7, 8, 9, 10, 11, 12, 19, 19, 20, 20, 21, 33, 33, 36, 36, 57, 58, 59, 60, 61, 63, 64, 64, 65, 67, 67, 73, 74, 77, 83].concat(w.gov == "Democracy" ? [6, 9, 12, 21, 65, 75, 84] : [2, 8, 11, 18, 68, 68, 69, 70, 87, 87, 88, 88, 89, 89, 91, 91]);
	if (w.focus == "Prison") set = [2, 16, 23, 24, 25, 26, 36, 41, 59, 72, 92, 92, 92, ...(w.gov == "Democracy" ? [26, 36, 59] : [23, 41, 72])];
	if (w.focus == "Frontier") set = [2, 3, 4, 18, 18, 29, 29, 33, 42, 54, 54, 63, 73, 73, 74, 74, 78, 81, 92, 92, 94, 94, ...(w.gov == "Democracy" ? [3, 4, 19, 20, 23, 33, 55, 64, 79, 82] : [27, 37, 37, 38, 38, 39, 68, 72, 72])];
	if (w.focus == "Mixed") {
		set = [17, 18];
		for (const i of times(6 - (w.name.length + seed) % 4)) {
			if (mixedGoods.length < 1) mixedGoods = fillMixedArray();
			set.push(mixedGoods.splice(rnd(mixedGoods.length) - 1, 1)[0]);
		}
		set.push(...(arr.some(v => v > 16 && v < 22) ? [rnd([16, 41, 59]), rnd([16, 41, 59])] : [18, 19, 20, w.gov == "Democracy" ? 21 : 17]));
	}
	if (w.gov == "Military") {
		if (![37, 38, 39, 40].some(v => arr.includes(v))) set.push(37, 37, 38, 38, 39, 39, 40, 40);
		if (![13, 14, 15].some(v => arr.includes(v))) set.push(13, 14, 15, 15);
	}
	buildArray(-1);
	
	// Set illegal goods
	set = illegalGoods(w.gov);
	buildArray(0);
	return arr;
}

function fillMixedArray() {
	const a = [...Array(93)].map((v, i) => i);	// All goods except waste & water
	a.splice(80, 1); // radioactive waste
	a.splice(71, 1); // packages
	a.splice(59, 1); // lumber
	a.splice(35, 1); // artifacts
	a.splice(22, 1); // datavaults
	return a
}

function illegalGoods(gov) {
	return ({"Corporate": [27, 28, 37, 38, 39, 40, 68, 69, 70],
		"Democracy": [10, 11, 12, 13, 14, 15, 27, 28, 37, 38, 39, 40, 68, 69, 70, 85, 86, 87, 88, 89, 90, 91],
		"Feudal": [27, 28, 69, 70],
		"Military": [67, 68, 69, 70],
		"Theocracy": [27, 28, 53, 54, 55, 60, 61, 62, 67, 68, 69, 70, 81, 82, 83, 84, 91]})[gov] || [];
}

// will need reworking along with whole ship array storage method
function goodsPerish() {
	for (const x of times(ship.length)) {
		for (const y of times(ship[0].length)) {
			const s = ship[x][y];
			if (s.room == 'cargohold' && s.name) {
				if (s.config != 'cold' && s.stat == 'cold') {
					if (s.name == 'Liquid Oxygen') {
						displayCanvas('ship');
						explosion(x, y);
						setTimeout(_ => {removeCargo(x, y)}, 3000);	// *switch to fade out graphic
					} else if (time.full - s.time > 6 + rnd(6)) {
						//addCargo (JSON.parse(JSON.stringify(goods[93])), x, y, s.price, s.dest, s.origin);
						addCargo(Object.create(goods[93]), x, y, s.price, s.dest, s.origin);
					}
				}
				if (s.config != 'live' && s.stat == 'live') addCargo(Object.create(goods[29]), x, y, s.price, s.dest, s.origin);
			}
		}
	}
}



// --- NOT USED ---

/*
// Called by 'loadAllFiles()' for each line of 'goods.txt' --> Not used: Easier to store goods as properly marked up JS array
function processGoodsFile(data) {
	const g = data.split(",");
	const prev = goods.length > 0 ? goods[goods.length - 1] : { name: "No previously defined good" };
	return { name: g[0] || prev.name, type: g[1] || "assorted", grade: g[2] || prev.grade, price: g[3] || prev.price, demand: g[4] || prev.demand, produce: g[5] || prev.produce, stat: g[6] || prev.stat, file: g[7] || prev.file, desc: g[8] || prev.desc };
}
*/

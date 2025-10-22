const goods = [																			// M, Ag | I, T | Af, S, C, HT, Mx | P, F
	{ name: "Air Processors", grade: 1, type: "Certibrand", file: "air-processors", price: 1500, produce: "Ma", demand: "Mi T", tag: "Turning dust and exhaust into breathable futures.", desc: "Industrial-scale atmospheric processors used to sustain life on hostile worlds and deep-space mining stations. Each unit filters toxins, stabilizes pressure, and extracts oxygen from trace gases. The quiet backbone of frontier expansion—unseen, essential, and always one malfunction away from extinction." },	//0) I -> T3, F2, P2, M2, I1
	{ name: "Air Processors", grade: 2, type: "Boreatek", file: "air-processors", price: 2500, produce: "Ma", demand: "Mi T" },	// I -> T3, F2, M2, I1
	{ name: "Animal Meat", grade: 1, type: "Bio-Engineered", file: "animal-meat", price: 1500, stat: 'cold', produce: "Ag F", demand: "C H I Ma Mi T", tag: "Still legal.", desc: "Cultured or slaughtered animal protein. Genuine livestock meat commands high prices on frontier worlds and among elites nostalgic for pre-industrial Earth diets." },	//7) Ag -> Af1, *1	(!)
	{ name: "Animal Meat", grade: 2, type: "Terran", file: "animal-meat", price: 2500, stat: 'cold', produce: "Ag F", demand: "Af C H I Ma Mi T" },				// Ag -> Af2,		(!)
	{ name: "Animal Meat", grade: 3, type: "Lacotian", file: "animal-meat", price: 4500, stat: 'cold', produce: "Ag F", demand: "Af C H Ma (T)" },				// Ag -> Af3, 		(!)
	{ name: "Animal Skins", grade: 1, type: "Bio-Engineered", file: "animal-skins", price: 5000, produce: "Ag F", demand: "Af C", tag: "The oldest luxury, still warm from the source.<br><i>Illegal on democratic worlds.</i>", desc: "Processed furs, leathers, and exotic hides. Once a status symbol, now mostly sourced from bio-cloned fauna or off-world feral reserves. Banned on democratic and theocratic worlds for ethical reasons." }, //10) Ag -> Af2	!
	{ name: "Animal Skins", grade: 2, type: "Terran", file: "animal-skins", price: 7500, produce: "Ag F", demand: "Af C" },	// Ag -> Af3	!
	{ name: "Animal Skins", grade: 3, type: "Lacotian", file: "animal-skins", price: 12500, produce: "Ag F", demand: "Af C" },							// Ag -> Af3	!
	{ name: "Atmospheric Catalysts", grade: 1, type: "Centauri", file: "atmo-catalysts", price: 4000, stat: "dangerous", produce: "I", demand: "Af H Ma T", tag: "Terraforming reagents. Handle with extreme care.", desc: "Specialized chemical and nanobiotic reagents designed to trigger large-scale atmospheric reactions. Used to seed breathable air, accelerate carbon capture, or generate precipitation on frontier worlds. Essential for colonization and climate regulation, but dangerously unstable outside controlled deployment. Misused or uncalibrated, they can rewrite a planet's climate in weeks — with results not always compatible with human life." },
	{ name: "Atmospheric Catalysts", grade: 2, type: "Rainline", file: "atmo-catalysts", price: 18000, stat: "dangerous", produce: "I", demand: "Ma T" },
	{ name: "Automobiles", grade: 1, type: "Eagle", file: "automobiles", price: 2500, stat: 'sensitive', produce: "Ma", demand: "Ag F H Mi I P S (C)", tag: "Ground transport, wherever there's still ground.", desc: "Personal and commercial land vehicles adapted for planetary terrain — from wheeled haulers to hovercraft. Popular on terraformed worlds with stable atmospheres; largely ceremonial elsewhere." },	//2) I -> S3, C2, *1 
	{ name: "Automobiles", grade: 2, type: "Geotech", file: "automobiles", price: 4000, stat: 'sensitive', produce: "Ma", demand: "Ag C F H Mi I (S)" },			// I -> Af1, S1, C3, *1
	{ name: "Automobiles", grade: 2, type: "5-Star", file: "automobiles", price: 4000, stat: 'sensitive', produce: "Ma", demand: "Ag C F H Mi I (S)" },			// I -> Af1, S1, C3, *1
	{ name: "Automobiles", grade: 3, type: "Mechanica", file: "automobiles", price: 5500, stat: 'sensitive', produce: "Ma", demand: "Af C H" },		// I -> Af2, C2
	{ name: "Automobiles", grade: 4, type: "Eunion", file: "automobiles", price: 8000, stat: 'sensitive', produce: "Ma", demand: "Af H (C)" },			// I -> Af3, C1
	{ name: "Bacteria Farms", grade: 1, type: "AmritJivan", file: "bacteria-farms", price: 3000, stat: 'dangerous', produce: "I", demand: "Military H T", tag: "Feed worlds. End worlds. Same technology.<br><i>Military worlds will demand them.<br>Illegal on democratic worlds.</i>", desc: "Self-contained bioreactors cultivating microbial cultures that convert biomass into food, fuel, or pharmaceuticals. But their real value lies in weaponized biology: programmable strains designed for sterilization, siege, or ecosystem collapse. Bacterial farms are the backbone of the interstellar bioweapons trade—regulated in name only, and a strategic necessity for every militarized world. Officially banned on democratic planets, unofficially indispensable to the economies that defend them." },	//13) HT? -> HT, Military	!		? stat: 'live' ?
	{ name: "Bacteria Farms", grade: 2, type: "Astromedica", file: "bacteria-farms", price: 5000, stat: 'dangerous', produce: "I", demand: "Military H T" },// -> HT	!
	{ name: "Bacteria Farms", grade: 3, type: "Aegis", file: "bacteria-farms", price: 7000, stat: 'dangerous', produce: "I", demand: "Military H" },	// -> HT	!
	{ name: "Chemicals", type: "assorted", file: "chemicals", price: 500, stat: 'sensitive', produce: "Mi T (F)", demand: "H I P S", tag: "Every colony runs on something volatile.", desc: "Industrial reagents, solvents, and compounds for refining, manufacturing, or scientific use. Dangerous in bulk, indispensable everywhere. Some double as illicit precursors in the right hands." },	//16) M -> I3, HT2, Af1, S1, Mx1, P1, C1
	{ name: "Consumer Goods", grade: 1, type: "Eagle", file: "consumer-goods", price: 1000, produce: "C H P (Af F)", demand: "I Ma Mi S T", tag: "Everything you don't need, but want.", desc: "The galaxy's endless tide of everyday convenience items — clothing, appliances, comfort tech. Produced by countless subsidiaries of the major megacorps; disposable, replaceable, unavoidable." },	//17) I, HT, Af, S, C, Mx, P -> *1
	{ name: "Consumer Goods", grade: 2, type: "Nanoworks", file: "consumer-goods", price: 2000, produce: "H P (Af)", demand: "C F I Ma Mi S T" },						// -> *1
	{ name: "Consumer Goods", grade: 3, type: "Mitsutomo", file: "consumer-goods", price: 4000, produce: "S (Af P)", demand: "C H Ma (F T)" },
	{ name: "Consumer Goods", grade: 3, type: "Tsai", file: "consumer-goods", price: 4000, produce: "S (Af P)", demand: "Af C H (F T)" },
	{ name: "Consumer Goods", grade: 4, type: "Polis", file: "consumer-goods", price: 5000, produce: "S (Af)", demand: "Af C H" },
	{ name: "Data Vaults", type: "secure", file: "datavaults", price: 5000, stat: 'sensitive', produce: "*", demand: "*", tag: "Knowledge has weight.<br><i>Data vaults are not traded on the market.</i>", desc: "Secure data cores and archival drives storing research, records, and cultural memory. Invaluable for colony development and historical reconstruction — and highly sought after by intelligence brokers." },	//22) *
	{ name: "Deuterium Cells", type: "commercial", file: "hydrogen", price: 200, produce: "I", demand: "Af F S", tag: "Stable power for unstable worlds.", desc: "Compact fusion-grade energy cells powered by deuterium or advanced isotopes. Standard propulsion fuel for interplanetary vehicles; volatile but efficient." },	//42) I -> *
	{ name: "Electronics", grade: 1, type: "Yuntai", file: "electronics", price: 2000, produce: "H", demand: "I P S", tag: "Circuits make the stars go round.", desc: "Processors, sensors, communication modules, and interface tech. Found in everything from spacecraft to household utilities. Essential imports for low-tech colonies and independent miners." },  //23) HT -> I1, Af3, HT1
	{ name: "Electronics", grade: 2, type: "Microtronic", file: "electronics", price: 3000, produce: "H", demand: "P S" },
	{ name: "Electronics", grade: 2, type: "5-Star", file: "electronics", price: 3000, produce: "H", demand: "P S" },
	{ name: "Electronics", grade: 3, type: "Omninet", file: "electronics", price: 4000, produce: "H", demand: "P S" },
	{ name: "Explosives", grade: 1, type: "Industrial", file: "explosives", price: 5000, stat: 'dangerous', produce: "I", demand: "F Mi S T", tag: "Progress, accelerated.<i>Illegal on all but military and lawless worlds.</i>", desc: "Controlled detonants for mining, construction, and weaponry. Industrial grades are widely used in asteroid harvesting; military variants are heavily regulated or outright banned on peaceful worlds." },			//27) I -> M, I, S, T		!
	{ name: "Explosives", grade: 2, type: "Large Scale", file: "explosives", price: 8000, stat: 'dangerous', produce: "I", demand: "S T" },	// I -> !
	{ name: "Fertilizer", type: "multinutrient", file: "fertilizer", price: 200, stat: 'dangerous', produce: "I", demand: "Ag F T", tag: "The secret to life, in bulk shipment form.", desc: "Chemical and organic nutrient blends sustaining off-world agriculture. Includes treated biosludge from recycling plants and engineered soil conditioners for non-terrestrial crops." },	//29) Ag, I, *? -> Ag, T, F, 
	{ name: "Farming Equipment", grade: 1, type: "Boreatek", file: "farming-equipment", price: 1500, produce: "Ma", demand: "Ag T", tag: "Harvest-ready, from soil to sky.", desc: "Mechanized agricultural systems designed for alien soil, artificial gravity, and hydroponic cycles. From orbital greenhouse drones to autonomous tillers, these machines feed the galaxy. Their hum is the sound of civilization persisting through vacuum and drought alike." },	//30) I -> Ag
	{ name: "Farming Equipment", grade: 2, type: "Veridian", file: "farming-equipment", price: 2500, produce: "Ma", demand: "Ag T" },
	{ name: "Farming Equipment", grade: 3, type: "Geotech", file: "farming-equipment", price: 3500, produce: "Ma", demand: "Ag (T)" },
	{ name: "Fruit & Vegetables", type: "assorted", file: "vegetables", price: 1000, stat: 'cold', produce: "Ag", demand: "Af C F H Ma T", tag: "A galaxy of varieties.", desc: "Perishable produce from hydroponic or planetary farms. Often imported frozen or sealed; vital morale boosters in long-term colonies where greenery is scarce." },		//33) Ag -> *
	{ name: "Gemstones", type: "assorted", file: "gemstones", price: 100000, produce: "Mi", demand: "Af Ma S", tag: "Shiny proof that scarcity still sells.", desc: "Precious and synthetic stones mined or fabricated across the galaxy. Mostly decorative, occasionally industrial, and used in energy weapon production. Value fluctuates wildly with fashion and scarcity propaganda." },	//34) M -> I, Af
	{ name: "Gene Stock", grade: 1, type: "Cultivar", file: "gene-stock", price: 2500, stat: "live", produce: "Ag", demand: "Af C F H Ma T", tag: "DNA on demand.", desc: "Encoded genetic material ranging from agricultural seed libraries to synthetic human and animal genomes. Critical to off-world agriculture and medical research, yet often subject to strict licensing or bio-ethical bans." },
	{ name: "Gene Stock", grade: 2, type: "Enhanced", file: "gene-stock", price: 12000, stat: "live", produce: "Ag H", demand: "Af C F I Ma T" },
	{ name: "Gene Stock", grade: 3, type: "Restricted", file: "gene-stock", price: 45000, stat: "live", produce: "H", demand: "Af C I Ma" },
	{ name: "Government Artifacts", type: "priceless", file: "artifacts", price: 100000, stat: 'sensitive', produce: "*", demand: "Af", tag: "The past trades better than the future.<br><i>Government artifacts are usually only available on the black market.</i>", desc: "Rare relics and recovered materials from lost colonies or pre-expansion civilizations. Legal status varies widely; some worlds treat them as heritage, others as contraband." },	//35) * -> Af, C		(!)
	{ name: "Grain", type: "assorted", file: "grain", price: 300, produce: "Ag (F)", demand: "Af C H Ma P S", tag: "Breadbasket of the void.", desc: "Staple food crop exports like wheat, soy, or engineered grains. Transported in bulk to sustain colony populations or used as feedstock for livestock, synthetic foods, and ethanol production." },	//36) Ag -> *
	{ name: "Hand Weapons", grade: 1, type: "Cyberops", file: "hand-weapons", price: 5500, produce: "Ma", demand: "Military F S", tag: "Democracy's worst argument.<br><i>Military worlds will demand them.<br>Illegal on corporate and democratic worlds.</i>", desc: "Small arms, blades, and directed-energy sidearms—personal defence for some, profit centre for others. Built in the same factories that assemble industrial tools, their design speaks of humanity’s endless need to carve authority into metal. They travel everywhere, whether declared or not." },	//37) I, S -> Military, *		!
	{ name: "Hand Weapons", grade: 2, type: "Forge", file: "hand-weapons", price: 6500, produce: "Ma", demand: "Military Af F S" },
	{ name: "Hand Weapons", grade: 3, type: "Aegis", file: "hand-weapons", price: 8500, produce: "Ma", demand: "Military Af F S" },
	{ name: "Hand Weapons", grade: 4, type: "Eagle", file: "hand-weapons", price: 10500, produce: "Ma", demand: "Military Af S" },
	{ name: "Heavy Plastics", type: "assorted", file: "plastics", price: 1000, produce: "I", demand: "S P", tag: "The bones of the built world.", desc: "Dense structural polymers used in construction, ship hulls, and environmental seals. Derived from petrochemical or biomass sources; prized for durability and recyclability." },	//41) I -> I, HT, Af, S, C, Mx, P
	{ name: "Hypdroponic Farms", grade: 1, type: "AmritJivan", file: "hydroponic-farms", price: 2000, stat: 'live', produce: "Ag", demand: "H T", desc: "Designer plants and drug components." },	//43) Ag, Ocean -> HT *
	{ name: "Hypdroponic Farms", grade: 2, type: "Centauri", file: "hydroponic-farms", price: 2800, stat: 'live', produce: "Ag", demand: "H T" },
	{ name: "Hypdroponic Farms", grade: 3, type: "Veridian", file: "hydroponic-farms", price: 4000, stat: 'live', produce: "(Ag)", demand: "Af H T" },
	{ name: "Industrial Equipment", grade: 1, type: "Forge", file: "industrial-equipment", price: 1500, produce: "I", demand: "Ma Mi", tag: "Tools that move mountains — literally.", desc: "Machinery for extraction, refining, and large-scale fabrication. Includes drills, presses, and automated assembly rigs. Core import for frontier colonies and mining installations." },	 //46) I -> I, M
	{ name: "Industrial Equipment", grade: 2, type: "Mechanica", file: "industrial-equipment", price: 2500, produce: "I", demand: "Ma Mi" },
	{ name: "Industrial Equipment", grade: 3, type: "Boreatek", file: "industrial-equipment", price: 3500, produce: "I", demand: "Ma Mi" },
	{ name: "Industrial Goods", grade: 1, type: "Forge", file: "industrial-goods", price: 3000, produce: "Ma", demand: "H", tag: "Half-finished things that make finished things.", desc: "Processed materials and intermediate products such as alloys, composites, and machine parts. The bloodstream of interstellar manufacturing economies." },	//49) I -> I, HT
	{ name: "Industrial Goods", grade: 2, type: "Mechanica", file: "industrial-goods", price: 4500, produce: "Ma", demand: "H" },
	{ name: "Iron Ore", type: "assorted", file: "iron-ore", price: 500, produce: "Mi T (P)", demand: "I", tag: "Heavy, cheap, indispensable.", desc: "Raw ferrous rock mined from planetary crusts and asteroids. Smelted into structural steel or specialized alloys. Bulk freight rates depend on proximity to refineries." },	 //51) M -> I
	{ name: "Liquid Oxygen", type: "cryogenic", file: "oxygen", price: 200, stat: 'cold', produce: "I", demand: "Ma T", tag: "Cold, volatile, vital.<br><i>Will explode if not kept in cold storage.</i>", desc: "Cryogenic oxidizer used in life-support systems, fuel production, and industrial reactions. Requires dedicated cold storage; improper handling leads to explosive results." },							//52) *I -> I, T, HT
	{ name: "Liquor", grade: 1, type: "Assorted New", file: "liquor", price: 1500, produce: "Ag F", demand: "H I Ma Mi S", tag: "Because judgement is overrated.<br><i>Illegal on theocratic worlds.</i>", desc: "Distilled indulgence in liquid form—spirits, wines, brews, and everything fermented in between. Still banned in theocracies and wherever sound judgement is required, but indispensable to celebration, negotiation, and regret." },	//53) S, Af, C -> *		!
	{ name: "Liquor", grade: 2, type: "Assorted Aged", file: "liquor", price: 5500, produce: "Ag F", demand: "Af F H I Ma S" },
	{ name: "Liquor", grade: 3, type: "Doleamas", file: "liquor", price: 20000, produce: "Af C (Ag)", demand: "Af H (F)" },	
	{ name: "Live Animals", grade: 1, type: "Bio-Engineered", file: "live-animals", price: 10000, stat: 'live', produce: "Ag F", demand: "Af Ag T", tag: "Breathing investments.<br><i>Agricultural worlds demand the animals they do not produce.<br>Requires life support.</i>", desc: "Livestock or exotic species transported for breeding, study, or consumption. Expensive to ship and risky to insure, yet vital to maintaining planetary biospheres." },	//56) Ag -> Af, C		!
	{ name: "Live Animals", grade: 2, type: "Terran", file: "live-animals", price: 15000, stat: 'live', produce: "Ag F", demand: "Af Ag C T" },
	{ name: "Live Animals", grade: 3, type: "Lacotian", file: "live-animals", price: 25000, stat: 'live', produce: "Ag F", demand: "Af Ag C T" },
	{ name: "Lumber", type: "cut", file: "lumber", price: 300, produce: "Ag, Mi, P, S (Rocky, Desert)", demand: "Af, Ag, C, P, S", tag: "Because steel doesn’t smell right.<br><i>Produced on most rocky and desert worlds.</i>", desc: "Timber harvested from planetary forests or bioengineered groves. Still valued for construction, furniture, and nostalgia — especially in habitats starved for natural texture." },		//59) Rocky -> *
	{ name: "Luxury Goods", grade: 1, type: "Polis", file: "luxury-goods", price: 10000, produce: "Ma S (Af)", demand: "Af C H", tag: "Proof that taste is always for sale.<br><i>Illegal on theocratic worlds.</i>", desc: "High-value, non-essential consumer items — jewellery, art, designer cybernetics. A symbol of wealth and excess across every system. Contraband on theocracies and subject to steep tariffs elsewhere." },	//60) HT, I, Af, S, C, Mx -> Af
	{ name: "Luxury Goods", grade: 2, type: "Eunion", file: "luxury-goods", price: 15000, produce: "H Ma S (Af)", demand: "Af C (H)" },
	{ name: "Luxury Goods", grade: 3, type: "ICP", file: "luxury-goods", price: 35000, produce: "C H Ma S (Af)", demand: "Af" },
	{ name: "Medicine", grade: 1, type: "Tsai", file: "medicine", price: 5000, produce: "H", demand: "Ag C F I Ma T", tag: "Survival, standardized.", desc: "Pharmaceuticals, medkits, and biotech treatments. Manufactured by corporate labs under tightly held patents. A lucrative trade, legal or otherwise, in every system." },	//63) HT -> *		? stat: 'cold' ?
	{ name: "Medicine", grade: 2, type: "Centauri", file: "medicine", price: 6500, produce: "H", demand: "Af C I Ma (Ag F T)" },
	{ name: "Medicine", grade: 3, type: "Astromedica", file: "medicine", price: 8000, produce: "H", demand: "Af C" },
	{ name: "Minerals", type: "assorted", file: "minerals", price: 300, produce: "Mi T (P)", demand: "I", desc: "Generic non-ferrous minerals such as bauxite, copper, and lithium. Feedstock for industrial production and power storage. Easily sourced production need that's always in motion along the trade lanes." },	 //66) M, T -> I
	{ name: "Narcotics", grade: 1, type: "Minor", file: "narcotics", price: 5000, produce: "Ag (F)", demand: "C I Ma Mi S", tag: "Pleasure, profit, or poison.<br><i>Illegal on all but lawless worlds, although corporate and democratic worlds will allow minor narcotics and feudal worlds will also allow hallucinogenic narcotics.</i>", desc: "Chemical and biological recreational substances. “Minor” varieties are tolerated in some corporate zones; “major” narcotics remain illicit and highly profitable on nearly all worlds." },	//67) HT -> *		!
	{ name: "Narcotics", grade: 2, type: "Hallucinogenic", file: "narcotics", price: 8000, produce: "H", demand: "Af C F I Ma Mi S" },
	{ name: "Narcotics", grade: 3, type: "Heavy", file: "narcotics", price: 10000, produce: "H", demand: "Af C Ma S" },
	{ name: "Narcotics", grade: 4, type: "Psychotropic", file: "narcotics", price: 14000, produce: "H", demand: "Af C S" },
	{ name: "Packages", type: "assorted", file: "packages", price: 500, produce: "*", demand: "*", tag: "Everything else.<br><i>Packages are specific to customers and are not traded on the market.</i>", desc: "Catch-all cargo category: parcels, mail, micro-deliveries. Often used to disguise higher-value contraband or corporate espionage transfers under legitimate freight manifests." },	//71) *
	{ name: "Perishable Goods", grade: 1, type: "MilkyWay", file: "perishable-goods", price: 1000, stat: 'cold', produce: "Ag C (Af F)", demand: "F H I Ma Mi P S T", tag: "Delicious & Nutricious: Packaged.", desc: "Basic consumables produced on nearly every settled world. Low-grade shipments include processed nutrient paste for long voyages, while premium exports feature rare spices and delicacies from controlled climates." },	//72) I, Af, S, C, Mx -> *
	{ name: "Perishable Goods", grade: 2, type: "5-Star", file: "perishable-goods", price: 1500, stat: 'cold', produce: "S (Af)", demand: "F H I Ma Mi T" },
	{ name: "Perishable Goods", grade: 2, type: "Veridian", file: "perishable-goods", price: 1500, stat: 'cold', produce: "S (Af)", demand: "F H I Ma Mi T" },
	{ name: "Perishable Goods", grade: 3, type: "Tsai", file: "perishable-goods", price: 2000, stat: 'cold', produce: "S (Af)", demand: "Af H Ma (C T)" },
	{ name: "Petroleum", type: "light", file: "petroleum", price: 500, produce: "Mi (F)", demand: "I", tag: "Black gold.", desc: "Crude and refined hydrocarbons from fossil or synthetic origins. Valued for chemical production and legacy engines. An archaic but stubbornly persistent resource economy." },	//76) M -> I
	{ name: "Precious Metals", type: "assorted", file: "precious-metals", price: 10000, produce: "F Mi", demand: "C H Ma", tag: "Actual gold.", desc: "Gold, platinum, palladium, and other high-value metals used in electronics, banking, and ornamentation. The old money of a new age." },  //77) M -> I, HT
	{ name: "Probes", grade: 1, type: "Omninet", file: "probes", price: 2500, produce: "H", demand: "F Mi T", tag: "The explorers you can afford to lose.", desc: "Automated drones mostly used in mining, planetary survey, navigation mapping, or research. Disposable, but indispensable. A single lost probe can start a gold rush—or a scandal." },  //78) HT -> T, M
	{ name: "Probes", grade: 2, type: "Forge", file: "probes", price: 4000, produce: "H", demand: "Mi T (F)" },
	{ name: "Radioactive Waste", type: "assorted", file: "radioactives", price: 500, stat: 'dangerous', produce: "*", demand: "None", tag: "Someone else's problem, until it isn't.<br><i>Produced by industrial processes and some damaged goods. Must pay to have them disposed of.</i>", desc: "Spent reactor fuel and fission byproducts. Legally restricted, illegally dumped, occasionally weaponized. Handling requires specialized containment and a disregard for self-preservation." },				//80) I, HT -> !
	{ name: "Robots", grade: 1, type: "Cyberops", file: "robots", price: 4000, stat: 'dangerous', produce: "H Ma", demand: "Ag F I Mi T", tag: "Workers who never ask for pay.<br><i>Illegal on theocratic worlds.</i>", desc: "Autonomous mechanical units for industrial, domestic, or security purposes. Range from cheap utility drones to high-end adaptive AIs. Banned on theocracies due to moral prohibitions on synthetic life." },	//81) HT -> M, Ag, I, T, Af
	{ name: "Robots", grade: 2, type: "Microtronic", file: "robots", price: 6000, stat: 'dangerous', produce: "H", demand: "Af Ag I Ma Mi T (F)" },
	{ name: "Robots", grade: 3, type: "Nanoworks", file: "robots", price: 8000, stat: 'dangerous', produce: "H", demand: "Af C Ma" },
	{ name: "Robots", grade: 4, type: "Mitsutomo", file: "robots", price: 10000, stat: 'dangerous', produce: "H", demand: "Af (C)" },
	{ name: "Slaves", grade: 1, type: "Child", file: "slaves", price: 5000, stat: 'live', produce: "F S", demand: "Af I", tag: "Property, redefined.<br><i>Illegal on democratic worlds. Luxorian slaves illegal on theocratic worlds.</i>", desc: "Living cargo traded across less-regulated systems. Encompasses everything from indentured labour to bio-engineered servitude. Legal status varies — and often depends on who owns the system." }, //85) S, P -> M, Ag, I, T, Af
	{ name: "Slaves", grade: 2, type: "Uneducated", file: "slaves", price: 7500, stat: 'live', produce: "F P S", demand: "Ag I Ma Mi" },
	{ name: "Slaves", grade: 3, type: "Bonded", file: "slaves", price: 15000, stat: 'live', produce: "F P S", demand: "Af Ag C H I Ma Mi T" },
	{ name: "Slaves", grade: 4, type: "Bio-Engineered", file: "slaves", price: 25000, stat: 'live', produce: "H P S", demand: "Ag I Mi T" },
	{ name: "Slaves", grade: 5, type: "Luxorian", file: "slaves", price: 50000, stat: 'live', produce: "S", demand: "Af C H" },	// Special Supply -> 
	{ name: "Synthetic Meat", type: "assorted", file: "synthetic-meat", price: 1000, stat: 'cold', produce: "H", demand: "F I Ma Mi P S T", tag: "Lab-grown, guilt optional.", desc: "Engineered protein grown from cultured cells. Tastes <i>almost</i> as good as the real thing. Cheap, sustainable, and nutritionally perfect—but critics claim long-term consumption dulls taste receptors and memory alike." },	//92) HT? -> *
	{ name: "Waste Products", type: "assorted", file: "waste-products", price: 50, produce: "*", demand: "None", tag: "Everything has an afterlife.<br><i>Produced by industrial processes, large populations, and damaged goods. Must pay to have them disposed of.</i>", desc: "Industrial runoff, biological residue, and other byproducts of production. Officially recycled, unofficially exported. Some colonies make fortunes cleaning up what others discard." },		//93) Af, C, Mx, HT -> *
	{ name: "Water", type: "fresh", file: "water", price: 100, stat: 'sensitive', produce: "H Mi P (Ice, Ocean)", demand: "F T", tag: "The lifeblood of the galaxy.", desc: "Processed or harvested water from asteroids, comets, or reclamation plants. The basis of life and trade — measured, taxed, and fought over since before the first launch." }	//94) Ocean, Ice -> T, F
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
			
	if (query == "illegal") return [...illegals, goods.findIndex(v => v.name == "Packages")].map(v => Object.create(goods[v]));	// Return illegal goods and packages
	const suppliedGoods = world[loc].goods.map(v => (v.supply > 0 && v.stat != "illegal") ? v.type + v.name : 0);
	const uniqueGoods = ["Data Vaults", "Government Artifacts", "Packages"];
	return goods.map(v => Object.create(v)).reduce((t, v, i) => suppliedGoods.includes(v.type + v.name) ||	// Skip supplied goods
		(v.price > 9999 && p.rep < 80) ||	// Skip expensive goods if not high rep
		(v.price > 4999 && p.rep < 60) ||	// Skip moderate goods if low rep
		(v.price < 5000 && p.rep > 79) ||	// Skip cheap goods if high rep
		v.name == "Radioactive Waste" || v.name == "Waste Products" ||		// Skip wastes
//		i == 80 || i == 93 ||		// Skip wastes
//		Basic goods: Chemicals, Grain, Deuterium Cells, Iron Ore, Liquid Oxygen, Lumber, Minerals, Petroleum, Synthetic Meat, Water
		(query != "extended" && ["Chemicals", "Grain", "Deuterium Cells", "Iron Ore", "Liquid Oxygen", "Lumber", "Minerals", "Petroleum", "Synthetic Meat", "Water"].includes(v.name)) ||		// Skip basic goods
//		(query != "extended" && [16, 36, 42, 51, 52, 59, 66, 76, 92, 94].includes(i)) ||	// Skip basic goods
		(query == "legal" && illegals.includes(i)) ||	// Skip illegal goods on "legal" query
//		(query == "general" && [22, 35, 71].includes(i)) ? t :	// Skip unique goods on "general" query
		(query == "general" && uniqueGoods.includes(v.name)) ? t :		// Skip unique goods on "general" query
			[...t, ...uniqueGoods.includes(v.name) ? new Array((v.name == "Government Artifacts" && world[loc].focus == "Cultural") ? 15 : 5).fill(Object.assign(v, { id: `${(Math.floor(seed / (world[loc].notices.length + 1) + time.full) % 1679616).toString(36).toUpperCase()}-${("00" + rnd(999)).slice(-3)}` })) : [v]], []);
}

// Only called once per world during world creation
function worldGoods(w) {
	const arr = [];
	let mixedGoods = [];
	let set = [];
	
	// Helper: find all indices for a given list of good names
	//const byName = (...names) => goods
	//	.map((v, i) => names.includes(v.name) ? i : -1)
	//	.filter(i => i >= 0);
	const byName = (...names) => goods.reduce((t, v, i) => names.includes(v.name) ? [...t, i] : [...t], []);

	// Helper: find index by name & optional type
	const findGood = (name, type) => goods.findIndex(v => v.name === name && (!type || v.type === type));
	
	function buildArray(sd) {
		for (const g of set) {
			const existing = arr.findIndex(v => v.name === goods[g].name && v.type === goods[g].type);
			if (existing > -1 && sd !== 0) {
				arr[existing].supply += sd;
			} else {
				const newGood = Object.create(goods[g]);
				newGood.supply = sd;
				if (sd === 0) newGood.stat = 'illegal';
				arr.push(newGood);
			}
		}
	}

	// --- Set supplied goods based on world focus ---
	switch (w.focus) {
		case "Mining":
			set = byName("Chemicals", "Gemstones", "Iron Ore", "Minerals", "Petroleum", "Precious Metals");
			set.push(rnd(set), rnd(set), rnd(set), rnd(byName("Chemicals", "Gemstones", "Iron Ore")), rnd(byName("Minerals", "Petroleum", "Precious Metals")));
			break;

		case "Agricultural":
			set = byName("Fruit & Vegetables", "Grain", "Hydroponic Farms", "Liquor", "Narcotics", "Perishable Goods");

			const animalVariety = (seed + world.filter(v => ["Agricultural", "Frontier"].includes(v.focus)).length) % 3;
			const animal = goods.reduce((t, v, i) => v.name.includes("Animal") && v.type === animalVariety ? [...t, i] : [...t], []);
			const fruit = findGood("Fruit & Vegetables");
			const grain = findGood("Grain");
			const liquor1 = findGood("Liquor", "assorted new");
			const liquor2 = findGood("Liquor", "assorted aged");
			set.concat(rnd([animal, fruit, grain]), 
					   rnd([animal, fruit, grain]), 
					   rnd([animal, fruit, grain]), 
					   w.gov === "Democracy" ? [findGood("Hydroponic Farms", "Centauri"), findGood("Hydroponic Farms", "Veridian"), findGood("Liquor", "assorted aged"), findGood("Liquor", "Doleamas"), findGood("Perishable Goods", "MilkyWay")] : 
											   [grain, findGood("Hydroponic Farms", "AmritJivan"), liquor1]);
			set.push(...byName("Fruit & Vegetables", "Grain"), findGood("Hydroponic Farms", "Centauri"), findGood("Liquor", "assorted new"), findGood("Liquor", "assorted aged"), findGood("Narcotics", "Minor"));
			
			if (w.type === "Ocean") set.push(...byName("Hydroponic Farms"));
			if (w.govdesc === "Veridian") set.push(findGood("Hydroponic Farms", "Veridian"));
			if (w.govdesc === "Doleamas") set.push(findGood("Liquor", "Doleamas"));
			if (w.gov === "Corporate") set.push(findGood("Narcotics", "Minor"), findGood("Narcotics", "Minor"));
			break;
						// [["Animal Meat", "Animal Skins", "Live Animals"], [], []]
			set = [[7, 10, 56], [8, 11, 57], [9, 12, 58]][(seed + world.filter(v => ["Agricultural", "Frontier"].includes(v.focus)).length) % 3];
			// ["Fruit & Vegetables", "Grain", "Hydroponic Farms" (grade 2), "Liquor" (grade 1), "Liquor" (grade 2), "Narcotics" (grade 1), "Perishable Goods" (grade 1)]			["Hydroponic Farms" (grade 2), "Hydroponic Farms" (grade 3), "Liquor" (grade 2), "Liquor" (grade 3), "Perishable Goods" (grade 1)] : ["Grain", "Hydroponic Farms" (grade 1), "Liquor" (grade 1)]
			set = [33, 36, 44, 53, 54, 67, 72].concat(set, rnd([set, 33, 36]), rnd([set, 33, 36]), rnd([set, 33, 36]), w.gov == "Democracy" ? [44, 45, 54, 55, 72] : [36, 43, 53]);
			//if (w.type == "Ocean") set.push(43, 44, 45);
			//if (w.govdesc == "Veridian") set.push(45);
			//if (w.govdesc == "Doleamas") set.push(55);
			//if (w.gov == "Corporate") set.push(67, 67);
			break;

		case "Industrial":
			set = byName("Bacteria Farms", "Deuterium Cells", "Explosives", "Fertilizer", "Heavy Plastics", "Industrial Equipment", "Industrial Goods", "Liquid Oxygen");
			set.push(rnd(Bact1,Exp1,Fert), rnd(Bact2,Exp2,Fert), rnd(Plas,Deut,Oxy), rnd(Plas,Deut,Oxy));
			set = [13, 14, 15, 27, 28, 29, 41, 42,
				   46, 47, 47, 48, 48, 52, rnd([13, 27, 29]), rnd([14, 28, 29]), rnd([41, 42, 52]), rnd([41, 42, 52])];	//(80), (93)
			break;

		case "Manufacturing":
			set = byName("Automobiles", "Industrial Goods", "Luxury Goods", "Robots", "Consumer Goods");
			break;

		case "Terraforming":
			set = byName("Chemicals", "Iron Ore", "Minerals", "Atmospheric Catalysts", "Air Processors");
			break;

		case "High Tech":
			set = byName("Electronics", "Medicine", "Probes", "Robots", "Consumer Goods", "Luxury Goods", "Gene Stock");
			break;

		case "Affluent":
			set = byName("Luxury Goods", "Liquor", "Consumer Goods", "Medicine", "Electronics");
			break;

		case "Slum":
			set = byName("Consumer Goods", "Luxury Goods", "Liquor", "Narcotics", "Slaves");
			break;

		case "Cultural":
			set = byName("Luxury Goods", "Government Artifacts", "Liquor", "Medicine", "Consumer Goods");
			break;

		case "Prison":
			set = byName("Consumer Goods", "Industrial Goods", "Slaves");
			break;

		case "Frontier":
			set = byName("Fruit & Vegetables", "Grain", "Liquor", "Bacteria Farms", "Farming Equipment", "Water");
			break;

		case "Mixed":
			if (mixedGoods.length < 1) mixedGoods = fillMixedArray();
			set = [];
			for (let i = 0; i < (w.name.length % 4 + 3); i++) {
				set.push(mixedGoods.splice(rnd(mixedGoods.length) - 1, 1)[0]);
			}
			break;
	}

	// --- Add environmental resource bonuses ---
	if (["Mining", "Agricultural", "Slum", "Prison", "Mixed"].includes(w.focus)) {
		if (w.type === "Rocky") set.push(findGood("Lumber"));
		if (w.type === "Desert") set.push(findGood("Lumber"));
		if (w.type === "Ice") set.push(findGood("Water"));
	}
	if (["Terraforming", "High Tech", "Prison", "Mixed"].includes(w.focus) && w.type === "Ocean"))
		set.push(findGood("Water"));

	// --- Corporate boosts: duplicate corporate goods ---
	if (w.gov === "Corporate") {
		for (const v of new Set(set)) {
			if (goods[v].type === w.govdesc) set.push(v, v, v);
		}
	}
	
	// Set supplied goods
	
	switch (w.focus) {
		case "Mining":
			// ["Chemicals", "Gemstones", "Iron Ore", "Minerals", "Petroleum", "Precious Metals"];
			//set = goods.reduce((t, v, i) => ["Chemicals", "Gemstones", "Iron Ore", "Minerals", "Petroleum", "Precious Metals"].includes(v.name) ? [...t, i] : [...t], []);
			//set.push(rnd(set), rnd(set), rnd(set), rnd(
			set = [16, 34, 51, 66, 76, 77];
			set.push(rnd(set), rnd(set), rnd(set), rnd([16, 34, 51]), rnd([66, 76, 77]));
			break;
		case "Agricultural":
			// [["Animal Meat", "Animal Skins", "Live Animals"], [], []]
			set = [[7, 10, 56], [8, 11, 57], [9, 12, 58]][(seed + world.filter(v => ["Agricultural", "Frontier"].includes(v.focus)).length) % 3];
			// ["Fruit & Vegetables", "Grain", "Hydroponic Farms" (grade 2), "Liquor" (grade 1), "Liquor" (grade 2), "Narcotics" (grade 1), "Perishable Goods" (grade 1)]			["Hydroponic Farms" (grade 2), "Hydroponic Farms" (grade 3), "Liquor" (grade 2), "Liquor" (grade 3), "Perishable Goods" (grade 1)] : ["Grain", "Hydroponic Farms" (grade 1), "Liquor" (grade 1)]
			set = [33, 36, 44, 53, 54, 67, 72].concat(set, rnd([set, 33, 36]), rnd([set, 33, 36]), rnd([set, 33, 36]), w.gov == "Democracy" ? [44, 45, 54, 55, 72] : [36, 43, 53]);
			if (w.type == "Ocean") set.push(43, 44, 45);
			if (w.govdesc == "Veridian") set.push(45);
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
	// Include all goods except those in exceptionList
	const exceptionList = ["Data Vaults", "Government Artifacts", "Lumber", "Packages", "Radioactive Waste", "Waste Products", "Water"];
	return goods.reduce((t, v, i) => exceptionList.includes(v.name) ? [...t] : [...t, i], []);
	
	/*
	const a = [...Array(93)].map((v, i) => i);	// All goods except waste & water
	a.splice(80, 1); // radioactive waste
	a.splice(71, 1); // packages
	a.splice(59, 1); // lumber
	a.splice(35, 1); // artifacts
	a.splice(22, 1); // datavaults
	return a
	*/
}

function illegalGoods(gov) {
/*
	Corp: explosives (all), hand weapons (all), narcotics (grade 2-4)
	Demo: animal skins (all), bacterial farms (all), explosives (all), hand weapons (all), narcotics (grade 2-4), slaves (all)
	Feud: explosives (all), narcotics (grade 3-4)
	Mili: narcotics (all)
	Theo: explosives (all), liquor (all), luxury goods (all), narcotics (all), robots (all) , slaves (grade 5)
	goods.filter(v => ["Explosives", "Hand Weapons"].includes(v.name) || v.name == "Narcotics" && v.grade > 1).map(v => Object.create(v));
*/
	
	const illegalList = {
		"Corporate": { "Explosives": 0, "Gene Stock": 2, "Hand Weapons": 0, "Narcotics": 1 },
		"Democracy": { "Animal Skins": 0, "Atmospheric Catalysts": 0, "Bacterial Farms": 0, "Explosives": 0, "Gene Stock": 1, "Hand Weapons": 0, "Narcotics": 1, "Slaves": 0 },
		"Feudal": { "Explosives": 0, "Narcotics": 2 },
		"Military": { "Narcotics": 0 },
		"Theocracy": { "Atmospheric Catalysts": 0, "Explosives": 0, "Gene Stock": 0, "Liquor": 0, "Luxury Goods": 0, "Narcotics": 0, "Robots": 0, "Slaves": 4 } };
	return goods.reduce((t, v, i) => illegalList[gov]?.[v.name] < v.grade ? [...t, i] : [...t], []);

/*
	return ({"Corporate": [27, 28, 37, 38, 39, 40, 68, 69, 70],
		"Democracy": [10, 11, 12, 13, 14, 15, 27, 28, 37, 38, 39, 40, 68, 69, 70, 85, 86, 87, 88, 89, 90, 91],
		"Feudal": [27, 28, 69, 70],
		"Military": [67, 68, 69, 70],
		"Theocracy": [27, 28, 53, 54, 55, 60, 61, 62, 67, 68, 69, 70, 81, 82, 83, 84, 91]})[gov] || [];
*/
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
						addCargo(Object.create(goods.find(v => v.name == "Waste Products")), x, y, s.price, s.dest, s.origin);
					}
				}
				if (s.config != 'live' && s.stat == 'live') addCargo(Object.create(goods.find(v => v.name == "Fertilizer")), x, y, s.price, s.dest, s.origin);
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









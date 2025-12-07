// { name: "Iron Ore", type: "assorted", file: "iron-ore", price: 500, supply: { M: 1 }, produce: "Mi T (P)", demand: "I", tag: "Heavy, cheap, indispensable.", desc: "Raw ferrous rock mined from planetary crusts and asteroids. Smelted into structural steel or specialized alloys. Bulk freight rates depend on proximity to refineries." },	 //51) M -> I

const goods = [																			// M, A | I, N, T | W, S, C, H, X | P, F
	{ id: "airp1", name: "Air Processors", grade: 1, type: "Certibrand", file: "air-processors", price: 1500, supply: "N", demand: "M T", tag: "Turning dust and exhaust into breathable futures.", desc: "Industrial-scale atmospheric processors used to sustain life on hostile worlds and deep-space mining stations. Each unit filters toxins, stabilizes pressure, and extracts oxygen from trace gases. The quiet backbone of frontier expansion—unseen, essential, and always one malfunction away from extinction." },
	{ id: "airp2", name: "Air Processors", grade: 2, type: "Boreatek", file: "air-processors", price: 2500, supply: "N", demand: "M T" },
	{ id: "meat1", name: "Animal Meat", grade: 1, type: "Bio-Engineered", file: "animal-meat", price: 1500, stat: "cold", supply: "A F", demand: "C H I N M T (W)", tag: "Still legal.", desc: "Cultured or slaughtered animal protein. Genuine livestock meat commands high prices on frontier worlds and among elites nostalgic for pre-industrial Earth diets." },
	{ id: "meat2", name: "Animal Meat", grade: 2, type: "Terran", file: "animal-meat", price: 2500, stat: "cold", supply: "A F", demand: "W C H I N M T" },
	{ id: "meat3", name: "Animal Meat", grade: 3, type: "Lacotian", file: "animal-meat", price: 4500, stat: "cold", supply: "A F", demand: "W C H N (T)" },
	{ id: "skin1", name: "Animal Skins", grade: 1, type: "Bio-Engineered", file: "animal-skins", price: 5000, supply: "A F", demand: "W C", tag: "The oldest luxury, still warm from the source.", note: "Illegal on democratic worlds.", desc: "Processed furs, leathers, and exotic hides. Once a status symbol, now mostly sourced from bio-cloned fauna or off-world feral reserves. Banned on democratic worlds for ethical reasons." },
	{ id: "skin2", name: "Animal Skins", grade: 2, type: "Terran", file: "animal-skins", price: 7500, supply: "A F", demand: "W C" },
	{ id: "skin3", name: "Animal Skins", grade: 3, type: "Lacotian", file: "animal-skins", price: 12500, supply: "A F", demand: "W C" },
	{ id: "atmo1", name: "Atmospheric Catalysts", grade: 1, type: "Centauri", file: "atmo-catalysts", price: 4000, stat: "dangerous", supply: "H I", demand: "A F T M", tag: "Terraforming reagents. Handle with extreme care.", note: "Illegal on democratic and theocratic worlds.", desc: "Specialized chemical and nanobiotic reagents designed to trigger large-scale atmospheric reactions. Used to seed breathable air, accelerate carbon capture, or generate precipitation on frontier worlds. Essential for colonization and climate regulation, but dangerously unstable outside controlled deployment. Misused or uncalibrated, they can rewrite a planet's climate in weeks — with results not always compatible with human life." },
	{ id: "atmo2", name: "Atmospheric Catalysts", grade: 2, type: "Rainline", file: "atmo-catalysts", price: 18000, stat: "dangerous", supply: "H I", demand: "A F T" },
	{ id: "auto1", name: "Automobiles", grade: 1, type: "Eagle", file: "automobiles", price: 2500, stat: "sensitive", supply: "N", demand: "H F I M A P S (C)", tag: "Ground transport, wherever there's still ground.", desc: "Personal and commercial land vehicles adapted for planetary terrain — from wheeled haulers to hovercraft. Popular on terraformed worlds with stable atmospheres; largely ceremonial elsewhere." },
	{ id: "auto2", name: "Automobiles", grade: 2, type: "Geotech", file: "automobiles", price: 4000, stat: "sensitive", supply: "N", demand: "H F I M A C (W P S)" },
	{ id: "auto2", name: "Automobiles", grade: 2, type: "5-Star", file: "automobiles", price: 4000, stat: "sensitive", supply: "N", demand: "H F I M A C (W P S)" },
	{ id: "auto3", name: "Automobiles", grade: 3, type: "Mechanica", file: "automobiles", price: 5500, stat: "sensitive", supply: "N", demand: "H W C (A F)" },
	{ id: "auto4", name: "Automobiles", grade: 4, type: "Eunion", file: "automobiles", price: 8000, stat: "sensitive", supply: "N", demand: "H W (C)" },
	{ id: "bact1", name: "Bacterial Farms", grade: 1, type: "AmritJivan", file: "bacterial-farms", price: 3000, stat: "dangerous", supply: "I", demand: "Military H T", tag: "Feed worlds. End worlds. Same technology.", note: "Military worlds will demand them.<br>Illegal on democratic worlds.", desc: "Self-contained bioreactors cultivating microbial cultures that convert biomass into food, fuel, or pharmaceuticals. But their real value lies in weaponized biology: programmable strains designed for sterilization, siege, or ecosystem collapse. Bacterial farms are the backbone of the interstellar bioweapons trade—regulated in name only, and a strategic necessity for every militarized world. Officially banned on democratic planets, unofficially indispensable to the economies that defend them." },
	{ id: "bact2", name: "Bacterial Farms", grade: 2, type: "Astromedica", file: "bacterial-farms", price: 5000, stat: "dangerous", supply: "I", demand: "Military H T" },
	{ id: "bact3", name: "Bacterial Farms", grade: 3, type: "Aegis", file: "bacterial-farms", price: 7000, stat: "dangerous", supply: "I", demand: "Military H" },
	{ name: "Chemicals", type: "Assorted", file: "chemicals", price: 500, stat: "sensitive", supply: "M T F", demand: "H I P S (X)", tag: "Every colony runs on something volatile.", desc: "Industrial reagents, solvents, and compounds for refining, manufacturing, or scientific use. Dangerous in bulk, indispensable everywhere. Some double as illicit precursors in the right hands." },
	{ id: "cons1", name: "Consumer Goods", grade: 1, type: "Eagle", file: "consumer-goods", price: 1000, supply: "C H P F (W)", demand: "N I M T S X", tag: "Everything you don't need, but want.", desc: "The galaxy's endless tide of everyday convenience items — clothing, appliances, comfort tech. Produced by countless subsidiaries of the major megacorps; disposable, replaceable, unavoidable." },
	{ id: "cons2", name: "Consumer Goods", grade: 2, type: "Nanoworks", file: "consumer-goods", price: 2000, supply: "H P (W)", demand: "N I M T S X F (W C)" },
	{ id: "cons3", name: "Consumer Goods", grade: 3, type: "Mitsutomo", file: "consumer-goods", price: 4000, supply: "S P (W)", demand: "N H W C (X T F)" },
	{ id: "cons3", name: "Consumer Goods", grade: 3, type: "Tsai", file: "consumer-goods", price: 4000, supply: "S P (W)", demand: "N H W C (X T F)" },
	{ id: "cons4", name: "Consumer Goods", grade: 4, type: "Polis", file: "consumer-goods", price: 5000, supply: "S (W)", demand: "H W C (X)" },
	{ name: "Data Vaults", type: "Secure", file: "data-vaults", price: 5000, stat: "sensitive", supply: "*", demand: "*", tag: "Knowledge has weight.", note: "Data vaults are not traded on the market.", desc: "Secure data cores and archival drives storing research, records, and cultural memory. Invaluable for colony development and historical reconstruction — and highly sought after by intelligence brokers." },
	{ name: "Deuterium Cells", type: "Commercial", file: "deuterium", price: 200, supply: "I", demand: "W F S", tag: "Stable power for unstable worlds.", desc: "Compact fusion-grade energy cells powered by deuterium or advanced isotopes. Standard propulsion fuel for interplanetary vehicles; volatile but efficient." },
	{ id: "elec1", name: "Electronics", grade: 1, type: "Yuntai", file: "electronics", price: 2000, supply: "H", demand: "I P S", tag: "Circuits make the stars go round.", desc: "Processors, sensors, communication modules, and interface tech. Found in everything from spacecraft to household utilities. Essential imports for low-tech colonies and independent miners." },
	{ id: "elec2", name: "Electronics", grade: 2, type: "Microtronic", file: "electronics", price: 3000, supply: "H", demand: "P S" },
	{ id: "elec2", name: "Electronics", grade: 2, type: "5-Star", file: "electronics", price: 3000, supply: "H", demand: "P S" },
	{ id: "elec3", name: "Electronics", grade: 3, type: "Omninet", file: "electronics", price: 4000, supply: "H", demand: "P S" },
	{ id: "expl1", name: "Explosives", grade: 1, type: "Industrial", file: "explosives", price: 5000, stat: "dangerous", supply: "I", demand: "F M S T", tag: "Progress, accelerated.", note: "Illegal on all but military and lawless worlds.", desc: "Controlled detonants for mining, construction, and weaponry. Industrial grades are widely used in asteroid harvesting; military variants are heavily regulated or outright banned on peaceful worlds." },
	{ id: "expl2", name: "Explosives", grade: 2, type: "Large Scale", file: "explosives", price: 8000, stat: "dangerous", supply: "I", demand: "S T" },
	{ name: "Fertilizer", type: "multinutrient", file: "fertilizer", price: 200, stat: "dangerous", supply: "I", demand: "A F T", tag: "The secret to life, in bulk shipment form.", desc: "Chemical and organic nutrient blends sustaining off-world agriculture. Includes treated biosludge from recycling plants and engineered soil conditioners for non-terrestrial crops." },
	{ id: "farm1", name: "Farming Equipment", grade: 1, type: "Boreatek", file: "farming-equipment", price: 1500, supply: "N", demand: "A (T)", tag: "Harvest-ready, from soil to sky.", desc: "Mechanized agricultural systems designed for alien soil, artificial gravity, and hydroponic cycles. From orbital greenhouse drones to autonomous tillers, these machines feed the galaxy. Their hum is the sound of civilization persisting through vacuum and drought alike." },
	{ id: "farm2", name: "Farming Equipment", grade: 2, type: "Veridian", file: "farming-equipment", price: 2500, supply: "N", demand: "A T" },
	{ id: "farm3", name: "Farming Equipment", grade: 3, type: "Geotech", file: "farming-equipment", price: 3500, supply: "N", demand: "A (T)" },
	{ name: "Fruit & Vegetables", type: "Assorted", file: "vegetables", price: 1000, stat: "cold", supply: "A", demand: "W C F H N T", tag: "A galaxy of varieties.", desc: "Perishable produce from hydroponic or planetary farms. Often imported frozen or sealed; vital morale boosters in long-term colonies where greenery is scarce." },
	{ name: "Gemstones", type: "Assorted", file: "gemstones", price: 100000, supply: "M", demand: "W N S", tag: "Shiny proof that scarcity still sells.", desc: "Precious and synthetic stones mined or fabricated across the galaxy. Mostly decorative, occasionally industrial, and used in energy weapon production. Value fluctuates wildly with fashion and scarcity propaganda." },
	{ id: "gene1", name: "Gene Stock", grade: 1, type: "Cultivar", file: "gene-stock", price: 2500, stat: "live", supply: "A H", demand: "W C T F", tag: "DNA on demand.", note: "Military worlds will demand enhanced and restricted stock.<br>Illegal on theocratic worlds and partially illegal on corporate and democratic worlds.", desc: "Encoded genetic material ranging from agricultural seed libraries to synthetic human and animal genomes. Critical to off-world agriculture and medical research, yet often subject to strict licensing or bio-ethical bans." },
	{ id: "gene2", name: "Gene Stock", grade: 2, type: "Enhanced", file: "gene-stock", price: 12000, stat: "live", supply: "A H", demand: "W C T Military" },
	{ id: "gene3", name: "Gene Stock", grade: 3, type: "Restricted", file: "gene-stock", price: 45000, stat: "live", supply: "H", demand: "W C T Military" },
	{ name: "Government Artifacts", type: "Priceless", file: "artifacts", price: 100000, stat: "sensitive", supply: "*", demand: "W", tag: "The past trades better than the future.", note: "Government artifacts are usually only available on the black market.", desc: "Rare relics and recovered materials from lost colonies or pre-expansion civilizations. Legal status varies widely; some worlds treat them as heritage, others as contraband." },
	{ name: "Grain", type: "Assorted", file: "grain", price: 300, supply: "A F", demand: "W C H N P S", tag: "Breadbasket of the void.", desc: "Staple food crop exports like wheat, soy, or engineered grains. Transported in bulk to sustain colony populations or used as feedstock for livestock, synthetic foods, and ethanol production." },
	{ id: "weap1", name: "Hand Weapons", grade: 1, type: "Cyberops", file: "hand-weapons", price: 5500, supply: "N", demand: "Military F S", tag: "Democracy's final argument.", note: "Military worlds will demand them.<br>Illegal on corporate and democratic worlds.", desc: "Small arms, blades, and directed-energy sidearms—personal defence for some, profit centre for others. Built in the same factories that assemble industrial tools, their design speaks of humanity’s endless need to carve authority into metal. They travel everywhere, whether declared or not." },
	{ id: "weap2", name: "Hand Weapons", grade: 2, type: "Forge", file: "hand-weapons", price: 6500, supply: "N", demand: "Military W F S" },
	{ id: "weap3", name: "Hand Weapons", grade: 3, type: "Aegis", file: "hand-weapons", price: 8500, supply: "N", demand: "Military W F S" },
	{ id: "weap4", name: "Hand Weapons", grade: 4, type: "Eagle", file: "hand-weapons", price: 10500, supply: "N", demand: "Military W S" },
	{ name: "Heavy Plastics", type: "Assorted", file: "plastics", price: 1000, supply: "I", demand: "S P (X)", tag: "The bones of the built world.", desc: "Dense structural polymers used in construction, ship hulls, and environmental seals. Derived from petrochemical or biomass sources; prized for durability and recyclability." },
	{ id: "hydr1", name: "Hydroponic Farms", grade: 1, type: "AmritJivan", file: "hydroponic-farms", price: 2000, stat: "live", supply: "A", demand: "H T F", tag: "Because dirt is obsolete.", desc: "Hydroponic farms form the backbone of sustainable agriculture across human space. These modular systems use nutrient-enriched water instead of soil, enabling efficient crop growth even on airless or toxic worlds. Whether installed in domed settlements, orbital stations, or deep-buried outposts, they provide a controlled environment for high-yield food production.<br>Corporations like AmritJivan and Veridian market hydroponic pods as turnkey ecosystems — sealed, self-balancing, and subscription-tuned for optimal harvest cycles. On poorer colonies, they’re patched together from scavenged parts and recycled feedstock, but the principle remains the same: when the ground fails, the farms float." },
	{ id: "hydr2", name: "Hydroponic Farms", grade: 2, type: "Centauri", file: "hydroponic-farms", price: 2800, stat: "live", supply: "A", demand: "H T (F W)" },
	{ id: "hydr3", name: "Hydroponic Farms", grade: 3, type: "Veridian", file: "hydroponic-farms", price: 4000, stat: "live", supply: "A", demand: "H T W" },
	{ id: "inde1", name: "Industrial Equipment", grade: 1, type: "Forge", file: "industrial-equipment", price: 1500, supply: "I", demand: "N M", tag: "Tools that move mountains — literally.", desc: "Machinery for extraction, refining, and large-scale fabrication. Includes drills, presses, and automated assembly rigs. Core import for frontier colonies and mining installations." },
	{ id: "inde2", name: "Industrial Equipment", grade: 2, type: "Mechanica", file: "industrial-equipment", price: 2500, supply: "I", demand: "N M" },
	{ id: "inde3", name: "Industrial Equipment", grade: 3, type: "Boreatek", file: "industrial-equipment", price: 3500, supply: "I", demand: "N M" },
	{ id: "indg1", name: "Industrial Goods", grade: 1, type: "Forge", file: "industrial-goods", price: 3000, supply: "N", demand: "H T", tag: "Half-finished things that make finished things.", desc: "Processed materials and intermediate products such as alloys, composites, and machine parts. The bloodstream of interstellar manufacturing economies." },
	{ id: "indg2", name: "Industrial Goods", grade: 2, type: "Mechanica", file: "industrial-goods", price: 4500, supply: "N", demand: "H T" },
	{ name: "Liquid Oxygen", type: "Cryogenic", file: "oxygen", price: 200, stat: "cold", supply: "I", demand: "N T", tag: "Cold, volatile, vital.", note: "Will explode if not kept in cold storage.", desc: "Cryogenic oxidizer used in life-support systems, fuel production, and industrial reactions. Requires dedicated cold storage; improper handling leads to explosive results." },
	{ id: "liq1", name: "Liquor", grade: 1, type: "Assorted New", file: "liquor", price: 1500, supply: "A F", demand: "H M I N S", tag: "Because judgement is overrated.", note: "Illegal on theocratic worlds.", desc: "Distilled indulgence in liquid form—spirits, wines, brews, and everything fermented in between. Still banned in theocracies and wherever sound judgement is required, but indispensable to celebration, negotiation, and regret." },
	{ id: "liq2", name: "Liquor", grade: 2, type: "Assorted Aged", file: "liquor", price: 5500, supply: "A F", demand: "H W I N S F" },
	{ id: "liq3", name: "Liquor", grade: 3, type: "Doleamas", file: "liquor", price: 20000, supply: "A C (W)", demand: "H W" },
	{ id: "anim1", name: "Live Animals", grade: 1, type: "Bio-Engineered", file: "live-animals", price: 10000, stat: "live", supply: "A F", demand: "W A T", tag: "Breathing investments.", note: "Agricultural worlds demand the animals they do not produce.<br>Requires life support.", desc: "Livestock or exotic species transported for breeding, study, or consumption. Expensive to ship and risky to insure, yet vital to maintaining planetary biospheres." },
	{ id: "anim2", name: "Live Animals", grade: 2, type: "Terran", file: "live-animals", price: 15000, stat: "live", supply: "A F", demand: "W A C T" },
	{ id: "anim3", name: "Live Animals", grade: 3, type: "Lacotian", file: "live-animals", price: 25000, stat: "live", supply: "A F", demand: "W A C T" },
	{ name: "Lumber", type: "Cut", file: "lumber", price: 300, supply: "M A P S X (Rocky Desert)", demand: "W C A P S (X)", tag: "Because steel doesn’t smell right.", note: "Produced on some rocky and desert worlds.", desc: "Timber harvested from planetary forests or bioengineered groves. Still valued for construction, furniture, and nostalgia — especially in habitats starved for natural texture." },
	{ id: "lux1", name: "Luxury Goods", grade: 1, type: "Polis", file: "luxury-goods", price: 10000, supply: "N S (W)", demand: "W C H", tag: "Proof that taste is always for sale.", note: "Illegal on theocratic worlds.", desc: "High-value, non-essential consumer items — jewellery, art, designer cybernetics. A symbol of wealth and excess across every system. Contraband on theocracies and subject to steep tariffs elsewhere." },
	{ id: "lux2", name: "Luxury Goods", grade: 2, type: "Eunion", file: "luxury-goods", price: 15000, supply: "H N S (W)", demand: "W C" },
	{ id: "lux3", name: "Luxury Goods", grade: 3, type: "ICP", file: "luxury-goods", price: 35000, supply: "C H N S (W)", demand: "W" },
	{ id: "medi1", name: "Medicine", grade: 1, type: "Tsai", file: "medicine", price: 5000, supply: "H", demand: "C I N A T P F (W)", tag: "Survival, standardized.", desc: "Pharmaceuticals, medkits, and biotech treatments. Manufactured by corporate labs under tightly held patents. A lucrative trade, legal or otherwise, in every system." },
	{ id: "medi2", name: "Medicine", grade: 2, type: "Centauri", file: "medicine", price: 6500, supply: "H", demand: "C I N W (A T P F)" },
	{ id: "medi3", name: "Medicine", grade: 3, type: "Astromedica", file: "medicine", price: 8000, supply: "H", demand: "C W" },
	{ name: "Minerals", type: "Assorted", file: "minerals", price: 400, supply: "M T P", demand: "I", desc: "Generic non-ferrous minerals such as bauxite, copper, and lithium. Feedstock for industrial production and power storage. Easily sourced production need that's always in motion along the trade lanes." },
	{ id: "narc1", name: "Narcotics", grade: 1, type: "Minor", file: "narcotics", price: 5000, supply: "A F", demand: "S C N M I", tag: "Pleasure, profit, or poison.", note: "Illegal on all but lawless worlds, although corporate and democratic worlds will allow minor narcotics and feudal worlds will also allow hallucinogenic narcotics.", desc: "Chemical and biological recreational substances. “Minor” varieties are tolerated in some corporate zones; “major” narcotics remain illicit and highly profitable on nearly all worlds." },
	{ id: "narc2", name: "Narcotics", grade: 2, type: "Hallucinogenic", file: "narcotics", price: 8000, supply: "H", demand: "S C W N M I F" },
	{ id: "narc3", name: "Narcotics", grade: 3, type: "Heavy", file: "narcotics", price: 10000, supply: "H", demand: "S C W N" },
	{ id: "narc4", name: "Narcotics", grade: 4, type: "Psychotropic", file: "narcotics", price: 14000, supply: "H", demand: "S C W" },
	{ name: "Packages", type: "Assorted", file: "packages", price: 500, supply: "*", demand: "*", tag: "Everything else.", note: "Packages are specific to customers and are not traded on the market.", desc: "Catch-all cargo category: parcels, mail, micro-deliveries. Often used to disguise higher-value contraband or corporate espionage transfers under legitimate freight manifests." },
	{ id: "peri1", name: "Perishable Goods", grade: 1, type: "MilkyWay", file: "perishable-goods", price: 1000, stat: "cold", supply: "A C F (W)", demand: "N M I T P S (H)", tag: "Delicious & Nutricious: Packaged.", desc: "Basic consumables produced on nearly every settled world. Low-grade shipments include processed nutrient paste for long voyages, while premium exports feature rare spices and delicacies from controlled climates." },
	{ id: "peri2", name: "Perishable Goods", grade: 2, type: "5-Star", file: "perishable-goods", price: 1500, stat: "cold", supply: "S (W)", demand: "N H M I T C F (W P)" },
	{ id: "peri2", name: "Perishable Goods", grade: 2, type: "Veridian", file: "perishable-goods", price: 1500, stat: "cold", supply: "S (W)", demand: "N H M I T C F (W P)" },
	{ id: "peri3", name: "Perishable Goods", grade: 3, type: "Tsai", file: "perishable-goods", price: 2000, stat: "cold", supply: "S (W)", demand: "N H W (T C F)" },
	{ name: "Petroleum", type: "Light", file: "petroleum", price: 500, supply: "M F", demand: "I", tag: "Black gold.", desc: "Crude and refined hydrocarbons from fossil or synthetic origins. Valued for chemical production and legacy engines. An archaic but stubbornly persistent resource economy." },
	{ name: "Precious Metals", type: "Assorted", file: "precious-metals", price: 10000, supply: "M F", demand: "C H N", tag: "Actual gold.", desc: "Gold, platinum, palladium, and other high-value metals used in electronics, banking, and ornamentation. The old money of a new age." },
	{ id: "prob1", name: "Probes", grade: 1, type: "Omninet", file: "probes", price: 2500, supply: "H", demand: "M T F", tag: "The explorers you can afford to lose.", desc: "Automated drones mostly used in mining, planetary survey, navigation mapping, or research. Disposable, but indispensable. A single lost probe can start a gold rush—or a scandal." },
	{ id: "prob2", name: "Probes", grade: 2, type: "Forge", file: "probes", price: 4000, supply: "H", demand: "M T (F)" },
	{ name: "Radioactive Waste", type: "Assorted", file: "radioactives", price: 500, stat: "dangerous", supply: "*", demand: "-", tag: "Someone else's problem, until it isn't.", note: "Produced by industrial processes and some damaged goods. Must pay to have disposed of.", desc: "Spent reactor fuel and fission byproducts. Legally restricted, illegally dumped, occasionally weaponized. Handling requires specialized containment and a disregard for self-preservation." },
	{ name: "Regolith", type: "Aggregate", file: "regolith", price: 300, supply: "M T", demand: "A F Ocean", tag: "Ground beneath your dreams — and your domes.", desc: "Regolith is the pulverized bedrock of a thousand worlds — harvested, sieved, and compacted into the foundation for colonies, farms, and megastructures. Terraformers blend it with organics to birth soil; oceanic engineers pump it into the deep to anchor arcologies. It’s the dust that civilization stands on, traded by the megaton across the void." },
	{ id: "robo1", name: "Robots", grade: 1, type: "Cyberops", file: "robots", price: 4000, stat: "dangerous", supply: "H N (W)", demand: "A I M T P F (W)", tag: "Workers who never ask for pay.", note: "Illegal on theocratic worlds.", desc: "Autonomous mechanical units for industrial, domestic, or security purposes. Range from cheap utility drones to high-end adaptive AIs. Banned on theocracies due to moral prohibitions on synthetic life." },
	{ id: "robo2", name: "Robots", grade: 2, type: "Microtronic", file: "robots", price: 6000, stat: "dangerous", supply: "H (W)", demand: "W A I M T P N (C F)" },
	{ id: "robo3", name: "Robots", grade: 3, type: "Nanoworks", file: "robots", price: 8000, stat: "dangerous", supply: "H (W)", demand: " W C N (A T P)" },
	{ id: "robo4", name: "Robots", grade: 4, type: "Mitsutomo", file: "robots", price: 10000, stat: "dangerous", supply: "H (W)", demand: "W (C N)" },
	{ id: "slav1", name: "Slaves", grade: 1, type: "Minor", file: "slaves", price: 5000, stat: "live", supply: "S F", demand: "W Theocracy", tag: "Property, redefined.", note: "Illegal on democratic worlds. Luxorian slaves illegal on theocratic worlds.", desc: "The ugliest constant in human commerce. Slavery endures wherever law is weak and profit outweighs conscience — from indentured minors to engineered life designed for obedience. Where regulation fails, exploitation fills the gap." },
	{ id: "slav2", name: "Slaves", grade: 2, type: "Uneducated", file: "slaves", price: 7500, stat: "live", supply: "S P F", demand: "M A I N Theocracy" },
	{ id: "slav3", name: "Slaves", grade: 3, type: "Bonded", file: "slaves", price: 15000, stat: "live", supply: "S P F", demand: "W C H M A I N" },
	{ id: "slav4", name: "Slaves", grade: 4, type: "Bio-Engineered", file: "slaves", price: 25000, stat: "live", supply: "S P H", demand: "M A I" },
	{ id: "slav5", name: "Slaves", grade: 5, type: "Luxorian", file: "slaves", price: 50000, stat: "live", supply: "S", demand: "W C H" },
	{ name: "Synthetic Meat", type: "Assorted", file: "synthetic-meat", price: 1000, stat: "cold", supply: "H", demand: "M I N T S P F", tag: "Lab-grown, guilt optional.", desc: "Engineered protein grown from cultured cells. Tastes <i>almost</i> as good as the real thing. Cheap, sustainable, and nutritionally perfect—but critics claim long-term consumption dulls taste receptors and memory alike." },
	{ name: "Volatiles", type: "Compressed", file: "volatiles", price: 600, stat: "cold", supply: "M T Ice (F P)", demand: "A I H", tag: "Bottled breath: extracted atmospherics for fuel and synthesis.", note: "Will explode if not kept in cold storage.", desc: "Volatile elements, such as methane, ammonia, and CO₂, harvested during atmosphere processing or ice mining. Shipped in bulk to industrial worlds for use in plastics, fertilizers, and fuel synthesis. Terraforming operations treat them as waste by-products; manufacturers see them as profit in canisters." },
	{ name: "Waste Products", type: "Assorted", file: "waste-products", price: 50, supply: "*", demand: "-", tag: "Everything has an afterlife.", note: "Produced by industrial processes, large populations, and damaged goods. Must pay to have disposed of.", desc: "Industrial runoff, biological residue, and other byproducts of production. Officially recycled, unofficially exported. Some colonies make fortunes cleaning up what others discard." },
	{ name: "Water", type: "Fresh", file: "water", price: 100, stat: "sensitive", supply: "Ice Ocean (M F P H T X)", demand: "F T", tag: "The lifeblood of the galaxy.", desc: "Processed or harvested water from asteroids, comets, or reclamation plants. The basis of life and trade — measured, taxed, and fought over since before the first launch." }
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
		(v.price > 9999 && p.rep < 80) ||		// Skip expensive goods if not high rep
		(v.price > 4999 && p.rep < 60) ||		// Skip moderate goods if low rep
		(v.price < 5000 && p.rep > 79) ||		// Skip cheap goods if high rep
		v.name == "Radioactive Waste" || v.name == "Waste Products" ||		// Skip wastes
		(query != "extended" && ["Chemicals", "Deuterium Cells", "Grain", "Liquid Oxygen", "Lumber", "Minerals", "Petroleum", "Regolith", "Synthetic Meat", "Volatiles", "Water"].includes(v.name)) ||		// Skip basic goods
		(query == "legal" && illegals.includes(i)) ||		// Skip illegal goods on "legal" query
		(query == "general" && uniqueGoods.includes(v.name)) ? t :		// Skip unique goods on "general" query
			[...t, ...uniqueGoods.includes(v.name) ? new Array((v.name == "Government Artifacts" && world[loc].focus == "Cultural") ? 15 : 5).fill(Object.assign(v, { id: `${(Math.floor(seed / (world[loc].notices.length + 1) + time.full) % 1679616).toString(36).toUpperCase()}-${("00" + rnd(999)).slice(-3)}` })) : [v]], []);
}

// Only called once per world during world creation
function worldGoods(w) {
	const arr = [];
	let mixedGoods = [];
	let set = [];
	
	// Helper: find all indices for a given list of goods based on short or full name
	const addGoods = (names) => goods.reduce((t, v, i) => names.includes(v.id) || names.some(a => new RegExp(v.name, 'i').test(a)) ? [...t, i] : [...t] , []);
	// Helper: find all indices for a good by name & optional grade
	const findGoods = (name, grade) => goods.reduce((t, v, i) => v.name === name && (!grade || v.grade === grade) ? [...t, i] : [...t], []);
	// Helper: return array of strings
	const dup = (number, ...items) => Array(number).fill(items).flat();
	
	function buildArray(sd) {
		for (const g of set) {
			if (!goods[g]) continue;
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

	// --- Set illegal goods ---
	set = illegalGoods(w.gov);
	buildArray(0);
	
	// --- Set supplied goods based on world focus --- ([ # of repeats, [repeatable goods], [non-repeatable goods] ])
	const supply = {
		"Mining": [5, ["Chemicals", "Gemstones", "Minerals", "Petroleum", "Precious Metals", "Regolith", "Volatiles"], ["Minerals"]],
		"Agricultural": [3, ["Fruit & Vegetables", "Grain", "Liquor"], [...dup(2, "gene1", "Hydroponic Farms"), "gene2", "narc1", "peri1"]],
		"Industrial": [4, ["Bacterial Farms", "Deuterium Cells", "Explosives", "Fertilizer", "Heavy Plastics", "Liquid Oxygen"], ["Atmospheric Catalysts", ...dup(2, "Industrial Equipment")]],
		"Manufacturing": [3, ["Air Processors", "Automobiles", "Farming Equipment", "Hand Weapons", "Luxury Goods", "robo1"], [...dup(2, "Industrial Goods"), "lux2"]],
		"Terraforming": [3, ["Chemicals", "Minerals", "Regolith", "Volatiles"], ["Regolith", "Volatiles"]],
		"High Tech": [4, ["Electronics", "Gene Stock", "lux2", "lux3", "Medicine", "narc2", "narc3", "narc4", "Robots"], ["cons1", "cons2", "Electronics", "gene2", ...dup(2, "Atmospheric Catalysts", "gene3", "Probes", "Robots", "slav4"), "robo2", ...dup(3, "Synthetic Meat")]],
		"Affluent": [0, [], []],
		"Slum": [3, ["cons3", "cons4", "Luxury Goods", "peri2", "peri3", "Slaves"], ["lux1", "peri2", "peri3", ...dup(2, "slav1", "slav2"), "slav3", "slav4"]],
		"Cultural": [1, ["liq2", "liq3", "lux3"], ["cons1", "liq2", "peri1"]],
		"Prison": [2, ["cons3", "Minerals", "slav2", "slav3", "slav4", ...dup(2, "cons1", "cons2")], ["slav2"]],
		"Frontier": [1, ["Chemicals", "cons1", "liq1", "narc1", "peri1", "Petroleum", "Precious Metals", "slav1", "slav2", "slav3"], ["Grain"]],
		"Mixed": [3, [], []]
	}[w.focus];
	set = addGoods(supply[1]);

	// Add live animals to agricultural and frontier worlds
	if (["Agricultural", "Frontier"].includes(w.focus)) {
			const animalGrade = (seed + world.filter(v => ["Agricultural", "Frontier"].includes(v.focus)).length) % 3 + 1;
			set.push(goods.reduce((t, v, i) => v.name.includes("Animal") && v.grade === animalGrade ? [...t, i] : t, []));
	}

	// Add mixed goods
	if (w.focus == "Mixed") {
		if (w.gov == "Corporate") set.push(goods.reduce((t, v, i) => v.type == w.govdesc ? [...t, i] : t, []));
		for (const i of times((w.name.length + seed) % 4 + 3)) {
			if (mixedGoods.length < 1) mixedGoods = fillMixedArray();
			set.push(mixedGoods.splice(rnd(mixedGoods.length) - 1, 1)[0]);
		}
	}
	
	// Add random repeats of goods in first set, then add second set
	for (const i of times(supply[0])) {
		supply[2].push(rnd(supply[1]));
	}
	set.push(...addGoods(supply[2]));
	set = set.flat();

	// Add corporate goods
	if (w.gov == "Corporate") {
		new Set(set).forEach(v => {if (goods[v].type == w.govdesc) set.push(v, v, v)});
		if (w.focus == "Affluent") set.push(goods.reduce((t, v, i) => ["Consumer Goods", "Liquor", "Luxury Goods", "Perishable Goods", "Robots"].includes(v.name) && v.type == w.govdesc ? [...t, i, i] : t, []));
		if (w.focus == "Agricultural") set.push(...addGoods(dup(2, "narc1")));
	}

	// Add Lumber, Water, and Volatiles to certain world types
	if (["Mining", "Agricultural", "Slum", "Prison", "Mixed"].includes(w.focus)) {
		if (w.type == "Rocky") set.push(...addGoods(["Lumber", "Lumber"]));
		if (w.type == "Desert") set.push(...addGoods(["Lumber"]));
	}
	if (w.type == "Ice") set.push(...addGoods(dup(2, "Volatiles", "Water")));
	if (["Terraforming", "High Tech", "Prison", "Mixed"].includes(w.focus) && w.type == "Ocean") set.push(...addGoods(["Water"]));

	// Remove supplied goods from mixed good list (increase likeliness of rarer goods on mixed worlds)
	set.forEach(v => {
		const i = mixedGoods.indexOf(v);
		if (i > -1) mixedGoods.splice(i, 1); });

	buildArray(1);


	// --- Set demand goods ---
	set = [...addGoods({
		"Mining": ["atmo1", "auto1", "auto2", "meat1", "meat2", "cons1", "cons2", "peri2", ...dup(2, "Air Processors", "expl1", "narc1", "narc2", "Probes", "robo1", "robo2", "slav2", "slav3", "Synthetic Meat"), ...dup(3, "Industrial Equipment", "liq1", "peri1", "slav4")],
		"Agricultural": ["auto1", "auto2", "Live Animals", "Lumber", "medi1", "robo2", "Volatiles", ...dup(2, "Atmospheric Catalysts", "Fertilizer", "Regolith", "robo1", "slav2", "slav3", "slav4"), ...dup(3, "Farming Equipment")],
		"Industrial": ["auto1", "auto2", "meat1", "meat2", "cons1", "cons2", "elec1", "liq2", "medi1", "medi2", "robo2", ...dup(2, "liq1", "narc1", "narc2", "peri2", "robo1", "slav2", "slav3", "slav4", "Synthetic Meat", "Volatiles"), ...dup(3, "Chemicals", "Minerals", "peri1", "Petroleum")],
		"Manufacturing": ["Animal Meat", "cons1", "cons2", "cons3", "Fruit & Vegetables", "Grain", "Liquid Oxygen", "liq1", "medi1", "medi2", "narc1", "narc2", "narc3", "peri3", ...dup(2, "Gemstones", "Industrial Equipment", "liq2", "peri1", "Precious Metals", "slav2", "slav3", "Synthetic Meat"), ...dup(3, "peri2", "robo2", "robo3")],
		"Terraforming": ["bact1", "bact2", "cons1", "cons2", "expl2", "farm2", "Fruit & Vegetables", "Gene Stock", "Hydroponic Farms", "Industrial Goods", "meat1", "meat2", "medi1", "peri2", "robo1", "slav3", "slav4", "Synthetic Meat", ...dup(2, "Air Processors", "expl1", "Liquid Oxygen", "Live Animals", "peri1", "Probes", "robo2", "Water"), ...dup(3, "Atmospheric Catalysts", "Fertilizer")], 
		"High Tech": ["auto1", "auto2", "auto4", "Grain", "Hydroponic Farms", "hydr2", "liq1", "meat1", "slav3", ...dup(2, "auto3", "Bacterial Farms", "Chemicals", "cons3", "cons4", "Fruit & Vegetables", "Industrial Goods", "liq2", "liq3", "lux1", "meat2", "meat3", "peri2", "peri3", "slav5", "Volatiles"), ...dup(3, "Precious Metals")],
		"Affluent": ["anim1", "Deuterium Cells", "Grain", "hydr3", "lux1", "narc2", "robo2", "weap2", ...dup(2, "anim2", "anim3", "auto3", "cons3", "Gemstones", "Gene Stock", "Government Artifacts", "liq2", "Lumber", "lux2", "meat2", "medi2", "narc3", "narc4", "peri3", "robo3", "skin1", "slav1", "slav3", "weap3", "weap4"), ...dup(3, "auto4", "cons4", "Fruit & Vegetables", "liq3", "lux3", "meat3", "medi3", "robo4", "skin2", "skin3", "slav5")],
		"Slum": ["auto1", "Chemicals", "cons1", "cons2", "Deuterium Cells", "Explosives", "Gemstones", "liq2", "weap4", ...dup(2, "Electronics", "Grain", "Heavy Plastics", "Lumber", "narc1", "narc2", "peri1", "Synthetic Meat", "weap3"), ...dup(3, "liq1", "narc3", "narc4", "weap1", "weap2")],
		"Cultural": ["Animal Meat", "Animal Skins", "anim2", "anim3", "auto2", "auto3", "cons4", "Gene Stock", "Lumber", "lux1", "lux2", "Medicine", "medi2", "narc3", "narc4", "peri2", "Precious Metals", "robo3", ...dup(2, "cons3", "Fruit & Vegetables", "Grain", "narc1", "narc2", "slav3", "slav5")],
		"Prison": ["auto1", "Chemicals", "Electronics", "Grain", "medi1", "peri1", "robo1", "robo2", "weap1", "weap2", ...dup(2, "Heavy Plastics", "Lumber"), ...dup(3, "Synthetic Meat")], 
		"Frontier": ["Atmospheric Catalysts", "auto1", "auto2", "Deuterium Cells", "expl1", "Fruit & Vegetables", "hydr1", "medi1", "narc2", "prob1", "robo1", "Regolith", "weap3", ...dup(2, "cons2", "Fertilizer", "gene1", "liq2", "peri2", "Synthetic Meat", "Water", "weap1", "weap2")],
		"Mixed": ["cons1", "cons2"]
	}[w.focus])];

	// Add Additional Mixed Demands
	if (w.focus == "Mixed") {
		for (const i of times(6 - (w.name.length + seed) % 4)) {
			if (mixedGoods.length < 1) mixedGoods = fillMixedArray();
			set.push(mixedGoods.splice(rnd(mixedGoods.length) - 1, 1)[0]);
		}
		set.push(...addGoods(arr.some(v => v.name == "Consumer Goods") ? [rnd(["Chemicals", "Heavy Plastics", "Lumber"]), rnd(["Chemicals", "Heavy Plastics", "Lumber"])] : ["cons3"]));
	}
	
	// Remove Agricultural Demand for produced animals
	if (w.focus == "Agricultural") set.splice(set.findIndex(v => v == goods.findIndex(a => a.name == "Live Animals" && a.grade == arr.find(b => b.name == "Live Animals").grade)), 1);

	// Add Regolith demand on Ocean worlds
	if (w.type == "Ocean") set.push(...addGoods(dup(3, "Regolith")));
	
	// Adjust Demand for Democratic Governments
	if (["Industrial", "Manufacturing", "Mining"].includes(w.focus)) {
		["Air Processors", "Animal Meat", "Automobiles", "Consumer Goods", "Electronics", "Farming Equipment", "Hydroponic Farms", "Industrial Goods", "Luxury Goods", "Medicine", "Perishable Goods", "Probes", "Robots"].forEach(g => {
			const goodSubset = set.filter(v => goods[v].name === g);
			if (goodSubset.length > 0) {
				const topGrade = goods.slice().reverse().find(v => v.name === g).grade;
				// Set best to 1 level higher than best grade good (max top grade of good)
				const bestGrade = Math.min(goods[goodSubset[goodSubset.length - 1]].grade + 1, topGrade);
				// Set worst to 1 level below lowest grade good (minimum 1)
				const worstGrade = Math.max(goods[goodSubset[0]].grade - 1, 1);
				set.push(...findGoods(g, w.gov === "Democracy" ? bestGrade : worstGrade));
				if (goodSubset.length > 4) set.push(...findGoods(g, w.gov === "Democracy" ? bestGrade - 1 : worstGrade + 1));
			}
		});		
	}

	// Adjust Demand for Military Governments
	if (w.gov == "Military") {
		set.push(...addGoods([...dup(2, "gene3", "Hand Weapons"), "Bacterial Farms", "gene2"]));
	}

	// Adjust Demand for Theocratic Governments
	if (w.gov == "Theocracy") {
		set.push(...addGoods(["slav1", "slav2"]));
	}
	
	//
	buildArray(-1);
	
	return arr;
}

function fillMixedArray() {
	// Include all goods except those in exceptionList
	const exceptionList = ["Data Vaults", "Government Artifacts", "Lumber", "Packages", "Radioactive Waste", "Waste Products", "Water"];
	return goods.reduce((t, v, i) => exceptionList.includes(v.name) ? t : [...t, i], []);
}

function illegalGoods(gov) {
	const illegalList = {
		"Corporate": { "Explosives": 0, "Gene Stock": 2, "Hand Weapons": 0, "Narcotics": 1 },
		"Democracy": { "Animal Skins": 0, "Atmospheric Catalysts": 0, "Bacterial Farms": 0, "Explosives": 0, "Gene Stock": 1, "Hand Weapons": 0, "Narcotics": 1, "Slaves": 0 },
		"Feudal": { "Explosives": 0, "Narcotics": 2 },
		"Military": { "Narcotics": 0 },
		"Theocracy": { "Atmospheric Catalysts": 0, "Explosives": 0, "Gene Stock": 0, "Liquor": 0, "Luxury Goods": 0, "Narcotics": 0, "Robots": 0, "Slaves": 4 } };
	return goods.reduce((t, v, i) => illegalList[gov]?.[v.name] < v.grade ? [...t, i] : t, []);
}

// will need reworking along with whole ship array storage method
function goodsPerish() {
	for (const x of times(ship.length)) {
		for (const y of times(ship[0].length)) {
			const s = ship[x][y];
			if (s.room == 'cargohold' && s.name) {
				if (s.config != "cold" && s.stat == "cold") {
					if (["Liquid Oxygen", "Volatiles"].includes(s.name)) {
						displayCanvas('ship');
						explosion(x, y);
						setTimeout(_ => {removeCargo(x, y)}, 3000);	// *switch to fade out graphic
					} else if (time.full - s.time > 6 + rnd(6)) {
						addCargo(Object.create(goods.find(v => v.name == "Waste Products")), x, y, s.price, s.dest, s.origin);
					}
				}
				if (s.config != "live" && s.stat == "live") addCargo(Object.create(goods.find(v => v.name == "Fertilizer")), x, y, s.price, s.dest, s.origin);
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






















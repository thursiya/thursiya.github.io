// Original BASIC code: https://archive.org/details/creativecomputing-1978-05/page/n139/mode/2up

const oregon = {};
const oregonProvisions = ["your oxen team", "food", "ammunition", "clothing", "miscellaneous supplies"];

function initOregon() {
	currentApp = "Oregon";
	gameLog.length = 0;
	document.getElementById("textInput").type = "text";

	Object.keys(oregon).forEach(key => delete oregon[key]);
	Object.assign(oregon, { day: new Date("1847/03/29"), fort: 0, mountain: 0, timer: [0, 0], hurt: 0, responseTime: null, mileage: 0});
	
	updateLog(`<b>OREGON TRAIL</b><br><i>Based on the BASIC game by Bill Heinemann, Paul Dillenberger, and Don Rawitsch<br>Published in the May/June 1978 edition of Creative Computing</i><br>`);
	updateLog(`Do you need instructions?`);
	gameState = "Instructions";
	setInput();
}

function submitOregon() {
	const data = textInput.value.toUpperCase();
	if (!data) return;
	const num = isNaN(data) ? -1 : Math.floor(data);
	oregon.timer[1] = new Date();
	switch (gameState) {
		case "Instructions":
			appendLog(data[0] == "Y" ? "Yes" : "No");
			if (data[0] == "Y") {
				updateLog(`This program simulates a trip over the Oregon Trail from Independence, Missouri to Oregon City, Oregon in 1847. Your family of five will cover the 2040 mile 
    					Oregon Trail in 5-6 months - if you make it alive.`);
				updateLog(`You had saved $900 for the trip and you've just paid $200 for a wagon. You will need to spend the rest of your money on the following items:<ul><li>Oxen - You 
    					can spend $200-$300 on your team. The more you spend, the faster you'll go, because you'll have better animals.<li>Food - The more you have, the less chance there 
	 				is of getting sick.<li>Ammunition - $1 buys a belt of 50 bullets. You will need bullets for attacks by animals and bandits, and for hunting food.<li>Clothing - 
      					This is especially important for the cold weather you will encounter when crossing the mountains.<li>Miscellaneous Supplies - This includes medicine and other 
	   				things you will need for sickness and emergency repairs.</ul>`);
				updateLog(`You can spend all your money before you start your trip - or you can save some of your cash to spend at forts along the way when you run low. However, items 
    					cost more at the forts. You can also go hunting along the way to get more food.`);
				updateLog(`Whenever you have to use your trusty rifle along the way, you will be told to type in a word (one that sounds like a gun shot). The faster you type in that word 
    					and press 'Enter', the better luck you'll have with your gun.`);
				updateLog(`At each turn, all items are shown in dollar amounts, except bullets. When asked to enter money amounts, don't use a '$' (dollar sign).`);
				updateLog(`Good luck!!!`);
			}
			updateLog(`How good a shot are you with your rifle?<br> (1) Ace Marksman, (2) Good Shot, (3) Fair to Middlin', (4) Need More Practice, (5) Shaky Knees`);
			updateLog(`Enter one of the above - the better you claim you are, the faster you'll have to be with your gun to be successful:`);
			gameState = "IntroRifle";
			break;	
		case "IntroRifle":
			appendLog(num);
			if (num > 0 && num < 6) {
				oregon.shootingExpertise = num;
			} else {
				updateLog(`Okay, "Best in the West".`);
				oregon.shootingExpertise = 0;
			}		
		case "InitialSupplies":
			if (gameState == "InitialSupplies") {
				appendLog(num);
				if (oregon.fort == 0 && num < 200) {
					updateLog(`<i>Not enough.</i>`);
				} else if (oregon.fort == 0 && num > 300) {
					updateLog(`<i>Too much.</i>`);
				} else if (num < 0) {
					updateLog(`<i>Impossible!</i>`);
				} else {
					oregon[["oxen", "food", "ammo", "clothes", "supplies"][oregon.fort]] = num;
					oregon.fort++;
				}
			}
			if (oregon.fort > 4) {
				oregon.cash = 700 - oregon.oxen - oregon.food - oregon.ammo - oregon.clothes - oregon.supplies;
				if (oregon.cash < 0) {
					updateLog(`<i>You overspent - you only had $700 to spend. Buy again.</i>`);
					oregon.fort = 0;
				} else {
					updateLog(`After all your purchases, you now have ${oregon.cash} dollars left.`);
					oregon.ammo *= 50;
				}
			}
			if (oregon.fort < 5) {
				updateLog(`How much do you want to spend on ${oregonProvisions[oregon.fort]}?${oregon.fort ? "" : " <i>(200 - 300)</i>"}`);
				gameState = "InitialSupplies";
				break;
			} 
		case "NewTurn":
			updateLog(`<hr>${oregon.day.toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric"})}`);
			if (oregon.food < 1) oregon.food = 0;
			if (oregon.ammo < 1) oregon.ammo = 0;
			if (oregon.clothes < 1) oregon.clothes = 0;
			if (oregon.supplies < 1) oregon.supplies = 0;
			if (oregon.mileage < 2041) {
				if (oregon.day > new Date("1847/12/20")) {
					updateLog(`You have been on the trail too long -<br>🥶 Your family dies in the first blizzard of winter.`);
					oregonGameOver();
					break;
				}
				if (oregon.food < 13) updateLog(`<b><i>You'd better do some hunting or buy food and soon!!!!</i></b>`);
				if (oregon.hurt) {
					if (oregon.cash < 20) {
						updateLog(`You can't afford a doctor.`);
						oregonGameOver(1);
						break;
					}
					updateLog(`Doctor's bill is $20`);
					oregon.cash -= 20;
					oregon.hurt = 0;
				}
				updateLog(`Total mileage is <b>${oregon.mileage}</b>`);
			}				
			updateLog(`Food: <b>${oregon.food}</b>, Bullets: <b>${oregon.ammo}</b>, Clothing: <b>${oregon.clothes}</b>, Misc. Supp.: <b>${oregon.supplies}</b>, Cash: <b>${oregon.cash}</b>`);
			oregon.fort = oregon.fort ? 0 : 1;
			if (oregon.mileage > 2040) {
				updateLog(`President James K. Polk sends you his heartiest congratulations and wishes you a prosperous life ahead at your new home!`);
				gameState = "Restart";
				break;
			}
		case "ChoosePath":
			const oregonFailedHunting = gameState == "ChoosePath" && num == oregon.fort + 1 && oregon.ammo < 40;
			if (gameState != "ChoosePath" || oregonFailedHunting) {
				if (oregonFailedHunting) updateLog(`<i>Tough - you need more bullets to go hunting.</i>`);
				updateLog(`Do you want to (1) ${oregon.fort ? "stop at the next fort, (2) hunt, (3)" : "hunt, (2)"} continue?`);
				gameState = "ChoosePath";
				break;
			}
			appendLog(num);
			if (oregon.fort && num == 1) {
				gameState = "VisitFort";
				oregon.mileage -= 45;
			}
			if (num == oregon.fort + 1) {
				gameState = "Hunting";
				oregonShooting();
				break;
			}
		case "VisitFort":
			if (gameState == "VisitFort") {
				if (oregon.fort > 1) {
					appendLog(num);
					if (num > oregon.cash) {
						updateLog(`<i>You don't have that much - keep your spending down.<br>You miss your chance to spend on ${oregonProvisions[oregon.fort - 1]}.</i>`);
					} else {
						oregon.cash -= num;
						if (oregon.fort == 2) oregon.food += ~~(num * 2 / 3);
						if (oregon.fort == 3) oregon.ammo += ~~(num * 100 / 3);
						if (oregon.fort == 4) oregon.clothes += ~~(num * 2 / 3);
						if (oregon.fort == 5) oregon.supplies += ~~(num * 2 / 3);
					}	
				}
				if (oregon.fort < 5) {
					updateLog(`Enter what you wish to spend on ${oregonProvisions[oregon.fort]}:`);
					oregon.fort++;
					break;
				}
			}	
		case "Hunting":
			if (gameState == "Hunting") {
				oregonShootingResolution(data);
				if (oregon.responseTime <= 1) {
					updateLog(`Right between the eyes - you got a big one!!!!`);
					updateLog(`Full bellies tonight!`);
					oregon.food += ~~(Math.random() * 52) * 6;
					oregon.ammo -= ~~(Math.random() * 4 + 10);
				} else if (Math.random() * 100 > oregon.responseTime * 13) {
					updateLog(`Nice shot - right on target - good eatin' tonight!`);
					oregon.food += ~~(48 - 2 * oregon.responseTime);
					oregon.ammo -= ~~(10 + 3 * oregon.responseTime);
				} else {
					updateLog(`You missed - and your dinner got away.....`);
				}
				oregon.mileage -= 45;
			}
			if (oregon.food < 13) {
				updateLog(`You ran out of food and starved to death.`);
				oregonGameOver();
				break;
			}
		case "Eating":
			const oregonLowFood = oregon.food < 8 + 5 * num;
			if (gameState != "Eating" || num < 1 || num > 3 || oregonLowFood) {
				if (gameState == "Eating" && oregonLowFood) updateLog(`You can't eat that well.`);
				updateLog(`Do you want to eat (1) poorly (2) moderately or (3) well?`);
				gameState = "Eating";
				break;
			}
			appendLog(oregon.eating = num);
			oregon.food -= 8 + 5 * oregon.eating;
			oregon.mileage += 200 + ~~((oregon.oxen - 220) / 5 + Math.random() * 10);
			oregon.clothingFlag = 0;
			oregon.blizzardFlag = 0;

			// Riders
			if (Math.random() * 10 <= ((oregon.mileage / 100 - 4) ** 2 + 72) / ((oregon.mileage / 100 - 4) ** 2 + 12) - 1) {
				gameState = "Riders";
				oregon.hostility = Math.random();
				updateLog(`Riders ahead. They ${oregon.hostility < 0.8 ? "" : "don't "}look hostile.`);
			}
		case "Tactics":
			if (gameState == "Riders" || gameState == "Tactics" && (num < 0 || num > 4)) {
				updateLog(`Tactics:<br>(1) Run (2) Attack (3) Continue (4) Circle Wagons`);
				gameState = "Tactics";
				break;
			}
			if (gameState == "Tactics") appendLog(num);
			if (gameState == "Tactics" && oregon.hostility < 0.68 && (num == 2 || num == 4)) {
				gameState = num == 2 ? "Attacking" : "Defending";
				oregonShooting();
				break;					
			}
		case "Attacking":
		case "Defending":
			if (["Tactics", "Attacking", "Defending"].includes(gameState)) {
				// Hostile Riders
				if (oregon.hostility < 0.68) {
					if (num == 3 && oregon.hostility > 0.543) {
						updateLog(`They did not attack.`);
					} else {
						if (num == 1) {
							oregon.mileage += 20;
							oregon.oxen -= 40;
						}
						if (num == 1 || num == 3) {
							oregon.ammo -= 150;
							oregon.supplies -= 15;
						} else {
							oregon.ammo -= ~~(oregon.responseTime * (gameState == "Attacking" ? 40 : 30) + 80);
							if (gameState == "Defending") oregon.mileage -= 25;
							if (oregon.responseTime <= 1) {
								updateLog(`Nice shooting - you drove them off.`);
							} else if (oregon.responseTime <= 4) {
								updateLog(`Kinda slow with your Colt .45.`);
							} else {
								updateLog(`Lousy shot - you got knifed.<br>You have to see ol' Doc Blanchard.`);
								oregon.hurt = 2;
							}
						}
						updateLog(`Riders were hostile - check for losses.`);
						if (oregon.ammo < 0) {
							updateLog(`You ran out of bullets and got massacred by the riders.`);
							oregonGameOver();
							break;
						}		
					}
				// Friendly Riders
				} else {
					const oregonFriendly = [{ m: 15, o: -10 }, { m: -5, a: -100 }, {}, { m: -20 }];
					oregon.mileage += oregonFriendly[num - 1].m || 0;
					oregon.oxen += oregonFriendly[num - 1].o || 0;
					oregon.ammo += oregonFriendly[num - 1].a || 0;
					updateLog(`Riders were friendly, but check for possible losses.`);
				}							
			}

			// Event
			updateLog(`<div style="text-align: center">* &nbsp; * &nbsp; *</div>`);
			const oregonRandomEvent = Math.random() * 100;
			const oregonEventIndex = [6, 11, 13, 15, 17, 22, 32, 35, 37, 42, 44, 54, 64, 69, 95, 100].findIndex(v => v > oregonRandomEvent);
			const oregonEvent = [
				{ t: "🔨 Wagon breaks down - lose time and supplies fixing it.", m: -15 - ~~(Math.random() * 5), s: -8 },
				{ t: "🐂 Ox injures leg - slows down rest of trip.", m: -25, o: -20 },
				{ t: "🤸 Bad luck - your daughter broke her arm. You had to stop and use supplies to make a sling.", m: -5 - ~~(Math.random() * 4), s: -2 - ~~(Math.random() * 3) },
				{ t: "🐂 Ox wanders off - spend time looking for it.", m: -17 },
				{ t: "🚶 Your son gets lost - spend half the day looking for him.", m: -10 },
				{ t: "🚱 Unsafe water - lose time looking for clean spring.", m: -2 - ~~(Math.random() * 10) },
				{ t: "⛆ Heavy rains - time and supplies lost.", f: -10, a: -500, s: -15, m: -5 - ~~(Math.random() * 10) },
				{ t: "👺 Bandits attack." },
				{ t: "🔥 There was a fire in your wagon - food and supplies damage!", f: -40, a: -400, s: -3 - ~~(Math.random() * 8), m: -15 },
				{ t: "🌫 Lose your way in heavy fog - time is lost.", m: -10 - ~~(Math.random() * 5) },
				{ t: "🐍 You killed a poisonous snake after it bit you.", a: -10, s: -5 },
				{ t: "🌊 Wagon gets swamped fording river - lose food and clothes.", f: -30, c: -20, m: -20 - ~~(Math.random() * 20) },
				{ t: "🐺 Wild animals attack!" },
				{ t: "⛈ Hail storm - supplies damaged.", m: -5 - ~~(Math.random() * 10), a: -200, s: -4 - ~~(Math.random() * 3) },
				{ t: "" },
				{ t: "🍓 Helpful Indians show you where to find more food.", f: 14 }
			][oregonEventIndex];
			
			// Heavy rains becomes cold weather when past the plains
			if (oregonEventIndex == 6 && oregon.mileage > 950) {
				updateLog(`🌨 Cold weather - brrrrrrr!`);
				if (oregon.clothes > 22 + Math.random() * 4) {
					updateLog(`But you have enough clothing to keep you warm.`);
				} else {
					updateLog(`You don't have enough clothing to keep you warm.`);
					oregonSick();
					if (gameState == "GameOver") break;
				}
			} else {
				updateLog(`${oregonEvent.t}`);
				oregon.mileage += oregonEvent.m || 0;
				oregon.supplies += oregonEvent.s || 0;
				oregon.oxen += oregonEvent.o || 0;
				oregon.food += oregonEvent.f || 0;
				oregon.ammo += oregonEvent.a || 0;
				oregon.clothes += oregonEvent.c || 0;
			}
			
			if (oregonEventIndex == 7 || oregonEventIndex == 12) {
				gameState = oregonEventIndex == 7 ? "Bandits" : "WildAnimals";
				oregonShooting();
				break;
			}
			if (oregonEventIndex == 10 && oregon.supplies < 0) {
				updateLog(`🩸 You die of snakebite since you have no medicine.`);
				oregonGameOver();
			} else if (oregonEventIndex == 14 && Math.random() * 4 > oregon.eating - 1) {
				oregonSick();	
			}				
			if (gameState == "GameOver") break;
			
		case "Bandits":
		case "WildAnimals":
			if (gameState == "Bandits" || gameState == "WildAnimals") {
				oregonShootingResolution(data);
				if (gameState == "Bandits") {
					oregon.ammo -= ~~(oregon.responseTime * 20);
					if (oregon.ammo < 0) {
						updateLog(`You ran out of bullets - they got lots of cash.`);
						oregon.cash = ~~(oregon.cash / 3);
					}
					if (oregon.ammo < 0 || oregon.responseTime > 1) {
						updateLog(`You got shot in the leg and they took one of your oxen.<br>Better have a doc look at your wound.`);
						oregon.hurt = 2;
						oregon.supplies -= 5;
						oregon.oxen -= 20;
					} else {
						updateLog(`Quickest draw outside of Dodge City!!! You got 'em!`);
					}
				} else {
					if (oregon.ammo < 40) {
						updateLog(`You were too low on bullets - the wolves overpowered you.`);
						oregon.hurt = 2;
						oregonGameOver(1);
						break;
					} else {
						if (oregon.responseTime <= 2) {
							updateLog(`Nice shootin' partner - they didn't get much.`);
						} else {
							updateLog(`Slow on the draw - they got at your food and clothes.`);
							oregon.clothes -= ~~(oregon.responseTime * 4);
							oregon.food -= ~~(oregon.responseTime * 8);
						}
						oregon.ammo -= ~~(oregon.responseTime * 20);
					}
				}
			}

			// Mountains
			if (oregon.mountain || oregon.mileage > 950) {
				if (Math.random() * 10 <= 9 - ((oregon.mileage / 100 - 15) ** 2 + 72) / ((oregon.mileage / 100 - 15) ** 2 + 12)) {
					updateLog(`🏔️ Rugged Mountains`);
					if (Math.random() > .1) {
						if (Math.random() > .11) {
							updateLog(`The going gets slow.`);
							oregon.mileage -= 45 + ~~(Math.random() * 50);
						} else {
							updateLog(`Wagon damaged! - lose time and supplies.`);
							oregon.supplies -= 5;
							oregon.ammo -= 200;
							oregon.mileage -= 20 + ~~(Math.random() * 30);
						}
					} else {
						updateLog(`You got lost - lose valuable time trying to find trail!`);
						oregon.mileage -= 60;
					}
				}
				if (oregon.mountain == 0 || (oregon.mountain == 1 && oregon.mileage > 1699)) {
					oregon.mountain++;
					if (Math.random() * 10 < 9 - oregon.mountain) {
						updateLog(`❄❄❄ Blizzard in mountain pass - time and supplies lost.`);
						oregon.food -= 15;
						oregon.supplies -= 10;
						oregon.ammo -= 300;
						oregon.mileage -= 30 + ~~(Math.random() * 40);
						if (oregon.clothes < 18 + Math.random() * 2) {
							oregonSick();
							if (gameState == "GameOver") break;
						}
					} else {
						if (oregon.mountain == 1) updateLog(`You made it safely through South Pass - no snow.`);
					}
				}
				if (oregon.mileage < 950) oregon.mileage = 950;
			}
			
			// Check for victory
			if (oregon.mileage > 2040) {
				updateLog(`You finally arrived at Oregon City after 2040 long miles - hooray!!!!!<br>A real pioneer!`);
				const oregonPartial = (2040 - oregon.lastMileage) / (oregon.mileage - oregon.lastMileage);
				oregon.day.setDate(oregon.day.getDate() + ~~(14 * oregonPartial));
				oregon.food += ~~((1 - oregon.partial) * (oregon.eating * 5 + 8));
			} else {
				oregon.lastMileage = oregon.mileage;
				oregon.day.setDate(oregon.day.getDate() + 14);
			}
			gameState = "NewTurn";
			submitOregon();
			break;
		case "GameOver":
			appendLog(data[0] == "Y" ? "Yes" : "No");
			if (oregon.fort < 2) {
				updateLog(`Would you like ${["a fancy funeral", "us to inform your next of kin"][oregon.fort]}?`);
				oregon.fort++;
			} else {
				updateLog(data[0] == "Y" ? `That will be $4.50 for the telegraph charge.` : `But your aunt Sadie in St. Louis is really worried about you.`);
				updateLog(`<i>We thank you for this information and we are sorry you didn't make it to the great territory of Oregon.<br>Better luck next time.</i>`);
				updateLog(`<span style="float: right; font-style: italic">Sincerely,<br>The Oregon City Chamber of Commerce</span>`);
				updateLog(`<div style="clear:right"></div>`);
				gameState = "Restart";
			}
			break;
		default:
			updateLog(`<i>Reload the game to restart</i>`);
			break;
	}
	setInput();
}

function oregonShooting() {
	oregon.shotType = ["Bang", "Bam", "Pow", "Wham"][~~(Math.random() * 4)];
	updateLog(`Type: <b>${oregon.shotType}</b>`);
	oregon.timer[0] = new Date();
}

function oregonShootingResolution(data) {
	oregon.responseTime = (oregon.timer[1] - oregon.timer[0]) / 1000 - oregon.shootingExpertise + 1;
	if (oregon.responseTime < 0) oregon.responseTime = 0;
	if (data != oregon.shotType.toUpperCase()) oregon.responseTime = 9;
}

function oregonSick() {
	const oregonIllness = Math.random() * 100 < oregon.eating * 35 - 25 ? "Mild" : Math.random() * 100 < 100 - 40 / 4 ** (oregon.eating - 1) ? "Bad" : "Serious";
	updateLog(`🤒 ${oregonIllness} illness -${oregonIllness == "Serious" ? "<br>You must stop for medical attention" : " medicine used"}`);
	if (oregonIllness == "Serious") {
		oregon.hurt = 1;
	} else {
		oregon.mileage -= 5;
	}
	oregon.supplies -= oregonIllness == "Mild" ? 2 : oregonIllness == "Bad" ? 5 : 10;
	if (oregon.supplies < 0) {
		updateLog(`You ran out of medical supplies.`);
		oregonGameOver(1);
	}
}

function oregonGameOver(cause) {
	gameState = "GameOver";
	oregon.fort = 0;
	updateLog(`<div style="text-align: center; text-weight: bold">💀 💀 💀</div>`);
	if (cause) updateLog(`You died of ${oregon.hurt == 2 ? "injuries" : "pneumonia"}.`);
	updateLog(`Due to your unfortunate situation, there are a few formalities we must go through.`);
	updateLog(`Would you like a minister?`);
}

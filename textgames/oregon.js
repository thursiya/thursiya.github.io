// Original BASIC code: https://archive.org/details/creativecomputing-1978-05/page/n139/mode/2up

const oregon = { day: new Date("1847-03-29"), fort: 0, mountain: 0, timer: [0, 0], hurt: 0, responseTime: null, mileage: 0 };
const oregonProvisions = ["your oxen team", "food", "ammunition", "clothing", "miscellaneous supplies"];

function initOregon() {
	currentApp = "Oregon";
	gameLog.length = 0;
	document.getElementById("textInput").type = "text";

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
			updateLog(`Enter one of the above - the better you claim you are, the faster you'll have to be with your gun to be successful.`);
			gameState = "IntroRifle";
			break;	
		case "IntroRifle":
			if (num > 0 && num < 6) {
				oregon.shootingExpertise = num;
			} else {
				updateLog(`Okay, "Best in the West".`);
				oregon.shootingExpertise = 0;
			}
			gameState = "InitialSupplies";		
		case "InitialSupplies":
			if (oregon.fort < 5) {
				updateLog(`How much do you want to spend on ${oregonProvisions[oregon.fort]}?${oregon.fort ? "" : " <i>(200 - 300)</i>"}`);
				if (oregon.fort) {
					if (oregon.fort == 1 && num < 200) {
						updateLog(`Not enough.`);
					} else if (oregon.fort == 1 && num > 300) {
						updateLog(`Too much.`);
					} else if (num < 0) {
						updateLog(`Impossible!`);
					} else {
						oregon[["oxen", "food", "ammo", "clothes", "supplies"][oregon.fort - 1]] = num;
						oregon.fort++;
					}
				} else {
					oregon.fort++;
				}
				break;
			} else {
				oregon.cash = 700 - oregon.oxen - oregon.food - oregon.ammo - oregon.clothes - oregon.supplies;
				if (oregon.cash < 0) {
					updateLog(`You overspent - you only had $700 to spend. Buy again.`);
					oregon.fort = 0;
					break;
				}
				updateLog(`After all your purchases, you now have ${oregon.cash} dollars left.`);
				oregon.ammo *= 50;
			}
		case "NewTurn":
			updateLog(`<hr>${oregon.day.toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric"})}`);
			if (oregon.food < 1) oregon.food = 0;
			if (oregon.ammo < 1) oregon.ammo = 0;
			if (oregon.clothes < 1) oregon.clothes = 0;
			if (oregon.supplies < 1) oregon.supplies = 0;
			if (oregon.mileage < 2041) {
				if (oregon.day > new Date("1847/12/20")) {
					updateLog(`You have been on the trail too long -<br>Your family dies in the first blizzard of winter.`);
					oregonGameOver();
					break;
				}
				if (oregon.food < 13) updateLog(`You'd better do some hunting or buy food and soon!!!!`);
				if (oregon.hurt) {
					if (oregon.cash < 20) {
						updateLog(`You can't afford a doctor.`);
						oregonDied();
						break;
					}
					updateLog(`Doctor's bill is $20`);
					oregon.cash -= 20;
					oregon.hurt = 0;
				}
			}				
			updateLog(`Total mileage is <b>${oregon.mileage}</b>`);
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
				if (oregonFailedHunting) updateLog(`Tough - you need more bullets to go hunting.`);
				updateLog(`Do you want to (1) ${oregon.fort ? "stop at the next fort, (2) hunt, (3)" : "hunt, (2)"} continue`);
				gameState = "ChoosePath";
				break;
			}
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
			if (gameState == "VisitFort" && oregon.fort < 6) {
				if (oregon.fort > 1) {
					if (num > oregon.cash) {
						updateLog(`You don't have that much - keep your spending down.`);
						updateLog(`You miss your chance to spend on ${oregonProvisions[oregon.fort - 1]}`);
					} else {
						oregon.cash -= num;
						if (oregon.fort == 2) oregon.food += ~~(num * 2 / 3);
						if (oregon.fort == 3) oregon.ammo += ~~(num * 100 / 3);
						if (oregon.fort == 4) oregon.clothes += ~~(num * 2 / 3);
						if (oregon.fort == 5) oregon.supplies += ~~(num * 2 / 3);
					}	
				}
				updateLog(`Enter what you wish to spend on ${oregonProvisions[oregon.fort]}:`);
				oregon.fort++;
				break;
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
				updateLog(`Do you want to eat (1) poorly (2) moderately or (3) well`);
				gameState = "Eating";
				break;
			}
			oregon.eating = num;
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
			if (gameState == "Tactics" && oregon.hostility < 0.68 && (num == 2 || num == 4)) {
				gameState = num == 2 ? "Attacking" : "Defending";
				oregonShooting();
				break;					
			}
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
							oregon.ammo -= oregon.responseTime * (gameState == "Attacking" ? 40 : 30) + 80;
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
			const oregonRandomEvent = Math.random() * 100;
			const oregonEventIndex = [6, 11, 13, 15, 17, 22, 32, 35, 37, 42, 44, 54, 64, 69, 95, 100].findIndex(v => v > oregonRandomEvent);
			const oregonEvent = [
				{ t: "Wagon breaks down - lose time and supplies fixing it.", m: -15 - ~~(Math.random() * 5), s: -8 },
				{ t: "Ox injures leg - slows down rest of trip.", m: -25, o: -20 },
				{ t: "Bad luck - your daughter broker her arm. You had to stop and use supplies to make a sling.", m: -5 - ~~(Math.random() * 4), s: -2 - ~~(Math.random() * 3) },
				{ t: "Ox wanders off - spend time looking for it.", m: -17 },
				{ t: "Your son gets lost - spend half the day looking for him.", m: -10 },
				{ t: "Unsafe water - lose time looking for clean spring.", m: -2 - ~~(Math.random() * 10) },
				{ t: "Heavy rains - time and supplies lost.", f: -10, a: -500, s: -15, m: -5 - ~~(Math.random() * 10) },
				{ t: "Bandits attack." },
				{ t: "There was a fire in your wagon - food and supplies damage!", f: -40, a: -400, s: -3 - ~~(Math.random() * 8), m: -15 },
				{ t: "Lose your way in heavy fog - time is lost.", m: -10 - ~~(Math.random() * 5) },
				{ t: "You killed a poisonous snake after it bit you.", a: -10, s: -5 },
				{ t: "Wagon gets swamped fording river - lose food and clothes.", f: -30, c: -20, m: -20 - ~~(Math.random() * 20) },
				{ t: "Wild animals attack!" },
				{ t: "Hail storm - supplies damaged.", m: -5 - ~~(Math.random() * 10), a: -200, s: -4 - ~~(Math.random() * 3) },
				{ t: "" },
				{ t: "Helpful Indians show you where to find more food.", f: 14 }
			][oregonEventIndex];
			console.log(`DEBUG) oregonEventIndex: ${oregonEventIndex} (${oregonEvent.t})`);
			
			// Heavy rains becomes cold weather when past the plains
			if (oregonEventIndex == 6 && oregon.mileage > 950) {
				updateLog(`Cold weather - brrrrrrr!`);
				if (oregon.clothes > 22 + Math.random() * 4) {
					updateLog(`But you have enough clothing to keep you warm.`);
				} else {
					updateLog(`You don't have enough clothing to keep you warm.`);
					oregonSick();
				}
				break;
			}
			
			updateLog(oregonEvent.t);
			oregon.mileage += oregonEvent.m || 0;
			oregon.supplies += oregonEvent.s || 0;
			oregon.oxen += oregonEvent.o || 0;
			oregon.food += oregonEvent.f || 0;
			oregon.ammo += oregonEvent.a || 0;
			
			if (oregonEventIndex == 7 || oregonEventIndex == 12) {
				gameState = oregonEventIndex == 7 ? "Bandits" : "WildAnimals";
				oregonShooting();
				break;
			}
			if (oregonEventIndex == 10 && oregon.supplies < 0) {
				updateLog(`You die of snakebite since you have no medicine.`);
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
						oregonDied();
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
					updateLog(`Rugged Mountains`);
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
						updateLog(`Blizzard in mountain pass - time and supplies lost.`);
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
			if (oregon.fort < 2) {
				updateLog(`Would you like ${["a fancy funeral", "us to inform your next of kin"][oregon.fort]}?`);
				oregon.fort++;
			} else {
				updateLog(data[0] == "Y" ? `That will be $4.50 for the telegraph charge.` : `But your aunt Sadie in St. Louis is really worried about you.`);
				updateLog(`<i>We thank you for this information and we are sorry you didn't make it to the great territory of Oregon.<br>Better luck next time.</i>`);
				updateLog(`<span style="float: right; font-style: italic">Sincerely,<br>The Oregon City Chamber of Commerce</span>`);
				gameState = "Restart";
			}
			break;
		default:
			updateLog(`<i>Reload the game to restart</i>`);
			break;
	}
	setInput();
}

/*
function submitOregon() {
	const data = textInput.value.toUpperCase();
	if (!data) return;
	const num = isNaN(data) ? -1 : Math.floor(data);
	oregon.timer[1] = new Date();
	switch (gameState) {
		case "Instructions":
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
			gameState = "IntroRifle";
			break;
		case "IntroRifle":
			if (num > 0 && num < 6) {
				oregon.shootingExpertise = num;
			} else {
				updateLog(`Okay, "Best in the West".`);
				oregon.shootingExpertise = 0;
			}
			gameState = "InitialSupplies";
			break;
		case "InitialSupplies":
			if (oregon.fort == 0 && num < 200) {
				updateLog(`Not enough.`);
			} else if (oregon.fort == 0 && num > 300) {
				updateLog(`Too much.`);
			} else if (num < 0) {
				updateLog(`Impossible!`);
				console.log(`(Debug) num: ${num}`);
			} else {
				oregon[["oxen", "food", "ammo", "clothes", "supplies"][oregon.fort]] = num;
				oregon.fort++;
			}
			if (oregon.fort > 4) {
				oregon.cash = 700 - oregon.oxen - oregon.food - oregon.ammo - oregon.clothes - oregon.supplies;
				if (oregon.cash < 0) {
					updateLog(`You overspent - you only had $700 to spend. Buy again.`);
					gameState = "InitialSupplies";
				} else {
					updateLog(`After all your purchases, you now have ${oregon.cash} dollars left.`);
					oregon.ammo *= 50;
					gameState = "NewTurn";
				}
				oregon.fort = 1;
			}
			break;
		case "ChoosePath":
			if (oregon.fort && num == 1) {
				gameState = "VisitFort";
			} else if (num == 1 || (oregon.fort && num == 2)) {
				if (oregon.ammo < 40) {
					updateLog(`Tough - you need more bullets to go hunting`);
				} else {
					gameState = "Hunting";
				}
			} else {
				gameState = "Eating";
			}
			break;
		case "VisitFort":
			if (num > oregon.cash) {
				updateLog(`You don't have that much - keep your spending down.`);
				updateLog(`You miss your chance to spend on ${oregonProvisions[oregon.fort - 1]}`);
			} else {
				oregon.cash -= num;
				if (oregon.fort == 1) oregon.food += ~~(num * 2 / 3);
				if (oregon.fort == 2) oregon.ammo += ~~(num * 100 / 3);
				if (oregon.fort == 3) oregon.clothes += ~~(num * 2 / 3);
				if (oregon.fort == 4) oregon.supplies += ~~(num * 2 / 3);
			}
			oregon.fort++;
			if (oregon.fort > 4) {
				oregon.fort = 1;
				oregon.mileage -= 45;
				gameState = "Eating";
			}
			break;
		case "Eating":
			if (num > 0 && num < 4) {
				if (oregon.food < 8 + 5 * num) {
					updateLog(`You can't eat that well`);
				} else {
					oregon.eating = num;
					oregon.food -= 8 + 5 * oregon.eating;
					oregon.mileage += 200 + ~~((oregon.oxen - 220) / 5 + Math.random() * 10);
					oregon.clothingFlag = 0;
					oregon.blizzardFlag = 0;
					gameState = (Math.random() * 10 > ((oregon.mileage / 100 - 4) ** 2 + 72) / ((oregon.mileage / 100 - 4) ** 2 + 12) - 1) ? "Event" : "Riders";
				}
			}
			break;
		case "Hunting":
		case "Attacking":
		case "Defending":
		case "Bandits":
		case "WildAnimals":
			oregon.responseTime = (oregon.timer[1] - oregon.timer[0]) / 1000 - oregon.shootingExpertise + 1;
			if (oregon.responseTime < 0) oregon.responseTime = 0;
			if (data != oregon.shotType.toUpperCase()) oregon.responseTime = 9;
			if (gameState == "Hunting") {
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
				gameState = "Eating";
				break;
			} else if (gameState == "Bandits") {
				oregon.ammo -= ~~(20 * oregon.responseTime);
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
				gameState = "Moutains";
				break;
			} else if (gameState == "WildAnimals") {
				if (oregon.ammo < 40) {
					updateLog(`You were too low on bullets - the wolves overpowered you.`);
					oregon.hurt = 2;
					gameState = "Died";
				} else {
					if (oregon.responseTime <= 2) {
						updateLog(`Nice shootin' partner - they didn't get much.`);
					} else {
						updateLog(`Slow on the draw - they got at your food and clothes.`);
						oregon.clothes -= ~~(oregon.responseTime * 4);
						oregon.food -= ~~(oregon.responseTime * 8);
					}
					oregon.ammo -= ~~(oregon.responseTime * 20);
					gameState = "Mountains";
				}
				break;
			}
		case "Riders":
			if (oregon.hostility < 0.68 && (num == 2 || num == 4)) {
					gameState = num == 2 ? "Attacking" : "Defending";
			} else if (num > 0 && num < 5 || gameState == "Attacking" || gameState == "Defending") {
				// Hostile Riders
				if (oregon.hostility < 0.68) {
					if (num == 3 && oregon.hostility > 0.543) {
						updateLog(`They did not attack.`);
					} else {
						switch (true) {
							case (num == 1):	// Run
								oregon.mileage += 20;
								oregon.oxen -= 40;
							case (num == 3):	// Continue
								oregon.ammo -= 150;
								oregon.supplies -= 15;
								break;
							case (num == 2 || num == 4 || gameState == "Attacking" || gameState == "Defending"):		// Attack, Defend
								oregon.ammo -= oregon.responseTime * (gameState == "Attacking" ? 40 : 30) - 80;
								if (gameState == "Defending") oregon.mileage -= 25;
								if (oregon.responseTime <= 1) {
									updateLog(`Nice shooting - you drove them off.`);
								} else if (oregon.responseTime <= 4) {
									updateLog(`Kinda slow with your Colt .45.`);
								} else {
									updateLog(`Lousy shot - you got knifed.<br>You have to see ol' Doc Blanchard.`);
									oregon.hurt = 2;
								}		
							default:
								break;
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
					switch (num) {
						case 1:		// Run
							oregon.mileage += 15;
							oregon.oxen -= 10;
							break;
						case 2:		// Attack
							oregon.mileage -= 5;
							oregon.ammo -= 100;
							break;
						case 4:		// Defend
							oregon.mileage -= 20;
						default:	// Continue
							break;
					}
					updateLog(`Riders were friendly, but check for possible losses.`);
				}
				gameState = "Event";							
			}
			break;
		case "GameOver":
			if (oregon.fort == 2) updateLog(data[0] == "Y" ? `That will be $4.50 for the telegraph charge.` : `But your aunt Sadie in St. Louis is really worried about you.`);
			oregon.fort++;
			break;
		case "Restart":
			updateLog(`<i>Reload the game to restart</i>`);
			break;
		default:
			break;
	}
	announceOregon();
}
*/

/* function announceOregon() {
	switch (gameState) {
		case "IntroRifle":
			updateLog(`How good a shot are you with your rifle?<br> (1) Ace Marksman, (2) Good Shot, (3) Fair to Middlin', (4) Need More Practice, (5) Shaky Knees`);
			updateLog(`Enter one of the above - the better you claim you are, the faster you'll have to be with your gun to be successful.`);
			break;
		case "InitialSupplies":
			updateLog(`How much do you want to spend on ${["your oxen team? <i>(200 - 300)</i>", ...oregonProvisions][oregon.fort]}${oregon.fort ? "?" : ""}`);
			break;
		case "NewTurn":
			updateLog(`<hr>Monday March 29 1847`);
			if (oregon.food < 1) oregon.food = 0;
			if (oregon.ammo < 1) oregon.ammo = 0;
			if (oregon.clothes < 1) oregon.clothes = 0;
			if (oregon.supplies < 1) oregon.supplies = 0;
			if (oregon.food < 13) updateLog(`You'd better do some hunting or buy food and soon!!!!`);
			// original code rounds off variable values here - necessary?
			// set "total mileage up from previous turn" to oregon.mileage
			if (oregon.hurt) {
				oregon.cash -= 20;
				if (oregon.cash < 0) {
					updateLog(`You can't afford a doctor.`);
					oregonDied();
					break;
				}
				updateLog(`Doctor's bill is $20`);
				oregon.hurt = 0;
			}
			updateLog(`Total mileage is <b>${oregon.southPassSettingMileageFlag ? 950 : oregon.mileage}</b>`);
			oregon.southPassSettingMileageFlag = 0;
			updateLog(`Food: <b>${oregon.food}</b>, Bullets: <b>${oregon.ammo}</b>, Clothing: <b>${oregon.clothes}</b>, Misc. Supp.: <b>${oregon.supplies}</b>, Cash: <b>${oregon.cash}</b>`);
			oregon.fort = oregon.fort ? 0 : 1;
			oregon.hostility = Math.random();
			gameState = "ChoosePath";
		case "ChoosePath":
			updateLog(`Do you want to (1) ${oregon.fort ? "stop at the next fort, (2) hunt, (3)" : "hunt, (2)"} continue`);
			break;
		case "VisitFort":
			updateLog(`Enter what you wish to spend on ${oregonProvisions[oregon.fort - 1]}:`);
			break;
		case "Event":
			const oregonRandomEvent = Math.random() * 100;
			const oregonEventIndex = [6, 11, 13, 15, 17, 22, 32, 35, 37, 42, 44, 54, 64, 69, 95, 100].findIndex(v => v > oregonRandomEvent);
			const oregonEvent = [
				{ t: "Wagon breaks down - lose time and supplies fixing it.", m: -15 - ~~(Math.random() * 5), s: -8 },
				{ t: "Ox injures leg - slows down rest of trip.", m: -25, o: -20 },
				{ t: "Bad luck - your daughter broker her arm. You had to stop and use supplies to make a sling.", m: -5 - ~~(Math.random() * 4), s: -2 - ~~(Math.random() * 3) },
				{ t: "Ox wanders off - spend time looking for it.", m: -17 },
				{ t: "Your son gets lost - spend half the day looking for him.", m: -10 },
				{ t: "Unsafe water - lose time looking for clean spring.", m: -2 - ~~(Math.random() * 10) },
				{ t: "Heavy rains - time and supplies lost.", f: -10, a: -500, s: -15, m: -5 - ~~(Math.random() * 10) },
				{ t: "Bandits attack." },
				{ t: "There was a fire in your wagon - food and supplies damage!", f: -40, a: -400, s: -3 - ~~(Math.random() * 8), m: -15 },
				{ t: "Lose your way in heavy fog - time is lost.", m: -10 - ~~(Math.random() * 5) },
				{ t: "You killed a poisonous snake after it bit you.", a: -10, s: -5 },
				{ t: "Wagon gets swamped fording river - lose food and clothes.", f: -30, c: -20, m: -20 - ~~(Math.random() * 20) },
				{ t: "Wild animals attack!" },
				{ t: "Hail storm - supplies damaged.", m: -5 - ~~(Math.random() * 10), a: -200, s: -4 - ~~(Math.random() * 3) },
				{ t: "" },
				{ t: "Helpful Indians show you where to find more food.", f: 14 }
			][oregonEventIndex];
			console.log(`DEBUG) oregonEventIndex: ${oregonEventIndex} (${oregonEvent.t})`);
			
			// Heavy rains becomes cold weather when past the plains
			if (oregonEventIndex == 6 && oregon.mileage > 950) {
				updateLog(`Cold weather - brrrrrrr!`);
				if (oregon.clothes > 22 + Math.random() * 4) {
					updateLog(`But you have enough clothing to keep you warm.`);
				} else {
					updateLog(`You don't have enough clothing to keep you warm.`);
					oregonSick();
				}
				break;
			}
			
			updateLog(oregonEvent.t);
			oregon.mileage += oregonEvent.m || 0;
			oregon.supplies += oregonEvent.s || 0;
			oregon.oxen += oregonEvent.o || 0;
			oregon.food += oregonEvent.f || 0;
			oregon.ammo += oregonEvent.a || 0;
			
			if (oregonEventIndex == 7 || oregonEventIndex == 12) {
				gameState = oregonEventIndex == 7 ? "Bandits" : "WildAnimals";
			} else {
				if (oregonEventIndex == 10 && oregon.supplies < 0) {
					updateLog(`You die of snakebite since you have no medicine.`);
					oregonGameOver();
				} else if (oregonEventIndex == 14 && Math.random() * 4 > oregon.eating - 1) {
					oregonSick();	
				}				
				if (gameState == "GameOver") break;
				// Mountains
				
				break;
			}
		case "Hunting":
		case "Attacking":
		case "Defending":
		case "Bandits":
		case "WildAnimals":
			oregon.shotType = ["Bang", "Bam", "Pow", "Wham"][~~(Math.random() * 4)];
			updateLog(`Type: <b>${oregon.shotType}</b>`);
			oregon.timer[0] = new Date();
			break;
		case "Eating":
			if (oregon.food < 13) {
				updateLog(`You ran out of food and starved to death.`);
				oregonGameOver();
			} else {
				updateLog(`Do you want to eat (1) poorly (2) moderately or (3) well`);
			}
			break;
		case "Riders":
			updateLog(`Riders ahead. They ${oregon.hostility < 0.8 ? "" : "don't "}look hostile.`);
			updateLog(`Tactics:<br>(1) Run (2) Attack (3) Continue (4) Circle Wagons`);			
			break;
		case "Mountains":
			if (oregon.mileage <= 950) {
				gameState = "SettingDate";
			} else {
				if (Math.random() * 10 > 9 - ((oregon.mileage / 100 - 15) ** 2 + 72) / ((oregon.mileage / 100 - 15) ** 2 + 12)) {
				// 4860
				} else {
					updateLog(`Rugged Mountains`);
					if (Math.random() > .1) {
						if (Math.random() > .11) {
							updateLog(`The going gets slow.`);
							oregon.mileage -= 45 + ~~(Math.random() * 50);
							// 4860
						} else {
							updateLog(`Wagon damaged! - lose time and supplies.`);
							oregon.supplies -= 5;
							oregon.ammo -= 200;
							oregon.mileage -= 20 + ~~(Math.random() * 30);
							// 4860
						}
					} else {
						updateLog(`You got lost - lose valuable time trying to find trail!`);
						oregon.mileage -= 60;
						// 4860
					}
				}
				// 4860 --->
			}
			break;		*/
			/*
   // ***MOUNTAINS***
4860 IF F1 = 1 THEN 4900	// Flag for clearing south pass
4870 Fl = l
4880 IF RND(-1) < .8 THEN 4970
4890 PRINT "YOU MADE IT SAFELY THR0UGH SOUTH PASS--N0 SN0W"
4900 IF M < 1700 THEN 4940
4910 IF F2 = 1 THEN 4940
4920 F2 = l
4930 IF RND(-1) < .7 THEN 4970
4940 IF M > 950 THEN 1230
4950 M9 = 1
4960 GOTO 1230
4970 PRINT "BLIZZARD IN MOUNTAIN PASS--TIME AND SUPPLIES LOST"
4980 L1 = l
4990 F = F - 25
5000 M1 = M1 - 10
5010 B = B - 300
5020 M = M - 30 - 40 * RND(-1)
5030 IF C < 18 + 2 * RND(-1) THEN 6300
5040 GOTO 4940 */
/*		case "Died":
			oregonDied();
			break;
		case "GameOver":
			if (oregon.fort < 3) {
				updateLog(`Would you like ${["a fancy funeral", "us to inform your next of kin"][oregon.fort - 1]}?`);
			} else {
				updateLog(`<i>We thank you for this information and we are sorry you didn't make it to the great territory of Oregon.<br>Better luck next time.</i>`);
				updateLog(`<span style="float: right; font-style: italic">Sincerely,<br>The Oregon City Chamber of Commerce</span>`);
				gameState = "Restart";
			}
			break;
		default:
			break;
	}
	setInput();
}	*/

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
	updateLog(`${oregonIllness} illness -${oregonIllness == "Serious" ? "<br>You must stop for medical attention" : " medicine used"}`);
	if (oregonIllness == "Serious") {
		oregon.hurt = 1;
	} else {
		oregon.mileage -= 5;
	}
	oregon.supplies -= oregonIllness == "Mild" ? 2 : oregonIllness == "Bad" ? 5 : 10;
	if (oregon.supplies < 0) {
		updateLog(`You ran out of medical supplies.`);
		oregonDied();
	}
}

function oregonDied() {
	updateLog(`You died of ${oregon.hurt == 2 ? "injuries" : "pneumonia"}.`);
	oregonGameOver();
}

function oregonGameOver() {
	gameState = "GameOver";
	oregon.fort = 0;
	updateLog(`Due to your unfortunate situation, there are a few formalities we must go through.`);
	updateLog(`Would you like a minister?`);
}

/*
//160 PRINT "DO YOU NEED INSTRUCTIONS (YES/NO)"
170 DIM C$(5)
190 INPUT C$
200 IF C$ = "NO" THEN 690
210 PRINT
220 PRINT
// •••INSTRUCTIONS***
240 PRINT "THIS PROGRAM SIMULATES A TRIP OVER THE OREGON TRAIL FROM"
250 PRINT "INDEPENDENCE* MISSOURI TO OREGON CITY, OREGON IN 1847."
260 PRINT "YOUR FAMILY OF FIVE BILL COVER THE 2040 NILE OREGON TRAIL"
270 PRINT "IN 5-6 MONTHS — IF YOU MAKE IT ALIVE*"
280 PRINT
290 PRINT "YOU HAD SAVED 8900 TO SPEND FOR THE TRIP* AND YOU'VE JUST"
300 PRINT " PAID 8200 FOR A WAGON . -
310 PRINT "YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ON THE"
320 PRINT " FOLLOWING XTEMSt"
330 PRINT
340 PRINT " OXEN - YOU CAN SPEND 8200-8300 ON YOUR TEAM"
350 PRINT " THE MORE YOU SPEND* THE FASTER YOU*LL 00"
360 PRINT " BECAUSE YOU'LL HAVE BETTER ANIMALS"
370 PRINT
360 PRINT " FOOD - THE MORE YOU HAVE* THE LESS CHANCE THERE"
390 PRINT " XS OF OETTXNG SICK"
400 PRINT
410 PRINT " AMMUNITION - 81 BUYS A BELT OF 50 BULLETS"
420 PRINT " YOU WILL NEED BULLETS FOR ATTACKS BY ANIMALS"
430 PRINT " AND BANDITS* AND FOR HUNTING FOOD"
440 PRINT
450 PRINT " CLOTHING - THIS IS ESPECIALLY IMPORTANT FOR THE COLD"
460 PRINT " WEATHER YOU WILL ENCOUNTER WHEN CROSSING"
470 PRINT " THE MOUNTAINS"
460 PRINT
490 PRINT " MISCELLANEOUS SUPPLIES - THIS INCLUDES MEDICINE AND"
500 PRINT " OTHER THINGS YOU WILL NEED FOR SICKNESS"
510 PRINT " AND EMERGENCY REPAIRS"
520 PRINT
530 PRINT
540 PRINT "YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -"
550 PRINT "OR YOU CAN SAVE SOME OF YOUR CASH TO SPEND AT FORTS ALONG"
560 PRINT "THE WAY WHEN YOU RUN LOW. H0WEVER, ITEMS COST MORE AT"
570 PRINT "THE FORTS. YOU CAN ALSO GO HUNTING ALONG THE WAY TO GET"
580 PRINT "MORE FOOD."
590 PRINT "WHENEVER YOU HAVE TO USE YOUR TRUSTY RIFLE ALONG THE WAY*"
600 PRINT "YOU WILL BE TOLD TO TYPE IN A WORD (ONE THAT SOUNDS LIKE A"
610 PRINT "GUN SHOT). THE FASTER YOU TYPE IN THAT WORD AND HIT THE"
620 PRINT """RETURN"" KEY* THE BETTER LUCK YOU'LL HAVE WITH YOUR GUN."
630 PRINT
640 PRINT "AT EACH TURN* ALL ITEMS ARE SHOWN IN DOLLAR AMOUNTS"
650 PRINT "EXCEPT BULLETS"
660 PRINT "WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A ""$""."
670 PRINT
680 PRINT "GOOD LUCK!!!"

690 PRINT
700 PRINT
710 PRINT "HOW GOOD A SHOT ARE YOU WITH YOUR RIFLE?"
720 PRINT " (I) ACE MARKSMAN, (2) GOOD SHOT, (3) FAIR TO MIDDLIN'"
730 PRINT " (4) NEED MORE PRACTICE, (5) SHAKY KNEES"
740 PRINT "ENTER ONE OF THE ABOVE -- THE BETTER YOU CLAIM YOU ARE, THE'
750 PRINT "FASTER YOU'LL HAVE TO BE WITH YOUR GUN TO BE SUCCESSFUL."
760 INPUT D9
770 IF D9 > 5 THEN 790
760 G0T0 810
790 D9 = 0

// *** INITIAL PURCHASES***
810 X1 = -1
820 K8 = S4 = F1 = F2 = M = M9 = D3 = 0
830 PRINT
840 PRINT
850 PRINT "HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM";
860 INPUT A
870 IF A >= 200 THEN 900
880 PRINT "NOT ENOUGH"
890 GOTO 850
900 IF A <= 300 THEN 930
910 PRINT "TOO MUCH"
920 GOTO 850
930 PRINT "HOW MUCH DO YOU WANT TO SPEND ON FOOD";
940 INPUT F
950 IF F >= 0 THEN 980
960 PRINT "IMPOSSIBLE"
970 GOTO 930
... "HOW MUCH DO YOU WANT TO SPEMD ON MISCELLANEOUS AMMUNITION" -> B
... "HOW MUCH DO YOU WANT TO SPEMD ON MISCELLANEOUS CLOTHING" -> C
... "HOW MUCH DO YOU WANT TO SPEMD ON MISCELLANEOUS SUPPLIES" -> M1
T = 700 - A - F - B - C - M1

IF T >= 0 THEN 1170
PRINT "YOU OVERSPENT--YOU ONLY HAD $700 TO SPEND.  BUY AGAIN"
GOTO 830
1170 B = 50 * B
PRINT "AFTER ALL YOUR PURCHASES, YOU NOV HAVE ${T} DOLLARS LEFT"
PRINT
PRINT "MONDAY MARCH 29 1847"
PRINT
GOTO 1750

1230 IF M >= 2040 THEN 5430
// ***SETTING DATE***
D3 = D3 + l
PRINT
PRINT "MONDAY ";
IF D3 > 10 THEN 1300
ON D3 GOTO 1310, 1330, 1350, 1370, 1390, 1410, 1430, 1450, 1470, 1490
ON D3 - 10 GOTO 1510, 1530, 1550, 1570, 1590, 1610, 1630, 1650, 1670, 1690
1310 PRINT "APRIL 12 ";
G0T0 1720
1330 PRINT "APRIL 06 ";
G0T0 1720
1350 PRINT "MAY 10 ";
G0T0 1720
1370 PRINT "MAY 24 ";
GOTO 1720
1390 PRINT "JUNE 7 ";
GOTO 1720
1410 PRINT "JUNE 21 ";
GOTO 1720
1430 PRINT "JULY 5 ";
GOTO 1720
1450 PRINT "JULY 19 ";
G0T0 1720
1470 PRINT "AUGUST 2 ";
G0T0 1720
1490 PRINT "AUGUST 16 ";
G0T0 1720
1510 PRINT "AUGUST 31 ";
GOTO 1720
1530 PRINT "SEPTEMBER 13 ";
G0T0 1720
1550 PRINT "SEPTEMBER 27 ";
GOTO 1720
1570 PRINT "OCTOBER 11 ";
G0T0 1720
1590 PRINT "OCTOBER 25 ";
G0T0 1720
1610 PRINT "NOVEMBER 8 ";
GOTO 1720
1630 PRINT "NOVEMBER 22 ";
GOTO 1720
1650 PRINT "DECEMBER 6 ";
GOTO 1720
1670 PRINT "DECEMBER 20 ";
GOTO 1720
PRINT "YOU HAVE BEEN ON THE TRAIL T00 LONG  ------"
PRINT "YOUR FAMILY DIES IN THE FIRST BLIZZARD OF WINTER"
GOTO 5170

1720 PRINT "1847"
PRINT

// ***BEGINNING EACH TURN***
IF F >= 0 THEN 1770
F = 0
1770 IF B >= 0 THEN 1790
B = 0
1790 IF C >= 0 THEN 1810
C = 0
1810 IF Ml >= 0 THEN 1830
M1 = 0
1830 IF F >= 13 THEN 1850
PRINT "YOU'D BETTER DO SOME HUNTING OR BUY FOOD AND SOON!!!!"
1850
F = INT(F)
B = INT(B)
C = INT(C)
Ml = INT(M1)
T = INT(T)
M = INT(M)
M2 = M
IF S4 = 1 THEN 1950
IF K8 = 1 THEN 1950
G0T0 1990

1950 T = T - 20
IF T < 0 THEN 5080
PRINT "DOCTOR'S BILL IS $20"
LET K8 = S4 = 0

1990 IF M9 = 1 THEN 2020
PRINT "TOTAL MILEAGE IS";M
GOT0 2040

2020 PRINT "TOTAL MILEAGE IS 950"
M9 = 0

2040 PRINT "FOOD", "BULLETS", "CLOTHING", "MISC. SUPP.", "CASH"
PRINT F, B, C, M1, T
IF Xl = -1 THEN 2170
X1 = X1 * (-1)
2080 PRINT "DO YOU WANT TO (1) STOP AT THE NEXT FORT, (2) HUNT, OR (3) CONTINUE"
INPUT X
IF X > 2 THEN 2150
IF X < 1 THEN 2150
LET X = INT(X)
G0T0 2270

2150 LET X = 3
GOT0 2270

2170 PRINT "DO YOU WANT TO (1) HUNT, OR (2) CONTINUE"
INPUT X
IF X = l THEN 2210
LET X = 2
2210 LET X = X + 1
IF X = 3 THEN 2260
IF B > 39 THEN 2260
PRINT "T0UGH---Y0U NEED MORE BULLETS T0 G0 HUNTING"
G0T0 2170

2260 X1 = X1 * (-1)

2270 0N X O0T0 2290, 2540, 2720

// ***ST0PPING AT FORT***
2290 PRINT "ENTER WHAT Y0U WISH T0 SPEND 0N THE F0LL0WING F00D";
G0SUB 2330
G0T0 2410
  
2330 INPUT P
IF P < 0 THEN 2400
T = T - P
IF T >= 0 THEN 2400
PRINT "Y0U D0N'T HAVE THAT MUCH--KEEP Y0UR SPENDING DOWN"
PRINT "YOU MISS Y0UR CHANCE T0 SPEND 0N THAT ITEM"
T = T + P
P = 0 
2400 RETURN
  
2410 F = F + 2 / 3 * P
PRINT "AMMUNITION";
G0SUB 2330
LET B = INT(B + 2 / 3 * P * 50)
PRINT "CLOTHING";
G0SUB 2330
C = C + 2 / 3 * P
PRINT "MISCELLANEOUS SUPPLIES";
G0SUB 2330
M1= M1 + 2 / 3 * P
M = M - 45
G0T0 2720

// ***HUNTING***
2540 IF B > 39 THEN 2570
PRINT "TOUGH---YOU NEED M0RE BULLETS TO G0 HUNTING"
G0T0 2080
2570 M = M - 45
2580 GOSUB 6140

IF Bl <= 1 THEN 2660
IF 100 * RND(-1) < 13 * B1 THEN 2710
F = F + 48 - 2 * B1
PRINT "NICE SH0T--RIGHT ON TARGET--GOOD EATIN' TONIGHT!!"
B = B - 10 - 3 * B1
G0TO 2720

// **BELLS IN LINE 2660**
2660 PRINT "RIGHT BETWEEN THE EYES---YOU GOT A BIG ONE!!!!"
PRINT "FULL BELLIES TONIGHT!"
F = F + 52 * RND(-1) * 6
B = B - 1O - RND(-1) * 4
GOT0 2720
2710 PRINT "Y0U MISSED---AND YOUR DINNER GOT AWAY....."
2720 IF F >= 13 THEN 2750
G0T0 5060

// ***EATING***
2750 PRINT "DO YOU WANT TO EAT (1) POORLY (2) M0DERATELY 0R (3) WELL";
INPUT E
IF E > 3 THEN 2750
If E < 1 THEN 27S0
LET E = INT(E)
LET F = F - 8 - 5 * E
IF F >= 0 THEN 2860
F = F + 8 + 5 * E
PRINT "Y0U CAN'T EAT THAT WELL"
G0T0 2750
2860 LET M = M + 200 + (A - 220) / 5 + 10 * RND(-1)
L1 = C1 = 0

// ***RIDERS ATTACK***
2890 IF RND(-l) * 10 > ((M / 100 - 4) ** 2 + 72) / ((M / 100 - 4) ** 2 + 12) - l THEN 3550
PRINT "RIDERS AHEAD.  THEY ";
S5 = 0
IF RND(-1) < .8 THEN 2950
PRINT "DON'T ";
S5 = 1
2950 PRINT "LO0K HOSTILE"
PRINT "TACTICS"
2970 PRINT "(1) RUN  (2) ATTACK  (3) CONTINUE  (4) CIRCLE WAGONS"
IF RND(-1) > .2 THEN 3000
S5 = 1 - S5
3000 INPUT Tl
IF Tl < 1 THEN 2970
IF Tl > 4 THEN 2970
T1 = INT(T1)
IF S5 = 1 THEN 3330
IF T1 > 1 THEN 3110
M = M + 20
M1 = M1 - 15
B = B - 150
A = A - 40
G0T0 3470
  
3110 IF Tl > 2 THEN 3240
G0SUB 6140
B = B - Bl * 40 - 80
3140 IF B1 > 1 THEN 3170
PRINT "NICE SH00TING---YOU DROVE THEM OFF"
G0T0 3470
3170 IF Bl <= 4 THEN 3220
PRINT "L0USY SH0T---Y0U GOT KNIFED"
K8 = 1
PRINT "Y0U HAVE T0 SEE 0L' DOC BLANCHARD"
G0T0 3470
3220 PRINT "K1NDA SL0W WITH Y0UR COLT .45"
GOT0 3470
IF Tl > 3 THEN 3290
IF RND(-1) > .8 THEN 3450
LET B = B - 150
Ml = Ml - 15
GOT0 3470
3290 G0SUB 6140
B = B - Bl * 30 - 80
M = M - 25
3320 GOTO 3140
IF Tl > l THEN 3370
M = M + 15
A = A - 10
G0T0 3470
3370 IF Tl > 2 THEN 3410
M = M - 5
B = B - 100
G0T0 3470
IF Tl > 3 THEN 3430
G0T0 3470
3430 M = M - 20
GOTO 3470
PRINT "THEY DID N0T ATTACK"
G0T0 3550
3470 IF S5 = 0 THEN 3500
PRINT "RIDERS WERE FRIENDLY, BUT CHECK FOR POSSIBLE LOSSES"
G0T0 3550
3500 PRINT "RIDERS WERE HOSTILE--CHECK FOR L0SSES"
IF B >= 0 THEN 3550
PRINT "Y0U RAN 0UT OF BULLETS AND G0T MASSACRED BY THE RIDERS"
G0T0 5170

// ***SELECTION OF EVENTS***
3550 LET Dl = 0
REST0RE
R1 = 100 * RND(-1)
3580 LET D1 = D1 + 1
IF D1 = 16 THEN 4670
READ D
IF R1 > D THEN 3580
DATA 6, 11, 13, 15, 17, 22, 32, 35, 37, 42, 44, 54, 64, 69, 95
IF D1 > 10 THEN 3650
ON Dl G0T0 3660, 3700, 3740, 3790, 3820, 3850, 3880, 3960, 4130, 4190
3650 0N Dl - 10 G0T0 4220, 4290, 4340, 4560, 4610, 4670

3660 PRINT "WAG0N BREAKS DOWN--L0SE TIME AND SUPPLIES FIXING IT"
LET M = M - 15 - 5 * RND(-1)
LET Ml = M1 - 8
G0T0 4710
3700 PRINT "OX INJURES LEG---SLOWS Y0U DOWN REST OF TRIP"
LET M = M - 25
LET A = A - 20
G0T0 4710
3740 PRINT "BAD LUCK---YOUR DAUGHTER BROKE HER ARM"
PRINT "Y0U HAD TO STOP AND USE SUPPLIES T0 MAKE A SLING"
M = M - 5 - 4 * RND(-l)
M1 = Ml - 2 - 3 * RND(-1)
GOTO 4710
3790 PRINT "OX WANDERS OFF---SPEND TIME L00KING FOR IT"
M = M - 17
G0T0 4710
3820 PRINT "YOUR SON GETS LOST---SPEND HALF THE DAY LOOKING FOR HIM"
M = M - 10
G0T0 4710
3850 PRINT "UNSAFE WATER--LOSE TIME LO0KING FOR CLEAN SPRING"
LET M = M - 10 * RND(-l) - 2
GOTO 4710
3880 IF M > 950 THEN 4490
PRINT "HEAVY RAINS---TIME AND SUPPLIES LOST"
F = F - 10
B = B - 500
M1 = M1 - 15
M = M - 10 * RND(-l) - 5
G0TO 4710
3960 PRINT "BANDITS ATTACK"
G0SUB 6140
B = B - 20 * B1
IF B >= 0 THEN 4030
PRINT "YOU RAN OUT OF BULLETS---THEY GOT LOTS OF CASH"
T = T / 3
GOTO 4040
IF Bl <= 1 THEN 4100
4040 PRINT "YOU GOT SHOT IN THE LEG AND THEY TOOK ONE OF YOUR OXEN"
K8 = l
PRINT "BETTER HAVE A DOC LOOK AT YOUR WOUND"
Ml = Ml - 5
A = A - 20
GOTO 4710
4100 PRINT "QUICKEST DRAW OUTSIDE OF DODGE CITY!!!"
PRINT "YOU GOT 'EM!"
GOTO 4710
4130 PRINT "THERE WAS A FIRE IN YOUR WAGON---FOOD AND SUPPLIES DAMAGE!"
F = F - 40
B = B - 400
LET Ml = Ml - RND(-l) * 8 - 3
M = M - 15
GOTO 4710
4190 PRINT "LOSE YOUR WAY IN HEAVY FOG---TIME IS LOST"
M = M - 10 - 5 * RND(-1)
GOTO 4710
4220 PRINT "YOU KILLED A POISONOUS SNAKE AFTER IT BIT YOU"
B = B - 1O
Ml = Ml - 5
IF Ml >= 0 THEN 4710
PRINT "YOU DIE OF SNAKEBITE SINCE YOU HAVE NO MEDICINE"
GOTO 5170
4290 PRINT "WAGON GETS SWAMPED FORDING RIVER--LOSE FOOD AND CLOTHES"
F = F - 30
C = C - 20
M = M - 20 - 20 * RND(-l)
GOTO 4710
4340 PRINT "WILD ANIMALS ATTACK!"
GOSUB 6140
IF B > 39 THEN 4410
PRINT "YOU WERE TOO LOW ON BULLETS--"
PRINT "THE WOLVES OVERPOWERED YOU"
K8 = 1
GOTO 5120
4410 IF Bl > 2 THEN 4440
PRINT "NICE SHOOTIN' PARTNER---THEY DIDN'T GET MUCH"
GOTO 4450
4440 PRINT "SLOW ON THE DRAW---THEY GOT AT YOUR FOOD AND CLOTHES"
4450 B = B - 20 * B1
C = C - Bl * 4
F = F - B1 * 8
GOTO 4710
4490 PRINT "COLD WEATHER---BRRRRRRR!---YOU ";
IF C > 22 + 4 * RND(-l) THEN 4530
PRINT "DON'T ";
4520 Cl = 1
4530 PRINT "HAVE ENOUGH CLOTHING T0 KEEP YOU WARM"
4540 IF Cl = 0 THEN 4710
4550 GOTO 6300
4560 PRINT "HAIL STORM---SUPPLIES DAMAGED"
4570 M = M - 5 - RND(-1) * 10
4580 B = B - 200
4590 Ml = Ml - 4 - RND(-l) * 3
4600 GOTO 4710
4610 If E = l THEN 6300
4620 IF E = 3 THEN 4650
4630 IF RND(-1) > .25 THEN 6300
4640 GOTO 4710
4650 IF RND(-1) < .5 THEN 6300
4660 GOTO 4710
4670 PRINT "HELPFUL INDIANS SHOW YOU WERE T0 FIND MORE FOOD"
4680 F = F + 14
4690 GOT0 4710

// ***MOUNTAINS***
4710 IF M <= 950 THEN 1230
4720 IF RND(-1) * 10 > 9 - ((M / 100 - 15) ** 2 + 72) / ((M / 100 - 15) ** 2 + 12) THEN 4860
4730 PRINT "RUGGED MOUNTAINS"
4740 IF RND(-1) > .1 THEN 4780
4750 PRINT "YOU GOT LOST---LOSE VALUABLE TIME TRYING TO FIND TRAIL!"
4760 M = M - 60
4770 GOTO 4860
4780 IF RND(-1) > .11 THEN 4840
4790 PRINT "WAGON DAMAGED!---LOSE TIME AND SUPPLIES"
4800 M1 = M1 - 5
4810 B = B - 200
4820 M = M - 20 - 30 * RND(-1)
4830 GOTO 4860
4840 PRINT "THE GOING GETS SLOW"
4850 M = M - 45 - RND(-l) / .02
4660 IF F1 = 1 THEN 4900
4870 Fl = l
4880 IF RND(-1) < .8 THEN 4970
4690 PRINT "YOU MADE IT SAFELY THR0UGH SOUTH PASS--N0 SN0W"
4900 IF M < 1700 THEN 4940
4910 IF F2 = 1 THEN 4940
4920 F2 = l
4930 IF RND(-1) < .7 THEN 4970
4940 IF M > 950 THEN 1230
4950 M9 = 1
4960 GOTO 1230
4970 PRINT "BLIZZARD IN MOUNTAIN PASS--TIME AND SUPPLIES LOST"
4980 L1 = l
4990 F = F - 25
5000 M1 = M1 - 10
5010 B = B - 300
5020 M = M - 30 - 40 * RND(-1)
5030 IF C < 18 + 2 * RND(-1) THEN 6300
5040 GOTO 4940

// ***DYING***
5060 PRINT "YOU RAN OUT OF F00D AND STARVED T0 DEATH"
5070 GOTO 5170
5080 LET T = 0
5090 PRINT "YOU CAN'T AFF0RD A D0CT0R"
5100 G0T0 5120
5110 PRINT "YOU RAN 0UT 0F MEDICAL SUPPLIES"
5120 PRINT "YOU DIED 0F ";
5130 IF K8 = 1 THEN 5160
5140 PRINT "PNEUMONIA"
5150 G0T0 5170
5160 PRINT "INJURIES"
5170 PRINT
5180 PRINT "DUE T0 Y0UR UNF0RTUNATE SITUATION, THERE ARE A FEW"
5190 PRINT "FORMALITIES WE MUST G0 THROUGH"
5200 PRINT
5210 PRINT "WOULD YOU LIKE A MINISTER?"
5220 INPUT C$
5230 PRINT "WOULD YOU LIKE A FANCY FUNERAL?"
5240 INPUT C$
5250 PRINT "WOULD YOU LIKE US TO INFORM YOUR NEXT OF KIN?"
5260 INPUT C$
5270 IF C$ = "YES" THEN 5310
5280 PRINT "BUT YOUR AUNT SADIE IN ST. LOU1S IS REALLY WORRIED ABOUT Y0U"
5290 PRINT
5300 GOTO 5330
5310 PRINT "THAT WILL BE $4.50 FOR THE TELEGRAPH CHARGE."
5320 PRINT
5330 PRINT "WE THANK YOU FOR THIS INFORMATION AND WE ARE SORRY YOU"
5340 PRINT "DIDN'T MAKE IT TO THE GREAT TERRITORY OF OREGON"
5350 PRINT "BETTER LUCK NEXT TIME"
5360 PRINT
5370 PRINT
5380 PRINT TAB(30); "SINCERELY"
5390 PRINT
5400 PRINT TAB(17); "THE OREGON CITY CHAMBER OF COMMERCE"
5410 STOP

// ***FINAL TURN***
5430 F9 = (2040 - M2) / (M - M2)
5440 F = F + (1 - F9) * (8 + 5 * E)
5450 PRINT

// **BELLS IN LINES 5470, 5480**
5470 PRINT "YOU FINALLY ARRIVED AT OREGON CITY"
5480 PRINT "AFTER 2040 LONG MILES---HOORAY!!!!!"
5490 PRINT "A REAL PIONEER!"
5500 PRINT
5510 F9 = INT(F9 * 14)
5520 D3 = D3 * 14 + F9
5530 F9 = F9 + 1
5540 IF F9 < 8 THEN 5560
5550 F9 = F9 - 7
5560 ON F9 GOTO 5570, 5590, 5610, 5630, 5650, 5670, 5690
5570 PRINT "MONDAY ";
5580 GOTO 5700
5590 PRINT "TUESDAY ";
5600 GOTO 5700
5610 PRINT "WEDNESDAY ";
5620 GOTO 5700
5630 PRINT "THURSDAY ";
5640 GOTO 5700
5650 PRINT "FRIDAY ";
5660 GOTO 5700
5670 PRINT "SATURDAY ";
5680 GOTO 5700
5690 PRINT "SUNDAY ";
5700 IF D3 > 124 THEN 5740
5710 D3 = D3 - 93
5720 PRINT "JULY "; D3; " 1847"
GOTO 5920
5740 IF D3 > 155 THEN 5780
D3 = D3 - 124
PRINT "AUGUST "; D3; " 1847"
G0TO 5920
5780 IF D3 > 185 THEN 5820
D3 = D3 - 155
PRINT "SEPTEMBER "; D3; " 1847"
GOTO 5920
5820 IF D3 > 216 THEN 5860
D3 = D3 - 185
PRINT "OCTOBER "; D3; " 1847"
GOTO 5920
5860 IF D3 > 246 THEN 5900
D3 = D3 - 216
PRINT "NOVEMBER "; D3;" 1847"
GOTO 5920
5900 D3 = D3 - 246
PRINT "DECEMBER "; D3; " 1847"
PRINT
PRINT "FOOD", "BULLETS", "CLOTHING", "MISC. SUPP.", "CASH"
IF B > 0 THEN 5960
LET B = 0
5960 IF C > 0 THEN 5980
LET C = 0
5980 IF M1 > 0 THEN 6000
LET M1 = 0
6000 IF T > 0 THEN 6020
LET T = 0
6020 IF F > 0 THEN 6040
LET F = 0
6040 PRINT INT(F), INT(B), INT(C), INT(M1), INT(T)
PRINT
PRINT TAB(11); "PRESIDENT JAMES K. POLK SENDS YOU HIS"
PRINT TAB(27); "HEARTIEST CONGRATULATIONS"
PRINT
PRINT TAB(11); "AND WISHES YOU A PROSPEROUS LIFE AHEAD"
PRINT
PRINT TAB(22); "AT YOUR NEW HOME"
STOP
  
// ***SHOOTING SUB-ROUTINE***
// THE METHOD OF TIMING THE SHOOTING (LINES 6210-6240)
// WILL VARY FROM SYSTEM TO SYSTEM.  FOR EXAMPLE, H-P
// USERS WILL PROBABLY PREFER TO USE THE 'ENTER' STATEMENT.
// IF TIMING ON THE USER'S SYSTEM IS HIGHLY SUSCEPTIBLE
// TO SYSTEM RESPONSE TIME, THE FORMULA IN LINE 6240 CAN
// BE TAILORED TO ACCOMODATE THIS BY EITHER INCREASING 
// OR DECREASING THE 'SHOOTING' TIME RECORDED BY THE SYSTEM.
6140 DIM S$(S)
S$(1) = "BANG"
S$(2) = "BLAM"
S$(3) = "P0W"
S$(4) = "WHAM"
S6 = INT(RND(-1) * 4 + 1)
PRINT "TYPE "; S$(S6)
6210 B3 = CLK(0)
INPUT C$
Bl = CLK(0)
6240 B1 = ((B1 - B3) * 3600) - (D9 - 1)
PRINT
IF B1 > 0 THEN 6260
B1 = 0
6260 IF C$ = S$(S6) THEN 6280
6270 Bl = 9
6280 RETURN

// ***ILLNESS SUB-ROUTINE***
6300 IF 100 * RND(-1) < 10 + 35 * (E - 1) THEN 6370
IF 100 * RND(-1) < l00 - (40 / 4 ** (E - l)) THEN 6410
PRINT "SERIOUS ILLNESS---"
PRINT "YOU MUST STOP FOR MEDICAL ATTENTION"
Ml = Ml - 10
S4 = 1
GOTO 6440
6410 PRINT "MILD ILLNESS---MEDICINE USED"
M = M - 5
Ml = Ml - 2
GOTO 6440
6410 PRINT "BAD ILLNESS---MEDICINE USED"
M = M - 5
Ml = Ml - 5
6440 IF M1 < 0 THEN 5110 
IF Ll = l THEN 4940
GOTO 4710

// ***IDENDIFICATION OF VARIABLES IN THE PROGRAM***
// A = AMOUNT SPENT ON ANIMALS
// B = AMOUNT SPENT ON AMMUNITION
// Bl = ACTUAL RESPONSE TIME FOR INPUTTING "BANG"
// B3 = CLOCK TIME AT START OF INPUTTING "BANG"
// C = AMOUNT SPENT ON CLOTHING
// C1 = FLAG FOR INSUFFICIENT CLOTHING IN COLD WEATHER
// C$ = YES/NO RESPONSE TO QUESTIONS
// Dl = COUNTER IN GENERATING EVENTS
// D3 = TURN NUMBER FOR SETTING DATE
// D4 = CURRENT DATE
// D9 = CHOICE OF SHOOTING EXPERTISE
// E = CHOICE OF EATING
// F = AMOUNT SPENT ON FOOD
// Fl = FLAG FOR CLEARING SOUTH PASS
// F2 = FLAG FOR CLEARING BLUE MOUNTAINS
// F9 = FRACTION OF 2 WEEKS TRAVELED ON FINAL TURN
// K8 = FLAG FOR INJURY
// L1 = FLAG FOR BLIZZARD
// M = TOTAL MILEAGE WHOLE TRIP
// Ml = AMOUNT SPENT ON MISCELLANEOUS SUPPLIES
// M2 = TOTAL MILEAGE UP THROUGH PREVIOUS TURN
// M9 = FLAG FOR CLEARING SOUTH PASS IN SETTING MILEAGE
// P = AMOUNT SPENT ON ITEMS AT FORT
// Rl = RANDOM NUMBER IN CHOOSING EVENTS
// S4 = FLAG FOR ILLNESS
// S5 = ""HOSTILITY OF RIDERS"" FACTOR
// S6 = SHOOTING WORD SELECTOR
// S$ = VARIATIONS OF SHOOTING WORD
// T = CASH LEFT OVER AFTER INITIAL PURCHASES
// Tl = CHOICE OF TACTICS WHEN ATTACKED
// X = CHOICE OF ACTION FOR EACH TURN
// X1 = FLAG FOR FORT OPTION
END
*/

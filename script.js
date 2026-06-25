// =========================
// CULTIVATION RPG V8
// PART 1
// CORE SYSTEMS
// =========================

// =========================
// REALMS
// =========================

const realms = [

"Mortal",

"Body Tempering",

"Qi Gathering",

"Foundation Establishment",

"Core Formation",

"Golden Core",

"Nascent Soul",

"Soul Transformation",

"Void Refinement",

"Earth Immortal",

"Heaven Immortal",

"True Immortal",

"Immortal King",

"Immortal Emperor",

"Dao Lord",

"Dao Sovereign",

"Celestial Sovereign",

"Ancient Sovereign",

"Chaos Sovereign",

"Eternal Dao"

];

// =========================
// PLAYER DATA
// =========================

let player = {

level: 1,

realm: 0,

qi: 0,

spiritStones: 100,

baseAttack: 10,

baseDefense: 5,

attack: 10,

defense: 5,

maxHP: 100,

currentHP: 100,

rebirths: 0,

prestige: 0,

beast: null,

inventory: [],

equippedWeapon: null,

equippedArmor: null,

equippedRing: null,

equippedBoots: null,

achievements: [],

questsCompleted: 0,

lastSave: Date.now()

};

// =========================
// DOM REFERENCES
// =========================

const realmName =
document.getElementById(
"realmName"
);

const levelText =
document.getElementById(
"level"
);

const qiText =
document.getElementById(
"qi"
);

const stonesText =
document.getElementById(
"stones"
);

const attackText =
document.getElementById(
"attack"
);

const defenseText =
document.getElementById(
"defense"
);

const hpText =
document.getElementById(
"hpText"
);

const hpFill =
document.getElementById(
"hpFill"
);

const qiFill =
document.getElementById(
"qiFill"
);

const combatLog =
document.getElementById(
"combatLog"
);

// =========================
// LOG SYSTEM
// =========================

function log(message){

const time =
new Date()
.toLocaleTimeString();

combatLog.innerHTML =

`<div>
[${time}]
${message}
</div>`

+

combatLog.innerHTML;

}

// =========================
// UI UPDATE
// =========================

function updateUI(){

realmName.textContent =

realms[player.realm];

levelText.textContent =

player.level;

qiText.textContent =

Math.floor(
player.qi
);

stonesText.textContent =

player.spiritStones;

attackText.textContent =

player.attack;

defenseText.textContent =

player.defense;

hpText.textContent =

`${player.currentHP}
/
${player.maxHP}`;

let hpPercent =

(
player.currentHP
/
player.maxHP
)
*
100;

hpFill.style.width =

hpPercent + "%";

let qiNeeded =

100 *
(
player.realm + 1
);

let qiPercent =

Math.min(
100,
(
player.qi
/
qiNeeded
)
*
100
);

qiFill.style.width =

qiPercent + "%";

}

// =========================
// CULTIVATE
// =========================

function cultivate(){

let gain =

10 +

(
player.realm * 5
);

player.qi += gain;

log(
`Cultivated +${gain} Qi`
);

updateUI();

}

// =========================
// BREAKTHROUGH
// =========================

function breakthrough(){

let cost =

100 *

(
player.realm + 1
);

if(
player.qi <
cost
){

log(
"Not enough Qi."
);

return;

}

if(
player.realm >=
realms.length - 1
){

log(
"Maximum Realm Reached."
);

return;

}

player.qi -= cost;

player.realm++;

player.level++;

player.baseAttack += 5;

player.baseDefense += 3;

player.maxHP += 20;

player.currentHP =
player.maxHP;

recalculateStats();

log(
`Breakthrough!
Entered
${realms[player.realm]}`
);

updateUI();

}

// =========================
// RECALCULATE STATS
// =========================

function recalculateStats(){

player.attack =

player.baseAttack;

player.defense =

player.baseDefense;

if(
player.equippedWeapon
){

player.attack +=

player.equippedWeapon.attack;

}

if(
player.equippedArmor
){

player.defense +=

player.equippedArmor.defense;

}

if(
player.equippedRing
){

player.attack +=

player.equippedRing.attack;

}

if(
player.equippedBoots
){

player.defense +=

player.equippedBoots.defense;

}

}

// =========================
// SAVE GAME
// =========================

function saveGame(){

player.lastSave =

Date.now();

localStorage.setItem(

"cultivationV8",

JSON.stringify(
player
)

);

log(
"Game Saved"
);

}

// =========================
// LOAD GAME
// =========================

function loadGame(){

const save =

localStorage.getItem(
"cultivationV8"
);

if(!save){

return;

}

player =

JSON.parse(save);

log(
"Game Loaded"
);

calculateOfflineProgress();

recalculateStats();

updateUI();

}

// =========================
// OFFLINE PROGRESS
// =========================

function calculateOfflineProgress(){

const now =
Date.now();

const elapsed =

Math.floor(
(
now -
player.lastSave
)
/
1000
);

if(
elapsed <= 0
){

return;

}

const gain =

elapsed *

(
1 +
player.realm
);

player.qi += gain;

log(

`Offline cultivation:
+${gain} Qi`

);

}

// =========================
// AUTO SAVE
// =========================

setInterval(

saveGame,

30000

);

// =========================
// AUTO CULTIVATION
// =========================

setInterval(

()=>{

player.qi +=

1 +

player.realm;

updateUI();

},

1000

);

// =========================
// STARTUP
// =========================

loadGame();

updateUI();

log(
"Welcome Cultivator."
);

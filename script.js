const realms = [
"Mortal",
"Body Tempering",
"Qi Gathering",
"Qi Condensation",
"Foundation Establishment",
"Golden Core",
"Nascent Soul",
"Spirit Severing",
"Dao Transformation",
"Ascendant",
"Earth Immortal",
"Heaven Immortal",
"Mystic Immortal",
"Immortal King",
"Immortal Emperor",
"Divine Lord",
"Celestial Monarch",
"Ancient Sovereign",
"Eternal Sovereign",
"True Dao"
];

let player = {
realm:0,
level:1,

qi:0,
spiritStones:0,

attack:10,
defense:5,
hp:100,

pills:0,
rebirths:0,

inventory:[]
};

const enemies = [
{
name:"Bandit",
power:50,
reward:25
},
{
name:"Spirit Wolf",
power:100,
reward:50
},
{
name:"Demonic Cultivator",
power:250,
reward:100
},
{
name:"Ancient Guardian",
power:500,
reward:250
},
{
name:"Dragon King",
power:1000,
reward:1000
}
];

function updateUI(){

document.getElementById("realmName").textContent =
realms[player.realm];

document.getElementById("level").textContent =
player.level;

document.getElementById("qi").textContent =
Math.floor(player.qi);

document.getElementById("spiritStones").textContent =
player.spiritStones;

document.getElementById("attack").textContent =
player.attack;

document.getElementById("defense").textContent =
player.defense;

document.getElementById("hp").textContent =
player.hp;
}

function cultivate(){

let gain =
10 +
(player.realm * 5) +
(player.rebirths * 25);

player.qi += gain;

updateUI();
}

function breakthrough(){

let cost =
Math.floor(
100 *
Math.pow(
1.8,
player.realm
)
);

if(
player.realm >= realms.length - 1
){
alert("Maximum Realm Reached");
return;
}

if(player.qi >= cost){

player.qi -= cost;

player.realm++;

player.level++;

player.attack += 10;
player.defense += 5;
player.hp += 25;

alert(
"Breakthrough to " +
realms[player.realm]
);

}else{

alert(
"Need " +
cost +
" Qi"
);

}

updateUI();
}

function findEquipment(){

const rewards = [
"Iron Sword",
"Spirit Blade",
"Heaven Sword",
"Immortal Sword",
"Spirit Armor",
"Golden Armor"
];

let item =
rewards[
Math.floor(
Math.random() *
rewards.length
)
];

player.inventory.push(item);

player.attack += 10;
player.defense += 10;

alert(
"Found " + item
);

updateUI();
}

function tameBeast(){

const beasts = [
"Spirit Wolf",
"Azure Tiger",
"Flame Phoenix",
"Ancient Dragon"
];

let beast =
beasts[
Math.floor(
Math.random() *
beasts.length
)
];

player.inventory.push(
"Companion: " + beast
);

player.attack += 50;

alert(
"Tamed " + beast
);

updateUI();
}

function runDungeon(){

let enemy =
enemies[
Math.floor(
Math.random() *
enemies.length
)
];

let playerPower =
player.attack +
player.defense +
player.hp +
(player.realm * 50);

if(
playerPower >
enemy.power
){

player.spiritStones +=
enemy.reward;

player.inventory.push(
enemy.name +
" Loot"
);

document.getElementById(
"dungeonResult"
).textContent =
"Victory against " +
enemy.name +
" +" +
enemy.reward +
" Stones";

}else{

document.getElementById(
"dungeonResult"
).textContent =
"Defeated by " +
enemy.name;

}

updateUI();
}

function craftQiPill(){

if(
player.spiritStones < 50
){

alert(
"Need 50 Spirit Stones"
);

return;
}

player.spiritStones -= 50;

player.pills++;

alert(
"Qi Pill Crafted"
);

updateUI();
}

function useQiPill(){

if(player.pills <= 0){

alert(
"No Pills"
);

return;
}

player.pills--;

player.qi += 500;

alert(
"Used Qi Pill"
);

updateUI();
}

function claimQuest(){

if(player.qi < 500){

alert(
"Need 500 Qi"
);

return;
}

player.spiritStones += 200;

alert(
"Quest Complete!"
);

updateUI();
}

function ascend(){

if(
player.realm <
realms.length - 1
){

alert(
"Reach True Dao First"
);

return;
}

player.rebirths++;

player.realm = 0;

player.level = 1;

player.qi = 0;

player.attack += 100;

player.defense += 100;

player.hp += 500;

alert(
"Ascension Successful!"
);

updateUI();
}

function showInventory(){

if(
player.inventory.length === 0
){

alert(
"Inventory Empty"
);

return;
}

alert(
player.inventory.join("\n")
);
}

function saveGame(){

localStorage.setItem(
"cultivationSave",
JSON.stringify(player)
);

alert("Saved");
}

function loadGame(){

let save =
localStorage.getItem(
"cultivationSave"
);

if(save){

player =
JSON.parse(save);

updateUI();

alert("Loaded");
}
}

setInterval(() => {

let gain =
2 +
player.realm +
player.rebirths;

player.qi += gain;

updateUI();

},1000);

updateUI();

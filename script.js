// =========================
// CULTIVATION ONLINE RPG
// PART 1 - CORE ENGINE
// =========================

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

    level: 1,

    realm: 0,

    qi: 0,

    spiritStones: 0,

    attack: 10,

    defense: 5,

    hp: 100,

    pills: 0,

    rebirths: 0,

    weapon: null,

    armor: null,

    beast: null,

    location: "Mortal Village",

    inventory: [],

    achievements: []

};

// =========================
// LOG SYSTEM
// =========================

function log(message){

    const logBox =
    document.getElementById(
        "combatLog"
    );

    if(!logBox) return;

    logBox.innerHTML =
        message +
        "<br>" +
        logBox.innerHTML;
}

// =========================
// BREAKTHROUGH COST
// =========================

function breakthroughCost(){

    return Math.floor(
        100 *
        Math.pow(
            1.8,
            player.realm
        )
    );

}

// =========================
// CULTIVATION
// =========================

function cultivate(){

    let gain =
        10 +
        (player.realm * 5) +
        (player.rebirths * 25);

    player.qi += gain;

    log(
        "+" +
        gain +
        " Qi"
    );

    updateUI();

}

// =========================
// BREAKTHROUGH
// =========================

function breakthrough(){

    if(
        player.realm >=
        realms.length - 1
    ){

        alert(
            "Maximum Realm Reached"
        );

        return;
    }

    let cost =
    breakthroughCost();

    if(
        player.qi >= cost
    ){

        player.qi -= cost;

        player.realm++;

        player.level++;

        player.attack += 10;

        player.defense += 5;

        player.hp += 25;

        log(
            "Breakthrough: " +
            realms[player.realm]
        );

    }
    else{

        alert(
            "Need " +
            cost +
            " Qi"
        );

    }

    updateUI();

}

// =========================
// AUTO CULTIVATION
// =========================

setInterval(()=>{

    let gain =
        2 +
        player.realm +
        player.rebirths;

    player.qi += gain;

    updateUI();

},1000);

// =========================
// ASCENSION
// =========================

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

    log(
        "Ascension Successful!"
    );

    updateUI();

}

// =========================
// DAILY QUEST
// =========================

function claimQuest(){

    if(
        player.qi < 500
    ){

        alert(
            "Need 500 Qi"
        );

        return;
    }

    player.spiritStones += 200;

    log(
        "Quest Reward +200 Stones"
    );

    updateUI();

}

// =========================
// WORLD MAP
// =========================

function travel(location){

    player.location =
    location;

    document.getElementById(
        "location"
    ).textContent =
    location;

    log(
        "Travelled to " +
        location
    );

}

// =========================
// SAVE
// =========================

function saveGame(){

    localStorage.setItem(
        "cultivationSave",
        JSON.stringify(player)
    );

    log(
        "Game Saved"
    );

}

// =========================
// LOAD
// =========================

function loadGame(){

    let save =
    localStorage.getItem(
        "cultivationSave"
    );

    if(save){

        player =
        JSON.parse(save);

        updateUI();

        log(
            "Game Loaded"
        );

    }

}

// =========================
// UPDATE UI
// =========================

function updateUI(){

    document.getElementById(
        "realmName"
    ).textContent =
    realms[player.realm];

    document.getElementById(
        "level"
    ).textContent =
    player.level;

    document.getElementById(
        "qi"
    ).textContent =
    Math.floor(
        player.qi
    );

    document.getElementById(
        "spiritStones"
    ).textContent =
    player.spiritStones;

    document.getElementById(
        "attack"
    ).textContent =
    player.attack;

    document.getElementById(
        "defense"
    ).textContent =
    player.defense;

    document.getElementById(
        "hp"
    ).textContent =
    player.hp;

    document.getElementById(
        "pillCount"
    ).textContent =
    player.pills;

    document.getElementById(
        "rebirths"
    ).textContent =
    player.rebirths;

    document.getElementById(
        "location"
    ).textContent =
    player.location;

    if(player.weapon){

        document.getElementById(
            "weaponSlot"
        ).textContent =
        player.weapon;

    }

    if(player.armor){

        document.getElementById(
            "armorSlot"
        ).textContent =
        player.armor;

    }

    if(player.beast){

        document.getElementById(
            "beastSlot"
        ).textContent =
        player.beast;

    }

}

// =========================
// START
// =========================

updateUI();

// =========================
// PART 2
// INVENTORY + SHOP
// =========================

// Item rarities

const rarities = [

{
name:"Common",
multiplier:1,
color:"common"
},

{
name:"Rare",
multiplier:2,
color:"rare"
},

{
name:"Epic",
multiplier:4,
color:"epic"
},

{
name:"Legendary",
multiplier:8,
color:"legendary"
},

{
name:"Divine",
multiplier:15,
color:"divine"
}

];

// =========================
// INVENTORY UI
// =========================

function updateInventory(){

    const inventory =
    document.getElementById(
        "inventoryList"
    );

    if(!inventory) return;

    inventory.innerHTML = "";

    if(
        player.inventory.length === 0
    ){

        inventory.innerHTML =
        "Inventory Empty";

        return;
    }

    player.inventory.forEach(
        (item,index)=>{

        let button =
        document.createElement(
            "button"
        );

        button.textContent =
        item.name;

        if(item.class){

            button.classList.add(
                item.class
            );

        }

        button.onclick =
        function(){

            equipItem(
                index
            );

        };

        inventory.appendChild(
            button
        );

    });

}

// =========================
// EQUIP ITEM
// =========================

function equipItem(index){

    let item =
    player.inventory[index];

    if(!item)
        return;

    if(
        item.type === "weapon"
    ){

        player.weapon =
        item.name;

        player.attack +=
        item.attack;

        log(
            "Equipped " +
            item.name
        );

    }

    if(
        item.type === "armor"
    ){

        player.armor =
        item.name;

        player.defense +=
        item.defense;

        log(
            "Equipped " +
            item.name
        );

    }

    updateUI();

}

// =========================
// BUY CHEST
// =========================

function buyChest(){

    if(
        player.spiritStones < 200
    ){

        alert(
            "Need 200 Spirit Stones"
        );

        return;
    }

    player.spiritStones -= 200;

    const rarity =
    rarities[
        Math.floor(
            Math.random() *
            rarities.length
        )
    ];

    const weapon = {

        name:
        rarity.name +
        " Sword",

        type:"weapon",

        attack:
        10 *
        rarity.multiplier,

        class:
        rarity.color

    };

    player.inventory.push(
        weapon
    );

    log(
        "Found " +
        weapon.name
    );

    updateInventory();

    updateUI();

}

// =========================
// BUY QI PILL
// =========================

function buyQiPill(){

    if(
        player.spiritStones < 50
    ){

        alert(
            "Need 50 Stones"
        );

        return;
    }

    player.spiritStones -= 50;

    player.pills++;

    log(
        "Purchased Qi Pill"
    );

    updateUI();

}

// =========================
// CRAFT QI PILL
// =========================

function craftQiPill(){

    if(
        player.spiritStones < 25
    ){

        alert(
            "Need 25 Stones"
        );

        return;
    }

    player.spiritStones -= 25;

    player.pills++;

    log(
        "Crafted Qi Pill"
    );

    updateUI();

}

// =========================
// USE QI PILL
// =========================

function useQiPill(){

    if(
        player.pills <= 0
    ){

        alert(
            "No Pills"
        );

        return;
    }

    player.pills--;

    player.qi += 500;

    log(
        "Used Qi Pill"
    );

    updateUI();

}

// =========================
// RANDOM EQUIPMENT
// =========================

function findEquipment(){

    const rarity =
    rarities[
        Math.floor(
            Math.random() *
            rarities.length
        )
    ];

    let roll =
    Math.random();

    let item;

    if(roll < 0.5){

        item = {

            name:
            rarity.name +
            " Blade",

            type:"weapon",

            attack:
            5 *
            rarity.multiplier,

            class:
            rarity.color

        };

    }else{

        item = {

            name:
            rarity.name +
            " Armor",

            type:"armor",

            defense:
            5 *
            rarity.multiplier,

            class:
            rarity.color

        };

    }

    player.inventory.push(
        item
    );

    log(
        "Found " +
        item.name
    );

    updateInventory();

}

// =========================
// SHOW INVENTORY
// =========================

function showInventory(){

    updateInventory();

    log(
        "Opened Inventory"
    );

}

// =========================
// START INVENTORY
// =========================

updateInventory();

// =========================
// PART 3
// DUNGEONS + BOSSES
// SKILLS + BEASTS
// ACHIEVEMENTS
// =========================

// =========================
// DUNGEON ENEMIES
// =========================

const dungeonEnemies = [

{
name:"Bandit",
hp:50,
attack:5,
reward:25
},

{
name:"Spirit Wolf",
hp:100,
attack:10,
reward:50
},

{
name:"Demonic Cultivator",
hp:250,
attack:20,
reward:100
},

{
name:"Ancient Guardian",
hp:500,
attack:40,
reward:250
},

{
name:"Dragon King",
hp:1000,
attack:100,
reward:1000
}

];

// =========================
// BOSSES
// =========================

const bosses = [

{
name:"Demon Lord",
power:500,
reward:500
},

{
name:"Heaven Emperor",
power:1500,
reward:1500
},

{
name:"Ancient Dragon",
power:5000,
reward:5000
},

{
name:"Chaos Sovereign",
power:15000,
reward:15000
}

];

// =========================
// DUNGEON
// =========================

function runDungeon(){

    const enemy =
    dungeonEnemies[
        Math.floor(
            Math.random() *
            dungeonEnemies.length
        )
    ];

    let playerPower =
    player.attack +
    player.defense +
    player.hp +
    (player.realm * 50);

    let enemyPower =
    enemy.hp +
    enemy.attack;

    const result =
    document.getElementById(
        "dungeonResult"
    );

    if(playerPower > enemyPower){

        player.spiritStones +=
        enemy.reward;

        result.textContent =
        "Victory vs " +
        enemy.name +
        " +" +
        enemy.reward +
        " Stones";

        log(
            "Defeated " +
            enemy.name
        );

        findEquipment();

    }else{

        result.textContent =
        "Defeated by " +
        enemy.name;

        log(
            "Lost to " +
            enemy.name
        );

    }

    checkAchievements();

    updateUI();
}

// =========================
// BOSS RAID
// =========================

function fightBoss(){

    const boss =
    bosses[
        Math.floor(
            Math.random() *
            bosses.length
        )
    ];

    let power =
    player.attack +
    player.defense +
    player.hp +
    (player.realm * 100);

    const result =
    document.getElementById(
        "bossResult"
    );

    if(power > boss.power){

        player.spiritStones +=
        boss.reward;

        player.qi +=
        boss.reward * 2;

        result.textContent =
        "Defeated " +
        boss.name;

        log(
            "Boss defeated: " +
            boss.name
        );

    }else{

        result.textContent =
        "Failed against " +
        boss.name;

        log(
            "Boss defeated you"
        );

    }

    updateUI();
}

// =========================
// SKILLS
// =========================

function useFireball(){

    player.qi += 100;

    log(
        "Fireball cast. +100 Qi"
    );

    updateUI();
}

function useSwordIntent(){

    player.attack += 25;

    log(
        "Sword Intent activated"
    );

    updateUI();
}

function useLightningStrike(){

    player.attack += 50;

    log(
        "Lightning Strike activated"
    );

    updateUI();
}

// =========================
// BEASTS
// =========================

const beastStages = [

"Spirit Wolf",

"Azure Wolf",

"Celestial Wolf",

"Divine Wolf"

];

// =========================
// TAME BEAST
// =========================

function tameBeast(){

    if(player.beast){

        alert(
            "You already have a beast"
        );

        return;
    }

    player.beast =
    beastStages[0];

    player.attack += 50;

    log(
        "Tamed Spirit Wolf"
    );

    updateUI();
}

// =========================
// EVOLVE BEAST
// =========================

function evolveBeast(){

    if(!player.beast){

        alert(
            "No Beast"
        );

        return;
    }

    let current =
    beastStages.indexOf(
        player.beast
    );

    if(
        current >=
        beastStages.length - 1
    ){

        alert(
            "Maximum Evolution"
        );

        return;
    }

    player.beast =
    beastStages[
        current + 1
    ];

    player.attack += 100;

    log(
        "Beast evolved into " +
        player.beast
    );

    updateUI();
}

// =========================
// ACHIEVEMENTS
// =========================

function unlockAchievement(name){

    if(
        player.achievements.includes(
            name
        )
    ){
        return;
    }

    player.achievements.push(
        name
    );

    log(
        "Achievement: " +
        name
    );

    updateAchievements();
}

// =========================
// CHECK ACHIEVEMENTS
// =========================

function checkAchievements(){

    if(
        player.realm >= 5
    ){

        unlockAchievement(
            "Golden Core Expert"
        );

    }

    if(
        player.realm >= 10
    ){

        unlockAchievement(
            "Immortal Path"
        );

    }

    if(
        player.spiritStones >= 5000
    ){

        unlockAchievement(
            "Wealthy Cultivator"
        );

    }

    if(
        player.rebirths >= 1
    ){

        unlockAchievement(
            "First Ascension"
        );

    }

}

// =========================
// UPDATE ACHIEVEMENTS
// =========================

function updateAchievements(){

    const div =
    document.getElementById(
        "achievementList"
    );

    if(!div) return;

    if(
        player.achievements.length === 0
    ){

        div.innerHTML =
        "No Achievements Yet";

        return;
    }

    div.innerHTML = "";

    player.achievements.forEach(
        achievement=>{

        let p =
        document.createElement(
            "p"
        );

        p.textContent =
        "🏆 " +
        achievement;

        div.appendChild(
            p
        );

    });

}

// =========================
// INITIALIZE
// =========================

updateAchievements();

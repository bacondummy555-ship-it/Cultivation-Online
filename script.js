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

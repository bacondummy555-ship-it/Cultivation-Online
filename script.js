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
    name: "Cultivator",

    realm: 0,
    level: 1,

    qi: 0,
    spiritStones: 0,

    attack: 10,
    defense: 5,
    hp: 100,

    weapon: "None",
    armor: "None",

    sect: "None",

    beast: "None",

    pills: 0,

    rebirths: 0
};

const weapons = [
    {
        name:"Iron Sword",
        attack:10
    },

    {
        name:"Spirit Blade",
        attack:25
    },

    {
        name:"Heaven Sword",
        attack:50
    },

    {
        name:"Immortal Blade",
        attack:100
    }
];

const armors = [
    {
        name:"Leather Armor",
        defense:10
    },

    {
        name:"Spirit Armor",
        defense:25
    },

    {
        name:"Golden Armor",
        defense:50
    },

    {
        name:"Immortal Armor",
        defense:100
    }
];

function breakthroughCost(){
    return Math.floor(
        100 * Math.pow(
            1.8,
            player.realm
        )
    );
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

    if(player.realm >= realms.length - 1){
        alert("Maximum Realm Reached");
        return;
    }

    let cost =
    breakthroughCost();

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

    const weapon =
    weapons[
        Math.floor(
            Math.random() *
            weapons.length
        )
    ];

    const armor =
    armors[
        Math.floor(
            Math.random() *
            armors.length
        )
    ];

    player.weapon =
    weapon.name;

    player.armor =
    armor.name;

    player.attack +=
    weapon.attack;

    player.defense +=
    armor.defense;

    alert(
        "Found " +
        weapon.name +
        " and " +
        armor.name
    );

    updateUI();
}

function joinSect(name){

    player.sect = name;

    player.attack += 20;

    player.defense += 20;

    updateUI();

    alert(
        "Joined " + name
    );
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

    updateUI();
}

function useQiPill(){

    if(player.pills <= 0){

        alert("No Pills");

        return;
    }

    player.pills--;

    player.qi += 500;

    updateUI();
}

function tameBeast(){

    const beasts = [
        "Spirit Wolf",
        "Azure Tiger",
        "Flame Phoenix",
        "Ancient Dragon"
    ];

    player.beast =
    beasts[
        Math.floor(
            Math.random() *
            beasts.length
        )
    ];

    player.attack += 50;

    updateUI();

    alert(
        "Obtained " +
        player.beast
    );
}

function updateUI(){

    document.getElementById(
        "playerName"
    ).textContent =
    player.name;

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
    Math.floor(player.qi);

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
        "weaponSlot"
    ).textContent =
    player.weapon;

    document.getElementById(
        "armorSlot"
    ).textContent =
    player.armor;

    document.getElementById(
        "sectName"
    ).textContent =
    player.sect;

    document.getElementById(
        "beastName"
    ).textContent =
    player.beast;

    document.getElementById(
        "pillCount"
    ).textContent =
    player.pills;

    document.getElementById(
        "rebirths"
    ).textContent =
    player.rebirths;
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
    }
}

setInterval(() => {

    let autoGain =
    2 +
    player.realm +
    player.rebirths;

    player.qi += autoGain;

    updateUI();

}, 1000);

updateUI();

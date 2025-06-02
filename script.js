// buttons in vecht scherm//
const steve = document.querySelector(".steve")
const food = document.getElementById("food")
const attack = document.getElementById("attack")

// health-bars //
const hpBarMob = document.getElementById("health-barMob");
const mob = document.querySelector(".zombie")
const hpBarSteve = document.getElementById("health-barSteve")

// buttons om het spel te starten // 
const playButton = document.getElementById("play_button")
const tryAgainButton = document.getElementById("try_again_button")
const playAgainButton = document.getElementById("play_again_button");

// schermen //
const scherm_1 = document.querySelector(".scherm_1")
const scherm_2 = document.querySelector(".scherm_2")
const scherm_3 = document.querySelector(".scherm_3")
const scherm_4 = document.querySelector(".scherm_4")
const deathScherm = document.getElementById("death_scherm")
const winScherm = document.getElementById("win_scherm");

// audios //
const zombieHurtSound = document.getElementById("zombie_hurt");
const zombieDeathSound = document.getElementById("zombie_death");
const skeletonHurtSound = document.getElementById("skeleton_hurt");
const skeletonDeathSound = document.getElementById("skeleton_death");
const endermanHurtSound = document.getElementById("enderman_hurt");
const endermanDeathSound = document.getElementById("enderman_death");

// mob list //
const mobList = [
    { naam: "zombie", src: "images/zombie.png", hp: 100 },
    { naam: "skeleton", src: "images/skeleton.png", hp: 120 },
    { naam: "enderman", src: "images/enderman.gif", hp: 180 }
]

// waardes //
let mobNaam = document.querySelector("h1")
let hp = 100;
let hpSteve = 100;
let huidigeMob = 0;
let steveInterval;
let zombieTimeout;

// Dit start het spel door "play" button te klikken //
function startGame() {
    scherm_1.style.display = "none";
    scherm_2.style.display = "block";

    huidigeMob = 0;
    hp = mobList[huidigeMob].hp;
    mob.src = mobList[huidigeMob].src;
    mobNaam.textContent = mobList[huidigeMob].naam;
    hpBarMob.textContent = hp + "/" + hp;
    hpBarMob.style.width = "100%";
    hpBarMob.style.backgroundColor = "green";

    hpSteve = 100;
    hpBarSteve.textContent = hpSteve + "/100";
    hpBarSteve.style.width = "100%";

    attack.disabled = false;

    dmgSteve();
}

playButton.addEventListener("click", startGame);

// Dit zorgt ervoor dat steve elke n second damage krijgt. Als je HP 0 wordt, beeindigt het spel //
function dmgSteve() {
    clearInterval(steveInterval);

    steveInterval = setInterval(function () {
        hpSteve = Math.max(0, hpSteve - 20);
        hpBarSteve.textContent = hpSteve + "/100";
        hpBarSteve.style.width = hpSteve + "%";

        if (hpSteve === 0) {
            clearInterval(steveInterval);
            setTimeout(function () {
                scherm_3.style.display = "block";
                scherm_2.style.display = "none";
            }, 2000);
        }
    }, 2000);
}

// Je kan jezelf (Steve) healen met "food" knop //
function healSteve() {
    setTimeout(function () {
        hpSteve = Math.min(100, hpSteve + 20);
        hpBarSteve.textContent = hpSteve + "/100";
        hpBarSteve.style.width = hpSteve + "%";
    }, 1000);
}

food.addEventListener("click", healSteve);

// Deze functie zorgt ervoor dat Mobs damage krijgt met "attack" button en als ene dood is komt de volgende Mob //
function zombieDmg() {
    clearTimeout(zombieTimeout);

    zombieTimeout = setTimeout(function () {
        playHurtSound();

        hp = Math.max(0, hp - 20);
        hpBarMob.textContent = hp + "/" + mobList[huidigeMob].hp;
        hpBarMob.style.width = (hp / mobList[huidigeMob].hp) * 100 + "%";

        if (hp === 20) {
            hpBarMob.style.backgroundColor = "red";
        }

        if (hp === 0) {
            playDeathSound();

            setTimeout(function () {
                huidigeMob++;

                if (huidigeMob >= mobList.length) {
                    console.log("Oyun bitti!");
                    attack.disabled = true;

                    scherm_2.style.display = "none";
                    scherm_4.style.display = "block";
                    clearInterval(steveInterval);


                    return;
                }

                hp = mobList[huidigeMob].hp;
                mob.src = mobList[huidigeMob].src;
                mobNaam.textContent = mobList[huidigeMob].naam;
                hpBarMob.textContent = hp + "/" + hp;
                hpBarMob.style.width = "100%";
                hpBarMob.style.backgroundColor = "green";
            }, 500);
        }
    }, 750);
}

attack.addEventListener("click", zombieDmg);

// Als je verliest, kan je nog een keer spelen met "try again" button //
tryAgainButton.addEventListener("click", function () {
    scherm_3.style.display = "none";
    scherm_2.style.display = "block";

    hpSteve = 100;
    hpBarSteve.textContent = hpSteve + "/100";
    hpBarSteve.style.width = "100%";

    huidigeMob = 0;
    hp = mobList[0].hp;
    mob.src = mobList[0].src;
    mobNaam.textContent = mobList[0].naam;
    hpBarMob.textContent = hp + "/" + hp;
    hpBarMob.style.width = "100%";
    hpBarMob.style.backgroundColor = "green";

    attack.disabled = false;

    dmgSteve();
});

// Als je gewonnen hebt, kan je nog een keer spelen met "play again" button //
playAgainButton.addEventListener("click", function () {
    scherm_4.style.display = "none";
    scherm_2.style.display = "block";

    hpSteve = 100;
    hpBarSteve.textContent = hpSteve + "/100";
    hpBarSteve.style.width = "100%";

    huidigeMob = 0;
    hp = mobList[0].hp;
    mob.src = mobList[0].src;
    mobNaam.textContent = mobList[0].naam;
    hpBarMob.textContent = hp + "/" + hp;
    hpBarMob.style.width = "100%";
    hpBarMob.style.backgroundColor = "green";

    attack.disabled = false;

    dmgSteve();
});

// Audios werken als een Mob damage krijgt of dood gaat //
// Ik heb hiervoor aan chatGPT gevraagd //
// Prompt:
// hoe maak je een audio code zodat elke keer ik damage doe aan de mob geeft het geluid en ook als het dood gaat //
// https://chatgpt.com/share/683ddf2a-8584-8005-a00c-f8c5eb2536c8 //
function playHurtSound() {
    if (huidigeMob >= mobList.length) return;

    let currentMob = mobList[huidigeMob].naam;

    if (currentMob === "zombie") {
        zombieHurtSound.currentTime = 0;
        zombieHurtSound.play();
    } else if (currentMob === "skeleton") {
        skeletonHurtSound.currentTime = 0;
        skeletonHurtSound.play();
    } else if (currentMob === "enderman") {
        endermanHurtSound.currentTime = 0;
        endermanHurtSound.play();
    }
}

function playDeathSound() {
    if (huidigeMob >= mobList.length) return;

    let currentMob = mobList[huidigeMob].naam;

    if (currentMob === "zombie") {
        zombieDeathSound.currentTime = 0;
        zombieDeathSound.play();
    } else if (currentMob === "skeleton") {
        skeletonDeathSound.currentTime = 0;
        skeletonDeathSound.play();
    } else if (currentMob === "enderman") {
        endermanDeathSound.currentTime = 0;
        endermanDeathSound.play();
    }
}
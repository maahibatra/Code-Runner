let code, tcwp = [], occp = [], ocwp = [], nic = [];
let all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
eds = false;
let level = 0;
let hs = localStorage.getItem("hs") ? parseInt(localStorage.getItem("hs")) : 0;
let hearts = ["❤️", "❤️", "❤️"];
let ci, ci1, ci2, wi, wi1, wi2, cd, cd1, cd2, wd1, wd2, wd3, ocd, coin, remaining, remaining2;
//correct index, wrong index, correct digit, wrong digit

const ms = localStorage.getItem("ms");
if(ms === "closed") {
    modal.style.display = "none";
}

//define code
function genCode() {
    code = [];
    while(code.length < 3) {
        let digit = Math.floor(Math.random() * 10);
        if(!code.includes(digit)) {
            code.push(digit);
        }
    }

    remaining = all.filter(digit => !code.includes(digit));

    return code.join("");
}

//two correct, wrong positions
function genTCWP() {
    remaining2 = [...remaining];
    coin = Math.floor(Math.random() * 2);

    let tcwp = [];

    ci1 = Math.floor(Math.random() * 3);
    cd1 = code[ci1];
    do {
        wi1 = Math.floor(Math.random() * 3);
    } while(wi1 === ci1);
    tcwp[wi1] = cd1;

    do {
        ci2 = Math.floor(Math.random() * 3);
    } while(ci2 === ci1);
    cd2 = code[ci2];
    do {
        wi2 = Math.floor(Math.random() * 3);
    } while(wi2 === ci2 || wi2 === wi1);
    tcwp[wi2] = cd2;

    for(let i = 0; i < 3; i++) {
        if(tcwp[i] === undefined) {
            tcwp[i] = remaining[Math.floor(Math.random() * remaining.length)];
            wd1 = tcwp[i];
        }
    }
    return tcwp.join("");
}

//one correct, correct position
function genOCCP() {
    remaining2 = [...remaining];
    let occp = [];

    if(coin === 0) {
        do {
            ci = Math.floor(Math.random() * 3);
            cd = code[ci];
        } while(tcwp.includes(cd));
    } else {
        ci = Math.floor(Math.random() * 3);
        cd = code[ci];
    }
    occp[ci] = cd;
    ocd = cd;

    let ud = []; //undefined

    for(let i = 0; i < 3; i++) {
        if(occp[i] === undefined) {
            occp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== occp[i]);
            ud.push(occp[i]);
        }
    }
    do {
        wd2 = ud[Math.floor(Math.random() * ud.length)];
    } while(wd1 === wd2);
    return occp.join("");
}

//one correct, wrong position
function genOCWP() {
    remaining2 = [...remaining];
    let ocwp = [];

    if(coin === 1) {
        let vc = code.filter(digit => !tcwp.includes(digit) && digit !== ocd);
        if(vc.length > 0) {
            ci = Math.floor(Math.random() * 3);
            cd = vc[Math.floor(Math.random() * vc.length)];
        } else {
            do {
                ci = Math.floor(Math.random() * 3);
                cd = code[ci];
            } while(tcwp.includes(cd));
        }
    } else {
        do {
            ci = Math.floor(Math.random() * 3);
            cd = code[ci];
        } while(cd === ocd);
    }
    do {
        wi = Math.floor(Math.random() * 3);
    } while(wi === ci || wi === tcwp.indexOf(cd));
    ocwp[wi] = cd;

    let ei = []; //empty index
    for(let i = 0; i < 3; i++) {
        if(ocwp[i] === undefined) {
            ei.push(i);
        }
    }
    wi2 = ei[Math.floor(Math.random() * ei.length)];
    ocwp[wi2] = wd2;
    remaining2 = remaining2.filter(digit => digit !== wd2);

    for(let i = 0; i < 3; i++) {
        if(ocwp[i] === undefined) {
            ocwp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== ocwp[i]);
        }
    }
    return ocwp.join("");
}

//nothing is correct
function genNIC() {
    remaining2 = [...remaining];
    let nic = [];

    wi1 = Math.floor(Math.random() * 3);
    nic[wi1] = wd1;

    remaining2 = remaining2.filter(digit => digit !== wd1);

    do {
        wi2 = Math.floor(Math.random() * 3);
    } while(wi2 === wi1);
    nic[wi2] = wd2;

    remaining2 = remaining2.filter(digit => digit !== wd2);

    if(coin === 1) {

    }

    for(let i = 0; i < 3; i++) {
        if(nic[i] === undefined) {
            nic[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== nic[i]);
        }
    }
    return nic.join("");
}

function flag() {
    cs = genCode();
    console.log(cs);
    tcwp = genTCWP();
    occp = genOCCP();
    ocwp = genOCWP();
    nic = genNIC();

    let hh = document.querySelectorAll("#hints .hint");
    let hd = [ //hint data
        {array: tcwp, text: "Two numbers are correct but wrongly placed."},
        {array: occp, text: "One number is correct and correctly placed."},
        {array: ocwp, text: "One number is correct but wrongly placed."},
        {array: nic, text: "Nothing is correct."},
    ];
    
    hd.sort(() => Math.random() - 0.5);
    
    for(let i = 0; i < 4; i++) {
        let digits = hh[i].querySelectorAll(".digit");
        for(let j = 0; j < 3; j++) {
            digits[j].value = hd[i].array[j];
        }
    
        hh[i].querySelector(".text").textContent = hd[i].text;
    }

    let cds = document.querySelectorAll("#code .digit");

    cds.forEach((input, i) => {
        input.addEventListener("focus", function() {
            input.setSelectionRange(1, 1);
        });

        input.addEventListener("click", function() {
            input.setSelectionRange(1, 1);
        });

        input.addEventListener("input", function() {
            if(!/^\d$/.test(event.target.value.charAt(event.target.value.length - 1))) {
                event.target.value = event.target.value.replace(/\D/g, '');
            } else {
                event.target.value = event.target.value.charAt(event.target.value.length - 1);
                if(i < cds.length - 1) {
                    const nd = cds[i + 1];
                    nd.focus();
                }
            }
        });

        input.addEventListener("keydown", function() {
            if(event.key === "ArrowRight" && (i < cds.length - 1)) {
                    const nd = cds[i + 1];
                    nd.focus();
            } else if(event.key === "ArrowLeft" && i > 0) {
                    event.preventDefault();
                    const pd = cds[i - 1];
                    pd.focus();
            } else if(event.key === "Backspace" && input.value === ""&& i > 0) {
                const pd = cds[i - 1];
                pd.focus();
            }
        })
    });

    levelNumber.innerText = level;
    highscoreNumber.innerText = hs;

    document.addEventListener("keydown", function() {
        if(event.key === "Enter") {
            let cda = [];
            for(let i = 0; i < 3; i++) {
                if(cds[i].value === "") {
                    eds = true;
                }
                cda.push(cds[i].value);
            }
            
            if(eds) {
                note.innerText = "Please fill out all digits!";
                note.style.animation = "none";
                note.offsetHeight;
                note.style.animation = "slide 0.3s ease-out forwards";
                setTimeout(() => {
                    note.innerText = "Press enter to guess!";
                    note.style.animation = "none";
                    note.offsetHeight;
                    note.style.animation = "slide 0.3s ease-out forwards";
                }, 2500);
                eds = false;
            } else {
                cda = cda.join("");
                if(cda === cs) {
                    levelUp();
                    flag();
                } else {
                    heartbreak();
                }
            }
        }
    });

    cds[0].focus();
    cds.forEach(input => input.value = "");
}

function levelUp() {
    level++;
    levelNumber.innerText = level;
    if(level > hs) {
        hs = level;
        localStorage.setItem("hs", hs);
        highscoreNumber.innerText = hs;
    }
}

function heartbreak() {
    for(let i = 0; i < hearts.length; i++) {
        if(hearts[i] === "❤️") {
            hearts[i] = "💔";
            break;
        } else if(hearts[i] === "💔") {
            hearts[i] = "🖤";
            break;
        }
    }

    health.innerHTML = hearts.join(" ");

    if(hearts.every(heart => heart === "🖤")) {
        console.log("Game over!");
    }
}

flag();
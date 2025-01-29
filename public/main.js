// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//define code
let code = [];
while(code.length < 3) {
    let digit = Math.floor(Math.random() * 10);
    if(!code.includes(digit)) {
        code.push(digit);
    }
}
code = code.join("");

let all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let remaining = all.filter(digit => !code.includes(digit));
let remaining2 = [...remaining];
let tcwpd = [];

let ci, ci1, ci2, wi, wi1, wi2, cd, cd1, cd2, wd1, wd2, occpd;

//two correct, wrong positions
function genTCWP() {
    let tcwp = [];

    ci1 = Math.floor(Math.random() * 3);
    cd1 = code[ci1];
    do {
        wi1 = Math.floor(Math.random() * 3);
    } while(wi1 === ci1);
    tcwp[wi1] = cd1;
    tcwpd[0] = cd1;

    do {
        ci2 = Math.floor(Math.random() * 3);
    } while(ci2 === ci1);
    cd2 = code[ci2];
    do {
        wi2 = Math.floor(Math.random() * 3);
    } while(wi2 === ci2 || wi2 === wi1);
    tcwp[wi2] = cd2;
    tcwpd[1] = cd2;

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
    let occp = [];

    ci = Math.floor(Math.random() * 3);
    cd = code[ci];
    occp[ci] = cd;
    ocd = cd;

    for(let i = 0; i < 3; i++) {
        if(occp[i] === undefined) {
            occp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== occp[i]);
        }
    }
    return occp.join("");
}

//one correct, wrong position
function genOCWP() {
    let ocwp = [];

    ci = Math.floor(Math.random() * 3);
    cd = code[ci];
    while(cd === ocd) {
        ci = Math.floor(Math.random() * 3);
        cd = code[ci];
    }

    do {
        wi = Math.floor(Math.random() * 3);
    } while(wi === ci);
    ocwp[wi] = cd;

    let uds = [];

    for(let i = 0; i < 3; i++) {
        if(ocwp[i] === undefined) {
            ocwp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== ocwp[i]);
            uds.push(ocwp[i]);
        }
    }
    do {
        wd2 = uds[Math.floor(Math.random() * uds.length)];
    } while(wd1 === wd2);
    return ocwp.join("");
}

//nothing is correct
function genNIC() {
    let nic = [];

    wi1 = Math.floor(Math.random() * 3);
    nic[wi1] = wd1;

    remaining2 = remaining2.filter(digit => digit !== wd1);

    do {
        wi2 = Math.floor(Math.random() * 3);
    } while(wi2 === wi1);
    nic[wi2] = wd2;

    remaining2 = remaining2.filter(digit => digit !== wd2);

    for(let i = 0; i < 3; i++) {
        if(nic[i] === undefined) {
            nic[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== nic[i]);
        }
    }
    return nic.join("");
}

console.log(code);
let tcwp = genTCWP();
console.log("TCWP: " + tcwp);
let occp = genOCCP();
console.log("OCCP: " + occp);
let ocwp = genOCWP();
console.log("OCWP: " + ocwp);
let nic = genNIC();
console.log("NIC: " + nic);

// function answer() {
//     rl.question("Enter code: ", (input) => {
//         if(input === code) {
//             console.log("Cracked");
//             rl.close(); 
//         } else {
//             console.log("Incorrect");
//             answer();
//         }
//     });
// };

// answer();
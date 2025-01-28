const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

function genTCWP() {
    let tcwp = [];
    let remaining2 = [...remaining];

    let ci1 = Math.floor(Math.random() * 3);
    let cd1 = code[ci1];
    let wi1;
    do {
        wi1 = Math.floor(Math.random() * 3);
    } while(wi1 === ci1);
    tcwp[wi1] = cd1;

    let ci2;
    do {
        ci2 = Math.floor(Math.random() * 3);
    } while(ci2 === ci1);
    let cd2 = code[ci2];
    let wi2;
    do {
        wi2 = Math.floor(Math.random() * 3);
    } while(wi2 === ci2 && wi2 === wi1);
    tcwp[wi2] = cd2;

    remaining2 = remaining2.filter(digit => digit !== cd1 && digit !== cd2);

    for(let i = 0; i < 3; i++) {
        if(tcwp[i] === undefined) {
            tcwp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== tcwp[i]);
        }
    }
    return tcwp.join("");
}

function genOCCP() {
    let occp = [];
    let remaining2 = [...remaining];

    let ci = Math.floor(Math.random() * 3);
    let cd = code[ci];
    occp[ci] = cd;

    remaining2 = remaining2.filter(digit => digit !== cd);

    for(let i = 0; i < 3; i++) {
        if(i !== ci) {
            occp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== occp[i]);
        }
    }
    return occp.join("");
}

function genOCWP() {
    let ocwp = [];
    let remaining2 = [...remaining];

    let ci = Math.floor(Math.random() * 3);
    let cd = code[ci];
    let wi;
    do {
        wi = Math.floor(Math.random() * 3);
    } while(wi === ci);
    ocwp[wi] = cd;

    remaining2 = remaining2.filter(digit => digit !== cd);

    for(let i = 0; i < 3; i++) {
        if(i !== wi) {
            ocwp[i] = remaining2[Math.floor(Math.random() * remaining2.length)];
            remaining2 = remaining2.filter(digit => digit !== ocwp[i]);
        }
    }
    return ocwp.join("");
}

function genNIC() {
    let nic = [];
    for(let i = 0; i < 3; i++) {
        let digit = Math.floor(Math.random() * remaining.length);
        nic.push(remaining[digit]);
        remaining.splice(digit, 1);
    }
    return nic.join("");;
}

let tcwp = genTCWP();
console.log("TCWP: " + tcwp);
let occp = genOCCP();
console.log("OCCP: " + occp);
let ocwp = genOCWP();
console.log("OCWP: " + ocwp);
let nic = genNIC();
console.log("NIC: " + nic);

function answer() {
    rl.question("Enter code: ", (input) => {
        if(input === code) {
            console.log("Cracked");
            rl.close(); 
        } else {
            console.log("Incorrect");
            console.log(code);
            answer();
        }
    });
};

answer();
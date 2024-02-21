import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, imageUrl) {
const db = getDatabase();
set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
});
}

const elements = {
    a1: document.querySelector('.a1'),
    a2: document.querySelector('.a2'),
    a3: document.querySelector('.a3'),
    b1: document.querySelector('.b1'),
    b2: document.querySelector('.b2'),
    b3: document.querySelector('.b3'),
    c1: document.querySelector('.c1'),
    c2: document.querySelector('.c2'),
    c3: document.querySelector('.c3')
}

const dialog = document.querySelector('.dialog');
const restart = document.querySelector('.restart');
const resultTB = document.querySelector('.result');

function chagerCaracter(id) {
    var content = elements[id].textContent;

    console.log(content)

    if (content === '') {
        elements[id].innerText = "X";
        setTimeout(verifyWin, 500);
        setTimeout(aiMove, 10);
    }
}

function verifyWin() {
    const winningCombinations = [
        ['a1', 'a2', 'a3'], 
        ['b1', 'b2', 'b3'], 
        ['c1', 'c2', 'c3'], 
        ['a1', 'b1', 'c1'], 
        ['a2', 'b2', 'c2'], 
        ['a3', 'b3', 'c3'], 
        ['a1', 'b2', 'c3'], 
        ['a3', 'b2', 'c1']
    ];
    for (let combination of winningCombinations) {
        if (combination.every(id => elements[id].textContent == 'X')) {
            visibleDialog('X')
            return;
        } else if (combination.every(id => elements[id].textContent == 'O')) {
            visibleDialog('O')
            return;
        }
    }

    const allFilled = Object.values(elements).every(el => el.textContent !== '');
    if (allFilled) {
        visibleDialog('Empate');
        return;
    }
}

function visibleDialog (result) {
    resultTB.innerText = result;

    if (dialog.style.display === 'none') {
        dialog.style.display = 'flex'
    } else {
        dialog.style.display = 'none'
    }
}

function restartGame() {
    ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'].forEach(id => elements[id].innerText = "");
    writeUserData('userId', 'test', 'email', 'imageUrl');
    visibleDialog()
}

function aiMove() {
    const ids = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    const emptySpaces = ids.filter(id => elements[id].textContent === '');
    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
    const randomId = emptySpaces[randomIndex];
    if (randomId) {
        elements[randomId].innerText = 'O';
        setTimeout(verifyWin, 500);
    }
}
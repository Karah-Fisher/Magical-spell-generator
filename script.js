const generateBtn = document.getElementById('generateButton');
const resetBtn = document.getElementById('resetButton');
const spellArea = document.getElementById('spellArea');
const listItems = document.querySelectorAll('#ingredientsList li');

let countdownTimer;
let canGenerate = false;

function triggerSpellAnimation() {
    spellArea.classList.remove('animate');
    void spellArea.offsetWidth;
    spellArea.classList.add('animate');
}

function setGenerateState(enabled) {
    canGenerate = enabled;
    generateBtn.disabled = !enabled;
}

generateBtn.addEventListener('click', () => {
    if (!canGenerate) {
        return;
    }

    setGenerateState(false);
    clearInterval(countdownTimer);

    let secondsLeft = 3;
    spellArea.textContent = secondsLeft;
    spellArea.style.borderColor = '#ea4dff';
    spellArea.style.backgroundColor = 'transparent';

    countdownTimer = setInterval(() => {
        secondsLeft--;

        if (secondsLeft > 0) {
            spellArea.textContent = secondsLeft;
        } else {
            clearInterval(countdownTimer);
            revealSpell();
        }
    }, 1000);
});

function revealSpell() {
    const randomIndex = Math.floor(Math.random() * listItems.length);
    const chosenIngredient = listItems[randomIndex].textContent;

    spellArea.textContent = `✨ ${chosenIngredient}! ✨`;
    triggerSpellAnimation();

    const randomHue = Math.floor(Math.random() * 360);
    spellArea.style.backgroundColor = `hsla(${randomHue}, 80%, 40%, 0.3)`;
    spellArea.style.borderColor = `hsl(${randomHue}, 80%, 60%, 0.3)`;
    spellArea.style.boxShadow = `0 0 20px hsla(${randomHue}, 80%, 50%, 0.3)`;
}

resetBtn.addEventListener('click', () => {
    clearInterval(countdownTimer);
    spellArea.classList.remove('animate');
    spellArea.textContent = '';
    spellArea.style.backgroundColor = 'transparent';
    spellArea.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    spellArea.style.boxShadow = 'none';
    setGenerateState(true);
});

setGenerateState(true);
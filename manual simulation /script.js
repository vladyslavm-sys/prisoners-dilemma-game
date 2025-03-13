let userTotalScore = 0;
let computerTotalScore = 0;

function play(userChoice) {
    const strategies = {
        alwaysCooperate: 'cooperate',
        alwaysBetray: 'betray',
        titForTat: 'cooperate',  // Тит-Фор-Тат починає зі співпраці
        random: Math.random() < 0.5 ? 'cooperate' : 'betray'
    };

    const computerStrategy = document.getElementById('computerStrategy').value;
    let computerChoice = strategies[computerStrategy];

    // Якщо стратегія "Тит-Фор-Тат", комп'ютер відповідає на вибір користувача
    if (computerStrategy === 'titForTat') {
        if (sessionStorage.getItem('userPreviousChoice') === 'betray') {
            computerChoice = 'betray';
        }
        sessionStorage.setItem('userPreviousChoice', userChoice);
    }

    document.getElementById('userChoice').querySelector('span').textContent = userChoice === 'cooperate' ? 'Співпрацювати' : 'Зрадити';
    document.getElementById('computerChoice').querySelector('span').textContent = computerChoice === 'cooperate' ? 'Співпрацювати' : 'Зрадити';

    let outcome = '';
    let userPoints = 0;
    let computerPoints = 0;

    if (userChoice === 'cooperate' && computerChoice === 'cooperate') {
        outcome = 'Обидва отримують 3 роки ув\'язнення.';
        userPoints = 3;
        computerPoints = 3;
    } else if (userChoice === 'cooperate' && computerChoice === 'betray') {
        outcome = 'Ви отримуєте 5 років ув\'язнення, комп\'ютер отримує 1 рік.';
        userPoints = 5;
        computerPoints = 1;
    } else if (userChoice === 'betray' && computerChoice === 'cooperate') {
        outcome = 'Ви отримуєте 1 рік ув\'язнення, комп\'ютер отримує 5 років.';
        userPoints = 1;
        computerPoints = 5;
    } else if (userChoice === 'betray' && computerChoice === 'betray') {
        outcome = 'Обидва отримують 4 роки ув\'язнення.';
        userPoints = 4;
        computerPoints = 4;
    }

    // Оновлюємо рахунок
    userTotalScore += userPoints;
    computerTotalScore += computerPoints;

    // Виводимо результат
    document.getElementById('outcome').querySelector('span').textContent = outcome;
    document.getElementById('userScore').textContent = userTotalScore;
    document.getElementById('computerScore').textContent = computerTotalScore;
}

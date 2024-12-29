const API_BASE_URL = 'https://www.codewars.com/api/v1/users/';

let currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme + '-mode');

const fetchUserData = async () => {
    const username = document.getElementById('username').value.trim();
    if (!username) return;

    const url = `${API_BASE_URL}${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Felhasználó nem található!');
        const data = await response.json();
        displayUserData(data);
    } catch (error) {
        alert(error.message);
    }
};

const displayUserData = (data) => {
    const cardsContainer = document.getElementById('user-cards');
    const card = document.createElement('div');
    card.classList.add('card');
    if (currentTheme === 'dark') card.classList.add('dark');

    const javascriptSkill = data.ranks.languages.javascript.rank || 'Nincs adat';
    const rank = data.ranks.overall.name || 'Nincs adat';
    const name = data.name || 'Nincs megadva';
    const clan = data.clan || 'Nincs';
    const languages = data.ranks.languages ? Object.keys(data.ranks.languages).join(', ') : 'Nincs adat';

    card.innerHTML = `
        <h3>${data.username}</h3>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Klán:</strong> ${clan}</p>
        <p><strong>Nyelvek:</strong> ${languages}</p>
        <p><strong>Javascript rang:</strong> ${javascriptSkill}</p>
        <p><strong>Rang:</strong> ${rank}</p>
    `;
    cardsContainer.appendChild(card);
};


const toggleTheme = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', currentTheme);
};

document.addEventListener('DOMContentLoaded', () => {
    fetchMonsters(); // Call the monsters to fetch and display the first page of monsters
    setupForm();
});

function createMonsterElement(monster) {
    const monsterDiv = document.createElement('div');

    const nameElement = document.createElement('h3');
    nameElement.textContent = monster.name;

    const ageElement = document.createElement('p');
    ageElement.textContent = `Age: ${monster.age}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${monster.description}`;

    monsterDiv.append(nameElement);
    monsterDiv.append(ageElement);
    monsterDiv.append(descriptionElement);
    
    return monsterDiv;
}

function fetchMonsters() {
    fetch("http://localhost:3000/monsters")
    .then((r) => r.json())
    .then(monsters => {
        const monsterContainer = document.getElementById('monster-container');
        monsterContainer.innerHTML = ''; //clear previous monsters

        monsters.slice(0, 50).forEach(monster => {
            const monsterDiv = createMonsterElement(monster);
            monsterContainer.append(monsterDiv);
        })
    })
}
 function handleFormSubmit(event) {
   event.preventDefault();

   const name = document.getElementById("name").value;
   const age = document.getElementById("age").value;
   const description = document.getElementById("description").value;

   const newMonster = {
     name: name,
     age: age,
     description: description,
   };
   createMonster(newMonster);
 }

 function setupForm() {
    const form = document.getElementById('monster-form');
    form.addEventListener('submit', handleFormSubmit);
     const createMonsterButton = document.getElementById('create-monster-btn');
     createMonsterButton.addEventListener('click', handleFormSubmit);
 }

 function createMonster(monster) {
    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
    })
    .then(r => r.json())
    .then(newMonster => {
        const monsterDiv = createMonsterElement(newMonster);
        const monsterContainer = document.getElementById('monster-container');
        monsterContainer.prepend(monsterDiv);
    })
 }

 const forwardButton = document.getElementById('forward');
 forwardButton.addEventListener('click', loadMoreMonsters);

 let currentPage = 1;

 function loadMoreMonsters() {
    currentPage++;
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
    .then((r) => r.json())
    .then(monsters => {
        const monsterContainer = document.getElementById('monster-container');
        monsterContainer.innerHTML = '';
        monsters.forEach(monster => {
            const monsterDiv = createMonsterElement(monster);
            monsterContainer.append(monsterDiv);
        })
    })
 }
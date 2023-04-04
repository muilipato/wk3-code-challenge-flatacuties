

// Your code here
function displayCharacters(character){
    let mycharacters=document.getElementById('character-bar');
    let mySpan = document.createElement("span")
    mySpan.innerText = character.name
    mycharacters.append(mySpan)

    const clickAnimal=() => {
        displayDetailedInfo(character.id)}
    
    mySpan.addEventListener("click", clickAnimal);

    
  
    
   
}
function displayDetailedInfo(charId){
    let characterInfo = document.querySelector("div.characterInfo");
    fetch(`http://localhost:3000/characters/${charId}`)
    .then(response => response.json())
        .then(myDetails => {
            let mychar = `
            <div id="detailed-info">
                <p id="name">${myDetails.name}</p>
                <img
                id="image"
                src="${myDetails.image}"
                alt="${myDetails.name}"
                /><!-- display character image here -->
                <h4>Total Votes: <span id="vote-count">${myDetails.votes}</span></h4>
                <form id="votes-form">
                <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
                <input type="submit" value="Add Votes" />
                </form>
                <button id="reset-btn">Reset Votes</button>
            </div>
           
            `
            characterInfo.innerHTML=mychar
            document.getElementById("votes-form").addEventListener("submit", (event) => {
                event.preventDefault(); 
                let votesForm = event.target;
                let animalVotes = document.getElementById("vote-count")
                animalVotes.innerText = parseInt(votesForm.votes.value) + parseInt(animalVotes.innerText);
                votesForm.reset();
            })
            
            document.getElementById("reset-btn").addEventListener("click", () => {
                document.getElementById("vote-count").innerText = 0;
            })
        })



    }

function getCats(){
    fetch("http://localhost:3000/characters")
    .then(res =>res.json())
    .then(characters =>
        {characters.forEach(character =>{
        displayCharacters(character)
        displayDetailedInfo(character.id)
        });
    });
    

}

function renderCats(){
    getCats();

}
renderCats();
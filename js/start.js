function Start(){
    this.faq = `<h3 class="info" align="center">How to play:</h3>
    <p align="center">Memory is counter game where the object is to find pairs.</p>
    <p align="center">When the game begins, all pictures are hidden.</p>
    <h3 class="rules" align="center">To play:</h3>
    <ol class="rules__item">
      <li>Select two cards to try to match the pictures.</li>
      <li>If you match the pictures you can go again.</li>
      <li>If they don't match it is the computer turn them.</li>
      <li>The player that finds all pairs wins!</li>
      <li>Have fun!</li>
    </ol>`;
     this.difficult = `<h3 class="game_diff">Game Difficulty</h3>
     <form class="diff_form">
    <label about="20">
      <input type="radio" name="diff" value="10" checked>
      Low (5x2)
    </label>
    <label abc="20">
      <input type="radio" name="diff" value="18">
      Medium (6x3)
    </label>
    <label abc="20">
      <input type="radio" name="diff" value="24">
      High (8x3)
    </label>
  </form>`;
     this.skirt = `<h3 class="skirt_cards">Skirt Cards</h3>
     <form class="skirt_form">
      <label>
        <input type="radio" name="skirt" value="1"  checked>
        <img src="images/skirt1.png" width="120" height="180" alt="First skirt">
      </label>
      <label>
        <input type="radio" name="skirt" value="2" >
        <img src="images/skirt2.png" width="120" height="180" alt="Second skirt">
      </label>
      <label>
        <input type="radio" name="skirt" value="3" >
        <img src="images/skirt3.png" width="120" height="180" alt="Third skirt">
      </label>
      <label>
        <input type="radio" name="skirt" value="4" >
        <img src="images/skirt4.png" width="120" height="180" alt="Fourth skirt">
    </label>
     </form>`;
     this.button = '<button class="start btn">Start Game</button>';
     this.number = 10;
     this.picture = 1;
}
Start.prototype.build = function(){
        root.innerHTML = this.faq;
        root.innerHTML += this.difficult;
        root.innerHTML += this.skirt;
        root.innerHTML += this.button;
}
Start.prototype.handle = function(){
    const formDifficult = document.querySelector('.diff_form');
    const formSkirt = document.querySelector('.skirt_form');
    const startGame = document.querySelector('.start');
    formDifficult.addEventListener('click', (event) => {
        this.number = Number(event.target.value);
    });
    formSkirt.addEventListener('click', (event) => {
        this.picture = Number(event.target.value);
    });
    startGame.addEventListener('click', (event) => {
        event.stopPropagation();
        root.innerHTML = '';
        const initGame = new Game(this.number, this.picture);
        initGame.init();
    });
}
let start = new Start();
start.build();
start.handle();
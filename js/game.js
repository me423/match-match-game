const root = document.querySelector('.root');
function Game(number, cardShirt ){
	this.number = number;
	this.cardShirt = cardShirt;
	this.url = null;
	this.arr =[];
	this.value = null;
	this.current = null;
	this.count = 0;
	this.point = number;
	this.size = null;
	this.imgSize = null;
}

Game.prototype.choice = function () {
	switch (this.cardShirt) {
		case 1:
			this.url = 'first-skirt';
			break;
		case 2:
			this.url = 'second-skirt';
			break;
		case 3:
			this.url = 'third-skirt';
			break;
		case 4:
			this.url = 'fourth-skirt';
			break;
	}

	switch (this.number) {
		case 10:
			let j = 0;
			while(j<5){
				++j
				this.arr.push('./images/'+j+'.png');
				this.arr.push('./images/'+j+'.png');
			}
			this.size = 'big';
			this.imgSize = ' height="270" width="180" ';
			break;
		case 18:
			let k = 0;
			while(k<9){
				++k
				this.arr.push('./images/'+k+'.png');
				this.arr.push('./images/'+k+'.png')
			}			
			this.size = 'medium';
			this.imgSize = ' height="200" width="130" ';
			break;
		case 24:
			let i = 0;
			alert(this.arr)
			while(i<12){
				++i
				this.arr.push('./images/'+i+'.png');
				this.arr.push('./images/'+i+'.png');
			}
			this.size = 'small';
			this.imgSize = ' height="210" width="140" ';
			break;
	}
};
Game.prototype.build = function(){
	root.classList.add('wrapper');
	root.innerHTML = `<div class="timer"><span id="minutes"></span>:<span id="seconds"></span>
	</div>`;
	while (this.number > 0) {
		this.value = Math.round(Math.random() * (this.arr.length - 1));
		root.innerHTML += `<div class="container ${this.size}">
		<div class="card" num=${this.arr[this.value]}>
		  <div class="front ${this.url}"></div>
		  <div class="back"><img src ="${this.arr[this.value]}"${this.imgSize}/></div>
		</div>
	  </div>`;
		this.arr.splice(this.value, 1);
		this.number = this.number - 1;
	}
	
};
Game.prototype.handle = function() {
	root.addEventListener('click', (event) => {
		let target = event.target;
		while (target !== root) {
			if (target.classList.contains('card')) {
				if (this.count === 2) {
					return false;
				};

				target.classList.add('flipped');
				this.count = this.count + 1;

				if (this.count === 1) {
					this.current = target;
				};

				if (target === this.current) {
					this.count = 1;
				};

				if (this.count === 2) {
					if (this.current.getAttribute('num') === target.getAttribute('num')) {
						setTimeout(() => {
							this.current.classList.add('hide');
							target.classList.add('hide');
							this.point = this.point - 2;
							this.count = 0;
							if (this.point === 0) {
								this.win();
							}
						}, 1000);
					} else {
						setTimeout(() => {
							this.current.classList.remove('flipped');
							target.classList.remove('flipped');
							this.count = 0;
						}, 1000);
					}
				}
				return;
			}
			target = target.parentNode;
		}
	});


};
Game.prototype.timer = function() {
	const minutes = document.querySelector('#minutes');
	const seconds = document.querySelector('#seconds');
	let min = 0;
	let sec = 0;
	setInterval(() => {
		sec = sec + 1;
		if (sec === 60) {
			min = min + 1;
			sec = 0;
		};
		seconds.innerHTML = this.formatNumber(sec);
		minutes.innerHTML = this.formatNumber(min);
	}, 1000)
};
Game.prototype.formatNumber = function(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
};
Game.prototype.win = function() {
	root.classList.remove('wrapper');
	root.innerHTML = `<h2 class="win_title">You win!</h2>`;

	const win = document.querySelector('.win');
	win.addEventListener('click', () => {
		root.innerHTML = '';
		begin = new Start();
		begin.build();
		begin.handle();
	});
};
Game.prototype.init = function() {
	this.choice();
	this.build();
	this.handle();
	this.timer();
};
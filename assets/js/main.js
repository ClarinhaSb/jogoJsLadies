console.log('teste')
// Funcao para retornar um valor randomico 
function randomNumber (start, end) { return Phaser.Math.Between(start, end) }

// Funcao para retornar um valor randomico em um array
function random (array) { return array[Math.floor(Math.random() * array.length)] }


function preload () {
    this.load.atlas('hamtaro_atlas', 'assets/sprites/hamtaro/hamham.png','assets/sprites/maps/hamtaro.json')
    this.load.atlas('comida_atlas', 'assets/sprites/assest/food.png', 'assets/sprites/maps/food.json')
}

function create () {

    pontuacao = this.add.text(10,10,'Score:0', {
        fontFamily: 'Tahoma',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    });

    //Meu personagem
    hamtaro = this.physics.add.sprite(200,200, 'hamtaro_atlas')

    //movimentos
    cursors = this.input.keyboard.createCursorKeys()

    //animacoes
    this.anims.create({
        key: 'direita',
        frames: this.anims.generateFrameNames('hamtaro_atlas', {
            prefix:'hamtaro_',
            start: 1,
            end: 3
        }),
        repeat: -1,
        duration: 300
    });

    this.anims.create({
        key: 'esquerda',
        frames: this.anims.generateFrameNames('hamtaro_atlas', {
            prefix: 'hamtaro_',
            start: 4,
            end: 6
        }),
        repeat: -1,
        duration: 300
    });
        
    this.anims.create({
        key: 'cima',
        frames: this.anims.generateFrameNames('hamtaro_atlas', {
            prefix: 'hamtaro_',
            start: 7,
            end: 8
        }),
        repeat: -1,
        duration: 300
    });

    this.anims.create({
        key: 'baixo',
        frames: this.anims.generateFrameNames('hamtaro_atlas', {
            prefix: 'hamtaro_',
            start: 9,
            end: 10
        }),
        repeat: -1,
        duration: 300
    });

    this.anims.create({
        key: 'parado',
        frames: this.anims.generateFrameNames('hamtaro_atlas', {
            prefix: 'hamtaro_',
            start: 11,
            end: 12
        }),
        repeat: -1,
        duration: 300
    });

    // Cria um sprite de comida
    comida = this.physics.add.sprite(50,200,'comida_atlas', 'sprite86')
    

    //Informa que o hamtaro e a comida são passíveis de colisão
    this.physics.add.collider(hamtaro, comida)

    // Variavel para guardar a pontuação
    this.score = 3;

    // Cria o evento que acontecerá quando o hamtaro colidir com uma comida
    this.physics.add.overlap(hamtaro, comida, function(){

        comida.x = randomNumber(50, window.innerWidth - 50)
        comida.y = randomNumber(50, window.innerHeight - 50)

        let number = [92, 88, 87, 86, 85, 81, 78, 77, 76]
        number = random(number)
        comida.setTexture('comida_atlas',`sprite${number}`)

    
    // Adiciona a informação ao texto da tela
    pontuacao.setText(`Score: ${this.score}`)

    // Adiciona pontuação ao score
        this.score += 3

    }, null, this);

}



function update () {

if (cursors.left.isDown) {
    hamtaro.x -= 3
    hamtaro.anims.play('esquerda', true)
} else if (cursors.right.isDown) {
    hamtaro.x +=3
    hamtaro.anims.play('direita', true)
} else if (cursors.up.isDown) {
    hamtaro.y -= 2
    hamtaro.anims.play('cima', true)
} else if (cursors.down.isDown) {
    hamtaro.y += 2
    hamtaro.anims.play('baixo', true)
} else {
        hamtaro.anims.play('parado', true)

}
}

function principal() {
    
    var largura = window.innerWidth
    var altura = window.innerHeight

    var conf = {
    	type: Phaser.AUTO,
    	width: largura,
    	height: altura,
    	pixelArt: true,
    	backgroundColor: '#D40E6A',
    	physics: {
            default: 'arcade',
            arcade: {
                    gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }
    var game = new Phaser.Game(conf)
}


window.onload = principal
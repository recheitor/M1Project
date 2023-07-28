const Game = {
    gameScreen: document.querySelector('#game-screen'),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight,
    },





    onFloor: false,
    background: undefined,
    player: undefined,
    platform: undefined,
    coin: undefined,
    enemy: undefined,


    totalPlatforms: undefined,
    totalCoins: undefined,

    distancePlayed: { totalPixels: 0 },

    platformInitialLeft: undefined,
    platformInitialTop: undefined,
    platformsCreated: [],

    coinInitialLeft: undefined,
    coinInitialTop: undefined,
    coinsCreated: [],
    coinCounter: 0,

    enemyInitialLeft: undefined,
    enemyInitialtop: undefined,
    enemyCreated: [],

    gameLevel: 1,
    play: true,
    framesCounter: 0,


    pixelSize: window.innerHeight / 20,


    keys: {
        LEFT: {
            code: 'ArrowLeft',
            pressed: false
        },

        RIGHT: {
            code: 'ArrowRight',
            pressed: false,
        },

        SPACE: {
            code: 'Space',
            pressed: false,
        }
    },

    whoMoves: {
        state: 'player',
    },


    gameVel: {
        left: 6,
        gravity: 0.4,
    },


    init() {
        this.backgroundSound = new Audio('./sounds/background' + this.gameLevel + '.mp3')
        this.gameOverSound = new Audio('./sounds/gameover.mp3')
        this.pickUpSound = new Audio('./sounds/pickup.wav')
        this.endLevelSound = new Audio('./sounds/endlevel.wav')
        this.jumpSound = new Audio('./sounds/jump.wav')
        this.killSound = new Audio('./sounds/kill.wav')



        this.backgroundSound.play()
        this.setDimensions()
        this.gameScreen.style.display = 'block'
        this.setEventListeners()

        this.start()

    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`
    },

    setEventListeners() {
        this.setEventListenersDown()
        this.setEventListenersUp()
    },

    setEventListenersDown() {
        document.addEventListener('keydown', event => {
            switch (event.code) {
                case this.keys.LEFT.code:
                    this.keys.LEFT.pressed = true
                    break

                case this.keys.RIGHT.code:
                    this.keys.RIGHT.pressed = true
                    break

                case this.keys.SPACE.code:
                    if (this.player.playerPos.top === 700) {
                        this.jumpSound.play()
                        this.player.jump()

                    }
                    if (this.onFloor === true) {
                        this.jumpSound.play()
                        this.player.jump()
                        this.onFloor = false
                    }
                    // if (this.player.playerPos.top === 200) {
                    //     this.player.jump()
                    // }
                    // if (this.player.playerPos.top === 550) {
                    //     this.player.jump()
                    // }
                    break
            }
        })
    },

    setEventListenersUp() {
        document.addEventListener('keyup', event => {
            switch (event.code) {
                case this.keys.LEFT.code:
                    this.keys.LEFT.pressed = false
                    break

                case this.keys.RIGHT.code:
                    this.keys.RIGHT.pressed = false

                    break
            }

        })
    },

    start() {
        this.createElementsInit()

        this.gameLoop()
    },

    createElementsInit() {



        this.background = new Background(this.gameScreen, this.gameSize, this.keys, this.gameVel, this.whoMoves, this.distancePlayed, this.gameLevel)


        switch (this.gameLevel) {
            case 0:
                totalPlatforms = totalPlatforms0
                totalCoins = totalCoins0
                totalEnemies = totalEnemies0
                break
            case 1:
                totalPlatforms = totalPlatforms1
                totalCoins = totalCoins1
                totalEnemies = totalEnemies1
                break
            case 2:
                totalPlatforms = totalPlatforms2
                totalCoins = totalCoins2
                totalEnemies = totalEnemies2
                break
            case 3:
                totalPlatforms = totalPlatforms3
                totalCoins = totalCoins3
                totalEnemies = totalEnemies3
                break
        }


        for (j = 0; j < totalPlatforms.length; j++) {
            this.platformInitialTop = j * this.pixelSize


            for (i = 0; i < totalPlatforms[j].length; i++) {
                if (totalPlatforms[j][i] === 1

                ) {
                    this.platformType = 1
                    this.platformInitialLeft = i * this.pixelSize
                    this.platformsCreated.push(this.platform = new Platforms(this.gameScreen, this.gameSize, this.keys, this.gameVel, this.whoMoves, this.platformInitialLeft, this.platformInitialTop, this.gameLevel, this.platformType))
                    totalPlatforms[j][i] = 0
                }
                if (totalPlatforms[j][i] === 2

                ) {
                    this.platformType = 2
                    this.platformInitialLeft = i * this.pixelSize
                    this.platformsCreated.push(this.platform = new Platforms(this.gameScreen, this.gameSize, this.keys, this.gameVel, this.whoMoves, this.platformInitialLeft, this.platformInitialTop, this.gameLevel, this.platformType))
                    totalPlatforms[j][i] = 0
                }
            }


        }
        for (j = 0; j < totalCoins.length; j++) {
            this.coinInitialTop = j * this.pixelSize


            for (i = 0; i < totalCoins[j].length; i++) {
                if (totalCoins[j][i] === 1
                    //  && i * 100 <= this.gameSize.w + this.gameSize.w / 2   --- Carga por partes
                ) {

                    this.coinInitialLeft = i * this.pixelSize
                    this.coinsCreated.push(this.coin = new Coins(this.gameScreen, this.gameSize, this.keys, this.gameVel, this.whoMoves, this.coinInitialLeft, this.coinInitialTop, this.gameLevel))
                    totalCoins[j][i] = 0
                }
            }


        }



        for (j = 0; j < totalEnemies.length; j++) {
            this.enemyInitialtop = j * this.pixelSize

            for (i = 0; i < totalEnemies[j].length; i++) {
                if (totalEnemies[j][i] === 1
                    // && i * 100 <= this.gameSize.w + this.gameSize.w / 2   --- Carga por partes
                ) {
                    this.enemyInitialLeft = i * this.pixelSize
                    this.enemyCreated.push(this.enemy = new Enemies(this.gameScreen, this.gameSize, this.keys, this.gameVel, this.whoMoves, this.enemyInitialLeft, this.enemyInitialtop, this.gameLevel))
                    totalEnemies[j][i] = 0
                }
            }

        }

        finishPoint.init()

        this.player = new Player(this.gameScreen, this.gameSize, this.keys, this.gameVel, this.whoMoves)

    },





    isCollisionPlatform() {
        this.platformsCreated.forEach(eachPlatform => {

            // plataforma - jugador
            if (this.player.playerPos.left < eachPlatform.platformPos.left + 10 && // derec
                this.player.playerPos.left + this.player.playerSize.w > eachPlatform.platformPos.left &&//  izq
                this.player.playerPos.top < eachPlatform.platformPos.top + eachPlatform.platformSize.h - 10 &&  //  por debajo plataform
                this.player.playerSize.h + this.player.playerPos.top > eachPlatform.platformPos.top + 10) // al subir a la plataforma
            {

                this.keys.RIGHT.pressed = false
            }

            if (this.player.playerPos.left < eachPlatform.platformPos.left + eachPlatform.platformSize.w &&
                this.player.playerPos.left + this.player.playerSize.w > eachPlatform.platformPos.left + eachPlatform.platformSize.w - 10 &&
                this.player.playerPos.top < eachPlatform.platformPos.top + eachPlatform.platformSize.h - 10 &&
                this.player.playerSize.h + this.player.playerPos.top > eachPlatform.platformPos.top + 10) {

                this.keys.LEFT.pressed = false
            }

            if (this.player.playerPos.left < eachPlatform.platformPos.left + eachPlatform.platformSize.w - 10 &&
                this.player.playerPos.left + this.player.playerSize.w > eachPlatform.platformPos.left + 10 &&
                this.player.playerPos.top < eachPlatform.platformPos.top + 10 &&
                this.player.playerSize.h + this.player.playerPos.top > eachPlatform.platformPos.top) {

                this.player.playerPos.top = eachPlatform.platformPos.top - this.player.playerSize.h

                this.player.playerVel.top = 0
                this.onFloor = true


            }

            if (this.player.playerPos.left < eachPlatform.platformPos.left + eachPlatform.platformSize.w - 10 &&
                this.player.playerPos.left + this.player.playerSize.w > eachPlatform.platformPos.left + 10 &&
                this.player.playerPos.top < eachPlatform.platformPos.top + eachPlatform.platformSize.h &&
                this.player.playerSize.h + this.player.playerPos.top > eachPlatform.platformPos.top + eachPlatform.platformSize.h - 10) {

                this.player.playerVel.top = 0
                this.player.playerPos.top += 10
            }



            this.enemyCreated.forEach(eachEnemy => {
                if (eachEnemy.bulletsCreated) {

                    if (eachEnemy.bulletsCreated.bulletPos.left < eachPlatform.platformPos.left + eachPlatform.platformSize.w && // derec
                        eachEnemy.bulletsCreated.bulletPos.left + eachEnemy.bulletsCreated.bulletSize.w > eachPlatform.platformPos.left &&//  izq
                        eachEnemy.bulletsCreated.bulletPos.top < eachPlatform.platformPos.top + eachPlatform.platformSize.h &&  //  por debajo plataform
                        eachEnemy.bulletsCreated.bulletSize.h + eachEnemy.bulletsCreated.bulletPos.top > eachPlatform.platformPos.top) {

                        eachEnemy.bulletsCreated.bulletPos.top = eachPlatform.platformPos.top - eachEnemy.bulletsCreated.bulletSize.h
                        eachEnemy.bulletsCreated.bulletVel.top = 0
                        eachEnemy.bulletsCreated.bulletVel.left = 0
                    }
                }
            });

            // plataforma - enemigo

            this.enemyCreated.forEach(eachEnemy => {
                if (eachEnemy.enemyPos.left < eachPlatform.platformPos.left + 10 && // derec
                    eachEnemy.enemyPos.left + eachEnemy.enemySize.w > eachPlatform.platformPos.left &&//  izq
                    eachEnemy.enemyPos.top < eachPlatform.platformPos.top + eachPlatform.platformSize.h - 10 &&  //  por debajo plataform
                    eachEnemy.enemySize.h + eachEnemy.enemyPos.top > eachPlatform.platformPos.top + 10) // al subir a la plataforma
                {
                    eachEnemy.enemyPos.move = 'left'

                }

                if (eachEnemy.enemyPos.left < eachPlatform.platformPos.left + eachPlatform.platformSize.w &&
                    eachEnemy.enemyPos.left + eachEnemy.enemySize.w > eachPlatform.platformPos.left + eachPlatform.platformSize.w - 10 &&
                    eachEnemy.enemyPos.top < eachPlatform.platformPos.top + eachPlatform.platformSize.h - 10 &&
                    eachEnemy.enemySize.h + eachEnemy.enemyPos.top > eachPlatform.platformPos.top + 10) {
                    eachEnemy.enemyPos.move = 'right'

                }

                if (eachEnemy.enemyPos.left < eachPlatform.platformPos.left + eachPlatform.platformSize.w - 10 &&
                    eachEnemy.enemyPos.left + eachEnemy.enemySize.w > eachPlatform.platformPos.left + 10 &&
                    eachEnemy.enemyPos.top < eachPlatform.platformPos.top + 10 &&
                    eachEnemy.enemySize.h + eachEnemy.enemyPos.top > eachPlatform.platformPos.top) {

                    eachEnemy.enemyPos.top = eachPlatform.platformPos.top - eachEnemy.enemySize.h

                    eachEnemy.enemyVel.top = 0



                }


            });
        })

    },



    isCollisionEnemy() {

        this.enemyCreated.forEach(eachEnemy => {

            if (this.player.playerPos.left < eachEnemy.enemyPos.left + 12 && // derec
                this.player.playerPos.left + this.player.playerSize.w > eachEnemy.enemyPos.left &&//  izq
                this.player.playerPos.top < eachEnemy.enemyPos.top + eachEnemy.enemySize.h - 12 &&  //  por debajo plataform
                this.player.playerSize.h + this.player.playerPos.top > eachEnemy.enemyPos.top + 12) // al subir a la plataforma
            {
                this.gameOver()
                return

            }

            if (this.player.playerPos.left < eachEnemy.enemyPos.left + eachEnemy.enemySize.w &&
                this.player.playerPos.left + this.player.playerSize.w > eachEnemy.enemyPos.left + eachEnemy.enemySize.w - 12 &&
                this.player.playerPos.top < eachEnemy.enemyPos.top + eachEnemy.enemySize.h - 12 &&
                this.player.playerSize.h + this.player.playerPos.top > eachEnemy.enemyPos.top + 12) {
                this.gameOver()
                return
            }

            if (this.player.playerPos.left < eachEnemy.enemyPos.left + eachEnemy.enemySize.w - 10 &&
                this.player.playerPos.left + this.player.playerSize.w > eachEnemy.enemyPos.left + 10 &&
                this.player.playerPos.top < eachEnemy.enemyPos.top + 10 &&
                this.player.playerSize.h + this.player.playerPos.top > eachEnemy.enemyPos.top) {

                this.player.playerPos.top -= 30
                this.player.playerVel.top -= this.player.playerVel.jumpSize;
                this.player.playerPos.top += this.player.playerVel.top
                this.player.playerVel.top += this.player.playerVel.gravity
                this.killSound.play()
                eachEnemy.alive = false
            }



            if (eachEnemy.bulletsCreated) {

                if (eachEnemy.bulletsCreated.bulletPos.left < this.player.playerPos.left + this.player.playerSize.w && // derec
                    eachEnemy.bulletsCreated.bulletPos.left + eachEnemy.bulletsCreated.bulletSize.w > this.player.playerPos.left &&//  izq
                    eachEnemy.bulletsCreated.bulletPos.top < this.player.playerPos.top + this.player.playerSize.h &&  //  por debajo plataform
                    eachEnemy.bulletsCreated.bulletSize.h + eachEnemy.bulletsCreated.bulletPos.top > this.player.playerPos.top) {
                    this.gameOver()
                    return

                }
            }

        });
    },

    isCollisionFinish() {
        if (this.player.playerPos.left < finishPoint.gameFinishScreenPos.left + 10 && // derec
            this.player.playerPos.left + this.player.playerSize.w > finishPoint.gameFinishScreenPos.left &&//  izq
            this.player.playerPos.top < finishPoint.gameFinishScreenPos.top + finishPoint.gameFinishScreenSize.h - 10 &&  //  por debajo plataform
            this.player.playerSize.h + this.player.playerPos.top > finishPoint.gameFinishScreenPos.top + 10) {
            this.endLevelSound.play()
            this.gameFinish()
            return
        }

        if (this.player.playerPos.left < finishPoint.gameFinishScreenPos.left + finishPoint.gameFinishScreenSize.w - 10 &&
            this.player.playerPos.left + this.player.playerSize.w > finishPoint.gameFinishScreenPos.left + 10 &&
            this.player.playerPos.top < finishPoint.gameFinishScreenPos.top + 10 &&
            this.player.playerSize.h + this.player.playerPos.top > finishPoint.gameFinishScreenPos.top) {
            this.endLevelSound.play()
            this.gameFinish()
            return
        }
    },
    isCollisionCoin() {
        this.coinsCreated.forEach((eachCoin, idx) => {
            if (this.player.playerPos.left < eachCoin.coinPos.left + eachCoin.coinSize.w && // derec
                this.player.playerPos.left + this.player.playerSize.w > eachCoin.coinPos.left &&//  izq
                this.player.playerPos.top < eachCoin.coinPos.top + eachCoin.coinSize.h - 10 &&  //  por debajo plataform
                this.player.playerSize.h + this.player.playerPos.top > eachCoin.coinPos.top + 10) {
                this.coinCounter++
                this.pickUpSound.pause()
                this.pickUpSound.play()
                this.coinsCreated.splice(idx, 1)         // Eliminar del array
                eachCoin.coinElement.remove()   // Eliminar del DOM

            }
        });

    },


    gameLoop() {



        if (this.play) {
            this.drawAll()
            this.clearAll()
            this.isCollisionPlatform()
            this.isCollisionEnemy()
            this.isCollisionCoin()

            if (this.framesCounter > 30) {
                this.framesCounter = 0
            }
            this.framesCounter++
            this.isCollisionFinish()
        }


        if (!this.play) {
            return
        }

        window.requestAnimationFrame(() => this.gameLoop())
    },

    drawAll() {
        this.background.move()
        this.player.move()
        finishPoint.move()
        this.platformsCreated.forEach(eachPlatform => {
            eachPlatform.move()
        });

        this.enemyCreated.forEach(eachEnemy => {
            eachEnemy.move()
        });

        this.coinsCreated.forEach(eachCoin => {
            eachCoin.move()
        });



    },


    gameFinish() {
        this.gameScreen.style.display = 'none'
        gameFinish.gameFinishScreen.style.display = 'block'

        this.play = false
        this.backgroundSound.pause()
        gameFinish.init()

    },

    gameOver() {
        this.backgroundSound.pause()
        this.gameOverSound.play()
        this.play = false
        this.gameScreen.style.display = 'none'
        gameOver.gameOverScreen.style.display = 'block'
        gameOver.init()
    },

    clearAll() {
        this.enemyCreated.forEach((eachEnemy, idx) => {
            if (eachEnemy.alive === false) {
                if (eachEnemy.enemyPos.top > this.gameSize.h) {
                    if (eachEnemy.bulletsCreated) {
                        eachEnemy.bulletsCreated.bulletElement.remove()
                        eachEnemy.bulletsCreated = 0
                    }

                    this.enemyCreated.splice(idx, 1)         // Eliminar del array

                    eachEnemy.enemyElement.remove()   // Eliminar del DOM
                }
            }

            if (eachEnemy.enemyPos.left + eachEnemy.enemySize.w < eachEnemy.enemyPos.initial + eachEnemy.enemySize.w - eachEnemy.enemyLimits) {
                if (eachEnemy.bulletsCreated) {
                    eachEnemy.bulletsCreated.bulletElement.remove()
                    eachEnemy.bulletsCreated = 0
                }

                this.enemyCreated.splice(idx, 1)         // Eliminar del array
                eachEnemy.enemyElement.remove()   // Eliminar del DOM
            }
        })

        this.platformsCreated.forEach((eachPlatform, idx) => {
            if (eachPlatform.platformPos.left < -eachPlatform.platformSize.w) {
                this.platformsCreated.splice(idx, 1)         // Eliminar del array
                eachPlatform.platformElement.remove()
            }

        })


        if (this.player.playerPos.top + this.player.playerSize.h > this.gameSize.h) {
            this.gameOver()
            return
        }

        this.enemyCreated.forEach(eachEnemy => {
            if (eachEnemy.bulletsCreated && eachEnemy.bulletsCreated.timeSinceLaunch > eachEnemy.bulletsCreated.lifeTime) {
                if (this.framesCounter === eachEnemy.randomBulletNumber) {
                    eachEnemy.bulletsCreated.bulletElement.remove()
                    eachEnemy.bulletsCreated = 0


                }
            }
        });



    },


    clearFinish() {
        this.enemyCreated = []
        this.player = ""
        while (this.gameScreen.firstChild) {
            this.gameScreen.removeChild(this.gameScreen.firstChild);
        }

    }

}
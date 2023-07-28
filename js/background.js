class Background {

    constructor(gameScreen, gameSize, keys, gameVel, whoMoves, distancePlayed, gameLevel) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.gameVel = gameVel
        this.keys = keys
        this.whoMoves = whoMoves
        this.distancePlayed = distancePlayed
        this.gameLevel = gameLevel
        distancePlayed.totalPixels = gameSize.w / 2

        this.backgroundSize = {
            w: gameSize.w,
            h: gameScreen.h
        }
        this.backgroundPosition1 = {
            left: 0,
            top: 0
        }
        this.backgroundPosition2 = {
            left: gameSize.w,
            top: 0
        }


        this.init()
    }

    init() {
        this.backgroundElement1 = document.createElement('img')

        this.totalCoinsDiv = document.createElement('div')
        this.totalCoinsImg = document.createElement('img')
        this.totalCoinsCount = document.createElement('p')


        this.totalCoinsCount.style.fontWeight = 'bold'
        this.totalCoinsCount.style.fontSize = '2em'

        this.totalCoinsCount.innerText = Game.coinCounter
        this.totalCoinsImg.src = "./img/coin" + Game.gameLevel + ".png"
        this.totalCoinsImg.style.position = "absolute"


        this.totalCoinsCount.style.position = "absolute"
        this.totalCoinsCount.style.left = `55px`
        this.totalCoinsCount.style.top = `5px`

        this.totalCoinsDiv.style.position = "absolute"
        this.totalCoinsDiv.style.width = `50px`
        this.totalCoinsDiv.style.height = `50px`
        this.totalCoinsDiv.style.left = `10px`
        this.totalCoinsDiv.style.top = `10px`






        this.backgroundElement1.src = "./img/bg" + this.gameLevel + ".jpg"






        this.backgroundElement1.style.position = "absolute"
        this.backgroundElement1.style.width = `${this.backgroundSize.w * 2.3}px`

        this.backgroundElement1.style.left = `${this.backgroundPosition1.left}px`
        this.backgroundElement1.style.top = `${this.backgroundPosition1.top}px`



        this.gameScreen.appendChild(this.backgroundElement1)

        this.gameScreen.appendChild(this.totalCoinsDiv)
        this.totalCoinsDiv.appendChild(this.totalCoinsImg)
        this.totalCoinsDiv.appendChild(this.totalCoinsCount)
    }




    moveHorizontallyRight() {
        if (this.whoMoves.state === 'background' && this.keys.RIGHT.pressed && Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w > window.innerWidth) {
            this.backgroundPosition1.left -= (this.gameVel.left / 5)

            if (this.distancePlayed.totalPixels >= this.gameSize.w / 2)
                this.distancePlayed.totalPixels += this.gameVel.left
        }
    }




    move() {
        if (this.backgroundPosition1.left <= -this.backgroundSize.w) {
            this.backgroundPosition1.left = 0
            // this.backgroundPosition2.left = this.backgroundSize.w
        }

        this.moveHorizontallyRight()

        this.updatePosition()
    }

    updatePosition() {
        this.backgroundElement1.style.left = `${this.backgroundPosition1.left}px`
        // this.backgroundElement2.style.left = `${this.backgroundPosition2.left}px`
        this.totalCoinsCount.innerText = Game.coinCounter
    }
}
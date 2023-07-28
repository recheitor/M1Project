class Coins {
    constructor(gameScreen, gameSize, keys, gameVel, whoMoves, coinInitialLeft, coinInitialTop, gameLevel) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.gameVel = gameVel
        this.whoMoves = whoMoves
        this.keys = keys
        this.gameLevel = gameLevel

        this.coinSize = {
            w: window.innerHeight / 20,
            h: window.innerHeight / 20
        }


        this.coinPos = {
            left: coinInitialLeft,
            top: coinInitialTop
        }

        this.init()
    }

    init() {
        this.coinElement = document.createElement('img')
        this.coinElement.src = "./img/coin" + this.gameLevel + ".png"

        this.coinElement.style.position = 'absolute'

        this.coinElement.style.width = `${this.coinSize.w}px`
        this.coinElement.style.height = `${this.coinSize.h}px`
        this.coinElement.style.left = `${this.coinPos.left}px`
        this.coinElement.style.top = `${this.coinPos.top}px`

        this.gameScreen.append(this.coinElement)

    }

    moveHorizontallyRight() {
        if (this.whoMoves.state === 'background' && this.keys.RIGHT.pressed && Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w > window.innerWidth) {
            this.coinPos.left -= this.gameVel.left

        }
    }


    move() {
        this.moveHorizontallyRight()
        this.updatePosition()

    }

    updatePosition() {
        this.coinElement.style.left = `${this.coinPos.left}px`
        this.coinElement.style.top = `${this.coinPos.top}px`
    }
}

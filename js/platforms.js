class Platforms {
    constructor(gameScreen, gameSize, keys, gameVel, whoMoves, plaformInitialLeft, platformInitialTop, gameLevel, platformType) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.gameVel = gameVel
        this.whoMoves = whoMoves
        this.keys = keys
        this.gameLevel = gameLevel

        this.platformSize = {
            w: window.innerHeight / 20,
            h: window.innerHeight / 20
        }

        this.platformType = platformType
        this.platformPos = {
            left: plaformInitialLeft,
            top: platformInitialTop
        }

        this.init()
    }

    init() {
        this.platformElement = document.createElement('img')
        this.platformElement.src = "./img/brick" + this.gameLevel + this.platformType + ".png"

        this.platformElement.style.position = 'absolute'
        this.platformElement.style.backgroundColor = 'yellow'
        this.platformElement.style.width = `${this.platformSize.w}px`
        this.platformElement.style.height = `${this.platformSize.h}px`
        this.platformElement.style.left = `${this.platformPos.left}px`
        this.platformElement.style.top = `${this.platformPos.top}px`

        this.gameScreen.append(this.platformElement)

    }

    moveHorizontallyRight() {
        if (this.whoMoves.state === 'background' && this.keys.RIGHT.pressed && Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w > window.innerWidth) {
            this.platformPos.left -= this.gameVel.left
        }
    }


    move() {
        this.moveHorizontallyRight()
        this.updatePosition()
    }

    updatePosition() {
        this.platformElement.style.left = `${this.platformPos.left}px`
        this.platformElement.style.top = `${this.platformPos.top}px`
    }
}

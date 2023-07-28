const finishPoint = {
    gameFinishScreen: document.querySelector('#game-screen'),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight,
    },


    gameFinishScreenPos: {
        // left: Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left,
        // top: 

        left: undefined,
        top: undefined
    },

    gameFinishScreenSize: {
        w: window.innerHeight / 5,
        h: window.innerHeight / 5
    },







    init() {
        this.gameFinishScreenPos.left = Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w - this.gameFinishScreenSize.w
        this.gameFinishScreenPos.top = Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.top - this.gameFinishScreenSize.h
        this.finishPoint = document.createElement('img')
        this.finishPoint.src = "./img/finishPoint" + Game.gameLevel + ".png"
        this.finishPoint.style.position = 'absolute'

        this.finishPoint.style.width = `${this.gameFinishScreenSize.w}px`
        this.finishPoint.style.height = `${this.gameFinishScreenSize.h}px`



        this.finishPoint.style.top = `${this.gameFinishScreenPos.top + this.gameFinishScreenSize.h}px`
        this.finishPoint.style.left = `${this.gameFinishScreenPos.left}px`

        this.gameFinishScreen.appendChild(this.finishPoint)
    },


    moveHorizontallyRight() {
        if (Game.whoMoves.state === 'background' && Game.keys.RIGHT.pressed && Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w > window.innerWidth) {

            this.gameFinishScreenPos.left -= Game.gameVel.left
        }
    },


    move() {
        this.moveHorizontallyRight()

        this.updatePosition()
    },

    updatePosition() {
        this.finishPoint.style.left = `${this.gameFinishScreenPos.left}px`
        this.finishPoint.style.top = `${this.gameFinishScreenPos.top}px`

    }

}


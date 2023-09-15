class Enemies {
    constructor(gameScreen, gameSize, keys, gameVel, whoMoves, enemyInitialLeft, enemyInitialtop, gameLevel) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.gameVel = gameVel
        this.whoMoves = whoMoves
        this.keys = keys
        this.gameLevel = gameLevel


        this.bulletsCreated = 0

        this.enemySize = {
            w: 64,
            h: 64
        }

        this.alive = true

        this.enemyVel = {
            left: this.gameVel.left,
            top: 0,
            jumpSize: 16,
            gravity: this.gameVel.gravity,
        }

        this.enemyPos = {
            left: enemyInitialLeft,
            initial: enemyInitialLeft,
            top: enemyInitialtop,
            base: enemyInitialtop,
            move: 'right'
        }
        this.randomBulletNumber = Math.floor(Math.random() * 30)

        this.enemyLimits = this.enemyPos.initial + 300

        this.frameWidth = this.enemySize.w; // Width of a single frame in pixels
        this.totalFrames = 11; // Total number of frames in the sprite
        this.currentFrame = 0;
        this.nextFramePosition = 0


        this.init()
    }

    init() {
        this.enemyElement = document.createElement('div')


        this.enemyElement.style.position = 'absolute'

        this.enemyElement.style.width = `${this.enemySize.w}px`
        this.enemyElement.style.height = `${this.enemySize.h}px`
        this.enemyElement.style.left = `${this.enemyPos.left}px`
        this.enemyElement.style.top = `${this.enemyPos.top}px`

        this.enemyElement.style.backgroundImage = "url(./img/enemy" + Game.gameLevel + ".png)"
        this.enemyElement.style.backgroundPosition = '0px'

        this.gameScreen.append(this.enemyElement)



    }

    moveHorizontally() {
        if (this.enemyPos.left <= this.enemyPos.initial) {
            this.enemyPos.move = 'right'
        }
        if (this.enemyPos.left + this.enemySize.w >= this.enemyLimits) {
            this.enemyPos.move = 'left'





        }
    }

    moveHorizontallyBackground() {
        if (this.whoMoves.state === 'background' && this.keys.RIGHT.pressed && Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w > window.innerWidth) {
            this.enemyPos.left -= this.gameVel.left
            this.enemyPos.initial -= this.gameVel.left
            this.enemyLimits -= this.gameVel.left
            if (this.bulletsCreated) {
                this.bulletsCreated.bulletPos.left -= this.gameVel.left
            }




        }
    }

    playSprite() {

        if (Game.framesCounter % 10 === 0) {
            this.nextFramePosition = -(this.currentFrame * this.frameWidth);
            this.enemyElement.style.backgroundPosition = `${this.nextFramePosition}px 0`;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }
    }


    state() {

        this.enemyPos.top += this.enemySize.h * 2


    }


    move() {

        this.enemyPos.top += this.enemyVel.top
        this.enemyVel.top += this.enemyVel.gravity



        if (Game.gameLevel === 2) {
            if (!this.bulletsCreated) {
                if (Game.framesCounter === this.randomBulletNumber) {

                    this.bulletsCreated = new Bullets(this.gameScreen, this.gameSize, this.gameVel, this.enemyPos)
                }
            }

        }



        if (this.enemyPos.move === 'right') {
            this.enemyPos.left += this.gameVel.left / 4
        }
        if (this.enemyPos.move === 'left') {
            this.enemyPos.left -= this.gameVel.left / 4
        }
        this.moveHorizontally()
        if (this.alive === false) {
            this.state()
        }

        this.playSprite()


        this.bulletsCreated && this.bulletsCreated.move()



        this.moveHorizontallyBackground()
        this.updatePosition()
    }

    updatePosition() {
        this.enemyElement.style.left = `${this.enemyPos.left}px`
        this.enemyElement.style.top = `${this.enemyPos.top}px`
    }
}

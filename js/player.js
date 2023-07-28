class Player {


    constructor(gameScreen, gameSize, keys, gameVel, whoMoves) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.keys = keys
        this.gameVel = gameVel
        this.whoMoves = whoMoves


        this.playerSize = {
            w: 64,
            h: 64,
        }

        this.playerPos = {
            left: 50,
            limitLeft: 20,
            limitRight: (this.gameSize.w / 2) - (this.playerSize.w / 2),
            top: this.gameSize.h - this.playerSize.h - 40,
            base: this.gameSize.h - this.playerSize.h + 50,
        }

        this.playerVel = {
            left: this.gameVel.left,
            top: 0,
            jumpSize: 16,
            gravity: this.gameVel.gravity,
        }


        this.frameWidth = this.playerSize.w; // Width of a single frame in pixels
        this.totalFrames = 11; // Total number of frames in the sprite
        this.currentFrame = 0;
        this.nextFramePosition = 0

        this.init()
    }




    init() {

        this.playerElement = document.createElement('div')



        this.playerElement.style.overflow = 'hidden'
        this.playerElement.style.position = 'absolute'

        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`

        this.playerElement.style.backgroundImage = "url(./img/player" + Game.gameLevel + ".png)"
        this.playerElement.style.backgroundPosition = '0px'

        this.gameScreen.appendChild(this.playerElement)

    }


    moveHorizontallyRight() {
        if (this.keys.RIGHT.pressed) {
            if (this.playerPos.left < this.playerPos.limitRight) {
                this.playerPos.left += this.playerVel.left
            } else if (Game.platformsCreated[Game.platformsCreated.length - 1].platformPos.left + Game.platformsCreated[Game.platformsCreated.length - 1].platformSize.w <= window.innerWidth) {
                this.playerPos.left += this.playerVel.left
            }
            else {
                this.whoMoves.state = 'background'
            }
        }


    }
    moveHorizontallyLeft() {
        this.whoMoves.state = 'player'
        if (this.keys.LEFT.pressed) {
            if (this.playerPos.left > this.playerPos.limitLeft) {
                this.playerPos.left -= this.gameVel.left
            }
        }


    }



    playSprite() {
        this.nextFramePosition = -(this.currentFrame * this.frameWidth);
        this.playerElement.style.backgroundPosition = `${this.nextFramePosition}px 0`;
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    }





    jump() {

        this.playerPos.top -= 40;
        this.playerVel.top -= this.playerVel.jumpSize;


    }
    move() {
        if (this.playerVel.top < 12) {
            if (this.playerPos.top < this.playerPos.base) {
                this.playerPos.top += this.playerVel.top
                this.playerVel.top += this.playerVel.gravity

                // this.playerPos.base = this.gameSize.h - this.playerSize.h - 40

            } else {

                this.playerPos.top = this.playerPos.base
                this.playerVel.top = 1
            }
        } else {
            if (this.playerPos.top < this.playerPos.base) {
                this.playerPos.top += this.playerVel.top
                this.playerVel.top = 12
            }
            else {

                this.playerPos.top = this.playerPos.base
                this.playerVel.top = 1
            }
        }

        this.playSprite()
        this.moveHorizontallyLeft()
        this.moveHorizontallyRight()
        this.updatePosition()

    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`

    }





}




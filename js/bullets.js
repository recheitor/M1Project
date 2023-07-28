class Bullets {
    constructor(gameScreen, gameSize, gameVel, enemyPos) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.gameVel = gameVel


        this.timeSinceLaunch = 0

        this.bulletPos = {
            left: enemyPos.left,
            top: enemyPos.top,
        }

        this.bulletVel = {
            left: this.gameVel.left,
            top: 0,
            launchHeight: 8,
            gravity: this.gameVel.gravity,
        }
        this.lifeTime = 100
        this.bulletSize = {
            w: 50,
            h: 50
        }


        this.frameSize = 50; // Width of a single frame in pixels
        this.totalRows = 7; // Total number of frames in the sprite
        this.totalFramesPerRow = 10
        this.currentFrame = 0;
        this.nextFramePosition = 0
        this.currentRow = 0

        this.frameWidth = 50; // Width of a single frame in pixels
        this.totalFrames = 4; // Total number of frames in the sprite



        // this.frameWidth = 32; // Width of a single frame in pixels
        // this.totalFrames = 11; // Total number of frames in the sprite
        // this.currentFrame = 0;
        // this.nextFramePosition = 0


        this.init()
    }




    init() {
        this.bulletElement = document.createElement('div')


        this.bulletElement.style.position = 'absolute'

        this.bulletElement.style.width = `${this.bulletSize.w}px`
        this.bulletElement.style.height = `${this.bulletSize.h}px`
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`



        this.sprite = 'bullet'

        this.bulletElement.style.backgroundImage = "url(./img/" + this.sprite + ".png)"
        this.bulletElement.style.backgroundPositionX = '0px'
        this.bulletElement.style.backgroundPositionY = '0px'



        this.gameScreen.append(this.bulletElement)
        this.launchBullet()
    }

    launchBullet() {
        this.bulletPos.top -= 40;
        this.bulletVel.top -= this.bulletVel.launchHeight;
    }



    playSpriteExplosion() {

        if (this.currentFrame % this.totalFramesPerRow === 1) {
            this.currentRow++
            this.nextFramePositionY = this.currentRow * this.frameSize;
            this.bulletElement.style.backgroundPositionY = `${this.nextFramePositionY}px`;
            this.currentFrame = 0
        }

        this.nextFramePositionX = -(this.currentFrame * this.frameSize);
        this.bulletElement.style.backgroundPositionX = `${this.nextFramePositionX}px`;
        this.currentFrame = (this.currentFrame + 1) % (this.totalFramesPerRow);

    }

    playSprite() {

        if (Game.framesCounter % 10 === 0) {
            this.nextFramePosition = -(this.currentFrame * this.frameWidth);
            this.bulletElement.style.backgroundPosition = `${this.nextFramePosition}px`;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }



    }
    move() {

        this.timeSinceLaunch++
        if (this.timeSinceLaunch > this.lifeTime - this.lifeTime / 5) {
            this.bulletElement.style.backgroundImage = "url(./img/explosion.png)"
            this.sprite = 'explosion'

        }

        if (this.sprite === 'bullet') {
            this.playSprite()
        } else {
            this.playSpriteExplosion()
        }


        this.bulletPos.left += this.bulletVel.left
        this.bulletPos.top += this.bulletVel.top
        this.bulletVel.top += this.bulletVel.gravity



        this.updatePosition()
    }
    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`
        this.bulletElement.style.width = `${this.bulletSize.w}px`
        this.bulletElement.style.height = `${this.bulletSize.h}px`


    }
}



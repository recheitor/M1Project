const gameOver = {
    gameOverScreen: document.querySelector('#gameover-screen'),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight,
    },

    setEventListenersUp() {
        document.addEventListener('keyup', event => {
            if (event.code === 'Enter' && this.start === true) {

                this.start = false
                this.restarting()

            }

        })
    },


    init() {

        this.start = true


        this.setEventListenersUp()

        this.gameStartMainContainer = document.createElement('div')
        this.gameStartMainContainer.classList.add('container')
        this.gameStartMainContainer.style.display = 'flex'
        this.gameStartMainContainer.style.flexDirection = 'column'
        this.gameStartMainContainer.style.width = '30%'
        this.gameStartMainContainer.style.margin = 'auto auto'
        this.gameStartMainContainer.style.marginTop = '80px'
        //------------------------------------------------------------

        this.gameStartTextContainer = document.querySelector('#text1')
        this.gameStartTextContainer.innerText = 'Ooh so sad!!'

        this.gameStartTextContainer = document.querySelector('#text2')
        this.gameStartTextContainer.innerText = ''

        //------------------------------------------------------------
        this.gameStartImg = document.createElement('img')
        this.gameStartImg.src = "./img/gamestart.jpg"
        //------------------------------------------------------------
        this.gameStartKeysContainer = document.createElement('div')
        this.gameStartKeysContainer.classList.add('keys-container')

        this.gameStartKeysContainer.style.textAlign = 'center'



        this.totalCoinsImg = document.createElement('img')
        this.totalCoinsImg.src = "./img/coin" + Game.gameLevel + ".png"

        this.totalCoinsImg.style.width = '50px'


        this.gameStartKeysTextParagraph1 = document.createElement('p')
        this.gameStartKeysTextParagraph2 = document.createElement('p')

        this.gameStartKeysTextParagraph1.style.textAlign = 'center'
        this.gameStartKeysTextParagraph1.style.paddingTop = '10px'
        this.gameStartKeysTextParagraph1.style.paddingBottom = '40px'
        this.gameStartKeysTextParagraph1.style.fontFamily = 'Arial'
        this.gameStartKeysTextParagraph1.style.fontWeight = 'bold'

        this.gameStartKeysTextParagraph2.style.textAlign = 'center'
        this.gameStartKeysTextParagraph2.style.paddingTop = '10px'
        this.gameStartKeysTextParagraph2.style.paddingBottom = '40px'
        this.gameStartKeysTextParagraph2.style.fontFamily = 'Arial'
        this.gameStartKeysTextParagraph2.style.fontWeight = 'bold'


        this.gameStartKeysTextParagraph1.innerHTML = 'X  ' + Game.coinCounter
        this.gameStartKeysTextParagraph2.innerHTML = 'press ENTER to Restart'
        Game.coinCounter = 0


        this.gameOverScreen.appendChild(this.gameStartMainContainer)


        this.gameStartMainContainer.appendChild(this.gameStartImg)



        this.gameStartMainContainer.appendChild(this.gameStartKeysContainer)








        this.gameStartKeysContainer.appendChild(this.totalCoinsImg)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph1)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph2)




    },

    restarting() {


        this.gameOverScreen.style.display = 'none'
        gameStart.gameStartScreen.style.display = 'block'
        Game.platformsCreated = []
        Game.enemiesCreated = []
        Game.play = true
        this.gameOverScreen.removeChild(this.gameOverScreen.firstChild);

        window.location.reload()
    }

}
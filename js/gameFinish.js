const gameFinish = {
    gameFinishScreen: document.querySelector('#gamefinish-screen'),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight,
    },

    setEventListenersUp() {
        document.addEventListener('keyup', event => {
            if (event.code === 'Enter' && this.start === true) {

                this.start = false
                this.starting()

            }

        })
    },

    clearLevel() {
        Game.enemyCreated = []
        Game.player = ""
        while (Game.gameScreen.firstChild) {
            Game.gameScreen.removeChild(Game.gameScreen.firstChild);
        }
    },
    init() {
        this.clearLevel()
        this.start = true

        console.log((this.start));
        this.setEventListenersUp()

        this.gameStartMainContainer = document.createElement('div')
        this.gameStartMainContainer.classList.add('container')
        this.gameStartMainContainer.style.display = 'flex'
        this.gameStartMainContainer.style.flexDirection = 'column'
        this.gameStartMainContainer.style.width = '30%'
        this.gameStartMainContainer.style.margin = 'auto auto'
        this.gameStartMainContainer.style.marginTop = '80px'

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

        Game.gameLevel++

        this.gameStartKeysTextParagraph1 = document.createElement('p')
        this.gameStartKeysTextParagraph2 = document.createElement('p')
        this.gameStartKeysTextParagraph3 = document.createElement('p')

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


        this.gameStartKeysTextParagraph3.style.textAlign = 'center'
        this.gameStartKeysTextParagraph3.style.paddingTop = '10px'
        this.gameStartKeysTextParagraph3.style.paddingBottom = '20px'
        this.gameStartKeysTextParagraph3.style.fontFamily = 'Arial'
        this.gameStartKeysTextParagraph3.style.fontWeight = 'bold'
        this.gameStartKeysTextParagraph3.style.color = 'grey'

        this.gameStartKeysTextParagraph1.innerHTML = 'X  ' + Game.coinCounter
        this.gameStartKeysTextParagraph2.innerHTML = 'press ENTER to continue'
        this.gameStartKeysTextParagraph2.innerHTML = 'LEVEL 2: VALENCIA'



        this.gameFinishScreen.appendChild(this.gameStartMainContainer)


        this.gameStartMainContainer.appendChild(this.gameStartImg)



        this.gameStartMainContainer.appendChild(this.gameStartKeysContainer)






        this.gameStartKeysContainer.appendChild(this.totalCoinsImg)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph1)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph2)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph3)

    },

    starting() {


        this.gameFinishScreen.style.display = 'none'
        Game.platformsCreated = []
        Game.enemiesCreated = []
        Game.play = true
        this.gameFinishScreen.removeChild(this.gameFinishScreen.firstChild);

        Game.init()
    }
}


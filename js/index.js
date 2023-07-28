
window.onload = () => gameStart.init()

const gameStart = {
    gameStartScreen: document.querySelector('#gamestart-screen'),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight,
    },
    start: true,
    setEventListenersUp() {
        document.addEventListener('keyup', event => {
            if (event.code === 'Enter' && this.start === true) {

                this.start = false
                this.starting()

            }

        })
    },

    init() {

        this.setEventListenersUp()
        this.start = true
        this.introSound = new Audio('./sounds/intro.mp3')
        this.introSound.play()

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

        this.gameStartSpaceBarImg = document.createElement('img')
        this.gameStartArrowKeysImg = document.createElement('img')
        this.gameStartSpaceBarImg.classList.add('keys')
        this.gameStartArrowKeysImg.classList.add('keys')

        this.gameStartSpaceBarImg.style.margin = 'auto auto'
        this.gameStartSpaceBarImg.style.marginTop = '20px'
        this.gameStartSpaceBarImg.style.width = '30%'
        this.gameStartSpaceBarImg.style.paddingLeft = '30px'
        this.gameStartSpaceBarImg.style.paddingRight = '30px'

        this.gameStartArrowKeysImg.style.margin = 'auto auto'
        this.gameStartArrowKeysImg.style.marginTop = '20px'
        this.gameStartArrowKeysImg.style.width = '30%'
        this.gameStartArrowKeysImg.style.paddingLeft = '30px'
        this.gameStartArrowKeysImg.style.paddingRight = '30px'


        this.gameStartSpaceBarImg.src = "./img/spacebar.png"
        this.gameStartArrowKeysImg.src = "./img/keys.png"


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
        this.gameStartKeysTextParagraph2.style.paddingBottom = '20px'
        this.gameStartKeysTextParagraph2.style.fontFamily = 'Arial'
        this.gameStartKeysTextParagraph2.style.fontWeight = 'bold'

        this.gameStartKeysTextParagraph3.style.textAlign = 'center'
        this.gameStartKeysTextParagraph3.style.paddingTop = '10px'
        this.gameStartKeysTextParagraph3.style.paddingBottom = '20px'
        this.gameStartKeysTextParagraph3.style.fontFamily = 'Arial'
        this.gameStartKeysTextParagraph3.style.fontWeight = 'bold'
        this.gameStartKeysTextParagraph3.style.color = 'grey'


        this.gameStartKeysTextParagraph1.innerHTML = 'SPACEBAR for jump and ARROWS for move'
        this.gameStartKeysTextParagraph2.innerHTML = 'ENTER to START'
        this.gameStartKeysTextParagraph3.innerHTML = 'LEVEL 1: MADRID'


        this.gameStartScreen.appendChild(this.gameStartMainContainer)

        this.gameStartMainContainer.appendChild(this.gameStartImg)
        this.gameStartMainContainer.appendChild(this.gameStartSpaceBarImg)
        this.gameStartMainContainer.appendChild(this.gameStartKeysContainer)






        this.gameStartKeysContainer.appendChild(this.gameStartSpaceBarImg)
        this.gameStartKeysContainer.appendChild(this.gameStartArrowKeysImg)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph1)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph2)
        this.gameStartKeysContainer.appendChild(this.gameStartKeysTextParagraph3)










    },
    starting() {
        Game.gameScreen.style.display = 'block'
        this.gameStartScreen.style.display = 'none'
        this.introSound.pause()
        this.gameStartScreen.removeChild(this.gameStartScreen.firstChild);

        Game.init()
    }

}


const $ = (element) => {
    if (element == null || element === undefined) return false;

    this.DOM = document;
    this.createElement = this.DOM.createElement.bind(this.DOM);
    this.createTextNode = this.DOM.createTextNode.bind(this.DOM);
    this.self = this;
    this.log = console.log;
    this.elementNames = ["id", "className", "selector"]
    this.selector = null;
    this.type = 0;

    this.element = element;

    this.temporary = [];

    if (element.charAt(0) == "#") this.type = 0
    else if (element.charAt(0) == ".") this.type = 1;
    else this.type = 2;

    if (this.elementNames[this.type] === "id") { this.selector = this.DOM.querySelector(element) }
    else { this.selector = this.DOM.querySelectorAll(element) }

    this.addClass = function (classname) {
        if (this.elementNames[this.type] == "id") { this.selector.classList.add(classname); }
        else { for (let i = 0; i < this.selector.length; i++) { this.selector[i].classList.add(classname); } }
        return this.self;
    }

    this.createSplit = function (el, text) {
        let letters = text.split('') || [];
        let span, i;
        el.innerHTML = "";
        for (i = 0; i < letters.length; i++) {
            span = this.createElement('span');
            span.appendChild(this.createTextNode(letters[i]))
            el.appendChild(span);
        }

    }

    this.children = (elem) => { return elem.children; }

    this.each = (data, callback) => {
        if (typeof data == "object") {
            for (let i = 0; i < data.length; i++) {
                callback(data[i], i);
            }
        } else {
            callback(data);
        }

    }

    this.injectCSS = () => {
        const style = this.createElement('style');
        style.type = "text/css";
        style.innerHTML = `
  				@keyframes effect{
				  to{opacity:1;}
				  from{opacity:0;}
				}
				${this.element}::before{
					content:'';
					  color:red;
					  font-family:Arial;
                   
				}
				${this.element}::after{
					 content:'|';
  					  animation:effect .9s ease infinite;
				}

  		`;
        this.DOM.querySelector("head").appendChild(style);

    }
    this.run = () => {
        let child = this.selector.children;
        let split = this.createSplit;
        /*
          *controller
        */
        this.each(child, (data) => {
            if (data.nodeName == "TEXT") {
                data.setAttribute('data-len', data.textContent.length);
                this.temporary.push(data);
            }
        })


        if (this.temporary.length) {
            /*
              *split all data
            */
            this.each(this.temporary, (data) => {
                split(data, data.textContent);
            });
            this.connect();
        }

    }



    this.connect = function () {

        this.each(this.temporary, hide => { this.childHide(this.children(hide)) })
        this.infiniteLoop();
        this.injectCSS();

    }

    this.childHide = (list) => {
        const hide = this.hide;
        this.each(list, data => { hide(data); })
    }
    this.hide = (elem) => { if (elem) elem.style.display = "none"; }
    this.show = (elem) => { if (elem) elem.style.display = ""; }


    this.order = 0;
    this.backSelector = null;

    this.orderIncrement = function () {
        /*
          *Back selector hide
        */
        if (this.backSelector) { this.childHide(this.backSelector); }


        this.order += 1;
        if (this.order >= this.temporary.length) {
            this.order = 0;
        } else if (this.order < 0) {
            this.order = this.temporary.length - 1;
        }
    }

    this.infiniteLoop = function () {
        const loop = this.infiniteLoop;
        const backsel = children(this.temporary[this.order]);
        let len = this.temporary[this.order].dataset.len;
        this.each(backsel, (d, i) => {
            setTimeout(function () {
                show(d)
                if (backsel.length - 1 == i) {
                    setTimeout(function () {
                        loop();

                    }, 1500);
                }
            }, (i * (Math.max(100, len) / 3)));
        });
        this.orderIncrement();
        this.backSelector = backsel;

    }

    return this.self;

}

$("#kutu").run();
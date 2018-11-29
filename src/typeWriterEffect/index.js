'use strict'
class TypeWriter {

  constructor(element = document.querySelector('.txt-type')) {
    this.element = document.getElementById(element) || element;
    this.words = JSON.parse(this.element.getAttribute('data-words'))
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(JSON.parse(this.element.getAttribute('data-wait'))) || 3000;
    this.isDeleting = false
    this.timer = null
    this.init()
  }

  type(){
    const current = this.wordIndex % this.words.length
    const fullTxt = this.words[current]

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    this.element.innerHTML = ` <span class="txt">${this.txt}</span>`

    let typeSpeed = 300
    if (this.isDeleting) {
      typeSpeed /= 2
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false

      this.wordIndex++

      typeSpeed = 500
    }
    this.timer = setTimeout(() => this.type(), typeSpeed)
  }
  init(){
    this.type()
  }
  unMount(){
    clearTimeout(this.timer);
  }
}

const writer = new TypeWriter()
console.log(writer)
class Invader1 {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = 'img/controlador1-sheet.png'
    image.onload = () => {
      const scale = 3.5
      this.image = image
      this.height = image.height * scale
      this.width = image.width * scale
      this.position = {
        x: position.x,
        y: position.y
      }
    }
  }

draw () {
  c.drawImage(
    this.image,
    this.position.x,
    this.position.y, 
    this.width, 
    this.height
    )
  }

  update (){
    if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    }
  }
}





/*class Invader2 {
  constructor(position) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = 'img/controlador2-sheet.png'
    image.onload = () => {
      const scale = 3.5
      this.image = image
      this.height = image.height * scale
      this.width = image.width * scale
      this.position = {
      x: position.x,
      y: position.y
      }
    }
  }


draw () {
  c.drawImage(
    this.image,
    this.position.x,
    this.position.y, 
    this.width, 
    this.height
    )
  }

  update (){
    if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    }
  }
}*/

/*class Invader3 {
  constructor(position) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = 'img/controlador3-sheet.png'
    image.onload = () => {
      const scale = 3.5
      this.image = image
      this.height = image.height * scale
      this.width = image.width * scale
      this.position = {
      x: position.x,
      y: position.y
      }
    }
  }

draw () {
  c.drawImage(
    this.image,
    this.position.x,
    this.position.y, 
    this.width, 
    this.height
    )
  }

  update (){
    if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    }
  }
}*/ 
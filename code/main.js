const canvas =  document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }

    this.rotation = 0;

    const image = new Image()
    image.src = 'img/spaceship.png'
    image.onload = () => {
      const scale = 0.15
      this.image = image
      this.height = image.height * scale
      this.width = image.width * scale
      this.position = {
      x: canvas.width/2 - this.width/2,
      y: canvas.height/2 - this.height + 300
      }
    }
  }

draw () {
  c.save()
  c.translate(
    player.position.x + player.width/2, 
    player.position.y + player.height/2)
  c.rotate(this.rotation)

  c.translate(
    -player.position.x - player.width/2, 
    -player.position.y - player.height/2)

  c.drawImage(
    this.image,
    this.position.x,
    this.position.y, 
    this.width, 
    this.height
    )
    c.restore()
  }

  update (){
    if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    }
  }
}

class Projectile {
  constructor ({position, velocity}) {
    this.position = position
    this.velocity = velocity

    this.radius = 3;
  }

  draw () {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()
  }

  update () {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Invader1 {
  constructor({position}) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = 'img/controlador1-sheet.png'
    image.onload = () => {
      const scale = 3
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

  update ({velocity}){
    if (this.image) {
    this.draw()
    this.position.x += velocity.x
    this.position.y += velocity.y
    }
  }
}

class Invader2 {
  constructor({position}) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = 'img/controlador2-sheet.png'
    image.onload = () => {
      const scale = 3
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

  update ({velocity}){
    if (this.image) {
    this.draw()
    this.position.x += velocity.x
    this.position.y += velocity.y
    }
  }
}

class Invader3 {
  constructor({position}) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = 'img/controlador3-sheet.png'
    image.onload = () => {
      const scale = 3
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

  update ({velocity}){
    if (this.image) {
    this.draw()
    this.position.x += velocity.x
    this.position.y += velocity.y
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 2,
      y: 0
    }

    this.invaders = []

    const columns = 15;
    const rows = 3;

    this.width = columns * 60

    for (let x = 0; x < columns; x++){
      for (let y = 0; y < rows; y++){
      this.invaders.push(
        new Invader1({
        position: {
          x: x * 60,
          y: y * 80 + 70
        }
      }), new Invader2({
        position: {
          x: x * 60,
          y: y * 80 + 40
        }
      }), new Invader3({
        position: {
          x: x * 60,
          y: y * 80
        }
      })
      )}
    }
    console.log(this.invaders)
  }

  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x
      this.velocity.y = 30
    }
  }
}

const player = new Player()
const projectiles = []
const grids = [new Grid()]

const keys = {
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
}

function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)

  player.update()

  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0){
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
      
    } else {
      projectile.update()
    }
  })

  grids.forEach(grid => {
    grid.update()
    grid.invaders.forEach((invader, i)=> {
      invader.update({velocity: grid.velocity})

      projectiles.forEach((projectile, j) => {
        if (projectile.position.y - projectile.radius <= invader.position.y + invader.height && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find(invader2 => {
              return invader2 === invader
            })

            const projectileFound = projectiles.find(projectile2 => projectile2 === projectile)

            if (invaderFound && projectileFound) {
              grid.invaders.splice(i,1)
            projectiles.splice(j, 1)
            }
          })
        }
      })
    })
  })

    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
      player.velocity.x = -5
      player.rotation = -0.15
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
      player.velocity.x = 5
      player.rotation = 0.15
    } else {
      player.velocity.x = 0
      player.rotation = 0
    }

}

animate()

addEventListener('keydown', ({key}) => {
  switch (key){
    case 'ArrowLeft': 
    //console.log('left')
    keys.ArrowLeft.pressed = true
    break
    case 'ArrowRight': 
    //console.log('right')
    keys.ArrowRight.pressed = true
    break
    case 'ArrowUp': 
    //console.log('shoot')
    projectiles.push(new Projectile({
      position: {
        x: player.position.x + player.width/2,
        y: player.position.y
      },
    velocity: {
      x: 0,
      y: -5
    }
    })
  )
    
    break
  }
})

addEventListener('keyup', ({key}) => {
  switch (key){
    case 'ArrowLeft': 
    console.log('left')
    keys.ArrowLeft.pressed = false
    break
    case 'ArrowRight': 
    console.log('right')
    keys.ArrowRight.pressed = false
    break
    case 'ArrowUp': 
    console.log('shoot')
    keys.ArrowUp.pressed = false
    break
  }
})
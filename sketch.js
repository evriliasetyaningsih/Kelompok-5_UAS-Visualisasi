var object = []
var kakbah
var numObject = 100
var speeds = [10, 12, 14, 16, 18]
var colors = ["red", "green", "blue", "violet", "orange"]

function setup() {
    createCanvas(windowWidth, windowHeight)
    rectMode(CENTER)
    kakbah = new createKakbah()

    for (var i = 0; i < numObject; i++) {
        var mass = random(5, 15)
        var radius = random(kakbah.height, min(windowWidth / 2, windowHeight / 2))
        var angle = random(0, TWO_PI)
        var objectPos = createVector(radius * cos(angle), radius * sin(angle))

        var type = Math.floor(random(0, 2))
        var id = Math.floor(random(0, 5))
        var randColor = colors[id]
        var objectVel = objectPos.copy()
        objectVel.rotate(-HALF_PI)
        objectVel.normalize()
        objectVel.mult(sqrt((speeds[id] * kakbah.mass) / (radius)))

        object.push(new createObject(id, type, mass, objectPos, objectVel, randColor))
    }
}

function draw() {
    background(180)
    translate(width / 2, height / 2)
    for (var i = numObject - 1; i >= 0; i--) {
        kakbah.attract(object[i])
        object[i].move()
        object[i].show()
    }
    kakbah.show()
}

function createKakbah() {
    this.mass = 50
    this.pos = createVector(0, 0)
    this.height = 100

    this.show = function () {
        stroke(0)
        fill(0)
        rect(this.pos.x, this.pos.y, this.height, this.height)
    }

    this.attract = function (child) {
        var r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y)
        var f = (this.pos.copy()).sub(child.pos)
        f.setMag((speeds[child.id] * this.mass * child.mass) / (r * r))
        child.applyForce(f)
    }
}

function createObject(_id, _type, _mass, _pos, _vel, _color) {
    this.id = _id
    this.type = _type
    this.mass = _mass
    this.pos = _pos
    this.vel = _vel
    this.d = this.mass * 2
    this.color = _color

    this.show = function () {
        stroke(0, 50)
        fill(this.color)
        noStroke()
        if (this.type == 1) {
            rect(this.pos.x, this.pos.y, this.d, this.d)
        } else {
            ellipse(this.pos.x, this.pos.y, this.d, this.d)
        }
    }

    this.move = function () {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }

    this.applyForce = function (f) {
        this.vel.x += f.x / this.mass
        this.vel.y += f.y / this.mass
    }
}
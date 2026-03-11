let scene, camera, renderer
let car
let speed = 0
let keys = {}
let score = 0
let nitro = 100

function startGame(){

document.getElementById("menu").style.display = "none"

scene = new THREE.Scene()
scene.background = new THREE.Color(0x87ceeb)

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(10,20,10)
scene.add(light)

const ambient = new THREE.AmbientLight(0x404040)
scene.add(ambient)

createGround()
createCity()
createCar()

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

animate()

}

function createGround(){

const geo = new THREE.PlaneGeometry(2000,2000)
const mat = new THREE.MeshStandardMaterial({color:0x444444})

const ground = new THREE.Mesh(geo,mat)
ground.rotation.x = -Math.PI/2

scene.add(ground)

}

function createCity(){

for(let i=0;i<80;i++){

let height = Math.random()*40 + 10

let geo = new THREE.BoxGeometry(10,height,10)
let mat = new THREE.MeshStandardMaterial({color:0x888888})

let building = new THREE.Mesh(geo,mat)

building.position.x = (Math.random()-0.5)*400
building.position.z = (Math.random()-0.5)*400
building.position.y = height/2

scene.add(building)

}

}

function createCar(){

const geo = new THREE.BoxGeometry(2,1,4)
const mat = new THREE.MeshStandardMaterial({color:0xff0000})

car = new THREE.Mesh(geo,mat)
car.position.set(0,0.5,0)

scene.add(car)

camera.position.set(0,6,10)
camera.lookAt(car.position)

}

function animate(){

requestAnimationFrame(animate)

if(!car) return

if(keys["ArrowUp"]) speed += 0.03
if(keys["ArrowDown"]) speed -= 0.02

speed *= 0.98

if(keys["ArrowLeft"]) car.rotation.y += 0.04
if(keys["ArrowRight"]) car.rotation.y -= 0.04

if(keys["Shift"] && nitro > 0){
speed += 0.05
nitro -= 0.5
}

car.position.x -= Math.sin(car.rotation.y) * speed
car.position.z -= Math.cos(car.rotation.y) * speed

camera.position.x = car.position.x
camera.position.z = car.position.z + 10
camera.lookAt(car.position)

if(Math.abs(speed) > 0.4 && (keys["ArrowLeft"] || keys["ArrowRight"])){

score += 2

let smokeGeo = new THREE.SphereGeometry(0.3,8,8)
let smokeMat = new THREE.MeshBasicMaterial({color:0xffffff})

let smoke = new THREE.Mesh(smokeGeo,smokeMat)

smoke.position.set(car.position.x,0.2,car.position.z)

scene.add(smoke)

setTimeout(()=>scene.remove(smoke),300)

}

document.getElementById("score").innerText = score
document.getElementById("nitro").innerText = Math.floor(nitro)

renderer.render(scene,camera)

}

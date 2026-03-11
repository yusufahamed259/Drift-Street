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
2000
)

renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const sun = new THREE.DirectionalLight(0xffffff,1)
sun.position.set(10,20,10)
scene.add(sun)

const ambient = new THREE.AmbientLight(0xffffff,0.4)
scene.add(ambient)

createGround()
createCity()
createCar()

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

animate()

}

function createGround(){

const groundGeo = new THREE.PlaneGeometry(1000,1000)
const groundMat = new THREE.MeshStandardMaterial({color:0x2f2f2f})

const ground = new THREE.Mesh(groundGeo,groundMat)
ground.rotation.x = -Math.PI/2
scene.add(ground)

const roadGeo = new THREE.PlaneGeometry(20,1000)
const roadMat = new THREE.MeshStandardMaterial({color:0x111111})

const road = new THREE.Mesh(roadGeo,roadMat)
road.rotation.x = -Math.PI/2
road.position.y = 0.01
scene.add(road)

for(let i=-500;i<500;i+=20){

let lineGeo = new THREE.PlaneGeometry(1,10)
let lineMat = new THREE.MeshStandardMaterial({color:0xffffff})

let line = new THREE.Mesh(lineGeo,lineMat)

line.rotation.x = -Math.PI/2
line.position.set(0,0.02,i)

scene.add(line)

}

}

function createCity(){

for(let i=0;i<120;i++){

let height = Math.random()*60 + 10

let geo = new THREE.BoxGeometry(10,height,10)
let mat = new THREE.MeshStandardMaterial({color:0x888888})

let building = new THREE.Mesh(geo,mat)

building.position.x = (Math.random()>0.5 ? 40 : -40) + (Math.random()*200)
building.position.z = (Math.random()-0.5)*800
building.position.y = height/2

scene.add(building)

}

}

function createCar(){

const geo = new THREE.BoxGeometry(2,1,4)
const mat = new THREE.MeshStandardMaterial({color:0xff0000})

car = new THREE.Mesh(geo,mat)
car.position.y = 0.5

scene.add(car)

camera.position.set(0,6,10)
camera.lookAt(car.position)

}

function animate(){

requestAnimationFrame(animate)

if(keys["ArrowUp"]) speed += 0.04
if(keys["ArrowDown"]) speed -= 0.03

speed *= 0.96

if(keys["ArrowLeft"]) car.rotation.y += 0.05
if(keys["ArrowRight"]) car.rotation.y -= 0.05

if(keys["Shift"] && nitro > 0){

speed += 0.07
nitro -= 0.5

}

car.position.x -= Math.sin(car.rotation.y)*speed
car.position.z -= Math.cos(car.rotation.y)*speed

camera.position.x = car.position.x + Math.sin(car.rotation.y)*10
camera.position.z = car.position.z + Math.cos(car.rotation.y)*10
camera.position.y = 6

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

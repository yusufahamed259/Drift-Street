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

renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(10,20,10)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambient)

createGround()
createCar()

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

animate()

}

function createGround(){

const geo = new THREE.PlaneGeometry(500,500)
const mat = new THREE.MeshStandardMaterial({color:0x555555})

const ground = new THREE.Mesh(geo,mat)
ground.rotation.x = -Math.PI/2

scene.add(ground)

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

if(keys["ArrowUp"]) speed += 0.03
if(keys["ArrowDown"]) speed -= 0.02

speed *= 0.98

if(keys["ArrowLeft"]) car.rotation.y += 0.04
if(keys["ArrowRight"]) car.rotation.y -= 0.04

car.position.x -= Math.sin(car.rotation.y)*speed
car.position.z -= Math.cos(car.rotation.y)*speed

camera.position.x = car.position.x
camera.position.z = car.position.z + 10
camera.lookAt(car.position)

renderer.render(scene,camera)

}

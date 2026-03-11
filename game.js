let scene,camera,renderer
let car,police
let speed=0
let keys={}
let score=0
let nitro=100

function startGame(){

document.getElementById("menu").style.display="none"

scene=new THREE.Scene()
scene.background=new THREE.Color(0x87ceeb)

camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

let sun=new THREE.DirectionalLight(0xffffff,1)
sun.position.set(10,20,10)
scene.add(sun)

let ambient=new THREE.AmbientLight(0x404040)
scene.add(ambient)

createRoad()
createCity()
loadCar()
createPolice()

camera.position.set(0,5,10)

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

animate()

}

function createRoad(){

let geo=new THREE.PlaneGeometry(1000,1000)
let mat=new THREE.MeshStandardMaterial({color:0x333333})

let road=new THREE.Mesh(geo,mat)
road.rotation.x=-Math.PI/2

scene.add(road)

}

function createCity(){

for(let i=0;i<120;i++){

let h=Math.random()*40+10

let geo=new THREE.BoxGeometry(10,h,10)
let mat=new THREE.MeshStandardMaterial({color:0x888888})

let building=new THREE.Mesh(geo,mat)

building.position.x=(Math.random()-0.5)*400
building.position.z=(Math.random()-0.5)*400
building.position.y=h/2

scene.add(building)

}

}

function loadCar(){

let loader=new THREE.GLTFLoader()

loader.load("ToyCar.glb",function(gltf){

car=gltf.scene
car.scale.set(0.8,0.8,0.8)
car.position.y=0.2

scene.add(car)

})

}

function createPolice(){

let geo=new THREE.BoxGeometry(2,1,4)
let mat=new THREE.MeshStandardMaterial({color:0x0000ff})

police=new THREE.Mesh(geo,mat)
police.position.set(20,0.5,20)

scene.add(police)

}

function animate(){

requestAnimationFrame(animate)

if(!car)return

if(keys["ArrowUp"])speed+=0.03
if(keys["ArrowDown"])speed-=0.02

speed*=0.98

if(keys["ArrowLeft"])car.rotation.y+=0.04
if(keys["ArrowRight"])car.rotation.y-=0.04

if(keys["Shift"]&&nitro>0){

speed+=0.05
nitro-=0.5

}

car.position.x-=Math.sin(car.rotation.y)*speed
car.position.z-=Math.cos(car.rotation.y)*speed

camera.position.x=car.position.x
camera.position.z=car.position.z+10
camera.lookAt(car.position)

police.lookAt(car.position)

police.position.x+=(car.position.x-police.position.x)*0.01
police.position.z+=(car.position.z-police.position.z)*0.01

if(Math.abs(speed)>0.5&&(keys["ArrowLeft"]||keys["ArrowRight"])){

score+=2

let smokeGeo=new THREE.SphereGeometry(0.3,8,8)
let smokeMat=new THREE.MeshBasicMaterial({color:0xffffff})

let smoke=new THREE.Mesh(smokeGeo,smokeMat)

smoke.position.set(car.position.x,0.1,car.position.z)

scene.add(smoke)

setTimeout(()=>scene.remove(smoke),300)

}

document.getElementById("score").innerText=score
document.getElementById("nitro").innerText=Math.floor(nitro)

renderer.render(scene,camera)

}

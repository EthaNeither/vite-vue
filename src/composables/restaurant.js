import * as THREE from 'three'
import NSTC from '../assets/font/NotoSansTC-Regular.otf?url'
import { Text } from 'troika-three-text'
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'

const raaglb = new URL('../assets/place/restaurant.glb', import.meta.url).href
const server = new URL('../assets/people/server(nodding).glb', import.meta.url).href

const restaurant = () => {
    const loader = new GLTFLoader();
    const floader = new FBXLoader(); //for 載入人物
    let camera, controls, scene, renderer;
    var clock = new THREE.Clock(); // 時間物件 for 更新第一人稱視角控制 
    var mixer, action //for 人物動畫


    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcccccc);
        scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(30, 30, 50);
        camera.rotation.y = Math.PI / 2

        // // controls

        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.listenToKeyEvents(window); // optional

        // //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        // controls.dampingFactor = 0.05;

        // controls.screenSpacePanning = false;

        // controls.minDistance = 100;
        // controls.maxDistance = 500;

        // controls.maxPolarAngle = Math.PI / 2;

        controls = new FirstPersonControls(camera, renderer.domElement); // 第一人稱視角(相機,繪製輸出的Canvas物件)
        controls.lookSpeed = 0.012; //環視速度(預設為0.005)
        controls.movementSpeed = 6; //移動速度(預設為1)
        controls.lookVertical = false; //垂直環視
        controls.constrainVertical = false; //垂直限制

        // lights

        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(1, 1, 1);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff);
        dirLight2.position.set(- 1, - 1, - 1);
        scene.add(dirLight2);

        // const ambientLight = new THREE.AmbientLight( 0x222222 );
        // scene.add( ambientLight );



        const axesHelper = new THREE.AxesHelper(100);
        scene.add(axesHelper);

        window.addEventListener('resize', onWindowResize);

        //add walls

    }

    const myText = new Text()
    function textInteraction() {
        myText.font = NSTC
        myText.text = '我想下班'
        myText.fontSize = 2
        myText.rotation.y = Math.PI / 2
        myText.position.set(-60, 42, 32)
        myText.color = 0x9966FF
        scene.add(myText)
    }
    async function collideraction() {
        await RAPIER.init();
        let world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

        //加入地板
        const planeGeometry = new THREE.PlaneGeometry(600, 600, 600)
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI // 使平面與 y 軸垂直，並讓正面朝上
        plane.position.set(0, 10, 0)
        scene.add(plane)

        const floorBodyDesc = RAPIER.RigidBodyDesc.fixed()
        const floorBody = world.createRigidBody(floorBodyDesc);
        const floorcolliderDesc = RAPIER.ColliderDesc.cuboid(600, 600, 600).setTranslation(0, 8, 0);
        world.createCollider(floorcolliderDesc, floorBody.handle);

        const geometry = new THREE.BoxGeometry(40, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const wall = new THREE.Mesh(geometry, material)
        wall.position.set(0, 30, 0);
        scene.add(wall)

        const wallBodyDesc = RAPIER.RigidBodyDesc.fixed()
        const wallBody = world.createRigidBody(wallBodyDesc);
        const wallcolliderDesc = RAPIER.ColliderDesc.cuboid(40, 10, 10).setTranslation(0, 30, 0);
        world.createCollider(wallcolliderDesc, wallBody.handle);

        const characterDesc = RAPIER.RigidBodyDesc.dynamic().setLinvel(1.0, 3.0, 4.0)
        const character = world.createRigidBody(characterDesc).setNextKinematicTranslation(30, 30, 50);
        const charactercolliderDesc = RAPIER.ColliderDesc.cuboid(10, 10, 10);
        const collider = world.createCollider(charactercolliderDesc)

        let offset = 0.01;
        let characterController = world.createCharacterController(offset)
        characterController.computeColliderMovement(
            collider,           // The collider we would like to move.
            desiredTranslation, // The movement we would like to apply if there wasn’t any obstacle.
        );
        // Read the result.
        let correctedMovement = characterController.computedMovement();

    }


    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function loadmodles() {
        loader.load(raaglb, (gltf) => {
            gltf.scene.scale.set(5, 5, 5);//設定大小
            gltf.scene.position.set(0, 7, 25);//設定位置
            scene.add(gltf.scene)
        })
        loader.load(server, (obj) => {
            const model = obj.scene
            model.scale.set(0.15, 0.15, 0.15)
            model.position.set(-60, 10, 27)
            model.rotation.y = Math.PI / 2
            scene.add(model)
            mixer = new THREE.AnimationMixer(model)
            const clips = obj.animations
            // const clip = THREE.AnimationClip.findByName(clips, 'nodding')
            // action = mixer.clipAction(clip)
            // action.play()
            clips.forEach((clip) => {
                action = mixer.clipAction(clip)
                action.play()
            })
        })

    }
    function animate() {

        requestAnimationFrame(animate);

        //controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        controls.update(clock.getDelta());

        if (mixer) mixer.update(clock.getDelta() * 30) //for 人物動畫
        render();

    }
    function render() {

        renderer.render(scene, camera);

    }
    return { init, textInteraction, collideraction, loadmodles, animate }
}
export default restaurant
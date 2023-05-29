import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'

const mrtglb = new URL('../assets/place/MRT.glb', import.meta.url).href
const staff = new URL('../assets/people/staff(nodding).glb', import.meta.url).href

const MRT = () => {
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
        camera.position.set(70, 27, 30);
        camera.rotation.y = Math.PI / 2

        // controls

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
        controls.movementSpeed = 10; //移動速度(預設為1)
        controls.lookVertical = false; //垂直環視
        controls.constrainVertical = false; //垂直限制

        // lights

        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(1, 1, 1);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff);
        dirLight2.position.set(- 1, - 1, - 1);
        scene.add(dirLight2);

        const ambientLight = new THREE.AmbientLight( 0x222222 );
        scene.add( ambientLight );

        //加入地板
        const planeGeometry = new THREE.PlaneGeometry(60, 60)
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI // 使平面與 y 軸垂直，並讓正面朝上
        plane.position.set(0, 0, 0)
        scene.add(plane)

        const axesHelper = new THREE.AxesHelper(100);
        scene.add(axesHelper);

        window.addEventListener('resize', onWindowResize);

    }
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function loadmodles() {
        loader.load(mrtglb, (gltf) => {
            gltf.scene.scale.set(25, 25, 25);//設定大小
            gltf.scene.position.set(-40, -25, -80);//設定位置
            scene.add(gltf.scene)
        })
        loader.load(staff, (obj) => { 
            const model = obj.scene       
            model.scale.set(0.15, 0.15, 0.15)
            model.position.set(-20, 5, 16)
            model.rotation.y = Math.PI / 2
            scene.add(model)
            mixer = new THREE.AnimationMixer(model)
            const clips = obj.animations
            // const clip = THREE.AnimationClip.findByName(clips, 'nodding')
            // action = mixer.clipAction(clip)
            // action.play()
            clips.forEach((clip)=>{
                action = mixer.clipAction(clip)
                action.play()
            })
        })
        // floader.load(staff, (obj) => {
        //     mixer = new THREE.AnimationMixer(obj)
        //     //action = obj.mixer.clipAction(obj.animations[0])
        //     //action.play()
        //     obj.scale.set(0.008, 0.008, 0.008)
        //     obj.position.set(3, 4.8, -1)
        //     obj.rotation.y = Math.PI / 2
        //     scene.add(obj)

        // })
    }
    function animate() {

        requestAnimationFrame(animate);

        //controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        controls.update(clock.getDelta());

        if (mixer) mixer.update(clock.getDelta()*30) //for 人物動畫

        render();

    }
    function render() {

        renderer.render(scene, camera);

    }
    return { init, loadmodles, animate }
}
export default MRT
import * as THREE from 'three'
import crglb from '../assets/place/classroom.glb?url'
import teacher from '../assets/people/teacher.fbx?url'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'

const classroom = () => {
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
        camera.position.set(2, 1, 0);

        // controls

        controls = new OrbitControls(camera, renderer.domElement);
        controls.listenToKeyEvents(window); // optional

        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 500;

        controls.maxPolarAngle = Math.PI / 2;

        // controls = new FirstPersonControls(camera, renderer.domElement); // 第一人稱視角(相機,繪製輸出的Canvas物件)
        // controls.lookSpeed = 0.009; //環視速度(預設為0.005)
        // controls.movementSpeed = 10; //移動速度(預設為1)
        // controls.lookVertical = false; //垂直環視
        // controls.constrainVertical = false; //垂直限制

        // lights

        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(100, 100, 100);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff);
        dirLight2.position.set(- 100, - 100, - 100);
        scene.add(dirLight2);

        // const dirLight3 = new THREE.DirectionalLight(0xffffff);
        // dirLight3.position.set(100, 100, - 100);
        // scene.add(dirLight3);

        // const dirLight4 = new THREE.DirectionalLight(0xffffff);
        // dirLight4.position.set(100, -100, 100);
        // scene.add(dirLight4);

        // const dirLight5 = new THREE.DirectionalLight(0xffffff);
        // dirLight5.position.set(-100, 100, 100);
        // scene.add(dirLight5);

        // const dirLight6 = new THREE.DirectionalLight(0xffffff);
        // dirLight6.position.set(100, -100, -100);
        // scene.add(dirLight6);

        // const dirLight7 = new THREE.DirectionalLight(0xffffff);
        // dirLight7.position.set(-100, 100, - 100);
        // scene.add(dirLight7);

        // const dirLight8 = new THREE.DirectionalLight(0xffffff);
        // dirLight8.position.set(-100, -100, 100);
        // scene.add(dirLight8);

        // const ambientLight = new THREE.AmbientLight(0xffffff);
        // scene.add(ambientLight);

        // const hemispherelight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        // scene.add(hemispherelight);

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
        loader.load(crglb, (gltf) => {
            gltf.scene.scale.set(2, 2, 2);//設定大小
            gltf.scene.position.set(0, 0, 0);//設定位置
            scene.add(gltf.scene)
        })

        floader.load(teacher, (obj) => {
            mixer = new THREE.AnimationMixer(obj)
            //action = obj.mixer.clipAction(obj.animations[0])
            //action.play()
            obj.scale.set(0.02, 0.02, 0.02)
            obj.position.set(-17, 13, 8)
            obj.rotation.y = Math.PI / 2
            scene.add(obj)

        })
    }
    function animate() {

        requestAnimationFrame(animate);

        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        // controls.update(clock.getDelta()); //for 第一人稱視角控制 

        if (mixer) mixer.update(clock.getDelta()) //for 人物動畫

        render();

    }
    function render() {

        renderer.render(scene, camera);

    }
    return { init, loadmodles, animate }
}
export default classroom
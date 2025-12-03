import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5);

// Renderer
const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 20;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight1.position.set(5, 5, 5);
directionalLight1.castShadow = true;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight2.position.set(-5, -5, -5);
scene.add(directionalLight2);

// Materials
const materials = {
    default: new THREE.MeshStandardMaterial({
        color: 0x667eea,
        metalness: 0.7,
        roughness: 0.3,
    }),
    sphere: new THREE.MeshStandardMaterial({
        color: 0x764ba2,
        metalness: 0.8,
        roughness: 0.2,
    }),
    torus: new THREE.MeshStandardMaterial({
        color: 0xf093fb,
        metalness: 0.6,
        roughness: 0.4,
    }),
    teapot: new THREE.MeshStandardMaterial({
        color: 0x4facfe,
        metalness: 0.5,
        roughness: 0.5,
    }),
};

// Current object
let currentObject = null;
let isLoading = false;

// GLTF Loader
const loader = new GLTFLoader();

// Create geometries
function createCube() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, materials.default);
    cube.castShadow = true;
    cube.receiveShadow = true;
    return cube;
}

function createSphere() {
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphere = new THREE.Mesh(geometry, materials.sphere);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    return sphere;
}

function createTorus() {
    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const torus = new THREE.Mesh(geometry, materials.torus);
    torus.castShadow = true;
    torus.receiveShadow = true;
    return torus;
}

function createTeapot() {
    const geometry = new TeapotGeometry(1.2, 10);
    const teapot = new THREE.Mesh(geometry, materials.teapot);
    teapot.castShadow = true;
    teapot.receiveShadow = true;
    return teapot;
}

function loadGLBModel(path) {
    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                
                // Enable shadows for all meshes
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                
                // Calculate bounding box and center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                // Scale model to fit nicely in view
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                model.scale.multiplyScalar(scale);
                
                // Center the model
                model.position.sub(center.multiplyScalar(scale));
                
                resolve(model);
            },
            (progress) => {
                // Loading progress (optional)
                const percent = (progress.loaded / progress.total) * 100;
                console.log(`Loading: ${percent.toFixed(2)}%`);
            },
            (error) => {
                console.error('Error loading GLB model:', error);
                let errorMessage = 'Errore nel caricamento del file.';
                if (error.message) {
                    errorMessage = error.message;
                } else if (error.target && error.target.status) {
                    errorMessage = `Errore HTTP ${error.target.status}: ${error.target.statusText || 'File non trovato'}`;
                }
                reject(new Error(errorMessage));
            }
        );
    });
}

function showError(message) {
    const errorMsg = document.getElementById('error-message');
    const errorDetails = errorMsg?.querySelector('.error-details');
    if (errorMsg) {
        errorMsg.style.display = 'block';
        if (errorDetails) {
            errorDetails.textContent = message;
        }
        // Hide after 10 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 10000);
    }
}

function hideError() {
    const errorMsg = document.getElementById('error-message');
    if (errorMsg) {
        errorMsg.style.display = 'none';
    }
}

async function createMercedesBus() {
    if (isLoading) return null;
    isLoading = true;
    
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
    hideError();
    
    try {
        const model = await loadGLBModel('mercedes-bus.glb');
        model.userData.isGLB = true; // Mark as GLB model to disable auto-rotation
        isLoading = false;
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        hideError();
        return model;
    } catch (error) {
        isLoading = false;
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        console.error('Failed to load Mercedes Bus:', error);
        
        // Show detailed error message
        let errorText = 'Impossibile caricare il modello GLB.';
        if (error.message) {
            errorText += ' ' + error.message;
        }
        if (window.location.protocol === 'file:') {
            errorText += ' (File aperto da file:// - problema CORS)';
        }
        showError(errorText);
        
        // Return a placeholder cube if loading fails
        const placeholder = createCube();
        placeholder.material.color.setHex(0xff0000);
        return placeholder;
    }
}

// Ground plane
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a3e,
    roughness: 0.8,
    metalness: 0.2,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;
ground.receiveShadow = true;
scene.add(ground);

// Add initial object
currentObject = createCube();
scene.add(currentObject);

// Button handlers
function switchObject(createFunction, buttonId) {
    if (currentObject) {
        scene.remove(currentObject);
    }
    
    // Update active button
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(buttonId).classList.add('active');
    
    // Handle async loading for GLB models
    const result = createFunction();
    if (result instanceof Promise) {
        result.then((model) => {
            if (model) {
                currentObject = model;
                scene.add(currentObject);
                // Adjust camera for larger models
                camera.position.set(0, 2, 8);
                controls.target.set(0, 0, 0);
                controls.update();
            }
        });
    } else {
        currentObject = result;
        scene.add(currentObject);
    }
}

document.getElementById('cubeBtn').addEventListener('click', () => {
    switchObject(createCube, 'cubeBtn');
});

document.getElementById('sphereBtn').addEventListener('click', () => {
    switchObject(createSphere, 'sphereBtn');
});

document.getElementById('torusBtn').addEventListener('click', () => {
    switchObject(createTorus, 'torusBtn');
});

document.getElementById('teapotBtn').addEventListener('click', () => {
    switchObject(createTeapot, 'teapotBtn');
});

document.getElementById('busBtn').addEventListener('click', () => {
    switchObject(createMercedesBus, 'busBtn');
});

document.getElementById('resetBtn').addEventListener('click', () => {
    camera.position.set(0, 0, 5);
    controls.target.set(0, 0, 0);
    controls.reset();
});

// Animation loop
let autoRotate = true;
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate object slowly (only if not a GLB model or if auto-rotate is enabled)
    if (currentObject && autoRotate && !currentObject.userData.isGLB) {
        currentObject.rotation.y += 0.005;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
});

resizeObserver.observe(container);

// Start animation
animate();

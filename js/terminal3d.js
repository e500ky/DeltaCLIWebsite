class Terminal3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('terminal3d'),
            antialias: true,
            alpha: true
        });
        
        this.init();
        this.createTerminal();
        this.createText();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.position.z = 4;
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        const lights = [
            { color: 0x6C63FF, position: [3, 3, 3] },
            { color: 0x4CAF50, position: [-3, -3, 3] },
            { color: 0xFF6584, position: [0, 3, -3] }
        ];
        
        lights.forEach(light => {
            const pointLight = new THREE.PointLight(light.color, 1);
            pointLight.position.set(...light.position);
            this.scene.add(pointLight);
        });
    }

    createTerminal() {
        const screenGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
        const screenMaterial = new THREE.MeshPhongMaterial({
            color: 0x1E1E1E,
            specular: 0x666666,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        
        this.terminal = new THREE.Mesh(screenGeometry, screenMaterial);
        this.scene.add(this.terminal);

        const frameGeometry = new THREE.BoxGeometry(4.2, 2.7, 0.15);
        const frameMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            specular: 0x999999,
            shininess: 50
        });
        
        this.frame = new THREE.Mesh(frameGeometry, frameMaterial);
        this.frame.position.z = -0.05;
        this.scene.add(this.frame);
        
        const dotGeometry = new THREE.SphereGeometry(0.04, 32, 32);
        const colors = [0xFF5F56, 0xFFBD2E, 0x27C93F];
        const dots = [];
        
        colors.forEach((color, i) => {
            const dotMaterial = new THREE.MeshPhongMaterial({ color });
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            dot.position.set(-1.8 + (i * 0.15), 1.1, 0.1);
            dots.push(dot);
            this.scene.add(dot);
        });
        
        const glowGeometry = new THREE.BoxGeometry(4.4, 2.9, 0.2);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x6C63FF,
            transparent: true,
            opacity: 0.1
        });
        
        this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.glow.position.z = -0.1;
        this.scene.add(this.glow);
        
        const reflectionGeometry = new THREE.PlaneGeometry(4, 2.5);
        const reflectionMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            shininess: 100
        });
        
        this.reflection = new THREE.Mesh(reflectionGeometry, reflectionMaterial);
        this.reflection.position.z = 0.05;
        this.scene.add(this.reflection);
    }

    createText() {
        const loader = new THREE.TextureLoader();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 1024;
        canvas.height = 512;
        
        ctx.fillStyle = '#1E1E1E';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '32px "JetBrains Mono"';
        ctx.fillStyle = '#4CAF50';
        ctx.fillText('$ delta', 20, 40);
        
        ctx.fillStyle = '#6C63FF';
        ctx.fillText('system -cpu', 120, 40);
        
        ctx.fillStyle = '#A0A0A0';
        ctx.font = '28px "JetBrains Mono"';
        const lines = [
            'CPU Usage:',
            'Core 0: 25%',
            'Core 1: 30%',
            'Core 2: 15%',
            'Core 3: 45%'
        ];
        
        lines.forEach((line, i) => {
            ctx.fillText(line, 40, 100 + (i * 40));
        });
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        
        const textGeometry = new THREE.PlaneGeometry(3.8, 2.3);
        const textMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9
        });
        
        this.text = new THREE.Mesh(textGeometry, textMaterial);
        this.text.position.z = 0.06;
        this.scene.add(this.text);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.001;
        
        this.terminal.position.y = Math.sin(time) * 0.1;
        this.frame.position.y = this.terminal.position.y;
        this.text.position.y = this.terminal.position.y;
        
        this.terminal.rotation.y = Math.sin(time * 0.5) * 0.1;
        this.frame.rotation.y = this.terminal.rotation.y;
        this.text.rotation.y = this.terminal.rotation.y;

        this.glow.material.opacity = 0.1 + Math.sin(time) * 0.05;
        
        this.reflection.rotation.x = Math.sin(time * 0.5) * 0.1;
        this.reflection.position.y = this.terminal.position.y;

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

document.fonts.ready.then(() => {
    new Terminal3D();
});

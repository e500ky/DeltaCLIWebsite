document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        const loader = document.querySelector('.loader');
        if (loader) {
            gsap.to(loader, {
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
        
        const featureCards = document.querySelectorAll('.feature-card');
        if (featureCards.length > 0 && typeof gsap !== 'undefined') {
            featureCards.forEach((card, index) => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                
                setTimeout(() => {
                    card.classList.add('card-visible');
                }, index * 200);
            });
        }
        
        document.querySelectorAll('.download-card').forEach(card => {
            card.addEventListener('mouseover', () => {
                gsap.to(card, {
                    scale: 1.0125,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseout', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    const commands = [
        "system -cpu",
        "scan -network",
        "dev -git status",
        "help"
    ];

    let currentCommand = 0;
    const activeCommand = document.querySelector('.command-line.active .command');
    
    if (activeCommand) {
        const type = (text, index = 0) => {
            if (index < text.length) {
                activeCommand.textContent = text.substring(0, index + 1);
                setTimeout(() => type(text, index + 1), 100);
            } else {
                setTimeout(() => {
                    activeCommand.textContent = "";
                    currentCommand = (currentCommand + 1) % commands.length;
                    type(commands[currentCommand]);
                }, 2000);
            }
        };
        
        type(commands[0]);
    }
    
    if (typeof gsap !== 'undefined') {
        const blobs = document.querySelectorAll('.blob:not(.blob-small)');
        blobs.forEach(blob => {
            gsap.to(blob, {
                x: '+=30',
                y: '+=20',
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
        });
        
        const smallBlobs = document.querySelectorAll('.blob-small');
        smallBlobs.forEach(blob => {
            const xMove = (Math.random() * 50) + 30;
            const yMove = (Math.random() * 50) + 20;
            const duration = Math.random() * 5 + 5;
            
            gsap.to(blob, {
                x: `+=${xMove}`,
                y: `+=${yMove}`,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
            
            gsap.to(blob, {
                scale: 1.2,
                opacity: '+=0.05',
                duration: duration * 1.5,
                repeat: -1, 
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
        });
        
        const lineParticles = 15;
        const lines = document.querySelectorAll('.line-path');
        
        lines.forEach(line => {
            for (let i = 0; i < lineParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'line-particle';
                particle.style.position = 'absolute';
                particle.style.width = '5px';
                particle.style.height = '5px';
                particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                particle.style.borderRadius = '50%';
                particle.style.left = '-2px';
                
                line.appendChild(particle);
                
                gsap.set(particle, {
                    y: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.5 + 0.2,
                    scale: Math.random() * 0.5 + 0.5
                });
                
                gsap.to(particle, {
                    y: '+=100%',
                    duration: Math.random() * 20 + 10,
                    repeat: -1,
                    ease: 'none'
                });
                
                gsap.to(particle, {
                    opacity: 0.1,
                    scale: 0.3,
                    duration: Math.random() * 5 + 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });
    }
    
    if (typeof gsap !== 'undefined') {
        const sketchyLines = document.querySelectorAll('.sketchy-line');
        
        sketchyLines.forEach((line, index) => {
            const delay = index * 0.5;
            const duration = 10 + index * 3;
            
            gsap.to(line, {
                attr: { 
                    d: () => {
                        const originalPath = line.getAttribute('d');
                        return distortPath(originalPath, 20);
                    }
                },
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay
            });
            
            gsap.to(line, {
                opacity: 0.2 + (index * 0.1),
                duration: duration / 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay + 1
            });
            
            gsap.to(line, {
                strokeDashoffset: 1000,
                duration: duration * 2,
                repeat: -1,
                ease: "none",
                delay: delay
            });
        });
    }
    
    function distortPath(pathString, amount) {
        const parts = pathString.match(/[A-Z][^A-Z]*/g);
        if (!parts) return pathString;
        
        return parts.map(part => {
            const command = part.charAt(0);
            const coords = part.substr(1).trim().split(/[\s,]+/).map(Number);
            
            const distortedCoords = coords.map(coord => {
                const distortion = (Math.random() - 0.5) * amount;
                return Math.round(coord + distortion);
            });
            
            return command + distortedCoords.join(' ');
        }).join(' ');
    }
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });
                
                button.classList.add('active');
                
                const tabId = button.getAttribute('data-tab');
                const activeTab = document.getElementById(`${tabId}-tab`);
                
                if (activeTab) {
                    activeTab.style.display = 'block';
                    activeTab.classList.add('active');
                    
                    if (typeof gsap !== 'undefined') {
                        const commandDemos = activeTab.querySelectorAll('.command-demo');
                        commandDemos.forEach((demo, index) => {
                            gsap.fromTo(demo, 
                                {opacity: 0, y: 20}, 
                                {opacity: 1, y: 0, duration: 0.3, delay: index * 0.1}
                            );
                        });
                    }
                }
            });
        });
        
        const firstTab = document.querySelector('.tab-content.active');
        if (firstTab && typeof gsap !== 'undefined') {
            const commandDemos = firstTab.querySelectorAll('.command-demo');
            commandDemos.forEach((demo, index) => {
                gsap.fromTo(demo, 
                    {opacity: 0, y: 20}, 
                    {opacity: 1, y: 0, duration: 0.3, delay: index * 0.1 + 0.5}
                );
            });
        }
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const codeSnippets = [
        'def hello_world():\n    print("Hello, World!")',
        'async function fetchData() {\n    const response = await fetch(url);\n}',
        'SELECT * FROM users WHERE age > 18;',
        'class UserController {\n    private $db;\n}',
        '<div class="container">\n    <h1>Hello</h1>\n</div>',
        'const calculateSum = (a, b) => a + b;',
        'npm install delta-cli',
        'docker-compose up -d',
        'from delta import DeltaPlugin',
        'System.out.println("Hello Java");',
        '@media screen and (max-width: 768px) {\n    .container { width: 100%; }\n}',
        'def process_data(data: List[str]) -> Dict:',
        'kubectl apply -f deployment.yaml',
        'const router = express.Router();',
        'try {\n    await db.connect();\n} catch (err) { console.error(err); }',
        'import { useState, useEffect } from "react";',
        'go func() {\n    processData()\n}()',
        'CREATE TABLE users (\n    id INT PRIMARY KEY\n);',
        'const sum = numbers.reduce((a, b) => a + b);',
        'class MyComponent extends React.Component {\n    render() { return <div />; }\n}',
        'pip install -r requirements.txt',
        'spring.datasource.url=jdbc:postgresql://db',
        'grep -r "pattern" /path',
        'const obs = from([1,2,3]);',
        'scanf("%d", &number);',
        'typedef struct Point {\n    int x, y;\n};',
        '@Decorator\ndef wrapper(func):',
        'const worker = new Worker("w.js");',
        'using System.Linq;',
        'COUNT(*) OVER (PARTITION BY dept)',
        'git checkout -b feature',
        'docker run nginx',
        'async function* gen() {\n    yield 1;\n}',
        'mvn clean install',
        'namespace App\\Controllers;',
        'ALTER TABLE users ADD email TEXT;',
        'const styles = {\n    container: { flex: 1 }\n};',
        'const PORT = 3000;',
        'function* fib() {\n    yield 1;\n}',
        'redis-cli ping',
        '@Repository\ninterface UserRepo {}',
        'self.addEventListener("message", e => {});',
        'def sort(arr):\n    return sorted(arr)\n',
        'SELECT JSON_OBJECT("k", v);',
        'const debounce = (fn, ms) => {\n    let timer;\n};',
        'kubectl get pods',
        'type User = {\n    id: number;\n};',
        'composer install',
        'git rebase master',
        'mongo localhost',
        'cypress run',
        'const cache = new Map();',
        '@tailwind base;',
        'terraform init',
        'def search(arr, x):\n    return arr.index(x)\n',
        '@Injectable()',
        'systemctl start nginx',
        'createStore(reducer);',
        'test("it works", () => {});',
        'php artisan serve',
        ':root { --dark: #000; }',
        'JOIN users ON id = user_id;',
        'for await (const x of xs) {}',
        'docker build .',
        'export default App;',
        '@SpringBootApplication',
        'import numpy as np',
        'git push origin',
        'const schema = z.object({});',
        'kubectl logs pod',
        'void main() {\n    printf("Hello");\n}',
        '@Entity',
        'sum(...nums);',
        'ssh-keygen',
        'FORMAT_DATE("%Y-%m-%d");',
        '@Component',
        'React.createElement("div");',
        'apt update',
        'console.log(data);',
        'helm install',
        'pipe(f, g);',
        'while (true) {\n    yield item;\n}',
        '@Config',
        'find . -name "*.js"',
        'curry(fn);',
        '@Aspect',
        'cat file.txt',
        'fib(n);',
        'FROM node',
        'new Proxy({}, {});',
        '@Schedule',
        'aws s3 ls',
        'merge(a, b);',
        '@Cache',
        'def wrap():\n    return fn',
        'throttle(fn);',
        '@Cross',
        'brew install',
        'ORDER BY id;',
        '@Enable',
        'alias k=kubectl',
        '@Bean',
        'read line',
        'curl api.com',
        '@Wire',
        'singleton()',
        '@Rest',
        'git pull',
        '@Retry',
        'map(fn);',
        '@Test',
        'sed -i',
        '@Swagger',
        'sleep(1000);',
        '@Async\npublic Future<Void> processAsync()',
        '@EnableWebSecurity',
        'def generate_key():\n    return secrets.token_urlsafe(32)',
        '@Validated\npublic class RequestDTO',
        'psql -U postgres -d mydb',
        '@Scheduled(fixedRate = 1000)',
        'function* range(start, end) {\n    for (let i = start; i <= end; i++) yield i;\n}',
        '@EventListener(ApplicationReadyEvent.class)',
        'chown -R user:group /path',
        '@ConditionalOnMissingBean',
        'def map_reduce(func, sequence):\n    return reduce(func, map(func, sequence))',
        'npm run build && npm start',
        '@ConfigurationProperties("app")',
        'SELECT * FROM generate_series(1, 10);',
        '@Profile("dev")',
        'pg_dump -U postgres database > backup.sql',
        '@Qualifier("primary")',
        'def memoize(f):\n    cache = {}\n    def memoized(*args):\n        if args not in cache:\n            cache[args] = f(*args)\n        return cache[args]\n    return memoized',
        '@Scheduled(cron = "0 0 12 * * ?")',
        'git log --pretty=format:"%h - %an, %ar : %s"',
        '@ConditionalOnBean(name = "dataSource")',
        '@JsonSerialize(using = CustomSerializer.class)',
        'docker exec -it container_name bash',
        '@ConfigurationPropertiesScan',
        'const zip = (...arrays) => arrays[0].map((_, i) => arrays.map(array => array[i]));',
        '@EnableScheduling',
        'tar -czf archive.tar.gz directory/',
        '@Component("beanName")',
        '@Value("${property.name}")',
        'ssh-copy-id user@host',
        '@TestConfiguration',
        'const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);',
        '@EnableAsync',
        'find / -type f -name "*.txt"',
        '@ConditionalOnProperty(name = "feature.flag", havingValue = "true")',
        '@Transactional(propagation = Propagation.REQUIRES_NEW)',
        'chmod +x script.sh',
        '@EnableTransactionManagement',
        'SELECT * FROM pg_stat_activity;',
        '@PathVariable("id") Long id',
        'nohup python script.py &',
        '@ConditionalOnClass(DataSource.class)',
        '@SuppressWarnings("unchecked")',
        'netstat -tulpn | grep LISTEN',
        '@EnableJpaRepositories',
        'SELECT pg_size_pretty(pg_database_size(\'dbname\'));',
        '@Scope("prototype")',
        'journalctl -u service-name',
        '@Order(Ordered.HIGHEST_PRECEDENCE)',
        'const Observable = require(\'rxjs\').Observable;'
    ]

    function createCodeElement() {
        const code = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const element = document.createElement('div');
        element.className = 'code-snippet';
        element.textContent = code;
        
        const gridColumn = Math.floor(Math.random() * 9) + 1;
        const gridRow = Math.floor(Math.random() * 16) + 1;
        
        element.dataset.gridColumn = gridColumn;
        element.dataset.gridRow = gridRow;
        
        element.style.gridColumn = gridColumn;
        element.style.gridRow = gridRow;
        
        return element;
    }

    function initializeCodeSnippets() {
        const container = document.createElement('div');
        container.className = 'hidden-code-background';
        document.body.appendChild(container);

        const gridPositions = new Set();
        
        for (let i = 0; i < 40; i++) {
            let element = createCodeElement();
            let attempts = 0;
            const maxAttempts = 50;

            while (attempts < maxAttempts) {
                const position = `${element.dataset.gridColumn},${element.dataset.gridRow}`;
                if (!gridPositions.has(position)) {
                    gridPositions.add(position);
                    container.appendChild(element);
                    break;
                }
                
                element = createCodeElement();
                attempts++;
            }
        }

        return container;
    }

    const backgroundContainer = initializeCodeSnippets();

    setInterval(() => {
        const snippets = backgroundContainer.querySelectorAll('.code-snippet');
        const randomIndex = Math.floor(Math.random() * snippets.length);
        const oldElement = snippets[randomIndex];
        
        const oldPosition = `${oldElement.dataset.gridColumn},${oldElement.dataset.gridRow}`;
        gridPositions.delete(oldPosition);
        
        let newElement = createCodeElement();
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
            const position = `${newElement.dataset.gridColumn},${newElement.dataset.gridRow}`;
            if (!gridPositions.has(position)) {
                gridPositions.add(position);
                oldElement.replaceWith(newElement);
                break;
            }
            newElement = createCodeElement();
            attempts++;
        }
    }, 10000);

    let mouseX = 0;
    let mouseY = 0;
    const radius = 400;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        document.querySelectorAll('.code-snippet').forEach(snippet => {
            const rect = snippet.getBoundingClientRect();
            const snippetX = rect.left + rect.width / 2;
            const snippetY = rect.top + rect.height / 2;
            
            const distance = Math.hypot(mouseX - snippetX, mouseY - snippetY);
            
            if (distance < radius) {
                snippet.classList.add('active');
                if (distance < radius / 2) {
                    snippet.classList.add('highlight');
                } else {
                    snippet.classList.remove('highlight');
                }
            } else {
                snippet.classList.remove('active', 'highlight');
            }
        });
    });

    function createCodeBlocks() {
        const container = document.createElement('div');
        container.className = 'hidden-code-background';
    
        const leftBlock = document.createElement('div');
        leftBlock.className = 'code-block-left';
        
        const rightBlock = document.createElement('div');
        rightBlock.className = 'code-block-right';
    
        const leftLines = leftCodeBlock.split('\n');
        const rightLines = rightCodeBlock.split('\n');
        
        const totalLines = 25;
        
        for (let i = 0; i < totalLines; i++) {
            const leftDiv = document.createElement('div');
            leftDiv.className = 'code-line';
            leftDiv.textContent = leftLines[i % leftLines.length];
            leftBlock.appendChild(leftDiv);
    
            const rightDiv = document.createElement('div');
            rightDiv.className = 'code-line';
            rightDiv.textContent = rightLines[i % rightLines.length];
            rightBlock.appendChild(rightDiv);
        }
    
        container.appendChild(leftBlock);
        container.appendChild(rightBlock);
        document.body.appendChild(container);
    }
    
    function initializeCodeHighlight() {
        let mouseX = 0;
        let mouseY = 0;
        const radius = 200; 
    
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            requestAnimationFrame(() => {
                document.querySelectorAll('.code-line').forEach(line => {
                    const rect = line.getBoundingClientRect();
                    const lineY = rect.top + rect.height / 2;
                    const lineX = rect.left + rect.width / 2;
                    
                    const distance = Math.hypot(mouseX - lineX, mouseY - lineY);
                    
                    if (distance < radius) {
                        line.classList.add('active');
                        if (distance < radius / 2) {
                            line.classList.add('highlight');
                        } else {
                            line.classList.remove('highlight');
                        }
                    } else {
                        line.classList.remove('active', 'highlight');
                    }
                });
            });
        });
    }
});

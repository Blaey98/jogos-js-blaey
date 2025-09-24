// M3D - Minimal 3D Library
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        return this;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    length() {
        return Math.hypot(this.x, this.y, this.z);
    }

    normalize() {
        const length = this.length() || 1;
        return this.multiplyScalar(1 / length);
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
}

class Matrix4 {
    constructor() {
        this.m = new Float32Array(16);
        this.identity();
    }

    identity() {
        const m = this.m;
        // Set diagonal to 1, everything else to 0
        m[0] = m[5] = m[10] = m[15] = 1;
        m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0;
        return this;
    }

    multiply(transform) {
        const a = this.m;
        const b = transform.m;
        const result = new Float32Array(16);

        for (let i = 0; i < 4; i++) {
            const x = a[i];
            const y = a[i + 4];
            const z = a[i + 8];
            const w = a[i + 12];

            result[i] = x * b[0] + y * b[1] + z * b[2] + w * b[3];
            result[i + 4] = x * b[4] + y * b[5] + z * b[6] + w * b[7];
            result[i + 8] = x * b[8] + y * b[9] + z * b[10] + w * b[11];
            result[i + 12] = x * b[12] + y * b[13] + z * b[14] + w * b[15];
        }

        this.m = result;
        return this;
    }

    static multiply(matrixA, matrixB) {
        const result = new Matrix4();
        result.m.set(matrixA.m);
        return result.multiply(matrixB);
    }

    translate(x, y, z) {
        const translation = new Matrix4();
        translation.m[12] = x;
        translation.m[13] = y;
        translation.m[14] = z;
        return this.multiply(translation);
    }

    scale(x, y, z) {
        const scaling = new Matrix4();
        scaling.m[0] = x;
        scaling.m[5] = y;
        scaling.m[10] = z;
        return this.multiply(scaling);
    }

    rotateX(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotation = new Matrix4();
        rotation.m[5] = cos;
        rotation.m[6] = sin;
        rotation.m[9] = -sin;
        rotation.m[10] = cos;
        return this.multiply(rotation);
    }

    rotateY(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotation = new Matrix4();
        rotation.m[0] = cos;
        rotation.m[2] = -sin;
        rotation.m[8] = sin;
        rotation.m[10] = cos;
        return this.multiply(rotation);
    }

    rotateZ(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotation = new Matrix4();
        rotation.m[0] = cos;
        rotation.m[1] = sin;
        rotation.m[4] = -sin;
        rotation.m[5] = cos;
        return this.multiply(rotation);
    }

    static perspective(fov, aspect, near, far) {
        const top = 1 / Math.tan(fov * Math.PI / 360);
        const delta = 1 / (near - far);
        const matrix = new Matrix4();

        matrix.m[0] = top / aspect;
        matrix.m[5] = top;
        matrix.m[10] = (far + near) * delta;
        matrix.m[11] = -1;
        matrix.m[14] = 2 * far * near * delta;
        matrix.m[15] = 0;

        return matrix;
    }

    static lookAt(eye, target, up) {
        // Calculate camera coordinate system
        const zAxis = new Vector3(eye.x - target.x, eye.y - target.y, eye.z - target.z).normalize();
        const xAxis = new Vector3(
            up.y * zAxis.z - up.z * zAxis.y,
            up.z * zAxis.x - up.x * zAxis.z,
            up.x * zAxis.y - up.y * zAxis.x
        ).normalize();
        const yAxis = new Vector3(
            zAxis.y * xAxis.z - zAxis.z * xAxis.y,
            zAxis.z * xAxis.x - zAxis.x * xAxis.z,
            zAxis.x * xAxis.y - zAxis.y * xAxis.x
        );

        const matrix = new Matrix4().identity().m;

        // Set rotation and translation
        matrix[0] = xAxis.x; matrix[4] = xAxis.y; matrix[8] = xAxis.z;
        matrix[12] = -(xAxis.x * eye.x + xAxis.y * eye.y + xAxis.z * eye.z);

        matrix[1] = yAxis.x; matrix[5] = yAxis.y; matrix[9] = yAxis.z;
        matrix[13] = -(yAxis.x * eye.x + yAxis.y * eye.y + yAxis.z * eye.z);

        matrix[2] = zAxis.x; matrix[6] = zAxis.y; matrix[10] = zAxis.z;
        matrix[14] = -(zAxis.x * eye.x + zAxis.y * eye.y + zAxis.z * eye.z);

        return { m: matrix };
    }
}

class Object3D {
    constructor() {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3(1, 1, 1);
        this.children = [];
        this.parent = null;
        this.matrixWorld = new Matrix4();
        this.visible = true;
    }

    add(child) {
        if (child.parent) {
            child.parent.remove(child);
        }
        child.parent = this;
        this.children.push(child);
        return this;
    }

    remove(child) {
        this.children = this.children.filter(c => c !== child);
        child.parent = null;
        return this;
    }

    updateMatrixWorld(parentMatrix = null) {
        // Create local transformation matrix
        const localMatrix = new Matrix4()
            .identity()
            .translate(this.position.x, this.position.y, this.position.z)
            .rotateX(this.rotation.x)
            .rotateY(this.rotation.y)
            .rotateZ(this.rotation.z)
            .scale(this.scale.x, this.scale.y, this.scale.z);

        // Combine with parent matrix if exists
        this.matrixWorld = parentMatrix ? Matrix4.multiply(parentMatrix, localMatrix) : localMatrix;

        // Update all children
        for (const child of this.children) {
            child.updateMatrixWorld(this.matrixWorld);
        }
    }
}

class Scene extends Object3D {
    constructor() {
        super();
        this.isScene = true;
    }
}

class PerspectiveCamera extends Object3D {
    constructor(fov = 60, aspect = 1, near = 0.1, far = 100) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.target = new Vector3();
        this.up = new Vector3(0, 1, 0);
    }

    lookAt(x, y, z) {
        this.target.set(x, y, z);
        return this;
    }

    projectionMatrix() {
        return Matrix4.perspective(this.fov, this.aspect, this.near, this.far);
    }

    viewMatrix() {
        return Matrix4.lookAt(this.position, this.target, this.up);
    }
}

class Geometry {
    constructor(vertices, indices = null, normals = null) {
        this.vertices = new Float32Array(vertices);
        this.indices = indices ? new Uint16Array(indices) : null;
        this.normals = normals ? new Float32Array(normals) : null;
        this.mode = 'triangles';
        this._gl = null; // WebGL buffer cache
    }
}

class BoxGeometry extends Geometry {
    constructor(width = 1, height = 1, depth = 1) {
        const w = width / 2;
        const h = height / 2;
        const d = depth / 2;

        // Define vertices for a box (24 vertices, 4 per face)
        const vertices = [
            // Front face
            w, -h, -d,  w, h, -d,  w, h, d,  w, -h, d,
            // Back face
            -w, -h, d,  -w, h, d,  -w, h, -d,  -w, -h, -d,
            // Top face
            -w, h, -d,  -w, h, d,  w, h, d,  w, h, -d,
            // Bottom face
            -w, -h, d,  -w, -h, -d,  w, -h, -d,  w, -h, d,
            // Right face
            -w, -h, d,  w, -h, d,  w, h, d,  -w, h, d,
            // Left face
            w, -h, -d,  -w, -h, -d,  -w, h, -d,  w, h, -d
        ];

        // Define indices (2 triangles per face)
        const indices = [];
        for (let face = 0; face < 6; face++) {
            const base = face * 4;
            indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
        }

        // Define normals for each face
        const normals = [
            // Front face (positive X)
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
            // Back face (negative X)
            -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
            // Top face (positive Y)
            0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
            // Bottom face (negative Y)
            0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0,
            // Right face (positive Z)
            0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
            // Left face (negative Z)
            0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1
        ];

        super(vertices, indices, normals);
    }
}

class StarGeometry extends Geometry {
    constructor(outerRadius = 1, innerRadius = 0.4, points = 5, depth = 0.2) {
        const vertices = [];
        const indices = [];
        const normals = [];
        const fullAngle = Math.PI * 2;
        const halfPi = Math.PI / 2;
        const starPoints = [];

        // Generate star points
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * fullAngle + halfPi;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            starPoints.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
        }

        const halfDepth = depth / 2;
        let vertexIndex = 0;

        // Top face
        vertices.push(0, 0, halfDepth);
        normals.push(0, 0, 1);
        const topCenterIndex = vertexIndex++;
        const topVertices = [];

        for (let i = 0; i < starPoints.length; i++) {
            vertices.push(starPoints[i][0], starPoints[i][1], halfDepth);
            normals.push(0, 0, 1);
            topVertices.push(vertexIndex++);
        }

        for (let i = 0; i < starPoints.length; i++) {
            indices.push(topCenterIndex, topVertices[i], topVertices[(i + 1) % starPoints.length]);
        }

        // Bottom face
        vertices.push(0, 0, -halfDepth);
        normals.push(0, 0, -1);
        const bottomCenterIndex = vertexIndex++;
        const bottomVertices = [];

        for (let i = 0; i < starPoints.length; i++) {
            vertices.push(starPoints[i][0], starPoints[i][1], -halfDepth);
            normals.push(0, 0, -1);
            bottomVertices.push(vertexIndex++);
        }

        for (let i = 0; i < starPoints.length; i++) {
            indices.push(bottomCenterIndex, bottomVertices[(i + 1) % starPoints.length], bottomVertices[i]);
        }

        // Side faces
        for (let i = 0; i < starPoints.length; i++) {
            const next = (i + 1) % starPoints.length;
            const dx = starPoints[next][0] - starPoints[i][0];
            const dy = starPoints[next][1] - starPoints[i][1];
            const length = Math.hypot(dx, dy) || 1;
            const normalX = dy / length;
            const normalY = -dx / length;

            const sideBase = vertexIndex;
            vertices.push(
                starPoints[i][0], starPoints[i][1], halfDepth,
                starPoints[next][0], starPoints[next][1], halfDepth,
                starPoints[i][0], starPoints[i][1], -halfDepth,
                starPoints[next][0], starPoints[next][1], -halfDepth
            );

            for (let j = 0; j < 4; j++) {
                normals.push(normalX, normalY, 0);
            }

            indices.push(sideBase, sideBase + 2, sideBase + 1, sideBase + 1, sideBase + 2, sideBase + 3);
            vertexIndex += 4;
        }

        super(vertices, indices, normals);
    }
}

class EdgesGeometry extends Geometry {
    constructor(geometry) {
        const vertices = geometry.vertices;
        const indices = geometry.indices;
        const edgeMap = new Map();

        // Process each triangle to find edges
        for (let i = 0; i < indices.length; i += 3) {
            const a = indices[i];
            const b = indices[i + 1];
            const c = indices[i + 2];

            // Calculate face normal
            const ax = vertices[3 * a];
            const ay = vertices[3 * a + 1];
            const az = vertices[3 * a + 2];
            const dx1 = vertices[3 * b] - ax;
            const dy1 = vertices[3 * b + 1] - ay;
            const dz1 = vertices[3 * b + 2] - az;
            const dx2 = vertices[3 * c] - ax;
            const dy2 = vertices[3 * c + 1] - ay;
            const dz2 = vertices[3 * c + 2] - az;

            const nx = dy1 * dz2 - dz1 * dy2;
            const ny = dz1 * dx2 - dx1 * dz2;
            const nz = dx1 * dy2 - dy1 * dx2;
            const length = Math.hypot(nx, ny, nz) || 1;
            const normal = { nx: nx / length, ny: ny / length, nz: nz / length };

            const addEdge = (vertexA, vertexB) => {
                const key = (Math.min(vertexA, vertexB) << 16) | Math.max(vertexA, vertexB);
                const edge = edgeMap.get(key);
                if (edge) {
                    edge.normal2 = normal;
                    edge.count = 2;
                } else {
                    edgeMap.set(key, {
                        a: Math.min(vertexA, vertexB),
                        b: Math.max(vertexA, vertexB),
                        normal1: normal,
                        count: 1
                    });
                }
            };

            addEdge(a, b);
            addEdge(b, c);
            addEdge(c, a);
        }

        // Extract edges that are on the outline or sharp
        const outlineEdges = [];
        edgeMap.forEach(edge => {
            const isOutline = edge.count === 1;
            const isSharp = edge.count === 2 && 
                (edge.normal1.nx * edge.normal2.nx + edge.normal1.ny * edge.normal2.ny + edge.normal1.nz * edge.normal2.nz) < 0.999;
            
            if (isOutline || isSharp) {
                outlineEdges.push(edge.a, edge.b);
            }
        });

        // Convert to vertex positions
        const edgeVertices = [];
        for (let i = 0; i < outlineEdges.length; i += 2) {
            const a = outlineEdges[i];
            const b = outlineEdges[i + 1];
            edgeVertices.push(
                vertices[3 * a], vertices[3 * a + 1], vertices[3 * a + 2],
                vertices[3 * b], vertices[3 * b + 1], vertices[3 * b + 2]
            );
        }

        super(edgeVertices, null, null);
        this.mode = 'lines';
    }
}

class Material {
    constructor({
        color = 0xffffff,
        ambient = 0.35,
        diffuse = 0.9,
        emissive = 0,
        emissiveIntensity = 0,
        opacity = 1,
        transparent = false,
        depthTest = true,
        depthWrite = true
    } = {}) {
        this.color = new Float32Array([
            (color >> 16 & 255) / 255,
            (color >> 8 & 255) / 255,
            (color & 255) / 255,
            opacity
        ]);
        this.emissive = new Float32Array([
            (emissive >> 16 & 255) / 255,
            (emissive >> 8 & 255) / 255,
            (emissive & 255) / 255,
            1
        ]);
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.emissiveIntensity = emissiveIntensity;
        this.transparent = transparent || opacity < 1;
        this.depthTest = depthTest;
        this.depthWrite = depthWrite;
    }

    setColor(color) {
        this.color[0] = (color >> 16 & 255) / 255;
        this.color[1] = (color >> 8 & 255) / 255;
        this.color[2] = (color & 255) / 255;
        return this;
    }

    setEmissive(color) {
        this.emissive[0] = (color >> 16 & 255) / 255;
        this.emissive[1] = (color >> 8 & 255) / 255;
        this.emissive[2] = (color & 255) / 255;
        return this;
    }
}

class Mesh extends Object3D {
    constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
        this.isMesh = true;
    }
}

// Material animation utilities
const MaterialAnimator = {
    pulseEmissive(material, speed = 1, baseIntensity = 1) {
        const time = 0.001 * Date.now() * speed;
        const intensity = (0.5 * Math.sin(time) + 0.5) * baseIntensity;
        material.emissiveIntensity = intensity;
    }
};

// WebGL Renderer
class WebGLRenderer {
    constructor({ canvas = null } = {}) {
        this.canvas = canvas || document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl', { antialias: true, alpha: true });
        
        if (!this.gl) {
            throw new Error('WebGL not supported');
        }
        
        this._initGL();
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
    }

    _compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        
        throw new Error(gl.getShaderInfoLog(shader));
    }

    _linkProgram(vertexShader, fragmentShader) {
        const gl = this.gl;
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return program;
        }
        
        throw new Error(gl.getProgramInfoLog(program));
    }

    _initGL() {
        const gl = this.gl;
        
        // Vertex shader
        const vertexShaderSource = `
            attribute vec3 aPos, aNormal;
            uniform mat4 uProjection, uView, uModel;
            varying vec3 vN;
            void main() {
                gl_Position = uProjection * uView * uModel * vec4(aPos, 1.0);
                vN = mat3(uModel) * aNormal;
            }
        `;
        
        // Fragment shader
        const fragmentShaderSource = `
            precision mediump float;
            uniform vec3 uLightDir;
            uniform vec4 uColor, uEmissive;
            uniform float uAmbient, uDiffuse, uEmissiveIntensity, uHemiStrength;
            uniform vec3 uHemiTop, uHemiBottom;
            varying vec3 vN;
            void main() {
                vec3 N = normalize(vN);
                float lightContrib = max(dot(N, normalize(uLightDir)), 0.0);
                float hemiContrib = clamp(0.5 * N.y + 0.5, 0.0, 1.0);
                vec3 baseColor = uColor.rgb * (uAmbient + uDiffuse * lightContrib);
                vec3 hemiColor = mix(uHemiBottom, uHemiTop, hemiContrib);
                vec3 litColor = baseColor * mix(vec3(1.0), hemiColor, uHemiStrength);
                vec3 emissiveColor = uEmissive.rgb * uEmissiveIntensity;
                gl_FragColor = vec4(litColor + emissiveColor, uColor.a);
            }
        `;
        
        const vertexShader = this._compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this._compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this._linkProgram(vertexShader, fragmentShader);
        
        // Get attribute and uniform locations
        this.locations = {
            aPos: gl.getAttribLocation(this.program, 'aPos'),
            aNormal: gl.getAttribLocation(this.program, 'aNormal'),
            uProjection: gl.getUniformLocation(this.program, 'uProjection'),
            uView: gl.getUniformLocation(this.program, 'uView'),
            uModel: gl.getUniformLocation(this.program, 'uModel'),
            uColor: gl.getUniformLocation(this.program, 'uColor'),
            uEmissive: gl.getUniformLocation(this.program, 'uEmissive'),
            uLightDir: gl.getUniformLocation(this.program, 'uLightDir'),
            uAmbient: gl.getUniformLocation(this.program, 'uAmbient'),
            uDiffuse: gl.getUniformLocation(this.program, 'uDiffuse'),
            uEmissiveIntensity: gl.getUniformLocation(this.program, 'uEmissiveIntensity'),
            uHemiTop: gl.getUniformLocation(this.program, 'uHemiTop'),
            uHemiBottom: gl.getUniformLocation(this.program, 'uHemiBottom'),
            uHemiStrength: gl.getUniformLocation(this.program, 'uHemiStrength')
        };
        
        // Set up WebGL state
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);
        gl.clearColor(0, 0, 0, 0);
    }

    _prepareGeometry(geometry) {
        const gl = this.gl;
        
        if (!geometry._gl) {
            // Create vertex buffer
            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);
            
            // Create normal buffer if normals exist
            let normalBuffer = null;
            if (geometry.normals) {
                normalBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);
            }
            
            // Create index buffer if indices exist
            let indexBuffer = null;
            let indexCount = 0;
            let arrayCount = 0;
            
            if (geometry.indices) {
                indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);
                indexCount = geometry.indices.length;
            } else {
                arrayCount = geometry.vertices.length / 3;
            }
            
            geometry._gl = {
                vertexBuffer: vertexBuffer,
                normalBuffer: normalBuffer,
                indexBuffer: indexBuffer,
                indexCount: indexCount,
                arrayCount: arrayCount,
                isLines: geometry.mode === 'lines'
            };
        }
    }

    render(scene, camera, lightDirection = [0.6, 1, 0.5], hemisphereTop = [1, 1, 1], hemisphereBottom = [0.5, 0.7, 1], hemisphereStrength = 0) {
        const gl = this.gl;
        
        // Update camera aspect ratio
        camera.aspect = (this.canvas.width || 1) / (this.canvas.height || 1);
        
        // Update world matrices
        scene.updateMatrixWorld(null);
        
        // Clear the canvas
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // Collect meshes and lines
        const meshes = [];
        const lines = [];
        
        function collectRenderables(object) {
            if (object.isMesh && object.visible) {
                if (object.geometry.mode === 'lines') {
                    lines.push(object);
                } else {
                    meshes.push(object);
                }
            }
            for (const child of object.children) {
                collectRenderables(child);
            }
        }
        
        collectRenderables(scene);
        
        // Get projection and view matrices
        const projectionMatrix = camera.projectionMatrix().m;
        const viewMatrix = camera.viewMatrix().m;
        
        // Set up shader program
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(this.locations.uProjection, false, projectionMatrix);
        gl.uniformMatrix4fv(this.locations.uView, false, viewMatrix);
        gl.uniform3fv(this.locations.uLightDir, new Float32Array(lightDirection));
        gl.uniform3fv(this.locations.uHemiTop, new Float32Array(hemisphereTop));
        gl.uniform3fv(this.locations.uHemiBottom, new Float32Array(hemisphereBottom));
        gl.uniform1f(this.locations.uHemiStrength, hemisphereStrength);
        
        // Render solid meshes
        for (const mesh of meshes) {
            const geometry = mesh.geometry;
            this._prepareGeometry(geometry);
            const glData = geometry._gl;
            
            // Bind vertex buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, glData.vertexBuffer);
            gl.vertexAttribPointer(this.locations.aPos, 3, gl.FLOAT, false, 12, 0);
            gl.enableVertexAttribArray(this.locations.aPos);
            
            // Bind normal buffer if available
            if (glData.normalBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, glData.normalBuffer);
                gl.vertexAttribPointer(this.locations.aNormal, 3, gl.FLOAT, false, 12, 0);
                gl.enableVertexAttribArray(this.locations.aNormal);
            } else if (this.locations.aNormal >= 0) {
                gl.disableVertexAttribArray(this.locations.aNormal);
            }
            
            // Set model matrix
            gl.uniformMatrix4fv(this.locations.uModel, false, mesh.matrixWorld.m);
            
            // Set material properties
            const material = mesh.material || new Material();
            
            // Handle transparency
            if (material.transparent) {
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            } else {
                gl.disable(gl.BLEND);
            }
            
            // Set depth testing
            if (material.depthTest !== false) {
                gl.enable(gl.DEPTH_TEST);
            } else {
                gl.disable(gl.DEPTH_TEST);
            }
            gl.depthMask(material.depthWrite !== false);
            
            // Set material uniforms
            gl.uniform4fv(this.locations.uColor, material.color);
            gl.uniform4fv(this.locations.uEmissive, material.emissive || new Float32Array([0, 0, 0, 1]));
            gl.uniform1f(this.locations.uAmbient, material.ambient);
            gl.uniform1f(this.locations.uDiffuse, material.diffuse);
            gl.uniform1f(this.locations.uEmissiveIntensity, material.emissiveIntensity || 0);
            
            // Draw the mesh
            if (glData.indexBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glData.indexBuffer);
                gl.drawElements(gl.TRIANGLES, glData.indexCount, gl.UNSIGNED_SHORT, 0);
            } else {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                gl.drawArrays(gl.TRIANGLES, 0, glData.arrayCount);
            }
        }
        
        // Render lines (wireframes, edges)
        gl.disable(gl.CULL_FACE);
        gl.useProgram(this.program);
        
        if (this.locations.aNormal >= 0) {
            gl.disableVertexAttribArray(this.locations.aNormal);
        }
        
        for (const line of lines) {
            const geometry = line.geometry;
            this._prepareGeometry(geometry);
            const glData = geometry._gl;
            
            // Set uniforms for line rendering
            gl.uniformMatrix4fv(this.locations.uModel, false, line.matrixWorld.m);
            gl.uniform4fv(this.locations.uColor, line.material ? line.material.color : new Float32Array([1, 1, 1, 1]));
            gl.uniform4fv(this.locations.uEmissive, new Float32Array([0, 0, 0, 1]));
            gl.uniform1f(this.locations.uAmbient, 1);
            gl.uniform1f(this.locations.uDiffuse, 0);
            gl.uniform1f(this.locations.uEmissiveIntensity, 0);
            
            // Bind and draw lines
            gl.bindBuffer(gl.ARRAY_BUFFER, glData.vertexBuffer);
            gl.vertexAttribPointer(this.locations.aPos, 3, gl.FLOAT, false, 12, 0);
            gl.enableVertexAttribArray(this.locations.aPos);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.drawArrays(gl.LINES, 0, glData.arrayCount);
        }
        
        // Restore default state
        gl.enable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
    }
}

// Utility function to add edges to a mesh
function addEdges(mesh, color = 0xffffff, scale = 1.001) {
    const edgesGeometry = new EdgesGeometry(mesh.geometry);
    const edgesMaterial = new Material({ color: color, depthWrite: false });
    const edgesMesh = new Mesh(edgesGeometry, edgesMaterial);
    
    edgesMesh.scale.set(mesh.scale.x * scale, mesh.scale.y * scale, mesh.scale.z * scale);
    mesh.add(edgesMesh);
    return edgesMesh;
}

// Orbit Controls for camera interaction
class OrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.target = camera.target.clone();
        
        // Calculate initial spherical coordinates
        const vector = camera.position.clone().sub(this.target);
        this.radius = vector.length();
        this.theta = Math.atan2(vector.x, vector.z);
        this.phi = Math.acos(Math.min(Math.max(vector.y / this.radius, -1), 1));
        
        // Control settings
        this.minRadius = 2;
        this.maxRadius = 30;
        this.minPhi = 0.05;
        this.maxPhi = Math.PI - 0.05;
        this.rotateSpeed = 1;
        this.zoomSpeed = 1;
        
        this._initEventHandlers();
        this.update();
    }
    
    _initEventHandlers() {
        const domElement = this.domElement;
        let isActive = false;
        let mode = 'rotate';
        let lastX = 0;
        let lastY = 0;
        
        const getPointer = (event) => {
            return event.touches ? 
                { x: event.touches[0].clientX, y: event.touches[0].clientY } :
                { x: event.clientX, y: event.clientY };
        };
        
        // Mouse/touch start
        domElement.addEventListener('mousedown', (event) => {
            isActive = true;
            const pointer = getPointer(event);
            lastX = pointer.x;
            lastY = pointer.y;
            mode = (event.button === 2 || event.shiftKey) ? 'pan' : 'rotate';
            event.preventDefault();
        });
        
        // Mouse/touch move
        window.addEventListener('mousemove', (event) => {
            if (isActive) {
                const pointer = getPointer(event);
                const deltaX = pointer.x - lastX;
                const deltaY = pointer.y - lastY;
                lastX = pointer.x;
                lastY = pointer.y;
                
                if (mode === 'rotate') {
                    this.theta -= 0.005 * deltaX * this.rotateSpeed;
                    this.phi -= 0.005 * deltaY * this.rotateSpeed;
                    this.phi = Math.max(this.minPhi, Math.min(this.maxPhi, this.phi));
                } else {
                    // Pan mode
                    const panX = -0.002 * deltaX * this.radius;
                    const panY = 0.002 * deltaY * this.radius;
                    const sinTheta = Math.sin(this.theta);
                    const cosTheta = Math.cos(this.theta);
                    const rightVector = new Vector3(cosTheta, 0, -sinTheta);
                    const upVector = new Vector3(0, 1, 0);
                    
                    this.target.add(rightVector.multiplyScalar(panX).add(upVector.multiplyScalar(panY)));
                }
                
                this.update();
            }
        });
        
        // Mouse/touch end
        window.addEventListener('mouseup', () => {
            isActive = false;
        });
        
        // Prevent context menu
        domElement.addEventListener('contextmenu', (event) => event.preventDefault());
        
        // Mouse wheel for zooming
        domElement.addEventListener('wheel', (event) => {
            const factor = Math.exp(-0.001 * event.deltaY * this.zoomSpeed);
            this.radius *= factor;
            this.radius = Math.max(this.minRadius, Math.min(this.maxRadius, this.radius));
            this.update();
        }, { passive: true });
        
        // Touch events
        domElement.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                isActive = true;
                mode = 'rotate';
                lastX = event.touches[0].clientX;
                lastY = event.touches[0].clientY;
            }
        }, { passive: false });
        
        domElement.addEventListener('touchmove', (event) => {
            if (isActive && event.touches.length === 1 && mode === 'rotate') {
                const touch = event.touches[0];
                const deltaX = touch.clientX - lastX;
                const deltaY = touch.clientY - lastY;
                lastX = touch.clientX;
                lastY = touch.clientY;
                
                this.theta -= 0.005 * deltaX * this.rotateSpeed;
                this.phi -= 0.005 * deltaY * this.rotateSpeed;
                this.phi = Math.max(this.minPhi, Math.min(this.maxPhi, this.phi));
                
                this.update();
            }
        }, { passive: false });
        
        domElement.addEventListener('touchend', () => {
            isActive = false;
        });
    }
    
    update() {
        const sinPhi = Math.sin(this.phi);
        const cosPhi = Math.cos(this.phi);
        const sinTheta = Math.sin(this.theta);
        const cosTheta = Math.cos(this.theta);
        
        const position = new Vector3(
            this.target.x + this.radius * sinPhi * sinTheta,
            this.target.y + this.radius * cosPhi,
            this.target.z + this.radius * sinPhi * cosTheta
        );
        
        this.camera.position.copy(position);
        this.camera.lookAt(this.target.x, this.target.y, this.target.z);
    }
}

// Export the M3D library
window.M3D = {
    Vector3: Vector3,
    Matrix4: Matrix4,
    Object3D: Object3D,
    Scene: Scene,
    PerspectiveCamera: PerspectiveCamera,
    Geometry: Geometry,
    BoxGeometry: BoxGeometry,
    StarGeometry: StarGeometry,
    EdgesGeometry: EdgesGeometry,
    MeshLambertMaterial: Material,
    MaterialAnimator: MaterialAnimator,
    Mesh: Mesh,
    WebGLRenderer: WebGLRenderer,
    addEdges: addEdges,
    OrbitControls: OrbitControls
};
/**
 * Cat Class - A 3D cat model built from geometric primitives with smooth rotation animations
 */
class Cat extends M3D.Object3D {
    constructor(options = {}) {
        super();
        
        // Configuration
        this.baseY = options.baseY || 0;
        this.scale.set(0.3, 0.3, 0.3); // Scale down the cat model
        
        // Rotation state for smooth turning animations
        this._yaw = 0; // Current rotation angle
        this._targetYaw = null; // Target rotation angle for smooth interpolation
        
        this._buildCat();
    }
    
    /**
     * Constructs the 3D cat model from geometric primitives
     */
    _buildCat() {
        const { BoxGeometry, MeshLambertMaterial, Mesh } = M3D;
        
        // Define geometries for different cat parts
        const bodyGeometry = new BoxGeometry(2.5, 2.5, 2.5);
        const pawGeometry = new BoxGeometry(0.5, 0.5, 0.1);
        const noseGeometry = new BoxGeometry(0.3, 0.3, 0.2);
        const mouthGeometry = new BoxGeometry(1, 0.5, 0.2);
        const eyeGeometry = new BoxGeometry(0.25, 0.25, 0.25);
        const headGeometry = new BoxGeometry(0.5, 0.5, 0.5);
        const earGeometry = new BoxGeometry(0.6, 0.8, 0.4);
        const earInnerGeometry = new BoxGeometry(0.4, 0.4, 0.4);
        const legGeometry = new BoxGeometry(0.4, 1.8, 0.4);
        const pawPadGeometry = new BoxGeometry(0.5, 0.2, 0.5);
        
        // Define materials with different colors
        const blackMaterial = new MeshLambertMaterial({
            color: 0x000000, // Black for main body
            ambient: 0.4,
            diffuse: 0.8
        });
        
        const yellowMaterial = new MeshLambertMaterial({
            color: 0xFFE82C, // Yellow for paws
            ambient: 0.8,
            diffuse: 0.4
        });
        
        const darkMaterial = new MeshLambertMaterial({
            color: 0x000000, // Black for details
            ambient: 0.8,
            diffuse: 0.4
        });
        
        const whiteMaterial = new MeshLambertMaterial({
            color: 0xffffff, // White for mouth/inner parts
            ambient: 0.8,
            diffuse: 0.4
        });
        
        const grayMaterial = new MeshLambertMaterial({
            color: 0x1a1a1a, // Dark gray for paw pads
            ambient: 0.5,
            diffuse: 0.7
        });
        
        // Create main body
        const body = new Mesh(bodyGeometry, blackMaterial);
        body.position.set(0, 1.25, 0);
        this.add(body);
        M3D.addEdges(body, 0x000000, 1.002); // Add black edges
        
        // Create front paws (yellow with black toes)
        const frontPawPositions = [[-0.5, -1.25], [0.5, -1.225]];
        for (let [x, z] of frontPawPositions) {
            // Yellow paw base
            let paw = new Mesh(pawGeometry, yellowMaterial);
            paw.position.set(x, 1.5, z);
            this.add(paw);
            
            // Black toes/claws
            let toes = new Mesh(noseGeometry, darkMaterial);
            toes.position.set(x, 1.5, -1.25);
            this.add(toes);
        }
        
        // Create mouth
        let mouth = new Mesh(mouthGeometry, whiteMaterial);
        mouth.position.set(0.06, 0.95, -1.225);
        this.add(mouth);
        
        // Create nose
        let nose = new Mesh(eyeGeometry, blackMaterial);
        nose.position.set(0.06, 1.05, -1.4);
        this.add(nose);
        
        // Create head
        let head = new Mesh(headGeometry, blackMaterial);
        head.position.set(0, 1.4, 1.4);
        this.add(head);
        
        // Create ears
        const earPositions = [[-0.9, -1.002], [0.9, -1.002]];
        for (let [x, z] of earPositions) {
            // Outer ear
            let ear = new Mesh(earGeometry, blackMaterial);
            ear.position.set(x, 2.6, z);
            this.add(ear);
            M3D.addEdges(ear, 0x000000, 1.002); // Add edges
            
            // Inner ear (white)
            let innerEar = new Mesh(earInnerGeometry, whiteMaterial);
            innerEar.position.set(x, 2.7, z - 0.001);
            this.add(innerEar);
            M3D.addEdges(innerEar, 0x000000, 1.002); // Add edges
        }
        
        // Create legs and paw pads
        const legPositions = [[-0.7, -0.8], [0.7, -0.8], [-0.7, 0.8], [0.7, 0.8]];
        for (let [x, z] of legPositions) {
            // Leg
            let leg = new Mesh(legGeometry, blackMaterial);
            leg.position.set(x, 0.9, z);
            this.add(leg);
            M3D.addEdges(leg, 0x000000, 1.002); // Add edges
            
            // Paw pad
            let pawPad = new Mesh(pawPadGeometry, grayMaterial);
            pawPad.position.set(x, 0.1, z);
            this.add(pawPad);
            M3D.addEdges(pawPad, 0x000000, 1.002); // Add edges
        }
    }
    
    /**
     * Set the cat to face a specific direction
     * @param {string} direction - 'N', 'E', 'S', or 'W'
     */
    setFacing(direction) {
        const directionMap = {
            'N': 0,           // North (negative Z)
            'E': -Math.PI/2,  // East (positive X)
            'S': Math.PI,     // South (positive Z)
            'W': Math.PI/2    // West (negative X)
        };
        
        const targetAngle = directionMap[direction.toUpperCase()];
        if (targetAngle !== undefined) {
            this._targetYaw = targetAngle;
        }
    }
    
    /**
     * Make the cat face the direction of movement
     * @param {number} dx - Change in X direction (-1, 0, or 1)
     * @param {number} dz - Change in Z direction (-1, 0, or 1)
     */
    faceStep(dx, dz) {
        let targetAngle = null;
        
        if (dx === 1 && dz === 0) {
            targetAngle = -Math.PI/2; // Moving right (East)
        } else if (dx === -1 && dz === 0) {
            targetAngle = Math.PI/2;  // Moving left (West)
        } else if (dx === 0 && dz === 1) {
            targetAngle = Math.PI;    // Moving down (South)
        } else if (dx === 0 && dz === -1) {
            targetAngle = 0;          // Moving up (North)
        }
        
        if (targetAngle !== null) {
            this._targetYaw = targetAngle;
        }
    }
    
    /**
     * Update the cat's rotation with smooth interpolation
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        // If no target rotation is set, don't update
        if (this._targetYaw === null) {
            return;
        }
        
        // Calculate the shortest angle difference
        let angleDifference = this._targetYaw - this._yaw;
        
        // Normalize angle difference to [-π, π] range
        while (angleDifference > Math.PI) {
            angleDifference -= 2 * Math.PI;
        }
        while (angleDifference < -Math.PI) {
            angleDifference += 2 * Math.PI;
        }
        
        // Calculate rotation step (8 radians per second max speed)
        const rotationStep = Math.sign(angleDifference) * Math.min(Math.abs(angleDifference), 8 * dt);
        
        // Apply rotation step
        this._yaw += rotationStep;
        
        // Normalize current angle to [-π, π] range
        while (this._yaw > Math.PI) {
            this._yaw -= 2 * Math.PI;
        }
        while (this._yaw < -Math.PI) {
            this._yaw += 2 * Math.PI;
        }
        
        // Apply rotation to the 3D object
        this.rotation.y = this._yaw;
        
        // Check if we've reached the target (within small tolerance)
        if (Math.abs(angleDifference) < 0.01) {
            this._yaw = this._targetYaw;
            this.rotation.y = this._yaw;
            this._targetYaw = null; // Stop rotating
        }
    }
}
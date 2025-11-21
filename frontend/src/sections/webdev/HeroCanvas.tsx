"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        /** ---------------------------------------
         *  SCENE, CAMERA, RENDERER
         * -------------------------------------- */
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0d0d0d");

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(devicePixelRatio);

        /** ---------------------------------------
         *  GRADIENT SHADER MATERIAL (ICOSAHEDRON)
         * -------------------------------------- */
        const gradientMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color("#4cc9f0") },  // top
                color2: { value: new THREE.Color("#b5179e") },  // bottom
            },
            vertexShader: `
        varying float vY;
        void main() {
            vY = position.y;    // send Y position to fragment
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying float vY;
        uniform vec3 color1;
        uniform vec3 color2;

        void main() {
            float t = (vY + 1.0) / 2.0;   // normalize Y from [-1,1] to [0,1]
            vec3 finalColor = mix(color2, color1, t);
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.2, 1),
            gradientMaterial
        );
        scene.add(mesh);

        /** ---------------------------------------
         *  PARTICLE SYSTEM
         * -------------------------------------- */
        const particleCount = 1500;
        const particlesGeometry = new THREE.BufferGeometry();

        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 12;
        }

        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            color: "#ffffff",
            size: 0.015,
            transparent: true,
            opacity: 0.7,
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        /** ---------------------------------------
         *  LIGHTS
         * -------------------------------------- */
        const ambient = new THREE.AmbientLight("#ffffff", 0.5);
        const point = new THREE.PointLight("#ffffff", 1.2);
        point.position.set(5, 5, 5);
        scene.add(ambient, point);

        /** ---------------------------------------
         *  MOUSE CAMERA ORBIT
         * -------------------------------------- */
        const targetCameraPos = new THREE.Vector3();
        const mouse = new THREE.Vector2();

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove);

        /** ---------------------------------------
         *  RESIZE
         * -------------------------------------- */
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        /** ---------------------------------------
         *  ANIMATION LOOP
         * -------------------------------------- */
        const animate = () => {
            requestAnimationFrame(animate);

            mesh.rotation.x += 0.004;
            mesh.rotation.y += 0.006;

            particles.rotation.y += 0.0005;

            targetCameraPos.set(mouse.x * 1.4, -mouse.y * 1.4, 5);
            camera.position.lerp(targetCameraPos, 0.05);
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

        /** ---------------------------------------
         *  CLEANUP
         * -------------------------------------- */
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);

            mesh.geometry.dispose();
            gradientMaterial.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <section
            style={{
                position: "relative",
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                color: "white",
            }}
        >
            {/* WebGL Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                }}
            />

            {/* Gradient Overlay on top of the scene */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%)",
                    pointerEvents: "none",
                }}
            />

            {/* Hero Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 3,
                    textAlign: "center",
                    top: "40%",
                    transform: "translateY(-50%)",
                    padding: "0 20px",
                }}
            >
                <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                    Web Development
                </h1>
                <p style={{ fontSize: "1.5rem", maxWidth: "650px", margin: "0 auto" }}>
                    Crafting immersive 3D web experiences with WebGL, shaders, and
                    next-generation JavaScript.
                </p>
            </div>
        </section>
    );
};

export default HeroCanvas;

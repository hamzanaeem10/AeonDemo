import React, { useEffect, useRef } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700; // Reduced for a cleaner, high-end look
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      // Increased spread for more depth
      posArray[i] = (Math.random() - 0.5) * 30; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Custom material for subtle look
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Slower, more majestic rotation
      particlesMesh.rotation.y += 0.0001;
      particlesMesh.rotation.x += 0.00005;

      // Subtle mouse parallax
      particlesMesh.rotation.x += mouseY * 0.000005;
      particlesMesh.rotation.y += mouseX * 0.000005;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationId);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Three.js Background Layer */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
      />

      {/* Static Atmospheric Gradients (Keeping these for richness) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Pill */}
          <motion.div variants={itemVariants} className="inline-block mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_#10b981]" />
              Waitlist Open
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05] max-w-5xl mx-auto">
            Hear music on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
              your terms.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p variants={itemVariants} className="text-xl text-zinc-400 mb-12 max-w-lg mx-auto leading-relaxed font-light">
            Type what to hear. The music adapts.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={scrollToWaitlist} className="w-full sm:w-auto group">
                Join the waitlist
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="ghost" size="lg" onClick={scrollToDemo} className="w-full sm:w-auto text-zinc-400 hover:text-white">
                <PlayCircle className="mr-2 w-4 h-4" />
                How it works
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
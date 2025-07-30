import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ExternalLink, Copy, BarChart3, Rocket, Star, Shield, Users, Zap } from 'lucide-react';
import './styles.css';
import logo from '/logo.png';
import bagsIcon from '/bags.png';
import dexIcon from '/dex.png';
import { CONTRACT_ADDRESS } from './constants';

const LibraLanding = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);


  // Particle system for starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.twinkle += particle.twinkleSpeed;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        const twinkleOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.twinkle));
        
        ctx.save();
        ctx.globalAlpha = twinkleOpacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const copyContract = () => {
  navigator.clipboard.writeText(CONTRACT_ADDRESS);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};


  const features = [
    { icon: Shield, title: "No Presales", desc: "100% fair launch for everyone" },
    { icon: Users, title: "No Private Allocations", desc: "Equal opportunity for all participants" },
    { icon: Zap, title: "No Team Wallets", desc: "Complete transparency in distribution" }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="starfield-canvas"
      />
      
      {/* Main Content */}
      <div className="main-container">
        {/* Hero Section */}
        <section className="section-hero">
          <div className={`transform transition-entrance ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-100'}`}>
            {/* Logo with Glow Effect */}
            <div className="logo-container group">
  <div className="logo-glow group-hover:opacity-40"></div>
  <div className="logo-main">
    <img src={logo} alt="$LIBRA Logo" className="logo-img" />
    <div className="logo-shine"></div>
  </div>
</div>
            
            {/* Main Title */}
            <h1 className="title-main animate-pulse">
              $LIBRA
            </h1>
            
            {/* Subtitle */}
            <p className="subtitle">
              Reclaiming the original vision: a token that serves the Argentinian people, not exploits them.
              <br />
              <span className="subtitle-highlight">This time, it's truly fair.</span>
            </p>
            
            {/* Scroll Indicator */}
            <div className="scroll-indicator">
              <ChevronDown size={32} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <h2 className="title-section text-center">
              True Fair Launch
            </h2>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card group">
                  <div className="card-glow group-hover:opacity-100"></div>
                  <div className="card-content">
                    <feature.icon className="feature-icon group-hover:scale-110" />
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Token Details Section */}
        <section className="section bg-gradient-section">
          <div className="container-narrow">
            <h2 className="title-section text-center">Token Details</h2>
            
            <div className="token-details">
              <div className="details-grid">
                {[
  { label: "Name", value: "$LIBRA" },
  { label: "Launch Type", value: "Fair Launch" },
  { label: "Fee Routing", value: "100% to Argentinian wallet" },
  { label: "Launchpad", value: "[Insert launchpad name]" },
  { label: "Supply", value: "[Insert supply]" },
  { label: "Contract Address", value: CONTRACT_ADDRESS },
].map((detail, index) => {
  if (detail.label === "Contract Address") {
    return (
      <div className="detail-item" key={index}>
        <span className="detail-label">{detail.label}:</span>
        <div className="detail-value with-copy">
          <button onClick={copyContract} className="copy-btn" title="Copy">
            <Copy size={16} />
          </button>
          <span>{detail.value}</span>
          {copied && <span className="copied-text">Copied!</span>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="detail-item" key={index}>
        <span className="detail-label">{detail.label}:</span>
        <span className="detail-value">{detail.value}</span>
      </div>
    );
  }
})}
              </div>
              
              <div className="fee-routing-banner">
                <p className="fee-routing-text">
                  <span className="fee-highlight">All transaction fees</span> are routed directly to 
                  <span className="destination-highlight"> [INSERT DESTINATION]</span> using the BAGS app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="section">
          <div className="container-narrow text-center">
            <h2 className="title-section">$LIBRA Token</h2>
            
            <div className="actions-grid">
              {[
  { icon: bagsIcon, label: "bags.fm", href: `https://bags.fm/${CONTRACT_ADDRESS}` },
  { icon: dexIcon, label: "Chart", href: `https://dexscreener.com/solana/${CONTRACT_ADDRESS}` },
  { label: "𝕏 Community", href: "https://x.com/i/communities/1950294654945038520" },
].map((button, index) => (
  <a
    key={index}
    href={button.href}
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn group"
  >
    <div className="action-btn-shine group-hover:translate-x-full"></div>
    {button.icon && (
      <img src={button.icon} alt={button.label} className="action-btn-icon-img" />
    )}
    <span>{button.label}</span>
  </a>
))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">
              Not affiliated with any government, organization, or entity involved in the original version of $LIBRA.
              <br />
              This is a community-led effort to redirect value to the Argentinian people.
            </p>
            
            {/* Floating Elements */}
            <div className="floating-star floating-star-1">
              <Star size={16} />
            </div>
            <div className="floating-star floating-star-2">
              <Star size={12} />
            </div>
            <div className="floating-star floating-star-3">
              <Star size={20} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LibraLanding;
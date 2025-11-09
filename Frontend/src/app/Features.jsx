import React from 'react';
import '../styles/features.css';

function Features() {
  const mainFeatures = [
    {
      icon: "🛡️",
      title: "Official DoD Data",
      description: "We source our satellite data directly from the U.S. Department of Defense's official catalog, ensuring the highest accuracy and reliability for tracking orbital objects.",
      highlight: "Trusted Source"
    },
    {
      icon: "🎨",
      title: "Advanced Visualization",
      description: "Our cutting-edge 3D rendering engine transforms raw orbital data into stunning, interactive visualizations that make understanding satellite positions intuitive and engaging.",
      highlight: "Immersive Experience"
    },
    
    {
      icon: "🌐",
      title: "Global Coverage",
      description: "Track satellites across all orbital regimes - from Low Earth Orbit to Geostationary positions, covering the entire space around our planet.",
      highlight: "Comprehensive"
    }
  ];

  return (
    <div className="features-container">
      {/* Hero Section */}
      <section className="features-hero-section">
        <div className="features-hero-content">
          <h1 className="features-hero-title">
            LiteView <span className="highlight">Features</span>
          </h1>
          <p className="features-hero-subtitle">
            Experience satellite tracking backed by official data and cutting-edge visualization technology
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="main-features-section">
        <div className="main-features-grid">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="main-feature-card">
              <div className="feature-icon-large">{feature.icon}</div>
              <div className="feature-badge">{feature.highlight}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta-section">
        <h2>Ready to Explore?</h2>
        <p>Start tracking satellites with our powerful visualization platform</p>
        <button className="cta-button" onClick={() => window.location.href = '/'}>
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Features;
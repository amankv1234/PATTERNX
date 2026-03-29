# PatternX | Fraud Intelligence Platform

PatternX is an enterprise-grade fintech platform designed for real-time fraud detection and investigation. It leverages advanced graph analytics, machine learning, and a premium GSAP-powered interface to provide investigators with the tools they need to unmask financial crime at scale.

## 🚀 Key Features

- **Real-time Dashboard**: Live monitoring of transaction velocity and risk distribution using Chart.js.
- **Graph Analytics**: Interactive Vis.js-powered network visualization to detect circular layering and shell company webs.
- **Fraud Replay**: Frame-by-frame investigative replay of fraudulent transaction journeys.
- **KYC Onboarding**: A complete, bank-grade verification flow including Aadhar, PAN, DigiLocker, and Live Selfie matching.
- **Premium UI/UX**: A state-of-the-art Navy & Blue theme with fluid GSAP animations and a custom cursor experience.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS, JavaScript (ES6+)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Charts**: Chart.js
- **Graphing**: Vis.js Network
- **Build Tool**: Vite

## 🏗️ Workflow & Architecture

### Frontend Layer
Modular JavaScript architecture with specialized components for:
- Routing and Section Management
- State-driven UI updates
- Event-based animation triggers

### Backend Layer (Proposed)
- **Engine**: Python (FastAPI/Flask) or Node.js (Express)
- **Database**: PostgreSQL for transactional data, Neo4j for relationship/graph data.
- **Authentication**: JWT-based secure sessions.

### AI/ML Pipeline (Proposed)
1. **Data Ingestion**: Real-time stream processing of transaction logs.
2. **Feature Engineering**: Calculating velocity, frequency, and relationship density.
3. **Model Inference**: Random Forest or Graph Neural Networks (GNN) to identify high-risk nodes.
4. **Alert Triggering**: Automated flagging of suspicious patterns for manual review.

## 🔮 Future Enhancements

- **Direct Neo4j Integration**: Live backend-to-frontend graph streaming.
- **Predictive Risk Scoring**: ML models that predict fraud *before* the first transaction.
- **Collaborative Investigation**: Shared workspaces for multi-agent fraud teams.
- **Blockchain Pathing**: Tracking crypto-to-fiat layering patterns.

## 📥 Installation

1. Clone the repository
2. Navigate to the `frontend` directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

---
*Created by Antigravity AI for Presentation Readiness*

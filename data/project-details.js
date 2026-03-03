// Project Details Data
const projectDetails = {
  'metrops': {
    title: 'MetrOps - AI-Driven Metro Scheduling',
    description: `MetrOps is an intelligent metro scheduling system that leverages AI and machine learning to optimize train operations and improve passenger experience.`,
    features: [
      'Real-time crowd forecasting using ML algorithms',
      'Dynamic train scheduling based on passenger demand',
      'Predictive maintenance alerts',
      'Interactive analytics dashboard',
      '70% improvement in train punctuality',
      'Reduced wait times during peak hours'
    ],
    tech: ['Python', 'Flask', 'FastAPI', 'Scikit-learn', 'TensorFlow', 'React.js', 'MongoDB'],
    challenges: 'Handling real-time data processing and ensuring accurate predictions with limited historical data.',
    impact: 'Improved metro efficiency by 70% and enhanced passenger satisfaction through reduced wait times.',
    gallery: [
      'assets/images/projects/metrops/Screenshot 2025-10-23 192846.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 192924.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 192954.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 193015.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 193035.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 193055.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 193114.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 193132.png',
      'assets/images/projects/metrops/Screenshot 2025-10-23 193148.png'
    ]
  },
  'cueblink': {
    title: 'CueBlink - Eye Blink Detection System',
    description: `CueBlink is an assistive technology that enables communication through eye blinks, designed for individuals with motor disabilities.`,
    features: [
      '92% accuracy in eye-blink detection',
      'Real-time text-to-speech conversion',
      'CNN-based detection model',
      'Low-latency processing with OpenCV',
      'Customizable blink patterns',
      'User-friendly React interface'
    ],
    tech: ['Python', 'OpenCV', 'CNN', 'TensorFlow', 'Flask', 'React.js', 'WebRTC'],
    challenges: 'Achieving high accuracy in varying lighting conditions and minimizing false positives.',
    impact: 'Empowers individuals with motor disabilities to communicate effectively using eye movements.',
    gallery: [
      'assets/images/projects/cueblink/c1.png',
      'assets/images/projects/cueblink/c2.png'
    ]
  },
  'dropnex': {
    title: 'DropNex - Direct Retailer Delivery Platform',
    description: `DropNex revolutionizes supply chain logistics by enabling direct manufacturer-to-retailer delivery, eliminating warehouse dependencies.`,
    features: [
      'Warehouse-free delivery model',
      'Real-time GPS tracking',
      'Optimized route planning',
      'Inventory management system',
      'Focus on Tier 2/3 cities',
      'Cost reduction up to 40%'
    ],
    tech: ['Python', 'Flask', 'React.js', 'Firebase', 'Google Maps API', 'MongoDB'],
    challenges: 'Optimizing delivery routes in real-time and managing inventory without centralized warehouses.',
    impact: 'Reduced delivery costs by 40% and improved supply chain efficiency for small retailers.',
    gallery: [
      'assets/images/projects/dropnex/d1.png',
      'assets/images/projects/dropnex/d2.png',
      'assets/images/projects/dropnex/d3.png',
      'assets/images/projects/dropnex/d4.png',
      'assets/images/projects/dropnex/d5.png',
      'assets/images/projects/dropnex/d6.png',
      'assets/images/projects/dropnex/d7.png',
      'assets/images/projects/dropnex/d8.png',
      'assets/images/projects/dropnex/d9.png'
    ]
  },
  'fusion-circle': {
    title: 'Fusion Circle - Collaborative Project Management',
    description: `Fusion Circle is a comprehensive project management platform that enhances team collaboration and productivity through AI-powered features.`,
    features: [
      'Real-time project tracking',
      'AI-based task prioritization',
      'Team collaboration tools',
      'Progress analytics dashboard',
      '35% boost in team productivity',
      'Integrated communication system'
    ],
    tech: ['React.js', 'Flask', 'MongoDB', 'Tailwind CSS', 'Socket.IO', 'AI/ML'],
    challenges: 'Implementing real-time synchronization across multiple users and intelligent task prioritization.',
    impact: 'Increased team productivity by 35% through intelligent task management and seamless collaboration.',
    gallery: [
      'assets/images/projects/fusion-circle/IMG-20251023-WA0011.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0012.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0013.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0014.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0015.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0017.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0019.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0020.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0021.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0022.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0023.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0025.jpg',
      'assets/images/projects/fusion-circle/IMG-20251023-WA0026.jpg'
    ]
  },
  'decentralized-media': {
    title: 'Decentralized Media — Blockchain Social Platform',
    description: `A blockchain-powered, peer-to-peer social media platform where users own their data, interact freely, and earn tokens for engagement. Posts are stored on IPFS, interactions are on-chain, and community governance ensures privacy and censorship resistance. Removes central control to give users full ownership of their content.`,
    features: [
      'Decentralized media upload & storage via IPFS/Filecoin',
      'Peer-to-peer file sharing with no central server',
      'Blockchain-based content tracking & ownership',
      'Smart contracts for on-chain interactions',
      'Token rewards for user engagement',
      'Community governance & censorship resistance',
      'User privacy preservation by design',
      'Responsive Web3-enabled UI'
    ],
    tech: ['TypeScript', 'Blockchain / Web3', 'IPFS', 'Solidity', 'Vite', 'Node.js'],
    challenges: 'Ensuring true decentralization while maintaining a smooth user experience, managing IPFS content addressing, and implementing on-chain governance without performance bottlenecks.',
    impact: 'Empowers users with full content ownership and censorship resistance, redefining social media through blockchain transparency and token-based community incentives.',
    gallery: [
      'assets/images/projects/decentralized-media/dm1.png',
      'assets/images/projects/decentralized-media/dm2.jpg',
      'assets/images/projects/decentralized-media/dm3.png',
      'assets/images/projects/decentralized-media/dm4.jpg',
      'assets/images/projects/decentralized-media/dm5.png'
    ]
  },
  'footwear-qc': {
    title: 'Automated Footwear 3D Quality Control',
    description: `An advanced quality control system using 3D scanning and sensor technology to automate footwear inspection processes.`,
    features: [
      'STL file processing and visualization',
      'Sensor-based measurement system',
      'XYZ plane grid visualization',
      'Automated defect detection',
      'Real-time quality metrics',
      '3D model comparison'
    ],
    tech: ['Python', 'STL Processing', '3D Visualization', 'Sensor Integration', 'Computer Vision'],
    challenges: 'Processing large 3D models efficiently and achieving accurate measurements from sensor data.',
    impact: 'Automated quality control process, reducing manual inspection time by 60%.'
  },
  'crop-codex': {
    title: 'Crop Codex - Blockchain Contract Farming',
    description: `A blockchain-based platform for secure and transparent contract farming between farmers and buyers.`,
    features: [
      'Smart contract implementation',
      'Secure farmer-buyer agreements',
      'Encrypted negotiations',
      'Transparent transactions',
      'Dispute resolution system',
      'Payment automation'
    ],
    tech: ['Solidity', 'Ethereum', 'Python', 'Web3.js', 'React.js', 'IPFS'],
    challenges: 'Ensuring contract security and managing gas fees for blockchain transactions.',
    impact: 'Provides transparent and secure contract farming, protecting both farmers and buyers.'
  },
  'northern-lights': {
    title: 'Northern Lights Event Planners',
    description: `A comprehensive event management platform with AI-powered venue suggestions and real-time budget tracking.`,
    features: [
      'AI venue recommendations',
      'Real-time budget tracking',
      'Vendor coordination system',
      'Mood visualizer',
      'Guest management',
      'Event timeline planning'
    ],
    tech: ['React.js', 'Node.js', 'AI/ML', 'MongoDB', 'Express.js', 'Dashboard Analytics'],
    challenges: 'Integrating AI for intelligent venue suggestions and managing complex event logistics.',
    impact: 'Streamlined event planning process with intelligent recommendations and real-time tracking.'
  },
  'culina': {
    title: 'Culina — AI-Powered Recipe Discovery Platform',
    description: `Culina is a next-generation culinary intelligence platform that combines AI, data visualization, and gamification to transform how people discover and explore world cuisines. It features an interactive world cuisine map, conversational AI chatbot, and innovative tools like the Fusion Lab and Molecular Oracle.`,
    features: [
      '🌍 Interactive World Map — explore recipes by country and cuisine',
      '🤖 AI ChatBot — personalized recipe recommendations via natural language',
      '🎲 Recipe Roulette — discover random recipes across cuisines',
      '🔬 Molecular Oracle — analyze ingredient compatibility and flavor science',
      '🧪 Fusion Lab — combine recipes to create unique fusion dishes',
      '📊 Flavor Radar — D3.js-powered visualization of recipe characteristics',
      '⏱️ Cook Time Dial — filter recipes by preparation time',
      '🎯 Chef Quest — gamified cooking challenges and achievements'
    ],
    tech: ['React 19', 'FastAPI', 'D3.js', 'Python 3.12', 'SQLAlchemy', 'SQLite', 'CSS3 Animations'],
    challenges: 'Building a cohesive multi-feature platform with real-time AI recommendations, complex D3.js visualizations, and maintaining a smooth UX across vastly different feature modules.',
    impact: 'Delivers an immersive culinary exploration experience, merging AI intelligence with interactive data visualization to make recipe discovery engaging, educational, and fun.',
    gallery: [
      'assets/images/projects/culina/cu1.png',
      'assets/images/projects/culina/cu2.png',
      'assets/images/projects/culina/cu3.png',
      'assets/images/projects/culina/cu4.png',
      'assets/images/projects/culina/cu5.png',
      'assets/images/projects/culina/cu6.png',
      'assets/images/projects/culina/cu7.png',
      'assets/images/projects/culina/cu8.png',
      'assets/images/projects/culina/cu9.png',
      'assets/images/projects/culina/cu10.png',
      'assets/images/projects/culina/cu11.png',
      'assets/images/projects/culina/cu12.png',
      'assets/images/projects/culina/cu13.png'
    ]
  },
  'whatsapp-clone': {
    title: 'WhatsApp Clone — Real-Time Messaging App',
    description: `A full-featured WhatsApp-inspired messaging application currently in development. Built with a modern full-stack architecture, it replicates core WhatsApp functionalities including real-time one-on-one and group messaging, media sharing, status updates, and user authentication — with a clean mobile-first UI.`,
    features: [
      'Real-time one-on-one and group messaging via Socket.IO',
      'Media sharing — images, videos, documents',
      'WhatsApp-style status updates',
      'User authentication with Firebase Auth',
      'Message read receipts and online presence indicators',
      'End-to-end message delivery tracking',
      'Mobile-first responsive UI',
      'Push notifications for new messages'
    ],
    tech: ['React.js', 'Node.js', 'Socket.IO', 'Firebase', 'Express.js', 'MongoDB'],
    challenges: 'Implementing real-time bi-directional communication at scale, managing concurrent socket connections, and replicating WhatsApp-level UX fidelity.',
    impact: 'Demonstrates mastery of full-stack real-time systems, WebSocket architecture, and Firebase integration — currently under active development.'
  }
};

import {
  PersonalInfo,
  SkillCategory,
  ExperienceRole,
  ProjectItem,
  PatentItem,
  CertificationItem,
  EducationItem,
  AchievementItem,
} from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Himanshu Kumar",
  title: "Software Engineer / Team SME",
  headline: "Building Secure, Scalable Digital Banking Systems & High-Throughput Event Architectures",
  location: "Kolkata, India",
  email: "tohimanshumail@gmail.com",
  linkedin: "https://www.linkedin.com/in/himanshumauri/",
  github: "https://github.com/maurihimanshu",
  summary:
    "Software Engineer with 4+ years of experience delivering secure, scalable, and customer-focused digital banking solutions. Proven ownership across Agile SDLC, production support, software reliability, secure engineering, code quality, and continuous improvement. Currently serving as a Team SME—providing technical guidance, architecture design inputs, code review governance, and knowledge-transfer sessions, while consistently earning 5/5 manager ratings for 3 consecutive years.",
  yearsOfExperience: "4+ Years",
  managerRating: "5/5 Rating (3 Yrs)",
  teamsImpacted: "20+ Teams",
  availability: "Open to High-Impact Opportunities",
};

export const metricsData = [
  { label: "Years Experience", value: "4+", detail: "Enterprise Java & Full Stack" },
  { label: "Consecutive Manager Rating", value: "5/5", detail: "Top Tier Performance (3 Yrs)" },
  { label: "Engineering Teams Impacted", value: "20+", detail: "Reusable SDKs & Libraries" },
  { label: "Granted Patents", value: "2", detail: "Autonomous Systems & Alerting" },
  { label: "Code Coverage Standard", value: "80%+", detail: "SonarQube & Quality Gates" },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Distributed Systems",
    iconName: "Server",
    description: "High-performance microservices, reactive streams, and resilient APIs",
    skills: [
      { name: "Core Java", level: "Expert", tags: ["Java 17+", "Concurrency", "OOP", "Generics"] },
      { name: "Spring Boot", level: "Expert", tags: ["Spring Cloud", "Spring MVC", "Security"] },
      { name: "Microservices", level: "Expert", tags: ["Domain Driven Design", "Service Mesh"] },
      { name: "REST APIs & WebClient", level: "Expert", tags: ["Reactive", "Non-blocking HTTP", "Resilience4j"] },
      { name: "Apache Kafka", level: "Expert", tags: ["Event-Driven", "Header Filtering", "Partitioning"] },
      { name: "JPA / Hibernate", level: "Advanced", tags: ["ORM", "Query Tuning", "Transactions"] },
      { name: "System Design", level: "Advanced", tags: ["High Availability", "Distributed Caching", "Failover"] },
      { name: "Design Patterns", level: "Expert", tags: ["Factory", "Observer", "Strategy", "Circuit Breaker"] },
      { name: "Data Structures & Algorithms", level: "Advanced", tags: ["Optimal Complexity", "Problem Solving"] },
    ],
  },
  {
    title: "Cloud, DevOps & SRE",
    iconName: "Cloud",
    description: "Cloud-native deployments, container orchestration, and production observability",
    skills: [
      { name: "Amazon Web Services (AWS)", level: "Advanced", tags: ["EC2", "ECS", "S3", "IAM", "VPC"] },
      { name: "Docker & Containers", level: "Expert", tags: ["Multi-stage builds", "Image Optimization"] },
      { name: "Kubernetes (K8s)", level: "Advanced", tags: ["Pods", "Ingress", "ConfigMaps", "Rancher"] },
      { name: "GitLab CI/CD & Jenkins", level: "Expert", tags: ["Automated Pipelines", "Quality Gates"] },
      { name: "Maven", level: "Expert", tags: ["Dependency Management", "Multi-module builds"] },
      { name: "Splunk & Kibana", level: "Expert", tags: ["Log Aggregation", "Telemetry", "RCA Dashboards"] },
      { name: "SonarQube & Code Scanning", level: "Expert", tags: ["Static Analysis", "SAST", "Vulnerabilities"] },
      { name: "SRE Practices", level: "Advanced", tags: ["SLIs/SLOs", "Reliability", "Zero-downtime"] },
    ],
  },
  {
    title: "Full Stack & Frontend",
    iconName: "Layout",
    description: "Modern, type-safe interactive web interfaces for enterprise banking portals",
    skills: [
      { name: "React", level: "Advanced", tags: ["Hooks", "Context", "Performance", "Component Architecture"] },
      { name: "TypeScript", level: "Advanced", tags: ["Strict Typing", "Generics", "Interfaces"] },
      { name: "JavaScript (ES6+)", level: "Expert", tags: ["Async/Await", "Event Loop", "Closures"] },
      { name: "HTML5 & Modern CSS", level: "Proficient", tags: ["Responsive", "Tailwind CSS", "Accessibility"] },
      { name: "State Management", level: "Advanced", tags: ["React State", "Context API", "Modular Stores"] },
    ],
  },
  {
    title: "Databases & Storage",
    iconName: "Database",
    description: "Relational persistence and high-speed document storage",
    skills: [
      { name: "Oracle SQL", level: "Advanced", tags: ["Complex Queries", "Indexing", "Performance Tuning"] },
      { name: "MongoDB", level: "Advanced", tags: ["Document Modeling", "Aggregation Pipelines", "Indexing"] },
      { name: "Database Transactions", level: "Advanced", tags: ["ACID", "Isolation Levels", "Connection Pooling"] },
    ],
  },
  {
    title: "Testing, Quality & Compliance",
    iconName: "ShieldCheck",
    description: "Rigorous automation frameworks ensuring zero-regression banking releases",
    skills: [
      { name: "JUnit 5 & Mockito", level: "Expert", tags: ["Unit Tests", "Mocking", "Parameterization"] },
      { name: "Parasoft Jtest", level: "Advanced", tags: ["Enterprise Static Code Analysis", "Rule Sets"] },
      { name: "Postman & Newman", level: "Expert", tags: ["API Automation", "Contract Testing", "CI Hooks"] },
      { name: "Secure Coding", level: "Expert", tags: ["OWASP Top 10", "Input Validation", "Data Masking"] },
      { name: "Root-Cause Analysis (RCA)", level: "Expert", tags: ["Incident Forensics", "Post-mortems"] },
    ],
  },
];

export const experienceData: ExperienceRole[] = [
  {
    title: "Associate / Software Engineer / Team SME",
    company: "Cognizant Technology Solutions",
    period: "July 2022 – Present (4+ Years)",
    location: "Kolkata, India",
    type: "Full-Time",
    highlights: [
      "Own full lifecycle analysis, architecture design, development, unit/integration testing, containerized deployment, and Level-3 production support for Java Spring Boot microservices powering core digital banking workflows.",
      "Build production-grade, highly testable services for account opening, customer identity & KYC validations, eligibility scoring, workflow orchestration, and financial partner API integrations.",
      "Serve as official Team SME for backend microservices, validation engines, Kafka event processing, and customer onboarding flows—leading knowledge-transfer (KT) workshops, technical reviews, and secure architecture inputs.",
      "Engineered shared libraries, WebClient integration resilience patterns, fallback logic, and reusable SDKs adopted across 20+ enterprise product engineering teams.",
      "Optimized Kafka event streaming architecture by introducing header-based filtering, application-aware routing, and fine-tuned dispatcher-listener lifecycles to prevent partition starvation and message latency spikes.",
      "Enforced rigorous quality and regulatory compliance through JUnit 5, Mockito, Jtest, Postman/Newman CI automation, SonarQube quality gates, and maintained >80% test coverage standards.",
      "Consistently achieved 5/5 manager performance rating over 3 consecutive years for technical leadership, delivery excellence, and cross-functional team enablement.",
    ],
    achievements: [
      "3 Consecutive Years 5/5 Performance Rating",
      "SME for 20+ Product Engineering Teams",
      "Zero-downtime Kafka Event Pipeline Optimizations",
      "Maintained 80%+ CI/CD Code Coverage Standards",
    ],
    technologies: [
      "Core Java",
      "Spring Boot",
      "Microservices",
      "Apache Kafka",
      "WebClient",
      "AWS",
      "Kubernetes",
      "Docker",
      "React",
      "TypeScript",
      "Oracle SQL",
      "MongoDB",
      "Kibana",
      "Splunk",
    ],
    metrics: [
      { label: "Adoption", value: "20+ Teams" },
      { label: "Manager Rating", value: "5/5 (3 Yrs)" },
      { label: "Code Coverage", value: ">80%" },
      { label: "Kafka Optimization", value: "Zero-Lag" },
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "digital-banking-platform",
    title: "Scalable Digital Banking Backend Platform",
    subtitle: "High-Throughput Financial Microservices & Resilient Onboarding Ecosystem",
    description:
      "Engineered full-stack and backend capabilities for digital banking workflows supporting millions of financial customer interactions. Designed secure account opening pipelines, customer KYC eligibility verification, workflow orchestration engines, and high-frequency partner integrations.",
    category: "Banking Platform",
    featured: true,
    architectureHighlights: [
      "Decomposed monolithic legacy endpoints into modular Spring Boot microservices orchestrated via Kubernetes pods.",
      "Implemented reactive WebClient patterns with circuit breakers (Resilience4j) and fallback mechanisms to ensure 99.99% availability during downstream gateway latency.",
      "Standardized multi-tenant data validation rules across account creation and customer verification pipelines.",
      "Integrated Splunk and Kibana APM tracing with correlation IDs for end-to-end transaction observability and rapid root-cause analysis.",
    ],
    keyOutcomes: [
      "Empowered seamless, sub-second response times for customer onboarding and eligibility evaluations.",
      "Eliminated single points of failure across critical financial transaction workflows.",
      "Standardized security compliance against OWASP and financial data protection benchmarks.",
    ],
    technologies: [
      "Core Java",
      "Spring Boot",
      "Microservices",
      "React",
      "TypeScript",
      "WebClient",
      "Oracle SQL",
      "Docker",
      "Kubernetes",
      "Kibana",
      "Splunk",
    ],
    metrics: [
      { label: "Availability", value: "99.99%" },
      { label: "Throughput", value: "Multi-million reqs/day" },
      { label: "Teams Reusing", value: "20+ Teams" },
    ],
    docsId: "banking-platform",
  },
  {
    id: "kafka-event-streaming",
    title: "Optimized Kafka Event Processing Hub",
    subtitle: "Application-Aware Routing, Header-Based Filtering & Dispatcher Optimization",
    description:
      "Architected an event-driven messaging solution addressing critical message lag and consumer bottleneck challenges across banking event topics. Formulated advanced filtering and consumer lifecycle orchestration.",
    category: "Event Streaming",
    featured: true,
    architectureHighlights: [
      "Designed header-based event routing to eliminate unnecessary deserialization of non-target messages, slashing CPU utilization on downstream consumer pods.",
      "Tuned partition allocation strategies and consumer concurrency thresholds to maximize I/O throughput.",
      "Implemented resilient dead-letter-queue (DLQ) automated replay patterns with exponential backoff for transient network glitches.",
      "Built telemetry metrics dashboards in Kibana and Splunk tracking producer rate, lag delta, and listener health.",
    ],
    keyOutcomes: [
      "Reduced consumer lag to near-zero even during peak transaction volume bursts.",
      "Drastically improved message traceability across microservice boundaries using unified event headers.",
    ],
    technologies: ["Apache Kafka", "Java Spring Boot", "Docker", "Kubernetes", "Splunk", "Kibana", "JUnit 5"],
    metrics: [
      { label: "Lag Reduction", value: "~90%" },
      { label: "Processing", value: "Real-time" },
      { label: "Fault Recovery", value: "Automated DLQ" },
    ],
    docsId: "kafka-streaming",
  },
  {
    id: "enterprise-banking-sdk",
    title: "Enterprise Shared Platform Libraries & Reusable SDKs",
    subtitle: "Common Service Utilities, WebClient Integrations & Validation Frameworks",
    description:
      "Formulated and published unified internal SDKs and cross-cutting libraries serving as the foundational building blocks for 20+ product development teams across the enterprise banking organization.",
    category: "Enterprise SDK",
    featured: true,
    architectureHighlights: [
      "Architected standardized WebClient client adapters with built-in retry policies, SSL handshakes, and metric logging interceptors.",
      "Created plug-and-play validation starter dependencies providing customizable bean validation for complex financial payloads.",
      "Streamlined CI/CD dependency management with Maven multi-module archetypes and version governance.",
      "Authored comprehensive documentation and conducted team KT sessions for frictionless adoption.",
    ],
    keyOutcomes: [
      "Accelerated time-to-market for new microservice features by 35% across 20+ teams.",
      "Standardized error handling payloads, preventing security leakage and inconsistencies across client-facing apps.",
    ],
    technologies: ["Core Java", "Spring Boot", "Maven", "SonarQube", "JUnit 5", "GitLab CI/CD"],
    metrics: [
      { label: "Adoption", value: "20+ Product Teams" },
      { label: "Dev Velocity", value: "+35% Faster Setup" },
      { label: "Coverage", value: "85%+ Test Suite" },
    ],
    docsId: "enterprise-sdk",
  },
  {
    id: "expenso-android",
    title: "Expenso — Offline Android Finance Manager",
    subtitle: "Clean Architecture MVVM, SQLCipher Encryption & Biometric Hardware Security",
    description:
      "A comprehensive, 100% offline personal finance management application published on Google Play. Built with Clean Architecture (MVVM), SQLCipher-encrypted Room database, Android Keystore AES-256-GCM ciphering, BiometricPrompt authentication, and Material Design 3 adaptive theming.",
    category: "Personal Projects",
    featured: true,
    architectureHighlights: [
      "Structured in Clean Architecture separating Presentation (MVVM LiveData), Domain (Use Cases), and Data (SQLCipher Encrypted Room).",
      "Enforced multi-layer security with hardware-backed Android Keystore AES-256-GCM and full database encryption.",
      "Embedded BiometricPrompt and PIN fallback with tamper/root protection mechanisms.",
      "Engineered 100% offline-first operation with local JSON backup/restore and zero cloud telemetry.",
    ],
    keyOutcomes: [
      "Live and actively published on Google Play Store with 100% offline user data sovereignty.",
      "Achieved sub-millisecond local query performance using indexed SQLCipher Room DAO operations.",
      "Implemented comprehensive Material 3 UI with adaptive dark/light palette switching.",
    ],
    technologies: [
      "Java 17",
      "Android SDK",
      "SQLCipher",
      "Room DB",
      "MVVM",
      "Clean Architecture",
      "Material Design 3",
      "Biometrics",
      "LiveData",
    ],
    metrics: [
      { label: "Distribution", value: "Google Play" },
      { label: "Privacy", value: "100% Offline" },
      { label: "Encryption", value: "AES-256-GCM" },
    ],
    githubUrl: "https://github.com/maurihimanshu/expenso-docs",
    liveUrl: "https://play.google.com/store/apps/details?id=com.offline.expenso",
    docsId: "expenso-android",
  },
  {
    id: "ai-work-assistant",
    title: "AI Work Assistant",
    subtitle: "Privacy-Focused Desktop Productivity & Local Machine Learning Engine",
    description:
      "A privacy-first cross-platform desktop application that monitors user work activities in real time, analyzes productivity patterns using offline machine learning, and generates context-aware task recommendations with local encrypted data storage.",
    category: "Personal Projects",
    featured: true,
    architectureHighlights: [
      "Constructed an event-driven background activity monitor capturing application window focus, input velocity, and session state.",
      "Trained offline machine learning models for automated activity classification and focus scoring without cloud API dependencies.",
      "Secured all activity logs and analytics using local encrypted storage (SQLite + AES) for zero-leakage privacy.",
      "Built a modular desktop GUI with PyQt6 providing interactive productivity heatmaps and smart suggestion feeds.",
    ],
    keyOutcomes: [
      "Operates 100% offline ensuring user work telemetry and window titles never leave the local machine.",
      "Supports cross-platform environments seamlessly across Windows, Linux, and macOS.",
      "Delivered intelligent heuristic task prioritization increasing workday focus efficiency.",
    ],
    technologies: [
      "Python",
      "PyQt6",
      "Machine Learning",
      "Scikit-Learn",
      "SQLite",
      "Local Encryption",
      "Cross-Platform",
    ],
    metrics: [
      { label: "Privacy", value: "100% Offline" },
      { label: "OS Support", value: "Win / Mac / Linux" },
      { label: "Inference", value: "Local ML" },
    ],
    githubUrl: "https://github.com/maurihimanshu/ai_work_assistant",
    docsId: "ai-work-assistant",
  },
  {
    id: "reliable-qr-file-transfer",
    title: "Reliable Air-Gapped QR File Transfer",
    subtitle: "Continuous Optical Stream Protocol with Cryptographic Checksum Validation",
    description:
      "An innovative optical file transfer system enabling reliable, bidirectional air-gapped data transmission across physically isolated computers using sequenced, compressed QR code frame streams and SHA-256 cryptographic verification.",
    category: "Personal Projects",
    featured: true,
    architectureHighlights: [
      "Designed an optical packet protocol wrapping payloads into sequenced JSON frames (['RQFT', 1, frameType, transferId, frame]).",
      "Engineered multi-round repeated chunk streaming directly overcoming frame drops in camera-based receivers.",
      "Integrated end-to-end byte stream compression and SHA-256 cryptographic manifest verification before file reassembly.",
      "Built a zero-dependency static web interface in React & TypeScript deployable in air-gapped environments without CDN access.",
    ],
    keyOutcomes: [
      "Achieved verified file transfer across physical air gaps without USB flash drives, Bluetooth, or WiFi.",
      "Guaranteed zero data corruption via mandatory SHA-256 manifest cryptographic checks.",
      "Deployable completely offline as a self-contained static distribution.",
    ],
    technologies: [
      "React 18",
      "TypeScript",
      "Vite",
      "Optical QR Protocol",
      "SHA-256",
      "Stream Compression",
      "Air-Gapped Security",
    ],
    metrics: [
      { label: "Air-Gapped", value: "Zero Network" },
      { label: "Integrity", value: "SHA-256 Verified" },
      { label: "Speed", value: "140–200ms/QR" },
    ],
    githubUrl: "https://github.com/maurihimanshu/Reliable-QR-File-Transfer",
    docsId: "qr-file-transfer",
  },
];

export const patentsData: PatentItem[] = [
  {
    id: "patent-fall-prevention",
    title: "Fall Prevention System",
    patentNumber: "Patent No. 202011012664",
    status: "Published / Granted",
    domain: "IoT, Embedded Sensors & Autonomous Safety Systems",
    summary:
      "An intelligent, sensor-driven safety system designed to detect imminent loss of balance and body posture anomalies in real time, triggering proactive mechanical and alerting mechanisms to prevent human injury before impact occurs.",
    keyInnovations: [
      "Real-time sensor fusion analyzing multi-axis acceleration and gyro telemetry.",
      "Predictive anomaly detection algorithms operating with ultra-low latency.",
      "Rapid-response actuation framework for proactive physical stabilization.",
    ],
    link: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus",
  },
  {
    id: "patent-surveillance-alert",
    title: "Surveillance and Alert System",
    patentNumber: "Patent No. 202111014541",
    status: "Published / Granted",
    domain: "Automated Surveillance, Computer Vision & Edge Alerting",
    summary:
      "A smart surveillance architecture incorporating edge intelligence, automated security threat detection, and real-time notification dispatching to designated response units upon perimeter breaches or suspicious activity.",
    keyInnovations: [
      "Multi-zone threat analysis with automated event classification.",
      "Edge-to-cloud telemetry sync minimizing false-positive emergency alerts.",
      "Instantaneous multi-channel dispatch protocol (audio visual, cellular, webhook triggers).",
    ],
    link: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus",
  },
];

export const certificationsData: CertificationItem[] = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services (AWS)",
    code: "AWS-DVA",
    badgeColor: "from-amber-500 to-orange-600",
    skillsVerified: ["AWS Lambda", "ECS", "IAM", "DynamoDB", "S3", "API Gateway", "CloudFormation", "DevOps"],
    link: "https://www.credly.com/badges/2f2f6010-85ec-4b3a-b242-e8a8244253fc/public_url",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    code: "AWS-CCP",
    badgeColor: "from-orange-500 to-amber-600",
    skillsVerified: ["Cloud Concepts", "AWS Core Services", "Security & Compliance", "Cloud Economics"],
    link: "https://www.credly.com/go/IK94htfisaj9MAz0hkDGjA",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
    badgeColor: "from-blue-500 to-sky-600",
    skillsVerified: ["Cloud Concepts", "Azure Architecture", "Azure Services", "Security, Privacy & Compliance"],
    link: "https://learn.microsoft.com/api/credentials/share/en-us/himanshumauri/7A2201D78B514738?sharingId",
  },
  {
    name: "GitHub Copilot Certification",
    issuer: "GitHub / Microsoft",
    code: "GH-COPILOT",
    badgeColor: "from-purple-500 to-indigo-600",
    skillsVerified: ["AI-Assisted Engineering", "Prompt Engineering", "Test Generation", "Secure Code Synthesis"],
    link: "https://www.credly.com/badges/8df4d902-1b31-435a-92bd-6e97b5d2be58/public_url",
  },
];

export const educationData: EducationItem = {
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Science & Engineering",
  institution: "I.K. Gujral Punjab Technical University",
  period: "2018 – 2022",
  location: "Punjab, India",
  highlights: [
    "Core focus on Algorithms, Distributed Systems, Database Management, and Object-Oriented Engineering.",
    "Authored 2 Intellectual Property Patents filed and published during academic and early research tenure.",
    "Led technical club initiatives and hackathon engineering projects.",
  ],
};

export const achievementsData: AchievementItem[] = [
  {
    title: "5/5 Manager Rating for 3 Consecutive Years",
    description: "Consistently recognized as a top-tier performer at Cognizant, delivering mission-critical digital banking software.",
    metric: "100% Score",
    icon: "Award",
  },
  {
    title: "Recognized as Team Subject Matter Expert (SME)",
    description: "Go-to technical leader for Spring Boot microservices, Kafka event streaming architectures, and validation logic.",
    metric: "20+ Teams",
    icon: "Users",
  },
  {
    title: "Dual Intellectual Property Patents",
    description: "Invented patented solutions for Fall Prevention and Smart Surveillance & Automated Alerting.",
    metric: "2 Patents",
    icon: "Lightbulb",
  },
  {
    title: "Quality Gate & SonarQube Champion",
    description: "Instituted strict 80%+ code coverage standards and automated vulnerability scans across deployment pipelines.",
    metric: "80%+ Coverage",
    icon: "Shield",
  },
];

/**
 * Portfolio Data
 * Extracted directly from SWAMY.pdf
 * All details are factual and correspond strictly to the resume.
 */

export const personalInfo = {
  name: "Swamy R",
  role: "Full Stack Developer",
  headline: "Full Stack Developer | React.js • Python • FastAPI • PostgreSQL",
  location: "Bengaluru, India",
  phone: "+91-90197 40523",
  email: "swamiaws85@gmail.com",
  linkedin: "https://linkedin.com/in/swamy-r",
  linkedinUsername: "swamy-r",
  resumePath: "/SWAMY.pdf",
  yearsOfExperience: "2+ years",
  summary:
    "Full Stack Developer with 2+ years of hands-on experience building production-grade React.js applications and FastAPI/PostgreSQL backends for real-time industrial monitoring systems, enterprise dashboards, and RFID-based tracking software. Skilled in configuration-driven UI architecture, REST API design, WebSockets, TypeScript, role-based access control, and end-to-end deployment using Docker and CI/CD. Proven ability to independently own modules from requirement analysis through production deployment, and to collaborate closely with engineers and scientists to deliver reliable, scalable software."
};

export const coreSkills = {
  languages: [
    { name: "Python", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Proficient" }
  ],
  frontend: [
    "React.js",
    "Vue.js",
    "Vite",
    "Ant Design",
    "Tailwind CSS",
    "HTML5",
    "CSS3"
  ],
  backend: [
    "FastAPI",
    "Flask",
    "Node.js",
    "REST APIs",
    "WebSockets",
    "JWT Authentication",
    "SQLAlchemy",
    "Alembic",
    "Pytest"
  ],
  databasesAndStorage: [
    "PostgreSQL",
    "MongoDB",
    "MinIO"
  ],
  aiAndLlm: [
    "Ollama",
    "Qwen 2.5",
    "Llama 3",
    "RAG (Retrieval-Augmented Generation)",
    "Local/Private LLM Deployment",
    "Prompt Engineering"
  ],
  visualizationAndReporting: [
    "Recharts",
    "Plotly",
    "Chart.js",
    "jsPDF"
  ],
  cloudAndIntegrations: [
    "Supabase",
    "Cloudinary",
    "OneSignal",
    "RFID Systems"
  ],
  devOpsAndTools: [
    "Git",
    "Docker",
    "CI/CD",
    "Linux"
  ],
  coreConcepts: [
    "Configuration Management",
    "Real-time Data Handling",
    "Role-Based Access Control (RBAC)",
    "API Integration",
    "Predictive Maintenance"
  ]
};

export const professionalExperience = [
  {
    id: "cmti",
    role: "Project Associate (Software Developer)",
    organization: "CMTI (Central Manufacturing Technology Institute)",
    location: "Bengaluru, India",
    period: "Sep 2024 – Present",
    current: true,
    description:
      "Working directly with senior engineers and scientists to architect, develop, and maintain industrial software, condition monitoring dashboards, private LLM pipelines, and enterprise management tools.",
    highlights: [
      {
        title: "Condition Monitoring & Vibration Analysis",
        detail:
          "Developed frontend and backend of Condition Monitoring & Vibration Analysis application (React.js, Python/FastAPI) integrated with OROS DAQ and NV Gate hardware, supporting acceleration, velocity, displacement, FFT and RMS analysis for fault detection (misalignment, cage defects, inner/outer race bearing defects)."
      },
      {
        title: "NIAMT Smart Manufacturing Dashboard",
        detail:
          "Built and enhanced the NIAMT Smart Manufacturing Dashboard (React.js, FastAPI, PostgreSQL) to monitor temperature, energy, pressure and level parameters in real time, with automated email/message alerts on threshold breaches for NIAMT machines."
      },
      {
        title: "Machine-Hour Maintenance & Job Planning System",
        detail:
          "Designed and independently deployed a Machine-Hour Maintenance & Job Planning system for SMMDC covering 7 machines, with role-based workflows across 3 roles (Admin, Supervisor, Operator), machine/job-hour cost reporting, tracking of active jobs and machine usage, and PDF/CSV export."
      },
      {
        title: "Manpower Scheduling & Mapping Platform",
        detail:
          "Developed a Manpower Scheduling & Mapping application for service allocation, availability checks and cost generation across Advanced Material Characterization teams, allowing manpower users to view scheduled jobs and add remarks after service completion."
      },
      {
        title: "Enterprise Project Planning & Management (PPM) Platform",
        detail:
          "Contributed core modules to an enterprise Project Planning & Management (PPM) platform (React, Vite, Ant Design, Tailwind CSS, FastAPI, SQLAlchemy, PostgreSQL, Alembic, MinIO) covering proposals, milestones, payments, documents, communication and analytics, with JWT-secured role-based access for 6 user roles (Admin, Group Head, Centre Head, Scientist, Director, Guest) serving 40+ users, including 30 scientists, 10 admins and 1 director; containerized and deployed with Docker for active production use."
      },
      {
        title: "Local Private LLM Pipeline & RAG Context Engine",
        detail:
          "Designed and deployed a local, private LLM pipeline using Ollama (Qwen 2.5 / Llama 3) integrated into FastAPI for enterprise proposal intelligence and automated documentation within the PPM platform. Engineered a RAG-style Context Engine (ContextBuilder) that aggregates live relational database context (financials, remarks, customer data, and milestones) to inject structured ground truth into LLM prompts."
      },
      {
        title: "CMF Vibration Monitoring System",
        detail:
          "Building the live and historical vibration-monitoring dashboard for the ongoing CMF Vibration Monitoring System as part of a team, enabling machine defect analysis for engineering teams."
      },
      {
        title: "Maintenance & Welding-Defect Analysis",
        detail:
          "Provide ongoing application maintenance and support for the SMMDC E-Forecast Maintenance system, and support welding-defect analysis through image annotation of defects such as porosity and displacement."
      },
      {
        title: "DevOps & CI/CD Containerization",
        detail:
          "Configured CI/CD pipelines in Git and containerized services with Docker, automating testing and deployment across multiple applications; partnered with senior engineers and scientists to debug, optimize and stabilize configuration-driven workflows, improving overall system reliability and performance."
      }
    ]
  }
];

export const projects = [
  {
    id: "vibration-monitoring",
    title: "Vibration Monitoring System",
    category: "Industrial IoT & Real-time Analytics",
    techStack: ["Python", "React.js", "FastAPI", "PostgreSQL", "WebSockets", "Recharts"],
    filterTags: ["All", "Full Stack", "Python & FastAPI", "React", "Real-time & IoT"],
    description:
      "Built application modules for real-time vibration data processing and visualization; validated and optimized backend logic to ensure stable, accurate data handling.",
    highlights: [
      "Integrated with high-frequency DAQ telemetry for real-time acceleration, velocity, and displacement measurements.",
      "Engineered FFT (Fast Fourier Transform) and RMS signal visualization using WebSockets and Recharts.",
      "Optimized backend FastAPI endpoints and PostgreSQL schemas for low-latency streaming."
    ],
    featured: true
  },
  {
    id: "smart-workshop-dashboard",
    title: "Smart Workshop Dashboard",
    category: "Full Stack Dashboard",
    techStack: ["MERN Stack", "WebSockets", "JWT", "Plotly"],
    filterTags: ["All", "Full Stack", "React", "Real-time & IoT"],
    description:
      "Designed and built role-based, configurable dashboard features using full-stack technologies; integrated backend services and APIs to support automation and real-time updates.",
    highlights: [
      "Configurable widget-based dashboard layout tailored for workshop engineers and operators.",
      "Secured with JWT-based authentication and role-specific views.",
      "Real-time sensor parameter streams displayed via interactive Plotly visual charts."
    ],
    featured: true
  },
  {
    id: "maintenance-tracking-system",
    title: "Maintenance Tracking System",
    category: "Enterprise System",
    techStack: ["PERN Stack", "PostgreSQL", "Express", "React", "Node.js", "jsPDF", "Chart.js"],
    filterTags: ["All", "Full Stack", "React", "Enterprise"],
    description:
      "Delivered end-to-end application workflows from requirement analysis to deployment; improved reporting accuracy by strengthening data validation and backend processing.",
    highlights: [
      "Automated preventative maintenance scheduling and machine service logging.",
      "Client-side and server-side PDF audit report generation using jsPDF.",
      "Normalized PostgreSQL relational schema with data validation guards."
    ],
    featured: false
  },
  {
    id: "rfid-file-tracking",
    title: "RFID-Based File Tracking System",
    category: "Hardware & IoT Integration",
    techStack: ["TypeScript", "FastAPI", "Python", "RFID Systems"],
    filterTags: ["All", "Python & FastAPI", "Real-time & IoT"],
    description:
      "Developed software to track physical files using RFID, identifying the real-time location of each file; built the backend with FastAPI and a type-safe frontend with TypeScript for reliable location tracking.",
    highlights: [
      "Interfaced with RFID hardware readers to log physical file movements across enterprise zones.",
      "Built type-safe frontend interfaces in TypeScript for real-time spatial lookup.",
      "High-performance FastAPI async endpoints for high-throughput tag scanning events."
    ],
    featured: true
  },
  {
    id: "kls-mart",
    title: "KLS Mart — Gold Collection & Gold Chitti Platform",
    category: "Independent Full Stack Web Application",
    techStack: ["React.js", "FastAPI", "Supabase", "Cloudinary", "OneSignal"],
    filterTags: ["All", "Full Stack", "Python & FastAPI", "React"],
    description:
      "Developed a full-stack website for KLS Mart to manage gold collection and gold chitti (chit fund) operations end to end. Used Supabase and Cloudinary for scalable data and image storage, and OneSignal for real-time push notifications; built a responsive frontend and backend APIs to support complete business workflows.",
    highlights: [
      "End-to-end ledger accounting and installment tracking for gold chit fund operations.",
      "Supabase integration for secure storage and Cloudinary for KYC document image pipelines.",
      "Automated push notifications via OneSignal for payment reminders and receipts."
    ],
    featured: true
  }
];

export const education = [
  {
    degree: "Bachelor of Engineering, Computer Science and Engineering",
    institution: "RajaRajeswari College of Engineering",
    location: "Bengaluru, India",
    period: "Dec 2020 – Jul 2024",
    grade: "7.61 CGPA",
    cgpa: "7.61",
    scale: "10.0",
    equivalent: "First Class"
  }
];

export const certifications = []; // No certifications explicitly listed on resume

export const additionalStrengths = [
  "Comfortable owning a module end-to-end — from requirement analysis and API design through frontend implementation, testing, containerization and production deployment.",
  "Experienced working directly with senior engineers and scientists to translate real-world industrial requirements (sensor data, machine parameters, RFID hardware) into reliable software."
];

/**
 * Key highlights curated for Software Developer / Full Stack Job Applications
 */
export const keyHighlights = [
  {
    metric: "2+ Years",
    label: "Hands-on Experience",
    subtext: "Production-grade React & FastAPI systems"
  },
  {
    metric: "40+ Users",
    label: "Enterprise Scale",
    subtext: "Scientists, admins & directors on live PPM system"
  },
  {
    metric: "Real-time",
    label: "Telemetry & WebSockets",
    subtext: "Vibration FFT/RMS analysis & industrial sensors"
  },
  {
    metric: "Local AI & RAG",
    label: "LLM Engineering",
    subtext: "Ollama Qwen/Llama with ContextBuilder database grounding"
  }
];

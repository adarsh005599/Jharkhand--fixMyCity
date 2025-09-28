A civic-tech platform that empowers citizens to report and track city issues such as potholes, streetlights, waste management, water supply, and more — connecting citizens directly with local authorities for faster, transparent, and collaborative problem-solving.

Features

📌 Easy Complaint Reporting – Citizens can upload photos/videos with geolocation.

🗂️ Complaint Tracking – Track issue status from submission to resolution.

🏢 Authority Dashboard – Local authorities can view, assign, and resolve complaints.

🌐 Multi-language Support – Supports English, Hindi (and extendable to other Indian languages).

📊 Data Insights – Analytics on complaint categories for better city planning.

🔒 Secure Login – Firebase authentication for citizens and officials.

📂 Project Structure

├── fix-my-city/          # Main application code (modules & logic)
├── functions/            # Firebase Cloud Functions (backend logic & APIs)
├── public/               # Static assets (images, icons, manifest, etc.)
├── src/                  # React frontend source code (components, pages, utils)
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages (Home, Dashboard, Reports, etc.)
│   ├── context/          # Context providers (Auth, Theme, etc.)
│   └── App.jsx           # Root application file
│
├── firestore.rules        # Firestore database security rules
├── firestore.indexes.json # Firestore indexing configuration
├── Footer.jsx             # Footer UI component
│
├── tailwind.config.js     # TailwindCSS configuration
├── vite.config.js         # Vite build & project configuration
├── package.json           # Dependencies & scripts
└── README.md              # Project documentation


Tech Stack

Frontend: React + Vite + TailwindCSS

Backend: Firebase Functions

Database: Firebase Firestore

Authentication: Firebase Auth

Hosting: Firebase Hosting || vercel || render

git clone https://github.com/adarsh005599/jharkhand--fixMyCity.git
cd fix-my-city

npm install
npm run dev
firebase deploy

Scaling Vision

✅ Currently built for Jharkhand

🔜 Extendable to Delhi NCR or Pan-India with multilingual support & state-specific authority mapping.

This project is licensed under the MIT License.

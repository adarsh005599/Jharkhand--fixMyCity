A civic-tech platform that empowers citizens to report and track city issues such as potholes, streetlights, waste management, water supply, and more — connecting citizens directly with local authorities for faster, transparent, and collaborative problem-solving.

Features

📌 Easy Complaint Reporting – Citizens can upload photos/videos with geolocation.

🗂️ Complaint Tracking – Track issue status from submission to resolution.

🏢 Authority Dashboard – Local authorities can view, assign, and resolve complaints.

🌐 Multi-language Support – Supports English, Hindi (and extendable to other Indian languages).

📊 Data Insights – Analytics on complaint categories for better city planning.

🔒 Secure Login – Firebase authentication for citizens and officials.

├── fix-my-city        # Core application
├── functions          # Firebase Cloud Functions
├── public             # Static assets
├── src                # React frontend source code
├── firestore.rules    # Firestore security rules
├── firestore.indexes  # Firestore indexes
├── Footer.jsx         # UI component
├── tailwind.config.js # TailwindCSS config
├── vite.config.js     # Vite config


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

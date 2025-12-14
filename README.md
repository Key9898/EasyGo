# EasyGo Car Rental - Premium Car Rental Platform 🚗

![EasyGo Banner](/public/HeroBanner/main.png)

## 📋 Project Overview

**EasyGo** is a modern, full-stack capable Car Rental Web Application designed to provide a seamless and premium experience for users looking to rent vehicles. Built with **React**, **TypeScript**, and **Tailwind CSS**, and powered by **Firebase** for real-time data and authentication.

This project demonstrates a production-ready architecture with a focus on:
- **User Experience (UX)**: Smooth animations, responsive design, and intuitive navigation.
- **Maintainability**: centralized type definitions, constant data management, and component reusability.
- **Scalability**: A robust folder structure clearly separating Pages, Components, Data, and Types.
- **Performance**: Optimized builds using Vite and efficient state management.

---

## 🚀 Key Features

### 👤 User Features
- **Vehicle Fleet**: Browse a categorized fleet (Sedan, SUV, Van, etc.) with advanced filtering (Location, Date, Type).
- **Search Widget**: Real-time vehicle availability search with URL persistence.
- **Booking System**: Complete booking flow including vehicle selection, user details, and confirmation.
- **User Accounts**: Sign Up / Sign In using Firebase Auth.
- **Dashboard**: "Account Settings" to view booking history, status, and profile management.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.

### 🛡️ Admin Dashboard (`/admin`)
*(Restricted access for admins)*
- **Overview**: Real-time stats on bookings, revenue, and fleet status.
- **Fleet Manager**: Add, update, or remove vehicles.
- **Booking Manager**: Approve, reject, or manage customer bookings.
- **User Management**: View and manage registered users.
- **Inquiries & Reviews**: Handle customer messages and moderation.

---

## 🛠️ Technology Stack

- **Frontend**: React (v19), TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4), Headless UI, Heroicons, React Icons, Lucide React
- **Backend / BaaS**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Vercel Ready
- **Maps**: Leaflet (via React Leaflet)

---

## 📂 Project Structure

```bash
src/
├── 📂 components/       # Reusable UI components (Layouts, Forms, Cards)
├── 📂 data/            # Centralized static data & constants
├── 📂 pages/           # Application views (Fleet, Home, Admin, etc.)
├── 📂 types/           # TypeScript interfaces & types
├── App.tsx             # Main routing logic
├── firebaseConfig.ts   # Firebase initialization
└── main.tsx            # Entry point
```

> For a detailed architectural breakdown, please refer to [ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/keywunna/easygo.git
   cd easygo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🧪 Deployment

This project is configured for seamless deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect `Vite`.
3. Add the Environment Variables in the Vercel Dashboard.
4. Deploy! 🚀

---

## 👨‍💻 Developer Note

This project was built to showcase **Advanced React Patterns**, **Agentic Coding Workflows**, and **Full-Stack Integration** capabilities.

**Author**: Wunna Aung  
**Contact**: key.w.aung.dev@gmail.com

# KaaryaMithr - Worker-Employer Connection Platform

![KaaryaMithr Logo](./public/images/kaarya-mithr-logo.png)

A modern web application connecting workers with employers, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-language Support**: Telugu (తెలుగు), Hindi (हिंदी), and English
- **Dual User Roles**: Worker and Employer interfaces
- **Real-time Chat**: Built-in messaging system
- **Job Management**: Post, browse, and apply for jobs
- **Profile Management**: Complete profile setup and editing
- **Responsive Design**: Works on all device sizes

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or Yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kaarya-mithr.git
cd kaarya-mithr
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_SOCKET_URL=your_socket_url
# Add other environment variables as needed
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🏗️ Project Structure

```
kaarya-mithr/
├── public/             # Static files
│   ├── images/         # Image assets
│   └── videos/         # Video assets
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   │   ├── AppLogo.tsx
│   │   ├── EmployerDashboard.tsx
│   │   ├── WorkerDashboard.tsx
│   │   ├── PhoneLogin.tsx
│   │   └── ...
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .env.example        # Example environment variables
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔄 Workflow

### User Flow

1. **Splash Screen**
   - App introduction
   - Language selection (Telugu/Hindi/English)

2. **Role Selection**
   - Choose between Worker or Employer

3. **Authentication**
   - Phone number input
   - OTP verification

4. **Worker Flow**
   - Complete profile (first-time users)
   - Browse available jobs
   - Apply for jobs
   - Chat with employers
   - Track earnings

5. **Employer Flow**
   - Post new jobs
   - Browse available workers
   - Chat with workers
   - Manage job postings

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">
  Made with ❤️ by Your Team Name
</div>

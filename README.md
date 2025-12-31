# University Application Platform - Vertical Slice

A modern React application that allows students to browse, filter, and apply to universities worldwide based on their academic profiles.

## 🚀 Live Demo

**Deployed Application**: [https://vertical-slice.vercel.app](https://vertical-slice.vercel.app)

## 🔗 Related Repositories

**Backend Repository**: [https://github.com/Kasfia-Mostafa/vertical_slice_backend](https://github.com/Kasfia-Mostafa/vertical_slice_backend)

## ✨ Features

- **Smart Filtering**: Filter universities by country, degree level, and maximum tuition fee
- **Eligibility Checking**: Real-time eligibility validation based on GPA and IELTS scores
- **Quick Apply**: Two-step application process for eligible universities
- **University Comparison**: Side-by-side comparison of up to 3 universities
- **Responsive Design**: Optimized for desktop and mobile devices
- **Animated UI**: Smooth animations using Framer Motion
- **Toast Notifications**: User-friendly feedback with react-hot-toast

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing and data loading
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notification library
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Kasfia-Mostafa/vertical_slice.git

# Navigate to the frontend directory
cd vertical_slice/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Configuration

Create a `.env` file in the root directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── image/          # Static images
├── src/
│   ├── Components/
│   │   └── Pages/
│   │       ├── ErrorPage/
│   │       ├── HomePage/
│   │       │   └── HeroSection/
│   │       │       ├── ComparisonSection.jsx
│   │       │       ├── Navbar.jsx
│   │       │       └── UniversityFilterSection.jsx
│   │       └── Root/
│   ├── Routes/
│   │   └── routes.jsx  # Route configuration
│   ├── assets/         # Static assets
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Key Components

### UniversityFilterSection
Main component featuring:
- University grid with filtering
- Academic profile input (GPA, IELTS)
- Eligibility validation
- Quick apply modal

### ComparisonSection
Modal component for side-by-side university comparison displaying:
- GPA requirements
- IELTS requirements
- Annual tuition fees

## 🌐 API Integration

The frontend communicates with the backend API for:
- Fetching university data
- Submitting applications
- Filtering results

Default API endpoint: `http://localhost:5000/api`

## 🚀 Deployment

Deployed on **Vercel** with automatic deployments from the main branch.

## 📄 License

This project is part of a university application platform.

---

Built with React + Vite

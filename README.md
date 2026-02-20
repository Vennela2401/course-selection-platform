# FSAD-PS48: Online Student Course Selection and Scheduling Platform

A comprehensive React-based web application for managing student course registrations and academic schedules. This platform allows students to browse courses, register for classes, view their weekly schedules, and helps prevent scheduling conflicts.

## 🎯 Project Overview

This project is a front-end only application built with React.js that simulates an online course selection and scheduling system. It provides an intuitive interface for students to manage their course registrations and for administrators to manage course listings.

## ✨ Features

### For Students:
- **Course Catalog**: Browse through available courses with detailed information
- **Course Registration**: Register and unregister for courses with a single click
- **Weekly Schedule View**: Visualize your registered courses in a weekly timetable format
- **Conflict Detection**: Automatic detection and warnings for scheduling conflicts
- **Search & Filter**: Search courses by name, code, or instructor and filter by availability

### For Administrators:
- **Course Management**: Add, update, and delete courses
- **Course Information**: Manage course details including schedules, instructors, and capacity
- **Enrollment Tracking**: Monitor course enrollment and capacity

## 🛠️ Technology Stack

- **React.js** (v18.2.0) - Frontend framework
- **React Router DOM** (v6.20.0) - Client-side routing
- **React Context API** - State management
- **CSS3** - Styling with modern design principles
- **LocalStorage** - Data persistence (for demo purposes)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Footer component
│   └── CourseCard.js   # Course card component
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── Courses.js      # Course catalog page
│   ├── Schedule.js     # Weekly schedule view
│   ├── Registration.js # Registration management
│   ├── Admin.js        # Admin dashboard
│   └── About.js         # About page
├── context/             # React Context providers
│   ├── CourseContext.js      # Course state management
│   └── RegistrationContext.js # Registration state management
├── data/               # Sample data
│   └── sampleCourses.js # Sample course data
├── utils/              # Utility functions
│   └── conflictDetection.js # Conflict detection logic
├── App.js              # Main app component with routing
└── index.js            # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd linkedin-react-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build for Production

To create a production build:
```bash
npm run build
```

The build folder will contain the optimized production files.

## 📖 Usage Guide

### For Students:

1. **Browse Courses**: Navigate to the "Courses" page to view all available courses
2. **Search Courses**: Use the search bar to find courses by name, code, or instructor
3. **Filter Courses**: Filter courses by availability (All, Available, Full)
4. **Register**: Click "Register" on any course card to add it to your registration list
5. **View Schedule**: Go to "Schedule" to see your weekly timetable
6. **Manage Registrations**: Visit "Registration" to see all registered courses and manage them

### For Administrators:

1. **Access Admin Dashboard**: Navigate to the "Admin" page
2. **Add Course**: Click "Add New Course" and fill in the course details
3. **Edit Course**: Click "Edit" on any course card to modify course information
4. **Delete Course**: Click "Delete" to remove a course from the catalog

## 🎨 Key Features Explained

### Conflict Detection

The system automatically detects scheduling conflicts by:
- Comparing course schedules (days and time slots)
- Checking for overlapping time periods
- Warning users when conflicts are detected
- Displaying conflicts in the Registration page

### Data Persistence

Course and registration data are stored in the browser's LocalStorage, so your selections persist across browser sessions.

### Responsive Design

The application is fully responsive and works on desktop, tablet, and mobile devices.

## 📄 Pages

1. **Home** (`/`) - Project overview and features
2. **Courses** (`/courses`) - Browse and search available courses
3. **Schedule** (`/schedule`) - Weekly timetable view
4. **Registration** (`/registration`) - Manage registered courses
5. **Admin** (`/admin`) - Course management dashboard
6. **About** (`/about`) - Project description and documentation

## 🔧 Customization

### Adding Sample Courses

Edit `src/data/sampleCourses.js` to add or modify sample course data.

### Styling

- Component-specific styles are in their respective `.css` files
- Global styles are in `src/App.css`
- The project uses a light, modern color scheme suitable for academic environments

## 📝 Notes

- This is a **front-end only** application with no backend integration
- Data persistence is handled through LocalStorage
- All course and registration data is stored locally in the browser
- The application uses dummy/sample data for demonstration purposes

## 🎓 Project Information

**Project Title**: FSAD-PS48: Online Student Course Selection and Scheduling Platform

**Purpose**: Academic project demonstrating React.js frontend development skills

**Features**:
- Modern, minimal, light-colored UI
- Clean and professional design
- Functional components with React Hooks
- React Router for navigation
- Sample/dummy data (no backend required)

## 📞 Support

For questions or issues, please refer to the project documentation or contact the development team.

## 📜 License

This project is created for academic/educational purposes.

---

**Built with React.js** ⚛️

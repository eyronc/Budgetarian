# PROJECT DIRECTORY:

budgetarian/                               # Root project folder
│
├── frontend/                              
│   ├── node_modules/
│   ├── public/
│   │   ├── images/
│   │   │   ├── food-categories/
│   │   │   │   ├── vegetables.png
│   │   │   │   ├── protein.png
│   │   │   │   └── grains.png
│   │   │   └── backgrounds/
│   │   │       └── hero-bg.jpg
│   │   ├── logo.svg
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── branding/
│   │   │   │   ├── BudgetarianLogo.tsx       # SVG logo component
│   │   │   │   └── BrandName.tsx             # "Budgetarian" text logo
│   │   │   │
│   │   │   ├── loading/
│   │   │   │   ├── LoadingScreen.tsx         # Full-screen loading
│   │   │   │   ├── ProgressBar.tsx           # Progress bar
│   │   │   │   └── Spinner.tsx               # Spinner animation
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx                # Top navigation
│   │   │   │   ├── Sidebar.tsx               # Side menu
│   │   │   │   ├── Footer.tsx                # Footer
│   │   │   │   └── Layout.tsx                # Main layout wrapper
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx             # Login form
│   │   │   │   ├── RegisterForm.tsx          # Registration form
│   │   │   │   ├── ForgotPasswordForm.tsx    # Forgot password
│   │   │   │   └── ProtectedRoute.tsx        # Auth guard
│   │   │   │
│   │   │   ├── budget/
│   │   │   │   ├── BudgetForm.tsx            # Set budget form
│   │   │   │   ├── BudgetCard.tsx            # Display budget
│   │   │   │   ├── BudgetForecast.tsx        # Predictions
│   │   │   │   └── SpendingChart.tsx         # Chart
│   │   │   │
│   │   │   ├── meal/
│   │   │   │   ├── MealGenerator.tsx         # Generate meals
│   │   │   │   ├── MealCard.tsx              # Meal display
│   │   │   │   ├── MealCalendar.tsx          # Calendar view
│   │   │   │   ├── DayMeals.tsx              # Daily meals
│   │   │   │   └── MealFilter.tsx            # Filter meals
│   │   │   │
│   │   │   ├── nutrition/
│   │   │   │   ├── NutritionTracker.tsx      # Track nutrition
│   │   │   │   ├── NutritionChart.tsx        # Charts
│   │   │   │   ├── MacroCard.tsx             # Macros
│   │   │   │   ├── CalorieCard.tsx           # Calories
│   │   │   │   └── NutritionGoalsForm.tsx    # Set goals
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── ProfileCard.tsx           # Profile display
│   │   │   │   ├── ProfileEditForm.tsx       # Edit profile
│   │   │   │   ├── PreferencesForm.tsx       # Preferences
│   │   │   │   └── HealthGoalsForm.tsx       # Health goals
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.tsx             # Main dashboard
│   │   │   │   ├── StatsCard.tsx             # Stats
│   │   │   │   ├── TodayMealsCard.tsx        # Today's meals
│   │   │   │   └── BudgetSummaryCard.tsx     # Budget summary
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Button.tsx                # Button
│   │   │       ├── Input.tsx                 # Input field
│   │   │       ├── Card.tsx                  # Card container
│   │   │       ├── Modal.tsx                 # Modal
│   │   │       ├── LoadingSpinner.tsx        # Small spinner
│   │   │       ├── ErrorAlert.tsx            # Error message
│   │   │       └── FormField.tsx             # Form field
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx               # Landing page
│   │   │   ├── DashboardPage.tsx             # Dashboard
│   │   │   ├── MealPlanPage.tsx              # Meal planning
│   │   │   ├── NutritionPage.tsx             # Nutrition
│   │   │   ├── BudgetPage.tsx                # Budget
│   │   │   ├── ProfilePage.tsx               # Profile
│   │   │   ├── LoginPage.tsx                 # Login
│   │   │   ├── RegisterPage.tsx              # Register
│   │   │   └── NotFoundPage.tsx              # 404
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAppInit.ts                 # App initialization
│   │   │   ├── useAuth.ts                    # Authentication
│   │   │   ├── useBudget.ts                  # Budget operations
│   │   │   ├── useMealPlan.ts                # Meal plan CRUD
│   │   │   ├── useNutrition.ts               # Nutrition tracking
│   │   │   ├── useAPI.ts                     # API calls
│   │   │   └── useLocalStorage.ts            # Local storage
│   │   │
│   │   ├── context/
│   │   │   ├── AppContext.tsx                # App-wide state
│   │   │   ├── AuthContext.tsx               # Auth state
│   │   │   ├── BudgetContext.tsx             # Budget state
│   │   │   ├── MealContext.tsx               # Meal state
│   │   │   └── ThemeContext.tsx              # Theme state
│   │   │
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── apiClient.ts              # Axios config
│   │   │   │   ├── authService.ts            # Auth API
│   │   │   │   ├── userService.ts            # User API
│   │   │   │   ├── mealService.ts            # Meal API
│   │   │   │   ├── budgetService.ts          # Budget API
│   │   │   │   └── nutritionService.ts       # Nutrition API
│   │   │   │
│   │   │   └── storage/
│   │   │       └── tokenStorage.ts           # JWT token storage
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters/
│   │   │   │   ├── formatCurrency.ts         # Currency formatting
│   │   │   │   ├── formatDate.ts             # Date formatting
│   │   │   │   └── formatNutrition.ts        # Nutrition formatting
│   │   │   │
│   │   │   ├── validators/
│   │   │   │   ├── validateBudget.ts         # Budget validation
│   │   │   │   ├── validateForm.ts           # Form validation
│   │   │   │   └── validateAuth.ts           # Auth validation
│   │   │   │
│   │   │   └── calculators/
│   │   │       ├── calculateBudget.ts        # Budget calculations
│   │   │       ├── calculateNutrition.ts     # Nutrition calculations
│   │   │       └── calculatePortion.ts       # Portion calculations
│   │   │
│   │   ├── types/
│   │   │   ├── index.ts                      # Main type exports
│   │   │   ├── User.ts                       # User type
│   │   │   ├── Auth.ts                       # Auth types
│   │   │   ├── Meal.ts                       # Meal type
│   │   │   ├── MealPlan.ts                   # Meal plan type
│   │   │   ├── Ingredient.ts                 # Ingredient type
│   │   │   ├── Nutrition.ts                  # Nutrition type
│   │   │   ├── Budget.ts                     # Budget type
│   │   │   └── ApiResponse.ts                # API response types
│   │   │
│   │   ├── constants/
│   │   │   ├── apiEndpoints.ts               # API URLs
│   │   │   ├── appRoutes.ts                  # Frontend routes
│   │   │   ├── nutritionDefaults.ts          # Nutrition defaults
│   │   │   ├── budgetDefaults.ts             # Budget defaults
│   │   │   └── uiMessages.ts                 # UI messages
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRouter.tsx                 # React Router setup
│   │   │   └── routes.ts                     # Route configuration
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css                   # Global styles
│   │   │   └── index.css                     # Index styles
│   │   │
│   │   ├── App.tsx                           # Main App component
│   │   ├── main.tsx                          # Entry point
│   │   └── vite-env.d.ts                     # Vite types
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── backend/                               # (will be created later)
│   └── (soon to be followed)
│
├── .gitignore                             
└── README.md         


## Note: 
Some of the files may not be implemented yet if the feature is not yet developed or currently in progress, or if the file is unnecessary because the code can be written directly in another file without creating a separate one.

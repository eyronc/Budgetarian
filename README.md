# Project Directory
```bash
budgetarian/                               # Root project folder
│
├── frontend/                              
│   ├── node_modules/                      # Dependencies
│   │
│   ├── public/                            # Static assets
│   │
│   ├── src/
│   │   ├── assets/                        # Images, fonts, etc.
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── auth/                      ✅ COMPLETE
│   │   │   │   ├── LoginForm.tsx          ✅ Done
│   │   │   │   ├── RegisterForm.tsx       ✅ Done
│   │   │   │   ├── ForgotPasswordForm.tsx ❌ To Create
│   │   │   │   └── ProtectedRoute.tsx     ❌ To Create
│   │   │   │
│   │   │   ├── branding/                  ✅ COMPLETE
│   │   │   │   ├── BrandName.tsx          ✅ Done
│   │   │   │   └── BudgetarianLogo.tsx    ✅ Done
│   │   │   │
│   │   │   ├── budget/                    ❌ TO CREATE
│   │   │   │   ├── BudgetCard.tsx         ❌ To Create
│   │   │   │   ├── BudgetForm.tsx         ❌ To Create
│   │   │   │   ├── BudgetForecast.tsx     ❌ To Create
│   │   │   │   └── SpendingChart.tsx      ❌ To Create
│   │   │   │
│   │   │   ├── common/                    ❌ TO CREATE
│   │   │   │   ├── Button.tsx             ❌ To Create
│   │   │   │   ├── Card.tsx               ❌ To Create
│   │   │   │   ├── ErrorAlert.tsx         ❌ To Create
│   │   │   │   ├── FormField.tsx          ❌ To Create
│   │   │   │   ├── Input.tsx              ❌ To Create
│   │   │   │   └── Modal.tsx              ❌ To Create
│   │   │   │
│   │   │   ├── dashboard/                 ✅ COMPLETE
│   │   │   │   ├── Dashboard.tsx          ✅ Done
│   │   │   │   ├── StatsCard.tsx          ❌ To Create
│   │   │   │   ├── TodayMealsCard.tsx     ❌ To Create
│   │   │   │   └── BudgetSummaryCard.tsx  ❌ To Create
│   │   │   │
│   │   │   ├── layout/                    ✅ COMPLETE
│   │   │   │   ├── Footer.tsx             ✅ Done
│   │   │   │   ├── Layout.tsx             ✅ Done
│   │   │   │   ├── Navbar.tsx             ✅ Done
│   │   │   │   └── Sidebar.tsx            ✅ Done
│   │   │   │
│   │   │   ├── loading/                   ✅ COMPLETE
│   │   │   │   ├── LoadingScreen.tsx      ✅ Done
│   │   │   │   ├── ProgressBar.tsx        ✅ Done
│   │   │   │   └── Spinner.tsx            ✅ Done
│   │   │   │
│   │   │   ├── meal/                      ❌ TO CREATE
│   │   │   │   ├── DayMeals.tsx           ❌ To Create
│   │   │   │   ├── MealCalendar.tsx       ❌ To Create
│   │   │   │   ├── MealCard.tsx           ❌ To Create
│   │   │   │   ├── MealFilter.tsx         ❌ To Create
│   │   │   │   └── MealGenerator.tsx      ❌ To Create
│   │   │   │
│   │   │   ├── nutrition/                 ❌ TO CREATE
│   │   │   │   ├── CalorieCard.tsx        ❌ To Create
│   │   │   │   ├── MacroCard.tsx          ❌ To Create
│   │   │   │   ├── NutritionChart.tsx     ❌ To Create
│   │   │   │   ├── NutritionGoalsForm.tsx ❌ To Create
│   │   │   │   └── NutritionTracker.tsx   ❌ To Create
│   │   │   │
│   │   │   └── profile/                   ❌ TO CREATE
│   │   │       ├── HealthGoalsForm.tsx    ❌ To Create
│   │   │       ├── PreferencesForm.tsx    ❌ To Create
│   │   │       ├── ProfileCard.tsx        ❌ To Create
│   │   │       └── ProfileEditForm.tsx    ❌ To Create
│   │   │
│   │   ├── constants/                     ❌ TO CREATE
│   │   │   ├── apiEndpoints.ts            ❌ To Create
│   │   │   ├── appRoutes.ts               ❌ To Create
│   │   │   ├── budgetDefaults.ts          ❌ To Create
│   │   │   ├── nutritionDefaults.ts       ❌ To Create
│   │   │   └── uiMessages.ts              ❌ To Create
│   │   │
│   │   ├── context/                       ❌ TO CREATE
│   │   │   ├── AppContext.tsx             ❌ To Create
│   │   │   ├── AuthContext.tsx            ❌ To Create
│   │   │   ├── BudgetContext.tsx          ❌ To Create
│   │   │   ├── MealContext.tsx            ❌ To Create
│   │   │   └── ThemeContext.tsx           ❌ To Create
│   │   │
│   │   ├── hooks/                         ❌ TO CREATE
│   │   │   ├── useAPI.ts                  ❌ To Create
│   │   │   ├── useAppInit.ts              ❌ To Create
│   │   │   ├── useAuth.ts                 ❌ To Create
│   │   │   ├── useBudget.ts               ❌ To Create
│   │   │   ├── useLocalStorage.ts         ❌ To Create
│   │   │   ├── useMealPlan.ts             ❌ To Create
│   │   │   └── useNutrition.ts            ❌ To Create
│   │   │
│   │   ├── pages/                         ❌ TO CREATE
│   │   │   ├── BudgetPage.tsx             ❌ To Create
│   │   │   ├── DashboardPage.tsx          ❌ To Create
│   │   │   ├── LandingPage.tsx            ❌ To Create
│   │   │   ├── LoginPage.tsx              ❌ To Create
│   │   │   ├── MealPlanPage.tsx           ❌ To Create
│   │   │   ├── NotFoundPage.tsx           ❌ To Create
│   │   │   ├── NutritionPage.tsx          ❌ To Create
│   │   │   ├── ProfilePage.tsx            ❌ To Create
│   │   │   └── RegisterPage.tsx           ❌ To Create
│   │   │
│   │   ├── routes/                        ⚠️ PARTIAL (folder exists)
│   │   │   ├── AppRouter.tsx              ❌ To Create
│   │   │   └── routes.ts                  ❌ To Create
│   │   │
│   │   ├── services/                      ❌ TO CREATE
│   │   │   ├── api/
│   │   │   │   ├── apiClient.ts           ❌ To Create
│   │   │   │   ├── authService.ts         ❌ To Create
│   │   │   │   ├── budgetService.ts       ❌ To Create
│   │   │   │   ├── mealService.ts         ❌ To Create
│   │   │   │   ├── nutritionService.ts    ❌ To Create
│   │   │   │   └── userService.ts         ❌ To Create
│   │   │   │
│   │   │   └── storage/
│   │   │       └── tokenStorage.ts        ❌ To Create
│   │   │
│   │   ├── styles/                        ✅ COMPLETE
│   │   │   ├── App.css                    ✅ Done
│   │   │   └── index.css                  ✅ Done
│   │   │
│   │   ├── types/                         ❌ TO CREATE
│   │   │   ├── ApiResponse.ts             ❌ To Create
│   │   │   ├── Auth.ts                    ❌ To Create
│   │   │   ├── Budget.ts                  ❌ To Create
│   │   │   ├── index.ts                   ❌ To Create
│   │   │   ├── Ingredient.ts              ❌ To Create
│   │   │   ├── Meal.ts                    ❌ To Create
│   │   │   ├── MealPlan.ts                ❌ To Create
│   │   │   ├── Nutrition.ts               ❌ To Create
│   │   │   └── User.ts                    ❌ To Create
│   │   │
│   │   ├── utils/                         ❌ TO CREATE
│   │   │   ├── calculators/
│   │   │   │   ├── calculateBudget.ts     ❌ To Create
│   │   │   │   ├── calculateNutrition.ts  ❌ To Create
│   │   │   │   └── calculatePortion.ts    ❌ To Create
│   │   │   │
│   │   │   ├── formatters/
│   │   │   │   ├── formatCurrency.ts      ❌ To Create
│   │   │   │   ├── formatDate.ts          ❌ To Create
│   │   │   │   └── formatNutrition.ts     ❌ To Create
│   │   │   │
│   │   │   └── validators/
│   │   │       ├── validateAuth.ts        ❌ To Create
│   │   │       ├── validateBudget.ts      ❌ To Create
│   │   │       └── validateForm.ts        ❌ To Create
│   │   │
│   │   ├── App.tsx                        ✅ Done
│   │   └── main.tsx                       ✅ Done
│   │
│   ├── .gitignore                         ✅ Done
│   ├── eslint.config.js                   ✅ Done
│   ├── index.html                         ✅ Done
│   ├── package-lock.json                  ✅ Done
│   ├── package.json                       ✅ Done
│   ├── postcss.config.js                  ✅ Done
│   ├── README.md                          ✅ Done
│   ├── tailwind.config.js                 ✅ Done
│   ├── tsconfig.app.json                  ✅ Done
│   ├── tsconfig.json                      ✅ Done
│   ├── tsconfig.node.json                 ✅ Done
│   └── vite.config.ts                     ✅ Done
│
├── .gitignore                             ✅ Done
├── desktop.ini                            ✅ Done
├── eslint.config.js                       ✅ Done
├── package-lock.json                      ✅ Done
├── package.json                           ✅ Done
└── README.md                              ✅ Done


═══════════════════════════════════════════════════════════════════════════
COMPLETION SUMMARY
═══════════════════════════════════════════════════════════════════════════

✅ COMPLETED FOLDERS (5):
   • components/auth/                      (2/4 files)
   • components/branding/                  (2/2 files)
   • components/dashboard/                 (1/4 files)
   • components/layout/                    (4/4 files)
   • components/loading/                   (3/3 files)

⚠️ PARTIAL FOLDERS (2):
   • components/auth/                      (2 more files needed)
   • components/dashboard/                 (3 more files needed)

❌ FOLDERS TO CREATE (12):
   • components/budget/                    (4 files)
   • components/common/                    (6 files)
   • components/meal/                      (5 files)
   • components/nutrition/                 (5 files)
   • components/profile/                   (4 files)
   • constants/                            (5 files)
   • context/                              (5 files)
   • hooks/                                (7 files)
   • pages/                                (9 files)
   • services/api/                         (6 files)
   • services/storage/                     (1 file)
   • types/                                (9 files)
   • utils/calculators/                    (3 files)
   • utils/formatters/                     (3 files)
   • utils/validators/                     (3 files)

═══════════════════════════════════════════════════════════════════════════

TOTAL FILES:
   ✅ Completed: 20 files
   ❌ To Create: 80 files
   
TOTAL PROGRESS: 20% Complete
```

> **Note:** Some files may not be implemented yet if the feature is not developed or if the code can be integrated directly into existing files.

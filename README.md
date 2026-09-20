# Coding Practice Tracker

A simple web application that helps students track their coding practice in one place.

## Problem

While practicing coding problems on platforms like LeetCode and GeeksforGeeks, it can be difficult to remember which problems are completed, in progress, or still need to be solved.

This project was built to solve that problem by providing a simple personal coding practice tracker.

## Features

* Add coding problems
* Store problem name, link, platform, topic, difficulty, and status
* View total number of problems
* Track solved, in-progress, and not-started problems
* Edit existing problems
* Delete problems
* Change problem status
* Search problems by name
* Filter by platform
* Filter by difficulty
* Filter by status
* Filter by topic
* Save data using browser LocalStorage
* Form validation
* Empty and no-result states
* Responsive design for desktop and mobile

## Technologies Used

* React
* Vite
* JavaScript
* CSS
* LocalStorage
* Git
* GitHub

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd coding-practice-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## How to Use

1. Click **Add Problem**.
2. Enter the coding problem details.
3. Select the platform, difficulty, and status.
4. Click **Add Problem**.
5. Use the dashboard to track your progress.
6. Use search and filters to find problems.
7. Use **Edit** to update a problem.
8. Use **Delete** to remove a problem.
9. Change the status directly from the problem card.

## Data Storage

The application uses browser LocalStorage to save coding problems.

No backend or external database is required.

## Deliberately Not Implemented

To keep the project small and focused, these features were intentionally not implemented:

* User authentication
* Backend server
* External database
* Automatic problem importing
* LeetCode or GeeksforGeeks API integration
* Social features
* Leaderboards
* User profiles
* Cloud synchronization
* Sharing problem lists with other users

These features were left out intentionally so the project could remain focused on the core problem of tracking personal coding practice.

## Future Improvements

Possible future improvements include:

* User authentication
* Cloud database
* Progress charts
* Streak tracking
* Automatic problem import
* Personalized statistics
* Cloud synchronization across devices

## Project Status

Completed as a frontend project using React and LocalStorage.

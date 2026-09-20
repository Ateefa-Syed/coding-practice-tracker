# Architecture Decision Record

This document explains three important technical decisions made while building the Coding Practice Tracker, including the alternatives considered, the reasons for each decision, and the trade-offs.

## Decision 1: Use LocalStorage Instead of a Backend Database

### What we decided

We decided to store coding problems in the browser using LocalStorage instead of building a backend and database.

### Alternatives considered

- LocalStorage
- A backend API with a database
- A cloud database

### Why we chose it

The Coding Practice Tracker is a personal frontend application, so a backend was not necessary for the core problem. LocalStorage allows the user's problems to remain available after refreshing the browser while keeping the project small and focused.

### What this costs us

The data is stored only in the user's browser. It cannot automatically sync between devices, and clearing the browser's stored data can remove the saved problems.

---

## Decision 2: Use React with Vite

### What we decided

We decided to build the application using React and Vite instead of plain HTML, CSS, and JavaScript.

### Alternatives considered

- React with Vite
- Plain HTML, CSS, and JavaScript
- Another frontend framework

### Why we chose it

The application has several interactive features, including adding and editing problems, searching, filtering, changing status, and updating dashboard statistics. React's components and state management make these interactions easier to organize.

### What this costs us

React adds project setup, dependencies, and more code compared with a simple HTML and JavaScript application. For a very small static page, React would be unnecessary overhead.

---

## Decision 3: Use One Form for Adding and Editing Problems

### What we decided

We decided to use a dedicated form for both adding new problems and editing existing problems instead of editing fields directly inside every problem card.

### Alternatives considered

- A separate add/edit form
- Inline editing directly inside problem cards
- A separate page for editing

### Why we chose it

A dedicated form keeps the problem cards simple and provides one consistent place for validation and all problem fields. The same form can also be reused for both creating and editing a problem.

### What this costs us

This decision adds extra state and logic because the form needs to switch between add mode and edit mode and load the existing problem's data. This later proved a little awkward because we had to manage the editing state separately from the problem list.
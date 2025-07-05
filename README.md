# Growai Fullstack App

This project is a fullstack application with a React frontend and an Express backend.


## How to Run This Project

### 1. Start the Backend (Express Server)

Open a terminal and run:

```bash
cd ../backend
npm install
node server.js
```
- The backend will start on [http://localhost:3000](http://localhost:3000).

---

### 2. Start the Frontend (React App)

Open a new terminal and run:

```bash
cd frontend
npm install
npm start
```
- The frontend will start on [http://localhost:3001](http://localhost:3001) or [http://localhost:3000](http://localhost:3000) if available.

---

### 3. Usage

- Fill in the business name and location in the form.
- Click **Submit** to get the business data and SEO headline.
- Click **Regenerate SEO Headline** to fetch a new headline.

---

### 4. Troubleshooting

- Make sure both backend and frontend servers are running.
- If you see CORS errors, ensure `cors` is enabled in your Express server.
- If you get a 404 error, check that the backend endpoints `/business-data` (POST) and `/regenerate-headline` (GET) exist and are spelled correctly.
- Restart your backend server after making changes to backend code.

---

**That’s it! Your app should now be running locally.**
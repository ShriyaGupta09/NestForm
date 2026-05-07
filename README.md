# 🧩 Nested Dynamic Form Builder

A full-stack project built using **React + Node.js (Express)** that allows users to create dynamic nested forms with questions, sub-questions, preview mode, and answer submission.

---

# 🚀 Features

- ➕ Add parent questions dynamically  
- 🌿 Add nested child questions (infinite recursion)  
- ✏️ Edit questions and answers  
- ❌ Delete questions (with children)  
- 🔢 Auto hierarchical numbering (Q1, Q1.1, Q1.1.1)  
- 🧾 User answer form  
- 📄 A4-style preview page  
- 💾 LocalStorage persistence  
- 🌐 Backend API to store and fetch form data  
- 🎨 Modern minimal UI with sidebar navigation  

---

# 🏗️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Lucide React Icons

## Backend
- Node.js
- Express.js
- CORS

---

# 📁 Project Structure


```bash
task/
│
├── client/
│   │
│   ├── node_modules/
│   ├
│   ├── public/
│   │   │
│   │   ├── img.svg
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── Navbar.jsx
│   │   │   ├── QuestionForm.jsx
│   │   │   ├── QuestionItem.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── BuilderPage.jsx
│   │   │   ├── FormPage.jsx
│   │   │   └── PreviewPage.jsx
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── img.svg
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package-lock.json
│
├── server/
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd task
```

## 2. Setup Frontend

```bash
cd client
npm install
npm start
```

Frontend runs on:
```bash
http://localhost:3000
```

## 2. Setup Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:
```bash
http://localhost:5000
```

---

# 🔌 Backend API Endpoints

## 1. Save Form Data

```bash
POST /save
```

Body:

```bash
[
  {
    "id": 1,
    "text": "Question",
    "type": "Short Answer",
    "children": []
  }
]
```

## 2. Get Form Data

```bash
GET /questions
```
Returns stored form data.

# 💡 How It Works

## Builder Page
- Create nested questions
- Add/delete/edit structure

## Form Page
- Users answer questions
- Can add follow-up questions

## Preview Page
- A4 printable layout
- Shows questions + answers


# 💾 Data Flow

```bash
React UI
   ↓
localStorage (instant save)
   ↓
Express Backend (/save API)
   ↓
GET /questions (retrieve data)
```

# ▶️ Running Project

## Start Backend

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm start
```

# 📌 Notes

- No database used (uses memory + localStorage)
- Backend resets on restart (can be upgraded to MongoDB)
- Fully functional dynamic nested form system

# Author

### Shriya Gupta
### Email: 9shriyag@gmail.com



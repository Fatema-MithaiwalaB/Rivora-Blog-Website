# 📝 Blog Dashboard - Vanilla JS Project (Rivora)

This is a *simple blog dashboard* built using *HTML, CSS, and JavaScript (no frameworks). It supports **user authentication, blog listing, commenting, and user-specific comment editing/deletion*, all powered by localStorage.

---

## 🚀 Features

### 🔐 Authentication
- Login system using email/password
- Session tracking using localStorage
- Redirects to login if the user is not authenticated

### 🧑 User Dashboard
- Personalized welcome message
- Displays blog posts with:
  - Image
  - Title
  - Content
  - Comments count (💬 badge)

### 💬 Comments System
- View comments under each blog
- Post new comments (if logged in)
- Edit/Delete your own comments
- Live reloads to reflect changes

### 🚪 Logout
- One-click logout
- Clears session and redirects to login

---


  
## ⚙ How It Works

### 📌 Login Logic
- Checks if isLoggedIn === "true" and loggedInUser exists
- Redirects to dashboard.html if logged in
- Saves login state to localStorage

### 🧱 Blog Rendering
- Loads blogsData from localStorage
- Dynamically creates blog cards with:
  - 📷 Image  
  - 📝 Title  
  - 📖 Content  
  - 💬 Comment badge  
  - 🗨 Comment list  
  - ➕ New comment form  

### ✍ Comment System
- Adds new comments to the correct blog (by index)
- Allows edit/delete *only if* the logged-in user is the author
- Updates are saved back to localStorage
- Reloads dashboard to reflect changes

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/f0c098c7-3ec1-498c-a3b8-432d81fe94cb)


![image](https://github.com/user-attachments/assets/72d14f28-7f5f-4116-a63b-42771318f9e1)


![image](https://github.com/user-attachments/assets/e7465589-d4fd-499b-a452-3bc610b6e16c)


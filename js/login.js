const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  window.location.href = "dashboard.html";
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    errorMsg.textContent = "Invalid email format!";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Invalid email or password!";
  }
});

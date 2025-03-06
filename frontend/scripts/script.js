function validateInput() {
  const login = document.getElementById("login").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.getElementById("loginBtn");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";
  loginBtn.disabled = !(login && password);
}

function login() {
  const button = document.getElementById("loginBtn");
  const buttonText = document.getElementById("buttonText");
  const loader = document.getElementById("loader");
  const errorMessage = document.getElementById("errorMessage");
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  errorMessage.style.display = "none";
  button.disabled = true;
  button.style.background = "#107f8c";
  buttonText.style.display = "none";
  loader.style.display = "block";

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = data.redirectUrl;
      } else {
        errorMessage.style.display = "flex";
        button.disabled = true;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      button.disabled = false;
      buttonText.style.display = "block";
      loader.style.display = "none";
    });
}

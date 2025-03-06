const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/analytics", (req, res) => {
  const categories = [
    { label: "Личный транспорт", value: 24, color: "#117F8B" },
    { label: "Аптеки", value: 12, color: "#31C1A6" },
    { label: "Предоставление услуг", value: 10, color: "#0574E0" },
    { label: "Развлечения", value: 7, color: "#7F67E1" },
    { label: "Средства размещения", value: 7, color: "#3BB2CD" },
    { label: "Транспорт", value: 6, color: "#47A2FD" },
    { label: "Непродовольственные магазины", value: 5, color: "#FE9702" },
    { label: "Кафе/бары/рестораны", value: 4, color: "#DB1337" },
    { label: "Продовольственные магазины", value: 4, color: "#4D2BD6" },
    { label: "Прочее", value: 22, color: "#D0D7DD" },
  ];
  res.json({ categories });
});

app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (login === "login1" && password === "pass1") {
    res.json({ success: true, redirectUrl: "service.html" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Логин или пароль неверны." });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

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
    { label: "Личный транспорт", value: 213000000, color: "#117F8B" },
    { label: "Аптеки", value: 104000000, color: "#31C1A6" },
    { label: "Предоставление услуг", value: 86000000, color: "#0574E0" },
    { label: "Развлечения", value: 60000000, color: "#7F67E1" },
    { label: "Средства размещения", value: 60000000, color: "#3BB2CD" },
    { label: "Транспорт", value: 52000000, color: "#47A2FD" },
    {
      label: "Непродовольственные магазины",
      value: 43000000,
      color: "#FE9702",
    },
    { label: "Кафе/бары/рестораны", value: 35000000, color: "#DB1337" },
    { label: "Продовольственные магазины", value: 35000000, color: "#4D2BD6" },
    { label: "Прочее", value: 195000000, color: "#D0D7DD" },
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

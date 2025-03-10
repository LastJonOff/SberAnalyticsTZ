const selectedService = localStorage.getItem("selectedService");
const serviceNameElement = document.getElementById("service-name");

if (selectedService) {
  serviceNameElement.textContent = selectedService;
} else {
  serviceNameElement.textContent = "Сервис не выбран";
}

setTimeout(() => {
  const loaderContainer = document.getElementById("loaderContainer");
  const title = document.getElementById("title-container");
  const content = document.getElementById("main-container");

  loaderContainer.style.display = "none";
  title.style.display = "flex";
  content.style.display = "flex";
}, 2000);

fetch("http://localhost:3000/analytics")
  .then((response) => response.json())
  .then((data) => {
    calculateAndRender(data.categories);
  })
  .catch((error) => console.error("Ошибка загрузки данных:", error));

function calculateAndRender(categories) {
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.value,
    0
  );

  categories.forEach((category) => {
    category.percentage = ((category.value / totalAmount) * 100).toFixed(1);
  });

  renderChart(categories);
  updateTotalAmountText(totalAmount);
}

function renderChart(categories) {
  const width = 250;
  const height = 240;
  const innerRadius = 156 / 2;
  const outerRadius = 180 / 2;

  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.label))
    .range(categories.map((c) => c.color));

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padAngle(0.02);
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const svg = d3
    .select("#chart")
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const arcData = pie(categories);

  svg
    .selectAll(".arc")
    .data(arcData)
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .style("fill", (d) => colorScale(d.data.label));

  svg
    .append("text")
    .attr("class", "center-text")
    .attr("x", 0)
    .attr("y", -14)
    .style("text-anchor", "middle")
    .style("font-weight", "400")
    .style("font-size", "12px")
    .style("line-height", "16px")
    .style("fill", "#7D838A")
    .text("Траты");

  svg
    .append("text")
    .attr("class", "center-text-count")
    .attr("x", 0)
    .attr("y", 10)
    .style("text-anchor", "middle")
    .style("font-weight", "600")
    .style("font-size", "16px")
    .style("line-height", "24px")
    .style("fill", "#1F1F22")
    .text("0 млн ₽");

  svg
    .selectAll(".label")
    .data(arcData)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("transform", (d) => {
      const angle = (d.startAngle + d.endAngle) / 2 - (Math.PI / 180) * 90;
      const x = (outerRadius + 20) * Math.cos(angle);
      const y = (outerRadius + 20) * Math.sin(angle);
      return `translate(${x},${y})`;
    })
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", (d) => colorScale(d.data.label))
    .text((d) => `${d.data.percentage}%`);

  createCategoryColumns(categories);
}

function updateTotalAmountText(totalAmount) {
  const totalTextElement = document.querySelector(".center-text-count");
  const formattedAmount = (totalAmount / 1_000_000).toFixed(1);
  totalTextElement.textContent = `${formattedAmount} млн ₽`;
}

function createCategoryColumns(categories) {
  const column1Categories = categories.slice(0, 5);
  const column2Categories = categories.slice(5);

  createCategoryColumn("column-1", column1Categories);
  createCategoryColumn("column-2", column2Categories);
}

function createCategoryColumn(columnId, categories) {
  const column = document.getElementById(columnId);
  column.innerHTML = "";
  categories.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("category-row");

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.backgroundColor = item.color;

    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = item.label;
    label.style.maxWidth = "224px";

    const percentage = document.createElement("span");
    percentage.classList.add("percentage");
    percentage.textContent = `${item.percentage}%`;

    row.appendChild(circle);
    row.appendChild(label);
    row.appendChild(percentage);
    column.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("logout-modal");
  const logoutButton = document.querySelector(".logout-button");
  const closeCross = document.querySelector(".close-cross");
  const cancelButton = document.querySelector(".cancel-button");
  const confirmButton = document.querySelector(".confirm-button");

  function openModal() {
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  }

  function closeModal() {
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
  }

  logoutButton.addEventListener("click", openModal);
  closeCross.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);

  confirmButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

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
    renderChart(data);
  })
  .catch((error) => console.error("Ошибка загрузки данных:", error));

function renderChart({ categories }) {
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
    .style("font-weight", "bold")
    .style("font-size", `${height / 18}px`)
    .text("Траты");

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
    .text((d) => `${d.data.value}%`);

  createCategoryColumns(categories);
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
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.width = "100%";
    div.style.marginBottom = "8px";
    div.style.flexShrink = "0";

    const circle = document.createElement("span");
    circle.style.width = "8px";
    circle.style.height = "8px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = item.color;
    circle.style.marginRight = "8px";

    const label = document.createElement("span");
    label.textContent = item.label;
    label.style.wordWrap = "break-word";
    label.style.maxWidth = "224px";
    label.style.whiteSpace = "normal";

    const percentage = document.createElement("span");
    percentage.textContent = ` ${item.value}%`;
    percentage.style.marginLeft = "auto";

    div.appendChild(circle);
    div.appendChild(label);
    div.appendChild(percentage);
    column.appendChild(div);
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

function confirmService() {
  const selectedValue = document.getElementById("service").value;
  localStorage.setItem("selectedService", selectedValue);

  window.location.href = "analytics.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const customSelect = document.querySelector(".custom-select");
  const trigger = customSelect.querySelector(".select-trigger");
  const options = customSelect.querySelectorAll(".select-options li");
  const hiddenInput = document.getElementById("service");
  const submitBtn = document.getElementById("submitBtn");

  trigger.addEventListener("click", () => {
    customSelect.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      trigger.textContent = event.target.textContent;
      hiddenInput.value = event.target.dataset.value;
      submitBtn.disabled = false;
      customSelect.classList.remove("open");

      trigger.style.color = "#005e7f";
    });
  });

  document.addEventListener("click", (event) => {
    if (!customSelect.contains(event.target)) {
      customSelect.classList.remove("open");
    }
  });
});

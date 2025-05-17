// Evrenspor Genişletilmiş JavaScript - script.js

document.addEventListener('DOMContentLoaded', function () {
  // === Timeline ===
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const progressBar = document.querySelector('.timeline-progress-bar');

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function activateStepsOnScroll() {
    let activeStepsCount = 0;
    timelineSteps.forEach((step, index) => {
      if (isElementInViewport(step)) {
        step.classList.add('active');
        activeStepsCount = index + 1;
      }
    });
    const progress = (activeStepsCount / timelineSteps.length) * 100;
    if (progressBar) progressBar.style.height = `${progress}%`;
  }

  if (timelineSteps.length > 0) {
    timelineSteps[0].classList.add('active');
    if (progressBar) progressBar.style.height = `${(1 / timelineSteps.length) * 100}%`;
    window.addEventListener('scroll', activateStepsOnScroll);
    activateStepsOnScroll();
  }

  // === Fiyat Hesaplama ===
  const quantitySlider = document.getElementById('quantitySlider');
  const quantityValue = document.getElementById('quantityValue');
  const fabricSelect = document.getElementById('fabricSelect');
  const setSelect = document.getElementById('setSelect');
  const optionCheckboxes = document.querySelectorAll('.option-checkbox');
  const unitPrice = document.getElementById('unitPrice');
  const totalPrice = document.getElementById('totalPrice');

  function calculatePrice() {
    if (!quantitySlider || !fabricSelect || !setSelect || !unitPrice || !totalPrice) return;

    const quantity = parseInt(quantitySlider.value);
    const fabricMultiplier = parseFloat(fabricSelect.value);
    const setMultiplier = parseFloat(setSelect.value);

    let basePrice = 299;
    let extraFee = 0;
    optionCheckboxes.forEach(opt => {
      if (opt.checked && opt.nextSibling.textContent.includes("Sponsor")) extraFee += 25;
    });

    const discountedUnit = basePrice * fabricMultiplier * setMultiplier + extraFee;
    const total = quantity * discountedUnit;

    unitPrice.textContent = Math.round(discountedUnit);
    totalPrice.textContent = Math.round(total);
  }

  if (quantitySlider) {
    quantitySlider.addEventListener('input', () => {
      quantityValue.textContent = quantitySlider.value;
      calculatePrice();
    });
  }
  if (fabricSelect) fabricSelect.addEventListener('change', calculatePrice);
  if (setSelect) setSelect.addEventListener('change', calculatePrice);
  if (optionCheckboxes.length) optionCheckboxes.forEach(cb => cb.addEventListener('change', calculatePrice));

  calculatePrice();

  // === SVG Tasarım ===
  const formColor = document.getElementById('formColor');
  const playerNumber = document.getElementById('playerNumber');
  const playerName = document.getElementById('playerName');
  const svgNumber = document.getElementById('svgNumber');
  const svgName = document.getElementById('svgName');
  const svgBody = document.querySelector('#jerseyPreview rect');

  if (formColor && svgBody) {
    formColor.addEventListener('input', () => {
      svgBody.setAttribute('fill', formColor.value);
    });
  }

  if (playerNumber && svgNumber) {
    playerNumber.addEventListener('input', () => {
      svgNumber.textContent = playerNumber.value;
    });
  }

  if (playerName && svgName) {
    playerName.addEventListener('input', () => {
      svgName.textContent = playerName.value.toUpperCase();
    });
  }

  // === SSS Toggle ===
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length) {
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      });
    });
  }
});

// Evrenspor Ortak JavaScript - script.js

document.addEventListener('DOMContentLoaded', function () {
  // === Timeline Animasyonu ===
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

  // === Fiyat Hesaplayıcı ===
  const quantitySlider = document.getElementById('quantitySlider');
  const quantityValue = document.getElementById('quantityValue');
  const quantityPresets = document.querySelectorAll('.quantity-preset');
  const fabricOptions = document.querySelectorAll('.fabric-option');
  const customCheckboxes = document.querySelectorAll('.custom-checkbox');
  const setOptions = document.querySelectorAll('.set-option');
  const unitPriceValue = document.getElementById('unitPriceValue');
  const totalPriceValue = document.getElementById('totalPriceValue');
  const fabricDetail = document.getElementById('fabricDetail');
  const setDetail = document.getElementById('setDetail');
  const quantityDetail = document.getElementById('quantityDetail');
  const discountDetail = document.getElementById('discountDetail');

  const basePrice = 299;
  const priceState = {
    quantity: 15,
    fabricMultiplier: 1,
    fabricName: 'Standart',
    hasNumbers: true,
    hasNames: true,
    hasLogo: true,
    hasSponsor: false,
    setMultiplier: 1,
    setName: 'Sadece Forma',
    discount: 0
  };

  function updatePriceDisplay() {
    const { quantity, fabricMultiplier, setMultiplier, discount } = priceState;
    let price = basePrice * fabricMultiplier * setMultiplier;
    price = price - (price * discount) / 100;
    const total = price * quantity;
    unitPriceValue.textContent = Math.round(price);
    totalPriceValue.textContent = Math.round(total).toLocaleString('tr-TR');
    fabricDetail.textContent = priceState.fabricName;
    setDetail.textContent = priceState.setName;
    quantityDetail.textContent = `${quantity} adet`;
    discountDetail.textContent = `%${discount}`;
  }

  if (quantitySlider) {
    quantitySlider.addEventListener('input', function () {
      priceState.quantity = parseInt(this.value);
      quantityValue.textContent = this.value;
      updateDiscount();
      updatePriceDisplay();
    });
  }

  if (quantityPresets.length) {
    quantityPresets.forEach(preset => {
      preset.addEventListener('click', function () {
        const value = parseInt(this.dataset.value);
        quantitySlider.value = value;
        priceState.quantity = value;
        quantityValue.textContent = value;
        updateDiscount();
        updatePriceDisplay();
      });
    });
  }

  function updateDiscount() {
    const q = priceState.quantity;
    priceState.discount = q >= 50 ? 15 : q >= 30 ? 10 : q >= 20 ? 5 : 0;
  }

  if (fabricOptions.length) {
    fabricOptions.forEach(option => {
      option.addEventListener('click', function () {
        fabricOptions.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        priceState.fabricMultiplier = parseFloat(this.dataset.price);
        priceState.fabricName = this.querySelector('.fabric-name').textContent;
        updatePriceDisplay();
      });
    });
  }

  if (customCheckboxes.length) {
    customCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        priceState[this.id === 'optionSponsor' ? 'hasSponsor' : this.id.replace('option', 'has')] = this.checked;
        updatePriceDisplay();
      });
    });
  }

  if (setOptions.length) {
    setOptions.forEach(option => {
      option.addEventListener('click', function () {
        setOptions.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        priceState.setMultiplier = parseFloat(this.dataset.price);
        priceState.setName = this.querySelector('.set-name').textContent;
        updatePriceDisplay();
      });
    });
  }

  updatePriceDisplay();
});
// JavaScript Document
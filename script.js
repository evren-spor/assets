
document.addEventListener('DOMContentLoaded', function () {

  // === Fiyat Hesaplayıcı ===
  const quantitySlider = document.getElementById('quantitySlider');
  const quantityValue = document.getElementById('quantityValue');
  const fabricSelect = document.getElementById('fabricSelect');
  const setSelect = document.getElementById('setSelect');
  const optionCheckboxes = document.querySelectorAll('.option-checkbox');
  const unitPrice = document.getElementById('unitPrice');
  const totalPrice = document.getElementById('totalPrice');

  if (quantitySlider && fabricSelect && setSelect && unitPrice && totalPrice) {
    function calculatePrice() {
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

    quantitySlider.addEventListener('input', () => {
      if (quantityValue) quantityValue.textContent = quantitySlider.value;
      calculatePrice();
    });

    fabricSelect.addEventListener('change', calculatePrice);
    setSelect.addEventListener('change', calculatePrice);
    optionCheckboxes.forEach(cb => cb.addEventListener('change', calculatePrice));
    calculatePrice();
  }

  // === Forma Tasarımı SVG ===
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
        if (answer) {
          answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        }
      });
    });
  }
});

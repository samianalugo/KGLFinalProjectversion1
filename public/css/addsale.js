
// JavaScript to calculate amount
  document.addEventListener('DOMContentLoaded', () => {
    const tonnageInput = document.querySelector('input[name="saletonnage"]');
    const priceInput = document.querySelector('input[name="unitsellingprice"]');
    const amountInput = document.getElementById('amountpaid');

    function calculateAmount() {
      const tonnage = parseFloat(tonnageInput.value);
      const price = parseFloat(priceInput.value);
      if (!isNaN(tonnage) && !isNaN(price)) {
        amountInput.value = (tonnage * price).toFixed(2);
      } else {
        amountInput.value = '';
      }
    }

    tonnageInput.addEventListener('input', calculateAmount);
    priceInput.addEventListener('input', calculateAmount);
  });

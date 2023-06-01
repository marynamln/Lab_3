


document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const searchField = document.querySelector('.search-field');
    const plusButtons = document.querySelectorAll('.plus-button');
    const minusButtons = document.querySelectorAll('.minus-button');
    const notButtons = document.querySelectorAll('.not-button');
    const buyProductButtons = document.querySelectorAll('.buy-product');
    const amountInputs = document.querySelectorAll('.not-buy-products-section .amount');
    const notPrBuySections = document.querySelectorAll('.not-pr-buy');
    const notBuyProductButtons = document.querySelectorAll('.not-buy-product');

    const productNames = []; // Зберігаємо список назв товарів
    // Отримуємо всі елементи з класом 'product' і додаємо їх значення до масиву productNames
    const existingProducts = document.querySelectorAll('.product');
    existingProducts.forEach(function(product) {
        productNames.push(product.value);
    });

    const existingProductsBuy = document.querySelectorAll('.product-buy');
    existingProductsBuy.forEach(function(product) {
        productNames.push(product.value);
    });

    addButton.addEventListener('click', addItem);
    searchField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const productName = searchField.value;

        if (productName.trim() !== '') {

            // Перевірка на унікальність назви товару (ігноруючи регістр)
            const lowerCaseProductName = productName.toLowerCase();
            if (productNames.map(name => name.toLowerCase()).includes(lowerCaseProductName)) {
                alert('Товар з такою назвою вже існує!');
                searchField.value = "";
                return;
            }

            productNames.push(productName); // Додаємо нову назву товару до списку

            const notBuyProductSection = document.querySelector('.not-buy-products-section');

            const notPrBuySection = document.createElement('section');
            notPrBuySection.classList.add('not-pr-buy');

            const notPrBuyName = document.createElement('span');
            notPrBuyName.classList.add('not-pr-buy');
            notPrBuyName.style.margin = '0';
            notPrBuyName.textContent = productName.substring(0,1).toUpperCase()+productName.substring(1);

            const amount = document.createElement('input');
            amount.type = 'text';
            amount.classList.add('amount');
            amount.style.margin = '0';
            amount.value = '1';
            amount.readOnly = true;

            notPrBuySection.appendChild(notPrBuyName);
            notPrBuySection.appendChild(amount);

            notBuyProductSection.appendChild(notPrBuySection);

            const noBuyProductSection = document.createElement('section');
            noBuyProductSection.classList.add('not-buy-pr');

            const noBuyProductButton = document.createElement('button');
            noBuyProductButton.classList.add('not-buy-product');
            noBuyProductButton.dataset.tooltip = 'Не куплено';
            noBuyProductButton.textContent = 'Не куплено';

            const productItem = document.createElement('section');
            productItem.classList.add('product-item');

            const productInput = document.createElement('input');
            productInput.type = 'text';
            productInput.classList.add('product');
            productInput.value = productName.substring(0,1).toUpperCase()+productName.substring(1);

            const numberSection = document.createElement('section');
            numberSection.classList.add('number-of-products');

            const minusButton = document.createElement('button');
            minusButton.classList.add('minus-button');
            minusButton.dataset.tooltip = 'Видалити одиницю';
            minusButton.textContent = '-';

            const productNumber = document.createElement('input');
            productNumber.type = 'text';
            productNumber.classList.add('productNumber');
            productNumber.value = '1';
            productNumber.readOnly = true;

            const plusButton = document.createElement('button');
            plusButton.classList.add('plus-button');
            plusButton.dataset.tooltip = 'Додати одиницю';
            plusButton.textContent = '+';

            numberSection.appendChild(minusButton);
            numberSection.appendChild(productNumber);
            numberSection.appendChild(plusButton);

            const buyPrSection = document.createElement('section');
            buyPrSection.classList.add('buy-pr');

            const buyProductButton = document.createElement('button');
            buyProductButton.classList.add('buy-product');
            buyProductButton.dataset.tooltip = 'Куплено';
            buyProductButton.textContent = 'Куплено';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('not-button');
            deleteButton.dataset.tooltip = 'Видалити';
            deleteButton.textContent = 'x';

            buyPrSection.appendChild(buyProductButton);
            buyPrSection.appendChild(deleteButton);

            productItem.appendChild(productInput);
            productItem.appendChild(numberSection);
            productItem.appendChild(buyPrSection);

            const blockOne = document.querySelector('.block-one');
            blockOne.appendChild(productItem);

            searchField.value = '';
            searchField.focus();

            // Додати обробники подій для кнопок "+" та "-"
            plusButton.addEventListener('click', () => {
                const productNumberInput = plusButton.parentElement.querySelector('.productNumber');
                let productNumber = parseInt(productNumberInput.value);

                productNumber += 1;

                productNumberInput.value = productNumber;

                const notBuyProductAmount = notPrBuySection.querySelector('.amount');
                notBuyProductAmount.value = productNumber;
            });

            minusButton.addEventListener('click', () => {
                const productNumberInput = minusButton.parentElement.querySelector('.productNumber');
                let productNumber = parseInt(productNumberInput.value);

                if (productNumber > 1) {
                    productNumber -= 1;
                    productNumberInput.value = productNumber;

                    const notBuyProductAmount = notPrBuySection.querySelector('.amount');
                    notBuyProductAmount.value = productNumber;
                }
            });

            // Додати обробник події для кнопки "Видалити"
            deleteButton.addEventListener('click', () => {
                const productItem = deleteButton.closest('.product-item');
                productItem.remove();
                notPrBuySection.remove();
            });

            buyProductButton.addEventListener('click', () => {
                // Зміна стилю назви товару на перекреслену
                productInput.style.textDecoration = 'line-through';

                minusButton.style.display = 'none';
                plusButton.style.display = 'none';

                productNumber.style.margin = '0';

                // Заміна секції "buy-pr" на секцію "not-buy-pr"
                noBuyProductSection.appendChild(noBuyProductButton);

                productItem.replaceChild(noBuyProductSection, buyPrSection);

                notPrBuySection.style.display = 'none';
            });

            noBuyProductButton.addEventListener('click', () => {
                const productItem = noBuyProductButton.parentElement.parentElement;
                const productInput = productItem.querySelector('.product');
                const minusButton = productItem.querySelector('.minus-button');
                const plusButton = productItem.querySelector('.plus-button');
                const productNumber = productItem.querySelector('.productNumber');

                // Зняття перекреслення з назви товару
                productInput.style.textDecoration = 'none';

                minusButton.style.display = 'inline-block';
                plusButton.style.display = 'inline-block';

                productNumber.style.margin = '0 5px';

                // Заміна секції "not-buy-pr" на секцію "buy-pr"
                buyPrSection.appendChild(buyProductButton);
                buyPrSection.appendChild(deleteButton);
                productItem.replaceChild(buyPrSection, noBuyProductButton.parentElement);
            });

        }
    }

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productNumberInput = button.parentElement.querySelector('.productNumber');
            let productNumber = parseInt(productNumberInput.value);

            productNumber += 1;

            productNumberInput.value = productNumber;

            //const notBuyProductAmount = notPrBuySection.querySelector('.amount');
            //notBuyProductAmount.value = productNumber;

            // Отримуємо відповідний елемент 'amount' за допомогою індексу кнопки
            const amountInput = amountInputs[Array.from(plusButtons).indexOf(button)];
            amountInput.value = productNumber;
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productNumberInput = button.parentElement.querySelector('.productNumber');
            let productNumber = parseInt(productNumberInput.value);

            if (productNumber > 1) {
                productNumber -= 1;

                productNumberInput.value = productNumber;

                //const notBuyProductAmount = notPrBuySection.querySelector('.amount');
                //notBuyProductAmount.value = productNumber;

                // Отримуємо відповідний елемент 'amount' за допомогою індексу кнопки
                const amountInput = amountInputs[Array.from(minusButtons).indexOf(button)];
                amountInput.value = productNumber;
            }
        });
    });

    notButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.parentElement.parentElement;
            productItem.remove();

            const noBuyProductSection = notPrBuySections[Array.from(notButtons).indexOf(button)];
            noBuyProductSection.remove();
        });
    });

    buyProductButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('.product').value;
            const productNumber = productItem.querySelector('.productNumber').value;

            const productItemBuy = document.createElement('section');
            productItemBuy.classList.add('product-item-buy');

            const productBuyInput = document.createElement('input');
            productBuyInput.type = 'text';
            productBuyInput.classList.add('product-buy');
            productBuyInput.value = productName;

            const numberOnlySection = document.createElement('section');
            numberOnlySection.classList.add('number-only');

            const productBuyNumber = document.createElement('input');
            productBuyNumber.type = 'text';
            productBuyNumber.classList.add('productNumber');
            productBuyNumber.value = productNumber;
            productBuyNumber.readOnly = true;

            const notBuyPrSection = document.createElement('section');
            notBuyPrSection.classList.add('not-buy-pr');

            const notBuyProductButton = document.createElement('button');
            notBuyProductButton.classList.add('not-buy-product');
            notBuyProductButton.dataset.tooltip = 'Не куплено';
            notBuyProductButton.textContent = 'Не куплено';

            numberOnlySection.appendChild(productBuyNumber);
            notBuyPrSection.appendChild(notBuyProductButton);

            productItemBuy.appendChild(productBuyInput);
            productItemBuy.appendChild(numberOnlySection);
            productItemBuy.appendChild(notBuyPrSection);

            productItem.replaceWith(productItemBuy);
        });
    });

    notBuyProductButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItemBuy = button.closest('.product-item-buy');
            const productName = productItemBuy.querySelector('.product-buy').value;
            const productNumber = productItemBuy.querySelector('.productNumber').value;

            const productItem = document.createElement('section');
            productItem.classList.add('product-item');

            const productInput = document.createElement('input');
            productInput.type = 'text';
            productInput.classList.add('product');
            productInput.value = productName;

            const numberSection = document.createElement('section');
            numberSection.classList.add('number-of-products');

            const minusButton = document.createElement('button');
            minusButton.classList.add('minus-button');
            minusButton.dataset.tooltip = 'Видалити одиницю';
            minusButton.textContent = '-';

            const productNumberInput = document.createElement('input');
            productNumberInput.type = 'text';
            productNumberInput.classList.add('productNumber');
            productNumberInput.value = productNumber;
            productNumberInput.readOnly = true;

            const plusButton = document.createElement('button');
            plusButton.classList.add('plus-button');
            plusButton.dataset.tooltip = 'Додати одиницю';
            plusButton.textContent = '+';

            numberSection.appendChild(minusButton);
            numberSection.appendChild(productNumberInput);
            numberSection.appendChild(plusButton);

            const buyPrSection = document.createElement('section');
            buyPrSection.classList.add('buy-pr');

            const buyProductButton = document.createElement('button');
            buyProductButton.classList.add('buy-product');
            buyProductButton.dataset.tooltip = 'Куплено';
            buyProductButton.textContent = 'Куплено';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('not-button');
            deleteButton.dataset.tooltip = 'Видалити';
            deleteButton.textContent = 'x';

            buyPrSection.appendChild(buyProductButton);
            buyPrSection.appendChild(deleteButton);

            productItem.appendChild(productInput);
            productItem.appendChild(numberSection);
            productItem.appendChild(buyPrSection);

            productItemBuy.replaceWith(productItem);

            minusButton.addEventListener('click', () => {
                let productNumber = parseInt(productNumberInput.value);

                if (productNumber > 1) {
                    productNumber -= 1;
                    productNumberInput.value = productNumber;
                }
            });

            plusButton.addEventListener('click', () => {
                let productNumber = parseInt(productNumberInput.value);
                productNumber += 1;
                productNumberInput.value = productNumber;
            });

            deleteButton.addEventListener('click', () => {
                productItem.remove();
            });
        });
    });
});
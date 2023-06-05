


document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const searchField = document.querySelector('.search-field');
    const plusButtons = document.querySelectorAll('.plus-button');
    const minusButtons = document.querySelectorAll('.minus-button');
    const notButtons = document.querySelectorAll('.not-button');
    const amountInputs = document.querySelectorAll('.amount');
    const notPrBuySections = document.querySelectorAll('.not-pr-buy');
    const productNumbers = document.querySelectorAll('.product-item .productNumber');
    const buyProductButtons = document.querySelectorAll('.buy-product');
    const notBuyProductButtons = document.querySelectorAll('.not-buy-product');
    const pr = document.querySelectorAll('.product');


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
            minusButton.disabled = true;
            minusButton.style.pointerEvents = 'none';
            minusButton.style.background = '#9a7575';

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

            const buyProductSection = document.querySelector('.buy-products-section');

            const prBuySection = document.createElement('section');
            prBuySection.classList.add('pr-buy');

            const prBuyName = document.createElement('span');
            prBuyName.classList.add('pr-buy');
            prBuyName.style.margin = '0';
            prBuyName.textContent = productName.substring(0,1).toUpperCase()+productName.substring(1);

            const amountBuy = document.createElement('input');
            amountBuy.type = 'text';
            amountBuy.classList.add('amount-pr-buy');
            amountBuy.style.margin = '0';
            amountBuy.readOnly = true;

            prBuySection.appendChild(prBuyName);
            prBuySection.appendChild(amountBuy);

            buyProductSection.appendChild(prBuySection);
            prBuySection.style.display = 'none';

            const notPrBuyN = notPrBuySection.querySelector('.not-pr-buy');
            notPrBuyN.textContent = productInput.value;
            productItem.readOnly = false;

            searchField.value = '';
            searchField.focus();

            productInput.addEventListener('blur', () => {
                const updatedProductName = productInput.value;
                const notPrBuyName = notPrBuySection.querySelector('.not-pr-buy');
                notPrBuyName.textContent = updatedProductName;

                // Видалення старої назви продукту з масиву
                const index = productNames.indexOf(productName);
                if (index > -1) {
                    productNames.splice(index, 1);
                }

                productNames.push(updatedProductName);
            });

            // обробники подій для кнопок "+" та "-"
            plusButton.addEventListener('click', () => {
                const productNumberInput = plusButton.parentElement.querySelector('.productNumber');
                let productNumber = parseInt(productNumberInput.value);

                productNumber += 1;

                productNumberInput.value = productNumber;

                const notBuyProductAmount = notPrBuySection.querySelector('.amount');
                notBuyProductAmount.value = productNumber;

                minusButton.style.background = 'darkred';
                minusButton.disabled = false;
                minusButton.style.pointerEvents = 'visible';

                if(productNumber > 9){
                    productNumberInput.style.width = '32px';
                }
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
                if (productNumber === 1){
                    minusButton.disabled = true;
                    minusButton.style.pointerEvents = 'none';
                    minusButton.style.background = '#9a7575';
                }

                if(productNumber < 10){
                    productNumberInput.style.width = '23px';
                }
            });

            // обробник події для кнопки "Видалити"
            deleteButton.addEventListener('click', () => {
                const productItem = deleteButton.closest('.product-item');
                productItem.remove();
                notPrBuySection.remove();

                const index = productNames.indexOf(productName);
                if (index > -1) {
                    productNames.splice(index, 1); // Видаляємо назву товару з масиву
                }
            });

            buyProductButton.addEventListener('click', () => {
                // Зміна стилю назви товару на перекреслену
                productInput.style.textDecoration = 'line-through';
                productInput.readOnly = true;

                minusButton.style.display = 'none';
                plusButton.style.display = 'none';

                productNumber.style.margin = '0';

                // Заміна секції "buy-pr" на секцію "not-buy-pr"
                noBuyProductSection.appendChild(noBuyProductButton);

                productItem.replaceChild(noBuyProductSection, buyPrSection);

                notPrBuySection.style.display = 'none';

                prBuyName.textContent = productInput.value;
                amountBuy.value = productNumber.value;
                prBuySection.style.display = 'flex';
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

                productNumber.style.marginLeft = '5px';

                // Заміна секції "not-buy-pr" на секцію "buy-pr"
                buyPrSection.appendChild(buyProductButton);
                buyPrSection.appendChild(deleteButton);
                productItem.replaceChild(buyPrSection, noBuyProductButton.parentElement);

                notPrBuySection.style.display = 'flex';
                prBuySection.style.display = 'none';
                productInput.readOnly = false;
            });

        }
    }

    existingProducts.forEach(function(product, index) {
        const plusButton = plusButtons[index];
        const minusButton = minusButtons[index];
        const number = productNumbers[index];
        const notButton = notButtons[index];
        const amountInput = amountInputs[index];
        const myProductInput = pr[index];

        plusButton.addEventListener('click', () => {
            let productNumber = parseInt(amountInput.value);
            productNumber += 1;
            number.value = productNumber;
            amountInput.value = productNumber;

            minusButton.style.background = 'darkred';
            minusButton.disabled = false;
            minusButton.style.pointerEvents = 'visible';

            if (productNumber > 9){
                number.style.width = '32px';
            }
        });

        minusButton.addEventListener('click', () => {
            let productNumber = parseInt(amountInput.value);
            if (productNumber > 1) {
                productNumber -= 1;
                number.value = productNumber;
                amountInput.value = productNumber;
            }

            if(productNumber === 1){
                minusButton.disabled = true;
                minusButton.style.pointerEvents = 'none';
                minusButton.style.background = '#9a7575';
            }

            if (productNumber < 10){
                number.style.width = '23px';
            }
        });

        notButton.addEventListener('click', () => {
            const productItem = notButton.parentElement.parentElement;
            productItem.remove();
            const notPrBuySection = notPrBuySections[index];
            notPrBuySection.remove();
        });

        const productName = myProductInput.value;
        myProductInput.addEventListener('blur', () => {
            productNames.splice(index,1);
            const nBuyProductSection = document.querySelector('.not-buy-products-section');
            const notPrBuyItems = nBuyProductSection.querySelectorAll('.not-pr-buy');
            notPrBuyItems.forEach(function(prBuyItem) {
                if (prBuyItem.textContent.includes(productName)) {
                    const updatedProductName = myProductInput.value;
                    prBuyItem.textContent = updatedProductName;
                    prBuyItem.appendChild(amountInput);
                    productNames.push(updatedProductName);
                }
            });
        });
    });

    // кнопка "Куплено"
    buyProductButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const productNotBuyItem = button.closest('.product-item');

            const productName = productNotBuyItem.querySelector('.product').value;
            const productNumber = productNotBuyItem.querySelector('.productNumber');
            const prBuySection = document.querySelector('.buy-products-section');

            // Додавання продукту в секції buy-products-section
            const prBuyItem = document.createElement('span');
            prBuyItem.classList.add('pr-buy');
            prBuyItem.textContent = productName;

            const amount = document.createElement('input');
            amount.type = 'text';
            amount.classList.add('amount-pr-buy');
            amount.style.margin = '0';
            amount.value = productNumber.value;
            amount.readOnly = true;

            prBuyItem.appendChild(amount);
            prBuySection.appendChild(prBuyItem);

            // Видалення секції продукту з секції not-buy-products-section
            const nBuyProductSection = document.querySelector('.not-buy-products-section');
            const notPrBuyItems = nBuyProductSection.querySelectorAll('.not-pr-buy');
            notPrBuyItems.forEach(function(prBuyItem) {
                if (prBuyItem.textContent.includes(productName)) {
                    //prBuyItem.remove();
                    prBuyItem.style.display = 'none';
                }
            });

            productNotBuyItem.style.display = 'none';

            const productBuySection = document.createElement('section');
            productBuySection.classList.add('product-item-buy');

            const productBuyInput = document.createElement('input');
            productBuyInput.type = 'text';
            productBuyInput.classList.add('product-buy');
            productBuyInput.value = productName;
            productBuyInput.readOnly = true;

            const numberBuySection = document.createElement('section');
            numberBuySection.classList.add('number-only');

            const numberOnly = document.createElement('input');
            numberOnly.type = 'text';
            numberOnly.classList.add('productNumber');
            numberOnly.value = productNumber.value;
            numberOnly.readOnly = true;
            numberOnly.style.margin = '0';

            numberBuySection.appendChild(numberOnly);

            const noBuyPrSection = document.createElement('section');
            noBuyPrSection.classList.add('not-buy-pr');

            const buyProductButton = document.createElement('button');
            buyProductButton.classList.add('not-buy-product');
            buyProductButton.dataset.tooltip = 'Не куплено';
            buyProductButton.textContent = 'Не куплено';
            buyProductButton.addEventListener('click', function () {
                productNotBuyItem.style.display = 'flex';
                productBuySection.style.display = 'none';
                prBuyItem.style.display = 'none';
                const notPrBuyItems = nBuyProductSection.querySelectorAll('.not-pr-buy');
                notPrBuyItems.forEach(function(prBuyItem) {
                    if (prBuyItem.textContent.includes(productName)) {
                        //prBuyItem.remove();
                        prBuyItem.style.display = 'flex';
                    }
                });
            });

            noBuyPrSection.appendChild(buyProductButton);

            productBuySection.appendChild(productBuyInput);
            productBuySection.appendChild(numberBuySection);
            productBuySection.appendChild(noBuyPrSection);

            productNotBuyItem.parentElement.insertBefore(productBuySection, productNotBuyItem);
            //productNotBuyItem.remove();
        });
    });

    notBuyProductButtons.forEach(function(button) {
        button.addEventListener('click', function() {

            const productItem = button.closest('.product-item-buy');

            const productBuyName = productItem.querySelector('.product-buy').value;
            const number = productItem.querySelector('.productNumber');
            const notPrBuySection = document.querySelector('.not-buy-products-section');

            // додати продукт в секцію not-buy-products-section
            const notPrBuyItem = document.createElement('span');
            notPrBuyItem.classList.add('not-pr-buy');
            notPrBuyItem.textContent = productBuyName;

            const amount = document.createElement('input');
            amount.type = 'text';
            amount.classList.add('amount');
            amount.style.margin = '0';
            amount.value = number.value;
            amount.readOnly = true;

            notPrBuyItem.appendChild(amount);
            notPrBuySection.appendChild(notPrBuyItem);

            // Видалення секції продукту з секції buy-products-section
            const buyProductSection = document.querySelector('.buy-products-section');
            const prBuyItems = buyProductSection.querySelectorAll('.pr-buy');
            prBuyItems.forEach(function(prBuyItem) {
                if (prBuyItem.textContent.includes(productBuyName)) {
                    //prBuyItem.remove();
                    prBuyItem.style.display = 'none';
                }
            });

            productItem.style.display = 'none';

            const productSection = document.createElement('section');
            productSection.classList.add('product-item');

            const productInput = document.createElement('input');
            productInput.type = 'text';
            productInput.classList.add('product');
            productInput.value = productBuyName;

            const numberSection = document.createElement('section');
            numberSection.classList.add('number-of-products');

            const minusButton = document.createElement('button');
            minusButton.classList.add('minus-button');
            minusButton.dataset.tooltip = 'Видалити одиницю';
            minusButton.textContent = '-';

            if(number.value === 1){
                minusButton.disabled = true;
                minusButton.style.pointerEvents = 'none';
                minusButton.style.background = '#9a7575';
            }

            const productNumber = document.createElement('input');
            productNumber.type = 'text';
            productNumber.classList.add('productNumber');
            productNumber.value = number.value;
            productNumber.readOnly = true;

            const plusButton = document.createElement('button');
            plusButton.classList.add('plus-button');
            plusButton.dataset.tooltip = 'Додати одиницю';
            plusButton.textContent = '+';

            plusButton.addEventListener('click', function () {
                let num = parseInt(amount.value);
                num += 1;
                productNumber.value = num.toString();
                amount.value = num.toString();

                minusButton.style.background = 'darkred';
                minusButton.disabled = false;
                minusButton.style.pointerEvents = 'visible';
            });

            minusButton.addEventListener('click', function () {
                let num = parseInt(amount.value);

                if(num > 1){
                    num -= 1;
                    productNumber.value = num.toString();
                    amount.value = num.toString();
                }

                if(num === 1){
                    minusButton.disabled = true;
                    minusButton.style.pointerEvents = 'none';
                    minusButton.style.background = '#9a7575';
                }
            });

            numberSection.appendChild(minusButton);
            numberSection.appendChild(productNumber);
            numberSection.appendChild(plusButton);

            const buyPrSection = document.createElement('section');
            buyPrSection.classList.add('buy-pr');

            const buyProductButton = document.createElement('button');
            buyProductButton.classList.add('buy-product');
            buyProductButton.dataset.tooltip = 'Куплено';
            buyProductButton.textContent = 'Куплено';
            buyProductButton.addEventListener('click', function () {
                productItem.style.display = 'flex';
                productSection.style.display = 'none';
                notPrBuyItem.style.display = 'none';
                prBuyItems.forEach(function(prBuyItem) {
                    if (prBuyItem.textContent.includes(productBuyName)) {
                        //prBuyItem.remove();
                        prBuyItem.style.display = 'flex';
                    }
                });
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('not-button');
            deleteButton.dataset.tooltip = 'Видалити';
            deleteButton.textContent = 'x';

            // додати обробник події для кнопки "Видалити"
            deleteButton.addEventListener('click', function() {
                productSection.remove();
                notPrBuyItem.remove();
            });

            buyPrSection.appendChild(buyProductButton);
            buyPrSection.appendChild(deleteButton);

            productSection.appendChild(productInput);
            productSection.appendChild(numberSection);
            productSection.appendChild(buyPrSection);

            productItem.parentElement.insertBefore(productSection, productItem);
            //productItem.remove();
        });
    });
});
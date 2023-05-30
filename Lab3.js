


document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const searchField = document.querySelector('.search-field');
    const plusButtons = document.querySelectorAll('.plus-button');
    const minusButtons = document.querySelectorAll('.minus-button');
    const notButtons = document.querySelectorAll('.not-button');
    const buyProductButtons = document.querySelectorAll('.buy-product');
    const notBuyProductButtons = document.querySelectorAll('.not-buy-product');

    addButton.addEventListener('click', addItem);
    searchField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const productName = searchField.value;

        if (productName.trim() !== '') {
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
            productInput.value = productName;

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
            });

            minusButton.addEventListener('click', () => {
                const productNumberInput = minusButton.parentElement.querySelector('.productNumber');
                let productNumber = parseInt(productNumberInput.value);

                if (productNumber > 1) {
                    productNumber -= 1;
                    productNumberInput.value = productNumber;
                }
            });

            // Додати обробник події для кнопки "Видалити"
            deleteButton.addEventListener('click', () => {
                const productItem = deleteButton.closest('.product-item');
                productItem.remove();
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
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productNumberInput = button.parentElement.querySelector('.productNumber');
            let productNumber = parseInt(productNumberInput.value);

            if (productNumber > 1) {
                productNumber -= 1;

                productNumberInput.value = productNumber;
            }
        });
    });

    notButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.parentElement.parentElement;
            productItem.remove();
        });
    });

    buyProductButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.parentElement.parentElement;
            const productInput = productItem.querySelector('.product');
            const minusButton = productItem.querySelector('.minus-button');
            const plusButton = productItem.querySelector('.plus-button');
            const productNumber = productItem.querySelector('.productNumber');
            const noBuyProductSection = document.createElement('section');
            noBuyProductSection.classList.add('not-buy-pr');
            const noBuyProductButton = document.createElement('button');
            noBuyProductButton.classList.add('not-buy-product');
            noBuyProductButton.dataset.tooltip = 'Не куплено';
            noBuyProductButton.textContent = 'Не куплено';

            // Зміна стилю назви товару на перекреслену
            productInput.style.textDecoration = 'line-through';

            minusButton.style.display = 'none';
            plusButton.style.display = 'none';

            productNumber.style.margin = '0';

            // Заміна секції "buy-pr" на секцію "not-buy-pr"
            noBuyProductSection.appendChild(noBuyProductButton);
            productItem.replaceChild(noBuyProductSection, button.parentElement);
        });
    });

    notBuyProductButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.parentElement.parentElement;
            const productInput = productItem.querySelector('.product');
            const minusButton = productItem.querySelector('.minus-button');
            const plusButton = productItem.querySelector('.plus-button');
            const productNumber = productItem.querySelector('.productNumber');

            productInput.style.textDecoration = 'none';

            minusButton.style.display = 'inline-block';
            plusButton.style.display = 'inline-block';

            productNumber.style.margin = '0 5px';
        });
    });
});
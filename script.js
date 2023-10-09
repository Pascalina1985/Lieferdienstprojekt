let basket_gericht = [];
let basket_prices = [];
let basket_amounts = [];

function render() {
    document.getElementById('gerichte').innerHTML = '';
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        document.getElementById('gerichte').innerHTML += addHTML(menu, i);
    }
    document.getElementById('basket').innerHTML = '';
    let totalBetweenSum = 0;
    for (let j = 0; j < basket_gericht.length; j++) {
        const basketMenu = basket_gericht[j];
        const basketPrice = parseFloat(basket_prices[j]);
        const formattedBasketPrice = basketPrice.toFixed(2).replace('.', ',');
        const delivery = 3.00;
        const formattedDelivery = delivery.toFixed(2).replace('.', ',');
        const amount = parseFloat(basket_amounts[j]);
        const betweenSum = basketPrice * amount;
        totalBetweenSum += betweenSum;
        const sum = (totalBetweenSum + delivery).toFixed(2).replace('.', ',');

        document.getElementById('warenkorb-placeholder').style.display = 'none';
        document.getElementById('basket').innerHTML += renderBasket(j, amount, basketMenu, formattedBasketPrice, totalBetweenSum);
        document.getElementById('sumSection').innerHTML = renderBasketSum(totalBetweenSum, formattedDelivery, sum);
    }
}

function addHTML(menu, i) {
    const formattedPrice = menu['preis'].toFixed(2).replace('.', ',');
    return `
      <div class="menu-container">
      <div class="menu-facts">
        <span><b>${menu['gericht']}</b></span>
        <span>${menu['beschreibung']}</span>
        <span><b>${formattedPrice} EUR</b></span>
        </div>
        <div class="button-container">
        <button onclick="addMenu('${menu['gericht']}', '${formattedPrice}')"><img class="plus-image" src="./img/plus.png" alt=""></button>
        </div>
      </div>
    `;
}

function renderBasket(j, amount, basketMenu, formattedBasketPrice, totalBetweenSum) {
    if (totalBetweenSum == 0) {
        document.getElementById('basket').style.display = 'none';
        window.location.reload();

    } else {
        return `
    <div class="basketContainer">
    <button onclick="reduce(${j})"><img class="reduce-add-picture" src="./img/minus.png"></button>
    <button onclick="increase(${j})"><img class="reduce-add-picture" src="./img/plus.png"></button>
    <div>${amount}</div>
    <div>${basketMenu}</div>
    <div>${formattedBasketPrice} EUR</div>
    </div>
    `;
    }
}

function renderBasketSum(totalBetweenSum, formattedDelivery, sum) {
    return `
    <div class="sum-container">
    <p>Zwischensumme: ${totalBetweenSum} EUR</p>
    <p>Lieferkosten: ${formattedDelivery} EUR</p>
    <p><b>Gesamt: ${sum} EUR</b></p>
    </div>
    <button onclick="removeWarenkorb()" class="pay-button"><b>Bezahlen ${sum} EUR</b></button>
    `;
}

function reduce(j) {
    let amount = basket_amounts[j];
    if (amount[j] === 0) {
        amount[j]--;
        window.location.reload();
    } else {
        basket_gericht.splice(j, 1);
        basket_prices.splice(j, 1);
        basket_amounts.splice(j, 1);
    }
    render();
}

function increase(index) {
    basket_amounts[index]++;
    render();
}

function addMenu(gericht, formattedPrice) {
    let index = basket_gericht.indexOf(gericht);
    if (index == -1) {
        basket_gericht.push(gericht);
        basket_prices.push(formattedPrice);
        basket_amounts.push(1);
    } else {
        basket_amounts[index]++;
    }
    //    save('gericht', basket_gericht); // wirklich speichern?
    //    save('preis', basket_prices); // wirklich speichern?
    render();
}

//function save(key, data) {
//    localStorage.setItem(key, JSON.stringify(data));
//}

function removeWarenkorb() {
    document.getElementById('basket').style.display = 'none';
    document.getElementById('sumSection').style.display = 'none';
    document.getElementById('greatings').innerHTML = `
    <p>Wir haben Ihre Bestellung erhalten <br> und schicken Ihnen bald das Essen zu.</p>
    `;
    setTimeout(() => {
        window.location.reload();
    }, 2200);
}
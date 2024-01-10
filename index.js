function decreaseQuantity(quantityId) {
    let quantityInput = document.getElementById(quantityId);
    let quantity = Number(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
}

function increaseQuantity(quantityId) {
    let quantityInput = document.getElementById(quantityId);
    let quantity = Number(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
}

var cart = [];  // 장바구니를 나타내는 배열

function addToCart(menuName, quantity) {
    var item = {
        menuName: menuName,
        quantity: Number(quantity)
    };

    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].menuName === item.menuName) {
            cart[i].quantity = item.quantity;  // 이미 장바구니에 있는 상품이면 수량을 업데이트합니다.
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push(item);  // 장바구니에 없는 상품이면 장바구니에 추가합니다.
    }

    displayCart();  // 장바구니 상태를 화면에 표시하는 함수
}

function removeMenuFromCart(menuName) {
    cart = cart.filter(function(item) {
        return item.menuName !== menuName;  // 삭제하려는 메뉴를 제외한 나머지 메뉴만 남깁니다.
    });

    displayCart();  // 장바구니 상태를 화면에 표시하는 함수
}

function updateCart(menuName, quantity, isChecked) {
    if (isChecked) {
        addToCart(menuName, quantity);
    } else {
        removeMenuFromCart(menuName);
    }
}

function resetCart() {
    cart = [];  // 장바구니를 비웁니다.
    displayCart();  // 장바구니 상태를 업데이트합니다.
}

function displayCart() {
    var cartContent = document.getElementById('cart-content');  // 장바구니 내용을 표시할 HTML 요소
    cartContent.innerHTML = '';  // 장바구니 내용을 초기화합니다.

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var menuItem = document.createElement('p');
        menuItem.textContent = item.menuName + ': ' + item.quantity + '개';
        cartContent.appendChild(menuItem);
    }
}

function sendOrder() {
    var orderItems = cart.map(item => ({
        menuName: item.menuName,
        quantity: item.quantity,
    }));

    // console.log(orderItems);
    console.log(JSON.stringify(orderItems, null, 2));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/order", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        orderItems: orderItems,
    }));
}

function sendNickname() {
    var nicknameInput = document.getElementById('nickname');
    var nickname = nicknameInput.value.trim();
    if (nickname) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/nickname", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("nickname=" + encodeURIComponent(nickname));
    }
}

// function sendNickname() {
//     return new Promise(function(resolve, reject) {
//         var nicknameInput = document.getElementById('nickname');
//         var nickname = nicknameInput.value.trim();
//         if (nickname) {
//             var xhr = new XMLHttpRequest();
//             xhr.open("POST", "http://localhost:3000/nickname", true);
//             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//             xhr.onload = function() {
//                 if (xhr.status === 200) {
//                     resolve();
//                 } else {
//                     reject(new Error('Nickname submission failed: ' + xhr.status));
//                 }
//             };

//             xhr.onerror = function() {
//                 reject(new Error('Network error'));
//             };

//             xhr.send("nickname=" + encodeURIComponent(nickname));
//         } else {
//             reject(new Error('Nickname is required'));  // 별명이 입력되지 않은 경우에 Promise를 거부합니다.
//         }
//     });
// }

// function goToNextPage() {
//     location.href = 'html/main.html';
// }

// function complex() {
//     sendNickname()
//         .then(sendOrder)
//         .then(goToNextPage)
//         .catch(function(error) {
//             if (error.message === 'Nickname is required') {
//                 alert('별명을 입력해주세요.');
//                 return Promise.reject(error);  // 별명 입력 오류를 다시 거부합니다.
//             } else {
//                 console.error('Failed to send order:', error);
//             }
//         });
// }

function complex() {
    sendNickname();
    sendOrder();
}
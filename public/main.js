// if the document is still loading, then addEventListener, otherwise run ready()
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

// give the properties for the product in the product page
function ProductInfo(
  src,
  imgAlt,
  width,
  name,
  starNum,
  price,
  detailLink,
  imgClass
) {
  this.src = src
  this.imgAlt = imgAlt
  this.width = width
  this.name = name
  this.starNum = starNum
  this.price = price
  this.detailLink = detailLink
  this.imgClass = imgClass
}

// generate the products array
function generatProductsArray() {
  let originalAmericano = new ProductInfo(
    'OriginalAmericano.png',
    'original americano',
    72,
    'Original Americano',
    4,
    '$4.99',
    'detail.html',
    ''
  )

  let caramelMacchiato = new ProductInfo(
    'CaramelMacchiato.png',
    'caramel macchiato',
    60,
    'Caramel Macchiato',
    3,
    '$5.99',
    'detail.html',
    'middle'
  )

  let peppermintMocha = new ProductInfo(
    'PeppermintMocha.png',
    'pepper mint mocha',
    68,
    'Peppermint Mocha',
    5,
    '$6.99',
    'detail.html',
    ''
  )

  let products = [originalAmericano, caramelMacchiato, peppermintMocha]
  return products
}

// generate the html for products
function generateProductDiv(product) {
  var productItem = document.createElement('div')
  productItem.classList.add('flex-child')

  var productItemContents = `
    <div class="card">
    <a href = ${product.detailLink}>
      <img
        src=${product.src}
        alt=${product.imgAlt}
        style="width: ${product.width}%"
        class = ${product.imgClass}
      />
      </a>
    </div>
    <a href = ${product.detailLink} style="text-decoration:none" >
    <div class="product-name">${product.name}</div></a>`

  for (var i = 0; i < product.starNum; i++) {
    productItemContents += `<span class="fa fa-star checked"></span>`
  }

  productItemContents += `
    <div class="flex-container price">
      <div class="flex-child-price">${product.price}</div>
      <div class="flex-child-price">
        <button
          class="button coffee-plus-minus add-go-to-detail detail-button"
          onClick="location.href='${product.detailLink}'"
        >
          Detail
        </button>
      </div>
    </div>`

  productItem.innerHTML = productItemContents
  return productItem
}

function generateProducts() {
  if (document.getElementsByClassName('product-items')[0] !== undefined) {
    var productItems = generatProductsArray()
    var productItemsElement = document.getElementsByClassName(
      'product-items'
    )[0]
    for (var i = 0; i < productItems.length; i++) {
      var productItem = productItems[i]
      productItemsElement.append(generateProductDiv(productItem))
    }
  }
}

// set up:
// 1. all the necessary eventListeners,
// 2. fetch/store data from localstorage
// 3. update the item number and total price for the items in the cart.
function ready() {
  var cartItemsInStorage
  // if we have the local storage for cart items, then fetch it.
  if (localStorage.getItem('cart-items')) {
    cartItemsInStorage = JSON.parse(localStorage.getItem('cart-items'))
  } else {
    cartItemsInStorage = []
    localStorage.setItem('cart-items', JSON.stringify(cartItemsInStorage))
  }

  updateCartItemNum()

  // for the detail page.

  // if we are in the cart page, then we fetch the existing data from the local storage.
  if (document.getElementsByClassName('cart-items')[0] !== undefined) {
    var cartItems = JSON.parse(localStorage.getItem('cart-items'))
    for (var i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i]
      addItemToCart(
        cartItem.name,
        cartItem.size,
        cartItem.flavor,
        cartItem.price,
        cartItem.quantity
      )
    }
    updateCartTotal()
  }

  generateProducts()

  // for the product page.
  var detailItem = document.getElementsByClassName('detail-num')[0]
  if (detailItem != undefined) {
    detailItem.addEventListener('change', updateProductPrice)
  }

  // set up the remove buttons with click event listeners
  var removeCartItemButtons = document.getElementsByClassName(
    'cart-remove-button'
  )

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeItem)
  }

  // set up quantity input with event listeners
  var quantityInputs = document.getElementsByClassName('item-quantity')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  // set up add to cart buttons with event listeners
  var addToCartButtons = document.getElementsByClassName('add-to-cart')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
}

// event handler for clicking the add to cart button
function addToCartClicked(event) {
  var button = event.target
  var detailElement =
    button.parentElement.parentElement.parentElement.parentElement

  var nameElement = detailElement.getElementsByClassName('detail-product-name')
  var name = nameElement[0].innerText

  var quantityElement = detailElement.getElementsByClassName('detail-num')

  var quantity = quantityElement[0].value

  var flavorElement = detailElement.getElementsByClassName('detail-flavor')
  var flavor = flavorElement[0].value

  var sizeElement = detailElement.getElementsByClassName('detail-size')
  var size = sizeElement[0].value

  var priceElement = detailElement.getElementsByClassName('detail-price')
  var price = priceElement[0].innerText

  var cartItems = JSON.parse(localStorage.getItem('cart-items'))
  cartItems.push({
    name: name,
    quantity: quantity,
    flavor: flavor,
    size: size,
    price: price,
  })

  localStorage.setItem('cart-items', JSON.stringify(cartItems))
  updateCartItemNum()
}

// event handler for adding item to cart items list.
function addItemToCart(name, size, flavor, price, quantity) {
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  cartRow.classList.add('order-detail')
  cartRow.classList.add('flex-container')

  var cartRowContents = `
  <div class="flex-container-order-detail">
    <div class="cart-product-name item-name">${name},</div>
    <div class="cart-product-detail item-size">${size},</div>
    <div class="cart-product-detail item-flavor">${flavor},</div>
    <div class="cart-product-detail item-price">${price}</div>

  </div>
  <div class="flex-container-order-detail">
  <input
    class="cart-product-detail item-quantity"
    type="number"
    value=${quantity}
    disabled
  />
    <button class="button cart-remove-button">remove</button>
  </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}

//event handler for changing the quntity of an item.
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

// event handler for removing an item from the cart
function removeItem(event) {
  var buttonClicked = event.target

  var itemInfoElement = buttonClicked.parentElement.parentElement

  var nameElement = itemInfoElement.getElementsByClassName('item-name')
  var name = nameElement[0].innerText

  var quantityElement = itemInfoElement.getElementsByClassName('item-quantity')
  var quantity = quantityElement[0].value

  var flavorElement = itemInfoElement.getElementsByClassName('item-flavor')
  var flavor = flavorElement[0].innerText

  var sizeElement = itemInfoElement.getElementsByClassName('item-size')
  var size = sizeElement[0].innerText

  var priceElement = itemInfoElement.getElementsByClassName('item-price')
  var price = priceElement[0].innerText

  var cartItemsWhenRemove = JSON.parse(localStorage.getItem('cart-items'))
  for (var i = 0; i < cartItemsWhenRemove.length; i++) {
    var item = cartItemsWhenRemove[i]

    if (
      item.name === name.slice(0, -1) &&
      item.price === price &&
      item.size === size.slice(0, -1) &&
      item.flavor === flavor.slice(0, -1) &&
      item.quantity === quantity
    ) {
      cartItemsWhenRemove.splice(i, 1)
      localStorage.setItem('cart-items', JSON.stringify(cartItemsWhenRemove))
      break
    }
  }

  itemInfoElement.remove()
  updateCartTotal()
  updateCartItemNum()
}

//update the cart item number when add or remove items.
function updateCartItemNum() {
  var cartItemNum = document.getElementsByClassName('cart-item-number')[0]
  if (localStorage.getItem('cart-items')) {
    cartItems = JSON.parse(localStorage.getItem('cart-items'))
    cartItemNum.innerHTML = cartItems.length
  } else {
    cartItemNum.innerHTML = 0
  }
}

// update the total price for the items in the cart
function updateCartTotal() {
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItems.getElementsByClassName('cart-row')
  var totalValue = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('item-price')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))

    totalValue += price
  }
  totalValue = Math.round(totalValue * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText =
    'Total: ' + '$' + totalValue
}

// update the product prices according to different quantity.
function updateProductPrice() {
  var detailItem = document.getElementsByClassName('detail-item')[0]
  var detailName = detailItem.getElementsByClassName('detail-product-name')[0]
    .innerText

  var price
  var products = generatProductsArray()
  for (var i = 0; i < products.length; i++) {
    var product = products[i]
    if (product.name == detailName) {
      price = product.price
    }
  }
  console.log(detailName)

  var totalPrice = 0

  var detailNum = detailItem.getElementsByClassName('detail-num')[0]

  var detailPrice = detailItem.getElementsByClassName('detail-price')[0]
  var price = parseFloat(price.replace('$', ''))

  totalPrice += detailNum.value * price

  totalPrice = Math.round(totalPrice * 100) / 100

  if (detailNum.value <= 0) {
    detailNum.value = 0
    detailPrice.innerText = '$' + 0
    return
  }
  detailPrice.innerText = '$' + totalPrice
}

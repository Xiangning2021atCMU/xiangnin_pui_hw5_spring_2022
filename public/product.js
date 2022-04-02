// // give the properties for the product in the product page
// export function ProductInfo(
//   src,
//   imgAlt,
//   width,
//   name,
//   starNum,
//   price,
//   detailLink,
//   imgClass
// ) {
//   this.src = src
//   this.imgAlt = imgAlt
//   this.width = width
//   this.name = name
//   this.starNum = starNum
//   this.price = price
//   this.detailLink = detailLink
//   this.imgClass = imgClass
// }

// // generate the products array
// export function generatProductsArray() {
//   let originalAmericano = new ProductInfo(
//     'OriginalAmericano.png',
//     'original americano',
//     72,
//     'Original Americano',
//     4,
//     '$4.99',
//     'detail.html',
//     ''
//   )

//   let caramelMacchiato = new ProductInfo(
//     'CaramelMacchiato.png',
//     'caramel macchiato',
//     60,
//     'Caramel Macchiato',
//     3,
//     '$5.99',
//     'detail.html',
//     'middle'
//   )

//   let peppermintMocha = new ProductInfo(
//     'PeppermintMocha.png',
//     'pepper mint mocha',
//     68,
//     'Peppermint Mocha',
//     5,
//     '$6.99',
//     'detail.html',
//     ''
//   )

//   let products = [originalAmericano, caramelMacchiato, peppermintMocha]
//   return products
// }

// // generate the html for products
// export function generateProductDiv(product) {
//   var productItem = document.createElement('div')
//   productItem.classList.add('flex-child')

//   var productItemContents = `
//     <div class="card">
//       <img
//         src=${product.src}
//         alt=${product.imgAlt}
//         style="width: ${product.width}%"
//         class = ${product.imgClass}
//       />
//     </div>
//     <div class="product-name">${product.name}</div>`

//   for (var i = 0; i < product.starNum; i++) {
//     productItemContents += `<span class="fa fa-star checked"></span>`
//   }

//   productItemContents += `
//     <div class="flex-container price">
//       <div class="flex-child-price">${product.price}</div>
//       <div class="flex-child-price">
//         <button
//           class="button coffee-plus-minus add-go-to-detail detail-button"
//           onClick="location.href='${product.detailLink}'"
//         >
//           Detail
//         </button>
//       </div>
//     </div>`

//   productItem.innerHTML = productItemContents
//   return productItem
// }

// export function generateProducts() {
//   if (document.getElementsByClassName('product-items')[0] !== undefined) {
//     var productItems = generatProductsArray()
//     var productItemsElement = document.getElementsByClassName(
//       'product-items'
//     )[0]
//     for (var i = 0; i < productItems.length; i++) {
//       var productItem = productItems[i]
//       productItemsElement.append(generateProductDiv(productItem))
//     }
//   }
// }

export function check() {
  console.log('check')
}

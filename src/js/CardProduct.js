import { discountPrice } from './utils/utils.js';

class CardProduct extends HTMLElement {
  constructor() {
    super();
    this.image;
    this.name;
    this.discount;
    this.price;
    this.id;
  }
  static get observedAttributes() {
    return ['image', 'name', 'discount', 'price', 'id'];
  }

  attributeChangedCallback(nameAtr, oldValue, newValue) {
    if (nameAtr === 'discount' || nameAtr === 'price') {
      this[nameAtr] = parseInt(newValue);
    } else {
      this[nameAtr] = newValue;
    }
  }
  connectedCallback() {
    this.innerHTML = `<div class="col d-flex justify-content-center mb-4">
        <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem">
            <img
                src="${this.image}"
                class="card-img-top img_cover"
                alt="${this.name}"
            />
            
            <div class="card-body text-white-50">
                <p class="card-text">${this.name}</p>
            </div>
            <div class="discount card-body text-white-50" style="padding:10px">
              <h6 class="card-title" style="text-decoration:line-through;">
                <span>${
                  this.discount > 0
                    ? `$ ${discountPrice(this.price, this.discount)}`
                    : ''
                }</span>
              </h6>
            </div>
            <div
                class="card-body text-white-50 d-flex justify-content-between align-items-baseline" style="padding:10px"
            >
            <h5 class="card-title"><span>$ ${this.price}</span></h5>
           
            <span  style="font-size: 13px; font-weight: 600; color: green">${
              this.discount > 0 ? `${this.discount}% OFF` : ``
            }</span>
        <button
        type="button"
        id="${
          this.id
        }" class="btn-add-cart btn btn-primary">Add to cart</button>
        </div>
    </div>`;
  }
}

window.customElements.define('card-product', CardProduct);

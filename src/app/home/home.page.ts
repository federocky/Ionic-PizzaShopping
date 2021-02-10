import { CartModalPage } from './../pages/cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private cartService: CartService,
              private modalCtrl: ModalController
    ) {}

    ngOnInit(){
      this.products = this.cartService.getProducts();
      this.cart = this.cartService.getCart();
      this.cartItemCount = this.cartService.getCartItemCount();
    }

    addToCart(product){
      //utilizamos la animacion
      this.animateCSS('tada');
      this.cartService.addProduct(product);
    }

    async openCart(){
      //utilizamos la animacion
      this.animateCSS('bounceOutLeft', true);

      let modal = await this.modalCtrl.create({
        component: CartModalPage,
        cssClass: 'cart-modal'
      });
      modal.onWillDismiss().then(() => {
        this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
        this.animateCSS('bounceInLeft');
      });
      modal.present();
    }

    animateCSS(animationName, keepAnimated = false) {
      const node = this.fab.nativeElement;
      node.classList.add('animated', animationName)

      function handleAnimationEnd() {
        if(!keepAnimated) {
          node.classList.remove('animated', animationName);
        }
        node.removeEventListener('animationend', handleAnimationEnd)
      }
      node.addEventListener('animationend', handleAnimationEnd)
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
   selector: 'page-home',
   templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
   selTab:string

   curSnd: MediaObject
   newSnd: MediaObject
   fadeTime = 1000
   path: string = './assets/mp3/'
   songNow: string
   songNew:string 

   constructor(
      private platform: Platform,
      private media: Media
   ) {
      console.log('HomePage constructor')
      if (((this.platform.is('mobileweb') == true) || (this.platform.is('core') == true)) == false)
         this.path = '/android_asset/www/assets/mp3/'
   }

   ngOnDestroy() {
   }
   ngOnInit() {
   }

   playMusic(fn) {
      this.songNew = fn
      this.fadeOut()
      // if (fn != this.fn)
      //    this.fadeIn(fn)
   }
   private fadeIn() {
      this.songNow = this.songNew
      this.curSnd = this.media.create(this.path + this.songNow)
      this.curSnd.play()
      //this.setVolIn(this.newSnd, 1)
   }
   private fadeOut() {
      if (!this.curSnd)
         this.fadeIn()
      else
         this.setVolOut(this.curSnd, 1)
   }
   private setVolIn(snd, i) {
      setTimeout(() => {
         const v = (0.2 * i)
         console.log('fadeIn: ' + v)
         snd.setVolume(v)
         if (i < 5) {
            i = i + 1
            this.setVolIn(snd, i)
         }
         else {
            console.log('fadeIN FINISH..... update curSnd')
            this.curSnd = snd
         }
      }, this.fadeTime / 5)
   }
   private setVolOut(snd, i) {
      setTimeout(() => {
         const v = 1 - (0.2 * i)
         console.log('fadeOut: ' + v)
         snd.setVolume(v)
         if (i < 5) {
            i = i + 1
            this.setVolOut(snd, i)
         }
         else {
            console.log('fadeOUT FINISH.....')
            snd.stop()
            snd.release()
            snd = undefined
            if (this.songNew != this.songNow)
               this.fadeIn()
         }
      }, this.fadeTime / 5)
   }
}

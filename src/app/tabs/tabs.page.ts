import {Component, OnInit, OnDestroy} from '@angular/core';
import { MenuController, ModalController, AnimationController } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
import { MusicModalEnterAnimation, MusicModalLeaveAnimation } from '../app.animations';

import { Howl } from 'howler';
import { MusicController, PlayerEventOptions, initialPlayerEventOptions } from '../services/music-controller/music-controller.service';
import { MusicPlayerComponent } from '../shared/components/music-player/music-player.component';
import { AppEventsService } from '../services/app-events/app-events.service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/auth/login/login.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  tabs: any[] = [
    { id: 'explore', badge: 0, icon: 'home-outline' },
    { id: 'my_parcels', badge: 0, icon: 'cube-outline' },
    { id: 'delivery', badge: 0, icon: 'navigate-outline' },
    { id: 'notifications', badge: 0, icon: 'notifications-outline' },
    { id: 'profile', badge: 0, icon: 'person-circle-outline' }
  ];
  activeTab = '';

  player: Howl = null;
  isPlaying = false;
  progress = 0;
  oUsername='';
  music: PlayerEventOptions = initialPlayerEventOptions;

  private subscriptions: SubscriptionLike[] = [];
  constructor(
    private appEvents: AppEventsService,
    private menu: MenuController,
    private animationCtrl: AnimationController,
    private modalController: ModalController,
    private musicController: MusicController,
    public storage : Storage,
    public modalCtrl:ModalController,
    public LoginPage: LoginPage
  ) {
    this.storage.get('_user').then((res) => {
      this.oUsername = res;
      console.log(this.oUsername);
      // this.doGetUser(this.oUsername);
    });
   }

  /**
   * Toggle music play/pause
   */
  toggleMusic() {
    this.musicController.togglePlayer(this.music.isPlaying, (this.music.seek / this.music.duration) * 100);
  }

  /**
   * Close music player
   */
  closePlayer() {
    this.musicController.abort();
  }

  /**
   * On tab change
   * check tab if profile tab or not
   */
  tabChanged(event) {
    this.activeTab = event.tab;
  }

  /**
   * On tab click
   * Send event, if user click tab second time or more
   * @param {any} tab - tab object
   */
  async tabClicked(tab) {
    if(this.oUsername == undefined || this.oUsername == ""){
      const modal = await this.modalCtrl.create({
        component: LoginPage,
        componentProps: { value: 123 }
      });
  
      await modal.present();
    }else{
      if (this.activeTab === tab.id) {
        this.appEvents.tabClicks.next(tab);
      }
    }
   
  }

  /**
   * Open music modal
   */
  async openMusicModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const modal = await this.modalController.create({
      component: MusicPlayerComponent,
      cssClass: 'music-modal',
      swipeToClose: true,
      componentProps: {
        music: this.music
      },
      enterAnimation: MusicModalEnterAnimation,
      leaveAnimation: MusicModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  ngOnInit(): void {
    // Subscribe to music events
    this.subscriptions.push(
      this.musicController.onProgress.subscribe((res) => {
        this.music = { ...this.music, ...res };
        this.progress = +(this.music.seek / this.music.duration);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }
}

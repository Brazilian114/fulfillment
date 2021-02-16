import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // Tab 2
      {
        path: 'my_parcels',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-parcels/my-parcels.module').then( m => m.MyParcelsPageModule)
          }
        ]
      },
      // {
      //   path: 'my-parcels',
      //   loadChildren: () => import('./my-parcels/my-parcels.module').then( m => m.MyParcelsPageModule)
      // },
      // Tab 1
      {
        path: 'explore',
        children: [
          {
            path: '',
            loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule)
          },
          {
            path: 'music',
            loadChildren: () => import('../pages/music/music.module').then(m => m.MusicPageModule)
          },
          {
            path: 'friends',
            loadChildren: () => import('../pages/friends/friends.module').then(m => m.FriendsPageModule)
          },
          {
            path: 'order-tracking',
            loadChildren: () => import('../pages/order-tracking/order-tracking.module').then(m => m.OrderTrackingPageModule)
          },
          {
            path: 'check-price',
            children: [
          {
            path: '',
            loadChildren: () => import('../pages/check-price/check-price.module').then( m => m.CheckPricePageModule)
          },
          {
            path: 'search-location',
            loadChildren: () => import('../search-location/search-location.module').then(m => m.SearchLocationPageModule)
          }
        ]
          },
          {
            path: 'delivery',
            loadChildren: () => import('../pages/delivery/delivery.module').then( m => m.DeliveryPageModule)
          },
          {
            path: 'my-parcels',
            loadChildren: () => import('./my-parcels/my-parcels.module').then( m => m.MyParcelsPageModule)
          }
        ]
      },
      // Tab 3
      // {
      //   path: 'messages',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule)
      //     }
      //   ]
      // },
      {
        path: 'delivery',
        loadChildren: () => import('../pages/delivery/delivery.module').then( m => m.DeliveryPageModule)
      },
      // Tab 4
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
          }
        ]
      },
      // Tab 5
      {
        path: 'profile',
        children: [
          // {
          //   path: '',
          //   loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
          // },
          {
            path: '',
            loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/explore',
    pathMatch: 'full'
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

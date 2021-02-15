import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController, AlertController, Platform, MenuController, ModalController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { AppEventsService } from 'src/app/services/app-events/app-events.service';
import { WebServiceService } from 'src/app/services/service/web-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('focusInputUsername') InputName;
  @ViewChild('focusInputPassword') InputPass;
  loader: any;
  oDate:any;
  img:string="";
  data_logins: any;
  data_warehouse:any;
  oUsername: string = '';
  oPassword: string = '';
  url: string;
  versionNumber: any = "1.0.0";
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    public http: HttpClient,
    public service:WebServiceService,
    private alertCtrl: AlertController,private loadingCtrl:LoadingController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) { }

  // onLogin() {
  //   if (this.login.valid) {
  //     console.log(this.login.value);
  //   }
  // }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        // Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(150)
      ])
    });
  }
  async onLogin(oUsername, oPassword) {
     if (this.login.valid) {
       oUsername = this.login.value.email;
       oPassword = this.login.value.password;
      console.log(this.login.value);
          if (oUsername == "" || oUsername == undefined) {
            this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้อีกครั้ง');
          } else if (oPassword == "" || oPassword == undefined) {
            this.Alert('Error', 'กรุณากรอกรหัสผ่านอีกครั้ง');
          } else {
            oUsername = oUsername.toUpperCase();
            oPassword = oPassword.toUpperCase();
            this.presentLoading();
            this.service.get_login(oUsername, oPassword).then((res) => {
              this.data_logins = res;
              console.log(this.data_logins);
              if (this.data_logins['sqlstatus'] != '0') {
                this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
              } else {
                // this.Alert('Success', 'Success');
                // this.service.get_WarehouseByUser(oUsername).then((res) =>{
                //   this.data_warehouse = res;
                //   console.log(this.data_warehouse);
                //   // window.localStorage.setItem('_LOGIN', "IN");
                //   // window.localStorage.setItem('_USER', oUsername);
                //   this.storage.ready().then(() => {
                //   this.storage.set('_warehouse', res["0"].Warehouse["0"])
                // })
                // })
                // this.service.get_client(oUsername).then((res)=>{
                // this.storage.set('_client', res["0"].client["0"]);
                // this.storage.set('_clientname', res["0"].client_name["0"]);
                //   console.log("client",res);
                  
                // })
                this.storage.ready().then(() => {
                  this.storage.set('_user', oUsername)
                })
                this.dismiss();
                //this.finishLoding();
                this.navCtrl.navigateRoot("/");
              }
            }).catch(err => {
              this.Alert("Error",JSON.stringify(err));
          });;
          }
        }else{

        }
  }
  // async presentModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: SettingPage,
  //     componentProps: { value: 123 }
  //   });

  //   await modal.present();
  //   const modalData = await modal.onWillDismiss();
  //  // console.log(modalData);
  //   this.reload();

  // }
  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: "Loading...",
      duration: 2000
    });
    await this.loader.present();
  };
  async presentToast(key, showCloseButton, position: string) {
    const toast = await this.toastCtrl.create({
      message: key,
      // showCloseButton: showCloseButton,
      //closeButtonText: 'Ok',
       duration: 2000,
      //position: position
    });
    toast.present();
  }
  async Alert(title, subTitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: subTitle,
      buttons: [{
        text: 'ตกลง',
        handler: data => {

        }
      }]
    });
    alert.present();
  }
  finishLoding() {
    this.loader.dismiss();
  }
  reload() {
    window.location.href = './'
  }
  dismiss() {
    this.modalCtrl.dismiss();
    // this.navCtrl.navigateForward('login');
  }
}

import { Component, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { bb } from 'billboard.js';
import { DispenserService } from '../services/dispenser/dispenser.service';
import { MqttService } from '../services/mqtt/mqtt.service';
import { Subscription } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('Chart1') domGauge;
  @ViewChild('Chart2') domGauge2;
  gauge: any;
  gauge2: any;

  qrResult: any;

  dispensers: any = [];
  dispenserId: any;

  subscription: Subscription;
  items: any = [];

  updater: any = [];

  constructor(
    private scanner: BarcodeScanner,
    private router: Router,
    private mqtt: MqttService,
    private dispenserService: DispenserService,
    private alertController: AlertController) {
  }

  ionViewDidEnter() {
    this.loadGaugeChart1();
    this.loadGaugeChart2();

    this.getDispensers();
  }

  valueChange() {
    console.log(this.dispenserId);
    if (this.subscription) {
      this.mqttUnsubscribe();
    }
    this.mqttSubscribe();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Connecting to dispenser',
      subHeader: 'Dispenser # 4',
      buttons: ['OK']
    });

    await alert.present();
  }

  mqttSubscribe() {
    this.subscription = this.mqtt.mqttService.observe(this.mqtt.topic + this.dispenserId).subscribe((message: IMqttMessage) => {
      let string = message.payload.toString();
      let fix = string.replace(/'/g, '"');
      this.updater = JSON.parse(fix);
      this.update();
    })
  }

  mqttUnsubscribe() {
    this.subscription.unsubscribe();
  }

  getDispensers() {
    this.dispenserService.getDispensers().subscribe(res => {
      this.dispensers = res.dispensers;
      var dispenser = this.dispensers.find(el => el.id == 4);
      console.log(this.dispensers);
      this.dispenserId = dispenser.id;
      this.items = dispenser.items;
      //console.log(this.items);
      this.updater = this.items;
      this.update();
    }, err => {
      console.log(err);

    })
  }

  scan() {
    this.scanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.qrResult = JSON.stringify(barcodeData);
      //this.openCatalogue(barcodeData.text);
      this.presentAlert();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  dispense(item) {
    //console.log(item.id)
    this.mqtt.publish(this.dispenserId, item.id, item.motor).subscribe((res) => {
      console.log(res);

    }, err => {
      console.log("errOr: " + err);

    }, () => {
      console.log("Publishing complete");

    });
  }

  openCatalogue(id) {
    this.router.navigateByUrl('/catalogue/' + id);
  }

  loadGaugeChart1() {
    this.gauge = bb.generate({
      data: {
        columns: [
          ["data", 0]
        ],
        type: "gauge",
      },
      gauge: {
        label: {
          format: value => value
        },
        max: 5
      },
      color: {
        pattern: [
          "#FF0000",
          "#F97600",
          "#60B044"
        ],
        threshold: {
          values: [
            1,
            2,
            3
          ]
        }
      },
      size: {
        height: 180
      },
      bindto: this.domGauge.nativeElement
    });
  }

  loadGaugeChart2() {
    this.gauge2 = bb.generate({
      data: {
        columns: [
          ["data", 0]
        ],
        type: "gauge",
      },
      gauge: {
        label: {
          format: value => value
        },
        max: 5
      },
      color: {
        pattern: [
          "#FF0000",
          "#F97600",
          "#60B044"
        ],
        threshold: {
          values: [
            1,
            2,
            3
          ]
        }
      },
      size: {
        height: 180
      },
      bindto: this.domGauge2.nativeElement
    });
  }

  update() {
    this.updateGaugeChart1Data();
    this.updateGaugeChart2Data();
  }

  updateGaugeChart1Data() {
    let data = this.updater[0].quantity
    let current = this.gauge.data("data");
    if (current[0].values[0].value != data) {
      this.gauge.load({
        columns: [["data", data]]
      });
    }
  }

  updateGaugeChart2Data() {
    let data = this.updater[1].quantity
    let current = this.gauge2.data("data");
    if (current[0].values[0].value != data) {
      this.gauge2.load({
        columns: [["data", data]]
      });
    }
  }
}
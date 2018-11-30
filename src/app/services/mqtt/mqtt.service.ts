import { Injectable } from '@angular/core';
import { MqttService as IMqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  // /dsd/dispenser/:id/dispense/:productId
  public topic = "/dsd/dispenser/";

  private subscription: Subscription;

  constructor(public mqttService: IMqttService) {
  }

  publish(dispenser, item, motor) {
    //this.mqttService.unsafePublish(this.topic, message, {qos: 2, retain: false});
    let topic = this.topic + dispenser + "/dispense";
    return this.mqttService.publish(topic, JSON.stringify({ dispenser, item, motor }), { qos: 2, retain: false });
  }
}

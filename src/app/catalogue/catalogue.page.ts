import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMqttMessage } from 'ngx-mqtt';
import { MqttService } from '../services/mqtt/mqtt.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {

  private slug: string;
  catalogue: any;

  constructor(
    private mqttService: MqttService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    console.log(this.slug);
    this.subscribe();
  }

  subscribe() {
    // this.mqttService.subscribe(this.slug).subscribe((message:IMqttMessage)=>{
    //   console.log(message.payload.toString());
    //   this.catalogue = message.payload.toString();
    // });
  }


}


/* 
https://gist.githubusercontent.com/xentyo/baf57f1dcbacfe45c0cc897f59a0cf04/raw/6a9a5b12f30a33d4625098e99269653e71be45fe/dispenser-inventory.json*/
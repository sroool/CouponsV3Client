import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  
  couponId;
  constructor(private activeRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.couponId = this.activeRoute.snapshot.params["id"];
    this.router.navigateByUrl("/coupon/"+this.couponId, {replaceUrl: true}); 
  }

}

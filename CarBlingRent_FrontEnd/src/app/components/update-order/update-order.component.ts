import { OrdersService } from 'src/app/services/orders.service';
import { OrderModel } from './../../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-update-order',
    templateUrl: './update-order.component.html',
    styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
    public order: OrderModel;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private ordersService: OrdersService) { }

    public async ngOnInit() {
        try {
            const id = +this.activatedRoute.snapshot.params.orderID;
            this.order = new OrderModel();
            this.order = await this.ordersService.getOneOrder(id);
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async updateOrder() {
        try {
            const updatedOrder = await this.ordersService.updateOrder(this.order);

            this.router.navigateByUrl("/orders");
        }
        catch (err) {
            alert(err.message);
        }
    }
}
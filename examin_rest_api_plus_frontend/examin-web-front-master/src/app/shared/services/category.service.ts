import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    endpoint = 'category';

    constructor(
        private apiService: ApiService
    ) { }

    /**
     * get payments
     * @params request params
     */
    get(params: object) {
        return this.apiService.getWithParams(this.endpoint, params);
    }

}

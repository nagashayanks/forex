import { Injectable } from '@angular/core';
@Injectable()
export class ConstantService {
    constant = {};
    messageConstant() {
        return this.constant = {
            404: 'Username/Password is not valid',
            0: 'Server Error'
        };
    }

}

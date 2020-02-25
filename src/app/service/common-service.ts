import { Injectable } from '@angular/core';
@Injectable()
export class CommonService {
    alertConfig = {
        header: '',
        message: '',
        modalShow: false,
        button: ''
    };

    /* Get logged user */
    public loggedUser() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }

    /* Check whether valid user or not  */
    public validUser() {
        if (this.loggedUser()) {
            return true;
        } else {
            return false;
        }
    }

    /* Set modal properities  */
    public alertConfigDefaultValue() {
        this.alertConfig = {
            header: null,
            message: null,
            modalShow: false,
            button: null
        };
    }
    /* Set modal properities  */
    public modalConfig(head, mesg, modal, btn) {
        return {
            header: head,
            message: mesg,
            modalShow: modal,
            button: btn
        };
    }
}

// resetMessage.js
import {Message} from 'element-ui';
const showMessage = Symbol('showMessage');
class DonMessage {
    success (options, single = true) {
        this[showMessage]('success', options, single)
    }
    warning (options, single = true) {
        this[showMessage]('warning', options, single)
    }
    info (options, single = true) {
        this[showMessage]('info', options, single)
    }
    error (options, single = true) {
        this[showMessage]('error', options, single)
    }

    [showMessage] (type, options, single) {
        if (single) {
            if (document.getElementsByClassName('el-message').length === 0) {
                if(type === 'error' || type === 'warning'){
                    options = {
                        message: options,
                        duration: 3500,
                        showClose: true
                    };
                } else {
                    options = {
                        message: options,
                        duration: 2000,
                        showClose: true
                    };
                }
                Message[type](options)
            }
        } else {
            options = {
                message: options,
                duration: 2000,
                showClose: true
            };
            Message[type](options)
        }
    }
}
export const newMessage = new DonMessage();

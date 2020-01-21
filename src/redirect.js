const swal = require('sweetalert2')
import { languageSet } from './assets/js/language'

export default {
    redirect(url, title, text, type, reload) {
        swal.fire({
            title: title,
            text: text,
            type: type,
            confirmButtonText: languageSet['CONFIRMTXT']
        }).then(function(){
          window.location.replace(url)
          if(reload) {
            location.reload()
          }
        })
    }
}
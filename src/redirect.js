const swal = require('sweetalert2')
import { language } from './assets/js/language'
if(localStorage.getItem('ULG_LANG') == 'JP') {       
  var languageSet = language.JP
} else {
  var languageSet = language.TW
}
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
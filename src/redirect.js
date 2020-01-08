const swal = require('sweetalert2')

export default {
    redirect(url, title, text, type, reload) {
        swal.fire({
            title: title,
            text: text,
            type: type,
            confirmButtonText: '確定'
        }).then(function(){
          window.location.replace(url)
          if(reload) {
            location.reload()
          }
        })
    }
}
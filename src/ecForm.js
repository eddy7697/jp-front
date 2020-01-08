export default {
    ecPay: function(getData) {
        console.log('marty!', getData)
        var formdata = getData.body
        var ecurl = getData.url
        var myform = document.getElementById("ecform")
        myform['action'] = ecurl
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "MerchantID"
        input.value = formdata.MerchantID
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "MerchantTradeNo"
        input.value = formdata.MerchantTradeNo
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "MerchantTradeDate"
        input.value = formdata.MerchantTradeDate
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "PaymentType"
        input.value = formdata.PaymentType
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "TotalAmount"
        input.value = formdata.TotalAmount
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "TradeDesc"
        input.value = formdata.TradeDesc
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden"
        input.name = "ItemName"
        input.value = formdata.ItemName
        myform.appendChild(input)
        var input = document.createElement("input")
        input.type = "hidden";
        input.name = "ReturnURL";
        input.value = formdata.ReturnURL;
        myform.appendChild(input);
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "ChoosePayment";
        input.value = formdata.ChoosePayment;
        myform.appendChild(input);
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "EncryptType";
        input.value = formdata.EncryptType;
        myform.appendChild(input);
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "CheckMacValue";
        input.value = formdata.CheckMacValue;
        myform.appendChild(input);

        document.getElementById("ecform").submit()
        
    }
}
exports.ramdomNumber = (length = 10) => {
    let text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
    {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text ;
}

exports.token = "GROUPOMANIASECRETWORD" ; 
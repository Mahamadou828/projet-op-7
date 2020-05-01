export default function VerifyInput(value , code) {

    let regex ; 
    let error ; 

    switch(code) 
    {
        case 1:
            regex = new RegExp (/^[a-zA-Z]+$/) ;

            if (regex.test(value)) {
                error = " " ; 
            } else {
                error = "No valid name or surname"
            }
            return {
                result: regex.test(value) , 
                error: error
            } ;
            break ;

        case 2: 
            regex = new RegExp (/^[a-z0-9\-_\.]+@[a-z0-9]+\.[a-z]{2,5}$/) ; 

            if (regex.test(value)) {
                error = " " ; 
            } else {
                error = "No valid Email"
            }
            return {
                result: regex.test(value),
                error: error
            } ;
            break ;
        
        case 3: 
            const authorize = ["jpg" , "png" , "jpeg"] ; 
            const extension = value.name.split(".")[1] ; 

            if((authorize.indexOf(extension) != -1) && value.size <= 5000000)
            {
                return {
                    result: true , 
                    error: " "
                } ; 
            } else {
                return {
                    result: false , 
                    error: "No valid file"
                } ;
            }
            break ; 

            case 4: 
                regex =  new RegExp (/[<>]+$/) ; 

                if (!regex.test(value)) {
                    error = " " ; 
                } else {
                    error = "No valid description, please use simple caracter "
                }
                return {
                    result: !regex.test(value),
                    error: error
                } ;

                break ;
            
        
        default: 
            return (false) ;
    }
}
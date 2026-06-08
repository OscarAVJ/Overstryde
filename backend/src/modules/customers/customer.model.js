/* campos: 
id 
name, 
last_name,
photo,
email, 
password ,
addresses,[{
country
address
department
city
references
phone number
}]
purchase history, [{
orders_id
}]
isActive,
is_verified,
loginAttempts,timeOut

*/
import mongoose, {Schema, model} from "mongoose";
const CustomerSchema = new Schema({
    name : {
        type : String
    },
    last_name : {
        type : String
    },
    photo: {
        type: String
    },
    email : {
        type :  String
    },
    password : {
        type : String
    },
    addresses : [{
        country : {
            type : String
        },
        address : {
            type : String
        },
        department : {
            type : String
        },
        city : {
            type : String
        },
        references : {
            type : String
        },
        phone : {
            type : String
        }
    }],
    purchase_history : [{
        orders_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "orders"
        }
    }],
    isActive : {
        type : Boolean
    },
    isVerified : {
        type : Boolean
    },
    loginAttempts : {
        type : Number
    },
    timeOute : {
        type: Date
    }
},
{
    timestamps : true,
    strict : false
}
)

export default model ("customers", CustomerSchema)



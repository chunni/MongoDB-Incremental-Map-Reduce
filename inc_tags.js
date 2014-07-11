
//convert ISO data to ObjectId so that it can be compared with ObjectIds in db
var ISODateToObjectId = function(date){
    // Convert date to hex seconds
    var hexSeconds = Math.floor(date.getTime()/1000).toString(16);

    // Create an ObjectId with the hex timestamp
    var id = ObjectId(hexSeconds + "0000000000000000");

    return id
}

var conn = new Mongo();
var db = conn.getDB("your_db");

var start = new Date();
start.setDate(start.getDate()  - 1)

// The Map and the Reduce functions have been stored into system.js
// and they can be used in the mapReduce function now 
db.yeedd.mapReduce( mapTags,
                    reduceTags,
                    {
                         query: { _id: { $gt: ISODateToObjectId(start) } },
                         out: { reduce: "calc_tags" }
                       }
                     );
}
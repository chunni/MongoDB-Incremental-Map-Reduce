//The Map function, simply count tags
var mapTags = function() {
    if (!this.tags) {
        return;
    }

    for (index in this.tags) {
        emit(this.tags[index], 1);
    }
};

//The Reduce function, accumulate the count
var reduceTags = function(previous, current) {
    var count = 0;

    for (index in current) {
        count += current[index];
    }

    return count;
}

var conn = new Mongo();
var db = conn.getDB("your_db");

//save the functions
db.system.js.save(
               { _id: "mapTags",
                 value : mapTags
                   }
                 )

db.system.js.save(
               { _id: "reduceTags",
                 value : reduceTags
                   }
                 )
//execute the Map-Reduce, 
//the results will be stored in the calc_tags collection
db.yeedd.mapReduce( mapTags,
                    reduceTags,
                    {
                      out: "calc_tags"
                    }
                  )

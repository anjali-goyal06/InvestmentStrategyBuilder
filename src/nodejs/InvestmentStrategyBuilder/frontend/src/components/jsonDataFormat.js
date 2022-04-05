
let strategies = [
    {
        "id" : "1",
        "name" : "Married"
    },
    {
        "id" : "2",
        "name" : "Anjali Made"
    }
]

let a = [
    {
        "idStrategy" : "3",
        "name" : "Married Put By Anjali",
        "desc" : "xyz is the description of the data",
        "expiry":"23",
            "exchange":"abc",
            "ticker":"xyz",
        "instruments" :  [
           {
                "segment":"option",
                "side":"BUY",
                "quantity":"11",
                "strikePrice":"11",
                "type":"CALL"
            } , 
            {
                "segment":"future",
                "side":"SELL",
                "quantity":"11",
                "strikePrice":"null",
                "type":"null"
            } , 
            {
                "segment":"stock",
                "side":"BUY",
                "quantity":"11",
                "strikePrice":"11",
                "type":"null"
            }
        ]
    },
    {

    }
]

// PingPod regions and their locations.

export const LOCS = {
  "New York / New Jersey": {
    tabs:["Manhattan","Brooklyn","Queens","New Jersey"],
    Manhattan:[
      {id:1, name:"Lower East Side",   address:"42 Allen St.",       city:"New York, NY 10002",    types:["OPEN POD","PRIVATE POD"], img:"les"},
      {id:2, name:"West 37th",          address:"321 W 37th St.",      city:"New York, NY 10018",    types:["OPEN POD","PRIVATE POD"], img:"w37"},
      {id:3, name:"West 99th",          address:"243 W 99th St.",      city:"New York, NY 10025",    types:["OPEN POD","PRIVATE POD"], img:"w99"},
      {id:4, name:"East 86th",          address:"515 E 86th St.",      city:"New York, NY 10028",    types:["PRIVATE POD"],            img:"e86"},
      {id:5, name:"East 95th",          address:"1470 Lexington Ave.", city:"New York, NY 10128",    types:["OPEN POD"],               img:"e95"},
      {id:6, name:"East 27th",          address:"335 E 27th St.",      city:"New York, NY 10016",    types:["OPEN POD"],               img:"e27"},
    ],
    Brooklyn:[
      {id:7, name:"Williamsburg",       address:"97 Broadway St.",     city:"Brooklyn, NY 11211",   types:["OPEN POD","PRIVATE POD"], img:"williamsburg"},
      {id:8, name:"Downtown Brooklyn",  address:"620 Fulton St.",      city:"Brooklyn, NY 11217",   types:["OPEN POD","PRIVATE POD"], img:"downtown_bk"},
    ],
    Queens:[
      {id:9, name:"Astoria",            address:"30-18 Steinway St.",  city:"Astoria, NY 11103",    types:["OPEN POD","PRIVATE POD","ROBOT TABLE"], img:"astoria"},
    ],
    "New Jersey":[
      {id:10,name:"Fort Lee",           address:"2025 Hudson St.",     city:"Fort Lee, NJ 07928",   types:["OPEN POD"], img:"fort_lee"},
      {id:11,name:"Jersey City – HiTT", address:"31 River Dr S",       city:"Jersey City, NJ 07310",types:["OPEN POD"], img:"jersey_city"},
    ],
    membersOnly:true,
  },
  "Philadelphia":{tabs:null, default:[{id:20,name:"Old City",address:"325 Chestnut St.",city:"Philadelphia, PA 19106",types:["OPEN POD"],img:"old_city"}]},
  "Chatham":{tabs:null, default:[{id:30,name:"Chatham – The Strand",address:"40 Watchung Ave.",city:"Chatham, NJ 07928",types:["PRIVATE POD"],img:"chatham_strand"}]},
  "Boston":{tabs:null, default:[
    {id:40,name:"North Station",address:"111 Canal St.",city:"Boston, MA 02114",types:["OPEN POD"],img:"north_station"},
    {id:41,name:"Cambridge",address:"238 Main Street",city:"Cambridge, MA 02142",types:["OPEN POD","PRIVATE POD"],img:"cambridge"},
  ]},
  "Chicago":{tabs:null, default:[{id:50,name:"River North",address:"676 N La Salle Dr",city:"Chicago, IL 60654",types:["OPEN POD","PRIVATE POD"],img:"river_north"}]},
  "Durham":{
    tabs:null,
    default:[
      {id:70,name:"Downtown Durham",address:"110 Corcoran St.",city:"Durham, NC 27701",types:["OPEN POD","PRIVATE POD"],img:"corcoran",
       hours:{peak:["5:00 PM","6:00 PM","7:00 PM","8:00 PM"],offpeak:["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"]},
       peakPrice:20,offpeakPrice:14},
    ],
  },
  "Miami":{
    tabs:["Miami","Coral Gables"],
    "Miami":[{id:60,name:"Wynwood",address:"2209 N Miami Ave",city:"Miami, FL 33127",types:["OPEN POD","PRIVATE POD"],img:"wynwood"}],
    "Coral Gables":[{id:61,name:"Coral Gables",address:"464 S Dixie Hwy",city:"Coral Gables, FL 33146",types:["OPEN POD","PRIVATE POD"],img:"coral_gables"}],
  },
};

export const REGIONS = ["Durham","New York / New Jersey","Philadelphia","Chatham","Boston","Chicago","Miami"];

export const DURHAM_CRITICAL_LOCATION = {
  id: 70,
  name: "Downtown Durham",
  address: "110 Corcoran St.",
  city: "Durham, NC 27701",
  types: ["OPEN POD", "PRIVATE POD"],
  img: "corcoran",
  hours: {
    peak: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
    offpeak: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  },
  peakPrice: 20,
  offpeakPrice: 14,
};

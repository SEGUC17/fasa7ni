var filter = require('../models/Filter');
var User = require('../models/User');
var BookingHistory = require('../models/BookingHistory');
var Maintenance = require('../models/Maintenance') ; 
var Request = require('../models/BusinessRequests');
var ServiceProviders = require('../models/ServiceProvider');

var AdminController = {
	//as an admin i can add a new search filter
	addFilter : function(req, res){
  
		var name = req.body.name; // name of the search filter
		var field = req.body.field; // the field where the filter is supposed to search
		
		var newFilter = new filter({
			'name' : name,
			'field' : field, 
		});
		newFilter.save(); // saving the new added search filter to the database
		
		},
	
//searches for user by mail and changes boolean of blocked to true.
blockUser : function(req, res){

		var email = req.User.email;
		var blocked = req.body.blocked;

		User.update({ 'email':email }, 
			{$set: {'blocked': 'true'}}, callback);
		
		
},
//view all users
getUsrs: function(req,res){
User.find({},'name email',function(err,usersktir){
	res.json(usersktir);
});},

searchUser:function(req,res){
	
	var arr = [];
	var e ="";
		  User.findOne({'_id':req.body.Uid},'-password',function(err, userS){
          if(err)
              res.send(err.message);
          else
		  e = userS.email;
		  arr[0] = userS;
      }).then(function(){
		
		BookingHistory.find({'userEmail':e},function(err, Bookings){
          if(err)
              res.send(err.message);
          else{
             arr[1] = Bookings;}
			 res.json(arr);
      })});
	  

    },
//searches for user by id and blocks him by chaging the boolean to true
blockUser : function(req, res){
console.log("ghjfghfcd");
		var idd = req.body.Uid;
			console.log(idd);
			
		User.findOneAndUpdate({'_id' : idd}, 
			{$set: {"blocked":true}},function(err,doc){
				if(err)console.log(err);
				console.log(doc);
			});
		
		},
//searches for user by id anf unblocks him by changing boolean to false
unblockUser : function(req, res){
console.log("unblock");
		var idd = req.body.Uid;
			console.log(idd);
			
		User.findOneAndUpdate({'_id' : idd}, 
			{$set: {"blocked":false}},function(err,doc){
				if(err)console.log(err);
				console.log(doc);
			});
		
		},
viewUsers: function(req,res){
	User.count(function(err,count)
			{

				if(!err && count ==0)
				{
					res.redirect('/NoUsers'); //sorry no users to display & back button
				}
			});
			User.find.sort
			(
					{"name":1},function(err,docs)
				{ 
					res.render('users.ejs',{docs:docs});
				}
			); 
  },

maintenacemode: function(req,res){

var Maintenance1=new Maintenance(req.body); 

 Maintenance1.remove({}, function(err, task) {
    if (err)
//      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  //  else 
    //res.json(task)  ; 
 });
  


 // var mainta = new Maintenance1();
 // mainta.isMaintenance
//Maintenance1.isMaintenance = true;


  Maintenance1.save(function(err, task) {
    if (err)
      res.send(err);
      //else 
    //res.json(task);
      //});
     



Maintenance.findOneAndUpdate({isMaintenance:false},true, {new: true}, function(err, task) {
 
    if (err)
      //console.log(err) ;
      //console.log(task)  ;
      res.render(err); 
      //res.json(err) ; 
// res.render('404.ejs') ; 
  
      else
      res.render(task); 
      
 });

});
},
//This is called when the admin press the button accept in the businessrequests view
addBusinessReq: function(req, res1) {
//I am sending the data that is accepted from the front end in req
//Those data are needed in order to Add a new Service Provider If the request is accepted
  	 var userId = req.body.userId || req.query.userId;
  	 var password = req.body.password || req.query.password;
	 var bId = req.body.bId || req.query.bId;
	 var category = req.body.category || req.query.category;
  	 var card = req.body.card || req.query.card;
	 var holder = req.body.holder || req.query.holder;
  	 var cvv = req.body.cvv || req.query.cvv;
	 var date = req.body.date || req.query.date;
	 var description = req.body.description || req.query.description;

console.log(password);
//First i am removing the request from the business Requests Table
	   	  Request.remove({requesterMail: userId}, function(err, res) {
		   console.log(userId);
      		 if (err) { res1.json({"err": err}); } else { console.log("succeded"); res1.json({success: true})};
   		});
//Then i am adding the data to a service Providers table
	

	var servicesproviders = new ServiceProviders;
	servicesproviders.email = userId;
	servicesproviders.password = password;
	servicesproviders.businessName = bId;
	servicesproviders.category = category;
	servicesproviders.cardNumber = card;
	//servicesproviders.holderName = holder;
	servicesproviders.cvv = cvv;
	servicesproviders.validdate = date;
	servicesproviders.save(function(err){
	if(err){console.log(err);console.log("cannot create");
	}else{
	console.log("created");
	//Here Finnally a new ServiceProvider is made by the Email and password entered in the businessRequest form
	}
});

	},

//This is called when the admin press the button reject in the businessrequests view
deleteBusinessReq: function(req, res1) {
//All what is done here is removing the businessRequest from the table Request Because the admin rejects it
  	 var userId = req.body.userId || req.query.userId;
	   console.log("here");
 	  Request.remove({requesterMail: userId}, function(err, res) {
		   console.log(userId);
      		 if (err) { res1.json({"err": err}); } else { console.log("succeded"); res1.json({success: true})};
   		});
	},

//This is called when the admin press the button View Business Requests in the Admin panel page
viewBusinessReq:  function(req, res){
var request = [];
	console.log('hna1'); 
//Here i am retreving the data from The Request Table and sending it to the front end in order to display it
        Request.find({}).exec(function(err, docs){ 
            if(err) res.json(err);
            else{	console.log('hna2');  res.json(docs);};
        });

    }
}


module.exports = AdminController;

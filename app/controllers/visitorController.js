var Review = require('../models/Reviews');
var Request = require('../models/BusinessRequests');
var Filter = require('../models/Filter');
var ServiceProvider = require('../models/ServiceProvider');

var reviewController = {

  getAllFilters:function(req, res){
   var x;
    Filter.find({},function(err, filters){
          if(err)
              res.send(err.message);
          else{
            res.json(filters);
          }
            //  res.render('index', {reviews});
      })
  },

  viewCinemas:function(req, res){

    Review.find({'category': 'Cinema'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewConcerts:function(req, res){

    Review.find({'category': 'Concert'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewEscapeRooms:function(req, res){

    Review.find({'category': 'escape rooms'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewFights:function(req, res){

    Review.find({'category': 'Fight'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewKoras:function(req, res){

    Review.find({'category': 'Kora'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewMalahy:function(req, res){

    Review.find({'category': 'Malahy'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewRace:function(req, res){

    Review.find({'category': 'Race'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewTheatre:function(req, res){

    Review.find({'category': 'Theater'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },
  viewTrampoline:function(req, res){

    Review.find({'category': 'Trampoline'},function(err, reviews){
          if(err)
              res.send(err.message);
          else
            res.send(reviews);
            //  res.render('index', {reviews});
      })
  },

	postBusinessReq:  function(req, res){
        var x;
	console.log(req.body.category);
	var e = req.body.requesterMail;
	console.log(e);
	ServiceProvider.find({'email': e}, function(err, docs){
	console.log(docs);
		if(docs.length===0){
			console.log('fadya');
			var request = new Request();
        		request.requesterMail = req.body.requesterMail;
        		request.password = req.body.password;
			request.businessName = req.body.businessName;
			request.category = req.body.category;
       			request.cardNumber = req.body.cardNumber;
      		 	//request.holderName = req.body.holderName;
       			request.cvv = req.body.cvv;
        		request.validdate = req.body.validdate;
       			request.description = req.body.description;
	
       			 request.save(function(err){
            			 if (err) {
						
				            console.log( "There is an already Existing Request with the same mail");
                       
                			res.json({success:false,message: 'There is an already Existing Request with the same mail'});
                		}else{
                               console.log("Your Business Request is Sent to the Admin");
                               
                    			res.json({success:true,message: 'Your Business Request is Sent to the Admin'});
               			 }
           		 });
			
			}

		else{
			console.log("There is an already Existing Service Provider with the same mail");

			res.json({success:false,message: 'There is an already Existing Service Provider with the same mail'});
			}
	});
        
    },
viewBusinessProfile: function(req,res){
		var email;
		if(req.user){
		 email = req.user.email;}
		else{
		email = "test@test";
		}
		business.findOne({'email' : email},function(err,doc){
				if(err)console.log(err);
				else res.json(doc);
			});
	}
}
module.exports = reviewController;

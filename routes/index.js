/*
* GET home page.
*/
 
exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;

	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		var file = req.files.uploaded_image;
		var img_name=file.name;

	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/qr/'+file.name, function(err) {
                             
	              if (err)

	                return res.status(500).send(err);
      					var sql = "INSERT INTO `users_image` (`user_name`, `password` ,`image`) VALUES ('" + name + "','" + pass + "','" + img_name + "')";

    						var query = db.query(sql, function(err, result) {
    							 res.redirect('login/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};

exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `users_image` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('login.ejs',{data:result, message: message});
   });
};
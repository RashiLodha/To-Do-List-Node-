const express=require("express");
const bodyPareser=require("body-parser");

const app=express();


// This assumes a views directory containing an index.ejs page.
app.set('view engine', 'ejs');

//before we can use req.body inside our post method we have to use body-bodyParese
app.use(bodyPareser.urlencoded({extended:true}));

app.use(express.static("public"));
//all the static html,css,js,images files we want loaded on our website we simply add them to the public file and
// then tell express to use all the static files inside the folder public

let items=["Buy Food","Cook Food","Eat Food"];
//we define items here so that it has scope in both app.get as well as app.post as they are needed in both
//reason being you can redirect only through app.get after doing the post request
let workItems=[];


app.get("/",function(req,res){

  let today= new Date();
  var options={
    weekday:"long",
    day:"2-digit",
    month:"long"
  };

  var day= today.toLocaleString("en-IN",options);
    //this tolocaleString removes the entire switch case we would have to write for everyday in our js
    //make sure in render you pass all the variables together that you want to appear in tempelate
  res.render("list",{ListTitle:day,newListItem:items});

});

// this basically will handle the post request that come to a particular route and the route in this case is "\"
app.post("/",function(req,res){
  // console.log(req.body);

  if(req.body.list==='Work'){
    workItems.push(req.body.newItem);
    res.redirect("/work");
  }else{
    items.push(req.body.newItem);
    res.redirect("/");
  }

  // note:here req.body can be used iff we declare body parser

  //as soon as you write redirect this will again take you to app.get and execute it entirely

})

app.get("/work",function(req,res){
  res.render("list",{ListTitle: "Work List",newListItem:workItems});
})

app.get("/about",function(req,res){
  res.render("about");
})

app.post("/work",function(req,res){
  workItems.push(req.body.newItem);
  res.redirect("/work");
})


app.listen(3000,function(){
  console.log("Server started on port number 3000");
});

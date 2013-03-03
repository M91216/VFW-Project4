//Michael Bain
//Visual Framework 1302
//Project 3 Javascript
//2-14-13





window.addEventListener("DOMContentLoaded", function(){
        
   function $(x){
      var theElement = document.getElementById(x);
      return theElement;
    
   }  
    
   function getInfo(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "formats");
        for(var i=0, j=recordingFormats.length; i<j; i++){
            var makeOption = document.createElement("option");
            var opText = recordingFormats[i];
            makeOption.setAttribute("value", opText);
            makeOption.innerHTML = opText;
            makeSelect.appendChild(makeOption);          
        }
        selectLi.appendChild(makeSelect);
   }  
   function getSelectedRadio(){
        var radio = document.forms[0].studioroom;
        for(var i=0; i<radio.length; i++){
            if(radio[i].checked){
             studioroomValue = radio[i].value;
            }
            
        }
        
   }
   function getCheckboxValue(){
        if($("yes").checked){
             yesnoValue = $("yes").value;
        }else{
             yesnoValue = "No"            
        }
   }
   function toggleControls(n){
       switch(n){
            case "on":
               $("sessionForm").style.display = "none";
               $("clearLink").style.display = "inline";
               $("displayLink").style.display = "none";
               $("addNew").style.display = "inline";
                break;
            case "off":
               $("sessionForm").style.display = "block";
               $("clearLink").style.display = "inline";
               $("displayLink").style.display = "inline";
               $("addNew").style.display = "none";
               $("items").style.display = "none";
               break;
            default:
               return false;
       }
   }
  
   function storeData(key){
       //If there is no key,this means this is a brand new item and we need a new key.
      if(!key){      
         var id                = Math.floor(Math.random()*100000001);
      }else{
          //Set the id to the existing key we're editing so that it will save over the data. 
             //The key is the same key that's been passed along from the editSubmit event handler
          //to the validate function, and then passed here, into the storageData function.
          id = key;
      }
      getCheckboxValue();
      getSelectedRadio();
      var item                ={};
          item.formats        =["Recording Formats:", $("formats").value];
          item.customer       =["Customer:", $("customer").value];
          item.artistband     =["Artist/Band:", $("artist/band").value];
          item.email          =["Email:", $("email").value];
          item.phone          =["Phone Number:", $("phone").value];
          item.date           =["Date:", $("date").value];
          item.time           =["Time:", $("time").value];
          item.endtime        =["End Time:", $("endtime").value];
          item.hours          =["Hours:", $("hours").value];
          item.comments       =["Comments:", $("comments").value];
          item.studioroom     =["Studio Room:", studioroomValue];
          item.yesno          =["Engineer:", yesnoValue];
                   
          localStorage.setItem(id, JSON.stringify(item));
          alert("Contact Saved"); 
                               
   }
   
   function getData(){
       toggleControls("on");
       if(localStorage.length === 0){           
           alert("There is no data in local storage so default data was added.");
           autoFillData();
               
           
       }
       
       var makeDiv = document.createElement("div");
       makeDiv.setAttribute("id", "items");
       var makeList = document.createElement("ul");
       makeDiv.appendChild(makeList);
       document.body.appendChild(makeDiv);
       $("items").style.display = "block";
       for(var i=0, len=localStorage.length; i<len; i++){
           var makeLi = document.createElement("li");
           var linksLi = document.createElement("li");
           makeList.appendChild(makeLi);
           var key = localStorage.key(i);
           var value = localStorage.getItem(key);
           var obj = JSON.parse(value);
           var makeSubList = document.createElement("ul");
           makeLi.appendChild(makeSubList);
           getImage(obj.formats[1],makeSubList);
           for(var n in obj){
               var makeSubLi = document.createElement("li");
               makeSubList.appendChild(makeSubLi);
               var optSubText = obj[n][0]+" "+obj[n][1];
               makeSubLi.innerHTML = optSubText;
               makeSubList.appendChild(linksLi);
          }
           makeItemLinks(localStorage.key(i),linksLi); //create edit and delete buttons each item in local storage
       } 
   }
   
   //get the image for the right category
   function getImage(cName, makeSubList){
       var imageLi = document.createElement("li");
       makeSubList.appendChild(imageLi);
       var newImage = document.createElement("img");
       var setSrc = newImage.setAttribute("src", "images/"+ cName + ".png");
       imageLi.appendChild(newImage);
   }
   
   //Auto populate Local storage
   function autoFillData(){
       //The actaul JSON OBJECT data required for this to work is coming from our json.js file. Which is loaded from our html page
       //Store the JSON OBJECT into Local Storage.
       for(var n in json){
           var id = Math.floor(Math.random()*100000001);
           localStorage.setItem(id, JSON.stringify(json[n]));
       }
   }
   //create the edit and delete links for each stored item when displayed.
   function makeItemLinks(key, linksLi){
       var editLink = document.createElement("a");
       editLink.href ="#";
       editLink.key = key; 
       var editText = "Edit Contact";
       editLink.addEventListener("click", editItem);
       editLink.innerHTML = editText;
       linksLi.appendChild(editLink);
       
       //add line break
       var breakTag = document.createElement("br");
       linksLi.appendChild(breakTag);
       
       
       var deleteLink = document.createElement("a");
       deleteLink.href = "#";///Users/michaelbain/Desktop/VFW-Project4/Bain_M.html
       deleteLink.key = key;
       var deleteText = "Delete Contact";
       deleteLink.addEventListener("click", deleteItem);
       deleteLink.innerHTML = deleteText;
       linksLi.appendChild(deleteLink);  
    }


    function editItem(){
	    //grab the data from our local Storage.
	    var value = localStorage.getItem(this.key);
	    var item =JSON.parse(value);
	    
	    //show the form
	    toggleControls("off");
	    
	    $("formats").value = item.formats[1];
	    $("customer").value = item.customer[1];
	    $("artist/band").value = item.artistband[1];
	    $("email").value = item.email[1];
	    $("phone").value = item.phone[1];
	    $("date").value = item.date[1];
	    $("time").value = item.time[1];
	    $("endtime").value = item.endtime[1];
	    $("hours").value = item.hours[1];
	    $("comments").value = item.comments[1];
	    var checkbox = document.form[0].yesno;
	    for(var i=0; i<checkbox.length; i++){
    	   if(checkbox[i].value == "Yes" && item.yesno[1] == "Yes"){
        	   checkbox[i].setAttribute("checked","checked");
           }else if(checkbox[i].value == "No" && item.yesno[1] == "No"){
               checkbox[i].setAttribute("checked","checked");
           }
	    }
	    var radio = document.form[0].studioroom;
	    for(var k=0; k<radio.length; k++){   
            if(radio[i].value == "studioA" && item.studioroom[1] == "studioA"){
            radio[i].setAttribute("checked","checked");
        }else if(radio[i].value == "studioB" && item.studioroom[1] == "studioB"){
            radio[i].setAttribute("checked","checked");
        }else if(radio[i].value == "studioC" && item.studioroom[1] == "studioC"){
            radio[i].setAttribute("checked","checked");
         }
        }
             
        //Remove the initial listener from the input "save contact" button.
        submit.removeEventListener("click", storeData);
        //Change submit button value to edit button
        $("submitBooking").value = "Edit Contact";
        var editSubmit = $("submitBooking");
        //save the key value established in this function as a property of the editSumit event
        //so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key; 
         
                	        	   	        
        }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this contact?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Contact was deleted!!");
            window.location.reload();
        }else{
            alert("Contact was NOT deleted.");
        }           
        
    }
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
            
        }           
   }

   function validate(e){
       //Define the element we want to check
       var getFormats  = $("formats");
       var getCustomer = $("customer");
       var getEmail    = $("email");
       
       //Reset Error Messages
       errMsg.innerHTML ="";
          getFormats.style.border  = "1px solid black";
          getCustomer.style.border = "1px solid black";
          getEmail.style.border    = "1px solid black";
       //Get Error Message
       var messageAry = [];
       //formats validation
       if(getFormats.value === "--Analog--"){
           var formatError = "Please choose a recording format.";
           getFormats.style.border = "1px solid red";
           messageAry.push(formatError);
       }
       //Customer name validation
       if(getCustomer.value === ""){
           var customerError = "Please enter a name.";
           getCustomer.style.border = "1px solid red";
           messageAry.push(customerError);
       }
       //Email validation
       var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       if (!(re.exec(getEmail.value))){
           var emailError = "Please enter a valid email address";
           getEmail.style.border = "1px solid red";
           messageAry.push(emailError);
       }
       //if there were errors,display them on the screen.
       if(messageAry.length >= 1){
           for(var i=0, j=messageAry.length; i < j; i++){
               var txt = document.createElement("li");
               txt.innerHTML = messageAry[i];
               errMsg.appendChild(txt);               
           }
           e.preventDefault();
           return false;
       }else{
           //If all is OK, save our data! send the key value (which came from the editData function).
           //Remember this key alue was passed through the editSubmit event listener as a property.
           storeData(this.key);
       }       
   }
   var recordingFormats = ["--Analog--", "2in.Tape/24", "--Digital--", "ProToolsHD", "Logic", "Nuendo/Cubase", "FLStudio" ],
       engineerValue = "No",
       studioroomValue, 
       errMsg = $("errors");     
       
   getInfo();    

   var displayLink = $("displayLink");
   displayLink.addEventListener("click", getData);
   var clearLink = $("clearLink");
   clearLink.addEventListener("click", clearLocal);
   var submit = $("submitBooking");
   submit.addEventListener("click", validate);
});  





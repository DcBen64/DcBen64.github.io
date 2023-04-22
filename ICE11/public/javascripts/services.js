/**
 * @michaelwilliamparisi
 * @Date: February 12, 2023
 * @description: This page provides the functionality for the services page. 
 */
(function (){
    function displayText() {
        document.getElementById("p1").innerHTML = "We are able to consult in web design and functionality. </br> We will design and impliment a web page for free.";
        document.getElementById("p2").innerHTML = "our team has the ability to test your software </br> and provide vauluble bug information.";
        document.getElementById("p3").innerHTML = "24/7 IT support in every country around the world. "
            
        document.getElementById("picTitle").innerHTML = "Web Design";
        document.getElementById("moo1").innerHTML = "Software Testing";
        document.getElementById("trump1").innerHTML = "IT Support";
        document.getElementById("head1").innerHTML = "We offer:";
            
      }

      function Start() {
        console.log("App Started!")
        
        switch (document.title){
            case "Home - WEBD6201 Demo":
                displayText()
                break
            case "Services Page":
                displayText()
                break
        }
    }
      window.addEventListener("load", Start)
})()

/**
 * @michaelwilliamparisi
 * @Date: February 12, 2023
 * @description: This page provides the functionality for the about page. 
 */
(function(){
    function alterText(){
        document.getElementById("h3").innerHTML = "My name is Michael Parisi and I am currently in my second year fourth semester of Computer programming and analysis at Durham College. </br> Apart from coding and going to school, I enjoy spending time with friends and family. I have a passion for working with cars and I enjoy tampering and playing around with my car. ";
        document.getElementById("mike").innerHTML = "Michael Parisi";
        document.getElementById("ben").innerHTML = "Benjamin Walsh";
        document.getElementById("p2").innerHTML = "My name is Ben and I like peanuts ";        
    }

    // Disaplying the buttons to our linked in pages.
    function displayButton(){
            let mButton = document.getElementById("mButton")
            mButton.addEventListener("click", function(){
                location.href ="https://www.linkedin.com/in/michael-w-parisi/"
           
        })
        let bButton = document.getElementById("bButton")
            bButton.addEventListener("click", function(){
                location.href = "https://www.linkedin.com/in/ben-walsh-7570aa109/"
            })
        
    }
        

    function Start() {
        console.log("App Started!")
        
        switch (document.title){
            case "Home - WEBD6201 Demo":
                alterText()
                break
            case "Services Page":
                alterText()
                break
            case "About Us":
                alterText()
                displayButton()
                break
        }
    }
      window.addEventListener("load", Start)
})()
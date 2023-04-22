/**
 * @michaelwilliamparisi
 * @Date: February 12, 2023
 * @description: This page was used as a reference for all other .js files. 
 */
(function () {
    
    function DisplayButton(){
        let randomButton = document.getElementById("randomButton")
        randomButton.addEventListener("click", function(){
            location.href ="./services.html"
        })

        let mainContent = document.getElementsByTagName("home")[0]
        mainContent.setAttribute("class", "container")

        console.log(mainContent)

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")

        let firstString = "This is a main paragraph that we added through javascript and Ben Was Here :)"

        mainParagraph.textContent = firstString

        mainContent.appendChild(mainParagraph) // adds something after it was written.
    }

    let michael = new contact("Michael Parisi", "4168037854", "michael.parisi@dcmail.ca")
    console.log(michael.toString())

    function Start() {
        console.log("App Started!")
        
        switch (document.title){
            case "Home - WEBD6201 Demo":
                DisplayButton()
                break
            case "Services Page":
                DisplayButton()
                break
            case "ContactUs - Demo":
                DisplayButton()
                break
        }
    }

    window.addEventListener("load", Start)
})()
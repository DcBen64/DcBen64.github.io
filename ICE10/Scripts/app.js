// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function () {
    function AuthGuard() {
        var protected_routes = [
            "contact-list",
            "task-list"
        ];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            // check if user is logged in
            if (!sessionStorage.getItem("user")) {
                // if not...change the active link to the  login page
                router.ActiveLink = "login";
            }
        }
    }
    function LoadLink(link, data) {
        if (data === void 0) { data = ""; }
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        // capitalize active link and set document title to it
        document.title = router.ActiveLink.substring(0, 1).toUpperCase() + router.ActiveLink.substring(1);
        // remove all active Nav Links
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $("li>a:contains(".concat(document.title, ")")).addClass("active"); // updates the Active link on Navigation items
        CheckLogin();
        LoadContent();
    }
    function AddNavigationEvents() {
        var NavLinks = $("ul>li>a"); // find all Navigation Links
        NavLinks.off("click");
        NavLinks.off("mouseover");
        // loop through each Navigation link and load appropriate content on click
        NavLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        NavLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function AddLinkEvents(link) {
        var linkQuery = $("a.link[data=".concat(link, "]"));
        // remove all link events
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        // css adjustments for links
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        // add link events
        linkQuery.on("click", function () {
            LoadLink("".concat(link));
        });
        linkQuery.on("mouseover", function () {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });
        linkQuery.on("mouseout", function () {
            $(this).css('font-weight', 'normal');
        });
    }
    /**
     * This function loads the header.html content into a page
     *
     * @returns {void}
     */
    function LoadHeader() {
        // use AJAX to load the header content
        $.get("./Views/components/header.html", function (html_data) {
            // inject Header content into the page
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }
    /**
     *
     *
     * @returns {void}
     */
    function LoadContent() {
        var page_name = router.ActiveLink; // alias for the Active Link
        var callback = ActiveLinkCallBack(); // returns a reference to the correct function
        $.get("./Views/content/".concat(page_name, ".html"), function (html_date) {
            $("main").html(html_date);
            callback(); // calling the correct function 
        });
    }
    /**
     *
     * @returns {void}
     */
    function LoadFooter() {
        $.get("./Views/components/footer.html", function (html_date) {
            $("footer").html(html_date);
        });
    }
    function DisplayHomePage() {
        console.log("Home Page");
        $("#ContactButton").on("click", function () {
            LoadLink("contact");
        });
        $("main").append("<p id=\"MainParagraph\" class=\"mt-3\">Repo for following class exercises n stuff</p>");
        $("main").append("<article>\n        <p id=\"ArticleParagraph\" class =\"mt-3\">Wow check out all of the cool stuff on this page</p>\n        </article>");
    }
    function DisplayProjectsPage() {
        console.log("Projects Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function DisplayAboutPage() {
        console.log("About Page");
    }
    /**
     *This function adds a Contact object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress) {
        var contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            var key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    /**
     * This method validates a field in the form and displays an error in the message area div element
     *
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID, regular_expression, error_message) {
        var messageArea = $("#messageArea").hide();
        $("#" + fieldID).on("blur", function () {
            var text_value = $(this).val();
            if (!regular_expression.test(text_value)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }
    function DisplayContactPage() {
        console.log("Contact Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            LoadLink("contact-list");
        });
        ContactFormValidation();
        var sendButton = document.getElementById("sendButton");
        var subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckbox.checked) {
                var fullName = document.forms[0].fullName.value;
                var contactNumber = document.forms[0].contactNumber.value;
                var emailAddress = document.forms[0].emailAddress.value;
                var contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    var key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        if (localStorage.length > 0) {
            var contactList = document.getElementById("contactList");
            var data = "";
            var keys = Object.keys(localStorage); // returns a list of keys from localStorage
            var index = 1;
            // for every key in the keys string array
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var contactData = localStorage.getItem(key); // get localStorage data value
                var contact = new core.Contact(); // create an empty Contact object
                contact.deserialize(contactData);
                data += "<tr>\n                <th scope=\"row\" class=\"text-center\">".concat(index, "</th>\n                <td>").concat(contact.FullName, "</td>\n                <td>").concat(contact.ContactNumber, "</td>\n                <td>").concat(contact.EmailAddress, "</td>\n                <td class=\"text-center\"><button value=\"").concat(key, "\" class=\"btn btn-primary btn-sm edit\"><i class=\"fas fa-edit fa-sm\"></i> Edit</button></td>\n                <td class=\"text-center\"><button value=\"").concat(key, "\" class=\"btn btn-danger btn-sm delete\"><i class=\"fas fa-trash-alt fa-sm\"></i> Delete</button></td>\n                </tr>");
                index++;
            }
            contactList.innerHTML = data;
            $("button.delete").on("click", function () {
                if (confirm("Are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                LoadLink("contact-list");
            });
            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val());
            });
        }
        $("#addButton").on("click", function () {
            LoadLink("edit", "add");
        });
    }
    /**
     * This function allows JavaScript to work on the Edit Page
     */
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
        var page = router.LinkData;
        switch (page) {
            case "add":
                {
                    $("main>h1").text("Add Contact");
                    $("#editButton").html("<i class=\"fas fa-plus-circle fa-lg\"></i> Add");
                    $("#editButton").on("click", function (event) {
                        event.preventDefault();
                        var fullName = document.forms[0].fullName.value;
                        var contactNumber = document.forms[0].contactNumber.value;
                        var emailAddress = document.forms[0].emailAddress.value;
                        AddContact(fullName, contactNumber, emailAddress);
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", function () {
                        LoadLink("contact-list");
                    });
                }
                break;
            default:
                {
                    // get contact info from localStorage
                    var contact_1 = new core.Contact();
                    contact_1.deserialize(localStorage.getItem(page));
                    // display the contact in the edit form
                    $("#fullName").val(contact_1.FullName);
                    $("#contactNumber").val(contact_1.ContactNumber);
                    $("#emailAddress").val(contact_1.EmailAddress);
                    $("#editButton").on("click", function (event) {
                        event.preventDefault();
                        // get changes from the page
                        contact_1.FullName = $("#fullName").val();
                        contact_1.ContactNumber = $("#contactNumber").val();
                        contact_1.EmailAddress = $("#emailAddress").val();
                        // replace the item in local storage
                        localStorage.setItem(page, contact_1.serialize());
                        // go back to the contact list page (refresh)
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", function () {
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html("<a id=\"logout\" class=\"nav-link\" href=\"#\"><i class=\"fas fa-sign-out-alt\"></i> Logout</a>");
            $("#logout").on("click", function () {
                sessionStorage.clear();
                $("#login").html("<a class=\"nav-link\" data=\"login\"><i class=\"fas fa-sign-in-alt\"></i> Login</a>");
                AddNavigationEvents();
                LoadLink("login");
            });
           
        
        }
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        var messageArea = $("#messageArea");
        messageArea.hide();
        AddLinkEvents("register");
        $("#loginButton").on("click", function () {
            var success = false;
            var newUser = new core.User();
            $.getJSON("./Data/users.json", function (data) {
                for (var _i = 0, _a = data.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    var username = $("#username").val();
                    var password = $("#password").val();
                    if (username == user.Username && password == user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    var serializedUser = newUser.serialize();
                    if (serializedUser) {
                        sessionStorage.setItem("user", serializedUser);
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                    
                }
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information").show();
                }
            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            LoadLink("home");
        });
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
        AddLinkEvents("login");
    }
    function Display404Page() {
        console.log("404 Page");
    }
    
      
    function ActiveLinkCallBack() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "projects": return DisplayProjectsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "edit": return DisplayEditPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "404": return Display404Page;
            
            default:
                console.error("ERROR: callback does not exist: " + router.ActiveLink);
                return new Function();
        }
    }
   
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
    $(document).ready(function () {
        Start();
        ActiveLinkCallBack();
        
    });
})();
//# sourceMappingURL=app.js.map

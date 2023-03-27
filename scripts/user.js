(function(core) {

    class User {
        
        // Constructor
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.DisplayName = displayName
            this.EmailAddress = emailAddress
            this.Username = username
            this.Password = password
        }

        // TODO: input issing Getters and Setters eventually

        // Override Method
        toString() {
            return `Display Name: ${ this.DisplayName }\nEmail Address: ${ this.EmailAddress }\nUsername: ${ this.Username }`
        }

        // Utility Methods
        toJSON() {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            }
        }
        fromJSON(data) {
            this.DisplayName = data.DisplayName
            this.EmailAddress = data.EmailAddress
            this.Username = data.Username
            this.Password = data.Password
        }

        // Serialize and Deserialize
        // Serialize Method
        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
                return `${ this.DisplayName }, ${ this.EmailAddress }, ${ this.Username }`
            console.error("One or more properties or fields of the Contact Object are missing or invalid!")
            return null
        }
    
        // Deserialize Method
        deserialize(data) {
            let propertyArray = data.split(",")
            this.DisplayName = propertyArray[0]
            this.EmailAddress = propertyArray[1]
            this.Username = propertyArray[2]
        }
    }

    core.User = User
})(core || (core={}))
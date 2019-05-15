/* created a early stage class because we want to use the properties several times. 
stored it in a seperate file to be able to keep the structure */
class User {

    constructor(firstname, lastname, email, username, password) {  
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password; 
    }
}

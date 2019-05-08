// registration functionality

const submitBtn = document.getElementById('submit-btn'); 
const loginBtn = document.getElementById('login-btn');

if (submitBtn) { 
submitBtn.onclick = function () { 

    const firstname = document.getElementById('first-namereg');
    const lastname = document.getElementById('last-namereg');
    const email = document.getElementById('emailreg');
    const username = document.getElementById('usernamereg') ;
    const password = document.getElementById('passwordreg');
    const checkbox = document.getElementById('terms');

    console.log('Submit Button clicked') //not nessecary but good to know if the button works. 
    if (localStorage.getItem('users') === null) {  
        users = [
            //hard coded user, will pop up in the localstorage. We could leave this array empty if we want to. 
            new User('Elin', 'Söderbergh', 'email@gmail.com', 'elinelin', '123456789')
        ]; 
        localStorage.setItem('users', JSON.stringify(users));
    } else {
      users = JSON.parse(localStorage.getItem('users'));
      for (let i = 0; i < users.length; i++) {
          users[i] = new User(users[i].firstname, users[i].lastname, users[i].email, users[i].username, users[i].password);
      }
    }
    
    if(firstname.value.length === 0 || lastname.value.length === 0 || email.value.length === 0 || username.value.length === 0 || password.value.length === 0) {
        window.alert ('You need to fill out all the boxes');
        return false;
    }   

  //the let variable is assigned a value for how the email should look, and to see that it is an actual email. 
  //the ! befor the emailreg tests if the entered email matches the variable we created, if not then the alert will show
    let emailreg = /\S+@\S+\.\S+/;
    if (!emailreg.test(email.value)) {
        window.alert('Enter a vaild e-mail')
        return false;
    }

    for(var i = 0; i < users.length; i++) {
        if(username.value == users[i].username) {
            window.alert('That username is already taken, please choose another!')
            return false;
        }
    }

    let passwordValid = /((?=.*\d)(?=.*[A-Z]))/;
    if(password.value.length < 8 && !passwordValid.test(password.value)) {
        window.alert('The password must contain at least 8 characters');
        return false;
    }

    if (checkbox.checked) {
        var user = new User(firstname.value, lastname.value, email.value, username.value, password.value)

        users.push(user)
        console.log(users)
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Registration successfully completed of ${user.firstname} ${user.lastname}`);
        location.assign("login.html") 
        console.log("fail")
    } else {
        alert('You need to accept the terms and conditions');
        return false;       
        } 

    }  

}


//here starts login function
if (loginBtn) { 
loginBtn.onclick = function () {    

    //named the value usernameLogin and passwordLogin in html to be able to access whats typed in, into the login page
    let usernameLogin = document.getElementById('usernameLogin') ;
    let passwordLogin = document.getElementById('passwordLogin');
  
    //console.log is not nessecary but good to know that the button works
    console.log('Login Button clicked');

    //local storage is connected to the one on registration as well
    if (localStorage.getItem('users') === null) { 
        users = []; //since it's an empty squared bracket, the stored users from local storage comes in here.
        localStorage.setItem('users', JSON.stringify(users));   
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        users[i] = new User(users[i].firstname, users[i].lastname, users[i].email, users[i].username, users[i].password);
    }
    }
    
    // loop through all the user objects and confrim if the username and password are correct
    for(let i = 0; i < users.length; i++) {
        localStorage.setItem('users', JSON.stringify(users));
        
        // check if it's not the correct username and password for the user
        //by having the ! before we do not get all the worngs befor getting it right.
            if(!usernameLogin.value == users[i].username && !passwordLogin.value == users[i].password) {  

            // error if username and password don't match
            alert('Incorrect username or password');
            } else {
            //if correct username and password, redirect to a new page
            alert(`Welcome ${usernameLogin.value}`);
            location.assign("store.html") 
                break;
            }
        }
    
    }

}

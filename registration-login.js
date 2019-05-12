// %%%%%%%%%%%%%%%%%%%%%

// REGISTRATION

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

   /*  we could have let local stoarge be empty but want to have one hard coded user for the login function.
   Elin skriver ihop här  */
    console.log('Submit Button clicked') //not nessecary but good to know if the button works. 
    if (localStorage.getItem('users') === null) {  
        users = [
            //hard coded user, will pop up in the localstorage. We could leave this array empty if we want to. 
            new User('User1', 'User1', 'user1@gmail.com', 'user1', '123456789')
        ]; 
        localStorage.setItem('users', JSON.stringify(users));
    } else {
      users = JSON.parse(localStorage.getItem('users'));
      for (let i = 0; i < users.length; i++) {
          users[i] = new User(users[i].firstname, users[i].lastname, users[i].email, users[i].username, users[i].password);
      }
    }
  
    //all the boxes needs to be filled in to be able to be registered as a user otherwise a pop up window will show. 
    if(firstname.value.length === 0 || lastname.value.length === 0 || email.value.length === 0 || username.value.length === 0 || password.value.length === 0) {
        window.alert ('You need to fill out all the boxes');
        return false;
    }   

  //the let variable "emailreg" is assigned a value for how the email should look, and to see that it is an actual email. 
  //the ! before the "emailreg" tests if the entered email matches the variable we created, if not then the alert will show
    let emailreg = /\S+@\S+\.\S+/;
    if (!emailreg.test(email.value)) {
        window.alert('Enter a vaild e-mail')
        return false;
    }

/*  test if the username is alredy existing, it loops through the users array. If username is already extisting a window will pop.
    The identity (===) operator behaves identically to the equality (==) operator except no type conversion is done, 
    and the types must be the same to be considered equal. */
    for(let i = 0; i < users.length; i++) {
        if(username.value == users[i].username) {
            window.alert('That username is already taken, please choose another!')
            return false;
        }
    }

/* the variable passwordValid is assigned a value with requirements for how the the password should look and mot look. 
Then we test whether the passowrd is longer than 8 characters and if the typed password matches the requirements.*/
    let passwordValid = /((?=.*\d)(?=.*[A-Z]))/;
    if(password.value.length < 8 && !passwordValid.test(password.value)) {
        window.alert('The password must contain at least 8 characters');
        return false;
    }

    /* if the checkbox is clicked and all the other boxes are filled, a new user will be creted and pushed to
    local storage adn the users array. Then you will be reassigned to the loginpage.
    If checkbox is not clicked, nothing will happen.*/
    if (checkbox.checked) {
        let user = new User(firstname.value, lastname.value, email.value, username.value, password.value)
        users.push(user)
        console.log(users) // not necessary but nice to see if it works. 
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Registration successfully completed of ${user.firstname} ${user.lastname}`);
        location.assign("login.html") 
    } else {
        alert('You need to accept the terms and conditions');
        return false;       
        } 
    } 
} 

// %%%%%%%%%%%%%%%%%%%%%

//LOGIN 
//to be able to use the login function without going through the registration js, we need to collect the users from local storage is any is extisting
//otherwise we create a hardcode user so we could use. This is a limitiation of the system. 
function loadMyUsers () {
    let users = JSON.parse(localStorage.getItem('users'));
    
    for (let i = 0; i < users.length; i++) {
        users[i] = new User(users[i].firstname, users[i].lastname, users[i].email, users[i].username, users[i].password);

        if (localStorage.getItem('users') === null) { 
            users =[
                new User('User1', 'User1', 'user1@gmail.com', 'user1', '123456789')
            ]; 
            localStorage.setItem('users', JSON.stringify(users)); 
        }
    }
    loadMyUsers()
}

//when loginbtn is pushed the following function will execute
if (loginBtn) {
loginBtn.onclick = function () {    
    //the variable "usernameLogin" and "passwordLogin" is decleard through const 
    const usernameLogin = document.getElementById('usernameLogin');
    const passwordLogin = document.getElementById('passwordLogin');
  
    //console.log is not nessecary but good to know that the button works
    console.log('Login Button clicked');

    //local storage is connected to the one from the registration functionality
    if (localStorage.getItem('users') === null) { 
        users =[
            new User('User1', 'User1', 'user1@gmail.com', 'user1', '123456789')
        ]; //since it's an empty squared bracket, the stored users from local storage comes in here.
        localStorage.setItem('users', JSON.stringify(users));   
    } else {
        users = JSON.parse(localStorage.getItem('users'));
        for (let i = 0; i < users.length; i++) {
            users[i] = new User(users[i].firstname, users[i].lastname, users[i].email, users[i].username, users[i].password);
        }
    }
    
    // loop through all the user objects in local storage and confrim if the username and password are correct
    for(let i = 0; i < users.length; i++) {
        
        /* check if the username and password is incorrect for the user
        by having the ! before we do not get all the worngs befor getting it right. 
        error if username and password don't match, if correct username and password, redirect to a new page*/
            if(usernameLogin.value !== users[i].username || passwordLogin.value !== users[i].password) {  
                localStorage.setItem('users', JSON.stringify(users));
                alert('Incorrect username or password');
                break;
            } else {
                alert(`Welcome ${usernameLogin.value}`);
                location.assign("store.html") 
            }
        }
    }
}


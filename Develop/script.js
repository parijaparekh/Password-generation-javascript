// Assignment Code
var generateBtn = document.querySelector("#generate");

//global declaration: 
var maxLength = 128;
var minLength = 8;
var alphabets = ['a', 'b', 'c', 'd','e','f', 'g', 'h', 'i','j','k','l', 'm','n','o','p','q','r', 's','t','u','v','w','x','y','z'];
var numbers = [1,2,3,4,5,6,7,8,9,0];
/* List of special charachters from https://owasp.org/www-community/password-special-characters:
 " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~" */
var specialChars = [' ','!','@', '#', '$','%','^','&','*', '(',')', '~','?','<','>','+','{','}','[',']', '.', '`'];

//userPassword object. 
 var userPassword = {
  passwordLength: 8,
  isSpecialChar: true,
  isUppercase: true,
  isLowercase: true,
  isNumber: true,
  charArray: [],
  password: [],

  /* checks for the password length */ 
  checkPasswordLength: function(){
    if (!isNaN(this.passwordLength)){
      this.passwordLength = parseInt(this.passwordLength);
      if (minLength <= this.passwordLength && this.passwordLength <= maxLength) {
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    } 
  },
  
  /* generate the password character array based on user selection criterion */
  generateAllowedCharArray: function(){
    if (this.isSpecialChar){
      this.charArray = this.charArray.concat(specialChars);
      console.log(`After selecting special charachters the available charachters are: ${this.charArray}`);
    }
    if (this.isLowercase){
      this.charArray = this.charArray.concat(alphabets.map(f=> f.toLowerCase()));
      console.log(`After selecting Lower case: ${this.charArray}`);
    }
    if (this.isUppercase){
      this.charArray = this.charArray.concat(alphabets.map(f=> f.toUpperCase()));
      console.log(`After selecting Upper case: ${this.charArray}`);
    }
    if (this.isNumber){
      this.charArray = this.charArray.concat(numbers);
      console.log(`After selecting Numbers: ${this.charArray}`);
    }
    console.log(`Allowed characters are: ${this.charArray}`);
  },

  /* generate the password */
  generatePassword: function(){
    this.generateAllowedCharArray();
    if (this.charArray.length > 0){
      for( let i = 0; i < this.passwordLength; i++){
        this.password[i] = this.charArray[Math.floor(Math.random()*this.charArray.length)];
      }
      return this.password.join("");
    }
    else{
      return "\n Password cannot be generated as you have not agreed to any password generation criterion";
    }
  },

  /* reset the object for the next generation */
  resetAll: function(){
    passwordLength = 8;
    isSpecialChar = true;
    isUppercase = true;
    isLowercase = true;
    isNumber = true;
    this.charArray = [];
    this.password = [];
  }
}


/* generatePassword() does password generation.
 * It propmpts the user for the password length and asks for various password generation criterion. 
 * Error checking for the user supplied values is done here. */ 
function generatePassword(){
  var x = userPassword;
  /* Prompt for length of the password */
  x.passwordLength = window.prompt(`Please enter the length of the passsword.\n\
  The length of the password can vary between ${minLength} to ${maxLength}.`);
  /* Proceed only if password length checks are satisfied */
  if (x.checkPasswordLength()){
    /* Prompt for password geenration criterion */
    x.isSpecialChar = window.confirm(`Please specify if you need special charachter in your password.\n`);
    x.isUppercase = window.confirm(`Please specify if you want upper case letters in your password.\n`);
    x.isLowercase = window.confirm(`Please specify if you want lower case letters in your password.\n`);
    x.isNumber = window.confirm(`Please specify if you want numbers in your password.\n`);
    var allDone = window.confirm(`User selected the following criterion for password generation: \n\
    Password Length: ${x.passwordLength}\n\
    Special Charater: ${x.isSpecialChar}\n\
    Upper Case: ${x.isUppercase}\n\
    Lower Case: ${x.isLowercase}\n\
    Number: ${x.isNumber}.`);  
    /* Proceed for password generation if all agreeed by the user */
    if (allDone){
      returnText = x.generatePassword();  
    }
    else{ // if password generation is cancelled by the user.
      returnText = "Password generation cancelled. \n"
    }
    /* Reset the userPassword object before the next password generation */
    x.resetAll();
  } else{ // if password length condition is not satisfied. 
    returnText = "Password length has to be between 8 and 128";
  }
  return returnText;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  console.log(`Password Generation text: ${password}`);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

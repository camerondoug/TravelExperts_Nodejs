/*function submitConfirm (form) {
    return confirm("Do you really want to submit your form?");
    
}*/

function checkPostal(postal)
{
    var reg = /(^[a-z]\d[a-z] ?\d[a-z]\d$)|(\d{5}( \d{4})?)/i;
    if (!reg.test(postal.value))
    {
        alert("Postal code has an invalid value");
        postal.style.backgroundColor = "red";
    }
}

function checkEmail(email)
{
    var reg = /(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/i;
    if (!reg.test(email.value))
    {
        alert("Email has an invalid value");
        email.style.backgroundColor = "red";
    }
}
function textOnBlur(textToCheck)
{
        
        var paraString =  textToCheck + "-box"
        document.getElementById(paraString).style.visibility = 'hidden';
        
}
function textOnFocus(textToCheck)
{
        
        var paraString =  textToCheck + "-box"
        document.getElementById(paraString).style.visibility = 'visible';
        
}
function validate(myForm)
{
    var message = "";
    
    if (myForm.fname.value == "")
    {
        message += "FirstName must have a value<br>";
    }
    if (myForm.lname.value == "")
    {
        message += "LastName must have a value<br />";
    }
    if (myForm.email.value == "")
    {
        message += "Email must have a value<br />";
    }
    if (myForm.stnum.value == "")
    {
        message += "Street number must have a value<br />";
    }
    if (myForm.stname.value == "")
    {
        message += "Street Name must have a value<br />";
    }
    if (myForm.postal.value == "")
    {
        message += "Postal Code must have a value<br />";
    }
    if (message == "")
    {
        document.getElementById("errormessages").innerHTML = "";
        return confirm("Form is valid, continue submitting?");
        return true;
    }
    else
    {
       var errorPara = document.getElementById("errormessages");
       errorPara.style.visibility = 'visible';
       errorPara.innerHTML = message;
       return false;
    }
}
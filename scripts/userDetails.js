document.addEventListener('DOMContentLoaded', function() {
    //Call function to initialize and display user details
    initializeUserDetails();
});

//Function to initialize user details
function initializeUserDetails() {
    //Hardcoded user details
    let userDetails = {
        firstName: "Walter",
        lastName: "Mitty",
        dob: "1990-12-01",
        address1: "Buenos Ayres Drive",
        address2: "Strandhill",
        address3: "Co. Sligo"
    };

    //Call function to populate form fields with the details
    populateFormFields(userDetails);
}

//Function to populate the form fields with the user details
function populateFormFields(details) {
    document.getElementById("firstNameID").value = details.firstName;
    document.getElementById("lastNameID").value = details.lastName;
    document.getElementById("dobID").value = details.dob;
    document.getElementById("address1ID").value = details.address1;
    document.getElementById("address2ID").value = details.address2;
    document.getElementById("address3ID").value = details.address3;
}

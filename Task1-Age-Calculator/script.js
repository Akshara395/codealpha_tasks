// Prevent selecting future dates
document.getElementById("dob").max =
    new Date().toISOString().split("T")[0];

function calculateAge() {
    let dobInput = document.getElementById("dob").value;
    let result = document.getElementById("result");

    // Empty input check
    if (dobInput === "") {
        result.innerHTML = "Please select date of birth!";
        result.style.color = "red";
        return;
    }

    let birthDate = new Date(dobInput);
    let today = new Date();

    // Future date validation
    if (birthDate > today) {
        result.innerHTML = "Date of birth cannot be in the future.";
        result.style.color = "red";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.style.color = "green";
    result.innerHTML =
        `Your Age is ${years} Years, ${months} Months, and ${days} Days`;
}

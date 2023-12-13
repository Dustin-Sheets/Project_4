TF = {"TrueFalse": ["Yes", "No"]} 
MF = {"MaleFemale": ["Male","Female"]}
BMI = {"BMI":['18','20','22','24','26','28',
'30','32','34','36','38','40','42','44']}


// High Blood Pressure?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset1").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// High Cholesterol?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset2").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Colesterol checked?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset3").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// BMI?
for (i=0;i<BMI.BMI.length; i++){
    BMI.BMI[i]

    d3.select("#selDataset4").append("option").text(BMI.BMI[i]).
    attr("value", BMI.BMI[i]);
};

// Smoke?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset5").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Stroke?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset6").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Diabetes?
const diabetesCategories = ["No or during pregnancy", "Pre-diabetes or borderline diabetes", "Yes diabetes"];
for (let i = 0; i < diabetesCategories.length; i++) {
    d3.select("#selDataset7").append("option").text(diabetesCategories[i]).attr("value", i);
};

// physically active?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset8").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Eat Fruits?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset9").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Eat Vegetables?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset10").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Drink Alcohol?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset11").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Doctor checkup regularly?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset12").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};


// Walking difficulty?
for (i=0;i<2; i++){
    TF.TrueFalse[i]

    d3.select("#selDataset14").append("option").text(TF.TrueFalse[i]).
    attr("value", TF.TrueFalse[i]);
};

// Sex?
for (i=0;i<2; i++){
    MF.MaleFemale[i]

    d3.select("#selDataset15").append("option").text(MF.MaleFemale[i]).
    attr("value", MF.MaleFemale[i]);
};

// Age?

for (i=0;i<120; i++){
    d3.select("#selDataset16").append("option").text(i).
    attr("value", i);
};






// Function to submit data to the Flask API
function submitData() {
    

    // Define a mapping for the Diabetes variable. Defined values by default in dataset
    const diabetesMap = {
        "No or during pregnancy": 0,
        "Pre-diabetes or borderline diabetes": 1,
        "Yes diabetes": 2
    };

    // Get all values the form the user filled in
    const elements = document.querySelectorAll("[id^=selDataset]");


    // Create an array of the values to send to the Flask API by using for loop to iterate 
    // through the elements array and push the value of each element to the elementsArr array 
    var elementsArr = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let value = element.value;
        


        // Convert the diabetes value to a number
        if (element.id === "selDataset7") {
            value = +value; // Map the value using the diabetesMap
        
        } else 
        {
            // Convert yes/no to 1/0 and male/female to 1/0
            if (value === "Yes") value = 1;
            else if (value === "No") value = 0;
            else if (value === "Male") value = 1;
            else if (value === "Female") value = 0;
            else value = +value; // Convert to number if it's not a yes/no or male/female
        }
        
       
        // Push the value to the elementsArr array
        elementsArr.push(value);



        // Log the JSON payload being sent to the Flask API
        console.log('Request Payload:', JSON.stringify([elementsArr]));
    };

    




    // Send data to Flask API for prediction
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([elementsArr]), // Ensure data is sent as a 2D array by wrapping in [] and jsonifying
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText); // Throw an error if the response is not ok
        }
        return response.json();// Return the response as JSON when ok
    })
    .then(data => { 
        console.log('Success:', data.prediction);                           // Log the prediction data to the console
        const predictionBox = document.getElementById("predictionBox");     // Get the prediction box element
        const predictionValue = data.prediction[0];                         // Get the prediction value from the response data
        const prediction_percent = (predictionValue * 100).toFixed(2);      // Convert the prediction value to a percentage

        if (prediction_percent > 40) {                                      // If the prediction percentage is greater than 40%, the patient is at risk
            predictionBox.innerHTML = "Our model predicts that you are at risk of having heart attack/failure with a " + prediction_percent + "% " + " Please consult your doctor.";
        } else {
            predictionBox.innerHTML = "Our model predicts that you are not at risk of having heart attack/failure with a " + prediction_percent + "% " + " . No immediate concerns, but consider regular checkups.";
        }
    })
    .catch((error) => {
        console.error('Error:', error);// Log any errors to the console if there are any
    });
};







// Add an event listener to the submit button to call the submitData function when clicked 

document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault();                                                     // Prevent the page from refreshing when the button is clicked
    submitData();                                                               // Call the submitData function
});


TF = {"TrueFalse": ["Yes", "No"]}
MF = {"MaleFemale": ["Male","Female"]}
BMI = {"BMI":['18','20','22','24','26','28',
'30','32','34','36','38','40','42','44']}

    // High Blood Pressure?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset1").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // High Cholesterol?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset2").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Colesterol checked?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset3").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // BMI?
    for (i=0;i<BMI.BMI.length; i++){
        BMI.BMI[i]

        d3.select("#selDataset4").append("option").text(BMI.BMI[i]).
        attr("value", BMI.BMI[i]);
    }

    // Smoke?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset5").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Stroke?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset6").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Diabetes?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset7").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // physically active?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset8").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Eat Fruits?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset9").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Eat Vegetables?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset10").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Drink Alcohol?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset11").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Doctor checkup regularly?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset12").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // not doctor because of cost?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset13").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Walking difficulty?
    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset14").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    // Sex?
    for (i=0;i<2; i++){
        MF.MaleFemale[i]

        d3.select("#selDataset15").append("option").text(MF.MaleFemale[i]).
        attr("value", MF.MaleFemale[i]);
    }

    // Age?

    for (i=0;i<120; i++){
        d3.select("#selDataset16").append("option").text(i).
        attr("value", i);
    }


var elements = document.querySelectorAll("[id^=selDataset]");



// ..


function submitData() {
    
    const elements = document.querySelectorAll("[id^=selDataset]");

    // Get the values from the form elements
    var elementsArr = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let value = element.value;
        
        // Convert yes/no to 1/0 and male/female to 1/0
        if (value === "Yes") value = 1;
        else if (value === "No") value = 0;
        else if (value === "Male") value = 1;
        else if (value === "Female") value = 0;
        else value = +value; // Convert to number if it's not a yes/no or male/female

        elementsArr.push(value);
    }

    
    // Send data to Flask API for prediction
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([elementsArr]), // Ensure data is sent as a 2D array
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data.prediction);  // Log the prediction data
        const predictionBox = document.getElementById("predictionBox");
        const predictionValue = data.prediction[0];
        const prediction_percent = (predictionValue * 100);

        if (prediction_percent > 30) {
            predictionBox.innerHTML = "Our model predicts that you are at risk of having a heart failure with a " + prediction_percent + "% " + " Please consult your doctor.";
        } else {
            predictionBox.innerHTML = "Our model predicts that you are not at risk of having heart failure with a " + prediction_percent + "% " + " . No immediate concerns, but consider regular checkups.";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Attach the `submitData` function to the click event of the submit button
document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission
    submitData();
});

// ...add another box! with the message "Your prediction is: " + prediction
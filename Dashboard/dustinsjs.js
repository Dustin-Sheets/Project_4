TF = {"TrueFalse": ["Yes", "No"]}
MF = {"MaleFemale": ["Male","Female"]}
BMI = {"BMI":['<18','18','20','22','24','26','28',
'30','32','34','36','38','40','42','44','>44']}


    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset1").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset2").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset3").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<BMI.BMI.length; i++){
        BMI.BMI[i]

        d3.select("#selDataset4").append("option").text(BMI.BMI[i]).
        attr("value", BMI.BMI[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset5").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset6").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset7").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset8").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset9").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset10").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset11").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset12").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset13").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        TF.TrueFalse[i]

        d3.select("#selDataset14").append("option").text(TF.TrueFalse[i]).
        attr("value", TF.TrueFalse[i]);
    }

    for (i=0;i<2; i++){
        MF.MaleFemale[i]

        d3.select("#selDataset15").append("option").text(MF.MaleFemale[i]).
        attr("value", MF.MaleFemale[i]);
    }


var elements = document.querySelectorAll("[id^=selDataset]");

function optionChanged(){
    var elementsArr = []
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            elementsArr.push(element.value);
            
        }
    }
    console.log(elementsArr)
}

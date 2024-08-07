document.getElementById('bmi_Form').addEventListener('submit', function(event){


    event.preventDefault();

    //get value form the input
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const heightCM = parseFloat(document.getElementById('height-meter').value);
    const weight = parseFloat(document.getElementById('weight').value);

    //convert height from cm to meters
    const height = heightCM/100;

    //Calculate BMI
    if(gender && !isNaN(age) && age>0 && !isNaN(height) && height>0 && !isNaN(weight) && weight>0){
        //Calculate BMI, limits the result to 2 decimal place
        const BMI = (weight / (height*height)).toFixed(2);

        const resultElement = document.getElementById('result');

        let category = '';
        if(BMI < 18.5){
            category = 'Under Weight';
        } else if(BMI >= 18.5 && BMI < 25){
            category = 'Normal Weight'
        } else if(BMI >=25 && BMI < 30){
            category = 'Over Weight'
        } else {
            category = 'Obese, need to lose weight'
        }

        let resultMessage = '<h3><Your BMI Result</h3><br>';
        
        resultMessage +=`Your age: ${age} <br>`;
        resultMessage +=`Your gender: ${gender} <br>`;
        resultMessage +=`Your weight: ${weight} kg<br>`;
        resultMessage +=`Your height: ${height} cm<br>`;
        resultMessage +=`BMI: ${BMI} <br>`;
        resultMessage +=`Category: ${category} <br>`;

        resultElement.innerHTML = resultMessage;
        console.log(resultMessage);
        
        
        
    }else{
        alert("Please enter valid values for all fileds.")
    }

});
document.getElementById("greeting_button").addEventListener("click", greetingMessage);

function greetingMessage(){
    let person = {name: "John", age: 24};

    let greeting = "Hello, my name is " + person.name + " and I'm " + person.age + " years old.";

    document.getElementById("greeting").innerHTML = greeting;
    console.log(greeting);
}

document.getElementById("api_button").addEventListener("click", apiFetcher);

async function apiFetcher(){

    //clear
    document.getElementById("api_output").innerHTML = "";

    let api_data;

    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok){throw new Error("Error type: " + response.status);}

        //parse data
        api_data = await response.json();
        console.log(api_data);
    }
    catch(error){
        console.log(error.message);
    }

    for (let i = 0; i < api_data.length; i++){
        let person = document.createElement("li");
        person.innerHTML = api_data[i].name;
        document.getElementById("api_output").appendChild(person);
    }
}

document.getElementById("api_output").addEventListener("click", async (event) => {

    //gets closest li element within the designated ul (api_output)
    let element = event.target.closest("li");

    //if not an li element, then return and do nothing
    if(!element) return;

    //check if li has ul child
    if (element.querySelector("ul")){

        //if so, remove ul to create toggle effect of information
        element.removeChild(element.querySelector("ul"));
        return;
    }

    //
    let targetPerson = element.innerHTML;
    
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok){throw new Error("Error type: " + response.status);}

        //parse data
        api_data = await response.json();
        console.log(api_data);
    }
    catch(error){
        console.log(error.message);
    }

    for (let i = 0; i < api_data.length; i++){
        if (api_data[i].name === targetPerson){
            let postInfo = document.createElement("ul");
            element.appendChild(postInfo);


            let street = document.createElement("li");
            street.innerHTML = "Street: " + api_data[i].address.street; 
            postInfo.appendChild(street);

            let suite = document.createElement("li");
            suite.innerHTML = "Suite: " + api_data[i].address.suite; 
            postInfo.appendChild(suite);

            let city = document.createElement("li");
            city.innerHTML = "City: " + api_data[i].address.city; 
            postInfo.appendChild(city);

            let zipcode = document.createElement("li");
            zipcode.innerHTML = "Zipcode: " + api_data[i].address.zipcode; 
            postInfo.appendChild(zipcode);
        }
    }
});
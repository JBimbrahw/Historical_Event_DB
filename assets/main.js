//runs on browser side

let randomfact = "", randomfactdate = ""
let score = 0;

function saveData() {
    const eventdata = document.getElementById("event").value
    const year = document.getElementById("year").value
  
    console.log(eventdata, year)  
    
    fetch('/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({eventdata, year})
    }).then(function (response) { return response.json()})
      .then(data => {
        console.log(data)
        document.getElementById("event").value = ""
        document.getElementById("year").value = ""
      })
      .catch(err => console.log(err))
}

function fetchData() {
    fetch('/api', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) { return response.json()})
      .then(data => { 

        let dataToShow = ""

        data.forEach(element => {
            //create a row
            //set id column to the id
            //set fact column to the fact
            //set date column to the date
            //don't care about the other columns
            //insert row

            const row =
            `<tr>
                <td>${element["id"]}</td>
                <td>${element["fact"]}</td>
                <td>${element["date"]}</td>
            </tr>`
            
            dataToShow += row

        });

        let tbody = document.getElementById("factsTable").getElementsByTagName('tbody')[0]
        tbody.innerHTML = dataToShow
        console.log(tbody)
        console.log(data)
    })
      .catch(err => console.log(err))
}

function deleteData() {
    const record = document.getElementById("id").value
    fetch('/api/' + record, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) { return response.json()})
      .then(data => {
        console.log(data)
        fetchData()
      })
      .catch(err => console.log(err))
}

function generateQuestion() {
  //this function will display a random fact
  console.log(facts)
  
  var factoid = facts[Math.floor(Math.random()*facts.length)]

  randomfact = factoid.fact
  randomfactdate = factoid.date
  console.log(randomfactdate)

  document.getElementById("event").value = randomfact
}

function checkAnswer() {
  document.getElementById("date").value = randomfactdate

  if (document.getElementById("guess").value === randomfactdate) {
    document.getElementById("resultText").innerHTML = "Good Job!"
    score++;
  }
  else {
    document.getElementById("resultText").innerHTML = "Keep Studying"
  }

  document.getElementById("scoretext").innerHTML = score

}



// // justin.com/blogs/:id
// // method: DELETE

// var para = document.createElement("p");
// var node = document.createTextNode("This is new.");
// para.appendChild(node);
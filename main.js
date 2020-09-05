//runs on browser side

function saveData() {
    const eventdata = document.getElementById("event").value
    const year = document.getElementById("year").value
  
    console.log(eventdata, year)  
    
    fetch('http://localhost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({eventdata, year})
    }).then(function (response) { return response.json()})
      .then(data => console.log(data))
      .catch(err => console.log(err))
}

function fetchData() {
    fetch('http://localhost', {
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
    fetch('http://localhost/' + record, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) { return response.json()})
      .then(data => console.log(data))
      .catch(err => console.log(err))
}

// justin.com/blogs/:id
// method: DELETE

var para = document.createElement("p");
var node = document.createTextNode("This is new.");
para.appendChild(node);
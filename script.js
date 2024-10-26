var file;
const reader = new FileReader();

const nameDictionary = { };
let nameNumbersArray;

let tables; 
let tableArray;
let tableDictionary = { };

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('file-info');

    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;

        if (files.length > 0) {
            file = files[0];
            const fileName = file.name;

            // Display file information
            fileInfo.innerHTML = `
                <p>Valgt fil: ${fileName}</p>
            `;
            
        } else {
            fileInfo.innerHTML = "";
        }
    });
    
});

function initialiseRandomisation() {
    tables = document.querySelectorAll('.individual-table');
    tableArray = Array.from(tables);

    tableArray.sort((a, b) => {
        return parseInt(a.getAttribute('data-weight')) - parseInt(b.getAttribute('data-weight'));
    });
    

    for (let i = 0; i < tableArray.length; i++) {
        tableDictionary[i] = tableArray[i];
    }

    if (file) {
        reader.onload = function(e) {
            const lines = e.target.result.split(/\r\n|\n/).filter(line => line.trim() !== ''); // split lines and remove empty lines
            lines.forEach((line, index) => {
                nameDictionary[index] = line;
            });

            nameNumbersArray = new Array(Object.keys(nameDictionary).length);
            for (let i = 0; i < Object.keys(nameDictionary).length; i++) {
                nameNumbersArray[i] = i;
            }

            randomise();
        };
    
        reader.readAsText(file);
    }
}

function randomise() {
    var newNameNumbersArray = [...nameNumbersArray];
    for (let i = 0; i < nameNumbersArray.length; i++) {
        let randomIndex = Math.floor(Math.random() * (newNameNumbersArray.length));
        let randomNum = newNameNumbersArray[randomIndex];

        tableDictionary[i].innerHTML = nameDictionary[randomNum];

        newNameNumbersArray.splice(randomIndex, 1); // remove name from name array
    }
}

  

//document.getElementById('getForm').addEventListener('submit',getName);

document.getElementById('Prosearch').addEventListener('submit',getAPI);
let inputButton = document.getElementById("inputButton");
let loaderGif = document.getElementById('loaderGif');

/*
function getName(e){
e.preventDefault();

var Name = document.getElementById('name1').value;
console.log("posted");
var xhr = new XMLHttpRequest();
xhr.open("POST", "/api/members");
xhr.setRequestHeader("Content-Type", "application/json");  
xhr.send(JSON.stringify({name:Name, email: "rews@gmail.com", status:"active"}));


}
*/

function getAMA(){
        
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./ProductFiles/ProductAmazon.txt", true);

    xhr.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
        }
    }
    xhr.send();


}

function getAPI(e){
    e.preventDefault();
    inputButton.disabled = true;
    loaderGif.style.visibility ="visible";
    ///Scrap
    
    var search = document.getElementById('name2').value;
    console.log("postedProduc");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {

            console.log(xhr.responseText);
            
            setTimeout(()=>{
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", "./ProductFiles/ProductAmazon.txt", true);
                xhr2.onload = function(){
                    if(this.status == 200){
                    //console.log(this.responseText);
                    tableInsert("table2",this.responseText,4)
                        }
                    }
                xhr2.send();
                
                var xhr3 = new XMLHttpRequest();
                xhr3.open("GET", "./ProductFiles/NeweggProduct.txt", true);
                xhr3.onload = function(){
                    if(this.status == 200){
                    //console.log(this.responseText);
                    tableInsert("table1",this.responseText,7)
                        }
                    }
                xhr3.send();
                    
                inputButton.disabled = false;
                loaderGif.style.visibility ="hidden";


            }, 5000)


        }
    }

    xhr.open("POST", "/search", true);
    xhr.setRequestHeader("Content-Type", "application/json");  
    xhr.send(JSON.stringify({search:search})); 
    
    
    //Read (Timeout fix later)
    


    //Scrappost();
   
}

function tableInsert(tableName,data,numFeatures) {

dlist = data.split('\n');
let n = dlist.length - 1;
let index;
var table = document.getElementById(tableName);
//var newTbody = document.createElement('tbody');
var tbody = document.getElementById(tableName).getElementsByTagName('tbody')[0];
tbody.innerHTML = '';
let itemNum = 1;
console.log("itemNum" + itemNum);

for (index = 0; index < (n/(numFeatures+1));index++){
    var row = tbody.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML =  `${itemNum}`;
    console.log(itemNum);

    for (i =1; i< numFeatures + 1; i++){
        var cell = row.insertCell(i);
        cell.innerHTML = dlist.shift();
    }

    dlist.shift()
    itemNum++;
    }

    //table.parentNode.replaceChild(newTbody,oldBodyRef)
}



/*
async function Scrappost(){
    await Scrap();
    Post();
}

function Scrap(){
    var search = document.getElementById('name2').value;
    console.log("postedProduc");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/search", true);
    xhr.setRequestHeader("Content-Type", "application/json");  
    xhr.send(JSON.stringify({search:search}));
}

function Post(){
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "./ProductFiles/ProductAmazon.txt", true);
    xhr2.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
        }
    }
    xhr2.send();
}
*/

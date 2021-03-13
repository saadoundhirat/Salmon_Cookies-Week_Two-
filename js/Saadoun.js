'use strict';

//globals variables :
var workhour = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
// get the table id and store it in variable:

let informationtable = document.getElementById('infotable');

// function to get random number of customer:
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get the form id for to add new shop :
let form_id =document.getElementById('add-shop-form');

//build the constructor :
function SalmonCookies (location, mincustomer, maxcustomer, avgcookies) {
  this.location = location;
  this.mincustomer = mincustomer;
  this.maxcustomer = maxcustomer;
  this.avgcookies = avgcookies;
  //array that hold the number of customer generated for each hour:
  this.customerperhour =[];
  //array that hold the number of cookies should be produced :
  this.cookiessalesperhr = [];
  // varianle that hold the number of cookies produces in all locations
  this.cookiestotal_onelocation = 0 ;
  //allcookieshops.push(this);
}

//make function that generate random number of customer for each hour and save:
SalmonCookies.prototype.randoumcustomernumber= function (){
  for(let i =0 ;i < workhour.length ;i++){
    let randomcustomer = (random(this.mincustomer, this.maxcustomer));
    this.customerperhour.push(randomcustomer);
  }
};
//function to calculate the average number of cookies sales per hour and should be produced:
SalmonCookies.prototype.cookiesalesperhour = function(){
  this.randoumcustomernumber(); // to call this function once
  for(let i =0 ;i < workhour.length ;i++){
    let produsedcookies = Math.ceil(this.avgcookies * this.customerperhour[i]);
    this.cookiessalesperhr.push(produsedcookies);
    this.cookiestotal_onelocation += produsedcookies; // hold total cookies one location
  }
};

//FUNCTION TO MAKE RENDER AND FILL TABLE BODY:
SalmonCookies.prototype.render = function(){
  this.cookiesalesperhour();
  let table_row = document.createElement('tr');
  let table_location = document.createElement('td');
  table_location.textContent = this.location; // to display location
  table_row.appendChild(table_location);
  //loop to make table rows :
  for(let i =0 ;i < workhour.length ;i++){
    let table_location = document.createElement('td');
    table_location.textContent = this.cookiessalesperhr[i];
    table_row.appendChild(table_location);
  }
  // to store total location:
  let table_loc_total = document.createElement('th');
  table_loc_total.textContent = this.cookiestotal_onelocation ;
  table_row.appendChild(table_loc_total);
  informationtable.appendChild(table_row); // check on this line
};

// make an objects for each store then push it to an array:

let seattle=new SalmonCookies('Seattle', 23, 65, 6.3);
let tokyo=new SalmonCookies('Tokyo', 3, 24, 1.2);
let dubai=new SalmonCookies('Dubai', 11, 38, 3.7);
let paris=new SalmonCookies('Paris', 20, 38, 2.3);
let lima=new SalmonCookies('Lima', 2, 16, 4.6);
let storeslocations=[seattle,tokyo,dubai,paris,lima];

// function to make the header of the table:

function makeHeaderRow() {
  const table_header_row = document.createElement('tr');
  let tableheadfirstvalue = document.createElement('th');
  tableheadfirstvalue.textContent = 'Locations';
  table_header_row.appendChild(tableheadfirstvalue);
  for (let i = 0; i < workhour.length; i++) {
    tableheadfirstvalue = document.createElement('th');
    tableheadfirstvalue.textContent = workhour[i];
    table_header_row.appendChild(tableheadfirstvalue);
  }
  tableheadfirstvalue = document.createElement('th');
  tableheadfirstvalue.textContent = 'Location Totals';
  table_header_row.appendChild(tableheadfirstvalue);
  informationtable.appendChild(table_header_row);
}

// function to make the table_footer which include the total for all locations:
let footer_row = document.createElement('tr'); // make it global variable to use it down.
///////////////////////////////foooooooter///////////////////////////////////
function tableinfo_footer (){
  let footer_data = document.createElement('th');
  footer_data.textContent= 'Totals';
  footer_row.appendChild(footer_data);
  let footer_total_all = 0 ; //will store the total for all total
  for(let i =0 ;i < workhour.length ;i++){
    let footer_clm_total = 0 ; // total for each hour
    for(let j =0 ; j < storeslocations.length ;j++){
      footer_clm_total += storeslocations[j].cookiessalesperhr[i];
      footer_total_all += storeslocations[j].cookiessalesperhr[i];
    }
    footer_data =document.createElement('th');
    footer_data.textContent = footer_clm_total;
    footer_row.appendChild(footer_data);
  }
  footer_data =document.createElement('th');
  footer_data.textContent = footer_total_all;
  footer_row.appendChild(footer_data);
  informationtable.appendChild(footer_row);
}


///////////////////////////[newrow]///////////////////
//Event Listener to Form
form_id.addEventListener('submit', addnewshop);
// function to greate row for the new shop:

function addnewshop(event) {
  event.preventDefault();
  // to get the new location name:
  let newlocation = event.target.new_location.value;
  console.log(newlocation);
  // to get new min customer:
  let newmincustomer = parseInt(event.target.mincustomer.value);
  console.log(newmincustomer);
  //to get new max customer:
  let newmaxcustomer = parseInt(event.target.maxcustomer.value);
  console.log(newmaxcustomer);
  // to get new avg cookies:
  let newavgcookies = parseInt(event.target.avgcookies.value);
  console.log(newavgcookies);
  // here is to call the function to create anew object
  let new_location = new SalmonCookies(newlocation, newmincustomer, newmaxcustomer, newavgcookies);
  //push the new location to location list
  storeslocations.push(new_location);
  storeslocations[storeslocations.length-1].render();//[0,1,2,3,4,new]
  informationtable.removeChild(footer_row);
  footer_row.textContent = '';
  tableinfo_footer();
}
// to render all functions:
(function render_table (){
  makeHeaderRow();
  for(let i =0 ;i < storeslocations.length ;i++){
    storeslocations[i].render();
  }
  tableinfo_footer();
})();


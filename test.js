
let title = document.getElementById('titel');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let cotegory = document.getElementById('category');
let submit = document.getElementById('submit');

let mood ='create';
let temp;

//console.log(titel,price ,taxes , ads,discount ,total ,count ,cotegory ,submit);

//get total
function getTotal(){
   if (price.value !=''){
      let result= (+price.value + +taxes.value + +ads.value)- +discount.value;
      total.innerHTML=result;
      total.style.background ='#040';
   }
  else{
      total.innerHTML ='';
      total.style.background ='#a00d02';
   }
}

let datapro;
if (localStorage.product !=null){
   datapro=JSON.parse(localStorage.product)
}else{
   datapro=[];
}

function dataclear(){
   title.value ='';
   price.value ='';
   taxes.value ='';
   ads.value ='';
   discount.value ='';
   total.innerHTML ='';
   count.value ='';
   cotegory.value ='';
}

function showdata(){
   getTotal();
let table ='';
for(let i=0 ; i< datapro.length ; i++){
   table +=`
    <tr>
   <td>${i+1}</td>
   <td>${datapro[i].title}</td>
   <td>${datapro[i].price}</td>
   <td>${datapro[i].taxes}</td>
   <td>${datapro[i].ads}</td>
   <td>${datapro[i].discount}</td>
   <td>${datapro[i].total}</td>
   <td>${datapro[i].cotegory}</td>
   <td><button onclick="updatedata( ${i} )"id="update">update</button></td>
   <td><button onclick="deletdata( ${i} )" id="delete">delete</button></td>
</tr>`
   
}
document.getElementById('tbody').innerHTML=table;

let btndelate=document.getElementById('deleteall');
if(datapro.length>0){
btndelate.innerHTML=`
<button onclick="deleteAll()">delete all(${datapro.length})</button>
`
}else{
   btndelate.innerHTML='';
}
}

function deletdata(i) {
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro);
   showdata()
}

function deleteAll(){
   localStorage.clear();
   datapro.splice(0);
   showdata();
}

function updatedata(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
taxes.value=datapro[i].taxes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
getTotal();
count.style.display='none';
cotegory.value=datapro[i].cotegory;
submit.innerHTML='update';
mood ='update';
temp=i;
scroll({
   top:0,
   behavior :"smooth",
})

}

submit.onclick =function(){
let newpro={
   title:title.value,
   price:price.value,
   taxes:taxes.value,
   ads:ads.value,
   discount: discount.value,
   total:total.innerHTML,
   count :count.value,
   cotegory:cotegory.value,
}
if(title.value !=''&& newpro.count<100){
if(mood==='create'){
if (newpro.count>1){
   for(let i=0 ; i< newpro.count ; i++){
      datapro.push(newpro);
   } 
}else{
   datapro.push(newpro);
}
}else{
   datapro[temp]=newpro;
   mood='create';
   submit.innerHTML='create';
   count.style.display='block';
}
dataclear();
}
localStorage.setItem('product' , JSON.stringify(datapro));
console.log(datapro);

showdata();
}
showdata();

let serchmood='title';
function getserch(id){
   let search=document.getElementById('search')
   if (id=='searchTital'){
      serchmood='title';
      search.placeholder='search by title';
    } else {
      serchmood='category';
      search.placeholder='search by category';
       }
       search.focus();
       search.value='';
       showdata();
}

function searchdata(value){
let table ='';

if (serchmood=='title'){
for (let i=0; i< datapro.length ;i++){

   if(datapro[i].title.includes(value)){
      table +=`
    <tr>
   <td>${i}</td>
   <td>${datapro[i].title}</td>
   <td>${datapro[i].price}</td>
   <td>${datapro[i].taxes}</td>
   <td>${datapro[i].ads}</td>
   <td>${datapro[i].discount}</td>
   <td>${datapro[i].total}</td>
   <td>${datapro[i].cotegory}</td>
   <td><button onclick="updatedata( ${i} )"id="update">update</button></td>
   <td><button onclick="deletdata( ${i} )" id="delete">delete</button></td>
</tr>`
   }
}
}else{
   for (let i=0; i< datapro.length ;i++){

      if(datapro[i].cotegory.includes(value)){
         table +=`
       <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].cotegory}</td>
      <td><button onclick="updatedata( ${i} )"id="update">update</button></td>
      <td><button onclick="deletdata( ${i} )" id="delete">delete</button></td>
   </tr>`
      }
   }
}
document.getElementById('tbody').innerHTML=table;
}

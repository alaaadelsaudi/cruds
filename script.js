let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let sumbit = document.getElementById('sumbit')
let search = document.getElementById('search')
let searchtitle = document.getElementById('searchtitle')
let searchcat = document.getElementById('searchcat')

let mood = 'create'
let tmp;
//total//
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }
    else {
        total.innerHTML = ""
        total.style.background = 'rgb(255, 187, 0)'
    }

}


// //creat//
let arraydata;
if (localStorage.product != null) {
    arraydata = JSON.parse(localStorage.product)
} else { arraydata = [] }

sumbit.onclick = function () {
    objectcreat = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    //count//

    if(title.value!=''&&price.value!=''&&category.value!==''&&objectcreat.count<=100){
    if (mood === 'create') {
        if (objectcreat.count > 1) {
            for (let i = 0; i < objectcreat.count; i++) {
                arraydata.push(objectcreat);
            }
        }
        else { arraydata.push(objectcreat) }
    }

    else {
        arraydata[tmp] = objectcreat
        mood = 'create';
        sumbit.innerHTML = 'create';
        count.style.display = 'block';
    }
clear()}
    

    localStorage.setItem('product', JSON.stringify(arraydata));
   
    showdata();
}


// //clear input 
// //يعنى لما ادوس creat
// // يمسح الداتا اللي في ال input//
function clear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



// // //read=showdata//

function showdata() {
    gettotal()
    let table = '';
    for (let i = 0; i < arraydata.length; i++) {
        table += `  <tr>
   <td>${i+1}</td>
   <td>${arraydata[i].title}</td>
    <td>${arraydata[i].price}</td>
   <td>${arraydata[i].taxes}</td>
   <td>${arraydata[i].ads}</td>
   <td>${arraydata[i].discount}</td>
    <td>${arraydata[i].total}</td>
    <td>${arraydata[i].category}</td>
    <td><button onclick='updatedata(${i})' id="update" >update</button></td>
    <td><button onclick='delet(${i})'  id="delete">delete</button></td>
 </tr>`}
    document.getElementById('tbody').innerHTML = table

    let btndelet = document.getElementById('deletall')
    if (arraydata.length > 0) {
        btndelet.innerHTML = `<button onclick='deletall()'>delete all (${arraydata.length})</button>`
    } else { btndelet.innerHTML = '' }

}
showdata()

// // //delete//

function delet(i) {
    arraydata.splice(i, 1);
    localStorage.product = JSON.stringify(arraydata)


    showdata();
}

// // //deletall//
function deletall() {
    localStorage.clear()
    arraydata.splice(0)
    showdata();
}

// // //uupdate//

function updatedata(i) {
    title.value = arraydata[i].title;
    price.value = arraydata[i].price;
    taxes.value = arraydata[i].taxes;
    ads.value = arraydata[i].ads;
    discount.value = arraydata[i].discount;
    gettotal();
    sumbit.innerHTML = 'update'
    count.style.display = 'none';
    category.value = arraydata[i].category;
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: "smooth" })
}

//search//

let searchmood='title';
function searchmo(id){
    if(id=='searchtitle'){
        searchmood='title';
        
    }else{searchmood='category';
   
    }
    search.placeholder='search by '+ searchmood
    search.focus()
    search.value=''
    showdata()
}

function searchdata(value){
    let table=''
    if(searchmood=='title'){
        for(let i=0;i<arraydata.length;i++)
            {
               if(arraydata[i].title.includes(value.toLowerCase())){
                table += `  <tr>
                <td>${i}</td>
                <td>${arraydata[i].title}</td>
                 <td>${arraydata[i].price}</td>
                <td>${arraydata[i].taxes}</td>
                <td>${arraydata[i].ads}</td>
                <td>${arraydata[i].discount}</td>
                 <td>${arraydata[i].total}</td>
                 <td>${arraydata[i].category}</td>
                 <td><button onclick='updatedata(${i})' id="update" >update</button></td>
                 <td><button onclick='delet(${i})'  id="delete">delete</button></td>
              </tr>`}
             
            else{
                if(searchmood=='category'){
                    
                           if(arraydata[i].category.includes(value.toLowerCase())){
                            table += `  <tr>
                            <td>${i}</td>
                            <td>${arraydata[i].title}</td>
                             <td>${arraydata[i].price}</td>
                            <td>${arraydata[i].taxes}</td>
                            <td>${arraydata[i].ads}</td>
                            <td>${arraydata[i].discount}</td>
                             <td>${arraydata[i].total}</td>
                             <td>${arraydata[i].category}</td>
                             <td><button onclick='updatedata(${i})' id="update" >update</button></td>
                             <td><button onclick='delet(${i})'  id="delete">delete</button></td>
                          </tr>`}
                        } }
                }
    }
            
            
            document.getElementById('tbody').innerHTML = table
    }
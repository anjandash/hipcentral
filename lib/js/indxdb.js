/* initial */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

/* begin */

/* creating the db */
const productData = [
   { id: "01", name: "Product1", desc: "", image: "img/products/min/minus/1-minus.jpg", price: '25' },
   { id: "02", name: "Product1", desc: "", image: "img/products/min/minus/2-minus.jpg", price: '25' },
   { id: "03", name: "Product1", desc: "", image: "img/products/min/minus/3-minus.jpg", price: '25' },
   { id: "04", name: "Product1", desc: "", image: "img/products/min/minus/4-minus.jpg", price: '25' },
   { id: "05", name: "Product1", desc: "", image: "img/products/min/minus/5-minus.jpg", price: '25' },
   { id: "06", name: "Product1", desc: "", image: "img/products/min/minus/6-minus.jpg", price: '25' },
   { id: "07", name: "Product1", desc: "", image: "img/products/min/minus/7-minus.jpg", price: '25' },
   { id: "08", name: "Product1", desc: "", image: "img/products/min/minus/8-minus.jpg", price: '25' },
   { id: "09", name: "Product1", desc: "", image: "img/products/min/minus/9-minus.jpg", price: '25' },
];

var db;
var request = window.indexedDB.open("ProductDatabase1", 1);

request.onerror = function(event) {
   console.log("error: :/");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: :)");
};    

/* preparing product table */
request.onupgradeneeded = function(event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore("product", {keyPath: "id"});
   
   for (var i in productData) {
      objectStore.add(productData[i]);
   }
}

/* SELECT ALL */
function readAll() {
	// on page refresh the db object is not available **for a few seconds
   var objectStore = db.transaction("product").objectStore("product");
   
   objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      
      if (cursor) {
      		var div = document.createElement("div");
      		div.className = "pframe";
      		div.id = "pframeview";
      		div.style.backgroundImage = "url(" + cursor.value.image + ")";  
      		div.onclick = handlemodal;

            var vbutton = document.createElement("div");
            vbutton.id = "vbutton";
            vbutton.innerHTML = "view";

        	document.getElementById("windowframe").appendChild(div).appendChild(vbutton); 
         cursor.continue();
      }
   };
} 
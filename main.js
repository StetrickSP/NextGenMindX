const firebaseConfig = {
    apiKey: "AIzaSyCA8rETUgk_Cye1ptUnulXafuQ9C-QdwGw",
    authDomain: "nextgenmindx-1d5bc.firebaseapp.com",
    databaseURL: "https://nextgenmindx-1d5bc-default-rtdb.firebaseio.com",
    projectId: "nextgenmindx-1d5bc",
    storageBucket: "nextgenmindx-1d5bc.firebasestorage.app",
    messagingSenderId: "211033058174",
    appId: "1:211033058174:web:b4d5ced79dd71093e7612f"
  };
const app = initializeApp(firebaseConfig); //Khoi tao firebase
const database = firebase.database();  //khoi tao noi chua du lieu

const addForm = document.getElementById('addForm');
const apartmentName = document.getElementById('apartmentName');
const apartmentPrice = document.getElementById('apartmentPrice');
const apartmentDescription = document.getElementById('apartmentDescription');
const imageUpload = document.getElementById('imageUpload');
const updateForm = document.getElementById('updateForm');
const updateName = document.getElementById('updateName');
const updatePrice = document.getElementById('updatePrice');
const updateDescription = document.getElementById('updateDescription');
const updateImageUpload = document.getElementById('updateImageUpload');
const apartmentList = document.getElementById('apartmentList');

addForm.addEventListener('submit',(e) => {
    e.preventDefault()
}) 
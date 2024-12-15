const firebaseConfig = {
    apiKey: "AIzaSyCA8rETUgk_Cye1ptUnulXafuQ9C-QdwGw",
    authDomain: "nextgenmindx-1d5bc.firebaseapp.com",
    databaseURL: "https://nextgenmindx-1d5bc-default-rtdb.firebaseio.com",
    projectId: "nextgenmindx-1d5bc",
    storageBucket: "nextgenmindx-1d5bc.firebasestorage.app",
    messagingSenderId: "211033058174",
    appId: "1:211033058174:web:b4d5ced79dd71093e7612f"
  };

// Khoi tao firebase
const app = firebase.initializeApp(firebaseConfig)
// Khoi tao noi chua du lieu web
const database = firebase.database()

// Form elements
const addForm = document.getElementById('addForm')
const apartmentName = document.getElementById('apartmentName')
const apartmentPrice = document.getElementById('apartmentPrice')
const apartmentDescription = document.getElementById('apartmentDescription')
const imageUpload = document.getElementById('imageUpload')
const updateForm = document.getElementById('updateForm')
const updateName = document.getElementById('updateName')
const updatePrice = document.getElementById('updatePrice')
const updateDescription = document.getElementById('updateDescription')
const updateImageUpload = document.getElementById('updateImageUpload')
const apartmentList = document.getElementById('apartmentList')

//Them san pham vào firebase (add data to firebase)
addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = apartmentName.value
    const price = apartmentPrice.value
    const description = apartmentDescription.value
    const image = imageUpload.files[0]

    if (image) {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageData = reader.result
            const newApartmentRef = database.ref('apartments').push()
            newApartmentRef.set({
                name: name,
                price: price,
                description: description,
                image: imageData
            }).then(() => {
                alert("Thêm sản phẩm thành công vào website")
                resetAddForm()
                displayApartment()
            })
        }
         reader.readAsDataURL(image) 
    }
})

// Xoa san pham
function deleteApartment(id)
{
    const apartmentRef = database.ref('apartments/'+ id)
    apartmentRef.remove().then(()=>{
        alert("Da xoa san pham")
        displayApartment()
    })
}

// Chinh sua san pham
function editApartment(id) {
    const apartmentRef = database.ref('apartments/' + id)
    apartmentRef.once('value', (snapshot) => {
        const apartment = snapshot.val()

        updateName.value = apartment.name
        updatePrice.value = apartment.price
        updateDescription.value = apartment.description

        updateForm.style.display = 'block'

        updateForm.onsubmit = (e) => {
            e.preventDefault()
            const updatedName = updateName.value
            const updatedPrice = updatePrice.value
            const updatedDescription = updateDescription.value
            const updatedImage = updateImageUpload.files[0]

            if(updatedImage) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const updatedImageData = reader.result
                    apartmentRef.update({
                        name: updatedName,
                        price: updatedPrice,
                        description: updatedDescription,
                        image: updatedImageData
                    }).then(() => {
                        alert("Chỉnh sửa thành công ")
                        resetUpdateForm()
                        displayApartment()
                    })
                }
                reader.readAsDataURL(updatedImage)
            } else {
                apartmentRef.update({
                    name: updatedName,
                    price: updatedPrice,
                    description: updatedDescription
                }).then(() => {
                    alert("Bạn đã cập nhật thành công, mặc dù bạn không chỉnh sửa gì hết")
                    resetUpdateForm()
                    displayApartment()
                })
            }
        }

    })
}

// Reset khung thông tin thêm sản phẩm
function resetAddForm() {
    apartmentName.value = ''
    apartmentPrice.value = ''
    apartmentDescription.value = ''
    imageUpload.value = ''
}

// Reset khung thong tin cap nhat san pham 
function resetUpdateForm() {
    updateName.value = ''
    updatePrice.value = ''
    updateDescription.value = ''
    updateImageUpload.value = ''
    updateForm.style.display = 'none'
}

// Hiển thị sản phẩm lên màn hình
function displayApartment() {
    apartmentList.innerHTML = ""
    database.ref('apartments').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const apartment = childSnapshot.val()
            const apartmentDiv = document.createElement('div')
            apartmentDiv.classList.add('apartment')
            apartmentDiv.innerHTML = `
                <h4>${apartment.name}</h4>
                <p>${apartment.description}</p>
                <p>${apartment.price}</p>
                <img src = "${apartment.image}">
                <button onclick = "editApartment('${childSnapshot.key}')">Edit</button>
                <button onclick = "deleteApartment('${childSnapshot.key}')">Delete</button>
            `
            apartmentList.appendChild(apartmentDiv)
        })
    })
}

// Kích hoạt chạy hàm hiển thị sản phẩm lên màn hình
displayApartment()
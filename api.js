 const cart = [];
let allPlants = [];

 




const loadtrees = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=> res.json())
    .then((json) => displaytree(json.categories));
}; 

const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            allPlants = data.plants;
            displayLevelWord(data.plants);
        });
};

loadtrees();
loadAllPlants();





const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
         .then((res) => res.json())
       .then((data) => displayLevelWord(data.plants));
};
 const displayLevelWord = (plants) => {

    allPlants = plants;
   const wordContainer = document.getElementById("word-container");
   wordContainer.innerHTML = "";

   plants.forEach((plant) => {
    
    const card = document.createElement("div");
    card.innerHTML =`<div class="bg-white p-5 rounded-xl w-full ">
    <img src="${plant.image}" class=" w-full h-30 object-cover rounded-3xl " alt="">
   <div>
    <h2 class="font-bold">${plant.name}</h2>
    <p>${plant.description}</p>
    <div class="flex justify-between">
      <span class="bg-green-100 rounded-3xl">${plant.category}</span>
      <span class="font-bold">${plant.price}</span>
    </div>
    <div class="flex justify-center "><button onclick="addToCart(${plant.id})" class="bg-green-400 rounded-3xl w-full py-2">Add to card</button></div>
    </div>
    </div>
`;
    wordContainer.appendChild(card);
   });

};     



const displayCart = () => {
    const cartContainer = document.getElementById("cart-container");
    const totalPrice = document.getElementById("total-price");

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((plant) => {

        total += plant.price;

        const div = document.createElement("div");

        div.innerHTML = `
            <div class="flex justify-between p-3">
    <span>${plant.name}</span>
    <span>${plant.price}</span>
  </div>
   <button onclick="removeFromCart(${plant.id})"
            class="bg-red-500 text-white px-2 rounded">
            Delete
        </button>
        `;

        cartContainer.appendChild(div);
    });

    totalPrice.innerText = `$${total}`;
};
const addToCart = (id) => {
    const plant = allPlants.find(item => item.id === id);

    if (!plant) return;

    cart.push(plant);

    displayCart();
};

const removeFromCart = (id) => {
    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    displayCart();
};



const displaytree = (trees) => {
       const levelContainer = document.getElementById("level-container");
        levelContainer.innerHTML = "";
        for ( const tree of trees ) {
             const btnDiv = document.createElement("div");
             btnDiv.innerHTML = `<button onclick="loadLevelWord(${tree.id})" class=" hover:bg-green-400 ">
             <i class=""></i> ${tree.category_name}
             </button>`;

             levelContainer.append(btnDiv);
        }
};
loadtrees(); 

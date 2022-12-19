let coinRewardP = document.querySelector(".coinRewardP");
let balance = document.querySelector(".balance");
balance.addEventListener("click",openCollection);

let coinRewardPItem = document.querySelector(".coinRewardPItem");

let botonDePesca = document.querySelector(".pescar");
botonDePesca.addEventListener("click",tirarCebo);

let fondoCebo = document.querySelector(".fondoCebo");
let fondo = document.querySelector(".fondoSinCebo");

let reward = document.querySelector(".reward");
reward.addEventListener("click",claimReward);

let imgDinamyc = document.querySelector(".rewardImg");

// COLLECTION 
let divItemsCollection = document.querySelector(".divItemsCollection");
let coleccion = document.querySelector(".flexTotal");
let totalItemsCollection = document.querySelector(".totalItemsCollection");
let yourItemsCollection = document.querySelector(".yourItemsCollection");
let px = document.querySelector(".px");
px.addEventListener("click", closeCollection);

let player = {
    inventario: [],
    herramientaDePesca: undefined,
    cantidadDePescadas: 0,
    oro: 0
};

class rewardItem{
    constructor(name, value, image, type){
        this.name = name;
        this.value = value;
        this.image = image;
        this.type = type;
    }
};

let arrayAllRewards = [reward1 = new rewardItem("Pez comun",30,"./icons/pez1.png", "pez"),reward2 = new rewardItem("Pez normal",40,"./icons/pez2.png", "pez"),reward3 = new rewardItem("Pez espectacular",50,"./icons/pez3.png", "pez"),reward4 = new rewardItem("Botella plastica",10,"./icons/botella.png", "Basura"),reward5 = new rewardItem("Guantes",200,"./icons/guantes.png", "Objetos"),reward6 = new rewardItem("Camara",400,"./icons/camara.png", "Objetos")]

let podesPescar = false;
let ingresaAtuInventario = false;

function tirarCebo(){
    ingresaAtuInventario = false;

    let numeroRandomRewards = Math.trunc(Math.random()*arrayAllRewards.length); // Crea un numero de largo como el array de recompenzas
    reward.classList.remove("animate__bounceOut");


    if(podesPescar){    //Despues de haber esperado que pique:
        let rewardUltimate = arrayAllRewards[numeroRandomRewards];

        let arrayInventario = player.inventario.length;
        
        // ---------- Hace que solo se te añada al inventario un item nuevo
        for (let index = 0; index < arrayInventario; index++) {
            const element = player.inventario[index].name;
            
            if(element == rewardUltimate.name){
                ingresaAtuInventario = true;
            }else{
            }
        }

        if(ingresaAtuInventario){
            console.log("ya tienes este item");
        }else{
            console.log("Item Nuevo")
            player.inventario.push(rewardUltimate);

            var newDiv = document.createElement("div");
            var newImage = document.createElement("img");
            newDiv.appendChild(newImage); //Mete la img al div que creamos

            newDiv.classList.add("divsItemsNuevos");
            newImage.classList.add("itemInCollection");
            newImage.src = rewardUltimate.image;
            // añade el elemento creado y su contenido al DOM
            
            var currentDiv = document.querySelector(".div1");
            divItemsCollection.insertBefore(newDiv, currentDiv);
        }
        //----------
        fondoCebo.classList.remove("fondoVeinte");
        fondoCebo.classList.add("fondoCero")
        botonDePesca.classList.remove("pescarSi");

        setTimeout(()=>{ 
            botonDePesca.classList.add("fondoCero");
            },500);

        botonDePesca.classList.add("animate__bounceOut");
        imgDinamyc.src = rewardUltimate.image; //Cambio de imagen dinamico

        reward.classList.add("animate__zoomIn");
        reward.classList.add("fondoVeinte");
        player.cantidadDePescadas += 1;
        player.oro += rewardUltimate.value;
        coinRewardPItem.innerHTML = rewardUltimate.value;
        
    }else{
        let numeroRandom = Math.trunc(Math.random()*10000)
        botonDePesca.classList.add("animate__bounceOut");
        
        setTimeout(()=>{ 
            botonDePesca.classList.add("fondoCero");
            },500);
        
        
        fondoCebo.classList.remove("fondoCero")
        fondoCebo.classList.add("fondoVeinte")

        setTimeout(()=>{ 
            botonDePesca.src = "./icons/fishing2.png"
            }, 1000);
    
        setTimeout(()=>{ // Esperando que pique.. Cuando pica:
            botonDePesca.classList.remove("animate__bounceOut");
            podesPescar = true;
            botonDePesca.classList.remove("fondoCero");
            botonDePesca.classList.add("pescarSi");
            
        }, 1000);  //numeroRandom
    }
    podesPescar = false;
}

function claimReward(){
    reward.classList.remove("animate__zoomIn");
    reward.classList.add("animate__bounceOut");
    botonDePesca.classList.remove("animate__bounceOut");
    botonDePesca.classList.remove("fondoCero");
    botonDePesca.src = "./icons/fishing.png"
    setTimeout(()=>{ 
    reward.classList.remove("fondoVeinte");
    imgDinamyc.src = "";
    }, 1000);
    coinRewardP.innerHTML = player.oro;
}

// Coleccion de objetos y peces

function openCollection(){
    coleccion.classList.remove("fondoCero");
    coleccion.classList.add("fondoVeintidos");

    totalItemsCollection.innerHTML = arrayAllRewards.length;
    yourItemsCollection.innerHTML = player.inventario.length;
}

function closeCollection(){
    coleccion.classList.remove("fondoVeintidos");
    coleccion.classList.add("fondoCero");
}
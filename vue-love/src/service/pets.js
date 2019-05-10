const addPets = async (obj) => await fetch(`/pet/addPets`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

const findPets = async (obj) => await fetch(`/pet/findPets`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

const removePets = async (obj) => await fetch(`/pet/removePets`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());


const updatePets = async (obj) => await fetch(`/pet/updatePets`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());






export default {
    addPets,findPets,removePets,updatePets
}


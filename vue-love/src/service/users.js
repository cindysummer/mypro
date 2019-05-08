
export const loginService = async (obj) => await fetch(`/users/login`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

export const getUserById = async (_id) => await
    fetch(`/users/getUserById?_id=${_id}`)
        .then(Response => Response.json())
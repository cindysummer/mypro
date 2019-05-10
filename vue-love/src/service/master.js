const getMastersByPage = async ({ currentPage = "1", eachPage = "3" } = {}) => await
    fetch(`/master/getMastersByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
    .then(Response => Response.json())


export const removeMasterFetch = async ({_id}) => await fetch(`/master/removeMaster`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({_id})
    }).then(response => response.json());

export default {getMastersByPage,removeMasterFetch};
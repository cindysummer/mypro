const getMastersByPage = async ({ currentPage = "1", eachPage = "3" } = {}) => await
    fetch(`/master/getMastersByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
    .then(Response => Response.json())


export default {getMastersByPage};
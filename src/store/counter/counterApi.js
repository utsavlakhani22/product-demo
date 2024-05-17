export function addValueApi(val) {
    // console.log(val, "here");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({status: 200 , data: val})
        }, 3000)
    })
}
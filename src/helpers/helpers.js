const generateRandomString=(len = 100)=>{
    let char = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let length = char.length
    let random = ""

    for(let i =0; i<len; i++){
        let position = Math.floor(Math.random()*(length-1))
        random += char[position]
    }
    return random
}

module.exports = generateRandomString
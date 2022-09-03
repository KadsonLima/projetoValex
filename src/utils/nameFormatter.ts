
export function nameFormatterCard(name:string){
    let nameArray = name.toUpperCase().split(" ");
    const firstName = nameArray.shift();
    const lastName = nameArray.pop();
    let namesMiddle =[]
    nameArray.forEach(nome =>{
        if(nome.length >= 3){
            namesMiddle.push(nome[0])
        }
    })

    const nameFormat = `${firstName} ${namesMiddle.join(" ")} ${lastName}`

    return nameFormat
}
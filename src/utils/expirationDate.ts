import dayjs from 'dayjs';

export function expirationData(){
    return dayjs().add(5, 'year').format("MM/YY")
}

export function validateDataCard(expirationData:string){
    const newDate = dayjs().format("MM/YY");

    if(newDate > dayjs().format(expirationData)){
        throw {code:401, message:"Data do Cartão Expirado!!"}
    }
}
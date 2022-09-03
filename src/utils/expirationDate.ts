import dayjs from 'dayjs';

export function expirationData(){
    return dayjs().add(5, 'year').format("MM/YY")
}
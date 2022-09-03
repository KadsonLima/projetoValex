import {faker} from '@faker-js/faker/locale/pt_BR';
import { expirationData } from './expirationDate';

export function cardGenerator(){
    const validateCard = expirationData()
    const CVC = faker.finance.creditCardCVV();
    const numberCard = faker.finance.creditCardNumber();

    return {CVC, numberCard, validateCard}
}
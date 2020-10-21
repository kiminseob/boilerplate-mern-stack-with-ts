import prod, {Prod} from './prod';
import dev, {Dev} from './dev';

let config:(Prod | Dev);

if(process.env.NODE_ENV === 'production'){
    config = prod;
}else{
    config = dev;
}

export = config;
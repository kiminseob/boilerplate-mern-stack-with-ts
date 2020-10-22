import prod from './prod';
import dev from './dev';

let config:Sequrity;

if(process.env.NODE_ENV === 'production'){
    config = prod;
}else{
    config = dev;
}

export = config;
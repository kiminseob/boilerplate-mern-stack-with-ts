export interface Prod {
    mongoURI: string
}

const prod:Prod = {
    mongoURI: process.env.MONGO_URI ?? ''
}

export default prod;
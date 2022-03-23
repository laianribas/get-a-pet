import mongoose from 'mongoose'

async function run() {
    await mongoose.connect('mongodb://localhost:27017/getapet')
}

run().catch((err) => console.log(err))

export default mongoose
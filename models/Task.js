import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    description: String,
})

export default mongoose.model('tasks', taskSchema);
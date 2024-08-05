import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['folder', 'file'], required: true },
    data: {
        value: { type: String },
        createdAt: { type: Date, default: Date.now },
        modifiedAt: { type: Date, default: Date.now },
    },
    folders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

export default mongoose.models.File || mongoose.model('File', fileSchema);
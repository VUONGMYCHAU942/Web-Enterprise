import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: { type: String, maxlength: 20, unique: true, required: true },
    usage: { type: Boolean, default: false}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Category', CategorySchema);

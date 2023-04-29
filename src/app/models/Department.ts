import { Schema, model } from 'mongoose';

const DepartmentSchema = new Schema(
  {
    name: { type: String, maxlength: 20, unique: true, required: true },
    people: {type: Number, default: 0}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Department', DepartmentSchema);

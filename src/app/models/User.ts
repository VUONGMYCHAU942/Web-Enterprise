import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, maxlength: 15, unique: true, required: true },
    email: { type: String, maxlength: 50, unique: true, required: true },
    password: {type: String, minlength: 8, maxlength: 20, requried: true},
    fullname: { type: String, maxlength: 50, required: true },
    role: { type: Number, max: 2, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('User', UserSchema);

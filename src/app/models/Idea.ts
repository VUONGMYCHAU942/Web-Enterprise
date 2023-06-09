import { Schema, model } from 'mongoose';

const IdeaSchema = new Schema(
  {
    title: { type: String, maxlength: 20, required: true },
    description: { type: String, maxlength: 200, required: true },
    content: { type: String, maxlength: 500, required: true },
    anonymousMode: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    submission: { type: Schema.Types.ObjectId, required: true, ref: 'Submission' },
    categories: { type: [Schema.Types.ObjectId], required: true, ref: 'Category' },
    totalView: { type: [Schema.Types.ObjectId], ref: 'User' },
    totalReaction: { type: [Schema.Types.ObjectId], ref: 'User' },
    like: { type: Number },
    dislike: { type: Number }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Idea', IdeaSchema);

import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    anonymousMode: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    idea: { type: Schema.Types.ObjectId, required: true, ref: 'Idea'},
    replier: { type: [Schema.Types.ObjectId], ref: 'Comment' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Comment', CommentSchema);

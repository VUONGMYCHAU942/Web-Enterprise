import { Schema, model } from 'mongoose';

const SubmissionSchema = new Schema(
  {
    name: { type: String, maxlength: 50, required: true },
    description: { type: String, maxlength: 500, required: true },
    closureDate: { type: Date, required: true },
    finalClosureDate: { type: Date, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Submission', SubmissionSchema);

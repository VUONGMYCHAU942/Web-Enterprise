import { Schema, model } from 'mongoose';

const MediaSchema = new Schema(
  {
    upload: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          idea: { type: Schema.Types.ObjectId, ref: 'Idea' },
          fileDriveId: { type: String, maxlength: 50, unique: true, required: true },
          fileDrivePath: { type: String, maxlength: 100, required: true }
        }
      ]
    },
    folderDriveId: { type: String, maxlength: 50, unique: true, required: true },
    folderDrivePath: { type: String, maxlength: 100, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Media', MediaSchema);

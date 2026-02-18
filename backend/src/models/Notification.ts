import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Schema.Types.ObjectId;
  title: string;
  message: string;
  read: boolean;
  type: string;
}

const NotificationSchema: Schema = new Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Null for broadcast
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { type: String, default: 'info' }
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);
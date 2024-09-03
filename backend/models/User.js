import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'student'], required: true },
    
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: function () {
          return this.role === 'student';
        },
      },
    ],
  });

export const User = mongoose.model('Users',UserSchema)



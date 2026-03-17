import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImage: { type: String, default: '' },
    coverPhoto: { type: String, default: '' },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    bloodGroup: { type: String },

    // Academic Info
    batch: { type: Number },
    department: { type: String },
    rollNumber: { type: String },
    regNumber: { type: String },
    gpa: { type: Number },

    // Contact Info
    phone: { type: String },
    whatsapp: { type: String },
    facebook: { type: String },
    linkedin: { type: String },

    // Location
    currentCity: { type: String },
    currentDistrict: { type: String },
    currentCountry: { type: String, default: 'Bangladesh' },
    livingAbroad: { type: Boolean, default: false },

    // Professional Info
    jobTitle: { type: String },
    company: { type: String },
    industry: { type: String },
    employmentType: {
      type: String,
      enum: ['job', 'business', 'freelancer', 'student', 'unemployed'],
    },
    lookingForJob: { type: Boolean, default: false },

    // Education
    university: { type: String },
    degree: { type: String },
    eduDepartment: { type: String },
    currentlyStudying: { type: Boolean, default: false },

    // Skills & Bio
    skills: [{ type: String }],
    languages: [{ type: String }],
    bio: { type: String, maxlength: 300 },
    achievements: { type: String },

    // Mentorship
    availableForMentorship: { type: Boolean, default: false },
    mentorshipAreas: [{ type: String }],

    // Privacy Settings
    privacy: {
      phone: { type: String, default: 'members' },
      email: { type: String, default: 'members' },
      profile: { type: String, default: 'everyone' },
      showInDirectory: { type: Boolean, default: true },
      showBloodGroup: { type: Boolean, default: true },
    },

    // System Fields
    memberId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'active', 'banned'],
      default: 'pending',
    },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['alumni', 'moderator', 'admin', 'super_admin'],
      default: 'alumni',
    },
    profileCompletion: { type: Number, default: 0 },
    lastActive: { type: Date },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
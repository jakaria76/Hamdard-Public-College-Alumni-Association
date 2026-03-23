import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    // ── BASIC ──
    fullName: { type: String, trim: true },
    fullNameBn: { type: String, trim: true },
    memberType: {
      type: String,
      enum: ['general', 'life', 'honorary'],
      default: 'general',
    },
    committeePosition: { type: String, trim: true },
    memberSince: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date },

    // ── CONTACT ──
    alternativeMobile: { type: String, trim: true },
    presentAddress: { type: String, trim: true },
    permanentAddress: { type: String, trim: true },
    district: { type: String, trim: true },
    upazila: { type: String, trim: true },
    facebookLink: { type: String, trim: true },
    whatsAppNumber: { type: String, trim: true },

    // ── BLOOD ──
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    lastDonationDate: { type: Date },
    nextAvailableDonationDate: { type: Date },
    donationEligibility: {
      type: String,
      enum: ['eligible', 'not_eligible', 'unknown'],
      default: 'unknown',
    },
    totalDonationCount: { type: Number, default: 0 },
    preferredDonationLocation: { type: String, trim: true },

    // ── EDUCATION ──
    schoolName: { type: String, trim: true },
    schoolGroup: { type: String, trim: true },
    schoolPassingYear: { type: Number },
    collegeName: { type: String, trim: true },
    collegeGroup: {
      type: String,
      enum: ['science', 'arts', 'commerce'],
    },
    collegePassingYear: { type: Number },
    universityName: { type: String, trim: true },
    department: { type: String, trim: true },
    studentId: { type: String, trim: true },
    currentYear: { type: Number },
    currentSemester: { type: Number },

    // ── BIO ──
    shortBio: { type: String, trim: true, maxlength: 500 },
    whyJoined: { type: String, trim: true },
    futureGoals: { type: String, trim: true },
    hobbies: { type: String, trim: true },

    // ── SOCIAL ──
    facebook: { type: String, trim: true },
    portfolioWebsite: { type: String, trim: true },

    // ── IMAGE ──
    profileImagePath: { type: String, default: '' },

    // ── LOCATION ──
    latitude: { type: Number },
    longitude: { type: Number },
    locationDms: { type: String, trim: true },
  },
  { timestamps: true }
)

// Model cache — hot reload এ duplicate model error ঠেকাবে
let Profile

try {
  Profile = mongoose.model('Profile')
} catch {
  Profile = mongoose.model('Profile', ProfileSchema)
}

export default Profile
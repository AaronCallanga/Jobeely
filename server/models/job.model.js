// src/models/savedJob.model.js

import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes you have a 'User' model
      required: [true, "A saved job must belong to a user."],
      index: true, // Indexing for quick lookups by user
    },

    // @field externalId: Stores the original unique ID from the JSearch API.
    externalId: {
      type: String,
      required: [true, "A job must have an external ID."],
    },

    title: {
      type: String,
      required: [true, "Job title is required."],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },

    company: {
      type: String,
      required: [true, "Company name is required."],
      trim: true,
    },

    location: {
      type: String,
      default: "Remote/TBD",
    },

    employmentType: {
      type: String,
      enum: ["FULLTIME", "PARTTIME", "CONTRACTOR", "INTERNSHIP", "N/A"],
      default: "N/A",
    },

    // --- Links and Metadata ---
    applyUrl: {
      type: String,
      required: [true, "The job application URL is required."],
    },

    logo: {
      type: String,
      default: null,
    },

    // --- Optional Detail Fields ---
    isRemote: {
      type: Boolean,
      default: false,
    },

    posted: {
      type: String, // Storing human-readable string like "1 day ago"
    },

    minExperience: {
      type: Number, // Stored in months, or null
      default: null,
    },

    salaryRange: {
      type: String,
      default: null,
    },

    // Storing the saving date
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Enable virtual properties if needed later
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// --- Compound Index for Uniqueness ---
// Ensures that a single user can only save a specific externalId once.
jobsSchema.index({ user: 1, externalId: 1 }, { unique: true });

const Job = mongoose.model("Job", jobsSchema);

export default Job;

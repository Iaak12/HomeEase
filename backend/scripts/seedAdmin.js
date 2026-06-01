/**
 * Seed Admin Script
 * Run: node scripts/seedAdmin.js
 *
 * Creates the first admin account using credentials from .env
 * Safe to run multiple times — won't create duplicates.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const dns = require('dns');
const mongoose = require('mongoose');
const User = require('../models/User');

// Force Google DNS to bypass local ISP blocking of MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@homeease.com';
    const existing = await User.findOne({ email });

    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save({ validateBeforeSave: false });
        console.log(`⚡ Existing user promoted to admin: ${email}`);
      } else {
        console.log(`ℹ️  Admin already exists: ${email}`);
      }
    } else {
      await User.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email,
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        role: 'admin',
        isVerified: true,
        isActive: true,
      });
      console.log(`🎉 Admin created successfully!`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);
    }

    await mongoose.disconnect();
    console.log('✅ Done. You can now log in as admin.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();

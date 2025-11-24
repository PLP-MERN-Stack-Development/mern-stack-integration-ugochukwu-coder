import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true });

const postSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true 
  },
  excerpt: {
    type: String,
    maxlength: 200
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  featuredImage: String,
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [commentSchema]
}, { 
  timestamps: true 
});

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (this.title && this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

export default mongoose.model('Post', postSchema);
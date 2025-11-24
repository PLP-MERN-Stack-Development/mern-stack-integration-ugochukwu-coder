import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  description: String,
  color: {
    type: String,
    default: '#6B7280'
  },
  postCount: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// Update post count when posts are added/removed
categorySchema.statics.updatePostCount = async function(categoryId) {
  const Post = mongoose.model('Post');
  const count = await Post.countDocuments({ category: categoryId });
  await this.findByIdAndUpdate(categoryId, { postCount: count });
};

export default mongoose.model('Category', categorySchema);
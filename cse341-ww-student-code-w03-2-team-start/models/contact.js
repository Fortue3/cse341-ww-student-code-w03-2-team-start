module.exports = (mongoose) => {
  const Contact = mongoose.model(
    'contacts',
    mongoose.Schema({
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: 5
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: 5
      },
      favoriteColor: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      },
      birthday: {
        type: Date,
        required: true
      }
    })
  );

  return Contact;
};

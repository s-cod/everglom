const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      createData: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      body: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      createData: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createData: {
    type: Date,
    default: Date.now,
  },
})

const populationFields = 'user comments.user'

postSchema.post('save', async (doc) => {
  await doc.populate(populationFields)
})

function populateFields() {
  this.populate(populationFields)
}

postSchema.pre('find', populateFields)
postSchema.pre('findOne', populateFields)
postSchema.pre('findOneAndUpdate', populateFields)

module.exports = model('posts', postSchema)

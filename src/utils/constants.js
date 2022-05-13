// Environment
const TEST = 'test'

// mongoose
const CONNECTION = Object.freeze({
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
})

// validation messages
const VALIDATION_MESSAGES = Object.freeze({
  NONE_ID: 'You must provide ID',
  SERVICE_NOT_FOUND: 'Service not found',
  INVALID_DATA: 'Invalid data provided',
  TITLE_REQUIRED: 'Title is required',
  DESCRIPTION_REQUIRED: 'Description is required',
  CONTENT_REQUIRED: 'Content is required',
  AUTHOR_REQUIRED: 'Author is required',
  NEWS_NOT_FOUND: 'News not found',
  NEWS_REQUIRED: 'News is required',
  STANDARD_ERROR: 'Something went wrong',
  NEWS_ALREADY_ARCHIVED: 'News already archived'
})

module.exports = {
  TEST,
  CONNECTION,
  VALIDATION_MESSAGES
}

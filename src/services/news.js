const newsRespository = require('../repositories/news')
const HttpError = require('../utils/httpError')
const { VALIDATION_MESSAGES } = require('../utils/constants')

exports.getAllNews = async () => await newsRespository.findAllNews()

exports.getAllNewsNotArchived = async () => await newsRespository.findNewsNotArchived()

exports.getAllArchivedNews = async () => await newsRespository.findAllArchivedNews()

exports.addNewNews = async (news, image) => {
  const validationErrors = {
    title: VALIDATION_MESSAGES.TITLE_REQUIRED,
    description: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
    content: VALIDATION_MESSAGES.CONTENT_REQUIRED,
    author: VALIDATION_MESSAGES.AUTHOR_REQUIRED
  }

  Object.keys(validationErrors).forEach(key => {
    if (!news[key]) {
      throw new HttpError(400, validationErrors[key])
    }
  })

  const newsData = { ...news }

  if (image) {
    newsData.image = `${process.env.APP_URL}/uploads/${image.filename}`
  }

  return await newsRespository.createNewNews(newsData)
}

exports.findNewsById = async (id) => {
  const news = await newsRespository.findNewsById(id)

  if (!news) throw new HttpError(404, VALIDATION_MESSAGES.NEWS_NOT_FOUND)

  return await newsRespository.findNewsById(id)
}

exports.archiveNews = async (id) => {
  const news = await newsRespository.findNewsById(id)

  if (!news) throw new HttpError(404, VALIDATION_MESSAGES.NEWS_NOT_FOUND)

  if (news.archiveDate) throw new HttpError(405, VALIDATION_MESSAGES.NEWS_ALREADY_ARCHIVED)

  return await newsRespository.archiveNews(news)
}

exports.updateNews = async (id, news) => {
  if (!news) throw new HttpError(400, VALIDATION_MESSAGES.NEWS_REQUIRED)
  return await newsRespository.updateNews(id, news)
}

exports.removeNews = async (id) => {
  const news = await newsRespository.findNewsById(id)

  if (!news) throw new HttpError(404, VALIDATION_MESSAGES.NEWS_NOT_FOUND)

  return await newsRespository.deleteNews(id)
}

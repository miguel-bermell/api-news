const newsService = require('../services/news')
const { success } = require('../utils/apiResponse')

exports.AllNews = async (req, res, next) => {
  try {
    const results = await newsService.getAllNews()
    res.status(200).json(success('All news loaded successfully', results, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.NewsNotArchived = async (req, res, next) => {
  try {
    const results = await newsService.getAllNewsNotArchived()
    res.status(200).json(success('All news not archived loaded successfully', results, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.AllArchivedNews = async (req, res, next) => {
  try {
    const results = await newsService.getAllArchivedNews()
    res.status(200).json(success('All archived news loaded successfully', results, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.FindNewsById = async (req, res, next) => {
  try {
    const { id } = req.params
    const news = await newsService.findNewsById(id)
    res.status(200).json(success('News loaded successfully', news, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.AddNews = async (req, res, next) => {
  try {
    const news = req.body
    const image = req.file ?? null
    const createNews = await newsService.addNewNews(news, image)
    res.status(200).json(success('News added successfully', createNews, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.ArchiveNews = async (req, res, next) => {
  try {
    const { id } = req.params
    const news = await newsService.archiveNews(id)
    res.status(200).json(success('News archived successfully', news, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.UpdateNews = async (req, res, next) => {
  try {
    const { id } = req.params
    const news = req.body
    const updateNews = await newsService.updateNews(id, news)
    res.status(200).json(success('News updated successfully', updateNews, res.statusCode))
  } catch (error) {
    next(error)
  }
}

exports.DeleteNews = async (req, res, next) => {
  try {
    const { id } = req.params
    await newsService.removeNews(id)
    res.status(200).json(success('News deleted successfully', null, res.statusCode)).end()
  } catch (error) {
    next(error)
  }
}

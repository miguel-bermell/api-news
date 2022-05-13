const News = require('../models/News')

exports.findAllNews = async () => await News.find({ }).sort({ date: -1 })

exports.findNewsNotArchived = async () => await News.find({ archiveDate: { $eq: null } }).sort({ date: -1 })

exports.findNewsById = async (id) => await News.findById(id)

exports.findAllArchivedNews = async () => await News.find({ archiveDate: { $ne: null } }).sort({ archiveDate: -1 })

exports.createNewNews = async (news) => {
  const newNews = new News({
    author: news.author,
    title: news.title,
    description: news.description,
    content: news.content,
    image: news.image
  })

  return await newNews.save()
}

exports.archiveNews = async (news) => {
  news.archiveDate = new Date()
  return await news.save()
}

exports.updateNews = async (id, news) => {
  const newNewsEdited = {
    title: news.title,
    description: news.description,
    author: news.author,
    content: news.content,
    image: news.image
  }

  return await News.findByIdAndUpdate(id, newNewsEdited, { new: true })
}

exports.deleteNews = async (id) => await News.findByIdAndDelete(id)

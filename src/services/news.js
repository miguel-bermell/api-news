const { existsSync, unlinkSync } = require('fs');
const path = require('path');
const newsRespository = require('../repositories/news');
const HttpError = require('../utils/httpError');
const { VALIDATION_MESSAGES } = require('../utils/constants');
const User = require('../models/User');

exports.getAllNews = async (newsType = null) => {
  if (!newsType) return await newsRespository.findAllNews();

  const types = {
    archived: newsRespository.findAllArchivedNews,
    notArchived: newsRespository.findNewsNotArchived,
  };

  return await types[newsType]();
};

exports.addNewNews = async (news, image) => {
  const validationErrors = {
    title: VALIDATION_MESSAGES.TITLE_REQUIRED,
    description: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
    content: VALIDATION_MESSAGES.CONTENT_REQUIRED,
    author: VALIDATION_MESSAGES.AUTHOR_REQUIRED,
  };

  Object.keys(validationErrors).forEach((key) => {
    if (!news[key]) {
      throw new HttpError(400, validationErrors[key]);
    }
  });

  const user = await User.findById(news.userId);
  if (!user) throw new HttpError(404, VALIDATION_MESSAGES.USER_INVALID_ID);
  const { _id } = user;
  const newsData = { ...news, user: _id };

  if (image) {
    newsData.image = `${process.env.API_URL}/uploads/${image.filename}`;
  }

  const savedNews = await newsRespository.createNewNews(newsData);
  const { _id: newsId } = savedNews;
  user.news = user.news.concat(newsId);

  await user.save();
  return savedNews;
};

exports.findNewsById = async (id) => {
  const news = await newsRespository.findNewsById(id);

  if (!news) throw new HttpError(404, VALIDATION_MESSAGES.NEWS_NOT_FOUND);

  return await newsRespository.findNewsById(id);
};

exports.archiveNews = async (id) => {
  const news = await newsRespository.findNewsById(id);

  if (!news) throw new HttpError(404, VALIDATION_MESSAGES.NEWS_NOT_FOUND);

  if (news.archiveDate) throw new HttpError(405, VALIDATION_MESSAGES.NEWS_ALREADY_ARCHIVED);

  return await newsRespository.archiveNews(news);
};

exports.updateNews = async (id, news) => {
  if (!news) throw new HttpError(400, VALIDATION_MESSAGES.NEWS_REQUIRED);
  return await newsRespository.updateNews(id, news);
};

exports.removeNews = async (id) => {
  const news = await newsRespository.findNewsById(id);

  if (!news) throw new HttpError(404, VALIDATION_MESSAGES.NEWS_NOT_FOUND);

  if (news.image) {
    const [, imagePath] = news.image.split('/uploads/');
    const removeImagePath = imagePath && path.join(__dirname, '../public/uploads/', imagePath);

    if (existsSync(removeImagePath)) {
      unlinkSync(removeImagePath);
    }
  }

  return await newsRespository.deleteNews(id);
};

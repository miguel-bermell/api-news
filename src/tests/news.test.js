const mongoose = require('mongoose');
const { server } = require('../index');
const News = require('../models/News');
const User = require('../models/User');
const {
  api, initialNews, getAllNews, createUser,
} = require('./helpers');

let userId;

beforeAll(async () => {
  await User.deleteMany({});
  const { data: { id } } = await createUser();
  userId = id;
});
beforeEach(async () => {
  await News.deleteMany({});
  const newNews = initialNews.map((news) => new News({ ...news, user: userId }));
  const saveNews = newNews.map((news) => news.save());
  await Promise.all(saveNews);
});
describe('Get all news', () => {
  test('news are returned as json', async () => {
    await api
      .get('/news')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test(`there are ${initialNews.length} news`, async () => {
    const response = await api.get('/news');

    expect(response.body.data).toHaveLength(initialNews.length);
  });

  test('the first news is about "NASA"', async () => {
    const { title } = await getAllNews();

    expect(title).toContain('NASA');
  });

  test('response all news with status 200', async () => {
    const { response } = await getAllNews();

    expect(response.status).toBe(200);
  });
});

describe('Create news', () => {
  test('is possible with a valid news', async () => {
    const newNews = {
      title: 'News 2',
      description: 'Description 2',
      content: 'Content 2',
      author: 'Author 2',
      userId,
    };
    await api
      .post('/news')
      .send(newNews)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { response, title } = await getAllNews();

    expect(response.body.data).toHaveLength(initialNews.length + 1);
    expect(title).toContain(newNews.title);
  });

  test('is not possible with an invalid news', async () => {
    const newNews = {
      title: '',
      description: '',
      content: '',
      userId,
    };

    await api
      .post('/news')
      .send(newNews)
      .expect(422)
      .expect('Content-Type', /application\/json/);

    const { response } = await getAllNews();

    expect(response.body.data).toHaveLength(initialNews.length);
  });
});

describe('delete news', () => {
  test('is possible with a valid news id', async () => {
    const data = await getAllNews();
    const { id } = data.response.body.data[0];
    await api
      .delete(`/news/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { response } = await getAllNews();

    expect(response.body.data).toHaveLength(initialNews.length - 1);
  });

  test('is not possible with an invalid news id', async () => {
    await api
      .delete('/news/123')
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const { response } = await getAllNews();

    expect(response.body.data).toHaveLength(initialNews.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

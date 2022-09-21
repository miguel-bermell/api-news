const { FindNewsById } = require('../controllers/news');
const { findNewsById: mockFindNewsById } = require('../services/news');
const HttpError = require('../utils/httpError');
const mockLogger = require('../utils/logger');

jest.mock('../services/news');

const middleware = {
  mockRequest: () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  },

  mockResponse: () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  },
  mockNext: () => jest.fn((error) => error),
};

const fakeNews = [
  {
    _id: '1',
    title: 'Test',
    description: 'desc test',
  },
];

const expectedResponse = ({
  success, msg, data, status,
}) => ({
  success: success ?? true,
  message: msg ?? 'News loaded successfully',
  data,
  status: status ?? 200,
});

const newsServiceStub = async (id) => {
  // eslint-disable-next-line no-underscore-dangle
  const findNews = fakeNews.find((news) => news._id === id);
  if (!findNews) throw new HttpError(404, 'News not found');
  return findNews;
};

mockFindNewsById.mockImplementation(newsServiceStub);

describe('News controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info = jest.fn();
  });

  test('findNewsById is possible with a valid id', async () => {
    const req = middleware.mockRequest();
    req.params.id = '1';
    const res = middleware.mockResponse();
    const next = middleware.mockNext();
    await FindNewsById(req, res, next);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0]).toBeInstanceOf(Object);
    expect(res.json).toHaveBeenCalledWith({
      ...expectedResponse({ data: fakeNews[0] }),
    });
    const logger = jest.spyOn(mockLogger, 'info');
    expect(logger).toBeCalledWith('success');
  });

  test('findNewsById is not possible with an invalid id', async () => {
    const req = middleware.mockRequest();
    req.params.id = null;
    const res = middleware.mockResponse();
    const next = middleware.mockNext();
    await FindNewsById(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenLastCalledWith(new Error('News not found'));
    expect(next.mock.calls[0][0].statusCode).toBe(404);
  });
});

const request = require('supertest');
const { app } = require('../app');
const Bookmarks = require('../models/bookmarks');
const Resource = require('../models/resource');

describe('Bookmarks Controller', () => {
  const userID = 'user123';
  const resourceID = 'resource123';

  afterEach(async () => {
    await Bookmarks.deleteMany({});
    await Resource.deleteMany({});
  });

  describe('POST /bookmark', () => {
    test('should bookmark a resource for a user', async () => {
      const resource = await Resource.create({ _id: resourceID });

      const response = await request(app)
        .post('/bookmark')
        .send({ userID, resourceID })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Resource bookmarked successfully.');

      const userBookmarks = await Bookmarks.findOne({ userID });
      expect(userBookmarks).toBeTruthy();
      expect(userBookmarks.bookmarks).toContain(resourceID);
    });
  });

  describe('GET /bookmarks/:userID', () => {
    test('should get all bookmarks for a user', async () => {
      await Bookmarks.create({ userID, bookmarks: [resourceID] });
      await Resource.create({ _id: resourceID, title: 'Test Resource' });

      const response = await request(app)
        .get(`/bookmarks/${userID}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.bookmarks).toHaveLength(1);
      expect(response.body.bookmarks[0]._id).toBe(resourceID);
      expect(response.body.bookmarks[0].title).toBe('Test Resource');
    });

    test('should handle case when bookmarks not found for user', async () => {
      const response = await request(app)
        .get(`/bookmarks/${userID}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Bookmarks not found for the user.');
    });
  });
});

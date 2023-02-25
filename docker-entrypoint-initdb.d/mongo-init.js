print('Start creating database ##########################');
db = db.getSiblingDB('miguel_db_test');
db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [{ role: 'readWrite', db: 'miguel_db_test' }],
  },
);

db = db.getSiblingDB('miguel_db');
db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [{ role: 'readWrite', db: 'miguel_db' }],
  },
);
print('End creating database ##########################');

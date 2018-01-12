const db = require('../server/db')
const {User, Book, Review, Order, BookOrder} = require('../server/db/models')

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Order);
Order.belongsTo(User);

Book.belongsToMany(Order, {through: BookOrder});
Order.belongsToMany(Book, {through: BookOrder});

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Abby',
      lastName: 'Alleyoop',
      photoUrl: '/images/woman1.jpg',
      email: 'abby@abby.com',
      address: '1 Main Street, NYC, NY 10001',
      password: 'abby',
      isAdmin: false
    }),
    User.create({
      firstName: 'Betty',
      lastName: 'Bananas',
      photoUrl: '/images/woman2.jpg',
      email: 'betty@betty.com',
      address: '2 Main Street, NYC, NY 10001',
      password: 'betty',
      isAdmin: true
    }),
    User.create({
      firstName: 'Cat',
      lastName: 'Catliano',
      photoUrl: '/images/woman3.jpg',
      email: 'cat@cat.com',
      address: '3 Main Street, NYC, NY 10001',
      password: 'cat',
      isAdmin: false
    }),
    User.create({
      firstName: 'Edward',
      lastName: 'Enigma',
      photoUrl: '/images/man1.jpg',
      email: 'edward@edward.com',
      address: '4 Main Street, NYC, NY 10001',
      password: 'edward',
      isAdmin: false
    }),
    User.create({
      firstName: 'Francis',
      lastName: 'Falafel',
      photoUrl: '/images/man2.jpg',
      email: 'francis@francis.com',
      address: '5 Main Street, NYC, NY 10001',
      password: 'francis',
      isAdmin: true
    }),
    User.create({
      firstName: 'Gadiel',
      lastName: 'Gammon',
      photoUrl: '/images/man3.jpg',
      email: 'gadiel@gadiel.com',
      address: '6 Main Street, NYC, NY 10001',
      password: 'gadiel',
      isAdmin: false
    }),
    User.create({
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@test.com',
      address: '7 Main Street, NYC, NY 10001',
      password: 'test',
      isAdmin: true
    })])

  const books = await Promise.all([
    Book.create({
      title: 'Bossypants',
      photoUrl: '/images/bossypants.jpg',
      sku: '4321',
      genre: 'biography',
      author: 'Tina Fey',
      inventory: 6,
      price: 1200,
      description: 'In this hilarious book, Tina Fey reccounts her adventures from Chicago to SNL and beyond, full of wit, wisdom and how she came to "have it all"!  Liz Lemon rocks.'
    }),
    Book.create({
      title: 'Fantastic Beasts and Where to Find Them',
      photoUrl: '/images/fantastic-beasts.jpg',
      sku: '4322',
      genre: 'fiction',
      author: 'JK Rowling',
      inventory: 12,
      price: 1700,
      description: 'Hogwarts comes to America.  JK Rowling does it again with a menagerie of new magical creatures!  Recently adapted into a movie feature Eddie Redmayne and Colin Farrell!  Really recommended book!'
    }),
    Book.create({
      title: 'Harry Potter and the Sorcerer\'s Stone',
      photoUrl: '/images/harry-potter.jpg',
      sku: '4323',
      genre: 'fiction',
      author: 'JK Rowling',
      inventory: 2,
      price: 5500,
      description: 'The book that started it all.  Harry Potter started here, the boy wonder with a lighning bolt on his head.  Get it now, running out!'
    }),
    Book.create({
      title: 'Little Fires Everywhere',
      photoUrl: '/images/little-fires-everywhere.jpg',
      sku: '4324',
      genre: 'fiction',
      author: 'Celeste Ng',
      inventory: 78,
      price: 800,
      description: 'It is a good boook!'
    }),
    Book.create({
      title: 'Savage Wolverine:  Vol. 3',
      photoUrl: '/images/savage-wolverine-vol-3.jpg',
      sku: '4325',
      genre: 'graphic novel',
      author: 'Someone Someone',
      inventory: 1,
      price: 3500,
      description: 'X-men are cool.  Wolverine is even cooler.  End of story.'
    }),
    Book.create({
      title: 'The \'27 Yankees',
      photoUrl: '/images/the-27-yankees.jpg',
      sku: '4326',
      genre: 'sports',
      author: 'Exel Gleckstein',
      inventory: 16,
      price: 1900,
      description: 'Something about sports and baseball?  I think Ari will like it.'
    }),
    Book.create({
      title: 'The Paris Opera Ballet',
      photoUrl: '/images/the-paris-opera-ballet.jpg',
      sku: '4327',
      genre: 'dance',
      author: 'Amy Grant',
      inventory: 4,
      price: 2400,
      description: 'Kevin likes the Paris Opera Ballet, especially the etoile star ballerina Sylvie Guillem.'
    }),
    Book.create({
      title: 'The Road',
      photoUrl: '/images/the-road.jpg',
      sku: '4328',
      genre: 'fiction',
      author: 'Cormac McCarthy',
      inventory: 6,
      price: 700,
      description: 'Dystopian novel, got made into a movie.  Keep the hero alive.'
    }),
    Book.create({
      title: 'To Kill A Mockingbird',
      photoUrl: '/images/to-kill-a-mockingbird.jpg',
      sku: '4329',
      genre: 'fiction',
      author: 'Harper Lee',
      inventory: 46,
      price: 500,
      description: 'ON SALE!  Just $5!  One of the best books ever written, a timeless American classic.'
    }),
    Book.create({
      title: 'Tester Book for Default Image',
      sku: '4330',
      genre: 'biography',
      author: 'Han Hung',
      inventory: 68,
      price: 1300,
      description: 'This is a test.'
    })])

  const reviewArr = [];
  for (let i = 0; i < 20; i++) {
    let randomRating = () => Math.floor((Math.random() * 5) + 1);
    let randomBookId = () => Math.floor((Math.random() * books.length) + 1);
    let randomUserId = () => Math.floor((Math.random() * users.length) + 1);
    reviewArr[i] = Review.create({
      title: 'Sample review title!',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: randomRating(),
      userId: randomUserId(),
      bookId: randomBookId()
    });
  }
  const reviews = await Promise.all(reviewArr);

  const orderArr = [];
  for (let i = 0; i < 8; i++) {
    let randomUserId = () => Math.floor((Math.random() * users.length) + 1);
    let randomSid = () => Math.floor(Math.random() * 1E16).toString();
    orderArr[i] = Order.create({
      sid: randomSid(),
      orderStatus: 'pending',
      userId: randomUserId(),
    });
  }
  const orders = await Promise.all(orderArr);

  const bookOrderArr = [];
  for (let i = 0; i < 12; i++) {
    let randomBookId = () => Math.floor((Math.random() * books.length) + 1);
    let randomOrderId = () => Math.floor((Math.random() * orders.length) + 1);
    let randomQuantity = () => Math.floor((Math.random() * 4) + 1);
    bookOrderArr[i] = BookOrder.create({
      bookId: randomBookId(),
      orderId: randomOrderId(),
      quantity: randomQuantity()
    });
  }
  const bookOrders = await Promise.all(bookOrderArr);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${books.length} books`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${bookOrders.length} bookOrders`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')

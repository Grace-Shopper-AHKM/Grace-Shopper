const db = require('../server/db')
const {User, Book, Review, Order, BookOrder} = require('../server/db/models')

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

Order.belongsTo(User);
User.hasMany(Order);

Book.belongsToMany(Order, {through: BookOrder});
Order.belongsToMany(Book, {through: BookOrder});

function seed () {

  const users = [
    {
      name: 'Abby Alleyoop',
      photoUrl: '/images/woman1.jpg',
      email: 'abby@abby.com',
      password: 'abby',
      isAdmin: false
    },
    {
      name: 'Betty Bananas',
      photoUrl: '/images/woman2.jpg',
      email: 'betty@betty.com',
      password: 'betty',
      isAdmin: true
    },
    {
      name: 'Cat Catliano',
      photoUrl: '/images/woman3.jpg',
      email: 'cat@cat.com',
      password: 'cat',
      isAdmin: false
    },
    {
      name: 'Edward Enigma',
      photoUrl: '/images/man1.jpg',
      email: 'edward@edward.com',
      password: 'edward',
      isAdmin: false
    },
    {
      name: 'Francis Falafel',
      photoUrl: '/images/man2.jpg',
      email: 'francis@francis.com',
      password: 'francis',
      isAdmin: true
    },
    {
      name: 'Gadiel Gammon',
      photoUrl: '/images/man3.jpg',
      email: 'gadiel@gadiel.com',
      password: 'gadiel',
      isAdmin: false
    },
    {
      name: 'Test Testerson',
      email: 'test@test.com',
      password: 'test',
      isAdmin: true
    }]

  const books = [
    {
      title: 'Bossypants',
      photoUrl: '/images/bossypants.jpg',
      sku: '4321',
      genre: 'biography',
      author: 'Tina Fey',
      inventory: 6,
      price: 1200,
      description: 'In this hilarious book, Tina Fey reccounts her adventures from Chicago to SNL and beyond, full of wit, wisdom and how she came to "have it all"!  Liz Lemon rocks.'
    },
    {
      title: 'Fantastic Beasts and Where to Find Them',
      photoUrl: '/images/fantastic-beasts.jpg',
      sku: '4322',
      genre: 'fiction',
      author: 'JK Rowling',
      inventory: 12,
      price: 1700,
      description: 'Hogwarts comes to America.  JK Rowling does it again with a menagerie of new magical creatures!  Recently adapted into a movie feature Eddie Redmayne and Colin Farrell!  Really recommended book!'
    },
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      photoUrl: '/images/harry-potter.jpg',
      sku: '4323',
      genre: 'fiction',
      author: 'JK Rowling',
      inventory: 2,
      price: 5500,
      description: 'The book that started it all.  Harry Potter started here, the boy wonder with a lighning bolt on his head.  Get it now, running out!'
    },
    {
      title: 'Little Fires Everywhere',
      photoUrl: '/images/little-fires-everywhere.jpg',
      sku: '4324',
      genre: 'fiction',
      author: 'Celeste Ng',
      inventory: 78,
      price: 800,
      description: 'It is a good boook!'
    },
    {
      title: 'Savage Wolverine:  Vol. 3',
      photoUrl: '/images/savage-wolverine-vol-3.jpg',
      sku: '4325',
      genre: 'graphic novel',
      author: 'Someone Someone',
      inventory: 1,
      price: 3500,
      description: 'X-men are cool.  Wolverine is even cooler.  End of story.'
    },
    {
      title: 'The \'27 Yankees',
      photoUrl: '/images/the-27-yankees.jpg',
      sku: '4326',
      genre: 'sports',
      author: 'Exel Gleckstein',
      inventory: 16,
      price: 1900,
      description: 'Something about sports and baseball?  I think Ari will like it.'
    },
    {
      title: 'The Paris Opera Ballet',
      photoUrl: '/images/the-paris-opera-ballet.jpg',
      sku: '4327',
      genre: 'dance',
      author: 'Amy Grant',
      inventory: 4,
      price: 2400,
      description: 'Kevin likes the Paris Opera Ballet, especially the etoile star ballerina Sylvie Guillem.'
    },
    {
      title: 'The Road',
      photoUrl: '/images/the-road.jpg',
      sku: '4328',
      genre: 'fiction',
      author: 'Cormac McCarthy',
      inventory: 6,
      price: 700,
      description: 'Dystopian novel, got made into a movie.  Keep the hero alive.'
    },
    {
      title: 'To Kill A Mockingbird',
      photoUrl: '/images/to-kill-a-mockingbird.jpg',
      sku: '4329',
      genre: 'fiction',
      author: 'Harper Lee',
      inventory: 46,
      price: 500,
      description: 'ON SALE!  Just $5!  One of the best books ever written, a timeless American classic.'
    },
    {
      title: 'Tester Book for Default Image',
      sku: '4330',
      genre: 'biography',
      author: 'Han Hung',
      inventory: 68,
      price: 1300,
      description: 'This is a test.'
    }]

  const reviewArr = [];
  for (let i = 0; i < 20; i++) {
    let randomRating = () => Math.floor((Math.random() * 5) + 1);
    let randomBookId = () => Math.floor((Math.random() * books.length) + 1);
    let randomUserId = () => Math.floor((Math.random() * users.length) + 1);
    reviewArr[i] = {
      title: 'Sample review title!',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: randomRating(),
      userId: randomUserId(),
      bookId: randomBookId()
    };
  }

  return Promise.all(users.map(user => User.create(user)))
  .then(() => {
    console.log('users seeded')
    return Promise.all(books.map(book => Book.create(book)))
  })
  .then(() => {
    console.log('books seeded')
    console.log('reviews seeded')
    return Promise.all(reviewArr.map(review => Review.create(review)))
  })
}

// TEST to create ONE order:
function ordersSeed () {
  return Order.create({
    orderStatus: 'pending',
    sid: 12345,
    userId: 7,
    orderAddress: '1 Main Street, NYC, NY 10001',
    orderEmail: 'kevin@kevin.com',
    orderRecipient: 'Kevin Ho'
  })
  .then((createdOrder) => {
    console.log('test order seeded')
    console.log('test bookOrder seeded')
    return BookOrder.create({
      bookId: 1,
      quantity: 4,
      userId: 7,
      orderId: createdOrder.id
    })
  })
}

// TEST to find ORDER TOTAL virtual:
function test () {
  return Order.findById(1)
  .then(foundOrder => {
    return foundOrder.getOrderTotal
    .then(total => {
      console.log(`The getOrderTotal VIRTUAL of ${total} works!`);
    })
  })
}

const main = () => {
  console.log('Syncing db...');
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .then(() => {
      console.log('Seeding orders...');
      return ordersSeed();
    })
    .then(() => {
      console.log('Running getOrderTotal test...');
      return test();
    })
    .catch(err => {
      console.log('Error while seeding.');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Book, Review, Order} = require('../server/db/models')

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Book);
Book.belongsTo(Order);
Order.belongsTo(Order, {as: 'parent'});

const randomRating = () => Math.floor((Math.random() * 5) + 1);
const randomBookId = () => Math.floor((Math.random() * 10) + 1);
const randomUserId = () => Math.floor((Math.random() * 7) + 1);

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      firstName: 'Abby',
      lastName: 'Alleyoop',
      photo: '/images/woman1.jpg',
      email: 'abby@abby.com',
      address: '1 Main Street, NYC, NY 10001',
      password: 'abby',
      isAdmin: false
    }),
    User.create({
      firstName: 'Betty',
      lastName: 'Bananas',
      photo: '/images/woman2.jpg',
      email: 'betty@betty.com',
      address: '2 Main Street, NYC, NY 10001',
      password: 'betty',
      isAdmin: true
    }),
    User.create({
      firstName: 'Cat',
      lastName: 'Catliano',
      photo: '/images/woman3.jpg',
      email: 'cat@cat.com',
      address: '3 Main Street, NYC, NY 10001',
      password: 'cat',
      isAdmin: false
    }),
    User.create({
      firstName: 'Edward',
      lastName: 'Enigma',
      photo: '/images/man1.jpg',
      email: 'edward@edward.com',
      address: '4 Main Street, NYC, NY 10001',
      password: 'edward',
      isAdmin: false
    }),
    User.create({
      firstName: 'Francis',
      lastName: 'Falafel',
      photo: '/images/man2.jpg',
      email: 'francis@francis.com',
      address: '5 Main Street, NYC, NY 10001',
      password: 'francis',
      isAdmin: true
    }),
    User.create({
      firstName: 'Gadiel',
      lastName: 'Gammon',
      photo: '/images/man3.jpg',
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
      photo: '/images/bossypants.jpg',
      sku: '4321',
      genre: 'biography',
      author: 'Tina Fey',
      inventory: 6,
      price: 12,
      description: 'In this hilarious book, Tina Fey reccounts her adventures from Chicago to SNL and beyond, full of wit, wisdom and how she came to "have it all"!  Liz Lemon rocks.'
    }),
    Book.create({
      title: 'Fantastic Beasts and Where to Find Them',
      photo: '/images/fantastic-beasts.jpg',
      sku: '4322',
      genre: 'fiction',
      author: 'JK Rowling',
      inventory: 12,
      price: 17,
      description: 'Hogwarts comes to America.  JK Rowling does it again with a menagerie of new magical creatures!  Recently adapted into a movie feature Eddie Redmayne and Colin Farrell!  Really recommended book!'
    }),
    Book.create({
      title: 'Harry Potter and the Sorcerer\'s Stone',
      photo: '/images/harry-potter.jpg',
      sku: '4323',
      genre: 'fiction',
      author: 'JK Rowling',
      inventory: 2,
      price: 55,
      description: 'The book that started it all.  Harry Potter started here, the boy wonder with a lighning bolt on his head.  Get it now, running out!'
    }),
    Book.create({
      title: 'Little Fires Everywhere',
      photo: '/images/little-fires-everywhere.jpg',
      sku: '4324',
      genre: 'fiction',
      author: 'Celeste Ng',
      inventory: 78,
      price: 8,
      description: 'It is a good boook!'
    }),
    Book.create({
      title: 'Savage Wolverine:  Vol. 3',
      photo: '/images/savage-wolverine-vol-3.jpg',
      sku: '4325',
      genre: 'graphic novel',
      author: 'Someone Someone',
      inventory: 1,
      price: 35,
      description: 'X-men are cool.  Wolverine is even cooler.  End of story.'
    }),
    Book.create({
      title: 'The \'27 Yankees',
      photo: '/images/the-27-yankees.jpg',
      sku: '4326',
      genre: 'non-fiction',
      author: 'Exel Gleckstein',
      inventory: 16,
      price: 19,
      description: 'Something about sports and baseball?  I think Ari will like it.'
    }),
    Book.create({
      title: 'The Paris Opera Ballet',
      photo: '/images/the-paris-opera-ballet.jpg',
      sku: '4327',
      genre: 'non-fiction',
      author: 'Amy Grant',
      inventory: 4,
      price: 24,
      description: 'Kevin likes the Paris Opera Ballet, especially the etoile star ballerina Sylvie Guillem.'
    }),
    Book.create({
      title: 'The Road',
      photo: '/images/the-road.jpg',
      sku: '4328',
      genre: 'fiction',
      author: 'Cormac McCarthy',
      inventory: 6,
      price: 7,
      description: 'Dystopian novel, got made into a movie.  Keep the hero alive.'
    }),
    Book.create({
      title: 'To Kill A Mockingbird',
      photo: '/images/to-kill-a-mockingbird.jpg',
      sku: '4329',
      genre: 'fiction',
      author: 'Harper Lee',
      inventory: 46,
      price: 5,
      description: 'ON SALE!  Just $5!  One of the best books ever written, a timeless American classic.'
    }),
    Book.create({
      title: 'Tester Book for Default Image',
      sku: '4330',
      genre: 'biography',
      author: 'Han Hung',
      inventory: 68,
      price: 13,
      description: 'This is a test.'
    })])

  const reviewArr = []
  for (let i = 0; i < 20; i++) {
    reviewArr[i] = Review.create({
      title: 'Sample review title!',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: randomRating(),
      userId: randomUserId(),
      bookId: randomBookId()
    })
  }
  const reviews = await Promise.all(
    reviewArr
  );

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${books.length} books`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
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

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')

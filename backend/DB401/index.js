require('./database-connection')

const Comment = require('./models/comment')
const Movie = require('./models/movie')
const Theater = require('./models/theater')

async function main() {
  // console.log(
  //   await Movie.find({ 'imdb.rating': { $gt: 1 } })
  //     .sort('-imdb.rating')
  //     .limit(10)
  // )

  const res = await Movie.aggregate([
    {
      $unwind: '$genres',
    },
    {
      $group: {
        _id: {
          genre: '$genres',
        },
        avg_rating: {
          $avg: '$imdb.rating',
        },
        movies: {
          $push: {
            title: '$title',
            rating: '$imdb.rating',
          },
        },
      },
    },
    {
      $sort: {
        avg_rating: -1,
      },
    },
    {
      $project: {
        _id: 0,
        genre: '$_id.genre',
        top_movies: {
          $slice: ['$movies', 3],
        },
      },
    },
    {
      $project: {
        genre: 1,
        top_movies: {
          $map: {
            input: '$top_movies',
            as: 'movie',
            in: {
              title: '$$movie.title',
              rating: '$$movie.rating',
            },
          },
        },
      },
    },
    {
      $unwind: '$top_movies',
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'top_movies.title',
        foreignField: 'title',
        as: 'movie',
      },
    },
    {
      $project: {
        genre: 1,
        title: '$top_movies.title',
        rating: '$top_movies.rating',
        _id: 0,
        movie: {
          $arrayElemAt: ['$movie', 0],
        },
      },
    },
    {
      $project: {
        genre: 1,
        title: '$movie.title',
        rating: '$rating',
      },
    },
    {
      $group: {
        _id: {
          genre: '$genre',
        },
        top_movies: {
          $push: {
            title: '$title',
            rating: '$rating',
          },
        },
      },
    },
  ])

  // Use console.dir() to see the full objects in the top_movies array
  console.dir(res, { depth: null })

  const res2 = await Movie.aggregate([
    {
      $unwind: '$genres',
    },
    {
      $group: {
        _id: '$genres',
        avg_rating: { $avg: '$imdb.rating' },
      },
    },
    {
      $sort: {
        avg_rating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        genre: '$_id',
        avg_rating: 1,
      },
    },
  ])

  console.dir(res2, { depth: null })

  // const theatersByState = await Theater.aggregate([
  //   { $group: { _id: '$location.address.state', theaters: { $push: '$theaterId' }, numberOfTheaters: { $sum: 1 } } },
  //   { $set: { state: '$_id' } },
  //   { $unset: '_id' },
  //   { $sort: { numberOfTheaters: -1 } },
  //   {
  //     $group: {
  //       _id: 1,
  //       mostCrowdedState: { $first: '$state' },
  //       mostCrowdedCount: { $first: '$numberOfTheaters' },
  //       leastCrowdedState: { $last: '$state' },
  //       leastCrowdedCount: { $last: '$numberOfTheaters' },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       mostCrowdedState: {
  //         name: '$mostCrowdedState',
  //         numberOfTheaters: '$mostCrowdedCount',
  //       },
  //       leastCrowdedState: {
  //         name: '$leastCrowdedState',
  //         numberOfTheaters: '$leastCrowdedCount',
  //       },
  //     },
  //   },
  // ])
  // console.log(theatersByState)
  // const popularmoviesByDayOfWeek = await Movie.aggregate([
  //   {
  //     $group: {
  //       _id: { $isoDayOfWeek: '$released' },
  //       count: { $sum: 1 },
  //       avgRating: { $avg: '$imdb.rating' },
  //       stdDev: { $stdDevPop: '$imdb.rating' },
  //     },
  //   },
  //   { $sort: { avgRating: -1 } },
  // ])
  // console.log(popularmoviesByDayOfWeek)
}

main()

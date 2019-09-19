const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

const jsonChannels = [
  {
    name: 'TV Azteca',
    logo: 'tvazteca.png',
    shows: []
  },
  {
    name: 'Azteca Uno',
    logo: 'azteca-uno.png',
    shows: []
  },
  {
    name: 'Azteca Noticias',
    logo: 'azteca-noticias.png',
    shows: []
  },
  {
    name: 'Azteca Deportes',
    logo: 'azteca-deportes.png',
    shows: [
      {
        _id: new ObjectID(),
        name: 'Ventaneando',
        description:
          'La crítica más aguda y la investigación periodística del ' +
          'mundo del espectáculo, con el profesionalismo ' +
          'de experimentados periodistas.',
        image: 'ventaneando.jpg',
        chapters: [
          {
            _id: new ObjectID(),
            number: 1,
            name: 'Capitulo 1',
            title: null,
            path: 'videos/azflix/ventaneando.mp4',
            image: 'assets/images/shows/ventaneando.jpg'
          },
          {
            _id: new ObjectID(),
            number: 2,
            name: 'Capitulo 2',
            title: null,
            path: 'videos/azflix/ventaneando.mp4',
            image: 'img/aztflix/ventaneando.jpg'
          }
        ]
      }
    ]
  },
  {
    name: 'A+ 7.2',
    logo: 'azteca-aplus.png',
    shows: []
  },
  {
    name: 'Azteca 7',
    logo: 'azteca7.png',
    shows: []
  },
  {
    name: 'Adn 40',
    logo: 'adn40.png',
    shows: []
  }
]

module.exports = jsonChannels

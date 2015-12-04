import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';

export default Ember.Route.extend({
  model() {
    const song1 = Song.create({title: 'Black Dog',band: 'Led Zeppelin',rating: 3});
    const song2 = Song.create({title: 'Yellow Ledbetter',band: 'Pearl Jam',rating: 4});
    const song3 = Song.create({title: 'Daughter',band: 'Pearl Jam',rating: 5});
    const song4 = Song.create({title: 'The Pretender',band: 'Foo Fighters',rating: 2});

    var BandsCollection = Ember.Object.extend({
      content: [],
      sortProperties: ['name:desc'],
      sortedContent: Ember.computed.sort('content', 'sortProperties'),
    });

    var ledZeppelin = Band.create({ name: 'Led Zeppelin', songs:[song1] });
    var pearlJam = Band.create({ name: 'Pearl Jam', songs: [song2,song3] });
    var fooFighters = Band.create({ name: 'Foo Fighters', songs:[song4] });

    var bands = BandsCollection.create();
    bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);
    return bands;
  }
});

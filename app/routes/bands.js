import Ember from 'ember';
import Band from '../models/band';

export default Ember.Route.extend({
  model() {
    var BandsCollection = Ember.Object.extend({
      content: [],
      sortProperties: ['name:desc'],
      sortedContent: Ember.computed.sort('content', 'sortProperties'),
    });
    var ledZeppelin = Band.create({ name: 'Led Zeppelin'});
    var pearlJam = Band.create({ name: 'Pearl Jam'});
    var fooFighters = Band.create({ name: 'Foo Fighters'});

    var bands = BandsCollection.create();
    bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);
    return bands;
  }
});

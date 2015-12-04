import Ember from 'ember';
import Song from '../../../models/song';

export default Ember.Route.extend({
  model() {
    return this.modelFor('bands.band');
  }
});
import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(band) {
    if (Ember.isEmpty(band.get('description'))) {
      this.transitionTo('bands.band.songs');
    } else {
      this.transitionTo('bands.band.details');
    }
  }
});

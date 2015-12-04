import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.modelFor('bands').get('content').findBy('slug', params.slug);
  }
});
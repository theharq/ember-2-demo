import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateRating(params) {
      let song = params.item,
          rating = params.rating;
      song.set('rating', rating);
    }
  }
});

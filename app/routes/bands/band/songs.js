import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('bands.band');
  },

  actions: {
    createSong(){
      let songTitle = this.get('controller').get('title');
      let band = this.modelFor('bands.band');
      this.store.createRecord('song',{
        title: songTitle,
        band: band}).save().then(() => {
        this.set('controller.title', '');
      });
    }
  }
});
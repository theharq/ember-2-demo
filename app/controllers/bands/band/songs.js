import Ember from 'ember';

export default Ember.Controller.extend({
  songsCount: Ember.computed.alias('model.songs.length'),
  noSongs: Ember.computed.equal('songsCount', 0),
  songCreationStarted: false,
  canCreateSong: Ember.computed.or('songCreationStarted', 'songsCount'),
  isAddButtonDisabled: Ember.computed.empty('title'),
  actions: {

    updateRating(params) {
      let song = params.item,
          rating = params.rating;


      if (song.get('rating') === rating) {
        rating = 0; // Resetting rating if value is the same
      }

      song.set('rating', rating);
      song.save();
    },

    enableSongCreation() {
      this.set('songCreationStarted', true);
    },
  }
});

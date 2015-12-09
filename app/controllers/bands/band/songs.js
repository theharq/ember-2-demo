import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
  },
  sortBy: 'ratingDesc',
  songsCount: Ember.computed.alias('model.songs.length'),
  noSongs: Ember.computed.equal('songsCount', 0),
  songCreationStarted: false,
  canCreateSong: Ember.computed.or('songCreationStarted', 'songsCount'),
  isAddButtonDisabled: Ember.computed.empty('title'),
  sortedSongs: Ember.computed.sort('model.songs', 'sortProperties'),
  sortProperties: Ember.computed('sortBy', function(){
    const options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  actions: {

    updateRating(params) {
      let { item: song, rating } = params;

      if (song.get('rating') === rating) {
        rating = 0; // Resetting rating if value is the same
      }

      song.set('rating', rating);
      song.save();
    },

    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    setSorting(option) {
      this.set('sortBy', option);
    }
  }
});

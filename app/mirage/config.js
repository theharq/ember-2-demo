export default function() {

  this.get('/bands', function(db, request) {
    return {
      data: db.bands.map(attrs => (
        {type: 'bands', id: attrs.id, attributes: attrs }
      ))
    };
  }),

  this.get('/bands/:id', function(db, request) {
    let id = request.params.id;
    let band = db.bands.find(id);
    let songs = db.songs.where({band_id: id});

    return {
      data: {
        type: 'bands',
        id: id,
        attributes: band,
        relationships: {
          songs: {
            data: songs.map(attrs => (
              {type: 'songs', id: attrs.id, attributes: attrs }
            ))
          }
        }
      }
    };
  }),

  this.get('/songs/:id', function(db, request) {
    let id = request.params.id;

    return {
      data: {
        type: 'songs',
        id: id,
        attributes: db.songs.find(id)
      }
    };
  })
}
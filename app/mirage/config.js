export default function() {

  this.get('/bands', function(db, request) {
    let data = {};
    data = db.bands.map((attrs) => {
      let songs = db.songs.where({band_id: attrs.id});
      let band = {
        type: 'band',
        id: attrs.id,
        attributes: attrs ,
        relationships: {
          songs: {
            data: songs.map(attrs => (
              {type: 'songs', id: attrs.id, attributes: attrs }
            ))
          }
        },
      };
      return band;
    });
    return { data };
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
  }),

  this.post('/bands', (db, request) => {
    let payload = JSON.parse(request.requestBody);
    let band = db.bands.insert(payload.data.attributes);
    return {data: { type: 'bands', id: band.id, attributes: band}};
  }),

  this.post('/songs', (db, request) => {
    let payload = JSON.parse(request.requestBody);
    let song = db.songs.insert(payload.data.attributes);
    return {data: { type: 'songs', id: song.id, attributes: song}};
  }),

  this.patch('/bands/:id', (db, request) => {
    let payload = JSON.parse(request.requestBody);
    let band = db.bands.update(request.params.id, payload.data.attributes);
    return {data: { type: 'bands', id: band.id, attributes: band}};
  }),

  this.patch('/songs/:id', (db, request) => {
    let payload = JSON.parse(request.requestBody);
    let song = db.songs.update(request.params.id, payload.data.attributes);
    return {data: { type: 'songs', id: song.id, attributes: song}};
  })
}
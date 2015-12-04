export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  var band1 = server.create('band');
  server.createList('song', 20, {band_id: band1.id});

  var band2 = server.create('band');
  server.createList('song', 20, {band_id: band2.id});

  var band3 = server.create('band');
  server.createList('song', 20, {band_id: band3.id});

  var band4 = server.create('band');
  server.createList('song', 20, {band_id: band4.id});

  var band5 = server.create('band');
  server.createList('song', 20, {band_id: band5.id});
}

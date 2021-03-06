import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) { return `Band ${i}`; },
  description() { return faker.lorem.paragraph(); }
});
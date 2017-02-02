import Sequelize from 'sequelize';
import { URI } from './uri';

const sequelize = new Sequelize(URI);

const Tutor = sequelize.define('tutor', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
});

const Rating = sequelize.define('rating', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
})

// relationships
Tutor.hasMany(Rating);
Rating.belongsTo(Tutor);

sequelize.sync({force: true}).then(() => {
  Tutor.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@gmail.com',
  })
  Tutor.create({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
  })
});

export default sequelize;

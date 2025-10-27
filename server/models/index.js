const User = require('./User');
const Job = require('./Job');
const Match = require('./Match');
const Message = require('./Message');

// Associations
User.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'companyId', as: 'company' });

Match.belongsTo(User, { foreignKey: 'candidateId', as: 'candidate' });
Match.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

Job.hasMany(Match, { foreignKey: 'jobId', as: 'matches' });

Message.belongsTo(Match, { foreignKey: 'matchId', as: 'match' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Match.hasMany(Message, { foreignKey: 'matchId', as: 'messages' });

module.exports = {
  User,
  Job,
  Match,
  Message
};


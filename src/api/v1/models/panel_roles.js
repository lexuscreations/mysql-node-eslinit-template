/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var panel_roles =  sequelize.define('panel_roles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    role_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true,
      defaultValue: '1'
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, 
  {
    tableName: 'panel_roles',
    associate: function(models) {
      panel_roles.hasMany(models.panel_role_task_map, {as: "panel_role_task_map",foreignKey: 'role_id'});
    },
  }
  );
  return panel_roles;

};

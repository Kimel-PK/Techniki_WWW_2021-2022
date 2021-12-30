module.exports = (sequelize, DataTypes) => {
	
	const użytkownicy = sequelize.define("użytkownicy", {
		mail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hasło_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		typ: {
			type: DataTypes.ENUM('klient', 'kurier'),
			allowNull: true,
		}
	},
	{
		tableName: 'użytkownicy'
	})
	
	return użytkownicy
}
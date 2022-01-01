module.exports = (sequelize, DataTypes) => {
	
	const użytkownicy = sequelize.define("użytkownicy", {
		imię: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nazwisko: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hasło_hash: {
			type: DataTypes.STRING(60),
			allowNull: false,
		},
		typ: {
			type: DataTypes.ENUM('klient', 'kurier'),
			allowNull: true,
		}
	},
	{
		tableName: 'użytkownicy',
		timestamps: false
	})
	
	użytkownicy.associate = (models) => {
		użytkownicy.hasMany(models.zamówienia, {
			foreignKey: 'id_kurier'
		})
	}
	
	return użytkownicy
}
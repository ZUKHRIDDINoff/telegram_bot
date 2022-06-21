import { DataTypes } from "sequelize"

export default ({ sequelize }) => {
    // console.log(DataTypes);
    sequelize.define('User', {
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
        },
        is_bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        language_code: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: true,
        tableName: 'users',
        timestamps: false
    })
}
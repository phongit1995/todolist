const Sequelize = require('sequelize');
const db = require('../core/connectdb');
module.exports = db.sequelize.define(
    'tb_tasks',{
        id_tasks:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        task_name:{
            type:Sequelize.STRING
        },
        status:{
            type:Sequelize.BOOLEAN,
            default:false
        }
    },{
        timestamps: false
    }
)
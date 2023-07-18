import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Clogger } from '@genergy-spider/common';
import { PlantModel, EnergyModel } from './models';

const { console, logger } = Clogger;

export default class SequelizeBuilder {
    public static async createSequelize(options: SequelizeOptions): Promise<Sequelize> {
        if (!options) throw new Error('数据库连接选项不可以为空');

        options['timezone'] = '+08:00';
        let sequelize = new Sequelize(options);
        sequelize.addModels([PlantModel, EnergyModel]);
        // await sequelize.sync();
        try {
            await sequelize.authenticate();
            console.info('连接成功');
            logger.info('连接成功');
        } catch (error) {
            console.info('连接失败');
            logger.info('连接失败');
        } finally {
            return sequelize;
        }
    }
}

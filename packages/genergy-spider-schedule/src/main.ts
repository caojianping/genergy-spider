import config from 'config';
import { SequelizeOptions } from 'sequelize-typescript';
import { Clogger, DateUtils, RandomUtils, Utils } from '@genergy-spider/common';

import SequelizeBuilder from './sequelize';
import job from './job';
import { PlantStatusEnum } from './enums';
import { PlantDTO, EnergyDTO } from './dto';
import { PlantService, EnergyService } from './services';
import { PlantModel } from './models';

const { console, logger } = Clogger;
const mysqlOptions: SequelizeOptions = config.get<any>('db.mysql');

/**
 * 模拟电站数据
 */
async function mockPlants(): Promise<void> {
    let plantService = new PlantService(),
        count = await plantService.getCount();
    console.info('mockPlants count:', count);
    logger.info('mockPlants count:', count);
    if (count >= 20) {
        console.info('已经存在20条模拟电站数据');
        logger.info('已经存在20条模拟电站数据');
        return;
    }

    for (let i = 0; i < 10; i++) {
        (async function (index: number) {
            console.info('mockPlants for:', index);
            let plantDTO = new PlantDTO();

            plantDTO.id = RandomUtils.fixedWords(10, '', true);
            plantDTO.psId = RandomUtils.fixedWords(14, 'PS');
            plantDTO.code = RandomUtils.fixedWords(32);
            plantDTO.name = ['EyeM', 'Logger'][RandomUtils.randomDigit(0, 1)] + RandomUtils.randomDigit(100, 200);
            plantDTO.type = RandomUtils.randomDigit(0, 2);
            plantDTO.status = PlantStatusEnum.Enabled;

            plantDTO.installedPower = RandomUtils.randomDigit(1500, 2500, 2, true);
            plantDTO.estimatedAnnualEnergy = RandomUtils.randomDigit(150000, 200000, 2, true);
            plantDTO.actualAnnualEnergy = RandomUtils.randomDigit(140000, 190000, 2, true);
            plantDTO.estimatedAnnualEnergyEarnings = RandomUtils.randomDigit(75000, 80000, 2, true);
            plantDTO.actualAnnualEnergyEarnings = RandomUtils.randomDigit(74000, 79000, 2, true);
            plantDTO.estimatedAnnualEnergyMinEarningsRate = 0.07;
            plantDTO.estimatedAnnualEnergyMaxEarningsRate = 0.12;
            plantDTO.electricityPrice = 0.5 + RandomUtils.randomDigit(0, 1, 2, true);
            plantDTO.energyTerm = RandomUtils.randomDigit(300, 365);
            plantDTO.residualEnergyTerm = RandomUtils.randomDigit(250, 315);

            let now = new Date();
            plantDTO.constructionCompany = [
                '中国大大能源建设股份有限公司',
                '中国大大电力建设集团有限公司',
                '阳光月亮电源有限公司',
            ][RandomUtils.randomDigit(0, 2)];
            plantDTO.completedDate = DateUtils.dateCalculate(now, 'd', -RandomUtils.randomDigit(10, 15));
            plantDTO.gridConnectedDate = DateUtils.dateCalculate(now, 'd', -RandomUtils.randomDigit(1, 10));

            let coordinates = {
                    合肥蜀山区: [117.26061, 31.8512],
                    北京市海淀区: [116.29845, 39.95933],
                    长沙市望城区: [112.8179, 28.36121],
                    香港九龙城区: [114.18895, 22.30818],
                },
                city = ['合肥蜀山区', '北京市海淀区', '长沙市望城区', '香港九龙城区'][RandomUtils.randomDigit(0, 3)],
                coordinate = coordinates[city];
            plantDTO.address = city;
            plantDTO.longitude = coordinate[0];
            plantDTO.latitude = coordinate[1];

            let random = RandomUtils.randomDigit(1, 5);
            plantDTO.componentTotal = RandomUtils.randomDigit(30, 50);
            plantDTO.componentSupplier = '测试组件供应商' + random;
            plantDTO.componentModel = '测试组件型号' + random;

            plantDTO.inverterSupplier = '测试逆变器供应商' + random;
            plantDTO.inverterModel = '测试逆变器型号' + random;

            plantDTO.collectorSupplier = '测试采集器供应商' + random;
            plantDTO.collectorModel = '测试采集器型号' + random;

            await plantService.addPlant(plantDTO);
        })(i);
    }
    return;
}

/**
 * 模拟发电量数据
 */
async function mockEnergies(): Promise<void> {
    let plantService = new PlantService(),
        energyService = new EnergyService(),
        today = DateUtils.dateMorning(new Date()),
        plants = await plantService.getPlants();
    console.info('mockEnergies plants.count:', plants.length);
    logger.info('mockEnergies plants.count:', plants.length);

    for (let i = 0; i < plants.length; i++) {
        let plant = plants[i];
        (async function (plant: PlantModel, index: number) {
            console.info('mockEnergies for index:', index);
            logger.info('mockEnergies for index:', index);
            let energyDto = new EnergyDTO();
            energyDto.plantId = plant.id;
            energyDto.date = DateUtils.dateCalculate(today, 'd', -1);
            energyDto.actualDailyEnergy = RandomUtils.randomDigit(800, 900, 2, true);
            energyDto.gridDailyEnergy = RandomUtils.randomDigit(750, 850, 2, true);
            energyDto.power = 150000.0;
            energyDto.loadRate = 1;
            await energyService.addEnergy(energyDto);
        })(plant, i);
    }
    return;
}

/**
 * 电站任务
 */
async function plantJob() {
    // 凌晨0点，拉取电站数据
    // job({ hour: 0, minute: 0, second: 0 }, function () {});
    try {
        console.info('【电站数据】拉取开始……');
        logger.info('【电站数据】拉取开始……');
        mockPlants();
        console.info('【电站数据】拉取结束');
        logger.info('【电站数据】拉取结束');
    } catch (error) {
        console.info('【电站数据】拉取异常：', error);
        logger.info('【电站数据】拉取异常：', error);
    }
}

/**
 * 发电量任务
 */
function energyJob() {
    // 凌晨1点，拉取发电量数据
    job({ hour: 1, minute: 0, second: 0 }, function () {
        console.info('【发电量数据】拉取开始……');
        logger.info('【发电量数据】拉取开始……');
        mockEnergies()
            .then(() => {
                console.info('【发电量数据】拉取结束');
                logger.info('【发电量数据】拉取结束');
            })
            .catch((error) => {
                console.info('【发电量数据】拉取异常：', error);
                logger.info('【发电量数据】拉取异常：', error);
            });
    });
    // console.info('【发电量数据】拉取开始……');
    // logger.info('【发电量数据】拉取开始……');
    // mockEnergies()
    //     .then(() => {
    //         console.info('【发电量数据】拉取结束');
    //         logger.info('【发电量数据】拉取结束');
    //     })
    //     .catch((error) => {
    //         console.info('【发电量数据】拉取异常：', error);
    //         logger.info('【发电量数据】拉取异常：', error);
    //     });
}

/**
 * 天气任务
 */
function weatherJob() {
    // 凌晨2点，拉取天气预报数据
    job({ hour: 2, minute: 0, second: 0 }, function () {});
}

async function main(): Promise<void> {
    await SequelizeBuilder.createSequelize(Utils.duplicate<SequelizeOptions>(mysqlOptions));
    // await plantJob();
    energyJob();
    // weatherJob();
}

main();

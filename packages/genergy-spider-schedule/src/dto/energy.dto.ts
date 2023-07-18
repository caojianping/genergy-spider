export class EnergyDTO {
    // 电站编号
    plantId!: string;

    // 日期
    date!: Date;

    // 实际日发电量
    actualDailyEnergy!: number;

    // 实际总发电量
    actualTotalEnergy!: number;

    // 并网日发电量
    gridDailyEnergy!: number;

    // 并网总发电量
    gridTotalEnergy!: number;

    // 功率
    power!: number;

    // 功率负载比例
    loadRate!: number;
}

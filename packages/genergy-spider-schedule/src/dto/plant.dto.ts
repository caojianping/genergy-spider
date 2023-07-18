import { PlantTypeEnum, PlantStatusEnum } from '../enums';

export class PlantDTO {
    // 电站编号
    public id!: string;

    // 电站PS编号
    public psId!: string;

    // 电站编码S/N
    public code!: string;

    // 电站名称
    public name!: string;

    // 电站类型
    public type!: PlantTypeEnum;

    // 电站状态
    public status!: PlantStatusEnum;

    // 装机功率
    public installedPower!: number;

    // 预计年发电量
    public estimatedAnnualEnergy!: number;

    // 实际年发电量
    public actualAnnualEnergy!: number;

    // 预计年发电收益
    public estimatedAnnualEnergyEarnings!: number;

    // 实际年发电收益
    public actualAnnualEnergyEarnings!: number;

    // 预计年发电最小收益率
    public estimatedAnnualEnergyMinEarningsRate!: number;

    // 预计年发电最大收益率
    public estimatedAnnualEnergyMaxEarningsRate!: number;

    // 上网电价
    public electricityPrice!: number;

    // 发电年限
    public energyTerm!: number;

    // 剩余发电年限
    public residualEnergyTerm!: number;

    // 建设公司
    public constructionCompany!: string;

    // 建成日期
    public completedDate!: Date;

    // 并网日期
    public gridConnectedDate!: Date;

    // 省
    public province!: string;

    // 市
    public city!: string;

    // 县
    public district!: string;

    // 地址
    public address!: string;

    // 经度
    public longitude!: number;

    // 纬度
    public latitude!: number;

    // 组件总数
    public componentTotal!: string;

    // 组件供应商
    public componentSupplier!: string;

    // 组件型号
    public componentModel!: string;

    // 逆变器供应商
    public inverterSupplier!: string;

    // 逆变器型号
    public inverterModel!: string;

    // 采集器供应商
    public collectorSupplier!: string;

    // 采集器型号
    public collectorModel!: string;
}

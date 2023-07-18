import { Model, DataType, Column, Table, PrimaryKey } from 'sequelize-typescript';
import { PlantTypeEnum, PlantStatusEnum } from '../enums';

@Table({
    tableName: 'plant',
    timestamps: false,
})
export class PlantModel extends Model<PlantModel> {
    // 电站编号
    @PrimaryKey
    @Column({ type: DataType.STRING })
    id!: string;

    // 电站PS编号
    @Column({ type: DataType.STRING, field: 'ps_id' })
    psId!: string;

    // 电站编码S/N
    @Column({ type: DataType.STRING })
    code!: string;

    // 电站名称
    @Column({ type: DataType.STRING })
    name!: string;

    // 电站类型
    @Column({ type: DataType.TINYINT })
    type!: PlantTypeEnum;

    // 电站状态
    @Column({ type: DataType.TINYINT })
    status!: PlantStatusEnum;

    // 装机功率
    @Column({ type: DataType.DECIMAL, field: 'installed_power' })
    installedPower!: number;

    // 预计年发电量
    @Column({ type: DataType.DECIMAL, field: 'estimated_annual_energy' })
    estimatedAnnualEnergy!: number;

    // 实际年发电量
    @Column({ type: DataType.DECIMAL, field: 'actual_annual_energy' })
    actualAnnualEnergy!: number;

    // 预计年发电收益
    @Column({ type: DataType.DECIMAL, field: 'estimated_annual_energy_earnings' })
    estimatedAnnualEnergyEarnings!: number;

    // 实际年发电收益
    @Column({ type: DataType.DECIMAL, field: 'actual_annual_energy_earnings' })
    actualAnnualEnergyEarnings!: number;

    // 预计年发电最小收益率
    @Column({ type: DataType.DECIMAL, field: 'estimated_annual_energy_min_earnings_rate' })
    estimatedAnnualEnergyMinEarningsRate!: number;

    // 预计年发电最大收益率
    @Column({ type: DataType.DECIMAL, field: 'estimated_annual_energy_max_earnings_rate' })
    estimatedAnnualEnergyMaxEarningsRate!: number;

    // 上网电价
    @Column({ type: DataType.DECIMAL, field: 'electricity_price' })
    electricityPrice!: number;

    // 发电年限
    @Column({ type: DataType.INTEGER, field: 'energy_term' })
    energyTerm!: number;

    // 剩余发电年限
    @Column({ type: DataType.INTEGER, field: 'residual_energy_term' })
    residualEnergyTerm!: number;

    // 建设公司
    @Column({ type: DataType.STRING, field: 'construction_company' })
    constructionCompany!: string;

    // 建成日期
    @Column({ type: DataType.DATE, field: 'completed_date' })
    completedDate!: Date;

    // 并网日期
    @Column({ type: DataType.DATE, field: 'grid_connected_date' })
    gridConnectedDate!: Date;

    // 省
    @Column({ type: DataType.STRING, field: 'province' })
    province!: string;

    // 市
    @Column({ type: DataType.STRING, field: 'city' })
    city!: string;

    // 县
    @Column({ type: DataType.STRING, field: 'district' })
    district!: string;

    // 地址
    @Column({ type: DataType.STRING, field: 'address' })
    address!: string;

    // 经度
    @Column({ type: DataType.DECIMAL, field: 'longitude' })
    longitude!: number;

    // 纬度
    @Column({ type: DataType.DECIMAL, field: 'latitude' })
    latitude!: number;

    // 组件总数
    @Column({ type: DataType.STRING, field: 'component_total' })
    componentTotal!: string;

    // 组件供应商
    @Column({ type: DataType.STRING, field: 'component_supplier' })
    componentSupplier!: string;

    // 组件型号
    @Column({ type: DataType.STRING, field: 'component_model' })
    componentModel!: string;

    // 逆变器供应商
    @Column({ type: DataType.STRING, field: 'inverter_supplier' })
    inverterSupplier!: string;

    // 逆变器型号
    @Column({ type: DataType.STRING, field: 'inverter_model' })
    inverterModel!: string;

    // 采集器供应商
    @Column({ type: DataType.STRING, field: 'collector_supplier' })
    collectorSupplier!: string;

    // 采集器型号
    @Column({ type: DataType.STRING, field: 'collector_model' })
    collectorModel!: string;
    
    // 创建时间
    @Column({ type: DataType.DATE, field: 'create_time', defaultValue: DataType.NOW })
    createTime!: Date;

    // 修改时间
    @Column({ type: DataType.DATE, field: 'modify_time' })
    modifyTime?: Date;

    // 是否删除
    @Column({ type: DataType.TINYINT, field: 'is_delete', defaultValue: false })
    isDelete!: boolean;
}

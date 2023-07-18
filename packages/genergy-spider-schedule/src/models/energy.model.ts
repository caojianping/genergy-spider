import { Model, DataType, Column, Table, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: 'energy',
    timestamps: false,
})
export class EnergyModel extends Model<EnergyModel> {
    // 发电量编号
    @PrimaryKey
    @Column({ type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
    id!: string;

    // 电站编号
    @Column({ type: DataType.STRING, field: 'plant_id' })
    plantId!: string;

    // 日期
    @Column({ type: DataType.DATE, field: 'date' })
    date!: Date;

    // 实际日发电量
    @Column({ type: DataType.DECIMAL, field: 'actual_daily_energy' })
    actualDailyEnergy!: number;

    // 并网日发电量
    @Column({ type: DataType.DECIMAL, field: 'grid_daily_energy' })
    gridDailyEnergy!: number;

    // 功率
    @Column({ type: DataType.DECIMAL, field: 'power' })
    power!: number;

    // 功率负载比例
    @Column({ type: DataType.DECIMAL, field: 'load_rate' })
    loadRate!: number;

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

import { Clogger, DateUtils } from '@genergy-spider/common';
import { IEnergyService } from '../interfaces';
import { EnergyModel } from '../models';
import { EnergyDTO } from '../dto';

const { console, logger } = Clogger;

export class EnergyService implements IEnergyService {
    public async isExist(plantId: string, date: Date): Promise<boolean> {
        let energy = await EnergyModel.findOne({
            where: {
                plantId: plantId,
                date: date,
            },
        });
        return energy !== null;
    }

    public async addEnergy(energyDTO: EnergyDTO): Promise<boolean> {
        let { plantId, date } = energyDTO,
            isExist = await this.isExist(plantId, date);
        console.info('addEnergy isExist:', isExist, plantId, date.toLocaleString());
        if (isExist) return false;

        let energy = await EnergyModel.create(energyDTO);
        return energy !== null;
    }
}

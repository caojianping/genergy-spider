import { EnergyDTO } from '../dto';

export interface IEnergyService {
    isExist(plantId: string, date: Date): Promise<boolean>;

    addEnergy(energyDTO: EnergyDTO): Promise<boolean>;
}

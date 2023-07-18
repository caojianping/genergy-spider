import { IPlantService } from '../interfaces';
import { PlantModel } from '../models';
import { PlantDTO } from '../dto';

export class PlantService implements IPlantService {
    public async isExist(psId: string, code: string): Promise<boolean> {
        let plant = await PlantModel.findOne({ where: { psId: psId, code: code } });
        return plant !== null;
    }

    public async getPlants(): Promise<Array<PlantModel>> {
        return await PlantModel.findAll();
    }

    public async getCount(): Promise<number> {
        return await PlantModel.count();
    }

    public async addPlant(plantDTO: PlantDTO): Promise<boolean> {
        let { psId, code } = plantDTO,
            isExist = await this.isExist(psId, code);
        if (isExist) throw new Error('此电站已经存在');

        let plant = await PlantModel.create(plantDTO);
        return plant !== null;
    }
}

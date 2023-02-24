import { IBaseRepository } from '../interfaces/baserepository.interface'
import { Model } from 'mongoose'

export default class BaseRepository<T> implements IBaseRepository<T> {
    protected readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model
    }

    async find(filter = {}): Promise<T[]> {
        return this.model.find(filter).exec();
    }

    async findOne(filter = {}): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(item: any): Promise<T | any> {
        const model = new this.model(item)
        return model.save();
    }

    async update(id: string, item: T | any): Promise<T | null> {
        const Option = { new: true }
        return this.model.findByIdAndUpdate(id, item, Option).exec();
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }
}
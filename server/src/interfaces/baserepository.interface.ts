
export interface IBaseRepository<T> {
    // create a new record
    create(item: T): Promise<T>;
    // update an existing record
    update(id: string, item: T): Promise<T | null>;
    // delete a record
    delete(id: string): Promise<void>;
    // find a record
    findOne(filter: any): Promise<T | null>;
    // find a record by id
    findById(id: string): Promise<T | null>;
    // retrieve all records
    find(filter: any): Promise<T[]>;
}

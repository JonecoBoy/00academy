export interface BaseAdapter<T,U> {
    modelToEntity(model:T): U;
    entityToModel(entity:U): T;
  }
  
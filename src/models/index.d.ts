import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Products {
  readonly id: string;
  readonly title: string;
  readonly image?: string;
  readonly sellPrice?: number;
  readonly count?: number;
  readonly uom?: string;
  readonly pricelistID: string;
  readonly purchasePrice?: number;
  readonly owner: string;
  readonly createdDay?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Products>);
  static copyOf(source: Products, mutator: (draft: MutableModel<Products>) => MutableModel<Products> | void): Products;
}

export declare class Pricelist {
  readonly id: string;
  readonly image?: string;
  readonly title: string;
  readonly ordersCount?: number;
  readonly Products?: Products[];
  readonly owner: string;
  readonly createdDay?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Pricelist>);
  static copyOf(source: Pricelist, mutator: (draft: MutableModel<Pricelist>) => MutableModel<Pricelist> | void): Pricelist;
}
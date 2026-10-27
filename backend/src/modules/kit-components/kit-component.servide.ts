import { KitComponent } from "./kit-component.model.js";
import { Kit } from "../kits/kit.model";
import { Component } from "../components/component.model";

export class KitComponentService {

  static async findAll() {
    return KitComponent.findAll({
      order: [
        ["kitId", "ASC"],
        ["componentId", "ASC"],
      ],
    });
  }


  static async findByIds(kitId: number, componentId: number) {
    return KitComponent.findOne({
      where: { kitId, componentId },
    });
  }


  static async create(data: {
    kitId: number;
    componentId: number;
    quantity?: number;
  }) {
    return KitComponent.create(data);
  }


  static async update(
    kitComponent: KitComponent,
    data: {
      quantity: number;
    }
  ) {
    return kitComponent.update(data);
  }


  static async delete(kitComponent: KitComponent) {
    await kitComponent.destroy();
  }

  static async findEagerByIds(kitId: number, componentId: number) {
    return KitComponent.findOne({
      where: { kitId, componentId },
      include: [
        { model: Kit, as: "kit" },
        { model: Component, as: "component" },
      ],
    });
  }
}
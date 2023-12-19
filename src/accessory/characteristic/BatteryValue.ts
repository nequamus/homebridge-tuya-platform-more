import { Service } from 'homebridge';
import { TuyaDeviceSchema, TuyaDeviceSchemaIntegerProperty } from '../../device/TuyaDevice';
import { limit } from '../../util/util';
import BaseAccessory from '../BaseAccessory';

export function configureBatteryValue(accessory: BaseAccessory, service?: Service, schema?: TuyaDeviceSchema) {
  if (!schema) {
    return;
  }

  if (!service) {
    service = accessory.accessory.getService(accessory.Service.AccessoryInformation)
      || accessory.accessory.addService(accessory.Service.AccessoryInformation);
  }

  const property = schema.property as TuyaDeviceSchemaIntegerProperty;
  const multiple = Math.pow(10, property ? property.scale : 0);
  service.getCharacteristic(accessory.Characteristic.BatteryLevel)
    .onGet(() => {
      const status = accessory.getStatus(schema.code)!;
      return limit(status.value as number / multiple, 0, 100);
    });

}

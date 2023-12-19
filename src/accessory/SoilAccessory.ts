import BaseAccessory from './BaseAccessory';
import { configureCurrentTemperature } from './characteristic/CurrentTemperature';
import { configureSoilHumidity} from './characteristic/SoilHumidity';
import {configureBatteryValue} from './characteristic/BatteryValue';

const SCHEMA_CODE = {
  CURRENT_TEMP: ['temp_current'],
  CURRENT_HUMIDITY: ['humidity'],
  BATTERY_LEVEL: ['battery_value'],
};

export default class SoilAccessory extends BaseAccessory {

  requiredSchema() {
    return [SCHEMA_CODE.CURRENT_HUMIDITY];
  }

  configureServices() {


    // Other
    configureCurrentTemperature(this, undefined, this.getSchema(...SCHEMA_CODE.CURRENT_TEMP));
    configureSoilHumidity(this, undefined, this.getSchema(...SCHEMA_CODE.CURRENT_HUMIDITY));
    configureBatteryValue(this, undefined, this.getSchema(...SCHEMA_CODE.BATTERY_LEVEL));
  }

}

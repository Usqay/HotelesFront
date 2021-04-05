import { Currency } from './currency';
import { SystemConfiguration } from './system-configuration';
import { TurnChange } from './turn-change';

export interface ApiEnviroments {
    base_currency : Currency,
    turn_change : TurnChange,
    system_configurations : SystemConfiguration[]
}

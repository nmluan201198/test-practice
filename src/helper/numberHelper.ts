import numbro from "numbro";
import { isObject } from 'lodash';

export function formatNumber(value: number | string, option: numbro.Format = {}) {
    if (!isObject(option)) {
      return undefined;
    }
  
    return numbro(value).formatCurrency({
      mantissa: 0,
      thousandSeparated: true,
      average: false,
      ...option,
    });
  }

   
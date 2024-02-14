import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc : number,
  price_def : number ,
  ratio : number ,
  timestamp : Date, 
  upper_bound : number,
  lower_bound : number,
  trigger_alert : number | undefined,
  
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const price_ABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const price_DEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = price_ABC / price_DEF;
    const upper_Bound = 1 +  0.1;
    const lower_Bound = 1 -  0.1;

    return {
      price_abc : price_ABC,
      price_def : price_DEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound : upper_Bound,
      lower_bound : lower_Bound,
      trigger_alert : (ratio > upper_Bound || ratio < lower_Bound) ? ratio : undefined,
        
    };
  }
}


/**
 * This file contains the definition of Instrument class.
 */

import IInstrument from "./IInstrument";
import StrategyPlot from "./StrategyPlot";
import IInstrumentSkeleton from "./IInstrumentSkeleton";

/**
 * This is the base class for all the financial instruments (options, future and stock) we have used. It implements
 * the interface for instruments (i.e. IInstrument).
 * It has the common attributes of all the instruments like quantity, side, plot etc and the common functions like 
 * make plot which are present in every instrument.
 * These functions are then overridden by functions of each instrument class according to their plot calculation logic. 
 */
export default class Instrument implements IInstrument{
    id;
    quantity;
    side;
    plot;
    makePlot(x, range) {}
    getPlot() :  StrategyPlot {return this.plot;};
}

module.exports = Instrument;
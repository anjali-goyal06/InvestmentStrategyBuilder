/**
 * This file contains the definition of interface 'IInstrumentSkeleton'. This interface is implemented by the 
 * instrument skeleton class. 
 */

/**
 * IInstrumentSkeleton interface wraps the common attributes of all the instrument skeletons in it. It is then 
 * implemented by the instrument skeleton class.
 */
export default interface IInstrumentSkeleton{

    id : number;
    side : string;
}
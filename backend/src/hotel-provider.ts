import {RerumHotel} from './live/rerum-hotel';


export class HotelProvider {
    private static instance: RerumHotel;

    static registerHotel(hotel: RerumHotel): void {
        if (HotelProvider.instance) {
            throw new Error('An hotel is already registered');
        }
        HotelProvider.instance = hotel;
    }

    static getInstance(): RerumHotel {
        if (!HotelProvider.instance) {
            throw new Error('No hotel has been registered');
        }
        return HotelProvider.instance;
    }
}

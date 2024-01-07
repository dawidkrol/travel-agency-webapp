export interface Travel {
    id: number;
    name: string;
    description: string;
    country: string;
    startDate: Date;
    endDate: Date;
    photoLink: string;
    maximumNumberOfSpots: number;
    avaliableNumberOfSpots: number;
    unitPrice: number;
}
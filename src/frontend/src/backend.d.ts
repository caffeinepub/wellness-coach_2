import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingRequest {
    serviceType: string;
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    submissionTime: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllBookings(): Promise<Array<BookingRequest>>;
    getBookingByTime(submissionTime: Time): Promise<BookingRequest>;
    getBookingsCount(): Promise<bigint>;
    submitBookingRequest(name: string, email: string, phone: string, preferredDate: string, message: string, serviceType: string): Promise<void>;
}

import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type BookingRequest = {
    submissionTime : Time.Time;
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    message : Text;
    serviceType : Text;
  };

  module BookingRequest {
    public func compare(a : BookingRequest, b : BookingRequest) : Order.Order {
      Int.compare(b.submissionTime, a.submissionTime); // Descending by time
    };
  };

  let bookings = Map.empty<Time.Time, BookingRequest>();

  public shared ({ caller }) func submitBookingRequest(name : Text, email : Text, phone : Text, preferredDate : Text, message : Text, serviceType : Text) : async () {
    let submissionTime = Time.now();
    let request : BookingRequest = {
      submissionTime;
      name;
      email;
      phone;
      preferredDate;
      message;
      serviceType;
    };
    bookings.add(submissionTime, request);
  };

  public query ({ caller }) func getAllBookings() : async [BookingRequest] {
    bookings.values().toArray().sort();
  };

  public query ({ caller }) func getBookingsCount() : async Nat {
    bookings.size();
  };

  public query ({ caller }) func getBookingByTime(submissionTime : Time.Time) : async BookingRequest {
    switch (bookings.get(submissionTime)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?request) { request };
    };
  };
};

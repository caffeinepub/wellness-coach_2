import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
  serviceType: string;
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookingFormData) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitBookingRequest(
        data.name,
        data.email,
        data.phone,
        data.preferredDate,
        data.message,
        data.serviceType,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { getCabinById } from "../services/apiBookings";



export function useGetCabinPrice(cabinId){

    const price = useQuery({

        queryKey:['getCabinPrice',cabinId],
        queryFn:() => getCabinById(cabinId),
        enabled: !!cabinId, // 👈 prevents fetch until id exists
    });

    return price;
}



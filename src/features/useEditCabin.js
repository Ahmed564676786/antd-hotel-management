import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin1 } from "../services/apiCabins";
import { message } from "antd";




export function useEditCabin() {
  const queryClient = useQueryClient();



    const {mutateAsync:editCabin,isPending:isEditing,data} = useMutation({

            mutationFn:({id,updatedCabin})=>editCabin1(id,updatedCabin),
            onSuccess: () => ( queryClient.invalidateQueries({
                queryKey:["cabins"]
            })),
            onError:(error)=>{message.error(error)}
    });

     return { editCabin, isEditing, data };
}





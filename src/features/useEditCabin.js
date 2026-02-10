import { useMutation } from "@tanstack/react-query";
import { editCabin } from "../services/apiCabins";


export function useEditCabin(){

    const queryClient = useQueryClient();


    const { mutateAsync: editCabin,
    isLoading: isEditing,
    data} =  useMutation({
        mutationFn:({id,editCabin}) => editCabin(id,editCabin),
        mutationKey:["editcabin",id],

        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
    });

     return { editCabin, isEditing, data };
}



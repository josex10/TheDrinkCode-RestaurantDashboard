
import { ENotificationType } from "../../../commons/enums";
import { Grid, TextField, Typography } from "@mui/material"
import { ProviderFormLayoutProps } from "../../../commons/types";
import { ProviderSchema } from "../schemas/ProviderSchema";
import { TProviderForm } from "../type";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNotificationMessage } from "../../../commons/hooks";
import { useProvider } from "../hooks";
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export const ProviderFormLayout = (props: ProviderFormLayoutProps) => {
    const {onShowMessage} = useNotificationMessage();
    const {startSaveProvider, loading, errorMessage, successMessage, clearMessages} = useProvider();
    const { title } = props;
    const { register, handleSubmit, formState:{ errors } } = useForm<TProviderForm>({
        resolver: zodResolver(ProviderSchema())
    });

    useEffect(() => {
        if(errorMessage){
            onShowMessage({type: ENotificationType.ERROR, message: errorMessage})
        }
        if(successMessage){
            onShowMessage({type: ENotificationType.SUCCESS, message: successMessage})
        }
        clearMessages();
    }, [errorMessage, successMessage])
    
    const onSubmit = (data:TProviderForm ) => {
        startSaveProvider(data);        
    };

    return (
        <>
            <Grid container>
                <Grid item>
                    <Typography variant="h6">{title}</Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Nombre *"
                            size="small"
                            {...register("clm_name")}
                            helperText={
                                errors.clm_name?.message
                            }
                        >
                        </TextField>
                        <TextField
                            label="Correo Eléctronico"
                            size="small"
                            type="text"
                            {...register("clm_email")}
                            helperText={errors.clm_email?.message}
                        >
                        </TextField>
                        <TextField
                            label="Número Tributario"
                            size="small"
                            type="number"
                            {...register("clm_tax_number")}
                            helperText={errors.clm_tax_number?.message}
                        >
                        </TextField>
                        <TextField
                            label="Teléfono"
                            size="small"
                            type="number"
                            {...register("clm_phone")}
                            helperText={errors.clm_phone?.message}
                        >
                        </TextField>
                        <TextField
                            label="Dirección"
                            size="small"
                            multiline
                            rows={4}
                            {...register("clm_address")}
                            helperText={errors.clm_address?.message}
                        >
                        </TextField>
                        <LoadingButton
                            color="secondary"
                            type="submit"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            >
                            <span>Save</span>
                        </LoadingButton>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

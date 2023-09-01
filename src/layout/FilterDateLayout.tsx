import {FormControl, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material"

import React, {useEffect, useState } from "react";
import { ICustomSelect, IFilterDateResponse } from "./models";
import { DateOrTimeView, DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';



interface IFilterDateType extends ICustomSelect{
    dateView: DateOrTimeView[];
}
interface IPRops {
    pCustomSelect: ICustomSelect[];
    pHandleCustomSelectDataSelected: (data: IFilterDateResponse)=> void;
}

const filterDateType: IFilterDateType[] =[
    {value: 'filter_date_type_diary', label: 'Diario', dateView: ['year', 'month', 'day']},
    {value: 'filter_date_type_monthly', label: 'Mensual', dateView: ['year', 'month']},
    {value: 'filter_date_type_annualy', label: 'Anual', dateView: ['year']},
    {value: 'filter_date_type_range', label: 'Rango', dateView: ['year', 'month', 'day', 'hours']}
];

const generalMinDate = dayjs().subtract(10, 'year')
const generalMaxDate = dayjs();

export const FilterDateLayout = (props: IPRops) => {

    const { pCustomSelect } = props;
    const [filterTypeSelected, setCalendarView] = useState<IFilterDateType>(filterDateType[0]);
    const [rangeMinDate, setRangeMinDate] = useState<Dayjs | null>(generalMinDate);
    
    

    const initFilterValues: IFilterDateResponse = {
        filterCustomValue: pCustomSelect[0].value,
        filterDateTypeValue: filterDateType[0].value,
        filterDate: dayjs(),
        filterRangeStartDate: dayjs(),
        filterRangeEndDate: dayjs()
    }

    const [selectProperties, setSelectProperties] = React.useState(initFilterValues);

    useEffect(() => {
        props.pHandleCustomSelectDataSelected(selectProperties);
    }, [selectProperties])

   

    const handleChangeCustomSelect = (event: SelectChangeEvent) => {
        setSelectProperties({
            ...selectProperties,
            filterCustomValue: event.target.value
        });
    };

    const handleChangeFilterDateTypeSelect = (event: SelectChangeEvent) => {
        setSelectProperties({
            ...selectProperties,
            filterDateTypeValue: event.target.value
        });
        const selected = filterDateType.filter( date => date.value === event.target.value);
        setCalendarView(selected[0])
    };
    
    return (
        <Grid container sx={{display: "flex", flexWrap:'wrap'}}>
            <Grid item mr={2}>
                <FormControl>
                    <Select
                        labelId="custom-select"
                        id="custom-select"
                        value={selectProperties.filterCustomValue}
                        fullWidth
                        displayEmpty
                        onChange={handleChangeCustomSelect}
                    >
                        {
                            pCustomSelect.map( select => {
                                return (
                                    <MenuItem value={select.value} key={select.value}>{select.label}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item mr={2}>
                <FormControl>
                    <Select
                        labelId="custom-select"
                        id="custom-select"
                        value={selectProperties.filterDateTypeValue}
                        fullWidth
                        displayEmpty
                        onChange={handleChangeFilterDateTypeSelect}
                    >
                        {
                            filterDateType.map( select => {
                                return (
                                    <MenuItem value={select.value} key={select.value}>{select.label}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            {filterTypeSelected.value === 'filter_date_type_range'? (
                     <>
                     <Grid item mr={2}>
                        <FormControl size="small"> 
                            <DateTimePicker 
                                minDate={generalMinDate}
                                maxDate={generalMaxDate}
                                value={selectProperties.filterRangeStartDate} 
                                onChange={(newDate) => {
                                    setSelectProperties({...selectProperties, filterRangeStartDate:newDate});
                                    setRangeMinDate(newDate)
                                    }} 
                                views={filterTypeSelected.dateView} 
                                label="Desde" />
                        </FormControl>
                    </Grid>
                    <Grid item mr={2}>
                        <FormControl size="small"> 
                            <DateTimePicker 
                                minDate={rangeMinDate}
                                maxDate={generalMaxDate}
                                value={selectProperties.filterRangeEndDate} 
                                onChange={(newDate) => setSelectProperties({...selectProperties, filterRangeEndDate:newDate})} 
                                views={filterTypeSelected.dateView} 
                                label="Hasta" />
                        </FormControl>
                    </Grid>
                     </>
                ): (
                    <>
                        <Grid item mr={2}>
                            <FormControl size="small"> 
                                <DateTimePicker 
                                    minDate={generalMinDate}
                                    maxDate={generalMaxDate}
                                    value={selectProperties.filterDate} 
                                    onChange={(newDate) => setSelectProperties({...selectProperties, filterDate:newDate})} 
                                    views={filterTypeSelected.dateView} />
                            </FormControl>
                        </Grid>
                    </>
                )}
        </Grid>
    )
}

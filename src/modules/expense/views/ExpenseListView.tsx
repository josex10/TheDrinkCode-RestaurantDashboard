/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import StickyHeadTable from "../../../components/StickyHeaderTable"
import { FilterDateLayout } from "../../../layout/FilterDateLayout"
import { ICustomSelect, IFilterDateResponse } from "../../../layout/models"
import { useAuthStore } from "../../../hooks"


export const ExpenseListView = () => {
  const { auth } = useAuthStore();
  
  const customSelectValues: ICustomSelect[] = [
    {value: "filter_fecha_creacion", label: "Fecha de Creación"},
    {value: "filter_fecha", label: "Fecha"}
  ]
  const [customSelectData, setCustomselectdata] = useState<IFilterDateResponse>();


  const handleCustomSelectDataSelected = (data: IFilterDateResponse)=>{
    setCustomselectdata(data);
  }

  useEffect(() => {
    if(customSelectData){
      console.log(customSelectData)
    }
  }, [customSelectData, auth])
  
  return (
    <>
      <FilterDateLayout pHandleCustomSelectDataSelected={handleCustomSelectDataSelected} pCustomSelect={customSelectValues}></FilterDateLayout>
      <StickyHeadTable></StickyHeadTable>
    </>
  )
}

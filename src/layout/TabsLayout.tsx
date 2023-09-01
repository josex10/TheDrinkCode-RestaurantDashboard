import { Grid } from "@mui/material"
import { BasicTab } from "../components/tab"
import { ITabsInfo } from "../components/models"

interface TabsLayoutProps {
    tabsInfo:ITabsInfo[]
}
export const TabsLayout = (props: TabsLayoutProps) => {
  return (
    <>
        <Grid
        container
        spacing={0}
        direction="column"
        sx={{
            minHeight: "88vh",
            backgroundColor: "secondary.main",
            borderRadius: 3,
        }}
        >
        <BasicTab tabsInfo={props.tabsInfo}/>
        </Grid>
    </>
  )
}

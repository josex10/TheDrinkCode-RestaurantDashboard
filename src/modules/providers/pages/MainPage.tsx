
import { CreateView,EditView, ProvidersView  } from "../views";
import { ITabsInfo } from "../../../components/models";
import { MainLayout } from "../../../layout/MainLayout";
import { TabsLayout } from "../../../layout/TabsLayout";

const tabsInfo:ITabsInfo[] = [
    {label: 'Proveedores' , propValue: 0, view: <ProvidersView/>},
    {label: 'Nuevo' , propValue: 1, view: <CreateView/>},
    {label: 'Editar' , propValue: 2, view: <EditView/>},
  ];
export const MainPage = () => {
  return (
    <>
      <MainLayout>
        <TabsLayout tabsInfo={tabsInfo} />
      </MainLayout>
    </>
  )
}

import { ITabsInfo } from "../../../components/models";
import { MainLayout } from "../../../layout/MainLayout";
import { TabsLayout } from "../../../layout/TabsLayout";
import { ExpenseListCategoryView, ExpenseListView } from "../views";

const tabsInfo:ITabsInfo[] = [
  {label: 'Gastos' , propValue: 0, view: <ExpenseListView/>},
  {label: 'Categorías' , propValue: 1, view: <ExpenseListCategoryView/>},
];

export const MainPage = () => {
  return (
    <MainLayout>
      <TabsLayout tabsInfo={tabsInfo} />
    </MainLayout>
  );
};

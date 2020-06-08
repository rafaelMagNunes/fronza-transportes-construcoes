import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Supplier from '../pages/Supplier';
import ItenForm from '../pages/ItensForm';
import Construction from '../pages/Constructions';
import ConstructionDetail from '../pages/ConstructionDetail';

import SupplierForm from '../pages/Supplier/SuppliersForm';
import ConstructionForm from '../pages/Constructions/ConstructionsForm';

import SupplierEdit from '../pages/Supplier/SupplierEdit';
import ConstructionEdit from '../pages/Constructions/ConstructionEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/supplier" component={Supplier} isPrivate />
    <Route path="/construction" component={Construction} isPrivate />
    <Route
      path="/constructionsdeatail"
      component={ConstructionDetail}
      isPrivate
    />

    <Route path="/constructions/form" component={ConstructionForm} isPrivate />
    <Route path="/suppliers/form" component={SupplierForm} isPrivate />
    <Route path="/itens/form" component={ItenForm} isPrivate />

    <Route path="/constructionedit" component={ConstructionEdit} isPrivate />
    <Route path="/supplieredit" component={SupplierEdit} isPrivate />
  </Switch>
);

export default Routes;

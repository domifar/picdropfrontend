import { Routes } from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';
import {VouchersComponent} from './vouchers/vouchers.component';
import {TimeComponent} from './time/time.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path:'workspaces', component: WorkspaceComponent},
  {path:'vouchers', component: VouchersComponent},
  {path:'time', component: TimeComponent},
  {path:'', component: LoginComponent},
];

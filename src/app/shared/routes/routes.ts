import { Routes } from '@angular/router';

export const content: Routes = [
	{
	    path: 'sample',
	    loadChildren: () => import('../../components/sample-page/sample-page.module').then(m => m.SamplePageModule)
  	}
];

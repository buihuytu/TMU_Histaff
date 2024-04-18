import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetListRoutes } from './asset-list.routing';

@NgModule({
  imports: [RouterModule.forChild(AssetListRoutes)]
})

export class AssetListModule {}
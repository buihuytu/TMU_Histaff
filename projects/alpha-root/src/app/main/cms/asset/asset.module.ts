import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Error404Module } from "../../errors/404/error-404.module";
import { AssetRoutes } from "./asset.routing";

@NgModule({
  imports: [RouterModule.forChild(AssetRoutes)],
})

export class AssetModule { }
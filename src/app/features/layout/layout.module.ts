import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ShellComponent } from "./shell/shell.component";

@NgModule({
    declarations: [
        ShellComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        ShellComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            extend: true
        })
    ]
  })
  export class LayoutModule { }
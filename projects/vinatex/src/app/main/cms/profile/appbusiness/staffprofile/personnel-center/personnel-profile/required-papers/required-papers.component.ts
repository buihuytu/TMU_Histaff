import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, LayoutService, AppService, DialogService, MultiLanguageService, IFormatedResponse, EnumFormBaseContolType } from "ngx-histaff-alpha";
import { Subscription, filter } from "rxjs";
import { PersonnelCenterService } from "../../personnel-center.service";

@Component({
  selector: 'app-required-papers',
  templateUrl: './required-papers.component.html',
  styleUrls: ['./required-papers.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RequiredPapersComponent
  extends BaseEditComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild('container') container!: ElementRef;
  getPapernfoApi: api = api.HU_EMPLOYEE_GET_PAPERS;
  boundSuccess!: boolean;
  override entityTable = 'HU_EMPLOYEE_PAPERS';
  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [];
  viewChecked: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private appService: AppService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    public personnelCenterService: PersonnelCenterService
  ) {
    super(dialogService);

    this.captionCode =
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_PAPERS;
    this.crud = {
      r: api.HU_EMPLOYEE_GET_PAPERS,
      u: api.HU_EMPLOYEE_UPDATE_PAPERS,
    };

    this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'PAPER')
      .subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          const idIndex: number = 2;
          if (body.statusCode === 200 && !!body.innerBody) {
            this.sections.push({
              rows: [
                [
                  {
                    flexSize: 0,
                    label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
                    field: 'id',
                    value: '',
                    controlType: EnumFormBaseContolType.TEXTBOX,
                    type: 'number',
                    hidden: true,
                  },
                ],
              ],
            });
            var rows = Math.ceil(res.body.innerBody.length / 3);
            for (var i = 0; i < rows; i++) {
              try {
                this.sections.push({
                  rows: [
                    [
                      {
                        flexSize: 4,
                        label: res.body.innerBody[i * 3].name,
                        field: res.body.innerBody[i * 3].indexId,
                        value: false,
                        controlType: EnumFormBaseContolType.CHECKBOX,
                        readonly: true,
                        type: 'text',
                      },
                      {
                        flexSize: 4,
                        label: res.body.innerBody[i * 3 + 1].name,
                        field: res.body.innerBody[i * 3 + 1].indexId,
                        value: false,
                        controlType: EnumFormBaseContolType.CHECKBOX,
                        readonly: true,
                        type: 'text',
                      },
                      {
                        flexSize: 4,
                        label: res.body.innerBody[i * 3 + 2].name,
                        field: res.body.innerBody[i * 3 + 2].indexId,
                        value: false,
                        controlType: EnumFormBaseContolType.CHECKBOX,
                        readonly: true,
                        type: 'text',
                      },
                    ],
                  ],
                });
              } catch {
                try {
                  this.sections.push({
                    rows: [
                      [
                        {
                          flexSize: 4,
                          label: res.body.innerBody[i * 3].name,
                          field: res.body.innerBody[i * 3].indexId,
                          value: false,
                          controlType: EnumFormBaseContolType.CHECKBOX,
                          readonly: true,
                          type: 'text',
                        },
                        {
                          flexSize: 4,
                          label: res.body.innerBody[i * 3 + 1].name,
                          field: res.body.innerBody[i * 3 + 1].indexId,
                          value: false,
                          controlType: EnumFormBaseContolType.CHECKBOX,
                          readonly: true,
                          type: 'text',
                        },
                      ],
                    ],
                  });
                } catch {
                  this.sections.push({
                    rows: [
                      [
                        {
                          flexSize: 4,
                          label: res.body.innerBody[i * 3].name,
                          field: res.body.innerBody[i * 3].indexId,
                          value: false,
                          controlType: EnumFormBaseContolType.CHECKBOX,
                          readonly: true,
                          type: 'text',
                        },
                      ],
                    ],
                  });
                }
              }
            }
          }
        }
      });
  }
  ngOnInit(): void { }

  ngAfterViewInit() {
    setTimeout(() => {
      const personnelLeftMenu = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--personnel-left-menu')
          .replace('px', '')
      );

      const sizeLayoutBlockCellSpacing = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-layout-block-cell-spacing')
          .replace('px', '')
      );
      let contentContainerWidth = 0;
      this.layoutService.contentContainerWidth$.subscribe((x) => {
        contentContainerWidth = x;
        console.log(contentContainerWidth);
        const width =
          contentContainerWidth -
          (personnelLeftMenu + sizeLayoutBlockCellSpacing * 6);
        this.container.nativeElement.style.setProperty('--width', width + 'px');
      });
    });

    // setTimeout(() => {
    //   console.log(this.form.getRawValue());
    //   debugger;
    // }, 1000);
  }
  ngAfterViewChecked() {
    // if(this.viewChecked == true) return;
    // if(this.personnelCenterService.tabActiveIndex == 2){
    //   const collection = document.getElementsByClassName("col-md-4 ng-star-inserted") as HTMLCollection ;
    //   setTimeout(() => {
    //     for(let i = 0;i < collection.length; i++){
    //       if(!!collection[11].classList){
    //         if(collection[11].classList.contains("col-md-4")){
    //           collection[11].classList.add("col-md-12")
    //           // collection[11].classList.remove("col-md-4")
    //           this.viewChecked = true
    //         }
    //       }
    //     }
    //   },200)
    // }

    setTimeout(() => {
      if (this.viewChecked == true) return;
      if (!this.viewChecked) {
        let labels = document.querySelectorAll(
          '.core-checkbox-container label'
        );
        let spans = document.querySelectorAll(
          '.core-checkbox-container label span'
        );
        if (labels.length > 0) {
          labels.forEach((label: any) => {
            label.style.maxWidth = '350px';
          });
        }
        if (spans.length > 0) {
          spans.forEach((span: any) => {
            span.style.textOverflow = 'ellipsis';
            span.style.whiteSpace = 'nowrap';
            span.style.overflow = 'hidden';
            span.style.width = '300px';
          });
        }
        this.viewChecked = true;
      }
    }, 1000);
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      // <== outer push
      this.personnelCenterService.employeeCv$
        .pipe(filter((cv) => !!cv))
        .subscribe((x) => {
          console.log(x);
          this.form.get('id')?.patchValue(x.id);
          setTimeout(() => {
            this.subsctiptions.push(
              // <== inner push
              this.appService
                .get(this.getPapernfoApi + '/' + x.id)
                .subscribe((res) => {
                  if (res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body;
                    if (body.statusCode === 200) {
                      if (body.innerBody.length > 0) {
                        body.innerBody.map((g: any) => {
                          this.form.get(g.name)?.setValue(g.paperIdCheck);
                          console.log(this.form.getRawValue())
                        });
                      }
                      else {
                        this.form.reset() //set value default for form
                        this.form.get('id')?.patchValue(x.id);
                      }
                    }
                  }
                })
            );
          }, 100)
        })
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map((x) => x?.unsubscribe());
  }
}
